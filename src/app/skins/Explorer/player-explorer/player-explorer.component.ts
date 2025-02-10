import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddTicketToPlayerComponent } from '../add-ticket-to-player/add-ticket-to-player.component';
// import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-player-explorer',
  templateUrl: './player-explorer.component.html',
  styleUrls: ['./player-explorer.component.css']
})
export class PlayerExplorerComponent implements OnInit {


  @ViewChild(AddTicketToPlayerComponent)
  AddTicketToPlayerComponent!: AddTicketToPlayerComponent;


  isMenuOpen: boolean = true;
  PlayerName: any;
  //Playerguid:any;
  playerMenuList: any;
  popupName: any;
  playermenu: boolean = false
  remotemenu: boolean = false
  PokerGame: boolean = false
  AdditionalMenu: boolean = false
  PaymentHistoryMenu: boolean = false
  SuspiciousInformation: boolean = false
  ComppointsMenu: boolean = false
  activetable: any;
  closeMenuCoverDiv: boolean = false;


  windowsidebar: boolean = true;

  popupList: boolean = false;
  addTicketToPlayer: boolean = false;
  tournamentsDatalength: boolean = false;
  addTicketLoader: any
  AddTicketSuccessFailurePopup: any
  isCompulsaryCashout: boolean = false;
  attachDdocumentsPop: boolean = false;
  addcCommentpopUp: boolean = false;
  PointsAdjustmentpopUp: boolean = false;
  TMAdjustmentpopUp: boolean = false;
  ResetDisconnectionSettingspopup: boolean = false;
  PlayerInfo: any;
  isChangePermissionGroup: boolean = false;
  isReportActivity: boolean = false;

  // key:string = "player"
  //encryptedPlayerName:any;
  // encryptedPlayerGuide:any;


  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
    })
  }

  ngOnInit(): void {


    // this.Playerguid = sessionStorage.getItem("Playerguid")  
    // this.encryptedPlayerGuide = CryptoJS.AES.encrypt(this.Playerguid, 'player').toString(); 

    // const decrypted = CryptoJS.AES.decrypt(this.encryptedPlayerGuide, 'player').toString(CryptoJS.enc.Utf8);
    // console.log(decrypted)

    if (window.innerWidth < 767) {
      this.windowsidebar = false
    }




    this.GetPlayerName();
    let activeroute: any = window.location.href
    console.log(activeroute)
    console.log(window)
    console.log(window.location.pathname)
    console.log(`this.${window.location.pathname.split('/')[2]}`)

    this.activetable = window.location.pathname.split('/')[2]
    console.log(this.activetable)
    if (this.activetable == "PlayersSummary" || this.activetable == "Personalinfo" || this.activetable == "PlayerBonusAdjustment" || this.activetable == "PlayerCashAdjustment" || this.activetable == "PlayerManualDeposit" || this.activetable == "PlayerCashWallets") {
      this.playermenu = true
    } else {
      this.playermenu = false
    }
  }
  toggelMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (window.innerWidth <= 767) {
      var sideMenu = document.getElementById('sideMenu');
      sideMenu?.classList.remove("sideMenu12")
      let mobileview = document.getElementById("blackcovermobile")
      mobileview?.classList.add("movieview12")
      this.closeMenuCoverDiv = true;
      this.isMenuOpen = true;
      this.windowsidebar = true
    }



  }

  closeMenuNames() {
    var sideMenu = document.getElementById('sideMenu');
    sideMenu?.classList.add("sideMenu12")
    let mobileview = document.getElementById("blackcovermobile")
    mobileview?.classList.remove("movieview12")
    this.closeMenuCoverDiv = false
    this.windowsidebar = false
  }

  sidebarclose() {
    if (window.innerWidth <= 767) {
      this.closeMenuNames()
    }
  }




  GetPlayerName() {

    // this.PlayerName = sessionStorage.getItem("PlayerName")  
    // this.encryptedPlayerName = CryptoJS.AES.encrypt(this.PlayerName, 'player').toString(); 

    // const decrypted = CryptoJS.AES.decrypt(this.encryptedPlayerName, 'player').toString(CryptoJS.enc.Utf8);
    // console.log(decrypted)


    let PlayerName: any = sessionStorage.getItem("PlayerName");
    let playerdata: any = sessionStorage.getItem("PlayerExplorerData");
    if (playerdata) {
      this.PlayerInfo = JSON.parse(playerdata)
    }

    //console.log(PlayerName);  


    // this.encryptedPlayerName = CryptoJS.AES.encrypt(this.PlayerName, 'player').toString();
    //this.encryptedPlayerName = CryptoJS.AES.encrypt(PlayerName, 'player').toString(); 

    //console.log("this.encryptedPlayerName", this.encryptedPlayerName);



    // var decryptedPlayerName = CryptoJS.AES.decrypt(this.encryptedPlayerName, 'player').toString(CryptoJS.enc.Utf8);
    //          const decrypted = CryptoJS.AES.decrypt(this.encryptedPlayerName, 'player').toString(CryptoJS.enc.Utf8);

    // decryptedPlayerName = JSON.parse(decryptedPlayerName)
    //console.log('decryptedPlayerName:', decrypted);         
    // console.log('decryptedPlayerName:', decryptedPlayerName);         


    // let PlayerName = localStorage.getItem("PlayerName");
    if (PlayerName) {
      this.PlayerName = JSON.parse(PlayerName)
    }
    if (playerdata) {
      this.PlayerInfo = JSON.parse(playerdata)
    }
    console.log(this.PlayerInfo)
  }
  // playerMenu(data: any) {
  //   console.log(data)
  //   localStorage.setItem("sidenavtrue", data)
  //   this.playermenu = !this.playermenu
  //   this.playerMenuList = data
  // }
  showPopu(data: any) {
    localStorage.setItem('sideManu', data)
    this.popupName = data

    if (this.popupName == 'Pexplore') {
      this.playermenu = !this.playermenu
    } else if (this.popupName == 'RemoteSystems') {
      this.remotemenu = !this.remotemenu
    } else if (this.popupName == 'PokerGames') {
      this.PokerGame = !this.PokerGame
    } else if (this.popupName == 'depositlimitssettings') {
      this.AdditionalMenu = !this.AdditionalMenu
    } else if (this.popupName == 'Payment History') {
      this.PaymentHistoryMenu = !this.PaymentHistoryMenu
    } else if (this.popupName == 'Suspicious Information') {
      this.SuspiciousInformation = !this.SuspiciousInformation
    } else if (this.popupName == 'Comppoints') {
      this.ComppointsMenu = !this.ComppointsMenu
    }
  }

  openSideP() {
    this.popupList = !this.popupList

  }

  popupListclose() {
    this.popupList = false
  }

  clickOnPlayerAction(action: any) {
    this.popupListclose()
    // sessionStorage.setItem('PlayerName', JSON.stringify(name));
    // sessionStorage.setItem('Playerguid', JSON.stringify(guid));
    // this.popupList = false;
    console.log(action);

    switch (action) {
      case "AddTicket":
        this.addTicketPlayer();
        this.addTicketToPlayer = true;
        break;
      case "attach-documents":
        this.attachDdocumentsPop = true;
        break;
      case "add-comment":
        this.addcCommentpopUp = true;
        break;
      case "PointsAdjustment":
        this.PointsAdjustmentpopUp = true;
        break;
      case "TMAdjustment":
        this.TMAdjustmentpopUp = true;
        break;
      case "ResetDisconnectionSettings":
        this.ResetDisconnectionSettingspopup = true;
        break;
      default:
        break;

    }

  }

  closeAttachDoc() {
    this.attachDdocumentsPop = false;
    this.addcCommentpopUp = false;
  }

  addTicketPlayer() {


  }

  addTicketToPlayerclosepopup() {
    this.addTicketToPlayer = false;

  }

  TMadjustmentPopup() {
    this.TMAdjustmentpopUp = false;
  }

  clickOnaddTicketToPlayer() {
    this.addTicketLoader = true;

    if (this.AddTicketToPlayerComponent) {
      this.AddTicketToPlayerComponent.addTicketToPlayer();
    }

  }

  getaddResultStatus(event: any) {
    this.addTicketLoader = false;
    if (event == "SUCCESS") {
      this.AddTicketSuccessFailurePopup = "Successfully Added"
    } else {
      this.AddTicketSuccessFailurePopup = "Invalid Input Data"
    }

  }


  AddTicketSuccessFailurePopupPopupClose() {
    this.AddTicketSuccessFailurePopup = "";
    this.addTicketToPlayer = false

  }

  compulsaryCashoutPopup() {
    this.isCompulsaryCashout = !this.isCompulsaryCashout
  }

  changePermissionGroupPopup() {
    this.isChangePermissionGroup = !this.isChangePermissionGroup
  }

  reportActivityPopup() {
    this.isReportActivity = !this.isReportActivity
  }


}
