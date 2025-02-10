import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CasinofiltersService {

  walletTypesList: any;
  walletlists: any = [];

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  dropDownCheckedList: any =[];
  selectedFillterGames:any =[];
  allGamesCheckbox: boolean = true;
  checkboxesIndivisualGames: any = [];
  GamesConfigList: any;
  gamesListofarrays: any;
  gamescaption:any =[];
  onlyPokerGames: any = [];
  allGammeNames: any =[];
  uniquegamescaption: any =[];
  filterItem: any =[];
  gamesTobeSelected:any =[];
  allGammeNamesWithCurrency: any =[] ;
  pokerGamesCheckbox: boolean = true;
  checkedList: any = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  walletTypesList12: any = []
   onlycasinoGames:any =[]
   casinoGamesname:any =[]
   casinoGamescpt:any =[]
  gamescaptioncasino: any =[]
  uniquegamescaptionCasino: any = []
  Casinofilters: any =[]

  constructor() { }
  ngOnInit(): void {
    this.walletTypes()
    this.walletTypes_2()
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
  
  // Not Exist for this Component
   // this.filterForm.patchValue({
    //   Currency: this.walletlists[0].guid
    // })
  
  // Not Exit for this Component 

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
      itemsShowLimit: 5,
      allowSearchFilter: false
    };


    return this.walletlists

  }
  walletTypes_2() {
    const walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      // this.walletTypesList = JSON.parse(walletTypes)
      this.walletTypesList = JSON.parse(walletTypes)
      // console.log(this.walletTypesList12)
      // for(let j=0; j<this.walletTypesList12.length; j++) {
      //   console.log(this.walletTypesList12[j])
      //   if(this.walletTypesList12[j].description == "U.S. Dollars" || "Chips"){
      //     this.walletTypesList = this.walletTypesList.push(this.walletTypesList12[j]) 
      //     console.log(this.walletTypesList)
      //   }
      // }
      console.log(this.walletTypesList)
      for (let i = 0; i < this.walletTypesList.length; i++) {
        if (this.walletTypesList[i].clubGameWallet == true) {

          this.walletlists.push(this.walletTypesList[i])
        }
      }
    }
    console.log(this.walletTypesList)
    console.log("walletlists", this.walletlists)
  
  // Not Exist for this Component
   // this.filterForm.patchValue({
    //   Currency: this.walletlists[0].guid
    // })
  
  // Not Exit for this Component 

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
      itemsShowLimit: 5,
      allowSearchFilter: false
    };


    return this.walletlists

  }
 


  GamesConfig() {
    const GamesConfig = localStorage.getItem('GamesConfig')
    if (GamesConfig) {
      this.GamesConfigList = JSON.parse(GamesConfig)
    }
    console.log("GamesConfig", this.GamesConfigList)
    // console.log("GamesConfig", this.GamesConfigList.games)
    this.gamesListofarrays = this.GamesConfigList.games

    console.log("gamesListofarraysss", this.gamesListofarrays)
    this.gamescaption = [];
    for (let i = 0; i < this.gamesListofarrays.length; i++) {

      if (this.gamesListofarrays[i].caption) {

        // if (this.gamesListofarrays[i].name.startsWith("POKER_")) {
        //   this.gamescaption.push(gamesListofarrays[i])
        // }

        if (this.gamesListofarrays[i].name.startsWith("POKER_")) {
          this.gamescaption.push(this.gamesListofarrays[i].caption);
          // this.checkboxesIndivisualGames.push(this.gamesListofarrays[i].caption);
        }
        if (this.gamesListofarrays[i].name.startsWith("CASINO_")) {
          this.gamescaptioncasino.push(this.gamesListofarrays[i].caption);
          // this.checkboxesIndivisualGames.push(this.gamesListofarrays[i].caption);
        }

        if (this.gamesListofarrays[i].name.startsWith("POKER_")) {
          this.onlyPokerGames.push(this.gamesListofarrays[i])
          this.allGammeNames.push(this.gamesListofarrays[i].caption)
          this.allGammeNamesWithCurrency.push(this.gamesListofarrays[i].name)
        }
        if(this.gamesListofarrays[i].name.startsWith("CASINO_")){
           this.onlycasinoGames.push(this.gamesListofarrays[i])
           this.casinoGamescpt.push(this.gamesListofarrays[i].caption)
           this.casinoGamesname.push(this.gamesListofarrays[i].name)
        }
      }
      console.log("allGammeNamesWithCurrency", this.allGammeNamesWithCurrency)

      
    }

    this.checkboxesIndivisualGames = this.allGammeNames.filter((item:any,i:number)=>{
      return this.allGammeNames.indexOf(item) ==i;
    })
    console.log("allGammeNames :   ", this.checkboxesIndivisualGames);





    console.log("onlyPokerGames", this.onlyPokerGames)
    console.log("gamescaption", this.gamescaption)
    console.log("gamescaptionCasino", this.gamescaptioncasino)


    this.uniquegamescaption = this.gamescaption.filter((item: any, i: number) => {
      console.log(item)
      if (this.gamescaption.indexOf(item) === i) {
        this.filterItem.push(this.onlyPokerGames[i])
      }
      return this.gamescaption.indexOf(item) === i
    })

    this.uniquegamescaptionCasino = this.gamescaptioncasino.filter((item: any, i: number) => {
      console.log(item)
      if (this.gamescaptioncasino.indexOf(item) === i) {
        this.Casinofilters.push(this.onlycasinoGames[i])
      }
      return this.gamescaptioncasino.indexOf(item) === i
    })



    console.log("uniquegamescaption", this.uniquegamescaption)
    console.log("FillterItem", this.filterItem);

    return [this.filterItem, this.allGammeNamesWithCurrency,this.gamescaption, this.allGammeNames, this.onlyPokerGames, this.uniquegamescaption,this.checkboxesIndivisualGames,this.Casinofilters , this.onlycasinoGames,this.casinoGamesname,this.casinoGamescpt,this.uniquegamescaptionCasino,this.gamescaptioncasino]


  }


  onItemSelect(item:any) {
    console.log(item);
    console.log(this.selectedItems);
    // console.log(this.filterForm.value.skills)
  
    this.dropDownCheckedList.push(item)
  
    console.log("selectedCheckBoxList", this.dropDownCheckedList);
    let  changeCurrencyResult = this.changeCurrencyOption();
    // console.log(changeCurrencyResult)

    return  changeCurrencyResult
 
  }

  OnItemDeSelect(item: any) {
   
    console.log("Item selected to delete")
    console.log(item);
    console.log(this.selectedItems);
   
    this.dropDownCheckedList = this.dropDownCheckedList.filter((eachItem: any) => eachItem.description != item.description)

    console.log("selectedCheckBoxList", this.dropDownCheckedList);
    let  changeCurrencyResult=  this.changeCurrencyOption();
    return  changeCurrencyResult;
  }
  onSelectAll(items: any) {
    console.log(items);
    console.log(this.selectedItems);
    
    this.dropDownCheckedList = items

    console.log("selectedCheckBoxList", this.dropDownCheckedList);
    let  changeCurrencyResult=  this.changeCurrencyOption();
    return changeCurrencyResult;
  }
  onDeSelectAll(items: any) {
    console.log(items);
    console.log(this.selectedItems);
    this.dropDownCheckedList = []
    console.log("selectedCheckBoxList", this.dropDownCheckedList);
    let  changeCurrencyResult =this.changeCurrencyOption();
    return changeCurrencyResult
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
    let changeCurrencyResult = this.clickonCheckboxIndivisualGames();
   
    return changeCurrencyResult
  };














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
          console.log(this.checkboxesIndivisualGames.length)

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
    let changeCurrencyResult =this.changeCurrencyOption();
    const {selectedFillterGames,gamesTobeSelected}  = changeCurrencyResult;

    return {
      selectedFillterGames:selectedFillterGames,
      gamesTobeSelected:gamesTobeSelected,
      checkedList:this.checkedList,
      pokerGamesCheckbox:this.pokerGamesCheckbox
    };


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
          }}
        for (let k = 0; k < this.dropDownCheckedList.length; k++) {
          if ((this.onlyPokerGames[i].wallet.hiLong == this.dropDownCheckedList[k].guid.hiLong) && (this.onlyPokerGames[i].wallet.lowLong == this.dropDownCheckedList[k].guid.lowLong)) {

            this.selectedFillterGames.push(this.onlyPokerGames[i].name);
            break;
          }
          

        }
        

      }
      // break;

      if(this.dropDownCheckedList.length  == 0){
        console.log("step-1")
        this.selectedFillterGames = this.allGammeNamesWithCurrency;
        this.gamesTobeSelected = "All";
      }else{
        console.log("step-2")
        //  this.gamesTobeSelected = checkList;
         this.gamesTobeSelected = "All";
      }

      

  }

    else {
      this.selectedFillterGames = [];
      console.log(this.dropDownCheckedList.length ,"    ",this.walletlists.length, "    ", this.checkboxesIndivisualGames.length ,"    " ,this.uniquegamescaption.length)
      console.log("body:---------------------6");
      let checkList = [];
      console.log(this.checkboxesIndivisualGames.length);// available games in array;
      // console.log(this.filterForm.value.Currency);
      console.log(this.onlyPokerGames);
      for (let i = 0; i < this.onlyPokerGames.length; i++) {
        if(this.checkboxesIndivisualGames.length>0){
          console.log("checked done")
          for (let j = 0; j < this.checkboxesIndivisualGames.length; j++) {
            if (this.onlyPokerGames[i].caption == this.checkboxesIndivisualGames[j]) {
              // console.log(this.onlyPokerGames[i].caption, "++++++++++++++++", this.checkboxesIndivisualGames[j]);
              checkList[j] = this.uniquegamescaption[j];

              if(this.dropDownCheckedList.length>0){
                for (let k = 0; k < this.dropDownCheckedList.length; k++) {
                  // if((this.onlyPokerGames[i].wallet.hiLong == this.filterForm.value.Currency.hiLong) &&(this.onlyPokerGames[i].wallet.lowLong == this.filterForm.value.Currency.lowLong)){
    
                  if ((this.onlyPokerGames[i].wallet.hiLong == this.dropDownCheckedList[k].guid.hiLong) && (this.onlyPokerGames[i].wallet.lowLong == this.dropDownCheckedList[k].guid.lowLong)) {
                    this.selectedFillterGames.push(this.onlyPokerGames[i].name);
                    // console.log(this.onlyPokerGames[i].name, '.****', this.onlyPokerGames[i].caption)
    
    
                  }
    
    
                }
                break

              }else{
                this.selectedFillterGames.push(this.onlyPokerGames[i].name);
              }
              
  
  
            }
  
            // checkList[j] = this.uniquegamescaption[j]
  
  
          }

        }else{
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
      if(this.checkboxesIndivisualGames.length == this.uniquegamescaption.length){
        this.gamesTobeSelected = "ALL"
      }else{

        this.gamesTobeSelected = this.checkboxesIndivisualGames;
      }



    }
    console.log(this.selectedFillterGames)
    console.log(this.gamesTobeSelected);

    let result= {
      selectedFillterGames:this.selectedFillterGames,
      gamesTobeSelected:this.gamesTobeSelected
    }

    return(result)
  }


  clearData() {
    
    this.filterItem = [];
    this.allGammeNamesWithCurrency = [];
    this.gamescaption = [];
    this.allGammeNames = [];
    this.onlyPokerGames = [];
    this.uniquegamescaption = [];
    this.checkboxesIndivisualGames = [];
    this.walletlists = [];




  }





  
}

