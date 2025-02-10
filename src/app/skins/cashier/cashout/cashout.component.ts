import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { filter } from 'rxjs';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { DatePipe } from '@angular/common';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { AgentControlService } from 'src/app/source/AgentControl.service';
@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['./cashout.component.css']
})
export class CashoutComponent implements OnInit {
  filterForm: FormGroup;
  FillterList: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: any;
  tablePrint: any;
  dataPrint: any;
  dataLoader: boolean = false;
  cashoutList: any;
  wallettypelist: any;
  currencyList: any = [];
  faceList: any;
  CashOutStatusList: any;
  Cashoutpopup: boolean = false;
  PlayerCashoutData: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  popupArrow: boolean = false;
  SeletedIconIndex: any;
  CashoutApporvePopUp: boolean = false;
  ActionType: any;
  ActionPlayerdata: any;
  CashoutReverselPopUp: boolean = false;
  AttachedDocsPopUp: boolean = false;
  SpinnwerT: boolean = false;
  PlayerAvailableCashoutsData: any;
  PaymentsSystemsList: any;
  currencyFormatsSymbolList: any;
  PaymentMeansStatusList: any;
  PlayerBalance: any;
  exchangedata: any;
  truncatedNumber: number = 0;
  walletFormatsList: any;
  exchangeValue: any;
  cashoutSumError: any;
  cashoutsumPop: boolean = false;
  objectList: any = []
  lockInput: any = [];
  StoredFileContent: any;
  noDocumentsFound: boolean = false;
  fileName: any;
  downloadPdf_docx: boolean = false;
  pdfFileContent: any;
  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = '00:00:00';
  endTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false
  dropdownSettingscurrency: any;
  dropdownSettingsPaymentSystem: any;
  selectedPaymentsSystemsList: any = [];
  selectedPaymentsSystemsGuids: any = [];
  CopyTotalGuids: any = [];
  selectedcurrency: any = [];
  currencyGuids: any = [];
  CopyCurrencyTotalGuids: any = [];
  location: any;
  playerExplorer: boolean = false;
  PlayerguidList: any;
  agentExplorer: boolean = false;
  agentInfo: any;
  agentGuid: any;

  constructor(private Cashierservice: CashierService, private DateTimePipe: DateTimePipe, private PlayerServiceService: PlayerServiceService,
    private FileformatServiceService: FileformatServiceService, private DatePipe: DatePipe, private AgentControlService:AgentControlService) {
    this.filterForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      currency: new FormControl(),
      cashoutID: new FormControl(),
      playerLogin: new FormControl(),
      initiatorLogin: new FormControl(),
      Face: new FormControl(),
      Status: new FormControl(),
      PaymentsSystems: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startTime: new FormControl(),
      endTime: new FormControl(),

    })
  }

  ngOnInit(): void {
    this.walletTypes();
    this.walletFormats();
    this.Face();
    this.CashOutStatus();
    this.PaymentsSystems();
    this.currencyFormatsSymbol();
    this.PaymentMeansStatus();

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    // let body = {}
    // this.Cashierservice.getAvailableCashoutDeposits(body).subscribe(data => console.log(data))
    // this.Cashierservice.getAvailableCashoutDeposits(body).subscribe(data => console.log(data))
    this.playerExplorerCheck()
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/cashout") {
      this.playerExplorer = true;
      this.agentExplorer = false;
      this.PlayerGuid();
    }else if(this.location == "/Agentexplorer/cashout"){
      this.playerExplorer = false;
      this.agentExplorer = true;
      this.AgentInfo()
      console.log(this.agentExplorer)
    }else {
      this.playerExplorer = false;
      this.agentExplorer = false;

    }
  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem("Playerguid");
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }

  AgentInfo(){
    let AgentInfo = sessionStorage.getItem("AgentInfo")
    if(AgentInfo){
      this.agentInfo = JSON.parse(AgentInfo)
      if(this.agentInfo.agent){
        this.agentGuid = this.agentInfo.agent.guid
      }else if(this.agentInfo.user){
        this.agentGuid = this.agentInfo.user.guid
      }
      console.log(this.agentGuid)
    }
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
        // if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips") {
        if (this.wallettypelist[i].faceWallet == true || this.wallettypelist[i].tournamentWallet == true) {
          if (this.wallettypelist[i].description != "Play Money") {

            this.currencyList.push(this.wallettypelist[i])
          }
        }
      }
      console.log("currencyList", this.currencyList)

      for (let i = 0; i < this.currencyList.length; i++) {
        this.selectedcurrency[i] = {
          description: this.currencyList[i].description,
          guid: this.currencyList[i].guid
        }
      }
      console.log(this.selectedcurrency)
      this.selectedcurrency.forEach((item: { guid: any; }) => {
        this.currencyGuids.push(item.guid);
      });
      this.CopyCurrencyTotalGuids = this.currencyGuids
      console.log(this.currencyGuids);

      this.dropdownSettingscurrency = {
        singleSelection: false,
        idField: 'guid',
        textField: 'description',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
    }
  }
  walletFormats() {
    const walletFormats = localStorage.getItem('walletFormats');
    if (walletFormats) {
      this.walletFormatsList = JSON.parse(walletFormats);
      console.log(this.walletFormatsList)
    }

  }
  Face() {
    const faceList = localStorage.getItem('faceParameters')
    if (faceList) {
      this.faceList = JSON.parse(faceList)
      console.log("Face", this.faceList)
    }
  }
  CashOutStatus() {
    const CashOutStatus = localStorage.getItem("CashOutStatus");
    if (CashOutStatus) {
      this.CashOutStatusList = JSON.parse(CashOutStatus)
    }
    console.log("CashOutStatusList", this.CashOutStatusList)
  }
  PaymentsSystems() {
    const PaymentsSystems = localStorage.getItem('PaymentsSystems');
    if (PaymentsSystems) {
      this.PaymentsSystemsList = JSON.parse(PaymentsSystems)
    }
    console.log("PaymentsSystemList", this.PaymentsSystemsList)


    this.PaymentsSystemsList.forEach((paymentSystem: any) => {
      if (paymentSystem.value == "MercadoPago") {
        paymentSystem.paymentSystemName = 'Prode'
      } else if (paymentSystem.value == "MercadoPago2") {
        paymentSystem.paymentSystemName = 'LaPoker'
      } else {
        paymentSystem.paymentSystemName = paymentSystem.value
      }
    })

    for (let i = 0; i < this.PaymentsSystemsList.length; i++) {
      this.selectedPaymentsSystemsList[i] = {
        paymentSystemName: this.PaymentsSystemsList[i].paymentSystemName,
        guid: this.PaymentsSystemsList[i].guid
      }
    }
    console.log(this.selectedPaymentsSystemsList)
    this.selectedPaymentsSystemsList.forEach((item: { guid: any; }) => {
      this.selectedPaymentsSystemsGuids.push(item.guid);
    });
    this.CopyTotalGuids = this.selectedPaymentsSystemsGuids
    this.dropdownSettingsPaymentSystem = {
      singleSelection: false,
      idField: 'guid',
      textField: 'paymentSystemName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
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
    this.popupArrow = false;
    console.log(this.filterForm.value);
    this.cashoutList = false;
    this.dataLoader = true;
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    let cashoutIds = this.filterForm.value.cashoutID
    console.log(cashoutIds)
    var cashoutIdGuid;
    if (cashoutIds != null && cashoutIds != undefined && cashoutIds != '') {
      let hiLong = parseInt(cashoutIds.slice(0, 16), 16)
      let lowLong = parseInt(cashoutIds.slice(16), 16)
      cashoutIdGuid = {
        hiLong,
        lowLong
      }
      console.log(cashoutIdGuid)
    }



    let fillterbody = this.getValues(this.filterForm)
    // fillterbody["reportPeriod"] = this.filterForm.value.reportingPeriodFrom != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined
    // fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
    //   "start": this.filterForm.value.startDate + 'T' + (this.  startTime),
    //   "end": this.filterForm.value.endDate + 'T' + (this.  endTime)
    // } : undefined


    fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + (this.startTime), "end": this.filterForm.value.endDate + "T" + (this.endTime) } :
      (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + (this.endTime) } : undefined;

    // fillterbody["wallets"] = this.filterForm.value.currency != null ? [this.filterForm.value.currency] : undefined
    fillterbody["wallets"] = this.currencyGuids
    // fillterbody["cashoutIds"] = this.filterForm.value.cashoutID != null ? [this.filterForm.value.cashoutID] : undefined
    fillterbody["cashoutIds"] = cashoutIdGuid ? [cashoutIdGuid] : undefined;
    fillterbody["accountMask"] = this.filterForm.value.playerLogin! != null ? this.filterForm.value.playerLogin : undefined
    fillterbody["networkNames"] = this.filterForm.value.Face != null ? [this.filterForm.value.Face] : undefined
    fillterbody["initiatorMask"] = this.filterForm.value.initiatorLogin != null ? this.filterForm.value.initiatorLogin : undefined
    fillterbody["status"] = this.filterForm.value.Status != null ? [this.filterForm.value.Status] : undefined
    // fillterbody["paymentSystemTypes"] = this.filterForm.value.PaymentsSystems != null ? [this.filterForm.value.PaymentsSystems] : undefined
    // fillterbody["paymentSystemTypes"] = this.selectedPaymentsSystemsGuids
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    if (this.playerExplorer) {
      fillterbody["idList"] = [this.PlayerguidList]
      this.Cashierservice.getPlayerCashouts(fillterbody).subscribe(data => { this.getCashoutData(data) })
    } else if(this.agentExplorer){
      fillterbody["idList"] = [this.agentGuid]
      this.AgentControlService.getAgentCashouts(fillterbody).subscribe(data => {this.getCashoutData(data)})
    }
    else {
      this.Cashierservice.Cashout(fillterbody).subscribe(data => { this.getCashoutData(data) })
    }

  }

  

  getCashoutData(data: any) {
    this.dataLoader = false;
    this.resultcount = false;
    this.cashoutList = data.objectList;
    console.log(this.cashoutList)
    this.ResultCount = data.resultCount
    if (data.objectList) {
      this.rowsOnthePage = data.objectList.length;
      if (this.ResultCount !== null) {
        this.resultcount = false;
      }

      if (this.cashoutList != null || this.ResultCount == 0) {
        this.dataLoader = false;
      }
      for (let i = 0; i < this.cashoutList.length; i++) {
        for (let j = 0; j < this.CashOutStatusList.length; j++) {
          if (this.cashoutList[i].status.lowLong == this.CashOutStatusList[j].guid.lowLong) {
            this.cashoutList[i].status = this.CashOutStatusList[j].value
          }
        }
        for (let k = 0; k < this.currencyList.length; k++) {
          if (this.cashoutList[i].amount.wallet.lowLong == this.currencyList[k].guid.lowLong) {
            this.cashoutList[i].currency = this.currencyList[k].currency
            this.cashoutList[i].amount.walletName = this.currencyList[k].description
          }
        }
        for (let m = 0; m < this.walletFormatsList.length; m++) {
          if (this.cashoutList[i].amount.wallet.lowLong == this.walletFormatsList[m].guid.lowLong) {
            if (this.walletFormatsList[m].symbol) {
              this.cashoutList[i].amount.walletsymbol = this.walletFormatsList[m].symbol
            } else {
              this.cashoutList[i].amount.walletsymbol = ''
            }
            if (this.walletFormatsList[m].currencyCode) {
              this.cashoutList[i].amount.currencyCode = this.walletFormatsList[m].currencyCode
            } else {
              this.cashoutList[i].amount.currencyCode = this.walletFormatsList[m].currencyCode
            }
          }
        }
        this.PaymentsSystemsList.forEach((payment: any) => {
          if (this.cashoutList[i]?.paymentSystemType?.lowLong == payment.guid.lowLong) {
            // this.cashoutList[i].paymentSystemName = payment.value
            this.cashoutList[i].paymentSystemName = payment.paymentSystemName

          }
        })
        this.cashoutList[i].dateCashout
        let currentDateTime = this.cashoutList[i].dateCashout

        currentDateTime = currentDateTime.substring(0, currentDateTime.length - 6)
        let sendTime = this.cashoutList[i].dateCashout.split('.', [1])
        let currentDateTimes = this.DatePipe.transform(new Date(currentDateTime), 'yyyy/MM/dd h:mm:ss a');
        // console.log("dates", currentDateTimes);
        console.log("dates", sendTime);
        this.cashoutList[i].dateCashoutdate = sendTime


        let hexadecimalValue = this.cashoutList[i].guid.hiLong.toString(16).padStart(16, "0") + this.cashoutList[i].guid.lowLong.toString(16).padStart(16, '0')
        console.log(hexadecimalValue)
        console.log(this.cashoutList[i].guid.hiLong.toString(8).padStart(16, "0"))
      }
    }

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }


  onClick(data: any) {
    console.log(data)
    console.log(this.cashoutList[data])
    this.PlayerCashoutData = this.cashoutList[data];
    this.Cashoutpopup = true;
  }
  closePopup() {
    this.Cashoutpopup = false
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
    if (this.PageCount > this.cashoutList.length) {

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
    if (this.PageCount > this.cashoutList.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }
  ignoreContext() {
    this.cashoutList = [];
    this.dataLoader = false;
  }
  onPrint() {
    this.tablePrint = document.getElementById("tablerecords");
    this.dataPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    console.log(this.tablePrint);
    console.log(this.dataPrint);
    this.dataPrint.document.write(this.tablePrint.innerHTML);
    this.dataPrint.document.close();
    this.dataPrint.focus();
    this.dataPrint.print();
    this.dataPrint.close();
  }
  showmanu(index: number, id: any): void {
    this.popupArrow = !this.popupArrow;
    // this.CashoutApporvePopUp = true;
    this.SeletedIconIndex = index;
    console.log(index)
    console.log(id);
    this.ActionPlayerdata = this.cashoutList[index];
    console.log(this.ActionPlayerdata)

  }
  setPlayerActions(Type: any, index: any) {
    this.popupArrow = false;
    this.ActionType = Type;
    console.log(this.ActionType)
    switch (Type) {
      case 'Approve': {
        this.CashoutApporvePopUp = true;
        this.getAvailableCashoutMeansForPlayer();
        // this.getCurrencyExchangeRates();
        this.getPlayersBalances();
        break;
      }
      case 'Reversel': {
        this.CashoutReverselPopUp = true;
        break;
      }
      case 'AttachedDocuments': {
        // this.AttachedDocsPopUp = true;
        // this.getStoredFileContent();
        this.listStoredFile();
        this.SpinnwerT = true
        break;
      }
    }

  }
  cashoutReversel(option: any) {
    console.log(option);
    this.CashoutReverselPopUp = false
    if (option == 'yes') {
      switch (this.ActionType) {
        case 'Approve': {
          // alert("Approve")
          // this.getAvailableCashoutMeansForPlayer();
          // this.getCurrencyExchangeRates();
          // this.getPlayersBalances();
          break;
        }
        case 'Reversel': {
          // alert("Reversel")
          this.SpinnwerT = true;
          this.Reversel()
          break;
        }
      }
    }

  }
  Reversel() {
    let body = {
      "guid": this.ActionPlayerdata.guid,
      "admin": this.ActionPlayerdata.admin,
      "pendingAmount": {
        "wallet": this.ActionPlayerdata.pendingAmount.wallet,
        "value": this.ActionPlayerdata.pendingAmount.value,
      },
      "player": {
        "guid": this.ActionPlayerdata.player.guid,
      },
      "playerSuspicious": this.ActionPlayerdata.playerSuspicious,
      "playerSuspiciousByBlackList": this.ActionPlayerdata.playerSuspiciousByBlackList,
    }
    let bodyRiver = {
      "cashoutId": this.ActionPlayerdata.cashoutId,
      // "paymentSystemName": this.ActionPlayerdata.paymentSystemName,
      "paymentSystemName": this.ActionPlayerdata.paymentSystemName,
      "currency": this.ActionPlayerdata.amount.currencyCode,
    }
    console.log(body)
    this.Cashierservice.setCashoutRequestReversalRiver(bodyRiver).subscribe((response) => {
      // this.Cashierservice.setCashoutRequestReversal(body).subscribe((response) => {
      console.log(response)
      if (response.changedObjectList) {
        this.SpinnwerT = false;
        this.onFormSubmit()
      }
    })
  }
  getPlayersBalances() {
    let body = {
      "walletGuid": this.ActionPlayerdata.pendingAmount.wallet,
      "idList": {
        "idList": [this.ActionPlayerdata.player.guid,]
      }
    }
    this.PlayerServiceService.getPlayersBalances(body).subscribe((data) => {
      console.log(data)
      this.PlayerBalance = data.objectList
    })

  }
  getCurrencyExchangeRates() {
    let body = {}
    this.PlayerServiceService.getCurrencyExchangeRates(body).subscribe((data) => {
      console.log(data);
      this.exchangedata = data.objectList;
      for (let j = 0; j < this.exchangedata.length; j++) {
        if (this.ActionPlayerdata.currency.lowLong == this.exchangedata[j].currency.lowLong) {
          this.exchangeValue = ((this.exchangedata[j].exchange))
          console.log(this.exchangeValue)
        }
      }
      if (this.exchangedata) {
        this.exchangeValues(this.PlayerAvailableCashoutsData[0])
      }
    })

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
      }
      list.OrderAmount = (this.truncatedNumber).toFixed(2);
    }


    // for (let j = 0; j < this.exchangedata.length; j++) {
    //   console.log(list.withdrawalCurrency.lowLong)
    //   console.log(this.exchangedata[j].currency.lowLong)
    //   if (list.withdrawalCurrency.lowLong == this.exchangedata[j].currency.lowLong) {
    //     console.log(this.exchangedata[j].exchange)
    //     let truncatedNumber = (list.ChargeAmount * (this.exchangedata[j].exchange))
    //     let truncatedNumber01 = (truncatedNumber) / (this.exchangedata[j].exchange)
    //     // let truncatedNumber02 = (list.ChargeAmount /(this.exchangedata[j].exchange))
    //     let truncatedNumber02 = (list.ChargeAmount * (this.exchangedata[j].exchange) / (this.exchangedata[j].exchange))

    //     // let truncatedNumber01 = Math.floor(truncatedNumber * 100) / 100;
    //     console.log(list.ChargeAmount)
    //     console.log(list.ChargeAmount)
    //     console.log(this.exchangedata[j].exchange)

    //     list.OrderAmount = (this.truncatedNumber).toFixed(2);
    //     console.log(truncatedNumber02)
    //   }
    // }



    // }
  }
  getAvailableCashoutMeansForPlayer() {
    let body = {
      "tGuid": this.ActionPlayerdata.player.guid,
    }
    this.Cashierservice.getAvailableCashoutMeansForPlayer(body).subscribe((data) => {
      console.log(data);
      this.PlayerAvailableCashoutsData = data.objectList;
      this.PlayerAvailableCashoutsData.forEach((data: any, index: number) => {
        data.lockInput = false;
        if (index === 0) {
          data.ChargeAmount = this.ActionPlayerdata.amount.value;
          data.OrderAmount = this.ActionPlayerdata.amount.value;
        } else {
          data.OrderAmount = 0;
          data.ChargeAmount = 0;
        }
      });

      for (let i = 0; i < this.PlayerAvailableCashoutsData.length; i++) {
        for (let j = 0; j < this.PaymentsSystemsList.length; j++) {
          if (this.PlayerAvailableCashoutsData[i].paymentSystem.lowLong == this.PaymentsSystemsList[j].guid.lowLong) {
            this.PlayerAvailableCashoutsData[i].paymentSystemName = this.PaymentsSystemsList[j].value
          }
        }
        for (let k = 0; k < this.currencyFormatsSymbolList.length; k++) {
          if (this.PlayerAvailableCashoutsData[i].withdrawalCurrency.lowLong == this.currencyFormatsSymbolList[k].guid.lowLong) {
            this.PlayerAvailableCashoutsData[i].withdrawalCurrencyName = this.currencyFormatsSymbolList[k].currencyCode
          }
        }
        for (let m = 0; m < this.PaymentMeansStatusList.length; m++) {
          if (this.PlayerAvailableCashoutsData[i].paymentMeanStatus?.lowLong == this.PaymentMeansStatusList[m].guid.lowLong) {
            this.PlayerAvailableCashoutsData[i].paymentMeanStatusName = this.PaymentMeansStatusList[m].value
          }

        }
      }


      this.getCurrencyExchangeRates()

    })
  }
  setCashoutRequestApproveForPlayer() {
    let body = {
      "request": {
        "player": {
          "guid": this.ActionPlayerdata.player.guid,
        },
        "playerSuspicious": this.ActionPlayerdata.playerSuspicious,
        "playerSuspiciousByBlackList": this.ActionPlayerdata.playerSuspiciousByBlackList,
        "admin": this.ActionPlayerdata.admin,
        "pendingAmount": {
          "wallet": this.ActionPlayerdata.pendingAmount.wallet,
          "value": this.ActionPlayerdata.pendingAmount.value,
        },
        "guid": this.ActionPlayerdata.guid,
      },
      "means": {
        "objectList": [
          {
            "paymentSystem": {
              "hiLong": 0,
              "lowLong": 6
            },
            "withdrawalAmount": {
              "wallet": {
                "hiLong": 0,
                "lowLong": 1356
              },
              "value": 1446.00
            },
            "withdrawalCurrency": {
              "hiLong": 0,
              "lowLong": 4804178
            },
            "approvedDepositsCount": 0
          }
        ]
      },
      "rolledBack": {
        "wallet": {
          "hiLong": 0,
          "lowLong": 1356
        },
        "value": 0
      }
    }
    this.Cashierservice.setCashoutRequestApproveForPlayer(body).subscribe((data) => {
      console.log(data)
    })
  }
  // setCashoutRequestReversal() {
  //   let body = {}
  //   this.Cashierservice.setCashoutRequestReversal(body).subscribe((data) => {
  //     console.log(data)
  //   })
  // }
  sum(cashOutSum: any) {
    let sum = 0
    for (let i = 0; i < cashOutSum.length; i++) {
      sum += cashOutSum[i].ChargeAmount
    }
    return sum
  }
  CashoutApporve(type: any) {
    this.objectList = []
    // this.sum(this.PlayerAvailableCashoutsData)
    console.log(type)
    // this.CashoutApporvePopUp = false;
    console.log(this.PlayerAvailableCashoutsData)
    // console.log(this.sum())
    // let balance = this.PlayerAvailableCashoutsData.reduce((a: any, b: { ChargeAmount: any; }) => (a + b.ChargeAmount), 0);
    // console.log(balance)
    if (type == 'yes') {
      this.PlayerAvailableCashoutsData.forEach((data: any, index: number) => {
        console.log(data.ChargeAmount),
          (console.log(data.lockInput))
        if (data.ChargeAmount > 0) {
          //   else if(this.sum(this.PlayerAvailableCashoutsData)>this.ActionPlayerdata.amount.value){
          //   alert(3)
          //  }
          console.log(data)
          let Parameters = {
            "paymentSystem": data.paymentSystem,
            "paymentMean": data.paymentMean,
            "withdrawalAmount": {
              "wallet": this.ActionPlayerdata.amount.wallet,
              "value": data.ChargeAmount
            },
            "withdrawalCurrency": data.withdrawalCurrency,
            "approvedDepositsCount": data.approvedDepositsCount
          }
          console.log(Parameters)
          this.objectList.push(Parameters)
        }
      })
      if (this.sum(this.PlayerAvailableCashoutsData) == this.ActionPlayerdata.amount.value) {
        // alert("cashout sum valid")
        let body = {
          "request": {
            "player": {
              "guid": this.ActionPlayerdata.player.guid,
            },
            // "playerSuspicious": this.ActionPlayerdata.playerSuspicious,
            "playerSuspicious": false,
            "playerSuspiciousByBlackList": this.ActionPlayerdata.playerSuspiciousByBlackList,
            "admin": this.ActionPlayerdata.admin,
            "pendingAmount": {
              "wallet": this.ActionPlayerdata.pendingAmount.wallet,
              "value": this.ActionPlayerdata.pendingAmount.value,
            },
            "guid": this.ActionPlayerdata.guid,
          },
          "means": {
            "objectList": this.objectList
          },
          "rolledBack": {
            "wallet": this.ActionPlayerdata.pendingAmount.wallet,
            "value": 0
          },

        }

        let bodyRiver = {
          "cashoutId": this.ActionPlayerdata.cashoutId,
          // "paymentSystemName": this.ActionPlayerdata.paymentSystemName,
          "paymentSystemName": this.ActionPlayerdata.paymentSystemName,
          "currency": this.ActionPlayerdata.amount.currencyCode,
        }
        console.log(body)
        // this.Cashierservice.setCashoutRequestApproveForPlayer(body).subscribe((data) => {
        this.Cashierservice.setCashoutRequestApproveForPlayerRiver(bodyRiver).subscribe((data) => {
          console.log(data)
          // alert("success")
          if (data.changedObjectList) {
            this.CashoutApporvePopUp = false;
            this.onFormSubmit()
          }
        })
      } else if (this.sum(this.PlayerAvailableCashoutsData) < this.ActionPlayerdata.amount.value || this.sum(this.PlayerAvailableCashoutsData) > this.ActionPlayerdata.amount.value) {
        // alert("cashOut Sum InValid")
        this.cashoutsumPop = true;
        this.cashoutSumError = "cashout sum is not valid"
      }
    } else {
      this.CashoutApporvePopUp = false;
    }
  }
  cashoutsumPopClose() {
    this.cashoutsumPop = false;
  }
  lockInputcheck(event: any) {
    console.log(this.lockInput)
  }
  listStoredFile() {
    let body = {
      "userType": {
        "hiLong": 0,
        "lowLong": 0
      },
      "userIds": {
        "idList": [this.ActionPlayerdata.player.guid],
        "maxCountRecord": null,
        "firstRecord": null,
        "queryId": null
      }
    }
    this.StoredFileContent = ''
    this.downloadPdf_docx = false
    this.PlayerServiceService.listStoredFile(body).subscribe((data) => {
      if (data.objectList) {
        if (data.objectList.length > 0) {
          this.fileName = data.objectList[0].fileName
          this.noDocumentsFound = false
          this.downloadPdf_docx = true
          this.getStoredFileContent(data.objectList[0].guid)
        } else {
          // alert('no Documents Found')
          this.SpinnwerT = false;
          this.noDocumentsFound = true;
          this.AttachedDocsPopUp = true;
          this.downloadPdf_docx = false

        }
      }
    });
  }
  getStoredFileContent(guid: any) {
    // let body=this.ActionPlayerdata.player.guid
    console.log(this.fileName)

    let body = guid;
    this.PlayerServiceService.getStoredFileContent(body).subscribe((data) => {
      console.log(data);
      if (data.imageUrl) {
        this.pdfFileContent = data.imageUrl;
      }
      if (this.fileName.endsWith(".png") || (this.fileName.endsWith(".jpg"))) {
        this.StoredFileContent = data.imageUrl;
        this.downloadPdf_docx = false
      }
      // if (this.fileName.endsWith(".pdf")) {
      //   alert('pdf')

      //   // this.downloadPdf(data.imageUrl)
      // }
      // if (this.fileName.endsWith(".docx")) {
      //   alert('docxFile')

      // }
      this.AttachedDocsPopUp = true;
      this.SpinnwerT = false;
    });

  }
  downloadPdf() {
    // Replace 'base64Data' with your actual Base64-encoded PDF data
    const base64Data = this.pdfFileContent// Your Base64 data here
    const filename = this.fileName;

    this.FileformatServiceService.downloadBase64Pdf(base64Data, filename);
  }
  AttachedDocsPopUpClose() {
    this.AttachedDocsPopUp = false;
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'CashoutExcelSheet.xlsx';
    XLSX.writeFile(wb, 'CashoutExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "CashoutExcelSheet")
  }
  FormReset() {
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
  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    return (c)
  }

  // **************************payment System MultiDropDowns**************************************
  onItemSelectPaymentSystem(data: any) {
    this.selectedPaymentsSystemsGuids = []
    this.filterForm.value.PaymentsSystems.forEach((item: { guid: any; }) => {
      this.selectedPaymentsSystemsGuids.push(item.guid);
    });
    console.log(this.selectedPaymentsSystemsGuids)
  }

  OnItemDeSelectPaymentSystem(data: any) {
    this.selectedPaymentsSystemsGuids = []
    this.filterForm.value.PaymentsSystems.forEach((item: { guid: any; }) => {
      this.selectedPaymentsSystemsGuids.push(item.guid);
    });
    console.log(this.selectedPaymentsSystemsGuids)
    if (this.selectedPaymentsSystemsGuids === null || this.selectedPaymentsSystemsGuids.length === 0) {
      console.log("Empty");
      this.selectedPaymentsSystemsGuids = this.CopyTotalGuids
    }
  }
  onSelectAllPaymentSystem(data: any) {
    this.selectedPaymentsSystemsGuids = []
    data.forEach((item: { guid: any; }) => {
      this.selectedPaymentsSystemsGuids.push(item.guid);
    });
    console.log(this.selectedPaymentsSystemsGuids)
  }
  onDeSelectAllPaymentSystem(data: any) {
    this.selectedPaymentsSystemsGuids = []
    this.selectedPaymentsSystemsGuids = this.CopyTotalGuids
    // data.forEach((item: { guid: any; }) => {
    //   this.playerstatusaaray.push(item.guid);
    // });
    console.log(this.selectedPaymentsSystemsGuids)
  }
  // **************************CurryMultiDropDown**************************************
  onItemSelectcurrency(data: any) {
    this.currencyGuids = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids)
  }

  OnItemDeSelectcurrency(data: any) {
    this.currencyGuids = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids)
    if (this.currencyGuids === null || this.currencyGuids.length === 0) {
      console.log("Empty");
      this.currencyGuids = this.CopyCurrencyTotalGuids
    }

  }
  onSelectAllcurrency(data: any) {
    this.currencyGuids = []
    data.forEach((item: { guid: any; }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids)
  }
  onDeSelectAllcurrency(data: any) {
    this.currencyGuids = []
    this.currencyGuids = this.CopyCurrencyTotalGuids
    // data.forEach((item: { guid: any; }) => {
    //   this.playerstatusaaray.push(item.guid);
    // });
    console.log(this.currencyGuids)
  }



}
