import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { AgentControlService } from 'src/app/source/AgentControl.service';
import * as moment from 'moment'
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-agent-nested-balance',
  templateUrl: './agent-nested-balance.component.html',
  styleUrls: ['./agent-nested-balance.component.css']
})
export class AgentNestedBalanceComponent implements OnInit {
  Agentguid: any;
  walletformatlist: any;
  selectedCurrency: any;
  wallettypelist: any;
  FillterMenu: boolean = true;
  currencys: any = [];
  AgentNestedBalanceForm: FormGroup;
  rowsOnthePage: any;
  ResultCount: any;
  loader: boolean = false;
  AgentNestedBalanceData: any;

  startDate: any; 
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false

  constructor(private AgentControlService: AgentControlService,private FileformatServiceService : FileformatServiceService) {
    this.AgentNestedBalanceForm = new FormGroup({
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
      }
      // console.log(this.currencys)
      this.selectedCurrency = this.currencys[0].guid
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
    this.AgentNestedBalanceData = false;
    let body = {
      "wallet": this.AgentNestedBalanceForm.value.Currency,
      // "reportPeriod": this.AgentNestedBalanceForm.value.repotingstart != null ? {
      //   "end": this.AgentNestedBalanceForm.value.repotingstart,
      //   "start": this.AgentNestedBalanceForm.value.repotingend } : undefined,
      "idList": [this.Agentguid],
      // "gameSessionType": "",
      "firstRecord": this.AgentNestedBalanceForm.value.firstRecord - 1,
      "maxCountRecord": Number(this.AgentNestedBalanceForm.value.maxCountRecord),
      "reportPeriod":(this.AgentNestedBalanceForm.value.startDate != null && this.AgentNestedBalanceForm.value.startDate !== "") ? { "start": this.AgentNestedBalanceForm.value.startDate + "T" + this.AgentNestedBalanceForm.value.startTime, "end": this.AgentNestedBalanceForm.value.endDate + "T" + this.AgentNestedBalanceForm.value.endTime } :
      (this.AgentNestedBalanceForm.value.endDate != null && this.AgentNestedBalanceForm.value.endDate != "") ? { "end": this.AgentNestedBalanceForm.value.endDate + "T" + this.AgentNestedBalanceForm.value.endTime } : undefined,
      // "queryId": ""

    }
    console.log(body);
    this.AgentControlService.getAgentsNestedBalance(body).subscribe((data) => {
      console.log(data);
      this.loader = false;
      this.AgentNestedBalanceData = data.objectList;
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount

      for (let i = 0; i < this.AgentNestedBalanceData.length; i++) {

        for (let j = 0; j < this.walletformatlist.length; j++) {
          if (this.walletformatlist[j].currencyCode) {
            // console.log(this.walletformatlist[j])
            if (this.AgentNestedBalanceData[i].openingBalance.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentNestedBalanceData[i].openingBalance.walletsymbol = this.walletformatlist[j].symbol
              } else {
                // this.AgentCashWallets[i].balance.wallet = this.walletformatlist[j].currencyCode
                this.AgentNestedBalanceData[i].openingBalance.walletsymbol = ''
              }
            }
            if (this.AgentNestedBalanceData[i].periodExpense.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentNestedBalanceData[i].periodExpense.walletsymbol = this.walletformatlist[j].symbol
              } else {
                // this.AgentCashWallets[i].balance.wallet = this.walletformatlist[j].currencyCode
                this.AgentNestedBalanceData[i].periodExpense.walletsymbol = ''
              }
            }
            if (this.AgentNestedBalanceData[i].periodRevenue.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentNestedBalanceData[i].periodRevenue.walletsymbol = this.walletformatlist[j].symbol
              } else {
                // this.AgentCashWallets[i].balance.wallet = this.walletformatlist[j].currencyCode
                this.AgentNestedBalanceData[i].periodRevenue.walletsymbol = ''
              }
            }
            if (this.AgentNestedBalanceData[i].totalTurnover.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentNestedBalanceData[i].totalTurnover.walletsymbol = this.walletformatlist[j].symbol
              } else {
                // this.AgentCashWallets[i].balance.wallet = this.walletformatlist[j].currencyCode
                this.AgentNestedBalanceData[i].totalTurnover.walletsymbol = ''
              }
            }
            if (this.AgentNestedBalanceData[i].closingBalance.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentNestedBalanceData[i].closingBalance.walletsymbol = this.walletformatlist[j].symbol
              } else {
                // this.AgentCashWallets[i].balance.wallet = this.walletformatlist[j].currencyCode
                this.AgentNestedBalanceData[i].closingBalance.walletsymbol = ''
              }
            }
          }
        }
      }
    })
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
    XLSX.writeFile(wb, 'AgentNestedBalanceExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AgentNestedBalanceExcelSheet")

  }

  showDate(data: any) {
    console.log(this.AgentNestedBalanceForm.value.endDate)
    if (this.AgentNestedBalanceForm.value.startDate > this.AgentNestedBalanceForm.value.endDate) {

      this.steddate = true;
    } else {
      this.steddate = false;
    }

    if (this.AgentNestedBalanceForm.value.startDate == this.AgentNestedBalanceForm.value.endDate) {
      if (this.AgentNestedBalanceForm.value.startTime > this.AgentNestedBalanceForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    } else {
      this.timeerror = false;
    }

    this.AgentNestedBalanceForm.valueChanges.subscribe(x => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()) {
        console.log("indirect")
        console.log(this.AgentNestedBalanceForm.value.endDate)
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    });
  }
  timechange(data: any) {
    console.log(data.target.value)
    console.log(this.AgentNestedBalanceForm.value.startTime)
    console.log(this.AgentNestedBalanceForm.value.endTime)
    if (this.AgentNestedBalanceForm.value.startDate == this.AgentNestedBalanceForm.value.endDate) {
      if (this.AgentNestedBalanceForm.value.startTime > this.AgentNestedBalanceForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }

  }

}
