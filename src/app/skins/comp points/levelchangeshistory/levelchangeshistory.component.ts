import { Component, OnInit } from '@angular/core';
import { ComppointsService } from 'src/app/source/comppoints.service';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as moment from 'moment';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';


@Component({
  selector: 'app-levelchangeshistory',
  templateUrl: './levelchangeshistory.component.html',
  styleUrls: ['./levelchangeshistory.component.css']
})
export class LevelchangeshistoryComponent implements OnInit {
  filterForm: FormGroup;
  showPro: boolean = false;
  showcheck: boolean = false;
  showBox: boolean = false;
  openPagen: boolean = false;
  openpageBox: boolean = false;
  allcheck: boolean = true;
  Proshow: boolean = false;
  loader: boolean = false;
  levelhistory: any;
  LevelChangeData: any;
  playerlevelChangeStatusList: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  PlayerLevelsNamesList: any;
  PlayerLevelChangeDetails: any;
  PlayerLevelChangeDataPopUp: boolean = false;
  PageCount: any;
  pagecontrolbtn: boolean = false;
  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false


  selectedFillterGames: any;
  gamesTobeSelected: any;
  Levelarray: any = []
  walletlists: any;
  selectedLevel: any = [];
  Levelstatus: any;
  dropdownSettingsLevel = {}
  totalLevel: any = []

  selectedStatus: any = [];
  statusArray: any = []
  totalstatus: any = []
  statusLevel: any = [];
  dropdownSettingStatus = {}
  paginationValidation: boolean =false;
  location: any;
  playerExplorer: boolean=false;
  PlayerguidList: any;


  constructor(private DateTimePipe: DateTimePipe, private comppointsService: ComppointsService, private FileformatServiceService: FileformatServiceService,
    private GamesofpokerService: GamesofpokerService, private CommomfilterService:CommomfilterService,private PlayerserviceService:PlayerServiceService) {
    this.filterForm = new FormGroup({
      // DateStart: new FormControl(),
      // DateEnd: new FormControl(),
      startDate: new FormControl(this.startDate,),
      endDate: new FormControl(this.endDate,),
      // startDate: new FormControl(this.startDate, Validators.required),
      // endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      initiator: new FormControl(),
      PlayerLogin: new FormControl(),
      Level: new FormControl(),
      status: new FormControl(),
      firstRecord: new FormControl(1 ,this.CommomfilterService.requiredAndMinOne()),
      maxCountRecord: new FormControl(100,this.CommomfilterService.requiredAndMinOne())
    })
  }

  ngOnInit(): void {
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    this.playerlevelChangeStatus();
    this.getPlayerLevelsNames();
    let body = {
    }
    this.comppointsService.getCompPointsLevelChangeList(body).subscribe((data) => this.change(data))
    this.playerExplorerCheck()
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/levelchangeshistory") {
      this.playerExplorer = true;
      this.PlayerGuid();
    } else {
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
  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
  }
  change(data: any) {
    // console.log(data)
    // this.levelhistory = data.objectList;
    // console.log(this.levelhistory)
  }
  filterlevel() {
    this.showPro = !this.showPro
    this.showBox = !this.showBox
  }
  levelPage() {
    this.openPagen = !this.openPagen
    this.openpageBox = !this.openpageBox
  }
  showcheckbox() {
    this.allcheck = !this.allcheck
    this.showcheck = !this.showcheck
  }
  show() {
    this.Proshow = !this.Proshow
  }





  playerlevelChangeStatus() {
    this.statusArray = []
    const playerlevelChangeStatus = localStorage.getItem('playerlevelChangeStatus');
    if (playerlevelChangeStatus) {
      this.playerlevelChangeStatusList = JSON.parse(playerlevelChangeStatus)
    }
    console.log("playerlevelChangeStatusList", this.playerlevelChangeStatusList)

    for (let i = 0; i < this.playerlevelChangeStatusList.length; i++) {
      console.log()
      this.selectedStatus[i] = {
        description: this.playerlevelChangeStatusList[i].value,
        guid: this.playerlevelChangeStatusList[i].guid,

      }
    }
    console.log(this.selectedStatus)
    this.selectedStatus.forEach((item: { guid: any; }) => {
      this.statusArray.push(item.guid);
    });
    this.totalstatus = this.statusArray
    this.statusLevel = this.playerlevelChangeStatusList;
    console.log(this.statusLevel);
    this.selectedStatus = this.statusLevel;

    this.dropdownSettingStatus = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
  }

  getPlayerLevelsNames() {
    this.Levelarray = []
    const getPlayerLevelsNames = localStorage.getItem('getPlayerLevelsNames');
    if (getPlayerLevelsNames) {
      this.PlayerLevelsNamesList = JSON.parse(getPlayerLevelsNames)
    }
    console.log(this.PlayerLevelsNamesList.compPointsLevels)
    for (let i = 0; i < this.PlayerLevelsNamesList.compPointsLevels.length; i++) {
      this.selectedLevel[i] = {
        description: this.PlayerLevelsNamesList.compPointsLevels[i].name,
        guid: this.PlayerLevelsNamesList.compPointsLevels[i].guid
      }
    }
    console.log(this.selectedLevel)
    this.selectedLevel.forEach((item: { guid: any; }) => {
      this.Levelarray.push(item.guid);
    });
    this.totalLevel = this.Levelarray
    this.Levelstatus = this.PlayerLevelsNamesList.compPointsLevels;
    console.log(this.Levelstatus);
    this.selectedLevel = this.Levelstatus;

    this.dropdownSettingsLevel = {
      singleSelection: false,
      idField: 'guid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };

  }

  recordsinput(event: any) {

    if (this.filterForm.get('firstRecord')?.errors?.['required'] || this.filterForm.get('maxCountRecord')?.errors?.['required']) {
      this.paginationValidation = true
    } else if (this.filterForm.get('firstRecord')?.errors?.['min'] || this.filterForm.get('maxCountRecord')?.errors?.['min']) {
      this.paginationValidation = true;
    } else {
      this.paginationValidation = false;
    }

  }

  get f() {
    // console.log(this.CreateAdminForm.value.loginName.key)
    this.filterForm.get('firstRecord')?.touched
    return this.filterForm.controls;

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
    return dirtyValues
  }
  // onFormSubmit() {
  // this.FillterMenu = false;
  // this.loader = true;
  // this.playerCompPointsData = false;
  // let fillterbody = this.getDirtyValues(this.filterForm)
  // // let fillterbody = {}
  // this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
  // fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
  // fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
  // fillterbody["types"] = this.filterForm.value.Type != null ? [this.filterForm.value.Type] : undefined
  // fillterbody["wallets"] = this.filterForm.value.currency != null ? [this.filterForm.value.currency] : undefined
  // this.comppointsService.getCompPointsExchanges(fillterbody).subscribe((res) => { this.PlayerComPointsResData(res) })
  // }
  onFormSubmit() {
    let fillterbody = this.getDirtyValues(this.filterForm)

    if (this.filterForm.valid) {
      this.LevelChangeData = false;
      this.loader = true;
      console.log(this.filterForm.value);
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

      // let fillterbody = {
      fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
      fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
      fillterbody// ["status"]: this.filterForm.value.status != null ? [this.filterForm.value.status] : undefined,
      fillterbody["status"] = this.statusArray != null ? this.statusArray : undefined
      fillterbody["levelGuids"] = this.Levelarray != null ? this.Levelarray : undefined
      fillterbody// ["levelGuids"]: this.filterForm.value.Level != null ? [this.filterForm.value.Level] : undefined,
      fillterbody["playerLogin"] = this.filterForm.value.PlayerLogin != null ? this.filterForm.value.PlayerLogin : undefined
      // fillterbody["initiatorLogin"] = this.filterForm.value.initiator != null ? this.filterForm.value.initiator : undefined
      // fillterbody["period"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
      //   (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined

      const { startDate, startTime, endDate, endTime } = this.filterForm.value;
      const startDateTime = startDate ? startDate + "T" + startTime : undefined;
      const endDateTime = endDate ? endDate + "T" + endTime : undefined;
      fillterbody["period"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;

      // ['initiatorIsSystem']: ""
      // entered value as admin goes true, 
      // entered value as system goes false ---> in that case we are not passing  initiatorLogin;

      // if (this.filterForm.value.initiator === true) {
      // fillterbody["initiatorIsSystem"] = this.filterForm.value.initiator.includes('Syes')? true : false
      // }

      if (this.filterForm.value.initiator && typeof this.filterForm.value.initiator === 'string') {
        // fillterbody["initiatorIsSystem"] = this.filterForm.value.initiator.toLowerCase().startsWith('sys');
        fillterbody["initiatorIsSystem"] = this.filterForm.value.initiator.toLowerCase() === "system";
        if(this.filterForm.value.initiator.toLowerCase() === "system"){
        }else{
          fillterbody["initiatorLogin"] = this.filterForm.value.initiator != null ? this.filterForm.value.initiator : undefined
        }
      } else {
        fillterbody["initiatorIsSystem"] = false;
        // fillterbody["initiatorLogin"] = this.filterForm.value.initiator != null ? this.filterForm.value.initiator : undefined
      }
      if (this.playerExplorer) {
        fillterbody["playerGuids"] = [this.PlayerguidList]}
      this.comppointsService.getCompPointsLevelChangeList(fillterbody).subscribe((res) => { this.LevelChangeDataResData(res) })
    }

  }

  LevelChangeDataResData(data: any) {
    // this.loader = false;
    console.log(data)
    this.loader = false;
    this.LevelChangeData = data.objectList;
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.LevelChangeData != null) {
      this.loader = false;
    }
    for (let i = 0; i < this.LevelChangeData.length; i++) {
      for (let j = 0; j < this.playerlevelChangeStatusList.length; j++) {
        if (this.LevelChangeData[i].status.lowLong == this.playerlevelChangeStatusList[j].guid.lowLong) {
          this.LevelChangeData[i].status = this.playerlevelChangeStatusList[j].value
        }
      }
    }

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }


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
    XLSX.writeFile(wb, 'LevelChangeHistoryExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "LevelChangeHistoryExcelSheet")

  }

  onClick(event: any) {
    console.log(event)
    console.log(this.LevelChangeData[event])
    this.PlayerLevelChangeDetails = this.LevelChangeData[event]
    console.log(this.PlayerLevelChangeDetails)
    this.PlayerLevelChangeDataPopUp = true;
  }
  closepopup() {
    this.PlayerLevelChangeDataPopUp = false;
  }

  
  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
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
    if (this.PageCount > this.LevelChangeData.length) {

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
    
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
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
    if (this.PageCount > this.LevelChangeData.length) {
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
  // **************************************************@starts Level dropdown******************************************************

  onItemSelectLevel(data: any) {
    this.Levelarray = []
    this.filterForm.value.Level.forEach((item: { guid: any; }) => {
      this.Levelarray.push(item.guid);
    });
    console.log(this.Levelarray)
  }
  OnItemDeSelectLevel(data: any) {
    this.Levelarray = []
    this.filterForm.value.Level.forEach((item: { guid: any; }) => {
      this.Levelarray.push(item.guid);
    });
    console.log(this.Levelarray)
  }
  onSelectAllLevel(data: any) {
    this.Levelarray = []
    data.forEach((item: { guid: any; }) => {
      this.Levelarray.push(item.guid);
    });
    console.log(this.Levelarray)
  }
  onDeSelectAllLevel(data: any) {
    this.Levelarray = []
    // data.forEach((item: { guid: any; }) => {
    //   this.Levelarray.push(item.guid);
    // });
    this.Levelarray = this.totalLevel
    console.log(this.Levelarray)
  }

  // ****************************************** @Ends Level dropdown**************************************************************

  // **************************************@Starts Status Dropdown****************************************************************************
  onItemSelectStatus(data: any) {
    this.statusArray = []
    this.filterForm.value.status.forEach((item: { guid: any; }) => {
      this.statusArray.push(item.guid);
    });
    console.log(this.statusArray)
  }
  OnItemDeSelectStatus(data: any) {
    this.statusArray = []
    this.filterForm.value.status.forEach((item: { guid: any; }) => {
      this.statusArray.push(item.guid);
    });
    console.log(this.statusArray)
  }
  onSelectAllStatus(data: any) {
    this.statusArray = []
    data.forEach((item: { guid: any; }) => {
      this.statusArray.push(item.guid);
    });
    console.log(this.statusArray)
  }
  onDeSelectAllStatus(data: any) {
    this.statusArray = []
    // data.forEach((item: { guid: any; }) => {
    //   this.Levelarray.push(item.guid);
    // });
    this.statusArray = this.totalstatus
    console.log(this.statusArray)
  }

  // **************************************@Ends Status Dropdown****************************************************************************

}
