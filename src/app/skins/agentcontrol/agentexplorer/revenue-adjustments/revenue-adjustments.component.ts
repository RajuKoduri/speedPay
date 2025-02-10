import { Component, OnInit } from '@angular/core';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-revenue-adjustments',
  templateUrl: './revenue-adjustments.component.html',
  styleUrls: ['./revenue-adjustments.component.css']
})
export class RevenueAdjustmentsComponent implements OnInit {
  AgentRevenueAdjustmentForm: FormGroup;
  Agentguid: any;
  FillterMenu: boolean = false;
  loader: boolean = false;
  AgentRevenueAdjustmentData: any;
  rowsOnthePage: any;
  ResultCount: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';

  constructor(private AgentControlService: AgentControlService,private DateTimePipe:DateTimePipe,
    private FileformatServiceService: FileformatServiceService) {
    this.AgentRevenueAdjustmentForm = new FormGroup({
      ReportingPeriodFrom: new FormControl(),
      ReportingPeriodTo: new FormControl(),
      Admin: new FormControl(),
      AdjustmentAmountFrom: new FormControl(),
      AdjustmentAmountTo: new FormControl(),
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
      "idList": [this.Agentguid],
      "firstRecord": this.AgentRevenueAdjustmentForm.value.firstRecord - 1,
      "maxCountRecord": Number(this.AgentRevenueAdjustmentForm.value.maxCountRecord),
      "reportPeriod": this.AgentRevenueAdjustmentForm.value.ReportingPeriodFrom != null ? {
        "start": this.AgentRevenueAdjustmentForm.value.ReportingPeriodFrom != null ? this.AgentRevenueAdjustmentForm.value.ReportingPeriodFrom + 'T' + this.selectedTime : undefined,
        "end": this.AgentRevenueAdjustmentForm.value.ReportingPeriodTo != null ? this.AgentRevenueAdjustmentForm.value.ReportingPeriodTo + 'T' + this.selectedEndTime : undefined
      } : undefined,
      "adminAccountMask": this.AgentRevenueAdjustmentForm.value.Admin != null ? this.AgentRevenueAdjustmentForm.value.Admin : undefined
    }

    this.AgentControlService.getAgentRevenueAdjustment(body).subscribe((data) => {
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
    XLSX.writeFile(wb, 'AgentRevenueAdjustmentsExcelSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AgentRevenueAdjustmentsExcelSheet")
  }
}
