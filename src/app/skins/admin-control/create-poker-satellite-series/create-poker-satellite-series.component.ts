import { Component, OnInit, ViewChild,Input,Output ,OnChanges,AfterViewInit, EventEmitter} from '@angular/core';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { CreatePokerTouranamentComponent } from '../create-poker-touranament/create-poker-touranament.component';
import { CreatePokerSitnGoComponent } from '../create-poker-sitn-go/create-poker-sitn-go.component';
import { CreatePokerSatelliteSeriesService } from 'src/app/source/create-poker-satellite-series.service';
import { PokergamesService } from 'src/app/source/pokergames.service';

import { Router } from '@angular/router';

 
@Component({
  selector: 'app-create-poker-satellite-series',
  templateUrl: './create-poker-satellite-series.component.html',
  styleUrls: ['./create-poker-satellite-series.component.css']
})

export class CreatePokerSatelliteSeriesComponent implements OnInit,OnChanges,AfterViewInit {

  @ViewChild(CreatePokerTouranamentComponent) CreatePokerTouranamentComponent!: CreatePokerTouranamentComponent;
  @ViewChild(CreatePokerSitnGoComponent) CreatePokerSitnGoComponent!: CreatePokerSitnGoComponent;
  

  @Input() tournamentData: any = "";
  @Input() payoutData: any = null;
  @Input() activatedIndexSatelitteserivesData:any = null;


  @Output() closeEditSatellitePopup = new EventEmitter()

  currencyFormatsSymbol: any[] = [];
  createTournamentPopup: boolean = false;
  createSitngPopup: boolean = false;
  deleteTournamentPopup: boolean = false;
  selectedLanguageGuid: any;
  createdTournaments: any[] = [];
  createdTournamentsCopy: any[] = [];
  indexOfCreatedTournament: number = 0;
  payLoadOfCreatedTournament: any = {};
  gameNametypes: any = {};
  showPayoutTable: boolean = false;
  selectedViewItem: any = {};
  tournamentsPayouts: any[] = [];
  enableSatelligeSeries: boolean = false;
  shared: boolean = false;
  selectedTournamentCurrency: string = ""
  satelliteSeriesName = "";
  satelliteErrorPopupTest = ""
  satelliteErrorPopupBool: boolean = false;
  TicketUptext = "";
  TicketDownText = "";
  sitngoEditPopup: boolean = false;
  PlayerSitandGoData: any;
  dupPlayerSitandGoData: any = {};
  tournamentEditPopup: boolean = false;
  PokerGamesOnly: any = [];
  ticketTypes: any = [];
  PayoutTicketTypeList: any;
  ticketUpPopup: boolean = false;
  editOptionMode: boolean = false;
  prevButtonCss: boolean = false;
  nextButtonCss: boolean = true;
  saveButton: boolean = false;
  ScheduleTypeList: any = [];
  remaningTourneys: any[] = [];
  ticketTokensection: any = "";
  ticketTokenDownSection: any = "";
  warningtextForprizeandBuyin: boolean = false;
  view: any = {};
  ticketDownPopup: boolean = false;
  ticketDown: any = [];
  ticketDownCopy: any = [];

  ticketUpChange: boolean = false;
  ticketDownChange: boolean = false;
  activeFloatType:boolean = false;
  satelliteErrorTicketUpDown: boolean=false;
  successPopupText: string="";
  subscribeResult: boolean=false;
  createdPayload: any=[];
  numberInSeriesTourney: number=0;
  fromSettingsNumber:number =1;
  toSettingsNumber:number=0;
  linksData: any=[];
  ticketdownEmty: boolean=false;
  filterItem: any=[];
  onlyViewpopUp: boolean=false;
  editSatelliteGuid:any = null;
  settingsIdTo: any=null;
  private isFirstChange = true;



  constructor(private router:Router,private PokergamesService: PokergamesService, private GamesofpokerService: GamesofpokerService, private SatelliteSeriesService: CreatePokerSatelliteSeriesService) { }
  
  getChildrenTourney(fromSettingsId:any,createdTournamentsCopy:any[]=[]){
    console.log("getChildrenTourney   :", createdTournamentsCopy);
    let spliceItem: any;

    for (let i = 0; i < createdTournamentsCopy.length; i++) {
      console.log("eachTourney.id :  ", createdTournamentsCopy[i].id, "this.indexOfCreatedTournament", this.indexOfCreatedTournament);

      if (createdTournamentsCopy[i]?.tourn?.guid?.hiLong ==fromSettingsId?.hiLong  && createdTournamentsCopy[i]?.tourn?.guid?.lowLong ==fromSettingsId?.lowLong) {
        spliceItem = createdTournamentsCopy.splice(i, 1)[0];
        console.log(spliceItem, createdTournamentsCopy);
        i--; // Adjust the loop index after the splice
      }

      if (createdTournamentsCopy[i]?.childrenTourney && createdTournamentsCopy[i]?.childrenTourney.length >= 1) {
        const childSpliceItem:any = this.getChildrenTourney(createdTournamentsCopy[i].childrenTourney);

        if (childSpliceItem) {
          console.log("Child Splice Item:", childSpliceItem);
          return childSpliceItem;
        }
      }
    }

    console.log(spliceItem);
    return spliceItem;

  }




  findParentTourneyTicketupTextdetails(toSettingsId:any,createdTournamentsCopy:any[]=[],activeLink:any={}){
    console.log("activeLink    :  ",activeLink);
    console.log("createdTournamentsCopy    :",createdTournamentsCopy);

    let spliceItem: any;

    for (let i = 0; i < createdTournamentsCopy.length; i++) {
      if (createdTournamentsCopy[i]?.tourn?.guid?.hiLong ==toSettingsId?.hiLong  && createdTournamentsCopy[i]?.tourn?.guid?.lowLong ==toSettingsId?.lowLong) {
        createdTournamentsCopy[i].fromSettingsId =activeLink?.fromSettingsId;
        createdTournamentsCopy[i].toSettingsId =activeLink?.toSettingsId;
        spliceItem = `${createdTournamentsCopy[i].tourn.caption}: ${createdTournamentsCopy[i].currency}${createdTournamentsCopy[i].tourn.totalCost.value}.00(Buy-In+Knockout Bounty+ Fee)`;
        console.log(spliceItem)
       
      }

      if (createdTournamentsCopy[i]?.childrenTourney && createdTournamentsCopy[i]?.childrenTourney.length >= 1) {
        const childSpliceItem:any = this.findParentTourneyTicketupTextdetails(createdTournamentsCopy[i].childrenTourney,activeLink);

        if (childSpliceItem) {
          console.log("Child Splice Item:", childSpliceItem);
          return childSpliceItem;
        }
      }
    }

    console.log(spliceItem);
    return spliceItem;

  }  
  
  
  setTicketdownText(toSettingsId: any,ticketdownText: any,createdTournamentsCopy:any[]=[]){

    for (let eachItem of createdTournamentsCopy) {
      console.log("eachItem.ticketDownStatus   : ", eachItem.ticketDownStatus, "this.ticketTokenDownSection   : ", this.ticketTokenDownSection)
      if (eachItem?.tourn?.guid?.hiLong ==toSettingsId?.hiLong&&eachItem?.tourn?.guid?.lowLong ==toSettingsId?.lowLong) {
        eachItem.ticketDownStatus = ticketdownText;
        this.TicketDownText = ticketdownText;
        console.log(eachItem.ticketDownStatus);
        console.log(this.TicketDownText );
        return;
      }
      if (eachItem?.childrenTourney && eachItem?.childrenTourney?.length >= 1) {
        this.setTicketdownText(toSettingsId,  ticketdownText,eachItem.childrenTourney);
      }
    }

  }
  
  ngOnChanges(): void {

    if(Object.keys(this.tournamentData).length){
      if(this.isFirstChange){
        this.isFirstChange = false;
        console.log("this.ngOnChanges  :--", this.tournamentData);
        console.log("this.payoutData  :--",this.payoutData);
        console.log("this.activatedIndexSatelitteserivesData  :--",this.activatedIndexSatelitteserivesData);
        const {guid ,links,name,objState,shareType,tournaments } =  this.tournamentData;
  
        if(links){
          this.editSatelliteGuid = guid;
        }
        if(this.activatedIndexSatelitteserivesData?.closedCount>0||this.activatedIndexSatelitteserivesData?.openedCount>0){
          this.onlyViewpopUp = true;
        }else{
          this.onlyViewpopUp = false;
          
        }
  
       
        this.satelliteSeriesName = name;
    
        for(let k=0;k<tournaments?.length;k++){
          console.log(tournaments[k]);
          if(tournaments[k]?.tourneyType?.hiLong==0&&tournaments[k]?.tourneyType?.lowLong==1){
            tournaments[k].shedule.daysOfWeek = ( tournaments[k].shedule.daysOfWeek ==null ||  tournaments[k].shedule.daysOfWeek =="")?[1,2,3,4,5,6,7]:tournaments[k].shedule.daysOfWeek;
            tournaments[k].shedule.monthOfYear = ( tournaments[k].shedule.monthOfYear ==null ||  tournaments[k].shedule.monthOfYear =="")?[1,2,3,4,5,6,7,8,9,10,11,12]:tournaments[k].shedule.monthOfYear;
            tournaments[k].shedule.typeDayOfMonth = ( tournaments[k].shedule.typeDayOfMonth ==null ||  tournaments[k].shedule.typeDayOfMonth =="")? {hiLong: 0, lowLong: 1}:tournaments[k].shedule.typeDayOfMonth;
           
  
              // tournaments[k].shedule.startDate=tournaments[k]?.shedule?.startDate.split("Z")[0]
          tournaments[k] = { ...tournaments[k], shedule: { ...tournaments[k]?.shedule, startDate: tournaments[k]?.shedule?.startDate?.split("Z")[0] } };
          }else{
  
            if(tournaments[k]?.rebuyCount==0){
              delete tournaments[k]?.rebuyCount;
            }
  
            if(tournaments[k]?.rebuyCost?.value==0){
              delete tournaments[k]?.rebuyCost;
            }
  
            if(tournaments[k]?.addonCount==0){
              delete tournaments[k]?.addonCount;
            }
  
            if(tournaments[k]?.addonCost?.value==0){
              delete tournaments[k]?.addonCost;
            }
            if(tournaments[k]?.seatingPeriodType?.value==0){
              delete tournaments[k]?.seatingPeriodType;
            }
            if(tournaments[k]?.resultNotificationPlaces==0){
              delete tournaments[k]?.resultNotificationPlaces;
            }
            if(tournaments[k]?.breakTimeAfterAddon==0){
              delete tournaments[k]?.breakTimeAfterAddon;
            }
  
          }
  
          delete tournaments[k]?.resultNotificationType;
  
          tournaments[k].maintenanceFee = ( tournaments[k].maintenanceFee ==null ||  tournaments[k].maintenanceFee =="")? {
            "value": 0,
            "wallet":tournaments[k]?.totalCost?.wallet}:tournaments[k].maintenanceFee;
  
          tournaments[k].maintenanceFeesRebuy = ( tournaments[k].maintenanceFeesRebuy ==null ||  tournaments[k].maintenanceFeesRebuy =="")? {
          "value": 0,
          "wallet":tournaments[k]?.totalCost?.wallet}:tournaments[k].maintenanceFeesRebuy;
  
          tournaments[k].maintenanceFeesAddOn = ( tournaments[k].maintenanceFeesAddOn ==null ||  tournaments[k].maintenanceFeesAddOn =="")? {
            "value": 0,
            "wallet":tournaments[k]?.totalCost?.wallet}:tournaments[k].maintenanceFeesAddOn;
  
          
  
          for(let z=0;z<this.filterItem.length;z++){
            if(this.filterItem[z]?.name=== tournaments[k]?.gameName){
              let gametypeAndName =null
              console.log(tournaments[k]?.shareType);
              gametypeAndName={
                caption:this.filterItem[z]?.caption,
                type:tournaments[k]?.tourneyType?.hiLong==0&&tournaments[k]?.tourneyType?.lowLong==1?"Tournament Info":"Sit'n'Go Info"
              };
              if(gametypeAndName){
                this.getTournamentType(gametypeAndName);
              }
              
            }
          }
         
          console.log(`tournaments ${k}`,tournaments[k]);
          const body={
            tourn:{...tournaments[k]}
          }
          this.getFilterBodyData(body);
  
          for(let m=0;m<this.payoutData.length; m++){
            if(tournaments[k]?.payoutId?.hiLong===this.payoutData[m]?.guid?.hiLong&&tournaments[k]?.payoutId?.lowLong===this.payoutData[m]?.guid?.lowLong){
              this.getPayoutData(this.payoutData[m]);
            }
          }
  
          
        }
        
        if(this.createdTournamentsCopy?.length ===tournaments?.length){
          console.log(this.createdTournamentsCopy);
          console.log("links   :", links);
          for(let i=0; i<links.length; i++){
            if(links[i]?.slot?.hiLong==0&&links[i]?.slot?.lowLong==0){
              console.log("ticket up text");
              const ticketupText =  this.findParentTourneyTicketupTextdetails(links[i]?.toSettingsId,this.createdTournamentsCopy,links[i]);
             console.log("ticketupText  :",ticketupText);
  
             setTimeout(()=>{
              var childTourney = this.getChildrenTourney(links[i]?.fromSettingsId,this.createdTournamentsCopy);
              console.log(childTourney);
  
             if(childTourney&&ticketupText){
                childTourney.ticketUpStatus = ticketupText;
                this.ticketTokensection = ticketupText;
                this.TicketUptext=ticketupText;
                this.addChildrenTourenyWhenTicketSelect(this.createdTournamentsCopy, childTourney);
              }
  
             },0);
             
            }else if(links[i]?.slot?.hiLong==0&&links[i]?.slot?.lowLong==2){
              console.log("ticket down text");
              const ticketdownText =  this.findParentTourneyTicketupTextdetails(links[i]?.toSettingsId,this.createdTournamentsCopy,links[i]);
              setTimeout(() => {
                console.log(ticketdownText);
                if(ticketdownText){
                  this.setTicketdownText(links[i]?.fromSettingsId,ticketdownText,this.createdTournamentsCopy);
                }
              },0)
            
            }else if(links[i]?.slot?.hiLong==0&&links[i]?.slot?.lowLong==1){
              console.log("ticket self text");
              this.findParentTourneyTicketupTextdetails(links[i]?.toSettingsId,this.createdTournamentsCopy,links[i]);
            }
  
          }
        }
  
      }

    }
    
    
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    console.log("this.ngOnInit  :--", this.tournamentData);
   
    this.GamesConfig();
    this.PayoutTicketType();
    this.ScheduleType();
    
    this.SatelliteSeriesService.currentIndex$.subscribe((index: number) => {
      console.log("receved index : ", index);
      this.clickOnIndexbasedTournament(index);
    });
    this.TicketUptext = "None";
    this.TicketDownText = "None";

    this.SatelliteSeriesService.previousButton$.subscribe((prev) =>{
      this.prevButtonCss = prev
    });

    this.SatelliteSeriesService.nextsButton$.subscribe((next) => {
      this.nextButtonCss = next
    });

    this.SatelliteSeriesService.saveButton$.subscribe((save) =>{
      this.saveButton = save
    })



  }


ngAfterViewInit():void{
  console.log("this.ngAfterViewInit  :--", this.tournamentData);
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

  GamesConfig() {
    let list: any = this.GamesofpokerService.GamesConfig();
    this.currencyFormatsSymbol = list[14];
    this.filterItem =list[13];
    console.log("list  : ",list)
    console.log("filterItem  : ",this.filterItem)
    this.selectedLanguageGuid = this.currencyFormatsSymbol[0].guid
    console.log("currencyFormatsSymbol", this.currencyFormatsSymbol)

    this.PokerGamesOnly = list[13];
    console.log("PokerGamesOnly   : ", this.PokerGamesOnly)
  }

  PayoutTicketType() {
    const PayoutTicketType = localStorage.getItem("PayoutTicketType");
    if (PayoutTicketType) {
      this.PayoutTicketTypeList = JSON.parse(PayoutTicketType);
    }
    console.log("PayoutTicketTypeList", this.PayoutTicketTypeList);
  }

  lengthofGamenameTypes() {

    return Object.keys(this.gameNametypes).length > 0
  }

  clickOnCreateTournament() {
    console.log("calling create tournament");
    this.createTournamentPopup = true;
    console.log(this.selectedLanguageGuid);

    this.prevButtonCss  = false;
    this.nextButtonCss = true;


  }


  exitFromSatellitePopup(event: any) {
    console.log(event);
    this.createTournamentPopup = event;

  }

  clickOnCtrateSitg() {
    console.log("calling create sitandgo");
    this.createSitngPopup = true


  }

  exitFromSatellitePopupSitngo(event: any) {
    this.createSitngPopup = event
  }

  addingPayoutdata(selectedViewItem: any, createdTournamentsCopy: any[] = [], index: number): any {

    this.view = JSON.parse(JSON.stringify(selectedViewItem))
    console.log(this.view)
    if (this.view?.structureType === "Fixed") {
      for (let j = 0; j < this.view?.ticketTypes?.length; j++) {
        for (let k = 0; k < this.PayoutTicketTypeList?.length; k++) {
          console.log(this.PayoutTicketTypeList)
          console.log(this.view?.ticketTypes?.[j])
          if (this.view?.ticketTypes?.[j] != null) {
            if (this.view?.ticketTypes[j]?.lowLong == this.PayoutTicketTypeList[k]?.guid?.lowLong) {
              if (this.view?.buyins[j] > 0) {
                this.view.ticketTypes[j] = this.PayoutTicketTypeList[k]?.value + " " + this.view?.buyins[j] + " x Buy-In"
              } else {
                this.view.ticketTypes[j] = this.PayoutTicketTypeList[k]?.value
              }
            }
          }
          else {
            if (this.view.buyins?.[j] > 0) {
              this.view.ticketTypes[j] = this.view?.buyins?.[j] + " x Buy-In"
            }
          }
        }

      }
    }

    console.log(this.view)

    if (this.view?.structureType === "Fixed") {
      for (let k = 0; k < this.view?.ticketTypes?.length; k++) {
        if (this.view?.ticketTypes[k].startsWith("Ticket Up")) {
          this.ticketUpChange = true;
          break;
        }else{
          this.ticketUpChange = false;
        }

      }

      for (let k = 0; k < this.view?.ticketTypes?.length; k++) {
        if (this.view?.ticketTypes[k].startsWith("Ticket Down")) { 
          this.ticketDownChange = true;
          break;
        }else{
          this.ticketDownChange = false;
        }

      }
      this.activeFloatType=false;

    } else {
      this.ticketUpChange = false;
      this.ticketDownChange = false;
      this.activeFloatType=true;

    }

    console.log("this.ticketUpChange        : ", this.ticketUpChange)
    console.log("this.ticketDownChange        : ", this.ticketDownChange)

    const activeTourney = createdTournamentsCopy.find((eachTourney: { id: number; }) => eachTourney?.id === index);

    if (activeTourney) {
      return (activeTourney.ticketText = this.view, activeTourney.payoutData = selectedViewItem, activeTourney.gameNametypes = { ...this.gameNametypes });
    }

    for (const eachTourney of createdTournamentsCopy) {
      if (eachTourney && eachTourney?.childrenTourney?.length >= 1) {
        const result = this.addingPayoutdata(selectedViewItem, eachTourney.childrenTourney, index);
        if (result) {
          return result;
        }
      }
    }

    return null; // Return null if the tourney with the specified index is not found



  }

  getPayoutData(payoutData: any = {}) {
    console.log(payoutData);
    this.tournamentsPayouts.push(payoutData);
    this.selectedViewItem = payoutData;
    console.log("selectedViewItem", this.selectedViewItem);
    console.log("pushedTournamentsPayouts", this.tournamentsPayouts);

    if (this.selectedViewItem) {
      this.addingPayoutdata(this.selectedViewItem, this.createdTournamentsCopy, this.indexOfCreatedTournament)
    }

  }

  getTournamentType(gameType: any) {
    // this.gameNametypes.push(gameType);
    this.gameNametypes = gameType;

    console.log("pushedGameNametypes", this.gameNametypes);

  }

  getFilterBodyData(filterbody: any) {
    console.log(filterbody);
    console.log(this.selectedLanguageGuid)
    this.createdTournaments.push(filterbody);
    const filterbodyCopy = JSON.parse(JSON.stringify(filterbody));


    for (let eachCurrency of this.currencyFormatsSymbol) {
      if (eachCurrency.guid.hiLong === this.selectedLanguageGuid.hiLong && eachCurrency.guid.lowLong === this.selectedLanguageGuid.lowLong) {
        filterbodyCopy.currency = eachCurrency.currencyCode
      }

    }

    this.TicketUptext = "None";
    this.TicketDownText = "None";
    if (this.createdTournaments.length <= 1) {
      this.indexOfCreatedTournament = 0;

    } else {
      this.indexOfCreatedTournament = this.createdTournaments.length - 1;
    }
    console.log("PushedCreatedTournaments", this.createdTournaments);
    console.log("indexOfCreatedTournamentLength   :  ", this.indexOfCreatedTournament)

    if (filterbodyCopy) {
      filterbodyCopy.id = this.indexOfCreatedTournament;
      filterbodyCopy.childrenTourney = [];
      filterbodyCopy.ticketUpStatus = "None";
      filterbodyCopy.ticketDownStatus = "None";
      filterbodyCopy.payoutData = this.selectedViewItem;
      filterbodyCopy.gameNametypes = { ...this.gameNametypes };
      this.createdTournamentsCopy.push(filterbodyCopy);
      this.ticketTokensection = "None";
      this.ticketTokenDownSection = "None"
      console.log(this.selectedViewItem)

    }



    console.log("unique_id : ", this.createdTournamentsCopy)
    this.payLoadOfCreatedTournament = this.afterDeletingPreviousTourney(this.createdTournamentsCopy, this.indexOfCreatedTournament);
    console.log(this.payLoadOfCreatedTournament);


    if (this.payLoadOfCreatedTournament?.ticketText?.structureType === "Fixed") {
      for (let k = 0; k < this.payLoadOfCreatedTournament?.ticketText?.ticketTypes?.length; k++) {
        if (this.payLoadOfCreatedTournament?.ticketText?.ticketTypes[k].startsWith("Ticket Up")) {
          this.ticketUpChange = true;
          break;
        }else{
          this.ticketUpChange = false;
        }


      }

      for (let k = 0; k < this.payLoadOfCreatedTournament?.ticketText?.ticketTypes?.length; k++) {
        if (this.payLoadOfCreatedTournament?.ticketText?.ticketTypes[k].startsWith("Ticket Down")) {
          this.ticketDownChange = true;
          break;

        }else{
          this.ticketDownChange = false;
        }

      }
      this.activeFloatType=false;

    } else {
      this.ticketUpChange = false;
      this.ticketDownChange = false;
      this.activeFloatType=true;

    }

    console.log("this.ticketUpChange        : ", this.ticketUpChange)
    console.log("this.ticketDownChange        : ", this.ticketDownChange)





    this.createTournamentPopup = false;
    this.createSitngPopup = false;

    this.selectedTournamentCurrency = this.payLoadOfCreatedTournament.currency

    if (this.payLoadOfCreatedTournament?.tourn?.buyIn?.value > this.payLoadOfCreatedTournament?.tourn?.guarantedPrize?.value) {
      this.warningtextForprizeandBuyin = true;
    } else {
      this.warningtextForprizeandBuyin = false;
    }

  }


  editSitPayoutData(payoutData: any = {}) {
    this.tournamentsPayouts[this.indexOfCreatedTournament] = payoutData;
    this.selectedViewItem = payoutData;
    console.log(this.tournamentsPayouts)
  }

  updateEditedList = (filterbody: any, createdTournamentsCopy: any[] = [], index: any) =>{
    return createdTournamentsCopy.map(eachTourney => {
      if (eachTourney.id === index) {
       console.log({ ...eachTourney, tourn:filterbody?.tourn })
        return { ...eachTourney, tourn:filterbody?.tourn }
      }

      // for (const eachTourney of createdTournamentsCopy) {
        if (eachTourney && eachTourney.childrenTourney?.length >= 1) {
        var editItem:any=  this.updateEditedList(filterbody, eachTourney.childrenTourney, index);
        if(editItem){
          return {...eachTourney,childrenTourney:editItem}
          // return editItem
        }
  
        }
      // }
      return eachTourney
    }
    
    
    );
    
    // return null; // Return null if the tourney with the specified index is not found

  }

  getEditSitngoFilterBodyData(filterbody: any) {
    console.log("Edit Tournament Date :    ", filterbody);
    let editedTourneyList = this.updateEditedList(filterbody, this.createdTournamentsCopy, this.indexOfCreatedTournament)
    this.createdTournaments[this.indexOfCreatedTournament] = filterbody;
    this.createdTournamentsCopy=[...editedTourneyList]
    // this.createdTournamentsCopy[this.indexOfCreatedTournament] = filterbody;
    this.payLoadOfCreatedTournament = this.afterDeletingPreviousTourney(this.createdTournamentsCopy, this.indexOfCreatedTournament);
    this.sitngoEditPopup = false;
    if (this.payLoadOfCreatedTournament?.tourn?.buyIn?.value > this.payLoadOfCreatedTournament?.tourn?.guarantedPrize?.value) {
      this.warningtextForprizeandBuyin = true;
    } else {
      this.warningtextForprizeandBuyin = false;
    }

    if (this.payLoadOfCreatedTournament?.ticketText?.structureType === "Fixed") {
      for (let k = 0; k < this.payLoadOfCreatedTournament?.ticketText?.ticketTypes?.length; k++) {
        if (this.payLoadOfCreatedTournament?.ticketText?.ticketTypes[k].startsWith("Ticket Up")) {
          this.ticketUpChange = true;
          break;
        }else{
          this.ticketUpChange = false;
        }

      }
      for (let k = 0; k < this.payLoadOfCreatedTournament?.ticketText?.ticketTypes?.length; k++) {
        if (this.payLoadOfCreatedTournament?.ticketText?.ticketTypes[k].startsWith("Ticket Down")) {
          this.ticketDownChange = true;
          break;

        }else{
          this.ticketDownChange = false;
        }

      }
      this.activeFloatType=false;

    } else {
      this.ticketUpChange = false;
      this.ticketDownChange = false;
      this.activeFloatType=true;

    }

    console.log("this.ticketUpChange        : ", this.ticketUpChange)
    console.log("this.ticketUpChange        : ", this.ticketDownChange)
    



  }

  getEditTournanentFilterBodyData(filterbody: any) {
  let editedTourneyList = this.updateEditedList(filterbody, this.createdTournamentsCopy, this.indexOfCreatedTournament)
   this.createdTournamentsCopy=[...editedTourneyList]
    this.createdTournaments[this.indexOfCreatedTournament] = filterbody;
    // this.createdTournamentsCopy[this.indexOfCreatedTournament] = filterbody;
    this.payLoadOfCreatedTournament = this.afterDeletingPreviousTourney(this.createdTournamentsCopy, this.indexOfCreatedTournament);
    this.tournamentEditPopup = false;

    if (this.payLoadOfCreatedTournament?.tourn?.buyIn?.value > this.payLoadOfCreatedTournament?.tourn?.guarantedPrize?.value) {
      this.warningtextForprizeandBuyin = true;
    } else {
      this.warningtextForprizeandBuyin = false;
    }

    console.log(filterbody);
    console.log(this.createdTournamentsCopy)

    if (this.payLoadOfCreatedTournament?.ticketText?.structureType === "Fixed") {
      for (let k = 0; k < this.payLoadOfCreatedTournament?.ticketText?.ticketTypes?.length; k++) {
        if (this.payLoadOfCreatedTournament?.ticketText?.ticketTypes[k].startsWith("Ticket Up")) {
          this.ticketUpChange = true;
          break;
        }else{
          this.ticketUpChange = false;
        }

      }

      for (let k = 0; k < this.payLoadOfCreatedTournament?.ticketText?.ticketTypes?.length; k++) {
        if (this.payLoadOfCreatedTournament?.ticketText?.ticketTypes[k].startsWith("Ticket Down")) {
          this.ticketDownChange = true;
          break;

        }else{
          this.ticketDownChange = false;
        }

      }
      this.activeFloatType=false;

    } else {
      this.ticketUpChange = false;
      this.ticketDownChange = false;
      this.activeFloatType=true;

    }

    console.log("this.ticketUpChange        : ", this.ticketUpChange);
    console.log("this.ticketUpChange        : ", this.ticketDownChange);
    console.log("this.aa        : ", editedTourneyList);
    console.log("createdTournamentsCopy    :",this.createdTournamentsCopy);


  }





  deleteSelectIndexBasedTourney(createdTournamentsCopy: any[] = [], index: number) {
    createdTournamentsCopy.forEach((eachTourney, i: number) => {
      if (eachTourney.id === index) {
        createdTournamentsCopy.splice(i, 1)
      }
      if (eachTourney.childrenTourney && eachTourney.childrenTourney.length > 0) {
        this.deleteSelectIndexBasedTourney(eachTourney.childrenTourney, index);
      }

    })

  }

  afterDeletingPreviousTourney(createdTournamentsCopy: any[] = [], index: number): any {
    const activeTourney = createdTournamentsCopy.find(eachTourney => eachTourney?.id === index);

    if (activeTourney) {
      return activeTourney;
    }

    for (const eachTourney of createdTournamentsCopy) {
      if (eachTourney && eachTourney?.childrenTourney?.length >= 1) {
        const result = this.afterDeletingPreviousTourney(eachTourney?.childrenTourney, index);
        if (result) {
          return result;
        }
      }
    }

    return null; // Return null if the tourney with the specified index is not found
  }


  clickOnDeleteTournament() {
    console.log("calling delete tournament");
    this.deleteTournamentPopup = true;
    const celeteTourney = this.createdTournaments.splice(this.indexOfCreatedTournament, 1);
    this.deleteSelectIndexBasedTourney(this.createdTournamentsCopy, this.indexOfCreatedTournament)


    // this.gameNametypes.splice(this.indexOfCreatedTournament, 1);
    this.tournamentsPayouts.splice(this.indexOfCreatedTournament, 1);


    console.log(celeteTourney)

    // if (this.indexOfCreatedTournament !== 0) {
    if (this.indexOfCreatedTournament > 0) {
      this.indexOfCreatedTournament--
      this.payLoadOfCreatedTournament = this.afterDeletingPreviousTourney(this.createdTournamentsCopy, this.indexOfCreatedTournament);
      this.selectedTournamentCurrency = this.payLoadOfCreatedTournament.currency;
      const activePayload = this.afterDeletingPreviousTourney(this.createdTournamentsCopy, this.indexOfCreatedTournament);
      this.selectedViewItem = activePayload.payoutData;
      this.gameNametypes = activePayload.gameNametypes
    } else if (this.createdTournaments.length > 0 && this.indexOfCreatedTournament == 0) {
      // this.indexOfCreatedTournament++
      this.payLoadOfCreatedTournament = this.afterDeletingPreviousTourney(this.createdTournamentsCopy, this.indexOfCreatedTournament);
      this.selectedTournamentCurrency = this.payLoadOfCreatedTournament.currency;
      const activePayload = this.afterDeletingPreviousTourney(this.createdTournamentsCopy, this.indexOfCreatedTournament);
      this.selectedViewItem = activePayload?.payoutData;
      this.gameNametypes = activePayload?.gameNametypes
      console.log(this.gameNametypes)
    }
    else {
      this.createdTournaments = [];
      this.createdTournamentsCopy = [];
      this.payLoadOfCreatedTournament = {};
      this.gameNametypes = {};
      this.selectedTournamentCurrency = "";
      this.selectedViewItem = {}

    }
    this.OnIndexBasedTicketUpTicketDowntext(this.createdTournamentsCopy, this.indexOfCreatedTournament)

    if (this.payLoadOfCreatedTournament?.tourn?.buyIn?.value > this.payLoadOfCreatedTournament?.tourn?.guarantedPrize?.value) {
      this.warningtextForprizeandBuyin = true;
    } else {
      this.warningtextForprizeandBuyin = false;
    }

    console.log("deletedcreatedTournaments", this.createdTournaments);
    console.log("deletedgameNametypes", this.gameNametypes);
    console.log("deletedtournamentsPayouts", this.tournamentsPayouts);


    if (this.payLoadOfCreatedTournament?.ticketText?.structureType === "Fixed") {
      for (let k = 0; k < this.payLoadOfCreatedTournament?.ticketText?.ticketTypes?.length; k++) {
        if (this.payLoadOfCreatedTournament?.ticketText?.ticketTypes[k].startsWith("Ticket Up")) {
          this.ticketUpChange = true;
          break;
        }else{
          this.ticketUpChange = false;
        }
        

      }

      for (let k = 0; k < this.payLoadOfCreatedTournament?.ticketText?.ticketTypes?.length; k++) {
        if (this.payLoadOfCreatedTournament?.ticketText?.ticketTypes[k].startsWith("Ticket Down")) {
          this.ticketDownChange = true;
          break;

        }else{
          this.ticketDownChange = false;
        }

      }
      this.activeFloatType=false;

    } else {
      this.ticketUpChange = false;
      this.ticketDownChange = false;
      this.activeFloatType=true;

    }

    console.log("this.ticketUpChange        : ", this.ticketUpChange)
    console.log("this.ticketUpChange        : ", this.ticketDownChange)

  }

  OnIndexBasedTicketUpTicketDowntext(createdTournamentsCopy: any[] = [], index: number) {
    for (let eachItem of createdTournamentsCopy) {
      if (eachItem.id == index) {
        this.TicketUptext = eachItem?.ticketUpStatus;
        this.ticketTokensection = eachItem?.ticketUpStatus;
        this.TicketDownText = eachItem?.ticketDownStatus;
        this.ticketTokenDownSection = eachItem?.ticketDownStatus;


        console.log("TicketDownText   : ",eachItem.ticketDownStatus);
        console.log("ticketTokenDownSection   : ",eachItem.ticketDownStatus);
      }
      if (eachItem?.childrenTourney && eachItem?.childrenTourney.length >= 1) {
        this.OnIndexBasedTicketUpTicketDowntext(eachItem.childrenTourney, this.indexOfCreatedTournament)
      }

      // return eachItem
    }


  }

  clickOnIndexbasedTournament(index: number) {
    console.log(index);
    this.indexOfCreatedTournament = index;
    const activePayload = this.afterDeletingPreviousTourney(this.createdTournamentsCopy, this.indexOfCreatedTournament);
    if (activePayload) {
      this.selectedViewItem = activePayload.payoutData;
      this.gameNametypes = activePayload.gameNametypes
      this.payLoadOfCreatedTournament = activePayload;
      console.log(this.gameNametypes)
      this.OnIndexBasedTicketUpTicketDowntext(this.createdTournamentsCopy, index);
      this.selectedTournamentCurrency = activePayload.currency;


      if (this.payLoadOfCreatedTournament?.ticketText?.structureType === "Fixed") {
        for (let k = 0; k < this.payLoadOfCreatedTournament?.ticketText?.ticketTypes?.length; k++) {
          if (this.payLoadOfCreatedTournament?.ticketText?.ticketTypes[k].startsWith("Ticket Up")) {
            this.ticketUpChange = true;
            break;
          }else{
            this.ticketUpChange = false;
          }

  
        }

        for (let k = 0; k < this.payLoadOfCreatedTournament?.ticketText?.ticketTypes?.length; k++) {
          if (this.payLoadOfCreatedTournament?.ticketText?.ticketTypes[k].startsWith("Ticket Down")) {
            this.ticketDownChange = true;
            break;
  
          }else{
            this.ticketDownChange = false;
          }
  
        }
        this.activeFloatType=false;
  
      } else {
        this.ticketUpChange = false;
        this.ticketDownChange = false;
        this.activeFloatType=true;
  
      }

      console.log("this.ticketUpChange        : ", this.ticketUpChange)
      console.log("this.ticketUpChange        : ", this.ticketDownChange)


    }



    if (this.payLoadOfCreatedTournament?.tourn?.buyIn?.value > this.payLoadOfCreatedTournament?.tourn?.guarantedPrize?.value) {
      this.warningtextForprizeandBuyin = true;
    } else {
      this.warningtextForprizeandBuyin = false;
    }
  }

  showPayOutTable() {
    this.showPayoutTable = !this.showPayoutTable;
    const activePayload = this.afterDeletingPreviousTourney(this.createdTournamentsCopy, this.indexOfCreatedTournament);
    this.selectedViewItem = activePayload.payoutData;
    console.log(this.selectedViewItem);
    if (this.selectedViewItem?.structureType === "Fixed") {
      for (let j = 0; j < this.selectedViewItem.ticketTypes.length; j++) {

        for (let k = 0; k < this.PayoutTicketTypeList.length; k++) {
          if (this.selectedViewItem.ticketTypes[j] != null) {
            if (this.selectedViewItem.ticketTypes[j].lowLong == this.PayoutTicketTypeList[k].guid.lowLong) {
              if (this.selectedViewItem.buyins[j] > 0) {
                this.selectedViewItem.ticketTypes[j] = this.PayoutTicketTypeList[k].value + " " + this.selectedViewItem.buyins[j] + " x Buy-In"
              } else {
                this.selectedViewItem.ticketTypes[j] = this.PayoutTicketTypeList[k].value
              }
            }
          }
          else {
            if (this.selectedViewItem.buyins[j] > 0) {
              this.selectedViewItem.ticketTypes[j] = this.selectedViewItem.buyins[j] + " x Buy-In"
            }
          }
        }
        this.ticketTypes.push(this.selectedViewItem.ticketTypes[j])
      }





    }
  }

  ViewPayoutTableclosepopup() {
    this.showPayoutTable = !this.showPayoutTable
  }

  tournamentErrorclosepopup() {
    this.satelliteErrorPopupBool = false;
  }


  clickOnEditSatelliteSitngoInfo() {
    this.editOptionMode = true
    // this.dupPlayerSitandGoData={...this.payLoadOfCreatedTournament?.tourn} 
    this.dupPlayerSitandGoData = JSON.parse(JSON.stringify(this.payLoadOfCreatedTournament?.tourn))
    this.dupPlayerSitandGoData['satelliteEdit'] = true;

    console.log(this.payLoadOfCreatedTournament?.tourn);
    console.log(this.ScheduleTypeList);
    console.log("dupPlayerSitandGoData", this.dupPlayerSitandGoData);


    for (let i = 0; i < this.ScheduleTypeList.length; i++) {
      console.log(this.dupPlayerSitandGoData?.tourn?.shedule?.type)
      if (this.ScheduleTypeList[i]?.guid?.lowLong == this.dupPlayerSitandGoData?.shedule?.type?.lowLong && this.ScheduleTypeList[i]?.guid?.hiLong == this.dupPlayerSitandGoData?.shedule?.type?.hiLong) {
        // if (this.ScheduleTypeList[i]?.guid == this.dupPlayerSitandGoData?.shedule?.type) {
        console.log(this.ScheduleTypeList[i]);
        this.dupPlayerSitandGoData['shedule']['type'] = this.ScheduleTypeList[i]?.value;
        break;

      }

    }

    if (this.dupPlayerSitandGoData?.['shedule']?.['startDate']) {
      this.dupPlayerSitandGoData['shedule']['startDate'] = this.payLoadOfCreatedTournament['tourn']['shedule']?.['startDate'] + "Z[UTC]";
    }

    for (let eachGame of this.PokerGamesOnly) {
      if (eachGame.name == this.payLoadOfCreatedTournament?.tourn?.gameName) {
        this.dupPlayerSitandGoData['gameName'] = eachGame.caption;
        break;
      }

    }
    this.PlayerSitandGoData = this.dupPlayerSitandGoData;


    console.log(this.gameNametypes)
    console.log(this.PlayerSitandGoData)
    if (this.gameNametypes?.type == "Tournament Info") {
      this.tournamentEditPopup = true;
    } else {
      this.sitngoEditPopup = true;
    }

    this.prevButtonCss  = false;
    this.nextButtonCss = true;

  }

  fillterRemainingTourneys(createdTournamentsCopy: any[] = []): any {
    console.log("fillterRemainingTourneys", createdTournamentsCopy);

    let remainingTourney: any[] = []
    createdTournamentsCopy.forEach((eachTourney) => {
      if (eachTourney.id != this.indexOfCreatedTournament) {
        this.remaningTourneys.push(eachTourney)
        if (eachTourney.childrenTourney && eachTourney.childrenTourney.length >= 1) {
          this.fillterRemainingTourneys(eachTourney.childrenTourney)

        }

      }
    })

    console.log("remainingTourney  :  ", this.remaningTourneys);
    return remainingTourney
  }


  clickOnTicketUp() {
    this.ticketUpPopup = true;
    // this.remaningTourneys = this.fillterRemainingTourneys(this.createdTournamentsCopy);
    this.remaningTourneys = []
    this.fillterRemainingTourneys(this.createdTournamentsCopy);


    // console.log("remaningTourneys", this.remaningTourneys);
    // console.log("indexOfCreatedTournament", this.indexOfCreatedTournament);
    // console.log("createdTournaments", this.createdTournaments);
    // console.log("createdTournamentsCopy", this.createdTournamentsCopy);
    // console.log("ticketTokensection  :  ", this.ticketTokensection)
  }

  pushAllSubChildrensIfIdMatched(createdTournamentsCopy: any = []) {

   
    console.log(createdTournamentsCopy)
    for (let j = 0; j < createdTournamentsCopy.length; j++) {
      if(createdTournamentsCopy[j].id !== this.indexOfCreatedTournament){
      console.log("createdTournamentsCopy[i].childrenTourney[j]?.tourn?.caption", createdTournamentsCopy[j]?.tourn?.caption, "createdTournamentsCopy[i].childrenTourney[j]?.currency", createdTournamentsCopy[j]?.currency)
      // this.ticketDown.push(`${createdTournamentsCopy?.tourn?.caption} + ': ' + ${createdTournamentsCopy.currency} + ${createdTournamentsCopy.tourn?.totalCost?.value} + .00(Buy-In+Knockout Bounty+ Fee)`)
      this.ticketDown.push(createdTournamentsCopy[j]);
      console.log(this.ticketDown);

      if (createdTournamentsCopy[j].childrenTourney && createdTournamentsCopy[j].childrenTourney.length > 0) {
        this.pushAllSubChildrensIfIdMatched(createdTournamentsCopy[j].childrenTourney);
      }}
    }

    // ticketDown.push(`${createdTournamentsCopy[i].tourn.caption} + ': ' + ${createdTournamentsCopy[i].currency} + ${createdTournamentsCopy[i].tourn.totalCost.value} + .00(Buy-In+Knockout Bounty+ Fee)`)

  }


  fillterRemainingTicketDownTourneys(createdTournamentsCopy: any[]): any {
    for (let i = 0; i < createdTournamentsCopy.length; i++) {
      if (createdTournamentsCopy[i].id == this.indexOfCreatedTournament) {

        if (createdTournamentsCopy[i].childrenTourney && createdTournamentsCopy[i].childrenTourney.length > 0) {
          const children = this.pushAllSubChildrensIfIdMatched(createdTournamentsCopy[i].childrenTourney);
        }
        return i

      }

      if (createdTournamentsCopy[i].childrenTourney && createdTournamentsCopy[i].childrenTourney.length > 0) {
        const children = this.fillterRemainingTicketDownTourneys(createdTournamentsCopy[i].childrenTourney);
        if (children != -1) {
          return i
        }
      }
    }

    return -1

  }

  currentIndexTourney(createdTournamentsCopy:any=[],index:number):any{

   let indexItem = createdTournamentsCopy.filter((eachItem:any)=>{
      if(eachItem.id===index){
        return true
      }else{
        return false
      }
    } 
    );
    for (let eachTourney of createdTournamentsCopy){
      if(eachTourney.childrenTourney&&eachTourney.childrenTourney.length>0){
      let item=  this.currentIndexTourney(eachTourney.childrenTourney ,index);
      if(item){
        return item
      }
      }
     
    }
    return indexItem

  }
  pushIntoRemainingticketdownTournys(createdTournamentsCopy: any = [], index: any) {
    for (let i = 0; i < createdTournamentsCopy.length; i++) {
      console.log("i !== index    : ", i !== index, i, index)
      console.log("createdTournamentsCopy[i].id !== this.indexOfCreatedTournament    : ", createdTournamentsCopy[i].id !== this.indexOfCreatedTournament, createdTournamentsCopy[i].id, this.indexOfCreatedTournament)
      if (i !== index) {
        if (createdTournamentsCopy[i].id !== this.indexOfCreatedTournament) {
          this.ticketDown.push(createdTournamentsCopy[i]);
          console.log(this.ticketDown)

          if (createdTournamentsCopy[i].childrenTourney && createdTournamentsCopy[i].childrenTourney.length > 0) {
            // this.pushIntoRemainingticketdownTournys(createdTournamentsCopy[i].childrenTourney, index);
            this.pushAllSubChildrensIfIdMatched(createdTournamentsCopy[i].childrenTourney);
          }
        }
      }else{


      let indexItem =  this.currentIndexTourney(this.createdTournamentsCopy,this.indexOfCreatedTournament)
        console.log(indexItem)
        if(this.createdTournamentsCopy?.length===1&&indexItem[0]?.childrenTourney?.length===0){
          this.ticketdownEmty = true;
        }else{
          this.ticketdownEmty = false;
        }
       


        // if (createdTournamentsCopy[i].childrenTourney && createdTournamentsCopy[i].childrenTourney.length > 0) {
        //   // this.pushIntoRemainingticketdownTournys(createdTournamentsCopy[i].childrenTourney, index);
        //     this.pushAllSubChildrensIfIdMatched(createdTournamentsCopy[i].childrenTourney);
        
        // }

        const indexs = this.fillterRemainingTicketDownTourneys(this.createdTournamentsCopy);
        console.log(indexs);
        if (indexs > -1) {
          this.pushIntoRemainingticketdownTournys(createdTournamentsCopy[i].childrenTourney, indexs);
    
        }
      }

      

    }

  }


  // pushIntoRemainingticketdownTournys(createdTournamentsCopy: any = [], index: any) {
  //   for (let i = 0; i < createdTournamentsCopy.length; i++) {
  //     console.log("i !== index    : ", i !== index, i, index)
  //     console.log("createdTournamentsCopy[i].id !== this.indexOfCreatedTournament    : ", createdTournamentsCopy[i].id !== this.indexOfCreatedTournament, createdTournamentsCopy[i].id, this.indexOfCreatedTournament)
  //     if (i !== index) {
  //       if (createdTournamentsCopy[i].id !== this.indexOfCreatedTournament) {
  //         alert("111111")
  //         this.ticketDown.push(createdTournamentsCopy[i]);
  //         console.log(this.ticketDown);
  //         if (createdTournamentsCopy[i].childrenTourney && createdTournamentsCopy[i].childrenTourney.length > 0) {
  //           this.pushAllSubChildrensIfIdMatched(createdTournamentsCopy[i].childrenTourney);
  //           // this.pushIntoRemainingticketdownTournys(createdTournamentsCopy[i].childrenTourney, index);
  //         }

          
  //       }
  //     }else{
  //       console.log(this.createdTournamentsCopy[i])
        
  //     }

      

  //   }

  // }


  








  clickOnTicketDown() {
    this.ticketDown = []
    this.ticketDownPopup = true

    const index = this.fillterRemainingTicketDownTourneys(this.createdTournamentsCopy);
    console.log(index);
    if (index > -1) {
      this.pushIntoRemainingticketdownTournys(this.createdTournamentsCopy, index);

    }

    if (this.ticketDown.length) {
      this.ticketDownCopy = this.ticketDown.filter((obj: { [x: string]: any; }, index: any, self: any[]) => {
        return index === self.findIndex((t) => (
          t['id'] === obj['id']
        ));
      });
    }

  }


  addChildrenTourenyWhenTicketSelect(createdTournamentsCopy: any[], selectedToTicketUpTourney: any = {}): any {
    for (let i = 0; i < createdTournamentsCopy.length; i++) {
      if (createdTournamentsCopy[i]?.tourn?.caption == this.ticketTokensection.split(":")[0]) {
        console.log(this.ticketTokensection)
        console.log("addChildrenTourenyWhenTicketSelect   : ", createdTournamentsCopy);
        return createdTournamentsCopy[i]?.childrenTourney?.push(selectedToTicketUpTourney);
      }
      if (createdTournamentsCopy[i]?.childrenTourney.length && createdTournamentsCopy[i]?.childrenTourney.length >= 1) {
        // this.addChildrenTourenyWhenTicketSelect(createdTournamentsCopy[i].childrenTourney[0], selectedToTicketUpTourney);
        this.addChildrenTourenyWhenTicketSelect(createdTournamentsCopy[i].childrenTourney, selectedToTicketUpTourney);

      }





    }

  }


  findChildrenBasedOnTicketSelect(createdTournamentsCopy: any[]): any {
    console.log("findChildrenBasedOnTicketSelect   :", createdTournamentsCopy);
    let spliceItem: any;

    for (let i = 0; i < createdTournamentsCopy.length; i++) {
      console.log("eachTourney.id :  ", createdTournamentsCopy[i].id, "this.indexOfCreatedTournament", this.indexOfCreatedTournament);

      if (createdTournamentsCopy[i].id == this.indexOfCreatedTournament) {
        spliceItem = createdTournamentsCopy.splice(i, 1)[0];
        console.log(spliceItem, createdTournamentsCopy);
        i--; // Adjust the loop index after the splice
      }

      if (createdTournamentsCopy[i]?.childrenTourney && createdTournamentsCopy[i]?.childrenTourney.length >= 1) {
        const childSpliceItem = this.findChildrenBasedOnTicketSelect(createdTournamentsCopy[i].childrenTourney);

        if (childSpliceItem) {
          console.log("Child Splice Item:", childSpliceItem);
          return childSpliceItem;
        }
      }
    }

    console.log(spliceItem);
    return spliceItem;
  }



  setTheTicketUpStatus(createdTournamentsCopy: any[] = [], index: number) {
    for (let eachItem of createdTournamentsCopy) {
      console.log("eachItem.ticketUpStatus   : ", eachItem.ticketUpStatus, "this.ticketTokensection   : ", this.ticketTokensection)
      if (eachItem.id === index) {
        eachItem.ticketUpStatus = this.ticketTokensection;
        this.TicketUptext = this.ticketTokensection
        return;
      }
      if (eachItem?.childrenTourney && eachItem?.childrenTourney.length >= 1) {

        this.setTheTicketUpStatus(eachItem.childrenTourney, index);
      }
    }
  }


  onchangeTicketUpstatus(event: any) {

    this.setTheTicketUpStatus(this.createdTournamentsCopy, this.indexOfCreatedTournament);
    console.log(this.ticketTokensection);
    console.log(this.ticketTokensection.split(":"));

    const selectedToTicketUpTourney = this.findChildrenBasedOnTicketSelect(this.createdTournamentsCopy);
    console.log("selectedToTicketUpTourney :    ", selectedToTicketUpTourney);

    if (selectedToTicketUpTourney) {
      this.addChildrenTourenyWhenTicketSelect(this.createdTournamentsCopy, selectedToTicketUpTourney);
    }

  }

  setTheTicketDownStatus(createdTournamentsCopy: any = [], index: number) {
    for (let eachItem of createdTournamentsCopy) {
      console.log("eachItem.ticketDownStatus   : ", eachItem.ticketDownStatus, "this.ticketTokenDownSection   : ", this.ticketTokenDownSection)
      if (eachItem.id === index) {
        eachItem.ticketDownStatus = this.ticketTokenDownSection;
        this.TicketDownText = this.ticketTokenDownSection;
        console.log(eachItem.ticketDownStatus);
        console.log(this.TicketDownText );
        return;
      }
      if (eachItem?.childrenTourney && eachItem?.childrenTourney?.length >= 1) {
        this.setTheTicketDownStatus(eachItem.childrenTourney, index);
      }
    }

  }

  onchangeTicketDownstatus(event: any) {
    this.setTheTicketDownStatus(this.createdTournamentsCopy, this.indexOfCreatedTournament);
  }

  ticketUpErrorclosepopup() {
    this.ticketUpPopup = false;
  }

  ticketDownErrorclosepopup() {
    this.ticketDownPopup = false;
  }

  editTournyPop(type: any) {
    
    if (type == "yes") {
      this.CreatePokerSitnGoComponent.onFormSubmit();

    } else if (type === 'createTourney') {
      this.createTournamentPopup = false;
      this.tournamentEditPopup = false;
    } else {
      this.createSitngPopup = false;
      this.sitngoEditPopup = false;
    };
    this.prevButtonCss  = false;
    this.nextButtonCss = true;
    
  }




  getTab(pageNav: string, type: string) {
    if (type === 'sitngo') {
      this.CreatePokerSitnGoComponent.getTab(pageNav)
    }
  }
  getTabTourneyPrev() {
    this.CreatePokerTouranamentComponent.changeToPreviousTabs();
  }
  getTabTournetNxt() {
    this.CreatePokerTouranamentComponent.changeToNextTabs();

  }


  onFormSubmit(tournetName: string) {
    if (tournetName == 'sitngocreate') {
      this.CreatePokerSitnGoComponent.onFormSubmit();
    } else if (tournetName == 'Tournamentcreate') {
      this.CreatePokerTouranamentComponent.onFormSubmit();
    }
  }

  errorMsgToshowFreeroll(): boolean {
    const freerollbool = this.createdTournamentsCopy.length == 1 && this.createdTournamentsCopy[0].childrenTourney.length > 0 && this.ticketTokensection == 'None'
    return freerollbool;
  }

  errorMsgToshowTicketdownSelectdropdown() {
    const ticketdownErrorbool = this.createdTournamentsCopy.length == 1 && this.createdTournamentsCopy[0].childrenTourney.length < 0 && this.ticketTokenDownSection == 'None'
    console.log(ticketdownErrorbool);
    return ticketdownErrorbool
  }

  ticketupOrdownErrorText(createdTournamentsCopy: any[]) {
    console.log("createdTournamentsCopy    :   ",createdTournamentsCopy)
    createdTournamentsCopy.forEach((eachItem: any) => {
      if (eachItem?.payoutData?.structureType === "Fixed") {
        for (let i = 0; i < eachItem?.ticketText?.ticketTypes?.length; i++) {
          if (eachItem?.ticketText?.ticketTypes[i].startsWith('Ticket Up')) {
            if (eachItem?.ticketUpStatus === "None") {
              this.satelliteErrorPopupTest += `  Ticket Up Tournament must be selected for tournament ${eachItem?.tourn?.caption} :${eachItem?.currency} ${eachItem?.tourn?.totalCost?.value}.00(Buy-In + Knockout Bounty + Fee)  \n`
              console.log(`  Ticket Up Tournament must be selected for tournament ${eachItem?.tourn?.caption} :${eachItem?.currency} ${eachItem?.tourn?.totalCost?.value}.00(Buy-In + Knockout Bounty + Fee)\n`)
              this.satelliteErrorTicketUpDown = true
              this.satelliteErrorPopupBool = true
              break;
            }else{
              this.satelliteErrorTicketUpDown = false;
              this.satelliteErrorPopupBool = false;
            }

          }
        }
      }

      if (eachItem?.payoutData?.structureType === "Fixed") {
        for (let i = 0; i < eachItem?.ticketText?.ticketTypes?.length; i++) {
          if (eachItem?.ticketText?.ticketTypes[i].startsWith('Ticket Down')) {
            if (eachItem?.ticketDownStatus === "None") {
              this.satelliteErrorTicketUpDown = true
              this.satelliteErrorPopupBool=true;
              this.satelliteErrorPopupTest += `  Ticket Down Tournament must be selected for tournament ${eachItem?.tourn?.caption} :${eachItem?.currency} ${eachItem?.tourn?.totalCost?.value}.00(Buy-In + Knockout Bounty + Fee)  \n`
              console.log(`  Ticket Down Tournament must be selected for tournament ${eachItem?.tourn?.caption} :${eachItem?.currency} ${eachItem?.tourn?.totalCost?.value}.00(Buy-In + Knockout Bounty + Fee)\n`)
              console.log("satelliteErrorPopupTest    :",this.satelliteErrorPopupTest)
              console.log("satelliteErrorPopupBool    :",this.satelliteErrorPopupBool)
              console.log("satelliteErrorTicketUpDown :",this.satelliteErrorTicketUpDown)
              break;
            }else{
            
              this.satelliteErrorTicketUpDown = false;
              this.satelliteErrorPopupBool=false;
            }

          }
        }
      }


      if (eachItem.childrenTourney && eachItem.childrenTourney.length > 0) {
        this.ticketupOrdownErrorText(eachItem.childrenTourney)
      }
    }

    )

  }


  SuccessPop(){
    this.subscribeResult = false;
    if(this.successPopupText="Successfully Created"){
      this.router.navigateByUrl('/pokersatelliteseries');
        let closepopup:boolean = false
        this.closeEditSatellitePopup.emit(closepopup)
     

    }else{
      // window.location.reload();
    }
  }


  getTicketDownId(tourneyName:string,createdTournamentsCopy:any=[]){

    for(let j=0;j<createdTournamentsCopy.length;j++){
      if(createdTournamentsCopy[j]?.tourn?.caption ===tourneyName){
        return { ticketdownId:createdTournamentsCopy[j]?.id,
                  previousGuid:createdTournamentsCopy[j]?.tourn?.guid
        }
        // return  createdTournamentsCopy[j]?.id
      }

      if(createdTournamentsCopy[j].childrenTourney&&createdTournamentsCopy[j].childrenTourney.length>0){
       var id:any= this.getTicketDownId(tourneyName,createdTournamentsCopy[j].childrenTourney);
       if(id.ticketdownId !==null){
        return id
       }
      }
      console.log(id)
      return { ticketdownId:null,
        previousGuid:null
}
    }

  }

  getServerBodyDate(createdTournamentsCopy:any=[]){
    console.log(createdTournamentsCopy)
    // for(let i=0; i<createdTournamentsCopy.length;i++){
    //   createdTournamentsCopy[i].tourn.numberInSeries=this.numberInSeriesTourney
    //   this.createdPayload.push({...createdTournamentsCopy[i].tourn,
    //     messages: null,
    //     autoRegisterTourney: false,
    //     tags: null,
		// 		seriesId: null,
		// 		seriesName: null,
    //     status: null,
    //     payoutTable: null,
    //     accessRuleName: null,
    //     makeADeal: false,
		// 		fontColor: "0,0,0",
		// 		fontHeight: 0,
		// 		fontStyle: null,
    //     guid: null,
    //     numberInSeries:this.numberInSeriesTourney,
		// 		});

    //     if(this.numberInSeriesTourney>0){
    //       this.linksData.push(
    //         {
    //           fromSettingsId:null ,
    //           fromSettingsNumber: this.numberInSeriesTourney,
    //           slot: {
    //             hiLong: 0,
    //             lowLong: 0
    //           },
    //           toSettingsId: null,
    //           toSettingsNumber: this.toSettingsNumber
    //         }
    //       )

    //     } 
        
    //     this.numberInSeriesTourney++;
    //     if(createdTournamentsCopy[i].childrenTourney&&createdTournamentsCopy[i].childrenTourney.length>0){
    //       console.log(createdTournamentsCopy[i]);
    //       console.log(createdTournamentsCopy[i]?.tourn?.numberInSeries);
    //       // if(createdTournamentsCopy[i]?.tourn?.numberInSeries){
    //         this.toSettingsNumber=createdTournamentsCopy[i]?.tourn?.numberInSeries;
    //         console.log(createdTournamentsCopy[i]?.numberInSeries);
    //         this.getServerBodyDate(createdTournamentsCopy[i].childrenTourney);

    //       // }
          
          
    
    //     }
    // }


    // -------------------------------------------------------------------------------



    for(let i=0; i<createdTournamentsCopy.length;i++){
      console.log("Ticket Up" ,createdTournamentsCopy[i])
      createdTournamentsCopy[i].tourn.numberInSeries=createdTournamentsCopy[i].id
      this.createdPayload.push({...createdTournamentsCopy[i].tourn,
        messages: null,
        autoRegisterTourney: false,
        tags: null,
				seriesId: null,
				seriesName: null,
        // status: null,
        status:(createdTournamentsCopy[i]?.tourn?.guid ==null||createdTournamentsCopy[i]?.tourn?.guid =="")?null: {hiLong:0,lowLong:1},
        payoutTable: null,
        accessRuleName: null,
        makeADeal: false,
				fontColor: "0,0,0",
				fontHeight: 0,
				fontStyle: null,
        // guid: null,
        guid: (createdTournamentsCopy[i]?.tourn?.guid ==null||createdTournamentsCopy[i]?.tourn?.guid =="")?null:createdTournamentsCopy[i]?.tourn?.guid,
        numberInSeries:createdTournamentsCopy[i].id,
        // numberInSeries:this.numberInSeriesTourney,
				});

        // -------------------------------------------------------------

        if (createdTournamentsCopy[i]?.payoutData?.structureType === "Fixed") {
          for (let j = 0; j < createdTournamentsCopy[i]?.ticketText?.ticketTypes?.length; j++) {
            if (createdTournamentsCopy[i]?.ticketText?.ticketTypes[j].startsWith('Ticket to Oneself')) {
              console.log("Ticket to Oneself" ,createdTournamentsCopy[i]?.fromSettingsId)
              console.log("Ticket to Oneself" ,createdTournamentsCopy[i]?.toSettingsId)
                this.linksData.push(
                  {
                    fromSettingsId: createdTournamentsCopy[i].tourn?.guid ==null?null:createdTournamentsCopy[i]?.tourn?.guid,
                    fromSettingsNumber: createdTournamentsCopy[i].id,
                    slot: {
                      hiLong: 0,
                      lowLong: 1
                    },
                    // slot: null,
                    toSettingsId: createdTournamentsCopy[i].tourn?.guid ==null?null:createdTournamentsCopy[i]?.tourn?.guid,
                    toSettingsNumber: createdTournamentsCopy[i].id
                  }
                )
              break;
             
            }
          }
        }



        if ( createdTournamentsCopy[i]?.payoutData?.structureType === "Fixed") {
          for (let j = 0; j <  createdTournamentsCopy[i]?.ticketText?.ticketTypes?.length; j++) {
            if ( createdTournamentsCopy[i]?.ticketText?.ticketTypes[j].startsWith('Ticket Up')) {
              console.log("Ticket Up" ,createdTournamentsCopy[i]?.fromSettingsId)
              console.log("Ticket Up" ,createdTournamentsCopy[i]?.toSettingsId)
                this.linksData.push(
                  {
                    fromSettingsId:createdTournamentsCopy[i].tourn?.guid ==null?null:createdTournamentsCopy[i]?.tourn?.guid ,
                    fromSettingsNumber: createdTournamentsCopy[i].id,
                    slot: {
                      hiLong: 0,
                      lowLong: 0
                    },
                    // slot: null,
                    toSettingsId: this.settingsIdTo ==null?null:this.settingsIdTo,
                    toSettingsNumber: this.toSettingsNumber
                  }
                )


              break;
              
  
            }
          }
        }



        if (createdTournamentsCopy[i]?.payoutData?.structureType === "Fixed") {
          for (let j = 0; j < createdTournamentsCopy[i]?.ticketText?.ticketTypes?.length; j++) {
            if (createdTournamentsCopy[i]?.ticketText?.ticketTypes[j].startsWith('Ticket Down')) {
              console.log(createdTournamentsCopy[i]?.ticketDownStatus)
              console.log(createdTournamentsCopy[i]?.ticketDownStatus?.split(":")[0]);
              var {ticketdownId,previousGuid} = this.getTicketDownId(createdTournamentsCopy[i]?.ticketDownStatus?.split(":")[0], this.createdTournamentsCopy)
              console.log(" ticketdownId  :=====",ticketdownId);
              // if(ticketdownId){
                console.log("ticketdownId" ,createdTournamentsCopy[i]?.fromSettingsId)
                console.log("ticketdownId" ,createdTournamentsCopy[i]?.toSettingsId)
                this.linksData.push(
                  {
                    fromSettingsId:createdTournamentsCopy[i].tourn?.guid ==null?null:createdTournamentsCopy[i]?.tourn?.guid ,
                    fromSettingsNumber: createdTournamentsCopy[i].id,
                    slot: {
                      hiLong: 0,
                      lowLong: 2
                    },
                    // slot: null,
                    toSettingsId: previousGuid ==null?null:previousGuid,
                    toSettingsNumber: ticketdownId
                  }
                )

              // }  
              
              break;
             
            }
          }
        }
        
        this.numberInSeriesTourney++;
        if(createdTournamentsCopy[i].childrenTourney&&createdTournamentsCopy[i].childrenTourney.length>0){
          console.log(createdTournamentsCopy[i]);
          console.log(createdTournamentsCopy[i]?.tourn?.numberInSeries);
          // if(createdTournamentsCopy[i]?.tourn?.numberInSeries){
            this.toSettingsNumber=createdTournamentsCopy[i]?.tourn?.numberInSeries;
            this.settingsIdTo = createdTournamentsCopy[i]?.tourn?.guid
            console.log(createdTournamentsCopy[i]?.numberInSeries);
            this.getServerBodyDate(createdTournamentsCopy[i].childrenTourney);

          // }
          
          
    
        }
    }


  }


  clickOnSubmitButton() {
  
    this.numberInSeriesTourney=0;
    this.createdPayload=[];
    this.linksData=[];
    this.satelliteErrorPopupTest="";
    this.ticketupOrdownErrorText(this.createdTournamentsCopy);
    console.log("satelliteErrorTicketUpDown",   this.satelliteErrorTicketUpDown);
    if (this.satelliteSeriesName == "" && this.createdTournamentsCopy.length <= 1 && this.createdTournamentsCopy[0].childrenTourney.length <= 0) {
      this.satelliteErrorPopupTest = `    Name can't be empty \n    Can't create series from one tournament`
      this.satelliteErrorPopupBool = true
    }else if (this.satelliteSeriesName == "") {
      this.satelliteErrorPopupTest = `  Name can't be empty`
      this.satelliteErrorPopupBool = true
    } else if (this.createdTournamentsCopy.length <= 1 && this.createdTournamentsCopy[0].childrenTourney.length <= 0) {
      this.satelliteErrorPopupTest = `   Can't create series from one tournament`
      this.satelliteErrorPopupBool = true
    } else if (this.createdTournamentsCopy.length >= 2) {
      this.satelliteErrorPopupTest = `   All series tournaments must be included in one tree \n`
      this.satelliteErrorPopupBool = true

    }else if(  this.satelliteErrorTicketUpDown == true||this.satelliteErrorPopupTest !==""){
      // this.satelliteErrorPopupTest = "";
      this.satelliteErrorPopupBool = true;

    }else {
      
      this.satelliteErrorPopupBool = false;
      console.log(this.satelliteErrorPopupTest);
      this.getServerBodyDate(this.createdTournamentsCopy);
      console.log("this.createdPayload    :",this.createdPayload);
      console.log("this.linksData    :",this.linksData);

      if(this.createdPayload&&this.linksData){
        let bodyData={
          series: {
            name: this.satelliteSeriesName,
            tournaments:[...this.createdPayload],
            links:[ ...this.linksData
                ],
            shareType: {
              hiLong: 0,
              lowLong: 0
            },
            guid: (this.editSatelliteGuid === null||this.editSatelliteGuid === "")?null:this.editSatelliteGuid,
            // guid: this.editSatelliteGuid === null,
            objState: 0
          },
          enableNow: this.enableSatelligeSeries
  
          }
          console.log("bodyData    :",  bodyData);
          this.PokergamesService.setPokerTournamentSeries(bodyData).subscribe((data) => {

            console.log(data);
            console.log(data.changedObjectList);
            
            if (data.changedObjectList) {
              this.subscribeResult=true;
              console.log(data.changedObjectList);
              // alert("successFullayCreated")
              // this.CreateSuccessPop = true;
              if(this.activatedIndexSatelitteserivesData == null){
                this.successPopupText="Successfully Created"
                console.log("Successfully Created")
              }else{
                this.successPopupText="Successfully Edited"
              }
             
              }else if(data.error){
                this.subscribeResult=true;
                this.successPopupText = "Invalid Input Data"
              }
              this.numberInSeriesTourney=0;
              this.createdPayload=[];
              this.linksData=[];
          },
            error => {
              this.subscribeResult=true;
              this.successPopupText="Technical Error"
              console.log(error);

              this.numberInSeriesTourney=0;
              this.createdPayload=[];
              this.linksData=[];
            }

           
      
          )

      }
      


      }

      
   

    }


  }











