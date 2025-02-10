import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { LoginService } from 'src/app/source/login.service';
@Component({
  selector: 'app-onlineplayers',
  templateUrl: './onlineplayers.component.html',
  styleUrls: ['./onlineplayers.component.css']
})
export class OnlineplayersComponent implements OnInit {
  fileName = 'OnlinePlayerList.xlsx';
  onlinePlayerList: any;
  minuts: any = [];
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  faceParameterslist: any = [];
  playerStatusList: any = [];
  SessionTypeList: any = [];
  walletlist: any = [];
  GamegConfigList: any;
  ezugiGames: any;
  ezugiGamesList: any = [];
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  loader: boolean = false;
  dropdownList12: any = []
  selectedItems12: any = []
  dropdownSettings = {}
  convertedArray: any = []
  COpyconvertedArray: any[] = []
  selectedItemsStatus: any = []
  playerstatusaaray: any = []
  Copyplayerstatusaaray: any[] = []
  playerstatusdropList: any = []
  dropdownSettingsstatus = {}
  selectedsessiontype: any = []
  dropdownSettingssessiontype = {}
  sessiontypearray: any = []
  copysessiontypearray: any[] = []
  sessiontypestatus: any = []
  selectedcurrency: any = []
  currencystatus: any = []
  dropdownSettingscurrency = {}
  currencyarray: any = []
  dropdownSettingspokergames = {}
  selectedpokergames: any = []
  sessionpokergmarray: any = []
  Filtergamesbtn: boolean = false
  FiltergamebtnRemote: boolean = false;
  FiltergamesbtnCasino: boolean = false
  gamesTobeSelected: any = "All";
  selectedFillterGames: any = []
  checkedList: any = [];
  checkedListCasino: any = [];
  casinoGameCheckbox: boolean = true
  pokerGamesCheckbox: boolean = true
  filterItem: any;
  allGammeNamesWithCurrency: any;
  gamescaption: any = []
  allGammeNames: any = []
  onlyPokerGames: any = []
  uniquegamescaption: any = []
  checkboxesIndivisualGames: any = []
  walletlistcur: any = []
  dropdownList: any = []
  dropDownCheckedList: any = []
  selectedItems: any = []
  walletlists: any = []
  onlycasinoGames: any = []
  casinoGamesname: any = []
  casinoGamescpt: any = []
  Casinofilters: any = [];
  updatedCasinoGameNames: any = []
  dummyCheckedCasinoGames: any = []


  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;
  CasinoAllGames: any;
  allselectedCasinoGames: any

  allcheckedListCasino: any[] = []
  // checkedlistCasino:any[] = []

  dropdownCasinoCheckedList: any[] = []
  selectedFilterCasinoGames: any[] = []

  remoteGamesProvidersList: any = []
  activeIndex: number | null = null;
  providerCheckbox: boolean[] = []
  checkedListRemote: boolean[][] = []
  selectedRemoteGames: any = []
  RemoteGamesTobeselected: any = []
  remoteGamesGuids: any = [];

  RummyGameslist: any = [];
  RummyGamesNames: any = [];
  RummyGamesCaptions: any = [];
  FilterRummygamesbtn: boolean = false
  uniqueRummyGameCap: any = [];
  rummyCheckedList: any = [];
  rummyGamesCheckbox: boolean = true
  selectedRummyUniCap: any = []
  finalSelectedRummyNames: any = []
  InpselectedRummyUniCap: any
  selectedRummyName: any = []
  ErrorPopup: boolean = false;




  constructor(private FileformatServiceService: FileformatServiceService,
    private DateTimePipe: DateTimePipe,
    private PlayerserviceService: PlayerServiceService,
    private CommomfilterService12: CommomfilterService,
    private loginservice:LoginService,
    private GamesofpokerService: GamesofpokerService) {
    this.filterForm = new FormGroup({
      accountMask: new FormControl(),
      nickName: new FormControl(),
      shortid: new FormControl(),
      email: new FormControl(),
      fullName: new FormControl(),
      ipAddress: new FormControl(),
      networkNames: new FormControl(),
      statusesIdList: new FormControl(),
      SessionType: new FormControl(),
      wallet: new FormControl(),
      pokerGame: new FormControl(),
      casinoGame: new FormControl(),
      remoteGame: new FormControl(),
      rummyGame: new FormControl(),
      tableName: new FormControl(),
      tournamentName: new FormControl(),
      permissionsGroup: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
    })
  }
  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
  }
  ngOnInit() {
    // let ws = sessionStorage.getItem('wsession')
    // this.PlayerserviceService.getPlayersOnlineForGames(ws).subscribe((res) => {
    //   this.onlinePlayerList = res.objectList;
    //   console.log( res.objectList)
    //   this.timeSend(res.objectList)
    // }
    // )
    this.faceParameters();
    this.palyerstatus();
    this.Sessiontype();
    this.GamegConfig()
    this.GamesConfig()
    this.walletType()
    this.casinogamefilter()
    // this.selectedCasinoGames()
    // this.rummyInpselectedCheckBox()
    this.updateCheckedRummyGames()

  }

  toggleAccordian(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null
    }
    else {
      this.activeIndex = index
    }
  }


  faceParameters() {
    const faceParameterslist = localStorage.getItem('faceParameters')
    if (faceParameterslist) {
      this.faceParameterslist = JSON.parse(faceParameterslist)
    }
    this.convertedArray = []
    this.COpyconvertedArray = []
    // this.faceParameterslist = this.CommomfilterService.selectallst();
    console.log(this.faceParameterslist);

    this.faceParameterslist.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
      this.COpyconvertedArray.push(item.name);
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

  palyerstatus() {
    this.playerstatusaaray = []
    const playerstatus = localStorage.getItem('palyerstatus');
    if (playerstatus) {
      this.playerStatusList = JSON.parse(playerstatus);
    }
    console.log('playerStatusList', this.playerStatusList);

   
    for (let i = 0; i < this.playerStatusList.length; i++) {
      this.selectedItemsStatus[i] = {
        value: this.playerStatusList[i].value,
        guid: this.playerStatusList[i].guid
      }
    }
    console.log(this.selectedItemsStatus)
    
    this.selectedItemsStatus.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
      this.Copyplayerstatusaaray.push(item.guid);
    });

    this.playerstatusdropList = this.playerStatusList;
    console.log(this.playerstatusdropList);
    this.dropdownSettingsstatus = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectedItemsStatus = this.playerstatusdropList;
  }
  Sessiontype() {
    this.sessiontypearray = []
    const SessionTypes = localStorage.getItem('SessionType')
    if (SessionTypes) {
      this.SessionTypeList = JSON.parse(SessionTypes)
    }
    console.log("SessionType", this.SessionTypeList)

    for (let i = 0; i < this.SessionTypeList.length; i++) {
      this.selectedsessiontype[i] = {
        value: this.SessionTypeList[i].value,
        guid: this.SessionTypeList[i].guid
      }
    }
    console.log(this.selectedsessiontype)
    this.selectedsessiontype.forEach((item: { guid: any; }) => {
      this.sessiontypearray.push(item.guid);
      this.copysessiontypearray.push(item.guid);
    });

    this.sessiontypestatus = this.SessionTypeList;
    console.log(this.sessiontypestatus);
    this.dropdownSettingssessiontype = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectedsessiontype = this.sessiontypestatus;
  }
  walletType() {
    this.currencyarray = []

    this.walletlists = this.GamesofpokerService.walletTypes();
    console.log(this.walletlists)

    this.dropdownCasinoCheckedList = this.walletlists
    this.selectedcurrency = this.walletlists
    console.log(this.dropdownCasinoCheckedList)
    // this.changeCasinoCurrencyOption()
    this.updateCheckedCasinoGames()

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
    this.updateCheckedRemoteGames()
  }

  GamegConfig12() {
    const GamegConfig = localStorage.getItem('GamegConfig');
    if (GamegConfig) {
      this.GamegConfigList = JSON.parse(GamegConfig);
      this.ezugiGames = this.GamegConfigList.remoteSystemGames
    }
    console.log("Games", this.GamegConfigList.remoteSystemGames)
    console.log("Gamesname", this.ezugiGames[0].name)
    for (let i = 0; i < this.ezugiGames.length; i++) {
      if (this.ezugiGames[i].name == "ezugi") {
        this.ezugiGamesList.push(this.ezugiGames[i])
      }
      console.log("ezugiGamesList", this.ezugiGamesList)
    }

  }
  GamegConfig() {
    // const GamegConfig:any = this.CommomfilterService12.GamesConfig()
    // this.GamegConfigList = GamegConfig
    const GamegConfig12 = localStorage.getItem('GamesConfig');
    if (GamegConfig12) {
      this.GamegConfigList = JSON.parse(GamegConfig12);
    }
    console.log(this.GamegConfigList)

    this.GamegConfigList = this.GamegConfigList.games

    for (let i = 0; i < this.GamegConfigList.length; i++) {
      this.selectedpokergames[i] = {
        value: this.GamegConfigList[i].caption,
        guid: this.GamegConfigList[i].guid
      }
    }
    console.log(this.selectedpokergames)
    this.selectedpokergames.forEach((item: { guid: any; }) => {
      this.sessionpokergmarray.push(item.guid);
    });
    this.dropdownSettingspokergames = {
      singleSelection: false,
      idField: 'guid',
      textField: 'caption',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectedpokergames = this.GamegConfigList
  }

  GamesConfig() {
    let list: any = this.GamesofpokerService.GamesConfig();
    console.log("List", list)
    this.filterItem = list[0] //*Required
    console.log(this.filterItem);

    this.allGammeNamesWithCurrency = list[1] //*Notrequired
    this.gamescaption = list[2] //*Required
    this.allGammeNames = list[3] //*Notrequired
    this.onlyPokerGames = list[4] //*Notrequired
    this.uniquegamescaption = list[5] //*Notrequired
    this.checkboxesIndivisualGames = list[6] //*Notrequired

    this.Casinofilters = list[7]
    this.onlycasinoGames = list[8]
    this.casinoGamescpt = list[9]
    this.casinoGamesname = list[10]
    this.remoteGamesProvidersList = list[15]

    this.RummyGameslist = list[16]
    this.RummyGamesNames = [17]
    this.RummyGamesCaptions = list[18]


    console.log('Rummygameslist', this.RummyGameslist)
    console.log(this.remoteGamesProvidersList)
    console.log(this.onlyPokerGames)

    this.uniqueRummyGameCap = this.RummyGamesCaptions.filter((cap: any, i: number) => {
      return this.RummyGamesCaptions.indexOf(cap) == i
    })

    this.selectedRummyUniCap = [...this.uniqueRummyGameCap]



    for (let i = 0; i < this.uniqueRummyGameCap.length; i++) {
      this.rummyCheckedList.push(true)
    }
    console.log(this.rummyCheckedList)

    console.log(this.uniqueRummyGameCap)

    this.onlyPokerGames.forEach((p: any) => {
      console.log(p.name)
      this.selectedFillterGames.push(p.name)
    })
    console.log(this.selectedFillterGames)

    this.providerCheckbox = this.remoteGamesProvidersList.map((provider: any, i: number) => {
      return this.providerCheckbox[i] = true
    })

    this.checkedListRemote = this.remoteGamesProvidersList.map((provider: any, i: number) => {
      return Array(provider.games.length).fill(true)
    })

    for (let i = 0; i < this.Casinofilters.length; i++) {
      this.allcheckedListCasino[i] = this.Casinofilters[i].caption
    }

    for (let k = 0; k < this.filterItem.length; k++) {
      this.checkedList[k] = true
    }
    for (let k = 0; k < this.Casinofilters.length; k++) {
      this.checkedListCasino[k] = true
    }
    console.log(this.checkedListCasino)
  }


  timeSend(data: any) {

    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].estimatedTime)
      let estdTime = data[i].estimatedTime;

      // console.log( estdTime );
      // console.log( estdTime / 60000 );
      var minutes = Math.floor(estdTime / 60000);
      // console.log(minutes)
      var seconds = ((estdTime % 60000) / 1000).toFixed(0);
      // console.log( minutes + ":" + (Number(data[i]) < 10 ? '0' : '') + seconds )
      this.minuts.push(minutes + ":" + (Number(data[i]) < 10 ? '0' : '') + seconds);
    }
    console.log(this.minuts)
  }

  test(value: any) {
    // return (Math.floor(myDuration / (1000 * 60 * 60 * 24)) + ": " + Math.floor(myDuration / (1000 * 60 * 60)) + ":" + Math.floor(myDuration / (1000 * 60)) % 60 + ":" + Math.floor(myDuration / 1000) % 60);

    let totalSeconds = Math.floor(value / 1000);

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

    return `${formattedDays}d : ${formattedHours}h : ${formattedMinutes}m : ${formattedSeconds}s`;
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
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

    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    console.log(this.filterForm.value);
    this.loader = true;
    this.onlinePlayerList = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    fillterbody["accountMask"] = this.filterForm.value.accountMask != null ? this.filterForm.value.accountMask : undefined
    fillterbody["nickName"] = this.filterForm.value.nickName != null ? this.filterForm.value.nickName : undefined
    fillterbody["shortId"] = this.filterForm.value.shortid != null ? this.filterForm.value.shortid : undefined
    fillterbody["email"] = this.filterForm.value.email != null ? this.filterForm.value.email : undefined
    fillterbody["fullName"] = this.filterForm.value.fullName != null ? this.filterForm.value.fullName : undefined
    fillterbody["networkNames"] = this.convertedArray,
      // fillterbody["networkNames"] = this.convertedArray != null ? this.convertedArray : undefined

      fillterbody["ipAddress"] = this.filterForm.value.ipAddress != null ? Number(this.filterForm.value.ipAddress) : undefined;
    fillterbody["statusesIdList"] = this.playerstatusaaray != null ? this.playerstatusaaray : undefined;
    // fillterbody["statusesIdList"] = this.filterForm.value.statusesIdList != null ? [this.filterForm.value.statusesIdList] : undefined;
    fillterbody["sessionType"] = this.sessiontypearray != null ? this.sessiontypearray : undefined;
    // fillterbody["wallet"] =  this.currencyarray!=null? this.currencyarray:undefined;
    fillterbody["tableName"] = this.filterForm.value.tableName != null ? this.filterForm.value.tableName : undefined;
    fillterbody["tournamentName"] = this.filterForm.value.tournamentName != null ? this.filterForm.value.tournamentName : undefined;
    fillterbody["permissionsGroup"] = this.filterForm.value.permissionsGroup != null ? this.filterForm.value.permissionsGroup : undefined;
    // fillterbody["gameNames"] = [...this.selectedFillterGames,...this.selectedFilterCasinoGames]?.length === 0 ? this.allGammeNamesWithCurrency : [...this.selectedFillterGames,...this.selectedFilterCasinoGames];
    fillterbody["gameNames"] = [...this.selectedFillterGames, ...this.updatedCasinoGameNames, ...this.finalSelectedRummyNames]
    fillterbody["remoteGameGuids"] = [...this.selectedRemoteGames]

    this.PlayerserviceService.getPlayersOnlineForGames(fillterbody).subscribe((res) => { this.OnlinePlayersData(res) }
    )
  }


  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: parseInt('1'),
      });
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
    } else
      this.filterForm.patchValue({
        firstRecord:
          Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    if (this.PageCount > this.onlinePlayerList.length) {
      this.pagecontrolbtn = true;

    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
    this.FirstrecordFillter = this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
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
    if (this.PageCount > this.onlinePlayerList.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  TechnicalError() {
    this.ErrorPopup = false;
  }


  OnlinePlayersData(res: any) {
    console.log(res)
    this.loader = false;
    this.resultcount = false;
    this.onlinePlayerList = res.objectList;
    this.ResultCount = res?.resultCount;
    this.rowsOnthePage = res?.objectList?.length;
    // console.log(this.onlinePlayerList)
    if (this.ResultCount == 0) {
      // this.ErrorPopup = true;
    }
    if (this.onlinePlayerList) {
      // this.ResultCount = res.resultCount;
      // this.rowsOnthePage = res.objectList.length;

      if (this.ResultCount !== null) {
        this.resultcount = false;
      }
      if (this.ResultCount !== null || this.onlinePlayerList.resultCount == 0 || res == null) {
        this.loader = false;
      }

      for (let i = 0; i < this.onlinePlayerList.length; i++) {
        for (let j = 0; j < this.SessionTypeList.length; j++) {
          if (this.onlinePlayerList[i].sessionType.lowLong == this.SessionTypeList[j].guid.lowLong) {
            this.onlinePlayerList[i].sessionType = this.SessionTypeList[j].value
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

  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    // let fileName: 'PlayerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, this.fileName);
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "OnlinePlayerList")

  }
  // *****************************************************************************************************************
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
    if (this.convertedArray === null || this.convertedArray.length === 0) {
      console.log("Empty")
      this.convertedArray = this.COpyconvertedArray
    }
    console.log(this.convertedArray)
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
    this.convertedArray = this.COpyconvertedArray
    console.log(this.convertedArray);
  }
  // ********************************************************************************************************************************
  // ********************+++++++++++++++++++******@Starts player Status Dropdown  ******+++++++++++++++++***************************
  onItemSelect(data: any) {
    this.playerstatusaaray = []
    this.filterForm.value.statusesIdList.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
  }
  OnItemDeSelect(data: any) {
    this.playerstatusaaray = []
    this.filterForm.value.statusesIdList.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
    if (this.playerstatusaaray === null || this.playerstatusaaray.length === 0) {
      console.log("Empty")
      this.playerstatusaaray = this.Copyplayerstatusaaray
    }
    console.log(this.playerstatusaaray)
  }
  onSelectAll(data: any) {
    this.playerstatusaaray = []
    data.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
  }
  onDeSelectAll(data: any) {
    this.playerstatusaaray = []
    data.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    this.playerstatusaaray = this.Copyplayerstatusaaray
    console.log(this.playerstatusaaray)
  }
  // *****************+++++++++++++*****@Ends player Status Dropdown *******+++++++++++++++++**********************************
  onItemSelectsessiontype(data: any) {
    this.sessiontypearray = []
    this.filterForm.value.SessionType.forEach((item: { guid: any; }) => {
      this.sessiontypearray.push(item.guid);
    });
    console.log(this.sessiontypearray)
  }
  OnItemDeSelectsessiontype(data: any) {
    this.sessiontypearray = []
    this.filterForm.value.SessionType.forEach((item: { guid: any; }) => {
      this.sessiontypearray.push(item.guid);
    });
    console.log(this.sessiontypearray)
    if (this.sessiontypearray === null || this.sessiontypearray.length === 0) {
      console.log("Empty")
      this.sessiontypearray = this.copysessiontypearray
    }
    console.log(this.sessiontypearray)
  }
  onSelectAllsessiontype(data: any) {
    this.sessiontypearray = []
    data.forEach((item: { guid: any; }) => {
      this.sessiontypearray.push(item.guid);
    });
    console.log(this.sessiontypearray)
  }
  onDeSelectAllsessiontype(data: any) {
    this.sessiontypearray = []
    data.forEach((item: { guid: any; }) => {
      this.sessiontypearray.push(item.guid);
    });
    this.sessiontypearray = this.copysessiontypearray
    console.log(this.sessiontypearray)
  }
  // ******************************************************************************************************************
  onItemSelectCurrent(data: any) {
    this.currencyarray = []
    this.filterForm.value.wallet.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  OnItemDeSelectCurrent(data: any) {
    this.currencyarray = []
    this.filterForm.value.wallet.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  onSelectAllCurrent(data: any) {
    this.currencyarray = []
    data.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  onDeSelectAllCurrent(data: any) {
    this.currencyarray = []
    data.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  // *******************************************************************************************************
  onItemSelectpoker(data: any) {
    console.log(data)
  }
  OnItemDeSelectpoker(data: any) {
    console.log(data)
  }
  onSelectAllpoker(data: any) {
    console.log(data)
  }
  onDeSelectAllpoker(data: any) {
    console.log(data)
  }

  onItemSelectcurrency(item: any) {
    const changeCurrencyResult = this.GamesofpokerService.onItemSelect(item);
    console.log(changeCurrencyResult)
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected
    this.onItemSelectCurrencyCasino(item)
  }

  OnItemDeSelectcurrency(item: any) {
    const changeCurrencyResult = this.GamesofpokerService.OnItemDeSelect(item);
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;
    this.OnItemDeSelectcurrencyCasino(item)
  }
  onSelectAllcurrency(items: any) {
    const changeCurrencyResult = this.GamesofpokerService.onSelectAll(items);
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;
    this.onSelectAllCasinoCurrency(items)
  }
  onDeSelectAllcurrency(items: any) {
    const changeCurrencyResult = this.GamesofpokerService.onDeSelectAll(items);
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;
    this.onDeSelectAllCasinoCurrency(items)
  }

  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Casino Games filters Start &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  onItemSelectCurrencyCasino(item: any) {
    console.log(item)
    this.selectedFilterCasinoGames = []
    this.dropdownCasinoCheckedList.push(item)
    // this.changeCasinoCurrencyOption()
    this.updateCheckedCasinoGames()
  }

  OnItemDeSelectcurrencyCasino(item: any) {
    this.selectedFilterCasinoGames = []
    this.dropdownCasinoCheckedList = this.dropdownCasinoCheckedList.filter((eachitem) => eachitem.description !== item.description)
    if (this.dropdownCasinoCheckedList.length == 0) {
      this.dropdownCasinoCheckedList = this.walletlists
    }
    // this.changeCasinoCurrencyOption()
    this.updateCheckedCasinoGames()
    this.updateCheckedRummyGames()
  }

  onSelectAllCasinoCurrency(items: any) {
    this.selectedFilterCasinoGames = []
    this.dropdownCasinoCheckedList = items
    // this.changeCasinoCurrencyOption()
    this.updateCheckedCasinoGames()
    this.updateCheckedRummyGames()
  }

  onDeSelectAllCasinoCurrency(items: any) {
    console.log(this.walletlists)
    this.selectedFilterCasinoGames = []
    this.dropdownCasinoCheckedList = this.walletlists
    // this.changeCasinoCurrencyOption()
    this.updateCheckedCasinoGames()
    this.updateCheckedRummyGames()
  }

  // changeCasinoCurrencyOption() {
  //   console.log(this.dropdownCasinoCheckedList)

  //   this.selectedFilterCasinoGames = []
  //   let x = []
  //   console.log(this.allcheckedListCasino)
  //   console.log(this.onlycasinoGames)
  //   for (let i = 0; i < this.onlycasinoGames.length; i++) {
  //     for (let j = 0; j < this.allcheckedListCasino.length; j++) {  
  //       if (this.allcheckedListCasino[j] == this.onlycasinoGames[i].caption) {
  //         x.push(this.onlycasinoGames[i])
  //       }
  //     }
  //   }
  //   for (let i = 0; i < x.length; i++) {
  //     for (let j = 0; j < this.dropdownCasinoCheckedList.length; j++) {
  //       if (x[i].wallet.highLong === this.dropdownCasinoCheckedList[j].guid.highLong && x[i].wallet.lowLong === this.dropdownCasinoCheckedList[j].guid.lowLong) {
  //         this.selectedFilterCasinoGames.push(this.onlycasinoGames[i].name)

  //       }
  //     }
  //   }
  //   console.log(this.selectedFilterCasinoGames)
  // }

  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Casino Games filters Start &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Remote Games start &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  updateProviderCheckbox(providerIndex: number) {
    const allGameschecked = this.checkedListRemote[providerIndex].every(game => game)
    this.providerCheckbox[providerIndex] = allGameschecked
  }

  clickonCheckboxOfProviders(event: any, providerIndex: number) {
    let isChecked = event.target.checked
    this.providerCheckbox[providerIndex] = isChecked
    this.checkedListRemote[providerIndex] = this.checkedListRemote[providerIndex].map(() => isChecked)
    this.updateProviderCheckbox(providerIndex)
    this.updateCheckedRemoteGames()
  }

  clickonCheckboxIndivisualGamesOfremote(event: any, providerIndex: number, gameIndex: number, gameName: any) {
    this.checkedListRemote[providerIndex][gameIndex] = event.target.checked
    this.updateProviderCheckbox(providerIndex)
    this.updateCheckedRemoteGames()
  }

  updateCheckedRemoteGames() {
    this.selectedRemoteGames = []
    let selectedCheckboxRemoteGames: any[] = []
    this.remoteGamesProvidersList.forEach((provider: any, providerIndex: number) => {
      provider.games.forEach((game: any, gameIndex: number) => {
        if (this.checkedListRemote[providerIndex][gameIndex]) {
          for (let i = 0; i < this.selectedcurrency.length; i++) {
            if (this.selectedcurrency[i].guid.hiLong == game.wallet.hiLong && this.selectedcurrency[i].guid.lowLong == game.wallet.lowLong) {
              this.selectedRemoteGames.push(game.guid)
              if (this.remoteGamesGuids.length === 0) {
                this.remoteGamesGuids = this.selectedRemoteGames
              }
              selectedCheckboxRemoteGames.push(game.caption)
            }
          }
        }
      })
    })
    if (this.selectedRemoteGames.length == 0) {
      this.selectedRemoteGames = this.remoteGamesGuids
    }
    console.log(this.selectedRemoteGames)
    this.selectedCheckBox(selectedCheckboxRemoteGames)

  }

  selectedCheckBox(selectedCheckboxRemoteGames: any) {
    let arr = this.providerCheckbox.every(bool => bool === true)

    if (arr) {
      this.RemoteGamesTobeselected = "[ALL]"
    }
    else {
      this.RemoteGamesTobeselected = selectedCheckboxRemoteGames
    }
  }

  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Remote Games End &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Rummy Games Start &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  clickonCheckboxOfRummyGames(event: any) {
    let isChecked = event.target.checked
    this.rummyGamesCheckbox = isChecked
    this.rummyCheckedList = this.rummyCheckedList.map((bool: any) => isChecked)

    if (isChecked) {
      this.selectedRummyUniCap = [...this.uniqueRummyGameCap]
    }
    else {
      this.selectedRummyUniCap = []
    }
    console.log(this.selectedRummyUniCap)
    this.updateCheckedRummyGames()
    this.rummyInpselectedCheckBox()
  }

  clickonCheckboxOfRummyIndivisualGames(event: any, eachInd: number) {
    let isChecked = event.target.checked
    this.rummyCheckedList[eachInd] = isChecked

    let allGamesChecked = this.rummyCheckedList.every((bool: any) => bool == true)
    this.rummyGamesCheckbox = allGamesChecked

    if (event.target.checked) {
      this.selectedRummyUniCap.push(event.target.value)
    }
    else {
      this.selectedRummyUniCap = this.selectedRummyUniCap.filter((val: any) => {
        return event.target.value != val
      })
    }
    console.log(this.selectedRummyUniCap)
    this.updateCheckedRummyGames()
    this.rummyInpselectedCheckBox()
  }

  updateCheckedRummyGames() {
    this.finalSelectedRummyNames = []
    this.selectedRummyUniCap.forEach((cap: any) => {
      this.RummyGameslist.forEach((game: any) => {
        if (game.caption == cap) {
          for (let j = 0; j < this.dropdownCasinoCheckedList.length; j++) {
            if (game.wallet.lowLong == this.dropdownCasinoCheckedList[j].guid.lowLong && game.wallet.highLong == this.dropdownCasinoCheckedList[j].guid.highLong) {
              this.finalSelectedRummyNames.push(game.name)
              if (this.selectedRummyName.length == 0) {
                this.selectedRummyName = this.finalSelectedRummyNames
              }
            }
          }
        }
      })
    })
    if (this.finalSelectedRummyNames.length == 0) {
      this.finalSelectedRummyNames = this.selectedRummyName
    }
    console.log(this.finalSelectedRummyNames)
    this.rummyInpselectedCheckBox()
  }

  rummyInpselectedCheckBox() {
    let arr = this.rummyCheckedList.every((bool: any) => bool === true)
    if (arr) {
      this.InpselectedRummyUniCap = "[ALL]"
    }
    else {
      this.InpselectedRummyUniCap = this.selectedRummyUniCap
    }
  }

  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Rummy Games End &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn
  };
  filterCasinogamesbtn() {
    this.FiltergamesbtnCasino = !this.FiltergamesbtnCasino
  };

  filterRemotegamebtn() {
    this.FiltergamebtnRemote = !this.FiltergamebtnRemote
  }
  filterRummygamesbtn() {
    this.FilterRummygamesbtn = !this.FilterRummygamesbtn
  }

  clickonCheckboxForAllGames(event: any) {
    let changeCurrencyResult = this.GamesofpokerService.clickonCheckboxForAllGames(event);

    const { selectedFillterGames, gamesTobeSelected, checkedList, pokerGamesCheckbox } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;
    this.checkedList = checkedList;
    this.pokerGamesCheckbox = pokerGamesCheckbox


  }

  clickonCheckboxIndivisualGames() {
    let changeCurrencyResult = this.GamesofpokerService.clickonCheckboxIndivisualGames();
    const { selectedFillterGames, gamesTobeSelected, checkedList, pokerGamesCheckbox } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;
    this.checkedList = checkedList;
    this.pokerGamesCheckbox = pokerGamesCheckbox;
  };


  // clickonCheckboxForAllGamesCasino12(event: any) {
  //   let changeCurrencyResult = this.GamesofpokerService.clickonCheckboxForAllGames(event);

  //   const { selectedFillterGames, gamesTobeSelected, checkedList, pokerGamesCheckbox } = changeCurrencyResult;
  //   this.selectedFillterGames = selectedFillterGames;
  //   this.gamesTobeSelected = gamesTobeSelected;
  //   this.checkedList = checkedList;
  //   this.pokerGamesCheckbox = pokerGamesCheckbox
  // }



  // clickonCheckboxForAllGamesCasino12(event: any) {
  //   for (let i = 0; i < this.Casinofilters.length; i++) {
  //     let checkBoxElement = document.getElementById('gamecheckboxId' + i) as HTMLInputElement;
  //     let checkboxForallgameCaption = document.getElementById("checkboxForCasinogameCaption") as HTMLInputElement;
  //     if (checkBoxElement) {
  //       if (checkboxForallgameCaption.checked == true) {
  //         checkBoxElement.checked = true;
  //       } else {
  //         checkBoxElement.checked = false;
  //       }
  //     }
  //   }
  //   this.selectedCasinoGames()
  //   for (let i = 0; i < this.Casinofilters.length; i++) {
  //     this.allcheckedListCasino[i] = this.Casinofilters[i].caption
  //   }
  //   this.changeCasinoCurrencyOption()
  // }

  // clickonCheckboxCasinoIndivisualGames() {
  //   let checkboxForallgameCaption = document.getElementById("checkboxForCasinogameCaption") as HTMLInputElement;
  //   this.allcheckedListCasino = []
  //   for (let i = 0; i < this.Casinofilters.length; i++) {
  //     let checkBoxElement = document.getElementById('gamecheckboxId' + i) as HTMLInputElement;
  //     console.log(checkBoxElement.value)
  //     if (checkBoxElement.checked === true) {
  //       this.checkedListCasino[i] = true;
  //       this.allcheckedListCasino.push(checkBoxElement.value)
  //     }
  //     else {
  //       this.checkedListCasino[i] = false;
  //     }
  //   }
  //   console.log(this.allcheckedListCasino)
  //   for (let i = 0; i < this.Casinofilters.length; i++) {
  //     let checkboxForallgameCaption = document.getElementById("checkboxForCasinogameCaption") as HTMLInputElement;
  //     let checkBoxElement = document.getElementById('gamecheckboxId' + i) as HTMLInputElement;
  //     if (checkBoxElement.checked === false) {
  //       checkboxForallgameCaption.checked = false
  //       break;
  //     }
  //     else {
  //       checkboxForallgameCaption.checked = true
  //     }
  //   }
  //   this.selectedCasinoGames()
  //   this.changeCasinoCurrencyOption()
  // }

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Casino games start%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  clickonCheckboxForAllGamesCasino12(event: any) {
    let isChecked = event.target.checked
    this.casinoGameCheckbox = isChecked
    this.checkedListCasino = this.checkedListCasino.map((bool: any) => bool = isChecked)
    console.log(this.checkedListCasino)
    this.updateCheckedCasinoGames()

  }

  clickonCheckboxCasinoIndivisualGames(event: any, ind: number) {
    let isChecked = event.target.checked
    console.log(isChecked, ind)
    this.checkedListCasino[ind] = isChecked

    let bool = this.checkedListCasino.every((bool: any) => bool === true)
    console.log(bool)

    this.casinoGameCheckbox = bool
    this.updateCheckedCasinoGames()
  }

  updateCheckedCasinoGames() {
    this.updatedCasinoGameNames = []
    let selectedCapNames: any[] = []
    this.onlycasinoGames.forEach((game: any) => {
      this.Casinofilters.forEach((uniGame: any, index: number) => {
        if (this.checkedListCasino[index]) {
          if (uniGame.caption == game.caption) {
            selectedCapNames.push(uniGame.caption)
            this.dropdownCasinoCheckedList.forEach((currency: any) => {
              console.log(currency)
              if (game.wallet.hiLong == currency.guid.hiLong && game.wallet.lowLong == currency.guid.lowLong) {
                this.updatedCasinoGameNames.push(game.name)
                if (this.dummyCheckedCasinoGames.length == 0) {
                  this.dummyCheckedCasinoGames = this.updatedCasinoGameNames
                }
              }
            })
          }
        }
      })
    })

    if (this.updatedCasinoGameNames.length == 0) {
      this.updatedCasinoGameNames = this.dummyCheckedCasinoGames
    }
    console.log(this.updatedCasinoGameNames)
    selectedCapNames = selectedCapNames.filter((cap: any, ind: number) => {
      return selectedCapNames.indexOf(cap) === ind
    })
    console.log(selectedCapNames)
    this.selectedCasinoGames(selectedCapNames)
  }

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% casino games end %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  selectedCasinoGames(selectedCapNames: any) {
    let checkallselectedCasinoGames = this.checkedListCasino.every((bool: boolean) => bool === true)
    if (checkallselectedCasinoGames) {
      this.allselectedCasinoGames = "[ALL]"
    }
    else {
      this.allselectedCasinoGames = selectedCapNames
    }
  }


  casinogamefilter() {
    const GamesConfig = localStorage.getItem('GamesConfig')
    let GamesConfigList: any
    if (GamesConfig) {
      GamesConfigList = JSON.parse(GamesConfig)
    }
    this.CasinoAllGames = GamesConfigList.remoteSystemGames
    console.log(this.CasinoAllGames)
  }

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }

}


