import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { CreatePokerSatelliteSeriesService } from 'src/app/source/create-poker-satellite-series.service';
import { CreatePokerTouranamentComponent } from 'src/app/skins/admin-control/create-poker-touranament/create-poker-touranament.component';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';



@Component({
  selector: 'app-pokertournaments',
  templateUrl: './pokertournaments.component.html',
  styleUrls: ['./pokertournaments.component.css']
})
export class PokertournamentsComponent implements OnInit {

  @ViewChild(CreatePokerTouranamentComponent) CreatePokerTouranamentComponent: CreatePokerTouranamentComponent |undefined

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};

  Fillterdata: boolean = false;
  Filtergamesbtn: boolean = false;
  PokerTournamentList: any;
  pokerGamesLoader: boolean = false;
  loader: boolean = false;
  loginForm: any = FormGroup;
  pokertournamentgroup: any = FormGroup;
  filterForm: FormGroup;
  wallettype: any;
  wallettypes: any;
  DYIDGAMENAMES: any;
  DYIDGAMENAMESlist: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  GamesConfigList: any;
  gamescaption: any = [];
  TourneyTypeList: any;
  ScheduleTypeList: any;
  StutusList: any;
  walletFormatsList: any;
  walletTypesList: any;
  walletlists: any = [];
  PlayerTournamentData: any;
  PlayerTournamentDatapopup: boolean = false;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  onlyPokerGames: any = [];
  uniquegamescaption: any;
  filterItem: any = [];
  pokerGamesCheckbox: boolean = true;
  selectedFillterGames: any = [];
  allGammeNames: any = [];
  gamesListofarrays: any;
  allGamesCheckbox: boolean = true;
  checkboxesIndivisualGames: any = [];
  checkedList: any = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  gamesTobeSelected: any = "All"
  dropDownCheckedList: any = [];
  allGammeNamesWithCurrency: any = [];
  popupArrow: boolean = false;
  SeletedIconIndex: number = 0;
  PlayerTableGroupDatapopup: boolean = false;
  startDate: any;
  endDate: any;
  todaydate: any;
  timeerror: boolean = false;
  steddate: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  prevButtonCss: boolean = false;
  nextButtonCss: boolean = true;
  saveButton: boolean = false;
  SpinnwerT: boolean = false;
  constructor(private pokergamesService: PokergamesService, private formBuilder: FormBuilder, private GamesofpokerService: GamesofpokerService,
    private FileformatServiceService: FileformatServiceService, private SatelliteSeriesService: CreatePokerSatelliteSeriesService) {
    this.filterForm = new FormGroup({
      skills: new FormControl(),
      // repotingstart: new FormControl(),
      // repotingend: new FormControl(),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      Name: new FormControl(),
      GameName: new FormControl(),
      Currency: new FormControl(),
      TotalCostfrom: new FormControl(),
      TotalCostto: new FormControl(),
      Buyinfrom: new FormControl(),
      Buyinto: new FormControl(),
      Feefrom: new FormControl(),
      Feeto: new FormControl(),
      knockoutBountyfrom: new FormControl(),
      knockoutBountyto: new FormControl(),
      ScheduleType: new FormControl(),
      Status: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
    })
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
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    // // this.dropdownSettings:IDropdownSettings = {
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };







    this.DYIDGAMENAMES = localStorage.getItem("DYIDGAMENAMES")
    this.DYIDGAMENAMESlist = JSON.parse(this.DYIDGAMENAMES)
    console.log(this.DYIDGAMENAMESlist)
    // this.pokertournamentgroup = this.formBuilder.group({
    //   firstRecord: [1],
    //   maxCountRecord: [100],
    //   repotingstart: [null],
    //   repotingend: [null],
    // })
    // let filterbody = {}
    // let body = {};
    // this.pokergamesService.PokerTournaments(body).subscribe(data => this.getPokerData(data))
    this.walletFormats();
    this.walletTypes();
    this.GamesConfig();
    this.TourneyType();
    this.ScheduleType();
    this.DYIDTOURNAMENTSETTINGSSTATUS();
    // this.clickonCheckboxIndivisualGames();

    this.SatelliteSeriesService.previousButton$.subscribe((prev) =>{
      this.prevButtonCss = prev
    });

    this.SatelliteSeriesService.nextsButton$.subscribe((next) => {
      this.nextButtonCss = next
    });

    this.SatelliteSeriesService.saveButton$.subscribe((save) =>{
      this.saveButton = save
    })
  }
  filterbtn() {
    this.Fillterdata = !this.Fillterdata
  }




  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn
    console.log(this.checkedList)

  }


  // onItemSelect(item: any) {
  //   console.log("Selected individual Item");
  //   console.log(item);
  //   console.log(this.selectedItems);
  //   console.log("Selected individual Item ****************");
  // }
  // onSelectAll(items: any) {
  //   console.log("Selected All Item");
  //   console.log(items);
  //   console.log(this.selectedItems)
  //   console.log("Selected All Item++++++++++++++");
  // }


  onItemSelect(item: any) {
    // console.log(item);
    // console.log(this.selectedItems);
    // console.log(this.filterForm.value.skills)

    this.dropDownCheckedList.push(item)

    console.log("selectedCheckBoxList", this.dropDownCheckedList)
    this.changeCurrencyOption()

  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    console.log(this.filterForm.value.skills)
    this.dropDownCheckedList = this.dropDownCheckedList.filter((eachItem: any) => eachItem.description != item.description)

    console.log("selectedCheckBoxList", this.dropDownCheckedList);
    this.changeCurrencyOption()
  }
  onSelectAll(items: any) {
    console.log(items);
    console.log(this.selectedItems);
    console.log(this.filterForm.value.skills)
    this.dropDownCheckedList = items

    console.log("selectedCheckBoxList", this.dropDownCheckedList);
    this.changeCurrencyOption()
  }
  onDeSelectAll(items: any) {
    console.log(items);
    console.log(this.selectedItems);
    console.log(this.filterForm.value.skills)
    this.dropDownCheckedList = []
    console.log("selectedCheckBoxList", this.dropDownCheckedList);
    this.changeCurrencyOption()
  }





  // walletFormats() {
  //   this.wallettype = localStorage.getItem("walletFormats")
  //   this.wallettypes = JSON.parse(this.wallettype)
  //   // console.log(this.wallettypes)
  // }

  walletTypes() {
    const walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      this.walletTypesList = JSON.parse(walletTypes)
      for (let i = 0; i < this.walletTypesList.length; i++) {
        if (this.walletTypesList[i].clubGameWallet == true) {

          this.walletlists.push(this.walletTypesList[i])
        }
      }
    }
    console.log(this.walletTypesList)
    console.log("walletlists", this.walletlists)
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

      //    this.filterForm.patchValue({
      //   skills:this.walletlists[0].guid
      // })

    }

    // this.selectedItems =this.walletlists;
    // this.dropdownSettings:IDropdownSettings = {



    this.dropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };


    // this.dropdownSettings = { 
    //   singleSelection: false, 
    //   text:"Select Countries",
    //   selectAllText:'Select All',
    //   unSelectAllText:'UnSelect All',
    //   enableSearchFilter: true,
    //   classes:"myclass custom-class"
    // };   


  }

  walletFormats() {
    const walletFormats = localStorage.getItem("walletFormats")
    if (walletFormats) {
      this.walletFormatsList = JSON.parse(walletFormats)
    }
    console.log("walletFormats", this.walletFormatsList)
  }

  ScheduleType() {
    const ScheduleType = localStorage.getItem('ScheduleType');
    if (ScheduleType) {
      this.ScheduleTypeList = JSON.parse(ScheduleType)
    }
    console.log("ScheduleTypeList", this.ScheduleTypeList)
    this.filterForm.patchValue({
      ScheduleType: this.ScheduleTypeList[0].guid
    })
  }
  DYIDTOURNAMENTSETTINGSSTATUS() {
    const StutusList = localStorage.getItem('DYIDTOURNAMENTSETTINGSSTATUS');
    if (StutusList) {
      this.StutusList = JSON.parse(StutusList)
    }
    console.log("StutusList", this.StutusList);
    this.filterForm.patchValue({
      Status: this.StutusList[0].guid
    })
  }
  TourneyType() {
    const TourneyType = localStorage.getItem("TourneyType")
    if (TourneyType) {
      this.TourneyTypeList = JSON.parse(TourneyType)
    }
    console.log("TourneyTypeList", this.TourneyTypeList)
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

    //     // if (this.gamesListofarrays[i].name.startsWith("POKER_")) {
    //     //   this.gamescaption.push(gamesListofarrays[i])
    //     // }

    //     if (this.gamesListofarrays[i].name.startsWith("POKER_")) {
    //       this.gamescaption.push(this.gamesListofarrays[i].caption);
    //       // this.checkboxesIndivisualGames.push(this.gamesListofarrays[i].caption);
    //     }

    //     if (this.gamesListofarrays[i].name.startsWith("POKER_")) {
    //       this.onlyPokerGames.push(this.gamesListofarrays[i])
    //       this.allGammeNames.push(this.gamesListofarrays[i].caption)
    //       this.allGammeNamesWithCurrency.push(this.gamesListofarrays[i].name)
    //     }

    //     console.log("allGammeNamesWithCurrency", this.allGammeNamesWithCurrency)
    //   }


    // }

    // this.checkboxesIndivisualGames = this.allGammeNames.filter((item:any,i:number)=>{
    //   return this.allGammeNames.indexOf(item) ==i;
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
    // console.log("uniquegamescaption", this.uniquegamescaption)
    // console.log("FillterItem", this.filterItem)



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



  clickonCheckboxForAllGames(event: any) {
    console.log(event);
    console.log(event.target);
    console.log(event.target.checked);

    for (let i = 0; i < this.onlyPokerGames.length; i++) {
      let checkBoxElement = document.getElementById('checkboxId' + i) as HTMLInputElement;
      let checkboxForallgameCaption = document.getElementById("checkboxForallgameCaption") as HTMLInputElement;

      if (checkBoxElement) {

        if (checkboxForallgameCaption.checked == true) {
          // checkBoxElement.checked = !this.pokerGamesCheckbox;
          checkBoxElement.checked = true;
        } else {
          checkBoxElement.checked = false;
        }
        this.allGamesCheckbox = checkboxForallgameCaption.checked


      }

    }
    // this.pokerGamesCheckbox = !this.pokerGamesCheckbox;
    this.changeCurrencyOption();
    this.clickonCheckboxIndivisualGames();
  };



  // clickonCheckboxIndivisualGames(event:any,checkboxId:string){
  clickonCheckboxIndivisualGames() {

    // console.log(typeof(checkboxId));
    // console.log(document.getElementById(checkboxId))
    // let indivisualGameCaption = document.getElementById(checkboxId) as HTMLInputElement;
    let checkboxForallgameCaption = document.getElementById("checkboxForallgameCaption") as HTMLInputElement;


    this.checkboxesIndivisualGames = [];
    for (let i = 0; i <= this.filterItem.length; i++) {
      let checkBoxElement = document.getElementById('checkboxId' + i) as HTMLInputElement;
      if (checkBoxElement) {
        if (checkBoxElement.checked == true) {
          this.checkedList[i] = true;
          this.checkboxesIndivisualGames.push(checkBoxElement.value);

        } else {
          this.checkedList[i] = false;
        }

      }
      // let checkboxForallgameCaption = document.getElementById("checkboxForallgameCaption") as HTMLInputElement;

      // this.allGamesCheckbox = checkboxForallgameCaption.checked


    }
    console.log(this.checkboxesIndivisualGames);


    for (let i = 0; i < this.filterItem.length; i++) {
      let checkBoxElement = document.getElementById('checkboxId' + i) as HTMLInputElement;
      let checkboxForallgameCaption = document.getElementById("checkboxForallgameCaption") as HTMLInputElement;

      if (checkBoxElement) {
        if (checkBoxElement.checked == false) {
          console.log("One OR More checkbox is Unchecked")
          checkboxForallgameCaption.checked = false;
          this.pokerGamesCheckbox = false;
          this.allGamesCheckbox = false;
          break;
        } else {
          console.log("All Checkboxes are Checked")
          checkboxForallgameCaption.checked = true;
          this.pokerGamesCheckbox = true;
          this.allGamesCheckbox = true
        }

      }

    }
    this.changeCurrencyOption()


  }





  changeCurrencyOption() {
    console.log(this.dropDownCheckedList)
    this.selectedFillterGames = [];

    console.log("+++++++++++++====+++++++++", this.allGamesCheckbox)


    if (this.dropDownCheckedList.length == 0 && this.checkboxesIndivisualGames.length == 0) {
      console.log("body:---------------------1")
      this.selectedFillterGames = this.allGammeNamesWithCurrency
      this.gamesTobeSelected = []
    }



    else if (this.dropDownCheckedList.length == this.walletlists.length && this.checkboxesIndivisualGames.length == 0) {
      this.selectedFillterGames = [];
      console.log("body:---------------------3")
      console.log("1")
      this.selectedFillterGames = this.allGammeNamesWithCurrency
      this.gamesTobeSelected = []
      console.log(this.selectedFillterGames);

    }


    else if (this.dropDownCheckedList.length < this.walletlists.length && this.checkboxesIndivisualGames.length == this.uniquegamescaption.length) {
      // this.selectedFillterGames = [];
      console.log("body:---------------------5");
      let checkList = [];


      for (let i = 0; i < this.onlyPokerGames.length; i++) {
        for (let j = 0; j < this.checkboxesIndivisualGames.length; j++) {
          if (this.onlyPokerGames[i].caption == this.checkboxesIndivisualGames[j]) {

            checkList[j] = this.uniquegamescaption[j]
          }
        }
        for (let k = 0; k < this.dropDownCheckedList.length; k++) {
          if ((this.onlyPokerGames[i].wallet.hiLong == this.dropDownCheckedList[k].guid.hiLong) && (this.onlyPokerGames[i].wallet.lowLong == this.dropDownCheckedList[k].guid.lowLong)) {

            this.selectedFillterGames.push(this.onlyPokerGames[i].name);
            break;
          }


        }


      }
      // break;

      if (this.dropDownCheckedList.length == 0) {
        console.log("step-1")
        this.selectedFillterGames = this.allGammeNamesWithCurrency;
        this.gamesTobeSelected = "All";
      } else {
        console.log("step-2")
        //  this.gamesTobeSelected = checkList;
        this.gamesTobeSelected = "All";
      }



    }

    else {
      this.selectedFillterGames = [];
      console.log(this.dropDownCheckedList.length, "    ", this.walletlists.length, "    ", this.checkboxesIndivisualGames.length, "    ", this.uniquegamescaption.length)
      console.log("body:---------------------6");
      let checkList = [];
      console.log(this.checkboxesIndivisualGames.length);// available games in array;
      // console.log(this.filterForm.value.Currency);
      console.log(this.onlyPokerGames);
      for (let i = 0; i < this.onlyPokerGames.length; i++) {
        if (this.checkboxesIndivisualGames.length > 0) {
          console.log("checked done")
          for (let j = 0; j < this.checkboxesIndivisualGames.length; j++) {
            if (this.onlyPokerGames[i].caption == this.checkboxesIndivisualGames[j]) {
              // console.log(this.onlyPokerGames[i].caption, "++++++++++++++++", this.checkboxesIndivisualGames[j]);
              checkList[j] = this.uniquegamescaption[j];

              if (this.dropDownCheckedList.length > 0) {
                for (let k = 0; k < this.dropDownCheckedList.length; k++) {
                  // if((this.onlyPokerGames[i].wallet.hiLong == this.filterForm.value.Currency.hiLong) &&(this.onlyPokerGames[i].wallet.lowLong == this.filterForm.value.Currency.lowLong)){

                  if ((this.onlyPokerGames[i].wallet.hiLong == this.dropDownCheckedList[k].guid.hiLong) && (this.onlyPokerGames[i].wallet.lowLong == this.dropDownCheckedList[k].guid.lowLong)) {
                    this.selectedFillterGames.push(this.onlyPokerGames[i].name);
                    // console.log(this.onlyPokerGames[i].name, '.****', this.onlyPokerGames[i].caption)


                  }


                }
                break

              } else {
                this.selectedFillterGames.push(this.onlyPokerGames[i].name);
              }



            }

            // checkList[j] = this.uniquegamescaption[j]


          }

        } else {
          for (let k = 0; k < this.dropDownCheckedList.length; k++) {
            // if((this.onlyPokerGames[i].wallet.hiLong == this.filterForm.value.Currency.hiLong) &&(this.onlyPokerGames[i].wallet.lowLong == this.filterForm.value.Currency.lowLong)){

            if ((this.onlyPokerGames[i].wallet.hiLong == this.dropDownCheckedList[k].guid.hiLong) && (this.onlyPokerGames[i].wallet.lowLong == this.dropDownCheckedList[k].guid.lowLong)) {
              this.selectedFillterGames.push(this.onlyPokerGames[i].name);
              // console.log(this.onlyPokerGames[i].name, '.****', this.onlyPokerGames[i].caption)


            }


          }

        }



      }

      // this.gamesTobeSelected = checkList;
      console.log(this.checkboxesIndivisualGames.length , this.uniquegamescaption.length)
      if (this.checkboxesIndivisualGames.length == this.uniquegamescaption.length) {
        this.gamesTobeSelected = "ALL"
      } else {
        this.gamesTobeSelected = this.checkboxesIndivisualGames;
      }



    }
    console.log(this.selectedFillterGames)
    console.log(this.gamesTobeSelected);

    let result = {
      selectedFillterGames: this.selectedFillterGames,
      gamesTobeSelected: this.gamesTobeSelected
    }

    return (result)
  }



  onFormSubmit() {
    this.popupArrow = false;
    console.log(this.filterForm.value);

    this.pokerGamesLoader = true
    this.loader = true
    this.PokerTournamentList = false;
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
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }


    console.log(this.filterForm.value.Status);
    console.log(this.filterForm.value.Status == this.StutusList[3].guid);


    filterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    filterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    filterbody["gameNames"] = this.selectedFillterGames.length == 0 ? this.allGammeNamesWithCurrency : this.selectedFillterGames;
    filterbody["caption"] = this.filterForm.value.Name != null ? this.filterForm.value.Name : undefined
    filterbody["brandedTourney"] = false;
    filterbody["makeADeal"] = false;
    filterbody["manualPrizePoolTourney"] = false;
    filterbody["synchronizedTourney"] = false;
    filterbody["onlySatellites"] = false;
    filterbody["registering"] = false;
    filterbody["totalCost"] = this.filterForm.value.TotalCostfrom != null ? { "low": this.filterForm.value.TotalCostfrom, "high": this.filterForm.value.TotalCostto } : undefined;
    filterbody["buyIn"] = this.filterForm.value.Buyinfrom != null ? { "low": this.filterForm.value.Buyinfrom, "high": this.filterForm.value.Buyinto } : undefined;
    filterbody["fee"] = this.filterForm.value.Feefrom != null ? { "low": this.filterForm.value.Feefrom, "high": this.filterForm.value.Feeto } : undefined;
    filterbody["knockoutBounty"] = this.filterForm.value.knockoutBountyfrom != null ? { "low": this.filterForm.value.knockoutBountyfrom, "high": this.filterForm.value.knockoutBountyto } : undefined;
    filterbody["scheduleType"] = this.filterForm.value.ScheduleType !== this.ScheduleTypeList[0].guid ? this.filterForm.value.ScheduleType : undefined;
    filterbody["status"] = this.filterForm.value.Status !== this.StutusList[0].guid ? this.filterForm.value.Status : undefined;
    filterbody["tourneyType"] = this.TourneyTypeList[0].guid;
    // filterbody["reportPeriod"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate +"T"+ this.filterForm.value.startTime , "end": this.filterForm.value.endDate + "T"+  this.filterForm.value.endTime } : undefined
    this.pokergamesService.PokerTournaments(filterbody).subscribe(data => {
      this.getPokerData(data)
    },
      error => {
        this.loader = false;
        this.pokerGamesLoader = false;
        // this.ResultCount = "";
        // this.resultcount = false;
      }

    )
  }
  filterPokerGroup() {
    console.log(this.pokertournamentgroup.value.repotingstart)
    console.log(this.pokertournamentgroup.value.repotingstart)
    let body = {
      "datePeriod": {
        "start": this.pokertournamentgroup.value.repotingstart,
        "end": this.pokertournamentgroup.value.repotingend
      }
    }
    this.pokergamesService.PokerTournaments(body).subscribe(data => this.getPokerData(data))
  }
  getPokerData(data: any) {
    console.log(data);
    if (data) {
      this.loader = false;
      this.pokerGamesLoader = false
      this.PokerTournamentList = data.objectList;
      this.ResultCount = data.resultCount
      if (data.objectList) {
        this.rowsOnthePage = data.objectList.length;
      };
    };
    console.log(data.objectList)


    if (this.ResultCount !== null || data.resultCount == 0) {
      this.resultcount = false;
      console.log(this.resultcount);
    }
    if (this.PokerTournamentList != null || this.PokerTournamentList.resultCount == 0) {
      this.loader = false;
    }
    if (this.PokerTournamentList) {
      for (let i = 0; i < this.PokerTournamentList.length; i++) {
        for (let n = 0; n < this.StutusList.length; n++) {
          if (this.PokerTournamentList[i].status.lowLong == this.StutusList[n].guid.lowLong) {
            this.PokerTournamentList[i].status = this.StutusList[n].value
          }
        }
        // for (let j = 0; j < this.gamescaption.length; j++) {
        //   if (this.PokerTournamentList[i].gameName == this.gamescaption[j].name) {
        //     this.PokerTournamentList[i].gameName = this.gamescaption[j].caption
        //   }
        // }
        for (let m = 0; m < this.walletFormatsList.length; m++) {
          if (this.PokerTournamentList[i].totalCost.wallet.lowLong == this.walletFormatsList[m].guid.lowLong) {
            if (this.walletFormatsList[m].currencyCode) {
              this.PokerTournamentList[i].totalCost.wallet = this.walletFormatsList[m].currencyCode
            } else {
              if (this.walletFormatsList[m].currencyCode) {
                this.PokerTournamentList[i].totalCost.wallet = this.walletFormatsList[m].symbol
              }
            }
          }
        }
        for (let n = 0; n < this.ScheduleTypeList.length; n++) {
          if (this.PokerTournamentList[i].shedule.type.lowLong == this.ScheduleTypeList[n].guid.lowLong) {
            this.PokerTournamentList[i].shedule.type = this.ScheduleTypeList[n].value
          }
        }
        for (let k = 0; k < this.onlyPokerGames.length; k++) {
          if (this.PokerTournamentList[i].gameName == this.onlyPokerGames[k].name) {
            this.PokerTournamentList[i].gameName = this.onlyPokerGames[k].caption
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
  PlayerPopup(data: any) {
    console.log(data)
    this.PlayerTournamentData = this.PokerTournamentList[data];
    console.log(this.PlayerTournamentData)
    this.PlayerTournamentDatapopup = true;
  }


  showmanu(index: number) {
    this.popupArrow = !this.popupArrow;
    this.SeletedIconIndex = index;
    this.PlayerTournamentDatapopup = false;

    this.PlayerTournamentData = this.PokerTournamentList[index];
    console.log(this.PlayerTournamentData)


  }

  editTournamentPopup(index: number) {
    this.SeletedIconIndex = index;
    this.PlayerTournamentData = this.PokerTournamentList[index];
    this.PlayerTableGroupDatapopup = true;
    this.PlayerTournamentDatapopup = false;
    this.popupArrow = false;

  }

  SitnGoActions(name: any) {
    this.popupArrow = false

    if (name == "EnableDisable") {
      this.SpinnwerT = true;
      let body = {
        "tournamentSettingsGuid": this.PlayerTournamentData.guid,
        "enable": (this.PlayerTournamentData.enableNow === true ? false : true),
        "forceSave": true
      }
      console.log(body);
      this.pokergamesService.enableTournament(body).subscribe(data => {
        console.log(data)
        if (data.changedObjectList) {
          this.SpinnwerT = false;
          this.onFormSubmit()
        }
      })
    }

  }
  closepopup() {
    this.PlayerTournamentDatapopup = false;
  }

  editTournyPop(type: any) {
   
    if (type == "yes") {
    
      // if(this.CreatePokerTouranamentComponent){
        this.CreatePokerTouranamentComponent?.onFormSubmit();
        // this.PlayerTableGroupDatapopup = false;
      // }
      
    } else {
      this.PlayerTableGroupDatapopup = false;
    }

    this.prevButtonCss = false;
    this.nextButtonCss  = true;

  }

  clickOnCloseEditPopup(string:boolean){
    this.PlayerTableGroupDatapopup = string;
    this.onFormSubmit();
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
    if (this.PageCount > this.PokerTournamentList.length) {
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
    if (this.PageCount > this.PokerTournamentList.length) {
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
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'PokerTournamentExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PokerTournamentExcelSheet")
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

  changeToPreviousTabs() {
    this.CreatePokerTouranamentComponent?.changeToPreviousTabs();

  }

  changeToNextTabs() {
    this.CreatePokerTouranamentComponent?.changeToNextTabs()
  }
}