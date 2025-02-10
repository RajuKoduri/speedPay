import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
@Component({
  selector: 'app-tournamenttickets',
  templateUrl: './tournamenttickets.component.html',
  styleUrls: ['./tournamenttickets.component.css']
})
export class TournamentticketsComponent implements OnInit {
  FillterMenu: boolean = false
  tournamentticketsGroupList: any;
  pokerGamesLoader: boolean = true;
  loader: boolean = false;
  loginForm: any = FormGroup;
  TournamnetTicketsgroup: any = FormGroup;
  filterForm: FormGroup;
  wallettype: any;
  wallettypes: any;
  walletFormatsList: any;
  walletlists: any = [];
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  TicketStatusList: any;
  TourneyTypeList: any;
  pagecontrolbtn: boolean = false;
  PageCount: number = 0;
  popupArrow: boolean = false;
  SeletedIconIndex: any;
  TicketActionsData: any; 
  SpinnwerT: boolean = false;
  CurrencyExchangPocketTypeList: any = [];
  convertTournyTicketType: any;
  ChangeTicketsPopUp: boolean = false;
  body: any;
  selectedItems: any = [];
  TicketStatusselectedItems:any=[];
  dropdownSettings = {};
  dropdownSettings2={};
  selectedFillterGames: any = [];
  formBuilder: any;
  dropdownList: any = [];
  dropDownCheckedList: any = [];
  gamesTobeSelected: any = "All";

  endDate: any;
  startDate: any;
  steddate: boolean = false
  timeerror: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  todaydate: any;


  setcreationdate: boolean = false
  creationtimeerror: boolean = false;
  creationstartDate: any;
  creationTime: any = "00:00:00"
  craetionendTime: any = "23:59:59"
  todaycreationdate: any;
  creationendDate: any;

  // selectedFillterGames: any;
  // gamesTobeSelected: any;
  selectedcurrency: any = [];
  currencyarray: any = [];
  currencystatus: any = [];
  dropdownSettingscurrency: any;
  walletFormats: any;

  location: any;
  playerGUID: any;
  playerExporer: boolean = false;
  ticketSelectBasedStatus: any=[];
  ticketDefaultBasedStatus: any =[];
  walletSelectedCurrency: any = [];
  walletDefaultCurrency: any = [];
  // walletlists: any = [];
  constructor(private DateTimePipe: DateTimePipe, private pokergamesService: PokergamesService, private GamesofpokerService: GamesofpokerService, formBuilder: FormBuilder,
    private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      // startDate: new FormControl(),
      // endDate: new FormControl(),
      creationTime: new FormControl(),
      craetionendTime: new FormControl(),
      creationstartDate: new FormControl(this.startDate, Validators.required),
      creationendDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      Currency: new FormControl(),
      TicketStatus:new FormControl(),
      CreationDatestart: new FormControl(),
      CreationDateend: new FormControl(),
      Utilizationstart: new FormControl(),
      Utilizationend: new FormControl(),
      PlayerLogin: new FormControl(),
      PlayerNickName: new FormControl(),
      SourceTournamentName: new FormControl(),
      TargetTournamentName: new FormControl(),
      Status: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }

  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
  }


  ngOnInit(): void {
    // this.location = window.location.pathname;
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location); // Log the current path

    if (this.location == "/playerexplorer/tournamenttickets") {
      this.playerExporer = true
      this.PlayerGuid();
      
    } else {
  
      this.playerExporer = false
    }

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.creationstartDate = datee;
    this.creationendDate = dateE;

    // this.TournamnetTicketsgroup = this.formBuilder.group({
    //   firstRecord: [1],
    //   maxCountRecord: [100],
    //   repotingstart: [null],
    //   repotingend: [null],
    // })
    // let filterbody = {}
    // let body = {};
    // this.pokergamesService.gettournamenttickets(body).subscribe(data => this.getPokerData(data))
    this.walletFormat();
    this.TicketStatus();
    this.TourneyType();
    this.CurrencyExchangPocketType();
  }

  PlayerGuid() {
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
    return (c);

    }
    
  }



  walletFormat() {
    let walletlists = this.GamesofpokerService.walletTypes();
    console.log("walletlists", walletlists);
    // this.filterForm.patchValue({
    //   Currency: this.walletlists[0].guid
    // })
    for (let i = 0; i < walletlists.length; i++) {
      if(walletlists[i].faceWallet ==true){
        this.walletlists.push(walletlists[i]);
        this.walletSelectedCurrency.push(walletlists[i]?.guid)
        this.walletDefaultCurrency.push(walletlists[i]?.guid)
      }
    }
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


  TicketStatus() {
    const TicketStatus = localStorage.getItem('TicketStatus');
    if (TicketStatus) {
      this.TicketStatusList = JSON.parse(TicketStatus)
    }
    console.log(this.TicketStatusList);


    for(let s=0; s<this.TicketStatusList.length; s++){
      this.TicketStatusselectedItems[s] = {
        guid: this.TicketStatusList[s].guid,
        value:this.TicketStatusList[s].value
      }
    }

    this.TicketStatusselectedItems.forEach((item:{guid:any}) => {
      this.ticketSelectBasedStatus.push(item.guid);
      this.ticketDefaultBasedStatus.push(item.guid)

    })

    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };


  }

  ticketonItemSelect(event:any){
    this.ticketSelectBasedStatus = [];

    this.filterForm.value.TicketStatus.forEach((item:{guid:any}) =>{
      this.ticketSelectBasedStatus.push(item.guid)
    })
    
    console.log("ticketonItemSelect -----:" , event);
    console.log(this.filterForm.value.TicketStatus)
  }
  ticketOnItemDeSelect(event:any){

    this.ticketSelectBasedStatus = [];

    this.filterForm.value.TicketStatus.forEach((item:{guid:any}) =>{
      this.ticketSelectBasedStatus.push(item.guid)
    })

    if(this.ticketSelectBasedStatus.length ==0){
      this.ticketSelectBasedStatus =  this.ticketDefaultBasedStatus
    }


    console.log("ticketOnItemDeSelect -----:" , event);
    console.log(this.filterForm.value.TicketStatus);
  }
  ticketonSelectAll(event:any){

    this.ticketSelectBasedStatus =  this.ticketDefaultBasedStatus


    console.log("ticketonSelectAll -----:" , event);
    console.log(this.filterForm.value.TicketStatus);
  }
  ticketonDeSelectAll(event:any){

    this.ticketSelectBasedStatus =  this.ticketDefaultBasedStatus;
    console.log("ticketonDeSelectAll -----:" , event);
    console.log(this.filterForm.value.TicketStatus);
  }






  TourneyType() {
    const TourneyType = localStorage.getItem("TourneyType")
    if (TourneyType) {
      this.TourneyTypeList = JSON.parse(TourneyType)
    }
    console.log("TourneyTypeList", this.TourneyTypeList)
  }
  CurrencyExchangPocketType() {
    const CurrencyExchangPocketType = localStorage.getItem("CurrencyExchangPocketType")
    if (CurrencyExchangPocketType) {
      JSON.parse(CurrencyExchangPocketType).forEach((item: any) => {
        if (item.value !== "Bonus") {
          this.CurrencyExchangPocketTypeList.push(item)
        }
      })
      this.CurrencyExchangPocketTypeList.reverse();
      this.convertTournyTicketType = this.CurrencyExchangPocketTypeList[0].value
      console.log("CurrencyExchangPocketTypeList", this.CurrencyExchangPocketTypeList)
    }
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu
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

    return dirtyValues;
  }
  onFormSubmit() {
    this.loader = true;
    this.pokerGamesLoader = false
    this.popupArrow = false
    this.tournamentticketsGroupList = false

    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    let filterbody = this.getDirtyValues(this.filterForm)
    filterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    filterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    filterbody["sourceTournamentName"]= this.filterForm.value.targetTournamentSettingsName != null ? this.filterForm.value.targetTournamentSettingsName: undefined;
    filterbody["targetTournamentSettingsName"] =  this.filterForm.value.TargetTournamentName != null ? this.filterForm.value.TargetTournamentName : undefined;
    
    
    // filterbody["wallets"] =[{'hiLong':0,"lowLong":1032}];
    filterbody["wallets"] = this.walletSelectedCurrency;

    // filterbody["statuses"] = [{'hiLong':0,"lowLong":0},{'hiLong':0,"lowLong":1}]
    filterbody["statuses"] = this.ticketSelectBasedStatus;
    if (this.location == "/playerexplorer/tournamenttickets") { 
      filterbody['playerGuids'] = [this.playerGUID];
  
      }else{
        filterbody['loginMask']= this.filterForm.value.PlayerLogin != null ?  this.filterForm.value.PlayerLogin :undefined;
        filterbody['nicknameMask'] = this.filterForm.value.PlayerNickName != null ? this.filterForm.value.PlayerNickName : undefined;
        filterbody['creationDate'] = (this.filterForm.value.creationstartDate != null && this.filterForm.value.creationstartDate != "") ? { "start": this.filterForm.value.creationstartDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.creationendDate + "T" + this.filterForm.value.endTime } : (this.filterForm.value.creationendDate != null && this.filterForm.value.endDate != "") ? {"end": this.filterForm.value.creationendDate + "T" + this.filterForm.value.endTime} : undefined;
        // filterbody['utilizationDate'] = (this.filterForm.value.creationstartDate != null && this.filterForm.value.creationstartDate != "") ? { "start": this.filterForm.value.creationstartDate + "T" + this.filterForm.value.creationTime, "end": this.filterForm.value.creationendDate + "T" + this.filterForm.value.craetionendTime } : (this.filterForm.value.creationendDate != null && this.filterForm.value.creationendDate !="")?{"end": this.filterForm.value.creationendDate + "T" + this.filterForm.value.craetionendTime}: undefined;
      }
    // filterbody["reportPeriod"] = this.filterForm.value.dateperiodstart != null ? { "start": this.filterForm.value.dateperiodstart, "end": this.pokertableformgroup.value.repotingend } : undefined
    // filterbody["reportPeriod"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined
    // filterbody["creationPeriod"] = this.filterForm.value.creationstartDate != null ? { "start": this.filterForm.value.creationstartDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.creationendDate + "T" + this.filterForm.value.craetionendTime } : undefined
    this.pokergamesService.listTournamentTickets(filterbody).subscribe(data => this.getPokerData(data))
  }
  filterPokerGroup() {
    console.log(this.TournamnetTicketsgroup.value.repotingstart)
    console.log(this.TournamnetTicketsgroup.value.repotingstart)
    let body = {
      // "datePeriod": {
      //   "start": this.TournamnetTicketsgroup.value.repotingstart,
      //   "end": this.TournamnetTicketsgroup.value.repotingend,
      ["firstRecord"]: this.TournamnetTicketsgroup.value.firstRecord - 1,
      ["maxCountRecord"]: this.TournamnetTicketsgroup.value.maxCountRecord,
      // }
    }
    this.pokergamesService.listTournamentTickets(body).subscribe(data => {
      this.getPokerData(data)
    },
      error => {

        this.loader = false;
        this.pokerGamesLoader = false;
      }

    );
  };
  getPokerData(data: any) {
    console.log(data)

    console.log(data.objectList)
    this.tournamentticketsGroupList = data.objectList;
    this.pokerGamesLoader = false;
    this.rowsOnthePage = data?.objectList?.length;
    this.ResultCount = data.resultCount;

    if (this.tournamentticketsGroupList != null) {
      this.loader = false;
    }

    if (this.tournamentticketsGroupList !== null) {
      this.resultcount = false;
    }


    for (let i = 0; i < this.tournamentticketsGroupList?.length; i++) {
      for (let m = 0; m < this.walletlists.length; m++) {

        if (this.tournamentticketsGroupList[i]?.pot?.wallet?.lowLong == this.walletlists[m].guid.lowLong) {
          this.tournamentticketsGroupList[i].pot.wallet = this.walletlists[m].currencyCode
          console.log(this.tournamentticketsGroupList[i].pot.wallet)
        }
      }
      for (let j = 0; j < this.TicketStatusList.length; j++) {
        if (this.tournamentticketsGroupList[i].status.lowLong == this.TicketStatusList[j].guid.lowLong) {
          this.tournamentticketsGroupList[i].status = this.TicketStatusList[j].value
        }
      }
      for (let k = 0; k < this.TourneyTypeList.length; k++) {
        if (this.tournamentticketsGroupList[i]?.sourceTournamentType) {
          if (this.tournamentticketsGroupList[i]?.sourceTournamentType?.lowLong == this.TourneyTypeList[k].guid.lowLong && this.tournamentticketsGroupList[i]?.sourceTournamentType?.highLong == this.TourneyTypeList[k].guid.highLong) {
            this.tournamentticketsGroupList[i].sourceTournamentType = this.TourneyTypeList[k].value
          }
        }
        if (this.tournamentticketsGroupList[i]?.targetTournamentSettingsType) {
          if (this.tournamentticketsGroupList[i]?.targetTournamentSettingsType?.lowLong == this.TourneyTypeList[k].guid.lowLong && this.tournamentticketsGroupList[i]?.targetTournamentSettingsType.hiLong == this.TourneyTypeList[k].guid.hiLong) {
            this.tournamentticketsGroupList[i].targetTournamentSettingsType = this.TourneyTypeList[k].value
          }
        }
      }
    }
    console.log(this.rowsOnthePage <= this.ResultCount)
    if (this.rowsOnthePage <= this.ResultCount) {

      this.pagecontrolbtn = true
    } else {
      this.pagecontrolbtn = false
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

  showmanu(index: number) {
    this.popupArrow = !this.popupArrow;
    this.SeletedIconIndex = index;
    // this.PlayerTournamentDatapopup = false;

    this.TicketActionsData = this.tournamentticketsGroupList[index];
    console.log(this.TicketActionsData)
  }

  ticketActions(name: any) {
    // this.SpinnwerT = true;
    this.popupArrow = false
    let body = {
      "idList": [this.TicketActionsData.guid],
      "maxCountRecord": 100,
      "firstRecord": 0,
      "queryId": ""
    }
    this.body = body;
    if (name == 'Change') {
      console.log(this.convertTournyTicketType)
      this.ChangeTicketsPopUp = true;
      this.convertTournyTicketType = this.CurrencyExchangPocketTypeList[0].value
    } else if (name == "Delete") {
      this.SpinnwerT = true
      this.pokergamesService.deleteTournamentTickets(body).subscribe(data => {
        console.log(data)
        if (data.changedObjectList) {
          this.SpinnwerT = false;
          this.onFormSubmit()
        }
      });
    }
  }
  ChangeTicket(type: any) {
    console.log(this.convertTournyTicketType)
    console.log(this.body)
    this.ChangeTicketsPopUp = false;
    if (type == 'Change') {
      this.SpinnwerT = true;
      if (this.convertTournyTicketType == "Tournament Money") {
        this.pokergamesService.convertTournamentTicketsToTournamentMoney(this.body).subscribe(data => {
          console.log(data)
          if (data.changedObjectList) {
            this.SpinnwerT = false;
            this.onFormSubmit()
          }
        });
      } else if (this.convertTournyTicketType == "Cash") {
        this.pokergamesService.convertTournamentTicketsToCash(this.body).subscribe(data => {
          console.log(data)
          if (data.changedObjectList) {
            this.SpinnwerT = false;
            this.onFormSubmit()
          }
        });
      }
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
    if (this.PageCount > this.tournamentticketsGroupList.length) {

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
    if (this.PageCount > this.tournamentticketsGroupList.length) {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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
    XLSX.writeFile(wb, 'TournamentTicketsExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "TournamentTicketsExcelSheet")
  }


  // *******************************@currency drpndn Starts*********************************
  onItemSelect(item: any) {
    this.walletSelectedCurrency = [];
    this.loginForm.value.Currency.forEach((item:any)=>{
      this.walletSelectedCurrency.push(item?.guid)
    })
   
  }

  OnItemDeSelect(item: any) {
    this.walletSelectedCurrency = [];
    this.loginForm.value.Currency.forEach((item:any)=>{
      this.walletSelectedCurrency.push(item?.guid)
    })

    if(this.walletSelectedCurrency.length == 0){
      this.walletSelectedCurrency = this.walletDefaultCurrency;

    }
  
  }
  onSelectAll(items: any) {
    this.walletSelectedCurrency = [];
    this.walletSelectedCurrency = this.walletDefaultCurrency;
    
  }
  onDeSelectAll(items: any) {
    this.walletSelectedCurrency = [];
    this.walletSelectedCurrency = this.walletDefaultCurrency;
   
  }

  // *************************************@currency drpdn ends************************


  showDate(data: any) {
    console.log(this.filterForm.value.endDate)
    if (this.filterForm.value.startDate > this.filterForm.value.endDate) {

      this.steddate = true;
    } else {
      this.steddate = false;
    }

    ///////////////
    if (this.filterForm.value.creationstartDate > this.filterForm.value.creationendDate) {

      this.setcreationdate = true;
    } else {
      this.setcreationdate = false;
    }

    ///////////////

    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    } else {
      this.timeerror = false;
    }

    ///////////////
    if (this.filterForm.value.creationstartDate == this.filterForm.value.creationendDate) {
      if (this.filterForm.value.creationTime > this.filterForm.value.craetionendTime) {
        this.creationtimeerror = true;
      } else {
        this.creationtimeerror = false;
      }
    } else {
      this.creationtimeerror = false;
    }
    ///////////////
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

      ///////////////

      if (new Date(x.creationstartDate).getTime() > ToDate.getTime() || new Date(x.creationstartDate).getTime() > new Date(x.creationendDate).getTime() || new Date(x.creationendDate).getTime() > ToDate.getTime()) {
        console.log("indirect")
        console.log(this.filterForm.value.creationendDate)
        this.setcreationdate = true;
      } else {
        this.setcreationdate = false;
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
    if (this.filterForm.value.creationstartDate == this.filterForm.value.creationendDate) {
      if (this.filterForm.value.creationTime > this.filterForm.value.craetionendTime) {
        this.creationtimeerror = true;
      } else {
        this.creationtimeerror = false;
      }
    }


  }
}