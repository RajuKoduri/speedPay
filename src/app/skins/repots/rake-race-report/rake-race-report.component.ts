import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ToolsService } from 'src/app/source/Tools.service';
import * as moment from 'moment';
@Component({
  selector: 'app-rake-race-report',
  templateUrl: './rake-race-report.component.html',
  styleUrls: ['./rake-race-report.component.css']
})
export class RakeRaceReportComponent implements OnInit {
  Fillterdata: boolean = true;
  loader: boolean = false;
  RakeReportResData: any;
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  endDate: any;
  startDate: any;
  todaydate: any;
  faceParametersList: any;
  walletTypesList: any;
  walletlists: any = [];
  steddate:boolean = false;
  timeerror:boolean = false;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;
  ResultCount:any
  rowsOnthePage:any
  startTime:any= "00:00:00"
  endTime:any = "23:59:59"
  constructor(private ToolsService: ToolsService,private elementRef: ElementRef,private renderer: Renderer2) {
    this.getDates()
    this.filterForm = new FormGroup({
      // StartDate: new FormControl(),
      // EndDate: new FormControl(),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(this.startTime),
      endTime: new FormControl(this.endTime),
      Skins: new FormControl(),
      wallet: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }

  ngOnInit(): void {
    
  }

  getDates(){
    this.walletTypes();
    this.faceParameters();
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()-7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
  }

  filterbtn() {
    this.Fillterdata = !this.Fillterdata
  }
  faceParameters() {
    const faceParameters = localStorage.getItem("faceParameters");
    if (faceParameters) {
      this.faceParametersList = JSON.parse(faceParameters)
    }
  }
  walletTypes() {
    const walletTypes = localStorage.getItem('walletTypes');
    if (walletTypes) {
      this.walletTypesList = JSON.parse(walletTypes)
    }
    console.log(this.walletTypesList)

    for (let i = 0; i < this.walletTypesList.length; i++) {
      if (this.walletTypesList[i].clubGameWallet == true && this.walletTypesList[i].description !== "Play Money") {

        this.walletlists.push(this.walletTypesList[i])
      }
    }
    console.log(this.walletlists)
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
    this.PageCount =Math.floor(this.filterForm.value.firstRecord /parseInt(this.filterForm.value.maxCountRecord)) + 1;
    this.RakeReportResData = [];
    this.loader = true;
    let body = {}
    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord-1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    // fillterbody["startDate"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + 'T00:00:00', "end": this.filterForm.value.endDate + 'T23:59:59' } : undefined
    // fillterbody["startDate"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + "T"+ this.filterForm.value.startTime , "end": this.filterForm.value.endDate + "T"+  this.filterForm.value.endTime} : undefined
    // fillterbody["startDate"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
    // (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["startDate"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;
    this.ToolsService.getPlayerRakeReport(fillterbody).subscribe((data) => this.RakeReportData(data))

  }

  RakeReportData(data: any) {
    console.log(data)
    this.loader = false;
   if(data){
    this.RakeReportResData = data.objectList
    if (this.RakeReportResData) {
      this.rowsOnthePage = data.objectList.length
      if (this.PageCount > this.RakeReportResData.length) {
        console.log( this.RakeReportResData.length)
        this.pagecontrolbtn = true;
      }
     
    }
    this.ResultCount = data.resultCount;
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
    let fileName: 'PlayerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'RakeRaceReportExcelSheet.xlsx');

  }
  showDate(data:any) { 
    if( this.filterForm.value.startDate > this.filterForm.value.endDate){
      console.log("directcondiction")
      this.steddate = true;
      } else {
        this.steddate = false;
      }

      if( this.filterForm.value.startDate == this.filterForm.value.endDate){
        if(this.filterForm.value.startTime > this.filterForm.value.endTime){
          this.timeerror = true;
        }else{
          this.timeerror = false;
        }
        }else{
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
    if( this.filterForm.value.startDate == this.filterForm.value.endDate){
     
      if(this.filterForm.value.startTime > this.filterForm.value.endTime){
        
        this.timeerror = true;
      }else{
        
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
      console.log(this.RakeReportResData.length) 
      this.pagecontrolbtn = true;
    if (this.PageCount > this.RakeReportResData.length) {
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
    if (this.PageCount > this.RakeReportResData.length) {
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
    this.renderer.setAttribute(link, 'download', 'RakeReportData.csv');
    this.renderer.appendChild(this.elementRef.nativeElement, link);
  
    link.click();
  
    this.renderer.removeChild(this.elementRef.nativeElement, link);
  }

}
