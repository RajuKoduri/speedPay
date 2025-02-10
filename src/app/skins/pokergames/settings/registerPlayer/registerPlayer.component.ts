import { Component, EventEmitter, Input, OnInit, Output,AfterViewInit } from '@angular/core';
import { PokergamesService } from 'src/app/source/pokergames.service';



@Component({
  selector: 'app-registerPlayer',
  templateUrl: './registerPlayer.component.html',
  styleUrls: ['./registerPlayer.component.css']
})
export class RegisterPlayerComponent implements OnInit,AfterViewInit {

  playerSearch: any = ""
  userName: any = "";
  searchResultCount: any = 0;
  buyInValues: any;
  balanceBuyIn: any;
  tournamentMoneyBuyIn: any =0;
  balance: any;
  bonus: any;
  compPoints: any;
  tournamentMoney: any;
  tournamentTickets: any;
  canUseBalanceRegistration: boolean = false;
  canUseCompPointsRegistration: boolean = false;
  canUseTournamentMoneyRegistration: boolean = false;
  canUseTournamentTicketRegistration: boolean = false;
  playerGuid: any=null;
  registrationType: any = null;
  registerType: any = null;
  location:any = null
 


  constructor(private PokergamesService: PokergamesService) { }
  
  @Input() registerPlayerData: any = null;
  @Output() registerPlayerButton = new EventEmitter();
  @Output() registerclosepopUp = new EventEmitter();

  ngOnInit() {

    // this.location = window.location.pathname
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;

    console.log(this.location)

    if(this.location == "/tournamentexplorer/tableInfo"){
      this.onSubmiting(this.registerPlayerData);

    }else{
      this.onSubmiting(this.registerPlayerData.guid);
    }


    
   
   
  }

  ngAfterViewInit(): void {
  
    // throw new Error('Method not implemented.');
  }

 
  onSubmiting(guid:any) {

    if (this.registerPlayerData) {
      let body = {
        // tournamentId: this.registerPlayerData?.guid,
        tournamentId: guid,
      }
      console.log(this.registerPlayerData);
      this.PokergamesService.getPokerTournamentRegistrationInfo(body).subscribe((data) => {
        console.log(data);
        if (data) {
          this.tournamentRegistrationInfoData(data)
        }
      },
        (error) => {
          console.log("error   :  -- ", error)
        }

      )
    }
  }

  tournamentRegistrationInfoData(data: any) {
    if (data?.objectList) {
      this.balanceBuyIn = data?.objectList[0]?.balanceBuyIn?.value
      this.tournamentMoneyBuyIn = data?.objectList[0]?.tournamentMoneyBuyIn?.value;

      this.canUseBalanceRegistration = data?.objectList[0]?.canUseBalanceRegistration;
      this.canUseCompPointsRegistration = data?.objectList[0]?.canUseCompPointsRegistration;
      this.canUseTournamentMoneyRegistration = data?.objectList[0]?.canUseTournamentMoneyRegistration;
      this.canUseTournamentTicketRegistration = data?.objectList[0]?.canUseTournamentTicketRegistration;

    }
  }




  clickFindPokerTournamentPlayerRegistrationCandidate() {
    console.log("registerPlayerData" , this.registerPlayerData);

    let body;

    if(this.location == "/tournamentexplorer/tableInfo"){
      body = {
        tournamentId: this.registerPlayerData,
        playerLogin: this.playerSearch != "" ? this.playerSearch : undefined,
      }

    }else{
      body = {
        tournamentId: this.registerPlayerData?.guid,
        playerLogin: this.playerSearch != "" ? this.playerSearch : undefined,
      }
      
    }

    this.PokergamesService.findPokerTournamentPlayerRegistrationCandidate(body).subscribe((data) => {
      console.log("Data : --", data)
      if (data) {
        this.getPokerTournamentPlayerRegistrationData(data)
      }
    },
      error => {
        console.log("ERRor  : -", error)
      }
    )
  }

  getPokerTournamentPlayerRegistrationData(data: any) {
    if (data?.objectList.length > 0) {

      this.userName = `  ${data?.objectList[0]?.player?.login}  (${data?.objectList[0]?.player?.fullName})`;

      this.balance = data?.objectList[0]?.balance?.value;
      this.bonus = data?.objectList[0]?.bonus?.value;
      this.compPoints = data?.objectList[0]?.compPoints?.value;
      this.tournamentMoney = data?.objectList[0]?.tournamentMoney?.value;
      this.tournamentTickets = data?.objectList[0]?.tournamentTickets;

      this.playerGuid = data?.objectList[0]?.player?.guid;
      this.registrationType = data?.objectList[0]?.player?.type;
     

    } else {
      if (data?.resultCount == 0) {
        this.userName = "  Player not found"
      }
    }
    this.searchResultCount = data?.resultCount
  }







  clickRegisterTournamentPlayer() {
   let body;


    if(this.location == "/tournamentexplorer/tableInfo"){
       body = {
        tournamentId:  this.registerPlayerData,
        playerId:  this.playerGuid ,
        registrationType: {hiLong:0 ,lowLong:this.registerType},
        // registrationType: this.registrationType,
        // tournamentId:  {hiLong:550,lowLong:43477},
        // playerId: {hiLong:318,lowLong:13018},
        // registrationType: {hiLong:0,lowLong:0},
      };


    }else{

      body = {
        tournamentId:  this.registerPlayerData?.guid,
        playerId:  this.playerGuid ,
        registrationType: {hiLong:0 ,lowLong:this.registerType},
       
      };

    }


    this.PokergamesService.registerTournamentPlayer(body).subscribe((data) => {

      if(data?.changedObjectList){
          this.registerclosepopUp.emit("SUCCESS")
      }


      if(data?.error){
          this.registerclosepopUp.emit("INVALIDINPUTDATA")
      }


  
     
    },
      error => {
      
        console.log("error : -", error)
        if(error){
          this.registerclosepopUp.emit("INVALIDINPUTDATA")

        }
      }

    )
  }

  clickOnregisterRadioButton(value:any){
    this.registerType=value
    var value:any = false;
    this.registerPlayerButton.emit(value);
  }

}
