import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { AccountingService } from 'src/app/source/accounting.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-accountingsummary',
  templateUrl: './accountingsummary.component.html',
  styleUrls: ['./accountingsummary.component.css']
})
export class AccountingsummaryComponent implements OnInit {
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
  currencyFormats: any;
  currencyFormatsList: any = [];
  accSummary: any;
  dataLoader: boolean = false;
  SummaryPopup: boolean = false;
  subSummary: any = [];
  currencys: any = [];
  value: any;
  obj: any;
  SUM: any;
  fundsCanBeWithdrawnValue: any;
  casinoBalanceValue: any;
  cumulativeCasinoJackpotsAmountValue: any;
  TotalPlayers: any;
  totalPlayersBalanceValue: any;
  lockedBonusesValue: any;
  badBeatJackpotAmountValue: any;
  TotalPurchaseTransactions: any;
  totalPurchasesValue: any;
  totalPendingCashoutsValue: any;
  totalChargebacksValue: any;
  TotalWithdrawalsTransactions: any;
  totalWithdrawalsValue: any;
  TotalAgents: any;
  agentBalanceValue: any;
  totalTransfersAgentToPlayerValue: any;
  totalTransfersAgentToAgentValue: any;
  payableToAgentsValue: any;
  TotalWebmasters: any;
  payableToWebmastersValue: any;
  botStrategyBalanceValue: any;
  totalChargeBacksForSelTimeValue: any;
  totalInitiatedCashoutsForSelTimeValue: any;
  totalApprovedCashoutsForSelTimeValue: any;
  TotalCanceledCashoutsForSelTime: any;
  cumulativeGameBanksAmountValue: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  selectedCurrency: any;
  // cumulativeCasinoJackpotsAmountValue: any;
  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

  constructor(private accountingService: AccountingService,private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      currency: new FormControl(), 
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(1),
    })
  }

  ngOnInit(): void {
    this.walletTypes();
    this.currencyFormat();

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
    this.accSummary = [];
    this.dataLoader = true;
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
      }
      this.selectedCurrency=this.currencys[0].guid
      console.log(this.currencys)
    }
  }
  currencyFormat() {
    this.currencyFormats = localStorage.getItem('walletFormats')
    this.currencyFormatsList = JSON.parse(this.currencyFormats)
    console.log(this.currencyFormatsList)
  }
  fillterMenu() {
    this.FillterList = !this.FillterList;
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'AccsummaryExeclSheet.xlsx';
    XLSX.writeFile(wb, 'AccsummaryExeclSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AccsummaryExeclSheet")
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

  onFormSubmit() {
    this.FillterList = false;
    this.dataLoader = true;
    this.accSummary = false;
    console.log(this.filterForm.value)
    // let body = {
    //   "wallet": this.filterForm.value.currency != null ? this.filterForm.value.currency : undefined,
    //   "reportingPeriod": this.filterForm.value.reportingPeriodTo != null ? this.filterForm.value.reportingPeriodTo : undefined
    // }
    if (this.filterForm.value.maxCountRecord > 1) {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    } else {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord - 1 / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    }
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }
    let fillterbody = this.getValues(this.filterForm)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["wallet"] = this.filterForm.value.currency != null ? this.filterForm.value.currency : undefined
    // fillterbody["reportPeriod"] = this.filterForm.value.reportingPeriodTo != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined
    fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
      "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
      "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    } : undefined
    this.accountingService.SummaryList(fillterbody).subscribe(data => this.getSummaryData(data))

  }
  getSummaryData(data: any) {
    console.log(data)
    this.dataLoader = false;
    this.accSummary = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;
    console.log(this.accSummary);

    if (this.ResultCount !== null || this.accSummary != null) {
      this.resultcount = false;
    }
    if (this.accSummary != null) {
      this.dataLoader = false;
    }

    // if (this.accSummary != null) {
    //   this.ResultCount = false;
    // }
    this.sumOfRow(this.accSummary)

    for (let i = 0; i < this.accSummary.length; i++) {
      // for (let m = 0; m < this.wallettypelist.length; m++) {
      //   if (this.accSummary[i].currencys.lowLong == this.wallettypelist[m].guid.lowLong) {
      //     this.accSummary[i].currencys = this.wallettypelist[m].value
      //   }
      // }
      // for (let n = 0; n < this.currencyFormatsList.length; n++) {
      //   if(this.currencyFormatsList[n].symbol)
      //   if (this.currencyFormatsList[n].guid.lowLong == this.accSummary[i].fundsCanBeWithdrawn.wallet.lowLong) {
      //     this.accSummary[i].fundsCanBeWithdrawn.value = this.currencyFormatsList[n].symbol + this.accSummary[i].fundsCanBeWithdrawn.value
      //   }
      // }
    }
  }
  onClick() {
    console.log(event)
    // this.subSummary = this.accSummary[event]
    this.subSummary = this.accSummary[0]
    console.log(this.subSummary)
    this.SummaryPopup = true;
  }
  openSummaryPop() {
    this.SummaryPopup = true;
  }
  closePopup() {
    this.SummaryPopup = false;
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

  sumOfRow(data: any) {
    //   this.obj = data
    //   console.log(this.obj);
    //   this.fundsCanBeWithdrawnValue = this.obj.reduce((a: any, b: { fundsCanBeWithdrawn: any; }) => (a + b.fundsCanBeWithdrawn.value), 0);
    //   console.log(this.fundsCanBeWithdrawnValue)
    //   this.casinoBalanceValue = this.obj.reduce((a: any, b: { casinoBalance: any; }) => (a + b.casinoBalance.value), 0);
    //   console.log(this.casinoBalanceValue)
    //   this.cumulativeCasinoJackpotsAmountValue = this.obj.reduce((a: any, b: { cumulativeCasinoJackpotsAmount: any; }) => (a + b.cumulativeCasinoJackpotsAmount.value), 0);
    //   console.log(this.cumulativeCasinoJackpotsAmountValue)
    //   this.TotalPlayers = this.obj.reduce((a: any, b: { totalPlayers: any; }) => (a + b.totalPlayers), 0);
    //   console.log(this.TotalPlayers)
    //   this.totalPlayersBalanceValue = this.obj.reduce((a: any, b: { totalPlayersBalance: any; }) => (a + b.totalPlayersBalance.value), 0);
    //   console.log(this.totalPlayersBalanceValue)
    //   this.lockedBonusesValue = this.obj.reduce((a: any, b: { lockedBonuses: any; }) => (a + b.lockedBonuses.value), 0);
    //   console.log(this.lockedBonusesValue)
    //   this.badBeatJackpotAmountValue = this.obj.reduce((a: any, b: { badBeatJackpotAmount: any; }) => (a + b.badBeatJackpotAmount.value), 0);
    //   console.log(this.badBeatJackpotAmountValue)
    //   this.TotalPurchaseTransactions = this.obj.reduce((a: any, b: { totalPurchaseTransactions: any; }) => (a + b.totalPurchaseTransactions), 0);
    //   console.log(this.TotalPurchaseTransactions)
    //   this.totalPurchasesValue = this.obj.reduce((a: any, b: { totalPurchases: any; }) => (a + b.totalPurchases.value), 0);
    //   console.log(this.totalPurchasesValue)
    //   this.totalPendingCashoutsValue = this.obj.reduce((a: any, b: { totalPendingCashouts: any; }) => (a + b.totalPendingCashouts.value), 0);
    //   console.log(this.totalPendingCashoutsValue)
    //   this.TotalWithdrawalsTransactions = this.obj.reduce((a: any, b: { totalWithdrawalsTransactions: any; }) => (a + b.totalWithdrawalsTransactions.value), 0);
    //   console.log(this.TotalWithdrawalsTransactions)
    //   this.totalWithdrawalsValue = this.obj.reduce((a: any, b: { totalWithdrawals: any; }) => (a + b.totalWithdrawals.value), 0);
    //   console.log(this.totalWithdrawalsValue)
    //   this.TotalAgents = this.obj.reduce((a: any, b: { totalAgents: any; }) => (a + b.totalAgents.value), 0);
    //   console.log(this.TotalAgents)
    //   this.agentBalanceValue = this.obj.reduce((a: any, b: { agentBalance: any; }) => (a + b.agentBalance.value), 0);
    //   console.log(this.agentBalanceValue)
    //   this.totalTransfersAgentToPlayerValue = this.obj.reduce((a: any, b: { totalTransfersAgentToPlayer: any; }) => (a + b.totalTransfersAgentToPlayer.value), 0);
    //   console.log(this.totalTransfersAgentToPlayerValue)
    //   this.totalTransfersAgentToAgentValue = this.obj.reduce((a: any, b: { totalTransfersAgentToAgent: any; }) => (a + b.totalTransfersAgentToAgent.value), 0);
    //   console.log(this.totalTransfersAgentToAgentValue)
    //   this.payableToAgentsValue = this.obj.reduce((a: any, b: { payableToAgents: any; }) => (a + b.payableToAgents.value), 0);
    //   console.log(this.payableToAgentsValue)
    //   this.TotalWebmasters = this.obj.reduce((a: any, b: { totalWebmasters: any; }) => (a + b.totalWebmasters.value), 0);
    //   console.log(this.TotalWebmasters)
    //   this.payableToWebmastersValue = this.obj.reduce((a: any, b: { payableToWebmasters: any; }) => (a + b.payableToWebmasters.value), 0);
    //   console.log(this.payableToWebmastersValue)
    //   this.botStrategyBalanceValue = this.obj.reduce((a: any, b: { otStrategyBalance: any; }) => (a + b.otStrategyBalance.value), 0);
    //   console.log(this.botStrategyBalanceValue)
    //   this.totalInitiatedCashoutsForSelTimeValue = this.obj.reduce((a: any, b: { totalInitiatedCashoutsForSelTime: any; }) => (a + b.totalInitiatedCashoutsForSelTime.value), 0);
    //   console.log(this.totalInitiatedCashoutsForSelTimeValue)
    //   this.totalApprovedCashoutsForSelTimeValue = this.obj.reduce((a: any, b: { totalApprovedCashoutsForSelTime: any; }) => (a + b.totalApprovedCashoutsForSelTime.value), 0);
    //   console.log(this.totalApprovedCashoutsForSelTimeValue)
    //   this.TotalCanceledCashoutsForSelTime = this.obj.reduce((a: any, b: { totalCanceledCashoutsForSelTime: any; }) => (a + b.totalCanceledCashoutsForSelTime.value), 0);
    //   console.log(this.TotalCanceledCashoutsForSelTime)
    //   this.cumulativeGameBanksAmountValue = this.obj.reduce((a: any, b: { cumulativeGameBanksAmount: any; }) => (a + b.cumulativeGameBanksAmount.value), 0);
    //   console.log(this.cumulativeGameBanksAmountValue)
    //   this.cumulativeCasinoJackpotsAmountValue = this.obj.reduce((a: any, b: { cumulativeCasinoJackpotsAmount: any; }) => (a + b.cumulativeCasinoJackpotsAmount.value), 0);
    //   console.log(this.cumulativeCasinoJackpotsAmountValue)
  }
  FormReset() {
    this.filterForm.reset();
  }
  fastbackforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt("1")
      })
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    if (this.PageCount > this.accSummary.length) {

      this.pagecontrolbtn = true
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)

  }

  fastforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1
      })

    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    console.log(this.ResultCount)
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }

    this.onFormSubmit()
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)
  }


  next() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    console.log(this.ResultCount)
    console.log(this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log(((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit()

  }

  prev() {
    console.log("......Hhello......")
    if ((this.filterForm.value.firstRecord - 1) == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1)
    if (this.PageCount > this.accSummary.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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
