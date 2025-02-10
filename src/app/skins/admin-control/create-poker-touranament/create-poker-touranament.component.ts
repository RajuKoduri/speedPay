import { Component, OnInit, Input , AfterViewInit, Output, EventEmitter, AfterContentChecked,AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { ToolsService } from 'src/app/source/Tools.service';



import { differenceInDays, subMonths } from 'date-fns';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CreatePokerSatelliteSeriesService } from 'src/app/source/create-poker-satellite-series.service';


@Component({
  selector: 'app-create-poker-touranament',
  templateUrl: './create-poker-touranament.component.html',
  styleUrls: ['./create-poker-touranament.component.css']
})
export class CreatePokerTouranamentComponent implements OnInit, AfterViewInit, AfterContentChecked{
  
  @Input() createTournamentPopup: boolean = false;
  @Input() onlyViewpopFromParent: boolean = false;
  @Input() selectedLanguageGuid: any = null;
  @Input() EditPokerTourneyData: any = null;
  @Input() editOptionMode: boolean = false;
  @Input() selectedViewItemViewOnly:any = null;


  @Output() exitSatellitePopup = new EventEmitter();
  @Output() filterbodyData: EventEmitter<any> = new EventEmitter<any>();
  // filterbodyData: EventEmitter<any> = new EventEmitter<any>();
  @Output() tournamentGameType = new EventEmitter();
  @Output() sendPayoutData = new EventEmitter();
  @Output() previousButton = new EventEmitter();
  @Output() nextButton = new EventEmitter();
  @Output() saveButtonEdit = new EventEmitter();
  @Output() closeEditPopup = new EventEmitter();



  tabName: string = "First";
  CreatePokerTouranamentForm: FormGroup;
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
  isChecked: string = "Once";
  MonthsList: any;
  TypeDayOfMonthList: any;
  LateRegistrationTypeList: any;
  TourneySynchroModeTypeList: any;
  TourneyTypeList: any;
  totalCostValue: any = 0;
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
  selectedViewItem: any = {};
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
  DailyStartedHeadingText: string = "";
  WeeklyDaysPresent: boolean = true;
  getWeeklyAddSpecifiedDaysText: string = "";
  MonthlyButtonRadiodisEnText: boolean = true;
  MonthlyMonthIndexes: any = [true, true, true, true, true, true, true, false, true, true, true, true]
  currentSelectMonthlyIndex: any;
  NumberOfMonthsToBeAdd: any;
  MonthlyTextDisorInable: any = true;
  OnlyOnceSeatingPeriodText: boolean = false;
  HourlySeatingPeriodText: boolean = false;
  DailySeatingPeriodText: boolean = false;
  WeeklySeatingPeriodText: boolean = false;
  MonthlySeatingPeriodText: boolean = false;
  tournamentErrorTextPopup: string = "";
  tournamentErrorTextBoolValue: boolean = false;
  ScheduleTypeList: any;
  ScheduleTypeGuid: any;
  filterbodyDateTime: any;
  filterbodyTime: any = 0;
  hourlyRepeatTime: any = 0;
  fillterbodyeveryWeekdays: boolean = false;
  fillterbodyeveryWeekend: boolean = false;
  filterbodyeveryDay: number = 1;
  NumberOfWeeks: any = 1;
  selectedWeekDayOfWeek: any = [1, 2, 3, 4, 5, 6, 7];
  selectedDayInMonth: any = 1;
  selectedMonthsInYear: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  weekdayOfMonth: any = 0;
  selectedtypeDayOfMonth: any;
  CreateSuccessPop: boolean = false;
  ErrorPopup: boolean = false;
  saveButton: boolean = false;
  currencyPlaymoney: boolean = false;
  LateRegistrationTypeListGuid: any = {};
  BlindStructurButton: boolean = false;
  PayoutButton: boolean = false;
  registrationperiodValu: Date = new Date();
  finalCaption: any = []
  breaklengthcal: any;
  successPopup: any;
  PayoutTicketTypeList: any = [];
  ticketTypes: any = [];
  
  AnnouncePeriodValue:any = 1;
  RegistrantionPeriodValue:any=6;
  CompletedPeriodValue:any=3;
  SeatingPeriodValue:any=1;







  constructor(private SatelliteSeriesService:CreatePokerSatelliteSeriesService,private router: Router, private PokergamesService: PokergamesService, private PlayerServiceService: PlayerServiceService, private ToolsService: ToolsService, private datePipe: DatePipe) {
    this.CreatePokerTouranamentForm = new FormGroup({
      // MoneyType: new FormControl("", [Validators.required,]),
      Name: new FormControl(""),
      Description: new FormControl("",),
      Password: new FormControl("",),
      GameType: new FormControl("", [Validators.required,]),
      Seats: new FormControl(2),
      MinPlayers: new FormControl(2),
      MaxPlayers: new FormControl(100,),
      ChipsperPlayer: new FormControl(2000),
      ChatAccesability: new FormControl("",),
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
      ProgressiveKnockoutCheck: new FormControl(false),
      KnockoutPercentage: new FormControl(),
      MarketingFee: new FormControl(0),
      KnockoutBountyCheck: new FormControl(false),
      KnockoutBounty: new FormControl(0),
      totalCost: new FormControl(),
      LevelLengthmin: new FormControl(8),
      LevelsbeforeBreak: new FormControl(7),
      BreakLengthMin: new FormControl(5),
      LevelsLengthAfterAddonBreak: new FormControl(),
      BreakLengthMinType: new FormControl(),
      BlindStructure: new FormControl(),
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
      RebuyFee: new FormControl(0),
      MarketingFeeRebuy: new FormControl(),
      MaxRebuysperPlayer: new FormControl(0, [Validators.required, Validators.maxLength(2)]),
      AddonCost: new FormControl(0),
      AddonAmount: new FormControl(0),
      AddonFee: new FormControl(),
      MarketingFeeAddon: new FormControl(),

      LateRegistrantion: new FormControl(false),
      LateRegistrantionRadio: new FormControl(),
      LateRegistrantionLevel: new FormControl(0),


      // StartTime: new FormControl((new Date()).toISOString().substring(0,10)),
      StartDate: new FormControl((new Date().toDateString())),
      // StartTime: new FormControl((new Date()).toISOString().substring(11 , 16)),
      StartTime: new FormControl((new Date()).toISOString().substring(11, 16)),
      Schedule: new FormControl("once"),
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
      HourlyStartTime: new FormControl(1),
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
      SelectedDaysInWeek: new FormControl(1),

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
  



  ngOnInit(): void {
    var date = new Date('2015-02-10T10:12:50.5000z');
    var date2 = new Date("2023-04-21T11:59:03.003Z[UTC]");
    console.log("Date", date.toDateString())
    console.log("Date", date.toUTCString())
    console.log("Date", date.toLocaleString())
    console.log("Date", date2.toDateString())
    this.startDate = new Date();
    this.time = this.startDate.getHours() + ":" + this.startDate.getMinutes() + ":" + this.startDate.getSeconds();
    console.log("Time", this.time)
    this.walletTypes();
    this.DYIDCHATACCESSIBILITY();
    this.UserAccessArea();
    this.usertype();
    this.GamesConfig();
    this.PayoutStructure();
    this.PayoutTicketType();
    this.TournamentResultNotificationType();
    this.TemplateCreationTypes();
    this.PeriodTypes();
    this.BirthdayMonths();
    this.TypeDayOfMonth();
    this.LateRegistrationType();
    this.TourneySynchroModeType();
    this.TourneyType();

    this.UserAccessRules();
    this.pokerPayoutStructureList();
    this.mailTempletes();
    this.BlindStructure();
    this.tournamentStartValidation();
    this.ScheduleType();
    this.onSelectedRadio(this.isChecked);

    console.log(this.CreatePokerTouranamentForm.value.NotifyPlayers)
    if (!this.CreatePokerTouranamentForm.value.NotifyPlayers) {
      this.CreatePokerTouranamentForm.get("NotifyPlayersType")?.disable();
      this.CreatePokerTouranamentForm.get("usingtemplate")?.disable();
      this.CreatePokerTouranamentForm.get("NotifyPlayersPlaces")?.disable();

    } else {
      this.CreatePokerTouranamentForm.get("NotifyPlayersType")?.enable();
      this.CreatePokerTouranamentForm.get("usingtemplate")?.enable();
      this.CreatePokerTouranamentForm.get("NotifyPlayersPlaces")?.enable();

    }
    this.CreatePokerTouranamentForm.get("NotifyPlayers")?.valueChanges.subscribe((checked) => {
      if (!checked) {
        // this.CreatePokerTouranamentForm.controls["NotifyPlayersType"]?.disable();
        this.CreatePokerTouranamentForm.get("NotifyPlayersType")?.disable();
        this.CreatePokerTouranamentForm.get("usingtemplate")?.disable();
        this.CreatePokerTouranamentForm.get("NotifyPlayersPlaces")?.disable();

      } else {
        this.CreatePokerTouranamentForm.get("NotifyPlayersType")?.enable();
        this.CreatePokerTouranamentForm.get("usingtemplate")?.enable();
        this.CreatePokerTouranamentForm.get("NotifyPlayersPlaces")?.enable();

      }
    });



    if (this.CreatePokerTouranamentForm.value.Freeroll) {
      this.freeRollCheckBoxStatus = true;
      this.freeRollCheckBoxStatus2 = false;
      this.CreatePokerTouranamentForm.get("BuyIn")?.disable();
      this.CreatePokerTouranamentForm.get("Fee")?.disable();
      this.CreatePokerTouranamentForm.get("MarketingFee")?.disable();
      this.CreatePokerTouranamentForm.get("KnockoutBountyCheck")?.disable();
      this.CreatePokerTouranamentForm.get("KnockoutBounty")?.disable();
      this.CreatePokerTouranamentForm.get("ProgressiveKnockoutCheck")?.disable();
      this.CreatePokerTouranamentForm.get("KnockoutPercentage")?.disable();

    } else {
      this.freeRollCheckBoxStatus = false;
      this.CreatePokerTouranamentForm.get("BuyIn")?.enable();
      this.CreatePokerTouranamentForm.get("Fee")?.enable();
      this.CreatePokerTouranamentForm.get("MarketingFee")?.enable();
      this.CreatePokerTouranamentForm.get("KnockoutBountyCheck")?.enable();
      this.CreatePokerTouranamentForm.get("KnockoutBounty")?.enable();
      this.CreatePokerTouranamentForm.get("ProgressiveKnockoutCheck")?.enable();
      this.CreatePokerTouranamentForm.get("KnockoutPercentage")?.enable();

    }

    this.CreatePokerTouranamentForm.get("Freeroll")?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.freeRollCheckBoxStatus = true;
        this.freeRollCheckBoxStatus2 = false;
        this.CreatePokerTouranamentForm.get("BuyIn")?.disable();
        this.CreatePokerTouranamentForm.get("Fee")?.disable();
        this.CreatePokerTouranamentForm.get("MarketingFee")?.disable();
        this.CreatePokerTouranamentForm.get("KnockoutBountyCheck")?.disable();
        this.CreatePokerTouranamentForm.get("KnockoutBounty")?.disable();
        this.CreatePokerTouranamentForm.get("ProgressiveKnockoutCheck")?.disable()
        this.CreatePokerTouranamentForm.get("KnockoutPercentage")?.disable()

      } else {
        this.freeRollCheckBoxStatus = false;
        this.CreatePokerTouranamentForm.get("BuyIn")?.enable();
        this.CreatePokerTouranamentForm.get("Fee")?.enable();
        this.CreatePokerTouranamentForm.get("MarketingFee")?.enable();
        this.CreatePokerTouranamentForm.get("KnockoutBountyCheck")?.enable();
        // this.CreatePokerTouranamentForm.get("KnockoutBounty")?.enable();

        this.CreatePokerTouranamentForm.get("ProgressiveKnockoutCheck")?.enable();
        this.CreatePokerTouranamentForm.get("KnockoutPercentage")?.enable();

      }

    })




    if (this.CreatePokerTouranamentForm.value.brandedTournament) {
      this.brandedURl = true;
      this.CreatePokerTouranamentForm.get("BrandedURl")?.enable();

    } else {
      this.brandedURl = false;
      this.CreatePokerTouranamentForm.get("BrandedURl")?.disable();

    }

    this.CreatePokerTouranamentForm.get("brandedTournament")?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.brandedURl = true;
        this.CreatePokerTouranamentForm.get("BrandedURl")?.enable();
      } else {
        this.brandedURl = false;
        this.CreatePokerTouranamentForm.get("BrandedURl")?.disable();
      }

    })



    if (!this.CreatePokerTouranamentForm.value.KnockoutBountyCheck) {
      this.freeRollCheckBoxStatus2 = false;
      this.CreatePokerTouranamentForm.get("KnockoutBounty")?.disable();
    } else {
      this.freeRollCheckBoxStatus2 = true;
      this.CreatePokerTouranamentForm.get("KnockoutBounty")?.enable();
    }

    this.CreatePokerTouranamentForm.get("KnockoutBountyCheck")?.valueChanges.subscribe((checked) => {
      if (!checked) {
        this.freeRollCheckBoxStatus2 = false;
        this.CreatePokerTouranamentForm.get("KnockoutBounty")?.disable();
      } else {
        this.freeRollCheckBoxStatus2 = true;
        this.CreatePokerTouranamentForm.get("KnockoutBounty")?.enable();
      }
    })


    if (this.CreatePokerTouranamentForm.value.Rebuys) {
      this.rebuysCheckbox = true;
      this.CreatePokerTouranamentForm.get("RebuyCost")?.enable();
      this.CreatePokerTouranamentForm.get("RebuyFee")?.enable();
      this.CreatePokerTouranamentForm.get("AddonFee")?.enable();
      this.CreatePokerTouranamentForm.get("RebuyAmount")?.enable();
      this.CreatePokerTouranamentForm.get("MaxRebuysperPlayer")?.enable();
      this.CreatePokerTouranamentForm.get("AddonCost")?.enable();
      this.CreatePokerTouranamentForm.get("AddonAmount")?.enable();
      this.CreatePokerTouranamentForm.get("MarketingFeeRebuy")?.enable();
      this.CreatePokerTouranamentForm.get("MarketingFeeAddon")?.enable();
    } else {
      this.rebuysCheckbox = false;
      this.CreatePokerTouranamentForm.get("RebuyCost")?.disable();
      this.CreatePokerTouranamentForm.get("RebuyFee")?.disable();
      this.CreatePokerTouranamentForm.get("AddonFee")?.disable();
      this.CreatePokerTouranamentForm.get("RebuyAmount")?.disable();
      this.CreatePokerTouranamentForm.get("MaxRebuysperPlayer")?.disable();
      this.CreatePokerTouranamentForm.get("AddonCost")?.disable();
      this.CreatePokerTouranamentForm.get("AddonAmount")?.disable();
      this.CreatePokerTouranamentForm.get("MarketingFeeRebuy")?.disable();
      this.CreatePokerTouranamentForm.get("MarketingFeeAddon")?.disable();
    }

    this.CreatePokerTouranamentForm.get("Rebuys")?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.rebuysCheckbox = true;
        this.CreatePokerTouranamentForm.get("RebuyCost")?.enable();
        this.CreatePokerTouranamentForm.get("RebuyFee")?.enable();
        this.CreatePokerTouranamentForm.get("AddonFee")?.enable();
        this.CreatePokerTouranamentForm.get("RebuyAmount")?.enable();
        this.CreatePokerTouranamentForm.get("MaxRebuysperPlayer")?.enable();
        this.CreatePokerTouranamentForm.get("AddonCost")?.enable();
        this.CreatePokerTouranamentForm.get("AddonAmount")?.enable();
        this.CreatePokerTouranamentForm.get("MarketingFeeRebuy")?.enable();
        this.CreatePokerTouranamentForm.get("MarketingFeeAddon")?.enable();

      } else {
        this.rebuysCheckbox = false;
        this.CreatePokerTouranamentForm.get("RebuyCost")?.disable();
        this.CreatePokerTouranamentForm.get("RebuyFee")?.disable();
        this.CreatePokerTouranamentForm.get("AddonFee")?.disable();
        this.CreatePokerTouranamentForm.get("RebuyAmount")?.disable();
        this.CreatePokerTouranamentForm.get("MaxRebuysperPlayer")?.disable();
        this.CreatePokerTouranamentForm.get("AddonCost")?.disable();
        this.CreatePokerTouranamentForm.get("AddonAmount")?.disable();
        this.CreatePokerTouranamentForm.get("MarketingFeeRebuy")?.disable();
        this.CreatePokerTouranamentForm.get("MarketingFeeAddon")?.disable();
      }
    })

    if (this.CreatePokerTouranamentForm.value.LateRegistrantion) {
      this.LateRegistrationclass = true
      this.CreatePokerTouranamentForm.get("LateRegistrantionRadio")?.enable();
      this.CreatePokerTouranamentForm.get("LateRegistrantionLevel")?.enable();

    } else {
      this.LateRegistrationclass = false
      this.CreatePokerTouranamentForm.get("LateRegistrantionRadio")?.disable();
      this.CreatePokerTouranamentForm.get("LateRegistrantionLevel")?.disable();

    }

    this.CreatePokerTouranamentForm.get("LateRegistrantion")?.valueChanges.subscribe((checked) => {
      console.log(this.CreatePokerTouranamentForm.value.LateRegistrantionLevel)
      if (checked) {
        this.LateRegistrationclass = true
        this.CreatePokerTouranamentForm.get("LateRegistrantionRadio")?.enable();
        // this.CreatePokerTouranamentForm.get("LateRegistrantionLevel")?.enable(); LateRegistrantionLevel
        if (this.CreatePokerTouranamentForm.value.LateRegistrantionRadio == "Level") {
          this.CreatePokerTouranamentForm.get("LateRegistrantionLevel")?.enable();
        }

      } else {
        this.LateRegistrationclass = false
        this.CreatePokerTouranamentForm.get("LateRegistrantionRadio")?.disable();
        this.CreatePokerTouranamentForm.get("LateRegistrantionLevel")?.disable();

      }
    })



    if (this.CreatePokerTouranamentForm.value.PauseTournament) {
      this.PauseTournamentClass = true
      this.CreatePokerTouranamentForm.get("MessagetoPlayers")?.enable();
    } else {
      this.PauseTournamentClass = false;
      this.CreatePokerTouranamentForm.get("MessagetoPlayers")?.disable()
    }

    this.CreatePokerTouranamentForm.get("PauseTournament")?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.PauseTournamentClass = true;
        this.CreatePokerTouranamentForm.get("MessagetoPlayers")?.enable();
      } else {
        this.PauseTournamentClass = false;
        this.CreatePokerTouranamentForm.get("MessagetoPlayers")?.disable();
      }
    });


    if (this.CreatePokerTouranamentForm.value.DailyButtonRadio == "Every") {
      this.SelectedDaysInDailyButtonRadioCss = true
      this.CreatePokerTouranamentForm.get("SelectedDaysInDailyButtonRadio")?.enable();

    } else {
      this.SelectedDaysInDailyButtonRadioCss = false
      this.CreatePokerTouranamentForm.get("SelectedDaysInDailyButtonRadio")?.disable();
    }

    this.CreatePokerTouranamentForm.get("DailyButtonRadio")?.valueChanges.subscribe((checked) => {
      if (checked == "Every") {
        this.SelectedDaysInDailyButtonRadioCss = true
        this.CreatePokerTouranamentForm.get("SelectedDaysInDailyButtonRadio")?.enable();

      } else {
        this.SelectedDaysInDailyButtonRadioCss = false
        this.CreatePokerTouranamentForm.get("SelectedDaysInDailyButtonRadio")?.disable();
      }

    })


    if (this.CreatePokerTouranamentForm.value.MonthlyButtonRadio == "Days") {
      this.MonthlyButtonRadiodisEnText = true;
      this.CreatePokerTouranamentForm.get('MonthlySelectedInputDays')?.enable();
      this.CreatePokerTouranamentForm.get("MonthlyButtonSelectedWeek")?.disable();
      this.CreatePokerTouranamentForm.get("MonthlyButtonSelectedWeekDay")?.disable();

    } else {
      this.MonthlyButtonRadiodisEnText = false;
      this.CreatePokerTouranamentForm.get('MonthlySelectedInputDays')?.disable();
      this.CreatePokerTouranamentForm.get("MonthlyButtonSelectedWeek")?.enable();
      this.CreatePokerTouranamentForm.get("MonthlyButtonSelectedWeekDay")?.enable();
    }

    this.CreatePokerTouranamentForm.get("MonthlyButtonRadio")?.valueChanges.subscribe((checked) => {
      this.MonthlyButtonRadiodisEnText = true
      if (checked == "Days") {
        this.CreatePokerTouranamentForm.get("MonthlySelectedInputDays")?.enable();
        this.CreatePokerTouranamentForm.get("MonthlyButtonSelectedWeek")?.disable();
        this.CreatePokerTouranamentForm.get("MonthlyButtonSelectedWeekDay")?.disable();

      } else {
        this.MonthlyButtonRadiodisEnText = false
        this.CreatePokerTouranamentForm.get("MonthlySelectedInputDays")?.disable();
        this.CreatePokerTouranamentForm.get("MonthlyButtonSelectedWeek")?.enable();
        this.CreatePokerTouranamentForm.get("MonthlyButtonSelectedWeekDay")?.enable();
      }
    })



    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].clubGameWallet == true) {
        // if (this.wallettypelist[i].description == "Argentine Peso") {
          if (this.wallettypelist[i].clubGameWallet == true && this.wallettypelist[i].description != "Play Money") {
          this.currencyList.push(this.wallettypelist[i])
        }
        this.selectedCurrency = this.currencyList[0]?.guid;
        if (this.currencyList[0]?.guid) {
          this.onSelected(this.selectedCurrency);

        }
      }
      console.log("currencyList", this.currencyList);
      console.log("wallettypelist", this.wallettypelist);

    }


    


  }

  ngAfterViewInit() {

    if (this.createTournamentPopup) {
      this.CreatePokerTouranamentForm.patchValue({
        Tickets:true
      })
    }
    console.log(this.selectedLanguageGuid)
    console.log(this.currencyList)
    for(let i=0; i< this.currencyList.length; i++){
      if(this.currencyList[i]?.currency?.hiLong ==this.selectedLanguageGuid?.hiLong &&
        this.currencyList[i]?.currency?.lowLong ==this.selectedLanguageGuid?.lowLong){
        this.selectedCurrency = this.currencyList[i]?.guid;
          this.onSelected();
          this.SelectedChip();
        break;
      }
    }

    if (this.EditPokerTourneyData?.shedule?.type === "Hourly") {
      this.HourlyPopupDefault = true;
    } else {
      this.HourlyPopupDefault = false;
    }

    console.log(this.EditPokerTourneyData)


    if (this.EditPokerTourneyData != null) {
      this.isChecked = this.EditPokerTourneyData?.shedule?.type
      let gethours;
      let remainingMilliseconds;
      let minutes;

      if (this.EditPokerTourneyData?.shedule?.everyTime) {
        gethours = Math.round(this.EditPokerTourneyData?.shedule?.everyTime / (1000 * 60 * 60));
        remainingMilliseconds = this.EditPokerTourneyData?.shedule?.everyTime % (1000 * 60 * 60);
        minutes = Math.round(remainingMilliseconds / (1000 * 60));

      }

      console.log("gethours   : ---", gethours);
      console.log("minutes   : --", minutes)







      console.log(this.EditPokerTourneyData.shedule.startDate.slice(0, -6));
      if(this.EditPokerTourneyData.shedule.startDate){

        let dateTime = this.EditPokerTourneyData.shedule.startDate.split("T"[0])[1]
        let dateAndTime = dateTime.split('Z'[0])[0]
        console.log(dateAndTime);

        const utcDate = new Date(this.EditPokerTourneyData.shedule.startDate.slice(0, -5)); // Input UTC date
        const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })); // Convert to India Standard Time (IST)
  
        this.startDate = localDate.toString();
        let hours = localDate.getHours();
        console.log(localDate)
  
        console.log(this.startDate);
  
  
        this.CreatePokerTouranamentForm?.get('StartDate')?.setValue(localDate.toISOString().slice(0, 10));

      }
     




      for (let i = 0; this.selectedTimeBreak.length; i++) {
        if (this.EditPokerTourneyData?.breakLength < 3600000 && this.EditPokerTourneyData?.breakLength < 3600000) {

          this.breaklengthcal = this.EditPokerTourneyData?.breakLength / 60000
          if (this.selectedTimeBreak[i]?.value === "Minutes") {
            this.BreakLengthMinTypeDefaultOption = this.selectedTimeBreak[i]?.value;
            break
          }
        }

        else if (this.EditPokerTourneyData?.breakLength >= 3600000 && this.EditPokerTourneyData?.breakLength < 86400000) {

          this.breaklengthcal = this.EditPokerTourneyData?.breakLength / 3600000;
          if (this.selectedTimeBreak[i]?.value === "Hours") {
            this.BreakLengthMinTypeDefaultOption = this.selectedTimeBreak[i]?.value;
            break
          }

        } else if (this.EditPokerTourneyData?.breakLength >= 86400000) {

          this.breaklengthcal = this.EditPokerTourneyData?.breakLength / 86400000;
          if (this.selectedTimeBreak[i]?.value === "Days") {
            this.BreakLengthMinTypeDefaultOption = this.selectedTimeBreak[i]?.value;
            break
          }

        }
      }


      // 
      // SelectedDaysInDailyButtonRadio:this.EditPokerTourneyData?.shedule?.everyDay,
      // SelectedDaysInDailyButtonRadio:this.EditPokerTourneyData?.shedule?.everyDay,

      if (this.EditPokerTourneyData?.shedule?.everyDay > 0) {
        this.CreatePokerTouranamentForm.patchValue({
          SelectedDaysInDailyButtonRadio: this.EditPokerTourneyData?.shedule?.everyDay,
          DailyButtonRadio: "Every"
        })
      } else if (this.EditPokerTourneyData?.shedule?.everyWeekdays === true) {
        this.CreatePokerTouranamentForm.patchValue({
          DailyButtonRadio: "Weekdays"
        })

      } else if (this.EditPokerTourneyData?.shedule?.everyWeekend === true) {
        this.CreatePokerTouranamentForm.patchValue({
          DailyButtonRadio: "Weekend"
        })

      }




      if (this.EditPokerTourneyData?.shedule?.daysOfWeek) {
        for (let eachDay of this.EditPokerTourneyData?.shedule?.daysOfWeek) {
          if (eachDay == 1) {
            this.CreatePokerTouranamentForm.patchValue({ WeeklyMonday: "1" });
            break;
          } else {
            this.CreatePokerTouranamentForm.patchValue({ WeeklyMonday: false });
            break;
          }
        }
        for (let eachDay of this.EditPokerTourneyData?.shedule?.daysOfWeek) {
          if (eachDay == 2) {
            this.CreatePokerTouranamentForm.patchValue({ WeeklyTuesday: "2" });
            break;

          } else {
            this.CreatePokerTouranamentForm.patchValue({ WeeklyTuesday: false })
          }
        }


        for (let eachDay of this.EditPokerTourneyData?.shedule?.daysOfWeek) {
          if (eachDay == 3) {
            this.CreatePokerTouranamentForm.patchValue({ WeeklyWednesday: "3" });
            break;
          } else {
            this.CreatePokerTouranamentForm.patchValue({ WeeklyWednesday: false })
          }
        }


        for (let eachDay of this.EditPokerTourneyData?.shedule?.daysOfWeek) {
          if (eachDay == 4) {
            this.CreatePokerTouranamentForm.patchValue({ WeeklyThursday: "4" });
            break;
          } else {
            this.CreatePokerTouranamentForm.patchValue({ WeeklyThursday: false })
          }
        }


        for (let eachDay of this.EditPokerTourneyData?.shedule?.daysOfWeek) {
          if (eachDay == 5) {
            this.CreatePokerTouranamentForm.patchValue({ WeeklyFriday: "5" });
            break;
          } else {
            this.CreatePokerTouranamentForm.patchValue({ WeeklyFriday: false })
          }
        }


        for (let eachDay of this.EditPokerTourneyData?.shedule?.daysOfWeek) {
          if (eachDay == 6) {
            this.CreatePokerTouranamentForm.patchValue({ WeeklySaturday: "6" })
            break;
          } else {
            this.CreatePokerTouranamentForm.patchValue({ WeeklySaturday: false })
          }
        }


        for (let eachDay of this.EditPokerTourneyData?.shedule?.daysOfWeek) {
          if (eachDay == 7) {
            this.CreatePokerTouranamentForm.patchValue({ WeeklySunday: "0" });
            break;
          } else {
            this.CreatePokerTouranamentForm.patchValue({ WeeklySunday: false })
          }




        }

      }

      if (this.EditPokerTourneyData?.shedule?.monthOfYear) {

        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 1) {
            this.changeSelectedMonthsResult(true, 0);
            break;
          } else {
            this.changeSelectedMonthsResult(false, 0)

          }
        }



        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 2) {
            this.changeSelectedMonthsResult(true, 1)
            break;
          } else {
            this.changeSelectedMonthsResult(false, 1)

          }
        }

        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 3) {
            this.changeSelectedMonthsResult(true, 2)
            break;
          } else {
            this.changeSelectedMonthsResult(false, 2)

          }
        }

        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 4) {
            this.changeSelectedMonthsResult(true, 3)
            break;
          } else {
            this.changeSelectedMonthsResult(false, 3)

          }
        }

        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 5) {
            this.changeSelectedMonthsResult(true, 4)
            break;
          } else {
            this.changeSelectedMonthsResult(false, 4)

          }
        }

        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 6) {
            this.changeSelectedMonthsResult(true, 5)
            break;
          } else {
            this.changeSelectedMonthsResult(false, 5)

          }
        }

        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 7) {
            this.changeSelectedMonthsResult(true, 6)
            break;
          } else {
            // this.MonthlyMonthIndexes[6] =false;
            this.changeSelectedMonthsResult(false, 6)

          }
        }


        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 8) {
            this.changeSelectedMonthsResult(true, 7)
            break;
          } else {
            this.changeSelectedMonthsResult(false, 7)

          }
        }

        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 9) {
            this.changeSelectedMonthsResult(true, 8)
            break;
          } else {
            this.changeSelectedMonthsResult(false, 8)

          }
        }


        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 10) {
            this.changeSelectedMonthsResult(true, 9)
            break;
          } else {
            this.changeSelectedMonthsResult(false, 9)

          }
        }

        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 11) {
            this.changeSelectedMonthsResult(true, 10)
            break;
          } else {
            this.changeSelectedMonthsResult(false, 10)

          }
        }

        for (let eachDay of this.EditPokerTourneyData?.shedule?.monthOfYear) {
          if (eachDay == 12) {
            this.changeSelectedMonthsResult(true, 11)
            break;
          } else {
            this.changeSelectedMonthsResult(false, 11)

          }
        }


      }

      if (this.EditPokerTourneyData?.shedule?.dayOfMonth >= 1) {
        this.CreatePokerTouranamentForm.patchValue({
          MonthlyButtonRadio: "Days",
          MonthlySelectedInputDays: this.EditPokerTourneyData?.shedule?.dayOfMonth
        })

      } else {
        console.log(this.TypeDayOfMonthList)
        for (let z = 0; z < this.TypeDayOfMonthList.length; z++) {
          if (this.TypeDayOfMonthList[z]?.guid?.hiLong == this.EditPokerTourneyData?.shedule?.typeDayOfMonth?.hiLong && this.TypeDayOfMonthList[z]?.guid?.lowLong === this.EditPokerTourneyData?.shedule?.typeDayOfMonth?.lowLong) {
            this.CreatePokerTouranamentForm.patchValue({
              MonthlyButtonRadio: "The",
              MonthlyButtonSelectedWeek: this.TypeDayOfMonthList[z]?.value

            })
            break;

          }

          if (this.EditPokerTourneyData?.shedule) {
            switch (this.EditPokerTourneyData?.shedule?.weekdayOfMonth) {
              case 0:
                this.CreatePokerTouranamentForm.patchValue({
                  MonthlyButtonSelectedWeekDay: "Monday"
                })
                break;
              case 1:
                this.CreatePokerTouranamentForm.patchValue({
                  MonthlyButtonSelectedWeekDay: "Tuesday"
                })
                break;
              case 2:
                this.CreatePokerTouranamentForm.patchValue({
                  MonthlyButtonSelectedWeekDay: "Wednesday"
                })
                break;
              case 3:
                this.CreatePokerTouranamentForm.patchValue({
                  MonthlyButtonSelectedWeekDay: "Thursday"
                })
                break;
              case 4:
                this.CreatePokerTouranamentForm.patchValue({
                  MonthlyButtonSelectedWeekDay: "Firday"
                })
                break;
              case 5:
                this.CreatePokerTouranamentForm.patchValue({
                  MonthlyButtonSelectedWeekDay: "Saturday"
                })
                break;
              case 6:
                this.CreatePokerTouranamentForm.patchValue({
                  MonthlyButtonSelectedWeekDay: "Sunday"
                })
                break;
              default:
                break;

            }
          }



        }

      }

      this.CreatePokerTouranamentForm.patchValue({
        // MoneyType: this.EditPokerTourneyData?.pot.wallet,
        Name: this.EditPokerTourneyData?.caption,
        Description: this.EditPokerTourneyData?.description,
        Password: this.EditPokerTourneyData?.password,

        HourlyStartTime: gethours,
        HourlyStartMinute: minutes,
        SelectedDaysInWeek: this.EditPokerTourneyData?.shedule?.everyWeeks,
        Seats: this.EditPokerTourneyData?.seats,
        MinPlayers: this.EditPokerTourneyData?.minPlayers,
        MaxPlayers: this.EditPokerTourneyData?.maxPlayers,
        ChipsperPlayer: this.EditPokerTourneyData?.chipsPerPlayer.value,

        GameType: this.EditPokerTourneyData?.gameName,
        TableGroupName: this.EditPokerTourneyData?.name,

        EnableNow: this.EditPokerTourneyData?.enableNow,
        GuaranteedPrize: this.EditPokerTourneyData?.guarantedPrize.value,
        ManualPoolPrize: this.EditPokerTourneyData?.manualPrizePoolTourney,
        EqualPrize: this.EditPokerTourneyData?.tournamentManualDistributionV2Equal,
        StackBased: this.EditPokerTourneyData?.tournamentManualDistributionV2Stack,
        ICM: this.EditPokerTourneyData?.icmBasedDistribution,

        Chips: this.EditPokerTourneyData?.allowCash,
        CompPoints: this.EditPokerTourneyData?.allowCompPoints,
        brandedTournament: this.EditPokerTourneyData?.brandedTourney,
        TournamentMoney: this.EditPokerTourneyData?.allowTournamentMoney,
        Tickets: this.EditPokerTourneyData?.allowTournamentTickets,

        BrandedURl: this.EditPokerTourneyData?.brandedTourneyImage,
        BuyIn: this.EditPokerTourneyData?.buyIn?.value,
        Fee: this.EditPokerTourneyData?.fee?.value,
        MarketingFee: (this.EditPokerTourneyData?.maintenanceFee?.value != null && this.EditPokerTourneyData?.maintenanceFee?.value != "" ) ? this.EditPokerTourneyData?.maintenanceFee?.value:0 ,

        // KnockoutBounty: this.EditPokerTourneyData?.brandedTourneyImage,
        KnockoutBounty: this.EditPokerTourneyData?.knockoutBounty?.value,
        ProgressiveKnockoutCheck: this.EditPokerTourneyData?.progressiveKnockOutTournaments,
        KnockoutPercentage: this.EditPokerTourneyData?.progressiveKnockOutTournamentPercentage,

        LevelLengthmin: this.EditPokerTourneyData?.levelLength / 60000,
        LevelsbeforeBreak: this.EditPokerTourneyData?.levelsBeforeBreak,
        // LevelsLengthAfterAddonBreak: this.EditPokerTourneyData?.breakTimeAfterAddon / 60000,
        LevelsLengthAfterAddonBreak: this.EditPokerTourneyData?.breakTimeAfterAddon,
        BreakLengthMin: this.breaklengthcal,
        // BreakLengthMin: +(this.EditPokerTourneyData?.breakLength) / 60000,
        BlindStructure: this.EditPokerTourneyData?.blindId,
        SynchronizedBreak: this.EditPokerTourneyData?.synchronizedTourney,
        PauseTournament: this.EditPokerTourneyData?.pauseOnFinalTable,
        MessagetoPlayers: this.EditPokerTourneyData?.descriptionForPauseOnFinalTable,

        ActionTimeout: this.EditPokerTourneyData?.actionTimeOut / 1000,
        TimeBank: this.EditPokerTourneyData?.playerTimeBank / 1000,
        TimeBankAutoincrementAmount: this.EditPokerTourneyData?.additionalTimeBank / 1000,


        RebuyCost: this.EditPokerTourneyData?.rebuyCost?.value,
        RebuyFee: 0,
        MarketingFeeRebuy: this.EditPokerTourneyData?.maintenanceFeesRebuy?.value,
        RebuyAmount: this.EditPokerTourneyData?.rebuyChips?.value,
        MaxRebuysperPlayer: this.EditPokerTourneyData?.rebuyCount,
        AddonCost: this.EditPokerTourneyData?.addonCost?.value,
        AddonFee: this.EditPokerTourneyData?.additionalTimeBank.value,
        MarketingFeeAddon: this.EditPokerTourneyData?.maintenanceFeesAddOn?.value,
        AddonAmount: this.EditPokerTourneyData?.addonChips?.value,

        // AnnouncePeriodValue: this.EditPokerTourneyData?.announcePeriodValue,
        // RegistrantionPeriodValue: this.EditPokerTourneyData?.registrPeriodValue,
        // CompletedPeriodValue: this.EditPokerTourneyData?.completePeriodValue,
        // SeatingPeriodValue: this.EditPokerTourneyData?.seatingPeriodValue,
      })


      console.log(this.ChatAccessibilityList)
      console.log(this.EditPokerTourneyData?.chatAccessibility)
      this.totalCostValue = this.EditPokerTourneyData?.totalCost.value
      if (this.EditPokerTourneyData?.rebuyCost?.value > 0 || this.EditPokerTourneyData?.maintenanceFeesRebuy?.value > 0 || this.EditPokerTourneyData?.rebuyChips?.value > 0
        || this.EditPokerTourneyData?.rebuyCount > 0 || this.EditPokerTourneyData?.addonCost?.value >> 0 || this.EditPokerTourneyData?.additionalTimeBank?.value > 0 || this.EditPokerTourneyData?.maintenanceFeesAddOn?.value > 0
        || this.EditPokerTourneyData?.addonChips?.value > 0) {
        // this.CreatePokerTouranamentForm.value.Rebuys=true;
        this.CreatePokerTouranamentForm.patchValue({
          Rebuys: true
        })
      }
      if (this.EditPokerTourneyData?.knockoutBounty.value > 0) {
        this.CreatePokerTouranamentForm.get("KnockoutBountyCheck")?.enable();
        this.CreatePokerTouranamentForm.patchValue({
          KnockoutBountyCheck:true
        })

      }else{
        this.CreatePokerTouranamentForm.patchValue({
          KnockoutBountyCheck:false
        })

      }
      console.log(this.Onlygamescaption)
      for (const each of this.Onlygamescaption) {
        if (each === this.EditPokerTourneyData?.gameName) {
          this.defaultSelectedOption = each
        }
      }
      console.log(this.defaultSelectedOption)
      this.CreatePokerTouranamentForm.get("GameType")?.disable();
      this.CreatePokerTouranamentForm.get("Currency")?.disable();
      for (const each of this.ChatAccessibilityList) {
        if (each.guid?.lowLong == this.EditPokerTourneyData?.chatAccessibility?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.chatAccessibility?.hiLong) {
          this.ChatAccessvalue = each?.guid;
          break;
        }
      }
      console.log(this.ChatAccessvalue)

      console.log(this.currencyList)

      for (const each of this.currencyList) {
        console.log(each.guid?.lowLong == this.EditPokerTourneyData?.addonCost?.wallet?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.addonCost?.wallet?.hiLong)
        if (each.guid?.lowLong == this.EditPokerTourneyData?.addonCost?.wallet?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.addonCost?.wallet?.hiLong) {
          this.selectedCurrency = each.guid;
          break;
        }
      }
      console.log(this.selectedCurrency)
      this.SelectedChip();
      this.tournamentStartValidation();

      console.log(this.ResultNotificationTypeList)
      for (const each of this.ResultNotificationTypeList) {
        if (each.guid?.lowLong == this.EditPokerTourneyData?.resultNotificationType?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.resultNotificationType?.lowLong) {
          this.ResultNotificationValue = each.guid
          this.CreatePokerTouranamentForm.get("NotifyPlayersType")?.enable();
          this.CreatePokerTouranamentForm.get("usingtemplate")?.enable();
          this.CreatePokerTouranamentForm.get("NotifyPlayersPlaces")?.enable();
          this.CreatePokerTouranamentForm.patchValue({
            NotifyPlayers: true
          })
          this.CreatePokerTouranamentForm.value.NotifyPlayers = true;
          this.CreatePokerTouranamentForm.value.NotifyPlayersPlaces = this.EditPokerTourneyData?.resultNotificationPlaces;

        } else {
          this.CreatePokerTouranamentForm.get("NotifyPlayersType")?.disable();
          this.CreatePokerTouranamentForm.get("usingtemplate")?.disable();
          this.CreatePokerTouranamentForm.get("NotifyPlayersPlaces")?.disable();
          this.CreatePokerTouranamentForm.patchValue({
            NotifyPlayers: false
          })
        }
      }
      console.log(this.ResultNotificationValue)


      console.log(this.TourneySynchroModeTypeList)
      for (const each of this.TourneySynchroModeTypeList) {
        if (each.guid?.lowLong == this.EditPokerTourneyData.synchroModeType?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData.synchroModeType?.hiLong) {
          this.defaultTournamentMoneyCheck = each.guid
        }
      }
      console.log(this.defaultTournamentMoneyCheck)

      console.log(this.pokerBlindStructureResData)
      for (const each of this.pokerBlindStructureResData) {
        // BlindStructure: this.EditPokerTourneyData?.blindId,
        if (each.guid?.lowLong == this.EditPokerTourneyData.blindId?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData.blindId?.hiLong) {
          console.log(each)
          break
        }
      }
      console.log(this.LateRegistrationTypeList)
      for (const each of this.LateRegistrationTypeList) {
        console.log(each.guid?.lowLong == this.EditPokerTourneyData.lateRegistrationType?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData.lateRegistrationType?.hiLong)
        if (each.guid?.lowLong == this.EditPokerTourneyData.lateRegistrationType?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData.lateRegistrationType?.hiLong) {
          if (each.value === "None") {
            this.CreatePokerTouranamentForm.patchValue({
              LateRegistrantion: false,
            })
            this.defaultlateRegistationChange = this.LateRegistrationTypeList[1].value;
          } else {
            this.CreatePokerTouranamentForm.patchValue({
              LateRegistrantion: true,
            })
            this.defaultlateRegistationChange = each.value;
          }
          break
        }
      }
      console.log(this.defaultTournamentMoneyCheck)
      console.log(this.defaultlateRegistationChange)
      console.log(this.SeletedPeriodTypes);

      this.AnnouncePeriodValue = this.EditPokerTourneyData?.announcePeriodValue
      this.RegistrantionPeriodValue = this.EditPokerTourneyData?.registrPeriodValue
      this.CompletedPeriodValue = this.EditPokerTourneyData?.completePeriodValue
      this.SeatingPeriodValue = this.EditPokerTourneyData?.seatingPeriodValue
      setTimeout(()=>{
        for (const each of this.SeletedPeriodTypes) {
          // if (each.guid == this.EditPokerTourneyData?.shedule.announcePeriodType) {
          if (each.guid?.lowLong == this.EditPokerTourneyData?.announcePeriodType?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.announcePeriodType?.hiLong) {
            this.AnnouncePeriodDefaultValue = each.guid
          }
          console.log(this.AnnouncePeriodDefaultValue)
          if (each.guid?.lowLong == this.EditPokerTourneyData?.registrPeriodType?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.registrPeriodType?.hiLong) {
            this.RegistrantionPeriodDefaultValue = each.guid
          }
          if (each.guid?.lowLong == this.EditPokerTourneyData?.completePeriodType?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.completePeriodType?.hiLong) {
            this.CompletedPeriodDefaultValue = each?.guid;
          }
        }
        for (const each of this.SeletedTimePeriods) {
          if (each.guid?.lowLong == this.EditPokerTourneyData?.seatingPeriodType?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.seatingPeriodType?.hiLong) {
            this.SeatingPeriodDefaultValue = each.guid;
          }
        }
      },100)
      
    }

    // this.tournamentStartValidation();
    console.log(this.startDate)
    console.log(this.CreatePokerTouranamentForm.value.StartDate)
    console.log(this.CreatePokerTouranamentForm.value.StartTime);

    this.onSelectedRadio(this.EditPokerTourneyData?.shedule?.type)
  }

  


  ngAfterContentChecked() {

    console.log(this.pokerBlindStructureResData)
    if (this.EditPokerTourneyData) {

      
    if (this.onlyViewpopFromParent === true) {
      this.CreatePokerTouranamentForm.disable();
      if(this.selectedViewItemViewOnly != null){
        this.selectedViewItem = this.selectedViewItemViewOnly
        console.log(this.selectedViewItemViewOnly)
      }
      // this.CreatePokerTouranamentForm.get("BlindStructure")?.disable();
      // this.CreatePokerTouranamentForm.get("PayoutTable")?.disable();

    }



      for (const each of this.pokerBlindStructureResData) {
        // BlindStructure: this.EditPokerTourneyData?.blindId,
        if (each.guid?.lowLong == this.EditPokerTourneyData.blindId?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData.blindId?.hiLong) {
          console.log(each)
          this.defaultBlindStuctureOption = each.guid
          break
        }
      }
      console.log(this.UserAccessRulesResData)
      for (const each of this.UserAccessRulesResData) {
        if (each.guid?.lowLong == this.EditPokerTourneyData?.accessRule?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.accessRule?.hiLong)
          this.UserAccessValue = each?.guid;
        break;
      }
      console.log(this.UserAccessValue)
      for (const each of this.OnlyFloatPayoutTables) {
        if (each.guid?.lowLong == this.EditPokerTourneyData?.payoutId?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.payoutId?.hiLong) {
          this.pokerPayoutValue = each.guid;
          this.ViewPayoutTable()
        }
        // console.log(this.pokerPayoutValue)
      }
      console.log(this.getMailTemplatesResData)
      // if (this.EditPokerTourneyData?.getMailTemplatesResData) {
      if (this.EditPokerTourneyData?.resultNotificationTemplateId) {

        for (const each of this.getMailTemplatesResData) {
          console.log(each.guid?.lowLong == this.EditPokerTourneyData?.resultNotificationTemplateId?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.resultNotificationTemplateId?.hiLong)
          if (each.guid?.lowLong == this.EditPokerTourneyData?.resultNotificationTemplateId?.lowLong && each.guid?.hiLong == this.EditPokerTourneyData?.resultNotificationTemplateId?.hiLong) {

            this.getMailTemplateValue = each.guid
          }
        }
        // }
        console.log(this.getMailTemplateValue)
      }
    }

   




   
    // for (const each of this.SeletedPeriodTypes) {
    //   // if (each.guid == this.EditPokerTourneyData?.shedule.announcePeriodType) {
    //   if (each.guid.lowLong == this.EditPokerTourneyData?.announcePeriodType.lowLong && each.guid.hiLong == this.EditPokerTourneyData?.announcePeriodType.hiLong) {
    //     this.AnnouncePeriodDefaultValue = each.guid;
    //   }
    //   console.log(this.AnnouncePeriodDefaultValue)
    //   if (each.guid.lowLong == this.EditPokerTourneyData?.registrPeriodType.lowLong && each.guid.hiLong == this.EditPokerTourneyData?.registrPeriodType.hiLong) {
    //     this.RegistrantionPeriodDefaultValue = each.guid;
    //   }
    //   if (each.guid.lowLong == this.EditPokerTourneyData?.completePeriodType.lowLong && each.guid.hiLong == this.EditPokerTourneyData?.completePeriodType.hiLong) {
    //     this.CompletedPeriodDefaultValue = each?.guid;
    //   }
    // }
    // for (const each of this.SeletedTimePeriods) {
    //   if (each.guid.lowLong == this.EditPokerTourneyData?.seatingPeriodType.lowLong && each.guid.hiLong == this.EditPokerTourneyData?.seatingPeriodType.hiLong) {
    //     this.SeatingPeriodDefaultValue = each.guid;
    //   }
    // }

  }
  

  changeSelectedMonthsResult(bool: any, months: any) {
    this.currentSelectMonthlyIndex = months
    console.log(this.currentSelectMonthlyIndex);
    this.MonthlyMonthIndexes[months] = bool
    console.log(bool);
    if (this.currentSelectMonthlyIndex >= 0) {
      this.tournamentStartValidation()
      console.log(this.MonthlyMonthIndexes[months])
    }
  }


  





  SelectedChip() {
    for (let i = 0; i < this.walletFormats.length; i++) {
      if (this.walletFormats[i].guid?.hiLong == this.selectedCurrency?.hiLong && this.walletFormats[i].guid?.lowLong == this.selectedCurrency?.lowLong) {
        console.log(this.walletFormats[i]);
        if (this.walletFormats[i].currencyCode) {
          this.chip = this.walletFormats[i].currencyCode
        } else {
          for (let j = 0; this.currencyList.length; j++) {
            console.log(this.currencyList[j].guid?.hiLong, this.currencyList[j].guid?.lowLong)
            if (this.currencyList[j].guid?.hiLong == this.selectedCurrency?.hiLong && this.currencyList[j].guid?.lowLong == this.selectedCurrency?.lowLong) {
              this.chip = this.currencyList[j].description
              break
            }

          }

        }
      }
    }
  }




  changeCheckBoxsUserActions(data: string) {
    console.log(data)
    if (data == "Equal") {
      this.CreatePokerTouranamentForm.patchValue({
        // EqualPrize: true,
        StackBased: false,
        ICM: false
      })
    } else if (data == 'Stack') {
      this.CreatePokerTouranamentForm.patchValue({
        EqualPrize: false,
        // StackBased: true,
        ICM: false
      })
    } else if (data == "ICM") {
      this.CreatePokerTouranamentForm.patchValue({
        EqualPrize: false,
        StackBased: false,
        // ICM: true
      })
    }

  }


  ScheduleType() {
    const ScheduleType = localStorage.getItem('ScheduleType');
    if (ScheduleType) {
      const aa = JSON.parse(ScheduleType)
      this.ScheduleTypeList = aa.slice(2, aa.length)
    }
    console.log(this.ScheduleTypeList)


    if (this.EditPokerTourneyData != null) {
      if(this.EditPokerTourneyData.shedule.startDate){

        console.log(this.EditPokerTourneyData.shedule.startDate.slice(0, -6));
      let dateTime = this.EditPokerTourneyData.shedule.startDate.split("T"[0])[1]
      let dateAndTime = dateTime.split('Z'[0])[0]
      console.log(dateAndTime);
      const utcDate = new Date(this.EditPokerTourneyData.shedule.startDate.slice(0, -5)); // Input UTC date
      const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })); // Convert to India Standard Time (IST)

      this.startDate = localDate.toString();
      console.log(localDate)

      console.log(this.startDate);
      this.CreatePokerTouranamentForm?.get('StartDate')?.setValue(localDate.toISOString()?.slice(0, 10));
      this.CreatePokerTouranamentForm.patchValue({
        StartTime: dateAndTime?.split(".")?.[0],
      })
      }
      

    }

  }

  changeToPreviousTabs() {
    console.log(this.counterValue)
    if (this.counterValue >= 0 && this.counterValue <= 2) {

      console.log(this.counterValue);

      if (this.counterValue == 1) {
        this.counterValue -= 1;
        this.tabName = "First";
        this.prevButtonCss = false;
        this.nextButtonCss = true;


      } else if (this.counterValue == 2) {
        this.counterValue -= 1;
        this.tabName = "Second";
        this.prevButtonCss = true;
        this.nextButtonCss = true;

      }
    }
    // if(this.EditPokerTourneyData !=null){
    // this.previousButton.emit(this.prevButtonCss);
    // this.nextButton.emit(this.nextButtonCss);

    this.SatelliteSeriesService.clickOnpreviousButton(this.prevButtonCss);
    this.SatelliteSeriesService.clickOnnextsButton(this.nextButtonCss)

    // }



  }



  changeToNextTabs() {
    console.log(this.counterValue)
    if (this.counterValue >= 0 && this.counterValue <= 2) {
      console.log(this.counterValue)

      if (this.counterValue == 0) {
        this.counterValue += 1
        this.tabName = "Second";
        this.prevButtonCss = true;
        this.nextButtonCss = true;
      } else if (this.counterValue == 1) {
        this.counterValue += 1;
        this.tabName = "Third";
        this.prevButtonCss = true;
        this.nextButtonCss = false;
      }


    }

    // if(this.EditPokerTourneyData !=null){
    // this.previousButton.emit(this.prevButtonCss);
    // this.nextButton.emit(this.nextButtonCss);

    this.SatelliteSeriesService.clickOnpreviousButton(this.prevButtonCss);
    this.SatelliteSeriesService.clickOnnextsButton(this.nextButtonCss)

    // }







  }


  checkBoxChangestus(event: any) {
    this.checkedStatus = this.CreatePokerTouranamentForm.value.NotifyPlayers
    console.log(this.checkedStatus)

    // this.CreatePokerTouranamentForm.patchValue({
    //   Password: {value: '', disabled: true},
    // });
    // this.CreatePokerTouranamentForm.controls['Password'].enable();

  }

  SelectedDisselect(data: any) {
    console.log(data)
    if (this.CreatePokerTouranamentForm.value.Freeroll == true) {
      this.CreatePokerTouranamentForm.value.Chips = false
    }
  }
  unchekFreeroll(data: any) {
    console.log(data)
    this.FreerollCheck = this.CreatePokerTouranamentForm.value.Freeroll;
    this.ChipsCheck = this.CreatePokerTouranamentForm.value.Chips;
    this.CompPointsCheck = this.CreatePokerTouranamentForm.value.CompPoints;
    this.TournamentMoneyCheck = this.CreatePokerTouranamentForm.value.TournamentMoney;
    this.TicketsCheck = this.CreatePokerTouranamentForm.value.Tickets;
    console.log(this.FreerollCheck);
    if (!this.ChipsCheck && !this.CompPointsCheck && !this.TournamentMoneyCheck && !this.TicketsCheck) {
      this.CreatePokerTouranamentForm.patchValue({
        Freeroll: true,
      });
    } else {
      this.CreatePokerTouranamentForm.patchValue({
        Freeroll: false,
      });
    }
    // this.CreatePokerTouranamentForm.value.Freeroll = false;

    console.log(this.CreatePokerTouranamentForm)
    console.log(this.CreatePokerTouranamentForm.value.ProgressiveKnockoutCheck)
  }
  BuyInSettings(data: any) {
    this.freeRollCheckBoxStatus = this.CreatePokerTouranamentForm.value.Freeroll;
    // this.freeRollCheckBoxStatus = data.target.checked;
    console.log(data)
    this.FreerollCheck = this.CreatePokerTouranamentForm.value.Freeroll;
    console.log(this.FreerollCheck);
    if (this.FreerollCheck === true) {
      this.CreatePokerTouranamentForm.patchValue({
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
      this.CreatePokerTouranamentForm.patchValue({
        Chips: true
      })
    }
  }
  onStartDateChange($event: { [x: string]: string; }) {
    console.log($event);
    // this.startDate = $event["month"] + "-" + $event["day"] + "-" + $event["year"];
    // this.startDate = $event["day"] + "-" + $event["month"] + "-" + $event["year"];
  }
  getTab(data: any, index: any) {
    this.tabName = data;
    this.counterValue = index;
    console.log(this.counterValue);

    console.log(data)
    console.log(index)
    if (index == 0) {
      this.prevButtonCss = false;
      this.nextButtonCss = true;

    } else if (index == 1) {
      this.prevButtonCss = true;
      this.nextButtonCss = true;

    } else if (index == 2) {
      this.prevButtonCss = true;
      this.nextButtonCss = false;
    }

    // this.previousButton.emit(this.prevButtonCss);
    // this.nextButton.emit(this.nextButtonCss);
    this.SatelliteSeriesService.clickOnpreviousButton(this.prevButtonCss);
    this.SatelliteSeriesService.clickOnnextsButton(this.nextButtonCss)

  }


  Rebuy(data: any, id: any) {
    console.log(this.LateRegistrationTypeList)
    // this.lateRegistationChange(this.CreatePokerTouranamentForm.get("LateRegistrantionLevel"))
    console.log(data);
    // console.log(this.CreatePokerTouranamentForm.value.NotifyPlayersType.hiLong);
    // console.log(this.CreatePokerTouranamentForm.value.NotifyPlayersType.lowLong);
    // if (this.CreatePokerTouranamentForm.value.NotifyPlayersType.hiLong == 0 && this.CreatePokerTouranamentForm.value.NotifyPlayersType.lowLong == 2) {
    if (this.CreatePokerTouranamentForm.get('NotifyPlayersType')?.value?.hiLong == 0 && this.CreatePokerTouranamentForm.get('NotifyPlayersType')?.value?.lowLong == 2) {
      this.placesVarible = true
    } else {
      this.placesVarible = false

    }
    console.log(id);
    if (id == "Rebuys") {
      this.Rebuycheck = this.CreatePokerTouranamentForm.value.Rebuys;
      console.log(this.Rebuycheck)
      this.isDisabled = this.Rebuycheck
    }
    if (id == "RegistrantionSettings") {
      this.RegistrantionSettings = this.CreatePokerTouranamentForm.value.LateRegistrantion

    }
  }

  lateRegistationChange(data: any) {
    console.log(data.target.value);

    if (data.target.value == "Level") {

      this.CreatePokerTouranamentForm.get("LateRegistrantionLevel")?.enable();

    } else {
      this.CreatePokerTouranamentForm.get("LateRegistrantionLevel")?.disable();

    }
  }


  totalCost(e: any = "", value: any ="") {
    console.log(e.target.value)
    console.log(value)
    if (this.CreatePokerTouranamentForm.value.KnockoutBountyCheck) {
      this.totalCostValue = parseInt(this.CreatePokerTouranamentForm.value.BuyIn) + parseInt(this.CreatePokerTouranamentForm.value.Fee) + parseInt(this.CreatePokerTouranamentForm.value.KnockoutBounty)+parseInt(this.CreatePokerTouranamentForm.value.MarketingFee)
      // this.totalCostValue = parseInt(this.CreatePokerTouranamentForm.value.BuyIn) + parseInt(this.CreatePokerTouranamentForm.value.Fee) + parseInt(this.CreatePokerTouranamentForm.value.KnockoutBounty)
    } else {
      this.totalCostValue = parseInt(this.CreatePokerTouranamentForm.value.BuyIn) + parseInt(this.CreatePokerTouranamentForm.value.Fee)+parseInt(this.CreatePokerTouranamentForm.value.MarketingFee)
      // this.totalCostValue = parseInt(this.CreatePokerTouranamentForm.value.BuyIn) + parseInt(this.CreatePokerTouranamentForm.value.Fee)
    }
    console.log("totalCostValue", this.totalCostValue)
  }

  KnockoutBounty(e: any="") {
    console.log(e)
    console.log(e.target.value)
    console.log(this.CreatePokerTouranamentForm.value.KnockoutBountyCheck)
    this.KnockoutBountyCheck = this.CreatePokerTouranamentForm.value.KnockoutBountyCheck;
    if (this.KnockoutBountyCheck == true) {
      console.log("true")
    } else {
      console.log("False")
      this.CreatePokerTouranamentForm.patchValue({
        KnockoutBounty: 0
      })
      this.totalCostValue = parseInt(this.CreatePokerTouranamentForm.value.BuyIn) + parseInt(this.CreatePokerTouranamentForm.value.Fee)+parseInt(this.CreatePokerTouranamentForm.value.MarketingFee)
      // this.totalCostValue = parseInt(this.CreatePokerTouranamentForm.value.BuyIn) + parseInt(this.CreatePokerTouranamentForm.value.Fee)
    }

    console.log("totalCostValue", this.totalCostValue)
    
  }
  walletTypes() {
    // const walletstypes = localStorage.getItem('walletTypes');
    // if (walletstypes) {
    //   this.wallettypelist = JSON.parse(walletstypes);
    //   console.log(this.wallettypelist)
    //   for (let i = 0; i < this.wallettypelist.length; i++) {
    //     if (this.wallettypelist[i].clubGameWallet == true) {
    //       this.currencyList.push(this.wallettypelist[i])
    //     }
    //     this.selectedCurrency = this.wallettypelist[0].guid
    //   }
    //   console.log("currencyList", this.currencyList)
    //   console.log("wallettypelist", this.wallettypelist)

    // }
  }

  DYIDCHATACCESSIBILITY() {
    const DYIDCHATACCESSIBILITY = localStorage.getItem("DYIDCHATACCESSIBILITY")
    if (DYIDCHATACCESSIBILITY) {
      this.ChatAccessibilityList = JSON.parse(DYIDCHATACCESSIBILITY)
      this.ChatAccessvalue = this.ChatAccessibilityList[2]?.guid
    }
    console.log("ChatAccessibilityList", this.ChatAccessibilityList)
    console.log(this.ChatAccessvalue)

  }
  usertype() {
    const usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
      console.log("usertypeList", this.usertypeList)
      console.log("usertypeList", this.usertypeList[0].guid)
    }
  }
  UserAccessArea() {
    const UserAccessArea = localStorage.getItem('UserAccessArea')
    if (UserAccessArea) {
      this.UserAccessAreaList = JSON.parse(UserAccessArea)
      this.accessAreas.push(this.UserAccessAreaList[8]?.guid, this.UserAccessAreaList[13]?.guid)
    }
    console.log("UserAccessAreaList", this.UserAccessAreaList)
    // console.log("UserAccessAreaList[8]", this.UserAccessAreaList[8])
    // console.log("UserAccessAreaList[13]", this.UserAccessAreaList[13])
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


  UserAccessRules() {
    let body = {
      "firstRecord": 0,
      "maxCountRecord": 100,
      "accessAreas": this.accessAreas,
      "userType": this.usertypeList[0]?.guid
    }
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
              if (this.pokerPayoutStructureRes[i].structureType?.lowLong == this.PayoutStructureList[j].guid?.lowLong && this.pokerPayoutStructureRes[i].structureType?.hiLong == this.PayoutStructureList[j].guid?.hiLong) {
                this.pokerPayoutStructureRes[i].structureType = this.PayoutStructureList[j].value
              }
            }
            // if (this.pokerPayoutStructureRes[i].structureType == "Float") {
            //   this.OnlyFloatPayoutTables.push(this.pokerPayoutStructureRes[i])
            // }

            if (this.createTournamentPopup || this.EditPokerTourneyData?.satelliteEdit) {
              console.log("true");
              this.OnlyFloatPayoutTables.push(this.pokerPayoutStructureRes[i]);
            } else {
              console.log("false");
              if (this.pokerPayoutStructureRes[i].structureType == "Float") {
                this.OnlyFloatPayoutTables.push(this.pokerPayoutStructureRes[i]);
              }

            }
          }
          console.log("OnlyFloatPayoutTables", this.OnlyFloatPayoutTables);
          this.pokerPayoutValue = this.OnlyFloatPayoutTables[0].guid;
          this.selectedIndex = 0;
          this.selectedViewItem = this.OnlyFloatPayoutTables[this.selectedIndex]
          this.PayoutButton = false;
          this.CreatePokerTouranamentForm.get("PayoutTable")?.enable()

        }
      } else {
        if (this.OnlyFloatPayoutTables == "") {
          this.CreatePokerTouranamentForm.get("PayoutTable")?.disable()
          this.PayoutButton = true;
        }

      }

    }
    )
  }
  BlindStructure() {
    let body = {}
    this.PokergamesService.getBlindStructureList(body).subscribe((data) => {
      if (data.objectList) {
        this.pokerBlindStructureResData = data.objectList;
        console.log("pokerBlindStructureResData", this.pokerBlindStructureResData)
        this.defaultBlindStuctureOption = this.pokerBlindStructureResData[0]?.guid
        this.selectedBlindStructureIndex = 0
        this.selectedBlindStructureView = this.pokerBlindStructureResData[0]
        this.CreatePokerTouranamentForm.get("BlindStructure")?.enable();
        this.BlindStructurButton = false;

      } else {
        if (this.pokerBlindStructureResData == "") {
          this.CreatePokerTouranamentForm.get("BlindStructure")?.disable();
          this.BlindStructurButton = true;

        }

      }

    })
  }
  TournamentResultNotificationType() {
    const TournamentResultNotificationType = localStorage.getItem("TournamentResultNotificationType")
    if (TournamentResultNotificationType) {
      this.ResultNotificationTypeList = JSON.parse(TournamentResultNotificationType)
      this.ResultNotificationValue = this.ResultNotificationTypeList[0].guid;
    }
    console.log("ResultNotificationTypeList", this.ResultNotificationTypeList)
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
    if (payload) {
      let body = payload.guid

      this.ToolsService.getMailTemplatesByType(body).subscribe((data) => {
        if (data?.objectList) {
          this.getMailTemplatesResData = data.objectList;
          console.log(this.getMailTemplatesResData);
          console.log(data.objectList);
          if (this.getMailTemplatesResData) {
            this.getMailTemplateValue = this.getMailTemplatesResData[0].guid;
            console.log(this.getMailTemplateValue);
          }
        }
      })

    }
  }
  PeriodTypes() {
    const PeriodTypes = localStorage.getItem("PeriodTypes");
    if (PeriodTypes) {
      this.PeriodTypesList = JSON.parse(PeriodTypes)
    }
    console.log("PeriodTypesList", this.PeriodTypesList)
    for (let i = 0; i < this.PeriodTypesList?.length; i++) {
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



    }
    this.BreakLengthMinTypeDefaultOption = this.selectedTimeBreak[0]?.value;

    this.AnnouncePeriodDefaultValue = this.SeletedPeriodTypes[2]?.guid


    // this.CreatePokerTouranamentForm.patchValue({
    //   AnnouncePeriodType:this.AnnouncePeriodDefaultValue
    // })

    this.RegistrantionPeriodDefaultValue = this.SeletedPeriodTypes[1]?.guid;

    this.CompletedPeriodDefaultValue = this.SeletedPeriodTypes[1]?.guid;

    this.SeatingPeriodDefaultValue = this.SeletedTimePeriods[1]?.guid;

    console.log("selectedTimeBreak ", this.selectedTimeBreak);
    console.log("SeletedPeriodTypes", this.SeletedPeriodTypes);
    console.log("SeletedTimePeriods", this.SeletedTimePeriods);
    console.log(this.startDate)
    console.log(this.time)
    console.log(this.currentD)



  }

  // changeOmAnnouncePeriod(data: any) {
  //   // console.log(data)
  //   console.log(this.AnnouncePeriodDefaultValue)
  //   console.log(this.CreatePokerTouranamentForm.value.AnnouncePeriodType)

  // }
  changeSelectedMonths(event: any, months: any) {
    this.currentSelectMonthlyIndex = months
    console.log(this.currentSelectMonthlyIndex);
    this.MonthlyMonthIndexes[months] = event.target.checked
    console.log(event.target.checked);
    if (this.currentSelectMonthlyIndex >= 0) {
      this.tournamentStartValidation()
      console.log(this.MonthlyMonthIndexes[months])
    }
  }


  registationPeriodValidationStart(selectedRegistationItem:any,selectedItem:any,inputFieldsDateTime:any,currentDataTime:any){

    console.log(this.RegistrantionPeriodDefaultValue)

    // const selectedRegistationItem =  this.SeletedPeriodTypes.filter((eachItem: any) => {
    //   if (this.RegistrantionPeriodDefaultValue.hiLong == eachItem.guid.hiLong && this.RegistrantionPeriodDefaultValue.lowLong == eachItem.guid.lowLong) {
    //     console.log(eachItem)
    //     return eachItem
    //   }
    // })
    console.log(selectedRegistationItem[0].value)
    console.log(this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue)


    // <---------------------------------------------Months START ----------------------------------->

    if (selectedRegistationItem[0].value == "Months") {
      if ((selectedItem[0].value == "Months" || selectedItem[0].value == "Weeks" || selectedItem[0].value == "Days" || selectedItem[0].value == "Hours" || selectedItem[0].value == "Minutes") && selectedRegistationItem[0].value == "Months") {
        if (this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue > this.CreatePokerTouranamentForm.value.AnnouncePeriodValue) {
          this.AnnouncePeriodTextCss = false
          this.AnnouncePeriodHeading = "Announcement should start before registration"
          this.AnnounceTextString = ""

        }

      }
      const dateTimeAfterSubstractMonths = this.substractSpecifiedMonths(inputFieldsDateTime, this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue);
      console.log(dateTimeAfterSubstractMonths)
      this.registrationperiodValu = dateTimeAfterSubstractMonths;

      const formattedNameOfTheWeek = this.datePipe.transform(dateTimeAfterSubstractMonths, "EEEE");
      const formattedDayOfMonth = this.datePipe.transform(dateTimeAfterSubstractMonths, 'd'); // Day of the month (1-31)
      const formattedMonthFullName = this.datePipe.transform(dateTimeAfterSubstractMonths, 'MMMM'); // Full name of the month
      const formattedFullYear = this.datePipe.transform(dateTimeAfterSubstractMonths, 'yyyy'); // Full year
      const formattedTime = this.datePipe.transform(dateTimeAfterSubstractMonths, 'HH:mm');


      const timeDifference = Math.abs(currentDataTime.getTime() - dateTimeAfterSubstractMonths.getTime());
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

      // if(inputFieldsDateTime >= dateTimeAfterSubstractMonths){
      if (currentDataTime >= dateTimeAfterSubstractMonths || this.modifiedDateSub.getTime() > this.registrationperiodValu.getTime()) {

        this.registrationPeriodTextCss = false;
        this.registrationPeriodHeading = "Registration start time has passed"
        this.registrationPeriodText = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) ago.`


      } else {

        this.registrationPeriodTextCss = true;
        this.registrationPeriodHeading = "Tournament registration will start on"
        this.registrationPeriodText = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) left.`

      }
    }


    // <---------------------------------------------Months ENDS ----------------------------------->

    // <---------------------------------------------Weeks START ----------------------------------->
    if (selectedRegistationItem[0].value == "Weeks") {
      if ((selectedItem[0].value == "Weeks" || selectedItem[0].value == "Days" || selectedItem[0].value == "Hours" || selectedItem[0].value == "Minutes") && selectedRegistationItem[0].value == "Weeks") {
        if (this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue > this.CreatePokerTouranamentForm.value.AnnouncePeriodValue) {
          this.AnnouncePeriodTextCss = false
          this.AnnouncePeriodHeading = "Announcement should start before registration"
          this.AnnounceTextString = ""

        }

      }
      const dateTimeAfterSubstractWeeks = this.substractSpecifiedWeeks(inputFieldsDateTime, this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue);
      console.log(dateTimeAfterSubstractWeeks);
      this.registrationperiodValu = dateTimeAfterSubstractWeeks

      const formattedNameOfTheWeek = this.datePipe.transform(dateTimeAfterSubstractWeeks, "EEEE");
      const formattedDayOfMonth = this.datePipe.transform(dateTimeAfterSubstractWeeks, 'd'); // Day of the month (1-31)
      const formattedMonthFullName = this.datePipe.transform(dateTimeAfterSubstractWeeks, 'MMMM'); // Full name of the month
      const formattedFullYear = this.datePipe.transform(dateTimeAfterSubstractWeeks, 'yyyy'); // Full year
      const formattedTime = this.datePipe.transform(dateTimeAfterSubstractWeeks, 'HH:mm');


      const timeDifference = Math.abs(currentDataTime.getTime() - dateTimeAfterSubstractWeeks.getTime());
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

      // if(inputFieldsDateTime >= dateTimeAfterSubstractWeeks){
      if (currentDataTime >= dateTimeAfterSubstractWeeks || this.modifiedDateSub.getTime() > this.registrationperiodValu.getTime()) {

        this.registrationPeriodTextCss = false;
        this.registrationPeriodHeading = "Registration start time has passed"
        this.registrationPeriodText = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) ago.`


      } else {

        this.registrationPeriodTextCss = true;
        this.registrationPeriodHeading = "Tournament registration will start on"
        this.registrationPeriodText = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) left.`

      }
    }
    // <---------------------------------------------Weeks ENDS ----------------------------------->


    // <---------------------------------------------Days START ----------------------------------->
    console.log(this.CreatePokerTouranamentForm.value.AnnouncePeriodValue)
    if (selectedRegistationItem[0].value == "Days") {
      if ((selectedItem[0].value == "Days" || selectedItem[0].value == "Hours" || selectedItem[0].value == "Minutes") && selectedRegistationItem[0].value == "Days") {
        if (this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue > this.CreatePokerTouranamentForm.value.AnnouncePeriodValue) {
          this.AnnouncePeriodTextCss = false
          this.AnnouncePeriodHeading = "Announcement should start before registration"
          this.AnnounceTextString = ""

        }

      }
      const dateTimeAfterSubstractDays = this.substractSpecifieddays(inputFieldsDateTime, this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue);
      console.log(dateTimeAfterSubstractDays);
      this.registrationperiodValu = dateTimeAfterSubstractDays


      const formattedNameOfTheWeek = this.datePipe.transform(dateTimeAfterSubstractDays, "EEEE");
      const formattedDayOfMonth = this.datePipe.transform(dateTimeAfterSubstractDays, 'd'); // Day of the month (1-31)
      const formattedMonthFullName = this.datePipe.transform(dateTimeAfterSubstractDays, 'MMMM'); // Full name of the month
      const formattedFullYear = this.datePipe.transform(dateTimeAfterSubstractDays, 'yyyy'); // Full year
      const formattedTime = this.datePipe.transform(dateTimeAfterSubstractDays, 'HH:mm');


      const timeDifference = Math.abs(currentDataTime.getTime() - dateTimeAfterSubstractDays.getTime());
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

      // if(inputFieldsDateTime >= dateTimeAfterSubstractDays){
      if (currentDataTime >= dateTimeAfterSubstractDays || this.modifiedDateSub.getTime() > this.registrationperiodValu.getTime()) {

        this.registrationPeriodTextCss = false;
        this.registrationPeriodHeading = "Registration start time has passed"
        this.registrationPeriodText = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) ago.`


      } else {

        this.registrationPeriodTextCss = true;
        this.registrationPeriodHeading = "Tournament registration will start on"
        this.registrationPeriodText = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) left.`

      }
    }
    // <---------------------------------------------Days START ----------------------------------->

    // <---------------------------------------------Hours  START----------------------------------->

    if (selectedRegistationItem[0].value == "Hours") {
      if ((selectedItem[0].value == "Hours" || selectedItem[0].value == "Minutes") && selectedRegistationItem[0].value == "Hours") {
        if (this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue > this.CreatePokerTouranamentForm.value.AnnouncePeriodValue) {
          this.AnnouncePeriodTextCss = false
          this.AnnouncePeriodHeading = "Announcement should start before registration"
          this.AnnounceTextString = ""

        }

      }
      const dateTimeAfterSubstractHours = this.substractSpecifiedHours(inputFieldsDateTime, this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue);
      console.log(dateTimeAfterSubstractHours);
      if(dateTimeAfterSubstractHours){
      this.registrationperiodValu = dateTimeAfterSubstractHours
      const formattedNameOfTheWeek = this.datePipe.transform(dateTimeAfterSubstractHours, "EEEE");
      const formattedDayOfMonth = this.datePipe.transform(dateTimeAfterSubstractHours, 'd'); // Day of the month (1-31)
      const formattedMonthFullName = this.datePipe.transform(dateTimeAfterSubstractHours, 'MMMM'); // Full name of the month
      const formattedFullYear = this.datePipe.transform(dateTimeAfterSubstractHours, 'yyyy'); // Full year
      const formattedTime = this.datePipe.transform(dateTimeAfterSubstractHours, 'HH:mm');


      const timeDifference = Math.abs(currentDataTime.getTime() - dateTimeAfterSubstractHours.getTime());
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

      // if(inputFieldsDateTime >= dateTimeAfterSubstractHours){
      if (currentDataTime >= dateTimeAfterSubstractHours || this.modifiedDateSub.getTime() > this.registrationperiodValu.getTime()) {

        this.registrationPeriodTextCss = false;
        this.registrationPeriodHeading = "Registration start time has passed"
        this.registrationPeriodText = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) ago.`


      } else {

        this.registrationPeriodTextCss = true;
        this.registrationPeriodHeading = "Tournament registration will start on"
        this.registrationPeriodText = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) left.`

      }

      }
      
    }


    // <---------------------------------------------Hours END ------------------------------------->


    // <---------------------------------------------Minutes END ------------------------------------->

    if (selectedRegistationItem[0].value == "Minutes") {
      if (selectedItem[0].value == "Minutes" && selectedRegistationItem[0].value == "Minutes") {
        if (this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue > this.CreatePokerTouranamentForm.value.AnnouncePeriodValue) {
          this.AnnouncePeriodTextCss = false
          this.AnnouncePeriodHeading = "Announcement should start before registration"
          this.AnnounceTextString = ""

        }

      }
      const dateTimeAfterSubstractMinutes = this.substractSpeciMinutes(inputFieldsDateTime, this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue);
      console.log(dateTimeAfterSubstractMinutes);
      this.registrationperiodValu = dateTimeAfterSubstractMinutes


      const formattedNameOfTheWeek = this.datePipe.transform(dateTimeAfterSubstractMinutes, "EEEE");
      const formattedDayOfMonth = this.datePipe.transform(dateTimeAfterSubstractMinutes, 'd'); // Day of the month (1-31)
      const formattedMonthFullName = this.datePipe.transform(dateTimeAfterSubstractMinutes, 'MMMM'); // Full name of the month
      const formattedFullYear = this.datePipe.transform(dateTimeAfterSubstractMinutes, 'yyyy'); // Full year
      const formattedTime = this.datePipe.transform(dateTimeAfterSubstractMinutes, 'HH:mm');


      const timeDifference = Math.abs(currentDataTime.getTime() - dateTimeAfterSubstractMinutes.getTime());
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

      // if(inputFieldsDateTime >= dateTimeAfterSubstractMinutes){
      if (currentDataTime >= dateTimeAfterSubstractMinutes || this.modifiedDateSub.getTime() > this.registrationperiodValu.getTime()) {

        this.registrationPeriodTextCss = false;
        this.registrationPeriodHeading = "Registration start time has passed"
        this.registrationPeriodText = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) ago.`


      }
      else {

        this.registrationPeriodTextCss = true;
        this.registrationPeriodHeading = "Tournament registration will start on"
        this.registrationPeriodText = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) left.`

      }
    }
    // <---------------------------------------------Minutes END ------------------------------------->

    this.announcePeriodValidationStart(selectedRegistationItem,selectedItem,inputFieldsDateTime,currentDataTime,)
  }

  announcePeriodValidationStart(selectedRegistationItem:any,selectedItem:any,inputFieldsDateTime:any,currentDataTime:any,){

    console.log(this.AnnouncePeriodDefaultValue)
    console.log(this.CreatePokerTouranamentForm.value.AnnouncePeriodType)
    // {hiLong: 0, lowLong: 3}


    console.log(this.SeletedPeriodTypes)
    // <---------------------------------------Months START---------------------------------------------------->
    if (selectedItem[0].value == "Months") {
      console.log(this.CreatePokerTouranamentForm.value.AnnouncePeriodValue)
      this.modifiedDateSub = this.substractSpecifiedMonths(inputFieldsDateTime, this.CreatePokerTouranamentForm.value.AnnouncePeriodValue);
      console.log("current date : ", currentDataTime);
      console.log("DateTime After deduct specified days", this.modifiedDateSub);

      const formattedNameOfTheWeek = this.datePipe.transform(this.modifiedDateSub, "EEEE");
      const formattedDayOfMonth = this.datePipe.transform(this.modifiedDateSub, 'd'); // Day of the month (1-31)
      const formattedMonthFullName = this.datePipe.transform(this.modifiedDateSub, 'MMMM'); // Full name of the month
      const formattedFullYear = this.datePipe.transform(this.modifiedDateSub, 'yyyy'); // Full year
      const formattedTime = this.datePipe.transform(this.modifiedDateSub, 'HH:mm');


      const timeDifference = Math.abs(currentDataTime.getTime() - this.modifiedDateSub.getTime());
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      // if(currentDataTime >= this.modifiedDateSub){
      if (this.CreatePokerTouranamentForm.value.AnnouncePeriodValue == "") {
        this.AnnouncePeriodTextCss = false
        this.AnnouncePeriodHeading = "Announcement should start before registration"
        this.AnnounceTextString = ""
      } else if (currentDataTime.getTime() > this.modifiedDateSub.getTime() || this.modifiedDateSub.getTime() > this.registrationperiodValu.getTime()) {
        this.AnnouncePeriodTextCss = false
        this.AnnouncePeriodHeading = "Announcement start time has passed"
        this.AnnounceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
      ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) ago.`

      }
      else if (currentDataTime.getTime() <= this.modifiedDateSub.getTime() && this.modifiedDateSub.getTime() <= this.registrationperiodValu.getTime()) {
        this.AnnouncePeriodTextCss = true
        this.AnnouncePeriodHeading = "Tournament announcement will start time on"
        this.AnnounceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
      ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) left.`

      } else if (selectedItem[0].value == "Months" && selectedRegistationItem[0].value == "Months") {
        if (this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue > this.CreatePokerTouranamentForm.value.AnnouncePeriodValue) {
          this.AnnouncePeriodTextCss = false
          this.AnnouncePeriodHeading = "Announcement should start before registration"
          this.AnnounceTextString = ""

        }
      }

    }
    // <---------------------------------------- Months END------------------------------------------------------->


    // <---------------------------------------Weeks START---------------------------------------------------->

    if (selectedItem[0].value == "Weeks") {
      console.log(this.CreatePokerTouranamentForm.value.AnnouncePeriodValue)
      this.modifiedDateSub = this.substractSpecifiedWeeks(inputFieldsDateTime, this.CreatePokerTouranamentForm.value.AnnouncePeriodValue);
      console.log("current date : ", currentDataTime);
      console.log("DateTime After deduct specified days", this.modifiedDateSub);

      const formattedNameOfTheWeek = this.datePipe.transform(this.modifiedDateSub, "EEEE");
      const formattedDayOfMonth = this.datePipe.transform(this.modifiedDateSub, 'd'); // Day of the month (1-31)
      const formattedMonthFullName = this.datePipe.transform(this.modifiedDateSub, 'MMMM'); // Full name of the month
      const formattedFullYear = this.datePipe.transform(this.modifiedDateSub, 'yyyy'); // Full year
      const formattedTime = this.datePipe.transform(this.modifiedDateSub, 'HH:mm');


      const timeDifference = Math.abs(currentDataTime.getTime() - this.modifiedDateSub.getTime());
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      // if(currentDataTime >= this.modifiedDateSub){
      if (this.CreatePokerTouranamentForm.value.AnnouncePeriodValue == "") {
        this.AnnouncePeriodTextCss = false
        this.AnnouncePeriodHeading = "Announcement should start before registration"
        this.AnnounceTextString = ""
      } else if (currentDataTime.getTime() > this.modifiedDateSub.getTime() || this.modifiedDateSub.getTime() > this.registrationperiodValu.getTime()) {
        this.AnnouncePeriodTextCss = false
        this.AnnouncePeriodHeading = "Announcement start time has passed"
        this.AnnounceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
      ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) ago.`

      }
      else if (currentDataTime.getTime() <= this.modifiedDateSub.getTime() && this.modifiedDateSub.getTime() <= this.registrationperiodValu.getTime()) {
        this.AnnouncePeriodTextCss = true
        this.AnnouncePeriodHeading = "Tournament announcement will start time on"
        this.AnnounceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
      ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) left.`

      }
      else if (selectedItem[0].value == "Weeks" && (selectedRegistationItem[0].value == "Weeks" || selectedRegistationItem[0].value == "Months")) {
        if (this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue > this.CreatePokerTouranamentForm.value.AnnouncePeriodValue) {
          this.AnnouncePeriodTextCss = false
          this.AnnouncePeriodHeading = "Announcement should start before registration"
          this.AnnounceTextString = ""

        }

      }

    }
    // <--------------------------------------Weeks ENDS----------------------------------------------------->


    // <---------------------------------------DAYS START----------------------------------------------------->
    if (selectedItem[0].value == "Days") {
      console.log(this.CreatePokerTouranamentForm.value.AnnouncePeriodValue)


      this.modifiedDateSub = this.substractSpecifieddays(inputFieldsDateTime, this.CreatePokerTouranamentForm.value.AnnouncePeriodValue);
      console.log("current date : ", currentDataTime);
      console.log("DateTime After deduct specified days", this.modifiedDateSub);

      const formattedNameOfTheWeek = this.datePipe.transform(this.modifiedDateSub, "EEEE");
      const formattedDayOfMonth = this.datePipe.transform(this.modifiedDateSub, 'd'); // Day of the month (1-31)
      const formattedMonthFullName = this.datePipe.transform(this.modifiedDateSub, 'MMMM'); // Full name of the month
      const formattedFullYear = this.datePipe.transform(this.modifiedDateSub, 'yyyy'); // Full year
      const formattedTime = this.datePipe.transform(this.modifiedDateSub, 'HH:mm');


      const timeDifference = Math.abs(currentDataTime.getTime() - this.modifiedDateSub.getTime());
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      // if(currentDataTime >= this.modifiedDateSub){
      if (this.CreatePokerTouranamentForm.value.AnnouncePeriodValue == "") {
        this.AnnouncePeriodTextCss = false
        this.AnnouncePeriodHeading = "Announcement should start before registration"
        this.AnnounceTextString = ""
      }
      else if (currentDataTime.getTime() > this.modifiedDateSub.getTime() || this.modifiedDateSub.getTime() > this.registrationperiodValu.getTime()) {
        this.AnnouncePeriodTextCss = false
        this.AnnouncePeriodHeading = "Announcement start time has passed"
        this.AnnounceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
      ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) ago.`

      } else if (currentDataTime.getTime() <= this.modifiedDateSub.getTime() && this.modifiedDateSub.getTime() <= this.registrationperiodValu.getTime()) {
        this.AnnouncePeriodTextCss = true
        this.AnnouncePeriodHeading = "Tournament announcement will start time on"
        this.AnnounceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
      ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) left.`

      }

      else if (selectedItem[0].value == "Days" && (selectedRegistationItem[0].value == "Days" || selectedRegistationItem[0].value == "Weeks" || selectedRegistationItem[0].value == "Months")) {

        if (this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue > this.CreatePokerTouranamentForm.value.AnnouncePeriodValue) {
          this.AnnouncePeriodTextCss = false
          this.AnnouncePeriodHeading = "Announcement should start before registration"
          this.AnnounceTextString = ""

        }

      }

    }

    // <--------------------------------------- DAYS END---------------------------------------------------->

    // <---------------------------------------- HOURS START ------------------------------------------------------->

    if (selectedItem[0].value == "Hours") {
      console.log(this.CreatePokerTouranamentForm.value.AnnouncePeriodValue)


      this.modifiedDateSub = this.substractSpecifiedHours(inputFieldsDateTime, this.CreatePokerTouranamentForm.value.AnnouncePeriodValue);
      console.log("current date : ", currentDataTime);
      console.log("DateTime After deduct specified hours", this.modifiedDateSub);

      const formattedNameOfTheWeek = this.datePipe.transform(this.modifiedDateSub, "EEEE");
      const formattedDayOfMonth = this.datePipe.transform(this.modifiedDateSub, 'd'); // Day of the month (1-31)
      const formattedMonthFullName = this.datePipe.transform(this.modifiedDateSub, 'MMMM'); // Full name of the month
      const formattedFullYear = this.datePipe.transform(this.modifiedDateSub, 'yyyy'); // Full year
      const formattedTime = this.datePipe.transform(this.modifiedDateSub, 'HH:mm');


      const timeDifference = Math.abs(currentDataTime.getTime() - this.modifiedDateSub.getTime());
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      // if(currentDataTime >= this.modifiedDateSub){
      if (this.CreatePokerTouranamentForm.value.AnnouncePeriodValue == "") {
        this.AnnouncePeriodTextCss = false
        this.AnnouncePeriodHeading = "Announcement should start before registration"
        this.AnnounceTextString = ""
        // } else if (currentDataTime.getTime() >= this.modifiedDateSub.getTime()||this.modifiedDateSub.getTime()>=this.registrationperiodValu.getTime()){
      } else if (currentDataTime.getTime() > this.modifiedDateSub.getTime() || this.modifiedDateSub.getTime() > this.registrationperiodValu.getTime()) {
        this.AnnouncePeriodTextCss = false
        this.AnnouncePeriodHeading = "Announcement start time has passed"
        this.AnnounceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
    ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) ago.`

      }
      // else if (currentDataTime.getTime() < this.modifiedDateSub.getTime()&&this.modifiedDateSub.getTime()<this.registrationperiodValu.getTime()) {
      else if (currentDataTime.getTime() <= this.modifiedDateSub.getTime() && this.modifiedDateSub.getTime() <= this.registrationperiodValu.getTime()) {
        this.AnnouncePeriodTextCss = true
        this.AnnouncePeriodHeading = "Tournament announcement will start time on"
        this.AnnounceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
    ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) left.`

      }

      else if (selectedItem[0].value == "Hours" && (selectedRegistationItem[0].value == "Hours" || selectedRegistationItem[0].value == "Days" || selectedRegistationItem[0].value == "Weeks" || selectedRegistationItem[0].value == "Months")) {
        if (this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue > this.CreatePokerTouranamentForm.value.AnnouncePeriodValue) {
          this.AnnouncePeriodTextCss = false
          this.AnnouncePeriodHeading = "Announcement should start before registration"
          this.AnnounceTextString = ""

        }

      }

    }

    // <------------------------------------ ----HOURS END ------------------------------------------------------->


    // <------------------------------------ -----Minutes START ------------------------------------------------------->

    if (selectedItem[0].value == "Minutes") {
      console.log(this.CreatePokerTouranamentForm.value.AnnouncePeriodValue)


      this.modifiedDateSub = this.substractSpeciMinutes(inputFieldsDateTime, this.CreatePokerTouranamentForm.value.AnnouncePeriodValue);
      console.log("current date : ", currentDataTime.getTime());
      console.log("DateTime After deduct specified days", this.modifiedDateSub.getTime());

      const formattedNameOfTheWeek = this.datePipe.transform(this.modifiedDateSub, "EEEE");
      const formattedDayOfMonth = this.datePipe.transform(this.modifiedDateSub, 'd'); // Day of the month (1-31)
      const formattedMonthFullName = this.datePipe.transform(this.modifiedDateSub, 'MMMM'); // Full name of the month
      const formattedFullYear = this.datePipe.transform(this.modifiedDateSub, 'yyyy'); // Full year
      const formattedTime = this.datePipe.transform(this.modifiedDateSub, 'HH:mm');


      const timeDifference = Math.abs(currentDataTime.getTime() - this.modifiedDateSub.getTime());
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      this.AnnouncePeriodHeading = "";
      console.log(currentDataTime.getTime() >= this.modifiedDateSub.getTime(), currentDataTime.getTime(), this.modifiedDateSub.getTime(), this.modifiedDateSub.getTime() >= this.registrationperiodValu.getTime(), this.modifiedDateSub.getTime(), this.registrationperiodValu.getTime())
      this.AnnounceTextString = "";

      if (this.CreatePokerTouranamentForm.value.AnnouncePeriodValue == "") {
        // alert("22222222222")
        this.AnnouncePeriodTextCss = false
        this.AnnouncePeriodHeading = "Announcement should start before registration"
        this.AnnounceTextString = ""
        // } else if (currentDataTime.getTime() >= this.modifiedDateSub.getTime()||this.modifiedDateSub.getTime()>=this.registrationperiodValu.getTime()){
      } else if (currentDataTime.getTime() > this.modifiedDateSub.getTime() || this.modifiedDateSub.getTime() > this.registrationperiodValu.getTime()) {
        // } else if (inputFieldsDateTime.getTime() <= this.modifiedDateSub.getTime()) {
        // alert("33333333")
        this.AnnouncePeriodTextCss = false
        this.AnnouncePeriodHeading = "Announcement start time has passed"
        this.AnnounceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) ago.`

      } else if (currentDataTime.getTime() <= this.modifiedDateSub.getTime() && this.modifiedDateSub.getTime() <= this.registrationperiodValu.getTime()) {
        // } else if (currentDataTime.getTime() > this.modifiedDateSub.getTime()) {
        // } else if (inputFieldsDateTime.getTime() < this.modifiedDateSub.getTime()) {
        // alert("4444444")
        this.AnnouncePeriodTextCss = true
        this.AnnouncePeriodHeading = "Tournament announcement will start time on"
        this.AnnounceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
    ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) left.`

      } else if (selectedItem[0].value == "Minutes" && (selectedRegistationItem[0].value == "Minutes" || selectedRegistationItem[0].value == "Hours" || selectedRegistationItem[0].value == "Days" || selectedRegistationItem[0].value == "Weeks" || selectedRegistationItem[0].value == "Months")) {
        if (this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue > this.CreatePokerTouranamentForm.value.AnnouncePeriodValue) {
          // alert("555555")
          this.AnnouncePeriodTextCss = false
          this.AnnouncePeriodHeading = "Announcement should start before registration"
          this.AnnounceTextString = ""
        }
      }

    }
    // <------------------------------------ -----Minutes END ------------------------------------------------------->


    // this.registationPeriodValidationStart(selectedRegistationItem,selectedItem,inputFieldsDateTime,currentDataTime)
  }


  tournamentStartValidation() {


    console.log(this.CreatePokerTouranamentForm.value.StartTime)
    console.log(this.CreatePokerTouranamentForm.value.StartDate)
    console.log(this.CreatePokerTouranamentForm.value.Schedule);
    console.log(this.startDate);
    if(this.CreatePokerTouranamentForm.value.StartDate&&this.CreatePokerTouranamentForm.value.StartTime){
      this.StartDateTime = new Date(`${this.CreatePokerTouranamentForm.value.StartDate} ${this.CreatePokerTouranamentForm.value.StartTime}`)
    console.log(this.StartDateTime)
    this.StartDateTime.toISOString()
    console.log(this.StartDateTime)

    const timeParts = this.CreatePokerTouranamentForm.value.StartTime.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    // const seconds = parseInt(timeParts[2],10);

    this.StartDateTime.setHours(hours);
    this.StartDateTime.setMinutes(minutes);
    
    }
    
    // this.startDate.setSeconds(seconds)

    const currentDate = new Date(); // Current local time
    console.log('Current local time:', currentDate);
    console.log(this.StartDateTime)


    const currentGMTTime = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000); // Current GMT time
    console.log('Current GMT time:', currentGMTTime);
    const formattedCombinedDateTime = this.datePipe.transform(this.StartDateTime, 'yyyy-MM-dd HH:mm');
    // const presentDateTime = this.datePipe.transform(this.currentD, 'yyyy-MM-dd HH:mm:ss');
    const presentDateTime = this.datePipe.transform(currentGMTTime, 'yyyy-MM-dd HH:mm');


    console.log(formattedCombinedDateTime)
    console.log(presentDateTime)

    if (formattedCombinedDateTime !== null && presentDateTime !== null) {
      let inputFieldsDateTime = new Date(formattedCombinedDateTime)
      let currentDataTime = new Date(presentDateTime)


      // <------------------------------------------- START DATE && START TIME VALIDATIONS  STARTS --------------------------------------->
      if (this.isChecked == "Once") {
        const formattedNameOfTheWeek = this.datePipe.transform(inputFieldsDateTime, "EEEE");
        const formattedDayOfMonth = this.datePipe.transform(inputFieldsDateTime, 'd'); // Day of the month (1-31)
        const formattedMonthFullName = this.datePipe.transform(inputFieldsDateTime, 'MMMM'); // Full name of the month
        const formattedFullYear = this.datePipe.transform(inputFieldsDateTime, 'yyyy'); // Full year
        const formattedTime = this.datePipe.transform(inputFieldsDateTime, 'HH:mm'); // Time in 24-hour format

        this.filterbodyDateTime = this.datePipe.transform(this.StartDateTime, 'yyyy-MM-ddTHH:mm:ss');
        this.filterbodyTime = 0
        console.log(formattedNameOfTheWeek)
        console.log(formattedDayOfMonth)
        console.log(formattedMonthFullName)
        console.log(formattedFullYear)
        console.log(formattedTime)


        const timeDifference = Math.abs(currentDataTime.getTime() - inputFieldsDateTime.getTime());
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        if (inputFieldsDateTime <= currentDataTime) {
          this.onlyOnceTextCss = false

          this.onlyOnceHeading = "Start time has passed"
          this.onlyOnceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) ago.`

        } else {
          this.onlyOnceTextCss = true
          this.onlyOnceHeading = "Tournament will start on"
          this.onlyOnceTextString = `${formattedNameOfTheWeek}, ${formattedDayOfMonth} ${formattedMonthFullName} 
          ${formattedFullYear} ${formattedTime} (UTC +00.00). ${days} days(s) ${hours} hour(s) ${minutes} minute(s) left.`

        }

      }


      // <------------------------------------------- START DATE && START TIME VALIDATIONS  ENDS --------------------------------------->


      // <-----------------------------------------------------------------HOURLY SCHEDULE STARTED--------------------------------------------------->
      // if (this.CreatePokerTouranamentForm.value.Schedule == "Hourly") {
      if (this.isChecked == "Hourly") {
        if (this.CreatePokerTouranamentForm.value.HourlyStartTime > 0 || this.CreatePokerTouranamentForm.value.HourlyStartMinute > 0) {
          this.HourlyPopupDefault = true;
          const newDate = new Date();
          let HourlyCurrentGMTTime = new Date(newDate.getTime() + currentDate.getTimezoneOffset() * 60000); // Current GMT time
          console.log(HourlyCurrentGMTTime)
          let formatedHourlyCurrentGMT = this.datePipe.transform(HourlyCurrentGMTTime, 'yyyy-MM-dd HH:mm');
          console.log(formatedHourlyCurrentGMT)
          if (formatedHourlyCurrentGMT !== null) {
            console.log(this.CreatePokerTouranamentForm.value.StartTime);
            const timeParts = this.CreatePokerTouranamentForm.value.StartTime.split(':');
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10);
            console.log("inputField   ====> hours:minutes :  ", this.CreatePokerTouranamentForm.value.StartTime)
            console.log("inputFieldHours  : ", this.CreatePokerTouranamentForm.value.HourlyStartTime)
            console.log("inputFieldMinutes", this.CreatePokerTouranamentForm.value.HourlyStartMinute)
            let HourlyInputFieldCurrentGMT = new Date(formatedHourlyCurrentGMT);
            HourlyInputFieldCurrentGMT.setHours(hours);
            HourlyInputFieldCurrentGMT.setMinutes(minutes);
            const constantCurrentGmtTime = new Date(formatedHourlyCurrentGMT);


            let HourlyStartTime = parseInt(this.CreatePokerTouranamentForm.value.HourlyStartTime)
            let HourlyStartMinute = parseInt(this.CreatePokerTouranamentForm.value.HourlyStartMinute)
            const fillDatetime = formatedHourlyCurrentGMT.split(" ")[0]
            const inMilliSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000

            this.filterbodyDateTime = this.datePipe.transform(fillDatetime, 'yyyy-MM-ddTHH:mm:ss');
            this.filterbodyTime = inMilliSeconds


            if (HourlyStartMinute <= 0 || HourlyStartMinute == null || isNaN(Number(HourlyStartMinute))) {
              HourlyStartMinute = 0
            }

            if (HourlyStartTime <= 0 || HourlyStartTime == null || isNaN(Number(HourlyStartTime))) {
              HourlyStartTime = 0
            }


            this.hourlyRepeatTime = HourlyStartTime * 60 * 60 * 1000 + HourlyStartMinute * 60 * 1000

            console.log(this.filterbodyDateTime)
            console.log(inMilliSeconds)
            console.log(HourlyStartTime)
            console.log(HourlyStartMinute)
            console.log(HourlyStartTime * 60 * 60 * 1000 + HourlyStartMinute * 60 * 1000)



            console.log("HourlyInputFieldCurrentGMT   :  ", HourlyInputFieldCurrentGMT);
            console.log("Hours    :  ", HourlyInputFieldCurrentGMT.getHours());
            console.log("Minutes  :  ", HourlyInputFieldCurrentGMT.getMinutes());

            if (this.CreatePokerTouranamentForm.value.HourlyStartTime > 0) {
              HourlyInputFieldCurrentGMT.setHours(HourlyInputFieldCurrentGMT.getHours() + this.CreatePokerTouranamentForm.value.HourlyStartTime)
            }

            if (this.CreatePokerTouranamentForm.value.HourlyStartMinute > 0) {
              HourlyInputFieldCurrentGMT.setMinutes(HourlyInputFieldCurrentGMT.getMinutes() + this.CreatePokerTouranamentForm.value.HourlyStartMinute)
            }


            console.log(HourlyInputFieldCurrentGMT)
            inputFieldsDateTime = HourlyInputFieldCurrentGMT
            currentDataTime = constantCurrentGmtTime
            const HformattedNameOfTheWeek = this.datePipe.transform(HourlyInputFieldCurrentGMT, "EEEE");
            const HformattedDayOfMonth = this.datePipe.transform(HourlyInputFieldCurrentGMT, 'd'); // Day of the month (1-31)
            const HformattedMonthFullName = this.datePipe.transform(HourlyInputFieldCurrentGMT, 'MMMM'); // Full name of the month
            const HformattedFullYear = this.datePipe.transform(HourlyInputFieldCurrentGMT, 'yyyy'); // Full year
            const HformattedTime = this.datePipe.transform(HourlyInputFieldCurrentGMT, 'HH:mm');

            const timeDifference = Math.abs(constantCurrentGmtTime.getTime() - HourlyInputFieldCurrentGMT.getTime());
            const Hdays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const Hhours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const Hminutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            this.HourlyStartedHeadingText = `The nearest tournament will start on
          ${HformattedNameOfTheWeek}, ${HformattedDayOfMonth} ${HformattedMonthFullName} 
          ${HformattedFullYear} ${HformattedTime} (UTC +00.00). ${Hdays} days(s) ${Hhours} hour(s) ${Hminutes} minute(s) left.`


          }


        } else {
          this.HourlyPopupDefault = false;
        }

      } else {
        this.HourlyPopupDefault = false;
      }

      // <-----------------------------------------------------------------HOURLY SCHEDULE ENDS--------------------------------------------------->




      // <-----------------------------------------------------------------DAILY SCHEDULE STARTS--------------------------------------------------->

      // if (this.CreatePokerTouranamentForm.value.Schedule == "Daily") {
      if (this.isChecked == "Daily") {
        console.log("entering into Daily zone");
        console.log(this.CreatePokerTouranamentForm.value.DailyButtonRadio);
        const newDate = new Date();
        let DailyCurrentGMTTime = new Date(newDate.getTime() + currentDate.getTimezoneOffset() * 60000); // Current GMT time
        console.log(DailyCurrentGMTTime)
        let formatedDailyCurrentGMT = this.datePipe.transform(DailyCurrentGMTTime, 'yyyy-MM-dd HH:mm');
        console.log(formatedDailyCurrentGMT)
        console.log(this.CreatePokerTouranamentForm.value.StartTime);
        const timeParts = this.CreatePokerTouranamentForm.value.StartTime.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        if (this.CreatePokerTouranamentForm.value.DailyButtonRadio == "Every") {
          console.log(this.CreatePokerTouranamentForm.value.SelectedDaysInDailyButtonRadio);
          if (formatedDailyCurrentGMT !== null) {

            let DailyInputFieldCurrentGMT = new Date(formatedDailyCurrentGMT);
            DailyInputFieldCurrentGMT.setHours(hours);
            DailyInputFieldCurrentGMT.setMinutes(minutes);
            if (this.CreatePokerTouranamentForm.value.SelectedDaysInDailyButtonRadio) {
              const numberOfDays = this.CreatePokerTouranamentForm.value.SelectedDaysInDailyButtonRadio
              DailyInputFieldCurrentGMT.setDate(DailyInputFieldCurrentGMT.getDate() + this.CreatePokerTouranamentForm.value.SelectedDaysInDailyButtonRadio)
            }

            console.log("HourlyInputFieldCurrentGMT   :  ", DailyInputFieldCurrentGMT);
            console.log("Hours    :  ", DailyInputFieldCurrentGMT.getHours());
            console.log("Minutes  :  ", DailyInputFieldCurrentGMT.getMinutes());

            const constantCurrentGmtTime = new Date(formatedDailyCurrentGMT);
            inputFieldsDateTime = DailyInputFieldCurrentGMT
            currentDataTime = constantCurrentGmtTime



            const fillDatetime = formatedDailyCurrentGMT.split(" ")[0]
            const inMilliSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000
            this.filterbodyDateTime = this.datePipe.transform(fillDatetime, 'yyyy-MM-ddTHH:mm:ss');
            this.filterbodyTime = inMilliSeconds;
            this.fillterbodyeveryWeekdays = false;
            this.fillterbodyeveryWeekend = false;
            this.filterbodyeveryDay = this.CreatePokerTouranamentForm.value.SelectedDaysInDailyButtonRadio


            const HformattedNameOfTheWeek = this.datePipe.transform(inputFieldsDateTime, "EEEE");
            const HformattedDayOfMonth = this.datePipe.transform(inputFieldsDateTime, 'd'); // Day of the month (1-31)
            const HformattedMonthFullName = this.datePipe.transform(inputFieldsDateTime, 'MMMM'); // Full name of the month
            const HformattedFullYear = this.datePipe.transform(inputFieldsDateTime, 'yyyy'); // Full year
            const HformattedTime = this.datePipe.transform(inputFieldsDateTime, 'HH:mm');

            const timeDifference = Math.abs(constantCurrentGmtTime.getTime() - inputFieldsDateTime.getTime());
            const Hdays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const Hhours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const Hminutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            this.DailyStartedHeadingText = `The nearest tournament will start on
          ${HformattedNameOfTheWeek}, ${HformattedDayOfMonth} ${HformattedMonthFullName} 
          ${HformattedFullYear} ${HformattedTime} (UTC +00.00). ${Hdays} days(s) ${Hhours} hour(s) ${Hminutes} minute(s) left.`

          }


        }


        if (this.CreatePokerTouranamentForm.value.DailyButtonRadio == "Weekdays") {
          if (formatedDailyCurrentGMT != null) {

            const fillDatetime = formatedDailyCurrentGMT.split(" ")[0]
            const inMilliSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000
            this.filterbodyDateTime = this.datePipe.transform(fillDatetime, 'yyyy-MM-ddTHH:mm:ss');
            this.filterbodyTime = inMilliSeconds;
            this.fillterbodyeveryWeekdays = true;
            this.fillterbodyeveryWeekend = false;


            let remainingWeekdays = 1;
            let DailyInputFieldCurrentGMT = new Date(formatedDailyCurrentGMT);
            DailyInputFieldCurrentGMT.setHours(hours);
            DailyInputFieldCurrentGMT.setMinutes(minutes);

            let newDays = this.getWeekDaysOnly(DailyInputFieldCurrentGMT, remainingWeekdays);
            console.log(newDays);


            const constantCurrentGmtTime = new Date(formatedDailyCurrentGMT);
            inputFieldsDateTime = newDays
            currentDataTime = constantCurrentGmtTime

            const HformattedNameOfTheWeek = this.datePipe.transform(inputFieldsDateTime, "EEEE");
            const HformattedDayOfMonth = this.datePipe.transform(inputFieldsDateTime, 'd'); // Day of the month (1-31)
            const HformattedMonthFullName = this.datePipe.transform(inputFieldsDateTime, 'MMMM'); // Full name of the month
            const HformattedFullYear = this.datePipe.transform(inputFieldsDateTime, 'yyyy'); // Full year
            const HformattedTime = this.datePipe.transform(inputFieldsDateTime, 'HH:mm');

            const timeDifference = Math.abs(constantCurrentGmtTime.getTime() - inputFieldsDateTime.getTime());
            const Hdays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const Hhours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const Hminutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            this.DailyStartedHeadingText = `The nearest tournament will start on
          ${HformattedNameOfTheWeek}, ${HformattedDayOfMonth} ${HformattedMonthFullName} 
          ${HformattedFullYear} ${HformattedTime} (UTC +00.00). ${Hdays} days(s) ${Hhours} hour(s) ${Hminutes} minute(s) left.`



          };
        };


        if (this.CreatePokerTouranamentForm.value.DailyButtonRadio == "Weekend") {

          if (formatedDailyCurrentGMT != null) {


            const fillDatetime = formatedDailyCurrentGMT.split(" ")[0]
            const inMilliSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000
            this.filterbodyDateTime = this.datePipe.transform(fillDatetime, 'yyyy-MM-ddTHH:mm:ss');
            this.filterbodyTime = inMilliSeconds;
            this.fillterbodyeveryWeekdays = false;
            this.fillterbodyeveryWeekend = true;


            let remainingWeekdays = 1;
            let DailyInputFieldCurrentGMT = new Date(formatedDailyCurrentGMT);
            DailyInputFieldCurrentGMT.setHours(hours);
            DailyInputFieldCurrentGMT.setMinutes(minutes);

            let newDays = this.getWeekEndOnly(DailyInputFieldCurrentGMT, remainingWeekdays);
            console.log(newDays);


            const constantCurrentGmtTime = new Date(formatedDailyCurrentGMT);
            inputFieldsDateTime = newDays
            currentDataTime = constantCurrentGmtTime

            const HformattedNameOfTheWeek = this.datePipe.transform(inputFieldsDateTime, "EEEE");
            const HformattedDayOfMonth = this.datePipe.transform(inputFieldsDateTime, 'd'); // Day of the month (1-31)
            const HformattedMonthFullName = this.datePipe.transform(inputFieldsDateTime, 'MMMM'); // Full name of the month
            const HformattedFullYear = this.datePipe.transform(inputFieldsDateTime, 'yyyy'); // Full year
            const HformattedTime = this.datePipe.transform(inputFieldsDateTime, 'HH:mm');

            const timeDifference = Math.abs(constantCurrentGmtTime.getTime() - inputFieldsDateTime.getTime());
            const Hdays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const Hhours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const Hminutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            this.DailyStartedHeadingText = `The nearest tournament will start on
          ${HformattedNameOfTheWeek}, ${HformattedDayOfMonth} ${HformattedMonthFullName} 
          ${HformattedFullYear} ${HformattedTime} (UTC +00.00). ${Hdays} days(s) ${Hhours} hour(s) ${Hminutes} minute(s) left.`



          };

        }



      }


      // <-----------------------------------------------------------------DAILY SCHEDULE ENDS--------------------------------------------------->


      // <-----------------------------------------------------------------Weekly SCHEDULE STARTS--------------------------------------------------->

      // if (this.CreatePokerTouranamentForm.value.Schedule == "Weekly") {
      if (this.isChecked == "Weekly") {
        console.log("Entering Into Weekly Zone")
        const newDate = new Date();
        let DailyCurrentGMTTime = new Date(newDate.getTime() + currentDate.getTimezoneOffset() * 60000); // Current GMT time
        console.log(DailyCurrentGMTTime)
        let formatedDailyCurrentGMT = this.datePipe.transform(DailyCurrentGMTTime, 'yyyy-MM-dd HH:mm');
        console.log(formatedDailyCurrentGMT)
        console.log(this.CreatePokerTouranamentForm.value.StartTime);
        const timeParts = this.CreatePokerTouranamentForm.value.StartTime.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);



        if (formatedDailyCurrentGMT != null) {
          let DailyInputFieldCurrentGMT = new Date(formatedDailyCurrentGMT);


          const weekDaysOfWeek: any = []
          if (this.CreatePokerTouranamentForm.value.WeeklyMonday) {
            weekDaysOfWeek.push(1)
          }


          if (this.CreatePokerTouranamentForm.value.WeeklyTuesday) {
            weekDaysOfWeek.push(2)
          }
          if (this.CreatePokerTouranamentForm.value.WeeklyWednesday) {
            weekDaysOfWeek.push(3)
          }


          if (this.CreatePokerTouranamentForm.value.WeeklyThursday) {
            weekDaysOfWeek.push(4)
          }


          if (this.CreatePokerTouranamentForm.value.WeeklyFriday) {
            weekDaysOfWeek.push(5)
          }

          if (this.CreatePokerTouranamentForm.value.WeeklySaturday) {
            weekDaysOfWeek.push(6)
          }

          if (this.CreatePokerTouranamentForm.value.WeeklySunday) {
            weekDaysOfWeek.push(7)
          }

          console.log(weekDaysOfWeek);
          const fillDatetime = formatedDailyCurrentGMT.split(" ")[0]
          const inMilliSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000
          this.filterbodyDateTime = this.datePipe.transform(fillDatetime, 'yyyy-MM-ddTHH:mm:ss');
          this.filterbodyTime = inMilliSeconds;
          this.NumberOfWeeks = this.CreatePokerTouranamentForm.value.SelectedDaysInWeek
          this.selectedWeekDayOfWeek = weekDaysOfWeek


          DailyInputFieldCurrentGMT.setHours(hours);
          DailyInputFieldCurrentGMT.setMinutes(minutes);
          // DailyInputFieldCurrentGMT.setDate(DailyInputFieldCurrentGMT.getDate()+this.CreatePokerTouranamentForm.value.SelectedDaysInDailyButtonRadio)
          console.log(DailyInputFieldCurrentGMT)
          console.log(DailyInputFieldCurrentGMT.getDay())
          let indexOfTheDay: number = DailyInputFieldCurrentGMT.getDay()
          let checkBoxValues: any;

          if (indexOfTheDay == 0) {
            if (this.CreatePokerTouranamentForm.value.WeeklyMonday) {

              checkBoxValues = 0;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyTuesday) {

              checkBoxValues = 1;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyWednesday) {

              checkBoxValues = 2;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyThursday) {

              checkBoxValues = 3;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyFriday) {

              checkBoxValues = 4;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySaturday) {

              checkBoxValues = 5;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySunday) {

              checkBoxValues = 6;
            }


          } else if (indexOfTheDay == 1) {
            if (this.CreatePokerTouranamentForm.value.WeeklyTuesday) {

              checkBoxValues = 0;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyWednesday) {

              checkBoxValues = 1;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyThursday) {

              checkBoxValues = 2;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyFriday) {

              checkBoxValues = 3;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySaturday) {

              checkBoxValues = 4;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySunday) {

              checkBoxValues = 5;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyMonday) {

              checkBoxValues = 6;
            }

          } else if (indexOfTheDay == 2) {
            if (this.CreatePokerTouranamentForm.value.WeeklyWednesday) {

              checkBoxValues = 0;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyThursday) {

              checkBoxValues = 1;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyFriday) {

              checkBoxValues = 2;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySaturday) {

              checkBoxValues = 3;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySunday) {

              checkBoxValues = 4;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyMonday) {

              checkBoxValues = 5;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyTuesday) {

              checkBoxValues = 6;
            }


          } else if (indexOfTheDay == 3) {
            if (this.CreatePokerTouranamentForm.value.WeeklyThursday) {
              checkBoxValues = 0;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyFriday) {
              checkBoxValues = 1;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySaturday) {

              checkBoxValues = 2;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySunday) {

              checkBoxValues = 3;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyMonday) {

              checkBoxValues = 4;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyTuesday) {

              checkBoxValues = 5;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyWednesday) {

              checkBoxValues = 6
            }

          } else if (indexOfTheDay == 4) {
            if (this.CreatePokerTouranamentForm.value.WeeklyFriday) {

              checkBoxValues = 0;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySaturday) {

              checkBoxValues = 1;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySunday) {

              checkBoxValues = 2;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyMonday) {

              checkBoxValues = 3;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyTuesday) {

              checkBoxValues = 4;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyWednesday) {

              checkBoxValues = 5;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyThursday) {

              checkBoxValues = 6;
            }


          } else if (indexOfTheDay == 5) {
            if (this.CreatePokerTouranamentForm.value.WeeklySaturday) {

              checkBoxValues = 0;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySunday) {

              checkBoxValues = 1;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyMonday) {

              checkBoxValues = 2;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyTuesday) {

              checkBoxValues = 3;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyWednesday) {

              checkBoxValues = 4;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyThursday) {

              checkBoxValues = 5;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyFriday) {

              checkBoxValues = 6;
            }




          } else if (indexOfTheDay == 6) {
            if (this.CreatePokerTouranamentForm.value.WeeklySunday) {

              checkBoxValues = 0;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyMonday) {

              checkBoxValues = 1;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyTuesday) {

              checkBoxValues = 2;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyWednesday) {

              checkBoxValues = 3;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyThursday) {

              checkBoxValues = 4;
            } else if (this.CreatePokerTouranamentForm.value.WeeklyFriday) {

              checkBoxValues = 5;
            } else if (this.CreatePokerTouranamentForm.value.WeeklySaturday) {

              checkBoxValues = 6;
            }
          }








          console.log(indexOfTheDay);
          console.log(checkBoxValues);
          let newDays: any = "";
          if (checkBoxValues == 0) {
            newDays = this.getWeeklyAddSpecifiedDays(DailyInputFieldCurrentGMT, 1)

          } else if (checkBoxValues == 1) {
            this.WeeklyDaysPresent = true
            newDays = this.getWeeklyAddSpecifiedDays(DailyInputFieldCurrentGMT, 2)
          }
          else if (checkBoxValues == 2) {
            this.WeeklyDaysPresent = true
            newDays = this.getWeeklyAddSpecifiedDays(DailyInputFieldCurrentGMT, 3)
          } else if (checkBoxValues == 3) {
            this.WeeklyDaysPresent = true
            newDays = this.getWeeklyAddSpecifiedDays(DailyInputFieldCurrentGMT, 4)
          } else if (checkBoxValues == 4) {
            this.WeeklyDaysPresent = true
            newDays = this.getWeeklyAddSpecifiedDays(DailyInputFieldCurrentGMT, 5)
          } else if (checkBoxValues == 5) {
            this.WeeklyDaysPresent = true
            newDays = this.getWeeklyAddSpecifiedDays(DailyInputFieldCurrentGMT, 6)
          } else if (checkBoxValues == 6) {
            this.WeeklyDaysPresent = true
            newDays = this.getWeeklyAddSpecifiedDays(DailyInputFieldCurrentGMT, 7)
          } else {
            newDays = this.getWeeklyAddSpecifiedDays(DailyInputFieldCurrentGMT, 0)
            this.WeeklyDaysPresent = false
          }


          const constantCurrentGmtTime = new Date(formatedDailyCurrentGMT);


          console.log(newDays);
          inputFieldsDateTime = newDays
          currentDataTime = constantCurrentGmtTime

          const HformattedNameOfTheWeek = this.datePipe.transform(inputFieldsDateTime, "EEEE");
          const HformattedDayOfMonth = this.datePipe.transform(inputFieldsDateTime, 'd'); // Day of the month (1-31)
          const HformattedMonthFullName = this.datePipe.transform(inputFieldsDateTime, 'MMMM'); // Full name of the month
          const HformattedFullYear = this.datePipe.transform(inputFieldsDateTime, 'yyyy'); // Full year
          const HformattedTime = this.datePipe.transform(inputFieldsDateTime, 'HH:mm');

          const timeDifference = Math.abs(constantCurrentGmtTime.getTime() - inputFieldsDateTime.getTime());
          const Hdays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const Hhours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const Hminutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          console.log(this.WeeklyDaysPresent)
          if (this.WeeklyDaysPresent) {
            this.getWeeklyAddSpecifiedDaysText = `The nearest tournament will start on
        ${HformattedNameOfTheWeek}, ${HformattedDayOfMonth} ${HformattedMonthFullName} 
        ${HformattedFullYear} ${HformattedTime} (UTC +00.00). ${Hdays} days(s) ${Hhours} hour(s) ${Hminutes} minute(s) left.`

          }

          else {
            this.getWeeklyAddSpecifiedDaysText = ""
          }

        };


      }

      // <-----------------------------------------------------------------Weekly SCHEDULE ENDS--------------------------------------------------->


      // <-----------------------------------------------------------------MONTHLY SCHEDULE STARTS--------------------------------------------------->

      // if (this.CreatePokerTouranamentForm.value.Schedule == "Monthly") {
      if (this.isChecked == "Monthly") {
        console.log("Entering into Monthly zone");
        const newDate = new Date();
        let DailyCurrentGMTTime = new Date(newDate.getTime() + currentDate.getTimezoneOffset() * 60000); // Current GMT time
        console.log(DailyCurrentGMTTime)
        let formatedDailyCurrentGMT = this.datePipe.transform(DailyCurrentGMTTime, 'yyyy-MM-dd HH:mm');
        console.log(formatedDailyCurrentGMT)
        console.log(this.CreatePokerTouranamentForm.value.StartTime);
        const timeParts = this.CreatePokerTouranamentForm.value.StartTime.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        if (formatedDailyCurrentGMT != null) {
          const constantCurrentGmtTime = new Date(formatedDailyCurrentGMT);
          let DailyInputFieldCurrentGMT = new Date(formatedDailyCurrentGMT);

          const monthOfYear: any = []
          for (let i = 0; i < this.MonthlyMonthIndexes.length; i++) {
            if (this.MonthlyMonthIndexes[i]) {
              monthOfYear.push(i + 1)
            }

          }


          console.log(monthOfYear);
          const fillDatetime = formatedDailyCurrentGMT.split(" ")[0]
          const inMilliSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000
          this.filterbodyDateTime = this.datePipe.transform(fillDatetime, 'yyyy-MM-ddTHH:mm:ss');
          this.filterbodyTime = inMilliSeconds;
          this.selectedMonthsInYear = monthOfYear



          DailyInputFieldCurrentGMT.setHours(hours);
          DailyInputFieldCurrentGMT.setMinutes(minutes);
          console.log("presentCurrentGMT TIME", constantCurrentGmtTime);
          console.log("userInputDateBeforeDetactingMont", DailyInputFieldCurrentGMT);
          console.log(this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays);

          let activeMonth = constantCurrentGmtTime.getMonth();

          if (this.CreatePokerTouranamentForm.value.MonthlyButtonRadio == "Days") {
            activeMonth = constantCurrentGmtTime.getMonth();
          } else {

            // if(constantCurrentGmtTime.getDate() >= DailyInputFieldCurrentGMT.getDate()){
            //   alert("888888888888888888888888888")
            //   let newDate = new Date(formatedDailyCurrentGMT); 
            //   newDate.setMonth(newDate.getMonth()+1);
            //   activeMonth = newDate.getMonth();

            // }else{
            //   activeMonth = constantCurrentGmtTime.getMonth();
            // }

            let newDate = new Date(formatedDailyCurrentGMT);
            newDate.setMonth(newDate.getMonth() + 1);
            activeMonth = newDate.getMonth();


          }

          if (this.currentSelectMonthlyIndex >= 0) {
            console.log(this.currentSelectMonthlyIndex)
            if (activeMonth == 0) {
              this.MonthlyTextDisorInable = true;
              if (this.MonthlyMonthIndexes[0]) {
                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 12;
                } else {
                  this.NumberOfMonthsToBeAdd = 0;
                }
              } else if (this.MonthlyMonthIndexes[1]) {
                this.NumberOfMonthsToBeAdd = 1
              } else if (this.MonthlyMonthIndexes[2]) {
                this.NumberOfMonthsToBeAdd = 2
              } else if (this.MonthlyMonthIndexes[3]) {
                this.NumberOfMonthsToBeAdd = 3
              } else if (this.MonthlyMonthIndexes[4]) {
                this.NumberOfMonthsToBeAdd = 4
              } else if (this.MonthlyMonthIndexes[5]) {
                this.NumberOfMonthsToBeAdd = 5
              } else if (this.MonthlyMonthIndexes[6]) {
                this.NumberOfMonthsToBeAdd = 6
              } else if (this.MonthlyMonthIndexes[7]) {
                this.NumberOfMonthsToBeAdd = 7
              } else if (this.MonthlyMonthIndexes[8]) {
                this.NumberOfMonthsToBeAdd = 8
              } else if (this.MonthlyMonthIndexes[9]) {
                this.NumberOfMonthsToBeAdd = 9
              } else if (this.MonthlyMonthIndexes[10]) {
                this.NumberOfMonthsToBeAdd = 10
              } else if (this.MonthlyMonthIndexes[11]) {
                this.NumberOfMonthsToBeAdd = 11
              } else {
                this.MonthlyTextDisorInable = false;
              }

            } else if (activeMonth == 1) {
              this.MonthlyTextDisorInable = true;
              if (this.MonthlyMonthIndexes[1]) {
                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 13;
                } else {
                  this.NumberOfMonthsToBeAdd = 1;
                }

              } else if (this.MonthlyMonthIndexes[2]) {
                this.NumberOfMonthsToBeAdd = 2
              } else if (this.MonthlyMonthIndexes[3]) {
                this.NumberOfMonthsToBeAdd = 3
              } else if (this.MonthlyMonthIndexes[4]) {
                this.NumberOfMonthsToBeAdd = 4
              } else if (this.MonthlyMonthIndexes[5]) {
                this.NumberOfMonthsToBeAdd = 5
              } else if (this.MonthlyMonthIndexes[6]) {
                this.NumberOfMonthsToBeAdd = 6
              } else if (this.MonthlyMonthIndexes[7]) {
                this.NumberOfMonthsToBeAdd = 7
              } else if (this.MonthlyMonthIndexes[8]) {
                this.NumberOfMonthsToBeAdd = 8
              } else if (this.MonthlyMonthIndexes[9]) {
                this.NumberOfMonthsToBeAdd = 9
              } else if (this.MonthlyMonthIndexes[10]) {
                this.NumberOfMonthsToBeAdd = 10
              } else if (this.MonthlyMonthIndexes[11]) {
                this.NumberOfMonthsToBeAdd = 11
              } else if (this.MonthlyMonthIndexes[0]) {
                this.NumberOfMonthsToBeAdd = 12

              } else {
                this.MonthlyTextDisorInable = false;
              }

            } else if (activeMonth == 2) {
              this.MonthlyTextDisorInable = true
              if (this.MonthlyMonthIndexes[2]) {
                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 14;
                } else {
                  this.NumberOfMonthsToBeAdd = 2;
                }

              } else if (this.MonthlyMonthIndexes[3]) {
                this.NumberOfMonthsToBeAdd = 3
              } else if (this.MonthlyMonthIndexes[4]) {
                this.NumberOfMonthsToBeAdd = 4
              } else if (this.MonthlyMonthIndexes[5]) {
                this.NumberOfMonthsToBeAdd = 5
              } else if (this.MonthlyMonthIndexes[6]) {
                this.NumberOfMonthsToBeAdd = 6
              } else if (this.MonthlyMonthIndexes[7]) {
                this.NumberOfMonthsToBeAdd = 7
              } else if (this.MonthlyMonthIndexes[8]) {
                this.NumberOfMonthsToBeAdd = 8
              } else if (this.MonthlyMonthIndexes[9]) {
                this.NumberOfMonthsToBeAdd = 9
              } else if (this.MonthlyMonthIndexes[10]) {
                this.NumberOfMonthsToBeAdd = 10
              } else if (this.MonthlyMonthIndexes[11]) {
                this.NumberOfMonthsToBeAdd = 11
              } else if (this.MonthlyMonthIndexes[0]) {
                this.NumberOfMonthsToBeAdd = 12
              } else if (this.MonthlyMonthIndexes[1]) {
                this.NumberOfMonthsToBeAdd = 13
              } else {
                this.MonthlyTextDisorInable = false;
              }

            } else if (activeMonth == 3) {
              this.MonthlyTextDisorInable = true
              if (this.MonthlyMonthIndexes[3]) {
                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 15;
                } else {
                  this.NumberOfMonthsToBeAdd = 3;
                }

              } else if (this.MonthlyMonthIndexes[4]) {
                this.NumberOfMonthsToBeAdd = 4
              } else if (this.MonthlyMonthIndexes[5]) {
                this.NumberOfMonthsToBeAdd = 5
              } else if (this.MonthlyMonthIndexes[6]) {
                this.NumberOfMonthsToBeAdd = 6
              } else if (this.MonthlyMonthIndexes[7]) {
                this.NumberOfMonthsToBeAdd = 7
              } else if (this.MonthlyMonthIndexes[8]) {
                this.NumberOfMonthsToBeAdd = 8
              } else if (this.MonthlyMonthIndexes[9]) {
                this.NumberOfMonthsToBeAdd = 9
              } else if (this.MonthlyMonthIndexes[10]) {
                this.NumberOfMonthsToBeAdd = 10
              } else if (this.MonthlyMonthIndexes[11]) {
                this.NumberOfMonthsToBeAdd = 11
              } else if (this.MonthlyMonthIndexes[0]) {
                this.NumberOfMonthsToBeAdd = 12
              } else if (this.MonthlyMonthIndexes[1]) {
                this.NumberOfMonthsToBeAdd = 13
              } else if (this.MonthlyMonthIndexes[2]) {
                this.NumberOfMonthsToBeAdd = 14
              } else {
                this.MonthlyTextDisorInable = false;
              }

            } else if (activeMonth == 4) {
              this.MonthlyTextDisorInable = true
              if (this.MonthlyMonthIndexes[4]) {
                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 16;
                } else if (this.MonthlyMonthIndexes[5]) {
                  this.NumberOfMonthsToBeAdd = 5
                } else if (this.MonthlyMonthIndexes[6]) {
                  this.NumberOfMonthsToBeAdd = 6
                } else if (this.MonthlyMonthIndexes[7]) {
                  this.NumberOfMonthsToBeAdd = 7
                } else if (this.MonthlyMonthIndexes[8]) {
                  this.NumberOfMonthsToBeAdd = 8
                } else if (this.MonthlyMonthIndexes[9]) {
                  this.NumberOfMonthsToBeAdd = 9
                } else if (this.MonthlyMonthIndexes[10]) {
                  this.NumberOfMonthsToBeAdd = 10
                } else if (this.MonthlyMonthIndexes[11]) {
                  this.NumberOfMonthsToBeAdd = 11
                } else if (this.MonthlyMonthIndexes[0]) {
                  this.NumberOfMonthsToBeAdd = 12
                } else if (this.MonthlyMonthIndexes[1]) {
                  this.NumberOfMonthsToBeAdd = 13
                } else if (this.MonthlyMonthIndexes[2]) {
                  this.NumberOfMonthsToBeAdd = 14
                } else if (this.MonthlyMonthIndexes[3]) {
                  this.NumberOfMonthsToBeAdd = 15
                } else {
                  this.NumberOfMonthsToBeAdd = 4;
                }

              } else {
                this.MonthlyTextDisorInable = false;
              }

            } else if (activeMonth == 5) {
              this.MonthlyTextDisorInable = true
              if (this.MonthlyMonthIndexes[5]) {
                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 17;
                } else {
                  this.NumberOfMonthsToBeAdd = 5;
                }

              } else if (this.MonthlyMonthIndexes[6]) {
                this.NumberOfMonthsToBeAdd = 6
              } else if (this.MonthlyMonthIndexes[7]) {
                this.NumberOfMonthsToBeAdd = 7
              } else if (this.MonthlyMonthIndexes[8]) {
                this.NumberOfMonthsToBeAdd = 8
              } else if (this.MonthlyMonthIndexes[9]) {
                this.NumberOfMonthsToBeAdd = 9
              } else if (this.MonthlyMonthIndexes[10]) {
                this.NumberOfMonthsToBeAdd = 10
              } else if (this.MonthlyMonthIndexes[11]) {
                this.NumberOfMonthsToBeAdd = 11
              } else if (this.MonthlyMonthIndexes[0]) {
                this.NumberOfMonthsToBeAdd = 12
              } else if (this.MonthlyMonthIndexes[1]) {
                this.NumberOfMonthsToBeAdd = 13
              } else if (this.MonthlyMonthIndexes[2]) {
                this.NumberOfMonthsToBeAdd = 14
              } else if (this.MonthlyMonthIndexes[3]) {
                this.NumberOfMonthsToBeAdd = 15
              } else if (this.MonthlyMonthIndexes[4]) {
                this.NumberOfMonthsToBeAdd = 16
              } else {
                this.MonthlyTextDisorInable = false;
              }

            } else if (activeMonth == 6) {
              this.MonthlyTextDisorInable = true
              if (this.MonthlyMonthIndexes[6]) {
                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 18;
                } else {
                  this.NumberOfMonthsToBeAdd = 6;
                }
              } else if (this.MonthlyMonthIndexes[7]) {
                this.NumberOfMonthsToBeAdd = 7
              } else if (this.MonthlyMonthIndexes[8]) {
                this.NumberOfMonthsToBeAdd = 8
              } else if (this.MonthlyMonthIndexes[9]) {
                this.NumberOfMonthsToBeAdd = 9
              } else if (this.MonthlyMonthIndexes[10]) {
                this.NumberOfMonthsToBeAdd = 10
              } else if (this.MonthlyMonthIndexes[11]) {
                this.NumberOfMonthsToBeAdd = 11
              } else if (this.MonthlyMonthIndexes[0]) {
                this.NumberOfMonthsToBeAdd = 12
              } else if (this.MonthlyMonthIndexes[1]) {
                this.NumberOfMonthsToBeAdd = 13
              } else if (this.MonthlyMonthIndexes[2]) {
                this.NumberOfMonthsToBeAdd = 14
              } else if (this.MonthlyMonthIndexes[3]) {
                this.NumberOfMonthsToBeAdd = 15
              } else if (this.MonthlyMonthIndexes[4]) {
                this.NumberOfMonthsToBeAdd = 16
              } else if (this.MonthlyMonthIndexes[5]) {
                this.NumberOfMonthsToBeAdd = 17
              } else {
                this.MonthlyTextDisorInable = false;
              }

            } else if (activeMonth == 7) {
              this.MonthlyTextDisorInable = true;
              if (this.MonthlyMonthIndexes[7]) {

                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 19;
                } else {
                  this.NumberOfMonthsToBeAdd = 7;
                }
              } else if (this.MonthlyMonthIndexes[8]) {

                this.NumberOfMonthsToBeAdd = 8;

              } else if (this.MonthlyMonthIndexes[9]) {

                this.NumberOfMonthsToBeAdd = 9;

              } else if (this.MonthlyMonthIndexes[10]) {

                this.NumberOfMonthsToBeAdd = 10;

              } else if (this.MonthlyMonthIndexes[11]) {

                this.NumberOfMonthsToBeAdd = 11;

              } else if (this.MonthlyMonthIndexes[0]) {

                this.NumberOfMonthsToBeAdd = 12;

              } else if (this.MonthlyMonthIndexes[1]) {

                this.NumberOfMonthsToBeAdd = 13;

              } else if (this.MonthlyMonthIndexes[2]) {

                this.NumberOfMonthsToBeAdd = 14;

              } else if (this.MonthlyMonthIndexes[3]) {

                this.NumberOfMonthsToBeAdd = 15;

              } else if (this.MonthlyMonthIndexes[4]) {

                this.NumberOfMonthsToBeAdd = 16

              } else if (this.MonthlyMonthIndexes[5]) {

                this.NumberOfMonthsToBeAdd = 17;

              } else if (this.MonthlyMonthIndexes[6]) {

                this.NumberOfMonthsToBeAdd = 18;

              } else {
                this.MonthlyTextDisorInable = false
              }

            } else if (activeMonth == 8) {
              this.MonthlyTextDisorInable = true;
              if (this.MonthlyMonthIndexes[8]) {
                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 20;
                } else {
                  this.NumberOfMonthsToBeAdd = 8;
                }
              } else if (this.MonthlyMonthIndexes[9]) {
                this.NumberOfMonthsToBeAdd = 9
              } else if (this.MonthlyMonthIndexes[10]) {
                this.NumberOfMonthsToBeAdd = 10
              } else if (this.MonthlyMonthIndexes[11]) {
                this.NumberOfMonthsToBeAdd = 11
              } else if (this.MonthlyMonthIndexes[0]) {
                this.NumberOfMonthsToBeAdd = 12
              } else if (this.MonthlyMonthIndexes[1]) {
                this.NumberOfMonthsToBeAdd = 13
              } else if (this.MonthlyMonthIndexes[2]) {
                this.NumberOfMonthsToBeAdd = 14
              } else if (this.MonthlyMonthIndexes[3]) {
                this.NumberOfMonthsToBeAdd = 15
              } else if (this.MonthlyMonthIndexes[4]) {
                this.NumberOfMonthsToBeAdd = 16
              } else if (this.MonthlyMonthIndexes[5]) {
                this.NumberOfMonthsToBeAdd = 17
              } else if (this.MonthlyMonthIndexes[6]) {
                this.NumberOfMonthsToBeAdd = 18
              } else if (this.MonthlyMonthIndexes[7]) {
                this.NumberOfMonthsToBeAdd = 19
              } else {
                this.MonthlyTextDisorInable = false;
              }

            } else if (activeMonth == 9) {
              this.MonthlyTextDisorInable = true;
              if (this.MonthlyMonthIndexes[9]) {
                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 21;
                } else {
                  this.NumberOfMonthsToBeAdd = 9;
                }
              } else if (this.MonthlyMonthIndexes[10]) {
                this.NumberOfMonthsToBeAdd = 10
              } else if (this.MonthlyMonthIndexes[11]) {
                this.NumberOfMonthsToBeAdd = 11
              } else if (this.MonthlyMonthIndexes[0]) {
                this.NumberOfMonthsToBeAdd = 12
              } else if (this.MonthlyMonthIndexes[1]) {
                this.NumberOfMonthsToBeAdd = 13
              } else if (this.MonthlyMonthIndexes[2]) {
                this.NumberOfMonthsToBeAdd = 14
              } else if (this.MonthlyMonthIndexes[3]) {
                this.NumberOfMonthsToBeAdd = 15
              } else if (this.MonthlyMonthIndexes[4]) {
                this.NumberOfMonthsToBeAdd = 16
              } else if (this.MonthlyMonthIndexes[5]) {
                this.NumberOfMonthsToBeAdd = 17
              } else if (this.MonthlyMonthIndexes[6]) {
                this.NumberOfMonthsToBeAdd = 18
              } else if (this.MonthlyMonthIndexes[7]) {
                this.NumberOfMonthsToBeAdd = 19
              } else if (this.MonthlyMonthIndexes[8]) {
                this.NumberOfMonthsToBeAdd = 20
              } else {
                this.MonthlyTextDisorInable = false;
              }

            } else if (activeMonth == 10) {
              this.MonthlyTextDisorInable = true;
              if (this.MonthlyMonthIndexes[10]) {
                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 22;
                } else {
                  this.NumberOfMonthsToBeAdd = 10;
                }
              } else if (this.MonthlyMonthIndexes[11]) {
                this.NumberOfMonthsToBeAdd = 11
              } else if (this.MonthlyMonthIndexes[0]) {
                this.NumberOfMonthsToBeAdd = 12
              } else if (this.MonthlyMonthIndexes[1]) {
                this.NumberOfMonthsToBeAdd = 13
              } else if (this.MonthlyMonthIndexes[2]) {
                this.NumberOfMonthsToBeAdd = 14
              } else if (this.MonthlyMonthIndexes[3]) {
                this.NumberOfMonthsToBeAdd = 15
              } else if (this.MonthlyMonthIndexes[4]) {
                this.NumberOfMonthsToBeAdd = 16
              } else if (this.MonthlyMonthIndexes[5]) {
                this.NumberOfMonthsToBeAdd = 17
              } else if (this.MonthlyMonthIndexes[6]) {
                this.NumberOfMonthsToBeAdd = 18
              } else if (this.MonthlyMonthIndexes[7]) {
                this.NumberOfMonthsToBeAdd = 19
              } else if (this.MonthlyMonthIndexes[8]) {
                this.NumberOfMonthsToBeAdd = 20
              } else if (this.MonthlyMonthIndexes[9]) {
                this.NumberOfMonthsToBeAdd = 21
              } else {
                this.MonthlyTextDisorInable = false;
              }

            } else if (activeMonth == 11) {
              this.MonthlyTextDisorInable = true;
              if (this.MonthlyMonthIndexes[11]) {
                if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
                  this.NumberOfMonthsToBeAdd = 23;
                } else {
                  this.NumberOfMonthsToBeAdd = 11;
                }
              } else if (this.MonthlyMonthIndexes[0]) {
                this.NumberOfMonthsToBeAdd = 12

              } else if (this.MonthlyMonthIndexes[1]) {
                this.NumberOfMonthsToBeAdd = 13
              } else if (this.MonthlyMonthIndexes[2]) {
                this.NumberOfMonthsToBeAdd = 14
              } else if (this.MonthlyMonthIndexes[3]) {
                this.NumberOfMonthsToBeAdd = 15
              } else if (this.MonthlyMonthIndexes[4]) {
                this.NumberOfMonthsToBeAdd = 16
              } else if (this.MonthlyMonthIndexes[5]) {
                this.NumberOfMonthsToBeAdd = 17
              } else if (this.MonthlyMonthIndexes[6]) {
                this.NumberOfMonthsToBeAdd = 18
              } else if (this.MonthlyMonthIndexes[7]) {
                this.NumberOfMonthsToBeAdd = 19
              } else if (this.MonthlyMonthIndexes[8]) {
                this.NumberOfMonthsToBeAdd = 20
              } else if (this.MonthlyMonthIndexes[9]) {
                this.NumberOfMonthsToBeAdd = 21
              } else if (this.MonthlyMonthIndexes[10]) {
                this.NumberOfMonthsToBeAdd = 22
              } else {
                this.MonthlyTextDisorInable = false;
              }

            }

          }


          if (this.CreatePokerTouranamentForm.value.MonthlyButtonRadio == "Days") {

            this.selectedDayInMonth = this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays

            console.log(this.CreatePokerTouranamentForm.value.MonthlyButtonRadio)
            console.log("inputDay", DailyInputFieldCurrentGMT.getDate());
            console.log("currentGMTDay", constantCurrentGmtTime.getDate());
            console.log("inputMonth", DailyInputFieldCurrentGMT.getMonth());
            console.log("currentGMTMonth", constantCurrentGmtTime.getMonth());
            console.log(this.MonthlyMonthIndexes)





            if (constantCurrentGmtTime.getDate() >= this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays) {
              DailyInputFieldCurrentGMT.setMonth(DailyInputFieldCurrentGMT.getMonth() + 1)
              DailyInputFieldCurrentGMT.setDate(this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays)
              if (this.NumberOfMonthsToBeAdd) {
                DailyInputFieldCurrentGMT.setMonth(this.NumberOfMonthsToBeAdd)
              }
            } else {
              DailyInputFieldCurrentGMT.setDate(this.CreatePokerTouranamentForm.value.MonthlySelectedInputDays)
              if (this.NumberOfMonthsToBeAdd) {
                DailyInputFieldCurrentGMT.setMonth(this.NumberOfMonthsToBeAdd)
              }
            }

            console.log("inputUpdatedDateAfterSelectingDays", DailyInputFieldCurrentGMT)

            inputFieldsDateTime = DailyInputFieldCurrentGMT
            currentDataTime = constantCurrentGmtTime

            const HformattedNameOfTheWeek = this.datePipe.transform(inputFieldsDateTime, "EEEE");
            const HformattedDayOfMonth = this.datePipe.transform(inputFieldsDateTime, 'd'); // Day of the month (1-31)
            const HformattedMonthFullName = this.datePipe.transform(inputFieldsDateTime, 'MMMM'); // Full name of the month
            const HformattedFullYear = this.datePipe.transform(inputFieldsDateTime, 'yyyy'); // Full year
            const HformattedTime = this.datePipe.transform(inputFieldsDateTime, 'HH:mm');

            const timeDifference = Math.abs(constantCurrentGmtTime.getTime() - inputFieldsDateTime.getTime());
            const Hdays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const Hhours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const Hminutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            if (this.MonthlyTextDisorInable) {
              this.getWeeklyAddSpecifiedDaysText = `The nearest tournament will start on
        ${HformattedNameOfTheWeek}, ${HformattedDayOfMonth} ${HformattedMonthFullName} 
        ${HformattedFullYear} ${HformattedTime} (UTC +00.00). ${Hdays} days(s) ${Hhours} hour(s) ${Hminutes} minute(s) left.`

            }

            else {
              this.getWeeklyAddSpecifiedDaysText = ""
            }

          } else if (this.CreatePokerTouranamentForm.value.MonthlyButtonRadio == "The") {

            // if(constantCurrentGmtTime.getDate() >= DailyInputFieldCurrentGMT.getDate()){
            //     DailyInputFieldCurrentGMT.setMonth(DailyInputFieldCurrentGMT.getMonth()+1);
            // }else{  
            //     DailyInputFieldCurrentGMT.setMonth(this.NumberOfMonthsToBeAdd);

            // }

            if (this.NumberOfMonthsToBeAdd) {

              DailyInputFieldCurrentGMT.setMonth(this.NumberOfMonthsToBeAdd)
            } else {

              DailyInputFieldCurrentGMT.setMonth(DailyInputFieldCurrentGMT.getMonth() + 1);
            }


            // DailyInputFieldCurrentGMT.setDate(1);
            console.log("Entering Into the Zone");
            console.log("User Selecting Month of The Week  :  ", this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeek);
            console.log("User Selecting Day Of The Week    :  ", this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeekDay);
            console.log("User Input Current Date           :  ", DailyInputFieldCurrentGMT);


            let selectingWeekOnTheMonth = 0
            if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeek == "first") {
              selectingWeekOnTheMonth = 0
            } else if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeek == "second") {
              selectingWeekOnTheMonth = 1
            } else if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeek == "third") {
              selectingWeekOnTheMonth = 2
            } else if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeek == "fourth") {
              selectingWeekOnTheMonth = 3
            } else if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeek == "last") {
              selectingWeekOnTheMonth = 4
            }

            for (let i = 0; i < this.TypeDayOfMonthList.length; i++) {
              if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeek == this.TypeDayOfMonthList[i].value) {
                this.selectedtypeDayOfMonth = this.TypeDayOfMonthList[i].guid
              }
            }

            console.log(this.TypeDayOfMonthList)
            console.log(this.selectedtypeDayOfMonth)

            let selectingDayOfTheWeek = 1;
            if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeekDay == "Sunday") {
              selectingDayOfTheWeek = 0;
            } else if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeekDay == "Monday") {
              selectingDayOfTheWeek = 1;
            } else if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeekDay == "Tuesday") {
              selectingDayOfTheWeek = 2;
            } else if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeekDay == "Wednesday") {
              selectingDayOfTheWeek = 3;
            } else if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeekDay == "Thursday") {
              selectingDayOfTheWeek = 4;
            } else if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeekDay == "Firday") {
              selectingDayOfTheWeek = 5;
            } else if (this.CreatePokerTouranamentForm.value.MonthlyButtonSelectedWeekDay == "Saturday") {
              selectingDayOfTheWeek = 6;
            }


            this.weekdayOfMonth = selectingDayOfTheWeek

            console.log("selectingWeekOfMonth            :  ", selectingDayOfTheWeek)
            let currentYear = DailyInputFieldCurrentGMT.getFullYear();
            let currentMonth = DailyInputFieldCurrentGMT.getMonth();

            console.log("InputCurrentYear                  : ", currentYear);
            console.log("InputCurrentMonth                 : ", currentMonth);

            const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
            const lastDayMonth = new Date(currentYear, currentMonth + 1, 0);

            console.log("firstDayOfMonth                      :", firstDayOfMonth);
            console.log("lastDayMonth                         :", lastDayMonth);



            let numberOfWeekDaysInMont = this.calculatingTheNumberOfWeekDaysInMonth(currentYear, currentMonth, selectingDayOfTheWeek);
            console.log(numberOfWeekDaysInMont);

            if (selectingWeekOnTheMonth < 4) {
              DailyInputFieldCurrentGMT = numberOfWeekDaysInMont[selectingWeekOnTheMonth]
            } else {
              if (numberOfWeekDaysInMont.length == 5) {
                DailyInputFieldCurrentGMT = numberOfWeekDaysInMont[selectingWeekOnTheMonth]
              } else {

                DailyInputFieldCurrentGMT.setMonth(DailyInputFieldCurrentGMT.getMonth() - 1);
                console.log(DailyInputFieldCurrentGMT);
                currentMonth = DailyInputFieldCurrentGMT.getMonth();
                numberOfWeekDaysInMont = this.calculatingTheNumberOfWeekDaysInMonth(currentYear, currentMonth, selectingDayOfTheWeek);
                console.log(numberOfWeekDaysInMont)
                DailyInputFieldCurrentGMT = numberOfWeekDaysInMont[numberOfWeekDaysInMont.length - 1]

              }
            }


            console.log(DailyInputFieldCurrentGMT)

            const timeParts = this.CreatePokerTouranamentForm.value.StartTime.split(':');
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10);
            DailyInputFieldCurrentGMT.setHours(DailyInputFieldCurrentGMT.getHours() + hours);
            DailyInputFieldCurrentGMT.setMinutes(DailyInputFieldCurrentGMT.getMinutes() + minutes);

            inputFieldsDateTime = DailyInputFieldCurrentGMT;
            currentDataTime = constantCurrentGmtTime;
            console.log(inputFieldsDateTime)
            const HformattedNameOfTheWeek = this.datePipe.transform(inputFieldsDateTime, "EEEE");
            const HformattedDayOfMonth = this.datePipe.transform(inputFieldsDateTime, 'd'); // Day of the month (1-31)
            const HformattedMonthFullName = this.datePipe.transform(inputFieldsDateTime, 'MMMM'); // Full name of the month
            const HformattedFullYear = this.datePipe.transform(inputFieldsDateTime, 'yyyy'); // Full year
            const HformattedTime = this.datePipe.transform(inputFieldsDateTime, 'HH:mm');

            const timeDifference = Math.abs(constantCurrentGmtTime.getTime() - inputFieldsDateTime.getTime());
            const Hdays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const Hhours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const Hminutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            if (this.MonthlyTextDisorInable) {
              this.getWeeklyAddSpecifiedDaysText = `The nearest tournament will start on
                  ${HformattedNameOfTheWeek}, ${HformattedDayOfMonth} ${HformattedMonthFullName} 
                  ${HformattedFullYear} ${HformattedTime} (UTC +00.00). ${Hdays} days(s) ${Hhours} hour(s) ${Hminutes} minute(s) left.`

            }

            else {
              this.getWeeklyAddSpecifiedDaysText = ""
            }


          }




        }

      }

      // <-----------------------------------------------------------------MONTHLY SCHEDULE ENDS--------------------------------------------------->

      let selectedItem = this.SeletedPeriodTypes.filter((eachItem: any) => {
        if (this.AnnouncePeriodDefaultValue?.hiLong == eachItem.guid?.hiLong && this.AnnouncePeriodDefaultValue?.lowLong == eachItem.guid?.lowLong) {
          console.log(eachItem)
          return eachItem
        }
      })

      let selectedRegistationItem = this.SeletedPeriodTypes.filter((eachItem: any) => {
        if (this.RegistrantionPeriodDefaultValue?.hiLong == eachItem.guid?.hiLong && this.RegistrantionPeriodDefaultValue?.lowLong == eachItem.guid?.lowLong) {
          console.log(eachItem)
          return eachItem
        }
      })

      console.log(selectedItem[0].value) //AnnouncePeriodDefaultValue
      console.log(selectedRegistationItem[0].value) //RegistrantionPeriodDefaultValue







      // <---------------------------------------------REGISTRANTION PERIOD VALIDATION START ----------------------------------->


      this.registationPeriodValidationStart(selectedRegistationItem,selectedItem,inputFieldsDateTime,currentDataTime);

     // <---------------------------------------------REGISTRANTION PERIOD VALIDATION ENDS ------------------------------------>



      // <------------------------------------------- ANNOUNCE PERIOD VALIDATIONS  STARTS --------------------------------------->
      
      
      this.announcePeriodValidationStart(selectedRegistationItem,selectedItem,inputFieldsDateTime,currentDataTime,);

      // <------------------------------------------- ANNOUNCE PERIOD VALIDATIONS  ENDS --------------------------------------->


      // <---------------------------------------------SEATING PERIOD VALIDATION STARTS ------------------------------------>

      console.log(this.SeatingPeriodDefaultValue);

      let selectedTimePeriodItem = this.SeletedTimePeriods.filter((eachItem: any) => {
        if (this.SeatingPeriodDefaultValue?.hiLong == eachItem.guid?.hiLong && this.SeatingPeriodDefaultValue?.lowLong == eachItem.guid?.lowLong) {
          console.log(eachItem)
          return eachItem
        }
      })
      console.log(selectedTimePeriodItem[0].value);
      console.log(selectedRegistationItem[0].value)
      if (selectedRegistationItem[0].value == "Minutes" && selectedTimePeriodItem[0].value == "Minutes") {
        console.log(this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue);//6
        console.log(this.CreatePokerTouranamentForm.value.SeatingPeriodValue);//10


        if (this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue < this.CreatePokerTouranamentForm.value.SeatingPeriodValue) {
          this.SeatingPeriodTextCss = true;
          this.SeatingPeriodText = "Seating period should be less than registration period."
        } else {
          this.SeatingPeriodTextCss = false;
          this.SeatingPeriodText = ""
        }

      } else {
        this.SeatingPeriodTextCss = false;
        this.SeatingPeriodText = ""

      }

      // <---------------------------------------------SEATING PERIOD VALIDATION ENDS ------------------------------------>
    }

    console.log("this.onlyOnceTextCss : ", this.onlyOnceTextCss)
    console.log("this.AnnouncePeriodTextCss  :  ", this.AnnouncePeriodTextCss)
    console.log("this.registrationPeriodTextCss  :  ", this.registrationPeriodTextCss)
    console.log("this.SeatingPeriodTextCss  : ", this.SeatingPeriodTextCss)


    // if(this.onlyOnceTextCss && this.AnnouncePeriodTextCss && this.registrationPeriodTextCss && (this.SeatingPeriodTextCss == false)) {
    if (this.AnnouncePeriodTextCss && this.registrationPeriodTextCss && (this.SeatingPeriodTextCss == false)) {
      this.saveButton = true;
    } else {
      this.saveButton = false;
    }

    // this.saveButtonEdit.emit(this.saveButton);
    this.SatelliteSeriesService.clickOnsaveButton(this.saveButton)

  }




  calculatingTheNumberOfWeekDaysInMonth(currentYear: number, currentMonth: number, selectingDayOfTheWeek: number) {

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayMonth = new Date(currentYear, currentMonth + 1, 0);
    const numberOfWeekDaysInMonth = [];
    for (let i = 0; firstDayOfMonth <= lastDayMonth; i++) {
      if (firstDayOfMonth.getDay() === selectingDayOfTheWeek) { // Monday (0-based index)
        numberOfWeekDaysInMonth.push(new Date(firstDayOfMonth));
      }
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);

    }
    return numberOfWeekDaysInMonth;
  };

  getWeeklyAddSpecifiedDays(currentDataTime: Date, days: number) {
    const newDate = new Date(currentDataTime);
    console.log(newDate)
    newDate.setDate(newDate.getDate() + days)
    return newDate

  }

  getWeekEndOnly(date: Date, weekdays: number) {

    let newDate = new Date(date);
    const dayOfWeek = newDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    console.log(dayOfWeek)
    let addedDays: number;
    switch (dayOfWeek) {
      case 0:
        addedDays = 7;
        break;
      case 1:
        addedDays = 6;
        break;
      case 2:
        addedDays = 5;
        break;
      case 3:
        addedDays = 4;
        break;
      case 4:
        addedDays = 3;
        break;
      case 5:
        addedDays = 2
        break;
      case 6:
        addedDays = 1
        break;
      default:
        addedDays = 0;
        break;
    }
    newDate.setDate(newDate.getDate() + addedDays); // Move to the next day 
    return newDate;
  }
  getWeekDaysOnly(date: Date, weekdays: number) {

    let newDate = new Date(date);
    const dayOfWeek = newDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    newDate.setDate(newDate.getDate() + 1); // Move to the next day
    const newDayOfWeek = newDate.getDay();

    if (newDayOfWeek == 0) {
      newDate.setDate(newDate.getDate() + 1); // Move to the next day
    } else if (newDayOfWeek == 6) {
      newDate.setDate(newDate.getDate() + 2); // Move to the next day
    }
    return newDate;
  }

  substractSpecifiedMonths(currentDataTime: Date, months: number) {
    const newDate = new Date(currentDataTime);
    console.log(newDate)
    const currentYear = newDate.getFullYear();
    const currentMonth = newDate.getMonth() + 1;
    const numberOfDays = new Date(currentYear, currentMonth, 0).getDate();
    console.log(numberOfDays);

    newDate.setMonth(newDate.getMonth() - months)
    return newDate

  }
  substractSpecifiedWeeks(currentDataTime: Date, weeks: number) {
    const newDate = new Date(currentDataTime);
    console.log(newDate)
    newDate.setDate(newDate.getDate() - weeks * 7)
    return newDate

  }

  substractSpecifieddays(currentDataTime: Date, days: number) {
    console.log("change days input field", currentDataTime)
    console.log("number Of days detect : ", days)

    const newDate = new Date(currentDataTime);
    console.log(newDate)
    newDate.setDate(newDate.getDate() - days)
    return newDate
  }

  substractSpecifiedHours(inputDate: Date, hours: number) {
    console.log("currentDate   :  ", inputDate)
    console.log("substract from from currentDate : ", hours)
    const presentData = new Date(inputDate)
    presentData.setHours(presentData.getHours() - hours)
    return presentData

  }

  substractSpeciMinutes(currentDataTime: Date, minutes: number) {
    const presentData = new Date(currentDataTime)
    presentData.setMinutes(presentData.getMinutes() - minutes)
    return presentData
  }






  GamesConfig() {
    const GamesConfig = localStorage.getItem('GamesConfig')
    if (GamesConfig) {
      this.GamesConfigList = JSON.parse(GamesConfig)
      console.log("GamesConfig", this.GamesConfigList)
      console.log("GamesConfig", this.GamesConfigList.games)
    }
    let gamesListofarrays = this.GamesConfigList?.games



    console.log("gamesListofarraysss", gamesListofarrays)

    let gamescaption: any[] = [];
    for (let i = 0; i < gamesListofarrays?.length; i++) {

      if (gamesListofarrays[i].caption) {

        if (gamesListofarrays[i].name.startsWith("POKER_")) {
          gamescaption.push(gamesListofarrays[i].caption)
        }

        if (gamesListofarrays[i].name.startsWith("POKER_") || this.CreatePokerTouranamentForm.value.MoneyType) {
          this.onlyPokerGames.push(gamesListofarrays[i].name)
        }

      }
    }
    console.log("onlyPokerGames", this.onlyPokerGames)
    console.log("gamescaption", gamescaption)

    this.uniquegamescaption = gamescaption.filter((item, i) => {
      return gamescaption.indexOf(item) === i
    })
    console.log("uniquegamescaption", this.uniquegamescaption)
  }

  onSelected(value: any =""): void {
    console.log(this.selectedCurrency)

    // if (this.selectedCurrency.hiLong == 0 && this.selectedCurrency.lowLong == 1840) {
    //   this.chip = "USD"

    // } else if (this.selectedCurrency.hiLong == 0 && this.selectedCurrency.lowLong == 6) {
    //   this.chip = "CHP"
    // } else if (this.selectedCurrency.hiLong == 0 && this.selectedCurrency.lowLong == 2) {
    //   this.chip = "Play Money"
    // }
    // console.log(this.chip);


    this.walletFormats = localStorage.getItem("walletFormats")
    this.walletFormats = JSON.parse(this.walletFormats);
    console.log(this.walletFormats);
    console.log(this.CreatePokerTouranamentForm.value.Currency);
    console.log(this.selectedCurrency)

    for (let i = 0; i < this.walletFormats.length; i++) {
      if (this.walletFormats[i].guid?.hiLong == this.selectedCurrency?.hiLong && this.walletFormats[i].guid?.lowLong == this.selectedCurrency?.lowLong) {
        console.log(this.walletFormats[i]);
        if (this.walletFormats[i].currencyCode) {
          this.chip = this.walletFormats[i].currencyCode
        } else {
          for (let j = 0; this.currencyList.length; j++) {
            console.log(this.currencyList[j].guid?.hiLong, this.currencyList[j].guid?.lowLong)
            if (this.currencyList[j].guid?.hiLong == this.selectedCurrency?.hiLong && this.currencyList[j].guid?.lowLong == this.selectedCurrency?.lowLong) {
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



    // this.selectedCurrency = this.CreatePokerTouranamentForm.value.Currency;
    if (this.selectedCurrency) {
      let gamesListofarrays = this.GamesConfigList.games
      console.log(gamesListofarrays)
      let gamescaption: any[] = [];

      for (let i = 0; i < gamesListofarrays.length; i++) {
        if (gamesListofarrays[i].name.startsWith("POKER_")) {
          gamescaption.push(gamesListofarrays[i])

          this.selectedTable = gamescaption.filter((game: any) => {

            return game.wallet?.lowLong === this.selectedCurrency?.lowLong && game.wallet?.hiLong === this.selectedCurrency?.hiLong
          });

        }

      }
      console.log("selectedTable", this.selectedTable);
      this.Onlygamescaption = []
      for (let i = 0; i < this.selectedTable.length; i++) {

        // console.log(this.selectedTable[i].caption)
        // console.log(this.selectedCurrency.lowLong)
        // console.log(this.selectedCurrency.lowLong == 2)
        if (this.selectedCurrency?.lowLong == this.selectedTable[i].wallet?.lowLong && this.selectedCurrency?.hiLong == this.selectedTable[i].wallet?.hiLong) {

          // delete this.Onlygamescaption[i]
          this.Onlygamescaption.push(this.selectedTable[i].caption);
          // console.log(this.Onlygamescaption);
          // this.defaultSelectedOption = this.selectedTable[0].caption;
         
          
        }
        // else if (this.selectedCurrency.lowLong == 1840) {

        //   delete this.Onlygamescaption[i]

        //   this.Onlygamescaption.push(this.selectedTable[i].caption)

        // }
        // else {
        //   delete this.Onlygamescaption[i]

        //   this.Onlygamescaption.push(this.selectedTable[i].caption)
        // }
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

  BirthdayMonths() {
    const BirthdatMonths = localStorage.getItem("BirthdatMonths");
    if (BirthdatMonths) {
      this.MonthsList = JSON.parse(BirthdatMonths);
      console.log("MonthsList", this.MonthsList)
    }
  }
  TypeDayOfMonth() {
    const TypeDayOfMonth = localStorage.getItem("TypeDayOfMonth");
    if (TypeDayOfMonth) {
      this.TypeDayOfMonthList = JSON.parse(TypeDayOfMonth)
      this.selectedtypeDayOfMonth = this.TypeDayOfMonthList[0]?.guid
    }
    console.log("TypeDayOfMonthList", this.TypeDayOfMonthList)
  }
  LateRegistrationType() {
    const LateRegistrationType = localStorage.getItem("LateRegistrationType");
    if (LateRegistrationType) {
      this.LateRegistrationTypeList = JSON.parse(LateRegistrationType)
    }
    console.log("LateRegistrationTypeList", this.LateRegistrationTypeList)
  }
  TourneySynchroModeType() {
    const TourneySynchroModeType = localStorage.getItem("TourneySynchroModeType");
    if (TourneySynchroModeType) {
      this.TourneySynchroModeTypeList = JSON.parse(TourneySynchroModeType)
      this.defaultTournamentMoneyCheck = this.TourneySynchroModeTypeList[0]?.guid
    }
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
  ShareType() {
    const ShareType = localStorage.getItem('ShareType');
    if (ShareType) {
      this.ShareTypeList = JSON.parse(ShareType)
    }
    console.log("ShareTypeList", this.ShareTypeList)
  }
  onSelectedRadio(data: any) {
    // var test = document.getElementById("raju")
    // console.log()
    // this.isChecked=data
    console.log(this.ScheduleTypeList)
    console.log(this.isChecked)
    console.log(data)

    for (let i = 0; i < this.ScheduleTypeList.length; i++) {
      if (data === this.ScheduleTypeList[i].value) {
        this.ScheduleTypeGuid = this.ScheduleTypeList[i].guid
      }
    }


    if (data == "Once") {
      this.AnnouncePeriodDefaultValue = this.SeletedPeriodTypes[2].guid
      this.RegistrantionPeriodDefaultValue = this.SeletedPeriodTypes[1].guid;
      this.CompletedPeriodDefaultValue = this.SeletedPeriodTypes[1].guid;
      this.SeatingPeriodDefaultValue = this.SeletedTimePeriods[1].guid;
      this.tournamentStartValidation();
      // this.ScheduleTypeGuid = this.ScheduleTypeList[0].guid


    } else if (data == "Hourly") {
      this.CreatePokerTouranamentForm.patchValue({
        AnnouncePeriodValue: 1,
        RegistrantionPeriodValue: 6,
        CompletedPeriodValue: 3,
        SeatingPeriodValue: 1

      });
      this.AnnouncePeriodDefaultValue = this.SeletedPeriodTypes[2].guid
      this.RegistrantionPeriodDefaultValue = this.SeletedPeriodTypes[1].guid;
      this.CompletedPeriodDefaultValue = this.SeletedPeriodTypes[1].guid;
      this.SeatingPeriodDefaultValue = this.SeletedTimePeriods[1].guid;
      this.tournamentStartValidation();
      // this.ScheduleTypeGuid = this.ScheduleTypeList[4].guid

    } else if (data == "Daily") {
      this.CreatePokerTouranamentForm.patchValue({
        AnnouncePeriodValue: 1,
        RegistrantionPeriodValue: 6,
        CompletedPeriodValue: 1,
        SeatingPeriodValue: 1

      });
      this.AnnouncePeriodDefaultValue = this.SeletedPeriodTypes[2].guid
      this.RegistrantionPeriodDefaultValue = this.SeletedPeriodTypes[1].guid;
      this.CompletedPeriodDefaultValue = this.SeletedPeriodTypes[2].guid;
      this.SeatingPeriodDefaultValue = this.SeletedTimePeriods[1].guid;
      this.tournamentStartValidation();
      // this.ScheduleTypeGuid = this.ScheduleTypeList[1].guid

    } else if (data == "Weekly") {
      this.CreatePokerTouranamentForm.patchValue({
        AnnouncePeriodValue: 1,
        RegistrantionPeriodValue: 6,
        CompletedPeriodValue: 1,
        SeatingPeriodValue: 1

      });

      this.AnnouncePeriodDefaultValue = this.SeletedPeriodTypes[3].guid
      this.RegistrantionPeriodDefaultValue = this.SeletedPeriodTypes[1].guid;
      this.CompletedPeriodDefaultValue = this.SeletedPeriodTypes[3].guid;
      this.SeatingPeriodDefaultValue = this.SeletedTimePeriods[0].guid;
      this.tournamentStartValidation();
      // this.ScheduleTypeGuid = this.ScheduleTypeList[2].guid

    } else if (data = "Monthly") {

      this.CreatePokerTouranamentForm.patchValue({
        AnnouncePeriodValue: 1,
        RegistrantionPeriodValue: 6,
        CompletedPeriodValue: 1,
        SeatingPeriodValue: 1

      });

      this.AnnouncePeriodDefaultValue = this.SeletedPeriodTypes[4].guid
      this.RegistrantionPeriodDefaultValue = this.SeletedPeriodTypes[1].guid;
      this.CompletedPeriodDefaultValue = this.SeletedPeriodTypes[4].guid;
      this.SeatingPeriodDefaultValue = this.SeletedTimePeriods[0].guid;
      this.tournamentStartValidation();
      // this.ScheduleTypeGuid = this.ScheduleTypeList[3].guid

    }
  }
  onSelectedDate(data: Date): void {
    console.log(data)
    this.startDate = data
  }


  ViewPayoutTable(data: any = {}) {


    this.selectedIndex = this.OnlyFloatPayoutTables.findIndex((item: any) => {
      if(item.guid?.hiLong == this.pokerPayoutValue?.hiLong &&
         item.guid?.lowLong == this.pokerPayoutValue?.lowLong ){
        return true ;
      }else{
        return false;
      }
    });

    console.log(this.selectedIndex);
    console.log(this.OnlyFloatPayoutTables[this.selectedIndex])
    this.selectedViewItem = this.OnlyFloatPayoutTables[this.selectedIndex]
    console.log("selectedViewItem    : ", this.selectedViewItem)


  }

  clickToViewPayoutTable() {
    this.viewPayOutTablePopup = true
    this.ViewPayoutTable()

    if (this.selectedViewItem?.structureType === "Fixed") {
      for (let j = 0; j < this.selectedViewItem.ticketTypes.length; j++) {

        for (let k = 0; k < this.PayoutTicketTypeList.length; k++) {
          if (this.selectedViewItem.ticketTypes[j] != null) {
            if (this.selectedViewItem.ticketTypes[j]?.lowLong == this.PayoutTicketTypeList[k].guid?.lowLong) {
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
    this.viewPayOutTablePopup = false;


  }

  showpopupBlindStructure() {
    console.log(this.selectedBlindStructureView)
    this.BlindStructureshow = true;
    console.log(this.CreatePokerTouranamentForm.value.BlindStructure)
    console.log(this.defaultBlindStuctureOption)
    this.selectedBlindStructureIndex = this.pokerBlindStructureResData.findIndex((item: any) => {
      // return item.guid == this.CreatePokerTouranamentForm.value.BlindStructure;
      return item.guid == this.defaultBlindStuctureOption;
    });
    this.selectedBlindStructureView = this.pokerBlindStructureResData[this.selectedBlindStructureIndex]
    console.log(this.selectedBlindStructureView)
    
    console.log(this.selectedBlindStructureIndex);
    console.log(this.pokerBlindStructureResData[this.selectedBlindStructureIndex])

  }

  BlindStructureclosepopup() {
    this.BlindStructureshow = false;
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
          //     dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }

  tournamentErrorclosepopup = () => {
    this.tournamentErrorTextBoolValue = false

  }

  SuccessPop() {
    this.CreateSuccessPop = false;
    // window.location.reload();
    this.closeEditPopup.emit(this.CreateSuccessPop);
    this.router.navigateByUrl('/pokertournaments');

  }
  TechnicalError() {
    this.ErrorPopup = false;
    // window.location.reload();
  }

  cancelSatellitePopup() {
    // this.createTournamentPopup = false    
    this.exitSatellitePopup.emit(false)
  }


  onFormSubmit() {
    var breakLengthmillisec: any
    if (this.BreakLengthMinTypeDefaultOption == "Minutes") {
      breakLengthmillisec = this.CreatePokerTouranamentForm.value.BreakLengthMin * Math.floor(60 * 1000)
    } else if (this.BreakLengthMinTypeDefaultOption == "Hours") {
      breakLengthmillisec = this.CreatePokerTouranamentForm.value.BreakLengthMin * Math.floor(60 * 60 * 1000)
    } else if (this.BreakLengthMinTypeDefaultOption == "Days") {
      breakLengthmillisec = this.CreatePokerTouranamentForm.value.BreakLengthMin * Math.floor(24 * 60 * 60 * 1000)
    }



    console.log(this.isChecked)
    console.log(this.CreatePokerTouranamentForm.value)
    console.log(this.CreatePokerTouranamentForm.value.GameType)
    console.log(this.CreatePokerTouranamentForm.value.BreakLengthMinType);
    console.log(this.totalCostValue, this.CreatePokerTouranamentForm.value.MarketingFee)



    // let moneyType = this.CreatePokerTouranamentForm.value.Currency;
    let moneyType = this.selectedCurrency;
    console.log(moneyType)
    let selectdeCaption = this.GamesConfigList.games.filter((game: any) => {
      // return game.caption === this.CreatePokerTouranamentForm.value.GameType;
      return game.caption === this.defaultSelectedOption;
    });
    console.log(selectdeCaption);
    this.finalCaption = selectdeCaption.filter((table: any) => {
      return table.wallet?.hiLong === moneyType?.hiLong && table.wallet?.lowLong === moneyType?.lowLong
    });
    console.log(this.finalCaption);

    // TourneySynchroModeTypeList
    for (let k = 0; k < this.TourneySynchroModeTypeList.length; k++) {
      if (this.CreatePokerTouranamentForm.value.BubbleFinalTable == this.TourneySynchroModeTypeList[k].value) {
        console.log(this.TourneySynchroModeTypeList[k].guid);
        this.synchroModeType = this.TourneySynchroModeTypeList[k].guid;
      }
    }

    // let fillterbody = this.getDirtyValues(this.filterForm)
    this.CreatePokerTouranamentForm.patchValue({
      AnnouncePeriodType: this.AnnouncePeriodDefaultValue,
      BlindStructure: this.defaultBlindStuctureOption,
      RegistrantionPeriodType: this.RegistrantionPeriodDefaultValue,
      CompletedPeriodType: this.CompletedPeriodDefaultValue,
      SeatingPeriodType: this.SeatingPeriodDefaultValue
    })
    let fillterbody = this.getDirtyValues(this.CreatePokerTouranamentForm);


    // let LateRegistrationTypeListGuid: any = this.LateRegistrationTypeList[0].guid
    // let LateRegistrationTypeListGuid: any = null

    // if (this.CreatePokerTouranamentForm.value.LateRegistrantion) {
    //   alert("1")
    //   for (let i = 0; this.LateRegistrationTypeList.length; i++) {
    //     if (this.LateRegistrationTypeList[i]?.value == this.CreatePokerTouranamentForm.value.LateRegistrantionRadio) {
    //       alert("12")
    //       LateRegistrationTypeListGuid = this.LateRegistrationTypeList[i].guid;
    //       console.log("LateRegistrationTypeListGuid  :",  LateRegistrationTypeListGuid);
    //       console.log(this.LateRegistrationTypeList[i]?.value  +"   "+  this.CreatePokerTouranamentForm.value.LateRegistrantionRadio);

    //     }

    //   }

    // }




    // fillterbody['forceSave'] = false;

    // ************** Genaral


    fillterbody['caption'] = this.CreatePokerTouranamentForm.value.Name != (null) ? this.CreatePokerTouranamentForm.value.Name : undefined;
    fillterbody['description'] = this.CreatePokerTouranamentForm.value.Description;
    fillterbody['password'] = this.CreatePokerTouranamentForm.value.Password != null ? this.CreatePokerTouranamentForm.value.Password : undefined;
    fillterbody['gameName'] = this.finalCaption[0].name != null ? this.finalCaption[0].name : undefined;
    fillterbody['seats'] = this.CreatePokerTouranamentForm.value.Seats != null ? Number(this.CreatePokerTouranamentForm.value.Seats) : undefined;
    fillterbody['minPlayers'] = this.CreatePokerTouranamentForm.value.MinPlayers != null ? this.CreatePokerTouranamentForm.value.MinPlayers : undefined;
    fillterbody['maxPlayers'] = this.CreatePokerTouranamentForm.value.MaxPlayers != null ? this.CreatePokerTouranamentForm.value.MaxPlayers : undefined;
    fillterbody['chipsPerPlayer'] = this.CreatePokerTouranamentForm.value.ChipsperPlayer != null ? { "value": this.CreatePokerTouranamentForm.value.ChipsperPlayer } : undefined;

    // **************Accessibility
    fillterbody['accessRule'] = this.CreatePokerTouranamentForm.value.AccessRuleName != null ? this.CreatePokerTouranamentForm.value.AccessRuleName : undefined;
    //  fillterbody['accessRule'] = {
    //               "hiLong": 332,
    //               "lowLong": 1813755
    //           };
    fillterbody['chatAccessibility'] = this.CreatePokerTouranamentForm.value.ChatAccesability != null ? this.CreatePokerTouranamentForm.value.ChatAccesability : undefined,
      fillterbody['enableNow'] = this.CreatePokerTouranamentForm.value.EnableNow != null ? this.CreatePokerTouranamentForm.value.EnableNow : undefined;


    // **************Prizes Settings
    fillterbody['guarantedPrize'] = this.CreatePokerTouranamentForm.value.GuaranteedPrize != null ? {
      "value": this.CreatePokerTouranamentForm.value.GuaranteedPrize,
      // "wallet": this.CreatePokerTouranamentForm.value.Currency
      "wallet": this.selectedCurrency
    } : undefined;
    fillterbody['manualPrizePoolTourney'] = this.CreatePokerTouranamentForm.value.ManualPoolPrize != null ? this.CreatePokerTouranamentForm.value.ManualPoolPrize : undefined;
    fillterbody['payoutId'] = this.CreatePokerTouranamentForm.value.PayoutTable != null ? this.CreatePokerTouranamentForm.value.PayoutTable : undefined;
    if (this.CreatePokerTouranamentForm.value.NotifyPlayers) {
      if(this.EditPokerTourneyData ==null){
        fillterbody['resultNotificationType'] = this.CreatePokerTouranamentForm.value.NotifyPlayersType != null ? this.CreatePokerTouranamentForm.value.NotifyPlayersType : undefined; //commented for edit satellite creation
      }
      
      fillterbody['resultNotificationPlaces'] = this.CreatePokerTouranamentForm.value.NotifyPlayersPlaces;
      fillterbody['resultNotificationTemplateId'] = this.CreatePokerTouranamentForm.value.usingtemplate != null ? this.CreatePokerTouranamentForm.value.usingtemplate : undefined;

    } else {
      fillterbody['resultNotificationPlaces'] = 0;
    }


    // **************Buy In Settings
    fillterbody['allowCash'] = this.CreatePokerTouranamentForm.value.Chips == true ? this.CreatePokerTouranamentForm.value.Chips : this.CreatePokerTouranamentForm.value.Freeroll;
    // fillterbody['allowCash'] = true;
    fillterbody['allowCompPoints'] = this.CreatePokerTouranamentForm.value.CompPoints;
    fillterbody['allowTournamentMoney'] = this.CreatePokerTouranamentForm.value.TournamentMoney;
    fillterbody['allowTournamentTickets'] = this.CreatePokerTouranamentForm.value.Tickets;
    if (this.CreatePokerTouranamentForm.value.Freeroll == false) {
      fillterbody['buyIn'] = this.CreatePokerTouranamentForm.value.BuyIn != null ? {
        "value": this.CreatePokerTouranamentForm.value.BuyIn,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency
        "wallet": this.selectedCurrency
      } : undefined;
      fillterbody['fee'] = this.CreatePokerTouranamentForm.value.Fee != null ? {
        "value": this.CreatePokerTouranamentForm.value.Fee,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency
        "wallet": this.selectedCurrency
      } : undefined;



      fillterbody['maintenanceFee'] = this.CreatePokerTouranamentForm.value.MarketingFee != null ? {
        "value": this.CreatePokerTouranamentForm.value.MarketingFee,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency,
        "wallet": this.selectedCurrency,
      } : {
        "value": 0,
        "wallet": this.selectedCurrency,
      };


      // fillterbody['progressiveKnockOutTournaments'] = this.CreatePokerTouranamentForm.value.KnockoutBountyCheck
      // if (this.CreatePokerTouranamentForm.value.KnockoutBountyCheck) {
      fillterbody['knockoutBounty'] = this.CreatePokerTouranamentForm.value.KnockoutBounty >= 0 ? {
        "value": this.CreatePokerTouranamentForm.value.KnockoutBounty,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency
        "wallet": this.selectedCurrency
      } : {
        "value": 0,
        "wallet": this.selectedCurrency
      };

      // }

    } else {
      fillterbody['buyIn'] = {
        "value": 0,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency
        "wallet": this.selectedCurrency
      };
      fillterbody['fee'] = {
        "value": 0,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency
        "wallet": this.selectedCurrency
      };
      fillterbody['maintenanceFee'] = {
        "value": 0,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency,
        "wallet": this.selectedCurrency,
      };
      fillterbody['knockoutBounty'] = {
        "value": 0,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency,
        "wallet": this.selectedCurrency,
      };

    }
    fillterbody['brandedTourney'] = this.CreatePokerTouranamentForm.value.brandedTournament;
    fillterbody['brandedTourneyImage'] = this.CreatePokerTouranamentForm.value.BrandedURl != null ? this.CreatePokerTouranamentForm.value.BrandedURl : "";



    fillterbody['totalCost'] = {
      // "value":  parseInt(this.CreatePokerTouranamentForm.value.Fee) + parseInt(this.CreatePokerTouranamentForm.value.BuyIn) + parseInt(this.CreatePokerTouranamentForm.value.KnockoutBounty),
      // "value": this.totalCostValue,
      "value":parseInt(this.totalCostValue) - this.CreatePokerTouranamentForm.value.MarketingFee,
      // "wallet": this.CreatePokerTouranamentForm.value.Currency
      "wallet": this.selectedCurrency
    }

    // fillterbody['progressiveKnockOutTournaments'] = this.CreatePokerTouranamentForm.value.ProgressiveKnockoutCheck != null ? this.CreatePokerTouranamentForm.value.ProgressiveKnockoutCheck:undefined ;
    fillterbody['progressiveKnockOutTournaments'] = this.CreatePokerTouranamentForm.value.Freeroll == true ? false : this.CreatePokerTouranamentForm.value.ProgressiveKnockoutCheck;
    fillterbody['progressiveKnockOutTournamentPercentage'] = this.CreatePokerTouranamentForm.value.KnockoutPercentage != null ? this.CreatePokerTouranamentForm.value.KnockoutPercentage : undefined;


    // ************** Advanced
    // ************** Level Settings


    fillterbody['levelLength'] = this.CreatePokerTouranamentForm.value.LevelLengthmin != null ?
      this.CreatePokerTouranamentForm.value.LevelLengthmin * Math.floor(60 * 1000) : undefined;
    fillterbody['levelsBeforeBreak'] = this.CreatePokerTouranamentForm.value.LevelsbeforeBreak != null ? this.CreatePokerTouranamentForm.value.LevelsbeforeBreak : undefined;
    // fillterbody['breakLength'] = this.CreatePokerTouranamentForm.value.BreakLengthMin != null ? this.CreatePokerTouranamentForm.value.BreakLengthMin * Math.floor(60 * 1000) : undefined;
    fillterbody['breakLength'] = breakLengthmillisec;
    // fillterbody['breakTimeAfterAddon'] = this.CreatePokerTouranamentForm.value.LevelsLengthAfterAddonBreak != null ? this.CreatePokerTouranamentForm.value.LevelsLengthAfterAddonBreak ** Math.floor(60 * 1000) : 0;
    fillterbody['breakTimeAfterAddon'] = this.CreatePokerTouranamentForm.value.LevelsLengthAfterAddonBreak != null ? this.CreatePokerTouranamentForm.value.LevelsLengthAfterAddonBreak : 0;
    fillterbody['blindId'] = this.CreatePokerTouranamentForm.value.BlindStructure != null ? this.CreatePokerTouranamentForm.value.BlindStructure : undefined;
    // fillterbody['blindId'] = this.defaultBlindStuctureOption != null ? this.defaultBlindStuctureOption : undefined;
    fillterbody['synchronizedTourney'] = this.CreatePokerTouranamentForm.value.SynchronizedBreak != null ? this.CreatePokerTouranamentForm.value.SynchronizedBreak : undefined;
    fillterbody['pauseOnFinalTable'] = this.CreatePokerTouranamentForm.value.PauseTournament != null ? this.CreatePokerTouranamentForm.value.PauseTournament : undefined;
    if (this.CreatePokerTouranamentForm.value.PauseTournament) {
      fillterbody['descriptionForPauseOnFinalTable'] = this.CreatePokerTouranamentForm.value.MessagetoPlayers != null ? this.CreatePokerTouranamentForm.value.MessagetoPlayers : undefined;
    }

    // **************Time Out Settings
    fillterbody['actionTimeOut'] = this.CreatePokerTouranamentForm.value.ActionTimeout != null ? this.CreatePokerTouranamentForm.value.ActionTimeout * Math.floor(1000) : undefined;
    fillterbody['playerTimeBank'] = this.CreatePokerTouranamentForm.value.TimeBank != null ? this.CreatePokerTouranamentForm.value.TimeBank * Math.floor(1000) : undefined;
    fillterbody['additionalTimeBank'] = this.CreatePokerTouranamentForm.value.TimeBankAutoincrementAmount != null ? this.CreatePokerTouranamentForm.value.TimeBankAutoincrementAmount * Math.floor(1000) : undefined;

    // **************Hand to Hand Settings
    // fillterbody['synchroModeType'] = this.CreatePokerTouranamentForm.value.BubbleFinalTable != null ? this.CreatePokerTouranamentForm.value.BubbleFinalTable : undefined;
    fillterbody['synchroModeType'] = this.defaultTournamentMoneyCheck != null ? this.defaultTournamentMoneyCheck : undefined;


    // "synchroModeType": this.synchroModeType,

    // **************Re-Buy
    if (this.CreatePokerTouranamentForm.value.Rebuys) {
      fillterbody['rebuyChips'] = this.CreatePokerTouranamentForm.value.RebuyAmount != null ?
        { "value": this.CreatePokerTouranamentForm.value.RebuyAmount } : undefined;
      fillterbody['rebuyCost'] = this.CreatePokerTouranamentForm.value.RebuyCost != null ? {
        "value": this.CreatePokerTouranamentForm.value.RebuyCost,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency
        "wallet": this.selectedCurrency
      } : undefined;
      fillterbody['rebuyCount'] = this.CreatePokerTouranamentForm.value.MaxRebuysperPlayer != null ? this.CreatePokerTouranamentForm.value.MaxRebuysperPlayer : undefined;


      fillterbody['addonChips'] = this.CreatePokerTouranamentForm.value.AddonAmount >= 0 ? { "value": this.CreatePokerTouranamentForm.value.AddonAmount } : undefined;
      fillterbody['addonCost'] = this.CreatePokerTouranamentForm.value.AddonCost >= 0 ? {
        "value": this.CreatePokerTouranamentForm.value.AddonCost,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency
        "wallet": this.selectedCurrency
      } : undefined;

      fillterbody['addonCount'] = 0;//Inlogs i found this keyName InScreen didn't find.


      fillterbody['maintenanceFeesRebuy'] = {
        // "value": 10,
        'value': this.CreatePokerTouranamentForm.value.MarketingFeeRebuy,

        // "wallet": this.CreatePokerTouranamentForm.value.Currency
        "wallet": this.selectedCurrency
      };
      fillterbody['maintenanceFeesAddOn'] = {
        "value": this.CreatePokerTouranamentForm.value.MarketingFeeAddon,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency
        "wallet": this.selectedCurrency
      };

      fillterbody['feeOnAddOn'] = {
        "value": this.CreatePokerTouranamentForm.value.AddonFee,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency
        "wallet": this.selectedCurrency
      };
      fillterbody['feeOnReBuy'] = {
        "value": this.CreatePokerTouranamentForm.value.RebuyFee,
        // "wallet": this.CreatePokerTouranamentForm.value.Currency
        "wallet": this.selectedCurrency
      };

    } else {
      fillterbody['addonCount'] = 0;
      fillterbody['rebuyCount'] = 0;
    }






    // **************Schedule
    console.log(this.CreatePokerTouranamentForm.value.StartDate != null);
    console.log(this.selectedDayInMonth);
    fillterbody['shedule'] = this.CreatePokerTouranamentForm.value.StartDate != null ? {

      // "startDate": this.CreatePokerTouranamentForm.value.StartDate,
      // "startTime": this.CreatePokerTouranamentForm.value.StartTime,


      //onlyOnce *********Start
      "startDate": this.filterbodyDateTime,
      "startTime": Number(this.filterbodyTime),
      //onlyOnce *********End

      //Hourly
      "everyTime": this.hourlyRepeatTime,
      //Hourly

      //Monthly *********Start
      "dayOfMonth": this.CreatePokerTouranamentForm.value.MonthlyButtonRadio === "Days" ? this.selectedDayInMonth : 0,
      "monthOfYear": this.selectedMonthsInYear,
      "typeDayOfMonth": this.selectedtypeDayOfMonth,
      "weekdayOfMonth": this.weekdayOfMonth,
      //Monthly *********ends



      //Daily *********Start
      "everyDay": this.filterbodyeveryDay,
      "everyWeekdays": this.fillterbodyeveryWeekdays,
      "everyWeekend": this.fillterbodyeveryWeekend,
      //Daily *********End


      //Weekly *********Start
      "everyWeeks": this.NumberOfWeeks,
      "daysOfWeek": this.selectedWeekDayOfWeek,
      //Weekly *********End


      // fillterbody['type'] = this.ScheduleTypeGuid != null ? this.ScheduleTypeGuid : undefined;
      "type": this.ScheduleTypeGuid
    } : undefined;






    fillterbody['announcePeriodType'] = this.CreatePokerTouranamentForm.value.AnnouncePeriodType != null ? this.CreatePokerTouranamentForm.value.AnnouncePeriodType : undefined;
    fillterbody['announcePeriodValue'] = Number(this.CreatePokerTouranamentForm.value.AnnouncePeriodValue);
    fillterbody['registrPeriodType'] = this.CreatePokerTouranamentForm.value.RegistrantionPeriodType != null ? this.CreatePokerTouranamentForm.value.RegistrantionPeriodType : undefined;
    fillterbody['registrPeriodValue'] = this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue != null ? this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue : undefined;
    fillterbody['completePeriodType'] = this.CreatePokerTouranamentForm.value.CompletedPeriodType != null ? this.CreatePokerTouranamentForm.value.CompletedPeriodType : undefined;
    fillterbody['completePeriodValue'] = this.CreatePokerTouranamentForm.value.CompletedPeriodValue != null ? this.CreatePokerTouranamentForm.value.CompletedPeriodValue : undefined;
    fillterbody['seatingPeriodType'] = this.SeatingPeriodDefaultValue != null ? this.SeatingPeriodDefaultValue : undefined;
    // fillterbody['seatingPeriodType'] = this.CreatePokerTouranamentForm.value.SeatingPeriodType != null ? this.CreatePokerTouranamentForm.value.SeatingPeriodType:undefined;
    fillterbody['seatingPeriodValue'] = this.CreatePokerTouranamentForm.value.SeatingPeriodValue != null ? this.CreatePokerTouranamentForm.value.SeatingPeriodValue : undefined;

    // Extra Find
    // fillterbody['tourneyType'] = this.TourneyTypeList[0].guid != null ? this.TourneyTypeList[0].guid : undefined;
    fillterbody['tourneyType'] = this.TourneyTypeList[0].guid;
    fillterbody['numberInSeries'] = -1;
    fillterbody['played'] = 0;
    fillterbody['haveMessages'] = false;
    fillterbody['shareType'] = { "hiLong": 0, "lowLong": 0 };
    fillterbody['timeBased'] = false;





    // fillterbody['progressiveKnockOutTournaments'] = true;
    // fillterbody['icmBasedDistribution'] = true;
    fillterbody['icmBasedDistribution'] = this.CreatePokerTouranamentForm.value.ICM;



    fillterbody['timeBased'] = false;

    if (this.EditPokerTourneyData) {
      fillterbody['guid'] = this.EditPokerTourneyData?.guid;
    }


    //   fillterbody['maintenanceFee'] = {
    //     "value": 10,
    //     "wallet": {
    //         "hiLong": 0,
    //         "lowLong": 1840
    //     }
    // };
    // fillterbody['brandedTourney'] = false;
    // fillterbody['brandedTourneyImage'] = "";
    fillterbody['objState'] = 0;

    this.LateRegistrationTypeListGuid = this.LateRegistrationTypeList[0].guid
    console.log(this.CreatePokerTouranamentForm.value.LateRegistrantionRadio)

    if (this.CreatePokerTouranamentForm.value.LateRegistrantion) {

      for (let i = 0; this.LateRegistrationTypeList.length; i++) {
        if (this.LateRegistrationTypeList[i]?.value == this.CreatePokerTouranamentForm.value.LateRegistrantionRadio) {
          this.LateRegistrationTypeListGuid = this.LateRegistrationTypeList[i]?.guid;
          fillterbody['lateRegistrationType'] = this.LateRegistrationTypeListGuid;
          break;
        } else {
          fillterbody['lateRegistrationType'] = this.LateRegistrationTypeListGuid;
        }
        fillterbody['lateRegistrationCounter'] = this.CreatePokerTouranamentForm.value.LateRegistrantionLevel != null ? this.CreatePokerTouranamentForm.value.LateRegistrantionLevel : 0;

        // fillterbody['lateRegistrationType'] = {
        //   "hiLong": 0,
        //   "lowLong": 1
        // };

      }
    }

    else {

      fillterbody['lateRegistrationType'] = this.LateRegistrationTypeListGuid;
      fillterbody['lateRegistrationCounter'] = 0;

      // console.log(this.LateRegistrationTypeListGuid);
      // fillterbody['lateRegistrationCounter'] = this.CreatePokerTouranamentForm.value.LateRegistrantionLevel != null ? this.CreatePokerTouranamentForm.value.LateRegistrantionLevel : 0;
      // fillterbody['lateRegistrationType'] = LateRegistrationTypeListGuid != null?LateRegistrationTypeListGuid:this.LateRegistrationTypeList[0].guid;

    }

    fillterbody['progressiveKnockOutTournamentPercentage'] = 0;
    fillterbody['tournamentManualDistributionV2Equal'] = this.CreatePokerTouranamentForm.value.EqualPrize;
    fillterbody['tournamentManualDistributionV2Stack'] = this.CreatePokerTouranamentForm.value.StackBased;






    console.log(this.CreatePokerTouranamentForm.value.Name)
    console.log(this.CreatePokerTouranamentForm.value.GuaranteedPrize)
    console.log(this.CreatePokerTouranamentForm.value.BuyIn)
    console.log(this.CreatePokerTouranamentForm.value.Rebuys)
    console.log(this.CreatePokerTouranamentForm.value.MaxRebuysperPlayer)
    console.log(this.CreatePokerTouranamentForm.value.RebuyCost)
    console.log(this.CreatePokerTouranamentForm.value.RebuyAmount)

    if (this.CreatePokerTouranamentForm.value.Name == ""
      && this.CreatePokerTouranamentForm.value.GuaranteedPrize <= 0
      && this.CreatePokerTouranamentForm.value.BuyIn <= 0
      && this.CreatePokerTouranamentForm.value.Rebuys
      && this.CreatePokerTouranamentForm.value.MaxRebuysperPlayer <= 0
      && this.CreatePokerTouranamentForm.value.RebuyCost <= 0
      && this.CreatePokerTouranamentForm.value.RebuyAmount <= 0) {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup =
        `Fields 'Name' can't be emty. 
Fields 'Guaranteed' prize and 'Buy-in' must be positive.
Fields 'Rebuy Cost' must be positive.
Fields 'Rebuy Amount' must be positive.
Fields 'Max.Rebuys per player' must be positive`;
    } else if (this.CreatePokerTouranamentForm.value.Rebuys
      && (this.CreatePokerTouranamentForm.value.MaxRebuysperPlayer <= 0
        || this.CreatePokerTouranamentForm.value.RebuyCost <= 0
        || this.CreatePokerTouranamentForm.value.RebuyAmount <= 0)) {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup =
        `Fields 'Rebuy Cost' must be positive.
  Fields 'Rebuy Amount' must be positive.
  Fields 'Max.Rebuys per player' must be positive`;

    }
    else if (this.CreatePokerTouranamentForm.value.Name == "" &&
      this.CreatePokerTouranamentForm.value.GuaranteedPrize <= 0 &&
      this.CreatePokerTouranamentForm.value.BuyIn <= 0) {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup =
        `Fields 'Name' can't be emty.
Fields 'Guaranteed' prize and 'Buy-in' must be positive.`
    } else if (this.CreatePokerTouranamentForm.value.Name == "") {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup =
        `fields 'Name' can't be emty.`
    }
    else if (this.CreatePokerTouranamentForm.value.GuaranteedPrize <= 0 &&
      this.CreatePokerTouranamentForm.value.BuyIn <= 0) {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup =
        `fields 'Guaranteed' prize or 'Buy-in' must be positive.`
    } else if (this.PayoutButton == true) {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup = `Payout Table can't ne empty`

    } else if (this.BlindStructurButton == true) {
      this.tournamentErrorTextBoolValue = true
      this.tournamentErrorTextPopup = `Blind Structure can't ne empty`
    }

    else {
      this.tournamentErrorTextPopup = ""
      this.tournamentErrorTextBoolValue = false


      let body01 = {
        "forceSave": false,
        "tourn": fillterbody
      }
      console.log(body01)
      console.log(fillterbody);
      // console.log(this.CreatePokerTouranamentForm.value)


      // console.log(this.onlyOnceTextCss)
      // console.log(this.AnnouncePeriodTextCss)
      // console.log(this.registrationPeriodTextCss)
      // console.log(this.SeatingPeriodTextCss)

      // this.pokergameService.createRakeStructure(obj).subscribe((res) => {
      //   console.log(res)
      //   this.CreateRakeRes = res.changedObjectList;
      //   if (this.CreateRakeRes) {
      //     this.CreateSuccessPop = true;
      //   }
      // },
      //   error => {
      //     this.ErrorPopup = true
      //   })
      console.log(this.createTournamentPopup)
      console.log(this.EditPokerTourneyData)

      if (!this.createTournamentPopup && !this.editOptionMode) {
        // if (!this.createTournamentPopup&&this.EditPokerTourneyData ==null) {
        // if (!this.createTournamentPopup&&!this.EditPokerTourneyData) {
        // if (!this.createTournamentPopup || this.EditPokerTourneyData == null) {

        this.PokergamesService.setPokerTournamentSettings(body01).subscribe((data) => {
          console.log(data.changedObjectList)
          if (data.changedObjectList) {
            // alert("successFullayCreated")
            this.CreateSuccessPop = true;
            if (this.EditPokerTourneyData != null) {
              this.successPopup = "Successfully Edited"
            } else {
              this.successPopup = "Successfully Created"
            }
          }
        },

          error => {
            this.ErrorPopup = true;
            console.log(error)
          }

        )

      } else {
        let gametypeAndName = {
          caption: this.finalCaption[0].caption,
          type: "Tournament Info"
        };

        console.log(body01)

        this.filterbodyData.emit(body01);
        // this.tournamentGameType.emit(this.finalCaption[0].caption);
        this.tournamentGameType.emit(gametypeAndName);
        this.sendPayoutData.emit(this.selectedViewItem);

      }





    }















    let body = {
      "forceSave": false,
      "tourn": {
        // ************** Genaral

        "caption": this.CreatePokerTouranamentForm.value.Name != "" ? this.CreatePokerTouranamentForm.value.Name : undefined,
        "description": this.CreatePokerTouranamentForm.value.Description != "" ? this.CreatePokerTouranamentForm.value.Description : undefined,
        // "password":  this.CreatePokerTouranamentForm.value.Password != null ? this.CreatePokerTouranamentForm.value.Password:undefined,
        "password": this.CreatePokerTouranamentForm.value.Password != "" ? this.CreatePokerTouranamentForm.value.Password : undefined,
        "gameName": this.finalCaption[0].name,
        "seats": this.CreatePokerTouranamentForm.value.Seats,
        "minPlayers": this.CreatePokerTouranamentForm.value.MinPlayers,
        "maxPlayers": this.CreatePokerTouranamentForm.value.MaxPlayers,
        "chipsPerPlayer": { "value": this.CreatePokerTouranamentForm.value.ChipsperPlayer },

        // **************Accessibility
        "accessRule": this.CreatePokerTouranamentForm.value.AccessRuleName,
        "chatAccessibility": this.CreatePokerTouranamentForm.value.ChatAccesability,
        "enableNow": this.CreatePokerTouranamentForm.value.EnableNow,

        // **************Prizes Settings
        "guarantedPrize": {
          "value": this.CreatePokerTouranamentForm.value.GuaranteedPrize,
          // "wallet": this.CreatePokerTouranamentForm.value.Currency
          "wallet": this.selectedCurrency
        },
        "manualPrizePoolTourney": this.CreatePokerTouranamentForm.value.ManualPoolPrize,
        // "payoutTable": (this.CreatePokerTouranamentForm.value.PayoutTable).slice(8 ),
        "payoutId": this.CreatePokerTouranamentForm.value.PayoutTable, //need to send Payout table id

        "resultNotificationType": this.CreatePokerTouranamentForm.value.NotifyPlayersType,
        "resultNotificationPlaces": this.CreatePokerTouranamentForm.value.NotifyPlayersPlaces,
        "resultNotificationTemplateId": this.CreatePokerTouranamentForm.value.usingtemplate,


        // **************Buy In Settings
        "allowCash": this.CreatePokerTouranamentForm.value.Chips,
        "allowCompPoints": this.CreatePokerTouranamentForm.value.CompPoints,
        "allowTournamentMoney": this.CreatePokerTouranamentForm.value.TournamentMoney,
        "allowTournamentTickets": this.CreatePokerTouranamentForm.value.Tickets,
        "buyIn": {
          "value": this.CreatePokerTouranamentForm.value.BuyIn,
          // "wallet": this.CreatePokerTouranamentForm.value.Currency
          "wallet": this.selectedCurrency
        },
        "fee": {
          "value": this.CreatePokerTouranamentForm.value.Fee,
          // "wallet": this.CreatePokerTouranamentForm.value.Currency
          "wallet": this.selectedCurrency
        },
        "knockoutBounty": {
          "value": this.CreatePokerTouranamentForm.value.KnockoutBounty,
          // "wallet": this.CreatePokerTouranamentForm.value.Currency
          "wallet": this.selectedCurrency
        },

        " progressiveKnockOutTournaments": this.CreatePokerTouranamentForm.value.ProgressiveKnockoutCheck,
        "progressiveKnockOutTournamentPercentage": this.CreatePokerTouranamentForm.value.KnockoutPercentage,

        "totalCost": {
          // "value":  parseInt(this.CreatePokerTouranamentForm.value.Fee) + parseInt(this.CreatePokerTouranamentForm.value.BuyIn) + parseInt(this.CreatePokerTouranamentForm.value.KnockoutBounty),
          "value": parseInt(this.CreatePokerTouranamentForm.value.BuyIn) + parseInt(this.CreatePokerTouranamentForm.value.Fee) + parseInt(this.CreatePokerTouranamentForm.value.KnockoutBounty),
          // "wallet": this.CreatePokerTouranamentForm.value.Currency
          "wallet": this.selectedCurrency
        },

        // ************** Advanced
        // ************** Level Settings
        "levelLength": this.CreatePokerTouranamentForm.value.LevelLengthmin * Math.floor(60 * 1000),
        "levelsBeforeBreak": this.CreatePokerTouranamentForm.value.LevelsbeforeBreak,
        "breakLength": this.CreatePokerTouranamentForm.value.BreakLengthMin * Math.floor(60 * 1000),
        "blindId": this.CreatePokerTouranamentForm.value.BlindStructure,
        "synchronizedTourney": this.CreatePokerTouranamentForm.value.SynchronizedBreak,
        "pauseOnFinalTable": this.CreatePokerTouranamentForm.value.PauseTournament,
        "descriptionForPauseOnFinalTable": this.CreatePokerTouranamentForm.value.MessagetoPlayers,

        // **************Time Out Settings
        "actionTimeOut": this.CreatePokerTouranamentForm.value.ActionTimeout * Math.floor(1000),
        "playerTimeBank": this.CreatePokerTouranamentForm.value.TimeBank * Math.floor(1000),
        "additionalTimeBank": this.CreatePokerTouranamentForm.value.TimeBankAutoincrementAmount * Math.floor(1000),

        // **************Hand to Hand Settings

        "synchroModeType": this.CreatePokerTouranamentForm.value.BubbleFinalTable,
        // "synchroModeType": this.synchroModeType,

        // **************Re-Buy
        "rebuyCount": 0,
        "addonCost": {
          "value": this.CreatePokerTouranamentForm.value.ChatAccesability,
          // "wallet": this.CreatePokerTouranamentForm.value.Currency
          "wallet": this.selectedCurrency
        },
        "addonCount": 0,

        // **************Schedule
        "shedule": {
          "startDate": this.CreatePokerTouranamentForm.value.StartDate,
          "startTime": this.CreatePokerTouranamentForm.value.StartTime,
        },
        "announcePeriodType": this.CreatePokerTouranamentForm.value.AnnouncePeriodType,
        "announcePeriodValue": this.CreatePokerTouranamentForm.value.AnnouncePeriodValue,
        "registrPeriodType": this.CreatePokerTouranamentForm.value.RegistrantionPeriodType,
        "registrPeriodValue": this.CreatePokerTouranamentForm.value.RegistrantionPeriodValue,
        "completePeriodType": this.CreatePokerTouranamentForm.value.CompletedPeriodType,
        "completePeriodValue": this.CreatePokerTouranamentForm.value.CompletedPeriodValue,
        "seatingPeriodType": this.CreatePokerTouranamentForm.value.SeatingPeriodType,
        "seatingPeriodValue": this.CreatePokerTouranamentForm.value.SeatingPeriodValue,

        // Extra Find
        "tourneyType": this.TourneyTypeList[0].guid,
        "numberInSeries": -1,
        "played": 0,
        "haveMessages": false,
        "shareType": { "hiLong": 0, "lowLong": 0 },
        "timeBased": false,


        // "announcePeriodValue": 1,
        //  "announcePeriodType":{
        //         "hiLong":0,
        //         "lowLong":3
        //     },
        // "registrPeriodValue": 6,
        //  "registrPeriodType":{
        //         	"hiLong" :0,
        //             "lowLong" :2
        //     },
        // "completePeriodValue": 3,
        // "completePeriodType":{
        //     "hiLong":0,
        //     "lowLong":2
        // },
        // "seatingPeriodType": {
        //     "hiLong": 0,
        //     "lowLong": 1
        // },
        // "seatingPeriodValue": 1,
        // "tourneyType": {
        //     "hiLong": 0,
        //     "lowLong": 1
        // },
        // "numberInSeries": -1,
        // "played": 0,
        // "haveMessages": false,
        // "shareType": {
        //     "hiLong": 0,
        //     "lowLong": 0
        // },
        // "shedule":{
        //     "dayOfMonth":1,
        //     "daysOfWeek": [1,2,3,4,5,6,7],
        //     "everyDay":1,
        //     "everyTime":0,
        //     "everyWeekdays":false,
        //     "everyWeekend":false,
        //     "everyWeeks":1,
        //     "monthOfYear": [1,2,3,4,5,6,7,8,9,10,11,12],
        //     "startDate": "2023-09-29T13:54:00",
        //     "startTime": "0",
        //     "type":{
        //         "hiLong":0,
        //         "lowLong":2
        //     },
        //     "typeDayOfMonth":{
        //         "hiLong":0,
        //         "lowLong":1
        //     },


        //     "weekdayOfMonth":0
        // },
      }
    }
    // console.log(body)
    // this.PokergamesService.setPokerTournamentSettings(body).subscribe((data) => console.log(data))




  }

}
