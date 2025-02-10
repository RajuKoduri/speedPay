import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as moment from 'moment';
import { NumberFormatPipe } from 'src/app/pipe/number-format.pipe';
import { TotalSumsService } from 'src/app/source/total-sums.service';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
@Component({
  selector: 'app-currencyexchanges',
  templateUrl: './currencyexchanges.component.html',
  styleUrls: ['./currencyexchanges.component.css'],
  providers: [NumberFormatPipe]
})
export class CurrencyexchangesComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  loader: boolean = false;
  walletlist: any = [];
  CurrencyExchangData: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  CurrncyExchangeWalletList: any;
  CurrencyExchangPocketTypeList: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  usertypeList: any;
  walletFormatslist: any;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

  WalletSettings: any = {}
  walletlistsCopy: any = [];
  MoneyTypeSettings: any = {}
  ExchangPocketTypeCopy: any;
  location: any;
  playerExplorer: boolean = false;
  PlayerguidList: any;
  sourceTotalSum: any;
  targetTotalSum: any;
  agentExplorer: boolean = false;
  agentInfo: any;
  agentGuid: any;
  popupview: boolean = false;
  selectedRowData: any;


  constructor(private Cashierservice: CashierService, private FileformatServiceService: FileformatServiceService, private sumService:TotalSumsService,
    private DateTimePipe: DateTimePipe, private numberFormatPipe: NumberFormatPipe, private agentControlService: AgentControlService, 
    private PlayerserviceService:PlayerServiceService, private AgentcontrolService: AgentControlService) {
    this.filterForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      currency: new FormControl(),
      WalletType: new FormControl(),
      UserLogin: new FormControl(),
      MoneyType: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }

  ngOnInit(): void {
    this.walletlistmethod();
    this.CurrncyExchangeWallet();
    this.CurrencyExchangPocketType();
    this.usertype();
    this.getDates();
    this.playerExplorerCheck()
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/currencyexchanges") {
      this.playerExplorer = true;
      this.PlayerGuid();
    }else if (this.location == "/Agentexplorer/currencyexchanges") {
      this.playerExplorer = false;
      this.agentExplorer = true;
      this.AgentInfo()
    } else {
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

  AgentInfo() {
    let AgentInfo = sessionStorage.getItem("AgentInfo")
    if (AgentInfo) {
      this.agentInfo = JSON.parse(AgentInfo)
      if (this.agentInfo.agent) {
        this.agentGuid = this.agentInfo.agent.guid
      } else if (this.agentInfo.user) {
        this.agentGuid = this.agentInfo.user.guid
      }
    }
    console.log(this.agentGuid)
  }
  getDates() {
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());

    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  walletlistmethod() {
    // const wallets = localStorage.getItem('walletlist');
    // if (wallets) {
    //   this.walletlist = JSON.parse(wallets);
    // }
    // console.log(this.walletlist)
    this.walletFormats();
    this.walletTypes();
  }
  walletTypes() {
    const walletTypes = localStorage.getItem("walletTypes")
    let walletFormatsList: any
    if (walletTypes) {
      walletFormatsList = JSON.parse(walletTypes)
      for (let i = 0; i < walletFormatsList.length; i++) {
        if (walletFormatsList[i].clubGameWallet == true) {
          if (walletFormatsList[i].description !== "Play Money") {
            this.walletlist.push({ description: walletFormatsList[i].description, guid: walletFormatsList[i].guid })
          }
        }
      }
    }
    console.log(walletFormatsList)
    console.log("walletlists", this.walletlist)

    this.walletlistsCopy = [...this.walletlist]
    let walletGuidsCopy = this.walletlist.map((wallet: any) => {
      return { guid: wallet.guid }
    })
    console.log(walletGuidsCopy)

    this.WalletSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    }

  }
  walletFormats() {
    let walletFormats = localStorage.getItem('walletFormats');
    if (walletFormats) {
      this.walletFormatslist = JSON.parse(walletFormats);
    }
    console.log(this.walletFormatslist)
  }
  CurrncyExchangeWallet() {
    const CurrncyExchangeWallet = localStorage.getItem("CurrncyExchangeWallet");
    if (CurrncyExchangeWallet) {
      this.CurrncyExchangeWalletList = JSON.parse(CurrncyExchangeWallet);
    }
    console.log(this.CurrncyExchangeWalletList)
    let walletpatchValue = this.CurrncyExchangeWalletList[0];
    this.filterForm.patchValue({
      WalletType: walletpatchValue.guid,
    });
  }
  CurrencyExchangPocketType() {
    const CurrencyExchangPocketType = localStorage.getItem("CurrencyExchangPocketType");
    if (CurrencyExchangPocketType) {
      this.CurrencyExchangPocketTypeList = JSON.parse(CurrencyExchangPocketType);
    }
    console.log(this.CurrencyExchangPocketTypeList)
    this.ExchangPocketTypeCopy = this.CurrencyExchangPocketTypeList.map((data: any) => {
      let { guid, value, ...rest } = data
      // return data.guid, data.value
      return { guid, value };
    })

    this.MoneyTypeSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    }
    console.log(this.ExchangPocketTypeCopy)
  }
  usertype() {
    const usertype = localStorage.getItem("usertype");
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log(this.usertypeList)
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
    this.CurrencyExchangData = false;
    this.FillterMenu = false;
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    let walletGuids = this.walletlistsCopy.map((walletList: any) => {
      return walletList.guid
    })
    let moneyTypeGuids = this.ExchangPocketTypeCopy.map((moneyType: any) => {
      return moneyType.guid
    })

    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = (this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;

    fillterbody["wallets"] = walletGuids.length > 0 ? walletGuids : undefined;
    fillterbody["userLogin"] = this.filterForm.value.UserLogin != undefined ? this.filterForm.value.UserLogin : undefined;
    fillterbody["walletsFilterType"] = this.filterForm.value.WalletType != undefined ? this.filterForm.value.WalletType : undefined;
    fillterbody["pocketType"] = moneyTypeGuids.length > 0 ? moneyTypeGuids : undefined;
    if (this.playerExplorer) {
      fillterbody["idList"] = [this.PlayerguidList]
      this.Cashierservice.getPlayerCurrencyExchanges(fillterbody).subscribe((res) => this.CurrencyExchangResData(res))
    } else if(this.agentExplorer){
      fillterbody["idList"] = [this.agentGuid]
      // this.Cashierservice.getCurrencyExchanges(fillterbody).subscribe((res) => this.CurrencyExchangResData(res))
      this.agentControlService.getAgentCurrencyExchanges(fillterbody).subscribe((res)=>this.CurrencyExchangResData(res))
    }
    else {
      this.Cashierservice.getCurrencyExchanges(fillterbody).subscribe((res) => this.CurrencyExchangResData(res))
    }
  }

  CurrencyExchangResData(data: any) {
    console.log(data);
    this.loader = false;
    this.CurrencyExchangData = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.CurrencyExchangData != null) {
      this.loader = false;
    }
    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.sumAmounts(this.CurrencyExchangData);
  }

  viewdata(data: any, index: any) {
    this.popupview = true
    console.log(data)
    console.log(index)
    this.selectedRowData = data

  }

  closepop() {
    this.popupview = false;
  }

  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    return (c)
  }

  sumAmounts(data:any) {
    this.sourceTotalSum = this.sumService.calculateSum(data, 'sourceAmount')
    this.targetTotalSum = this.sumService.calculateSum(data, 'targetAmount')
  
    console.log('Source Amount Totals:', this.sourceTotalSum);
    console.log('Target Amount Totals:', this.targetTotalSum);
   
  }

  keys(data:any){
    return Object.keys(data)
  }

  transformDate(date: string): any {
    if (date != undefined) {
      let c = this.DateTimePipe.transforminingDispalyDate(date);
      return (c)

    }
  }

  userTypeName(data: any) {
    if (data != undefined) {
      for (let i = 0; i < this.usertypeList.length; i++) {
        if (this.usertypeList[i].guid.lowLong == data.lowLong && this.usertypeList[i].guid.hiLong == data.hiLong) {
          return this.usertypeList[i].value
        }
      }
    }
  }
  moneyType(data: any) {
    if (data != undefined) {
      var moneyTypename: any
      this.CurrencyExchangPocketTypeList.forEach((moneyType: any) => {
        if (data.lowLong == moneyType.guid.lowLong && data.hiLong == moneyType.guid.hiLong) {
          moneyTypename = moneyType.value;
        }
      })
      console.log(moneyTypename)
      return moneyTypename
    }
  }
  sourcetargetWallet(data: any, symbolType: any): any {
    console.log(data)
    if (data != undefined) {
      var sourceWalletname: any
      var symbol: any
      this.walletFormatslist.forEach((sourceWallet: any) => {
        if (data.wallet.lowLong == sourceWallet.guid.lowLong && data.wallet.hiLong == sourceWallet.guid.hiLong) {
          if (sourceWallet.currencyCode) {
            if (sourceWallet.symbol != undefined) {
              symbol = sourceWallet.symbol;
            } else {
              symbol = ''
            }
            sourceWalletname = sourceWallet.currencyCode;
          }
        }
      })
      // console.log(sourceWalletname)
      if (symbolType == 'symbol') {
        return symbol + ' ' + this.numberFormatPipe.transform(data.value)
      }
      return sourceWalletname
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
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else {
      //   this.filterForm.patchValue({
      //     firstRecord: (Math.floor((this.ResultCount - 1) / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) + 1
      // });
      this.filterForm.patchValue({
        firstRecord: Math.floor((this.ResultCount - 1) / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });
    }

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // if (this.PageCount > this.CurrencyExchangData.length) {
    //   this.pagecontrolbtn = true;
    // }

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
    if (this.PageCount > this.CurrencyExchangData.length) {
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
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'CurrencyExchangesExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "CurrencyExchanges");
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
  timechnage(data: any) {
    console.log(data.target.value)
  }

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }

  AgentExplore(name: any, guid: any, agentInfo: any) {

    this.AgentcontrolService.agentExplore(name, guid, agentInfo)
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@ -----Wallet DropDowm------@@@@@@@@@@@@@@@@@@@@@@@@@

  onSelectCurrency(data: any) {
    // console.log(data)
    console.log(this.walletlistsCopy)

  }
  onDeSelectCurrency(data: any) {
    // console.log(data)
    // if(this.walletlistsCopy.length ==0){
    //   this.walletlistsCopy=this.walletlists
    // }
    console.log(this.walletlistsCopy)

  }
  onSelectAllCurrency(data: any) {
    // console.log(data)
    // this.walletlistsCopy=[...this.walletlists];
    this.walletlistsCopy = [...data];
    console.log(this.walletlistsCopy)

  }
  onDeSelectAllCurrency(data: any) {
    // console.log(data)
    // this.walletlistsCopy=[...this.walletlists]
    console.log(this.walletlistsCopy)
  }
}
