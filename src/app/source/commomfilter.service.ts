


import { Injectable } from '@angular/core';
import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommomfilterService {

  walletTypesList: any;
  walletlists: any = [];
  faceParameterslist12:any =[]
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
  faceParameterslist: any;
  allsessiondata: any;

  restrictNumber:any;


  constructor() { }
  ngOnInit(): void {
    this.selectallst()
   
  }

  inputNumbersOnlyValid(event: any) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)

    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57));
  }

  walletTypes_comm() {
    this.walletlists = []
    const walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      this.walletTypesList = JSON.parse(walletTypes)
      console.log(this.walletTypesList)
      for (let i = 0; i < this.walletTypesList.length; i++) {
        if (this.walletTypesList[i].clubGameWallet == true) {
          if(this.walletTypesList[i].description !== "Play Money" )
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
  selectallst(){
    this.faceParameterslist12 = []
    const faceParameterslist = localStorage.getItem('faceParameters')
    // console.log(this.allsessiondata)
    // const faceParameterslist = this.allsessiondata[0].faceParameters
    console.log(faceParameterslist)
    if (faceParameterslist) {
      this.faceParameterslist12 = JSON.parse(faceParameterslist)
      console.log(this.faceParameterslist12)
    }
  //   for (let i = 0; i < this.dropDownCheckedList.length; i++) {
  //     this.selectedItems[i] = {
  //       face: this.dropDownCheckedList[i].name,
        
  //     }
  // }
  return this.faceParameterslist12
}
getsessiondata(data: any){
console.log(data)
this.allsessiondata = data
}
recordsinputComm(event: { charCode: any; }) {
  var k;
  k = event.charCode;
  return (k >= 48 && k <= 57);
}

requiredAndMinOne(): ValidatorFn[] {
  return [Validators.required, Validators.min(1), Validators.max(999999999)];
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

      if (this.gamesListofarrays[i].name.startsWith("POKER_")) {
        this.onlyPokerGames.push(this.gamesListofarrays[i])
        this.allGammeNames.push(this.gamesListofarrays[i].caption)
        this.allGammeNamesWithCurrency.push(this.gamesListofarrays[i].name)
      }

    }
    console.log("allGammeNamesWithCurrency", this.allGammeNamesWithCurrency)

    
  }

  this.checkboxesIndivisualGames = this.allGammeNames.filter((item:any,i:number)=>{
    return this.allGammeNames.indexOf(item) ==i;
  })
  console.log("allGammeNames    :   ", this.checkboxesIndivisualGames);





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
  console.log("FillterItem", this.filterItem);

  return [this.filterItem, this.allGammeNamesWithCurrency,this.gamescaption, this.allGammeNames, this.onlyPokerGames, this.uniquegamescaption,this.checkboxesIndivisualGames]


}

  }

