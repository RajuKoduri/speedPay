import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ComppointsService } from 'src/app/source/comppoints.service';
// import { ExecFileOptionsWithBufferEncoding } from 'child_process';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
@Component({
  selector: 'app-visit-statistics',
  templateUrl: './visit-statistics.component.html',
  styleUrls: ['./visit-statistics.component.css']
})
export class VisitStatisticsComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  rowsOnthePage: any;
  ResultCount: any;
  PlayerList: any;
  faceParameterslist: any;

  convertedArray: any = [];
  CopyconvertedArray:  string [] = [];
  dropdownList12: any = [];
  selectedItems12: any = [];
  sessiontypearray: any = []
  dropdownSettings = {}

  resultcount: boolean = true;
  loader: boolean = false;
  VisitstatsPopup: boolean = false;
  playerStatsldetails: any;
  currentDateTimes: any;
  startDate: any; 
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;

  constructor(private PlayerserviceService: PlayerServiceService, public datepipe: DatePipe,
    private comppointsService: ComppointsService, private FileformatServiceService: FileformatServiceService,
    private DateTimePipe: DateTimePipe) {
    this.filterForm = new FormGroup({
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
      face: new FormControl(),
      nickName: new FormControl(),
      playerLogin: new FormControl(),
      networkNames: new FormControl(),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      enddate: new FormControl(),

    })
  }

  ngOnInit(): void {
    this.faceParameters()
    
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    // this.walletTypes();
    // this.gameNames();

    console.log('jdbjsbsjbhs')
  }
  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    return (c)
  }
  // gameNames() {
  //   throw new Error('Method not implemented.');
  // }
  // walletTypes() {
  //   throw new Error('Method not implemented.');
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
      this.CopyconvertedArray.push(item.name);
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

  fastbackforward() {
   
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),});
    } else
      this.filterForm.patchValue({firstRecord: parseInt('1'),});
    this.PageCount = Math.floor(this.filterForm.value.firstRecord /parseInt(this.filterForm.value.maxCountRecord)) + 1;

    this.onFormSubmit();
  }

  prev() {
    if (
      this.filterForm.value.firstRecord - 1 ==
      parseInt(this.filterForm.value.maxCountRecord)
    )
      this.filterForm.patchValue({
        // firstRecord:parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)-1
        firstRecord:parseInt(this.filterForm.value.firstRecord) -parseInt(this.filterForm.value.maxCountRecord),
      });
    else
      this.filterForm.patchValue({firstRecord:parseInt(this.filterForm.value.firstRecord) -parseInt(this.filterForm.value.maxCountRecord),});
    console.log(this.filterForm.value.firstRecord);
    this.PageCount =Math.floor( this.filterForm.value.firstRecord /parseInt(this.filterForm.value.maxCountRecord) ) - 1;
    this.pagecontrolbtn = false;
    if (this.PageCount > this.PlayerList.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
  }

  next() {
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    }

    else
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) +
          parseInt(this.filterForm.value.maxCountRecord),
      });
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    console.log(this.filterForm.value.firstRecord);
    console.log(Math.floor(this.filterForm.value.firstRecord /parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount =Math.floor(this.filterForm.value.firstRecord /parseInt(this.filterForm.value.maxCountRecord)) + 1;
    this.onFormSubmit();

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }


  fastforward() {
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({ firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord), });
    } else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(
      Math.floor(
        this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1
    );
    this.PageCount =
      Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    this.pagecontrolbtn = true;
    if (this.PageCount > this.PlayerList.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();
    this.FirstrecordFillter =
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
  }

  onFormSubmit() {
    this.FillterMenu = false;
    this.loader = true;
    this.PlayerList = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // let fillterbody = {
    //   "firstRecord":this.filterForm.value.firstRecord,
    //   "maxCountRecord":this.filterForm.value.maxCountRecord,
    //   "accountMask": this.filterForm.value.playerLogin,
    //   "nickName": this.filterForm.value.nickName,
    //   "networkNames": [this.filterForm.value.face],
    //   "reportPeriod": { "start": this.filterForm.value.repotingstart , "end": this.filterForm.value.repotingend }
    // }

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    fillterbody["accountMask"] = this.filterForm.value.playerLogin != null ? this.filterForm.value.playerLogin : undefined
    fillterbody["nickName"] = this.filterForm.value.nickName != null ? this.filterForm.value.nickName : undefined
    // fillterbody["networkNames"] = this.filterForm.value.face != null ? [this.filterForm.value.face] : undefined
    fillterbody["networkNames"] = this.convertedArray != null ? this.convertedArray : undefined
    // fillterbody["reportPeriod"] = this.filterForm.value.repotingstart != null ? { "start": this.filterForm.value.repotingstart, "end": this.filterForm.value.repotingend } : undefined
    
    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;
    
    // fillterbody["reportPeriod"] =(this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
    (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;
      this.PlayerserviceService.getVisitList(fillterbody).subscribe((res) => { this.getVisitStatsListData(res) },error=>{
      this.loader = false;
      })
  
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.rowsOnthePage == this.ResultCount) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }
  getVisitStatsListData(res: any) {
    console.log(res)
    this.loader = false;

    if (res?.objectList) {

      this.PlayerList = res.objectList;
      this.rowsOnthePage = res.objectList.length;
    }
    this.ResultCount = res?.resultCount;

    if (this.PlayerList) {
      this.loader = false;
    }

    if (this.ResultCount >= 0 ) {
      this.resultcount = false;
    }
    for (let i = 0; i < this.PlayerList.length; i++) {
      let currentDateTime = this.PlayerList[i].lastVisit

      currentDateTime = currentDateTime.substring(0, currentDateTime.length - 5);
      let currentDateTimes = this.datepipe.transform(new Date(currentDateTime), 'yyyy/MM/dd h:mm:ss a');
      // console.log("dates", currentDateTimes);
      this.PlayerList[i].DateFormat = currentDateTimes;
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
    XLSX.writeFile(wb, 'VisitStatisticsExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "VisitStatisticsExcelSheet")

  }
  
  // *****************onitemselect @ starts ***************************************

  onItemSelectnew(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });

    console.log(this.convertedArray);
  }
  OnItemDeSelectnew(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
    if(this.convertedArray === null || this.convertedArray.length === 0){
      console.log("Empty")
     this.convertedArray = this.CopyconvertedArray
    }
    console.log (this.convertedArray)
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
    this.convertedArray = this.CopyconvertedArray
    console.log(this.convertedArray);
  }


  // ********************** onitemselect @ ends ******************************


  // ************************** <ng-select> @ starts *****************************

  onItemSelectsessiontype(data: any) {
    this.sessiontypearray = []
    this.filterForm.value.SessionType.forEach((item: { guid: any; }) => {
      this.sessiontypearray.push(item.guid);
    });
    console.log(this.sessiontypearray)
  }
  OnItemDeSelectsessiontype(data: any) {
    this.sessiontypearray = []
    this.filterForm.value.SessionType.forEach((item: { guid: any; }) => {
      this.sessiontypearray.push(item.guid);
    });
    console.log(this.sessiontypearray)
  }
  onSelectAllsessiontype(data: any) {
    this.sessiontypearray = []
    data.forEach((item: { guid: any; }) => {
      this.sessiontypearray.push(item.guid);
    });
    console.log(this.sessiontypearray)
  }
  onDeSelectAllsessiontype(data: any) {
    this.sessiontypearray = []
    data.forEach((item: { guid: any; }) => {
      this.sessiontypearray.push(item.guid);
    });
    console.log(this.sessiontypearray)
  }


  // ******************** <ng-select> @ ends ***************************************



  onClick(data: any) {
    console.log(data)
    this.playerStatsldetails = this.PlayerList[data]
    this.VisitstatsPopup = true
  }
  closepopup() {
    this.VisitstatsPopup = false
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

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }

}
