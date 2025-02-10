import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AffiliateControlService } from 'src/app/source/AffiliateControl.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-affiliatestatistics',
  templateUrl: './affiliatestatistics.component.html',
  styleUrls: ['./affiliatestatistics.component.css']
})
export class AffiliatestatisticsComponent implements OnInit {
  walletFormatsList: any;
  walletlists: any = [];
  showAbuse: any;
  showing: any;
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  AffiliateStatisticsData: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;

  constructor(private AffiliateControlService: AffiliateControlService) {
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
        if (this.walletFormatsList[i].description == "U.S. Dollars" || this.walletFormatsList[i].description == "Chips") {
          this.walletlists.push(this.walletFormatsList[i])
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
    this.AffiliateControlService.getWMasterStatistics(body).subscribe((res) => this.AffiliateResData(res))
  }
  AffiliateResData(data: any) {
    console.log(data)
    if (data) {
      this.showing = true
    }
    console.log(data)
    this.AffiliateStatisticsData = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;

    if (this.ResultCount !== null) {
      this.resultcount = false;
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
    XLSX.writeFile(wb, 'AffiliateStatisticsExcelSheet.xlsx');

  }
}
