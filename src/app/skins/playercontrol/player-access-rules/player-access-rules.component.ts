import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-player-access-rules',
  templateUrl: './player-access-rules.component.html',
  styleUrls: ['./player-access-rules.component.css']
})
export class PlayerAccessRulesComponent implements OnInit {
  listUserAccessRulesdata: any;
  playerStatusList: any;
  UserAccessAreaList: any;
  UserAccessStatusList: any;
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  loader: boolean = false;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  usertypeList: any;
  AccessRulespopup: boolean=false;
  PlayerAccessRules: any;
  PlayerAccessData:any
  playerAccesspop:boolean = false
  actionoptons:boolean=false
  selectinmdex: any;
  activestatus:boolean = false

  selectAreaList : any = [];
  AreaListGuids: any = [];
  CopyAreaListGuids: any =[];
  dropdoenSettingsACcessArea = {};

  selectStatusList: any = [];
  StatusLISTguid: any = [];
  copyStatusLISTguid: any = [];
  dropdownSettingsSTatus = {};

  constructor(private PlayerserviceService: PlayerServiceService,private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      AccessArea: new FormControl(),
      Status: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
    })
  }

  ngOnInit(): void {
    this.palyerstatus();
    this.UserAccessArea();
    this.UserAccessStatus();
    this.usertype()
    // let body = {}
    // this.PlayerserviceService.listUserAccessRules(body).subscribe((res) => this.UserAccessRulesResData(res))
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  palyerstatus() {
    const playerstatus = localStorage.getItem('palyerstatus')
    if (playerstatus) {
      this.playerStatusList = JSON.parse(playerstatus)
    }
    console.log("playerStatusList", this.playerStatusList)
  }

  UserAccessArea() {
    const UserAccessArea = localStorage.getItem('UserAccessArea')
    if (UserAccessArea) {
      this.UserAccessAreaList = JSON.parse(UserAccessArea)
      console.log("UserAccessAreaList", this.UserAccessAreaList)

      for (let i = 0; i< this.UserAccessAreaList.length; i++){
        this.selectAreaList[i]={
          value: this.UserAccessAreaList[i].value,
          guid:this.UserAccessAreaList[i].guid
        }
      }
      console.log(this.selectAreaList)
      this.selectAreaList.forEach((item:{ guid: any;})=>{
        this.AreaListGuids.push(item.guid)
      });
      this.CopyAreaListGuids = this.AreaListGuids
      console.log(this.AreaListGuids)

      this.dropdoenSettingsACcessArea ={
        singleSelection: false,
        idField: 'guid',
        textField: 'value',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',  
        itemsShowLimit: 1,
        allowSearchFilter: false
      }
    }
  }
  
  UserAccessStatus() {
    const UserAccessStatus = localStorage.getItem('UserAccessStatus')
    if (UserAccessStatus) {
      this.UserAccessStatusList = JSON.parse(UserAccessStatus)
      console.log("UserAccessStatusList", this.UserAccessStatusList)

   for (let i =0; i< this.UserAccessStatusList.length;i++){
    this.selectStatusList[i] = {
      value: this.UserAccessStatusList[i].Value,
      guid: this.UserAccessStatusList[i].guid
    } 
   }
   console.log(this.selectStatusList)
   this.selectStatusList.forEach((item: { guid: any;}) =>{
    this.StatusLISTguid.push( item . guid)
  });
  this.copyStatusLISTguid  = this.StatusLISTguid
  console.log(this.StatusLISTguid)

  this.dropdownSettingsSTatus ={
    singleSelection: false,
    idField: 'guid',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: false
  }
    }
  }

  usertype(){
    const usertype = localStorage.getItem('usertype')
    if(usertype){
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertypeList", this.usertypeList)
    console.log("usertypeList", this.usertypeList[0].guid)
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
    console.log(this.filterForm.value)
    this.loader = true;
    this.listUserAccessRulesdata = false;
    this.FillterMenu = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["userType"] = this.usertypeList[0].guid
    fillterbody["accessAreas"] = this.AreaListGuids;
    // fillterbody["accessAreas"] = this.filterForm.value.AccessArea != null ? [this.filterForm.value.AccessArea] : undefined;
    fillterbody["statuses"] = this.StatusLISTguid;
    // fillterbody["statuses"] = this.filterForm.value.Status != null ? [this.filterForm.value.Status] : undefined;

    this.PlayerserviceService.listUserAccessRules(fillterbody).subscribe((res) => this.UserAccessRulesResData(res))
  }

  UserAccessRulesResData(res: any) {
    console.log(res)
    this.listUserAccessRulesdata = res.objectList
    this.rowsOnthePage = res.objectList.length;
    this.ResultCount = res.resultCount;

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.listUserAccessRulesdata != null) {
      this.loader = false;
    }
    for (let i = 0; i < this.listUserAccessRulesdata.length; i++) {
      for (let m = 0; m < this.UserAccessStatusList.length; m++) {
        if (this.listUserAccessRulesdata[i].status.lowLong == this.UserAccessStatusList[m].guid.lowLong) {
          this.listUserAccessRulesdata[i].status = this.UserAccessStatusList[m].value
          // console.log(this.listUserAccessRulesdata[i].status)
        }
      }
      for (let n = 0; n < this.UserAccessAreaList.length; n++) {
        if (this.listUserAccessRulesdata[i].accessArea.lowLong == this.UserAccessAreaList[n].guid.lowLong) {
          this.listUserAccessRulesdata[i].accessAreaName = this.UserAccessAreaList[n].value
        }
      }
    }
  }
  onclick(data:any){
    console.log(data);
    this.PlayerAccessRules =this.listUserAccessRulesdata[data]
    console.log(this.PlayerAccessRules);
    this.AccessRulespopup=true
  }
  closepopup(){
    this.AccessRulespopup=false
    this.playerAccesspop = false
    this.actionoptons = !this.actionoptons  
  }
  getUserAccessRules12(data:any){
    // this.playerAccesspop = true
  
    // this.PlayerAccessData =  {
    //   "name": "test Edit ",
    //   "userType": {
    //     "hiLong": 0,
    //     "lowLong":0
    //   },
    //   "accessArea": {
    //     "hiLong": 0,
    //     "lowLong": 11
    //   },
    //   "status": {
    //     "hiLong": 0,
    //     "lowLong": 1
    //   },
    //   // "ruleCode": "UserIp.does_not_equal(\"127.0.0.2\") default false",
    //   "ruleCode": "(UserLoginName.does_not_equal(\"test01\") default false)and(UserIpCountry.does_not_equal(\"AS\") default false)and(UserIp.does_not_equal(\"10.10.10.10\") default false)",
    //   "denialMessages": [
    //     {
    //       "language": {
    //         "hiLong": 0,
    //         "lowLong": 17742
    //       },
    //       "text": "Access Denied."
    //     }
    //   ],
    //   "guid": {
    //     "hiLong": 1,
    //     "lowLong": 1980
    //   },
      
    //   "objState": 0
    // }
    console.log(data.guid)
    let body ={
        "idList":[
          data.guid
        //   {
        //     "hiLong":1873,
        //   "lowLong" :93284 
        // }
        ]
    }
    this.PlayerserviceService.getUserAccessRules(body).subscribe(data=>{console.log(data) , this.palyeraccesruleEdit12(data)
     
    })
    console.log(this.PlayerAccessData)
    
  }
  palyeraccesruleEdit12(data:any){
    this.PlayerAccessData = data.objectList[0]
    console.log( data.objectList[0])
    console.log(this.PlayerAccessData)
    this.playerAccesspop = true
  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'PlayerAccessRulesExcelSheet.xlsx'); 
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerAccessRulesExcelSheet")
  }

  showpopactions(data:any,i:any){
    this.actionoptons = !this.actionoptons
    this.selectinmdex = i
    console.log(data)
    if(data.status  == "Active"){
      this.activestatus = true
    }else{
      this.activestatus = false
    }
  }
  satatuschange(data:any,i:any){

    let body={
      ruleGuid: data.guid ,
      active: true
    }
    this.PlayerserviceService.ActiveAccessRule(body).subscribe((res: any) =>{this.changeactiveres(res) })
  }
  changeactiveres(res:any){

if(res.changedObjectList){
  this.onFormSubmit()
  this.actionoptons= false
}
  //   this.listUserAccessRulesdata = res.changedObjectList
  //   this.rowsOnthePage = res.changedObjectList.length;
  //   this.ResultCount = res.resultCount;

  //   if (this.ResultCount !== null) {
  //     this.resultcount = false;
  //   }
  //   if (this.listUserAccessRulesdata != null) {
  //     this.loader = false;
  //   }
  //   for (let i = 0; i < this.listUserAccessRulesdata.length; i++) {
  //     for (let m = 0; m < this.UserAccessStatusList.length; m++) {
  //       if (this.listUserAccessRulesdata[i].status.lowLong == this.UserAccessStatusList[m].guid.lowLong) {
  //         this.listUserAccessRulesdata[i].status = this.UserAccessStatusList[m].value
  //         // console.log(this.listUserAccessRulesdata[i].status)
  //       }
  //     }
  //     for (let n = 0; n < this.UserAccessAreaList.length; n++) {
  //       if (this.listUserAccessRulesdata[i].accessArea.lowLong == this.UserAccessAreaList[n].guid.lowLong) {
  //         this.listUserAccessRulesdata[i].accessAreaName = this.UserAccessAreaList[n].value
  //       }
  //     }
  //   }
  }

   //  ************************************* @AccessAreA Dropdown Starts*********************************
   onItemSelectAccessAreA(data: any) {
  this.AreaListGuids = []
  this.filterForm.value.AccessArea.forEach((item: { guid: any; }) => {
    this.AreaListGuids.push(item.guid);
  });
  console.log(this.AreaListGuids)
}
OnItemDeSelectAccessAreA(data: any) {
  this.AreaListGuids = []
  this.filterForm.value.AccessArea.forEach((item: { guid: any; }) => {
    this.AreaListGuids.push(item.guid);
  });
  console.log(this.AreaListGuids)
  if (this.AreaListGuids === null || this.AreaListGuids.length === 0) {
    console.log("Empty");
    this.AreaListGuids = this.CopyAreaListGuids
  }
}
onSelectAllAccessAreA(data: any) {
  this.AreaListGuids = []
  data.forEach((item: { guid: any; }) => {
    this.AreaListGuids.push(item.guid);
  });
  console.log(this.AreaListGuids)
}
onDeSelectAllAccessAreA(data: any) {
  this.AreaListGuids = []
  this.AreaListGuids = this.CopyAreaListGuids
  console.log(this.AreaListGuids)
}
//  ************************************* @ AccessAreA Dropdown ends****""""""""""""""""
   //  ************************************* @ Access Status  Dropdown Starts*********************************
   onItemSelectSTatus(data: any) {
  this.StatusLISTguid = []
  this.filterForm.value.Status.forEach((item: { guid: any; }) => {
    this.StatusLISTguid.push(item.guid);
  });
  console.log(this.StatusLISTguid)
}
OnItemDeSelectSTatus(data: any) {
  this.StatusLISTguid = []
  this.filterForm.value.Status.forEach((item: { guid: any; }) => {
    this.StatusLISTguid.push(item.guid);
  });
  console.log(this.StatusLISTguid)
  if (this.StatusLISTguid === null || this.StatusLISTguid.length === 0) {
    console.log("Empty");
    this.StatusLISTguid = this.copyStatusLISTguid
  }
}
onSelectAllSTatus(data: any) {
  this.StatusLISTguid = []
  data.forEach((item: { guid: any; }) => {
    this.StatusLISTguid.push(item.guid);
  });
  console.log(this.StatusLISTguid)
}
onDeSelectAllSTatus(data: any) {
  this.StatusLISTguid = []
  this.StatusLISTguid = this.copyStatusLISTguid
  console.log(this.StatusLISTguid)
}
//  ************************************* @ Access Status Dropdown ends****""""""""""""""""
}
  