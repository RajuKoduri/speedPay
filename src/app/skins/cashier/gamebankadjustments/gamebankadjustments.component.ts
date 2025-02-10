import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-gamebankadjustments',
  templateUrl: './gamebankadjustments.component.html',
  styleUrls: ['./gamebankadjustments.component.css']
})
export class GamebankadjustmentsComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  loader: boolean = false;
  GameBankAdjust: any;
  walletlist: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  OwnerTypeList: any;
  constructor(private Cashierservice: CashierService) {
    this.filterForm = new FormGroup({
      DatePeriodfrom: new FormControl(),
      DatePeriodto: new FormControl(),
      currency: new FormControl(),
      Admin: new FormControl(),
      BankOwnerType: new FormControl(),
      BankOwnerName: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
    })
  }

  ngOnInit(): void {
    this.walletlistmethod();
    this.OwnerType();
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  walletlistmethod() {
    const wallets = localStorage.getItem('walletlist');
    if (wallets) {
      this.walletlist = JSON.parse(wallets);

    }
    console.log(this.walletlist)
  }
  OwnerType(){
    const OwnerType = localStorage.getItem("OwnerType")
    if(OwnerType){
      this.OwnerTypeList = JSON.parse(OwnerType)
    }
    console.log(this.OwnerTypeList)
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
    console.log(this.filterForm.value)
    this.loader = true
    this.GameBankAdjust = false;
    this.FillterMenu = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    this.Cashierservice.listGameBankAdjustments(fillterbody).subscribe((res) => this.GameBankAdjustResData(res))

  }
  GameBankAdjustResData(data: any) {
    console.log(data)
    this.GameBankAdjust = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.GameBankAdjust != null) {
      this.loader = false;
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
    XLSX.writeFile(wb, 'GAmeBankAdjustmentExcelSheet.xlsx');

  }
}
