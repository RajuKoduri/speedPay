import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import * as moment from 'moment'
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { TotalSumsService } from 'src/app/source/total-sums.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashdeposits',
  templateUrl: './cashdeposits.component.html',
  styleUrls: ['./cashdeposits.component.css']
})
export class CashdepositsComponent implements OnInit {
  filterForm: FormGroup;
  FillterList: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 10;
  tablePrint: any;
  dataPrint: any;
  depositsList: any;
  dataLoader: boolean = false;
  faceList: any;
  TransactionStatusesList: any;
  paymentSystemlist: any;
  usertypelist: any;
  wallettypelist: any;
  usertypes: any = [];
  currencyList: any = [];
  PlayerDepositsData: any;
  Depositspopup: boolean = false;
  pagecontrolbtn: boolean = false;
  PageCount: number = 0;
  // selectedTime: any = '00:00:00';
  // selectedEndTime: any = '23:59:59';

  currencyarray: any = [];
  selectcurrency: any = [];
  currencydropdownlist: any = [];
  dropdownSettingscurrency = {};
  walletlist: any[] = [];
  // currencyList: any = [];
  selectedcurrency: any = [];
  currencyGuids: any = [];
  CopyCurrencyTotalGuids: any = [];

  convertedArray: string[] = [];
  faceconvertedarray: string[] = [];
  faceParameterslist12: any;
  dropdownList12: any = [];
  selectedItems12: any = [];
  dropdownSettings = {};

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

  dropdownSettingsPaymentSystem: any;
  CopyTotalGuids: any = [];
  selectedPaymentsSystemsGuids: any = [];
  PaymentsSystemsList: any;
  selectedPaymentsSystemsList: any = [];

  selectedUserlist: any = [];
  UserTypesGuids: any = [];
  CopyUserTotalGuids: any = [];
  dropdownSettingsUsertypes = {};

  convertedStatus: any = [];
  StatusGuids: any = [];
  dropdownStatusSettings = {};
  location: any;
  playerExplorer: boolean = false;
  PlayerguidList: any;
  selectedStatusGuid: any;
  agentExplorer: boolean = false;
  agentInfo: any;
  agentGuid: any;
  popupArrow: boolean = false;
  SeletedIconIndex: any;
  isChargebackPopup: boolean = false;
  chargeBackData: any;
  topUpAmountSum: any;
  orderAmountSum: any;
  bonusSum: any;
  lockedBonusSum: any;
  walletFormatsList: any;

  constructor(private Cashierservice: CashierService, private CommomfilterService: CommomfilterService, private router:Router,
    private PlayerserviceService: PlayerServiceService, private DateTimePipe: DateTimePipe, private sumService: TotalSumsService,
    private FileformatServiceService: FileformatServiceService, private AgentcontrolService: AgentControlService, private AgentControlService: AgentControlService) {
    this.filterForm = new FormGroup({
      reportingPeriodFrom: new FormControl(),
      reportingPeriodTo: new FormControl(),
      currency: new FormControl(),
      userType: new FormControl(),
      userLogin: new FormControl(),
      shortId: new FormControl(),
      paymentSystem: new FormControl(),
      paymentMeansNumber: new FormControl(),
      status: new FormControl(),
      internalId: new FormControl(),
      externalId: new FormControl(),
      initiatorLogin: new FormControl(),
      face: new FormControl(),
      networkNames: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl()
    })
  }

  ngOnInit(): void {
    this.walletTypes();
    this.UserType();
    this.paymentSystem();
    this.TransactionStatuses();
    this.faceParameters();


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
    this.isNavigatedFromTransactions()
  }


  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/cashdeposits") {
      this.playerExplorer = true;
      this.PlayerGuid();
    } else if (this.location == "/Agentexplorer/cashdeposits") {
      this.agentExplorer = true
      this.playerExplorer = false;
      this.agentInformation()
    }
  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem("Playerguid");
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }

  agentInformation() {
    let AgentInfo = sessionStorage.getItem('AgentInfo')
    if (AgentInfo) {
      this.agentInfo = JSON.parse(AgentInfo)
      console.log(this.agentInfo)
      if (this.agentInfo.agent) {
        this.agentGuid = this.agentInfo.agent.guid
      } else if (this.agentInfo.user) {
        this.agentGuid = this.agentInfo.user.guid
      }
    }
  }

  isNavigatedFromTransactions() {
    let internalId = localStorage.getItem("internalId")
    if (internalId) {
      this.filterForm.patchValue({
        internalId: JSON.parse(internalId)
      })
      console.log(internalId)
      this.onFormSubmit()
    }
  }

  ngOnDestroy() {
    localStorage.removeItem("internalId")
  }

  showmanu(i: any, data: any) {
    console.log(data)
    this.chargeBackData = data
    this.popupArrow = !this.popupArrow
    this.SeletedIconIndex = i
  }

  chargeBackPopup() {
    this.isChargebackPopup = !this.isChargebackPopup
    this.popupArrow = false;
  }

  onChargeBack() {
    let body = {
      "userGuid": this.chargeBackData.user.guid,
      "depositGuid": this.chargeBackData.guid,
      "sendToDatabase": false,
      "sendToPlayer": false,
    }
    if(this.chargeBackData.user.type == "Player"){
      this.Cashierservice.setFraudPaymentForPlayer(body).subscribe((resp: any) => {
        console.log(resp)
        if (resp.changedObjectList) {
          this.isChargebackPopup = false
          this.onFormSubmit()
        }
      })
    }else if(this.chargeBackData.user.type == "Agent"){
      this.Cashierservice.setFraudPaymentForAgent(body).subscribe((resp: any) => {
        console.log(resp)
        if (resp.changedObjectList) {
          this.isChargebackPopup = false
          this.onFormSubmit()
        }
      })
    }
  }

  ignoreContext() {
    this.depositsList = [];
    this.dataLoader = false;
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

  // UserType() {
  //   const usertypes = localStorage.getItem('usertype');
  //   if (usertypes) {
  //     this.usertypelist = JSON.parse(usertypes);
  //     console.log("usertypelist", this.usertypelist)
  //   }
  //   for (let i = 0; i < this.usertypelist.length; i++) {
  //     if (this.usertypelist[i].value == "Player" || this.usertypelist[i].value == "Agent") {
  //       this.usertypes.push(this.usertypelist[i])
  //     }
  //   }
  // }
  UserType() {
    const usertypes = localStorage.getItem('usertype');
    if (usertypes) {
      this.usertypelist = JSON.parse(usertypes);
      console.log("usertypelist", this.usertypelist)

      for (let i = 0; i < this.usertypelist.length; i++) {
        if (this.usertypelist[i].value == "Player" || this.usertypelist[i].value == "Agent") {
          this.usertypes.push(this.usertypelist[i])
        }
      }
      console.log("usertypes", this.usertypes)
      for (let i = 0; i < this.usertypes.length; i++) {
        this.selectedUserlist[i] = {
          value: this.usertypes[i].value,
          guid: this.usertypes[i].guid
        }
      }
      console.log(this.selectedUserlist);
      this.selectedUserlist.forEach((item: { guid: any; }) => {
        this.UserTypesGuids.push(item.guid);
      });
      this.CopyUserTotalGuids = this.UserTypesGuids
      console.log(this.UserTypesGuids);

      this.dropdownSettingsUsertypes = {
        singleSelection: false,
        idField: 'guid',
        textField: 'value',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
    }
  }

  paymentSystem() {
    const PaymentsSystems = localStorage.getItem('PaymentsSystems');
    if (PaymentsSystems) {
      this.PaymentsSystemsList = JSON.parse(PaymentsSystems)
    }
    console.log("PaymentsSystemList", this.PaymentsSystemsList)


    this.PaymentsSystemsList.forEach((paymentSystem: any) => {
      if (paymentSystem.value == "") {
        paymentSystem.paymentSystemName = 'Prode'
      }
      else if (paymentSystem.value == "") {
        paymentSystem.paymentSystemName = 'LaPoker'
      }
      else {
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

  // TransactionStatuses() {
  //   const TransactionStatuses = localStorage.getItem("TransactionStatuses");
  //   if (TransactionStatuses) {
  //     this.TransactionStatusesList = JSON.parse(TransactionStatuses)
  //   }
  //   console.log("TransactionStatusesList", this.TransactionStatusesList)
  // }
  TransactionStatuses() {
    const TransactionStatuses = localStorage.getItem("TransactionStatuses");
    if (TransactionStatuses) {
      this.TransactionStatusesList = JSON.parse(TransactionStatuses)
    }
    // this.convertedStatus = []
    console.log("TransactionStatusesList", this.TransactionStatusesList);

    for (let i = 0; i < this.TransactionStatusesList.length; i++) {
      if (this.TransactionStatusesList[i].value == "" || this.TransactionStatusesList[i].value == "") {
        this.convertedStatus.push(this.TransactionStatusesList[i])
      }
    }
    this.TransactionStatusesList.forEach((item: any, i: any) => {
      this.StatusGuids.push(item.guid)
      this.convertedStatus[i] = {
        value: this.TransactionStatusesList[i].value,
        guid: this.TransactionStatusesList[i].guid
      }
    })

    console.log(this.convertedStatus);
    console.log(this.StatusGuids);

    this.dropdownStatusSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    }
  }
  // Face() {
  //   const faceList = localStorage.getItem('faceParameters')
  //   if (faceList) {
  //     this.faceList = JSON.parse(faceList)
  //     console.log("Face", this.faceList)
  //   }
  // }

  faceParameters() {
    this.convertedArray = []
    this.faceconvertedarray = []
    this.faceParameterslist12 = this.CommomfilterService.selectallst();
    console.log(this.faceParameterslist12);
    this.faceParameterslist12.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
      this.faceconvertedarray.push(item.name);
    });
    console.log(this.convertedArray);
    this.dropdownList12 = this.faceParameterslist12;
    console.log(this.dropdownList12);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectedItems12 = this.dropdownList12;
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

  dateTransform(date: any) {
    if (date != undefined) {
      let c = this.DateTimePipe.transforminingDispalyDate(date);
      return (c)

    }
  }

  onFormSubmit() {

    this.selectedStatusGuid = this.convertedStatus.map((list: any) => list.guid)
    // 2023-09-20T12:59:59
    console.log(this.selectedTime)
    console.log(this.selectedEndTime)
    console.log(this.filterForm.value.reportingPeriodFrom + 'T' + (this.selectedTime))
    console.log(this.filterForm.value.reportingPeriodTo + 'T' + this.selectedEndTime)

    this.FillterList = false;
    this.dataLoader = true;
    this.depositsList = false;
    let fillterbody = this.getValues(this.filterForm);
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    if (this.filterForm.value.reportingPeriodTo != null) {

    }
    // fillterbody["reportPeriod"] = this.filterForm.value.reportingPeriodFrom != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined
    // fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
    //   "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
    //   "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    // } : undefined
    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;
    // fillterbody["wallets"] = this.filterForm.value.currency != null ? [this.filterForm.value.currency] : undefined
    fillterbody["wallets"] = this.currencyGuids
    if (!this.playerExplorer && !this.agentExplorer) {
      fillterbody["userTypes"] = this.UserTypesGuids;
    }

    if (!this.agentExplorer) {

      // fillterbody["userTypes"] = this.filterForm.value.userType != null ? [this.filterForm.value.userType] : undefined
      fillterbody["userLogin"] = this.filterForm.value.userLogin != null ? this.filterForm.value.userLogin : undefined
      fillterbody["shortId"] = this.filterForm.value.shortId != null ? this.filterForm.value.shortId : undefined
      fillterbody["paymentSystemTypes"] = this.selectedPaymentsSystemsGuids
      // fillterbody["paymentSystemTypes"] = this.filterForm.value.paymentSystem != null ? [this.filterForm.value.paymentSystem] : undefined
      fillterbody["paymentMeansNumber"] = this.filterForm.value.paymentMeansNumber != null ? this.filterForm.value.paymentMeansNumber : undefined
      fillterbody["statuses"] = this.selectedStatusGuid.length == 0 ? this.StatusGuids : this.selectedStatusGuid
      // fillterbody["statuses"] = this.StatusGuids != null ? this.StatusGuids : undefined 
      // fillterbody["statuses"] = this.filterForm.value.status != null ? [this.filterForm.value.status] : undefined
      fillterbody["internalId"] = this.filterForm.value.internalId != null ? this.filterForm.value.internalId : undefined
      fillterbody["externalId"] = this.filterForm.value.externalId != null ? this.filterForm.value.externalId : undefined
      fillterbody["initiatorLogin"] = this.filterForm.value.initiatorLogin != null ? this.filterForm.value.initiatorLogin : undefined
      // fillterbody["networkNames"] = this.filterForm.value.face != null ? [this.filterForm.value.face] : undefined
      fillterbody["networkNames"] = this.convertedArray != null ? this.convertedArray : undefined;
    }
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;

    if (this.playerExplorer) {
      fillterbody["idList"] = [this.PlayerguidList]
      this.Cashierservice.getPlayerDeposits(fillterbody).subscribe(data => { this.getDepositsData(data) })
    } else if (this.agentExplorer) {
      fillterbody["idList"] = [this.agentGuid],
        this.AgentControlService.getAgentDeposits(fillterbody).subscribe((data: any) => { this.getDepositsData(data) })
    } else {
      this.Cashierservice.Deposits(fillterbody).subscribe(data => { this.getDepositsData(data) })

    }
  }
  getDepositsData(data: any) {
    this.dataLoader = false;
    this.depositsList = data.objectList;
    console.log(this.depositsList)
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    this.resultcount = false;
    if (this.ResultCount !== null || this.ResultCount == 0) {
      this.resultcount = false;
    }

    if (this.depositsList != null || data.resultCount == 0) {
      this.dataLoader = false;
    }
    for (let i = 0; i < this.depositsList.length; i++) {
      for (let j = 0; j < this.usertypes.length; j++) {
        if (this.depositsList[i].user?.type.lowLong == this.usertypes[j].guid.lowLong) {
          this.depositsList[i].user.type = this.usertypes[j].value
        }
        for (let k = 0; k < this.TransactionStatusesList.length; k++) {
          if (this.depositsList[i].status?.lowLong == this.TransactionStatusesList[k].guid?.lowLong) {
            this.depositsList[i].status = this.TransactionStatusesList[k].value
          }
        }
        for (let l = 0; l < this.PaymentsSystemsList?.length; l++) {
          if (this.depositsList[i].paymentSystemType?.lowLong == this.PaymentsSystemsList[l].guid?.lowLong) {
            this.depositsList[i].paymentSystemType = this.PaymentsSystemsList[l].value
          }
        }

      }
     
      this.depositsList[i].startDate
      let currentDateTime = this.depositsList[i]?.startDate

      currentDateTime = currentDateTime?.substring(0, currentDateTime.length - 6)
      let sendTime = this.depositsList[i]?.startDate?.split('.', [1])
      if (this.depositsList[i]?.finishDate) {
        let finishDate = this.depositsList[i]?.finishDate.split('.', [1])
        this.depositsList[i].finishDate = finishDate
      }
      // let currentDateTimes = this.DatePipe.transform(new Date(currentDateTime), 'yyyy/MM/dd h:mm:ss a');
      // console.log("dates", currentDateTimes);
      // console.log("dates", sendTime);
      this.depositsList[i].startDate = sendTime
    }

    this.depositsList.forEach((depo:any)=>{
      this.wallettypelist.forEach((wallet:any)=>{
        if(depo.orderAmount.currency?.lowLong == wallet.currency?.lowLong){
          depo.orderAmount.wallet = {lowLong:wallet.guid.lowLong, hiLong:wallet.guid.hiLong}
        }
      })
    })

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.sumAmounts(this.depositsList)
  }

  currencySymbol(wallet:any){
    return this.sumService.walletSymbol(wallet)
  }

  sumAmounts(data: any) {
    this.topUpAmountSum = this.sumService.calculateSum(data, 'topUpAmount')
    this.orderAmountSum = this.sumService.calculateSum(data, 'orderAmount')
    this.bonusSum = this.sumService.calculateSum(data, 'bonus')
    this.lockedBonusSum = this.sumService.calculateSum(data, 'lockedBonus')

    console.log('topUpAmountSum:', this.topUpAmountSum);
    console.log('orderAmountSum:', this.orderAmountSum);
    console.log('bonusSum:', this.bonusSum);
    console.log('lockedBonusSum:', this.lockedBonusSum);

  }

  keys(data: any) {
    return Object.keys(data)
  }

  textTruncate(text:string){
    if(!text){
      return ''
    }
    return text.length > 15 ? text.substring(0,15) + " ..." : text
  }

  navigateToTransation(Id:any){
  
    this.router.navigate(['/transactions'] );
    localStorage.setItem("depositeInternalId",JSON.stringify(Id))
  }


  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'DepositsExeclSheet.xlsx';
    XLSX.writeFile(wb, 'DepositsExeclSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "DepositsExeclSheet")
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

  FormReset() {
    this.filterForm.reset();
  }
  onDblClick(data: any) {
    console.log(data)
    console.log(this.depositsList[data])
    this.PlayerDepositsData = this.depositsList[data];
    this.Depositspopup = true;
  }
  closePopup() {
    this.Depositspopup = false
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
    if (this.PageCount > this.depositsList.length) {

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
    if (this.PageCount > this.depositsList.length) {
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

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }
  AgentExplore(name: any, guid: any, agentInfo: any) {

    this.AgentcontrolService.agentExplore(name, guid, agentInfo)
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
  // *************************************************************************************


  // **********************************@starts Dropdown Face*********************************************************
  onItemSelectnew(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });

    console.log(this.convertedArray);
  }
  OnItemDeSelectnew(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }


  onSelectAllnew(data: any) {
    this.convertedArray = [];
    data.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }
  onDeSelectAllnew(data: any) {
    this.convertedArray = [];
    // data.forEach((item: { name: string }) => {
    //   this.convertedArray.push(item.name);
    // });
    this.convertedArray = this.faceconvertedarray
    console.log(this.convertedArray);
  }

  // **************************************** @Ends Dropdown Face*****************************

  // **************************payment System MultiDropDowns**************************************
  onItemSelectPaymentSystem(data: any) {
    this.selectedPaymentsSystemsGuids = []
    this.filterForm.value.paymentSystem.forEach((item: { guid: any; }) => {
      this.selectedPaymentsSystemsGuids.push(item.guid);
    });
    console.log(this.selectedPaymentsSystemsGuids)
  }
  OnItemDeSelectPaymentSystem(data: any) {
    this.selectedPaymentsSystemsGuids = []
    this.filterForm.value.paymentSystem.forEach((item: { guid: any; }) => {
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
  // ***************************************** @Ends ****************************************

  //  ************************************* @USertypes Dropdown Starts*********************************
  onItemSelectUsertypes(data: any) {
    this.UserTypesGuids = []
    this.filterForm.value.userType.forEach((item: { guid: any; }) => {
      this.UserTypesGuids.push(item.guid);
    });
    console.log(this.UserTypesGuids)
  }
  OnItemDeSelectUsertypes(data: any) {
    this.UserTypesGuids = []
    this.filterForm.value.userType.forEach((item: { guid: any; }) => {
      this.UserTypesGuids.push(item.guid);
    });
    console.log(this.UserTypesGuids)
    if (this.UserTypesGuids === null || this.UserTypesGuids.length === 0) {
      console.log("Empty");
      this.UserTypesGuids = this.CopyUserTotalGuids
    }
  }
  onSelectAllUsertypes(data: any) {
    this.UserTypesGuids = []
    data.forEach((item: { guid: any; }) => {
      this.UserTypesGuids.push(item.guid);
    });
    console.log(this.UserTypesGuids)
  }
  onDeSelectAllUsertypes(data: any) {
    this.UserTypesGuids = []
    this.UserTypesGuids = this.CopyUserTotalGuids
    console.log(this.UserTypesGuids)
  }
  //  ************************************* @USertypes Dropdown ends*********************************

  // *************************status dropdown @starts*****************************************

  onItemSelectStatus(data: any) {
    console.log(this.convertedStatus)
  }
  OnItemDeSelectStatus(data: any) {
    console.log(this.convertedStatus)
  }
  onSelectAllStatus(data: any) {
    console.log(this.convertedStatus)
  }
  onDeSelectAllStatus(data: any) {
    console.log(this.convertedStatus)
  }

  // *************************status dropdown @end***************************************


}
