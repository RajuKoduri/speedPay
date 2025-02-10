import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import * as moment from 'moment';
// import { RemotesystemService } from 'src/app/source/remotesystem.service';
import { RemoteSystemsService } from 'src/app/source/RemoteSystems.service';
import { ComppointsService } from 'src/app/source/comppoints.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as XLSX from 'xlsx';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';


@Component({
  selector: 'app-remotegamesessions',
  templateUrl: './remotegamesessions.component.html',
  styleUrls: ['./remotegamesessions.component.css']
})
export class RemotegamesessionsComponent implements OnInit {
  select: any = [];
  filterForm: FormGroup;
  FillterList: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 10;
  tablePrint: any;
  dataPrint: any;
  walletstypes: any;
  selectedValues = '';
  wallettypelist: any = [];
  statusList: any = [];
  currencys: any = [];
  remoteList: any;
  dataLoader: boolean = false;
  gameName: any;
  gameNameList: any = [];
  sessionStatuses: any;
  walletFormats: any;
  sessionStatusList: any = [];
  walletFormatsList: any = [];
  gameList: any = [];
  //
  products = [];
  countryCode: any;
  currencySymbol: any;
  actionList: any = null;
  hideme: boolean = false;
  Index: any;
  countryId: any;
  country: any;
  openRow: any;
  priceToDisplay = [];
  value: any;
  SUM: any;
  obj: any;
  initialBalanceValue: any;
  buyInValue: any;
  bonusBuyInValue: any;
  betValue: any;
  bonusBetValue: any;
  winValue: any;
  payoutValue: any;
  houseRevenueValue: any;
  compPointsValue: any;
  indexValue: any;
  MyDispaly: any;
  errormsg: any;
  RemoteGameSessionStatusList: any;
  GamesConfigList: any;
  PlayersPopup: boolean = false;
  PopupData: any;
  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false

  selectedFillterGames: any;
  gamesTobeSelected: any = "All";
  selectedcurrency: any = [];
  currencyarray: any = [];
  currencystatus: any = [];
  dropdownSettingscurrency: any;
  walletlists: any = [];
  PageCount: any;
  pagecontrolbtn: boolean = false
  FirstrecordFillter: any = 0;
  Filtergamesbtn: boolean = false;
  GamesAllProvider: any = [];
  pokerGamesCheckbox: boolean[] = [];
  providerGamesCheckbox: boolean[] = []
  providerGamescheckedList: boolean[][] = []
  checkedList: boolean[][] = [];
  selectedGames: any = [];
  selectdGameGuid: any = []
  location: any;
  playerGUID: any;
  deselestarry: any = [];
  playerExporer: boolean = false;

  activeIndex: number | null = null;
  copyguids: any = [];

  selectsessionList: any = [];
  GameSessionGuids: any = [];
  copyGameSessionGuids: any = [];
  dropdownSettingsSession = {};
  allRemoteGamesCheckbox: boolean = true;
  dropdownSettingsProviders: any = {}
  selectedProviders: any = []
  providersArray: any = []
  Providergamesbtn: boolean = false
  remoteGamesData: any

  constructor(private DateTimePipe: DateTimePipe, private remotesystemservice: RemoteSystemsService, private comppointsService: ComppointsService, private PlayerserviceService:PlayerServiceService,
    private FileformatServiceService: FileformatServiceService, private GamesofpokerService: GamesofpokerService, private activatedRoute: ActivatedRoute) {
    this.filterForm = new FormGroup({
      // startdateFrom: new FormControl(),
      // startdateTo: new FormControl(),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      enddate: new FormControl(),
      currency: new FormControl(),
      providers: new FormControl(),
      gamelist: new FormControl(),
      playerNickname: new FormControl(),
      sessionStatus: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.data != null) {
        this.remoteGamesData = JSON.parse(params.data)
      }
      console.log(this.remoteGamesData) 
    })


    // this.location = window.location.pathname
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);

    if (this.location == "/playerexplorer/remotegamesessions") {
      this.playerExporer = true
      this.PlayerGuid()

      //  this.NickNameFilter = false
    } else {
      // this.NickNameFilter = true;
      this.playerExporer = false
    }


    // ngOnInit(): void {
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 1);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');



    // }

    this.walletTypes();
    this.gameNames();
    // this.sessionStatus();
    this.walletFormat();
    this.RemoteGameSessionStatus();
    this.GamesConfig();
    // this.walletFormats = localStorage.getItem('walletFormats')
    // this.walletFormatsList = JSON.parse(this.walletFormats)
    // console.log(this.walletFormatsList) 
    this.countryId = 0;
    this.getProducts(this.countryId);
    this.hideme = true;

    if (this.remoteGamesData) {
      this.games()
      this.onRequery()
    }

  }

  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
  }
  getProducts(countryId: 0) {
    // let body = {};  
    // this.remotesystemservice.RemoteGameSessionsData(body).subscribe((res) => {this.getRemoteData(res)})  
  }
  ignoreContext() {
    this.remoteList = [];
    this.dataLoader = false;
  }
  fillterMenu() {
    this.FillterList = !this.FillterList;
  }
  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn

  };
  providergamesbtn() {
    this.Providergamesbtn = !this.Providergamesbtn

  }
  // walletTypes() {
  //   const walletstypes = localStorage.getItem('walletlist');
  //   if (walletstypes) {
  //     this.wallettypelist = JSON.parse(walletstypes);
  //     console.log("wallettypelist", this.wallettypelist)

  //     for (let i = 0; i < this.wallettypelist.length; i++) {
  //       this.currencys.push(this.wallettypelist[i])
  //     }
  //     console.log(this.currencys)
  //   }
  // }

  walletTypes() {
    const walletTypes = localStorage.getItem("walletTypes");
    if (walletTypes) {
      this.wallettypelist = JSON.parse(walletTypes)
    }
    for (let i = 0; i < this.wallettypelist.length; i++) {
      if (this.wallettypelist[i].clubGameWallet == true) {
        if (this.wallettypelist[i].description !== "Play Money") {
          this.walletlists.push(this.wallettypelist[i])
        }
      }
    }

    for (let i = 0; i < this.walletlists.length; i++) {
      if (this.remoteGamesData != null) {
        // console.log(this.remoteGamesData.betSum.wallet.lowLong )
        // console.log( this.walletlists[i].guid.lowLong)
        // console.log(this.remoteGamesData.betSum.wallet.lowLong == this.walletlists[i].guid.lowLong)
        if (this.remoteGamesData.betSum.wallet.lowLong == this.walletlists[i].guid.lowLong) {
          console.log(this.walletlists[i])
          this.selectedcurrency[0] = {
            description: this.walletlists[i].description,
            guid: this.walletlists[i].guid
          }
          break;
        }
      }
      else {
   
        this.selectedcurrency[i] = {
          description: this.walletlists[i].description,
          guid: this.walletlists[i].guid
        }
      }
    }
    console.log(this.selectedcurrency)
    this.selectedcurrency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    this.deselestarry = this.currencyarray
    this.currencystatus = this.walletlists;
    console.log(this.currencystatus);
    // this.selectedcurrency = this.currencystatus;
    this.dropdownSettingscurrency = {
      singleSelection: false,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
      // };
    }
    console.log("walletlists", this.wallettypelist)
    console.log("currencys", this.currencys)
  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem('Playerguid')
    console.log(Playerguid)
    if (Playerguid) {
      this.playerGUID = JSON.parse(Playerguid);
      console.log(this.playerGUID)
    }
  }
  GamesConfig() {
    const gamesConfig = localStorage.getItem("GamesConfig");
    if (gamesConfig) {
      this.GamesConfigList = JSON.parse(gamesConfig);
    }
    this.GamesAllProvider = this.GamesConfigList.remoteSystemGames;
    console.log("GamesAllProvider", this.GamesAllProvider)
    this.pokerGamesCheckbox = Array(this.GamesAllProvider.length).fill(true);

    this.providerGamesCheckbox = Array(this.GamesAllProvider.length).fill(true);

    this.checkedList = this.GamesAllProvider.map((provider: any) => Array(provider.games.length).fill(true));
    console.log(this.checkedList)


    this.GamesAllProvider.forEach((provider: any) => {
      provider.games.sort((a: any, b: any) => {
        if (a.caption > b.caption) {
          return 1
        }
        if (a.caption < b.caption) {
          return -1
        }
        return 0
      })
    })

    console.log(this.GamesAllProvider)



    // this.updateSelectedGames();

    this.ProviderMultidropdown();
    this.updateRemoteGames()
  }

  ProviderMultidropdown() {
    this.GamesAllProvider.sort((a: any, b: any) => {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0
    })
    this.selectedProviders = [...this.GamesAllProvider]


    this.providersArray = [...this.GamesAllProvider]



    this.dropdownSettingsProviders = {
      singleSelection: false,
      idField: 'games',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
    console.log(this.selectedProviders)
    this.providerGamescheckedboxes()
  }



  toggleAccordian(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null
    }
    else {
      this.activeIndex = index
    }
  }



  // private updateProviderCheckbox(providerIndex: number): void {
  //   const allGamesSelected = this.checkedList[providerIndex].every(game => game);
  //   console.log(allGamesSelected)
  //   this.pokerGamesCheckbox[providerIndex] = allGamesSelected;
  //   this.providerGamesCheckbox[providerIndex] = allGamesSelected
  //   this.allRemoteGamesCheckbox = allGamesSelected
  // }

  // clickonCheckboxIndivisualGames(event: any, providerIndex: number, gameIndex: number, name: any) {
  //   this.checkedList[providerIndex][gameIndex] = event.target.checked;
  //   this.updateProviderCheckbox(providerIndex);
  //   this.updateSelectedGames();
  //   console.log(this.checkedList);
  //   this.selectedGameStrings(event.target.checked)

  // }

  // clickonCheckboxForAllGames(event: any, providerIndex: number) {
  //   const isChecked = event.target.checked;
  //   this.pokerGamesCheckbox[providerIndex] = isChecked;
  //   this.providerGamesCheckbox[providerIndex] = isChecked;
  //   this.checkedList[providerIndex] = this.checkedList[providerIndex].map(() => isChecked);
  //   this.updateProviderCheckbox(providerIndex);
  //   this.updateSelectedGames();
  //   console.log(this.checkedList);
  //   this.selectedGameStrings(event.target.checked)
  // }

  // clickonCheckboxForAllRemoteGames(event: any) {
  //   let isChecked = event.target.checked
  //   this.pokerGamesCheckbox = this.pokerGamesCheckbox.map(() => isChecked)
  //   this.providerGamesCheckbox = this.providerGamesCheckbox.map(() => isChecked)
  //   this.checkedList = this.checkedList.map((mainList: any) =>
  //     mainList.map(() => isChecked)
  //   )
  // }

  selectedGameStrings(event: any) {

    // if (event == false) {
    //   for (let i = 0; i < this.GamesAllProvider.length; i++) {
    //     for (let j = 0; j < this.GamesAllProvider[i].games.length; j++) {
    //       if (this.checkedList[i][j] != false) {
    //         this.gamesTobeSelected += this.GamesAllProvider[i]?.games[j]?.caption;
    //         break;
    //       }
    //     }
    //   }
    // } else {
    //   this.gamesTobeSelected = "ALL"
    // };

  }



  // private updateSelectedGames(): void {
  //   this.selectedGames = [];
  //   let gamesTobeSelectedDummy: any[] = []
  //   this.GamesAllProvider.forEach((provider: any, providerIndex: any) => {
  //     provider.games.forEach((game: any, gameIndex: any) => {
  //       if (this.checkedList[providerIndex][gameIndex]) {
  //         for (let i = 0; i < this.currencyarray.length; i++) {
  //           if (this.currencyarray[i].lowLong == game.wallet.lowLong && this.currencyarray[i].hiLong == game.wallet.hiLong) {
  //             this.selectedGames.push(game.guid);
  //             if (this.copyguids.length == 0) {
  //               this.copyguids = this.selectedGames
  //             }

  //             if (this.checkedList[providerIndex][gameIndex] != false) {
  //               gamesTobeSelectedDummy.push(this.GamesAllProvider[providerIndex]?.games[gameIndex]?.caption)
  //             }
  //             else {
  //               gamesTobeSelectedDummy = gamesTobeSelectedDummy.filter((cap) =>
  //                 cap !== this.GamesAllProvider[providerIndex]?.games[gameIndex]?.caption)
  //             };
  //           }
  //         }

  //       }
  //     });
  //   });
  //   this.selectedCheckbox(gamesTobeSelectedDummy)
  //   console.log(this.selectedGames)
  //   console.log(gamesTobeSelectedDummy)

  //   console.log(this.copyguids)

  //   if (this.selectedGames.length === 0) {
  //     this.selectedGames = this.copyguids
  //   }
  // }
  gameNames() {
    this.gameName = localStorage.getItem('DYIDGAMENAMES')
    this.gameNameList = JSON.parse(this.gameName)
    console.log(this.gameNameList)
    if (this.gameNameList) {

      for (let i = 0; i < this.gameNameList.length; i++) {
        this.gameList.push(this.gameNameList[i])
      }
    }
    console.log("GamesList", this.gameList)
  }
  RemoteGameSessionStatus() {
    const RemoteGameSessionStatus = localStorage.getItem('RemoteGameSessionStatus');
    if (RemoteGameSessionStatus) {
      this.RemoteGameSessionStatusList = JSON.parse(RemoteGameSessionStatus)
      console.log("RemoteGameSessionStatusList", this.RemoteGameSessionStatusList)

      for (let i = 0; i < this.RemoteGameSessionStatusList.length; i++) {
        this.selectsessionList[i] = {
          value: this.RemoteGameSessionStatusList[i].value,
          guid: this.RemoteGameSessionStatusList[i].guid
        }
      }
      console.log(this.selectsessionList)
      this.selectsessionList.forEach((item: { guid: any; }) => {
        this.GameSessionGuids.push(item.guid)
      });
      this.copyGameSessionGuids = this.GameSessionGuids
      console.log(this.GameSessionGuids)

      this.dropdownSettingsSession = {
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
  // RemoteGameSessionStatus() {
  //   const RemoteGameSessionStatus = localStorage.getItem('RemoteGameSessionStatus');
  //   if (RemoteGameSessionStatus) {
  //     this.RemoteGameSessionStatusList = JSON.parse(RemoteGameSessionStatus)
  //   }
  //   console.log("RemoteGameSessionStatusList", this.RemoteGameSessionStatusList)
  // }

  walletFormat() {
    this.walletFormats = localStorage.getItem('walletFormats')
    this.walletFormatsList = JSON.parse(this.walletFormats)
    console.log("walletFormatsList", this.walletFormatsList)
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
  onRequery() {
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    this.dataLoader = true;
    this.remoteList = false;
    let fillterbody = this.getValues(this.filterForm);
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    // fillterbody["startDate"] = this.filterForm.value.startdateFrom != null ? { "start": this.filterForm.value.startdateFrom, "end": this.filterForm.value.startdateTo } : undefined;
    fillterbody["startDate"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate != "") ?
      { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
      (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;
    // fillterbody["wallet"] = this.filterForm.value.currency != null ? [this.filterForm.value.currency] : undefined;
    fillterbody["gameGuids"] = this.filterForm.value.game != null ? [this.filterForm.value.game] : undefined;
    fillterbody["playerNickname"] = this.filterForm.value.playerNickname != null ? this.filterForm.value.playerNickname : undefined;
    fillterbody["statuses"] = this.GameSessionGuids;
    // fillterbody["statuses"] = this.filterForm.value.sessionStatus != null ? [this.filterForm.value.sessionStatus] : undefined;
    fillterbody["gameGuids"] = this.selectdGameGuid;
    if (this.location == "/playerexplorer/remotegamesessions") {
      fillterbody['playerGuids'] = [this.playerGUID]

    }
    this.remotesystemservice.RemoteGameSessionsData(fillterbody).subscribe((res) => { this.getRemoteData(res) },
      error => (this.errormsg = error.name)
    )


  }

  showActionList(index: any, data: any) {
    console.log("data", data)
    this.indexValue = index
    console.log("index", index)
    this.actionList = null;
    let body = {
      "firstRecord": 0,
      "maxCountRecord": 100,
      "rgsId": data
    }
    this.remotesystemservice.subActionList(body).subscribe((res: any) => {
      this.actionList = res.objectList
      console.log(this.actionList)
    })
    console.log(index)
    this.openRow = index;
    this.hideme = !this.hideme;
    this.Index = index;
  }
  hideActionList() {
    this.MyDispaly = (<HTMLInputElement>document.getElementById("myid_" + this.indexValue));
    // this.MyDispaly.style.display = 'block';
    if (this.indexValue == this.openRow) {
      this.hideme = true
    } else {
      this.hideme = false
    }
    // this.hideme = !this.hideme;  
    this.openRow = null;
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
  getRemoteData(data: any) {
    this.dataLoader = false;
    console.log(data)
    this.remoteList = data.objectList;
    console.log("remotelist", this.remoteList)
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.remoteList != null || this.remoteList.resultCount == 0 || this.errormsg == "HttpErrorResponse") {
      this.dataLoader = false;
    }
    this.findsum(this.remoteList)

    for (let i = 0; i < this.remoteList.length; i++) {
      for (let k = 0; k < this.RemoteGameSessionStatusList.length; k++) {
        if (this.remoteList[i].status.lowLong == this.RemoteGameSessionStatusList[k].guid.lowLong) {
          this.remoteList[i].status = this.RemoteGameSessionStatusList[k].value
          // console.log(this.remoteList[i])
        }
      }
      // for (let m = 0; m < this.walletFormatsList.length; m++) {
      //   this.remoteList[i].currency = this.walletFormatsList[m].currencyCode

      // }

      for (let p = 0; p < this.walletFormatsList.length; p++) {
        if (this.remoteList[i].bet.wallet.lowLong == this.walletFormatsList[p].guid.lowLong) {
          if (this.walletFormatsList[p].currencyCode) {
            this.remoteList[i].currency = this.walletFormatsList[p].currencyCode
          }
        }
      }

      let hexadecimalValue = this.remoteList[i].guid.hiLong.toString(16).padStart(16, '0') + this.remoteList[i].guid.lowLong.toString(16).padStart(16, '0');
      // let hexadecimalValue = this.remoteList[i].guid.lowLong.toString(16).toUpperCase().padStart(16, '0') + this.remoteList[i].guid.hiLong.toString(16).toUpperCase().padStart(16, '0');
      console.log(hexadecimalValue)
      this.remoteList[i].hexadecimalValue = hexadecimalValue




      // Hexadecimal value
      var hexValue = "00000000000001220000000000000724";

      // Split the hexadecimal value into two parts
      var firstPartHex = hexValue.slice(0, 16);
      var secondPartHex = hexValue.slice(16);

      // Convert each part from hexadecimal to decimal
      var firstPartDecimal = parseInt(firstPartHex, 16);
      var secondPartDecimal = parseInt(secondPartHex, 16);

      // Output the decimal values of each part
      console.log("First Part (Decimal):", firstPartDecimal);
      console.log("Second Part (Decimal):", secondPartDecimal);





      // for (let p = 0; p < this.walletFormatsList.length; p++) {
      //   if (this.walletFormatsList[p].guid.lowLong == this.remoteList[i].initialBalance.wallet.lowLong) {
      //     this.remoteList[i].initialBalance.value = this.walletFormatsList[p].symbol + this.remoteList[i].initialBalance.value;
      //   }
      //   if (this.walletFormatsList[p].guid.lowLong == this.remoteList[i].buyIn.wallet.lowLong) {
      //     this.remoteList[i].buyIn.value = this.walletFormatsList[p].symbol + this.remoteList[i].buyIn.value;
      //   }
      //   if (this.walletFormatsList[p].guid.lowLong == this.remoteList[i].bonusBuyIn.wallet.lowLong) {
      //     this.remoteList[i].bonusBuyIn.value = this.walletFormatsList[p].symbol + this.remoteList[i].bonusBuyIn.value;
      //   }
      //   if (this.walletFormatsList[p].guid.lowLong == this.remoteList[i].bet.wallet.lowLong) {
      //     this.remoteList[i].bet.value = this.walletFormatsList[p].symbol + this.remoteList[i].bet.value;
      //   }
      //   if (this.walletFormatsList[p].guid.lowLong == this.remoteList[i].bonusBet.wallet.lowLong) {
      //     this.remoteList[i].bonusBet.value = this.walletFormatsList[p].symbol + this.remoteList[i].bonusBet.value;
      //   }
      //   if (this.walletFormatsList[p].guid.lowLong == this.remoteList[i].win.wallet.lowLong) {
      //     this.remoteList[i].win.value = this.walletFormatsList[p].symbol + this.remoteList[i].win.value;
      //   }
      //   if (this.walletFormatsList[p].guid.lowLong == this.remoteList[i].payout.wallet.lowLong) {
      //     this.remoteList[i].payout.value = this.walletFormatsList[p].symbol + this.remoteList[i].payout.value;
      //   }
      //   if (this.walletFormatsList[p].guid.lowLong == this.remoteList[i].houseRevenue.wallet.lowLong) {
      //     this.remoteList[i].houseRevenue.value = this.walletFormatsList[p].symbol + this.remoteList[i].houseRevenue.value;
      //   }
      // }
    }

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }

  }
  PlayerPopup(index: any) {
    console.log(index)
    console.log(this.remoteList[index])
    this.PopupData = this.remoteList[index]
    this.PlayersPopup = true;
  }
  closePopup() {
    this.PlayersPopup = false;
  }
  FormReset() {
    this.filterForm.reset();
  }
  findsum(data: any) {
    this.obj = data
    console.log(this.obj);
    this.initialBalanceValue = this.obj.reduce((a: any, b: { initialBalance: any; }) => (a + b.initialBalance.value), 0);
    console.log(this.initialBalanceValue)
    this.buyInValue = this.obj.reduce((a: any, b: { buyIn: any; }) => (a + b.buyIn.value), 0);
    console.log(this.buyInValue)
    this.bonusBuyInValue = this.obj.reduce((a: any, b: { bonusBuyIn: any; }) => (a + b.bonusBuyIn.value), 0);
    console.log(this.bonusBuyInValue)
    this.betValue = this.obj.reduce((a: any, b: { bet: any; }) => (a + b.bet.value), 0);
    console.log(this.betValue)
    this.bonusBetValue = this.obj.reduce((a: any, b: { bonusBet: any; }) => (a + b.bonusBet.value), 0);
    console.log(this.bonusBetValue)
    this.winValue = this.obj.reduce((a: any, b: { win: any; }) => (a + b.win.value), 0);
    console.log(this.winValue)
    this.payoutValue = this.obj.reduce((a: any, b: { payout: any; }) => (a + b.payout.value), 0);
    console.log(this.payoutValue)
    this.houseRevenueValue = this.obj.reduce((a: any, b: { houseRevenue: any; }) => (a + b.houseRevenue.value), 0);
    console.log(this.houseRevenueValue)
    this.compPointsValue = this.obj.reduce((a: any, b: { compPoints: any; }) => (a + b.compPoints.value), 0);
    console.log(this.compPointsValue)
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'remotegamesessionsExcelSheet.xlsx';
    XLSX.writeFile(wb, 'remotegamesessionsExcelSheet.xlsx');

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
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PokerGameSessionsExcelSheet")
  }



  // *******************************@Satarts currency Dropdown************************************************************

  onItemSelectcurrency(item: any) {
    this.currencyarray = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }

  OnItemDeSelectcurrency(item: any) {
    this.currencyarray = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    if (this.currencyarray === null || this.currencyarray.length === 0) {
      this.currencyarray = this.deselestarry
    }
    console.log(this.currencyarray)
  }
  onSelectAllcurrency(items: any) {
    this.currencyarray = []
    items.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }

  onDeSelectAllcurrency(items: any) {
    this.currencyarray = []
    this.currencyarray = this.deselestarry
    console.log(this.currencyarray)
  }


  // **********************************@Ends currency Dropdown****************************************************************************
  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({ firstRecord: parseInt('1'), });
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

    this.onRequery();
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
  }

  prev() {
    console.log('......Hhello......');
    if (
      this.filterForm.value.firstRecord - 1 ==
      parseInt(this.filterForm.value.maxCountRecord)
    )
      this.filterForm.patchValue({
        // firstRecord:parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)-1
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) -
          parseInt(this.filterForm.value.maxCountRecord),
      });
    else
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) -
          parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1;
    this.pagecontrolbtn = false;
    if (this.PageCount > this.remoteList.length) {
      this.pagecontrolbtn = false;
    }
    this.onRequery();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
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

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onRequery();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  fastforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({ firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord), });
    } else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(
      Math.floor(
        this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1
    );
    this.PageCount =
      Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    console.log(this.PageCount)
    console.log(this.remoteList.length)
    this.pagecontrolbtn = true;
    if (this.PageCount > this.remoteList.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onRequery();

    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );
    this.FirstrecordFillter = this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
  }

  //  ************************************* @GameSession Dropdown Starts*********************************
  onItemSelectSession(data: any) {
    this.GameSessionGuids = []
    this.filterForm.value.sessionStatus.forEach((item: { guid: any; }) => {
      this.GameSessionGuids.push(item.guid);
    });
    console.log(this.GameSessionGuids)
  }
  OnItemDeSelectSession(data: any) {
    this.GameSessionGuids = []
    this.filterForm.value.sessionStatus.forEach((item: { guid: any; }) => {
      this.GameSessionGuids.push(item.guid);
    });
    console.log(this.GameSessionGuids)
    if (this.GameSessionGuids === null || this.GameSessionGuids.length === 0) {
      console.log("Empty");
      this.GameSessionGuids = this.copyGameSessionGuids
    }
  }
  onSelectAllSession(data: any) {
    this.GameSessionGuids = []
    data.forEach((item: { guid: any; }) => {
      this.GameSessionGuids.push(item.guid);
    });
    console.log(this.GameSessionGuids)
  }
  onDeSelectAllSession(data: any) {
    this.GameSessionGuids = []
    this.GameSessionGuids = this.copyGameSessionGuids
    console.log(this.GameSessionGuids)
  }
  //  ************************************* @GameSession Dropdown ends****""""""""""""""""

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Providers dropdown %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  providerGamescheckedboxes() {

    this.providersArray.sort((a: any, b: any) => {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0
    })

    this.providerGamescheckedList = this.providersArray.map((provider: any) => Array(provider.games.length).fill(true))
    this.providerGamesCheckbox = Array(this.GamesAllProvider.length).fill(true);
    console.log(this.providerGamescheckedList)
  }

  onItemSelectProviders(event: any) {
    this.providersArray.push(event)
    console.log(this.providersArray)
    this.providerGamescheckedboxes()
    this.updateRemoteGames()
    }

  OnItemDeSelectProviders(event: any) {
    this.providersArray = this.providersArray.filter((provider: any) => {
      console.log(provider.games.length, event.games.length)
      return provider.name != event.name
    })
    console.log(this.providersArray)
    this.providerGamescheckedboxes()
    this.updateRemoteGames()
  }

  onSelectAllProviders(event: any) {
    this.providersArray = [...event]
    console.log(this.providersArray)
    this.providerGamescheckedboxes()
    this.updateRemoteGames()
  }

  onDeSelectAllProviders(event: any) {
    this.providersArray = [...event]
    this.providerGamescheckedboxes()
    this.updateRemoteGames()
  }

  clickonCheckboxIndivisualGames(event: any, providerIndex: number, gameIndex: number, name: any) {
    this.providerGamescheckedList[providerIndex][gameIndex] = event.target.checked;
    this.updateProviderCheckbox(providerIndex);
    this.updateRemoteGames();
    this.selectedGameStrings(event.target.checked)
  }

  clickonCheckboxForAllGames(event: any, providerIndex: number) {
    const isChecked = event.target.checked;
    this.providerGamesCheckbox[providerIndex] = isChecked;
    this.providerGamescheckedList[providerIndex] = this.providerGamescheckedList[providerIndex].map(() => isChecked);
    this.updateProviderCheckbox(providerIndex);
    this.updateRemoteGames()
    this.selectedGameStrings(event.target.checked)
  }

  private updateProviderCheckbox(providerIndex: number): void {
    const allGamesSelected = this.providerGamescheckedList[providerIndex].every(game => game);
    console.log(allGamesSelected)
    this.providerGamesCheckbox[providerIndex] = allGamesSelected
    this.allRemoteGamesCheckbox = allGamesSelected
  }

  updateRemoteGames() {
    this.selectdGameGuid = [];
    let gamesTobeSelectedDummy: any[] = []
    this.providersArray.forEach((provider: any, providerIndex: number) => {
      provider.games.forEach((game: any, gameIndex: number) => {
        if (this.providerGamescheckedList[providerIndex][gameIndex]) {
          this.currencyarray.forEach((curr: any) => {
            if (curr.lowLong == game.wallet.lowLong && curr.highLong == game.wallet.highLong) {
              this.selectdGameGuid.push(game.guid);
              gamesTobeSelectedDummy.push(this.providersArray[providerIndex]?.games[gameIndex]?.caption)
              if (this.copyguids.length == 0) {
                this.copyguids = this.selectdGameGuid;
              }
            }
          })
        }
      })
    })
    this.selectedCheckbox(gamesTobeSelectedDummy)
    if (this.selectdGameGuid.length === 0) {
      this.selectdGameGuid = this.copyguids
    }
    console.log(this.selectdGameGuid)
  }

  selectedCheckbox(gamesTobeSelectedDummy: any) {
    let ar = this.providerGamesCheckbox.every((bool) => bool === true)
    console.log(this.providerGamesCheckbox,ar)
    if (ar && this.providersArray.length == this.GamesAllProvider.length) {
      this.gamesTobeSelected = "[ALL]"
    } else {
      this.gamesTobeSelected = gamesTobeSelectedDummy
    };
    console.log(gamesTobeSelectedDummy)
  }

  games() {
    let x: any[][] = []
    this.providersArray.forEach((provider: any, providerInd: number) => {
      this.providerGamesCheckbox = Array(this.providersArray.length).fill(false)
      provider.games.forEach((game: any, gameInd: number) => {
        this.providerGamescheckedList = this.providersArray.map((provider: any) => Array(provider.games.length).fill(false));
      })
    })

    for (let i = 0; i < this.providersArray.length; i++) {
      console.log(this.providersArray)
      for (let j = 0; j < this.providersArray[i]?.games.length; j++) {
        if (this.remoteGamesData?.name == this.providersArray[i]?.games[j]?.caption && this.remoteGamesData.guid.lowLong == this.providersArray[i].games[j].guid.lowLong && this.remoteGamesData.guid.hiLong == this.providersArray[i].games[j].guid.hiLong) {
          this.providerGamescheckedList[i][j] = true
        }
      }
    }
    console.log(this.providerGamescheckedList)
    this.updateRemoteGames()
  }

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }
}



