import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { TotalSumsService } from 'src/app/source/total-sums.service';

@Component({
  selector: 'app-transfertoagents',
  templateUrl: './transfertoagents.component.html',
  styleUrls: ['./transfertoagents.component.css']
})
export class TransfertoagentsComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  walletlist: any[] = [];
  TransferData: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  loader: boolean = false;
  TransferDirectionType: any;
  faceParameterslist: any;
  pagecontrolbtn: boolean = false;
  PageCount: number = 0;

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

  TransferType: any = [];
  convertedTypes: any = [];
  dropdownList12Type: any = [];
  dropdownSettingsTypes = {};

  convertedtypes: any = [];
  dropdownTypesList: any = [];
  selecteditemsTypes: any = [];
  dropdownsettingtypes = {};
  typesguid: any = [];
  usertypeList: any;
  totalAmount: any;
  selectedTypeGuid: any;
  location: any;
  agentExplorer: boolean = false;
  agentInfo: any;
  agentGuid: any;
  popupview: boolean = false;
  selectedRowData: any;

  constructor(private Cashierservice: CashierService,private DateTimePipe:DateTimePipe, private AgentcontrolService: AgentControlService,
    private FileformatServiceService: FileformatServiceService, private totalSumService:TotalSumsService) {
    this.filterForm = new FormGroup({ 
       startDate: new FormControl(),
      endDate: new FormControl(),
      wallet: new FormControl(),
      InitiatorLogin: new FormControl(),
      ReferrerLogin: new FormControl(),
      ReferredAgentLogin: new FormControl(),
      Type: new FormControl(),
      AmountFrom: new FormControl(),
      AmountTo: new FormControl(),
      Face: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }

  ngOnInit(): void {
    this.walletlistmethod();
    this.TransferTypes();
    this.faceParameters();
    this. usertype();

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    this.ExplorerCheck()
  }

  ExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
   if (this.location == "/Agentexplorer/AgentTransferstoAgents") {
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
  usertype(){
    let usertype = localStorage.getItem("usertype")
    if(usertype){
      this.usertypeList = JSON.parse(usertype)
    }
    console.log(this.usertypeList)

   
  }
  walletlistmethod() {
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
  TransferTypes() {
    const TransferType = localStorage.getItem("TransferDirectionTypes");
    if (TransferType) {
      this.TransferDirectionType = JSON.parse(TransferType)
    }
    this.convertedtypes =  []
    this.typesguid =  []
    console.log(this.TransferDirectionType)
 
    this.TransferDirectionType.forEach((item: any,i:any) =>{
      this.typesguid.push(item.guid)
      this.convertedtypes[i] = {
        value:this.TransferDirectionType[i].value,
        guid:this.TransferDirectionType[i].guid
      }
    });
    

    console.log(this.convertedtypes); 
    console.log(this.typesguid);
   
    this.dropdownsettingtypes = {
      singleslection : false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unselectAllText: 'unselect All',
      itemsShowlimit:1,
      allowsearchFilter:false,
    };
    this.selecteditemsTypes = this.dropdownTypesList
  }
  // TransferTypes() {
  //   const TransferType = localStorage.getItem("TransferDirectionTypes");
  //   if (TransferType) {
  //     this.TransferDirectionType = JSON.parse(TransferType)
  //   }
  //   console.log("TransferDirectionType", this.TransferDirectionType)
  // }
  // TransferTypes() {
  //   const TransferType = localStorage.getItem("TransferDirectionTypes");
  //   if (TransferType) {
  //     this.TransferDirectionType = JSON.parse(TransferType)
  //   }
  //   this.convertedTypes = []
  //   console.log("TransferDirectionType", this.TransferDirectionType)
  //   this.TransferType.forEach((item: { name: string }) =>{
  //   this.convertedTypes.push(item.name)
  //   });
  //   console.log(this.convertedTypes)
  //   this.dropdownList12Type = this.TransferDirectionType;
  //   console.log(this.dropdownList12Type);
  //   this.dropdownSettingsTypes = {
  //     singleSelection: false,
  //     idField: 'value',
  //     textField: 'value',
  //     selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All',
  //     itemsShowLimit: 1,
  //     allowSearchFilter: false,
  //   }
  // }
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

    this.selectedTypeGuid = this.convertedtypes.map((list:any)=> list.guid)
    console.log(this.filterForm.value)
    this.FillterMenu = false;
    this.loader = true;
    this.TransferData = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    console.log(fillterbody)
    fillterbody["firstRecord"] = (this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    // fillterbody["datePeriod"] = this.filterForm.value.DatePeriodFrom != null ? { "start": this.filterForm.value.DatePeriodFrom, "end": this.filterForm.value.DatePeriodTO } : undefined;
    fillterbody["datePeriod"] =  (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
      "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
      "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    } : undefined
    fillterbody["wallets"] = this.currencyGuids,
    // fillterbody["wallets"] = this.filterForm.value.wallet != null ? [this.filterForm.value.wallet] : undefined;
    fillterbody["inititatorLoginMask"] = this.filterForm.value.InitiatorLogin != null ? this.filterForm.value.InitiatorLogin : undefined; 
    fillterbody["agentLoginMask"] = this.filterForm.value.ReferrerLogin != null ? this.filterForm.value.ReferrerLogin : undefined;
    fillterbody["refAgentLoginMask"] = this.filterForm.value.ReferredAgentLogin != null ? this.filterForm.value.ReferredAgentLogin : undefined;
    fillterbody["agentNetworks"] = this.convertedArray != null ? this.convertedArray : undefined
    // fillterbody["agentNetworks"] = this.filterForm.value.Face != null ? [this.filterForm.value.Face] : undefined;
    fillterbody["transferDirection"] = this.selectedTypeGuid.length == 0 ? this.typesguid : this.selectedTypeGuid
    // fillterbody["transferDirection"] = this.typesguid != null ? this.typesguid : undefined
    // fillterbody["transferDirection"] = this.filterForm.value.Type != null ? [this.filterForm.value.Type] : undefined;
    fillterbody["amountRange"] = this.filterForm.value.AmountFrom != null ? { "low": this.filterForm.value.AmountFrom, "high": this.filterForm.value.AmountTo } : undefined


    if(this.agentExplorer){
      fillterbody['agentIds'] = [this.agentGuid]
    }
    this.Cashierservice.getAgentToAgentTransfers(fillterbody).subscribe((res) => { this.TransferToAgentData(res) })
  }

  TransferToAgentData(data: any) {
    console.log(data)
    this.TransferData = data.objectList;
    this.ResultCount = data.resultCount;
    this.rowsOnthePage = data.objectList.length;

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.TransferData != null) {
      this.loader = false;
    }

    for (let i = 0; i < this.TransferData.length; i++) {
    
      for (let m = 0; m < this.TransferDirectionType.length; m++) {
        if (this.TransferData[i]?.direction?.lowLong == this.TransferDirectionType[m].guid.lowLong) {
          this.TransferData[i].directionName = this.TransferDirectionType[m].value;
          console.log(this.TransferData[i].directionName)
        }
      }
    }
    console.log(this.TransferData)

    this.TransferData?.forEach((transferData:any)=>{
      this.usertypeList.forEach((user:any)=>{
        if(transferData.initiator.type.lowLong == user.guid.lowLong){
          transferData.userType = user.value
        }
      })
    })

    this.totalAmount= this.TransferData.reduce((acc:any, data:any)=>{return (acc+data.amount.value)},0)
    console.log(this.totalAmount)
    if (this.ResultCount <=((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }

  getWalletSymbol(wallet: any) {
    return this.totalSumService.walletSymbol(wallet)
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
    if (this.PageCount > this.TransferData.length) {

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
    if (this.PageCount > this.TransferData.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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
    XLSX.writeFile(wb, 'TransferToAgentExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "TransferToAgentExcelSheet")
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
