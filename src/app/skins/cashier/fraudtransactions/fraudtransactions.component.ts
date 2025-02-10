import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment'; 
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-fraudtransactions',
  templateUrl: './fraudtransactions.component.html',
  styleUrls: ['./fraudtransactions.component.css']
})
export class FraudtransactionsComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  loader: boolean = false;
  FraudTransresData: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  walletlist: any;
  walletlists: any = [];
  PaymentSystemsList: any;
  UserTypeList: any;
  FraudPlayerData: any;
  FraudTransresDataPopUp: boolean = false;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false


  wallettypelist: any;
  currencyList: any = [];
  selectedcurrency: any = [];
  currencyGuids: any = [];
  CopyCurrencyTotalGuids: any = [];
  dropdownSettingscurrency = {};


  constructor(private Cashierservice: CashierService,private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      ReportingPeriodfrom: new FormControl(),
      ReportingPeriodto: new FormControl(),
      currency: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl()
    })
  }

  ngOnInit(): void {
    // this.walletlistmethod();
    this.PAYMENTSYSTEMS();
    this.UserType();
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

  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  // walletlistmethod() {

  //   const wallets = localStorage.getItem('walletlist');
  //   if (wallets) {
  //     this.walletlist = JSON.parse(wallets);
  //     for (let i = 0; i < this.walletlist.length; i++) {
  //       this.walletlists.push(this.walletlist[i])
  //     }
  //   }
  //   console.log(this.walletlist)
  //   console.log(this.walletlists.value)
  // }


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
  PAYMENTSYSTEMS() {
    const Paymentsystem = localStorage.getItem('PaymentsSystems');
    if (Paymentsystem) {
      this.PaymentSystemsList = JSON.parse(Paymentsystem)
      console.log(this.PaymentSystemsList)
    }
  }
  UserType() {
    const UserType = localStorage.getItem('usertype');
    if (UserType) {
      this.UserTypeList = JSON.parse(UserType)
      console.log(this.UserTypeList)
    }
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
    console.log(this.filterForm.value)
    this.loader = true
    // this.Affiliateslist = false;
    this.FraudTransresData = false;
    this.FillterMenu = false;
    let body = {
      // "currencywallet": this.currencyarray != null ? this.currencyarray : undefined,
      "currencywallet": this.currencyGuids,
      "reportPeriod": this.filterForm.value.reportingPeriodTo != null ? this.filterForm.value.reportingPeriodTo : undefined
    }
    let fillterbody = this.getDirtyValues(this.filterForm)
    // fillterbody["currencywallet"] = this.currencyarray != null ? this.currencyarray : undefined
    fillterbody["wallets"] = this.currencyGuids
    fillterbody["reportPeriod"] = this.filterForm.value.ReportingPeriodfrom != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined
    
    // let fillterbody = this.getDirtyValues(this.filterForm)
    // fillterbody["reportPeriod"] = this.filterForm.value.reportingPeriodTo != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined
    // fillterbody["currencywallet"] = this.currencyGuids
    // fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1);
    // fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;

    this.Cashierservice.getAccFraudLosses(fillterbody).subscribe((res) => this.FraudTransctionData(res))
  }

  FraudTransctionData(data: any) {
    console.log(data);
    this.FraudTransresData = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.FraudTransresData != null) {
      this.loader = false;
    }
    for (let i = 0; i < this.FraudTransresData.length; i++) {
      if (!this.FraudTransresData[i].lockedBonuses) {
        Object.assign(this.FraudTransresData[i], { lockedBonuses: '' })
      }
      if (!this.FraudTransresData[i].bonus) {
        Object.assign(this.FraudTransresData[i], { bonus: { value: "" } })
      }

      for (let m = 0; m < this.PaymentSystemsList.length; m++) {
        if (this.FraudTransresData[i].paymentSystem.lowLong == this.PaymentSystemsList[m].guid.lowLong) {
          this.FraudTransresData[i].paymentSystem = this.PaymentSystemsList[m].value
        }
      }
      for (let m = 0; m < this.UserTypeList.length; m++) {
        if (this.FraudTransresData[i].user.type.lowLong == this.UserTypeList[m].guid.lowLong) {
          this.FraudTransresData[i].user.type = this.UserTypeList[m].value
        }
      }

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
    XLSX.writeFile(wb, 'FraudTranscationsExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "FraudTranscationsExcelSheet")
  }
  PlayerPopup(data: any) {
    console.log(data)
    this.FraudPlayerData = this.FraudTransresData[data];
    console.log(this.FraudPlayerData)
    this.FraudTransresDataPopUp = true;
  }

  closepopup() {
    this.FraudTransresDataPopUp = false;
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
}
