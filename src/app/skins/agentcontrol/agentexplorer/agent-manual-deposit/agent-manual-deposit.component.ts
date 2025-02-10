import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { CashierService } from 'src/app/source/Cashier.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-agent-manual-deposit',
  templateUrl: './agent-manual-deposit.component.html',
  styleUrls: ['./agent-manual-deposit.component.css']
})
export class AgentManualDepositComponent implements OnInit {
  AgentName: any;
  wallettypelist: any;
  currencys: any = [];
  selectedCurrency: any;
  visibleCahOutList: any;
  WalletList: any = [];
  chpExchangeValue: any;
  usdExchangeValue: any;
  walletFormatsList: any;
  WalletcurrencyCodeList: any = [];
  AgentBalnce: any;
  ManualDepositForm: FormGroup;
  SelectedOrderAmountwallet: any;
  OrderAmountinput: any = 0;
  OrderAmountSum: any = 0;
  paymentSystemTypesList: any;
  selectedPaymentSystem: any;
  ExchangeValue: any;
  truncatedNumber: any;
  AgentguidList: any;

  constructor(private PlayerServiceService: PlayerServiceService,private CashierService:CashierService, private AgentControlService: AgentControlService, private datePipe: DatePipe) {
    this.ManualDepositForm = new FormGroup({
      OrderAmount: new FormControl(''),
      OrderAmountwallet: new FormControl(''),
      ReferenceNumber: new FormControl(''),
      Note: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.GetAgentName();
    this.Playerguid();
    this.walletTypes();
    this.walletFormats();
    this.paymentSystemTypes();
    this.getCurrencyExchangeRates();
    this.getAgentVisibleCashWallets();


  }
  GetAgentName() {
    let AgentName = sessionStorage.getItem("AgentName");
    if (AgentName) {
      this.AgentName = JSON.parse(AgentName)
    }
  }
  Playerguid() {
    const Agentguid = sessionStorage.getItem('Agentguid')
    if (Agentguid) {
      this.AgentguidList = JSON.parse(Agentguid)
    }
    console.log(this.AgentguidList)
  }
  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      for (let i = 0; i < this.wallettypelist.length; i++) {

        this.currencys.push(this.wallettypelist[i])

      }
      console.log(this.currencys)

    }
  }

  walletFormats() {
    const walletFormats = localStorage.getItem('walletFormats');
    if (walletFormats) {
      this.walletFormatsList = JSON.parse(walletFormats)
    }
    console.log(this.walletFormatsList)
    for (let i = 0; i < this.walletFormatsList.length; i++) {
      if (this.walletFormatsList[i].currencyCode) {
        console.log(this.walletFormatsList[i])
        this.WalletcurrencyCodeList.push(this.walletFormatsList[i])
        // this.SelectedOrderAmountwallet = this.WalletcurrencyCodeList[0].currency
      }
    }
    console.log(this.WalletcurrencyCodeList)
    console.log(this.SelectedOrderAmountwallet)
    for (let i = 0; i < this.WalletcurrencyCodeList.length; i++) {
      for (let j = 0; j < this.currencys.length; j++) {
        if (this.WalletcurrencyCodeList[i].guid.lowLong == this.currencys[j].guid.lowLong) {
          Object.assign(this.WalletcurrencyCodeList[i], { currency: this.currencys[j].currency })
          this.SelectedOrderAmountwallet = this.WalletcurrencyCodeList[0].currency
        }
      }
      console.log(this.WalletcurrencyCodeList)
    }
  }
  paymentSystemTypes() {
    const paymentSystemTypes = localStorage.getItem('paymentSystemTypes');
    if (paymentSystemTypes) {
      this.paymentSystemTypesList = JSON.parse(paymentSystemTypes)
    }
    console.log(this.paymentSystemTypesList)
    this.selectedPaymentSystem = this.paymentSystemTypesList[0].guid
  }
  getAgentVisibleCashWallets() {
    let body = {
     "agentGuid": this.AgentguidList,
    }
    this.AgentControlService.getAgentVisibleCashWallets(body).subscribe((data) => {
      console.log(data);
      this.visibleCahOutList = data.objectList;
      for (let i = 0; i < this.visibleCahOutList.length; i++) {
        for (let j = 0; j < this.visibleCahOutList[i].wallets.length; j++) {
          for (let k = 0; k < this.currencys.length; k++) {
            if (this.visibleCahOutList[i].wallets[j].lowLong == this.currencys[k].guid.lowLong) {
              console.log(this.currencys[k])
              this.WalletList.push(this.currencys[k])
              console.log(this.WalletList)
              this.selectedCurrency = this.WalletList[0].guid
            }
          }
          console.log(this.visibleCahOutList[i].wallets[j])
        }
      }
      this.getCurrency()
    })

  }
  getCurrency(){
    let body={}
    this.CashierService.getCurrency(body).subscribe((data) => {
      console.log(data)
    })
  }
  
  getAgentsBalances() {
    this.AgentBalnce = {}
    let body1 = {
      "wallet": this.selectedCurrency,
      "idList": {
        "idList": [this.AgentguidList]
      }
    }
    this.AgentControlService.getAgentsBalances(body1).subscribe((data) => {
      console.log(data);
      this.AgentBalnce = data.objectList;
      this.errorcheck()
    })

  }
  errorcheck() {
    // if ((this.AgentBalnce[0].balance.value + (this.Amount)) >= 0) {
    //   console.log((this.AgentBalnce[0].balance.value + (this.Amount)) >= 0)
    //   this.submitted = false
    // } else {
    //   this.submitted = true
    // }
  }
  getCurrencyExchangeRates() {
    let body = {}
    this.PlayerServiceService.getCurrencyExchangeRates(body).subscribe((data) => {
      console.log(data)
      console.log(data.objectList[0].exchange)
      this.ExchangeValue = data.objectList;
      console.log(this.ExchangeValue)
      // console.log(data.objectList[1].exchange)
      // this.chpExchangeValue = data.objectList[1].exchange
      this.usdExchangeValue = data.objectList[0].exchange

    })
  }
  SeletedWallet() {
    this.OrderAmount01()
  }
  OrderAmount01() {
    this.OrderAmountSum = this.OrderAmountinput;
    console.log(this.SelectedOrderAmountwallet)
    // this.selectedCurrency
    for (let i = 0; i < this.ExchangeValue.length; i++) {
      for (let j = 0; j < this.currencys.length; j++) {
        if (this.currencys[j]?.currency?.lowLong == this.ExchangeValue[i].currency.lowLong) {
          // console.log(this.currencys[j])
          if (this.selectedCurrency.lowLong == this.currencys[j]?.guid?.lowLong) {
            console.log(this.currencys[j])
            this.truncatedNumber = (this.OrderAmountinput * (this.ExchangeValue[i].exchange))
            console.log(this.truncatedNumber)
            // this.OrderAmountSum = Math.floor(truncatedNumber * 100) / 100;

          }
          console.log(this.OrderAmountSum)
        }

        if (this.SelectedOrderAmountwallet.lowLong == this.ExchangeValue[i].currency.lowLong) {
          let truncatedNumber01 = (this.truncatedNumber) / (this.ExchangeValue[i].exchange)
          console.log(truncatedNumber01)
          // this.OrderAmountSum=truncatedNumber01
          this.OrderAmountSum = Math.floor(truncatedNumber01 * 100) / 100;
          this.OrderAmountSum.toFixed(2)
        }
      }
    }
  }

  OrderAmount() {
    // console.log(data)
    this.OrderAmountSum = this.OrderAmountinput
    console.log(this.SelectedOrderAmountwallet)
    for (let i = 0; i < this.ExchangeValue.length; i++) {
      // console.log(this.ExchangeValue)
      for (let j = 0; j < this.currencys.length; j++) {
        // console.log(this.currencys)

        if (this.currencys[j]?.currency?.lowLong == this.ExchangeValue[i].currency.lowLong) {
          console.log(this.currencys[j])
          if (this.SelectedOrderAmountwallet.lowLong == this.currencys[j]?.guid?.lowLong) {
            console.log(this.currencys[j])
            console.log(this.ExchangeValue[i].currency.lowLong)
            console.log(this.SelectedOrderAmountwallet.lowLong)
            if (this.currencys[j]?.guid?.lowLong == this.SelectedOrderAmountwallet.lowLong) {
              console.log(this.ExchangeValue[i].exchange)
              let truncatedNumber = (this.OrderAmountinput * (this.ExchangeValue[i].exchange))
              this.OrderAmountSum = Math.floor(truncatedNumber * 100) / 100;
              // console.log(this.OrderAmountSum.toFixed(2));
              this.OrderAmountSum.toFixed(2)

              // this.OrderAmountSum = Number((((this.OrderAmountinput / (this.ExchangeValue[i].exchange)).toFixed(4)).toString()).slice(0, 4))
              // console.log(Math.round(this.OrderAmountSum.toFixed(2)))
              // console.log(Math.round(this.OrderAmountSum * 100) / 100)
              // console.log(((this.OrderAmountSum).toFixed(4)).toString())
              // console.log(Math.round(this.OrderAmountSum * 100) / 100)
              // console.log(Number((((this.OrderAmountSum).toFixed(4)).toString()).slice(0, 4)))

            }
          }
        }
        console.log(this.currencys[j]?.currency?.lowLong == this.ExchangeValue[i].currency.lowLong)
        console.log(this.currencys[j]?.currency)
        console.log(this.ExchangeValue[i].currency)

        if (this.currencys[j].currency) {
          if (this.currencys[j].currency == this.ExchangeValue[i].currency) {
            console.log(this.currencys[j])
          }
        }
        // if (this.SelectedOrderAmountwallet == this.ExchangeValue[i].currency) {
        //   console.log(this.ExchangeValue[i])
        // }
      }
    }

  }
  onFormSubmit() {
    let body = {
      "type": this.selectedPaymentSystem,
      "amount": {
        "value": this.ManualDepositForm.value.OrderAmount,
        "wallet": this.selectedCurrency
      },
      "referenceNumber": this.ManualDepositForm.value.ReferenceNumber,
      "note": this.ManualDepositForm.value.Note,
      "playerGuid": this.AgentguidList,
      "currency": this.SelectedOrderAmountwallet
    }
    console.log(body)
    this.PlayerServiceService.setPlayerDeposit(body).subscribe((data) => {
      console.log(data)
    })
  }


}
