import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as moment from 'moment';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css']
})
export class BlacklistComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  Playerbalcklist: any;
  Blacklistmenu: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  loader: boolean = false;
  onePlayerbalcklist: any;
  currentDateTime: any
  currentDateTimes: any;
  PlayerbalcklistPopup: boolean = false;
  SeletedIconIndex: any;
  popupArrow: boolean = false;
  SeletedPlayerGuid: any;
  selectBlacklist: any = [];
  TotalBlacklistGuids: any = [];
  BlacklisGuids: any = [];
  dropdownSettingsTypes!: {};

  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false
  conformationPopup:boolean = false

  userTypesGuids: any = [];
  copyusertotalGuids: any = [];
  dropdownSettingsUserTypes = {}
  location: any;
  playerExplorer: boolean = false;
  PlayerguidList: any;

  constructor(private PlayerserviceService: PlayerServiceService, public datepipe: DatePipe, private CommomfilterService:CommomfilterService,
    private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      firstRecord: new FormControl(1, this.CommomfilterService.requiredAndMinOne()),
      maxCountRecord: new FormControl(100, this.CommomfilterService.requiredAndMinOne()),
      Value: new FormControl(),
      Types: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })

  }

  ngOnInit(): void {
    this.BlacklistTypes();

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    this.playerExplorerCheck()
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/blacklist") {
      this.playerExplorer = true;
      this.PlayerGuid();
    } else {
      this.playerExplorer = false;
    }
  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem("Playerguid");
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid);
    }
    console.log(this.PlayerguidList)
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  BlacklistTypes() {
    const BlacklistTypes = localStorage.getItem('BlacklistTypes')
    if (BlacklistTypes) {
      this.Blacklistmenu = JSON.parse(BlacklistTypes)
      console.log("Blacklistmenu", this.Blacklistmenu);

      for (let i = 0; i < this.Blacklistmenu.length; i++) {
        this.selectBlacklist[i] = {
          value: this.Blacklistmenu[i].value,
          guid: this.Blacklistmenu[i].guid
        }
      }
      console.log(this.selectBlacklist)
      this.selectBlacklist.forEach((item: { guid: any; }) => {
        this.userTypesGuids.push(item.guid)
      });
      this.copyusertotalGuids = this.userTypesGuids
      console.log(this.userTypesGuids)

      this.dropdownSettingsUserTypes = {
        singleSelection: false,
        idField: 'guid',
        textField: 'value',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
    }
    console.log("TotalBlacklisGuids", this.TotalBlacklistGuids)
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

  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({ firstRecord: parseInt('1') });
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
  }

  fastforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    if (this.PageCount > this.Playerbalcklist.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord );
    this.FirstrecordFillter =this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
  }

  next() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
        // console.log(typeof this.filterForm.value.firstRecord)
      });
    }
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter) + 1 + parseInt(this.filterForm.value.maxCountRecord)
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord),
      });
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    console.log(this.filterForm.value.firstRecord);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // if (this.FirstrecordFillter) {

    //   this.FirstrecordFillter++
    //   console.log(this.FirstrecordFillter)
    // }
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  prev() {
    console.log('......Hhello......');
    if (this.filterForm.value.firstRecord - 1 == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        // firstRecord:parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)-1
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    else
      this.filterForm.patchValue({
        firstRecord:parseInt(this.filterForm.value.firstRecord) -parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    this.PageCount =Math.floor(this.filterForm.value.firstRecord /parseInt(this.filterForm.value.maxCountRecord)) - 1;
    if (this.PageCount > this.Playerbalcklist.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  onFormSubmit() {
    console.log(this.filterForm.value);
    this.loader = true;
    this.FillterMenu = false;
    this.Playerbalcklist = false
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // fillterbody["dateRange"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
    //   "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
    //   "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    // } : undefined
    // fillterbody["dateRange"] = this.filterForm.value.Datefrom != null ? { "end": this.filterForm.value.Dateto, "start": this.filterForm.value.Datefrom } : undefined
    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    fillterbody["dateRange"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;
    fillterbody["value"] = this.filterForm.value.Value != null ? this.filterForm.value.Value : undefined
    fillterbody["typesIdList"] = this.userTypesGuids;
    // fillterbody["typesIdList"] = this.filterForm.value.Types != null ? [this.filterForm.value.Types] : undefined

    if (this.playerExplorer) {
      fillterbody["players"] = [this.PlayerguidList]
      this.PlayerserviceService.getBlackListAnalizer(fillterbody).subscribe((res) => { this.getBlackListData(res) })
    } else {
      this.PlayerserviceService.getBlackList(fillterbody).subscribe((res) => { this.getBlackListData(res) })
    }
  }

  getBlackListData(res: any) {
    this.Playerbalcklist = res.objectList;
    console.log(res)
    this.rowsOnthePage = res.objectList?.length;
    this.ResultCount = res.resultCount
    this.loader = false;

   if(this.Playerbalcklist){
    if (this.PageCount > this.Playerbalcklist.length) {
      this.pagecontrolbtn = true;
    }
   }

   if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
    this.pagecontrolbtn = true;
  } else {
    this.pagecontrolbtn = false;
  }
    
    this.currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    console.log(this.currentDateTime);
    for (let i = 0; i < this.Playerbalcklist?.length; i++) {

      console.log(typeof this.Playerbalcklist[i].date);
      this.currentDateTime = this.Playerbalcklist[i].date
      // this.currentDateTime =this.datepipe.transform(new Date(this.Playerbalcklist[i].date), 'MM/dd/yyyy h:mm:ss');
      // this.currentDateTime.toString()
      this.currentDateTime = this.currentDateTime.substring(0, this.currentDateTime.length - 5)
      this.currentDateTimes = this.datepipe.transform(new Date(this.currentDateTime), 'MM/dd/yyyy h:mm:ss');
      console.log("dates", this.currentDateTimes);
      this.Playerbalcklist[i].DateFormat = this.currentDateTimes
      // let str = "12345.00";
      // str = str.substring(0, str.length - 3);
      // console.log(str);
      if (!this.Playerbalcklist[i].DateFormat) {
        Object.assign(this.Playerbalcklist[i], { DateFormat: "" })
      }
      for (let m = 0; m < this.Blacklistmenu.length; m++) {
        if (this.Playerbalcklist[i].type.lowLong == this.Blacklistmenu[m].guid.lowLong) {
          this.Playerbalcklist[i].type = this.Blacklistmenu[m].value
          // console.log(this.Playerbalcklist[i].value)
        }
      }
    }
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.Playerbalcklist != null) {
      this.loader = false;
    }
  }
  onClick(event: any) {
    console.log(event)
    this.onePlayerbalcklist = this.Playerbalcklist[event]
    console.log(this.onePlayerbalcklist)
    this.PlayerbalcklistPopup = true;
  }
  closepopup() {
    this.PlayerbalcklistPopup = false;

  }
  showmanu(i: any, playerId: any) {
    console.log(i)
    console.log(playerId)
    this.SeletedIconIndex = i
    this.popupArrow = !this.popupArrow
    this.SeletedPlayerGuid = playerId
  }
  setPlayerActions(player: any, i: any) {
    console.log(player,i)
    this.onePlayerbalcklist = player
    this.conformationPopup = true
  }

  conformation(choice:any){
    this.popupArrow = !this.popupArrow
    let selectedRow = {...this.onePlayerbalcklist, date:this.onePlayerbalcklist.date.slice(0,-6)}
    delete selectedRow.DateFormat
    if(choice == "Yes"){
      let body = {
        "objectList":[selectedRow.guid]
      }
      this.PlayerserviceService.delBlackListRecords([selectedRow.guid]).subscribe((data)=>{
        console.log(data)
        if(data.changedObjectList){
          this.conformationPopup = false
          this.onFormSubmit()
        }
      })

    
    }else{
      this.conformationPopup = false
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
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'BlackListExcelSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "BlackListExcelSheet")
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


  //  ************************************* @types Dropdown Starts*********************************
  onItemSelectUsertypes(data: any) {
    this.userTypesGuids = []
    this.filterForm.value.Types.forEach((item: { guid: any; }) => {
      this.userTypesGuids.push(item.guid);
    });
    console.log(this.userTypesGuids)
  }
  OnItemDeSelectUsertypes(data: any) {
    this.userTypesGuids = []
    this.filterForm.value.Types.forEach((item: { guid: any; }) => {
      this.userTypesGuids.push(item.guid);
    });
    console.log(this.userTypesGuids)
    if (this.userTypesGuids === null || this.userTypesGuids.length === 0) {
      console.log("Empty");
      this.userTypesGuids = this.copyusertotalGuids
    }
  }
  onSelectAllUsertypes(data: any) {
    this.userTypesGuids = []
    data.forEach((item: { guid: any; }) => {
      this.userTypesGuids.push(item.guid);
    });
    console.log(this.userTypesGuids)
  }
  onDeSelectAllUsertypes(data: any) {
    this.userTypesGuids = []
    this.userTypesGuids = this.copyusertotalGuids
    console.log(this.userTypesGuids)
  }
  //  ************************************* @types Dropdown ends****""""""""""""""""


}
