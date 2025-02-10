import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';

@Component({
  selector: 'player-iphistory',
  templateUrl: './player-iphistory.component.html',
  styleUrls: ['./player-iphistory.component.css']
})
export class PlayerIphistoryComponent implements OnInit {
  FillterMenu: boolean = false;
  PlayerguidList: any;
  filterForm: FormGroup
  endDate: any;
  startDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  logoutstartDate: any;
  logoutendDate: any;
  logoutselectedTime: any = '00:00:00';
  logoutselectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false
  logouttimeerror: boolean = false
  logoutstartdate: boolean = false
  loader: boolean = false;
  PlayerIplist: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  PlayerIplistPopup: boolean = false;
  PlayerIplistRowData: any;

  constructor(private FileformatServiceService: FileformatServiceService, private PlayerserviceService:PlayerServiceService,
    private PlayerServiceService: PlayerServiceService, private DateTimePipe: DateTimePipe) {
    this.filterForm = new FormGroup({
      IpAddress: new FormControl(),
      UserAgent: new FormControl(),

      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),

      logoutstartDate: new FormControl(),
      logoutendDate: new FormControl(),
      logoutstartTime: new FormControl(),
      logoutendTime: new FormControl(),

      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }

  ngOnInit(): void {
    this.getDates();
    this.Playerguid()
  }
  getDates() {
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());

    let dateToday = moment(new Date(today)).format('YYYY-MM-DD');
    let dateEnd = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = dateToday;
    this.endDate = dateEnd;
    this.logoutstartDate = dateToday;
    this.logoutendDate = dateEnd;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  Playerguid() {
    let Playerguid = sessionStorage.getItem("Playerguid");

    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
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
    this.loader = true;
    this.PlayerIplist = false;

    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // getPlayerAnalizer
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)
    fillterbody["firstRecord"] = Number(this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    fillterbody["playerIds"] = [this.PlayerguidList];
    fillterbody["ipAddress"] = this.filterForm.value.IpAddress != null ? this.filterForm.value.IpAddress : undefined;
    fillterbody["userAgent"] = this.filterForm.value.UserAgent != null ? this.filterForm.value.UserAgent : undefined;

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["loginDate"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;

    const { logoutstartDate, logoutstartTime, logoutendDate, logoutendTime } = this.filterForm.value;
    const logoutstartDateTime = logoutstartDate ? logoutstartDate + "T" + logoutstartTime : undefined;
    const logoutendDateTime = logoutendDate ? logoutendDate + "T" + logoutendTime : undefined;
    fillterbody["logoutDate"] = (logoutstartDateTime || logoutendDateTime) ? { start: logoutstartDateTime, end: logoutendDateTime } : undefined;

    this.PlayerServiceService.getPlayerIpHistory(fillterbody).subscribe((data) => {
      console.log(data)
      this.getPlayerLinksData(data)
    })
  }
  getPlayerLinksData(res: any) {
    this.loader = false;
    this.PlayerIplist = res.objectList;
    console.log(res)
    this.rowsOnthePage = res.objectList.length;
    this.ResultCount = res.resultCount
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }
  changeSelect(date: string): any {
    if (date != undefined) {
      let c = this.DateTimePipe.transforminingDispalyDate(date);
      return (c)

    }
  }
  PlayerIplistRow(i: any): any {
    this.PlayerIplistRowData = this.PlayerIplist[i];
    this.PlayerIplistPopup=true;
  }
  closepopup() {
    this.PlayerIplistPopup=false;
    this.PlayerIplistRowData=null;
  }
  showDate(data: any) {
    console.log(this.filterForm.value.endDate)
    if (this.filterForm.value.startDate > this.filterForm.value.endDate) {
      this.steddate = true;
    } else {
      this.steddate = false;
    }
    if (this.filterForm.value.logoutstartDate > this.filterForm.value.logoutendDate) {
      this.logoutstartdate = true;
    } else {
      this.logoutstartdate = false;
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

    if (this.filterForm.value.logoutstartDate == this.filterForm.value.logoutendDate) {
      if (this.filterForm.value.logoutstartTime > this.filterForm.value.logoutendTime) {
        this.logouttimeerror = true;
      } else {
        this.logouttimeerror = false;
      }
    } else {
      this.logouttimeerror = false;
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
      if (new Date(x.logoutstartDate).getTime() > ToDate.getTime() || new Date(x.logoutstartDate).getTime() > new Date(x.logoutendDate).getTime() || new Date(x.logoutendDate).getTime() > ToDate.getTime()) {
        console.log("logoutstartDate")
        console.log(this.filterForm.value.endDate)
        this.logoutstartdate = true;
      } else {
        this.logoutstartdate = false;
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



  updateFirstRecord(newFirstRecord: any) {
    this.filterForm.patchValue({ firstRecord: newFirstRecord });
    this.PageCount = Math.floor(newFirstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    this.onFormSubmit();
    console.log(newFirstRecord, newFirstRecord / this.filterForm.value.maxCountRecord);
  }

  fastbackforward() {
    console.log('......Hhello......');
    const firstRecord = this.filterForm.value.firstRecord == 0
      ? parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      : 1;
    this.updateFirstRecord(firstRecord);
  }

  fastforward() {
    console.log('......Hhello......');
    const maxCountRecord = parseInt(this.filterForm.value.maxCountRecord);
    const firstRecord = this.filterForm.value.firstRecord == 0
      ? parseInt(this.filterForm.value.firstRecord) + 1 + maxCountRecord
      : Math.floor(this.ResultCount / maxCountRecord) * maxCountRecord + 1;

    console.log(Math.floor(this.ResultCount / maxCountRecord), firstRecord);
    this.updateFirstRecord(firstRecord);

    if (this.PageCount > this.PlayerIplist.length) {
      this.pagecontrolbtn = true;
    }
  }

  next() {
    console.log('......Hhello......');
    const firstRecord = this.filterForm.value.firstRecord == 0
      ? parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      : parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord);

    this.updateFirstRecord(firstRecord);
  }

  prev() {
    console.log('......Hhello......');
    const firstRecord = parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord);
    this.updateFirstRecord(firstRecord);

    if (this.PageCount > this.PlayerIplist.length) {
      this.pagecontrolbtn = false;
    }
  }

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
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
    XLSX.writeFile(wb, 'PlayerIpHistoryExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerIpHistory")
  }

}
