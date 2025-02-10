import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { CashierService } from 'src/app/source/Cashier.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { AgentControlService } from 'src/app/source/AgentControl.service';
@Component({
  selector: 'app-agentcashadjustments',
  templateUrl: './agentcashadjustments.component.html',
  styleUrls: ['./agentcashadjustments.component.css']
})
export class AgentcashadjustmentsComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  loader: boolean = false
  PageCount: number = 0;
  faceParametersList: any;
  walletFormatsList: any;
  walletlists: any = [];
  CashAdjustmentOperationList: any;
  AgentBalanceData: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  Amount: any;
  obj: any;
  pagecontrolbtn: boolean = false;
  Agentashadjustmentfulldetails: any;
  TAgentashadjustDatapopup: boolean = false;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

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

  convertedtypes: any = [];
  typesguid: any = [];
  dropdownsettingTypes = {};
  selectedTypeGuid: any;



  constructor(private CashierService: CashierService, private DateTimePipe: DateTimePipe,private AgentcontrolService : AgentControlService,
    private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      ReportingDateForm: new FormControl(),
      ReportingDateTo: new FormControl(),
      Currency: new FormControl(),
      User: new FormControl(),
      Type: new FormControl(),
      InitiatorLogin: new FormControl(),
      Face: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
      startDate: new FormControl(),
      endDate: new FormControl(),
      currency: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.faceParameters();
    this.walletTypes();
    this.CashAdjustmentOperationType();

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
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
  CashAdjustmentOperationType() {
    const CashAdjustmentOperationType = localStorage.getItem("CashAdjustmentOperationType");
    if (CashAdjustmentOperationType) {
      this.CashAdjustmentOperationList = JSON.parse(CashAdjustmentOperationType)
    }

    this.convertedtypes = []
    this.typesguid = []
    console.log(this.CashAdjustmentOperationList)
  
    this.CashAdjustmentOperationList.forEach((item: any, i: any) => {
      this.typesguid.push(item.guid)
      this.convertedtypes[i] = {
        value: this.CashAdjustmentOperationList[i].value,
        guid: this.CashAdjustmentOperationList[i].guid
      }
    });
    
    console.log(this.convertedtypes);
    console.log(this.typesguid);
    
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
  // CashAdjustmentOperationType() {
  //   const CashAdjustmentOperationType = localStorage.getItem("CashAdjustmentOperationType");
  //   if (CashAdjustmentOperationType) {
  //     this.CashAdjustmentOperationList = JSON.parse(CashAdjustmentOperationType)
  //   }
  //   console.log("CashAdjustmentOperationType", this.CashAdjustmentOperationList)
  // }

  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
          // else
          //   dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }

  onFormSubmit() {

    this.selectedTypeGuid = this.convertedtypes.map((list:any)=>list.guid)
    console.log(this.filterForm.value);
    this.FillterMenu = false;
    this.loader = true;
    this.AgentBalanceData = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    // fillterbody["reportPeriod"] = this.filterForm.value.ReportingDateForm != null ? { "start": this.filterForm.value.ReportingDateForm, "end": this.filterForm.value.ReportingDateTo } : undefined;
    fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
      "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
      "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    } : undefined
    fillterbody["wallets"] = this.currencyGuids,
      // fillterbody["wallets"] = this.filterForm.value.Currency != null ? [this.filterForm.value.Currency] : undefined;
      fillterbody["userLoginMask"] = this.filterForm.value.User != null ? this.filterForm.value.User : undefined;
    fillterbody["type"] = this.selectedTypeGuid.length == 0 ? this.typesguid : this.selectedTypeGuid;
    // fillterbody["type"] = this.typesguid != null ? this.typesguid : undefined
    // fillterbody["type"] = this.filterForm.value.Type != null ? [this.filterForm.value.Type] : undefined;
    fillterbody["initiatorloginMask"] = this.filterForm.value.InitiatorLogin != null ? this.filterForm.value.InitiatorLogin : undefined;

    this.CashierService.getAgentBalanceAdjustments(fillterbody).subscribe((data) => this.AgentBalanceAdjustmentsData(data))
  }
  AgentBalanceAdjustmentsData(data: any) {
    console.log(data)
    this.AgentBalanceData = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;

    if (this.AgentBalanceData != null) {
      this.loader = false;
    }

    if (this.AgentBalanceData !== null) {
      this.resultcount = false;
    }
    for (let i = 0; i < this.AgentBalanceData.length; i++) {
      for (let j = 0; j < this.CashAdjustmentOperationList.length; j++) {
        if (this.AgentBalanceData[i].direction.lowLong == this.CashAdjustmentOperationList[j].guid.lowLong) {
          this.AgentBalanceData[i].direction = this.CashAdjustmentOperationList[j].value
        }
      }
    }
    this.findsum(this.AgentBalanceData)
    // console.log(this.filterForm.value.maxCountRecord)
    // console.log(this.AgentBalanceData.length)
    // console.log(this.ResultCount)
    // console.log(this.filterForm.value.maxCountRecord > this.AgentBalanceData.length)
    // console.log(this.filterForm.value.maxCountRecord >= this.AgentBalanceData.length)
    // if(this.AgentBalanceData){
    //   if (this.filterForm.value.maxCountRecord > this.AgentBalanceData.length) {
    //     alert("test1")
    //     this.pagecontrolbtn = true
    //   }else{
    //     this.pagecontrolbtn = false
    //   }
    // }
    if (this.AgentBalanceData) {
      if (this.filterForm.value.maxCountRecord >= this.ResultCount) {
        this.pagecontrolbtn = true;
      } else {
        this.pagecontrolbtn = false;
      }
    }
  }
  findsum(data: any) {
    this.obj = data
    console.log(this.obj);

    this.Amount = this.obj.reduce((a: any, b: { amount: any; }) => (a + b.amount.value), 0);
    console.log(this.Amount)
  }
  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    return (c)
  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'AgentCashAdjustmentExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerBalanceExeclSheet")
  }

  closepopup() {
    this.TAgentashadjustDatapopup = false;
  }

  Transactionspopup(event: any) {
    console.log(event)
    this.Agentashadjustmentfulldetails = this.AgentBalanceData[event]
    console.log(this.Agentashadjustmentfulldetails)
    this.TAgentashadjustDatapopup = true;
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
    if (this.filterForm.value.maxCountRecord > this.AgentBalanceData.length) {

      this.pagecontrolbtn = true
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
    if (this.filterForm.value.maxCountRecord < this.AgentBalanceData.length) {
      this.pagecontrolbtn = true
    }
    this.onFormSubmit()
    //     console.log(100 > this.AgentBalanceData.length)
    // console.log(this.PageCount)
    // console.log(this.AgentBalanceData.length)

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
    if (this.PageCount > this.AgentBalanceData.length) {
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

  
  AgentExplore(name: any, guid: any, agentInfo:any) {
    this.AgentcontrolService.agentExplore(name, guid, agentInfo)
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
    this.filterForm.value.Face.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });

    console.log(this.convertedArray);
  }
  OnItemDeSelectnew(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.Face.forEach((item: { name: string }) => {
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
    console.log(this.convertedtypes);
  }
  OnItemDeSelectTYPES(data: any) {
    console.log(this.convertedtypes);
  }
  onSelectAllTYPES(data: any) {
    console.log(this.convertedtypes);
  }
  onDeSelectAllTYPES(data: any) {
    console.log(this.convertedtypes);
  }
  // ********************** TYPES dropdown @ ends ******************************
}
