import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { ToolsService } from 'src/app/source/Tools.service';
import { TotalSumsService } from 'src/app/source/total-sums.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-massbonuslist',
  templateUrl: './massbonuslist.component.html',
  styleUrls: ['./massbonuslist.component.css']
})
export class MassbonuslistComponent implements OnInit {

  FillterMenu: boolean = false;
  loader: boolean = false;
  filterForm: FormGroup;
  isFilterPopup: boolean = false;
  playerLevelDropdownSettings: any = {};
  playerStatusDropdownSettings: any = {};
  bdyMonthDropdownSettings: any = {};
  haveDepositDropdownSettings: any = {};

  startDate: any;
  endDate: any;
  filterStartDate: any;
  filterEndDate: any;
  todaydate: any;
  timeerror: boolean = false
  steddate: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  FilterStartTime: any = "00:00:00"
  filterEndTime: any = "23:59:59"
  ResultCount: any;
  PageCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  pagecontrolbtn: any;

  getPlayerLevelsNamesList: any;
  selectedPlayerLevels: any;
  playerLevelGuids: any = [];
  palyerstatusList: any;
  selectedPlayerStatus: any;
  playerStatusGuids: any = [];
  BirthdatMonthsList: any;
  selectedBdyMonth: any;
  selectedBdyMonthGuid: any = [];
  MailingDepositList: any;
  selectedMailingDeposit: any;
  bonusMailingList: any;
  isEmailTemp: boolean = false;
  isMailSend: boolean = false;
  selectedTempforMail: any;
  popupArrow: boolean = false;
  templateList: any;
  TemplateCreationTypesList: any;
  filteredTemplateCreationTypes: any;
  totalSum: any;
  SeletedIconIndex: any;
  mailingDeposiGuid: any = [];
  PaymentsSystemsList: any;
  walletTypesList: any;
  getCurrencyData: any;
  filteredWalletTypes: any;
  adjustmentIncluded: boolean = false;
  adjustmentValue: number = 0;
  submitted:boolean = false;


  constructor(private CommomfilterService: CommomfilterService, private FileformatServiceService: FileformatServiceService,
    public Toolsservice: ToolsService, public totalSumService: TotalSumsService, public cashierService: CashierService,
  ) {
    this.filterForm = new FormGroup({


      firstRecord: new FormControl(1, this.CommomfilterService.requiredAndMinOne()),
      maxCountRecord: new FormControl(100, this.CommomfilterService.requiredAndMinOne()),
      startDate: new FormControl(this.startDate,),
      endDate: new FormControl(this.endDate,),
      startTime: new FormControl(),
      endTime: new FormControl(),
      filterStartDate: new FormControl(),
      filterEndDate: new FormControl(),
      FilterStartTime: new FormControl(),
      filterEndTime: new FormControl(),


      emailMask: new FormControl(),
      birthDayOfMonthFrom: new FormControl(),
      birthDayOfMonthTo: new FormControl(),
      birthMonths: new FormControl(),
      deposit: new FormControl(),
      levelGuids: new FormControl(),
      userStatus: new FormControl(),
      numberOfDepositsHigh: new FormControl(),
      numberOfDepositsLow: new FormControl(),
      numberOfWithdrawsHigh: new FormControl(),
      numberOfWithdrawsLow: new FormControl(),
      gameRoundsHigh: new FormControl(),
      gameRoundsLow: new FormControl(),
      notLoggedInForLow: new FormControl(),
      notLoggedInForHigh: new FormControl(),
      numberOfDepositsSinceLastBonusLow: new FormControl(),
      numberOfDepositsSinceLastBonusHigh: new FormControl(),
    });

  }

  ngOnInit(): void {
    this.TemplateCreationTypes();
    this.getPlayerLevelsNames();
    this.palyerstatus();
    this.MailingDeposit();
    this.BirthdatMonths()
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  filterPopup() {
    this.isFilterPopup = !this.isFilterPopup
  }

  emailTempPopup(message: any) {
    if (message == 'emailTemp') {
      this.isEmailTemp = !this.isEmailTemp
      this.submitted= false;
    } else {
      this.isMailSend = !this.isMailSend
    }
  }

  sendMail() {

    let selectedBonusLimit = this.getCurrencyData.filter((list:any)=>list.selected)

    let bonusLimits = selectedBonusLimit?.map((list:any)=>{
      let {currencyName,enabled,guid,paymentSysCurrency,paymentSysName,selected,...rest} = list
      return rest
    })
    let body = {
      "filter":{
        // "deposit":deposit.length == 0 ? this.mailingDeposiGuid : deposit;
        // "depositDeclinedStatus":
        // "userStatus":userStatus.length == 0 ? this.playerStatusGuids : userStatus;
        "letterTemplate": this.selectedTempforMail
      },
      'parameters':{
        "adjustmentIncluded":this.adjustmentIncluded,
        "adjustmentValue":this.adjustmentValue,
        "bonusLimits":bonusLimits
      }
    }

    let isSelectedBonusLimit = this.getCurrencyData.some((list:any)=>list.selected)

   if(isSelectedBonusLimit || this.adjustmentValue){
    this.Toolsservice.sendBonusListMail(body).subscribe((resp: any) => {
      console.log(resp)
    })
   }else{
    this.submitted = true;
    this.isEmailTemp = true;
   }
  }

  onView() {
    this.onFormSubmit()
    this.isFilterPopup = false;
  }

  onSend() {
    this.isFilterPopup = false;
    this.popupArrow = false;

    let body = {}

    this.cashierService.getCurrency(body).subscribe((res) => {
      console.log(res)
      this.getCurrencyData = res.objectList;
      this.PaymentsSystems()
      this.walletTypes()
    })

    this.Toolsservice.getMailTemplatesByType(this.filteredTemplateCreationTypes.guid).subscribe((res => {
      console.log(res)
      this.templateList = res.objectList;
      this.sendMailforPlayer()
    }))


  }

  sendMailforPlayer() {

    if (this.templateList.length == 0) {
      this.isEmailTemp = true;
    } else {
      this.isMailSend = true;

    }
    this.selectedTempforMail = this.templateList[0]?.guid
  }

  PaymentsSystems() {
    let PaymentsSystems = localStorage.getItem("PaymentsSystems")
    if (PaymentsSystems) {
      this.PaymentsSystemsList = JSON.parse(PaymentsSystems)
    }
    console.log('PaymentsSystems', this.PaymentsSystemsList)

    this.PaymentsSystemsList.forEach((paymentSys: any) => {
      this.getCurrencyData?.forEach((data: any) => {
        if (data.paymentSystem.lowLong == paymentSys.guid.lowLong) {
          data.paymentSysName = paymentSys.value;
          data.firstFixedBonus = { value: 0 };
          data.firstMaxBonus = { value: 0 };
          data.firstMinDeposit = { value: 0 };
          data.firstPercent = { value: 0 };
          data.nextFixedBonus = { value: 0 };
          data.nextMaxBonus = { value: 0 };
          data.nextMinDeposit = { value: 0 };
          data.nextPercent = { value: 0 };
          data.default = false;
          data.selected = false;
        }
      })
    })


  }

  walletTypes() {
    let walletTypes = localStorage.getItem('walletTypes')
    if (walletTypes) {
      this.walletTypesList = JSON.parse(walletTypes)
      this.filteredWalletTypes = this.walletTypesList.filter((list: any) => list.clubGameWallet && list.description !== 'Play Money')
      this.filteredWalletTypes.forEach((wallet: any) => {
        this.getCurrencyData?.forEach((data: any) => {
          if (data.currency.lowLong == wallet.currency.lowLong) {
            data.currencyName = wallet.description
          }
        })
      })
      console.log(this.getCurrencyData)
    }
    console.log('walletTypes', this.filteredWalletTypes)



  }

  TemplateCreationTypes() {
    let TemplateCreationTypes = localStorage.getItem('TemplateCreationTypes')
    if (TemplateCreationTypes) {
      this.TemplateCreationTypesList = JSON.parse(TemplateCreationTypes)
    }
    this.filteredTemplateCreationTypes = this.TemplateCreationTypesList.find((list: any) => list.value == 'Mass email template for Players')
    console.log(this.filteredTemplateCreationTypes)
  }

  getPlayerLevelsNames() {
    let getPlayerLevelsNames = localStorage.getItem('getPlayerLevelsNames')
    if (getPlayerLevelsNames) {
      this.getPlayerLevelsNamesList = JSON.parse(getPlayerLevelsNames)
      console.log(this.getPlayerLevelsNamesList)

      this.selectedPlayerLevels = this.getPlayerLevelsNamesList.compPointsLevels.map((list: any) => {
        this.playerLevelGuids.push(list.guid)
        return { name: list.name, guid: list.guid }
      })
    }

    this.playerLevelDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }

  palyerstatus() {
    let palyerstatus = localStorage.getItem('palyerstatus')
    if (palyerstatus) {
      this.palyerstatusList = JSON.parse(palyerstatus)

      this.selectedPlayerStatus = this.palyerstatusList.map((list: any) => {
        this.playerStatusGuids.push(list.guid)
        return { guid: list.guid, value: list.value }
      })
    }

    this.playerStatusDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }

  BirthdatMonths() {
    let BirthdatMonths = localStorage.getItem('BirthdatMonths')
    if (BirthdatMonths) {
      this.BirthdatMonthsList = JSON.parse(BirthdatMonths)

      this.selectedBdyMonth = this.BirthdatMonthsList.map((list: any) => {
        this.selectedBdyMonthGuid.push(list.guid)
        return { guid: list.guid, value: list.value }
      })
    }

    this.bdyMonthDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }

  MailingDeposit() {
    let MailingDeposit = localStorage.getItem('MailingDeposit')
    if (MailingDeposit) {
      this.MailingDepositList = JSON.parse(MailingDeposit)
    }

    this.selectedMailingDeposit = this.MailingDepositList.map((list: any) => {
      this.mailingDeposiGuid.push(list.guid)
      return { guid: list.guid, value: list.value }
    })

    this.haveDepositDropdownSettings = {
      singleSelection: true,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
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

  getWalletSymbol(wallet: any) {
    return this.totalSumService.walletSymbol(wallet)
  }

  getTotalSum() {
    this.totalSum = this.totalSumService.calculateSum(this.bonusMailingList, "balance");
    console.log(this.totalSum)
  }

  keys(data: any) {
    return Object.keys(data)
  }

  showmanu(i: any, guid: any) {
    this.SeletedIconIndex = i;
    this.popupArrow = !this.popupArrow;
    // this.PlayerGuid = guid;
  }

  onFormSubmit() {
    console.log(this.filterForm.value);
    this.FillterMenu = false;
    this.loader = true;
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)

    let levelGuids = this.selectedPlayerLevels.map((list: any) => list.guid)
    let userStatus = this.selectedPlayerStatus.map((list: any) => list.guid)
    let birthMonths = this.selectedBdyMonth.map((list: any) => list.guid)
    let deposit = this.selectedMailingDeposit.map((list: any) => list.guid)

    let { emailMask, firstRecord, maxCountRecord, notLoggedInForHigh, notLoggedInForLow, birthDayOfMonthFrom,
      birthDayOfMonthTo, gameRoundsHigh, gameRoundsLow, numberOfDepositsHigh, numberOfDepositsLow, numberOfDepositsSinceLastBonusHigh,
      numberOfDepositsSinceLastBonusLow, numberOfWithdrawsHigh, numberOfWithdrawsLow,
    } = this.filterForm.value

    const { startDate, startTime, endDate, endTime, filterStartDate, filterEndDate, FilterStartTime, filterEndTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;

    const filterStartDateTime = filterStartDate ? filterStartDate + "T" + FilterStartTime : undefined;
    const filterEndDateTime = filterEndDate ? filterEndDate + "T" + filterEndTime : undefined;

    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;


    fillterbody["firstRecord"] = firstRecord - 1
    fillterbody["maxCountRecord"] = maxCountRecord
    fillterbody["emailMask"] = emailMask ? emailMask : undefined;
    fillterbody["levelGuids"] = levelGuids.length == 0 ? this.playerLevelGuids : levelGuids;
    fillterbody["userStatus"] = userStatus.length == 0 ? this.playerStatusGuids : userStatus;
    fillterbody["birthMonths"] = birthMonths.length == 0 ? this.selectedBdyMonthGuid : birthMonths;
    fillterbody["deposit"] = deposit.length == 0 ? this.mailingDeposiGuid : deposit;
    // fillterbody["depositDeclinedStatus"] = deposit.length == 0 ? this.mailingDeposiGuid : deposit;
    fillterbody["birthDayOfMonth"] = (birthDayOfMonthTo || birthDayOfMonthFrom) ? {
      to: birthDayOfMonthTo ? birthDayOfMonthTo : undefined,
      from: birthDayOfMonthFrom ? birthDayOfMonthFrom : undefined
    } : undefined;
    fillterbody["notLoggedInFor"] = (notLoggedInForHigh || notLoggedInForLow) ? {
      high: notLoggedInForHigh ? notLoggedInForHigh : undefined,
      low: notLoggedInForLow ? notLoggedInForLow : undefined
    } : undefined;

    fillterbody["gameRounds"] = (gameRoundsHigh || gameRoundsLow) ? {
      high: gameRoundsHigh ? gameRoundsHigh : undefined,
      low: gameRoundsLow ? gameRoundsLow : undefined
    } : undefined;

    fillterbody["numberOfWithdraws"] = (numberOfWithdrawsHigh || numberOfWithdrawsLow) ? {
      high: numberOfWithdrawsHigh ? numberOfWithdrawsHigh : undefined,
      low: numberOfWithdrawsLow ? numberOfWithdrawsLow : undefined
    } : undefined;

    fillterbody["numberOfDepositsSinceLastBonus"] = (numberOfDepositsSinceLastBonusHigh || numberOfDepositsSinceLastBonusLow) ? {
      high: numberOfDepositsSinceLastBonusHigh ? numberOfDepositsSinceLastBonusHigh : undefined,
      low: numberOfDepositsSinceLastBonusLow ? numberOfDepositsSinceLastBonusLow : undefined
    } : undefined;

    fillterbody["numberOfDeposits"] = (numberOfDepositsHigh || numberOfDepositsLow) ? {
      high: numberOfDepositsHigh ? numberOfDepositsHigh : undefined,
      low: numberOfDepositsLow ? numberOfDepositsLow : undefined
    } : undefined;
    fillterbody["haveOpennedAccount"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;
    fillterbody["filterTimePeriod"] = (filterStartDateTime || filterEndDateTime) ? { start: filterStartDateTime, end: filterEndDateTime } : undefined;


    this.Toolsservice.getMailTemplatesByType(this.filteredTemplateCreationTypes.guid).subscribe((res => this.getMailTemplatesByTypeRes(res)))
    this.Toolsservice.getBonusMailingList(fillterbody).subscribe((res: any) => { this.getBonusMailingListRes(res) })
  }

  getBonusMailingListRes(data: any) {
    console.log(data)
    this.loader = false;
    this.bonusMailingList = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;
    this.resultcount = false;

    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.getTotalSum()
  }

  getMailTemplatesByTypeRes(data: any) {
    console.log(data)
    this.templateList = data.objectList

    if (data.objectList.length == 0) {
      this.isEmailTemp = true;
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
    this.pagecontrolbtn = true;
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: Math.floor((this.ResultCount - 1) / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    if (this.PageCount > this.bonusMailingList.length) {
      this.pagecontrolbtn = true;
    }

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
    if (this.PageCount > this.bonusMailingList.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerMailingExcelSheet.xlsx';
    XLSX.writeFile(wb, 'PlyerMailingExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "PlyerlistExcelSheet")
  }

}
