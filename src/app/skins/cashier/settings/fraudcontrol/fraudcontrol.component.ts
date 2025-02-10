import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';

@Component({
  selector: 'app-fraudcontrol',
  templateUrl: './fraudcontrol.component.html',
  styleUrls: ['./fraudcontrol.component.css']
})
export class FraudcontrolComponent implements OnInit {
  controlList: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 10;
  tablePrint: any;
  dataPrint: any;
  fraudList: any;
  dataLoader: boolean = false;
  fraudcontrolpopup: boolean = false;
  subFraud: any = [];
  Spinner: boolean = false;

  constructor(private Cashierservice: CashierService) { }

  ngOnInit(): void {
    this.onRequery();
  }
  onRequery() {
    this.dataLoader = true;
    this.fraudList = false;
    let body = {}
    this.Cashierservice.FraudControlSettings(body).subscribe(data => this.getFraudControlData(data))
  }
  getFraudControlData(data: any) {
    console.log(data)
    this.dataLoader = false;
    this.fraudList = data.objectList[0];
    console.log(this.fraudList[0])

    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.fraudList != null) {
      this.dataLoader = false;
    }
  }
  ignoreContext() {
    this.fraudList = [];
    this.dataLoader = true;
    this.fraudList = false;
  }

  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'fraudcontrolExeclSheet.xlsx';
    XLSX.writeFile(wb, 'fraudcontrolExeclSheet.xlsx');
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
    // this.subFraud = this.fraudList[event]
    this.subFraud = JSON.parse(JSON.stringify(this.fraudList))
    console.log(this.subFraud)
    this.fraudcontrolpopup = true;
  }
  openFraudPop() {
    this.fraudcontrolpopup = true;
  }
  changeSettings(type: any) {
    if (type == 'yes') {
      this.Spinner = true;
      console.log(this.subFraud)
      let body = this.subFraud
      this.Cashierservice.setFraudControlSettings(body).subscribe(data => {
        console.log(data)
        if (data.changedObjectList) {
          this.Spinner = false;
          this.fraudcontrolpopup = false;
          this.onRequery()
        }
      });
      console.log(body)
    } else if (type == 'no') {
      this.fraudcontrolpopup = false;
    }
  }
}
