import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as XLSX from 'xlsx';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-poker-sit-ngo-history',
  templateUrl: './poker-sit-ngo-history.component.html',
  styleUrls: ['./poker-sit-ngo-history.component.css']
})
export class PokerSitNgoHistoryComponent implements OnInit, OnDestroy {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  loader: boolean = false;
  SitNgoHistoryData: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  ScheduleTypeList: any;
  TournamentStatusList: any;
  walletFormatsList: any = [];
  walletlists: any = [];
  TourneyTypeList: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  playerSitNgoHistory: any;
  playerSitNgoPopup: boolean = false;
  GamesConfigList: any;
  gamescaption: any = [];



  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  dropDownCheckedList: any = [];
  filterItem: any = [];
  Filtergamesbtn: boolean = false;
  allGammeNamesWithCurrency: any = [];
  uniquegamescaption: any;
  allGammeNames: any = [];
  onlyPokerGames: any = [];
  checkboxesIndivisualGames: any = [];
  selectedFillterGames: any = [];
  gamesTobeSelected: any = "All";
  checkedList: any = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  pokerGamesCheckbox: boolean = true;
  TournamentStatusListDropdownSettings: object = {};
  TournamentStatusListSelectedItems: any = [];
  bodyTournamentStatusListSelectedItems: any = [];
  TournamentStatusListConstItem: any = [];
  popupArrow: boolean = false;
  SeletedIconIndex: any;
  SpinnwerT: boolean = false;
  CancelReason: any;
  CancelSitNgoPopup: boolean = false;
  CancelSitNgo: boolean = false;
  AlertMessage: any;
  SitngoActionsType: any;
  timeerror: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false;
  endDate: any;
  startDate: any;
  todaydate: any;


  location: any;
  playerExporer: boolean = false;
  playerGUID: any;

  constructor(private DateTimePipe: DateTimePipe, private GamesofpokerService: GamesofpokerService, private PokergamesService: PokergamesService
    , private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      tournamentListStatus: new FormControl(),
      // skills: new FormControl(),
      // Datefrom: new FormControl(),
      // Dateto: new FormControl(),
      TournamentSettingId: new FormControl(),
      Name: new FormControl(),
      ManualPrizePool: new FormControl(),
      Currency: new FormControl(),
      Game: new FormControl(),
      TotalCostfrom: new FormControl(),
      TotalCostto: new FormControl(),
      BuyInfrom: new FormControl(),
      BuyInto: new FormControl(),
      Feefrom: new FormControl(),
      Feeto: new FormControl(),
      KnockoutBountyfrom: new FormControl(),
      KnockoutBountyto: new FormControl(),
      Registeredfrom: new FormControl(),
      Registeredto: new FormControl(),
      MaxPlayersfrom: new FormControl(),
      MaxPlayersto: new FormControl(),
      ScheduleType: new FormControl(),
      Status: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),

      startTime: new FormControl(),
      endTime: new FormControl(),

      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
    })
  };

  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    // this.location = window.location.pathname;
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/pokersitngoHistory") {
      this.playerExporer = true
      this.PlayerGuid();

    } else {

      this.playerExporer = false
    }


    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;

    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    this.TourneyType();
    this.TournamentStatus();
    this.walletType();
    this.walletFormats();
    this.GamesConfig();
  }

  PlayerGuid() {
    let Playerguid = sessionStorage.getItem('Playerguid')
    console.log(Playerguid)
    if (Playerguid) {
      this.playerGUID = JSON.parse(Playerguid);
      console.log(this.playerGUID)
    }

  }



  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  walletFormats() {

    const walletFormats = localStorage.getItem("walletFormats")
    if (walletFormats) {
      this.walletFormatsList = JSON.parse(walletFormats)
    }
    console.log("walletFormats", this.walletFormatsList)



    // const walletTypes = localStorage.getItem("walletTypes")
    // if (walletTypes) {
    //   this.walletFormatsList = JSON.parse(walletTypes)
    //   for (let i = 0; i < this.walletFormatsList.length; i++) {
    //     if (this.walletFormatsList[i].clubGameWallet == true) {

    //       this.walletlists.push(this.walletFormatsList[i])
    //     }
    //   }
    // }
    // console.log("walletFormatsList", this.walletFormatsList)
    // console.log("walletlists", this.walletlists)
  }


  walletType() {

    this.walletlists = this.GamesofpokerService.walletTypes();
    console.log("walletlists", this.walletlists);
    // this.filterForm.patchValue({
    //   Currency: this.walletlists[0].guid
    // })




    this.dropdownList = this.walletlists;
    this.dropDownCheckedList = this.walletlists

    for (let i = 0; i < this.walletlists.length; i++) {
      // this.selectedItems[i] = this.walletlists[i]
      this.selectedItems[i] = {
        description: this.walletlists[i].description,
        guid: this.walletlists[i].guid
      }



    }



    this.dropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };

  }

  GamesConfig() {
    let list: any = this.GamesofpokerService.GamesConfig();
    console.log(list)
    this.filterItem = list[0] //*Required
    this.allGammeNamesWithCurrency = list[1] //*Notrequired
    this.gamescaption = list[2] //*Required
    this.allGammeNames = list[3] //*Notrequired
    this.onlyPokerGames = list[4] //*Notrequired
    this.uniquegamescaption = list[5] //*Notrequired
    this.checkboxesIndivisualGames = list[6] //*Notrequired

    for (let k = 0; k < this.filterItem.length; k++) {
      this.checkedList[k] = true
    }

  }

  TournamentStatus() {
    const TournamentStatus = localStorage.getItem("TournamentStatus");
    if (TournamentStatus) {
      this.TournamentStatusList = JSON.parse(TournamentStatus);
    }
    console.log("TournamentStatusList", this.TournamentStatusList);

    this.TournamentStatusListDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };

    // TournamentStatusListSelectedItems

    for (let i = 0; i < this.TournamentStatusList.length; i++) {
      this.TournamentStatusListSelectedItems[i] = {
        guid: this.TournamentStatusList[i].guid,
        value: this.TournamentStatusList[i].value
      };
      this.bodyTournamentStatusListSelectedItems[i] = this.TournamentStatusList[i].guid;
    };
    this.TournamentStatusListConstItem = this.bodyTournamentStatusListSelectedItems

    console.log(this.TournamentStatusListSelectedItems);
    console.log(this.bodyTournamentStatusListSelectedItems)


  }
  TourneyType() {
    const TourneyType = localStorage.getItem("TourneyType")
    if (TourneyType) {
      this.TourneyTypeList = JSON.parse(TourneyType)
    }
    console.log("TourneyTypeList", this.TourneyTypeList)
  }


  onItemSelect(item: any) {
    const changeCurrencyResult = this.GamesofpokerService.onItemSelect(item);
    console.log(changeCurrencyResult)
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected
  }

  OnItemDeSelect(item: any) {
    const changeCurrencyResult = this.GamesofpokerService.OnItemDeSelect(item);
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;

  }
  onSelectAll(items: any) {
    const changeCurrencyResult = this.GamesofpokerService.onSelectAll(items);
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;



  }
  onDeSelectAll(items: any) {
    const changeCurrencyResult = this.GamesofpokerService.onDeSelectAll(items);
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;


  }

  clickonCheckboxIndivisualGames() {
    let changeCurrencyResult = this.GamesofpokerService.clickonCheckboxIndivisualGames();
    const { selectedFillterGames, gamesTobeSelected, checkedList, pokerGamesCheckbox } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;
    this.checkedList = checkedList;
    this.pokerGamesCheckbox = pokerGamesCheckbox;
  };


  clickonCheckboxForAllGames(event: any) {
    let changeCurrencyResult = this.GamesofpokerService.clickonCheckboxForAllGames(event);

    const { selectedFillterGames, gamesTobeSelected, checkedList, pokerGamesCheckbox } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;
    this.checkedList = checkedList;
    this.pokerGamesCheckbox = pokerGamesCheckbox


  }



  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn

  };


  tournamentStatusListonItemSelect(item: any) {
    console.log(item)
    this.bodyTournamentStatusListSelectedItems.push(item.guid);
    console.log(this.bodyTournamentStatusListSelectedItems)


  }

  tournamentStatusListOnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.bodyTournamentStatusListSelectedItems);
    // this.bodyTournamentStatusListSelectedItems = this.bodyTournamentStatusListSelectedItems.filter((eachItem:any) => console.log(eachItem , item.guid));
    this.bodyTournamentStatusListSelectedItems = this.bodyTournamentStatusListSelectedItems.filter((eachItem: any) => eachItem.hiLong != item.guid.hiLong || eachItem.lowLong != item.guid.lowLong)
    console.log(this.bodyTournamentStatusListSelectedItems);
  }
  tournamentStatusListonSelectAll(items: any) {
    console.log(items)
    for (let m = 0; m < items.length; m++) {
      this.bodyTournamentStatusListSelectedItems[m] = items[m].guid
    }
    console.log(this.bodyTournamentStatusListSelectedItems)



  }
  tournamentStatusListonDeSelectAll(items: any) {
    console.log(items)
    this.bodyTournamentStatusListSelectedItems = [];
    console.log(this.bodyTournamentStatusListSelectedItems)
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
  tournamentExplore(guid: any, caption: any) {
    const tInfo = {
      guid: guid,
      name: caption,
      explorer: "Sit'n'Go Explorer"
    }
    sessionStorage.setItem('tInfo', JSON.stringify(tInfo));
    // var baseUrl = '/tournamentexplorer/tableInfo';
    var baseUrl= window.location.hash ? '#/tournamentexplorer/tableInfo ':'/tournamentexplorer/tableInfo';

    window.open(baseUrl)

  }


  onFormSubmit() {
    console.log(this.filterForm.value);
    this.popupArrow = false;
    this.FillterMenu = false;
    this.SitNgoHistoryData = false;
    this.loader = true;
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)

    fillterbody["firstRecord"] = Number(this.filterForm.value.firstRecord - 1)
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    fillterbody["startDate"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate != "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined

    fillterbody["settingsId"] = this.filterForm.value.TournamentSettingId != null ? this.filterForm.value.TournamentSettingId : undefined;
    fillterbody["caption"] = this.filterForm.value.Name != null ? this.filterForm.value.Name : undefined;
    // fillterbody["gameNames"] = this.filterForm.value.Game != null ? this.filterForm.value.Game : undefined;
    fillterbody["gameNames"] = this.selectedFillterGames.length === 0 ? this.allGammeNamesWithCurrency : this.selectedFillterGames;
    fillterbody["brandedTourney"] = false;
    fillterbody["makeADeal"] = false;
    fillterbody["synchronizedTourney"] = false;
    if (this.filterForm.value.ManualPrizePool) {
      fillterbody["manualPrizePoolTourney"] = this.filterForm.value.ManualPrizePool;
    }
    else {
      fillterbody["manualPrizePoolTourney"] = false;
    }
    fillterbody["tourneyType"] = this.TourneyTypeList[1].guid;
    fillterbody["totalCost"] = this.filterForm.value.TotalCostfrom != null ? { "high": this.filterForm.value.TotalCostto, "low": this.filterForm.value.TotalCostfrom } : undefined;
    fillterbody["buyIn"] = this.filterForm.value.BuyInfrom != null ? { "high": this.filterForm.value.BuyInto, "low": this.filterForm.value.BuyInfrom } : undefined;
    fillterbody["fee"] = this.filterForm.value.Feefrom != null ? { "high": this.filterForm.value.Feeto, "low": this.filterForm.value.Feefrom } : undefined;
    fillterbody["knockoutBounty"] = this.filterForm.value.KnockoutBountyfrom != null ? { "high": this.filterForm.value.KnockoutBountyto, "low": this.filterForm.value.KnockoutBountyfrom } : undefined;
    fillterbody["registeredPlayers"] = this.filterForm.value.Registeredfrom != null ? { "high": this.filterForm.value.Registeredto, "low": this.filterForm.value.Registeredfrom } : undefined;
    fillterbody["playersCount"] = this.filterForm.value.MaxPlayersfrom != null ? { "high": this.filterForm.value.MaxPlayersto, "low": this.filterForm.value.MaxPlayersfrom } : undefined;
    // fillterbody["statuses"] = this.filterForm.value.Status != null ? [this.filterForm.value.Status] : undefined;
    fillterbody["statuses"] = this.bodyTournamentStatusListSelectedItems.length === 0 ? this.TournamentStatusListConstItem : this.bodyTournamentStatusListSelectedItems

    if (this.playerExporer == false) {
      this.PokergamesService.getPokerTournamentsHistory(fillterbody).subscribe((res) => this.PokerSitNgoHistoryData(res))
    } else {

      fillterbody["playerIdList"] = [this.playerGUID];
      this.PokergamesService.getPokerTournamentPlayersHistory(fillterbody).subscribe((res) => this.PokerSitNgoHistoryData(res))

    }

  }
  PokerSitNgoHistoryData(data: any) {
    console.log(data);
    if (data) {
      this.SitNgoHistoryData = data.objectList;
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount;
    };


    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.SitNgoHistoryData != null) {
      this.loader = false;
    }
    for (let i = 0; i < this.SitNgoHistoryData.length; i++) {
      for (let j = 0; j < this.TournamentStatusList.length; j++) {
        if (this.SitNgoHistoryData[i]?.status?.lowLong == this.TournamentStatusList[j].guid?.lowLong) {
          this.SitNgoHistoryData[i].status = this.TournamentStatusList[j].value;

        };

        if (this.SitNgoHistoryData[i].history && this.playerExporer) {
          if (this.SitNgoHistoryData[i]?.history.status?.lowLong == this.TournamentStatusList[j].guid?.lowLong) {
            this.SitNgoHistoryData[i].history.status = this.TournamentStatusList[j].value
          }
        }
      }
      for (let m = 0; m < this.onlyPokerGames.length; m++) {
        if (this.SitNgoHistoryData[i].gameName == this.onlyPokerGames[m].name) {
          this.SitNgoHistoryData[i].gameName = this.onlyPokerGames[m].caption
        }
      }
      for (let n = 0; n < this.walletlists.length; n++) {
        if (this.SitNgoHistoryData[i].buyIn.wallet.lowLong == this.walletlists[n].guid.lowLong) {
          this.SitNgoHistoryData[i].buyIn.wallet = this.walletlists[n].description
        }
      }

      for (let m = 0; m < this.walletFormatsList.length; m++) {
        if (this.SitNgoHistoryData[i].totalCost.wallet.lowLong == this.walletFormatsList[m].guid.lowLong) {
          if (this.walletFormatsList[m].currencyCode) {
            this.SitNgoHistoryData[i].totalCost.wallet = this.walletFormatsList[m].currencyCode
          } else {
            if (this.walletFormatsList[m].currencyCode) {
              this.SitNgoHistoryData[i].totalCost.wallet = this.walletFormatsList[m].symbol
            }
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

  onClick(index: any) {
    console.log(index)
    this.playerSitNgoHistory = this.SitNgoHistoryData[index]
    console.log(this.playerSitNgoHistory)
    this.playerSitNgoPopup = true;
  }
  closePopup() {
    this.playerSitNgoPopup = false;
  }


  showmanu(i: any, guid: any) {
    this.popupArrow = !this.popupArrow
    this.SeletedIconIndex = i
    this.playerSitNgoHistory = this.SitNgoHistoryData[i]
    console.log(this.playerSitNgoHistory)
  }
  setSitngoActions(Type: any, index: any) {
    this.popupArrow = false;
    // this.SpinnwerT = true;
    this.AlertMessage = '';
    this.CancelSitNgo = false;
    this.CancelSitNgoPopup = true;
    this.SitngoActionsType = Type

    if (Type == "Cancel") {
      this.CancelSitNgo = true;
      this.CancelSitNgoPopup = true;
    } else if (Type == "Pause") {
      // this.PauseSitNgoPopup = true;
      this.AlertMessage = " Do You want to Pause the selected sit'n'Go?"
    } else if (Type == "Continue") {
      this.AlertMessage = " Do You want to continue the selected sit'n'Go?"
      // this.CompletedSitNgoPopup = true;
    }
  }

  cancelTourny(type: any) {

    // this.CancelSitNgoPopup=false

    let body = {
      "tournamentGuid": this.playerSitNgoHistory.guid,
      "reason": this.playerSitNgoHistory.description,
    }
    console.log(body)
    if (type == "yes") {
      // this.SpinnwerT = true;
      switch (this.SitngoActionsType) {
        case 'Cancel': {
          this.cancelTournament(body)
          break;
        }
        case 'Pause': {
          this.pauseTournament(body)
          break;
        }
        case 'Continue': {
          this.continueTournament(body)
          break;
        }
      }
    } else if (type == "no") {
      this.AlertMessage = '';
      this.CancelSitNgoPopup = false
    }

  }
  cancelTournament(body: any) {
    this.PokergamesService.cancelTournament(body).subscribe(data => {
      console.log(data);
      if (data.changedObjectList) {
        this.CancelSitNgoPopup = false;
        this.SpinnwerT = false;
      }
    })
  }
  continueTournament(body: any) {
    this.PokergamesService.continueTournament(body).subscribe(data => {
      console.log(data);
      if (data.changedObjectList) {
        this.CancelSitNgoPopup = false;
        this.SpinnwerT = false;
      }
    })
  }
  pauseTournament(body: any) {
    this.PokergamesService.pauseTournament(body).subscribe(data => {
      console.log(data);
      if (data.changedObjectList) {
        this.CancelSitNgoPopup = false;
        this.SpinnwerT = false;
      }
    })
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
    if (this.PageCount > this.SitNgoHistoryData.length) {

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


    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
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
    if (this.PageCount > this.SitNgoHistoryData.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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
    XLSX.writeFile(wb, "Sit'n'go HistoryExcelSheet.xlsx");

  }

  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "HistoryExcelSheet")
  }


  showDate(data: any) {
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
}
