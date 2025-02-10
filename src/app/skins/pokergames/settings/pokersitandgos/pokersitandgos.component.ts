import { Component, OnInit,OnDestroy ,ViewChild } from '@angular/core';
// GamesofpokerService
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
// import { GamesofpokerService } from '../../../../source/gamesofpoker.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { CreatePokerSitnGoComponent } from 'src/app/skins/admin-control/create-poker-sitn-go/create-poker-sitn-go.component';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';

@Component({
  selector: 'app-pokersitandgos',
  templateUrl: './pokersitandgos.component.html',
  styleUrls: ['./pokersitandgos.component.css']
})
export class PokersitandgosComponent implements OnInit, OnDestroy {
  @ViewChild(CreatePokerSitnGoComponent) CreatePokerSitnGoComponent: CreatePokerSitnGoComponent | undefined;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  Fillterdata: boolean = false
  Filtergamesbtn: boolean = false;
  pokerGamesCheckbox: boolean = true;
  filterItem: any = [];
  gamesListofarrays: any;
  onlyPokerGames: any = [];
  allGammeNames: any = [];
  allGammeNamesWithCurrency: any = [];
  checkboxesIndivisualGames: any = [];
  uniquegamescaption: any;
  selectedFillterGames: any = [];
  gamesTobeSelected: any = "All";
  SitandGoList: any;
  pokerGamesLoader: boolean = false;
  loader: boolean = false;
  loginForm: any = FormGroup;
  pokersitngo: any = FormGroup;
  filterForm: FormGroup;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  TourneyTypeList: any;
  walletFormatsList: any;
  walletlists: any = [];
  StutusList: any;
  GamesConfigList: any;
  gamescaption: any = [];
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  PlayerSitandGoDatapopup: boolean = false;
  PlayerSitandGoData: any;
  obj: any;
  TotalCostValue: any;
  BuyInValue: any;
  FeeValue: any;
  knockoutBountyValue: any;
  ChipsPerPlayerValue: any;
  walletTypesList: any;
  dropDownCheckedList: any = [];
  checkedList: any = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  startDate: any;
  endDate: any;
  todaydate: any
  timeerror: boolean = false;
  steddate: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  popupArrow: boolean = false;
  SeletedIconIndex: any
  PlayerEditSitNgoDatapopup: boolean = false;
  SpinnwerT: boolean = false

  constructor(private GamesofpokerService: GamesofpokerService, private pokergamesService: PokergamesService, private formBuilder: FormBuilder,
    private FileformatServiceService:FileformatServiceService) {
    this.filterForm = new FormGroup({
      skills: new FormControl(),
      repotingstart: new FormControl(),
      repotingend: new FormControl(),
      Currency: new FormControl(),
      Game: new FormControl(),
      TotalCostFrom: new FormControl(),
      TotalCostTo: new FormControl(),
      BuyInFrom: new FormControl(),
      BuyInTo: new FormControl(),
      ManualPrizePool: new FormControl(),
      FeeFrom: new FormControl(),
      FeeTo: new FormControl(),
      KnockoutBountyFrom: new FormControl(),
      KnockoutBountyTo: new FormControl(),
      Status: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }
  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
    // throw new Error('Method not implemented.');
  }
  getDirtyValues(form: any) {
    let dirtyValues: any = {};
    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
        }
      });

    return dirtyValues;
  }
  ngOnInit(): void {
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
    // this.walletFormats();
    this.walletTypes()
    this.DYIDTOURNAMENTSETTINGSSTATUS();
    this.GamesConfig();
    // this.GamesofpokerService.walletTypes();
    // this.GamesofpokerService.GamesConfig();

    this.pokersitngo = this.formBuilder.group({
      firstRecord: [1],
      maxCountRecord: [100],
      repotingstart: [null],
      repotingend: [null],
    })
    let body = {};
    // this.pokergamesService.PokerSitngos(body).subscribe(data => this.getPokerData(data))
  }
  filterbtn() {
    this.Fillterdata = !this.Fillterdata
  }

  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn

  }

  // walletFormats() {
  //   const walletTypes = localStorage.getItem("walletTypes")
  //   if (walletTypes) {
  //     this.walletFormatsList = JSON.parse(walletTypes)
  //     for (let i = 0; i < this.walletFormatsList.length; i++) {
  //       if (this.walletFormatsList[i].clubGameWallet == true) {

  //         this.walletlists.push(this.walletFormatsList[i])
  //       }
  //     }
  //   }
  //   console.log(this.walletFormatsList)
  //   console.log("walletlists", this.walletlists)
  // }   

  walletTypes() { 
//  const walletTypes = localStorage.getItem("walletTypes");

//     if (walletTypes) {
//       this.walletTypesList = JSON.parse(walletTypes)
//       for (let i = 0; i < this.walletTypesList.length; i++) {
//         if (this.walletTypesList[i].clubGameWallet == true) {

//           this.walletlists.push(this.walletTypesList[i])
//         }
//       }
//     }
//     console.log(this.walletTypesList)
//     console.log("walletlists", this.walletlists);
   

    this.walletlists = this.GamesofpokerService.walletTypes();
    console.log("walletlists", this.walletlists);
    this.filterForm.patchValue({
      Currency: this.walletlists[0].guid
    })




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




  DYIDTOURNAMENTSETTINGSSTATUS() {
    const StutusList = localStorage.getItem('DYIDTOURNAMENTSETTINGSSTATUS');
    if (StutusList) {
      this.StutusList = JSON.parse(StutusList)
    }
    console.log("StutusList", this.StutusList);

    this.filterForm.patchValue({
      Status:this.StutusList[0].guid
    })
  }
  TourneyType() {
    const TourneyType = localStorage.getItem("TourneyType")
    if (TourneyType) {
      this.TourneyTypeList = JSON.parse(TourneyType)
    }
    console.log("TourneyTypeList", this.TourneyTypeList)
  }
  GamesConfig() {


    // const GamesConfig = localStorage.getItem('GamesConfig')
    // if (GamesConfig) {
    //   this.GamesConfigList = JSON.parse(GamesConfig)
    // }
    // console.log("GamesConfig", this.GamesConfigList)
    // // console.log("GamesConfig", this.GamesConfigList.games)
    // this.gamesListofarrays = this.GamesConfigList.games

    // console.log("gamesListofarraysss", this.gamesListofarrays)
    // this.gamescaption = [];
    // for (let i = 0; i < this.gamesListofarrays.length; i++) {

    //   if (this.gamesListofarrays[i].caption) {

    //     if (this.gamesListofarrays[i].name.startsWith("POKER_")) {
    //       this.gamescaption.push(this.gamesListofarrays[i].caption);

    //     }

    //     if (this.gamesListofarrays[i].name.startsWith("POKER_")) {
    //       this.onlyPokerGames.push(this.gamesListofarrays[i])
    //       this.allGammeNames.push(this.gamesListofarrays[i].caption)
    //       this.allGammeNamesWithCurrency.push(this.gamesListofarrays[i].name)
    //     }

    //   }
    //   console.log("allGammeNamesWithCurrency", this.allGammeNamesWithCurrency)


    // }

    // this.checkboxesIndivisualGames = this.allGammeNames.filter((item: any, i: number) => {
    //   return this.allGammeNames.indexOf(item) == i;
    // })
    // console.log("allGammeNames    :   ", this.checkboxesIndivisualGames);

    // console.log("onlyPokerGames", this.onlyPokerGames)
    // console.log("gamescaption", this.gamescaption)


    // this.uniquegamescaption = this.gamescaption.filter((item: any, i: number) => {
    //   console.log(item)
    //   if (this.gamescaption.indexOf(item) === i) {
    //     this.filterItem.push(this.onlyPokerGames[i])
    //   }
    //   return this.gamescaption.indexOf(item) === i
    // })
    // console.log("uniquegamescaption", this.uniquegamescaption);
    // console.log("FillterItem", this.filterItem);

    let list:any = this.GamesofpokerService.GamesConfig();
    console.log(list)
    this.filterItem = list[0] //*Required
      this.allGammeNamesWithCurrency =list[1] //*Notrequired
      this.gamescaption = list[2] //*Required
      this.allGammeNames = list[3] //*Notrequired
      this.onlyPokerGames =list[4] //*Notrequired
      this.uniquegamescaption =list[5] //*Notrequired
      this.checkboxesIndivisualGames = list[6] //*Notrequired

      for(let k=0; k<this.filterItem.length;k++){
        this.checkedList[k] = true
      }

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

    const { selectedFillterGames, gamesTobeSelected, checkedList,pokerGamesCheckbox } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;
    this.checkedList = checkedList;
    this.pokerGamesCheckbox = pokerGamesCheckbox;

    


  }






  onFormSubmit() {


    // firstRecord
    // maxCountRecord
    // brandedTourney:false
    // gameNames
    // makeADeal:false;
    // manualPrizePoolTourney:false
    // synchronizedTourney:false
    // tourneyType:
    // onlySatellites:false;
    // registering:false

    this.popupArrow = false
    this.SitandGoList = false
    this.loader = true;
    this.pokerGamesLoader = true
    let filterbody = this.getDirtyValues(this.filterForm)

    if (this.filterForm.value.maxCountRecord > 1) {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    } else {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord - 1 / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    }
    // if (this.PageCount = this.SitandGoList.length) {

    //   this.pagecontrolbtn = true
    // }
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }

    filterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    filterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    // filterbody["gameNames"] = this.pokersitngoformgroup.value.Game;
    filterbody["gameNames"] = this.selectedFillterGames.length ===0?this.allGammeNamesWithCurrency:this.selectedFillterGames;
    filterbody["tourneyType"] = this.TourneyTypeList[1].guid;
    filterbody["brandedTourney"] = false;
    filterbody["makeADeal"] = false;
    filterbody["manualPrizePoolTourney"] = this.filterForm.value.ManualPrizePool == true ? this.filterForm.value.ManualPrizePool : false;
    filterbody["synchronizedTourney"] = false;
    filterbody["onlySatellites"] = false;
    filterbody["registering"] = false;
    filterbody["totalCost"] = this.filterForm.value.TotalCostFrom != null ? { "low": this.filterForm.value.TotalCostFrom, "high": this.filterForm.value.TotalCostTo } : undefined;
    filterbody["buyIn"] = this.filterForm.value.BuyInFrom != null ? { "low": this.filterForm.value.BuyInFrom, "high": this.filterForm.value.BuyInTo } : undefined;
    filterbody["fee"] = this.filterForm.value.FeeFrom != null ? { "low": this.filterForm.value.FeeFrom, "high": this.filterForm.value.FeeTo } : undefined;
    filterbody["knockoutBounty"] = this.filterForm.value.KnockoutBountyFrom != null ? { "low": this.filterForm.value.KnockoutBountyFrom, "high": this.filterForm.value.KnockoutBountyTo } : undefined;
    filterbody["status"] = this.filterForm.value.Status != this.StutusList[0].guid ? this.filterForm.value.Status : undefined;
    // filterbody["reportPeriod"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate +"T"+ this.filterForm.value.startTime , "end": this.filterForm.value.endDate + "T"+  this.filterForm.value.endTime } : undefined
    // filterbody["reportPeriod"] = this.filterForm.value.repotingstart != null ? { "start": this.filterForm.value.repotingstart, "end": this.filterForm.value.repotingend } : undefined
    this.pokergamesService.PokerSitngos(filterbody).subscribe(data => {
      this.getPokerData(data)
    },
      error => {
        this.loader = false;
        this.pokerGamesLoader = false;
      }
    )
  }


  getPokerData(data: any) {
    console.log(data);
    this.loader = false;
    if (data.objectList) {
      this.pokerGamesLoader = false;
      this.SitandGoList = data.objectList;
      this.ResultCount = data.resultCount;
      this.rowsOnthePage = data.objectList.length;
    }


    if (this.ResultCount !== null || this.ResultCount == 0) {
      this.resultcount = false;
    }
    if (this.SitandGoList != null || this.SitandGoList.resultCount == 0) {
      this.loader = false;
    }

    for (let i = 0; i < this.SitandGoList.length; i++) {

      for (let m = 0; m < this.walletlists.length; m++) {
        if (this.SitandGoList[i].totalCost.wallet.lowLong == this.walletlists[m].guid.lowLong) {
          this.SitandGoList[i].totalCost.wallet = this.walletlists[m].description
        }
      }
      for (let j = 0; j < this.StutusList.length; j++) {
        if (this.SitandGoList[i].status.lowLong == this.StutusList[j].guid.lowLong) {
          this.SitandGoList[i].status = this.StutusList[j].value
        }
      }
      // for (let k = 0; k < this.gamescaption.length; k++) {
      //   if (this.SitandGoList[i].gameName == this.gamescaption[k].name) {
      //     this.SitandGoList[i].gameName = this.gamescaption[k].caption
      //   }
      // }

      for (let k = 0; k < this.onlyPokerGames.length; k++) {
        if (this.SitandGoList[i].gameName == this.onlyPokerGames[k].name) {
          this.SitandGoList[i].gameName = this.onlyPokerGames[k].caption
        }
      }


    }
    if (this.SitandGoList) {

      this.sumOfRow(this.SitandGoList)
    }
  }

  sumOfRow(data: any) {
    this.obj = data
    console.log(this.obj);
    this.TotalCostValue = this.obj.reduce((a: any, b: { totalCost: any; }) => (a + b.totalCost.value), 0);
    console.log(this.TotalCostValue)
    this.BuyInValue = this.obj.reduce((a: any, b: { buyIn: any; }) => (a + b.buyIn.value), 0);
    console.log(this.BuyInValue)
    this.FeeValue = this.obj.reduce((a: any, b: { fee: any; }) => (a + b.fee.value), 0);
    console.log(this.FeeValue)
    this.knockoutBountyValue = this.obj.reduce((a: any, b: { knockoutBounty: any; }) => (a + b.knockoutBounty.value), 0);
    console.log(this.knockoutBountyValue)
    this.ChipsPerPlayerValue = this.obj.reduce((a: any, b: { chipsPerPlayer: any; }) => (a + b.chipsPerPlayer.value), 0);
    console.log(this.ChipsPerPlayerValue)
  }
  PlayerPopup(data: any) {
    console.log(data)
    this.PlayerSitandGoData = this.SitandGoList[data];
    console.log(this.PlayerSitandGoData)
    this.PlayerSitandGoDatapopup = true;
  }

  closepopup() {
    this.PlayerSitandGoDatapopup = false;
  }

  showmanu(index: any,) {
    this.PlayerSitandGoData = this.SitandGoList[index];
    console.log(this.PlayerSitandGoData)
    this.popupArrow = !this.popupArrow
    this.SeletedIconIndex = index
  }
  SitnGoActions(name: any) {
    this.popupArrow = false
    if (name == "Edit") {
      // this.SeletedIconIndex = index;
      // this.PlayerTournamentData = this.PokerTournamentList[index];
      this.PlayerEditSitNgoDatapopup = true;
      this.PlayerSitandGoDatapopup = false;
    }
    if (name == "EnableDisable") {
      this.SpinnwerT = true;
      let body = {
        "tournamentSettingsGuid": this.PlayerSitandGoData.guid,
        "enable": (this.PlayerSitandGoData.enableNow === true ? false : true),
        "forceSave": true
      }
      console.log(body);
      this.pokergamesService.enableTournament(body).subscribe(data => {
        console.log(data)
        if(data.changedObjectList){
          this.SpinnwerT=false;
          this.onFormSubmit()
        }
      })
    }



  }
  editTournySave() {
    this.CreatePokerSitnGoComponent?.onFormSubmit()
  }
  editTournyCancel() {
    this.PlayerEditSitNgoDatapopup = false;
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
    if (this.PageCount > this.SitandGoList.length) {

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
    if (this.PageCount > this.SitandGoList.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }


  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PokersitngotExcelSheet.xlsx';
    XLSX.writeFile(wb, 'PokersitngotExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element,"PokersitngotExcelSheet")
  }
  showDate(data:any) { 
    console.log(this.filterForm.value.endDate)
    if( this.filterForm.value.startDate > this.filterForm.value.endDate){
      
      this.steddate = true;
      } else {
        this.steddate = false;
      }
    
    if( this.filterForm.value.startDate == this.filterForm.value.endDate){
        if(this.filterForm.value.startTime > this.filterForm.value.endTime){
          this.timeerror = true;
        }else{
          this.timeerror = false;
        }
        }else{
          this.timeerror = false;
        }

    this.filterForm.valueChanges.subscribe(x => { 
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()){
       console.log("indirect")
        console.log(this.filterForm.value.endDate)
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    }); 
  }

  showhistory(string:boolean){
    this.PlayerEditSitNgoDatapopup=string;
    this.onFormSubmit();
  }
  timechange(data: any) {
    console.log(data.target.value)
    console.log(this.filterForm.value.startTime)
    console.log(this.filterForm.value.endTime)
    if( this.filterForm.value.startDate == this.filterForm.value.endDate){
      if(this.filterForm.value.startTime > this.filterForm.value.endTime){
        this.timeerror = true;
      }else{
        this.timeerror = false;
      }
      } 
   
  }
}
