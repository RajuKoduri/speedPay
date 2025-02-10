import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
@Component({
  selector: 'app-chargebacks',
  templateUrl: './chargebacks.component.html',
  styleUrls: ['./chargebacks.component.css']
})
export class ChargebacksComponent implements OnInit {
  filterForm: FormGroup;
  FillterList: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  dataLoader: boolean = false;
  chargebacksList: any;
  p: number = 1;
  selectnum: any;
  PageCount: number = 0;
  tablePrint: any;
  dataPrint: any;
  wallettypelist: any = [];
  usertypelist: any = [];
  paymentSystemlist: any = [];
  statuslist: any = [];
  faces: any;
  faceslist: any = [];
  chargepopup: boolean = false;
  subCharge: any = [];
  currencyList: any = [];
  faceList: any = [];
  pagecontrolbtn: boolean = false;
  usertypes: any = [];

  startDate: any;
  endDate: any;
  DepositstartDate: any;
  DepositendDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  DepositstartTime: any = "00:00:00"
  DepositendTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false

  currencyarray: any = [];
  selectcurrency: any = [];
  currencydropdownlist: any = [];
  dropdownSettingscurrency = {};
  // currencyList: any = [];
  selectedcurrency: any = [];
  currencyGuids: any = [];
  CopyCurrencyTotalGuids: any = [];
  // wallettypelist: any = [];

  faceParameterslist: any = [];
  convertedArray: any = [];
  dropdownList12: any = [];
  dropdownSettings = {};
  selectedItems12: any = [];

  dropdownSettingsPaymentSystem: any;
  CopyTotalGuids: any = [];
  selectedPaymentsSystemsGuids: any = [];
  PaymentsSystemsList: any;
  selectedPaymentsSystemsList: any = [];

  selectedUserlist: any = [];
  UserTypesGuids: any = [];
  CopyUserTotalGuids: any = [];
  dropdownSettingsUsertypes = {};
  location: any;
  playerExplorer: boolean = false;
  AgentExplorer: boolean = false;
  PlayerguidList: any;
  AgentguidList: any;

  constructor(private Cashierservice: CashierService, private FileformatServiceService:
    FileformatServiceService, private PlayerserviceService: PlayerServiceService, private DateTimePipe: DateTimePipe) {
    this.filterForm = new FormGroup({
      currency: new FormControl(),
      userType: new FormControl(),
      userLogin: new FormControl(),
      shortId: new FormControl(),
      paymentSystem: new FormControl(),
      paymentMeansNumber: new FormControl(),
      status: new FormControl(),
      depositId: new FormControl(),
      internalId: new FormControl(),
      initiatorLogin: new FormControl(),
      face: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      UserType: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      DepositstartDate: new FormControl(),
      DepositendDate: new FormControl(),
      DepositstartTime: new FormControl(),
      DepositendTime: new FormControl(),

      // face:new FormControl(),
    })
  }

  ngOnInit(): void {
    this.walletTypes();
    this.UserType();
    this.paymentSystem();
    this.Status();
    this.Face();

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.DepositstartDate = datee;
    this.DepositendDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    this.playerExplorerCheck();
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/chargebacks") {
      this.playerExplorer = true;
      this.PlayerGuid();
    } else if (this.location == "/Agentexplorer/chargebacks") {
      this.playerExplorer = false;
      this.AgentExplorer = true;
      this.AgentInfo();
    } else {
      this.AgentExplorer = false;
      this.playerExplorer = false;
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
      let agentInfo = JSON.parse(AgentInfo)
      if (agentInfo.agent) {
        this.AgentguidList = agentInfo.agent.guid
      } else if (agentInfo.user) {
        this.AgentguidList = agentInfo.user.guid
      }
      console.log(this.AgentguidList)
    }
  }
  ignoreContext() {
    this.chargebacksList = [];
    this.dataLoader = true;
  }
  fillterMenu() {
    this.FillterList = !this.FillterList;
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
        singleSelection: false,
        idField: 'guid',
        textField: 'description',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
    }
  }
  UserType() {
    const usertypes = localStorage.getItem('usertype');
    if (usertypes) {
      this.usertypelist = JSON.parse(usertypes);
      console.log("usertypelist", this.usertypelist)

      for (let i = 0; i < this.usertypelist.length; i++) {
        if (this.usertypelist[i].value == "Player" || this.usertypelist[i].value == "Agent") {
          this.usertypes.push(this.usertypelist[i])
        }
      }
      console.log("usertypes", this.usertypes)

      this.selectedUserlist = this.usertypes.map((user: any) => {
        return { value: user.value, guid: user.guid }
      })

      console.log(this.selectedUserlist);
      this.selectedUserlist.forEach((item: { guid: any; }) => {
        this.UserTypesGuids.push(item.guid);
      });
      this.CopyUserTotalGuids = this.UserTypesGuids
      console.log(this.UserTypesGuids);

      this.dropdownSettingsUsertypes = {
        singleSelection: false,
        idField: 'guid',
        textField: 'value',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
    }
  }
  // UserType() {
  //   const usertypes = localStorage.getItem('usertype');
  //   if (usertypes) {
  //     this.usertypelist = JSON.parse(usertypes);
  //     console.log("usertypelist", this.usertypelist)
  //   }
  //   for(let i=0; i<this.usertypelist.length; i++){
  //     if(this.usertypelist[i].value == "Player" ||this.usertypelist[i].value=="Agent"){
  //       this.usertypes.push(this.usertypelist[i])
  //     }
  //   }
  // }
  paymentSystem() {
    const PaymentsSystems = localStorage.getItem('PaymentsSystems');
    if (PaymentsSystems) {
      this.PaymentsSystemsList = JSON.parse(PaymentsSystems)
    }
    console.log("PaymentsSystemList", this.PaymentsSystemsList)


    this.PaymentsSystemsList.forEach((paymentSystem: any) => {
      if (paymentSystem.value == "") {
        paymentSystem.paymentSystemName = 'Prode'
      }
      else if (paymentSystem.value == "") {
        paymentSystem.paymentSystemName = 'LaPoker'
      }
      else {
        paymentSystem.paymentSystemName = paymentSystem.value
      }
    })

    for (let i = 0; i < this.PaymentsSystemsList.length; i++) {
      this.selectedPaymentsSystemsList[i] = {
        paymentSystemName: this.PaymentsSystemsList[i].paymentSystemName,
        guid: this.PaymentsSystemsList[i].guid
      }
    }
    console.log(this.selectedPaymentsSystemsList)
    this.selectedPaymentsSystemsList.forEach((item: { guid: any; }) => {
      this.selectedPaymentsSystemsGuids.push(item.guid);
    });
    this.CopyTotalGuids = this.selectedPaymentsSystemsGuids
    this.dropdownSettingsPaymentSystem = {
      singleSelection: false,
      idField: 'guid',
      textField: 'paymentSystemName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
  }
  Status() {
    const status = localStorage.getItem("palyerstatus");
    if (status) {
      this.statuslist = JSON.parse(status);
      console.log(this.statuslist)
      console.log("statusList", this.statuslist)
    }
  }
  Face() {
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
    let fillterbody = this.getValues(this.filterForm)
    this.chargebacksList = false;
    this.dataLoader = true
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    // fillterbody["reportPeriod"] = this.filterForm.value.reportingPeriodFrom != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;


    const { DepositstartDate, DepositstartTime, DepositendDate, DepositendTime } = this.filterForm.value;
    const DepositstartDateTime = DepositstartDate ? DepositstartDate + "T" + DepositstartTime : undefined;
    const DepositendDateTime = DepositendDate ? DepositendDate + "T" + DepositendTime : undefined;
    // fillterbody["reportingPeriod"] = this.filterForm.value.reportingPeriodFrom != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined
    // fillterbody["depositStartPeriod"] = this.filterForm.value.datePeriodFrom != null ? { "start": this.filterForm.value.datePeriodFrom, "end": this.filterForm.value.datePeriodTo } : undefined
    fillterbody["depositStartPeriod"] = (DepositstartDateTime || DepositendDateTime) ? { start: DepositstartDateTime, end: DepositendDateTime } : undefined;
    // fillterbody["wallets"] = this.filterForm.value.currency != null ? [this.filterForm.value.currency] : undefined
    fillterbody["wallets"] = this.currencyGuids;
    // fillterbody["userTypes"] = this.filterForm.value.userType != null ? [this.filterForm.value.userType] : undefined
    fillterbody["userLogin"] = this.filterForm.value.userLogin != null ? this.filterForm.value.userLogin : undefined
    fillterbody["shortId"] = this.filterForm.value.shortId != null ? this.filterForm.value.shortId : undefined
    fillterbody["paymentSystemTypes"] = this.selectedPaymentsSystemsGuids
    // fillterbody["paymentSystemTypes"] = this.filterForm.value.paymentSystem != null ? [this.filterForm.value.paymentSystem] : undefined
    fillterbody["paymentMeansNumber"] = this.filterForm.value.paymentMeansNumber != null ? this.filterForm.value.paymentMeansNumber : undefined
    fillterbody["status"] = this.filterForm.value.status != null ? [this.filterForm.value.status] : undefined
    fillterbody["depositId"] = this.filterForm.value.depositId != null ? this.filterForm.value.depositId : undefined
    fillterbody["internalId"] = this.filterForm.value.internalId != null ? this.filterForm.value.internalId : undefined
    fillterbody["initiatorLogin"] = this.filterForm.value.initiatorLogin != null ? this.filterForm.value.initiatorLogin : undefined
    // fillterbody["networkNames"] = this.filterForm.value.face != null ? [this.filterForm.value.face] : undefined


    if (this.playerExplorer) {
      fillterbody["idList"] = [this.PlayerguidList]
      this.Cashierservice.getPlayerChargebacks(fillterbody).subscribe((res) => { this.getChargebacksData(res) })
    } else if (this.AgentExplorer) {
      fillterbody["idList"] = [this.AgentguidList]
      this.Cashierservice.getAgentChargebacks(fillterbody).subscribe((res) => { this.getChargebacksData(res) })
    } else {
      fillterbody["userTypes"] = this.UserTypesGuids;
      fillterbody["networkNames"] = this.convertedArray != null ? this.convertedArray : undefined
      this.Cashierservice.getChargebacks(fillterbody).subscribe((res) => { this.getChargebacksData(res) })
    }

  }
  getChargebacksData(data: any) {
    this.dataLoader = false;
    this.chargebacksList = data.objectList;
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList?.length;

    console.log(this.chargebacksList)
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.chargebacksList != null || this.ResultCount == 0) {
      this.dataLoader = false;
    }


    for (let i = 0; i < this.chargebacksList?.length; i++) {
      // for (let m = 0; m < this.wallettypelist.length; m++) {
      //   if (this.chargebacksList[i].currencyList.lowLong == this.wallettypelist[m].guid.lowLong) {
      //     this.chargebacksList[i].currencyList = this.wallettypelist[m].value
      //   }
      // }
      for (let j = 0; j < this.usertypes.length; j++) {
        if (this.chargebacksList[i].user.type.lowLong == this.usertypes[j].guid.lowLong) {
          this.chargebacksList[i].user.type = this.usertypes[j].value
        }
        for (let k = 0; k < this.PaymentsSystemsList.length; k++) {
          if (this.chargebacksList[i].paymentSystemType.lowLong == this.PaymentsSystemsList[k].guid.lowLong) {
            this.chargebacksList[i].paymentSystemType = this.PaymentsSystemsList[k].value
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
  dateTransform(date: any) {
    if (date != undefined) {
      let c = this.DateTimePipe.transforminingDispalyDate(date);
      return (c)

    }
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'ChargebacksExeclSheet.xlsx';
    XLSX.writeFile(wb, 'ChargebacksExeclSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "ChargebacksExeclSheet")
  }
  onPrint() {
    this.tablePrint = document.getElementById("tablerecords");
    this.dataPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    console.log(this.tablePrint)
    console.log(this.dataPrint)
    this.dataPrint.document.write(this.tablePrint.innerHTML);
    this.dataPrint.document.close();
    this.dataPrint.focus();
    this.dataPrint.print();
    this.dataPrint.close();
  }
  FormReset() {
    this.filterForm.reset();
  }


  onClick(event: any) {
    console.log(event)
    this.subCharge = this.chargebacksList[event]
    console.log(this.subCharge)
    this.chargepopup = true;
  }

  closePopup() {
    this.chargepopup = false;
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
    if (this.PageCount > this.chargebacksList.length) {

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
    if (this.PageCount > this.chargebacksList.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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

  timechange(data: any) {
    console.log(data.target.value)
    console.log(this.filterForm.value.startTime)
    console.log(this.filterForm.value.endTime)
    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }

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

  // **********************************@face dropdown Starts *******************************************************************************
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
  // ******************************************* @face dropdown Ends *************************************************************************************
  // **************************payment System MultiDropDowns**************************************
  onItemSelectPaymentSystem(data: any) {
    this.selectedPaymentsSystemsGuids = []
    this.filterForm.value.paymentSystem.forEach((item: { guid: any; }) => {
      this.selectedPaymentsSystemsGuids.push(item.guid);
    });
    console.log(this.selectedPaymentsSystemsGuids)
  }

  OnItemDeSelectPaymentSystem(data: any) {
    this.selectedPaymentsSystemsGuids = []
    this.filterForm.value.paymentSystem.forEach((item: { guid: any; }) => {
      this.selectedPaymentsSystemsGuids.push(item.guid);
    });
    console.log(this.selectedPaymentsSystemsGuids)
    if (this.selectedPaymentsSystemsGuids === null || this.selectedPaymentsSystemsGuids.length === 0) {
      console.log("Empty");
      this.selectedPaymentsSystemsGuids = this.CopyTotalGuids
    }
  }
  onSelectAllPaymentSystem(data: any) {
    this.selectedPaymentsSystemsGuids = []
    data.forEach((item: { guid: any; }) => {
      this.selectedPaymentsSystemsGuids.push(item.guid);
    });
    console.log(this.selectedPaymentsSystemsGuids)
  }
  onDeSelectAllPaymentSystem(data: any) {
    this.selectedPaymentsSystemsGuids = []
    this.selectedPaymentsSystemsGuids = this.CopyTotalGuids
    // data.forEach((item: { guid: any; }) => {
    //   this.playerstatusaaray.push(item.guid);
    // });
    console.log(this.selectedPaymentsSystemsGuids)
  }
  // ***************************************** @Ends ****************************************
  //  ************************************* @USertypes Dropdown Starts*********************************
  onItemSelectUsertypes(data: any) {
    this.UserTypesGuids = []
    this.filterForm.value.userType.forEach((item: { guid: any; }) => {
      this.UserTypesGuids.push(item.guid);
    });
    console.log(this.UserTypesGuids)
  }
  OnItemDeSelectUsertypes(data: any) {
    this.UserTypesGuids = []
    this.filterForm.value.userType.forEach((item: { guid: any; }) => {
      this.UserTypesGuids.push(item.guid);
    });
    console.log(this.UserTypesGuids)
    if (this.UserTypesGuids === null || this.UserTypesGuids.length === 0) {
      console.log("Empty");
      this.UserTypesGuids = this.CopyUserTotalGuids
    }
  }
  onSelectAllUsertypes(data: any) {
    this.UserTypesGuids = []
    data.forEach((item: { guid: any; }) => {
      this.UserTypesGuids.push(item.guid);
    });
    console.log(this.UserTypesGuids)
  }
  onDeSelectAllUsertypes(data: any) {
    this.UserTypesGuids = []
    this.UserTypesGuids = this.CopyUserTotalGuids
    console.log(this.UserTypesGuids)
  }


  //  ************************************* @USertypes Dropdown ends*********************************

}



