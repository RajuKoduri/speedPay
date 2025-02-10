import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from } from 'rxjs';
import { ComppointsService } from 'src/app/source/comppoints.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { TotalSumsService } from 'src/app/source/total-sums.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
@Component({
  selector: 'app-playercomppointsadjustments',
  templateUrl: './playercomppointsadjustments.component.html',
  styleUrls: ['./playercomppointsadjustments.component.css']
})
export class PlayercomppointsadjustmentsComponent implements OnInit {

  @Input() userinfo: any;
  @Input() isVisible: boolean = false;
  @Input() showplayername: any
  @Input() setcomppointsadjustments: boolean = false;
  @Output() showHidePopup = new EventEmitter();

  tableAdjest: any;
  adjestpoint: any;
  adjestpointList: any;
  p: number = 1;
  selectnum: number = 10;
  selectnumber: number = -5;
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  currentDateTime: any;
  currentDateTimes: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  comppointsadjustpopup: boolean = false;
  compPointsadjustList: any;

  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false
  playerlevelChangeStatusList: any;
  PlayerLevelsNamesList: any;
  increaseSum: any;
  decreaseSum: any;
  location: any;
  playerExplorer: boolean = false;
  PlayerguidList: any;
  SetCompPointsValue = 0;
  submitted = false;
  constructor(private comppointsService: ComppointsService, public datepipe: DatePipe,
    private FileformatServiceService: FileformatServiceService, private TotalSumsService: TotalSumsService, private PlayerserviceService: PlayerServiceService) {
    this.filterForm = new FormGroup({
      Datefrom: new FormControl(),
      Dateto: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),

      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
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

    console.log('jdbjsbsjbhs')

    this.adjestpoint = localStorage.getItem('DYIDCOMPPOINTSADJUSTMENTOPERATIONTYPE')
    // console.log(this.adjestpoint)
    this.adjestpointList = JSON.parse(this.adjestpoint)

    // let body = {
    // }
    // this.comppointsService.pointsadjustment(body).subscribe((data) => this.pointerAdje(data))
    this.playerExplorerCheck()
    console.log('setcomppointsadjustmentsthis', this.setcomppointsadjustments)
    console.log(this.showplayername)
    console.log(this.userinfo)
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/playercomppointsadjustments") {
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
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  playerlevelChangeStatus() {
    const playerlevelChangeStatus = localStorage.getItem('playerlevelChangeStatus');
    if (playerlevelChangeStatus) {
      this.playerlevelChangeStatusList = JSON.parse(playerlevelChangeStatus)
    }
    console.log("playerlevelChangeStatusList", this.playerlevelChangeStatusList)
  }
  getPlayerLevelsNames() {
    const getPlayerLevelsNames = localStorage.getItem('getPlayerLevelsNames');
    if (getPlayerLevelsNames) {
      this.PlayerLevelsNamesList = JSON.parse(getPlayerLevelsNames)
    }
    console.log(this.PlayerLevelsNamesList.compPointsLevels)
  }

  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];
        console.log(currentControl)
        console.log(currentControl.dirty)
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
    console.log(this.filterForm.value);
    // this.loader = true;
    this.tableAdjest = false
    this.FillterMenu = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)

    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)


    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    // fillterbody["reportPeriod"] = this.filterForm.value.Datefrom != null ? { "end": this.filterForm.value.Dateto, "start": this.filterForm.value.Datefrom } : undefined
    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined,

      fillterbody["idList"] = this.playerExplorer ? [this.PlayerguidList] : undefined

    this.comppointsService.getCompPointsAdjustments(fillterbody).subscribe((res) => { this.pointerAdje(res) }
    )
  }
  pointerAdje(data: any) {
    // console.log(data)
    this.tableAdjest = data.objectList
    console.log(this.tableAdjest);
    console.log(this.adjestpointList);
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    for (let j = 0; j < this.tableAdjest.length; j++) {

      this.currentDateTime = this.tableAdjest[j].date
      console.log("dates", this.currentDateTime);
      this.currentDateTime = this.currentDateTime.substring(0, this.currentDateTime.length - 5)
      this.currentDateTimes = this.datepipe.transform(new Date(this.currentDateTime), 'MM/dd/yyyy h:mm:ss a');
      console.log("dates", this.currentDateTimes);
      this.tableAdjest[j].DateFormat = this.currentDateTimes

      if (!this.tableAdjest[j].DateFormat) {
        Object.assign(this.tableAdjest[j], { DateFormat: "" })
      }
      for (let i = 0; i < this.adjestpointList.length; i++) {
        if (this.adjestpointList[i].guid.lowLong == this.tableAdjest[j].type.lowLong) {
          this.tableAdjest[j].type = this.adjestpointList[i].value;
        }

      }
    }
    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.sum(this.tableAdjest)
  }
  sum(data: any) {
    // this.CompPointBalance.forEach(data)
    this.increaseSum = this.TotalSumsService.calculateSum(data, 'increase');
    console.log(this.increaseSum)
    this.decreaseSum = this.TotalSumsService.calculateSum(data, 'decrease');
    console.log(this.decreaseSum)
  }
  keys(data: any) {
    return Object.keys(data)
  }
  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
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
    XLSX.writeFile(wb, 'PlayerCompPointsAdjustmentsExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "PlayerCompPointsAdjustmentsExcelSheet")
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
    if (this.PageCount > this.tableAdjest.length) {

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
    if (this.PageCount > this.tableAdjest.length) {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }
  closepopup() {
    this.comppointsadjustpopup = false;
  }
  onClick(data: any) {
    console.log(data)
    this.compPointsadjustList = this.tableAdjest[data]
    console.log(this.compPointsadjustList)
    this.comppointsadjustpopup = true;
  }
  setComppoints() {
    if (!this.notZero()) {
      let body = {
        playerGuid: this.userinfo.guid,
        amount: {value:this.SetCompPointsValue},
        comment: '',
      }
      this.comppointsService.setCompPointsAdjustment(body).subscribe((data: any) => {
        console.log(data)
        if(data.objectList){
          this.showHidePopup.emit(false)
        }
      })
    }
  }
  notZero() {
    console.log(this.SetCompPointsValue)
    if (this.SetCompPointsValue == 0) {
      this.submitted = true
    } else {
      this.submitted = false
    }
    return this.submitted
  }
  closepopUP() {
    console.log("-------------------------")
    this.showHidePopup.emit(false)
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
}
