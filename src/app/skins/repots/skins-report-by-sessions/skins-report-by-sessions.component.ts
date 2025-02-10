import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToolsService } from 'src/app/source/Tools.service';
import { DatePipe, formatDate } from '@angular/common'
import * as moment from 'moment';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-skins-report-by-sessions',
  templateUrl: './skins-report-by-sessions.component.html',
  styleUrls: ['./skins-report-by-sessions.component.css']
})
export class SkinsReportBySessionsComponent implements OnInit {
  filterForm: FormGroup;
  TableSettingsForm: FormGroup;
  FillterMenu: boolean = true;
  loader: boolean = false;
  startdate: any;
  SkinsReports: any;
  rowsOnthePage: any;
  endDate: any;
  startDate: any;
  todaydate: any;
  SkinsReports1: any = [];
  showDrop: any;

  SkinId: boolean = true;
  CashGames: boolean = true;
  Tournaments: boolean = true;
  Tickets: boolean = true;
  Result: boolean = true;
  Rake: boolean = true;
  Jackpot: boolean = true;
  RabbitHunting: boolean = true;
  TouramentFee: boolean = true;
  MarketingFee: boolean = true;
  HorsesResult: boolean = true;
  CasinoResult: boolean = true;
  steddate:boolean = false
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;
  ResultCount:any
  timeerror: boolean= false;
  startTime:any= "00:00:00"
  endTime:any = "23:59:59"
  constructor(private ToolsService: ToolsService,private elementRef: ElementRef,private renderer: Renderer2) {
    this.filterForm = new FormGroup({
      // StartDate: new FormControl(),
      // EndDate: new FormControl(),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
    })

    this.TableSettingsForm = new FormGroup({
      Skin: new FormControl(true),
      CashGames: new FormControl(true),
      Tournaments: new FormControl(true),
      Tickets: new FormControl(true),
      Result: new FormControl(true),
      Rake: new FormControl(true),
      Jackpot: new FormControl(true),
      RabbitHunting: new FormControl(true),
      TouramentFee: new FormControl(true),
      MarketingFee: new FormControl(true),
      HorsesResult: new FormControl(true),
      CasinoResult: new FormControl(true),
    })
  }

  ngOnInit(): void {

    var localTime = moment().format('YYYY-MM-DD'); // store localTime
    this.startdate = localTime + "T13:00:00.000";
    console.log(this.startdate)
    console.log("Time: " + moment(this.startdate).format("hh:mm A"));

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
    this.PageCount =Math.floor(this.filterForm.value.firstRecord /parseInt(this.filterForm.value.maxCountRecord)) + 1;
    console.log(this.filterForm.value)
    this.SkinsReports = false
    this.FillterMenu = false;
    this.loader = true;
    this.getDirtyValues(this.filterForm)
    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord)
    // fillterbody["startDate"] = moment(this.startdate).format("YYYY-MM-DDTHH:mm:ss")
    // fillterbody["startDate"] = this.startdate
    // fillterbody ["startDate"]= {
    //   "start": "2019-01-01T18:53:47",
    //     "end": "2023-06-22T18:53:49"
    //  }

    //  fillterbody["firstRecord"] = 0
    //  fillterbody["maxCountRecord"] = 100
    //  fillterbody["startDate"] =this.filterForm.value.StartDate!=null? {"start":this.filterForm.value.StartDate,"end":this.filterForm.value.EndDate}:undefined
    // fillterbody["startDate"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate +"T"+ this.filterForm.value.startTime, "end": this.filterForm.value.endDate + +"T"+ this.filterForm.value.endTime } : undefined
    fillterbody["start"] = this.filterForm.value.startDate 
    fillterbody["end"] =  this.filterForm.value.endDate              

    this.ToolsService.getSkinReportBySessions(fillterbody).subscribe((data) => {
      this.SkinsReportsResData(data)
    })
    // this.ToolsService.getSkinsMoneyReport(fillterbody).subscribe((data) => {
    //   this.SkinsReportsResData(data)
    // })
  }
  SkinsReportsResData(data: any) {
    console.log(data);
    this.loader = false;
    // if(data?.objectList){
      
      //   this.SkinsReports = data.objectList;
      //   this.rowsOnthePage = data.objectList.length;
      // }
      
      if(data){
  
        this.SkinsReports = data
        this.rowsOnthePage = data
      }
      console.log(this.SkinsReports)

    // delete this.SkinsReports[0]
    // for (let i = 1; i < this.SkinsReports.length; i++) {
    //   console.log(this.SkinsReports[i])
    //   this.SkinsReports1.push(this.SkinsReports[i])
    // }
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
    XLSX.writeFile(wb, 'SkinsReportBySessionExcelSheet.xlsx');

  }
  myFunction() {
    this.showDrop = !this.showDrop
    console.log('ding')
  }
  tableSettingSave() {
    this.SkinId = this.TableSettingsForm.value.Skin;
    this.CashGames = this.TableSettingsForm.value.CashGames;
    this.Tournaments = this.TableSettingsForm.value.Tournaments;
    this.Tickets = this.TableSettingsForm.value.Tickets;
    this.Result = this.TableSettingsForm.value.Result;
    this.Rake = this.TableSettingsForm.value.Rake;
    this.Jackpot = this.TableSettingsForm.value.Jackpot;
    this.RabbitHunting = this.TableSettingsForm.value.RabbitHunting;
    this.TouramentFee = this.TableSettingsForm.value.TouramentFee;
    this.MarketingFee = this.TableSettingsForm.value.MarketingFee;
    this.HorsesResult = this.TableSettingsForm.value.HorsesResult;
    this.CasinoResult = this.TableSettingsForm.value.CasinoResult;

    this.showDrop = false
  }
  showDate(data:any) { 
    // alert("kkk")
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
        // alert("enter")
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
      console.log(this.SkinsReports.length) 
      this.pagecontrolbtn = true;
    if (this.PageCount > this.SkinsReports.length) {
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
    if (this.PageCount > this.SkinsReports.length) {
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
