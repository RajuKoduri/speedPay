import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';

@Component({
  selector: 'app-depositlimitssettings',
  templateUrl: './depositlimitssettings.component.html',
  styleUrls: ['./depositlimitssettings.component.css']
})
export class DepositlimitssettingsComponent implements OnInit {
  DepositList: any;
  dataLoader: boolean = false;
  walletlist: any;
  walletlists: any = [];
  paymentsystemtype: any;
  paymentsystemtypesList: any = [];
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 15;
  tablePrint: any;
  dataPrint: any;
  depositlimit: boolean = false;
  walletFormats: any;
  walletFormatsList: any = [];
  value: any;
  obj: any;
  SUM: any;
  minSingleDepositAmountValue: any;
  maxSingleDepositAmountValue: any;
  depositsAmountLimitValue: any;
  ChangeDepositLimitList: any
  Spinner: boolean = false;
  initialValue: boolean = false;
  location: any;
  playerExporer: boolean = false;
  playerGUID: any;

  constructor(private Cashierservice: CashierService) {

  }
  ngOnInit(): void {
    // this.location = window.location.pathname
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;


    if (this.location == "/playerexplorer/depositlimitssettings") {
      this.playerExporer = true
      this.PlayerGuid()
      console.log(this.playerExporer)
      //  this.NickNameFilter = false
    } else {
      // this.NickNameFilter = true;
      this.playerExporer = false
      console.log(this.playerExporer)
    }



    this.walletFormat();
    this.walletList();
    this.paymentSystemType();
    this.onRequery()

  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem('Playerguid')
    console.log(Playerguid)
    if (Playerguid) {
      this.playerGUID = JSON.parse(Playerguid);
      console.log(this.playerGUID)
    }
  }

  ignoreContext() {
    this.DepositList = [];
    this.dataLoader = false;
    this.DepositList = false;
  }
  walletFormat() {
    this.walletFormats = localStorage.getItem('walletFormats')
    this.walletFormatsList = JSON.parse(this.walletFormats)
    console.log(this.walletFormatsList)
  }
  walletList() {
    const wallets = localStorage.getItem('walletTypes');

    if (wallets) {
      this.walletlist = JSON.parse(wallets);
      for (let i = 0; i < this.walletlist.length; i++) {
        if (this.walletlist[i].currency)
          this.walletlists.push(this.walletlist[i])
      }
    }
    console.log(this.walletlist)
    console.log(this.walletlists)

    for (let k = 0; k < this.walletlists.length; k++) {
      for (let l = 0; l < this.walletFormatsList.length; l++) {
        if (this.walletlists[k].guid.lowLong == this.walletFormatsList[l].guid.lowLong) {
          if (this.walletFormatsList[l].symbol) {
            this.walletlists[k].symbol = this.walletFormatsList[l].symbol
          } else {
            this.walletlists[k].symbol = ''
          }
        }
      }
    }
    console.log(this.walletlists)
  }
  paymentSystemType() {
    const paymentsystemtypes = localStorage.getItem('paymentSystemTypes');
    if (paymentsystemtypes) {
      this.paymentsystemtype = JSON.parse(paymentsystemtypes);
      console.log(this.paymentsystemtype)
      for (let i = 0; i < this.paymentsystemtype.length; i++) {
        this.paymentsystemtypesList.push(this.paymentsystemtype[i])
      }
    }
    console.log(this.paymentsystemtypesList)
  }
  onRequery() {
    this.dataLoader = true;
    this.DepositList = false;
    console.log(this.playerExporer)
    let body = {}
    if (!this.playerExporer) {
      this.Cashierservice.getDepositLimits(body).subscribe(data => this.getDepositData(data))
    } else {
      let body = {
        firstRecord: 0,
        maxCountRecord: 100,
        playerGuids: { idList: [this.playerGUID] }
      }
      this.Cashierservice.getPlayerDepositLimits(body).subscribe(data => this.getDepositData(data))
    }
  }
  getDepositData(data: any) {
    this.dataLoader = false;
    this.DepositList = data.objectList;
    console.log(this.DepositList);
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.DepositList != null) {
      this.dataLoader = false;
    }

    this.sumOfRow(this.DepositList)

    for (let i = 0; i < this.DepositList.length; i++) {

      for (let m = 0; m < this.walletlists.length; m++) {
        if (this.DepositList[i].currency.lowLong == this.walletlists[m]?.currency?.lowLong) {
          this.DepositList[i].currencyName = this.walletlists[m].description
          this.DepositList[i].symbol = this.walletlists[m].symbol
        }
      }

      for (let m = 0; m < this.paymentsystemtypesList.length; m++) {
        if (this.DepositList[i].paymentSystemType.lowLong == this.paymentsystemtypesList[m].guid.lowLong) {
          this.DepositList[i].paymentSystemTypeName = this.paymentsystemtypesList[m].value
        }
      }
      // for (let p = 0; p < this.walletFormatsList.length; p++) {      
      //   if(this.walletFormatsList[p].guid.lowLong == this.DepositList[i].minSingleDepositAmount.currency.lowLong){
      //     this.DepositList[i].currentAmount.value = this.walletFormatsList[p].symbol + this.DepositList[i].currentAmount.value;
      //   }
      //   if(this.walletFormatsList[p].guid.lowLong ==this.DepositList[i].simulatedAmount.wallet.lowLong){
      //     this.DepositList[i].simulatedAmount.value = this.walletFormatsList[p].symbol + this.DepositList[i].simulatedAmount.value;
      //   }
      // }

    }
  }
  sumOfRow(data: any) {
    this.obj = data
    console.log(this.obj);
    this.minSingleDepositAmountValue = this.obj.reduce((a: any, b: { minSingleDepositAmount: any; }) => (a + b.minSingleDepositAmount.value), 0);
    console.log(this.minSingleDepositAmountValue)
    this.maxSingleDepositAmountValue = this.obj.reduce((a: any, b: { maxSingleDepositAmount: any; }) => (a + b.maxSingleDepositAmount.value), 0);
    console.log(this.maxSingleDepositAmountValue)
    this.depositsAmountLimitValue = this.obj.reduce((a: any, b: { depositsAmountLimit: any; }) => (a + b.depositsAmountLimit.value), 0);
    console.log(this.depositsAmountLimitValue)
  }


  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'depositLimitExeclSheet.xlsx';
    XLSX.writeFile(wb, 'depositLimitExeclSheet.xlsx');
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
  openDepositPop() {
    this.depositlimit = true;
    this.ChangeDepositLimitList = JSON.parse(JSON.stringify(this.DepositList))
  }
  depositpopupsub(type: any) {
    if (type == 'yes') {
      // this.Spinner = true;
      console.log(this.ChangeDepositLimitList)
      let payload: any = []
      this.ChangeDepositLimitList.forEach((data: any) => {
        let body = {
          objState: data.objState,
          default: data.default,
          // guid: data.guid,
          depositsAmountLimit: data.depositsAmountLimit,
          depositsNumberLimit: data.depositsNumberLimit,
          limitPeriod: data.limitPeriod,
          maxSingleDepositAmount: data.maxSingleDepositAmount,
          minSingleDepositAmount: data.minSingleDepositAmount,
          paymentSystemType: data.paymentSystemType,
        };
        payload.push(body);
      })

      let body = {
        depositLimits: payload,
        applyToAll: this.initialValue,
      }
      console.log(body)
      console.log(this.initialValue)
      this.Cashierservice.setDepositLimits(body).subscribe(data => {
        console.log(data)
        if (data.changedObjectList) {
          this.depositlimit = false;
          this.Spinner = false;
          this.onRequery();
        }
      })
    } else if (type == 'no') {
      this.depositlimit = false;
    }
  }


  onChange(checked: boolean) {
    if (checked) {
      this.initialValue = checked
      console.log('Checkbox is checked', checked);
    } else {
      this.initialValue = checked
      console.log('Checkbox is unchecked', checked);
    }
  }

}
