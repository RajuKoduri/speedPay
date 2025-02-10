import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { AgentControlService } from 'src/app/source/AgentControl.service';
import * as  moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { TotalSumsService } from 'src/app/source/total-sums.service';
@Component({
  selector: 'app-agent-balance',
  templateUrl: './agent-balance.component.html',
  styleUrls: ['./agent-balance.component.css']
})
export class AgentBalanceComponent implements OnInit {

  Agentguid: any;
  walletformatlist: any;
  selectedCurrency: any;
  wallettypelist: any;
  FillterMenu: boolean = true;
  currencys: any = [];
  AgentBalanceForm: FormGroup;
  rowsOnthePage: any;
  ResultCount: any;
  loader: boolean = false;
  AgentBalanceData: any;

  // startDate: any; 
  endDate: any;
  todaydate: any;
  startDate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false
  totalOpeningRevenue: any;
  totalIncomings: any;
  totalOutgoings: any;
  totalTurnover: any;
  totalClosingRevenue: any;
  isPopup: boolean = false;
  selectedRowData: any;

  constructor(private AgentControlService: AgentControlService, private FileformatServiceService: FileformatServiceService, private totalSumService:TotalSumsService) {
    this.AgentBalanceForm = new FormGroup({
      Currency: new FormControl(),
      repotingstart: new FormControl(),
      repotingend: new FormControl(),
      firstRecord: new FormControl('1'),
      maxCountRecord: new FormControl('100'),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      enddate: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.Agentguids();
    this.walletTypes();
    this.walletFormats();

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
  Agentguids() {
    const Agentguid = sessionStorage.getItem('Agentguid');
    console.log(Agentguid)
    if (Agentguid) {
      this.Agentguid = JSON.parse(Agentguid)
    }
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist);
      for (let i = 0; i < this.wallettypelist.length; i++) {
        if (this.wallettypelist[i].faceWallet == true || this.wallettypelist[i].tournamentWallet == true && this.wallettypelist[i].description != "Play Money") {
          this.currencys.push(this.wallettypelist[i])
          console.log(this.currencys)
          // } else {
          // this.currencys.push(this.wallettypelist[i])
        }
      } this.selectedCurrency = this.currencys[0].guid
    }
  }
  walletFormats() {
    const walletFormats = localStorage.getItem('walletFormats')
    if (walletFormats) {
      this.walletformatlist = JSON.parse(walletFormats)
    }
    console.log(this.walletformatlist)
    for (let i = 0; i < this.walletformatlist.length; i++) {
      if (this.walletformatlist[i].currencyCode) {
        console.log(this.walletformatlist[i])
      }
    }
  }
  onFormSubmit() {
    this.loader = true;
    this.AgentBalanceData = false;
    let body = {


      "wallet": this.AgentBalanceForm.value.Currency,
      "reportPeriod": (this.AgentBalanceForm.value.startDate != null && this.AgentBalanceForm.value.startDate !== "") ? { "start": this.AgentBalanceForm.value.startDate + "T" + this.AgentBalanceForm.value.startTime, "end": this.AgentBalanceForm.value.endDate + "T" + this.AgentBalanceForm.value.endTime } :
        (this.AgentBalanceForm.value.endDate != null && this.AgentBalanceForm.value.endDate != "") ? { "end": this.AgentBalanceForm.value.endDate + "T" + this.AgentBalanceForm.value.endTime } : undefined,
      // "reportPeriod": this.AgentBalanceForm.value.repotingstart != null ? {
      //   "end": this.AgentBalanceForm.value.repotingstart,
      //   "start": this.AgentBalanceForm.value.repotingend
      // } : undefined,
      "idList": [this.Agentguid],
      // "gameSessionType": "",
      "firstRecord": this.AgentBalanceForm.value.firstRecord - 1,
      "maxCountRecord": Number(this.AgentBalanceForm.value.maxCountRecord),
      // "queryId": ""

    }
    console.log(body);
    this.AgentControlService.getAgentsSummaryBalance(body).subscribe((data) => {
      console.log(data);
      this.loader = false;
      this.AgentBalanceData = data.objectList;
      this.getTotalSum()
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount

      for (let i = 0; i < this.AgentBalanceData.length; i++) {

        for (let j = 0; j < this.walletformatlist.length; j++) {
          if (this.walletformatlist[j].currencyCode) {
            // console.log(this.walletformatlist[j])
            if (this.AgentBalanceData[i].openingBalance.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentBalanceData[i].openingBalance.walletsymbol = this.walletformatlist[j].symbol
              } else {
                // this.AgentCashWallets[i].balance.wallet = this.walletformatlist[j].currencyCode
                this.AgentBalanceData[i].openingBalance.walletsymbol = ''
              }
            }
            if (this.AgentBalanceData[i].periodExpense.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentBalanceData[i].periodExpense.walletsymbol = this.walletformatlist[j].symbol
              } else {
                // this.AgentCashWallets[i].balance.wallet = this.walletformatlist[j].currencyCode
                this.AgentBalanceData[i].periodExpense.walletsymbol = ''
              }
            }
            if (this.AgentBalanceData[i].periodRevenue.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentBalanceData[i].periodRevenue.walletsymbol = this.walletformatlist[j].symbol
              } else {
                // this.AgentCashWallets[i].balance.wallet = this.walletformatlist[j].currencyCode
                this.AgentBalanceData[i].periodRevenue.walletsymbol = ''
              }
            }
            if (this.AgentBalanceData[i].totalTurnover.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentBalanceData[i].totalTurnover.walletsymbol = this.walletformatlist[j].symbol
              } else {
                // this.AgentCashWallets[i].balance.wallet = this.walletformatlist[j].currencyCode
                this.AgentBalanceData[i].totalTurnover.walletsymbol = ''
              }
            }
            if (this.AgentBalanceData[i].closingBalance.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentBalanceData[i].closingBalance.walletsymbol = this.walletformatlist[j].symbol
              } else {
                // this.AgentCashWallets[i].balance.wallet = this.walletformatlist[j].currencyCode
                this.AgentBalanceData[i].closingBalance.walletsymbol = ''
              }
            }
          }
        }
      }
    })
   
  }

  getTotalSum() {
    console.log(this.AgentBalanceData)
    this.totalOpeningRevenue = this.totalSumService.calculateSum(this.AgentBalanceData, "openingBalance");
    this.totalIncomings = this.totalSumService.calculateSum(this.AgentBalanceData, "periodRevenue");
    this.totalOutgoings = this.totalSumService.calculateSum(this.AgentBalanceData, "periodExpense");
    this.totalTurnover = this.totalSumService.calculateSum(this.AgentBalanceData, "totalTurnover");
    this.totalClosingRevenue = this.totalSumService.calculateSum(this.AgentBalanceData, "closingBalance");
    console.log(this.totalOpeningRevenue)
    console.log(this.totalIncomings)
  }

  keys(data: any) {
    return Object.keys(data)
  }

  onDblclick(list:any){
    console.log(list)
    this.selectedRowData = list
    this.isPopup = true
  }

  close_popup(){
    this.isPopup = false;
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'AgentBalanceExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AgentBalanceExcelSheet")

  }

  showDate(data: any) {
    console.log(this.AgentBalanceForm.value.endDate)
    if (this.AgentBalanceForm.value.startDate > this.AgentBalanceForm.value.endDate) {

      this.steddate = true;
    } else {
      this.steddate = false;
    }

    if (this.AgentBalanceForm.value.startDate == this.AgentBalanceForm.value.endDate) {
      if (this.AgentBalanceForm.value.startTime > this.AgentBalanceForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    } else {
      this.timeerror = false;
    }

    this.AgentBalanceForm.valueChanges.subscribe(x => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()) {
        console.log("indirect")
        console.log(this.AgentBalanceForm.value.endDate)
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    });
  }
  timechange(data: any) {
    console.log(data.target.value)
    console.log(this.AgentBalanceForm.value.startTime)
    console.log(this.AgentBalanceForm.value.endTime)
    if (this.AgentBalanceForm.value.startDate == this.AgentBalanceForm.value.endDate) {
      if (this.AgentBalanceForm.value.startTime > this.AgentBalanceForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }

  }

}
