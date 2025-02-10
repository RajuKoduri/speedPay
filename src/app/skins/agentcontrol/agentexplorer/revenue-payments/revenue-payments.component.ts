import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { CashierService } from 'src/app/source/Cashier.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';



@Component({
  selector: 'app-revenue-payments',
  templateUrl: './revenue-payments.component.html',
  styleUrls: ['./revenue-payments.component.css']
})
export class RevenuePaymentsComponent implements OnInit {
  RevenuePaymentmentForm: FormGroup;
  Agentguid: any;
  FillterMenu: boolean = false;
  loader: boolean = false;
  AgentRevenueAdjustmentData: any;
  rowsOnthePage: any;
  ResultCount: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';

  constructor(private CashierService:CashierService,private DateTimePipe:DateTimePipe,
    private FileformatServiceService: FileformatServiceService) {
    this.RevenuePaymentmentForm = new FormGroup({
      ReportingPeriodFrom: new FormControl(),
      ReportingPeriodTo: new FormControl(),
      firstRecord: new FormControl('1'),
      maxCountRecord: new FormControl('100'),

    })
  }

  ngOnInit(): void {
    this.Agentguids()
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
  onFormSubmit() {
    this.loader = true;
    this.AgentRevenueAdjustmentData = false;
    let body = {
      "agentIds": [this.Agentguid],
      "firstRecord": this.RevenuePaymentmentForm.value.firstRecord - 1,
      "maxCountRecord": Number(this.RevenuePaymentmentForm.value.maxCountRecord),
      "reportDate": this.RevenuePaymentmentForm.value.ReportingPeriodFrom != null ? {
        "start": this.RevenuePaymentmentForm.value.ReportingPeriodFrom != null ? this.RevenuePaymentmentForm.value.ReportingPeriodFrom + 'T' + this.selectedTime : undefined,
        "end": this.RevenuePaymentmentForm.value.ReportingPeriodTo != null ? this.RevenuePaymentmentForm.value.ReportingPeriodTo + 'T' + this.selectedEndTime : undefined
      } : undefined,

    }

    this.CashierService.getAgentRevenuePayments(body).subscribe((data) => {
      console.log(data);
      this.loader = false;
      this.AgentRevenueAdjustmentData = data.objectList;
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount;
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
    XLSX.writeFile(wb, 'RevenuePaymentsExcelSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "RevenuePaymentsExcelSheet")
  }
}
