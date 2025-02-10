import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ToolsService } from 'src/app/source/Tools.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';

@Component({
  selector: 'app-requestedreportslist',
  templateUrl: './requestedreportslist.component.html',
  styleUrls: ['./requestedreportslist.component.css']
})
export class RequestedreportslistComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  RequestedReporStatustList: any;
  RequestedReportTypeList: any;
  Reportreslist: any;
  loader: boolean = false;
  ResultCount: any;
  resultcount: boolean = true;
  rowsOnthePage: any;
  playerdetailspopup: boolean = false;
  Reportlistfulldetails: any;
  SeletedIconIndex: any;
  popupArrow: boolean = false;
  conformationType: any;

  constructor(private ToolsService: ToolsService, private DateTimePipe: DateTimePipe) {
    this.filterForm = new FormGroup({
      RequestDateForm: new FormControl(),
      RequestDateTo: new FormControl(),
      CompleteDateForm: new FormControl(),
      ReportType: new FormControl(),
      Initiator: new FormControl(),
      Status: new FormControl(),
      CompleteDateTo: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }

  ngOnInit(): void {
    this.RequestedReportStatus();
    this.RequestedReportType();
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  RequestedReportStatus() {
    const playerstatus = localStorage.getItem('RequestedReportStatus')
    if (playerstatus) {
      this.RequestedReporStatustList = JSON.parse(playerstatus)
    }
    console.log("RequestedReportStatus", this.RequestedReporStatustList)
  }
  RequestedReportType() {
    const playerstatus = localStorage.getItem('RequestedReportType')
    if (playerstatus) {
      this.RequestedReportTypeList = JSON.parse(playerstatus)
    }
    console.log("RequestedReportType", this.RequestedReportTypeList)
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
    console.log(this.filterForm.value);
    this.FillterMenu = false;
    this.loader = true;
    this.Reportreslist = false;
    let fillterbody = this.getDirtyValues(this.filterForm)

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["requested"] = this.filterForm.value.RequestDateTo != null ? { "start": this.filterForm.value.RequestDateForm, "end": this.filterForm.value.RequestDateTo } : undefined
    fillterbody["completed"] = this.filterForm.value.CompleteDateTo != null ? { "start": this.filterForm.value.CompleteDateForm, "end": this.filterForm.value.CompleteDateTo } : undefined
    fillterbody["reportType"] = this.filterForm.value.ReportType != null ? [this.filterForm.value.ReportType] : undefined;;
    fillterbody["adminLoginMask"] = this.filterForm.value.Initiator != null ? this.filterForm.value.Initiator : undefined;;
    fillterbody["status"] = this.filterForm.value.Status != null ? [this.filterForm.value.Status] : undefined;


    this.ToolsService.getRequestedReports(fillterbody).subscribe((res) => { this.RequstedreportData(res) })

  }
  RequstedreportData(data: any) {
    console.log(data)
    this.Reportreslist = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount; //reportType

    if (this.Reportreslist != null) {
      this.loader = false;
    }

    if (this.Reportreslist !== null) {
      this.resultcount = false;
    }

    for (let i = 0; i < this.Reportreslist.length; i++) {
      for (let m = 0; m < this.RequestedReportTypeList.length; m++) {
        // console.log(this.Affiliateslist[i].status )
        // console.log(this.Affiliateslist[i].status.lowLong )
        //console.log(this.Affiliatestatuslist[m].guid.lowLong )
        if (this.Reportreslist[i].reportType.lowLong == this.RequestedReportTypeList[m].guid.lowLong) {
          this.Reportreslist[i].reportType = this.RequestedReportTypeList[m].value
          // console.log(this.Affiliateslist[i].status)
        }
      }
      for (let m = 0; m < this.RequestedReporStatustList.length; m++) {
        if (this.Reportreslist[i].status.lowLong == this.RequestedReporStatustList[m].guid.lowLong) {
          this.Reportreslist[i].statusName = this.RequestedReporStatustList[m].value
        }
      }
    }
  }
  transformDate(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
  }
  playerdetalispopup() {
    this.playerdetailspopup = true;
  }
  closepopup() {
    this.playerdetailspopup = false;

  }

  onClick(event: any) {
    console.log(event)
    // console.log( this.PlayerList[event] )
    this.Reportlistfulldetails = this.Reportreslist[event]
    console.log(this.Reportlistfulldetails)
    this.playerdetailspopup = true;
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
    XLSX.writeFile(wb, 'ReruestedReportsExcelSheet.xlsx');

  }
  openUrlInNewTab(guid: any): void {

    let hexadecimalValue = guid.hiLong.toString(16).padStart(16, '0') + guid.lowLong.toString(16).padStart(16, '0');

    let ws = JSON.stringify(sessionStorage.getItem('wsession'))
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const url = `${protocol}//${hostname}/storedreport`;

    const params = new URLSearchParams({
      sid: JSON.parse(ws),
      report_id: hexadecimalValue
    });

    window.open(`${url}?${params.toString()}`, '_blank');
  }

  showmanu(i: any, reportId: any) {
    console.log(i)
    console.log(reportId)
    this.SeletedIconIndex = i;
    this.popupArrow = !this.popupArrow;
  }
  setPlayerActions(report: any, i: any, type: any) {
    console.log(report, i)
    this.popupArrow = !this.popupArrow;
    this.conformationType = '';
    // this.conformationType =`Do you want to ${type} the selected report?`;
    this.conformationType = type;
  }
  Action(conformType: any) {
    if (conformType == 'yes') {
      let body = this.Reportreslist[this.SeletedIconIndex]
      switch (this.conformationType) {
        case 'Delete': {
          this.ToolsService.deleteRequestedReport(body.guid).subscribe((res) => { console.log(res) })
          break
        }
        case 'Cancel': {
          this.ToolsService.cancelRequestedReport(body.guid).subscribe((res) => { console.log(res) })
          break
        }
      }
    } else {
      this.conformationType = '';
    }
  }
}
