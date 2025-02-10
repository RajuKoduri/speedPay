import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { RegisterPlayerComponent } from '../settings/registerPlayer/registerPlayer.component';


@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  @ViewChild(RegisterPlayerComponent)RegisterPlayerComponent!: RegisterPlayerComponent;


  FillterMenu: any;
  filterForm: FormGroup;
  PageCount: number = 0;
  pokerTournamentData: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  pokerPlayerData: any;
  pokerTournamentDatapopup: boolean = false;
  pagecontrolbtn: boolean = false;
  sortaccessRuleName: any = [];
  walletFormatsList: any;
  walletlists: any = [];
  loader: boolean = false;
  ScheduleTypeList: any;
  TournamentStatusList: any;
  TourneyTypeList: any;
  GamesConfigList: any;
  gamescaption: any = [];
  startdate: any;
  timeerror: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false;
  endDate: any;
  startDate: any;
  todaydate: any;

  popupArrow: boolean = false;
  SeletedIconIndex: any;
  AlertMessage: any;
  CancelSitNgo: boolean = false;
  CancelSitNgoPopup: boolean = false;
  SitngoActionsType: any;
  SpinnwerT: boolean = false;

  location: any;
  playerExporer: boolean = false;
  playerGUID: any;
  checkRegisterPlayer: boolean = false;
  RegisterPlayerAction:boolean = false;
  registerDisabledButton:boolean = true
  registerLoader: boolean = false;
  registerSuccessFailurePopup=""

  selecttournamnetSTATUS: any = [];
  statusGuids : any = [];
  copySTATUSguids: any =[];
  dropdownSettingStatus = {};

  constructor(private DateTimePipe: DateTimePipe, private DatePipe: DatePipe, private PokergamesService: PokergamesService,
    private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      TournamentSettingId: new FormControl(),
      Name: new FormControl(),
      MakeaDeal: new FormControl(),
      ManualPrizePool: new FormControl(),
      BrandedTournament: new FormControl(),
      SynchronizedBreak: new FormControl(),
      Currency: new FormControl(),
      Game: new FormControl(),
      TotalCostfrom: new FormControl(),
      TotalCostto: new FormControl(),
      BuyInfrom: new FormControl(),
      BuyInto: new FormControl(),
      Feefrom: new FormControl(),
      Feeto: new FormControl(),
      KnockoutBountyfrom: new FormControl(),
      KnockoutBountyto: new FormControl(),
      Registeredfrom: new FormControl(),
      Registeredto: new FormControl(),
      MinPlayersfrom: new FormControl(),
      MinPlayersto: new FormControl(),
      ScheduleType: new FormControl(),
      Status: new FormControl(),
     
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
    })
  }

  ngOnInit(): void {

    // this.location = window.location.pathname;
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;

    if (this.location == "/playerexplorer/pokertournamenthistory") {
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


    console.log(moment(this.startDate).format("YYYY-MM-DDT00:00:00"))

    console.log(moment(new Date()).format('YYYY-MM-DD') + 'T00.00.00')

    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    this.walletFormats();
    this.ScheduleType();
    this.TournamentStatus();
    this.TourneyType();
    this.GamesConfig();
  }



  PlayerGuid() {
    let Playerguid = sessionStorage.getItem('Playerguid')
    console.log(Playerguid)
    if (Playerguid) {
      this.playerGUID = JSON.parse(Playerguid);
      console.log(this.playerGUID)
    }

  }


  changeSelect(date: string) {
    // let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    let currentDateTime = date

    currentDateTime = currentDateTime.substring(0, currentDateTime.length - 5)
    let currentDateTimes = this.DatePipe.transform(new Date(currentDateTime), 'yyyy/MM/dd h:mm:ss a');
    // console.log("dates", currentDateTimes);
    let c = currentDateTimes
    return (c)
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  walletFormats() {
    const walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      this.walletFormatsList = JSON.parse(walletTypes)
      for (let i = 0; i < this.walletFormatsList.length; i++) {
        if (this.walletFormatsList[i].clubGameWallet == true) {

          this.walletlists.push(this.walletFormatsList[i])
        }
      }
    }
    console.log(this.walletFormatsList)
    console.log("walletlists", this.walletlists)
  }
  ScheduleType() {
    const ScheduleType = localStorage.getItem('ScheduleType');
    if (ScheduleType) {
      this.ScheduleTypeList = JSON.parse(ScheduleType)
    }
    console.log("ScheduleTypeList", this.ScheduleTypeList)
  }
  TournamentStatus() {
    const TournamentStatus = localStorage.getItem("TournamentStatus");
    if (TournamentStatus) {
      this.TournamentStatusList = JSON.parse(TournamentStatus);
      console.log("TournamentStatusList", this.TournamentStatusList)

      for(let i=0; i< this.TournamentStatusList.length; i++){
        this.selecttournamnetSTATUS[i] = {
          value: this.TournamentStatusList[i].value,
          guid:this.TournamentStatusList[i].guid
        }
      }
      console.log(this.selecttournamnetSTATUS)
      this.selecttournamnetSTATUS.forEach((item: {guid : any}) =>{
        this.statusGuids.push(item.guid)
      });
      this.copySTATUSguids = this.statusGuids
      console.log(this.statusGuids)

      this.dropdownSettingStatus = {
        singleSelection: false,
        idField: 'guid',
        textField: 'value',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      }
    }
  }
  // TournamentStatus() {
  //   const TournamentStatus = localStorage.getItem("TournamentStatus");
  //   if (TournamentStatus) {
  //     this.TournamentStatusList = JSON.parse(TournamentStatus);
  //   }
  //   console.log("TournamentStatusList", this.TournamentStatusList)
  // }
  TourneyType() {
    const TourneyType = localStorage.getItem("TourneyType")
    if (TourneyType) {
      this.TourneyTypeList = JSON.parse(TourneyType)
    }
    console.log("TourneyTypeList", this.TourneyTypeList)
  }


  GamesConfig() {
    const GamesConfig = localStorage.getItem('GamesConfig')
    if (GamesConfig) {
      this.GamesConfigList = JSON.parse(GamesConfig)
    }
    // console.log("GamesConfig", this.GamesConfigList)
    console.log("GamesConfig", this.GamesConfigList.games)
    let gamesListofarrays = this.GamesConfigList.games

    console.log("gamesListofarraysss", gamesListofarrays)
    this.gamescaption = [];
    for (let i = 0; i < gamesListofarrays.length; i++) {
      if (gamesListofarrays[i].caption) {
        if (gamesListofarrays[i].name.startsWith("POKER_")) {
          this.gamescaption.push(gamesListofarrays[i])
        }
      }
    }
    console.log(this.gamescaption)
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

  tournamentExplore(guid: any, caption: any, status:any) {
    const tInfo = {
      guid: guid,
      name: caption,
      explorer: "Tournament Explorer",
      status:status
    }
    sessionStorage.setItem('tInfo', JSON.stringify(tInfo));
    // var baseUrl = '/tournamentexplorer/tableInfo';
    var baseUrl= window.location.hash ? '#/tournamentexplorer/tableInfo ':'/tournamentexplorer/tableInfo';

    window.open(baseUrl)

  }

  updateRegisterPlayerButton(){
  
    this.registerDisabledButton = false;
    console.log(this.registerDisabledButton);

  }

  registrationApiStatus(event:any){

    this.registerLoader = false;

    if(event == "SUCCESS"){
      this.registerSuccessFailurePopup = "Successfully Addded"

    }else if(event == "INVALIDINPUTDATA"){
      this.registerSuccessFailurePopup = "Invalid Input Data"

    }
   

  }

  registerSuccessFailurePopupClose(){
    this.registerSuccessFailurePopup = "";
    this.registerPlayerclosepopup();
    
  }


  onFormSubmit() {
    console.log(this.filterForm.value)
    this.pokerTournamentData = false
    this.FillterMenu = false;
    this.loader = true;
    this.getDirtyValues(this.filterForm)
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody);
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.maxCountRecord);
    if (this.filterForm.value.maxCountRecord > 1) {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    } else {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord - 1 / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    }

    fillterbody["firstRecord"] = Number(this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    fillterbody["tourneyType"] = this.TourneyTypeList[0].guid;
    // fillterbody["gameNames"] = this.filterForm.value.Game
    // fillterbody["startDate"] = this.filterForm.value.Datefrom != null ? { "start": this.filterForm.value.Datefrom, "end": this.filterForm.value.Dateto } : undefined;
    // fillterbody["startDate"] = { "start": this.startdate, "end": '' };

    fillterbody["settingsId"] = this.filterForm.value.TournamentSettingId != null ? this.filterForm.value.TournamentSettingId : undefined;
    fillterbody["caption"] = this.filterForm.value.Name != null ? this.filterForm.value.Name : undefined;

    if (this.filterForm.value.MakeaDeal) {
      fillterbody["MakeaDeal"] = this.filterForm.value.MakeaDeal;
    }
    fillterbody["manualPrizePoolTourney"] = this.filterForm.value.ManualPrizePool != null ? this.filterForm.value.ManualPrizePool : false
    fillterbody["brandedTourney"] = this.filterForm.value.BrandedTournament != null ? this.filterForm.value.BrandedTournament : false
    fillterbody["synchronizedTourney"] = this.filterForm.value.SynchronizedBreak != null ? this.filterForm.value.SynchronizedBreak : false
    fillterbody["totalCost"] = this.filterForm.value.TotalCostfrom != null ? { "high": this.filterForm.value.TotalCostto, "low": this.filterForm.value.TotalCostfrom } : undefined;
    fillterbody["buyIn"] = this.filterForm.value.BuyInfrom != null ? { "high": this.filterForm.value.BuyInto, "low": this.filterForm.value.BuyInfrom } : undefined;
    fillterbody["fee"] = this.filterForm.value.Feefrom != null ? { "high": this.filterForm.value.Feeto, "low": this.filterForm.value.Feefrom } : undefined;
    fillterbody["knockoutBounty"] = this.filterForm.value.KnockoutBountyfrom != null ? { "high": this.filterForm.value.KnockoutBountyto, "low": this.filterForm.value.KnockoutBountyfrom } : undefined;
    fillterbody["registeredPlayers"] = this.filterForm.value.Registeredfrom != null ? { "high": this.filterForm.value.Registeredto, "low": this.filterForm.value.Registeredfrom } : undefined;
    fillterbody["playersCount"] = this.filterForm.value.MinPlayersfrom != null ? { "high": this.filterForm.value.MinPlayersto, "low": this.filterForm.value.MinPlayersfrom } : undefined;
    fillterbody["scheduleType"] = this.filterForm.value.ScheduleType != null ? this.filterForm.value.ScheduleType : undefined;
    fillterbody["statuses"] = this.statusGuids,
    // fillterbody["statuses"] = this.filterForm.value.Status != null ? [this.filterForm.value.Status] : undefined;
    // fillterbody["statuses"] = [{ hiLong: 0, lowLong: 5 }]
    // fillterbody["reportPeriod"] = this.filterForm.value.Datefrom != null ? { "end": this.filterForm.value.Dateto, "start": this.filterForm.value.Datefrom } : undefined;
    fillterbody["startDate"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
    (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;
    if (this.playerExporer == false) {
      this.PokergamesService.getPokerTournamentsHistory(fillterbody).subscribe((res) => { this.pokerTournamentHistoryData(res) }
      )
    } else {
      fillterbody["playerIdList"] = [this.playerGUID];
      this.PokergamesService.getPokerTournamentPlayersHistory(fillterbody).subscribe((res) => { this.pokerTournamentHistoryData(res) }
      )

    }
  }
  pokerTournamentHistoryData(data: any) {
    console.log(data);
    if (data) {
      this.pokerTournamentData = data.objectList;
      this.ResultCount = data.resultCount
      this.rowsOnthePage = data.objectList.length;
    }

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.ResultCount !== null || this.pokerTournamentData.resultCount == 0 || data == null) {
      this.loader = false;
    }
    for (let i = 0; i < this.pokerTournamentData.length; i++) {
      for (let j = 0; j < this.walletlists.length; j++) {
        if (this.pokerTournamentData[i].buyIn.wallet.lowLong == this.walletlists[j].guid.lowLong) {
          this.pokerTournamentData[i].buyIn.wallet = this.walletlists[j].description
        }
      }
      for (let j = 0; j < this.TournamentStatusList.length; j++) {
        if (this.pokerTournamentData[i].status?.lowLong == this.TournamentStatusList[j].guid?.lowLong) {
          this.pokerTournamentData[i].status = this.TournamentStatusList[j].value
        }
        if (this.location == "/playerexplorer/pokertournamenthistory" && this.pokerTournamentData[i]?.history) {

          if (this.pokerTournamentData[i]?.history?.status?.lowLong == this.TournamentStatusList[j].guid?.lowLong) {
            this.pokerTournamentData[i].history.status = this.TournamentStatusList[j].value
          }

        }

      }
      for (let k = 0; k < this.gamescaption.length; k++) {
        if (this.pokerTournamentData[i].gameName == this.gamescaption[k].name) {
          this.pokerTournamentData[i].gameName = this.gamescaption[k].caption
        }
      }
    }

    this.sorttingData(this.pokerTournamentData);

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }
  sorttingData(data: any) {
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].accessRuleName)
      this.sortaccessRuleName.push(data[i].accessRuleName)
    }
    // console.log(this.sortaccessRuleName)
    // console.log(this.sortaccessRuleName.sort())
  }
  PlayerPopup(data: any) {
    console.log(data)
    this.pokerPlayerData = this.pokerTournamentData[data];
    console.log(this.pokerPlayerData)
    this.pokerTournamentDatapopup = true;
  }

  showmanu(i: any, guid: any) {
    this.popupArrow = !this.popupArrow
    this.SeletedIconIndex = i
    this.pokerPlayerData = this.pokerTournamentData[i];
    console.log(this.pokerPlayerData)
  }

  checkRegisterPlayerAction(status: any) {
    console.log(status);
    if (status == "Registering" || status == "Late Registration" || status == "Announced") {
      this.checkRegisterPlayer = false;
      return false
    }
      this.checkRegisterPlayer = true;
      return true;
  }

  getRegisterPlayerAction(listguid:any){
    this.popupArrow = false;
    this.RegisterPlayerAction = true;

    console.log("list guid",listguid)


  }

  registerPlayerclosepopup(){
    this.popupArrow = false;
    this.RegisterPlayerAction = false;
    this.registerDisabledButton = true;
  }

  registerPlayerepopup(){

    this.registerLoader = true
    if(this.RegisterPlayerComponent){
      this.RegisterPlayerComponent.clickRegisterTournamentPlayer()
    }
  }

  setSitngoActions(Type: any, index: any) {
    this.popupArrow = false;
    // this.SpinnwerT = true;
    this.AlertMessage = '';
    this.CancelSitNgo = false;
    this.CancelSitNgoPopup = true;
    this.SitngoActionsType = Type

    if (Type == "Cancel") {
      this.CancelSitNgo = true;
      this.CancelSitNgoPopup = true;
    } else if (Type == "Pause") {
      // this.PauseSitNgoPopup = true;
      this.AlertMessage = " Do You want to Pause the selected sit'n'Go?"
    } else if (Type == "Continue") {
      this.AlertMessage = " Do You want to continue the selected sit'n'Go?"
      // this.CompletedSitNgoPopup = true;
    }
  }


  cancelTourny(type: any) {

    // this.CancelSitNgoPopup=false

    let body = {
      "tournamentGuid": this.pokerPlayerData.guid,
      "reason": this.pokerPlayerData.description,
    }
    console.log(body)
    if (type == "yes") {
      // this.SpinnwerT = true;
      switch (this.SitngoActionsType) {
        case 'Cancel': {
          this.cancelTournament(body)
          break;
        }
        case 'Pause': {
          this.pauseTournament(body)
          break;
        }
        case 'Continue': {
          this.continueTournament(body)
          break;
        }
      }
    } else if (type == "no") {
      this.AlertMessage = '';
      this.CancelSitNgoPopup = false
    }

  }

  cancelTournament(body: any) {
    this.PokergamesService.cancelTournament(body).subscribe(data => {
      console.log(data);
      if (data.changedObjectList) {
        this.CancelSitNgoPopup = false;
        this.SpinnwerT = false;
      }
    })
  }

  continueTournament(body: any) {
    this.PokergamesService.continueTournament(body).subscribe(data => {
      console.log(data);
      if (data.changedObjectList) {
        this.CancelSitNgoPopup = false;
        this.SpinnwerT = false;
      }
    })
  }
  pauseTournament(body: any) {
    this.PokergamesService.pauseTournament(body).subscribe(data => {
      console.log(data);
      if (data.changedObjectList) {
        this.CancelSitNgoPopup = false;
        this.SpinnwerT = false;
      }
    })
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
    if (this.PageCount > this.pokerTournamentData.length) {

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
    if (this.PageCount > this.pokerTournamentData.length) {
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
    XLSX.writeFile(wb, 'PokerGameSessionsExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PokerGameSessionsExcelSheet")
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
  // *********************@Status Dropdown Starts******************************
  onItemSelectStatus(data: any) {
    this.statusGuids = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.statusGuids.push(item.guid);
    });
    console.log(this.statusGuids)
  }
  OnItemDeSelectStatus(data: any) {
    this.statusGuids = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.statusGuids.push(item.guid);
    });
    console.log(this.statusGuids)
    if (this.statusGuids === null || this.statusGuids.length === 0) {
      console.log("Empty");
      this.statusGuids = this.copySTATUSguids
    }
  }
  onSelectAllStatus(data: any) {
    this.statusGuids = []
    data.forEach((item: { guid: any; }) => {
      this.statusGuids.push(item.guid);
    });
    console.log(this.statusGuids)
  }
  onDeSelectAllStatus(data: any) {
    this.statusGuids = []
    this.statusGuids = this.copySTATUSguids
    console.log(this.statusGuids)
  }


  // *********************@Status Dropdown Ends******************************
}
