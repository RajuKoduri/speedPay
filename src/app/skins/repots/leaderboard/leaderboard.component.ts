import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToolsService } from 'src/app/source/Tools.service';
import { DatePipe, formatDate } from '@angular/common'
import * as moment from 'moment';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  filterForm: FormGroup;
  FillterMenu: boolean = true;
  loader: boolean = false;
  startdate: any;
  LeaderBoardData: any;
  rowsOnthePage: any;
  endDate: any;
  startDate: any;
  todaydate: any;
  steddate: boolean = false;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;
  ResultCount: any
  timeerror: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  constructor(private ToolsService: ToolsService, private elementRef: ElementRef, private renderer: Renderer2) {
    this.getDates()
    this.filterForm = new FormGroup({
      // StartDate: new FormControl(),
      // EndDate: new FormControl(),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(this.startTime),
      endTime: new FormControl(this.endTime),
      firstRecord: new FormControl('1'),
      maxCountRecord: new FormControl('100'),
    })
  }

  ngOnInit(): void {
   
  }
  getDates(){
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
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
    return dirtyValues
  }


  onFormSubmit() {
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    console.log(this.filterForm.value)
    this.LeaderBoardData = false
    this.FillterMenu = false;
    this.loader = true;
    this.getDirtyValues(this.filterForm)
    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = 0
    fillterbody["maxCountRecord"] = 100
    // fillterbody["startDate"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined
    // this.ToolsService.getPlayerRakeReportData(fillterbody).subscribe((data) => this.RakeReportData(data))
    fillterbody["startDate"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
    (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;

    let body = {}
    // this.ToolsService.rakeRaceReport(fillterbody).subscribe((data) => {
    this.ToolsService.getLeaderBoardReport(fillterbody).subscribe((data) => {
      console.log(data)
      this.LeaderBoardResData(data)
    })

  }
  LeaderBoardResData(data: any) {
    console.log(data);
    this.loader = false;
    this.LeaderBoardData = data.objectList;
    if (this.LeaderBoardData) {
      this.rowsOnthePage = data.objectList.length
      if (this.PageCount > this.LeaderBoardData.length) {
        console.log(this.LeaderBoardData.length)
        this.pagecontrolbtn = true;
      }
      for (let i = 0; i < this.LeaderBoardData.length; i++) {
      //  let date= this.LeaderBoardData[i].date.replace('Z', '');
       let date= this.LeaderBoardData[i].date.slice(0, -1);
        this.LeaderBoardData[i].date=date;
      }
    }
    this.ResultCount = data.resultCount;
    if(  this.rowsOnthePage==this.ResultCount){
      this.pagecontrolbtn = true;
    }else{
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
    XLSX.writeFile(wb, 'LeaderBoardExcelSheet.xlsx');

  }
  showDate(data: any) {
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
  fastforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) +
          1 +
          parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord:
          Math.floor(
            this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)
          ) *
          this.filterForm.value.maxCountRecord +
          1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(
      Math.floor(
        this.filterForm.value.firstRecord /
        parseInt(this.filterForm.value.maxCountRecord)
      ) + 1
    );
    this.PageCount =
      Math.floor(
        this.filterForm.value.firstRecord /
        parseInt(this.filterForm.value.maxCountRecord)
      ) + 1;
    console.log(this.PageCount)
    console.log(this.LeaderBoardData.length)
    this.pagecontrolbtn = true;
    if (this.PageCount > this.LeaderBoardData.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );
    this.FirstrecordFillter =
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
  }

  next() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) +
          1 +
          parseInt(this.filterForm.value.maxCountRecord),
        // console.log(typeof this.filterForm.value.firstRecord)
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
    console.log(
      Math.floor(
        this.filterForm.value.firstRecord /
        parseInt(this.filterForm.value.maxCountRecord)
      ) + 1
    );
    this.PageCount =
      Math.floor(
        this.filterForm.value.firstRecord /
        parseInt(this.filterForm.value.maxCountRecord)
      ) + 1;
    // if (this.FirstrecordFillter) {

    //   this.FirstrecordFillter++
    //   console.log(this.FirstrecordFillter)
    // }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) +
          1 +
          parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: parseInt('1'),
      });
    this.PageCount =
      Math.floor(
        this.filterForm.value.firstRecord /
        parseInt(this.filterForm.value.maxCountRecord)
      ) + 1;

    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );
  }
  prev() {
    console.log('......Hhello......');
    if (
      this.filterForm.value.firstRecord - 1 ==
      parseInt(this.filterForm.value.maxCountRecord)
    )
      this.filterForm.patchValue({
        // firstRecord:parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)-1
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) -
          parseInt(this.filterForm.value.maxCountRecord),
      });
    else
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) -
          parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    this.PageCount =
      Math.floor(
        this.filterForm.value.firstRecord /
        parseInt(this.filterForm.value.maxCountRecord)
      ) - 1;
    this.pagecontrolbtn = false;
    if (this.PageCount > this.LeaderBoardData.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  exportCsv(): void {

    const element = this.elementRef.nativeElement.querySelector('#excel-table');
    const rows = element.querySelectorAll('tr');
    let csvContent = '';

    rows.forEach((row: any) => {
      const cols = row.querySelectorAll('td, th');
      cols.forEach((col: any, index: number) => {
        csvContent += col.textContent + (index < cols.length - 1 ? ',' : '\n');
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.setAttribute(link, 'download', 'LeaderBoardData.csv');
    this.renderer.appendChild(this.elementRef.nativeElement, link);

    link.click();

    this.renderer.removeChild(this.elementRef.nativeElement, link);
  }

}
