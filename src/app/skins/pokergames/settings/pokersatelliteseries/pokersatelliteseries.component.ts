
import { Component, OnInit,OnDestroy,ViewChild} from '@angular/core';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import * as XLSX from 'xlsx';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { CreatePokerSatelliteSeriesComponent } from 'src/app/skins/admin-control/create-poker-satellite-series/create-poker-satellite-series.component';



@Component({
  selector: 'app-pokersatelliteseries',
  templateUrl: './pokersatelliteseries.component.html',
  styleUrls: ['./pokersatelliteseries.component.css']
})
export class PokersatelliteseriesComponent implements OnInit,OnDestroy {

 @ViewChild(CreatePokerSatelliteSeriesComponent)CreatePokerSatelliteSeriesComponent:CreatePokerSatelliteSeriesComponent | undefined


 
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  popupArrow:boolean = false;
  SeletedIconIndex:number =0;


  Fillterdata: boolean = false;
  Filtergamesbtn: boolean = false;
  satiliteseriesdata: any=[];
  pokerGamesLoader: boolean = false;
  loader: boolean = false;
  loginForm: any = FormGroup;
  pokersatilitefromgroup: any = FormGroup;
  filterForm: FormGroup;
  wallettype: any;
  wallettypes: any;
  rowsOnthePage: any=0;
  ResultCount: any;
  resultcount: boolean=true;
  walletlists: any =[];
 
  dropDownCheckedList: any=[];
  filterItem: any = [];
  allGammeNamesWithCurrency: any = [];
  gamescaption: any = [];
  allGammeNames: any = [];
  onlyPokerGames: any = [];
  uniquegamescaption: any;
  checkboxesIndivisualGames: any;
  selectedFillterGames: any =[];
  gamesTobeSelected: any = "All";
  checkedList: any = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  pokerGamesCheckbox: boolean =true;
  payoutData: any=[];
  tournamentData: any=[];
  editstellitePopup: boolean=false;
  activatedIndexSatelitteserivesData: any={};

  PayoutStructureList:any=[];
  SpinnwerT:boolean = false;
  
 

  constructor(private GamesofpokerService: GamesofpokerService,  private pokergamesService: PokergamesService, private formBuilder: FormBuilder,private FileformatServiceService:FileformatServiceService) {
    this.filterForm = new FormGroup({
      skills: new FormControl(),
      Currency: new FormControl(),
      GameType: new FormControl(),
      SeriesName: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
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
    this.walletTypes();
    this.GamesConfig();
    // this.walletFormats();
    this.pokersatilitefromgroup = this.formBuilder.group({
      firstRecord: [1],
      maxCountRecord: [100],
      repotingstart: [null],
      repotingend: [null],
    })
    let filterbody = {}
    let body = {};
    // this.pokergamesService.Pokersatiliteseries(body).subscribe(data => this.getPokerData(data));
    this.PayoutStructure();
  }

  filterbtn() {
    this.Fillterdata = !this.Fillterdata
  }
  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn

  }


  // walletFormats() {
  //   this.wallettype = localStorage.getItem("walletFormats")
  //   this.wallettypes = JSON.parse(this.wallettype)
  //   console.log("wallettypes",this.wallettypes)
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
        console.log(list);
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

    clickCloseEditSatellitePopup(event:boolean){
      this.editstellitePopup = event
      this.onFormSubmit();
    }    
     

  onFormSubmit() {
    this.satiliteseriesdata=false
    this.popupArrow = false;
    this.loader = true;
    this.pokerGamesLoader = true
    let filterbody = this.getDirtyValues(this.filterForm);
    filterbody["gameNames"] = this.selectedFillterGames.length ===0? this.selectedFillterGames : this.selectedFillterGames;
    filterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    filterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    filterbody["tournamentName"] = this.filterForm.value.SeriesName
   
    this.pokergamesService.Pokersatiliteseries(filterbody).subscribe(data =>{
      this.getPokerData(data)},
      error => {
        this.loader = false;
        this.pokerGamesLoader = false;
       
    }
      )
  }

  showmanu(index:any){
    this.SeletedIconIndex = index;
    this.popupArrow  = !this.popupArrow;

   

    

  }
  clickOnEditSeries(index:any, serieslistGuid: any){

  
   

    this.popupArrow  = false;
    
    this.getPokerPayoutStructureList();
    this.getPokerTournamentSeries(serieslistGuid);
    this.activatedIndexSatelitteserivesData=this.satiliteseriesdata[this.SeletedIconIndex];
    console.log(this.activatedIndexSatelitteserivesData);
    this.editstellitePopup=true;

  };



  clickOnEnableDisableActions(action:any,serieslistGuid: any){
    this.SpinnwerT = true
    this.popupArrow  = false;
    let body = {
      "tournamentSeriesGuid": {
        'hiLong':serieslistGuid.guid.hiLong,
        'lowLong':serieslistGuid.guid.lowLong
          // "hiLong": 1155,
          // "lowLong": 383
      },
      "enable":action
      // "enable":false
  }
    this.pokergamesService.enableTournamentSeries(body).subscribe((data)=>{
      console.log(data);
      if(data?.changedObjectList){
        this.SpinnwerT = false;
        this.onFormSubmit();
      }
      
    })

  }

  PayoutStructure(){
    const PayoutStructure = localStorage.getItem("PayoutStructure")
    if (PayoutStructure) {
      this.PayoutStructureList = JSON.parse(PayoutStructure)
    }
    console.log("PayoutStructureList", this.PayoutStructureList)

  }



  getPokerPayoutStructureList(){
    this.payoutData=[]
    let body={}
    this.pokergamesService.getPokerPayoutStructureList(body).subscribe((data)=>{
      if(data.objectList){
        this.payoutData=data.objectList;

        for (let i = 0; i < this.payoutData.length; i++) {
          for (let j = 0; j < this.PayoutStructureList.length; j++) {
            if (this.payoutData[i].structureType.lowLong == this.PayoutStructureList[j].guid.lowLong && this.payoutData[i].structureType.hiLong == this.PayoutStructureList[j].guid.hiLong) {
              this.payoutData[i].structureType = this.PayoutStructureList[j].value
            }
          }}
        console.log("payoutData   :---------", this.payoutData);

      }
    },
    error =>{
      console.log(error);
    }
    
    )
  }

  getPokerTournamentSeries(serieslistGuid: any){
    this.tournamentData=[];
    console.log(serieslistGuid);

    let body = { 
      
      'hiLong':serieslistGuid.guid.hiLong,
      'lowLong':serieslistGuid.guid.lowLong
    
   }
   console.log("body    -----: ",body)
    this.pokergamesService.getPokerTournamentSeries(body).subscribe((data: any) => {
      if(data.objectList){
        this.tournamentData=data.objectList[0]
        console.log("tournamentData    :----------",  this.tournamentData);

      }
     
    })

  }

  clickOnCloseSatellitepopup(){
    this.editstellitePopup = false;

    

  }


  clickToFinish(){
    if(this.CreatePokerSatelliteSeriesComponent){
      this.CreatePokerSatelliteSeriesComponent.clickOnSubmitButton()
    }
    
  }
  
 
  getPokerData(data: any) {
    console.log(data);
    if(data.objectList){
      this.satiliteseriesdata = data.objectList;
      this.pokerGamesLoader = false;
      if(data.objectList.length){
        this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount;

      }
      
    };
    

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.satiliteseriesdata != null) {
      this.loader = false;
    }

    for (let i = 0; i < this.satiliteseriesdata?.length; i++) {
      for (let m = 0; m < this.wallettypes?.length; m++) {

        if (this.satiliteseriesdata[i].pot?.wallet.lowLong == this.wallettypes[m].guid.lowLong) {
          this.satiliteseriesdata[i].pot.wallet = this.wallettypes[m].currencyCode
          console.log(this.satiliteseriesdata[i].pot.wallet)
        }
      }
    }
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
    XLSX.writeFile(wb, "SateliteSeriesExcelSheet.xlsx");

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element,"SateliteSeriesExcelSheet")
  }
}