import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { CashierService } from 'src/app/source/Cashier.service';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { TotalSumsService } from 'src/app/source/total-sums.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  TransactionsData: any;
  loader: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  usertypeList: any;
  usertypes: any = [];
  faceParametersList: any;
  TransactionOperationsList: any;
  TransactionStatusesList: any;
  PaymentsSystemsList: any;
  TransactionsDatafulldetails: any;
  TransactionsDatapopup: boolean = false;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

  currencyarray: any = [];
  selectcurrency: any = [];
  currencydropdownlist: any = [];
  dropdownSettingscurrency = {};
  currencyList: any = [];
  selectedcurrency: any = [];
  currencyGuids: any = [];
  CopyCurrencyTotalGuids: any = [];
  wallettypelist: any = [];

  faceParameterslist: any;
  convertedArray: any = []
  dropdownList12: any = []
  selectedItems12: any = []
  dropdownSettings = {}

  dropdownSettingsPaymentSystem: any;
  CopyTotalGuids: any = [];
  selectedPaymentsSystemsGuids: any = [];
  // PaymentsSystemsList: any;
  selectedPaymentsSystemsList: any = [];

  selectedUserlist: any = [];
  UserTypesGuids: any = [];
  CopyUserTotalGuids: any = [];
  dropdownSettingsUsertypes = {};
  StatusGuids: any = [];
  usertypelist: any;

  convertedStatus: any = [];
  // StatusGuids: any = [];
  dropdownStatusSettings = {};

  converetedopertion: any = [];
  operationguids: any = [];
  dropdownListOpertaion: any = [];
  dropdownsettingsOpertaion = {};
  PaymentsSystemsGuids: any = [];
  selectedStatusGuid: any;
  selectedOperationGuid: any;
  orderAmount: any;
  walletFormatList: any;
  popupArrow: boolean = false;
  SeletedIconIndex: any;
  conformationType: any;
  ChargebackPopup: boolean = false;
  notifyPlayerCheckbox: boolean = false;
  Spinner: boolean = false;
  referenceNumberPopup: boolean = false;
  referenceNumber: any;


  constructor(private CashierService: CashierService, private FileformatServiceService: FileformatServiceService, private sumService: TotalSumsService,
    private DateTimePipe: DateTimePipe, private PlayerserviceService: PlayerServiceService, private AgentcontrolService: AgentControlService,
    private router: Router) {
    this.filterForm = new FormGroup({

      Currency: new FormControl(),
      UserType: new FormControl(),
      UserLoginMask: new FormControl(),
      ShortId: new FormControl(),
      PaymentsSystems: new FormControl(),
      PaymentMeansNumber: new FormControl(),
      Statuses: new FormControl(),
      Operation: new FormControl(),
      InternalId: new FormControl(),
      ExternalId: new FormControl(),
      InitiatorLoginMask: new FormControl(),
      Face: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      enddate: new FormControl(),
      // PaymentsSystems: new FormControl()
    })
  }

  ngOnInit(): void {
    this.walletTypes();
    this.walletFormats()
    // this.usertype();
    this.UserType();
    this.PaymentsSystems();
    this.faceParameters();
    this.TransactionOperations();
    this.TransactionStatuses();

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    this.isNavigatedFromDeposit()
  }

  isNavigatedFromDeposit() {
    let ID = localStorage.getItem("depositeInternalId")
    console.log(ID)
    if (ID) {
      this.filterForm.patchValue({
        InternalId: JSON.parse(ID)
      })
      this.onFormSubmit()
      console.log(ID)
    }
  }

  ngOnDestroy() {
    localStorage.removeItem("depositeInternalId")
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  UserType() {
    const usertypes = localStorage.getItem('usertype');
    if (usertypes) {
      this.usertypelist = JSON.parse(usertypes);
      console.log("usertypelist", this.usertypelist)

      for (let i = 0; i < this.usertypelist.length; i++) {
        if (this.usertypelist[i].value == "Player" || this.usertypelist[i].value == "Agent" || this.usertypelist[i].value == "Affiliate") {
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
  faceParameters() {
    const faceParameterslist = localStorage.getItem('faceParameters')
    if (faceParameterslist) {
      this.faceParameterslist = JSON.parse(faceParameterslist)
    }
    this.convertedArray = []
    // this.faceParameterslist = this.CommomfilterService.selectallst();
    console.log(this.faceParameterslist);

    this.faceParameterslist.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
    this.dropdownList12 = this.faceParameterslist;
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
  TransactionOperations() {
    const TransactionOperations = localStorage.getItem("TransactionOperations");
    if (TransactionOperations) {
      this.TransactionOperationsList = JSON.parse(TransactionOperations)
    }
    this.converetedopertion = []
    console.log(this.TransactionOperationsList)

    this.TransactionOperationsList.forEach((item: any, i: any) => {
      this.operationguids.push(item.guid)
      this.converetedopertion[i] = {
        value: item.value,
        guid: item.guid
      }
    });

    console.log(this.converetedopertion)
    console.log(this.operationguids)

    this.dropdownsettingsOpertaion = {
      singleslection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unselectAllText: 'unselect All',
      itemsShowlimit: 1,
      allowsearchFilter: false,
    }
    // console.log("OperationsList", this.TransactionOperationsList)
  }

  TransactionStatuses() {
    const TransactionStatuses = localStorage.getItem("TransactionStatuses");
    if (TransactionStatuses) {
      this.TransactionStatusesList = JSON.parse(TransactionStatuses)
    }
    this.StatusGuids = []
    console.log("TransactionStatusesList", this.TransactionStatusesList);


    this.TransactionStatusesList.forEach((item: any, i: any) => {
      this.StatusGuids.push(item.guid)
      this.convertedStatus[i] = {
        value: item.value,
        guid: item.guid
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

  PaymentsSystems() {
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
      this.PaymentsSystemsGuids.push(this.PaymentsSystemsList[i].guid);
      this.selectedPaymentsSystemsList[i] = {
        paymentSystemName: this.PaymentsSystemsList[i].paymentSystemName,
        guid: this.PaymentsSystemsList[i].guid
      }
    }
    console.log(this.selectedPaymentsSystemsList)

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
  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
          // else
          //   dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }

  onFormSubmit() {

    let selectedUserGuid = this.selectedUserlist.map((list: any) => list.guid)
    this.selectedOperationGuid = this.converetedopertion.map((list: any) => list.guid)
    this.selectedStatusGuid = this.convertedStatus.map((list: any) => list.guid)
    this.selectedPaymentsSystemsGuids = this.selectedPaymentsSystemsList.map((list: any) => list.guid)
    console.log(this.filterForm.value);
    this.FillterMenu = false;
    this.loader = true;
    this.TransactionsData = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    // fillterbody["reportPeriod"] = this.filterForm.value.reportingPeriodFrom != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined;

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;

    // fillterbody["reportPeriod"] = this.filterForm.value.ReportingDateForm != null ? { "start": this.filterForm.value.ReportingDateForm, "end": this.filterForm.value.ReportingDateTo } : undefined
    fillterbody["currency"] = this.currencyGuids;
    // fillterbody["currency"] = this.filterForm.value.Currency != null ? [this.filterForm.value.Currency] : undefined
    // fillterbody["userType"] = this.filterForm.value.UserType != null ? [this.filterForm.value.UserType] : undefined
    fillterbody["userType"] = selectedUserGuid.length == 0 ? this.UserTypesGuids : selectedUserGuid;
    fillterbody["userLogin"] = this.filterForm.value.UserLoginMask != null ? this.filterForm.value.UserLoginMask : undefined;
    fillterbody["shortId"] = this.filterForm.value.ShortId != null ? this.filterForm.value.ShortId : undefined;
    fillterbody["paymentSystemType"] = this.selectedPaymentsSystemsGuids.length == 0 ? this.PaymentsSystemsGuids : this.selectedPaymentsSystemsGuids
    // fillterbody["paymentSystemType"] = this.filterForm.value.PaymentsSystems != null ? [this.filterForm.value.PaymentsSystems] : undefined
    fillterbody["paymentMeansNumber"] = this.filterForm.value.PaymentMeansNumber != null ? this.filterForm.value.PaymentMeansNumber : undefined;
    fillterbody["status"] = this.selectedStatusGuid.length == 0 ? this.StatusGuids : this.selectedStatusGuid;
    // fillterbody["status"] = this.StatusGuids != null ? this.StatusGuids : undefined
    // fillterbody["status"] = this.filterForm.value.Statuses != null ? [this.filterForm.value.Statuses] : undefined
    fillterbody["operationType"] = this.selectedOperationGuid.length == 0 ? this.operationguids : this.selectedOperationGuid;
    // fillterbody["operationType"] = this.operationguids != null ? this.operationguids : undefined
    // fillterbody["operationType"] = this.filterForm.value.Operation != null ? [this.filterForm.value.Operation] : undefined
    fillterbody["internalId"] = this.filterForm.value.InternalId != null ? this.filterForm.value.InternalId : undefined;
    fillterbody["externalId"] = this.filterForm.value.ExternalId != null ? this.filterForm.value.ExternalId : undefined;
    fillterbody["initiatorLogin"] = this.filterForm.value.InitiatorLoginMask != null ? this.filterForm.value.InitiatorLoginMask : undefined;
    // fillterbody["networkNames"] = this.filterForm.value.Face != null ? [this.filterForm.value.Face] : undefined
    fillterbody["networkNames"] = this.convertedArray != null ? this.convertedArray : undefined;
    // fillterbody["reportType"] = this.filterForm.value.ReportType != null ? [this.filterForm.value.ReportType] : undefined;;
    // fillterbody["adminLoginMask"] = this.filterForm.value.Initiator != null ? this.filterForm.value.Initiator : undefined;;


    this.CashierService.getTransactions(fillterbody).subscribe((res) => { this.TransactionsResData(res) })
  }
  TransactionsResData(data: any) {
    console.log(data)
    this.TransactionsData = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;

    if (this.TransactionsData != null) {
      this.loader = false;
    }

    if (this.TransactionsData !== null) {
      this.resultcount = false;
    }
    for (let i = 0; i < this.TransactionsData.length; i++) {
      for (let j = 0; j < this.usertypes.length; j++) {
        if (this.TransactionsData[i].user?.type.lowLong == this.usertypes[j].guid.lowLong) {
          this.TransactionsData[i].user.type = this.usertypes[j].value
        }
      }
      for (let k = 0; k < this.PaymentsSystemsList.length; k++) {
        if (this.TransactionsData[i].paymentSystemType.lowLong == this.PaymentsSystemsList[k].guid.lowLong) {
          this.TransactionsData[i].paymentSystemType = this.PaymentsSystemsList[k].value
        }
      }
      for (let l = 0; l < this.TransactionStatusesList.length; l++) {
        if (this.TransactionsData[i].status.lowLong == this.TransactionStatusesList[l].guid.lowLong) {
          this.TransactionsData[i].status = this.TransactionStatusesList[l].value
        }
      }
      for (let l = 0; l < this.TransactionOperationsList.length; l++) {
        if (this.TransactionsData[i].operationType.lowLong == this.TransactionOperationsList[l].guid.lowLong) {
          this.TransactionsData[i].operationType = this.TransactionOperationsList[l].value
        }
      }

      this.wallettypelist.map((list: any) => {
        if (list.currency?.lowLong == this.TransactionsData[i].orderAmount.currency.lowLong) {
          this.TransactionsData[i].orderAmount.wallet = { lowLong: list.guid.lowLong, hiLong: list.guid.hiLong }
        }
      })
    }
    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.sumsAmount(this.TransactionsData)
  }

  sumsAmount(data: any) {
    this.orderAmount = this.sumService.calculateSum(data, 'orderAmount')
    console.log(this.orderAmount)
  }

  keys(data: any) {
    return Object.keys(data)
  }
  timeFormat(time: any) {
    // let timeformat: any = this.sumService.TimeFormat(time)

    // for (let x of timeformat) {
    //   // console.log(isNaN(x))
    //   if (isNaN(x)) {
    //     console.log(x)
    //     timeformat.replace(x, '')
    //     return timeformat
    //   }
    // }
    let totalSeconds = Math.floor(time / 1000);

    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedDays = days.toString().padStart(3, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedDays} : ${formattedHours}: ${formattedMinutes} : ${formattedSeconds}`;
  }
  currencySymbol(guid: any) {
    let symbol
    this.walletFormatList.forEach((list: any) => {
      if (guid.lowLong == list.guid.lowLong) {
        if (list.currencyCode) {
          symbol = list.symbol
        }
      }
    })
    return symbol
  }

  navigateToDeposite(id: any, type: any) {
    if (type == "Deposit") {
      localStorage.setItem("internalId", JSON.stringify(id))
      this.router.navigate(['/cashdeposits'])
    } else if (type == "Withdrawal") {
      localStorage.setItem("internalId", JSON.stringify(id))
      this.router.navigate(['/withdrawals'])
    }
  }

  showmanu(i: any, guid: any) {
    this.popupArrow = !this.popupArrow
    this.SeletedIconIndex = i
    this.TransactionsDatafulldetails = this.TransactionsData[this.SeletedIconIndex]
    console.log(this.TransactionsDatafulldetails)
  }
  setTransactionActions(type: any, i: any) {
    this.popupArrow = false;
    this.conformationType = type
    switch (type) {
      case "commit":
      case "rollback":
      case "restart":
        // this.conformationType = ` Do you want to ${type} the transaction`
        break;

      case "Chargeback":
        this.ChargebackPopup = true
        break;


    }

  }

  TransactionActions(type: any) {
    if (type == 'yes') {
      // this.Spinner = true;

      switch (this.conformationType) {
        case "commit":
          this.referenceNumberPopup = true;
          // this.commitTransaction()
          break;
        case "rollback":
          this.Spinner = true;
          this.rollbackTransactions()
          break;
        case "restart":
          this.Spinner = true;
          this.restartTransaction()
          break;
        case "Chargeback":
          this.Spinner = true;
          this.setFraudPaymentForPlayer()
          break;
      }


    } else {
      this.conformationType = '';
      this.ChargebackPopup = false;
      this.notifyPlayerCheckbox = false;
    }
  }
  commitTransaction(type: any) {
    if (type == 'yes') {
      this.Spinner = true;
      let body = {
        'tGuid': this.TransactionsDatafulldetails.guid,
        'posNumber': this.referenceNumber,
      }
      this.CashierService.commitTransaction(body).subscribe((data) => {
        console.log(data);
        this.actionRequery(data);
        this.referenceNumberPopup = false;
      })
    } else {
      this.referenceNumberPopup = false;
    }
  }
  rollbackTransactions() {
    let body = {
      // 'transactionsId': {
      'tGuids': [this.TransactionsDatafulldetails.guid],
      // }
    }
    this.CashierService.rollbackTransactions(body).subscribe((data) => {
      console.log(data);
      this.actionRequery(data);
    })
  }
  restartTransaction() {
    let body = {
      'tGuid': this.TransactionsDatafulldetails.guid,
    }
    this.CashierService.restartTransaction(body).subscribe((data) => {
      console.log(data);
      this.actionRequery(data);
    })
  }
  setFraudPaymentForPlayer() {
    let body = {
      "userGuid": this.TransactionsDatafulldetails.user.guid,
      "depositGuid": this.TransactionsDatafulldetails.guid,
      "sendToDatabase": false,
      "sendToPlayer": this.notifyPlayerCheckbox

    }
    this.CashierService.setFraudPaymentForPlayer(body).subscribe((data) => {
      console.log(data);
      this.actionRequery(data);
    })
  }
  actionRequery(data: any) {
    if (data.changedObjectList) {
      this.conformationType = '';
      this.ChargebackPopup = false;
      this.Spinner = false;
      this.onFormSubmit();
    }
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
    XLSX.writeFile(wb, 'TransacionsExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "TransacionsExcelSheet")
  }


  closepopup() {
    this.TransactionsDatapopup = false;
  }

  Transactionspopup(event: any) {
    console.log(event)
    // console.log( this.PlayerList[event] )
    this.TransactionsDatafulldetails = this.TransactionsData[event]
    console.log(this.TransactionsDatafulldetails)
    this.TransactionsDatapopup = true;
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
    if (this.PageCount > this.TransactionsData.length) {

      this.pagecontrolbtn = true
    }
    this.onFormSubmit()
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)
  }

  transformDate(date: string): any {
    if (date != undefined) {
      let c = this.DateTimePipe.transforminingDispalyDate(date);
      return (c)

    }
  }

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }

  AgentExplore(name: any, guid: any, agentInfo: any) {

    this.AgentcontrolService.agentExplore(name, guid, agentInfo)
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
    if (this.PageCount > this.TransactionsData.length) {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }

  timechnage(data: any) {
    console.log(data.target.value)
  }

  walletFormats() {
    const walletFormats = localStorage.getItem("walletFormats")
    if (walletFormats) {
      this.walletFormatList = JSON.parse(walletFormats)
    }
  }

  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        if (this.wallettypelist[i].clubGameWallet == true) {
          if (this.wallettypelist[i].description != "Play Money") {

            this.currencyList.push(this.wallettypelist[i])
          }
        }
      }
      console.log("currencyList", this.currencyList)

      for (let i = 0; i < this.currencyList.length; i++) {
        this.selectedcurrency[i] = {
          description: this.currencyList[i].description,
          currency: this.currencyList[i].currency
        }
      }
      console.log(this.selectedcurrency)
      this.selectedcurrency.forEach((item: { currency: any; }) => {
        this.currencyGuids.push(item.currency);
      });
      this.CopyCurrencyTotalGuids = this.currencyGuids
      console.log(this.currencyGuids);

      this.dropdownSettingscurrency = {
        singleSelection: false,
        idField: 'currency',
        textField: 'description',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
    }
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

  // *********************************** @Dropdown currency starts ********************************
  onItemSelectcurrency(data: any) {
    this.currencyGuids = []
    console.log(this.filterForm.value.Currency)
    this.filterForm.value.Currency.forEach((item: { currency: any; }) => {
      this.currencyGuids.push(item.currency);
    });
    console.log(this.currencyGuids)
  }

  OnItemDeSelectcurrency(data: any) {
    this.currencyGuids = []
    console.log(this.filterForm.value.Currency)
    this.filterForm.value.Currency.forEach((item: { currency: any; }) => {
      this.currencyGuids.push(item.currency);
    });
    console.log(this.currencyGuids)
    if (this.currencyGuids === null || this.currencyGuids.length === 0) {
      console.log("Empty");
      this.currencyGuids = this.CopyCurrencyTotalGuids
    }
    console.log(this.currencyGuids)
  }
  onSelectAllcurrency(data: any) {
    this.currencyGuids = []
    data.forEach((item: { currency: any; }) => {
      this.currencyGuids.push(item.currency);
    });
    console.log(this.currencyGuids)
  }
  onDeSelectAllcurrency(data: any) {
    this.currencyGuids = []
    this.currencyGuids = this.CopyCurrencyTotalGuids
    console.log(this.currencyGuids)
  }

  // *********************************** @Dropdown currency Ends ********************************

  // *****************face dropdown @ starts ***************************************

  onItemSelectnew(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.Face.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });

    console.log(this.convertedArray);
  }
  OnItemDeSelectnew(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.Face.forEach((item: { name: string }) => {
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
    data.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }


  // ********************** face dropdown @ ends ******************************

  // **************************payment System MultiDropDowns**************************************
  onItemSelectPaymentSystem(data: any) {
    console.log(this.selectedPaymentsSystemsGuids)
  }

  OnItemDeSelectPaymentSystem(data: any) {
    console.log(this.selectedPaymentsSystemsGuids)
  }
  onSelectAllPaymentSystem(data: any) {
    console.log(this.selectedPaymentsSystemsGuids)
  }
  onDeSelectAllPaymentSystem(data: any) {
    console.log(this.selectedPaymentsSystemsGuids)
  }
  // ***************************************** @Ends ****************************************

  //  ************************************* @USertypes Dropdown Starts*********************************
  onItemSelectUsertypes(data: any) {
    console.log(this.selectedUserlist)
  }
  OnItemDeSelectUsertypes(data: any) {
    console.log(this.selectedUserlist)
  }
  onSelectAllUsertypes(data: any) {
    console.log(this.selectedUserlist)
  }
  onDeSelectAllUsertypes(data: any) {
    console.log(this.selectedUserlist)
  }
  //  ************************************* @USertypes Dropdown ends*********************************

  // *************************status dropdown @starts*****************************************

  onItemSelectStatus(data: any) {
    console.log(this.convertedStatus);
  }
  OnItemDeSelectStatus(data: any) {
    console.log(this.convertedStatus);
  }
  onSelectAllStatus(data: any) {
    console.log(this.convertedStatus);
  }
  onDeSelectAllStatus(data: any) {
    console.log(this.convertedStatus)
  }

  // *************************status dropdown @end***************************************
  // *****************TYPES dropdown @ starts *************************************** 
  onItemSelectOperation(data: any) {
    console.log(this.converetedopertion);
  }
  OnItemDeSelectOperation(data: any) {
    console.log(this.converetedopertion);
  }
  onSelectAllOperation(data: any) {
    console.log(this.converetedopertion);
  }
  onDeSelectAllOperation(data: any) {
    console.log(this.converetedopertion);
  }
  // ********************** TYPES dropdown @ ends ******************************
}
