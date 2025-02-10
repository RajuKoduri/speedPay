import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';

@Component({
  selector: 'app-merchantsettings',
  templateUrl: './merchantsettings.component.html',
  styleUrls: ['./merchantsettings.component.css']
})
export class MerchantsettingsComponent implements OnInit {
  merchantsettings: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 0;
  tablePrint: any;
  dataPrint: any;
  dataLoader: boolean = false;
  merchantpopup: boolean = false;
  subMerchant: any = [];
  Spinner: boolean = false;

  constructor(private Cashierservice: CashierService) {

  }
  ngOnInit(): void {
    this.onRequery()
  }
  ignoreContext() {
    this.merchantsettings = [];
    this.merchantsettings = false;
    this.dataLoader = false;
  }
  onRequery() {
    this.dataLoader = true;
    this.merchantsettings = false;
    let body = {}
    this.Cashierservice.Merchantsettings(body).subscribe(data => this.getMerchantData(data))
  }
  getMerchantData(data: any) {
    this.dataLoader = false;
    this.merchantsettings = data.objectList;
    console.log(this.merchantsettings[0])

    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.merchantsettings != null) {
      this.dataLoader = false;
    }
  }


  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'fraudcontrolExeclSheet.xlsx';
    XLSX.writeFile(wb, 'MerchantsettingsExeclSheet.xlsx');
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
    this.subMerchant = JSON.parse(JSON.stringify(this.merchantsettings[event]))
    console.log(this.subMerchant)
    this.merchantpopup = true;
  }
  openMerchantPop() {
    this.merchantpopup = true;
  }
  Changemerchantsettings(type: any) {
    if (type == 'yes') {
      this.Spinner =true;
      
      console.log(this.subMerchant)
      const keysToExtract = ["paymentSystemId"];
      const selectedKeysObject: any = {};
      // keysToExtract.forEach(key => {
      //   if (this.subMerchant.hasOwnProperty(!key)) {
      //     selectedKeysObject[key] = this.subMerchant[key];
      //   }
      // });
      Object.keys(this.subMerchant).forEach(key => {
        if (!keysToExtract.includes(key)) {
          selectedKeysObject[key] = this.subMerchant[key];
        }
      });
      console.log(selectedKeysObject);
      let body = selectedKeysObject
      this.Cashierservice.setMerchantSettings(body).subscribe((data) => {
        console.log(data);
        if(data.changedObjectList){
          this.Spinner =false;
          this.merchantpopup = false;
          this.onRequery()
        }
      })

    } else if (type == 'no') {
      this.merchantpopup = false;
    }
  }
}
