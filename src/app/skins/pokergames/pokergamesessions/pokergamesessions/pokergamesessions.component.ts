import { Component, OnInit,OnDestroy} from '@angular/core';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';

import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokergamesessions',
  templateUrl: './pokergamesessions.component.html',
  styleUrls: ['./pokergamesessions.component.css']
})
export class PokergamesessionsComponent implements OnInit,OnDestroy {
  filterForm: FormGroup;
  FillterMenu: any;
  pokerGameSessiondata: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  loader: boolean = false;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  PokerGameSessionsDetails: any;
  PokerGameSessionsDetailsPopUp: boolean = false;
  faceParameterslist: any;
  walletFormatsList: any;
  walletlists: any = [];
  GamesConfigList: any;

  dropdownList: any = [];
  selectedItems: any = [];
  faceParameterSelectedItems:any=[];
  dropdownSettings = {};
  faceParametersdropdown ={};
  dropDownCheckedList: any = [];
  filterItem: any = [];
  Filtergamesbtn: boolean = false;
  allGammeNamesWithCurrency: any = [];
  uniquegamescaption: any;
  gamescaption: any = [];
  allGammeNames: any = [];
  onlyPokerGames: any = [];
  checkboxesIndivisualGames: any = [];
  selectedFillterGames: any=[];
  gamesTobeSelected: any = "All";
  checkedList: any = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  pokerGamesCheckbox: boolean = true;
  faceParametersdropDownCheckedList: any =[];
  allFaceParametersNames: any=[];
  gamesListofarrays: any=[];
  endDate: any;
  startDate: any;
  todaydate: any;
  steddate: boolean =false;
  timeerror: boolean =false;
  startTime:any= "00:00:00"
  endTime:any = "23:59:59"
  
  
 

  constructor(private router:Router,private DateTimePipe: DateTimePipe,private GamesofpokerService: GamesofpokerService, private PokergamesService: PokergamesService,
    private FileformatServiceService: FileformatServiceService) {
    
    this.filterForm = new FormGroup({
      // skills: new FormControl(),
      faceParametersName:new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      Currency: new FormControl(),
      Game: new FormControl(),
      PlayerNickname: new FormControl(),
      PlayerLogin: new FormControl(),
      TableName: new FormControl(),
      Face: new FormControl(),
      SessionId: new FormControl("",[Validators.minLength(32), Validators.maxLength(32)]),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })

    console.log(this.filterForm.controls['SessionId'].errors)
  }

  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()-7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    this.filterForm.patchValue({
      startTime : this.startTime,
      startDate : this.startDate,
      endDate : this.endDate,
      endTime : this.endTime
    })

    this.faceParameters();
    this.walletType();
    this.GamesConfig();
    let body = {
      "firstRecord": "0",
      "maxCountRecord": "1"
    }
    this.PokergamesService.getPokerGameSessions(body).subscribe((res) => console.log(res))
  }


  changeSelect(date: string) {
    // console.log(event.target.value)
    // console.log( this.selectedTabletype)
    // let date = 555555
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    // console.log(date)
    // console.log(c)

    return (c)


  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
 
  faceParameters() {
    const faceParameters = localStorage.getItem('faceParameters')
    if (faceParameters) {
      this.faceParameterslist = JSON.parse(faceParameters)
    }
    console.log(this.faceParameterslist);


    for (let i = 0; i < this.faceParameterslist.length; i++) {
      this.allFaceParametersNames[i] = this.faceParameterslist[i].name;
      this.faceParameterSelectedItems[i] =  this.faceParameterslist[i].name;
    }
    console.log(this.faceParameterSelectedItems);
    this.faceParametersdropDownCheckedList = this.faceParameterSelectedItems
    
    


    this.faceParametersdropdown = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: false
    };

  }
  // walletFormats() {
  //   const walletTypes = localStorage.getItem("walletTypes")walletTypes
  //   if (walletTypes) {
  //     this.walletFormatsList = JSON.parse(walletTypes)
  //     for (let i = 0; i < this.walletFormatsList.length; i++) {
  //       if (this.walletFormatsList[i].description == "U.S. Dollars" || this.walletFormatsList[i].description == "Chips") {
  //         this.walletlists.push(this.walletFormatsList[i])
  //       }
  //     }
  //   }
  //   console.log(this.walletFormatsList)
  //   console.log(this.walletlists)
  // }
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
    let list:any = this.GamesofpokerService.GamesConfig();
    console.log(list)
    this.filterItem = list[0] //*Required
      this.allGammeNamesWithCurrency =list[1] //*Notrequired
      this.gamescaption = list[2] //*Required
      this.allGammeNames = list[3] //*Notrequired
      this.onlyPokerGames =list[4] //*Notrequired
      this.uniquegamescaption =list[5] //*Notrequired
      console.log(this.allGammeNamesWithCurrency)
      this.checkboxesIndivisualGames = list[6] //*Notrequired
      this.gamesListofarrays = list[13]
      for(let k=0; k<this.filterItem.length;k++){
        this.checkedList[k] = true
      }
    console.log(  this.gamescaption)
  }

// *******************************@currency drpndn Starts*********************************
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

  // *************************************@currency drpdn ends************************

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
    this.pokerGamesCheckbox = pokerGamesCheckbox


  }



  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn

  }



  onItemSelectfaceParameters(item: any) {
    this.faceParametersdropDownCheckedList.push(item.name);
    // console.log("selectedItem : ", item);
    // console.log(this.faceParametersdropDownCheckedList);
  }

  OnItemDeSelectfaceParameters(item: any) {
    this.faceParametersdropDownCheckedList = this.faceParametersdropDownCheckedList.filter((eachItem: any) => eachItem != item.name)
    // console.log("deletedItem : ", item);
    // console.log(this.faceParametersdropDownCheckedList);
  }
  onSelectAllfaceParameters(items: any) {
    for(let m=0; m<items.length; m++){
      this.faceParametersdropDownCheckedList[m] = items[m].name;
    };
    // console.log("selectedAllItem : ", items);
    // console.log(this.faceParametersdropDownCheckedList);
  }
  onDeSelectAllfaceParameters(items: any) {
    this.faceParametersdropDownCheckedList =[];
    
    // console.log("DeleteAllItem : ", items);
    // this.faceParametersdropDownCheckedList = this.faceParameterSelectedItems;
    // console.log(this.faceParametersdropDownCheckedList);

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
    return dirtyValues
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





  onFormSubmit() {
    console.log(this.faceParametersdropDownCheckedList.length);
    console.log(this.faceParameterSelectedItems)
    console.log(this.filterForm.value)
    this.pokerGameSessiondata = false
    this.FillterMenu = false;
    this.loader = true;

    let SessionId = this.filterForm.value.SessionId
    console.log(SessionId)
    console.log(this.filterForm.value.SessionId)
    var gameSessionGuide;
    if(SessionId != null && SessionId != undefined && SessionId != ''){
      let hiLong = parseInt(SessionId.slice(0,16), 16)
      let lowLong = parseInt(SessionId.slice(16), 16)
      gameSessionGuide = {
        hiLong,
        lowLong
      }
      console.log(gameSessionGuide)
    }

    this.getDirtyValues(this.filterForm)
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    
    fillterbody["gameNames"] = this.selectedFillterGames.length === 0 ?this.allGammeNamesWithCurrency:this.selectedFillterGames;
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    // fillterbody["startDate"] = this.filterForm.value.Datefrom != null ? { "end": this.filterForm.value.Dateto, "start": this.filterForm.value.Datefrom } : undefined
    fillterbody["startDate"] =  (this.filterForm.value.startDate != null && this.filterForm.value.startDate != "") ? { "start": this.filterForm.value.startDate +"T"+ this.filterForm.value.startTime , "end": this.filterForm.value.endDate + "T"+  this.filterForm.value.endTime } : (this.filterForm.value.endDate != null && this.filterForm.value.endDate !== "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined
    fillterbody["nicknameMask"] = this.filterForm.value.PlayerNickname != null ? this.filterForm.value.PlayerNickname : undefined;
    fillterbody["loginMask"] = this.filterForm.value.PlayerLogin != null ? this.filterForm.value.PlayerLogin : undefined;
    fillterbody["tableNameMask"] = this.filterForm.value.TableName != null ? this.filterForm.value.TableName : undefined;
    // fillterbody["networkNames"] = this.filterForm.value.Face != null ? [this.filterForm.value.Face] : undefined
    fillterbody["networkNames"] = this.faceParametersdropDownCheckedList.length === 0? this.allFaceParametersNames:this.faceParametersdropDownCheckedList;
    fillterbody["gameSessionId"] = gameSessionGuide
  this.PokergamesService.getPokerGameSessions(fillterbody).subscribe((res) => { this.pokerGameSessionsRes(res) }
    )
  }
  pokerGameSessionsRes(data: any) {
    console.log(data);
    if(data){
      this.pokerGameSessiondata = data.objectList;
      this.ResultCount = data.resultCount
      this.rowsOnthePage = data.objectList.length;
    }
    
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.ResultCount !== null || this.pokerGameSessiondata.resultCount == 0 || data == null) {
      this.loader = false;
    }

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }

    console.log(data)

    // for (let j = 0; j < this.gamesListofarrays.length; j++) {
    //   if (this.PokerTableHistoryData[i].gameName == this.gamesListofarrays[j].name) {
    //     this.PokerTableHistoryData[i].gameName = this.gamesListofarrays[j].caption
    //   }
    // }



    for (let i = 0; i < this.pokerGameSessiondata.length; i++) {
      for (let j = 0; j < this.walletlists.length; j++) {
        if (this.pokerGameSessiondata[i].initialBalance.wallet.lowLong == this.walletlists[j].guid.lowLong) {
          this.pokerGameSessiondata[i].initialBalance.wallet = this.walletlists[j].description
        }
      }

      for (let k = 0; k < this.gamesListofarrays.length; k++) {
        // console.log(this.gamescaption[k].caption)
        console.log(this.pokerGameSessiondata[i].gameName == this.gamesListofarrays[k].name)
        if (this.pokerGameSessiondata[i].gameName == this.gamesListofarrays[k].name) {
          this.pokerGameSessiondata[i].gameName = this.gamesListofarrays[k].caption
          break
        }
      }
      // for (let i = 0; i < this.pokerGameSessiondata.length; i++) {
      //   for (let j = 0; j < this.gamesListofarrays.length; j++) {
      //     if (this.PokerTableHistoryData[i].gameName == this.gamesListofarrays[j].name) {
      //       this.PokerTableHistoryData[i].gameName = this.gamesListofarrays[j].caption
      //     }
      //   }
      // for (let k = 0; k < this.gamescaption.games.length; k++) {
      //   if (this.pokerGameSessiondata[i].gameName == this.GamesConfigList.games[k].name) {
      //     this.pokerGameSessiondata[i].gameName = this.GamesConfigList.games[k].caption
      //   }
      // }

      let hexadecimalValue = this.pokerGameSessiondata[i].guid.hiLong.toString(16).padStart(16, "0") + this.pokerGameSessiondata[i].guid.lowLong.toString(16).padStart(16, '0')
      console.log(hexadecimalValue)
      this.pokerGameSessiondata[i].hexadecimalValue = hexadecimalValue
    }

  }

  getGamepokergamesessionActiveHands(listHands:any):any{
    if(listHands<=0){
      return false
    }else{
     return true
    }
  }

  navigatePokerHandsHistory(list:any){
  
    console.log(list);
    // localStorage.setItem("gameSessionId",JSON.stringify(list))
    sessionStorage.setItem("gameSessionId",JSON.stringify(list))
    this.router.navigateByUrl("PokergamesessionHandshistory");
    
    // this.router.navigate(['/PokergamesessionHandshistory'],{queryParams:{hiLong:list?.hiLong,lowLong:list?.lowLong}})
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
    XLSX.writeFile(wb, 'PokerGameSessionsExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element,"PokerGameSessionsExcelSheet")
  }
  onClick(data: any) {
    console.log(data)
    this.PokerGameSessionsDetails = this.pokerGameSessiondata[data]
    console.log(this.PokerGameSessionsDetails)
    this.PokerGameSessionsDetailsPopUp = true;
  }
  closepopup() {
    this.PokerGameSessionsDetailsPopUp = false;
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
    if (this.PageCount > this.pokerGameSessiondata.length) {

      this.pagecontrolbtn = true
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
    if (this.PageCount > this.pokerGameSessiondata.length) {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }
}
