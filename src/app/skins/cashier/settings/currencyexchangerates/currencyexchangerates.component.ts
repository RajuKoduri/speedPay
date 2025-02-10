import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs'
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';


@Component({
  selector: 'app-currencyexchangerates',
  templateUrl: './currencyexchangerates.component.html',
  styleUrls: ['./currencyexchangerates.component.css']
})
export class CurrencyexchangeratesComponent implements OnInit {
  dataLoader: boolean = false;
  Exchangelist: any;
  currencyFormat: any;
  currencyFormatList: any = [];
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 0;
  tablePrint: any;
  dataPrint: any;
  currencypopup: boolean = false;
  subCurrency: any = [];
  rateRetriversList: any;

  constructor(private Cashierservice: CashierService,private DateTimePipe:DateTimePipe,
    private FileformatServiceService:FileformatServiceService) { }

  ngOnInit(): void {
    
    this.CurrencyFormatList();
    this.onRequery()
    this.rateRetrivers()
  }
  rateRetrivers() {
    const rateRetrivers = localStorage.getItem("rateRetrivers");
    if (rateRetrivers) {
      this.rateRetriversList = JSON.parse(rateRetrivers)
    }
  }
  onRequery() {
    this.Exchangelist = [];
    this.dataLoader = true;
    let body = {}
    this.Cashierservice.Exchangelist(body).subscribe(data => this.getExchangelist(data))
  }
  ignoreContext() {
    this.Exchangelist = [];
    this.dataLoader = false;
    this.Exchangelist = false;
  }
  CurrencyFormatList() {
    const currencyFormat = localStorage.getItem('walletTypes');
    if (currencyFormat) {
      let currencyList = JSON.parse(currencyFormat);
      for (let i = 0; i < currencyList.length; i++) {
        if (currencyList[i].clubGameWallet == true && currencyList[i].description !== "Play Money") {
          this.currencyFormatList.push(currencyList[i])
        }
      }
    }
    console.log(this.currencyFormatList)
  }
  getExchangelist(data: any) {
    this.dataLoader = false;

    this.Exchangelist = data.objectList;
    console.log(this.Exchangelist);

    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null || this.ResultCount == 0) {
      this.resultcount = false;
    }

    if (this.Exchangelist != null) {
      this.dataLoader = false;
    }

    // for (let j = 0; j < this.currencyFormatList.length; j++) {
    //   for (let i = 0; i < this.Exchangelist.length; i++) {
    //     console.log(this.Exchangelist[i].currency.lowLong == this.currencyFormatList[j]?.currency?.lowLong)
    //     if (this.Exchangelist[i].currency.lowLong == this.currencyFormatList[j]?.currency?.lowLong) {
    //       this.Exchangelist[i].currency = this.currencyFormatList[j].description
    //     }
    //   }
    // }
    for (let i = 0; i < this.Exchangelist.length; i++) {
      for (let m = 0; m < this.currencyFormatList.length; m++) {
        if (this.Exchangelist[i].currency.lowLong == this.currencyFormatList[m].currency.lowLong) {
          this.Exchangelist[i].currency = this.currencyFormatList[m].description
        }
      }
    }
  }


  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'currencyexchangeExcelSheet.xlsx';
    XLSX.writeFile(wb, 'currencyexchangeExcelSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element,"currencyexchangeExeclSheet")

  }
  changeSelect(date:string){
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
     return (c)
  }
  onPrint() {
    this.tablePrint = document.getElementById("tablerecords");
    this.dataPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    console.log(this.tablePrint)
    console.log(this.dataPrint)
    this.dataPrint.document.write(this.tablePrint.innerHTML);
    this.dataPrint.document.close();
    this.dataPrint.focus();
    this.dataPrint.print();
    this.dataPrint.close();
  }
  onClick(event: any) {
    console.log(event)
    this.subCurrency = this.Exchangelist[0]
    console.log(this.subCurrency)
    // this.currencypopup = true;
  }
  openCurrencyPop() {
    this.currencypopup = true;
  }
  closePopup() {
    this.currencypopup = false;
  }
}
