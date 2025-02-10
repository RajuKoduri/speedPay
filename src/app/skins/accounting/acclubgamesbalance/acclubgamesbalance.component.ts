import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator} from'@angular/forms';
import { AccountingService } from 'src/app/source/accounting.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';


@Component({
  selector: 'app-acclubgamesbalance',
  templateUrl: './acclubgamesbalance.component.html',
  styleUrls: ['./acclubgamesbalance.component.css']
})
export class AcclubgamesbalanceComponent implements OnInit {
  filterForm: FormGroup;
  FillterList: boolean = true;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 10;
  tablePrint: any;
  dataPrint: any;
  walletstypes: any;
  wallettypelist: any = [];
  dataLoader: boolean = false;
  clubGames: any;
  clubBalpopup: boolean = false;
  subClub: any = [];
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

  constructor(private accountingService: AccountingService,private FileformatServiceService: FileformatServiceService) { 
    this.filterForm = new FormGroup({
      currency: new FormControl(), 
      startDate: new FormControl(),
      endDate: new FormControl(),
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
    this.clubGames = [];
    this.dataLoader = true;
    this.clubGames = false;
  }
  
  fillterMenu(){
    this.FillterList = !this.FillterList;
  }
  exportExcel(){
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName:'ClubgamesbalanceExeclSheet.xlsx';
    XLSX.writeFile(wb, 'ClubgamesBalanceExeclSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "ClubgamesBalanceExeclSheet")
  }
  
  onFormSubmit() {
    this.FillterList = false;
    this.dataLoader = true;
    this.clubGames = false;
    console.log(this.filterForm.value)
      let body={
      "wallet": this.filterForm.value.currency !=null ? this.filterForm.value.currency :undefined,
      "reportingPeriod":this.filterForm.value.reportingPeriodTo  !=null ? this.filterForm.value.reportingPeriodTo:undefined
    } 
    let fillterbody = this.getValues(this.filterForm)
    fillterbody["wallet"] = this.filterForm.value.currency != null ? this.filterForm.value.currency : undefined
    // fillterbody["reportPeriod"] = this.filterForm.value.reportingPeriodTo != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined
    fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
      "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
      "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    } : undefined
    this.accountingService.ClubList(fillterbody).subscribe((res) => { this.getClubtData(res) })
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
  getClubtData(data:any){
    this.dataLoader = false;
    this.clubGames = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;
    console.log(this.clubGames)
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.clubGames != null) {
      this.dataLoader = false;
    }
    this.sumOfRow(this.clubGames)

    for (let i = 0; i < this.clubGames.length; i++) {
      for (let m = 0; m < this.wallettypelist.length; m++) {
        if(this.clubGames[i]?.currencys?.lowLong == this.wallettypelist[m].guid.lowLong) {
          this.clubGames[i].currencys = this.wallettypelist[m].value
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
    this.subClub = this.clubGames[event]
    console.log(this.subClub)
    this.clubGames = true;
  }
  openClubPop() {
    this.clubBalpopup = true;
  }
  closePopup() {
    this.clubBalpopup = false;
  }
  sumOfRow(data:any){
    this.obj = data
    console.log(this.obj);
    this.openingBalanceValue = this.obj.reduce((a: any, b:{openingBalance: any;}) => (a + b.openingBalance.value),0);
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

  timechnage(data: any) {
    console.log(data.target.value)
  } 
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
}
