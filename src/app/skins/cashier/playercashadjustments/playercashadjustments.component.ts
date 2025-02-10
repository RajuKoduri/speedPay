import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';

@Component({
  selector: 'app-playercashadjustments',
  templateUrl: './playercashadjustments.component.html',
  styleUrls: ['./playercashadjustments.component.css']
})
export class PlayercashadjustmentsComponent implements OnInit {
  filterForm: FormGroup;
  FillterList: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: any;
  tablePrint: any;
  dataPrint: any;
  dataLoader: boolean = false;
  playercashList: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  CashierOperationList: any;

  currencyarray: any = [];
  selectcurrency: any = [];
  currencydropdownlist: any = [];
  dropdownSettingscurrency = {};
  currencyList: any = [];
  selectedcurrency: any = [];
  currencyGuids: any = [];
  CopyCurrencyTotalGuids: any = [];
  wallettypelist: any = [];

  faceParameterslist: any;
  convertedArray: any = []
  dropdownList12: any = []
  selectedItems12: any = []
  dropdownSettings = {}

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

  convertedtypes: any = [];
  typesguid: any = [];
  dropdownListTypes: any = [];
  dropdownsettingTypes = {};
  location: any;
  playerExplorer: boolean = false;
  PlayerguidList: any;
  walletFormatsList: any;
  selectedTypeGuid: any;
  agentExplorer: boolean = false;
  agentInfo: any;
  agentGuid: any;
  AgentCashAdjustmentData: any;
  selectedRowData: any;
  popupview: boolean = false;
  totalAmountSum: any;
  // CashierOperationList: any = [];

  constructor(private Cashierservice: CashierService, private DateTimePipe: DateTimePipe, private PlayerserviceService: PlayerServiceService,
    private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      currency: new FormControl(),
      user: new FormControl(),
      type: new FormControl(),
      initiatorLogin: new FormControl(),
      face: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.CashAdjustmentOperationType();
    this.faceParameters();
    this.walletTypes();
    this.walletFormats();

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    this.playerExplorerCheck()
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/playercashadjustments") {
      this.playerExplorer = true;
      this.agentExplorer = false;
      this.PlayerGuid();
    } else if (this.location == "/Agentexplorer/CashAdjustments") {
      this.playerExplorer = false;
      this.agentExplorer = true;
      this.AgentInfo()
    } else {
      this.playerExplorer = false;
      this.agentExplorer = false;

    }
  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem("Playerguid");
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }

  AgentInfo() {
    let AgentInfo = sessionStorage.getItem("AgentInfo")
    if (AgentInfo) {
      this.agentInfo = JSON.parse(AgentInfo)
      if (this.agentInfo.agent) {
        this.agentGuid = this.agentInfo.agent.guid
      } else if (this.agentInfo.user) {
        this.agentGuid = this.agentInfo.user.guid
      }
    }
    console.log(this.agentGuid)
  }

  ignoreContext() {
    this.playercashList = [];
    this.dataLoader = false;
  }
  fillterMenu() {
    this.FillterList = !this.FillterList;
  }
  walletFormats() {
    let walletFormats = localStorage.getItem("walletFormats");
    if (walletFormats) {
      this.walletFormatsList = JSON.parse(walletFormats)
    }
    console.log("walletFormats", this.walletFormatsList)
  }
  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips") {
        if (this.wallettypelist[i].clubGameWallet == true) {
          if (this.wallettypelist[i].description != "Play Money") {

            this.currencyList.push(this.wallettypelist[i])
          }
        }
      }
      console.log("currencyList", this.currencyList)

      for (let i = 0; i < this.currencyList.length; i++) {
        this.selectedcurrency[i] = {
          description: this.currencyList[i].description,
          guid: this.currencyList[i].guid
        }
      }
      console.log(this.selectedcurrency)
      this.selectedcurrency.forEach((item: { guid: any; }) => {
        this.currencyGuids.push(item.guid);
      });
      this.CopyCurrencyTotalGuids = this.currencyGuids
      console.log(this.currencyGuids);

      this.dropdownSettingscurrency = {
        singleSelection: true,
        idField: 'guid',
        textField: 'description',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
    }
  }
  CashAdjustmentOperationType() {
    const CashAdjustmentOperationType = localStorage.getItem("CashAdjustmentOperationType");
    if (CashAdjustmentOperationType) {
      this.CashierOperationList = JSON.parse(CashAdjustmentOperationType)
    }

    this.typesguid = []
    console.log(this.CashierOperationList)

    this.CashierOperationList.forEach((item: any, i: any) => {
      this.typesguid.push(item.guid)
      this.convertedtypes[i] = {
        value: this.CashierOperationList[i].value,
        guid: this.CashierOperationList[i].guid
      }
    });

    console.log(this.convertedtypes);
    console.log(this.typesguid);
    this.dropdownListTypes = this.CashierOperationList
    console.log(this.dropdownListTypes)
    this.dropdownsettingTypes = {
      singleslection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unselectAllText: 'unselect All',
      itemsShowlimit: 1,
      allowsearchFilter: false,
    }
  }
  faceParameters() {
    const faceParameterslist = localStorage.getItem('faceParameters')
    if (faceParameterslist) {
      this.faceParameterslist = JSON.parse(faceParameterslist)
    }
    this.convertedArray = []
    // this.faceParameterslist = this.CommomfilterService.selectallst();
    console.log(this.faceParameterslist);

    this.faceParameterslist.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
    this.dropdownList12 = this.faceParameterslist;
    console.log(this.dropdownList12);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectedItems12 = this.dropdownList12;
  }

  getValues(form: any) {
    let Values: any = {};
    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            Values[key] = this.getValues(currentControl);
        }
      });
    return Values;

  }
  onFormSubmit() {

    this.selectedTypeGuid = this.convertedtypes.map((list: any) => list.guid)

    let fillterbody = this.getValues(this.filterForm)
    console.log(fillterbody)
    this.dataLoader = true;
    this.playercashList = false;
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    // fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
    //   "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
    //   "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    // } : undefined
    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;
    // fillterbody["reportPeriod"] = this.filterForm.value.reportingPeriodFrom != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined;
    fillterbody["wallets"] = this.currencyGuids,
      // fillterbody["wallets"] = this.filterForm.value.currency != null ? [this.filterForm.value.currency] : undefined
      fillterbody["userLoginMask"] = this.filterForm.value.user != null ? this.filterForm.value.user : undefined
    // fillterbody["type"] = this.typesguid != null ? this.typesguid : undefined
    // fillterbody["type"] = this.filterForm.value.type != null ? [this.filterForm.value.type] : undefined
    fillterbody["initiatorloginMask"] = this.filterForm.value.initiatorLogin != null ? this.filterForm.value.initiatorLogin : undefined
    // fillterbody["faces"] = this.filterForm.value.face != null ? [this.filterForm.value.face] : undefined

    if (this.playerExplorer) {

      fillterbody["idList"] = [this.PlayerguidList]
      this.Cashierservice.getPlayerCashAdjustment(fillterbody).subscribe(data => { this.getPlayerCashData(data) })


    } else if (this.agentExplorer) {
      fillterbody["type"] = this.selectedTypeGuid.length == 0 ? this.typesguid : this.selectedTypeGuid
      fillterbody["idList"] = [this.agentGuid],
        this.Cashierservice.getAgentBalanceAdjustments(fillterbody).subscribe((data) => { this.getAgentCashData(data) })
    } else {
      fillterbody["type"] = this.selectedTypeGuid.length == 0 ? this.typesguid : this.selectedTypeGuid
      // fillterbody["type"] = this.typesguid != null ? this.typesguid : undefined
      fillterbody["faces"] = this.convertedArray != null ? this.convertedArray : undefined

      this.Cashierservice.getAccBalanceAdjustment(fillterbody).subscribe(data => { this.getPlayerCashData(data) })
    }
  }
  getPlayerCashData(data: any) {
    this.dataLoader = false;
    this.playercashList = data.objectList;
    console.log(this.playercashList);
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList?.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.playercashList != null || this.playercashList.resultCount == 0) {
      this.dataLoader = false;
    }
    for (let i = 0; i < this.playercashList.length; i++) {
      // for (let j = 0; j < this.CashierOperationList.length; j++) {
      //   if (this.playercashList[i]?.type?.lowLong == this.CashierOperationList[j].guid.lowLong) {
      //     this.playercashList[i].type = this.CashierOperationList[j].value
      //   }
      // }
      for (let k = 0; k < this.walletFormatsList.length; k++) {
        if (this.walletFormatsList[k].currencyCode) {
          if (this.walletFormatsList[k].symbol) {
            if (this.playercashList[i].decrease?.wallet.lowLong == this.walletFormatsList[k].guid.lowLong) {
              this.playercashList[i].decrease.walletsymbol = this.walletFormatsList[k].symbol
            }
            if (this.playercashList[i].increase?.wallet.lowLong == this.walletFormatsList[k].guid.lowLong) {
              this.playercashList[i].increase.walletsymbol = this.walletFormatsList[k].symbol
            }

          }
        }

      }
    }
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }

  getAgentCashData(data: any) {
    this.dataLoader = false;
    this.AgentCashAdjustmentData = data.objectList;
    console.log(this.AgentCashAdjustmentData);
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList?.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.AgentCashAdjustmentData != null || this.AgentCashAdjustmentData.resultCount == 0) {
      this.dataLoader = false;
    }
    this.totalAmountSum = this.AgentCashAdjustmentData.reduce((acc:any,list:any)=>acc + list.amount.value, 0)
  }
  directionType(direction: any) {
    if (direction) {

      let directiontype: any
      for (let j = 0; j < this.CashierOperationList.length; j++) {
        if (direction.lowLong == this.CashierOperationList[j].guid.lowLong) {
          directiontype = this.CashierOperationList[j].value
        }
      }
      return directiontype
    }
  }

  viewdata(data: any, index: any) {
    this.popupview = true
    console.log(data)
    console.log(index)
    this.selectedRowData = data

  }

  closepop() {
    this.popupview = false;
  }

  onPrint() {
    this.tablePrint = document.getElementById("tablerecords");
    this.dataPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    console.log(this.tablePrint);
    console.log(this.dataPrint);
    this.dataPrint.document.write(this.tablePrint.innerHTML);
    this.dataPrint.document.close();
    this.dataPrint.focus();
    this.dataPrint.print();
    this.dataPrint.close();
  }
  FormReset() {
    this.filterForm.reset();
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'PlayerCashExeclSheet.xlsx';
    XLSX.writeFile(wb, 'PlayerCashExeclSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerCashExeclSheet")
  }

  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    return (c)
  }


  fastbackforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt("1")
      })
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    if (this.PageCount > this.playercashList.length) {

      this.pagecontrolbtn = true
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)

  }

  fastforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1
      })

    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    console.log(this.ResultCount)
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }

    this.onFormSubmit()
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)
  }


  next() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    console.log(this.ResultCount)
    console.log(this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log(((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit()

  }

  prev() {
    console.log("......Hhello......")
    if ((this.filterForm.value.firstRecord - 1) == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1)
    if (this.PageCount > this.playercashList.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }

  timechnage(data: any) {
    console.log(data.target.value)
  }
  showDate(data: any) {
    console.log(this.filterForm.value.endDate)
    if (this.filterForm.value.startDate > this.filterForm.value.endDate) {

      this.steddate = true;
    } else {
      this.steddate = false;
    }

    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    } else {
      this.timeerror = false;
    }

    this.filterForm.valueChanges.subscribe(x => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()) {
        console.log("indirect")
        console.log(this.filterForm.value.endDate)
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    });
  }

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }

  // *********************************** @Dropdown currency starts ********************************
  onItemSelectcurrency(data: any) {
    this.currencyGuids = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids)
  }

  OnItemDeSelectcurrency(data: any) {
    this.currencyGuids = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids)
    if (this.currencyGuids === null || this.currencyGuids.length === 0) {
      console.log("Empty");
      this.currencyGuids = this.CopyCurrencyTotalGuids
    }

  }
  onSelectAllcurrency(data: any) {
    this.currencyGuids = []
    data.forEach((item: { guid: any; }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids)
  }
  onDeSelectAllcurrency(data: any) {
    this.currencyGuids = []
    this.currencyGuids = this.CopyCurrencyTotalGuids
    console.log(this.currencyGuids)
  }

  // *********************************** @Dropdown currency Ends ********************************

  // *****************face dropdown @ starts ***************************************

  onItemSelectnew(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.face.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });

    console.log(this.convertedArray);
  }
  OnItemDeSelectnew(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.face.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }


  onSelectAllnew(data: any) {
    this.convertedArray = [];
    data.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }
  onDeSelectAllnew(data: any) {
    this.convertedArray = [];
    data.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }


  // ********************** face dropdown @ ends ******************************

  // *****************TYPES dropdown @ starts *************************************** 
  onItemSelectTYPES(data: any) {
    // this.convertedtypes = []
    // // console.log(this.filterForm.value.networkNames)
    // this.filterForm.value.type.forEach((item: { name: string }) => {
    //   this.convertedtypes.push(item.name);
    // });

    console.log(this.convertedtypes);
  }
  OnItemDeSelectTYPES(data: any) {
    // this.convertedtypes = []
    // // console.log(this.filterForm.value.networkNames)
    // this.filterForm.value.type.forEach((item: { name: string }) => {
    //   this.convertedtypes.push(item.name);
    // });
    console.log(this.convertedtypes);
  }
  onSelectAllTYPES(data: any) {
    // this.convertedtypes = [];
    // data.forEach((item: { name: string }) => {
    //   this.convertedtypes.push(item.name);
    // });
    console.log(this.convertedtypes);
  }
  onDeSelectAllTYPES(data: any) {
    // this.convertedtypes = [];
    // data.forEach((item: { name: string }) => {
    //   this.convertedtypes.push(item.name);
    // });
    console.log(this.convertedtypes);
  }
  // ********************** TYPES dropdown @ ends ******************************


}
