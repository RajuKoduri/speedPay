import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComppointsService } from 'src/app/source/comppoints.service';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment'
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { TotalSumsService } from 'src/app/source/total-sums.service';

@Component({
  selector: 'app-playercomppointsexchange',
  templateUrl: './playercomppointsexchange.component.html',
  styleUrls: ['./playercomppointsexchange.component.css']
})
export class PlayercomppointsexchangeComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  showPro: boolean = false;
  Proshow: boolean = false;
  Proshowtype: boolean = false;
  FillterMenu: boolean = false;
  walletlist: any;
  walletlists: any = [];
  playerCompPointsData: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  loader: boolean = false;
  CurrencyExchangTypeList: any;
  playerCompPointsDatapopup: boolean = false;
  playerCompPointsdetails: any;
  PageCount: any;
  pagecontrolbtn: boolean = false;

  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false
  playerlevelChangeStatusList: any;
  PlayerLevelsNamesList: any;

  dropdownSettingscurrency = {}
  currencyarray: any = []
  selectedcurrency: any = [];
  currencystatus: any;
  selectedFillterGames: any;
  gamesTobeSelected: any;
  currency: any = []

  deselestarry: any = []
  UsetypeGuid: any = [];
  copyUsetypeGuid: any = [];
  selectedTYpeS: any = [];
  dropdownsEttingsType = {}
  showError: any;
  location: any;
  playerExplorer: boolean=false;Amount: any;
  compPoints: any;
;
  PlayerguidList: any;

  constructor(private comppointsService: ComppointsService, private FileformatServiceService: FileformatServiceService,
    private GamesofpokerService: GamesofpokerService,private DateTimePipe:DateTimePipe,private PlayerserviceService:PlayerServiceService,private TotalSumsService:TotalSumsService) {
    this.filterForm = new FormGroup({
      // DateStart: new FormControl(),
      // DateEnd: new FormControl(),
      Type: new FormControl(),
      currency: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),

      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }

  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
  }

  ngOnInit(): void {
    // this.walletlistmethod();

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    this.playerlevelChangeStatus();
    this.getPlayerLevelsNames();

    console.log('jdbjsbsjbhs')

    this.walletFormats();
    this.CurrencyExchangType();
    this.walletType();
    this.playerExplorerCheck()
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/playercomppointsexchange") {
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
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  filterlevel() {
    this.showPro = !this.showPro
  }
  show() {
    this.Proshow = !this.Proshow
  }
  showtype() {
    this.Proshowtype = !this.Proshowtype
  }
  playerlevelChangeStatus() {
    const playerlevelChangeStatus = localStorage.getItem('playerlevelChangeStatus');
    if (playerlevelChangeStatus) {
      this.playerlevelChangeStatusList = JSON.parse(playerlevelChangeStatus)
    }
    console.log("playerlevelChangeStatusList", this.playerlevelChangeStatusList)
  }
  getPlayerLevelsNames() {
    const getPlayerLevelsNames = localStorage.getItem('getPlayerLevelsNames');
    if (getPlayerLevelsNames) {
      this.PlayerLevelsNamesList = JSON.parse(getPlayerLevelsNames)
    }
    console.log(this.PlayerLevelsNamesList.compPointsLevels)
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
  walletFormats() {
    const walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      this.walletlist = JSON.parse(walletTypes)
      for (let i = 0; i < this.walletlist.length; i++) {
        // if (this.walletlist[i].description == "U.S. Dollars" || this.walletlist[i].description == "Chips") {
        if (this.walletlist[i].clubGameWallet == true) {
          if (this.walletlist[i].description !== "Play Money") {
            this.walletlists.push(this.walletlist[i])
          }
        }
      }
    }
    console.log(this.walletlist)
    console.log(this.walletlists)
  }


  walletType() {
    this.currencyarray = []

    this.walletlists = this.GamesofpokerService.walletTypes();
    console.log(this.walletlists)

    for (let i = 0; i < this.walletlists.length; i++) {
      this.selectedcurrency[i] = {
        description: this.walletlists[i].description,
        guid: this.walletlists[i].guid
      }
    }
    console.log(this.selectedcurrency)
    this.selectedcurrency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    this.deselestarry = this.currencyarray
    this.currencystatus = this.walletlists;
    console.log(this.currencystatus);

    this.selectedcurrency = this.currencystatus;
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
  CurrencyExchangType() {
    const CurrencyExchangType = localStorage.getItem('CurrencyExchangPocketType');
    if (CurrencyExchangType) {
      this.CurrencyExchangTypeList = JSON.parse(CurrencyExchangType)
      console.log("CurrencyExchangTypeList", this.CurrencyExchangTypeList)

      for (let i = 0; i < this.CurrencyExchangTypeList.length; i++) {
        this.selectedTYpeS[i] = {
          value: this.CurrencyExchangTypeList[i].value,
          guid: this.CurrencyExchangTypeList[i].guid
        }
      }
      console.log(this.selectedTYpeS)
      this.selectedTYpeS.forEach((item: { guid: any; }) => {
        this.UsetypeGuid.push(item.guid)
      })
      this.copyUsetypeGuid = this.UsetypeGuid
      console.log(this.UsetypeGuid)

      this.dropdownsEttingsType = {
        singleSelection: false,
        idField: 'guid',
        textField: 'value',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      }

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
    this.FillterMenu = false;
    this.loader = true;
    this.playerCompPointsData = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    fillterbody["firstRecord"] = (this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    // fillterbody["types"] = this.UsetypeGuid
    // fillterbody["types"] = this.filterForm.value.Type != null ? [this.filterForm.value.Type] : undefined
    // fillterbody["wallets"] = this.filterForm.value.currency != null ? [this.filterForm.value.currency] : undefined
    fillterbody["wallets"] = this.currencyarray != null ? this.currencyarray : undefined
    // this.playerstatusaaray != null ?this.playerstatusaaray : undefined;
    // fillterbody["reportPeriod"] = this.filterForm.value.DateStart != null ? { "start": this.filterForm.value.DateStart, "end": this.filterForm.value.DateEnd } : undefined
    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;

    fillterbody ["idList"]= this.playerExplorer ? [this.PlayerguidList] : undefined;

    this.comppointsService.getCompPointsExchanges(fillterbody).subscribe((res) => { this.PlayerComPointsResData(res) })
  }
  PlayerComPointsResData(data: any) {
    this.loader = false;
    console.log(data)
   
    if (data) {
      this.ResultCount = data?.resultCount
      this.resultcount = false;
      if (data.objectList) {
        this.playerCompPointsData = data.objectList;
        this.ResultCount = data?.resultCount
        this.rowsOnthePage = data.objectList.length;
        if (this.ResultCount !== null) {
          this.resultcount = false;
        }

        for (let i = 0; i < this.playerCompPointsData.length; i++) {
          for (let j = 0; j < this.CurrencyExchangTypeList.length; j++) {
            if (this.playerCompPointsData[i].user.type.lowLong == this.CurrencyExchangTypeList[j].guid.lowLong) {
              this.playerCompPointsData[i].user.type = this.CurrencyExchangTypeList[j].value
            }
          }
        }
        if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
          this.pagecontrolbtn = true;
        } else {
          this.pagecontrolbtn = false;
        }

      }
      this.sum( this.playerCompPointsData )
    }
  }
  changeDate(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
  }
  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }
  sum(data: any) {
    // this.CompPointBalance.forEach(data)
    this.Amount = this.TotalSumsService.calculateSum(data, 'compPoints');
    console.log(this.Amount)
    this.compPoints = this.TotalSumsService.calculateSum(data, 'cash');
    console.log(this.compPoints)
  }
  keys(data:any){
    return Object.keys(data)
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
    XLSX.writeFile(wb, 'PlayerCompPointsExchangeExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "PlayerCompPointsExchangeExcelSheet")
  }

  onClick(event: any) {
    console.log(event)
    console.log(this.playerCompPointsData[event])
    this.playerCompPointsdetails = this.playerCompPointsData[event]
    console.log(this.playerCompPointsdetails)
    this.playerCompPointsDatapopup = true;
  }
  closepopup() {
    this.playerCompPointsDatapopup = false;
  }

  // next() {
  //   console.log("......Hhello......")
  //   console.log(this.filterForm.value.firstRecord)
  //   if (this.filterForm.value.firstRecord == 0) {
  //     this.filterForm.patchValue({
  //       firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
  //     })
  //   }
  //   else
  //     this.filterForm.patchValue({
  //       firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord)
  //     })
  //   console.log(this.filterForm.value.firstRecord)
  //   console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

  //   this.onFormSubmit()
  // }
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
    if (this.PageCount > this.playerCompPointsData.length) {

      this.pagecontrolbtn = true
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
    if (this.PageCount > this.playerCompPointsData.length) {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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
  // ****************************currency Dropdown @starts *********************************************
  onItemSelectcurrency(data: any) {
    this.currencyarray = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }

  OnItemDeSelectcurrency(data: any) {
    this.currencyarray = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
    if (this.currencyarray === null || this.currencyarray.length === 0) {
      console.log("Empty");
      this.currencyarray = this.deselestarry
    }

  }
  onSelectAllcurrency(data: any) {
    this.currencyarray = []
    data.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  onDeSelectAllcurrency(data: any) {
    this.currencyarray = []
    this.currencyarray = this.deselestarry
    // data.forEach((item: { guid: any; }) => {
    //   this.playerstatusaaray.push(item.guid);
    // });
    console.log(this.currencyarray)
  }

  // *************************** currency Dropdown @Ends **********************************************

  //  ************************************* @types Dropdown Starts*********************************
  onItemSelectTYpe(data: any) {
    this.UsetypeGuid = []
    this.filterForm.value.Type.forEach((item: { guid: any; }) => {
      this.UsetypeGuid.push(item.guid);
    });
    console.log(this.UsetypeGuid)
  }
  OnItemDeSelectTYpe(data: any) {
    this.UsetypeGuid = []
    this.filterForm.value.Type.forEach((item: { guid: any; }) => {
      this.UsetypeGuid.push(item.guid);
    });
    console.log(this.UsetypeGuid)
    if (this.UsetypeGuid === null || this.UsetypeGuid.length === 0) {
      console.log("Empty");
      this.UsetypeGuid = this.copyUsetypeGuid
    }
  }
  onSelectAllTYpe(data: any) {
    this.UsetypeGuid = []
    data.forEach((item: { guid: any; }) => {
      this.UsetypeGuid.push(item.guid);
    });
    console.log(this.UsetypeGuid)
  }
  onDeSelectAllTYpe(data: any) {
    this.UsetypeGuid = []
    this.UsetypeGuid = this.copyUsetypeGuid
    console.log(this.UsetypeGuid)
  }
  //  ************************************* @types Dropdown ends****""""""""""""""""

}




