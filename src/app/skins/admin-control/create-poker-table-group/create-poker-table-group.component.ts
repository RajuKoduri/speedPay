import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit, AfterContentChecked ,AfterContentInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-poker-table-group',
  templateUrl: './create-poker-table-group.component.html',
  styleUrls: ['./create-poker-table-group.component.css']
})
export class CreatePokerTableGroupComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked,AfterContentInit {
  @Input() PlayerTableGroupData: any = null;
  CreatePokerTableForm: FormGroup
  wallettypelist: any;
  currencyList: any = [];
  ChatAccessList: any;
  RakeStructurelist: any = [];
  UserAccessRulesResData: any;
  usertypeList: any;
  UserAccessAreaList: any;
  DYIDGAMENAMESList: any;
  GamesConfigList: any;
  onlyPokerGames: any = [];
  uniquegamescaption: any;
  selectedCurrency: any;
  selectedTable: any;
  Onlygamescaption: any = [];
  ErrorPopup: boolean = false;
  CreateTableRes: any;
  CreateSuccessPop: boolean = false;
  FormGroupErrorPopup: boolean = false;
  SelectMoneyErrorMsg: any;
  SelectGameErrorMsg: any;
  StakesErrorMessage: string = "";
  BuyInErrorMessage: string = "";
  isStakesDisable: boolean = false;
  isBuyInDisable: boolean = false;
  myNumber: number = 42;
  anotherNumber: number = 100;
  TableGroupNameError: boolean = false;
  selectDropDownValue: any = "";
  selectSecongOptionValue: string = "";
  seatsNumberErrorMessage: any;
  seatsNumberCondition: boolean = false;
  actionTimeOutCondition: boolean = false;
  actionTimeOutErrorMessage: any;
  from: any
  to: any




  sFrom: any = 0;
  sT: any = 0;
  bInF: any = 0;
  bInT: any = 0;
  firstInputValue: any;
  timeForecdElement: boolean = true;
  EditGameTypesValue: any;
  successMessage: string = "";


  constructor(private PokergamesService: PokergamesService, private PlayerServiceService: PlayerServiceService, private router: Router, private formBuilder: FormBuilder) {
    // this.CreatePokerTableForm = new FormGroup
    // this.walletTypes();
    this.CreatePokerTableForm = this.formBuilder.group({
      // [Validators.required,Validators.minLength(5),Validators.pattern(".*\\S.*[a-zA-z0-9_-]"),Validators.pattern('[a-zA-Z0-9]*'),Validators.pattern(/^\S*$/)]
      MoneyType: new FormControl("", [Validators.required,]),
      GameType: new FormControl("", [Validators.required,]),
      TableGroupName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50),]),
      Password: new FormControl("", [Validators.required,]),
      StakesFrom: new FormControl(0, [Validators.required,]),
      StakesTo: new FormControl(0, [Validators.required,]),
      BuyInFrom: new FormControl("", [Validators.required,]),
      BuyInTo: new FormControl("", [Validators.required,]),
      Seats: new FormControl(2, [Validators.required,]),
      ActionTimeOut: new FormControl(30, [Validators.required,]),
      TimeBank: new FormControl(60, [Validators.required,]),
      TimeBankautoincrementamount: new FormControl("10", [Validators.required,]),
      DisconnectionProtection: new FormControl(false, [Validators.required,]),
      AccessRule: new FormControl("", [Validators.required,]),
      RakeStructure: new FormControl("", [Validators.required,]),
      ChatAccesability: new FormControl(this.firstInputValue, [Validators.required,]),
      BadbetjackpotTable: new FormControl(true, [Validators.required,]),
      RunItTwice: new FormControl(true, [Validators.required,]),
      Bounty: new FormControl(false, [Validators.required,]),
      RakeBack: new FormControl(false, [Validators.required,]),



      TimeForced: new FormControl(false),
      TimeFocedTimeSec: new FormControl(),

      Bombpotathand: new FormControl(),
      Nohandshidestack: new FormControl(),
      Nohandshidenickname: new FormControl(),


      ThirdBlind: new FormControl(false),
      RabbitHunting: new FormControl(false),
      RitHunting: new FormControl(false),
      straddle: new FormControl(false)

      // "address": new FormGroup({
      //   nickname: new FormControl(),
      // })
    })
  }
 

  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['PlayerTableGroupData'] && changes['PlayerTableGroupData']['currentValue']) {
      this.PlayerTableGroupData = changes['PlayerTableGroupData']['currentValue'];

      console.log(this.PlayerTableGroupData);


      this.EditGameTypesValue = this.PlayerTableGroupData?.gameName

      console.log("aaaa", this.PlayerTableGroupData?.gameName)


      // this.selectSecongOptionValue = this.PlayerTableGroupData?.gameName;

      console.log(this.CreatePokerTableForm.value.GameType)
      console.log(this.EditGameTypesValue)
      this.CreatePokerTableForm.get('GameType')?.setValue(this.PlayerTableGroupData?.gameName);
      const moneyTypeButton = document.getElementById("selectedCurrency") as HTMLButtonElement;
      const gameTypeButton = document.getElementById("GameType") as HTMLButtonElement;
      moneyTypeButton.setAttribute("disabled", '')
      gameTypeButton.setAttribute("disabled", '')




    }



  }




  ngOnInit(): void {
    this.getRakeStructureList();
    this.walletTypes();
    this.DYIDCHATACCESSIBILITY();
    this.usertype();
    this.UserAccessArea();
    this.DYIDGAMENAMES();
    this.GamesConfig();
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips" || this.wallettypelist[i].description == "Play Money") {
        // if (this.wallettypelist[i].description == "Argentine Peso") {
        if (this.wallettypelist[i].clubGameWallet == true && this.wallettypelist[i].description != "Play Money") {
          // if (this.wallettypelist[i].clubGameWallet == true) {
          this.currencyList.push(this.wallettypelist[i])
          console.log(this.currencyList)
          this.selectedCurrency = this.currencyList[0].guid;
          if (this.currencyList[0].guid) {
            console.log("sent Successfully")
            console.log(this.selectedCurrency);
            this.onSelected(this.selectedCurrency);
          }
          // if(this.currencyList[0].guid){

          // }
        }
      }
      // this.selectedCurrency = this.currencyList[6].guid
      // this.onSelected(this.selectedCurrency);

      console.log("currencyList", this.currencyList);
      console.log("default Select Value :  " + this.currencyList[0]?.description);
      console.log("guid  :  ");
      console.info(this.selectedCurrency);
      console.log("wallettypelist", this.wallettypelist);
    }





    if (this.CreatePokerTableForm.value.TimeForced) {

      this.timeForecdElement = false;
      this.CreatePokerTableForm.get("TimeFocedTimeSec")?.enable();

    } else {
      this.CreatePokerTableForm.patchValue({
        TimeFocedTimeSec: 0
      });
      this.timeForecdElement = true;
      this.CreatePokerTableForm.get("TimeFocedTimeSec")?.disable();

    }

    this.CreatePokerTableForm.get("TimeForced")?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.timeForecdElement = false;
        this.CreatePokerTableForm.get("TimeFocedTimeSec")?.enable();
      } else {
        this.CreatePokerTableForm.patchValue({
          TimeFocedTimeSec: 0
        });
        this.timeForecdElement = true;
        this.CreatePokerTableForm.get("TimeFocedTimeSec")?.disable();
      }
    })

    // this.CreatePokerTableForm.get("straddle")?.valueChanges.subscribe((checked)=>{
    //   if(checked){

    //   }
    // })


  }

  
  ngAfterViewInit(): void {
    if (this.PlayerTableGroupData != null) {
      console.log(this.PlayerTableGroupData?.pot?.wallet);
      this.CreatePokerTableForm.patchValue({
        // MoneyType: this.PlayerTableGroupData?.pot.wallet,
        GameType: this.PlayerTableGroupData?.gameName,

      })
      //  this.selectedCurrency = this.PlayerTableGroupData?.pot.wallet;

      // this.firstInputValue = this.ChatAccessList[1].guid

      for (let each of this.ChatAccessList) {
        if (each.value == this.PlayerTableGroupData?.chatAccessibility) {
          this.firstInputValue = each.guid

        }
      }


      this.CreatePokerTableForm.patchValue({
        // MoneyType: this.PlayerTableGroupData?.pot.wallet,
        GameType: this.PlayerTableGroupData?.gameName,
        TableGroupName: this.PlayerTableGroupData?.name,
        Password: this.PlayerTableGroupData?.Password,
        StakesFrom: this.PlayerTableGroupData?.lowStake.value,
        StakesTo: this.PlayerTableGroupData?.highStake.value,
        BuyInFrom: this.PlayerTableGroupData?.minBuyIn.value,
        BuyInTo: this.PlayerTableGroupData?.maxBuyIn.value,
        Seats: this.PlayerTableGroupData?.seats,
        ActionTimeOut: this.PlayerTableGroupData?.actionTimeout / 1000,
        TimeBank: this.PlayerTableGroupData?.initialTimeBank / 1000,
        TimeBankautoincrementamount: this.PlayerTableGroupData?.additionalTimeBank / 1000,
        DisconnectionProtection: this.PlayerTableGroupData?.disconnectionProtection,
        TimeForced: this.PlayerTableGroupData?.timeForced,
        TimeFocedTimeSec: this.PlayerTableGroupData?.timeForcedTime,
        AccessRule: this.PlayerTableGroupData?.accessRuleName,
        // RakeStructure: this.PlayerTableGroupData?.rakeStructureId,
        ChatAccesability: this.firstInputValue,
        Bombpotathand: this.PlayerTableGroupData?.bombPotNumberHand,
        Nohandshidestack: this.PlayerTableGroupData?.noOfHandsToHidePlayerStack,
        Nohandshidenickname: this.PlayerTableGroupData?.noOfHandsToHidePlayerData,
        BadbetjackpotTable: this.PlayerTableGroupData?.jackpot,
        RunItTwice: this.PlayerTableGroupData?.runItTwice,
        ThirdBlind: this.PlayerTableGroupData?.thirdBlind,
        RabbitHunting: this.PlayerTableGroupData?.rabbitHunting,
        RitHunting: this.PlayerTableGroupData?.ritForced,
        straddle: this.PlayerTableGroupData?.thirdBlindFoldForcedStrDdl,


      })



      this.sFrom = this.PlayerTableGroupData?.lowStake.value;
      this.sT = this.PlayerTableGroupData?.highStake.value;
      this.bInF = this.PlayerTableGroupData?.minBuyIn.value;
      this.bInT = this.PlayerTableGroupData?.maxBuyIn.value;

      if (this.PlayerTableGroupData?.active == true) {

        this.CreatePokerTableForm.disable();

        // this.CreatePokerTableForm.get('TableGroupName')?.disable();
        // this.CreatePokerTableForm.get('Password')?.disable();
        // this.CreatePokerTableForm.get('StakesFrom')?.disable();
        // this.CreatePokerTableForm.get('StakesTo')?.disable();
        // this.CreatePokerTableForm.get('BuyInFrom')?.disable();
        // this.CreatePokerTableForm.get('BuyInTo')?.disable();
        // this.CreatePokerTableForm.get('Seats')?.disable();
        // this.CreatePokerTableForm.get('ActionTimeOut')?.disable();
        // this.CreatePokerTableForm.get('TimeBank')?.disable();
        // this.CreatePokerTableForm.get('TimeBankautoincrementamount')?.disable();
        // this.CreatePokerTableForm.get('DisconnectionProtection')?.disable();
        // this.CreatePokerTableForm.get('TimeForced')?.disable();
        // this.CreatePokerTableForm.get('TimeFocedTimeSec')?.disable();
        // this.CreatePokerTableForm.get('AccessRule')?.disable();
        // this.CreatePokerTableForm.get('RakeStructure')?.disable();
        // this.CreatePokerTableForm.get('ChatAccesability')?.disable();
        // this.CreatePokerTableForm.get('Bombpotathand')?.disable();
        // this.CreatePokerTableForm.get('Nohandshidestack')?.disable();
        // this.CreatePokerTableForm.get('Nohandshidenickname')?.disable();
        // this.CreatePokerTableForm.get('BadbetjackpotTable')?.disable();
        // this.CreatePokerTableForm.get('RunItTwice')?.disable();
        // this.CreatePokerTableForm.get('ThirdBlind')?.disable();
        // this.CreatePokerTableForm.get('RabbitHunting')?.disable();
        // this.CreatePokerTableForm.get('RitHunting')?.disable();
        // this.CreatePokerTableForm.get('straddle')?.disable();


      }


    }



  }



  ngAfterContentChecked() {
    console.log(this.RakeStructurelist)
    if (this.PlayerTableGroupData != null) {
      console.log(this.RakeStructurelist)
      for (let each of this.RakeStructurelist) {
        if (each?.guid?.lowLong == this.PlayerTableGroupData?.rakeStructureId?.lowLong && each?.guid?.highLong == this.PlayerTableGroupData?.rakeStructureId?.highLong) {
          this.CreatePokerTableForm.patchValue({
            RakeStructure: each.guid,
          })
        }
      }
    }
   
  }

  ngAfterContentInit(): void {
   
  }

  clickonstraddle() {
    if (this.CreatePokerTableForm.value.straddle) {
      this.CreatePokerTableForm.patchValue({
        ThirdBlind: true
      })
    } else {
      this.CreatePokerTableForm.patchValue({
        ThirdBlind: false
      })

    }
  }

  clickonRitHunting() {
    if (this.CreatePokerTableForm.value.RitHunting) {
      this.CreatePokerTableForm.patchValue({
        RunItTwice: true
      })
    } else {
      this.CreatePokerTableForm.patchValue({
        RunItTwice: false
      })

    }

  }





  // ngOnChanges(changes: SimpleChanges): void {
  //   // Check for changes in the input property
  //   if (changes.parentData && changes.parentData.currentValue) {
  //     // Call the function when the input data changes
  //     this.childFunction();
  //   }
  // }



  seatcount(event: any) {
    console.log(this.CreatePokerTableForm.value.Seats)
    let fieldValue = this.CreatePokerTableForm.value.Seats;
    if (fieldValue >= 2 && fieldValue <= 10) {
      this.seatsNumberCondition = false;
      this.seatsNumberErrorMessage = "";


    } else {
      this.seatsNumberCondition = true;
      this.seatsNumberErrorMessage = "'Seats' must be between 2 and 10";

    }

  }

  changeActionTimeOut(event: any) {
    console.log(this.CreatePokerTableForm.value.ActionTimeOut)
    let time = this.CreatePokerTableForm.value.ActionTimeOut
    if (time < 1 || time == "") {
      this.actionTimeOutCondition = true;
      this.actionTimeOutErrorMessage = "Seconds Should Be Postive or More Then Zero"
    } else {
      this.actionTimeOutCondition = false;
      this.actionTimeOutErrorMessage = "";
    }

  }

  get f() {
    // console.log(this.CreateAdminForm.value.loginName.key)
    return this.CreatePokerTableForm.controls;
  }
  DYIDCHATACCESSIBILITY() {
    const DYIDCHATACCESSIBILITY = localStorage.getItem("DYIDCHATACCESSIBILITY")
    if (DYIDCHATACCESSIBILITY) {
      this.ChatAccessList = JSON.parse(DYIDCHATACCESSIBILITY)
    }
    console.log("ChatAccessList", this.ChatAccessList)
    this.firstInputValue = this.ChatAccessList[2].guid
    console.log(this.ChatAccessList[1].guid)
  }
  walletTypes() {
    // const walletstypes = localStorage.getItem('walletTypes');
    // if (walletstypes) {
    //   this.wallettypelist = JSON.parse(walletstypes);
    //   console.log(this.wallettypelist)
    //   for (let i = 0; i < this.wallettypelist.length; i++) {
    //     // if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips" || this.wallettypelist[i].description == "Play Money") {
    //     if (this.wallettypelist[i].clubGameWallet == true) {
    //         this.currencyList.push(this.wallettypelist[i])
    //         this.selectedCurrency = this.currencyList[0].guid;
    //         this.selectedCurrency = this.currencyList[0].guid;
    //          if( this.currencyList[0].guid){
    //           console.log("sent Successfully")
    //           console.log(this.selectedCurrency);
    //           this.onSelected(this.selectedCurrency);
    //     }
    //       }
    //   }
    //   console.log("currencyList", this.currencyList);
    //   console.log("default Select Value :  " + this.currencyList[0].description);
    //   console.log("guid  :  ");
    //   console.info(this.selectedCurrency);
    //   console.log("wallettypelist", this.wallettypelist);
    // } 

  }

  //   walletTypes() {
  //   const walletstypes = localStorage.getItem('walletTypes');
  //   if (walletstypes) {
  //     this.wallettypelist = JSON.parse(walletstypes); 
  //     console.log(this.wallettypelist)
  //     for (let i = 0; i < this.wallettypelist.length; i++) {
  //       // if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips" || this.wallettypelist[i].description == "Play Money") {
  //       if (this.wallettypelist[i].clubGameWallet == true) {
  //         this.currencyList.push(this.wallettypelist[i])
  //         console.log(this.wallettypelist[i]);
  //       }
  //     }
  //     console.log("currencyList", this.currencyList)
  //     console.log("wallettypelist", this.wallettypelist)

  //   }
  // }


  usertype() {
    const usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertypeList", this.usertypeList)
    console.log("usertypeList", this.usertypeList[0].guid)
  }
  UserAccessArea() {
    const UserAccessArea = localStorage.getItem('UserAccessArea')
    if (UserAccessArea) {
      this.UserAccessAreaList = JSON.parse(UserAccessArea)
    }
    console.log("UserAccessAreaList", this.UserAccessAreaList)
  }
  DYIDGAMENAMES() {
    const DYIDGAMENAMES = localStorage.getItem("DYIDGAMENAMES")
    if (DYIDGAMENAMES) {
      this.DYIDGAMENAMESList = JSON.parse(DYIDGAMENAMES)
    }
    console.log("GameNamesList", this.DYIDGAMENAMESList);


  }

  getRakeStructureList() {
    let body = {}
    this.PokergamesService.getRakeStructureList(body).subscribe((data) => {
      this.RakeStructurelist = data.objectList
      console.log("RakeStructurelist", this.RakeStructurelist)
      if(this.RakeStructurelist){
        this.CreatePokerTableForm.patchValue({
          RakeStructure: this.RakeStructurelist[0]?.guid

        })
      }
    })

    // var arr = [
    //   { 0: this.UserAccessAreaList[8].guid },
    //   { 1: this.UserAccessAreaList[9].guid },
    // ]

    // var obj = ([(arr.reduce((acc, cur) => ({ ...acc, ...cur }), {}))])
    // console.log(obj[0])

    // console.log(this.UserAccessAreaList[8].guid)
    // console.log(this.UserAccessAreaList[9].guid)
    // console.log(this.UserAccessAreaList[9].guid + "," + this.UserAccessAreaList[8].guid)
    let bodys = {
      //   "userType": this.usertypeList[0].guid,
      //   "accessAreas": [this.UserAccessAreaList[9].guid]
    }


    // console.log((arr))

    // console.log(Object.assign(this.UserAccessAreaList[8].guid, this.UserAccessAreaList[9].guid))
    this.PlayerServiceService.listUserAccessRules(bodys).subscribe((res) => {
      this.UserAccessRulesResData = res.objectList
      console.log("UserAccessRulesResData", this.UserAccessRulesResData)
    })


  }
  GamesConfig() {
    const GamesConfig = localStorage.getItem('GamesConfig')
    if (GamesConfig) {
      this.GamesConfigList = JSON.parse(GamesConfig)
    }
    console.log("GamesConfig", this.GamesConfigList)
    console.log("GamesConfig", this.GamesConfigList.games)


    let gamesListofarrays = this.GamesConfigList.games

    console.log("gamesListofarraysss", gamesListofarrays)

    let gamescaption: any[] = [];
    for (let i = 0; i < gamesListofarrays.length; i++) {
      // if(this.selectedTeam.lowLong == 1840){
      //   if (gamesListofarrays[i].name.startsWith("POKER_")) {}
      // }
      if (gamesListofarrays[i].caption) {

        // console.log(gamesListofarrays[i].caption)
        if (gamesListofarrays[i].name.startsWith("POKER_")) {
          // gamescaption.push(gamesListofarrays[i].caption || gamesListofarrays[i].name || gamesListofarrays[i].wallet)
          gamescaption.push(gamesListofarrays[i].caption || gamesListofarrays[i].name || gamesListofarrays[i].wallet)
        }
        if (gamesListofarrays[i].name.startsWith("POKER_") && this.CreatePokerTableForm.value.MoneyType) {
          this.onlyPokerGames.push(gamesListofarrays[i].name)
        }

      }
    }
    console.log("onlyPokerGames", this.onlyPokerGames)
    console.log("gamescaption", gamescaption)

    this.uniquegamescaption = gamescaption.filter((item, i) => {
      return gamescaption.indexOf(item) === i
    })
    console.log("uniquegamescaption", this.uniquegamescaption)
  }

  onSelected(value: any = ""): void {
    console.log(value)
    console.log(this.selectedCurrency)
    console.log(this.CreatePokerTableForm.value.MoneyType);
    // this.selectedCurrency = this.CreatePokerTableForm.value.MoneyType;
    console.log(this.selectedCurrency)
    // this.selectedCurrency = this.CreatePokerTableForm.value.MoneyType;
    console.log(this.selectedCurrency);

    if (this.selectedCurrency) {

      let gamesListofarrays = this.GamesConfigList.games
      let gamescaption: any[] = [];
      for (let i = 0; i < gamesListofarrays.length; i++) {
        if (gamesListofarrays[i].name.startsWith("POKER_")) {
          gamescaption.push(gamesListofarrays[i])
          this.selectedTable = gamescaption.filter((game: any) => {
            return game.wallet.lowLong === this.selectedCurrency.lowLong && game.wallet.hiLong === this.selectedCurrency.hiLong
          });

        }

      }
      console.log("selectedTable", this.selectedTable)
      this.Onlygamescaption = [];
      for (let i = 0; i < this.selectedTable.length; i++) {
        // console.log( this.selectedTable[r])
        // this.Onlygamescaption = []
        console.log(this.selectedTable[i].caption)
        console.log(this.selectedCurrency.lowLong)
        console.log(this.selectedCurrency.lowLong == 2)

        // this.Onlygamescaption.length= 0
        if (this.selectedCurrency.lowLong == this.selectedTable[i].wallet.lowLong && this.selectedCurrency.hiLong == this.selectedTable[i].wallet.hiLong) {
          // delete this.Onlygamescaption[i] 
          this.Onlygamescaption.push(this.selectedTable[i].caption)
          // this.selectSecongOptionValue = this.selectedTable[0].caption
          this.CreatePokerTableForm.patchValue({
            GameType: this.selectedTable[0].caption
          })
          console.log("_________________")
          console.log(this.Onlygamescaption)

        }

        // else if (this.selectedCurrency.lowLong == 1840) {
        //   // this.Onlygamescaption.length= 0
        //   // delete this.Onlygamescaption[i]

        //   this.Onlygamescaption.push(this.selectedTable[i].caption)
        //   console.log("+++++++++++++++")
        //   console.log(this.Onlygamescaption)
        // }
        // else {
        //   // this.Onlygamescaption.length = 0
        //   // delete this.Onlygamescaption[i]

        //   this.Onlygamescaption.push(this.selectedTable[i].caption)
        //   console.log("*************")
        //   console.log(this.Onlygamescaption)
        // }
      }
      console.log("gamecaptionsssssss", this.Onlygamescaption)

    }
    // this.uniquegamescaption = this.selectedTable.filter((item: any, i: any) => {
    //   return this.selectedTable.indexOf(item) === i
    // })
    // console.log("uniquegamescaption", this.uniquegamescaption)
  }




  // sFrom = "";
  // sTo = "";
  // bInF = "";
  // bInT = "";

  onStakesFromInputChange(event: Event) {

    this.sFrom = parseInt((event.target as HTMLInputElement).value);
    console.log(this.sFrom);
    console.log(typeof (this.sFrom));
    if (this.sFrom == 0 || isNaN(this.sFrom)) {

      this.StakesErrorMessage = "Min stake can't be zero.";
      this.isStakesDisable = true;
      console.log("Min Stakes Can't be Zero")

    } else {
      if ((this.sFrom > 0 && this.sT > 0) && this.sFrom <= this.sT) {
        this.StakesErrorMessage = "";
        this.isStakesDisable = false;

      }
      this.updateBuyInErrorMessage();
      //  if(this.bInF == 0 || isNaN(this.bInF) ){
      //   console.log("444")
      //   this.BuyInErrorMessage = "Min buyIn can't be zero.";
      //   this.isBuyInDisable = true;
      //   console.log("Min buyIn can't be zero.");

      // }

    }
  }

  onStakesToInputChange(event: Event) {
    this.sT = parseInt((event.target as HTMLInputElement).value);
    if (this.sFrom > this.sT || isNaN(this.sT)) {
      console.log("Max buys Field is emety.");
      this.StakesErrorMessage = "Max stake greater than or equal to min stake"
      this.isStakesDisable = true;
    } else {
      this.StakesErrorMessage = ""
      this.isStakesDisable = false;
      console.log("Max Stakes Field successfully Completed. ")

    }
  }



  onBuyInFromChangeInput(event: Event) {
    this.bInF = parseInt((event.target as HTMLInputElement).value);
    console.log((event.target as HTMLInputElement).value)


    if (this.bInF == 0 || isNaN(this.bInF)) {
      this.BuyInErrorMessage = "Min buyIn can't be zero.";
      this.isBuyInDisable = true;
      console.log("Min buyIn can't be zero.");

    } else {
      if ((this.bInF > 0 && this.bInT > 0) && (this.bInF <= this.bInT)) {
        this.BuyInErrorMessage = "";
        this.isBuyInDisable = false;

      }
      this.updateBuyInErrorMessage();
      // if(this.sFrom == 0 || isNaN(this.sFrom)){
      //   console.log("333")
      //   this.StakesErrorMessage = "Min Stakes Can't be Zero.";
      //   this.isStakesDisable= true;
      //   console.log("Min Stakes Can't be Zero")

      // }

    }
  }


  onBuyInToChangeInput(event: Event) {
    this.bInT = parseInt((event.target as HTMLInputElement).value);
    if (this.bInF > this.bInT || isNaN(this.bInT)) {
      console.log("Max buys Field is emety.");
      this.BuyInErrorMessage = "Max buyIn greater then or equal min buyIn"
      this.isBuyInDisable = true;
    } else {
      this.BuyInErrorMessage = ""
      this.isBuyInDisable = false;
      console.log("Max Stakes Field successfully Completed. ")


      if (((this.sFrom > 0 && this.bInF > 0) || (this.sFrom != "" && this.bInF != "")) && this.sFrom > this.bInF) {
        console.log("StakesFieldCompleted successfully")
        this.StakesErrorMessage = "";
        this.isStakesDisable = false;
        console.log("Min Stakes Can't be Zero")
        this.BuyInErrorMessage = "Min buyIn greater then or equal  min stake."
        this.isBuyInDisable = true;
        console.log("Min BuyIn Can't Lessthen Min Stakes.")
      }

    }
  }

  updateBuyInErrorMessage() {

    // "Max Stakes Greater Then Min Stakes" 
    // "Max BuyIn Greater Then Min BuyIn"
    if (((this.sFrom > 0 && this.bInF > 0) || (this.sFrom != "" && this.bInF != "")) && this.sFrom > this.bInF) {
      // console.log("StakesFieldCompleted successfully")
      // this.StakesErrorMessage = "";
      // this.isStakesDisable = false;
      console.log("Min Stakes Can't be Zero")
      this.BuyInErrorMessage = "Min buyIn greater then or equal  min stake."
      this.isBuyInDisable = true;
      console.log("Min BuyIn Can't Lessthen Min Stakes.")
    }
    else if (((this.sFrom > 0 && this.sT > 0) || (this.sFrom != "" && this.sT != "")) && this.sFrom > this.sT) {
      console.log("StakesFieldCompleted successfully")
      this.StakesErrorMessage = "Max stake greater than or equal to min stake";
      this.isStakesDisable = true;
      // console.log("Min Stakes Can't be Zero")
      // this.BuyInErrorMessage = "Min BuyIn Can't Lessthen Min Stakes."
      // this.isBuyInDisable = true;
      // console.log("Min BuyIn Can't Lessthen Min Stakes.")

    }
    else if (((this.bInF > 0 && this.bInT > 0) || (this.bInF != "" && this.bInT != "")) && this.bInF > this.bInT) {
      console.log("StakesFieldCompleted successfully")
      this.BuyInErrorMessage = "Max buyIn greater than are buyIn";
      this.isBuyInDisable = true;
      // console.log("Min Stakes Can't be Zero")
      // this.BuyInErrorMessage = "Min BuyIn Can't Lessthen Min Stakes."
      // this.isBuyInDisable = true;
      // console.log("Min BuyIn Can't Lessthen Min Stakes.")

    }
    else if ((this.sFrom == 0 && this.bInF == 0) || ((this.sFrom == "" && this.bInF == "") || isNaN(this.sFrom) && isNaN(this.bInF))) {

      this.StakesErrorMessage = "Min stake can't be zero.";
      this.isStakesDisable = true;
      console.log("Min Stakes Can't be Zero")
      this.BuyInErrorMessage = "Min buyIn can't be zero.";

      // this.BuyInErrorMessage = "Min buyIn can't be zero.";
      this.isBuyInDisable = true;
      console.log("Min buyIn can't be zero.");
    }

    else {

      if (this.sFrom > 0) {
        this.isStakesDisable = false;
        this.StakesErrorMessage = "";
        console.log("sucssfully field verified")

        if (this.sFrom > this.sT || isNaN(this.sT)) {
          console.log("Max buys Field is emety.");
          this.StakesErrorMessage = "Max stake greater than or equal to min stake"
          this.isStakesDisable = true;
        }

      }
      if (this.bInF > 0) {
        console.log("sucssfully field verified")
        this.isBuyInDisable = false;
        this.BuyInErrorMessage = "";

        if (this.bInF > this.bInT || isNaN(this.bInT)) {
          console.log("Max buys Field is emety.");
          this.BuyInErrorMessage = "Max buyIn greater then or equal min buyIn"
          this.isBuyInDisable = true;
        }
      }
    }
  }


  // getDirtyValues(form: any) {
  //   let dirtyValues: any = {};

  //   Object.keys(form.controls)
  //     .forEach(key => {
  //       let currentControl = form.controls[key];

  //       if (currentControl.dirty) {
  //         if (currentControl.controls)
  //           dirtyValues[key] = this.getDirtyValues(currentControl);
  //         // else
  //         //     dirtyValues[key] = currentControl.value;
  //       }
  //     });

  //   return dirtyValues;
  // }
  // abc(){
  //   let fillterbody = this.getDirtyValues(this.CreatePokerTableForm)
  //   fillterbody["gameName"] = this.game!=null?this.game:undefined
  //   fillterbody["maxCountRecord"] = this.CreatePokerTableForm.value.maxCountRecord
  //   if(rebuy)
  // }







  onFormSubmit() {
    // this.CreatePokerTableForm.value.StakesFrom.control.markAsDirty();
    if (this.CreatePokerTableForm) {
      // this.CreatePokerTableForm.get('StakesFrom').markAsDirty();
      // this.CreatePokerTableForm.get('StakesTo').markAsDirty();
      // this.CreatePokerTableForm.markAsDirty();
    }

    // sFrom: any = 0;
    // sT: any = 0;
    // bInF: any = 0;.
    // bInT: any = 0;

    console.log(this.CreatePokerTableForm.value)
    if (this.CreatePokerTableForm.value.StakesFrom > this.CreatePokerTableForm.value.StakesTo) {
      this.CreatePokerTableForm.patchValue({
        StakesTo: (this.CreatePokerTableForm.value.StakesFrom)


      })
      this.isStakesDisable = false;
      this.StakesErrorMessage = "";
      this.sT = this.CreatePokerTableForm.value.StakesFrom;

    }

    if (this.CreatePokerTableForm.value.BuyInFrom > this.CreatePokerTableForm.value.BuyInTo) {
      this.CreatePokerTableForm.patchValue({
        BuyInTo: (this.CreatePokerTableForm.value.BuyInFrom)


      })
      this.isBuyInDisable = false;
      this.BuyInErrorMessage = "";
      this.bInT = this.CreatePokerTableForm.value.BuyInFrom

    }





    //  if ((this.sFrom > this.sT) || this.sT == 0) {
    //   this.CreatePokerTableForm.patchValue({
    //     StakesTo: (this.CreatePokerTableForm.value.StakesFrom)
    //   })

    // }


    // if ((this.bInF > this.bInT)  ||  this.bInT == 0 ) {
    //   this.CreatePokerTableForm.patchValue({
    //     BuyInTo: (this.bInF)
    //     // (this.CreatePokerTableForm.value.BuyInFrom)

    //   })
    // }


    if (this.sFrom == 0) {
      if (this.bInF != 0) {
        this.BuyInErrorMessage = "";
        this.isBuyInDisable = false;
        console.log("Min BuyIn field completed");
      }
      this.StakesErrorMessage = "Min stake can't be zero.";
      this.isStakesDisable = true;
      console.log("Min Stakes Can't be Zero")

    }

    if (this.bInF == 0) {
      if (this.sFrom != 0) {
        this.StakesErrorMessage = "";
        this.isStakesDisable = false;
        console.log("Min Stakes field completed")
      }
      this.BuyInErrorMessage = "Min buyIn can't be zero.";
      this.isBuyInDisable = true;
      console.log("Min buyIn can't be zero.");

    }




    if (this.CreatePokerTableForm.value.TableGroupName === "") {
      this.TableGroupNameError = true;

    }
    else if (this.sFrom != 0 && this.bInF != 0 && this.sFrom > this.bInF) {
      console.log("StakesFieldCompleted successfully")
      this.StakesErrorMessage = "";
      this.isStakesDisable = false;
      this.BuyInErrorMessage = "Min buyIn can't lessthen min stake."
      this.isBuyInDisable = true;
      console.log("Min BuyIn Can't Lessthen Min Stakes.")

    }
    else if (this.sFrom == 0 && this.bInF == 0) {
      this.StakesErrorMessage = "Min stake can't be zero.";
      this.isStakesDisable = true;
      console.log("Min Stakes Can't be Zero")
      this.BuyInErrorMessage = "Min buyIn can't be zero.";

      // this.BuyInErrorMessage = "Min buyIn can't be zero.";
      this.isBuyInDisable = true;
      console.log("Min buyIn can't be zero.");
    } else if (this.sFrom == 0) {
      if (this.bInF != 0) {
        this.BuyInErrorMessage = "";
        this.isBuyInDisable = false;
        console.log("Min BuyIn field completed");

      }


      this.StakesErrorMessage = "Min stake Can't be zero.";
      this.isStakesDisable = true;
      console.log("Min Stakes Can't be Zero")

    }
    else if (this.bInF == 0) {
      if (this.sFrom != 0) {
        this.StakesErrorMessage = "";
        this.isStakesDisable = false;
        console.log("Min Stakes field completed")

      }

      this.BuyInErrorMessage = "Min buyIn can't be zero.";
      this.isBuyInDisable = true;
      console.log("Min buyIn can't be zero.");

    } else if (this.CreatePokerTableForm.value.Seats <= 1 && this.CreatePokerTableForm.value.Seats > 10) {
      this.seatsNumberCondition = true;
      this.seatsNumberErrorMessage = "'Seats' must be between 2 and 10";
    }

    else if (this.CreatePokerTableForm.value.ActionTimeOut < 1 || this.CreatePokerTableForm.value.ActionTimeOut == "") {
      this.actionTimeOutCondition = true;
      this.actionTimeOutErrorMessage = "Seconds Should Be Postive or More Then Zero"
    }

    else {

      if (this.sFrom > this.sT) {
        this.CreatePokerTableForm.patchValue({
          StakesTo: (this.sFrom)
        })

      }
      if (this.bInF > this.bInT) {
        this.CreatePokerTableForm.patchValue({
          BuyInTo: (this.bInF)
          // (this.CreatePokerTableForm.value.BuyInFrom)

        })
      }

      this.TableGroupNameError = false;
      this.isStakesDisable = false;
      this.isBuyInDisable = false;
      this.StakesErrorMessage = "";
      this.BuyInErrorMessage = "";

      this.seatsNumberCondition = false;
      this.seatsNumberErrorMessage = "";

      this.actionTimeOutCondition = false;
      this.actionTimeOutErrorMessage = "";

      console.log(this.CreatePokerTableForm.value);
      console.log(this.CreatePokerTableForm.value.MoneyType);
      let moneyType = this.CreatePokerTableForm.value.MoneyType;

      let selectedTable = this.GamesConfigList.games.filter((game: any) => {

        return game.caption === this.CreatePokerTableForm.value.GameType;
      });
      console.log(selectedTable);
      let finalTable = selectedTable.filter((table: any) => {
        return table.wallet.hiLong === moneyType.hiLong && table.wallet.lowLong === moneyType.lowLong
      });
      console.log(finalTable);
      // console.log(finalTable[0].name);

      console.log(this.CreatePokerTableForm.value.ChatAccesability);
      let body: any;
      if (this.PlayerTableGroupData == null) {
        body = {
          "gameName": finalTable[0].name,
          "name": this.CreatePokerTableForm.value.TableGroupName,
          // "password":this.CreatePokerTableForm.value.Password,
          "password": this.CreatePokerTableForm.value.Password,
          // "lowStake":{"wallet":{"hiLong":0,'lowLong':6},"value":this.CreatePokerTableForm.value.StakesFrom},
          "lowStake": { "value": this.CreatePokerTableForm.value.StakesFrom },
          "highStake": { value: Number(this.CreatePokerTableForm.value.StakesTo) },
          // "maxBuyIn": { value: this.CreatePokerTableForm.value.BuyInFrom },
          "maxBuyIn": { value: this.CreatePokerTableForm.value.BuyInTo },
          "minBuyIn": { value: this.CreatePokerTableForm.value.BuyInFrom },
          // "minBuyIn": { value: this.CreatePokerTableForm.value.BuyInTo },
          "seats": this.CreatePokerTableForm.value.Seats,
          "actionTimeout": this.CreatePokerTableForm.value.ActionTimeOut * 1000,
          "initialTimeBank": this.CreatePokerTableForm.value.TimeBank * 1000,
          "additionalTimeBank": this.CreatePokerTableForm.value.TimeBankautoincrementamount * 1000,
          "disconnectionProtection": this.CreatePokerTableForm.value.DisconnectionProtection,

          "accessRuleName": this.CreatePokerTableForm.value.AccessRule,
          // "rakeStructureName": this.CreatePokerTableForm.value.RakeStructure,
          "rakeStructureId": this.CreatePokerTableForm.value.RakeStructure,

          "chatAccessibility": this.CreatePokerTableForm.value.ChatAccesability,
          "jackpot": this.CreatePokerTableForm.value.BadbetjackpotTable,
          "runItTwice": this.CreatePokerTableForm.value.RunItTwice,
          "bounty": this.CreatePokerTableForm.value.Bounty,
          "rakeBack": this.CreatePokerTableForm.value.RakeBack,

          "pot": { value: 0 },
          "rake": { value: 0 },
          "shareType": { hiLong: 0, lowLong: 0 },



          "timeForced": this.CreatePokerTableForm.value.TimeForced,
          "timeForcedTime": this.CreatePokerTableForm.value.TimeFocedTimeSec,


          "bombPotNumberHand": this.CreatePokerTableForm.value.Bombpotathand,
          "noOfHandsToHidePlayerStack": this.CreatePokerTableForm.value.Nohandshidestack,
          "noOfHandsToHidePlayerData": this.CreatePokerTableForm.value.Nohandshidenickname,


          "thirdBlind": this.CreatePokerTableForm.value.ThirdBlind,
          "rabbitHunting": this.CreatePokerTableForm.value.RabbitHunting,
          "ritForced": this.CreatePokerTableForm.value.RitHunting,
          "thirdBlindFoldForcedStrDdl": this.CreatePokerTableForm.value.straddle,
          // "guid":this.PlayerTableGroupData?.guid


          // "active":true,
          // "objState":0,
        }

      } else {
        body = {
          "gameName": finalTable[0].name,
          "name": this.CreatePokerTableForm.value.TableGroupName,
          // "password":this.CreatePokerTableForm.value.Password,
          "password": this.CreatePokerTableForm.value.Password,
          // "lowStake":{"wallet":{"hiLong":0,'lowLong':6},"value":this.CreatePokerTableForm.value.StakesFrom},
          "lowStake": { value: Number(this.CreatePokerTableForm.value.StakesFrom)},
          "highStake": { value: Number(this.CreatePokerTableForm.value.StakesTo) },
          // "maxBuyIn": { value: this.CreatePokerTableForm.value.BuyInFrom },
          "maxBuyIn": { value: Number(this.CreatePokerTableForm.value.BuyInTo)},
          "minBuyIn": { value:Number(this.CreatePokerTableForm.value.BuyInFrom)},
          // "minBuyIn": { value: this.CreatePokerTableForm.value.BuyInTo },
          "seats": Number(this.CreatePokerTableForm.value.Seats),
          "actionTimeout":Number(this.CreatePokerTableForm.value.ActionTimeOut) *1000,
          "initialTimeBank":Number(this.CreatePokerTableForm.value.TimeBank) * 1000,
          "additionalTimeBank":Number(this.CreatePokerTableForm.value.TimeBankautoincrementamount) * 1000,
          "disconnectionProtection":Number(this.CreatePokerTableForm.value.DisconnectionProtection) ,

          "accessRuleName": this.CreatePokerTableForm.value.AccessRule,
          // "rakeStructureName": this.CreatePokerTableForm.value.RakeStructure,
          "rakeStructureId": this.CreatePokerTableForm.value.RakeStructure,

          "chatAccessibility": this.CreatePokerTableForm.value.ChatAccesability,
          "jackpot": this.CreatePokerTableForm.value.BadbetjackpotTable,
          "runItTwice": this.CreatePokerTableForm.value.RunItTwice,
          "bounty": this.CreatePokerTableForm.value.Bounty,
          "rakeBack": this.CreatePokerTableForm.value.RakeBack,

          "pot": { value: 0 },
          "rake": { value: 0 },
          "shareType": { hiLong: 0, lowLong: 0 },



          "timeForced": this.CreatePokerTableForm.value.TimeForced,
          "timeForcedTime": this.CreatePokerTableForm.value.TimeFocedTimeSec,


          "bombPotNumberHand": this.CreatePokerTableForm.value.Bombpotathand,
          "noOfHandsToHidePlayerStack": this.CreatePokerTableForm.value.Nohandshidestack,
          "noOfHandsToHidePlayerData": this.CreatePokerTableForm.value.Nohandshidenickname,


          "thirdBlind": this.CreatePokerTableForm.value.ThirdBlind,
          // "rabbitHunting": this.CreatePokerTableForm.value.RabbitHunting,
          "ritForced": this.CreatePokerTableForm.value.RitHunting,
          "thirdBlindFoldForcedStrDdl": this.CreatePokerTableForm.value.straddle,
          "guid": this.PlayerTableGroupData?.guid


          // "active":true,
          // "objState":0,
        }
      }

      this.PokergamesService.setPokerTableGroup(body).subscribe((data) => {
        console.log(data);
        this.CreateTableRes = data.changedObjectList;
        if (this.CreateTableRes) {
          this.CreateSuccessPop = true;
          if (this.PlayerTableGroupData == null) {
            this.successMessage = "Successfully Created"
          } else {
            this.successMessage = "Successfully Edited"

          }
        }
      },
        error => {
          this.ErrorPopup = true
        }
      )



    }

    // console.log(this.CreatePokerTableForm.value)
    // if (this.CreatePokerTableForm.value.MoneyType == undefined) {
    //   this.SelectMoneyErrorMsg = 'Select Money Type'
    //   console.log("Select Money Type")
    //   // this.FormGroupErrorPopup=true
    // }
    // if (this.CreatePokerTableForm.value.GameType == '') {
    //   this.SelectGameErrorMsg = 'Select Game Type'
    //   console.log("Select Game Type")
    //   // this.FormGroupErrorPopup=true
    // }
    // if (this.CreatePokerTableForm.value.StakesFrom <= 0) {
    //   console.log("Stakes Must Positive")
    // }
    // if (this.CreatePokerTableForm.value.StakesFrom > 0) {
    //   this.CreatePokerTableForm.patchValue({
    //     StakesTo: (this.CreatePokerTableForm.value.StakesFrom
    //     )
    //   })
    //   this.CreatePokerTableForm.value.StakesTo = this.CreatePokerTableForm.value.StakesFrom
    //   console.log(this.CreatePokerTableForm.value.StakesTo)
    // }
    // if (this.CreatePokerTableForm.value.StakesTo > this.CreatePokerTableForm.value.StakesFrom) {
    //   console.log("High Stakes Must Positive")
    // }
    // if (this.CreatePokerTableForm.value.BuyInFrom <= 0) {
    //   console.log("Buy In Must Positive")
    // }
    // if (this.CreatePokerTableForm.value.BuyInFrom > 0 || this.CreatePokerTableForm.value.BuyInFrom > this.CreatePokerTableForm.value.StakesTo) {
    //   this.CreatePokerTableForm.patchValue({
    //     BuyInTo: (this.CreatePokerTableForm.value.BuyInFrom
    //     )
    //   })
    // }
    // if (this.CreatePokerTableForm.value.BuyInFrom < this.CreatePokerTableForm.value.StakesFrom) {
    //   console.log("Min Buy-In Can't Less than min Stake")
    // }
    // if (this.CreatePokerTableForm.value.TableGroupName == '') {
    //   console.log("TableGroupName Can't Empty")
    // }
    // else {


    // }

  }

  SuccessPop() {
    this.CreateSuccessPop = false;
    // this.router.navigateByUrl('/ActiveTables')
    this.router.navigateByUrl('/pokertablegroups')
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }
  TechnicalError() {
    this.ErrorPopup = false
  }
  FormGroupErrorPopClose() {
    this.FormGroupErrorPopup = false
  }

}
