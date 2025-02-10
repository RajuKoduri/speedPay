import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-currencieslist',
  templateUrl: './currencieslist.component.html',
  styleUrls: ['./currencieslist.component.css']
})

export class CurrencieslistComponent implements OnInit {
  dataLoader: boolean = false;
  loader: boolean = false;
  currencieList: any;
  walletlists: any = [];
  paymentsystemtype: any;
  paymentsystemtypesList: any = [];
  walletlist: any = [];
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 0;
  tablePrint: any;
  dataPrint: any;
  currencielist: boolean = false;
  changeCurrencies: any = [];
  body: any = [];
  Spinner: boolean = false;
  errorMessage: any
  constructor(private Cashierservice: CashierService, private FileformatServiceService: FileformatServiceService) { }

  ngOnInit(): void {
    this.walletList();
    this.paymentSystemType();
    this.onRequery();
  }

  onRequery() {
    this.currencieList = false;
    this.dataLoader = true;
    let body = {}

    this.Cashierservice.getCurrency(body).subscribe(data => this.getCurrencyData(data))
  }

  ignoreContext() {
    this.currencieList = [];
    this.dataLoader = false;
    this.currencieList = false;
  }
  walletList() {
    const wallets = localStorage.getItem('walletlist');
    if (wallets) {
      this.walletlist = JSON.parse(wallets);
      for (let i = 0; i < this.walletlist.length; i++) {
        this.walletlists.push(this.walletlist[i])
      }
    }
    console.log(this.walletlist)
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
  getCurrencyData(data: any) {
    this.dataLoader = false;
    this.currencieList = data.objectList;
    console.log(this.currencieList);

    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.currencieList != null) {
      this.dataLoader = false;
    }

    for (let i = 0; i < this.currencieList.length; i++) {
      for (let m = 0; m < this.paymentsystemtypesList.length; m++) {
        // console.log(this.currencieList[i]?.paymentSystem.lowLong == this.paymentsystemtypesList[m].guid.lowLong && this.currencieList[i]?.paymentSystem.hiLong == this.paymentsystemtypesList[m].guid.hiLong)
        console.log(this.currencieList[i]?.paymentSystem.lowLong == this.paymentsystemtypesList[m].guid.lowLong)
        if (this.currencieList[i]?.paymentSystem.lowLong == this.paymentsystemtypesList[m].guid.lowLong && this.currencieList[i]?.paymentSystem.hiLong == this.paymentsystemtypesList[m].guid.hiLong) {
          this.currencieList[i].paymentSystemName = this.paymentsystemtypesList[m].value
          break
        } else {
          this.currencieList[i].paymentSystemName = ''
        }
      }
      for (let n = 0; n < this.walletlist.length; n++) {
        if (this.currencieList[i].currency.lowLong == this.walletlist[n].guid.lowLong) {
          this.currencieList[i].currencyName = this.walletlist[n].value
          // console.log(this.currencieList)
        }
      }


    }
  }

  onFormSubmit() {
    // let fillterbody = this.getDirtyValues(this.filterForm)
    // this.LevelChangeData = false;
    this.loader = true;
  }

  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName = 'currencieslistExcelSheet.xlsx';
    XLSX.writeFile(wb, fileName);
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "currencyexchangeExeclSheet")
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
  openCurrenciesPop() {
    this.currencielist = true;
    console.log(this.currencieList)

    this.changeCurrencies = JSON.parse(JSON.stringify(this.currencieList.filter((data: any,) => {
      if (data.hasOwnProperty('paymentSystemName')) {
        if (data.paymentSystemName != '') {
          return (data)
        }
      }
    })
    ))
    console.log(this.changeCurrencies)
    // console.log(changeCurrencies)
    // this.uniquegamescaption = gamescaption.filter((item, i) => {
    //   return gamescaption.indexOf(item) === i
    // })
  }

  enableCurrencies(type: any) {
    if (type == 'yes') {
      // this.Spinner=true;
      this.body = []
      console.log(this.changeCurrencies)
      this.changeCurrencies.forEach((data: any) => {
        let body = {
          currency: data.currency,
          enabled: data.enabled,
          guid: data.guid,
          objState: data.objState,
          paymentSysCurrency: data.paymentSysCurrency,
          paymentSystem: data.paymentSystem,
        };
        this.body.push(body);
      })

      console.log(this.body)
      let body = {
        "objectList": this.body
      }

      this.errorMessage = '';
      // const idsArray1 = this.paymentsystemtypesList.map((obj: any) => obj.value);
      const idsArray1 = this.changeCurrencies.map((obj: any) => obj.paymentSystemName);
      console.log(idsArray1)
      let uniqueArray = Array.from(new Set(idsArray1));
      console.log(uniqueArray)
      console.log(this.changeCurrencies)
      const idsArray2 = this.changeCurrencies.map((obj: any) => {
        if (obj.enabled) {
          return obj.paymentSystemName
        }
      }
      );
      console.log(idsArray2)
      const notInArray2 = uniqueArray.filter((paymentSystemName: any) => !idsArray2.includes(paymentSystemName));
      console.log(notInArray2)
      if (notInArray2.length == 0) {
        // alert("1")
        this.Spinner=true;
        this.Cashierservice.setCurrency(body).subscribe(data => {
          console.log(data)
          if (data.changedObjectList) {
            this.Spinner = false;
            this.currencielist = false;
            this.onRequery();
          }
        })
      } else {
        this.errorMessage = `${notInArray2}`;
      }




      var notInArray3: any = [];
      console.log(this.paymentsystemtypesList);
      var paymentSystems: any = [];
      var paymentSystemsenabledonly: any = [];
      this.paymentsystemtypesList.forEach((name: any) => {
        // Filter payment systems by name

        this.changeCurrencies.map((system: any) => {
          if (system.paymentSystemName === name.value) {
            paymentSystems.push(system.paymentSystemName);
            if (system.enabled) {
              paymentSystemsenabledonly.push(system.paymentSystemName);
              console.log(system);
            } else {
            }
          }
        });


        console.log(paymentSystems);
        console.log(paymentSystemsenabledonly);
      });
      console.log(paymentSystems);
      const uniqueArraytwo = Array.from(new Set(paymentSystems));
      notInArray3 = uniqueArraytwo.filter((paymentSystems: any) => {
        return !paymentSystemsenabledonly.includes(paymentSystems);
      });
      console.log(uniqueArraytwo)
      console.log(notInArray3)

    } else if (type == 'no') {
      this.currencielist = false;
    }
  }
  Errorpopup() {
    this.errorMessage = '';
  }

}
