import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pokertableshistory',
  templateUrl: './pokertableshistory.component.html',
  styleUrls: ['./pokertableshistory.component.css']
})
export class PokertableshistoryComponent implements OnInit, OnDestroy {
  FillterMenu: any;
  filterForm: FormGroup;
  PageCount: number = 0;
  PokerTableHistoryData: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  pokerPlayerData: any;
  pokerTournamentDatapopup: boolean = false;
  pagecontrolbtn: boolean = false;
  loader: boolean = false;
  PokerTableTypeList: any;
  walletFormatsList: any;
  walletlists: any = [];
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
  // checkedList: any = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  checkedList: any = [];
  pokerGamesCheckbox: boolean = true;
  selectedTabletype: any;
  gamesListofarrays: any[] = [];
  currencyFormatsSymbol: any[] = [];
  steddate: boolean = false
  timeerror: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  endDate: any = Date;
  startDate: any;
  todaydate: any;
  CloseTableData: any;
  popupArrow: boolean = false;
  SeletedIconIndex: any;
  ActionPlayerdata: any;
  SpinnwerT: boolean = false;
  CloseTablePopup: boolean = false;
  ForcedCheckbox: boolean = false;

  location:any;
  playerGUID: any;
  playerExporer: boolean =false;



  constructor(private router: Router, private DateTimePipe: DateTimePipe, private GamesofpokerService: GamesofpokerService, private PokergamesService: PokergamesService,
    private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      // skills: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      Currency: new FormControl(),
      Game: new FormControl(),
      StakesFrom: new FormControl(),
      StakesTo: new FormControl(),
      PlayerNickNmae: new FormControl(),
      PlayerLogin: new FormControl(),
      TableName: new FormControl(),
      Hand: new FormControl(),
      Tables: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  };

  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // this.location = window.location.pathname
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if(this.location == "/playerexplorer/pokertableshistory"){
      this.playerExporer = true;
    }else{
      this.playerExporer = false;
    }

    this.PlayerGuid();

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;



    this.PokerTableType();
    // this.walletFormats();
    this.walletType();
    this.GamesConfig();

  }

  PlayerGuid(){
    let Playerguid = sessionStorage.getItem('Playerguid')
    console.log(Playerguid)
    if (Playerguid) {
      this.playerGUID = JSON.parse(Playerguid);
      console.log(this.playerGUID)
    }

  }

  changeSelect(date: string):any {
     if(date != undefined){
       let c = this.DateTimePipe.transforminingDispalyDate(date);
       return (c)

     }
  

   

  }
  test(myDuration: any) {
    console.log(myDuration)
    return (Math.floor(myDuration / (1000 * 60 * 60 * 24)) + ": " + Math.floor(myDuration / (1000 * 60 * 60)) + ":" + Math.floor(myDuration / (1000 * 60)) % 60 + ":" + Math.floor(myDuration / 1000) % 60);
  }


  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  PokerTableType() {
    const PokerTableType = localStorage.getItem("PokerTableType");
    if (PokerTableType) {
      this.PokerTableTypeList = JSON.parse(PokerTableType)
    }
    console.log("PokerTableTypeList", this.PokerTableTypeList);
    this.filterForm.patchValue({
      Tables: this.PokerTableTypeList[0].guid
    })
    this.selectedTabletype = this.PokerTableTypeList[0].guid
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

    // console.log("GamesConfig", this.GamesConfigList)
    // console.log("GamesConfig", this.GamesConfigList.games)
    // this.gamesListofarrays = this.GamesConfigList.games

    let list: any = this.GamesofpokerService.GamesConfig();
    console.log(list)
    this.filterItem = list[0] //*Required
    this.allGammeNamesWithCurrency = list[1] //*Notrequired
    this.gamescaption = list[2] //*Required
    this.allGammeNames = list[3] //*Notrequired
    this.onlyPokerGames = list[4] //*Notrequired
    this.uniquegamescaption = list[5] //*Notrequired
    this.checkboxesIndivisualGames = list[6] //*Notrequired
    this.gamesListofarrays = list[13]
    this.currencyFormatsSymbol = list[14]

    for (let k = 0; k < this.filterItem.length; k++) {
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
    console.log("selectedFillterGames : ----", selectedFillterGames, "gamesTobeSelected  : --",gamesTobeSelected)
    console.log(this.selectedItems);


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







  resetForm() {
    this.filterForm.reset();
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
  onFormSubmit() {
    this.popupArrow = false;
    console.log(this.filterForm.value)
    this.PokerTableHistoryData = false
    this.loader = true
    this.FillterMenu = false;
    this.getDirtyValues(this.filterForm)
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody);

    if (this.filterForm.value.maxCountRecord > 1) {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    } else {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord - 1 / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    }

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    // fillterbody["datePeriod"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.Datefrom, "end": this.filterForm.value.endDate } : undefined;
    fillterbody["datePeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate != "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "")? {"end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime}: undefined ;
    // fillterbody["gameNames"] = this.filterForm.value.Game != null ? [this.filterForm.value.Game] : undefined;
    fillterbody["gameNames"] = this.selectedFillterGames.length === 0 ? this.allGammeNamesWithCurrency : this.selectedFillterGames;
    fillterbody["stakes"] = this.filterForm.value.StakesTo != null ? { "low": this.filterForm.value.StakesFrom, "high": this.filterForm.value.StakesTo } : undefined;
    fillterbody["nicknameMask"] = this.filterForm.value.PlayerNickNmae != null ? this.filterForm.value.PlayerNickNmae : undefined;
    fillterbody["loginMask"] = this.filterForm.value.PlayerLogin != null ? this.filterForm.value.PlayerLogin : undefined;
    fillterbody["tableName"] = this.filterForm.value.TableName != null ? this.filterForm.value.TableName : undefined;
    fillterbody["hand"] = this.filterForm.value.Hand != null ? this.filterForm.value.Hand : undefined;
    fillterbody["tableType"] = this.filterForm.value.Tables != null ? this.filterForm.value.Tables : undefined;
    
    // getPlayerPokerTableHistory
    if(this.playerExporer == false){
      this.PokergamesService.getPokerTableHistory(fillterbody).subscribe((data) => this.PokerTableHistoryRes(data))
    }else{
      fillterbody['players'] = {
        idList : [this.playerGUID],
      }
     
      this.PokergamesService.getPlayerPokerTableHistory(fillterbody).subscribe((data) => this.PokerTableHistoryRes(data))

    }
  }

  PokerTableHistoryRes(data: any) {
    console.log(data);
    if (data) {
      this.PokerTableHistoryData = data.objectList;
      const myObjData = data.objectList;
      this.CloseTableData = JSON.parse(JSON.stringify(myObjData))
      this.ResultCount = data.resultCount
      this.rowsOnthePage = data.objectList.length;
    };

    if (this.ResultCount !== null) {
      this.resultcount = false;
      this.loader = false;
    }
    for (let i = 0; i < this.PokerTableHistoryData.length; i++) {
      for (let j = 0; j < this.gamesListofarrays.length; j++) {
        if (this.PokerTableHistoryData[i].gameName == this.gamesListofarrays[j].name) {
          this.PokerTableHistoryData[i].gameName = this.gamesListofarrays[j].caption
        }
      }



      for (let n = 0; n < this.walletlists.length; n++) {
        if (this.PokerTableHistoryData[i].highStake.wallet.lowLong == this.walletlists[n].guid.lowLong) {
          for (let j = 0; j < this.currencyFormatsSymbol.length; j++) {
            if (this.walletlists[n].currency?.lowLong == this.currencyFormatsSymbol[j].guid?.lowLong && this.walletlists[n].currency.highLong == this.currencyFormatsSymbol[j].guid.highLong) {
              this.PokerTableHistoryData[i].highStake.wallet = this.currencyFormatsSymbol[j].currencyCode
              console.log(this.currencyFormatsSymbol[j].currencyCode)
            }
          }
        }
      }
    }

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)|| this.ResultCount == this.PageCount) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }

  }

  showmanu(index: number, id: any): void {
    this.popupArrow = !this.popupArrow;
    // this.CashoutApporvePopUp = true;
    this.SeletedIconIndex = index;
    console.log(index)
    console.log(id);
    this.ActionPlayerdata = this.CloseTableData[index];
    console.log(this.ActionPlayerdata)

  }
  setPlayerActions(Type: any, index: any) {
    this.popupArrow = false;
    this.CloseTablePopup = true
    // this.ActionType = Type;
    // console.log(this.ActionType)
    // this.enableddisbletext = Type
    // switch (Type) {
    //   case 'Enabled': {
    //     this.enableddisbletext = 'Enable'
    //     this.enableddisabledepop = true;

    //     break;
    //   }

  }
  ForcedCheck(event: any) {
    this.ForcedCheckbox = event.target.checked;
    console.log(this.ForcedCheckbox)
  }
  CloseTable(type: any) {
    this.CloseTablePopup = false;

    const keysToExtract = ["objState", "guid", "gameName", "hands", "highStake", "lowStake",
      "name", "pot", "rake", "rakedHandsPercent", "shareType", "startDate"];

    const selectedKeysObject: any = {};
    keysToExtract.forEach(key => {
      if (this.ActionPlayerdata.hasOwnProperty(key)) {
        selectedKeysObject[key] = this.ActionPlayerdata[key];
      }
    });

    // for (let i = 0; i < keysToExtract.length; i++) {
    //   // const key = keysToExtract[i];
    //   if (this.ActionPlayerdata.hasOwnProperty(keysToExtract[i])) {
    //     console.log(keysToExtract[i])
    //     selectedKeysObject[keysToExtract[i]] = this.ActionPlayerdata[keysToExtract[i]];
    //   }
    // }
    console.log(selectedKeysObject);

    const keyNamesToExtract = ["guid", "hands", "objState"];
    // const selectedKeysObjectss = Object.fromEntries(
    const selectedKeysObjectss = Object.fromEntries(
      Object.entries(this.ActionPlayerdata)
        .filter(([key]) => keyNamesToExtract.includes(key))
    );
    console.log(selectedKeysObjectss)

    if (type == "Yes") {
      this.SpinnwerT = true;
      let body = {
        "force": this.ForcedCheckbox,
        "table": selectedKeysObject
        // "table": {
        //   "objState": 0,
        //   "guid": this.ActionPlayerdata.guid,
        //   "gameName": this.ActionPlayerdata.gameName,
        //   "hands": this.ActionPlayerdata.hands,
        //   "highStake": this.ActionPlayerdata.highStake,
        //   "lowStake": this.ActionPlayerdata.lowStake,
        //   "name": this.ActionPlayerdata.name,
        //   "pot": this.ActionPlayerdata.pot,
        //   "rake": this.ActionPlayerdata.rake,
        //   "rakedHandsPercent": this.ActionPlayerdata.rakedHandsPercent,
        //   "shareType": this.ActionPlayerdata.shareType,
        //   "startDate": this.ActionPlayerdata.startDate,
        // }
      }
      console.log(body)
      this.PokergamesService.closePokerTable(body).subscribe(data => {
        console.log(data)
        if (data.changedObjectList) {
          this.SpinnwerT = false;
          this.onFormSubmit();
        }
      })
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
    XLSX.writeFile(wb, 'PokerTableHistoryExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PokerTableHistoryExcelSheet")
  }
  PlayerPopup(data: any) {
    console.log(data)
    this.pokerPlayerData = this.PokerTableHistoryData[data];
    console.log(this.pokerPlayerData)
    this.pokerTournamentDatapopup = true;
  }

  closepopup() {
    this.pokerTournamentDatapopup = false;
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
    if (this.PageCount > this.PokerTableHistoryData.length) {

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
    
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)|| this.ResultCount == this.PageCount) {
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
    if (this.PageCount > this.PokerTableHistoryData.length) {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }
  getGamepokertableHandsActiveHands(listHands: any): any {
    if (listHands <= 0) {
      return false
    } else {
      return true
    }
  }
  navigatePokerTableHistory(i: any) {
    // this.router.navigateByUrl("pokertablespokerhandshistory");
    const dataToSend = { key: 'value' };
    // this.router.navigateByUrl("pokertablespokerhandshistory"), {
    //   data: { data: dataToSend },
    // };
    this.router.navigateByUrl("pokertablespokerhandshistory"), 
    { queryParams: { data: JSON.stringify(dataToSend) } }
    this.GamesofpokerService.setData(this.PokerTableHistoryData[i].guid);
  }

  navigatePokerTableHistoryInPlayerExplorer(i:any){
    sessionStorage.setItem("gameSessionId",JSON.stringify(this.PokerTableHistoryData[i].guid))
    
    // var Url= window.location.hash ? '#/playerexplorer/pokertablespokerhandshistory':'/playerexplorer/pokertablespokerhandshistory';
    // this.router.navigateByUrl(Url);
    this.router.navigateByUrl("playerexplorer/pokertablespokerhandshistory");
    
  }

}
