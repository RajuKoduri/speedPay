import { Component, OnInit,OnDestroy } from '@angular/core';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';

import * as moment from 'moment';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.css']
})
export class ParticipationComponent implements OnInit,OnDestroy {
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
  filterItem: any=[];
  onlyPokerGames: any=[];
  startDate: any;
  endDate: any;
  todaydate: any;
  startTime:any= "00:00:00";
  endTime:any = "23:59:59";
  steddate: boolean =false;
  timeerror: boolean = false;

 
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  dropdownSetting = {};
  dropDownCheckedList: any = [];
  selectedFillterGames: any =[];
  gamesTobeSelected: any = "All";
  Filtergamesbtn: boolean = false;
  pokerGamesCheckbox: boolean = true;
  // checkedList: any = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  checkedList: any = [];
  
  convertedArray: string[] = [];
  faceconvertedarray: string[] = [];
  faceParameterslist12: any;
  dropdownList12: any = [];
  selectedItems12: any = [];
  allGammeNamesWithCurrency: any = [];
  
  constructor(private GamesofpokerService:GamesofpokerService, private DateTimePipe:DateTimePipe, private PokergamesService: PokergamesService,
    private CommomfilterService: CommomfilterService, private FileformatServiceService: FileformatServiceService) {
      this.dates()
    this.filterForm = new FormGroup({
      // Datefrom: new FormControl(),
      // Dateto: new FormControl(),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      Currency: new FormControl(),
      networkNames: new FormControl(),
      Game: new FormControl(),
      PlayerNickname: new FormControl(),
      PlayerLogin: new FormControl(),
      TableName: new FormControl(),
      Face: new FormControl(),
      SessionId: new FormControl(),
      Winsorloss: new FormControl(),
      firstRecord: new FormControl(1, this.CommomfilterService.requiredAndMinOne()),
      maxCountRecord: new FormControl(500, this.CommomfilterService.requiredAndMinOne()),
    })
    console.log(this.filterForm)                        
  }

  ngOnInit(): void {
    this.selectedItems12 = [];
    this.faceParameters();
    this.walletType();
    this.GamesConfig()
   
  }
dates(){
  this.endDate = new Date();
  let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()-7);
  let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
  this.startDate
  let datee = moment(new Date(today)).format('YYYY-MM-DD');
  let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
  this.startDate = datee;
  this.endDate = dateE;
  this.todaydate = moment(new Date()).format('YYYY-MM-DD');
}
  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
    // throw new Error('Method not implemented.');
  }

  get f() {
    // console.log(this.CreateAdminForm.value.loginName.key)
    // this.filterForm.get('firstRecord')?.touched
    return this.filterForm.controls;

  }

  changeSelect(date:string){
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
     return (c)
  }



  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
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
  faceParameters() {
    // const faceParameters = localStorage.getItem('faceParameters')
    // if (faceParameters) {
    //   this.faceParameterslist = JSON.parse(faceParameters)
    // }
    // console.log(this.faceParameterslist)
      this.convertedArray=[]
      this.faceconvertedarray=[]
      this.faceParameterslist12 = this.CommomfilterService.selectallst();
      console.log(this.faceParameterslist12);
    
      this.faceParameterslist12.forEach((item: { name: string }) => {
        this.convertedArray.push(item.name);
        this.faceconvertedarray.push(item.name);
      });
      console.log(this.convertedArray);
      this.dropdownList12 = this.faceParameterslist12;
      console.log(this.dropdownList12);
      this.dropdownSetting = {
        singleSelection: false,
        idField: 'name',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false,
      };
      this.selectedItems12 = this.dropdownList12;
  }
  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn

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

  
  // walletType() {
  //   const walletTypes = localStorage.getItem("walletTypes")
  //   if (walletTypes)
  //     this.walletFormatsList = JSON.parse(walletTypes)

  //   for (let i = 0; i < this.walletFormatsList.length; i++) {
      // if (this.walletFormatsList[i].description == "U.S. Dollars" || this.walletFormatsList[i].description == "Chips") {
  //     if (this.walletFormatsList[i].clubGameWallet == true) {
  //       this.walletlists.push(this.walletFormatsList[i])
  //     }
  //   }
  //   console.log(this.walletFormatsList[2])
  //   console.log(this.walletlists)
  // }
  onFormSubmit() {
    console.log(this.filterForm.value);
    console.log(this.selectedFillterGames.length);
    console.log(this.gamesTobeSelected);
    this.pokerGameSessiondata = false
    this.FillterMenu = false;
    this.loader = true;
    this.getDirtyValues(this.filterForm)
    let fillterbody = this.getDirtyValues(this.filterForm);
    console.log(fillterbody)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["startDate"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate != "") ? { "start": this.filterForm.value.startDate +"T"+ this.filterForm.value.startTime , "end": this.filterForm.value.endDate + "T"+  this.filterForm.value.endTime } :
                               ( this.filterForm.value.endDate != null && this.filterForm.value.endDate !="")?{"end": this.filterForm.value.endDate + "T"+  this.filterForm.value.endTime}: undefined;
    fillterbody["nicknameMask"] = this.filterForm.value.PlayerNickname != null ? this.filterForm.value.PlayerNickname : undefined;
    fillterbody["loginMask"] = this.filterForm.value.PlayerLogin != null ? this.filterForm.value.PlayerLogin : undefined;
    fillterbody["tableNameMask"] = this.filterForm.value.TableName != null ? this.filterForm.value.TableName : undefined;
    fillterbody["networkNames"] = this.convertedArray != null ? this.convertedArray : undefined;
    fillterbody["gameNames"] = this.selectedFillterGames.length === 0 ? this.allGammeNamesWithCurrency : this.selectedFillterGames;
    // fillterbody["networkNames"] = this.convertedArray != null ? this.convertedArray : undefined;
    // fillterbody["gameSessionId"] 

    this.PokergamesService.getPokerGameSessions(fillterbody).subscribe((res) => { this.pokerGameSessionsRes(res) }
    )
  }
  pokerGameSessionsRes(data: any) {
    console.log(data)
    this.pokerGameSessiondata = data.objectList;
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.ResultCount !== null || this.pokerGameSessiondata.resultCount == 0 || data == null) {
      this.loader = false;
    }
    for (let i = 0; i < this.pokerGameSessiondata.length; i++) {
      for (let j = 0; j < this.walletlists.length; j++) {
        if (this.pokerGameSessiondata[i].initialBalance.wallet.lowLong == this.walletlists[j].guid.lowLong) {
          this.pokerGameSessiondata[i].initialBalance.wallet = this.walletlists[j].description
        }
      }
      for (let k = 0; k < this.onlyPokerGames.length; k++) {
        if (this.pokerGameSessiondata[i].gameName == this.onlyPokerGames[k].name) {
          this.pokerGameSessiondata[i].gameName = this.onlyPokerGames[k].caption
        }
      }
    }

    if(this.ResultCount == this.rowsOnthePage || this.ResultCount==0){
      console.log("_________");
         this.pagecontrolbtn = true
       }else{
         this.pagecontrolbtn = false
       }

       console.log(this.ResultCount  , this.rowsOnthePage , this.pagecontrolbtn)
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
    XLSX.writeFile(wb, 'PokerGameSessionsExcelSheet.xlsx');

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

  GamesConfig (){
    let list:any = this.GamesofpokerService.GamesConfig();
    console.log(list)
    this.filterItem = list[0] //*Required
      this.allGammeNamesWithCurrency =list[1] 
      // this.gamescaption = list[2] //*Required
      // this.allGammeNames = list[3] //*Notrequired
      this.onlyPokerGames =list[4] //*Notrequired
      // this.uniquegamescaption =list[5] //*Notrequired
      // this.checkboxesIndivisualGames = list[6] //*Notrequired

      for(let k=0; k<this.filterItem.length;k++){
        this.checkedList[k] = true
      }
  

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


  // **********************************************************************
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
// **********************************************face_multidrop_starts*********************

  onItemSelectnew(data: any) {
    this.convertedArray=[]
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
   
    console.log(this.convertedArray);
  }
  OnItemDeSelectnew(data: any) {
    this.convertedArray=[]
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }


  onSelectAllnew(data: any) {
    this.convertedArray = [];
    data.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }
  onDeSelectAllnew(data: any) {
    this.convertedArray = [];
    // data.forEach((item: { name: string }) => {
    //   this.convertedArray.push(item.name);
    // });
    this.convertedArray = this.faceconvertedarray
    console.log(this.convertedArray);
  }

  // **********************************************face_multidrop_ends*********************
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element,"PlayerAccessRulesExcelSheet")
  }
}
