import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-agentstatistics',
  templateUrl: './agentstatistics.component.html',
  styleUrls: ['./agentstatistics.component.css']
})
export class AgentstatisticsComponent implements OnInit {
  showAbuse: any;
  showing: any;
  FillterMenu: boolean = true;
  filterForm: FormGroup;
  walletFormatsList: any;
  walletlists: any = [];
  AgentStatisticsData: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  CurrencyList: any;

  constructor(private AgentControlService: AgentControlService,private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      Currency: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.walletFormats();
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  totalAbuse() {
    this.showAbuse = !this.showAbuse
  }
  Abusearrow() {
    this.showing = !this.showing
  }

  walletFormats() {
    const walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      this.walletFormatsList = JSON.parse(walletTypes)
      for (let i = 0; i < this.walletFormatsList.length; i++) {
        // if (this.walletFormatsList[i].description == "U.S. Dollars" || this.walletFormatsList[i].description == "Chips") {
        if (this.walletFormatsList[i].faceWallet==true) {
          this.walletlists.push(this.walletFormatsList[i])
          this.CurrencyList=this.walletlists[0].guid
        }
      }
    }
    console.log(this.walletFormatsList)
    console.log(this.walletlists)
  }

  onFormSubmit() {
    console.log(this.filterForm.value)
    this.FillterMenu = false;
    this.showing = false
    let body = {
      "wallet": this.filterForm.value.Currency != null ? this.filterForm.value.Currency : undefined
    }
    this.AgentControlService.getAgentStatistics(body).subscribe((res) => this.AgentResData(res))
  }
  AgentResData(data: any) {
    if (data) {
      this.showing = true
    }
    console.log(data)
    this.AgentStatisticsData = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;

    if (this.ResultCount !== null) {
      this.resultcount = false;
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
    XLSX.writeFile(wb, 'AgentStatisticsExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AgentStatisticsExcelSheet")
  }
}
