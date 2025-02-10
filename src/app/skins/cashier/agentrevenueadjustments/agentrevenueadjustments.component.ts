import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { CashierService } from 'src/app/source/Cashier.service';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
@Component({
  selector: 'app-agentrevenueadjustments',
  templateUrl: './agentrevenueadjustments.component.html',
  styleUrls: ['./agentrevenueadjustments.component.css']
})
export class AgentrevenueadjustmentsComponent implements OnInit {
  filterForm: FormGroup;
  FillterMenu: boolean = false;
  walletlist: any;
  walletlists: any = [];
  faceParameterslist: any;
  loader: boolean = false;
  revenueadjustdata: any;
  ResultCount: any;
  resultcount: boolean = true;
  rowsOnthePage: any;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

  currencyarray:any = [];
  selectcurrency:any = [];
  currencydropdownlist:any = [];
  dropdownSettingscurrency = {};
  currencyList: any = [];
  selectedcurrency: any = [];
  currencyGuids: any = [];
  CopyCurrencyTotalGuids: any = [];
  wallettypelist: any = [];

  // faceParameterslist: any;
  convertedArray: any = []
  dropdownList12: any = []
  selectedItems12: any = []
  dropdownSettings = {}
  totalAmount: any;
  location: any;
  agentExplorer: boolean = false;
  agentInfo: any;
  agentGuid: any;
  popupview: boolean = false;
  selectedRowData: any;

  constructor(private Cashierservice: CashierService,private FileformatServiceService: FileformatServiceService, private DateTimePipe:DateTimePipe, private AgentcontrolService:AgentControlService) {
    this.filterForm = new FormGroup({
      wallet: new FormControl(),
      DatePeriodStart: new FormControl(),
      DatePeriodEnd: new FormControl(),
      AgentLogin: new FormControl(),
      Admin: new FormControl(),
      AdjustmentAmountfrom: new FormControl(),
      AdjustmentAmountTo: new FormControl(),
      Face: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(),
      endDate: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.faceParameters() 
    this.walletTypes()

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    this. ExplorerCheck()
  }

  ExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
   if (this.location == "/Agentexplorer/revenueAdjustments") {
      this.agentExplorer = true;
      this.AgentInfo()
    } else {
      this.agentExplorer = false;
    }
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
  walletTypes(){
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips") {
        if (this.wallettypelist[i].clubGameWallet == true  ) {
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
    this.FillterMenu = false
    console.log(this.filterForm.value)
    this.loader = true;
    this.revenueadjustdata = false;
    let fillterbody = this.getDirtyValues(this.filterForm)

    fillterbody["firstRecord"] = (this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
      "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
      "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    } : undefined
    // fillterbody["datePeriod"] = this.filterForm.value.DatePeriodStart !=null ?  {"start":this.filterForm.value.DatePeriodStart,"end":this.filterForm.value.DatePeriodEnd}:undefined;
    fillterbody["wallets"] = this.currencyGuids,
    // fillterbody["wallet"] = this.filterForm.value.wallet !=null ?  [this.filterForm.value.wallet]:undefined;
    fillterbody["accountMask"] = this.filterForm.value.AgentLogin !=null ? this.filterForm.value.AgentLogin:undefined;
    fillterbody["adminAccountMask"] = this.filterForm.value.Admin !=null ? this.filterForm.value.Admin:undefined;
    fillterbody["adjustments"] = this.filterForm.value.AdjustmentAmountfrom !=null ? {"from":this.filterForm.value.AdjustmentAmountfrom,"to":this.filterForm.value.AdjustmentAmountTo}:undefined;
    // fillterbody["faces"] = this.filterForm.value.Face !=null ?  [this.filterForm.value.Face]:undefined;
    fillterbody["faces"] = this.convertedArray != null ? this.convertedArray : undefined

    if(this.agentExplorer){
      fillterbody["idList"] = [this.agentGuid]
    }

    this.Cashierservice.getAgentRevenueAdjustment(fillterbody).subscribe((res) => { this.AgentRevenueAdjustData(res) })
  }


  AgentRevenueAdjustData(data: any) {
    console.log(data)
    this.revenueadjustdata = data.objectList
    this.ResultCount = data.resultCount;
    this.rowsOnthePage = data.objectList.length;
    console.log( data.objectList[0]?.comment)

    if (this.ResultCount !== null || this.ResultCount==0) {
      this.resultcount = false;
    }
    if (this.revenueadjustdata != null) {
      this.loader = false;
    }

    this.totalAmount = this.revenueadjustdata.reduce((acc:any,list:any)=>{return acc + list.amount.value},0)
    console.log(this.totalAmount)
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
    XLSX.writeFile(wb, 'AgentRevenueAdjustmentsExcelSheet.xlsx'); 
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AgentRevenueAdjustmentsExcelSheet")
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
    this.filterForm.value.wallet.forEach((item: { guid: any; }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids)
  }

  OnItemDeSelectcurrency(data: any) {
    this.currencyGuids = []
    this.filterForm.value.wallet.forEach((item: { guid: any; }) => {
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
}
