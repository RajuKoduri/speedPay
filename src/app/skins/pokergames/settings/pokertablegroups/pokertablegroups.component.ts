import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CreatePokerTableGroupComponent } from 'src/app/skins/admin-control/create-poker-table-group/create-poker-table-group.component';

import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-pokertablegroups',
  templateUrl: './pokertablegroups.component.html',
  styleUrls: ['./pokertablegroups.component.css']
})
export class PokertablegroupsComponent implements OnInit {

  @ViewChild(CreatePokerTableGroupComponent) CreatePokerTableGroupComponent: CreatePokerTableGroupComponent | undefined


  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};


  Fillterdata: boolean = false
  pokerGamesGroupList: any;
  pokerGamesLoader: boolean = true;
  loader: boolean = false;
  filterForm: FormGroup;
  ChatAccessName: any;


  p: number = 1;
  selectnum: number = 10;
  selectnumber: number = -5;
  DYIDGAMENAMESlist: any;
  DYIDGAMENAMES: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  walletFormatsList: any;
  walletlists: any = [];
  PokerTableTypeList: any;
  EnabledDisabledAll: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  PlayerTableGroupData: any;
  PlayerTableGroupDatapopup: boolean = false;
  GamesConfigList: any;
  gamescaption: any = [];
  endDate: any;
  startDate: any;
  todaydate: any;
  walletTypesList: any;
  dropDownCheckedList: any = [];
  Filtergamesbtn: boolean = false;
  checkedList: any = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  onlyPokerGames: any = [];
  gamesListofarrays: any = [];
  checkboxesIndivisualGames: any = [];
  allGammeNames: any = [];
  uniquegamescaption: any;
  selectedFillterGames: any = [];
  filterItem: any = [];
  allGamesCheckbox: boolean = true;
  pokerGamesCheckbox: boolean = true;
  gamesTobeSelected: any = "All";
  allGammeNamesWithCurrency: any = [];
  popupArrow: boolean = false
  ActionPlayerdata: any;
  SeletedIconIndex: any;
  ActionType: any;
  enableddisabledepop: boolean = false;
  enableddisbletext: any;
  SpinnwerT: boolean = false;
  DisableEnableTable: any = [];
  steddate: boolean = false
  timeerror: boolean =false;
  startTime:any= "00:00:00"
  endTime:any = "23:59:59"
  constructor(private pokergamesService: PokergamesService, private formBuilder: FormBuilder, 
    private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      skills: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      // Datefrom: new FormControl(),
      // Dateto: new FormControl(),
      Currency: new FormControl(),
      Name: new FormControl(),
      Game: new FormControl(),
      Enabled: new FormControl(),
      Tables: new FormControl(),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
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


    this.DYIDGAMENAMES = localStorage.getItem("DYIDGAMENAMES")
    this.DYIDGAMENAMESlist = JSON.parse(this.DYIDGAMENAMES)
    // console.log(this.DYIDGAMENAMESlist)
    // this.pokertablegroup = this.formBuilder.group({
    //   firstRecord: [1],
    //   maxCountRecord: [100],
    //   repotingstart: [null],
    //   repotingend: [null],
    // })
    let body = {};
    // this.pokergamesService.getPkrTblGroupList(body).subscribe(data => this.getPokerData(data))
    this.walletFormats();
    this.walletTypes();
    this.GamesConfig();
    this.PokerTableType();
    this.Enabled_Disabled_All();
    this.DYIDCHATACCESSIBILITY();

  }
  filterbtn() {
    this.Fillterdata = !this.Fillterdata
  }

  // walletFormats() {
  //   const walletTypes = localStorage.getItem("walletTypes")
  //   if (walletTypes) {
  //     this.walletFormatsList = JSON.parse(walletTypes)
  //     for (let i = 0; i < this.walletFormatsList.length; i++) {
  //       // if (this.walletFormatsList[i].description == "U.S. Dollars" || this.walletFormatsList[i].description == "Chips" || this.walletFormatsList[i].description == "Play Money") {
  //       if (this.walletFormatsList[i].clubGameWallet == true) {

  //         this.walletlists.push(this.walletFormatsList[i])
  //       }
  //     }
  //   }
  //   console.log(this.walletFormatsList)
  //   console.log("walletlists", this.walletlists)
  // }

  walletFormats() {
    const walletFormats = localStorage.getItem("walletFormats")
    if (walletFormats) {
      this.walletFormatsList = JSON.parse(walletFormats)
    }
    console.log("walletFormats", this.walletFormatsList)
  }

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





  PokerTableType() {
    const PokerTableType = localStorage.getItem("PokerTableType");
    if (PokerTableType) {
      this.PokerTableTypeList = JSON.parse(PokerTableType)
    }
    console.log("PokerTableTypeList", this.PokerTableTypeList)
  }
  Enabled_Disabled_All() {
    const Enabled_Disabled_All = localStorage.getItem("Enabled_Disabled_All");
    if (Enabled_Disabled_All) {
      this.EnabledDisabledAll = JSON.parse(Enabled_Disabled_All)
    }
    console.log("Enabled_Disabled_All", this.EnabledDisabledAll)
    this.filterForm.patchValue({
      Enabled: this.EnabledDisabledAll[0].guid
    })
  }
  DYIDCHATACCESSIBILITY() {
    const DYIDCHATACCESSIBILITY = localStorage.getItem("DYIDCHATACCESSIBILITY")
    if (DYIDCHATACCESSIBILITY) {
      this.ChatAccessName = JSON.parse(DYIDCHATACCESSIBILITY)
    }
    console.log("ChatAccessName", this.ChatAccessName)
  }


  // GamesConfig() {
  //   const GamesConfig = localStorage.getItem('GamesConfig')
  //   if (GamesConfig) {
  //     this.GamesConfigList = JSON.parse(GamesConfig)
  //   }
  //   // console.log("GamesConfig", this.GamesConfigList)
  //   console.log("GamesConfig", this.GamesConfigList.games)
  //   let gamesListofarrays = this.GamesConfigList.games

  //   console.log("gamesListofarraysss", gamesListofarrays)
  //   this.gamescaption = [];
  //   for (let i = 0; i < gamesListofarrays.length; i++) {
  //     if (gamesListofarrays[i].caption) {
  //       if (gamesListofarrays[i].name.startsWith("POKER_")) {
  //         this.gamescaption.push(gamesListofarrays[i])
  //       }
  //     }
  //   }
  //   console.log(this.gamescaption)
  // }


  GamesConfig() {
    const GamesConfig = localStorage.getItem('GamesConfig')
    if (GamesConfig) {
      this.GamesConfigList = JSON.parse(GamesConfig)
    }
    console.log("GamesConfig", this.GamesConfigList)
    // console.log("GamesConfig", this.GamesConfigList.games)
    this.gamesListofarrays = this.GamesConfigList.games

    console.log("gamesListofarraysss", this.gamesListofarrays,)
    console.log(" this.gamesListofarrays.length    :", this.gamesListofarrays.length)
    this.gamescaption = [];

    for (let i = 0; i < this.gamesListofarrays.length; i++) {
      console.log(i)
      console.log(this.gamesListofarrays[i].caption);
      if (this.gamesListofarrays[i].caption) {

        // if (this.gamesListofarrays[i].name.startsWith("POKER_")) {
        //   this.gamescaption.push(gamesListofarrays[i])
        // }

        if (this.gamesListofarrays[i].name.startsWith("POKER_")) {
          this.gamescaption.push(this.gamesListofarrays[i].caption)
          this.checkboxesIndivisualGames.push(this.gamesListofarrays[i].caption);
        }

        if (this.gamesListofarrays[i].name.startsWith("POKER_")) {

          this.onlyPokerGames.push(this.gamesListofarrays[i])
          this.allGammeNames.push(this.gamesListofarrays[i].name);
          this.allGammeNamesWithCurrency.push(this.gamesListofarrays[i].name)

        }
      }
    }

    console.log("onlyPokerGames", this.onlyPokerGames)
    console.log("gamescaption", this.gamescaption)


    this.uniquegamescaption = this.gamescaption.filter((item: any, i: number) => {
      console.log(item)
      if (this.gamescaption.indexOf(item) === i) {
        this.filterItem.push(this.onlyPokerGames[i])
      }
      return this.gamescaption.indexOf(item) === i
    })
    console.log("uniquegamescaption", this.uniquegamescaption)
    console.log("FillterItem", this.filterItem)


  }




  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn
    console.log(this.checkedList)

  }


  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    console.log(this.filterForm.value.skills)

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





  // changeCurrencyOption() {
  //   console.log(this.dropDownCheckedList)
  //   this.selectedFillterGames = []
  //   console.log("+++++++++++++====+++++++++", this.filterForm.value.Currency);
  //   console.log("+++++++++++++====+++++++++", this.allGamesCheckbox)

  //   // if(this.dropDownCheckedList.length ==0 && this.allGamesCheckbox == false){
  //   if (this.dropDownCheckedList.length == 0 && this.checkboxesIndivisualGames.length == 0) {
  //     console.log("body:---------------------1")
  //     this.selectedFillterGames = this.gamescaption
  //     this.gamesTobeSelected = []
  //   }


  //   // else if( this.dropDownCheckedList.length == this.walletlists.length && this.allGamesCheckbox == true){
  //   else if (this.dropDownCheckedList.length == this.walletlists.length && this.checkboxesIndivisualGames.length == 0) {
  //     console.log("body:---------------------3")
  //     console.log("1")
  //     this.selectedFillterGames = this.gamescaption
  //     this.gamesTobeSelected = []
  //     console.log(this.selectedFillterGames);
  //     // }else if(this.dropDownCheckedList.length == this.walletlists.length && this.allGamesCheckbox == false){
  //   }

  //   else if (this.dropDownCheckedList.length < this.walletlists.length && this.checkboxesIndivisualGames.length == 0) {
  //     // }else if(this.dropDownCheckedList.length < this.walletlists.length && this.allGamesCheckbox == false){
  //     console.log("body:---------------------5")
  //     // let checkList = [];

  //     for (let i = 0; i < this.onlyPokerGames.length; i++) {
  //       for (let k = 0; k < this.dropDownCheckedList.length; k++) {
  //         if ((this.onlyPokerGames[i].wallet.hiLong == this.dropDownCheckedList[k].guid.hiLong) && (this.onlyPokerGames[i].wallet.lowLong == this.dropDownCheckedList[k].guid.lowLong)) {

  //           this.selectedFillterGames.push(this.onlyPokerGames[i].name);
  //           console.log(this.onlyPokerGames[i].name)


  //         }


  //       }
  //       // checkList[i] = this.gamescaption[i]

  //     }
  //     this.gamesTobeSelected = [];




  //   }

  //   else {
  //     console.log("body:---------------------6")
  //     let checkList = [];
  //     console.log(this.checkboxesIndivisualGames);// available games in array;
  //     console.log(this.filterForm.value.Currency);
  //     console.log(this.onlyPokerGames);
  //     for (let i = 0; i < this.onlyPokerGames.length; i++) {

  //       for (let j = 0; j < this.checkboxesIndivisualGames.length; j++) {
  //         if (this.onlyPokerGames[i].caption == this.checkboxesIndivisualGames[j]) {
  //           console.log(this.onlyPokerGames[i].caption, "++++++++++++++++", this.checkboxesIndivisualGames[j]);
  //           checkList[j] = this.uniquegamescaption[j]
  //           for (let k = 0; k < this.dropDownCheckedList.length; k++) {
  //             // if((this.onlyPokerGames[i].wallet.hiLong == this.filterForm.value.Currency.hiLong) &&(this.onlyPokerGames[i].wallet.lowLong == this.filterForm.value.Currency.lowLong)){

  //             if ((this.onlyPokerGames[i].wallet.hiLong == this.dropDownCheckedList[k].guid.hiLong) && (this.onlyPokerGames[i].wallet.lowLong == this.dropDownCheckedList[k].guid.lowLong)) {
  //               console.log(i)
  //               this.selectedFillterGames.push(this.onlyPokerGames[i].name);
  //               console.log(this.onlyPokerGames[i].name, '.****', this.onlyPokerGames[i].caption)


  //             }


  //           }
  //           break


  //         }


  //         // checkList[j] = this.uniquegamescaption[j]


  //       }

  //     }

  //     this.gamesTobeSelected = checkList;



  //   }
  //   console.log(this.selectedFillterGames)
  //   console.log(this.gamesTobeSelected);
  // }


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
       
        this.gamesTobeSelected = "All"
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






  clickToChangeDateInputStartDate() {
    const timePicker = document.getElementById('srartDate') as HTMLInputElement;
    timePicker.blur();

  }
  clickToChangeDateInputEndtDate() {
    const timePicker = document.getElementById('endDate') as HTMLInputElement;
    timePicker.blur();
  }


  onFormSubmit() {
    this.popupArrow = false;
    this.loader = true;
    this.pokerGamesLoader = false
    this.pokerGamesGroupList = false;

    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)


    let filterbody = this.getDirtyValues(this.filterForm)
    filterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    filterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    filterbody["name"] = this.filterForm.value.Name != null ? this.filterForm.value.Name : undefined
    // filterbody["gameNames"] = this.filterForm.value.Game != null ? [this.filterForm.value.Game] : undefined
    filterbody["gameNames"] = this.selectedFillterGames.length === 0 ? this.allGammeNamesWithCurrency : this.selectedFillterGames;
    filterbody["activity"] = this.filterForm.value.Enabled != null ? this.filterForm.value.Enabled : undefined
    // filterbody["tableType"] = this.filterForm.value.Tables != null ? this.filterForm.value.Tables : undefined
    filterbody["tableType"] = this.PokerTableTypeList[0].guid
    // filterbody["datePeriod"] = this.filterForm.value.Datefrom != null ? { "start": this.filterForm.value.Datefrom, "end": this.filterForm.value.Dateto } : undefi ned
    filterbody["datePeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
    (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;


    this.pokergamesService.getPkrTblGroupList(filterbody).subscribe(data => {
      this.getPokerData(data)
    },
      error => {
        this.loader = false;
        this.pokerGamesLoader = false;
      })
  }
  // filterPokerGroup() {
  //   let body = {
  //     "datePeriod": {
  //       "start": this.filterForm.value.Datefrom,
  //       "end": this.filterForm.value.Dateto
  //     }
  //   }
  //   this.pokergamesService.getPkrTblGroupList(body).subscribe(data => this.getPokerData12(data))
  // }

  getPokerData(data: any) {
    if (data) {
      const myObjData = data.objectList;
      console.log(myObjData);
      this.DisableEnableTable = JSON.parse(JSON.stringify(myObjData))
      this.pokerGamesGroupList = data.objectList;
      // this.pokerGamesGroupList = [...data.objectList];
      console.log(this.DisableEnableTable)

      console.log(this.pokerGamesGroupList)
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount;
    };

    this.pokerGamesLoader = false;
    if (this.pokerGamesGroupList != null || this.pokerGamesGroupList.resultCount == 0) {
      this.loader = false;
    }
    if (this.pokerGamesGroupList !== null) {
      this.resultcount = false;
    }

    for (let i = 0; i < this.pokerGamesGroupList.length; i++) {
      for (let m = 0; m < this.walletlists.length; m++) {
        if (this.pokerGamesGroupList[i].pot?.wallet.lowLong == this.walletlists[m].guid.lowLong) {
          this.pokerGamesGroupList[i].pot.walletName = this.walletlists[m].description
        }
      }
      for (let n = 0; n < this.ChatAccessName.length; n++) {
        if (this.pokerGamesGroupList[i].chatAccessibility.lowLong == this.ChatAccessName[n].guid.lowLong) {
          this.pokerGamesGroupList[i].chatAccessibility = this.ChatAccessName[n].value
        }
      }
      // for (let j = 0; j < this.DYIDGAMENAMESlist.length; j++) {
      //   if (this.pokerGamesGroupList[i]) { }
      // }
      for (let k = 0; k < this.onlyPokerGames.length; k++) {
        if (this.pokerGamesGroupList[i].gameName == this.onlyPokerGames[k].name) {
          this.pokerGamesGroupList[i].gameName = this.onlyPokerGames[k].caption
        }
      }
    }

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }
  promochang(data: any) {
    console.log(data)
    this.p = 1;
    this.selectnum = data;
    this.selectnumber = data;
  }

  PlayerPopup(data: any) {
    console.log(data)
    this.PlayerTableGroupData = this.pokerGamesGroupList[data];
    console.log(this.PlayerTableGroupData)
    this.PlayerTableGroupDatapopup = true;
  }


  closepopupCancel() {
    this.PlayerTableGroupDatapopup = false;
  }
  closepopup() {
    // this.PlayerTableGroupDatapopup = false;
    if (this.CreatePokerTableGroupComponent) {
      this.CreatePokerTableGroupComponent.onFormSubmit()
    }
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
    XLSX.writeFile(wb, 'PokerTableGroupsExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element,"PokerTableGroupsExcelSheet")
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
    if (this.PageCount > this.pokerGamesGroupList.length) {

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
    if (this.ResultCount < (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }
    // if (this.PageCount > this.pokerGamesGroupList.length) {

    //   this.pagecontrolbtn = true
    // }


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
    if (this.PageCount > this.pokerGamesGroupList.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }
  showmanu(index: number, id: any): void {
    this.popupArrow = !this.popupArrow;
    // this.CashoutApporvePopUp = true;
    this.SeletedIconIndex = index;
    console.log(index)
    console.log(id);
    this.ActionPlayerdata = this.DisableEnableTable[index];
    console.log(this.ActionPlayerdata)

  }
  setPlayerActions(Type: any, index: any) {
    this.popupArrow = false;
    this.ActionType = Type;
    console.log(this.ActionType)
    this.enableddisbletext = Type
    switch (Type) {
      case 'Enabled': {
        this.enableddisbletext = 'Enable'
        this.enableddisabledepop = true;

        break;
      }
      case 'disabled': {
        this.enableddisabledepop = true;
        this.enableddisbletext = 'Disable'
        break;
      }

    }

  }
  enabledisabledTable(type: any) {
    if (type == "Yes") {
      this.SpinnwerT = true
      this.enableddisabledepop = false;
      let body = this.ActionPlayerdata
      if (this.ActionType == "Enabled") {
        body.active = true
      }
      if (this.ActionType == "disabled") {
        // body = this.ActionPlayerdata
        body.active = false
      }
      console.log(this.ActionPlayerdata)
      this.pokergamesService.setPokerTableGroupStatus(body).subscribe((data: any) => {
        console.log(data)
        if (data.changedObjectList) {
          this.SpinnwerT = false
          this.onFormSubmit()
        }
      })
    } else {
      this.enableddisabledepop = false
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
}