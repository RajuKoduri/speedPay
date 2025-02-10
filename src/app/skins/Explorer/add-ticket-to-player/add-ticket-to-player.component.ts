import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { CreatePokerSatelliteSeriesService } from 'src/app/source/create-poker-satellite-series.service';
import { CreatePokerTouranamentComponent } from '../../admin-control/create-poker-touranament/create-poker-touranament.component';
import { CreatePokerSitnGoComponent } from '../../admin-control/create-poker-sitn-go/create-poker-sitn-go.component';




@Component({
  selector: 'app-add-ticket-to-player',
  templateUrl: './add-ticket-to-player.component.html',
  styleUrls: ['./add-ticket-to-player.component.css']
})
export class AddTicketToPlayerComponent implements OnInit, OnDestroy {

  @Output() addEnableDisableButton = new EventEmitter();
  @Output() addResultStatus = new EventEmitter();



  PlayerName: any;
  searchInput: any = ""
  PlayerExplorerData: any = null;
  PokerGamesOnly: any = [];
  gameNames: any = [];
  tournamentsData: any = [];
  activeIndex: number = 0;
  selectedViewItem: any = {};
 


  tournamentType: boolean = false;
  sitngoType: boolean = false;
  prevButtonCss: boolean = false;
  nextButtonCss: boolean = true;
  saveButton: boolean = false;
  PlayerSitandGoData: any = null;
  onlyViewpopUp = true;
  ScheduleTypeList: any = [];
  OnlyFloatPayoutTables: any = [];
  pokerPayoutStructureRes: any;
  PayoutStructureList: any;


  constructor(private PokergamesService: PokergamesService, private GamesofpokerService: GamesofpokerService, private SatelliteSeriesService: CreatePokerSatelliteSeriesService) { }

  @ViewChild(CreatePokerTouranamentComponent) CreatePokerTouranamentComponent!: CreatePokerTouranamentComponent;
  @ViewChild(CreatePokerSitnGoComponent) CreatePokerSitnGoComponent!: CreatePokerSitnGoComponent;

  ngOnDestroy(): void {

    this.GamesofpokerService.clearData()
    // throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.GetPlayerName()
    this.GamesConfig()
    this.ScheduleType();
    this.PayoutStructure();
    this.pokerPayoutStructureList();


    this.SatelliteSeriesService.previousButton$.subscribe((prev) => {
      this.prevButtonCss = prev
    });

    this.SatelliteSeriesService.nextsButton$.subscribe((next) => {
      this.nextButtonCss = next
    });

    this.SatelliteSeriesService.saveButton$.subscribe((save) => {
      this.saveButton = save
    })

  }

  ScheduleType() {
    const ScheduleType = localStorage.getItem('ScheduleType');
    if (ScheduleType) {
      const aa = JSON.parse(ScheduleType);
      console.log(aa)
      this.ScheduleTypeList = aa.slice(2, aa.length)
    }
    console.log(this.ScheduleTypeList)
  }

  GetPlayerName() {
    let PlayerExplorerData = sessionStorage.getItem("PlayerExplorerData");
    // let PlayerName = localStorage.getItem("PlayerName");
    if (PlayerExplorerData) {
      this.PlayerExplorerData = JSON.parse(PlayerExplorerData)
      this.PlayerName = this.PlayerExplorerData?.player?.account;
      console.log("PlayerExplorerData", this.PlayerExplorerData);
    }

  }

  GamesConfig() {
    const PokerGamesData = this.GamesofpokerService.GamesConfig();
    this.PokerGamesOnly = PokerGamesData[13];
    console.log(this.PokerGamesOnly);

    for (let i = 0; i < this.PokerGamesOnly.length; i++) {
      if (this.PokerGamesOnly[i]?.wallet) {
        if (this.PokerGamesOnly[i]?.wallet?.hiLong == this.PlayerExplorerData?.wallet?.hiLong && this.PokerGamesOnly[i]?.wallet?.lowLong == this.PlayerExplorerData?.wallet?.lowLong) {
          this.gameNames.push(this.PokerGamesOnly[i]?.name)

        }
      }

    }
  }


  PayoutStructure() {
    const PayoutStructure = localStorage.getItem("PayoutStructure")
    if (PayoutStructure) {
      this.PayoutStructureList = JSON.parse(PayoutStructure)
    }
    console.log("PayoutStructureList", this.PayoutStructureList)
  }






  pokerPayoutStructureList() {
    let body = {

    }
    this.PokergamesService.getPokerPayoutStructureList(body).subscribe((data) => {
      if (data) {
        if (data.objectList) {
          this.pokerPayoutStructureRes = data.objectList;
          console.log(this.pokerPayoutStructureRes);
          console.log(data)
          for (let i = 0; i < this.pokerPayoutStructureRes.length; i++) {
            for (let j = 0; j < this.PayoutStructureList.length; j++) {
              if (this.pokerPayoutStructureRes[i].structureType.lowLong == this.PayoutStructureList[j].guid.lowLong && this.pokerPayoutStructureRes[i].structureType.hiLong == this.PayoutStructureList[j].guid.hiLong) {
                this.pokerPayoutStructureRes[i].structureType = this.PayoutStructureList[j].value
              }
            }
            // if (this.pokerPayoutStructureRes[i].structureType == "Float") {
            //   this.OnlyFloatPayoutTables.push(this.pokerPayoutStructureRes[i])
            // }

           
          }

          console.log(this.pokerPayoutStructureRes)
         

        }
      }

    }
    )
  }















  searchgPokerTournamentSettings() {
    let body = {
      caption: this.searchInput,
      gameNames: this.gameNames,
      onlySatellites: false,
      registering: true,

    }
    this.PokergamesService.getPokerTournamentSettings(body).subscribe(
      {
        next: (data) => {
          console.log("result Data", data)
          if (data?.objectList) {
            this.pokerTournamentSettingsSubscribeResult(data)
          }
        },
        error: (error) => {
          console.log("error    : --", error)
        },
        complete: () => { }


      }
    )

  }

  pokerTournamentSettingsSubscribeResult(data: any) {
    this.tournamentsData = data?.objectList;

    this.addEnableDisableButton.emit(true)

    for (let i = 0; i < this.tournamentsData.length; i++) {
      for (let j = 0; j < this.PokerGamesOnly.length; j++) {
        if (this.tournamentsData[i]?.gameName == this.PokerGamesOnly[j]?.name) {
          this.tournamentsData[i].gameName = this.PokerGamesOnly[j]?.caption
          console.log(this.tournamentsData[i]?.gameName, this.PokerGamesOnly[j]?.name)

        }

      }
    }



  }

  clickToSelectTournament(i: number) {
    this.activeIndex = i;

  }


  addTicketToPlayer() {

    let body = {
      // "playerGuid": {
      //       "hiLong": 48,
      //       "lowLong": 9311
      //     },
      // "tournamentSettingsGuid": {
      //       "hiLong": 1269,
      //       "lowLong": 266
      //     }
      "playerGuid": this.PlayerExplorerData?.guid,
      "tournamentSettingsGuid": this.tournamentsData[this.activeIndex]?.guid

    }
    this.PokergamesService.createTournamentTicket(body).subscribe({
      next: (data) => {
        console.log("data ", data);
        if (data?.changedObjectList) {
          this.TournamentTicketSubscribeData(data)
        }

        //   if(data?.error){
        //     this.addResultStatus.emit("INVALIDINPUTDATA")
        // }
      },
      error: (error) => {
        this.addResultStatus.emit("INVALIDINPUTDATA")
        console.error(error)
      },
      complete: () => { console.info() }
    })
  }


  TournamentTicketSubscribeData(data: any) {

    if (data) {
      this.addResultStatus.emit("SUCCESS")
    }

  }

  clickOnToViewTheTournament() {


    this.prevButtonCss = false;
    this.nextButtonCss = true;

    const selectedTourneyDetails = this.tournamentsData[this.activeIndex]
    console.log(selectedTourneyDetails?.tourneyType);

    this.PlayerSitandGoData = this.tournamentsData[this.activeIndex];


    this.pokerPayoutStructureRes.findIndex((item: any) => {
      if(item.guid?.hiLong == this.PlayerSitandGoData?.payoutId?.hiLong && item.guid?.lowLong == this.PlayerSitandGoData?.payoutId?.lowLong){
        this.selectedViewItem  = item;
      }
    
     
    });

   

    if (selectedTourneyDetails?.tourneyType?.hiLong == 0 && selectedTourneyDetails?.tourneyType?.lowLong == 1) {
      this.tournamentType = true;
      this.sitngoType = false;

      for (let i = 0; i < this.ScheduleTypeList.length; i++) {
        console.log(this.PlayerSitandGoData?.shedule?.type)
        console.log(this.ScheduleTypeList[i]?.guid?.lowLong, this.PlayerSitandGoData?.shedule?.type?.lowLong, this.ScheduleTypeList[i]?.guid?.hiLong, this.tournamentsData?.shedule?.type?.hiLong)
        if (this.ScheduleTypeList[i]?.guid?.lowLong == this.PlayerSitandGoData?.shedule?.type?.lowLong &&
          this.ScheduleTypeList[i]?.guid?.hiLong == this.PlayerSitandGoData?.shedule?.type?.hiLong) {
          this.PlayerSitandGoData['shedule']['type'] = this.ScheduleTypeList[i]?.value;
          break;

        }

      }

    } else {
      this.tournamentType = false;
      this.sitngoType = true;

    }


    console.log("PlayerSitandGoData", this.PlayerSitandGoData)

  }



  editTournyPop() {
    this.tournamentType = false;

  }
  sitngoClosePopup() {
    this.sitngoType = false;
  }

  getTabTourneyPrev() {
    if (this.CreatePokerTouranamentComponent) {

      this.CreatePokerTouranamentComponent.changeToPreviousTabs();
    }

  }
  getTabTournetNxt() {
    this.CreatePokerTouranamentComponent.changeToNextTabs();
  }
  onFormSubmit() {

  }

  getTab(pageNav: string, type: string) {
    if (type === 'sitngo') {
      this.CreatePokerSitnGoComponent.getTab(pageNav)
    }
  }


}
