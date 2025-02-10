import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { PromotionalServiceService } from 'src/app/source/promotional-service.service';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-periodicalpromotions-list',
  templateUrl: './periodicalpromotions-list.component.html',
  styleUrls: ['./periodicalpromotions-list.component.css']
})
export class PeriodicalpromotionsListComponent implements OnInit {
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  loader: boolean = false;
  filterForm: FormGroup;
  FillterMenu: boolean = false;
  periodcalPromotionList: any;
  LeaderBoardStatusList: any;
  LeaderBoardPayoutStateList: any;
  LeaderBoardTypeList: any;
  LeaderBoardSettingPeriodList: any;

  typeDropdownSettings: any = {};
  selectedLeaderBoardType: any = [];
  LeaderBoardTypeListCopy: any = [];

  statusDropdownSettings: any = {}
  selectedLeaderBoardStatusValue: any = []
  LeaderBoardStatusListCopy: any;

  scheduleDropdownSettings: any = {}
  selectedScheduleValue: any = []
  LeaderBoardSettingPeriodListCopy: any;

  PlayerStateDropdownSettings: any = {}
  selectedPlayerStateValue: any = []
  LeaderBoardPayoutStateListCopy: any = []

  startDate: any;
  endDate: any;
  todaydate: any;
  steddate: boolean = false;
  timeerror: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"

  constructor(private PromotionalServiceService: PromotionalServiceService, private FileformatServiceService: FileformatServiceService) {
    this.date()
    this.filterForm = new FormGroup({
      ActiveOnFrom: new FormControl(),
      ActiveOnTo: new FormControl(),
      PromotionalName: new FormControl(),
      PromotionalType: new FormControl(),
      Schedule: new FormControl(),
      PlayerLogin: new FormControl(),
      PlayerState: new FormControl(),
      startDate: new FormControl(),
      startTime: new FormControl(),
      Status: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }

  ngOnInit(): void {
    this.LeaderBoardStatus();
    this.LeaderBoardPayoutState();
    this.LeaderBoardType();
    this.LeaderBoardSettingPeriod();
  }

  date() {
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    // this.startDate = datee;
    // this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    this.filterForm?.patchValue({
      startTime: this.startTime,
      startDate: this.startDate,
      endDate: this.endDate,
      endTime: this.endTime
    })
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
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  LeaderBoardType() {
    const LeaderBoardType = localStorage.getItem("LeaderBoardType")
    if (LeaderBoardType) {
      this.LeaderBoardTypeList = JSON.parse(LeaderBoardType)
      console.log("LeaderBoardTypeList", this.LeaderBoardTypeList)
    }

    this.LeaderBoardTypeListCopy = this.LeaderBoardTypeList.map((type: any) => {
      let { guid, value, ...rest } = type
      return { guid, value }
      // return {guid:type.guid,value:type.value}
    })

    this.selectedLeaderBoardType = this.LeaderBoardTypeListCopy
    console.log(this.selectedLeaderBoardType)

    this.typeDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
  }
  LeaderBoardSettingPeriod() {
    const LeaderBoardSettingPeriod = localStorage.getItem("LeaderBoardSettingPeriod");
    if (LeaderBoardSettingPeriod) {
      this.LeaderBoardSettingPeriodList = JSON.parse(LeaderBoardSettingPeriod)
      console.log("LeaderBoardSettingPeriodlist", this.LeaderBoardSettingPeriodList)
    }

    this.LeaderBoardSettingPeriodListCopy = this.LeaderBoardSettingPeriodList.map((schedule: any) => {
      let { guid, value, ...rest } = schedule
      return { guid, value }
      // return {guid:type.guid,value:type.value}
    })

    this.selectedScheduleValue = this.LeaderBoardSettingPeriodListCopy

    this.scheduleDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    }

  }
  LeaderBoardStatus() {
    const LeaderBoardStatus = localStorage.getItem("LeaderBoardStatus");
    if (LeaderBoardStatus) {
      this.LeaderBoardStatusList = JSON.parse(LeaderBoardStatus);
      console.log("LeaderBoardStatusList", this.LeaderBoardStatusList)

    }

    this.LeaderBoardStatusListCopy = this.LeaderBoardStatusList.map((status: any) => {
      let { guid, value, ...rest } = status
      return { guid, value }
      // return {guid:type.guid,value:type.value}
    })

    this.selectedLeaderBoardStatusValue = this.LeaderBoardStatusListCopy

    this.statusDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    }
  }
  LeaderBoardPayoutState() {
    const LeaderBoardPayoutState = localStorage.getItem("LeaderBoardPayoutState");
    if (LeaderBoardPayoutState) {
      this.LeaderBoardPayoutStateList = JSON.parse(LeaderBoardPayoutState)
      console.log(this.LeaderBoardPayoutStateList)
    }

    this.LeaderBoardPayoutStateListCopy = this.LeaderBoardPayoutStateList.map((status: any) => {
      let { guid, value, ...rest } = status;
      return { guid, value };
      // return {guid:type.guid,value:type.value}
    })

    this.selectedPlayerStateValue = this.LeaderBoardPayoutStateListCopy;

    this.PlayerStateDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    }
  }
  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls).forEach(key => {
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
  onFormSubmit() {

    let LeaderBoardType = this.selectedLeaderBoardType.map((type: any) => { return type.guid })
    let LeaderBoardStatusValue = this.selectedLeaderBoardStatusValue.map((status: any) => status.guid)
    let ScheduleValue = this.selectedScheduleValue.map((schedule: any) => schedule.guid)
    let PlayerStateValue = this.selectedPlayerStateValue.map((state: any) => state.guid)
    this.loader = true;
    this.periodcalPromotionList = false;


    this.getDirtyValues(this.filterForm)
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)
    let playerLogin = this.filterForm.value.PlayerLogin;
    let promotionalName = this.filterForm.value.PromotionalName;
    // this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)


    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    // fillterbody["name"] = this.filterForm.value.PromotionalName!=null ?this.filterForm.value.PromotionalName:undefined;
    fillterbody["name"] = (promotionalName === "" || promotionalName == null) ? undefined : promotionalName;
    fillterbody["leaderboardTypes"] = LeaderBoardType;

    const startDateTime = this.startDate ? this.startDate + "T" + this.startTime : undefined;
    fillterbody["activeOn"] = startDateTime;
    fillterbody["payoutStates"] = PlayerStateValue;
    fillterbody["schedules"] = ScheduleValue;
    fillterbody["status"] = LeaderBoardStatusValue;
    // fillterbody["userLoginMask"] = this.filterForm.value.PlayerLogin != null ? this.filterForm.value.PlayerLogin : undefined
    // fillterbody["userLoginMask"] = this.filterForm.value.PlayerLogin ?? undefined;
    fillterbody["userLoginMask"] = (playerLogin === "" || playerLogin == null) ? undefined : playerLogin;


    // let body = {
    //   activeOn: '',
    //   "name": "",
    //   "leaderboardTypes": "",
    //   "payoutStates": "",
    //   "schedules": "",
    //   "status": "",
    //   "userLoginMask": "",
    // }
    this.PromotionalServiceService.getLeaderboardsList(fillterbody).subscribe((data) => this.periodcalPromotionListData(data))
  }
  periodcalPromotionListData(res: any) {
    console.log(res)
    this.periodcalPromotionList = res.objectList;
    this.rowsOnthePage = res.objectList.length;
    this.ResultCount = res.resultCount
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
    XLSX.writeFile(wb, 'periodcalPromotionsListExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "PokerGameSessionsExcelSheet")
  }

  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Promotion type dropdown &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  onItemSelect(data: any) {
    console.log(this.selectedLeaderBoardType)
  }

  OnItemDeSelect(data: any) {
    if (this.selectedLeaderBoardType.length == 0) {
      this.selectedLeaderBoardType = this.LeaderBoardTypeListCopy
    }
    console.log(this.selectedLeaderBoardType)

  }

  onSelectAll(data: any) {
    // console.log(data)
    this.selectedLeaderBoardType = [...data]
    console.log(this.selectedLeaderBoardType)

  }

  onDeSelectAll(data: any) {
    // console.log(data)
    this.selectedLeaderBoardType = this.LeaderBoardTypeListCopy
    console.log(this.selectedLeaderBoardType)

  }


  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  status dropdown &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  onStatusItemSelect(data: any) {
    console.log(this.selectedLeaderBoardStatusValue)
  }

  OnStatusItemDeSelect(data: any) {
    if (this.selectedLeaderBoardStatusValue.length == 0) {
      this.selectedLeaderBoardStatusValue = this.LeaderBoardStatusListCopy
    }
    console.log(this.selectedLeaderBoardStatusValue)
  }

  onSelectAllStatus(data: any) {
    this.selectedLeaderBoardStatusValue = [...data]
    console.log(this.selectedLeaderBoardStatusValue)
  }

  onDeSelectAllStatus(data: any) {
    console.log(this.selectedLeaderBoardStatusValue)
    this.selectedLeaderBoardStatusValue = this.LeaderBoardStatusListCopy
  }
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Promotion schedule dropdown &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  onScheduleItemSelect(data: any) {
    console.log(this.selectedScheduleValue)
  }
  OnScheduleItemDeSelect(data: any) {
    if (this.selectedScheduleValue.length == 0) {
      this.selectedScheduleValue = this.LeaderBoardSettingPeriodListCopy
    }
    console.log(this.selectedScheduleValue)

  }
  onSelectAllSchedule(data: any) {
    this.selectedScheduleValue = [...data]
    console.log(this.selectedScheduleValue)

  }
  onDeSelectAllSchedule(data: any) {
    this.selectedScheduleValue = this.LeaderBoardSettingPeriodListCopy
    console.log(this.selectedScheduleValue)

  }

  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Player state dropdown &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  onPlayerStateItemSelect(data: any) {
    console.log(this.selectedPlayerStateValue)
  }
  OnPlayerStateItemDeSelect(data: any) {
    if (this.selectedPlayerStateValue.length == 0) {
      this.selectedPlayerStateValue = this.LeaderBoardPayoutStateListCopy;
    }
    console.log(this.selectedPlayerStateValue);
  }
  onSelectAllPlayerState(data: any) {
    this.selectedPlayerStateValue = [...data];
    console.log(this.selectedPlayerStateValue);
  }
  onDeSelectAllPlayerState(data: any) {
    this.selectedPlayerStateValue = this.LeaderBoardPayoutStateListCopy;
    console.log(this.selectedPlayerStateValue);
  }
}
