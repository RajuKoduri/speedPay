import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { AccountingService } from 'src/app/source/accounting.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { TotalSumsService } from 'src/app/source/total-sums.service';

@Component({
  selector: 'app-acplayerbalance',
  templateUrl: './acplayerbalance.component.html',
  styleUrls: ['./acplayerbalance.component.css']
})
export class AcplayerbalanceComponent implements OnInit {
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
  playerBalance: any;
  dataLoader: boolean = false;
  playerBalpopup: boolean = false;
  subPlayer: any = [];
  currencys: any = [];
  value: any;
  obj: any;
  SUM: any;
  openingBalanceValue: any;
  periodRevenueValue: any;
  periodExpenseValue: any;
  totalTurnoverValue: any;
  closingBalanceValue: any;
  selectedCurrency: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false
  location: any;
  playerExplorer: boolean = false;
  PlayerguidList: any;


  constructor(private accountingService: AccountingService, private FileformatServiceService: FileformatServiceService,
    private totalSumService:TotalSumsService
  ) {
    this.filterForm = new FormGroup({
      currency: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
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

    this.playerExplorerCheck();
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/acplayerbalance") {
      this.playerExplorer = true;
      this.PlayerGuid();
    } else {
      this.playerExplorer = false;
    }
  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem("Playerguid");
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }

  ignoreContext() {
    this.playerBalance = [];
    this.dataLoader = true;
    this.playerBalance = false;
  }

  fillterMenu() {
    this.FillterList = !this.FillterList;
  }

  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].description == "Free Money" || this.wallettypelist[i].description == "Play Money" || this.wallettypelist[i].description == "Comp Points") {
        //   // this.currencys.push(this.wallettypelist[i])
        //   console.log(this.wallettypelist[i])
        // }else{
        //   this.currencys.push(this.wallettypelist[i])
        // }
        if (this.wallettypelist[i].clubGameWallet == true) {
          if (this.wallettypelist[i].description !== "Play Money") {
            this.currencys.push(this.wallettypelist[i])
          }
        }
        console.log(this.currencys)
      }
      this.selectedCurrency = this.currencys[0]?.guid
    }
  }
  getValues(form: any) {
    let Values: any = {};
    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            Values[key] = this.getValues(currentControl);
        }
      });
    return Values;

  }
  onFormSubmit() {
    this.FillterList = false;
    this.dataLoader = true;
    this.playerBalance = false;
    console.log(this.filterForm.value)
    let body = {
      "wallet": this.filterForm.value.currency != null ? this.filterForm.value.currency : undefined,
      "reportingPeriod": this.filterForm.value.reportingPeriodTo != null ? this.filterForm.value.reportingPeriodTo : undefined
    }
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    let fillterbody = this.getValues(this.filterForm)
    fillterbody["wallet"] = this.filterForm.value.currency != null ? this.filterForm.value.currency : undefined
    // fillterbody["reportingPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
    //   "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
    //   "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    // } : undefined
    fillterbody["firstRecord"] = (this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;

    // fillterbody["reportingPeriod"] = this.filterForm.value.reportingPeriodTo != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined
    if (!this.playerExplorer) {
      this.accountingService.getAccPlayersBalance(fillterbody).subscribe((res) => { this.getPlayerData(res) })
    } else {
      fillterbody["idList"] = [this.PlayerguidList]
      this.accountingService.getPlayerSummaryBalances(fillterbody).subscribe((res) => { this.getPlayerData(res) })
    }
  }

  getPlayerData(data: any) {
    this.dataLoader = false;
    this.playerBalance = data.objectList;
    console.log(this.playerBalance)
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;
    console.log(this.playerBalance)
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.playerBalance != null) {
      this.dataLoader = false;
    }
    this.sumOfRow(this.playerBalance)

    for (let i = 0; i < this.playerBalance.length; i++) {
      for (let m = 0; m < this.wallettypelist.length; m++) {
        if (this.playerBalance[i]?.currencys?.lowLong == this.wallettypelist[m].guid.lowLong) {
          this.playerBalance[i].currencys = this.wallettypelist[m].value
        }
      }
    }
    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }

  getWalletSymbol(wallet: any) {
    return this.totalSumService.walletSymbol(wallet)
  }


  sumOfRow(data: any) {
    this.obj = data
    console.log(this.obj);
    this.openingBalanceValue = this.obj.reduce((a: any, b: { openingBalance: any; }) => (a + Number(b.openingBalance.value)), 0);
    console.log(this.openingBalanceValue)
    this.periodRevenueValue = this.obj.reduce((a: any, b: any) => !this.playerExplorer?(a + Number(b.periodRevenue.value)):(a + Number(b.revenue.value)), 0);
    console.log(this.periodRevenueValue)
    this.periodExpenseValue = this.obj.reduce((a: any, b: any) =>!this.playerExplorer?(a + Number(b.periodExpense.value)):(a + Number(b.expense.value)), 0);
    console.log(this.periodExpenseValue)
    this.totalTurnoverValue = this.obj.reduce((a: any, b: { totalTurnover: any; }) => (a + Number(b.totalTurnover.value)), 0);
    console.log(this.totalTurnoverValue)
    this.closingBalanceValue = this.obj.reduce((a: any, b: { closingBalance: any; }) => (a + Number(b.closingBalance.value)), 0);
    console.log(this.closingBalanceValue)
  }
  FormReset() {
    this.filterForm.reset();
  }
  onClick(event: any) {
    console.log(event)
    this.subPlayer = this.playerBalance[event]
    console.log(this.subPlayer)
    this.playerBalpopup = true;
  }
  openPlayerPop() {
    this.playerBalpopup = true;
  }
  closePopup() {
    this.playerBalpopup = false;
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
  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({ firstRecord: parseInt('1') });
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
  }

  fastforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else {
      //   this.filterForm.patchValue({
      //     firstRecord: (Math.floor((this.ResultCount - 1) / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) + 1
      // });
      this.filterForm.patchValue({
        firstRecord: Math.floor((this.ResultCount - 1) / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });
    }

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // if (this.PageCount > this.playerBalance.length) {
    //   this.pagecontrolbtn = true;
    // }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );

  }

  next() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
        // console.log(typeof this.filterForm.value.firstRecord)
      });
    }
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter) + 1 + parseInt(this.filterForm.value.maxCountRecord)
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord),
      });
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    console.log(this.filterForm.value.firstRecord);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // if (this.FirstrecordFillter) {

    //   this.FirstrecordFillter++
    //   console.log(this.FirstrecordFillter)
    // }
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  prev() {
    console.log('......Hhello......');
    if (this.filterForm.value.firstRecord - 1 == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        // firstRecord:parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)-1
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1;
    if (this.PageCount > this.playerBalance.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'PlayerBalanceExeclSheet.xlsx';
    XLSX.writeFile(wb, 'PlayerBalanceExeclSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerBalanceExeclSheet")
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
