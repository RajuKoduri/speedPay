import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';


@Component({
  selector: 'app-walletexchangessettings',
  templateUrl: './walletexchangessettings.component.html',
  styleUrls: ['./walletexchangessettings.component.css']
})
export class WalletexchangessettingsComponent implements OnInit {
  WalletList: any;
  dataLoader: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 10;
  tablePrint: any;
  dataPrint: any;
  walletpopup: boolean = false;
  subWallet: any = [];
  Spinner: boolean = false;

  constructor(private Cashierservice: CashierService) { }

  ngOnInit(): void {
    this.onRequery();
  }
  onRequery() {
    this.dataLoader = true;
    let body = {}
    this.Cashierservice.getWalletExchangeSettings(body).subscribe(data => this.getWalletExchangeData(data))
  }
  ignoreContext() {
    this.WalletList = [];
    this.dataLoader = false;
    this.WalletList = false;
  }
  getWalletExchangeData(data: any) {
    this.dataLoader = false;
    this.WalletList = data.objectList[0];
    console.log(this.WalletList)

    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.WalletList != null) {
      this.dataLoader = false;
    }
  }


  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'fraudcontrolExeclSheet.xlsx';
    XLSX.writeFile(wb, 'WalletExchangSettingExeclSheet.xlsx');
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
    // this.subWallet = this.WalletList[event]
    this.subWallet = JSON.parse(JSON.stringify(this.WalletList))
    console.log(this.subWallet)
    this.walletpopup = true;
  }
  openWalletPop() {
    this.walletpopup = true;
    this.onClick('i')
  }
  ChangeSettings(type: any) {
    if (type == 'yes') {
      this.Spinner = true;
      console.log(this.subWallet)
      this.Cashierservice.setWalletExchangeSettings(this.subWallet).subscribe((data) => {
        console.log(data)
        if (data.objectList) {
          this.Spinner = false;
          this.walletpopup = false;
          this.onRequery();
        }
      })
    } else if (type == 'no') {
      this.walletpopup = false;
    }
  }
}
