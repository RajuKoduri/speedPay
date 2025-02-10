import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators} from'@angular/forms';
import { AccountingService } from 'src/app/source/accounting.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';


@Component({
  selector: 'app-acagentsnestedbalance',
  templateUrl: './acagentsnestedbalance.component.html',
  styleUrls: ['./acagentsnestedbalance.component.css']
})
export class AcagentsnestedbalanceComponent implements OnInit {
  filterForm: FormGroup;
  FillterList: boolean = true;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 15;
  tablePrint: any;
  dataPrint: any;
  walletstypes: any;
  wallettypelist: any = [];
  nestedBalance: any;
  dataLoader: boolean = false;
  nestedBalpopup: boolean = false;
  subNested: any = [];
  currencys: any = [];
  value: any;
  obj: any;
  SUM: any;
  openingBalanceValue:any;
  periodRevenueValue:any;
  periodExpenseValue:any;
  totalTurnoverValue:any;
  closingBalanceValue:any;
  selectedCurrency: any;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

  // endDate: any;
  // todaydate: any;
  // startDate: any; 
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  // steddate: boolean = false
  // timeerror: boolean = false


  constructor(private accountingService: AccountingService ,private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      currency: new FormControl(), 
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      enddate: new FormControl(),
      })
   }

  ngOnInit(): void {
    this.walletTypes();

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
  }
  ignoreContext() {
    this.nestedBalance = [];
    this.dataLoader = true;
    this.nestedBalance = false;
  }
  fillterMenu(){
    this.FillterList = !this.FillterList;
  }
  exportExcel(){
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName:'AgentsNestedbalanceExeclSheet.xlsx';
    XLSX.writeFile(wb, 'AgentsNestedBalanceExeclSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AgentsNestedBalanceExeclSheet")
  }
  onFormSubmit(){
    let fillterbody = this.getValues(this.filterForm)
    fillterbody["wallet"] = this.filterForm.value.currency !=null ? this.filterForm.value.currency :undefined,
    // fillterbody["reportingPeriod"] = this.filterForm.value.reportingPeriodTo != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined
    fillterbody["reportPeriod"] =  (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
    (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;
    // fillterbody["reportPeriod"] =  (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime,
    // "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "")? {"end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime }: undefined

    // console.log(this.filterForm.value.currency);
    // console.log(this.filterForm.value.reportingPeriodFrom);
    // console.log(this.filterForm.value.reportingPeriodTo);
    this.accountingService.AgentsNestedList(fillterbody).subscribe((res) => {this.getAgentsNestedBalancetData(res)})

  }

  getValues(form: any){
    let Values:any ={};
    Object.keys(form.controls)
    .forEach(key =>{
      let currentControl = form.controls[key];
  
      if(currentControl.dirty) {
        if (currentControl.controls)
          Values[key]  = this.getValues(currentControl);
      }
    });
    return Values;

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
  getAgentsNestedBalancetData(data:any){
    this.dataLoader = false;
    this.nestedBalance = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;
    console.log(this.nestedBalance)
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.nestedBalance != null) {
      this.dataLoader = false;
    }
    this.sumOfRow(this.nestedBalance)

    for (let i = 0; i < this.nestedBalance.length; i++) {
      for (let m = 0; m < this.wallettypelist.length; m++) {
        if(this.nestedBalance[i].currencys.lowLong == this.wallettypelist[m].guid.lowLong) {
          this.nestedBalance[i].currencys = this.wallettypelist[m].value
        }
      }
    }
  }
  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        if (this.wallettypelist[i].description == "Free Money" || this.wallettypelist[i].description == "Play Money" || this.wallettypelist[i].description == "Comp Points") {
          // this.currencys.push(this.wallettypelist[i])
          // console.log(this.wallettypelist[i])
        }else{
          this.currencys.push(this.wallettypelist[i])
        }
        console.log(this.currencys)
      }
      this.selectedCurrency=this.currencys[0].guid
    }
  }
  onClick(event: any) {
    console.log(event)
    this.subNested = this.nestedBalance[event]
    console.log(this.subNested)
    this.nestedBalpopup = true;
  }
  openNestedPop() {
    this.nestedBalpopup = true;
  }
  closePopup() {
    this.nestedBalpopup = false;
  }
  sumOfRow(data:any){
    this.obj = data
    console.log(this.obj);
    this.openingBalanceValue = this. obj.reduce((a: any, b:{openingBalance: any;}) => (a + b.openingBalance.value),0);
    console.log(this.openingBalanceValue)
    this.periodRevenueValue = this.obj.reduce((a: any, b:{periodRevenue: any;}) => (a + b.periodRevenue.value), 0);
    console.log(this.periodRevenueValue)
    this.periodExpenseValue = this.obj.reduce((a: any, b:{periodExpense: any;}) => (a + b.periodExpense.value), 0);
    console.log(this.periodExpenseValue)
    this.totalTurnoverValue = this.obj.reduce((a: any, b:{totalTurnover: any;}) => (a + b.totalTurnover.value), 0);
    console.log(this.totalTurnoverValue)
    this.closingBalanceValue = this.obj.reduce((a: any, b:{closingBalance: any;}) => (a + b.closingBalance.value), 0);
    console.log(this.closingBalanceValue)
  }
  FormReset(){
    this.filterForm.reset();
  }
  // timechnage(data: any) {
  //   console.log(data.target.value)
  // } 
  showDate(data: any) {
    console.log(this.filterForm.value.endDate)
    if (this.filterForm.value.startDate > this.filterForm.value.endDate) {

      this.steddate = true;
    } else {
      this.steddate = false;
    }

    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    } else {
      this.timeerror = false;
    }

    this.filterForm.valueChanges.subscribe(x => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()) {
        console.log("indirect")
        console.log(this.filterForm.value.endDate)
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    });
  }
  timechange(data: any) {
    console.log(data.target.value)
    console.log(this.filterForm.value.startTime)
    console.log(this.filterForm.value.endTime)
    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }

  }

}
