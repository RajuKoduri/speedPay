import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/source/login.service';
import { CommonDataService } from 'src/app/source/commondata.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  serverList: boolean = false;
  adminList: boolean = false;
  playerList: boolean = false;
  casinoList: boolean = false;
  casinoGameList: boolean = false;
  pokerList: boolean = false;
  settingsList: boolean = false;
  pokergameList: boolean = false;
  pokertablesList: boolean = false;
  remoteList: boolean = false;
  jackpotsList: boolean = false;
  gameList: boolean = false;
  promoList: boolean = false;
  perList: boolean = false;
  compList: boolean = false;
  accountList: boolean = false;
  cashierList: boolean = false;
  agentList: boolean = false;
  affiliateList: boolean = false;
  toolsList: boolean = false;
  emailList: boolean = false;
  requestList: boolean = false;
  ReportsList: boolean = false;

  public menuList = [
    {
      "item": 'Administrator Control',
      "subMenu": [
        {
          "item": 'Administrator List',
          "inMenu": [
            {
              "item": 'hr7',
              "link": '/hr',
            },
            {
              "item": 'hr6',
              "link": '/hr',
            },
          ]
        },


      ]
    },
    {
      "item": 'Player Control',
      "link": '/adminControl',
      "subMenu": [
        {
          "item": 'Player list',
          "link": '/hr',
          "inMenu": []
        },
        {
          "item": 'locked Bonus',
          "link": '/hr',
          "inMenu": []
        },
        {
          "item": 'Visit Statistics ',
          "link": '/hr',
          "inMenu": []
        },
        {
          "item": 'Suspicious playes ',
          "link": '/hr',
          "inMenu": []
        },


      ]
    },
    {
      "item": 'Casino Games',

      "link": '/hr',


    },
  ]

  isActiveMenu: any;
  isActiveSubMenu: any;
  logpop: boolean = false;
  comnRef: any;
  subscription !: Subscription;
  myDate = new Date();
  showFeaturesList: boolean = false;
  rightMouseList: any;
  ConfiguarationList: any;
  UsersList: any;
  MonitoringList: any;
  TablesList: any;
  TournamentList: any;
  TransactionsList: any;
  CasinoList: boolean = false;
  PokerList: boolean = false;
  SessionTimeOutPop: boolean = false;
  SessionTouchInterval: any;
  activetable: any;
  Comp_settingsList: boolean=false;
  CashsettingsList: boolean=false;
  popupList: boolean = false;
  isAddBlackListRecordPop: boolean = false;
  isGeoIPList: boolean = false;
  checkUserAccess: boolean = false;
  isCreateSimulator: boolean = false;
  isImportBots: boolean = false;
  isReportActivity: any = false;
  isAddEmailtemp: boolean = false;
  isRequestReport: boolean = false;
  isFAQCategory: boolean = false;
  isNewsRecord: boolean = false;
  isPeriodicalPro: boolean = false;
  constructor(private commonDataService: CommonDataService, private loginService: LoginService, public datepipe: DatePipe, private router: Router, private DashboardComponent12: DashboardComponent) {

    let currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    console.log(currentDateTime);
    // this.myDate = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
  }


  ngOnInit(): void {

    let activeroute:any = window.location.href
   console.log(activeroute)
   console.log(window)
   console.log(window.location.hash)
   console.log(window.location.hash.split('#/')[1])  
  //  this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
  // this.activetable = window.location.pathname.split('#/')[1]
  this.activetable = window.location.hash.split('#/')[1]
  console.log(this.activetable)
  if( this.activetable == "playerslist"|| this.activetable == "onlineplayers"|| this.activetable == "lockedbonuses" || this.activetable == "visitstatistics"
  || this.activetable == "suspiciousplayers"
  || this.activetable == "blacklist"
  || this.activetable == "fraudplayers"
  || this.activetable == "CreateNewplayer"
  || this.activetable == "CreateAccessRule"
  || this.activetable == "CreateNewAgent"
  || this.activetable == "playersaccessrules"
  || this.activetable == "playerregistrationsettings"
  || this.activetable == "winnerslist"
  || this.activetable == "loserlist"
  || this.activetable == "disconnectionprotectionsettings"
  || this.activetable == "playerpermissiongrops"
  || this.activetable == "playeravatars"
  || this.activetable == "CreateAccessRule"
  || this.activetable == "CreateNewplayer"
  || this.activetable == "NewPlayerPremissions"){
      this.playerList = true
    } else{
      this.playerList = false  
    }

  if(this.activetable == "pokergamesessions" ||this.activetable == "pokerhandsessionspokerhandshistory"||this.activetable == "pokertableshistory"
  ||this.activetable == "pokertablespokerhandshistory"
  ||this.activetable == "pokersitngoHistory"
  ||this.activetable == "pokertournamenthistory"
  ||this.activetable == "pokertournamenthistory"
  ||this.activetable == "TournamentsMonitoring"
  ||this.activetable == "ActiveTables"
  ||this.activetable == "CreatePokerTableGroup"
  ||this.activetable == "CreatePokerTournament"
  ||this.activetable == "CreatePokerSitngo"
  ||this.activetable == "CreatePokerBlindStructure"
  ||this.activetable == "CreatePokerRakeStructure"
  ||this.activetable == "CreatePokerPayoutTable"){
    this.pokerList = true
    }else{  
      this.pokerList = false
    }
    if(this.activetable=="pokertablegroups"|| this.activetable=="pokerrakestructure"|| this.activetable=="pokersitandgos"|| this.activetable=="pokertournaments"
    || this.activetable=="pokerblindstructures"
    || this.activetable=="pokerpayouttables"
    || this.activetable=="pokersatelliteseries"
    || this.activetable=="tournamenttickets"
    || this.activetable=="timeoutsettings"
    || this.activetable=="TournamentList"){
      this.pokerList = true
      this.settingsList = true
    }else{
      this.settingsList = false
    }

    if(this.activetable == "pokerhandsessionspokerhandshistory" ){
     this.pokerList = true
     this.pokergameList = true
    }
    else{
      this.pokergameList = false
    } 
    if(this.activetable == "pokertablespokerhandshistory" ){
     this.pokerList = true
     this.pokertablesList = true
    }
    else{
      this.pokertablesList = false
    } 

  if(this.activetable == "promotinalcodes" || this.activetable == "depositbonussettings" || this.activetable == "bonusabuse"){
      this.promoList = true
    }
    else{
      this.promoList = false
    }
  if(this.activetable == "remotesystems" || this.activetable == "remotesystemsgames" || this.activetable == "remotegamesessions" ||this.activetable == "transfersummary" || this.activetable == "transferhistory"){
      this.remoteList = true
    }
    else{
      this.remoteList = false
    }
  if(this.activetable == "comppointssettings" || this.activetable == "earnsettings" || this.activetable == "exchangerates" ||this.activetable == "comppointslevels" || this.activetable == "comppointssummary" || this.activetable == "playercomppointsbalance" || this.activetable == "playercomppointsadjustments" || this.activetable == "playercomppointsexchange" || this.activetable == "levelchangeshistory" ){
      this.compList = true
    }
    else{
      this.compList = false
    }
  if(this.activetable == "accountingsummary" || this.activetable == "housebalance" || this.activetable == "acplayerbalance" ||this.activetable == "accasinogamesbalance" || this.activetable == "acclubgamesbalance" || this.activetable == "acaffiliatebalance" || this.activetable == "acaffiliateexpenses" || this.activetable == "acagentsbalance" || this.activetable == "acagentsnestedbalance" || this.activetable == "acagentexpenses" || this.activetable == "simulatorstrategiesexpenses" ){
      this.accountList = true
    }
    else{
      this.accountList = false
    }
    if(this.activetable=="fraudcontrol" || this.activetable=="merchantsettings"|| this.activetable=="currencieslist"|| this.activetable=="currencyexchangerates"
    || this.activetable=="walletexchangesettings"
    || this.activetable=="depositlimitssettings"
    || this.activetable=="cashout"
    || this.activetable=="cashdeposits"
    || this.activetable=="withdrawals"
    || this.activetable=="chargebacks"
    || this.activetable=="playercashadjustments"
    || this.activetable=="playerbonusadjustments"
    || this.activetable=="tmadjustments"
    || this.activetable=="transfertoplayers"
    || this.activetable=="transfertoagents"
    || this.activetable=="agentcashadjustments"
    || this.activetable=="agentrevenuepayments"
    || this.activetable=="agentrevenueadjustments"
    || this.activetable=="affiliatepayments"
    || this.activetable=="affiliaterevenueadjustments"
    || this.activetable=="simulatorstrategyadjustmets"
    || this.activetable=="promotinolcodeusages"
    || this.activetable=="transactions"
    || this.activetable=="fraudtransactions"
    || this.activetable=="gamebankadjustments"
    || this.activetable=="cashoutstothebank"
    || this.activetable=="currencyexchanges"
    || this.activetable=="promotiomprizepayments"){
      this.cashierList = true
    }
    else{
      this.cashierList = false
    }
    if(this.activetable == "agentlist" || this.activetable == "agentstatistics" || this.activetable == "agentpermissiongroups" ||this.activetable == "CreateNewAgent" || this.activetable == "addAgentPemissiongroup" || this.activetable == "agentaccessrules" || this.activetable == "agentregistrationsettings" ){
      this.agentList = true
    }
    else{
      this.agentList = false
    }
    if(this.activetable == "affiliateslist" || this.activetable == "defaultpercents" || this.activetable == "affiliatestatistics" ||this.activetable == "" || this.activetable == "affiliateaccessrules" || this.activetable == "affiliatesregistationsettings"  ){
      this.affiliateList = true
    }
    else{
      this.affiliateList = false
    }

    if(this.activetable == "Skins" || this.activetable == "SkinsReportBySessions" || this.activetable == "Summary" ||this.activetable == "RakeRace" || this.activetable == "PlayerActivity" || this.activetable == "Leaderboard" || this.activetable == "requestedreportslist"  ){
      this.ReportsList = true
    }
    else{
      this.ReportsList = false
    } 

// ******************* White Label Sidemenu for Active Table ende **************************************************************

// ******************* Poker Sidemenu for Active Table Start **************************************************************

  if(this.activetable == "Countries" || this.activetable == "currencieslist" || this.activetable == "currencyexchangerates" || this.activetable == "levelchangeshistory"){
    this.ConfiguarationList = true
  }
  else{
    this.ConfiguarationList = false
  }
  if(this.activetable == "requestedreportslist" || this.activetable == "SkinsManage" || this.activetable == "Skins" || this.activetable == "SkinsReportBySessions" || this.activetable == "Summary" || this.activetable == "RakeRace"|| this.activetable == "PlayerActivity"|| this.activetable == "Leaderboard"){
    this.ReportsList = true
  }
  else{
    this.ReportsList = false
  }

  if(this.activetable == "comppointslevels" || this.activetable == "playeravatars" || this.activetable == "ImportUsers" || this.activetable == "playersaccessrules" || this.activetable == "Participation" || this.activetable == "playerpermissiongroups"|| this.activetable == "playerslist"|| this.activetable == "disconnectionprotectionsettings" || this.activetable == "CreateAccessRule" || this.activetable == "NewPlayerPremissions"){
    this.UsersList = true
  }
  else{
    this.UsersList = false
  }

  if(this.activetable == "onlineplayers" || this.activetable == "visitstatistics" || this.activetable == "TournamentsMonitoring" || this.activetable == "SngMonitoring"){
    this.MonitoringList = true
  }
  else{
    this.MonitoringList = false
  }
  if(this.activetable == "ActiveTables" || this.activetable == "CreatePokerTableGroup" || this.activetable == "pokergamesessions" || this.activetable == "pokertablegroups" || this.activetable == "pokertableshistory" || this.activetable == "pokerrakestructure"|| this.activetable == "timeoutsettings"){
    this.TablesList = true
  }
  else{
    this.TablesList = false
  }

  if(this.activetable=="TournamentsMonitoring"|| this.activetable=="CreatePokerTournament"|| this.activetable=="pokersitandgos" || this.activetable=="CreatePokerSitngo"
  || this.activetable=="tournamenttickets"
  || this.activetable=="pokertournaments"
  || this.activetable=="TournamentList"
  || this.activetable=="pokertournamenthistory"
  || this.activetable=="pokersitngoHistory"
  || this.activetable=="pokersatelliteseries"
  || this.activetable=="pokerblindstructures"
  || this.activetable=="pokerpayouttables"
  || this.activetable=="timeoutsettings"){
    this.TournamentList = true
  }
  else{
    this.TournamentList = false
  }
  if(this.activetable == "jackpotslist" || this.activetable == "jackpotwinningsandadjustments" || this.activetable == "JackpotAwards" || this.activetable == "JackpotFee" || this.activetable == "JackpotInitialAmount" ){
    this.jackpotsList = true
  }
  else{
    this.jackpotsList = false
  }

  if(this.activetable == "transfersummary" || this.activetable == "transferhistory" ){
    this.TransactionsList = true
    this.PokerList = true
  }
  else{
    this.PokerList = false
  }
  if(this.activetable == "remotesystems" || this.activetable == "remotesystemsgames" ){
    this.TransactionsList = true
    this.CasinoList = true
  }
  else{
    this.CasinoList = false
  }

  if(this.activetable == "adminControl" || this.activetable == "CreateNewAdministrator" ){
    this.adminList = true
  }
  else{
    this.adminList = false
  }
  if(this.activetable == "comppointssummary" || this.activetable == "playercomppointsbalance" || this.activetable == "playercomppointsadjustments" || this.activetable == "playercomppointsexchange"|| this.activetable == "levelchangeshistory" ){
    this.compList = true
  }
  else{
    this.compList = false
  }
  if(this.activetable == "comppointssettings" || this.activetable == "earnsettings" || this.activetable == "exchangerates" || this.activetable == "comppointslevels" ){
    this.compList = true
    this.settingsList = true
  }
  else{
    this.settingsList = false
  }

    let body = {}
    // this.showFeaturesList=true
    // console.log(document.getElementById("rightMouse_list"))
    // console.log((<HTMLInputElement>document.getElementById("rightMouse_list")))
    this.SessionTouchInterval = setInterval(() => {
      this.loginService.sessionTouch(body).subscribe(result =>{
      // { return result }
	
        console.log(result);
        if (result.success == false) {
          clearInterval(this.SessionTouchInterval);
          this.SessionTimeOutPop = true
        }
      },
      error =>{
        console.log("error occured")
      }
      );
      // }, 300000)
    }, 60000 * 5)

  }
  sidebarclose(){
    if (window.innerWidth <= 767) {   
      this.DashboardComponent12.closeMenuNames()
    }
  }
  closepopup() {
    this.SessionTimeOutPop = false
    this.router.navigate(['/login'])
    clearInterval(this.SessionTouchInterval);
    setTimeout(() => {
      sessionStorage.clear()
      window.location.reload();
    }, 1000);
  }

  openMenu(item: any) {
    this.isActiveMenu = item;
    console.log(item)
  }
  openSubMenu(item: any) {
    this.isActiveSubMenu = item;
    console.log(item)
  }
  server() {
    this.serverList = !this.serverList;
  }
  adminControl() {
    this.adminList = !this.adminList;
  }
  playerControl() {
    this.playerList = !this.playerList;
  }
  casinoGames() {
    this.casinoList = !this.casinoList;
  }
  casinoGameSessions() {
    this.casinoGameList = !this.casinoGameList;
  }
  pokerGames() {
    this.pokerList = !this.pokerList;
  }
  settings() {
    this.settingsList = !this.settingsList;
  }
  pokergamesessions() {
    this.pokergameList = !this.pokergameList;
  }
  pokertableshistory() {
    this.pokertablesList = !this.pokertablesList;
  }
  remotesystem() {
    this.remoteList = !this.remoteList;
  }
  Jackpots() {
    this.jackpotsList = !this.jackpotsList;
  }
  gameactivitysimulator() {
    this.gameList = !this.gameList;
  }
  Promotions() {
    this.promoList = !this.promoList;
  }
  periodical() {
    this.perList = !this.perList;
  }
  Comppoints() {
    this.compList = !this.compList;
  }
  CompsettingsList() {
    this.Comp_settingsList = !this.Comp_settingsList;
  }
  Accounting() {
    this.accountList = !this.accountList;
  }
  Cashier() {
    this.cashierList = !this.cashierList;
  }
  cashiersettings() {
    this.CashsettingsList = !this.CashsettingsList;
  }
  agentControl() {
    this.agentList = !this.agentList;
  }
  affiliateControl() {

    this.affiliateList = !this.affiliateList;
  }
  Tools() {
    this.toolsList = !this.toolsList;
  }
  Emailing() {
    this.emailList = !this.emailList;
  }
  Requested() {
    this.requestList = !this.requestList;
  }
  Reports() {
    this.ReportsList = !this.ReportsList;
  }
  Configuaration() {
    this.ConfiguarationList = !this.ConfiguarationList;
  }
  UsersControl() {
    this.UsersList = !this.UsersList;
  }
  RealtimeMonitoring() {
    this.MonitoringList = !this.MonitoringList;
  }
  Tables() {
    this.TablesList = !this.TablesList;
  }
  Tournament() {
    this.TournamentList = !this.TournamentList;
  }
  Transactions() {
    this.TransactionsList = !this.TransactionsList;
  }
  Casino() {
    this.CasinoList = !this.CasinoList;
  }
  Poker() {
    this.PokerList = !this.PokerList;
  }

  closeoppup() {
    this.logpop = false;
    this.comnRef.unsubscribe();
  }
  openLogin(e: any) {
    this.commonDataService.openPopup(e)
    this.comnRef = this.commonDataService.popupCont.subscribe((data) => {
      console.log(data)
      if (data == "OPEN_LOGIN") {
        this.logpop = true;
        console.log('yes it is')
      } else {
        console.log('no')
      }
    })
  }
  onRightClick(event: any) {
    event.preventDefault() //this will disable default action of the context menu
    //there will be your code for the expected right click action
    // alert("hello")
    this.showFeaturesList = true;

    this.rightMouseList = (<HTMLInputElement>document.getElementById("rightMouse_list"));
    // this.rightMouseList.style.
    console.log(document.getElementById("rightMouse_list"))
    console.log(document.getElementById("rightMouse_list"))

    this.rightMouseList.style.display = "block";
    console.log((<HTMLInputElement>document.getElementById("rightMouse_list")))
  }

  openSideP() {
    this.popupList = !this.popupList
  }
  closePopup(){
    this.popupList = false
  }

  addBlackListRecordPopup(){
    this.isAddBlackListRecordPop = !this.isAddBlackListRecordPop
  }

  geoIPListPopup(){
    this.isGeoIPList = !this.isGeoIPList
  }

  checkUserAccessPopup(){
    this.checkUserAccess = !this.checkUserAccess 
  }

  createSimulatorPopup(){
    this.isCreateSimulator = !this.isCreateSimulator
  }

  importBotsPopup(){
    this.isImportBots = !this.isImportBots
  }

  reportActivityPopup(){
    this.isReportActivity = !this.isReportActivity
  }

  addEmailtempPopup(){
    this.isAddEmailtemp = !this.isAddEmailtemp
  }

  requestReportPopup(){
    this.isRequestReport = !this.isRequestReport
  }

  addFaqCategoryPopup(){
    this.isFAQCategory = !this.isFAQCategory
  }

  addNewsRecordPopup(){
    this.isNewsRecord = !this.isNewsRecord
  }

  createPeriodicalProPopup() {
    this.isPeriodicalPro = !this.isPeriodicalPro
  }

}
