import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, AfterContentChecked,  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { ToolsService } from 'src/app/source/Tools.service';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { Router } from '@angular/router';
import { CreatePokerSatelliteSeriesService } from 'src/app/source/create-poker-satellite-series.service';
@Component({
  selector: 'app-create-poker-sitn-go',
  templateUrl: './create-poker-sitn-go.component.html',
  styleUrls: ['./create-poker-sitn-go.component.css']
})
export class CreatePokerSitnGoComponent implements OnInit, AfterViewInit, AfterContentChecked  {
  @Input() EditSitnGoData: any = null;
  @Input() createSitngoPopup: boolean = false;
  @Input() editOptionMode: boolean = false;
  @Input() onlyViewpopFromParent: boolean = false;
  @Input() selectedViewItemViewOnly: any = null;
  @Input() selectedLanguageGuid: any = null;

  @Output() exitSatellitePopup = new EventEmitter();
  @Output() filterbodyData = new EventEmitter();
  @Output() tournamentGameType = new EventEmitter();
  @Output() sendPayoutData = new EventEmitter();
  @Output() satellitePrevButton = new EventEmitter();
  @Output() satelliteNxtButton = new EventEmitter();
  @Output() closePopup = new EventEmitter();


  tabName: string = "First";
  CreatePokerSitnGoForm: FormGroup;
  myRadio = false
  UserAccessRulesResData: any = [];
  UserAccessAreaList: any;
  usertypeList: any;
  accessAreas: any = []
  ChatAccessibilityList: any;
  wallettypelist: any;
  currencyList: any = [];
  GamesConfigList: any;
  onlyPokerGames: any = [];
  uniquegamescaption: any;
  selectedCurrency: any;
  selectedTable: any = [];
  Onlygamescaption: any = [];
  PayoutStructureList: any;
  pokerPayoutStructureRes: any;
  ResultNotificationTypeList: any;
  TemplateCreationTypesList: any;
  getMailTemplatesResData: any = [];
  pokerBlindStructureResData: any = [];
  PeriodTypesList: any;
  Rebuycheck: boolean = false;
  isDisabled: boolean = true;
  RegistrantionSettings: boolean = false;
  startDate: any;
  currentD = new Date();
  time: any;
  SeletedPeriodTypes: any = [];
  SeletedTimePeriods: any = [];
  selectedTimeBreak: any = [];
  isChecked: string = "OnlyOnce";
  MonthsList: any;
  TypeDayOfMonthList: any;
  LateRegistrationTypeList: any = [];
  TourneySynchroModeTypeList: any;
  TourneyTypeList: any;
  totalCostValue: number = 0;
  KnockoutBountyCheck: any;
  FreerollCheck: any;
  ChipsCheck: any;
  CompPointsCheck: any;
  TournamentMoneyCheck: any;
  TicketsCheck: any;
  synchroModeType: any;
  ShareTypeList: any;
  defaultSelectedOption: any;
  ChatAccessvalue: any;
  UserAccessValue: any;
  pokerPayoutValue: any;
  ResultNotificationValue: any;
  getMailTemplateValue: any;
  NotifyCheckboxOption: boolean = true;
  checkedStatus: any = false;
  walletFormats: any = []
  chip: any = "";
  freeRollCheckBoxStatus: any = false;
  brandedURl: any = false;
  freeRollCheckBoxStatus2: any = false;
  placesVarible: boolean = false;
  selectedIndex: any = 0;
  viewPayOutTablePopup: boolean = false;
  selectedViewItem: any;
  OnlyFloatPayoutTables: any = [];
  defaultTournamentMoneyCheck: any;
  BlindStructureshow: boolean = false;
  selectedBlindStructureView: any;
  selectedBlindStructureIndex: any = 0;
  defaultBlindStuctureOption: any;
  rebuysCheckbox: boolean = false;
  LateRegistrationclass: boolean = false;
  PauseTournamentClass: boolean = false;
  defaultlateRegistationChange: any = "Level";
  counterValue: number = 0;
  prevButtonCss: boolean = false;
  nextButtonCss: boolean = true;
  BreakLengthMinTypeDefaultOption: any;
  AnnouncePeriodDefaultValue: any;
  RegistrantionPeriodDefaultValue: any;
  CompletedPeriodDefaultValue: any;
  SeatingPeriodDefaultValue: any;
  onlyOnceHeading: string = "";
  onlyOnceTextString: string = "";
  StartDateTime: any;
  onlyOnceTextCss: boolean = false;
  modifiedDateSub: any;
  AnnouncePeriodHeading: string = "";
  AnnouncePeriodTextCss: boolean = false;
  AnnounceTextString: string = "";
  registrationPeriodTextCss: boolean = false;
  registrationPeriodHeading: string = "";
  registrationPeriodText: string = "";
  SeatingPeriodText: string = "";
  SeatingPeriodTextCss: boolean = false;
  HourlyStartedHeadingText: string = "";
  HourlyPopupDefault: boolean = false;
  SelectedDaysInDailyButtonRadioCss: boolean = true;
  selectedNewCurrency: any;
  tournamentErrorTextBoolValue: boolean = false;
  tournamentErrorTextPopup: string = "";
  CreateSuccessPop: boolean = false;
  ErrorPopup: boolean = false;
  currencyPlaymoney: boolean = false;
  maxPlayersTitle: string = "Max players limits number of players that can register in sit'n' Go Late Registration period.You should turn on Late Registration to change this value."
  LateRegistrationTypeListGuid: any = {};
  PayoutButton: boolean = false;
  BlindStructurButton: boolean = false;
  SuccessMsG: any;
  finalCaption: any = [];
  breaklengthcal: any;
  PayoutTicketTypeList: any=[];
  ticketTypes: any=[];
 


  constructor(private SatelliteSeriesService:CreatePokerSatelliteSeriesService,private router: Router, private CommomfilterService: CommomfilterService, private PokergamesService: PokergamesService, private PlayerServiceService: PlayerServiceService, private ToolsService: ToolsService) {

    this.CreatePokerSitnGoForm = new FormGroup({
      // MoneyType: new FormControl("", [Validators.required,]),
      Name: new FormControl(""),
      Description: new FormControl("",),
      Password: new FormControl("",),
      GameType: new FormControl("", [Validators.required,]),
      Seats: new FormControl(2,[Validators.required, Validators.max(2)]),
      MinPlayers: new FormControl(10 ,[Validators.required, Validators.max(5)]),
      MaxPlayers: new FormControl(0 ,[Validators.required, Validators.max(5)]),
      ChipsperPlayer: new FormControl(2000),
      ChatAccesability: new FormControl(""),
      AccessRuleName: new FormControl("",),
      EnableNow: new FormControl(true,),
      Currency: new FormControl(),
      GuaranteedPrize: new FormControl(0),
      EqualPrize: new FormControl(false),
      StackBased: new FormControl(false),
      ICM: new FormControl(false),
      ManualPoolPrize: new FormControl(false),
      PayoutTable: new FormControl(),
      NotifyPlayers: new FormControl(false),
      NotifyPlayersType: new FormControl(),
      NotifyPlayersPlaces: new FormControl(0),
      usingtemplate: new FormControl(),
      Freeroll: new FormControl(false),
      Chips: new FormControl(true),
      CompPoints: new FormControl(false),
      brandedTournament: new FormControl(false),
      TournamentMoney: new FormControl(false),
      Tickets: new FormControl(false),
      BrandedURl: new FormControl(),
      BuyIn: new FormControl(0),
      Fee: new FormControl(0),
      MarketingFee: new FormControl(0),
      ProgressiveKnockoutCheck: new FormControl(false),
      KnockoutPercentage: new FormControl(),
      KnockoutBountyCheck: new FormControl(false),
      KnockoutBounty: new FormControl(0),
      totalCost: new FormControl(),
      LevelLengthmin: new FormControl(8),
      LevelsbeforeBreak: new FormControl(7),
      BreakLengthMin: new FormControl(5),
      LevelsLengthAfterAddonBreak: new FormControl(),
      BreakLengthMinType: new FormControl(),
      BlindStructure: new FormControl(""),
      SynchronizedBreak: new FormControl(false),
      PauseTournament: new FormControl(false),
      MessagetoPlayers: new FormControl(""),
      ActionTimeout: new FormControl(30),
      TimeBank: new FormControl(60),
      TimeBankAutoincrementAmount: new FormControl(10),
      BubbleFinalTable: new FormControl(),
      AnyChangesinPrize: new FormControl(false),

      Rebuys: new FormControl(false),
      RebuyCost: new FormControl(0),
      RebuyAmount: new FormControl(0),
      RebuyFee: new FormControl(),
      MarketingFeeRebuy: new FormControl(),
      MaxRebuysperPlayer: new FormControl(0, [Validators.required, Validators.maxLength(2)]),
      AddonCost: new FormControl(),
      AddonAmount: new FormControl(),
      AddonFee: new FormControl(),
      MarketingFeeAddon: new FormControl(),

      LateRegistrantion: new FormControl(false),
      LateRegistrantionRadio: new FormControl(""),
      LateRegistrantionLevel: new FormControl(),


      // StartTime: new FormControl((new Date()).toISOString().substring(0,10)),
      StartDate: new FormControl((new Date().toDateString())),
      // StartTime: new FormControl((new Date()).toISOString().substring(11 , 16)),
      StartTime: new FormControl((new Date()).toISOString().substring(11, 16)),
      Schedule: new FormControl(),
      Yearly: new FormControl(),


      AnnouncePeriodValue: new FormControl(1),
      // AnnouncePeriodType: new FormControl([this.AnnouncePeriodDefaultValue]),
      AnnouncePeriodType: new FormControl(),
      RegistrantionPeriodValue: new FormControl(6),
      RegistrantionPeriodType: new FormControl(),
      CompletedPeriodValue: new FormControl(3),
      CompletedPeriodType: new FormControl(),
      SeatingPeriodValue: new FormControl(1),
      SeatingPeriodType: new FormControl("Seconds"),
      HourlyStartTime: new FormControl(0),
      HourlyStartMinute: new FormControl(0),
      DailyButtonRadio: new FormControl("Every"),
      SelectedDaysInDailyButtonRadio: new FormControl(1),

      WeeklyMonday: new FormControl("checked"),
      WeeklyTuesday: new FormControl("checked"),
      WeeklyWednesday: new FormControl("checked"),
      WeeklyThursday: new FormControl("checked"),
      WeeklyFriday: new FormControl("checked"),
      WeeklySaturday: new FormControl("checked"),
      WeeklySunday: new FormControl("checked"),
      MonthlyButtonRadio: new FormControl("Days"),
      MonthlySelectedInputDays: new FormControl(1),
      SelectedMonth0: new FormControl("checked"),
      SelectedMonth: new FormControl("checked"),
      SelectedMonth2: new FormControl("checked"),
      SelectedMonth3: new FormControl("checked"),
      SelectedMonth4: new FormControl("checked"),
      SelectedMonth5: new FormControl("checked"),
      SelectedMonth6: new FormControl("checked"),
      SelectedMonth7: new FormControl("checked"),
      SelectedMonth8: new FormControl("checked"),
      SelectedMonth9: new FormControl("checked"),
      SelectedMonth10: new FormControl("checked"),
      SelectedMonth11: new FormControl("checked"),
      MonthlyButtonSelectedWeek: new FormControl("first"),
      MonthlyButtonSelectedWeekDay: new FormControl("Monday")


    })
  }


  
  ngAfterContentChecked(): void {
    if (this.EditSitnGoData) {
      if(this.onlyViewpopFromParent === true){
        this.CreatePokerSitnGoForm.disable();
        // this.CreatePokerSitnGoForm.get("BlindStructure")?.disable();
        // this.CreatePokerSitnGoForm.get("PayoutTable")?.disable();
        if(this.selectedViewItemViewOnly !=null){
          this.selectedViewItem = this.selectedViewItemViewOnly;
        }
      }
      console.log(this.pokerBlindStructureResData)

      for (const each of this.pokerBlindStructureResData) {
        // BlindStructure: this.EditSitnGoData?.blindId,
        if (each.guid.lowLong == this.EditSitnGoData?.blindId?.lowLong && each.guid.hiLong == this.EditSitnGoData?.blindId?.hiLong) {
          console.log(each)
          this.defaultBlindStuctureOption = each.guid
          break
        }
      }
      console.log(this.UserAccessRulesResData)
      for (const each of this.UserAccessRulesResData) {
        if (each.guid.lowLong == this.EditSitnGoData?.accessRule?.lowLong && each.guid.hiLong == this.EditSitnGoData?.accessRule?.hiLong)
          this.UserAccessValue = each?.guid;
        break;
      }
      console.log(this.UserAccessValue)
      for (const each of this.OnlyFloatPayoutTables) {
        if (each.guid.lowLong == this.EditSitnGoData?.payoutId?.lowLong && each.guid.hiLong == this.EditSitnGoData?.payoutId?.hiLong) {
          this.pokerPayoutValue = each.guid;
          this.ViewPayoutTable();
        }
        // console.log(this.pokerPayoutValue)
      }
      console.log(this.getMailTemplatesResData)
      // if (this.EditSitnGoData?.getMailTemplatesResData) {
      if (this.EditSitnGoData?.resultNotificationTemplateId) {
        for (const each of this.getMailTemplatesResData) {
          console.log(each.guid.lowLong == this.EditSitnGoData?.resultNotificationTemplateId?.lowLong && each.guid.hiLong == this.EditSitnGoData?.resultNotificationTemplateId?.hiLong)
          if (each.guid.lowLong == this.EditSitnGoData?.resultNotificationTemplateId?.lowLong && each.guid.hiLong == this.EditSitnGoData?.resultNotificationTemplateId?.hiLong) {

            this.getMailTemplateValue = each.guid
          }
        }
        console.log(this.getMailTemplateValue)
      }
      // }
    }

   

   
  }
  


  ngAfterViewInit(): void {
    if (this.createSitngoPopup) {
      this.CreatePokerSitnGoForm.patchValue({
        Tickets:true
      })
    }
    
    for(let i=0; i< this.currencyList.length; i++){
      if(this.currencyList[i]?.currency?.hiLong == this.selectedLanguageGuid?.hiLong &&
        this.currencyList[i]?.currency?.lowLong == this.selectedLanguageGuid?.lowLong){
        this.selectedCurrency = this.currencyList[i]?.guid;
        setTimeout(()=>{
          this.SelectedChip();
          this.onSelected()

        },1000);
        break;
      }

    }
   



    

    console.log(this.EditSitnGoData)
    if (this.EditSitnGoData != null) {
      // console.log(this.EditSitnGoData?.pot.wallet);
      this.CreatePokerSitnGoForm.patchValue({
        // MoneyType: this.EditSitnGoData?.pot.wallet,
        // GameType: this.EditSitnGoData?.gameName,

      })




      // for (let each of this.ChatAccessList) {
      //   if (each.value == this.EditSitnGoData?.chatAccessibility) {
      //     this.firstInputValue = each.guid

      //   }
      // }

     console.log(this.selectedTimeBreak)
      for (let i = 0; this.selectedTimeBreak.length; i++) {
        if (this.EditSitnGoData?.breakLength < 3600000 &&this.EditSitnGoData?.breakLength < 3600000) {
         
          this.breaklengthcal = this.EditSitnGoData?.breakLength / 60000
          if (this.selectedTimeBreak[i]?.value === "Minutes") {
            this.BreakLengthMinTypeDefaultOption = this.selectedTimeBreak[i]?.value;
            break
          }
        }

        else if (this.EditSitnGoData?.breakLength >= 3600000 &&this.EditSitnGoData?.breakLength < 86400000) {
         
          this.breaklengthcal = this.EditSitnGoData?.breakLength / 3600000;
          if (this.selectedTimeBreak[i]?.value === "Hours") {
            this.BreakLengthMinTypeDefaultOption = this.selectedTimeBreak[i]?.value;
            break
          }

        } else if (this.EditSitnGoData?.breakLength >= 86400000) {

          this.breaklengthcal = this.EditSitnGoData?.breakLength / 86400000;
          if (this.selectedTimeBreak[i]?.value === "Days") {
            this.BreakLengthMinTypeDefaultOption = this.selectedTimeBreak[i]?.value;
            break
          }

        }
      }
      console.log(this.breaklengthcal)
    
      this.CreatePokerSitnGoForm.patchValue({
        // MoneyType: this.EditSitnGoData?.pot.wallet,
        Name: this.EditSitnGoData?.caption,
        Description: this.EditSitnGoData?.description,
        Password: this.EditSitnGoData?.password,

        Seats: this.EditSitnGoData?.seats,
        MinPlayers: this.EditSitnGoData?.minPlayers,
        MaxPlayers: this.EditSitnGoData?.maxPlayers,
        ChipsperPlayer: this.EditSitnGoData?.chipsPerPlayer?.value,

        GameType: this.EditSitnGoData?.gameName,
        TableGroupName: this.EditSitnGoData?.name,

        EnableNow: this.EditSitnGoData?.enableNow,
        GuaranteedPrize: this.EditSitnGoData?.guarantedPrize?.value,
        ManualPoolPrize: this.EditSitnGoData?.manualPrizePoolTourney,
        EqualPrize: this.EditSitnGoData?.tournamentManualDistributionV2Equal,
        StackBased: this.EditSitnGoData?.tournamentManualDistributionV2Stack,
        ICM: this.EditSitnGoData?.icmBasedDistribution,

        Chips: this.EditSitnGoData?.allowCash,
        CompPoints: this.EditSitnGoData?.allowCompPoints,
        brandedTournament: this.EditSitnGoData?.brandedTourney,
        TournamentMoney: this.EditSitnGoData?.allowTournamentMoney,
        Tickets: this.EditSitnGoData?.allowTournamentTickets,

        BrandedURl: this.EditSitnGoData?.brandedTourneyImage,
        BuyIn: this.EditSitnGoData?.buyIn?.value,
        Fee: this.EditSitnGoData?.fee?.value,
        MarketingFee: (this.EditSitnGoData?.maintenanceFee?.value != null && this.EditSitnGoData?.maintenanceFee?.value != "" ) ? this.EditSitnGoData?.maintenanceFee?.value:0 ,
        KnockoutBounty: this.EditSitnGoData?.knockoutBounty?.value,
        ProgressiveKnockoutCheck: this.EditSitnGoData?.progressiveKnockOutTournaments,
        KnockoutPercentage: this.EditSitnGoData?.progressiveKnockOutTournamentPercentage,
        LevelLengthmin: this.EditSitnGoData?.levelLength / 60000,
        LevelsbeforeBreak: this.EditSitnGoData?.levelsBeforeBreak,
        // LevelsLengthAfterAddonBreak: this.EditSitnGoData?.breakTimeAfterAddon / 60000,
        LevelsLengthAfterAddonBreak: this.EditSitnGoData?.breakTimeAfterAddon,
        // BreakLengthMin: +(this.EditSitnGoData?.breakLength) / 60000,
        BreakLengthMin: this.breaklengthcal,
        // BlindStructure: this.EditSitnGoData?.blindId,
        SynchronizedBreak: this.EditSitnGoData?.synchronizedTourney,
        PauseTournament: this.EditSitnGoData?.pauseOnFinalTable,
        MessagetoPlayers: this.EditSitnGoData?.descriptionForPauseOnFinalTable,

        ActionTimeout: this.EditSitnGoData?.actionTimeOut / 1000,
        TimeBank: this.EditSitnGoData?.playerTimeBank / 1000,
        TimeBankAutoincrementAmount: this.EditSitnGoData?.additionalTimeBank / 1000,


        RebuyCost: this.EditSitnGoData?.rebuyCost?.value,
        RebuyFee: 0,
        MarketingFeeRebuy: this.EditSitnGoData?.maintenanceFeesRebuy?.value,
        RebuyAmount: this.EditSitnGoData?.rebuyChips?.value,
        MaxRebuysperPlayer: this.EditSitnGoData?.rebuyCount,
        AddonCost: this.EditSitnGoData?.addonCost?.value,
        AddonFee: this.EditSitnGoData?.additionalTimeBank?.value,
        MarketingFeeAddon: this.EditSitnGoData?.maintenanceFeesAddOn?.value,
        AddonAmount: this.EditSitnGoData?.addonChips?.value,

      })
      console.log(this.ChatAccessibilityList)
      console.log(this.EditSitnGoData?.chatAccessibility)
      this.totalCostValue = this.EditSitnGoData?.totalCost?.value
      if (this.EditSitnGoData?.rebuyCost?.value > 0 || this.EditSitnGoData?.maintenanceFeesRebuy?.value > 0 || this.EditSitnGoData?.rebuyChips?.value > 0
        || this.EditSitnGoData?.rebuyCount > 0 || this.EditSitnGoData?.addonCost?.value > 0 || this.EditSitnGoData?.additionalTimeBank?.value > 0 || this.EditSitnGoData?.maintenanceFeesAddOn?.value > 0
        || this.EditSitnGoData?.addonChips?.value > 0) {
        // this.CreatePokerSitnGoForm.value.Rebuys=true;
        this.CreatePokerSitnGoForm.patchValue({
          Rebuys: true
        })
      }
      if (this.EditSitnGoData?.knockoutBounty?.value > 0) {
        this.CreatePokerSitnGoForm.get("KnockoutBountyCheck")?.enable();
        this.CreatePokerSitnGoForm.patchValue({
          KnockoutBountyCheck:true
        })
      }else{
        this.CreatePokerSitnGoForm.patchValue({
          KnockoutBountyCheck:true
        })

      }
      console.log(this.Onlygamescaption)
      for (const each of this.Onlygamescaption) {
        if (each === this.EditSitnGoData?.gameName) {
          this.defaultSelectedOption = each
        }
      }
      console.log(this.defaultSelectedOption)
      if (this.editOptionMode) {
        this.CreatePokerSitnGoForm.get("GameType")?.enable();
        this.CreatePokerSitnGoForm.get("Currency")?.enable();
      } else {
        this.CreatePokerSitnGoForm.get("GameType")?.disable();
        this.CreatePokerSitnGoForm.get("Currency")?.disable();
      }

      for (const each of this.ChatAccessibilityList) {
        if (each.guid.lowLong == this.EditSitnGoData?.chatAccessibility?.lowLong && each.guid.hiLong == this.EditSitnGoData?.chatAccessibility?.hiLong) {
          this.ChatAccessvalue = each.guid;
          break;
        }
      }
      console.log(this.ChatAccessvalue)

      console.log(this.currencyList)

      for (const each of this.currencyList) {
        console.log(each.guid.lowLong == this.EditSitnGoData?.addonCost?.wallet?.lowLong && each.guid.hiLong == this.EditSitnGoData?.addonCost?.wallet?.hiLong)
        // if (each.guid.lowLong == this.EditSitnGoData?.addonCost?.wallet?.lowLong && each.guid.hiLong == this.EditSitnGoData?.addonCost?.wallet?.hiLong) {
        if (each.guid.lowLong == this.EditSitnGoData?.totalCost?.wallet?.lowLong && each.guid.hiLong == this.EditSitnGoData?.totalCost?.wallet?.hiLong) {
          this.selectedCurrency = each.guid;
          break;
        }
      }
      console.log(this.selectedCurrency)
      this.SelectedChip();

      console.log(this.ResultNotificationTypeList)
      for (const each of this.ResultNotificationTypeList) {
        if (each.guid.lowLong == this.EditSitnGoData?.resultNotificationType?.lowLong && each.guid.hiLong == this.EditSitnGoData?.resultNotificationType?.lowLong) {
          this.ResultNotificationValue = each.guid
          this.CreatePokerSitnGoForm.get("NotifyPlayersType")?.enable();
          this.CreatePokerSitnGoForm.get("usingtemplate")?.enable();
          this.CreatePokerSitnGoForm.get("NotifyPlayersPlaces")?.enable();
          this.CreatePokerSitnGoForm.patchValue({
            NotifyPlayers: true
          })
          this.CreatePokerSitnGoForm.value.NotifyPlayers = true;
          this.CreatePokerSitnGoForm.value.NotifyPlayersPlaces = this.EditSitnGoData?.resultNotificationPlaces;

        } else {
          this.CreatePokerSitnGoForm.get("NotifyPlayersType")?.disable();
          this.CreatePokerSitnGoForm.get("usingtemplate")?.disable();
          this.CreatePokerSitnGoForm.get("NotifyPlayersPlaces")?.disable();
          this.CreatePokerSitnGoForm.patchValue({
            NotifyPlayers: false
          })
        }
      }
      console.log(this.ResultNotificationValue)


      console.log(this.TourneySynchroModeTypeList)
      for (const each of this.TourneySynchroModeTypeList) {
        if (each.guid.lowLong == this.EditSitnGoData?.synchroModeType?.lowLong && each.guid.hiLong == this.EditSitnGoData?.synchroModeType?.hiLong) {
          this.defaultTournamentMoneyCheck = each.guid
        }
      }
      console.log(this.defaultTournamentMoneyCheck)

      console.log(this.pokerBlindStructureResData)
      for (const each of this.pokerBlindStructureResData) {
        // BlindStructure: this.EditSitnGoData?.blindId,
        if (each.guid.lowLong == this.EditSitnGoData?.blindId?.lowLong && each.guid.hiLong == this.EditSitnGoData?.blindId?.hiLong) {
          console.log(each)
          break
        }
      }
      console.log(this.LateRegistrationTypeList)
      for (const each of this.LateRegistrationTypeList) {
        console.log(each.guid.lowLong == this.EditSitnGoData?.lateRegistrationType?.lowLong && each.guid.hiLong == this.EditSitnGoData?.lateRegistrationType?.hiLong)
        if (each.guid.lowLong == this.EditSitnGoData?.lateRegistrationType?.lowLong && each.guid.hiLong == this.EditSitnGoData?.lateRegistrationType?.hiLong) {
          if (each.value === "None") {
            this.CreatePokerSitnGoForm.patchValue({
              LateRegistrantion: false,
            })
            this.defaultlateRegistationChange = this.LateRegistrationTypeList[1].value;
          } else {
            this.CreatePokerSitnGoForm.patchValue({
              LateRegistrantion: true,
            })
            this.defaultlateRegistationChange = each.value;
          }
          break
        }
      }
      console.log(this.defaultTournamentMoneyCheck)
      console.log(this.defaultlateRegistationChange)
    }

  }

  
  SelectedChip() {
    for (let i = 0; i < this.walletFormats.length; i++) {
      if (this.walletFormats[i].guid.hiLong == this.selectedCurrency.hiLong && this.walletFormats[i].guid.lowLong == this.selectedCurrency.lowLong) {
        console.log(this.walletFormats[i]);
        if (this.walletFormats[i].currencyCode) {
          this.chip = this.walletFormats[i].currencyCode
        } else {
          for (let j = 0; this.currencyList.length; j++) {
            console.log(this.currencyList[j].guid.hiLong, this.currencyList[j].guid.lowLong)
            if (this.currencyList[j].guid.hiLong == this.selectedCurrency.hiLong && this.currencyList[j].guid.lowLong == this.selectedCurrency.lowLong) {
              this.chip = this.currencyList[j].description
              break
            }

          }

        }
      }
    }
  }
  ngOnInit(): void {
    this.GamesConfig();
    this.walletTypes();
    this.DYIDCHATACCESSIBILITY();
    this.UserAccessArea();
    this.usertype();
    this.TournamentResultNotificationType();
    this.TemplateCreationTypes();
    this.TourneySynchroModeType();
    this.TourneyType();
    this.UserAccessRules();
    this.pokerPayoutStructureList();
    this.mailTempletes();
    this.PayoutStructure();
    this.PayoutTicketType();
    this.BlindStructure();
    this.PeriodTypes();
    this.LateRegistrationType()
    this.placesVarible = false;

    console.log(this.CreatePokerSitnGoForm.value.NotifyPlayers)
    if (!this.CreatePokerSitnGoForm.value.NotifyPlayers) {
      this.CreatePokerSitnGoForm.get("NotifyPlayersType")?.disable();
      this.CreatePokerSitnGoForm.get("usingtemplate")?.disable();
      this.CreatePokerSitnGoForm.get("NotifyPlayersPlaces")?.disable();

    } else {
      this.CreatePokerSitnGoForm.get("NotifyPlayersType")?.enable();
      this.CreatePokerSitnGoForm.get("usingtemplate")?.enable();
      this.CreatePokerSitnGoForm.get("NotifyPlayersPlaces")?.enable();

    }
    this.CreatePokerSitnGoForm.get("NotifyPlayers")?.valueChanges.subscribe((checked) => {
      if (!checked) {
        // this.CreatePokerSitnGoForm.controls["NotifyPlayersType"]?.disable();
        this.CreatePokerSitnGoForm.get("NotifyPlayersType")?.disable();
        this.CreatePokerSitnGoForm.get("usingtemplate")?.disable();
        this.CreatePokerSitnGoForm.get("NotifyPlayersPlaces")?.disable();

      } else {
        this.CreatePokerSitnGoForm.get("NotifyPlayersType")?.enable();
        this.CreatePokerSitnGoForm.get("usingtemplate")?.enable();
        this.CreatePokerSitnGoForm.get("NotifyPlayersPlaces")?.enable();

      }
    });


    if (this.CreatePokerSitnGoForm.value.LateRegistrantion) {
      this.CreatePokerSitnGoForm.get("MaxPlayers")?.enable();
    } else {
      // this.CreatePokerSitnGoForm.get("MaxPlayers")?.disable();
    }

    this.CreatePokerSitnGoForm.get("LateRegistrantion")?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.CreatePokerSitnGoForm.get("MaxPlayers")?.enable();
      } else {
        // this.CreatePokerSitnGoForm.get("MaxPlayers")?.disable()
      }

    })


    if (this.CreatePokerSitnGoForm.value.Freeroll) {
      this.freeRollCheckBoxStatus = true;
      this.freeRollCheckBoxStatus2 = false;
      this.CreatePokerSitnGoForm.get("BuyIn")?.disable();
      this.CreatePokerSitnGoForm.get("Fee")?.disable();
      this.CreatePokerSitnGoForm.get("MarketingFee")?.disable();
      this.CreatePokerSitnGoForm.get("KnockoutBountyCheck")?.disable();
      this.CreatePokerSitnGoForm.get("KnockoutBounty")?.disable();
      this.CreatePokerSitnGoForm.get("ProgressiveKnockoutCheck")?.disable();
      this.CreatePokerSitnGoForm.get("KnockoutPercentage")?.disable();

    } else {
      this.freeRollCheckBoxStatus = false;
      this.CreatePokerSitnGoForm.get("BuyIn")?.enable();
      this.CreatePokerSitnGoForm.get("Fee")?.enable();
      this.CreatePokerSitnGoForm.get("MarketingFee")?.enable();
      this.CreatePokerSitnGoForm.get("KnockoutBountyCheck")?.enable();
      this.CreatePokerSitnGoForm.get("KnockoutBounty")?.enable();
      this.CreatePokerSitnGoForm.get("ProgressiveKnockoutCheck")?.enable();
      this.CreatePokerSitnGoForm.get("KnockoutPercentage")?.enable();

    }

    this.CreatePokerSitnGoForm.get("Freeroll")?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.freeRollCheckBoxStatus = true;
        this.freeRollCheckBoxStatus2 = false;
        this.CreatePokerSitnGoForm.get("BuyIn")?.disable();
        this.CreatePokerSitnGoForm.get("Fee")?.disable();
        this.CreatePokerSitnGoForm.get("MarketingFee")?.disable();
        this.CreatePokerSitnGoForm.get("KnockoutBountyCheck")?.disable();
        this.CreatePokerSitnGoForm.get("KnockoutBounty")?.disable();
        this.CreatePokerSitnGoForm.get("ProgressiveKnockoutCheck")?.disable();
        this.CreatePokerSitnGoForm.get("KnockoutPercentage")?.disable();

      } else {
        this.freeRollCheckBoxStatus = false;
        this.CreatePokerSitnGoForm.get("BuyIn")?.enable();
        this.CreatePokerSitnGoForm.get("Fee")?.enable();
        this.CreatePokerSitnGoForm.get("MarketingFee")?.enable();
        this.CreatePokerSitnGoForm.get("KnockoutBountyCheck")?.enable();
        // this.CreatePokerSitnGoForm.get("KnockoutBounty")?.enable();
        this.CreatePokerSitnGoForm.get("ProgressiveKnockoutCheck")?.enable();
        this.CreatePokerSitnGoForm.get("KnockoutPercentage")?.enable();

      }

    })




    if (this.CreatePokerSitnGoForm.value.brandedTournament) {
      this.brandedURl = true;
      this.CreatePokerSitnGoForm.get("BrandedURl")?.enable();

    } else {
      this.brandedURl = false;
      this.CreatePokerSitnGoForm.get("BrandedURl")?.disable();

    }

    this.CreatePokerSitnGoForm.get("brandedTournament")?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.brandedURl = true;
        this.CreatePokerSitnGoForm.get("BrandedURl")?.enable();
      } else {
        this.brandedURl = false;
        this.CreatePokerSitnGoForm.get("BrandedURl")?.disable();
      }

    })



    if (!this.CreatePokerSitnGoForm.value.KnockoutBountyCheck) {
      this.freeRollCheckBoxStatus2 = false;
      this.CreatePokerSitnGoForm.get("KnockoutBounty")?.disable();
    } else {
      this.freeRollCheckBoxStatus2 = true;
      this.CreatePokerSitnGoForm.get("KnockoutBounty")?.enable();
    }

    this.CreatePokerSitnGoForm.get("KnockoutBountyCheck")?.valueChanges.subscribe((checked) => {
      if (!checked) {
        this.freeRollCheckBoxStatus2 = false;
        this.CreatePokerSitnGoForm.get("KnockoutBounty")?.disable();
      } else {
        this.freeRollCheckBoxStatus2 = true;
        this.CreatePokerSitnGoForm.get("KnockoutBounty")?.enable();
      }
    })


    if (this.CreatePokerSitnGoForm.value.Rebuys) {
      this.rebuysCheckbox = true;
      this.CreatePokerSitnGoForm.get("RebuyCost")?.enable();
      this.CreatePokerSitnGoForm.get("RebuyFee")?.enable();
      this.CreatePokerSitnGoForm.get("AddonFee")?.enable();
      this.CreatePokerSitnGoForm.get("RebuyAmount")?.enable();
      this.CreatePokerSitnGoForm.get("MaxRebuysperPlayer")?.enable();
      this.CreatePokerSitnGoForm.get("AddonCost")?.enable();
      this.CreatePokerSitnGoForm.get("AddonAmount")?.enable();
      this.CreatePokerSitnGoForm.get("MarketingFeeRebuy")?.enable();
      this.CreatePokerSitnGoForm.get("MarketingFeeAddon")?.enable();
    } else {
      this.rebuysCheckbox = false;
      this.CreatePokerSitnGoForm.get("RebuyCost")?.disable();
      this.CreatePokerSitnGoForm.get("RebuyFee")?.disable();
      this.CreatePokerSitnGoForm.get("AddonFee")?.disable();
      this.CreatePokerSitnGoForm.get("RebuyAmount")?.disable();
      this.CreatePokerSitnGoForm.get("MaxRebuysperPlayer")?.disable();
      this.CreatePokerSitnGoForm.get("AddonCost")?.disable();
      this.CreatePokerSitnGoForm.get("AddonAmount")?.disable();
      this.CreatePokerSitnGoForm.get("MarketingFeeRebuy")?.disable();
      this.CreatePokerSitnGoForm.get("MarketingFeeAddon")?.disable();
    }

    this.CreatePokerSitnGoForm.get("Rebuys")?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.rebuysCheckbox = true;
        this.CreatePokerSitnGoForm.get("RebuyCost")?.enable();
        this.CreatePokerSitnGoForm.get("RebuyFee")?.enable();
        this.CreatePokerSitnGoForm.get("AddonFee")?.enable();
        this.CreatePokerSitnGoForm.get("RebuyAmount")?.enable();
        this.CreatePokerSitnGoForm.get("MaxRebuysperPlayer")?.enable();
        this.CreatePokerSitnGoForm.get("AddonCost")?.enable();
        this.CreatePokerSitnGoForm.get("AddonAmount")?.enable();
        this.CreatePokerSitnGoForm.get("MarketingFeeRebuy")?.enable();
        this.CreatePokerSitnGoForm.get("MarketingFeeAddon")?.enable();

      } else {
        this.rebuysCheckbox = false;
        this.CreatePokerSitnGoForm.get("RebuyCost")?.disable();
        this.CreatePokerSitnGoForm.get("RebuyFee")?.disable();
        this.CreatePokerSitnGoForm.get("AddonFee")?.disable();
        this.CreatePokerSitnGoForm.get("RebuyAmount")?.disable();
        this.CreatePokerSitnGoForm.get("MaxRebuysperPlayer")?.disable();
        this.CreatePokerSitnGoForm.get("AddonCost")?.disable();
        this.CreatePokerSitnGoForm.get("AddonAmount")?.disable();
        this.CreatePokerSitnGoForm.get("MarketingFeeRebuy")?.disable();
        this.CreatePokerSitnGoForm.get("MarketingFeeAddon")?.disable();
      }
    })

    if (this.CreatePokerSitnGoForm.value.LateRegistrantion) {
      this.LateRegistrationclass = true
      this.CreatePokerSitnGoForm.get("LateRegistrantionRadio")?.enable();
      this.CreatePokerSitnGoForm.get("LateRegistrantionLevel")?.enable();

    } else {
      this.LateRegistrationclass = false
      this.CreatePokerSitnGoForm.get("LateRegistrantionRadio")?.disable();
      this.CreatePokerSitnGoForm.get("LateRegistrantionLevel")?.disable();

    }

    this.CreatePokerSitnGoForm.get("LateRegistrantion")?.valueChanges.subscribe((checked) => {
      console.log(this.CreatePokerSitnGoForm.value.LateRegistrantionLevel)
      console.log(checked)
      if (checked) {
        this.LateRegistrationclass = true
        this.CreatePokerSitnGoForm.get("LateRegistrantionRadio")?.enable();
        // this.CreatePokerSitnGoForm.get("LateRegistrantionLevel")?.enable(); LateRegistrantionLevel
        if (this.CreatePokerSitnGoForm.value.LateRegistrantionRadio == "Level") {
          this.CreatePokerSitnGoForm.get("LateRegistrantionLevel")?.enable();
        }

      } else {
        this.LateRegistrationclass = false
        this.CreatePokerSitnGoForm.get("LateRegistrantionRadio")?.disable();
        this.CreatePokerSitnGoForm.get("LateRegistrantionLevel")?.disable();

      }
    })



    if (this.CreatePokerSitnGoForm.value.PauseTournament) {
      this.PauseTournamentClass = true
      this.CreatePokerSitnGoForm.get("MessagetoPlayers")?.enable();
    } else {
      this.PauseTournamentClass = false;
      this.CreatePokerSitnGoForm.get("MessagetoPlayers")?.disable()
    }

    this.CreatePokerSitnGoForm.get("PauseTournament")?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.PauseTournamentClass = true;
        this.CreatePokerSitnGoForm.get("MessagetoPlayers")?.enable();
      } else {
        this.PauseTournamentClass = false;
        this.CreatePokerSitnGoForm.get("MessagetoPlayers")?.disable();
      }
    });


    if (this.CreatePokerSitnGoForm.value.DailyButtonRadio == "Every") {
      this.SelectedDaysInDailyButtonRadioCss = true
      this.CreatePokerSitnGoForm.get("SelectedDaysInDailyButtonRadio")?.enable();

    } else {
      this.SelectedDaysInDailyButtonRadioCss = false
      this.CreatePokerSitnGoForm.get("SelectedDaysInDailyButtonRadio")?.disable();
    }

    this.CreatePokerSitnGoForm.get("DailyButtonRadio")?.valueChanges.subscribe((checked) => {
      if (checked == "Every") {
        this.SelectedDaysInDailyButtonRadioCss = true
        this.CreatePokerSitnGoForm.get("SelectedDaysInDailyButtonRadio")?.enable();

      } else {
        this.SelectedDaysInDailyButtonRadioCss = false
        this.CreatePokerSitnGoForm.get("SelectedDaysInDailyButtonRadio")?.disable();
      }

    })

    this.SatelliteSeriesService.previousButton$.subscribe((prev) =>{
      this.prevButtonCss = prev
    });

    this.SatelliteSeriesService.nextsButton$.subscribe((next) => {
      this.nextButtonCss = next
    });

    // this.SatelliteSeriesService.saveButton$.subscribe((save) =>{
    //   this.saveButton = save
    // })

  }

  userNameValid(event: any) {
    this.CommomfilterService.inputNumbersOnlyValid(event);

  }

  PeriodTypes() {

    const PeriodTypes = localStorage.getItem("PeriodTypes");
    if (PeriodTypes) {
      this.PeriodTypesList = JSON.parse(PeriodTypes)
    }
    console.log("PeriodTypesList", this.PeriodTypesList)
    for (let i = 0; i < this.PeriodTypesList.length; i++) {
      if (this.PeriodTypesList[i].value == "Minutes" || this.PeriodTypesList[i].value == "Hours"
        || this.PeriodTypesList[i].value == "Days" || this.PeriodTypesList[i].value == "Weeks" ||
        this.PeriodTypesList[i].value == "Months") {
        this.SeletedPeriodTypes.push(this.PeriodTypesList[i]);
      }
      if (this.PeriodTypesList[i].value == "Seconds" || this.PeriodTypesList[i].value == "Minutes") {
        this.SeletedTimePeriods.push(this.PeriodTypesList[i])
      }

      if (this.PeriodTypesList[i].value == "Minutes" || this.PeriodTypesList[i].value == "Hours" || this.PeriodTypesList[i].value == "Days") {
        this.selectedTimeBreak.push(this.PeriodTypesList[i])
      }

      console.log(this.BreakLengthMinTypeDefaultOption)
      console.log(this.selectedTimeBreak)



    }
    this.BreakLengthMinTypeDefaultOption = this.selectedTimeBreak[0]?.value;

    this.AnnouncePeriodDefaultValue = this.SeletedPeriodTypes[2]?.guid


    // this.CreatePokerTouranamentForm.patchValue({
    //   AnnouncePeriodType:this.AnnouncePeriodDefaultValue
    // })

    this.RegistrantionPeriodDefaultValue = this.SeletedPeriodTypes[1].guid;

    this.CompletedPeriodDefaultValue = this.SeletedPeriodTypes[1].guid;

    this.SeatingPeriodDefaultValue = this.SeletedTimePeriods[1].guid;

    console.log("selectedTimeBreak ", this.selectedTimeBreak);
    console.log("SeletedPeriodTypes", this.SeletedPeriodTypes);
    console.log("SeletedTimePeriods", this.SeletedTimePeriods);
    console.log(this.startDate)
    console.log(this.time)
    console.log(this.currentD)


  }


  changeCheckBoxsUserActions(data: string) {
    console.log(data)
    if (data == "Equal") {
      this.CreatePokerSitnGoForm.patchValue({
        // EqualPrize: true,
        StackBased: false,
        ICM: false
      })
    } else if (data == 'Stack') {
      this.CreatePokerSitnGoForm.patchValue({
        EqualPrize: false,
        // StackBased: true,
        ICM: false
      })
    } else if (data == "ICM") {
      this.CreatePokerSitnGoForm.patchValue({
        EqualPrize: false,
        StackBased: false,
        // ICM: true
      })
    }

  }



  getTab(data: any) {
    console.log(data)
    this.tabName = data;
    if (data == "First") {
      this.prevButtonCss = false
      this.nextButtonCss = true
    } else {
      this.nextButtonCss = false
      this.prevButtonCss = true
    }

    this.satellitePrevButton.emit(this.prevButtonCss);
    this.satelliteNxtButton.emit(this.nextButtonCss);


  }
  // getTab(data: any) {
  //   console.log(data)
  //   this.tabName = data;
  // }
  Rebuy(data: any, id: any) {
    console.log(data)
    if (this.CreatePokerSitnGoForm.get('NotifyPlayersType')?.value.hiLong == 0 && this.CreatePokerSitnGoForm.get('NotifyPlayersType')?.value.lowLong == 2) {
      console.log("test")
      this.placesVarible = true
    } else {
      console.log("test02")
      this.placesVarible = false

    }



    console.log(data)
    console.log(id)
    if (id == "Rebuys") {
      this.Rebuycheck = this.CreatePokerSitnGoForm.value.Rebuys;
      console.log(this.Rebuycheck)
      this.isDisabled = this.Rebuycheck
    }
    if (id == "RegistrantionSettings") {
      this.RegistrantionSettings = this.CreatePokerSitnGoForm.value.LateRegistrantion

    }
  }

  lateRegistationChange(data: any) {
    console.log(data.target.value);
    if (data.target.value == "Level") {

      this.CreatePokerSitnGoForm.get("LateRegistrantionLevel")?.enable();

    } else {
      this.CreatePokerSitnGoForm.get("LateRegistrantionLevel")?.disable();

    }
  }

  totalCost(e: any, value: any) {
    console.log(e.target.value)
    console.log(value)
    if (this.CreatePokerSitnGoForm.value.KnockoutBountyCheck) {
      this.totalCostValue = parseInt(this.CreatePokerSitnGoForm.value.BuyIn) + parseInt(this.CreatePokerSitnGoForm.value.Fee) + parseInt(this.CreatePokerSitnGoForm.value.KnockoutBounty)+parseInt(this.CreatePokerSitnGoForm.value.MarketingFee);
      // this.totalCostValue = parseInt(this.CreatePokerSitnGoForm.value.BuyIn) + parseInt(this.CreatePokerSitnGoForm.value.Fee) + parseInt(this.CreatePokerSitnGoForm.value.KnockoutBounty);
    } else {
      this.totalCostValue = parseInt(this.CreatePokerSitnGoForm.value.BuyIn) + parseInt(this.CreatePokerSitnGoForm.value.Fee) +parseInt(this.CreatePokerSitnGoForm.value.MarketingFee)
      // this.totalCostValue = parseInt(this.CreatePokerSitnGoForm.value.BuyIn) + parseInt(this.CreatePokerSitnGoForm.value.Fee);
    }
    console.log("totalCostValue", this.totalCostValue)
  }

  KnockoutBounty(e: any) {
    console.log(e)
    console.log(e.target.value)
    console.log(this.CreatePokerSitnGoForm.value.KnockoutBountyCheck)
    this.KnockoutBountyCheck = this.CreatePokerSitnGoForm.value.KnockoutBountyCheck;
    if (this.KnockoutBountyCheck == true) {
      console.log("true")
    } else {
      console.log("False")
      this.CreatePokerSitnGoForm.patchValue({
        KnockoutBounty: parseInt("0")
      })
      this.totalCostValue = parseInt(this.CreatePokerSitnGoForm.value.BuyIn) + parseInt(this.CreatePokerSitnGoForm.value.Fee)+parseInt(this.CreatePokerSitnGoForm.value.MarketingFee)
      // this.totalCostValue = parseInt(this.CreatePokerSitnGoForm.value.BuyIn) + parseInt(this.CreatePokerSitnGoForm.value.Fee);
    }
  }
  BuyInSettings(data: any) {
    this.freeRollCheckBoxStatus = this.CreatePokerSitnGoForm.value.Freeroll;
    // this.freeRollCheckBoxStatus = data.target.checked;
    console.log(data)
    this.FreerollCheck = this.CreatePokerSitnGoForm.value.Freeroll;
    console.log(this.FreerollCheck);
    if (this.FreerollCheck === true) {
      this.CreatePokerSitnGoForm.patchValue({
        Chips: false,
        CompPoints: false,
        TournamentMoney: false,
        Tickets: false,
        BuyIn: 0,
        Fee: 0,
        KnockoutBounty: 0,
      })
      this.totalCostValue = 0
    }
    else {
      this.CreatePokerSitnGoForm.patchValue({
        Chips: true
      })
    }
  }


  showpopupBlindStructure() {
    this.BlindStructureshow = true;
    this.selectedBlindStructureIndex = this.pokerBlindStructureResData.findIndex((item: any) => {
      // return item.guid == this.CreatePokerSitnGoForm.value.BlindStructure;
      return item.guid == this.defaultBlindStuctureOption;
    });
    this.selectedBlindStructureView = this.pokerBlindStructureResData[this.selectedBlindStructureIndex]

    console.log(this.selectedBlindStructureIndex);
    console.log(this.pokerBlindStructureResData[this.selectedBlindStructureIndex])

  }


  BlindStructureclosepopup() {
    this.BlindStructureshow = false;
  }





  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].clubGameWallet == true) {
        // if (this.wallettypelist[i].description == "Argentine Peso") {
          if (this.wallettypelist[i].clubGameWallet == true && this.wallettypelist[i].description != "Play Money") {
          this.currencyList.push(this.wallettypelist[i])
            this.selectedNewCurrency = this.currencyList[0]?.guid;
            this.CreatePokerSitnGoForm.patchValue({
              Currency: this.currencyList[0]?.guid
            })
            if (this.currencyList[0]?.guid) {
              this.onSelected(this.selectedNewCurrency);
    
            }
    
       
          
        }
       
      }
      console.log("currencyList", this.currencyList)
      console.log("wallettypelist", this.wallettypelist)

    }
  }


  DYIDCHATACCESSIBILITY() {
    const DYIDCHATACCESSIBILITY = localStorage.getItem("DYIDCHATACCESSIBILITY")
    if (DYIDCHATACCESSIBILITY) {
      this.ChatAccessibilityList = JSON.parse(DYIDCHATACCESSIBILITY);
    }
    console.log("ChatAccessibilityList", this.ChatAccessibilityList);
    this.ChatAccessvalue = this.ChatAccessibilityList[2].guid;
    console.log(this.ChatAccessvalue);
  }


  usertype() {
    const usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertypeList", this.usertypeList)
    console.log("usertypeList", this.usertypeList[0].guid)
  }
  UserAccessArea() {
    const UserAccessArea = localStorage.getItem('UserAccessArea')
    if (UserAccessArea) {
      this.UserAccessAreaList = JSON.parse(UserAccessArea)
    }
    console.log("UserAccessAreaList", this.UserAccessAreaList)
    // console.log("UserAccessAreaList[8]", this.UserAccessAreaList[8])
    // console.log("UserAccessAreaList[13]", this.UserAccessAreaList[13])
    this.accessAreas.push(this.UserAccessAreaList[8]?.guid, this.UserAccessAreaList[13]?.guid)
  }

  PayoutStructure() {
    const PayoutStructure = localStorage.getItem("PayoutStructure")
    if (PayoutStructure) {
      this.PayoutStructureList = JSON.parse(PayoutStructure)
    }
    console.log("PayoutStructureList", this.PayoutStructureList)
  }

  PayoutTicketType() {
    const PayoutTicketType = localStorage.getItem("PayoutTicketType");
    if (PayoutTicketType) {
      this.PayoutTicketTypeList = JSON.parse(PayoutTicketType);
    }
    console.log("PayoutTicketTypeList", this.PayoutTicketTypeList);
  }


  LateRegistrationType() {
    const LateRegistrationType = localStorage.getItem("LateRegistrationType");
    if (LateRegistrationType) {
      this.LateRegistrationTypeList = JSON.parse(LateRegistrationType)
    }
    console.log("LateRegistrationTypeList", this.LateRegistrationTypeList)
  }



  UserAccessRules() {
    let body = {
      "firstRecord": 0,
      "maxCountRecord": 100,
      "accessAreas": this.accessAreas,
      "userType": this.usertypeList[0].guid
    }
    console.log(body)
    this.PlayerServiceService.listUserAccessRules(body).subscribe((res) => {
      if (res) {
        this.UserAccessRulesResData = res.objectList
        console.log("UserAccessRulesResData", this.UserAccessRulesResData)
        this.UserAccessValue = this.UserAccessRulesResData[0].guid;
        console.log(this.UserAccessValue);

      }

    })
  }


  pokerPayoutStructureList() {
    let body = {};
    this.PokergamesService.getPokerPayoutStructureList(body).subscribe((data) => {
      if (data) {
        this.pokerPayoutStructureRes = data.objectList;
        console.log(this.pokerPayoutStructureRes);
        console.log(data)
        console.log(this.pokerPayoutStructureRes.length)
        console.log(this.PayoutStructureList)
        console.log(this.PayoutStructureList.length)

        for (let i = 0; i < this.pokerPayoutStructureRes.length; i++) {

          for (let j = 0; j < this.PayoutStructureList.length; j++) {
            if (this.pokerPayoutStructureRes[i].structureType.lowLong == this.PayoutStructureList[j].guid.lowLong && this.pokerPayoutStructureRes[i].structureType.hiLong == this.PayoutStructureList[j].guid.hiLong) {
              this.pokerPayoutStructureRes[i].structureType = this.PayoutStructureList[j].value
            }
          }

          if (this.createSitngoPopup || this.EditSitnGoData?.satelliteEdit) {
            console.log("true");
            this.OnlyFloatPayoutTables.push(this.pokerPayoutStructureRes[i]);
          } else {
            console.log("false");
            if (this.pokerPayoutStructureRes[i].structureType == "Float") {
              this.OnlyFloatPayoutTables.push(this.pokerPayoutStructureRes[i]);
            }

          }


        }
        this.pokerPayoutValue = this.OnlyFloatPayoutTables[0].guid;

        this.selectedIndex = 0;

        this.selectedViewItem = this.OnlyFloatPayoutTables[this.selectedIndex]

        console.log("OnlyFloatPayoutTables", this.OnlyFloatPayoutTables);
        this.PayoutButton = false;
        this.CreatePokerSitnGoForm.get("PayoutTable")?.enable()

      } else {
        if (this.OnlyFloatPayoutTables == "") {
          this.CreatePokerSitnGoForm.get("PayoutTable")?.disable()
          // btn?.setAttribute('disabled', '');
          this.PayoutButton = true;
        }

      }

    })
  }

  TournamentResultNotificationType() {
    const TournamentResultNotificationType = localStorage.getItem("TournamentResultNotificationType")
    if (TournamentResultNotificationType) {
      this.ResultNotificationTypeList = JSON.parse(TournamentResultNotificationType)
    }
    console.log("ResultNotificationTypeList", this.ResultNotificationTypeList)
    this.ResultNotificationValue = this.ResultNotificationTypeList[0].guid;
    console.log(this.ResultNotificationValue);
  }
  TemplateCreationTypes() {
    const TemplateCreationTypes = localStorage.getItem("TemplateCreationTypes")
    if (TemplateCreationTypes) {
      this.TemplateCreationTypesList = JSON.parse(TemplateCreationTypes)
    }
    console.log("TemplateCreationTypes", this.TemplateCreationTypesList)
  }
  mailTempletes() {
    const payload = this.TemplateCreationTypesList[15]
    let body = payload.guid
    this.ToolsService.getMailTemplatesByType(body).subscribe((data) => {
      this.getMailTemplatesResData = data.objectList;
      console.log(data)
      if (this.getMailTemplatesResData) {
        this.getMailTemplateValue = this.getMailTemplatesResData[0].guid;
        console.log(this.getMailTemplateValue);
      }
    })
  }


  BlindStructure() {
    let body = {}
    this.PokergamesService.getBlindStructureList(body).subscribe((data) => {
      console.log(data)
      if (data.objectList) {
        this.pokerBlindStructureResData = data.objectList;
        console.log("pokerBlindStructureResData", this.pokerBlindStructureResData)
        this.defaultBlindStuctureOption = this.pokerBlindStructureResData[0].guid
        this.selectedBlindStructureIndex = 0
        this.selectedBlindStructureView = this.pokerBlindStructureResData[0];
        this.CreatePokerSitnGoForm.get("BlindStructure")?.enable();
        this.BlindStructurButton = false;

      } else {
        if (this.pokerBlindStructureResData == "") {
          this.CreatePokerSitnGoForm.get("BlindStructure")?.disable();
          this.BlindStructurButton = true;

        }
      }

    })
  }


  TourneySynchroModeType() {
    const TourneySynchroModeType = localStorage.getItem("TourneySynchroModeType");
    if (TourneySynchroModeType) {
      this.TourneySynchroModeTypeList = JSON.parse(TourneySynchroModeType)
    }
    this.defaultTournamentMoneyCheck = this.TourneySynchroModeTypeList[0].guid
    console.log(this.defaultTournamentMoneyCheck)
    console.log("TourneySynchroModeTypeList", this.TourneySynchroModeTypeList)
  }
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
    console.log("GamesConfig", this.GamesConfigList)
    console.log("GamesConfig", this.GamesConfigList.games)


    let gamesListofarrays = this.GamesConfigList.games

    console.log("gamesListofarraysss", gamesListofarrays)

    // let gamescaption: any[] = [];
    // for (let i = 0; i < gamesListofarrays.length; i++) {

    //   if (gamesListofarrays[i].caption) {

    //     if (gamesListofarrays[i].name.startsWith("POKER_")) {
    //       gamescaption.push(gamesListofarrays[i].caption)
    //     }

    //     if (gamesListofarrays[i].name.startsWith("POKER_") || this.CreatePokerSitnGoForm.value.MoneyType) {
    //       this.onlyPokerGames.push(gamesListofarrays[i].name)
    //     }

    //   }
    // }
    // console.log("onlyPokerGames", this.onlyPokerGames)
    // console.log("gamescaption", gamescaption)

    // this.uniquegamescaption = gamescaption.filter((item, i) => {
    //   return gamescaption.indexOf(item) === i
    // })
    // console.log("uniquegamescaption", this.uniquegamescaption)
  }
  onSelected(value: any=""): void {
    console.log(this.selectedNewCurrency)
    this.selectedCurrency = this.CreatePokerSitnGoForm.value.Currency;
    console.log(this.selectedCurrency);
    console.log("GamesConfig", this.GamesConfigList);
    // this.CreatePokerSitnGoForm.patchValue({
    //   Currency:this.selectedNewCurrency
    // });


    this.walletFormats = localStorage.getItem("walletFormats")
    this.walletFormats = JSON.parse(this.walletFormats);
    console.log(this.walletFormats);
    console.log(this.CreatePokerSitnGoForm.value.Currency);
    console.log(this.selectedCurrency)

    for (let i = 0; i < this.walletFormats.length; i++) {
      if (this.walletFormats[i]?.guid?.hiLong == this.selectedCurrency?.hiLong && this.walletFormats[i]?.guid?.lowLong == this.selectedCurrency?.lowLong) {
        console.log(this.walletFormats[i]);
        if (this.walletFormats[i].currencyCode) {
          this.chip = this.walletFormats[i].currencyCode
        } else {
          for (let j = 0; this.currencyList.length; j++) {
            console.log(this.currencyList[j].guid.hiLong, this.currencyList[j].guid.lowLong)
            if (this.currencyList[j].guid.hiLong == this.selectedCurrency.hiLong && this.currencyList[j].guid.lowLong == this.selectedCurrency.lowLong) {
              this.chip = this.currencyList[j].description
              break
            }

          }

        }


      }
      console.log(this.chip)
      if (this.chip === "Play Money") {
        this.currencyPlaymoney = true

      } else {
        this.currencyPlaymoney = false
      }

    }




    if (this.selectedCurrency) {
      let gamesListofarrays = this.GamesConfigList.games;
      console.log(gamesListofarrays);
      let gamescaption: any[] = [];

      for (let i = 0; i < gamesListofarrays.length; i++) {
        if (gamesListofarrays[i].name.startsWith("POKER_")) {
          gamescaption.push(gamesListofarrays[i])
          this.selectedTable = gamescaption.filter((game: any) => {
            return game.wallet.lowLong === this.selectedCurrency.lowLong && game.wallet.hiLong === this.selectedCurrency.hiLong
          });
        }
      }
      console.log("selectedTable", this.selectedTable)
      // selectedNewCurrency

      this.Onlygamescaption = []
      this.Onlygamescaption = []
      for (let i = 0; i < this.selectedTable.length; i++) {


        if (this.selectedCurrency.lowLong == this.selectedTable[i].wallet.lowLong && this.selectedCurrency.hiLong == this.selectedTable[i].wallet.hiLong) {

          // delete this.Onlygamescaption[i]
          this.Onlygamescaption.push(this.selectedTable[i].caption);
          // console.log(this.Onlygamescaption);
          // this.defaultSelectedOption = this.selectedTable[0].caption
        }

      }

      console.log("gamecaptionsssssss", this.Onlygamescaption)

    }

    this.setUpGameTypeBasedOnCurrency()
  }

  setUpGameTypeBasedOnCurrency(){
    const defaultOption = this.defaultSelectedOption
    console.log(this.Onlygamescaption.filter(()=>{}))
    if(this.defaultSelectedOption != undefined){
      for(let i=0; i<this.Onlygamescaption.length; i++){
        if (this.Onlygamescaption[i] == defaultOption) {
          this.defaultSelectedOption = this.Onlygamescaption[i];
          console.log("+++++++++", this.selectedTable[i].caption)
          break;
        }else{
          this.defaultSelectedOption = this.Onlygamescaption[0];
        }}
    } else{
      this.defaultSelectedOption = this.selectedTable[0].caption;
    }
          
  }

  ViewPayoutTable(data: any = {}) {
    // export class SelectComponent {
    //   selectedOption: string;
    //   options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    //   getSelectedIndex() {
    //     const selectedIndex = this.options.indexOf(this.selectedOption);
    //     console.log('Selected Index:', selectedIndex);
    //   }
    // }

    // this.uniquegamescaption = gamescaption.filter((item, i) => {
    //   return gamescaption.indexOf(item) === i
    // })

    this.selectedIndex = this.OnlyFloatPayoutTables.findIndex((item: any) => {
      // return item.guid == this.CreatePokerSitnGoForm.value.PayoutTable;
      // console.log(item.guid.hiLong == this.CreatePokerSitnGoForm.value.PayoutTable.hiLong && item.guid.lowLong == this.CreatePokerSitnGoForm.value.PayoutTable.lowLong)
      // return item?.guid?.hiLong == this.CreatePokerSitnGoForm.value.PayoutTable?.hiLong && item.guid?.lowLong == this.CreatePokerSitnGoForm.value.PayoutTable?.lowLong;
      return item?.guid?.hiLong == this.pokerPayoutValue?.hiLong && item.guid?.lowLong == this.pokerPayoutValue?.lowLong;
    });

    console.log(this.OnlyFloatPayoutTables, "OnlyFloatPayoutTables");
    console.log(this.selectedIndex);
    console.log(this.OnlyFloatPayoutTables[this.selectedIndex])
    this.selectedViewItem = this.OnlyFloatPayoutTables[this.selectedIndex]

    console.log(this.selectedViewItem);
  }

  clickToViewPayoutTable() {
    console.log(this.CreatePokerSitnGoForm.value.PayoutTable);
    console.log(this.pokerPayoutValue);
    this.viewPayOutTablePopup = true
    this.ViewPayoutTable();
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
    this.viewPayOutTablePopup = false
  }

  checkBoxChangestus(event: any) {
    this.checkedStatus = this.CreatePokerSitnGoForm.value.NotifyPlayers
    console.log(this.checkedStatus)

    // this.CreatePokerSitnGoForm.patchValue({
    //   Password: {value: '', disabled: true},
    // });
    // this.CreatePokerSitnGoForm.controls['Password'].enable();

  }

  unchekFreeroll(data: any) {
    console.log(data)
    this.FreerollCheck = this.CreatePokerSitnGoForm.value.Freeroll;
    this.ChipsCheck = this.CreatePokerSitnGoForm.value.Chips;
    this.CompPointsCheck = this.CreatePokerSitnGoForm.value.CompPoints;
    this.TournamentMoneyCheck = this.CreatePokerSitnGoForm.value.TournamentMoney;
    this.TicketsCheck = this.CreatePokerSitnGoForm.value.Tickets;
    console.log(this.FreerollCheck);
    if (!this.ChipsCheck && !this.CompPointsCheck && !this.TournamentMoneyCheck && !this.TicketsCheck) {
      this.CreatePokerSitnGoForm.patchValue({
        Freeroll: true,
      });
    } else {
      this.CreatePokerSitnGoForm.patchValue({
        Freeroll: false,
      });
    }
    // this.CreatePokerSitnGoForm.value.Freeroll = false;
  }

  tournamentErrorclosepopup = () => {
    this.tournamentErrorTextBoolValue = false
  }


  cancelSatellitePopup() {
    this.exitSatellitePopup.emit(false)

  }





  // raju bro onFormSubmit() {

  //   let moneyType = this.CreatePokerSitnGoForm.value.Currency;
  //   console.log(moneyType)
  //   let selectdeCaption = this.GamesConfigList.games.filter((game: any) => {
  //     return game.caption === this.CreatePokerSitnGoForm.value.GameType;
  //   });
  //   console.log(selectdeCaption);
  //   let finalCaption = selectdeCaption.filter((table: any) => {
  //     return table.wallet.hiLong === moneyType.hiLong && table.wallet.lowLong === moneyType.lowLong
  //   });
  //   console.log(finalCaption);

  //   let body = {
  //     "forceSave": false,
  //     "tourn": {
  //       // ************** Genaral
  //       "caption": this.CreatePokerSitnGoForm.value.Name,
  //       "description": this.CreatePokerSitnGoForm.value.Description,
  //       "password": this.CreatePokerSitnGoForm.value.Password,
  //       "gameName": finalCaption[0].name,
  //       "seats": this.CreatePokerSitnGoForm.value.Seats,
  //       "minPlayers": this.CreatePokerSitnGoForm.value.MinPlayers,
  //       "maxPlayers": this.CreatePokerSitnGoForm.value.MaxPlayers,
  //       "chipsPerPlayer": { "value": this.CreatePokerSitnGoForm.value.ChipsperPlayer },

  //       // **************Accessibility
  //       "accessRule": this.CreatePokerSitnGoForm.value.AccessRuleName,
  //       "chatAccessibility": this.CreatePokerSitnGoForm.value.ChatAccesability,
  //       "enableNow": this.CreatePokerSitnGoForm.value.EnableNow,

  //       // **************Prizes Settings
  //       "guarantedPrize": {
  //         "value": this.CreatePokerSitnGoForm.value.GuaranteedPrize,
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },
  //       "manualPrizePoolTourney": this.CreatePokerSitnGoForm.value.ManualPoolPrize,
  //       // "payoutTable": (this.CreatePokerSitnGoForm.value.PayoutTable).slice(8 ),
  //       "payoutId": this.CreatePokerSitnGoForm.value.PayoutTable, //need to send Payout table id

  //       "resultNotificationType": this.CreatePokerSitnGoForm.value.NotifyPlayersType,
  //       // "resultNotificationPlaces": this.CreatePokerSitnGoForm.value.NotifyPlayersPlaces,
  //       // "resultNotificationTemplateId": this.CreatePokerSitnGoForm.value.usingtemplate,


  //       // **************Buy In Settings
  //       "allowCash": this.CreatePokerSitnGoForm.value.Chips,
  //       "allowCompPoints": this.CreatePokerSitnGoForm.value.CompPoints,
  //       "allowTournamentMoney": this.CreatePokerSitnGoForm.value.TournamentMoney,
  //       "allowTournamentTickets": this.CreatePokerSitnGoForm.value.Tickets,
  //       "buyIn": {
  //         "value": this.CreatePokerSitnGoForm.value.BuyIn,
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },
  //       "fee": {
  //         "value": this.CreatePokerSitnGoForm.value.Fee,
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },
  //       "knockoutBounty": {
  //         "value": this.CreatePokerSitnGoForm.value.KnockoutBounty,
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },
  //       "totalCost": {
  //         "value": + parseInt(this.CreatePokerSitnGoForm.value.Fee) + parseInt(this.CreatePokerSitnGoForm.value.BuyIn) + parseInt(this.CreatePokerSitnGoForm.value.KnockoutBounty),
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },

  //       // ************** Advanced
  //       // ************** Level Settings
  //       "levelLength": this.CreatePokerSitnGoForm.value.LevelLengthmin * Math.floor(60 * 1000),
  //       "levelsBeforeBreak": this.CreatePokerSitnGoForm.value.LevelsbeforeBreak,
  //       "breakLength": this.CreatePokerSitnGoForm.value.BreakLengthMin * Math.floor(60 * 1000),
  //       "blindId": this.CreatePokerSitnGoForm.value.BlindStructure,
  //       "synchronizedTourney": this.CreatePokerSitnGoForm.value.SynchronizedBreak,
  //       "pauseOnFinalTable": this.CreatePokerSitnGoForm.value.PauseTournament,
  //       "descriptionForPauseOnFinalTable": this.CreatePokerSitnGoForm.value.MessagetoPlayers,

  //       // **************Time Out Settings
  //       "actionTimeOut": this.CreatePokerSitnGoForm.value.ActionTimeout * Math.floor(1000),
  //       "playerTimeBank": this.CreatePokerSitnGoForm.value.TimeBank * Math.floor(1000),
  //       "additionalTimeBank": this.CreatePokerSitnGoForm.value.TimeBankAutoincrementAmount * Math.floor(1000),

  //       // **************Hand to Hand Settings

  //       // "synchroModeType": this.CreatePokerSitnGoForm.value.BubbleFinalTable,
  //       "synchroModeType": {
  //         "hiLong": 0,
  //         "lowLong": 0
  //       },
  //       // "synchroModeType": this.synchroModeType,

  //       // **************Re-Buy
  //       "rebuyCount": 0,
  //       "addonCost": {
  //         "value": this.CreatePokerSitnGoForm.value.AddonCost,
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },
  //       "addonCount": 0,

  //       // "announcePeriodType": this.CreatePokerSitnGoForm.value.AnnouncePeriodType,
  //       "announcePeriodValue": 0,
  //       // "registrPeriodType": this.CreatePokerSitnGoForm.value.RegistrantionPeriodType,
  //       "registrPeriodValue": 0,
  //       // "completePeriodType": this.CreatePokerSitnGoForm.value.CompletedPeriodType,
  //       "completePeriodValue": 0,
  //       // "seatingPeriodType": this.CreatePokerSitnGoForm.value.SeatingPeriodType,
  //       "seatingPeriodValue": 0,

  //       // Extra Find
  //       "tourneyType": this.TourneyTypeList[1].guid,
  //       "numberInSeries": -1,
  //       "played": 0,
  //       "haveMessages": false,
  //       "shareType": { "hiLong": 0, "lowLong": 0 },
  //       "timeBased": false,
  //       "objState": 0,
  //     }
  //   }
  //   console.log(body)
  //   this.PokergamesService.setPokerTournamentSettings(body).subscribe((data) => console.log(data))
  // }


  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
          // else
          //     dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }

  SuccessPop() {
    this.CreateSuccessPop = false;
    // window.location.reload();
    this.closePopup.emit(false)
    if (this.SuccessMsG == 'SuccessFully Created') {
      this.router.navigateByUrl('/pokersitandgos')

    } else {
      window.location.reload();
    }
  }
  TechnicalError() {
    this.ErrorPopup = false
  }

  onFormSubmit() {

    // for(let i=0;this.selectedTimeBreak.length;i++){

    // if (this.PeriodTypesList[i].value == "Minutes" || this.PeriodTypesList[i].value == "Hours" || this.PeriodTypesList[i].value == "Days") {
    // this.CreatePokerSitnGoForm.value.BreakLengthMin * Math.floor(60 * 1000) : undefined;
    var breakLengthmillisec: any
    if (this.BreakLengthMinTypeDefaultOption == "Minutes") {
      breakLengthmillisec = this.CreatePokerSitnGoForm.value.BreakLengthMin * Math.floor(60 * 1000)
    } else if (this.BreakLengthMinTypeDefaultOption == "Hours") {
      breakLengthmillisec = this.CreatePokerSitnGoForm.value.BreakLengthMin * Math.floor(60 * 60 * 1000)
    } else if (this.BreakLengthMinTypeDefaultOption == "Days") {
      breakLengthmillisec = this.CreatePokerSitnGoForm.value.BreakLengthMin * Math.floor(24 * 60 * 60 * 1000)
    }

    // }

    console.log(this.CreatePokerSitnGoForm.value)
    // let moneyType = this.CreatePokerSitnGoForm.value.Currency;
    let moneyType = this.selectedCurrency;
    console.log(moneyType)
    console.log(this.CreatePokerSitnGoForm.value.GameType)
    let selectdeCaption = this.GamesConfigList.games.filter((game: any) => {
      // return game.caption === this.CreatePokerSitnGoForm.value.GameType;
      return game.caption === this.defaultSelectedOption;
    });
    console.log(selectdeCaption);
    this.finalCaption = selectdeCaption.filter((table: any) => {
      return table.wallet.hiLong === moneyType.hiLong && table.wallet.lowLong === moneyType.lowLong
    });
    console.log(this.finalCaption);

    if (this.CreatePokerSitnGoForm.value.MinPlayers > this.CreatePokerSitnGoForm.value.MaxPlayers) {
      this.CreatePokerSitnGoForm.value.MaxPlayers = this.CreatePokerSitnGoForm.value.MinPlayers;
      console.log(this.CreatePokerSitnGoForm.value.MaxPlayers);

    }


    console.log(this.CreatePokerSitnGoForm.value.Name)
    console.log(this.CreatePokerSitnGoForm.value.GuaranteedPrize)
    console.log(this.CreatePokerSitnGoForm.value.BuyIn)
    console.log(this.CreatePokerSitnGoForm.value.Rebuys)
    console.log(this.CreatePokerSitnGoForm.value.MaxRebuysperPlayer)
    console.log(this.CreatePokerSitnGoForm.value.RebuyCost)
    console.log(this.CreatePokerSitnGoForm.value.RebuyAmount)
    this.CreatePokerSitnGoForm.patchValue({
      // AnnouncePeriodType: this.AnnouncePeriodDefaultValue,
      BlindStructure: this.defaultBlindStuctureOption,
      RegistrantionPeriodType: this.RegistrantionPeriodDefaultValue,
      CompletedPeriodType: this.CompletedPeriodDefaultValue,
      SeatingPeriodType: this.SeatingPeriodDefaultValue
    })

    let fillterbody = this.getDirtyValues(this.CreatePokerSitnGoForm);

    fillterbody['caption'] = this.CreatePokerSitnGoForm.value.Name != (null) ? this.CreatePokerSitnGoForm.value.Name : undefined;
    // fillterbody['description'] = this.CreatePokerSitnGoForm.value.Description != "" ? this.CreatePokerSitnGoForm.value.Description : undefined;
    fillterbody['description'] = this.CreatePokerSitnGoForm.value.Description;
    fillterbody['password'] = this.CreatePokerSitnGoForm.value.password != null ? this.CreatePokerSitnGoForm.value.password : undefined;
    fillterbody['gameName'] = this.finalCaption[0].name != null ? this.finalCaption[0].name : undefined;
    fillterbody['seats'] = this.CreatePokerSitnGoForm.value.Seats != null ? this.CreatePokerSitnGoForm.value.Seats : undefined;
    fillterbody['minPlayers'] = this.CreatePokerSitnGoForm.value.MinPlayers != null ? this.CreatePokerSitnGoForm.value.MinPlayers : undefined;
    // fillterbody['maxPlayers'] = this.CreatePokerSitnGoForm.value.MaxPlayers != null ? this.CreatePokerSitnGoForm.value.MaxPlayers : undefined;
    fillterbody['maxPlayers'] = this.CreatePokerSitnGoForm.value.MaxPlayers != null ? this.CreatePokerSitnGoForm.value.MaxPlayers : this.CreatePokerSitnGoForm.value.MinPlayers;
    fillterbody['chipsPerPlayer'] = this.CreatePokerSitnGoForm.value.ChipsperPlayer != null ? { "value": this.CreatePokerSitnGoForm.value.ChipsperPlayer } : undefined;

    // **************Accessibility
    fillterbody['accessRule'] = this.CreatePokerSitnGoForm.value.AccessRuleName != null ? this.CreatePokerSitnGoForm.value.AccessRuleName : undefined;
    fillterbody['chatAccessibility'] = this.CreatePokerSitnGoForm.value.ChatAccesability != null ? this.CreatePokerSitnGoForm.value.ChatAccesability : undefined;
    fillterbody['enableNow'] = this.CreatePokerSitnGoForm.value.EnableNow != null ? this.CreatePokerSitnGoForm.value.EnableNow : undefined;

    // **************Prizes Settings
    fillterbody['guarantedPrize'] = this.CreatePokerSitnGoForm.value.GuaranteedPrize != null ? {
      "value": this.CreatePokerSitnGoForm.value.GuaranteedPrize,
      "wallet": this.selectedCurrency
    } : undefined;

    // fillterbody['progressiveKnockOutTournaments'] = this.CreatePokerSitnGoForm.value.ProgressiveKnockoutCheck != null ? this.CreatePokerSitnGoForm.value.ProgressiveKnockoutCheck:undefined ;
    fillterbody['progressiveKnockOutTournaments'] = this.CreatePokerSitnGoForm.value.ProgressiveKnockoutCheck;
    fillterbody['progressiveKnockOutTournamentPercentage'] = this.CreatePokerSitnGoForm.value.KnockoutPercentage != null ? this.CreatePokerSitnGoForm.value.KnockoutPercentage : 0;



    fillterbody['manualPrizePoolTourney'] = this.CreatePokerSitnGoForm.value.ManualPoolPrize != null ? this.CreatePokerSitnGoForm.value.ManualPoolPrize : undefined;
    fillterbody['payoutId'] = this.CreatePokerSitnGoForm.value.PayoutTable != null ? this.CreatePokerSitnGoForm.value.PayoutTable : undefined;
    if (this.CreatePokerSitnGoForm.value.NotifyPlayers) {
      if(this.EditSitnGoData == null){
        fillterbody['resultNotificationType'] = this.CreatePokerSitnGoForm.value.NotifyPlayersType != null ? this.CreatePokerSitnGoForm.value.NotifyPlayersType : undefined;
      }
      fillterbody['resultNotificationPlaces'] = this.CreatePokerSitnGoForm.value.NotifyPlayersPlaces != null ? this.CreatePokerSitnGoForm.value.NotifyPlayersPlaces : 0;
      fillterbody['resultNotificationTemplateId'] = this.CreatePokerSitnGoForm.value.usingtemplate != null ? this.CreatePokerSitnGoForm.value.usingtemplate : undefined;

    }


    // **************Buy In Settings
    fillterbody['allowCash'] = this.CreatePokerSitnGoForm.value.Chips != null ? this.CreatePokerSitnGoForm.value.Chips : undefined;
    fillterbody['allowCompPoints'] = this.CreatePokerSitnGoForm.value.CompPoints != null ? this.CreatePokerSitnGoForm.value.CompPoints : undefined;
    fillterbody['allowTournamentMoney'] = this.CreatePokerSitnGoForm.value.TournamentMoney != null ? this.CreatePokerSitnGoForm.value.TournamentMoney : undefined;
    fillterbody['allowTournamentTickets'] = this.CreatePokerSitnGoForm.value.Tickets != null ? this.CreatePokerSitnGoForm.value.Tickets : undefined;


    if (this.CreatePokerSitnGoForm.value.Freeroll == false) {
      fillterbody['buyIn'] = this.CreatePokerSitnGoForm.value.BuyIn != null ? {
        "value": this.CreatePokerSitnGoForm.value.BuyIn,
        "wallet": this.selectedCurrency
      } : undefined;
      fillterbody['fee'] = this.CreatePokerSitnGoForm.value.Fee != null ? {
        "value": this.CreatePokerSitnGoForm.value.Fee,
        "wallet": this.selectedCurrency
      } : undefined;

      fillterbody['maintenanceFee'] = this.CreatePokerSitnGoForm.value.MarketingFee != null ? {
        "value": this.CreatePokerSitnGoForm.value.MarketingFee,
        "wallet": this.selectedCurrency
      } : {
        "value": 0,
        "wallet": this.selectedCurrency
      };

      // fillterbody['progressiveKnockOutTournaments'] = this.CreatePokerSitnGoForm.value.KnockoutBountyCheck
      // if (this.CreatePokerSitnGoForm.value.KnockoutBountyCheck) {
      fillterbody['knockoutBounty'] = this.CreatePokerSitnGoForm.value.KnockoutBounty >= 0 ? {
        "value": this.CreatePokerSitnGoForm.value.KnockoutBounty,
        "wallet": this.selectedCurrency
      } : {
        "value": 0,
        "wallet": this.selectedCurrency
      };

      // }

    }


    fillterbody['brandedTourney'] = this.CreatePokerSitnGoForm.value.brandedTournament;
    fillterbody['brandedTourneyImage'] = this.CreatePokerSitnGoForm.value.BrandedURl != null ? this.CreatePokerSitnGoForm.value.BrandedURl : undefined;



    fillterbody['totalCost'] = this.totalCostValue >= 0 ? {
      // "value":  parseInt(this.CreatePokerSitnGoForm.value.Fee) + parseInt(this.CreatePokerSitnGoForm.value.BuyIn) + parseInt(this.CreatePokerSitnGoForm.value.KnockoutBounty),
      // "value": this.totalCostValue,
      "value": this.totalCostValue-parseInt(this.CreatePokerSitnGoForm.value.MarketingFee),
      "wallet": this.selectedCurrency
    } : undefined;


    // ************** Advanced
    // ************** Level Settings


    fillterbody['levelLength'] = this.CreatePokerSitnGoForm.value.LevelLengthmin != null ?
      this.CreatePokerSitnGoForm.value.LevelLengthmin * Math.floor(60 * 1000) : undefined;
    fillterbody['levelsBeforeBreak'] = this.CreatePokerSitnGoForm.value.LevelsbeforeBreak != null ? this.CreatePokerSitnGoForm.value.LevelsbeforeBreak : undefined;
    // fillterbody['breakLength'] = this.CreatePokerSitnGoForm.value.BreakLengthMin != null ? this.CreatePokerSitnGoForm.value.BreakLengthMin * Math.floor(60 * 1000) : undefined;
    fillterbody['breakLength'] = breakLengthmillisec;
    // fillterbody['breakTimeAfterAddon'] = this.CreatePokerSitnGoForm.value.LevelsLengthAfterAddonBreak != null ? this.CreatePokerSitnGoForm.value.LevelsLengthAfterAddonBreak * Math.floor(60 * 1000) : undefined;
    fillterbody['breakTimeAfterAddon'] = this.CreatePokerSitnGoForm.value.LevelsLengthAfterAddonBreak != null ? this.CreatePokerSitnGoForm.value.LevelsLengthAfterAddonBreak : undefined;
    fillterbody['blindId'] = this.CreatePokerSitnGoForm.value.BlindStructure != null ? this.CreatePokerSitnGoForm.value.BlindStructure : undefined;
    fillterbody['synchronizedTourney'] = this.CreatePokerSitnGoForm.value.SynchronizedBreak != null ? this.CreatePokerSitnGoForm.value.SynchronizedBreak : undefined;
    fillterbody['pauseOnFinalTable'] = this.CreatePokerSitnGoForm.value.PauseTournament != null ? this.CreatePokerSitnGoForm.value.PauseTournament : undefined;
    if (this.CreatePokerSitnGoForm.value.PauseTournament) {
      fillterbody['descriptionForPauseOnFinalTable'] = this.CreatePokerSitnGoForm.value.MessagetoPlayers != null ? this.CreatePokerSitnGoForm.value.MessagetoPlayers : undefined;
    }

    // **************Time Out Settings
    fillterbody['actionTimeOut'] = this.CreatePokerSitnGoForm.value.ActionTimeout != null ? this.CreatePokerSitnGoForm.value.ActionTimeout * Math.floor(1000) : undefined;
    fillterbody['playerTimeBank'] = this.CreatePokerSitnGoForm.value.TimeBank != null ? this.CreatePokerSitnGoForm.value.TimeBank * Math.floor(1000) : undefined;
    fillterbody['additionalTimeBank'] = this.CreatePokerSitnGoForm.value.TimeBankAutoincrementAmount != null ? this.CreatePokerSitnGoForm.value.TimeBankAutoincrementAmount * Math.floor(1000) : undefined;

    // **************Hand to Hand Settings
    // fillterbody['synchroModeType'] = this.CreatePokerSitnGoForm.value.BubbleFinalTable != null ? this.CreatePokerSitnGoForm.value.BubbleFinalTable : undefined;
    fillterbody['synchroModeType'] = this.defaultTournamentMoneyCheck != null ? this.defaultTournamentMoneyCheck : undefined;


    // "synchroModeType": this.synchroModeType,

    // **************Re-Buy
    if (this.CreatePokerSitnGoForm.value.Rebuys) {
      fillterbody['rebuyChips'] = this.CreatePokerSitnGoForm.value.RebuyAmount != null ?
        { "value": this.CreatePokerSitnGoForm.value.RebuyAmount } : undefined;
      fillterbody['rebuyCost'] = this.CreatePokerSitnGoForm.value.RebuyCost != null ? {
        "value": this.CreatePokerSitnGoForm.value.RebuyCost,
        "wallet": this.selectedCurrency
      } : undefined;
      fillterbody['rebuyCount'] = this.CreatePokerSitnGoForm.value.MaxRebuysperPlayer != null ? this.CreatePokerSitnGoForm.value.MaxRebuysperPlayer : undefined;

      // fillterbody['addonCount'] = 0;
      fillterbody['addonChips'] = this.CreatePokerSitnGoForm.value.AddonAmount != null ? { "value": this.CreatePokerSitnGoForm.value.AddonAmount } : undefined;
      fillterbody['addonCost'] = this.CreatePokerSitnGoForm.value.AddonCost != null ? {
        "value": this.CreatePokerSitnGoForm.value.AddonCost,
        "wallet": this.selectedCurrency
      } : undefined;

      fillterbody['addonCount'] = 0;//Inlogs i found this keyName InScreen didn't find.

    }

    fillterbody['tourneyType'] = this.TourneyTypeList[1].guid;
    fillterbody['numberInSeries'] = -1;
    fillterbody['played'] = 0;
    fillterbody['haveMessages'] = false;
    fillterbody['shareType'] = { "hiLong": 0, "lowLong": 0 };
    fillterbody['timeBased'] = false;
    // fillterbody['icmBasedDistribution'] = this.CreatePokerSitnGoForm.value.ICM;


    fillterbody['announcePeriodValue'] = 0;
    fillterbody['registrPeriodValue'] = 0;
    fillterbody['completePeriodValue'] = 0;
    fillterbody['seatingPeriodValue'] = 0;


    // fillterbody['fontColor'] = "0,0,0";
    // fillterbody['fontHeight'] = 0;

    //add to Extra field
    fillterbody['maintenanceFeesRebuy'] = {
      "value": this.CreatePokerSitnGoForm.value.MarketingFeeRebuy,
      "wallet": this.selectedCurrency
    };
    fillterbody['maintenanceFeesAddOn'] = {
      "value": this.CreatePokerSitnGoForm.value.MarketingFeeAddon,
      // "wallet": this.CreatePokerSitnGoForm.value.Currency
      "wallet": this.selectedCurrency
    };

    // fillterbody['feeOnAddOn'] = {
    //   "value": 10,
    //   "wallet": {
    //     "hiLong": 0,
    //     "lowLong": 1840
    //   }
    // };
    // fillterbody['feeOnReBuy'] = {
    //   "value": 10,
    //   "wallet": {
    //     "hiLong": 0,
    //     "lowLong": 1840
    //   }
    // };

    //add to Extra field

    fillterbody['objState'] = 0;



    this.LateRegistrationTypeListGuid = this.LateRegistrationTypeList[0].guid
    if (this.CreatePokerSitnGoForm.value.LateRegistrantion) {

      for (let i = 0; this.LateRegistrationTypeList.length; i++) {
        // if (this.LateRegistrationTypeList[i].value == this.CreatePokerSitnGoForm.value.LateRegistrantionRadio) {
        if (this.LateRegistrationTypeList[i].value == this.defaultlateRegistationChange) {
          this.LateRegistrationTypeListGuid = this.LateRegistrationTypeList[i].guid;
          break;

        }
      }

      // fillterbody['lateRegistrationCounter'] = this.CreatePokerSitnGoForm.value.LateRegistrantionLevel;
      fillterbody['lateRegistrationCounter'] = this.CreatePokerSitnGoForm.value.LateRegistrantionLevel != null ? this.CreatePokerSitnGoForm.value.LateRegistrantionLevel : 0;

      fillterbody['lateRegistrationType'] = this.LateRegistrationTypeListGuid;

    } else {
      fillterbody['lateRegistrationCounter'] = 0;
      fillterbody['lateRegistrationType'] = this.LateRegistrationTypeListGuid;

    }

    fillterbody['progressiveKnockOutTournamentPercentage'] = 0;
    fillterbody['icmBasedDistribution'] = this.CreatePokerSitnGoForm.value.ICM;
    fillterbody['tournamentManualDistributionV2Equal'] = this.CreatePokerSitnGoForm.value.EqualPrize;
    fillterbody['tournamentManualDistributionV2Stack'] = this.CreatePokerSitnGoForm.value.StackBased;

    if (this.EditSitnGoData) {
      fillterbody['guid'] = this.EditSitnGoData?.guid;
    }




    let body01 = {
      "forceSave": false,
      "tourn": fillterbody
    }




    if (this.CreatePokerSitnGoForm.value.Name == ""
      && this.CreatePokerSitnGoForm.value.GuaranteedPrize <= 0
      && this.CreatePokerSitnGoForm.value.BuyIn <= 0
      && this.CreatePokerSitnGoForm.value.Rebuys
      && this.CreatePokerSitnGoForm.value.MaxRebuysperPlayer <= 0
      && this.CreatePokerSitnGoForm.value.RebuyCost <= 0
      && this.CreatePokerSitnGoForm.value.RebuyAmount <= 0) {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup =
        `Fields 'Name' can't be emty. 
Fields 'Guaranteed' prize (or) 'Buy-in' must be positive.
Fields 'Rebuy Cost' must be positive.
Fields 'Rebuy Amount' must be positive.
Fields 'Max.Rebuys per player' must be positive`;
    } else if (this.CreatePokerSitnGoForm.value.Rebuys
      && (this.CreatePokerSitnGoForm.value.MaxRebuysperPlayer <= 0
        || this.CreatePokerSitnGoForm.value.RebuyCost <= 0
        || this.CreatePokerSitnGoForm.value.RebuyAmount <= 0)) {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup =
        `Fields 'Rebuy Cost' must be positive.
  Fields 'Rebuy Amount' must be positive.
  Fields 'Max.Rebuys per player' must be positive`;

    }
    else if (this.CreatePokerSitnGoForm.value.Name == "" &&
      this.CreatePokerSitnGoForm.value.GuaranteedPrize <= 0 &&
      this.CreatePokerSitnGoForm.value.BuyIn <= 0) {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup =
        `Fields 'Name' can't be emty.
Fields 'Guaranteed' prize and 'Buy-in' must be positive. `
    } else if (this.CreatePokerSitnGoForm.value.Name == "") {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup =
        `fields 'Name' can't be emty.`
    }
    else if (this.CreatePokerSitnGoForm.value.GuaranteedPrize <= 0 ||
      this.CreatePokerSitnGoForm.value.BuyIn <= 0) {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup =
        `fields 'Guaranteed' prize (or) 'Buy-in' must be positive.`
    } else if (this.CreatePokerSitnGoForm.value.MaxPlayers <= 0
      || (this.CreatePokerSitnGoForm.value.MaxPlayers < this.CreatePokerSitnGoForm.value.MinPlayers)
      || this.CreatePokerSitnGoForm.value.MaxPlayers < this.CreatePokerSitnGoForm.value.Seats) {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup =
        `fields 'Max players' must be positive.
'Max players' can't be less then 'Seats'.
'Max players' can't be less then 'Min players'`


    } else if (this.PayoutButton == true) {
      this.tournamentErrorTextBoolValue = true;
      this.tournamentErrorTextPopup = `Payout Table can't ne empty`

    } else if (this.BlindStructurButton == true) {
      this.tournamentErrorTextBoolValue = true;
      this.tournamentErrorTextPopup = `Blind Structure can't ne empty`
    }

    else {
      this.tournamentErrorTextPopup = "";
      this.tournamentErrorTextBoolValue = false;



      console.log(body01);

      if (!this.createSitngoPopup && !this.editOptionMode){
      
        this.PokergamesService.setPokerTournamentSettings(body01).subscribe((data) => {
          console.log(data)
          // if (data.changedObjectList) {
          if (data) {
            this.CreateSuccessPop = true;

            if (this.EditSitnGoData) {
              this.SuccessMsG = 'SuccessFully Edited'

            } else {
              this.SuccessMsG = 'SuccessFully Created'

            }
          }

        },
          error => {
            this.ErrorPopup = true;
            console.log(error)
          }
        )

      } else {
        this.filterbodyData.emit(body01);
        let gametypeAndName = {
          caption: this.finalCaption[0].caption,
          type: "Sit'n'Go Info"
        };
        // this.tournamentGameType.emit(this.finalCaption[0].caption); 
        this.tournamentGameType.emit(gametypeAndName);
        this.sendPayoutData.emit(this.selectedViewItem);
      }



    }


    let body = {
      "forceSave": false,
      "tourn": {
        "objState": 0,
        "accessRule": this.CreatePokerSitnGoForm.value.AccessRuleName,
        "allowCash": this.CreatePokerSitnGoForm.value.Chips,
        "allowCompPoints": this.CreatePokerSitnGoForm.value.CompPoints,
        "allowTournamentMoney": this.CreatePokerSitnGoForm.value.TournamentMoney,
        "allowTournamentTickets": this.CreatePokerSitnGoForm.value.Tickets,
        "announcePeriodValue": 0,
        "brandedTourney": false,
        "buyIn": {
          "value": Number(this.CreatePokerSitnGoForm.value.BuyIn),
          "wallet": this.CreatePokerSitnGoForm.value.Currency
        },
        "caption": this.CreatePokerSitnGoForm.value.Name,
        "completePeriodValue": 0,
        "description": this.CreatePokerSitnGoForm.value.Description,
        "enableNow": this.CreatePokerSitnGoForm.value.EnableNow,
        "fee": {
          "value": Number(this.CreatePokerSitnGoForm.value.Fee),
          "wallet": this.CreatePokerSitnGoForm.value.Currency
        },
        "gameName": this.finalCaption[0].name,
        "guarantedPrize": {
          "value": Number(this.CreatePokerSitnGoForm.value.GuaranteedPrize),
          "wallet": this.CreatePokerSitnGoForm.value.Currency
        },
        "knockoutBounty": {
          "value": Number(this.CreatePokerSitnGoForm.value.KnockoutBounty),
          "wallet": this.CreatePokerSitnGoForm.value.Currency
        },
        "makeADeal": false,
        "manualPrizePoolTourney": this.CreatePokerSitnGoForm.value.ManualPoolPrize,
        "maxPlayers": Number(this.CreatePokerSitnGoForm.value.MaxPlayers),
        "minPlayers": Number(this.CreatePokerSitnGoForm.value.MinPlayers),
        "numberInSeries": -1,
        "password": this.CreatePokerSitnGoForm.value.Password,
        "pauseOnFinalTable": this.CreatePokerSitnGoForm.value.PauseTournament,
        "payoutId": this.CreatePokerSitnGoForm.value.PayoutTable,
        "played": 0,
        "registrPeriodValue": 0,
        "resultNotificationPlaces": Number(this.CreatePokerSitnGoForm.value.NotifyPlayersPlaces),
        "seatingPeriodValue": 0,
        "synchronizedTourney": this.CreatePokerSitnGoForm.value.SynchronizedBreak,
        "totalCost": {
          "value": + Number(this.CreatePokerSitnGoForm.value.Fee) + Number(this.CreatePokerSitnGoForm.value.BuyIn) + Number(this.CreatePokerSitnGoForm.value.KnockoutBounty),
          "wallet": this.CreatePokerSitnGoForm.value.Currency
        },
        "tourneyType": this.TourneyTypeList[1].guid,
        "actionTimeOut": this.CreatePokerSitnGoForm.value.ActionTimeout * Math.floor(1000),
        "additionalTimeBank": this.CreatePokerSitnGoForm.value.TimeBankAutoincrementAmount * Math.floor(1000),
        "addonCount": 0,
        "blindId": this.CreatePokerSitnGoForm.value.BlindStructure,
        "breakLength": this.CreatePokerSitnGoForm.value.BreakLengthMin * Math.floor(60 * 1000),
        "chatAccessibility": this.CreatePokerSitnGoForm.value.ChatAccesability,
        "chipsPerPlayer": { "value": Number(this.CreatePokerSitnGoForm.value.ChipsperPlayer) },
        "haveMessages": false,
        "lateRegistrationCounter": 0,
        "lateRegistrationType": {
          "hiLong": 0,
          "lowLong": 0
        },
        "levelLength": this.CreatePokerSitnGoForm.value.LevelLengthmin * Math.floor(60 * 1000),
        "levelsBeforeBreak": Number(this.CreatePokerSitnGoForm.value.LevelsbeforeBreak),
        "playerTimeBank": (this.CreatePokerSitnGoForm.value.TimeBank * Math.floor(1000)),
        "rebuyCount": 0,
        "seats": Number(this.CreatePokerSitnGoForm.value.Seats),
        "synchroModeType": {
          "hiLong": 0,
          "lowLong": 0
        },
        "timeBased": false,
        "shareType": {
          "hiLong": 0,
          "lowLong": 0
        }
      }
    }
    // console.log(body);
    // this.PokergamesService.setPokerTournamentSettings(body).subscribe((data) => console.log(data))
  }






  //22 onFormSubmit() {

  //   let moneyType = this.CreatePokerSitnGoForm.value.Currency;
  //   console.log(moneyType)
  //   let selectdeCaption = this.GamesConfigList.games.filter((game: any) => {
  //     return game.caption === this.CreatePokerSitnGoForm.value.GameType;
  //   });
  //   console.log(selectdeCaption);
  //   let finalCaption = selectdeCaption.filter((table: any) => {
  //     return table.wallet.hiLong === moneyType.hiLong && table.wallet.lowLong === moneyType.lowLong
  //   });
  //   console.log(finalCaption);

  //   let body = {
  //     "forceSave": false,
  //     "tourn": {
  //       // ************** Genaral
  //       "caption": this.CreatePokerSitnGoForm.value.Name,
  //       "description": this.CreatePokerSitnGoForm.value.Description,
  //       "password": this.CreatePokerSitnGoForm.value.Password,
  //       "gameName": finalCaption[0].name,
  //       "seats": this.CreatePokerSitnGoForm.value.Seats,
  //       "minPlayers": this.CreatePokerSitnGoForm.value.MinPlayers,
  //       "maxPlayers": this.CreatePokerSitnGoForm.value.MaxPlayers,
  //       "chipsPerPlayer": { "value": this.CreatePokerSitnGoForm.value.ChipsperPlayer },

  //       // **************Accessibility
  //       "accessRule": this.CreatePokerSitnGoForm.value.AccessRuleName,
  //       "chatAccessibility": this.CreatePokerSitnGoForm.value.ChatAccesability,
  //       "enableNow": this.CreatePokerSitnGoForm.value.EnableNow,

  //       // **************Prizes Settings
  //       "guarantedPrize": {
  //         "value": this.CreatePokerSitnGoForm.value.GuaranteedPrize,
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },
  //       "manualPrizePoolTourney": this.CreatePokerSitnGoForm.value.ManualPoolPrize,
  //       // "payoutTable": (this.CreatePokerTouranamentForm.value.PayoutTable).slice(8 ),
  //       "payoutId": this.CreatePokerSitnGoForm.value.PayoutTable, //need to send Payout table id

  //       "resultNotificationType": this.CreatePokerSitnGoForm.value.NotifyPlayersType,
  //       // "resultNotificationPlaces": this.CreatePokerSitnGoForm.value.NotifyPlayersPlaces,
  //       // "resultNotificationTemplateId": this.CreatePokerSitnGoForm.value.usingtemplate,


  //       // **************Buy In Settings
  //       "allowCash": this.CreatePokerSitnGoForm.value.Chips,
  //       "allowCompPoints": this.CreatePokerSitnGoForm.value.CompPoints,
  //       "allowTournamentMoney": this.CreatePokerSitnGoForm.value.TournamentMoney,
  //       "allowTournamentTickets": this.CreatePokerSitnGoForm.value.Tickets,
  //       "buyIn": {
  //         "value": this.CreatePokerSitnGoForm.value.BuyIn,
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },
  //       "fee": {
  //         "value": this.CreatePokerSitnGoForm.value.Fee,
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },
  //       "knockoutBounty": {
  //         "value": this.CreatePokerSitnGoForm.value.KnockoutBounty,
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },
  //       "totalCost": {
  //         "value": + parseInt(this.CreatePokerSitnGoForm.value.Fee) + parseInt(this.CreatePokerSitnGoForm.value.BuyIn) + parseInt(this.CreatePokerSitnGoForm.value.KnockoutBounty),
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },

  //       // ************** Advanced
  //       // ************** Level Settings
  //       "levelLength": this.CreatePokerSitnGoForm.value.LevelLengthmin * Math.floor(60 * 1000),
  //       "levelsBeforeBreak": this.CreatePokerSitnGoForm.value.LevelsbeforeBreak,
  //       "breakLength": this.CreatePokerSitnGoForm.value.BreakLengthMin * Math.floor(60 * 1000),
  //       "blindId": this.CreatePokerSitnGoForm.value.BlindStructure,
  //       "synchronizedTourney": this.CreatePokerSitnGoForm.value.SynchronizedBreak,
  //       "pauseOnFinalTable": this.CreatePokerSitnGoForm.value.PauseTournament,
  //       "descriptionForPauseOnFinalTable": this.CreatePokerSitnGoForm.value.MessagetoPlayers,

  //       // **************Time Out Settings
  //       "actionTimeOut": this.CreatePokerSitnGoForm.value.ActionTimeout * Math.floor(1000),
  //       "playerTimeBank": this.CreatePokerSitnGoForm.value.TimeBank * Math.floor(1000),
  //       "additionalTimeBank": this.CreatePokerSitnGoForm.value.TimeBankAutoincrementAmount * Math.floor(1000),

  //       // **************Hand to Hand Settings

  //       // "synchroModeType": this.CreatePokerSitnGoForm.value.BubbleFinalTable,
  //       "synchroModeType": {
  //         "hiLong": 0,
  //         "lowLong": 0
  //       },
  //       // "synchroModeType": this.synchroModeType,

  //       // **************Re-Buy
  //       "rebuyCount": 0,
  //       "addonCost": {
  //         "value": this.CreatePokerSitnGoForm.value.AddonCost,
  //         "wallet": this.CreatePokerSitnGoForm.value.Currency
  //       },
  //       "addonCount": 0,

  //       // "announcePeriodType": this.CreatePokerSitnGoForm.value.AnnouncePeriodType,
  //       "announcePeriodValue": 0,
  //       // "registrPeriodType": this.CreatePokerSitnGoForm.value.RegistrantionPeriodType,
  //       "registrPeriodValue": 0,
  //       // "completePeriodType": this.CreatePokerSitnGoForm.value.CompletedPeriodType,
  //       "completePeriodValue": 0,
  //       // "seatingPeriodType": this.CreatePokerSitnGoForm.value.SeatingPeriodType,
  //       "seatingPeriodValue": 0,

  //       // Extra Find
  //       "tourneyType": this.TourneyTypeList[1].guid,
  //       "numberInSeries": -1,
  //       "played": 0,
  //       "haveMessages": false,
  //       "shareType": { "hiLong": 0, "lowLong": 0 },
  //       "timeBased": false,
  //       "objState": 0,
  //     }
  //   }
  //   console.log(body)
  //   this.PokergamesService.setPokerTournamentSettings(body).subscribe((data) => console.log(data))
  // }

}
