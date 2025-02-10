import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';


@Component({
  selector: 'app-agentlist',
  templateUrl: './agentlist.component.html',
  styleUrls: ['./agentlist.component.css']
})
export class AgentlistComponent implements OnInit {
  filterForm: FormGroup;
  FillterMenu: boolean = false;
  Agentslist: any;
  walletlist: any[] = [];
  walletlists: any = [];
  Agentstatus: any = [];
  faceParameterslist: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  loader: boolean = false;
  signupDate: Date = new Date();
  Agentdetailspopup: boolean = false;
  Agentsfulldetails: any;
  obj: any;
  balance: any;
  revenueFromPlayers: any;
  revenueFromAgents: any;
  revenueAdjustments: any;
  netRevenue: any;
  AgentStatusId: any;
  SeletedIconIndex: any;
  popupArrow: boolean = false;
  ChangePermissionspopup: boolean = false;
  subAgentCheckbox: boolean = false;
  AgentGuid: any;
  SeletedPermissionGroup: any;
  AgentPermissionGroupList: any;
  usertypeList: any;

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
  // walletlist: any[] = [];
  currencyList: any = [];
  selectedcurrency: any = [];
  currencyGuids: any = [];
  CopyCurrencyTotalGuids: any = [];
  wallettypelist: any = [];

  convertedArray: string[] = [];
  faceconvertedarray: string[] = [];
  faceParameterslist12: any;
  dropdownList12: any = [];
  dropdownSettings = {};
  selectedItems12: any = [];

  selectAgentstatus: any = [];
  AgentStatusGuid: any = [];
  CopyAgentstatusGuids: any = [];
  dropdownSettingsStatus = {};



  constructor(private DateTimePipe: DateTimePipe, private AgentcontrolService: AgentControlService, private router: Router, private CommomfilterService: CommomfilterService,
    private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      wallet: new FormControl(),

      Agentlogin: new FormControl(),
      Email: new FormControl(),
      Status: new FormControl(),
      FirstName: new FormControl(),
      lastName: new FormControl(),
      BalanceStart: new FormControl(),
      BalanceEnd: new FormControl(),
      ReferredPlayersfrom: new FormControl(),
      ReferredPlayersto: new FormControl(),
      ReferredAgentsfrom: new FormControl(),
      ReferredAgentsto: new FormControl(),
      RevenueFromPlayersfrom: new FormControl(),
      RevenueFromPlayersto: new FormControl(),
      RevenueFromAgentsform: new FormControl(),
      RevenueFromAgentsto: new FormControl(),
      IpAddress: new FormControl(),
      Face: new FormControl(),
      PermissionGroups: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      currencywallet: new FormControl(),
    })
  }

  ngOnInit(): void {
    // this.walletlistmethod();
    this.walletTypes();
    this.Agentsstatus();
    this.faceParameters()
    this.usertype()


    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
  }

  changeSelect(date: string): any {
    // if(date != undefined){

    let c = this.DateTimePipe.transforminingDispalyDate(date);
    return (c)
    // }



  }



  // walletlistmethod() {
  //   console.log("walletlist", this.walletlist)
  //   const wallets = localStorage.getItem('walletlist');
  //   if (wallets) {
  //     this.walletlist = JSON.parse(wallets);
  //     for (let i = 0; i < this.walletlist.length; i++) {
  //       this.walletlists.push(this.walletlist[i])
  //     }
  //   }
  //   console.log(this.walletlist)
  //   console.log(this.walletlists.value)
  // }

  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips") {
        if (this.wallettypelist[i].faceWallet == true || this.wallettypelist[i].tournamentWallet == true) {
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

  Agentsstatus() {
    const playerstatus = localStorage.getItem('Agentstatus')
    if (playerstatus) {
      this.Agentstatus = JSON.parse(playerstatus)
      console.log("Agentstatus", this.Agentstatus)

      for (let i = 0; i < this.Agentstatus.length; i++) {
        this.selectAgentstatus[i] = {
          value: this.Agentstatus[i].value,
          guid: this.Agentstatus[i].guid
        }
      }
      console.log(this.selectAgentstatus)
      this.selectAgentstatus.forEach((item: { guid: any; }) => {
        this.AgentStatusGuid.push(item.guid);
      });
      this.CopyAgentstatusGuids = this.Agentstatus
      console.log(this.Agentstatus)

      this.dropdownSettingsStatus = {
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
  faceParameters() {
    this.convertedArray = []
    this.faceconvertedarray = []
    this.faceParameterslist12 = this.CommomfilterService.selectallst();
    console.log(this.faceParameterslist12);
    this.faceParameterslist12.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
      this.faceconvertedarray.push(item.name);
    });

    console.log(this.convertedArray);
    this.dropdownList12 = this.faceParameterslist12;
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

  usertype() {
    const usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertypeList", this.usertypeList)
    console.log("usertypeList", this.usertypeList[3].guid)
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
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
    this.Agentslist = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)
    fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1)
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    // fillterbody["wallet"] = this.filterForm.value.currencywallet != null ? this.filterForm.value.currencywallet : undefined // not working ...
    fillterbody["wallet"] = this.currencyGuids != null ? this.currencyGuids[0] : undefined;
    // fillterbody["wallet"] = this.currencyarray != null ? this.currencyarray : undefined;

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["signupDate"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;

    // fillterbody["signupDate"] = this.filterForm.value.reportingPeriodTo != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined
    fillterbody["agentLogin"] = this.filterForm.value.Agentlogin != null ? this.filterForm.value.Agentlogin : undefined
    fillterbody["agentEmail"] = this.filterForm.value.Email != null ? this.filterForm.value.Email : undefined
    // fillterbody["agentStatuses"] = this.filterForm.value.Status != null ? this.filterForm.value.Status : undefined // Dont know how to send
    fillterbody["status"] = this.AgentStatusGuid
    // fillterbody["status"] = this.filterForm.value.Status != null ? [this.filterForm.value.Status] : undefined // Dont know how to send
    fillterbody["agentFirstName"] = this.filterForm.value.FirstName != null ? this.filterForm.value.FirstName : undefined
    fillterbody["agentLastName"] = this.filterForm.value.lastName != null ? this.filterForm.value.lastName : undefined
    fillterbody["balance"] = this.filterForm.value.BalanceStart != null ? { "low": this.filterForm.value.BalanceStart, "high": this.filterForm.value.BalanceEnd } : undefined
    fillterbody["referredPlayers"] = this.filterForm.value.ReferredPlayersfrom != null ? { "low": this.filterForm.value.ReferredPlayersfrom, "high": this.filterForm.value.ReferredPlayersto } : undefined
    fillterbody["referredAgents"] = this.filterForm.value.ReferredAgentsfrom != null ? { "low": this.filterForm.value.ReferredAgentsfrom, "high": this.filterForm.value.ReferredAgentsto } : undefined
    fillterbody["revenueFromPlayers"] = this.filterForm.value.RevenueFromPlayersfrom != null ? { "low": this.filterForm.value.RevenueFromPlayersfrom, "high": this.filterForm.value.RevenueFromPlayersto } : undefined
    fillterbody["revenueFromAgents"] = this.filterForm.value.RevenueFromAgentsform != null ? { "low": this.filterForm.value.RevenueFromAgentsform, "high": this.filterForm.value.RevenueFromAgentsto } : undefined
    fillterbody["loginIpAddress"] = this.filterForm.value.IpAddress != null ? this.filterForm.value.IpAddress : undefined  // not Working 
    // fillterbody["agentNetwork"] = this.filterForm.value.Face != null ? [this.filterForm.value.Face] : undefined
    fillterbody["agentNetwork"] = this.convertedArray != null ? this.convertedArray : undefined;
    fillterbody["permissionsGroup"] = this.filterForm.value.PermissionGroups != null ? this.filterForm.value.PermissionGroups : undefined

    this.AgentcontrolService.AgentsList(fillterbody).subscribe((res) => { this.getSuspiciousListData(res) })

  }
  getSuspiciousListData(data: any) {
    console.log(data)
    this.Agentslist = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount
    console.log(this.Agentslist.signupDate)
    this.findsum(this.Agentslist)

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.Agentslist != null) {
      this.loader = false;
    }

    for (let i = 0; i < this.Agentslist.length; i++) {
      console.log(this.Agentslist[i].signupDate)
      this.signupDate = this.Agentslist[i].signupDate
      console.log(this.signupDate)
      // let dateFormmat = new Date(this.signupDate)
      // console.log( dateFormmat )

      for (let m = 0; m < this.Agentstatus.length; m++) {
        //console.log(this.Agentslist[i].agent.status )
        // console.log(this.Agentslist[i].agent.status.lowLong )
        //console.log(this.playerStatusList[m].guid.lowLong )
        if (this.Agentslist[i].agent.status.lowLong == this.Agentstatus[m].guid.lowLong) {
          this.Agentslist[i].agent.status = this.Agentstatus[m].value
          console.log(this.Agentslist[i].agent.status)
        }
      }
    }
  }
  onClick(data: any) {
    console.log(data)
    this.Agentsfulldetails = this.Agentslist[data]
    console.log(this.Agentsfulldetails)
    this.Agentdetailspopup = true;
    // const input = document.getElementById('AgentExplore') 
    // if (input) {
    //   this.router.navigate(['/Agentexplorer']);
    // }
  }
  closepopup() {
    this.Agentdetailspopup = false;
  }
  AgentExplore(name: any, guid: any, agentInfo: any) {

    this.AgentcontrolService.agentExplore(name, guid, agentInfo)
  }

  findsum(data: any) {
    console.log(data)
    this.obj = data
    if (this.obj) {
      this.balance = this.obj.reduce((a: any, b: { balance: any; }) => (a + b.balance.value), 0);
      console.log(this.balance)
      this.revenueFromPlayers = this.obj.reduce((a: any, b: { revenueFromPlayers: any; }) => (a + b.revenueFromPlayers.value), 0);
      console.log(this.revenueFromPlayers)
      this.revenueFromAgents = this.obj.reduce((a: any, b: { revenueFromAgents: any; }) => (a + b.revenueFromAgents.value), 0);
      console.log(this.revenueFromAgents)
      this.revenueAdjustments = this.obj.reduce((a: any, b: { revenueAdjustments: any; }) => (a + b.revenueAdjustments.value), 0);
      console.log(this.revenueAdjustments)
      this.netRevenue = this.obj.reduce((a: any, b: { netRevenue: any; }) => (a + b.netRevenue.value), 0);
      console.log(this.netRevenue)
    }
  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlayerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'AgentslistExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerBalanceExeclSheet")
  }
  lockUnlock(i: any, Status: any) {
    console.log(i);
    console.log(Status);
    console.log(this.Agentslist[i].agent.guid)
    this.loader = true
    if (Status == 'lock') {
      this.AgentStatusId = this.Agentstatus[1].guid
    } else if (Status == 'UnLock') {
      this.AgentStatusId = this.Agentstatus[0].guid
    }
    let body = {
      "agentGuids": { "idList": [this.Agentslist[i].agent.guid] },
      "statusGuid": this.AgentStatusId
    }
    console.log(body)
    this.AgentcontrolService.setAgentStatus(body).subscribe((res) => {
      console.log(res)
      if (res) {
        this.loader = false
        let fillterbody = this.getDirtyValues(this.filterForm)
        console.log(fillterbody)
        fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1)
        fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
        this.AgentcontrolService.AgentsList(fillterbody).subscribe((res) => { this.getSuspiciousListData(res) })

      }
    })
  }
  UnLock(i: any) {

  }
  showmanu(index: any, guid: any) {
    console.log(index)
    console.log(guid)
    this.AgentGuid = guid
    this.popupArrow = !this.popupArrow;
    this.SeletedIconIndex = index;
  }
  setPlayerActions(type: any, index: any) {
    console.log(type)
    console.log(index)
    this.popupArrow = false;
    if (type == "ChangePermissionGroup") {
      this.ChangePermissionspopup = true;
      this.subAgentCheckbox = false
      let body = {
        "userType": this.usertypeList[3].guid,
      }
      this.AgentcontrolService.listUserPermissionsGroup(body).subscribe((res) => {
        console.log(res)
        this.AgentPermissionGroupList = res.objectList;
        this.SeletedPermissionGroup = this.AgentPermissionGroupList[0].guid
      })
    }
  }
  Permissionspopupclose(action: any) {
    this.ChangePermissionspopup = false;
    if (action == "yes") {
      let body = {
        "ids": {
          "idList": [this.AgentGuid],
          "maxCountRecord": 100,
          "firstRecord": 0,
          "queryId": ""
        },
        "groupGuid": this.SeletedPermissionGroup,
        "withAllSubAgents": this.subAgentCheckbox
      }

      this.AgentcontrolService.changeAgentsPermissionsGroup(body).subscribe((res) => {
        if (res.changedObjectList) {
          this.loader = false
          let fillterbody = this.getDirtyValues(this.filterForm)
          console.log(fillterbody)
          fillterbody["wallet"] = this.currencyGuids != null ? this.currencyGuids[0] : undefined;
          fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1)
          fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
          this.AgentcontrolService.AgentsList(fillterbody).subscribe((res) => { this.getSuspiciousListData(res) })
        }
      })
    }
  }
  inputCheckchange(event: any) {
    this.subAgentCheckbox = event.target.checked

  }

  FormReset() {
    this.filterForm.reset();
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

  // ********************** currency (onselect) ********************
  onItemSelectcurrency(data: any) {
    this.currencyGuids = []
    this.filterForm.value.currencywallet.forEach((item: { guid: any; }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids)
  }

  OnItemDeSelectcurrency(data: any) {
    this.currencyGuids = []
    this.filterForm.value.currencywallet.forEach((item: { guid: any; }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids)
    if (this.currencyGuids === null || this.currencyGuids.length === 0) {
      console.log("Empty");
      this.currencyGuids = this.CopyCurrencyTotalGuids
    }
    console.log(this.currencyGuids)

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
    // this.currencyGuids = this.CopyCurrencyTotalGuids
    // data.forEach((item: { guid: any; }) => {
    //   this.playerstatusaaray.push(item.guid);
    // });
    console.log(this.currencyGuids)
  }

  // **********************************@starts Dropdown Face*********************************************************
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
    if (this.convertedArray === null || this.convertedArray.length === 0) {
      console.log("Empty");
      this.convertedArray = this.faceconvertedarray
    }
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
    // data.forEach((item: { name: string }) => {
    //   this.convertedArray.push(item.name);
    // });
    this.convertedArray = this.faceconvertedarray
    console.log(this.convertedArray);
  }

  // **************************************** @Ends Dropdown Face**************************************************************************

  //  ************************************* @types Dropdown Starts*********************************
  onItemSelectsTATus(data: any) {
    this.AgentStatusGuid = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.AgentStatusGuid.push(item.guid);
    });
    console.log(this.AgentStatusGuid)
  }
  OnItemDeSelectsTATus(data: any) {
    this.AgentStatusGuid = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.AgentStatusGuid.push(item.guid);
    });
    console.log(this.AgentStatusGuid)
    if (this.AgentStatusGuid === null || this.AgentStatusGuid.length === 0) {
      console.log("Empty");
      this.AgentStatusGuid = this.CopyAgentstatusGuids
    }
  }
  onSelectAllsTATus(data: any) {
    this.AgentStatusGuid = []
    data.forEach((item: { guid: any; }) => {
      this.AgentStatusGuid.push(item.guid);
    });
    console.log(this.AgentStatusGuid)
  }
  onDeSelectAllsTATus(data: any) {
    this.AgentStatusGuid = []
    this.AgentStatusGuid = this.CopyAgentstatusGuids
    console.log(this.AgentStatusGuid)
  }
  //  ************************************* @types Dropdown ends****""""""""""""""""
}
