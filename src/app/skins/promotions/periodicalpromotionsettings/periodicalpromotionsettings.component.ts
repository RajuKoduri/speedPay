import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { PromotionalServiceService } from 'src/app/source/promotional-service.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-periodicalpromotionsettings',
  templateUrl: './periodicalpromotionsettings.component.html',
  styleUrls: ['./periodicalpromotionsettings.component.css']
})
export class PeriodicalpromotionsettingsComponent implements OnInit {
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  loader: boolean = false;
  filterForm: FormGroup;
  FillterMenu: boolean = false;
  periodcalsettingData: any;
  LeaderBoardTypeList: any;
  LeaderBoardSettingPeriodList: any;
  LeaderBoardSettingStatusList: any;

  typeDropdownSettings: any = {};
  selectedLeaderBoardType: any = [];
  LeaderBoardTypeListCopy: any = [];

  scheduleDropdownSettings: any = {}
  selectedScheduleValue: any = []
  LeaderBoardSettingPeriodListCopy: any;

  statusDropdownSettings: any = {}
  selectedLeaderBoardStatusValue: any = []
  LeaderBoardStatusListCopy: any;


  constructor(private PromotionalServiceService: PromotionalServiceService, private FileformatServiceService:FileformatServiceService) {
    this.filterForm = new FormGroup({
      PromotionalName: new FormControl(),
      PromotionalType: new FormControl(),
      Schedule: new FormControl(),
      Status: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl('100'),
    })
  }

  ngOnInit(): void {
    this.LeaderBoardType();
    this.LeaderBoardSettingPeriod();
    this.LeaderBoardSettingStatus();
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
      allowSearchFilter: false
    }

  }
  LeaderBoardSettingStatus() {
    const LeaderBoardSettingStatus = localStorage.getItem("LeaderBoardSettingStatus");
    if (LeaderBoardSettingStatus) {
      this.LeaderBoardSettingStatusList = JSON.parse(LeaderBoardSettingStatus);
      console.log("LeaderBoardSettingStatusList", this.LeaderBoardSettingStatusList)
    }

    this.LeaderBoardStatusListCopy = this.LeaderBoardSettingStatusList.map((status: any) => {
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

  getDirtyValues(form: any) {
    console.log(form)
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
    this.loader = true;

    this.getDirtyValues(this.filterForm)
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)
    let promotionalName = this.filterForm.value.PromotionalName
    // this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)


    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    fillterbody["name"] = (promotionalName === "" || promotionalName == null) ? undefined : promotionalName;
    fillterbody["leaderboardTypes"] = LeaderBoardType;
    fillterbody["schedules"] = ScheduleValue
    fillterbody["status"] = LeaderBoardStatusValue;
    this.PromotionalServiceService.getLeaderboardSettings(fillterbody).subscribe((data) => this.periodsettingData(data))
  }
  periodsettingData(res: any) {
    console.log(res)
    this.periodcalsettingData = res.objectList;
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
    XLSX.writeFile(wb, 'periodcalPromotionSettingsExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element,"PokerGameSessionsExcelSheet")
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
}
