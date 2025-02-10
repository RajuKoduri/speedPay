import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import { EMPTY, filter } from 'rxjs';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';

@Component({
  selector: 'app-playerbonusadjustments',
  templateUrl: './playerbonusadjustments.component.html',
  styleUrls: ['./playerbonusadjustments.component.css']
})
export class PlayerbonusadjustmentsComponent implements OnInit {
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
  bonusList: any;
  walletFormatsList: any;
  walletlists: any = [];
  CashierOperationList: any;
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
  location: any;
  playerExplorer: boolean = false;
  PlayerguidList: any;

  constructor(private CashierService: CashierService, private PlayerserviceService: PlayerServiceService, private DateTimePipe: DateTimePipe, private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      reportingPeriodFrom: new FormControl(),
      reportingPeriodTo: new FormControl(),
      currency: new FormControl(),
      user: new FormControl(),
      initiatorLogin: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.walletTypes();
    this.walletFormats();
    this.CashierOperationType();

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
  }
  fillterMenu() {
    this.FillterList = !this.FillterList;
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/playerbonusadjustments") {
      this.playerExplorer = true;
      this.PlayerGuid();
    } else {
      this.playerExplorer = false;
    }
  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem("Playerguid");
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }
  walletFormats(){
    let walletFormats = localStorage.getItem("walletFormats");
    if(walletFormats){
      this.walletFormatsList=JSON.parse(walletFormats)
    }
    console.log("walletFormats",this.walletFormatsList)
  }
  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips") {
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
  CashierOperationType() {
    const CashierOperationType = localStorage.getItem("CashierOperationType")
    if (CashierOperationType) {
      this.CashierOperationList = JSON.parse(CashierOperationType)
    }
    console.log(this.CashierOperationList)
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'PlayerBonusExeclSheet.xlsx';
    XLSX.writeFile(wb, 'PlayerBonusExeclSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerBonusExeclSheet")
  }

  onFormSubmit() {
    console.log(this.filterForm.value.initiatorLogin)
    this.dataLoader = true;
    this.bonusList = false
    let fillterbody = this.getValues(this.filterForm)
    console.log(fillterbody)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    // fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
    //   "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
    //   "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    // } : undefined
    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;

    // fillterbody["reportPeriod"] = this.filterForm.value.reportingPeriodFrom != null ? {"start":this.filterForm.value.reportingPeriodFrom,"end":this.filterForm.value.reportingPeriodTo} : undefined
    fillterbody["wallets"] = this.currencyGuids;
      // fillterbody["wallets"] = this.filterForm.value.currency != null ?[ this.filterForm.value.currency ]: undefined
      if(this.filterForm.value.initiatorLogin){
        fillterbody["initiatorLoginMask"] = this.filterForm.value.initiatorLogin != null ? this.filterForm.value.initiatorLogin : undefined
      }
      fillterbody["userLoginMask"] = this.filterForm.value.user != null ? this.filterForm.value.user : undefined
    if (this.filterForm.value.maxCountRecord > 1) {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    } else {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord - 1 / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    }
    console.log("PageCount", this.PageCount)

    // this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    if (!this.playerExplorer) {

      this.CashierService.getAccBonusAdjustment(fillterbody).subscribe(data => { this.getPlayerBonuData(data) })
    } else {
      fillterbody["idList"] = [this.PlayerguidList]
      this.CashierService.getPlayerBonusAdjustment(fillterbody).subscribe(data => { this.getPlayerBonuData(data) })

    }
  }

  getPlayerBonuData(data: any) {
    this.bonusList = data.objectList;
    console.log(this.bonusList);
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.bonusList != null || this.bonusList.resultCount == 0) {
      this.dataLoader = false;
    }

    for (let i = 0; i < this.bonusList.length; i++) {
      for (let j = 0; j < this.CashierOperationList.length; j++) {
        if (this.bonusList[i].type.lowLong == this.CashierOperationList[j].guid.lowLong) {
          this.bonusList[i].type = this.CashierOperationList[j].value
        }
      }

      for (let k = 0; k < this.walletFormatsList.length; k++) {
        if (this.walletFormatsList[k].currencyCode) {
          if (this.walletFormatsList[k].symbol) {
            if (this.bonusList[i].decrease?.wallet.lowLong == this.walletFormatsList[k].guid.lowLong) {
              this.bonusList[i].decrease.walletsymbol = this.walletFormatsList[k].symbol
            }
            if (this.bonusList[i].increase?.wallet.lowLong == this.walletFormatsList[k].guid.lowLong) {
              this.bonusList[i].increase.walletsymbol = this.walletFormatsList[k].symbol
            }

          }
        }

      }
      if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
        this.pagecontrolbtn = true;
      } else {
        this.pagecontrolbtn = false;
      }
    }
  }
    changeSelect(date: string) {
      let c = this.DateTimePipe.transforminingDispalyDate(date);
      return (c)
    }
    ignoreContext() {
      this.bonusList = [];
      this.dataLoader = false;
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
      if (this.PageCount > this.bonusList.length) {

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
      if (this.PageCount > this.bonusList.length) {
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

    PlayerExplore(name: any, guid: any, List: any) {
      this.PlayerserviceService.PlayerExplore(name, guid, List)
    }

    // *********************************** @Dropdown currency starts ********************************
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
      console.log(this.currencyGuids)
    }

    // *********************************** @Dropdown currency Ends ********************************

  }
