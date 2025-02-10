import { Component, OnInit,OnDestroy } from '@angular/core';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { tr } from 'date-fns/locale';
@Component({
  selector: 'app-active-tables',
  templateUrl: './active-tables.component.html',
  styleUrls: ['./active-tables.component.css']
})
export class ActiveTablesComponent implements OnInit ,OnDestroy{
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
  endDate: any;
  startDate: any;
  todaydate: any;



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
  selectedFillterGames: any =[];
  gamesTobeSelected: any = "All";
  checkedList: any = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  pokerGamesCheckbox: boolean = true;
  gamesListofarrays: any[] =[];
  currencyFormatsSymbol: any[]=[];

 timeerror: boolean =false;
  steddate: boolean =false;
  startTime:any= "00:00:00"
  endTime:any = "23:59:59"
  // FileformatServiceService: any;
  constructor(private DateTimePipe:DateTimePipe,private GamesofpokerService: GamesofpokerService,  private PokergamesService: PokergamesService,
    private FileformatServiceService:FileformatServiceService ) { 
    this.filterForm = new FormGroup({
      skills: new FormControl(),
      Datefrom: new FormControl(),
      Dateto: new FormControl(),
      Currency: new FormControl(),
      Game: new FormControl(),
      StakesFrom: new FormControl(),
      StakesTo: new FormControl(),
      PlayerNickNmae: new FormControl(),
      PlayerLogin: new FormControl(),
      TableName: new FormControl(),
      Hand: new FormControl(),
      Tables: new FormControl(),
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



  ngOnInit(): void {

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()-7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    this.PokerTableType();
    // this.walletFormats();
    this.walletType();
    this.GamesConfig();

    //this.endDate = new Date();
    //let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() );
    // this.startDate = moment(new Date()).format('YYYY-MM-DD');

  
  }

  changeSelect(date: string) {
    // console.log(event.target.value)
    // console.log( this.selectedTabletype)
    // let date = 555555
   let c = this.DateTimePipe.transforminingDispalyDate(date);
     console.log(c)
    console.log(date)
    console.log(c)

    return (c)


  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  PokerTableType() {
    const PokerTableType = localStorage.getItem("PokerTableType");
    if (PokerTableType) {
      this.PokerTableTypeList = JSON.parse(PokerTableType)
    }
    console.log("PokerTableTypeList", this.PokerTableTypeList)
    for(let j=0; j< this.PokerTableTypeList.length; j++){
      if(this.PokerTableTypeList[j].value=="Jackpot"){
        this.PokerTableTypeList.splice(j,1,)

      }
    }
    this.filterForm.patchValue({
      Tables:this.PokerTableTypeList[0].guid
    });
  }



  walletType() {

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
    let list:any = this.GamesofpokerService.GamesConfig();
    console.log(list)
    this.filterItem = list[0] //*Required
      this.allGammeNamesWithCurrency =list[1] //*Notrequired
      this.gamescaption = list[2] //*Required
      this.allGammeNames = list[3] //*Notrequired
      this.onlyPokerGames =list[4] //*Notrequired
      this.uniquegamescaption =list[5] //*Notrequired
      this.checkboxesIndivisualGames = list[6] //*Notrequired
      this.gamesListofarrays = list[13]
      this.currencyFormatsSymbol = list[14]
      

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
    this.pokerGamesCheckbox = pokerGamesCheckbox


  }



  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn

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
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;

    fillterbody["datePeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
    (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;
    // fillterbody["datePeriod"] = this.filterForm.value.Datefrom != null ? { "start": this.filterForm.value.StartDate+ 'T00:00:00',, "end": this.filterForm.value.Dateto } : undefined;
    // fillterbody["gameNames"] = this.filterForm.value.Game != null ? [this.filterForm.value.Game] : undefined;
    fillterbody["gameNames"] = this.selectedFillterGames.length === 0 ? this.allGammeNamesWithCurrency:this.selectedFillterGames;
    fillterbody["nicknameMask"] = this.filterForm.value.PlayerNickNmae != null ? this.filterForm.value.PlayerNickNmae : undefined;
    fillterbody["loginMask"] = this.filterForm.value.PlayerLogin != null ? this.filterForm.value.PlayerLogin : undefined;
    fillterbody["tableName"] = this.filterForm.value.TableName != null ? this.filterForm.value.TableName : undefined;
    fillterbody["hand"] = this.filterForm.value.Hand != null ? this.filterForm.value.Hand : undefined;
    fillterbody["tableType"] = this.filterForm.value.Tables != null ? this.filterForm.value.Tables : undefined;
    fillterbody["stakes"] = {"low":this.filterForm.value.StakesFrom,"high" :this.filterForm.value.StakesTo} ;
    this.PokergamesService.getPokerTableHistory(fillterbody).subscribe((data) =>{
      this.PokerTableHistoryRes(data)
    },
    error =>{
      this.loader = false;
    }
    )
  }

  PokerTableHistoryRes(data: any) {
    console.log(data);
    if(data){
      this.PokerTableHistoryData = data.objectList;
      this.ResultCount = data.resultCount;
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
            if (this.walletlists[n].currency?.lowLong == this.currencyFormatsSymbol[j].guid?.lowLong && this.walletlists[n].currency?.highLong == this.currencyFormatsSymbol[j].guid?.highLong)  {
              this.PokerTableHistoryData[i].highStake.wallet = this.currencyFormatsSymbol[j].currencyCode
              console.log(this.currencyFormatsSymbol[j].currencyCode)

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


    // for (let i = 0; i < this.PokerTableHistoryData.length; i++) {
    //   for (let j = 0; j < this.gamescaption.length; j++) {
    //     if (this.PokerTableHistoryData[i].gameName == this.gamescaption[j].name) {
    //       this.PokerTableHistoryData[i].gameName = this.gamescaption[j].caption
    //     }
    //   }
    //   for (let n = 0; n < this.walletlists.length; n++) {
    //     if (this.PokerTableHistoryData[i].highStake.wallet.lowLong == this.walletlists[n].guid.lowLong) {
    //       this.PokerTableHistoryData[i].highStake.wallet = this.walletlists[n].description
    //     }
    //   }
    // }
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
    XLSX.writeFile(wb, 'PokerTableHistoryExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element,"PokerTableHistoryExcelSheet")
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
}
