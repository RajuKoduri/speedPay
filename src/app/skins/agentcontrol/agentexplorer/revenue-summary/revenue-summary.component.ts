import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { AgentControlService } from 'src/app/source/AgentControl.service';
import * as moment from 'moment'; 
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-revenue-summary',
  templateUrl: './revenue-summary.component.html',
  styleUrls: ['./revenue-summary.component.css']
})
export class RevenueSummaryComponent implements OnInit {
  Agentguid: any;
  FillterMenu: boolean = true;
  RevenueSummaryForm: FormGroup;
  rowsOnthePage: any;
  ResultCount: any;
  loader: boolean = false;
  RevenueSummaryData: any;

  startDate: any; 
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false

  constructor(private AgentControlService: AgentControlService,private FileformatServiceService: FileformatServiceService) {
    this.RevenueSummaryForm = new FormGroup({
      Currency: new FormControl(),
      repotingstart: new FormControl(),
      repotingend: new FormControl(),
      firstRecord: new FormControl('1'),
      maxCountRecord: new FormControl('100'),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      enddate: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.Agentguids();

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    this.getDataFromRevenuePayment()

  }
  getDataFromRevenuePayment(){
  
    let dataFromAgent = localStorage.getItem("summaryData")
    if(dataFromAgent){
      let dataFromRevenuePayment = JSON.parse(dataFromAgent)
     let enddate = dataFromRevenuePayment.date.split('T')[0]
     let startdate = dataFromRevenuePayment.startDate.split('T')[0]
     this.startDate = startdate
     this.endDate = enddate
     this.endTime = dataFromRevenuePayment.date.split('T')[1].split(".")[0]
     this.startTime = dataFromRevenuePayment.startDate.split('T')[1].split(".")[0]
     this. onFormSubmit()
     console.log(dataFromRevenuePayment)
    }
  }

  ngOnDestroy(){
    localStorage.removeItem("summaryData")
  }


  Agentguids() {
    const Agentguid = sessionStorage.getItem('Agentguid');
    console.log(Agentguid)
    if (Agentguid) {
      this.Agentguid = JSON.parse(Agentguid)
    }
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  onFormSubmit() {
    this.loader = true;
    this.RevenueSummaryData = false;
    let body = {
      // "reportPeriod": this.RevenueSummaryForm.value.repotingstart != null ? {
      //   "end": this.RevenueSummaryForm.value.repotingstart,
      //   "start": this.RevenueSummaryForm.value.repotingend
      // } : undefined,
      "reportPeriod":(this.RevenueSummaryForm.value.startDate != null && this.RevenueSummaryForm.value.startDate !== "") ? { "start": this.RevenueSummaryForm.value.startDate + "T" + this.RevenueSummaryForm.value.startTime, "end": this.RevenueSummaryForm.value.endDate + "T" + this.RevenueSummaryForm.value.endTime } :
      (this.RevenueSummaryForm.value.endDate != null && this.RevenueSummaryForm.value.endDate != "") ? { "end": this.RevenueSummaryForm.value.endDate + "T" + this.RevenueSummaryForm.value.endTime } : undefined,
      "idList": [this.Agentguid],
      "firstRecord": this.RevenueSummaryForm.value.firstRecord - 1,
      "maxCountRecord": Number(this.RevenueSummaryForm.value.maxCountRecord),

    }
    console.log(body);
    this.AgentControlService.getAgentsRevenueSummary(body).subscribe((data) => {
      console.log(data);
      this.loader = false;
      this.RevenueSummaryData = data.objectList;
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount
    })
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
    XLSX.writeFile(wb, 'PlayersChargeBacksExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayersChargeBacksExcelSheet")

  }


  showDate(data: any) {
    console.log(this.RevenueSummaryForm.value.endDate)
    if (this.RevenueSummaryForm.value.startDate > this.RevenueSummaryForm.value.endDate) {

      this.steddate = true;
    } else {
      this.steddate = false;
    }

    if (this.RevenueSummaryForm.value.startDate == this.RevenueSummaryForm.value.endDate) {
      if (this.RevenueSummaryForm.value.startTime > this.RevenueSummaryForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    } else {
      this.timeerror = false;
    }

    this.RevenueSummaryForm.valueChanges.subscribe(x => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()) {
        console.log("indirect")
        console.log(this.RevenueSummaryForm.value.endDate)
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    });
  }
  timechange(data: any) {
    console.log(data.target.value)
    console.log(this.RevenueSummaryForm.value.startTime)
    console.log(this.RevenueSummaryForm.value.endTime)
    if (this.RevenueSummaryForm.value.startDate == this.RevenueSummaryForm.value.endDate) {
      if (this.RevenueSummaryForm.value.startTime > this.RevenueSummaryForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }

  }
}
