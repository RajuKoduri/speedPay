import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { CashierService } from 'src/app/source/Cashier.service';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';

@Component({
  selector: 'app-agentrevenuepayments',
  templateUrl: './agentrevenuepayments.component.html',
  styleUrls: ['./agentrevenuepayments.component.css']
})
export class AgentrevenuepaymentsComponent implements OnInit {
  filterForm: FormGroup;
  FillterMenu: boolean = false;
  faceParameterslist: any;
  walletlist: any;
  walletlists: any = [];
  loader: boolean = false;
  revenuedata: any;
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
 
  convertedArray: any = []
  dropdownList12: any = []
  selectedItems12: any = []
  dropdownSettings = {}
  playerRevenueSum: any;
  agentRevenueSum: any;
  totalRevenueSum: any;
  location: any;
  agentExplorer: boolean = false;
  agentInfo: any;
  agentGuid: any;
  popupview: boolean = false;
  selectedRowData: any;

  constructor(private Cashierservice: CashierService, private DateTimePipe:DateTimePipe, private FileformatServiceService: FileformatServiceService, private AgentcontrolService:AgentControlService) {
    this.filterForm = new FormGroup({
      wallet: new FormControl(),
      AgentLogin: new FormControl(),
      Face: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.faceParameters();
    this.walletTypes();

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
   if (this.location == "/Agentexplorer/revenuePayments") {
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
        if (this.wallettypelist[i].faceWallet == true  ) {
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
    this.revenuedata = false;
    let fillterbody = this.getDirtyValues(this.filterForm)

    fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportDate"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;
    // fillterbody["reportDate"] = this.filterForm.value.DatePeriodStart != null ? { "Start": this.filterForm.value.DatePeriodStart, "end": this.filterForm.value.DatePeriodEnd } : undefined;
    // fillterbody["reportDate"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
    //   "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
    //   "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    // } : undefined
    fillterbody["loginMask"] = this.filterForm.value.AgentLogin != null ? this.filterForm.value.AgentLogin : undefined;
    fillterbody["agentNetwork"] = this.convertedArray != null ? this.convertedArray : undefined
    // fillterbody["agentNetwork"] = this.filterForm.value.Face != null ? [this.filterForm.value.Face] : undefined;
    fillterbody["wallets"] = this.currencyGuids;
    // fillterbody["wallets"] = this.filterForm.value.wallet != null ? [this.filterForm.value.wallet] : undefined;

    if(this.agentExplorer){
      fillterbody["agentIds"] = [this.agentGuid]
    }

    this.Cashierservice.getAgentRevenuePayments(fillterbody).subscribe((res) => { this.AgentRevenueListData(res) })
  }

  AgentRevenueListData(data: any) {
    console.log(data)
    this.revenuedata = data.objectList;
    this.ResultCount = data.resultCount;
    this.rowsOnthePage = data.objectList.length;

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.revenuedata != null) {
      this.loader = false;
    }

    this.playerRevenueSum = this.revenuedata.reduce((a:any,b:any)=> (a + b.revenueFromPlayers.value),0)
    this.agentRevenueSum = this.revenuedata.reduce((a:any,b:any)=> (a + b.revenueFromAgents.value ),0)
    this.totalRevenueSum = this.revenuedata.reduce((a:any,b:any)=> (a + b.totalRevenue.value),0)

    console.log(this.playerRevenueSum, this.agentRevenueSum, this.totalRevenueSum)
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

  navigateToSummary(data:any){
    localStorage.setItem("summaryData",JSON.stringify(data))
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
    XLSX.writeFile(wb, 'AgentRevenuePaymentsExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AgentRevenuePaymentsExcelSheet")
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
