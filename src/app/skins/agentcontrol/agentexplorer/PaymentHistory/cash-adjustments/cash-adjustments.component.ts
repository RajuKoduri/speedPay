import { Component, OnInit } from '@angular/core';
import { CashierService } from 'src/app/source/Cashier.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cash-adjustments',
  templateUrl: './cash-adjustments.component.html',
  styleUrls: ['./cash-adjustments.component.css']
})
export class CashAdjustmentsComponent implements OnInit {
  AgentRevenueAdjustmentForm: FormGroup;
  Agentguid: any;
  FillterMenu: boolean = false;
  loader: boolean = false;
  AgentCashAdjustmentData: any;
  rowsOnthePage: any;
  ResultCount: any;
  CashAdjustmentOperationTypeList: any;
  startDate: any;
  endDate: any;

  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false
  
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  popupview:boolean  =false
  agentlogin:any
  cashtype:any
  dateform:any
  amount :any
  selectedRowData: any;

  constructor(private CashierService: CashierService,private DateTimePipe:DateTimePipe,
    private FileformatServiceService: FileformatServiceService) {
    this.AgentRevenueAdjustmentForm = new FormGroup({
      ReportingPeriodFrom: new FormControl(),
      ReportingPeriodTo: new FormControl(),
      Admin: new FormControl(), 
      AdjustmentAmountFrom: new FormControl(),
      AdjustmentAmountTo: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      enddate: new FormControl(),

    })
  }

  ngOnInit(): void {
    this.Agentguids()
    this.CashAdjustmentOperationType()

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

  changeSelect(date:any){
    const formatDate = this.DateTimePipe.transforminingDispalyDate(date);
    return formatDate
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
  CashAdjustmentOperationType() {
    const CashAdjustmentOperationType = localStorage.getItem('CashAdjustmentOperationType');
    if (CashAdjustmentOperationType) {
      this.CashAdjustmentOperationTypeList = JSON.parse(CashAdjustmentOperationType)
    }
    console.log(this.CashAdjustmentOperationTypeList)
  }

  onFormSubmit() {
    this.loader = true;
    this.AgentCashAdjustmentData = false;
    let body = {
      "idList": [this.Agentguid],
      "firstRecord": this.AgentRevenueAdjustmentForm.value.firstRecord - 1,
      "maxCountRecord": Number(this.AgentRevenueAdjustmentForm.value.maxCountRecord),
      // "reportPeriod": this.AgentRevenueAdjustmentForm.value.ReportingPeriodFrom != null ? {
      //   "start": this.AgentRevenueAdjustmentForm.value.ReportingPeriodFrom != null ? this.AgentRevenueAdjustmentForm.value.ReportingPeriodFrom + 'T' + this.selectedTime : undefined,
      //   "end": this.AgentRevenueAdjustmentForm.value.ReportingPeriodTo != null ? this.AgentRevenueAdjustmentForm.value.ReportingPeriodTo + 'T' + this.selectedEndTime : undefined
      // } : undefined,
      "reportPeriod": (this.AgentRevenueAdjustmentForm.value.startDate != null && this.AgentRevenueAdjustmentForm.value.startDate !== "") ? { "start": this.AgentRevenueAdjustmentForm.value.startDate + "T" 
      + this.AgentRevenueAdjustmentForm.value.startTime, "end": this.AgentRevenueAdjustmentForm.value.endDate + "T" + this.AgentRevenueAdjustmentForm.value.endTime } :
      (this.AgentRevenueAdjustmentForm.value.endDate != null && this.AgentRevenueAdjustmentForm.value.endDate != "") ? { "end": this.AgentRevenueAdjustmentForm.value.endDate + "T" 
      + this.AgentRevenueAdjustmentForm.value.endTime } : undefined,
      "adminAccountMask": this.AgentRevenueAdjustmentForm.value.Admin != null ? this.AgentRevenueAdjustmentForm.value.Admin : undefined
    }

    this.CashierService.getAgentBalanceAdjustments(body).subscribe((data) => {
      console.log(data);
      this.loader = false;
      this.AgentCashAdjustmentData = data.objectList;
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount;

      for (let i = 0; i < this.AgentCashAdjustmentData.length; i++) {
        for (let j = 0; j < this.CashAdjustmentOperationTypeList.length; j++) {
          if (this.AgentCashAdjustmentData[i].direction.lowLong == this.CashAdjustmentOperationTypeList[j].guid.lowLong) {
            this.AgentCashAdjustmentData[i].direction = this.CashAdjustmentOperationTypeList[j].value
          }
        }
      }
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
    XLSX.writeFile(wb, 'AgentRevenueAdjustmentsExcelSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AgentRevenueAdjustmentsExcelSheet")
  }

  showDate(data: any) {
    console.log(this.AgentRevenueAdjustmentForm.value.endDate)
    if (this.AgentRevenueAdjustmentForm.value.startDate > this.AgentRevenueAdjustmentForm.value.endDate) {

      this.steddate = true;
    } else {
      this.steddate = false;
    }

    if (this.AgentRevenueAdjustmentForm.value.startDate == this.AgentRevenueAdjustmentForm.value.endDate) {
      if (this.AgentRevenueAdjustmentForm.value.startTime > this.AgentRevenueAdjustmentForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    } else {
      this.timeerror = false;
    }

    this.AgentRevenueAdjustmentForm.valueChanges.subscribe(x => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()) {
        console.log("indirect")
        console.log(this.AgentRevenueAdjustmentForm.value.endDate)
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    });
  }
  timechange(data: any) {
    console.log(data.target.value)
    console.log(this.AgentRevenueAdjustmentForm.value.startTime)
    console.log(this.AgentRevenueAdjustmentForm.value.endTime)
    if (this.AgentRevenueAdjustmentForm.value.startDate == this.AgentRevenueAdjustmentForm.value.endDate) {
      if (this.AgentRevenueAdjustmentForm.value.startTime > this.AgentRevenueAdjustmentForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }

  }
viewdata(data:any,index:any){
    console.log(data)
    console.log(index)
    this.selectedRowData = data 
    this.popupview = true
    this.agentlogin = data.agent.login   
    this.cashtype = data.direction
    this.dateform = data.date
    this.amount =  data.amount.value
  }
  closepop(){
    this.popupview = false
  }
}
