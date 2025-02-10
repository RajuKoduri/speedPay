import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CashierService } from 'src/app/source/Cashier.service';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
@Component({
  selector: 'app-compulsory-cahout',
  templateUrl: './compulsory-cahout.component.html',
  styleUrls: ['./compulsory-cahout.component.css']
})
export class CompulsoryCahoutComponent implements OnInit {
  @Output() notifyParent = new EventEmitter()
  @Input() userInfo: any;
  @Input() userType: any;

  CompulsoryCashout: boolean = true;
  loader: boolean = false;
  AgentName: any;
  AgentGuid: any;
  visibleCahOutList: any;
  walletFormatsList: any;
  WalletcurrencyCodeList: any = [];
  wallettypelist: any;
  currencys: any = [];
  WalletList: any = [];
  selectedCurrency: any;
  paymentSystemTypesList: any;
  selectedPaymentSystem: any;
  SelectedOrderAmountwallet: any;
  exchangedata: any;
  PlayerAvailableCashoutsData: any;
  AgentBalance: any;
  PaymentsSystemsList: any;
  currencyFormatsSymbolList: any;
  PaymentMeansStatusList: any;
  exchangeValue: any;
  truncatedNumber: any;
  alertMsg: string = ''
  compulsoryCashoutAmount: any = 0;
  walletSymbol: any;
  AvaliableBalance: any;

  constructor(private CashierService: CashierService, private AgentControlService: AgentControlService, private PlayerServiceService: PlayerServiceService) { }

  ngOnInit(): void {
    console.log(this.userType, this.userInfo)
    if (this.userType == "Agent") {
      this.AgentName = this.userInfo.agent.login
      this.AgentGuid = this.userInfo.agent.guid
    } else if (this.userType == "Player") {
      this.AgentName = this.userInfo.player.account
      this.AgentGuid = this.userInfo.player.guid
    }

    // this.GetAgentName();
    // this.GetAgentGuid();
    this.walletTypes();
    this.walletFormats();
    this.paymentSystemTypes();
    this.PaymentsSystems();
    this.currencyFormatsSymbol();
    this.PaymentMeansStatus();

    this.getAgentVisibleCashWallets();


    this.getAvailableCashoutMeansForAgent();
    // this.getCurrencyExchangeRates();
    // this.getAgentsBalances();
  }
  GetAgentName() {
    let AgentName = sessionStorage.getItem('AgentName')
    if (AgentName) {
      this.AgentName = JSON.parse(AgentName)
    }
    console.log("AgentName", this.AgentName)
  }
  GetAgentGuid() {
    let AgentGuid = sessionStorage.getItem('Agentguid')
    if (AgentGuid) {
      this.AgentGuid = JSON.parse(AgentGuid)
    }
    console.log("AgentGuid", this.AgentGuid)

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
        // console.log(this.walletFormatsList[i])
        this.WalletcurrencyCodeList.push(this.walletFormatsList[i])
        // this.SelectedOrderAmountwallet = this.WalletcurrencyCodeList[0].currency
      }
    }
    console.log(this.WalletcurrencyCodeList)
    console.log(this.SelectedOrderAmountwallet)
    for (let i = 0; i < this.WalletcurrencyCodeList.length; i++) {
      for (let j = 0; j < this.currencys.length; j++) {
        if (this.WalletcurrencyCodeList[i].guid.lowLong == this.currencys[j].guid.lowLong) {
          if (this.WalletcurrencyCodeList[i].symbol) {
            this.currencys[j].symbol = this.WalletcurrencyCodeList[i].symbol
          }
          Object.assign(this.WalletcurrencyCodeList[i], { currency: this.currencys[j].currency })
          this.SelectedOrderAmountwallet = this.WalletcurrencyCodeList[0].currency
        }
      }
    }
    console.log(this.WalletcurrencyCodeList)
    console.log(this.currencys)
  }

  paymentSystemTypes() {
    const paymentSystemTypes = localStorage.getItem('paymentSystemTypes');
    if (paymentSystemTypes) {
      this.paymentSystemTypesList = JSON.parse(paymentSystemTypes)
    }
    console.log(this.paymentSystemTypesList)
    this.selectedPaymentSystem = this.paymentSystemTypesList[0].guid
  }
  PaymentsSystems() {
    const PaymentsSystems = localStorage.getItem('PaymentsSystems');
    if (PaymentsSystems) {
      this.PaymentsSystemsList = JSON.parse(PaymentsSystems)
    }
    console.log("PaymentsSystemList", this.PaymentsSystemsList)
  }
  currencyFormatsSymbol() {
    const currencyFormatsSymbol = localStorage.getItem('currencyFormatsSymbol');
    if (currencyFormatsSymbol) {
      this.currencyFormatsSymbolList = JSON.parse(currencyFormatsSymbol)
      console.log("currencyFormatsSymbolList", this.currencyFormatsSymbolList)
    }
  }
  PaymentMeansStatus() {
    const PaymentMeansStatus = localStorage.getItem('PaymentMeansStatus');
    if (PaymentMeansStatus) {
      this.PaymentMeansStatusList = JSON.parse(PaymentMeansStatus)
    }
    console.log("PaymentMeansStatus", this.PaymentMeansStatusList)
  }
  getAgentVisibleCashWallets() {
    this.loader = true
    var body = {}
    // if (this.userType == "Agent") {
    //   body = {
    //     'agentGuid': this.AgentGuid
    //   }
    // } else {
    //   body = this.AgentGuid
    // }
    this.userType == "Agent" ? body = { 'agentGuid': this.AgentGuid } : body = this.AgentGuid

    this.userType == "Player" ? this.PlayerServiceService.getPlayerVisibleCashWallets(body).subscribe((data) => {
      this.VisibleCashWalletsResponse(data)
    }) :
      this.AgentControlService.getAgentVisibleCashWallets(body).subscribe((data) => { this.VisibleCashWalletsResponse(data) })

  }
  VisibleCashWalletsResponse(data: any) {
    console.log(data);
    this.loader = false
    this.visibleCahOutList = data.objectList;
    for (let i = 0; i < this.visibleCahOutList.length; i++) {
      for (let j = 0; j < this.visibleCahOutList[i].wallets.length; j++) {
        for (let k = 0; k < this.currencys.length; k++) {

          if (this.visibleCahOutList[i].wallets[j].lowLong == this.currencys[k].guid.lowLong) {
            console.log(this.currencys[k])
            this.WalletList.push(this.currencys[k])
            console.log(this.WalletList)
            // this.selectedCurrency = this.WalletList[0].guid

          }
          if (this.visibleCahOutList[i].preferredWallet.lowLong == this.currencys[k].guid.lowLong) {
            this.selectedCurrency = this.currencys[k].guid;
            this.walletSymbol = this.currencys[k]?.symbol
            this.getCurrencyExchangeRates(this.currencys[k]?.currency)
            console.log(11)

          }
        }
        console.log(this.visibleCahOutList[i].wallets[j])
      }
    }
    this.getAgentsBalances()
    // this.getCurrencyExchangeRates(this.WalletList[0].currency)
    // this.getCurrencyExchangeRates(this.selectedCurrency)
  }
  walletChange() {

    console.log(this.WalletList)
    this.WalletList.forEach((list: any) => {
      if (this.selectedCurrency.lowLong == list.guid.lowLong) {
        // if (list.symbol) {
        //   this.walletSymbol = list.symbol
        // } else {
        //   this.walletSymbol = null
        // }
        list.symbol && (this.walletSymbol = list.symbol)
        this.walletexchangValue(list.currency)
      }
    })

    console.log(this.walletSymbol)
    this.getAgentsBalances()
  }

  getAgentsBalances() {
    this.AgentBalance = {}
    let body: any

    this.userType == "Agent" ? body = { "wallet": this.selectedCurrency, "idList": { "idList": [this.AgentGuid] } } : body = { "walletGuid": this.selectedCurrency, "idList": { "idList": [this.AgentGuid] } }

    this.userType == "Agent" ? this.AgentControlService.getAgentsBalances(body).subscribe((data) => {
      this.AgentBalance = data.objectList;
      console.log(this.AgentBalance[0].balance.value)
    }) : this.PlayerServiceService.getPlayersBalances(body).subscribe((data) => {
      this.AgentBalance = data.objectList;
      console.log(this.AgentBalance[0].cash.value)
    })
    if (this.AgentBalance) {
      this.WalletList
    }
    
  }

  getCurrencyExchangeRates(list: any) {
    console.log(this.selectedCurrency)
    let body = {}
    this.PlayerServiceService.getCurrencyExchangeRates(body).subscribe((data) => {
      console.log(data);
      this.exchangedata = data.objectList;

      if (this.exchangedata) {
        // this.walletexchangValue(this.WalletList[0].currency)
        this.walletChange()
      }
    })

  }

  walletexchangValue(list: any) {
    console.log(list)
    for (let j = 0; j < this.exchangedata.length; j++) {
      if (list.lowLong == this.exchangedata[j].currency.lowLong) {
        this.exchangeValue = ((this.exchangedata[j].exchange))
        console.log(this.exchangeValue)
      }
    }
    for (let j = 0; j < this.exchangedata.length; j++) {
      this.PlayerAvailableCashoutsData?.forEach((list: any) => {
        if (list.withdrawalCurrency.lowLong == this.exchangedata[j].currency.lowLong) {
          this.truncatedNumber = (list.ChargeAmount / (this.exchangeValue) * (this.exchangedata[j].exchange))
          console.log("exchangeValue", this.exchangeValue)
          console.log("truncatedNumber", this.truncatedNumber)
          this.truncatedNumber
          list.OrderAmount = (this.truncatedNumber).toFixed(2);
        }
      })
    }
  }

  exchangeValues(list: any) {
    console.log(list)
    console.log(this.exchangedata.length + "length")
    for (let j = 0; j < this.exchangedata.length; j++) {
      if (list.withdrawalCurrency.lowLong == this.exchangedata[j].currency.lowLong) {
        this.truncatedNumber = (list.ChargeAmount / (this.exchangeValue) * (this.exchangedata[j].exchange))
        console.log("exchangeValue", this.exchangeValue)
        console.log("truncatedNumber", this.truncatedNumber)
        this.truncatedNumber
        list.OrderAmount = (this.truncatedNumber).toFixed(2);
      }
    }
  }
  getAvailableCashoutMeansForAgent() {
    let body = {
      "tGuid": this.AgentGuid,
    }
    this.CashierService.getAvailableCashoutMeansForAgent(body).subscribe((data) => {
      console.log(data);
      if (data) {
        this.PlayerAvailableCashoutsData = data.objectList;
        this.PlayerAvailableCashoutsData?.forEach((data: any, index: number) => {
          data.lockInput = false;
          data.OrderAmount = 0;
          data.ChargeAmount = 0
          // if (index === 0) {
          //   data.ChargeAmount = this.ActionPlayerdata.amount.value;
          //   data.OrderAmount = this.ActionPlayerdata.amount.value;
          // } else {
          //   data.OrderAmount = 0;
          //   data.ChargeAmount = 0;
          // }
        });

        for (let i = 0; i < this.PlayerAvailableCashoutsData?.length; i++) {
          for (let j = 0; j < this.PaymentsSystemsList.length; j++) {
            if (this.PlayerAvailableCashoutsData[i].paymentSystem.lowLong == this.PaymentsSystemsList[j].guid.lowLong) {
              this.PlayerAvailableCashoutsData[i].paymentSystemName = this.PaymentsSystemsList[j].value
            }
          }
          for (let k = 0; k < this.currencyFormatsSymbolList.length; k++) {
            if (this.PlayerAvailableCashoutsData[i].withdrawalCurrency.lowLong == this.currencyFormatsSymbolList[k].guid.lowLong) {
              this.PlayerAvailableCashoutsData[i].withdrawalCurrencyName = this.currencyFormatsSymbolList[k].currencyCode
              if (this.currencyFormatsSymbolList[k].symbol) {
                this.PlayerAvailableCashoutsData[i].symbol = this.currencyFormatsSymbolList[k].symbol
              }
            }
          }
          for (let m = 0; m < this.PaymentMeansStatusList.length; m++) {
            if (this.PlayerAvailableCashoutsData[i].paymentMeanStatus?.lowLong == this.PaymentMeansStatusList[m].guid.lowLong) {
              this.PlayerAvailableCashoutsData[i].paymentMeanStatusName = this.PaymentMeansStatusList[m].value
            }

          }
        }
      }


      //   this.getCurrencyExchangeRates()

      // this.PlayerAvailableCashoutsData.forEach((list:any)=>{
      //   list.withdrawAmount = {value:list.ChargeAmount, wallet:this.selectedCurrency}
      // })

      // let meansArray = this.PlayerAvailableCashoutsData.map((list:any)=>{
      //   let {ChargeAmount,OrderAmount,paymentMeanStatusName,paymentSystemName,symbol,withdrawalCurrencyName,paymentMeanStatus, ...rest} = list
      //   return rest
      // })
      // console.log(meansArray)
    })

  }


  lockInputcheck(event: any) {
  }

  get chargeAmountSum() {
    let chargeAmountSum = this.PlayerAvailableCashoutsData.reduce((acc: any, data: any) => acc + data.ChargeAmount, 0)
    return chargeAmountSum
  }


  CompulsoryCashoutPopClose(type: any) {
    if (type == "no") { this.notifyParent.emit() }
    if (type == "yes") {
      console.log(this.chargeAmountSum)
      if (this.compulsoryCashoutAmount == 0 || this.compulsoryCashoutAmount != this.chargeAmountSum) {
        this.alertMsg = "Cashout sum is not valid"
      } else {
        this.withdrawsuccess()
      }
    }
  }

  withdrawsuccess() {
    this.PlayerAvailableCashoutsData.forEach((list: any) => {
      list.withdrawAmount = { value: list.ChargeAmount, wallet: this.selectedCurrency }
    })

    let meansArray = this.PlayerAvailableCashoutsData.map((list: any) => {
      let { lockInput, ChargeAmount, OrderAmount, paymentMeanStatusName, paymentSystemName, symbol, withdrawalCurrencyName, paymentMeanStatus, ...rest } = list
      return rest
    })
    console.log(meansArray)

    let fillterbody: any = {};
    fillterbody['playerId'] = this.AgentGuid
    fillterbody['amount'] = { value: this.compulsoryCashoutAmount, wallet: this.selectedCurrency }
    fillterbody['deposits'] = 0 
    fillterbody['means'] = {
      objectList: [...meansArray]
      // objectList: [{
      //   guid: '',
      //   objState: 0,
      //   accountId: 'Acosta marin',
      //   approvedDepositsCount: 0,
      //   paymentMean: {},
      //   paymentSystem:{},
      //   withdrawalAmount: {
      //     value: '', wallet: {},
      //   },
      //   withdrawalCurrency: {}
      // }]
    }
    console.log(fillterbody)
    this.CashierService.withdrawlscompCashout(fillterbody).subscribe((data: any) => {
      console.log(data)
    })
  }

  cashoutDistribution() {
    this.PlayerAvailableCashoutsData.forEach((list: any, i: number) => {
      if (i == 0) {
        list.ChargeAmount = this.compulsoryCashoutAmount
      }
      else {
        list.ChargeAmount = 0
      }
    })
    this.walletChange()
  }


  onInputChange() {

    if (this.compulsoryCashoutAmount > this.AgentBalance[0]?.balance?.value || this.compulsoryCashoutAmount > this.AgentBalance[0]?.cash?.value) {
      this.alertMsg = `You can't withdraw more than real balance = ${this.AgentBalance[0]?.balance?.value || this.AgentBalance[0]?.cash?.value}`
      this.compulsoryCashoutAmount = 0
      console.log(this.PlayerAvailableCashoutsData)
    }
  }

  alertPopup() {
    this.alertMsg = ''
  }
}
