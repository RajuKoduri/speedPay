import { Component, EventEmitter, OnInit, Output, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from './../../source/Http.service';
import { LoginService } from './../../source/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonDataService } from 'src/app/source/commondata.service';
import { CookieService } from 'ngx-cookie-service';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
// import { LoginStart, } from 'src/app/store/actions/login.action';
import { getlogin } from 'src/app/store/reducers/login.selector';
import { loginModel } from 'src/app/store/reducers/models';
import * as loginAction from "src/app/store/actions/login.action"
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @Output() res = new EventEmitter()

  logInForm: FormGroup;
  resPonse: any;
  permissons: any = [];
  ws: any;
  data: any;
  SessionData: any;
  getSessionDataAll: any
  playerlevel: any;
  countries: any;
  faceParameters: any;
  subNetworkParameters: any;
  countrieslist: any = [];
  dictionaries: any;
  walletlist: any = []
  faceParameterslist: any = []
  palyerstatus: any = []
  ReceiveNews: any = []
  BirthdatMonths: any = []
  PaymentSystemTypes: any = []
  CasinoGames: any = []
  SessionType: any = []
  BlacklistTypes: any = []
  PromoCodeStatus: any = []
  TransferDirectionTypes: any = []
  PromoCodeUsageType: any = []
  PromoCodeUsageStatus: any = []
  DYIDINTEGRATIONTYPES: any = []
  DYIDGAMEGROUPTYPE: any = []
  DYIDCOMPPOINTSEXCHANGETYPE: any = []
  DYIDPLAYERCOMPPOINTSLEVELPERIODS: any = []
  DYIDCOMPPOINTSADJUSTMENTOPERATIONTYPE: any = []
  DYIDPASSWORDYIDPROFILEFORMFIELDSTATUSDSTRENGTH: any = []
  DYIDCHATACCESSIBILITY: any = []
  DYIDGAMENAMES: any = []
  DYIDTOURNAMENTSETTINGSSTATUS: any = []
  DYIDREGISTRATIONFORMFIELDSTATUS: any = []
  DYIDPASSWORDSTRENGTH: any = []
  gamePotAdjustmentType: any = []
  gamePotAdjustmentTypeList: any = []
  usertype: any = []
  OwnerType: any = []
  PAYMENTSYSTEMS: any = []
  Agentstatus: any = []
  errormsg: any;
  walletFormats: any = [];
  paymentname: any = [];
  walletFormatsList: any = [];
  walletTypes: any;
  walletTypeslist: any = []
  currencyFormat: any = []
  currencyFormatList: any = []
  limitsMemo: any;
  limitsMemolist: any = [];
  UserAccessArea: any = [];
  UserAccessStatus: any = [];
  Avatarstatus: any = [];
  ScheduleType: any = [];
  ShareType: any = [];
  TournamentStatus: any = [];
  RequestedReportStatus: any = [];
  RequestedReportType: any = [];
  NewsType: any = [];
  NewsStatus: any = [];
  Affiliatestatus: any = [];
  SUSPLINKS: any = [];
  CurrncyExchangeWallet: any = [];
  CurrencyExchangPocketType: any = [];
  PasswordStrength: any = [];
  RegistrationFromFieldStatus: any = [];
  ProfileFromFieldStatus: any = [];
  Languages: any = [];
  LoginType: any = [];
  newsParameters: any;
  newsParametersList: any = [];
  agentPermissionStructure: any;
  agentPermissionStructureList: any = [];
  GamesConfig: any;
  botStrategyType: any = [];
  botStrategyStatus: any = [];
  botSettingStatus: any = [];
  gameSessionStatus: any = [];
  playerlevelChangeStatus: any = [];
  TransactionOperations: any = [];
  TransactionStatuses: any = [];
  TransactionHistoryType: any = [];
  PaymentsSystems: any = [];
  CashAdjustmentOperationType: any = [];
  PokerTableType: any = [];
  CashierOperationType: any = [];
  Enabled_Disabled_All: any = [];
  RemoteGameSessionStatus: any = [];
  CashOutStatus: any = [];
  rateRetrivers: any;
  playerPermissionStructure: any;
  AgentPermissionStructure: any;
  agentTransactionHistoryFilter: any;
  playerTransactionHistoryFilter: any;
  PayoutStructure: any = [];
  TournamentResultNotificationType: any = [];
  TemplateCreationTypes: any = [];
  PeriodTypes: any = [];
  TypeDayOfMonth: any = [];
  LateRegistrationType: any = [];
  TourneySynchroModeType: any = [];
  TourneyType: any = [];
  RemoteHistoryActivityStatus: any = [];
  remoteSystemActivities: any = [];
  PayoutTicketType: any = [];
  LeaderBoardType: any = [];
  LeaderBoardSettingPeriod: any = [];
  LeaderBoardSettingStatus: any = [];
  LeaderBoardStatus: any = [];
  LeaderBoardPayoutState: any = [];
  ReferredStatus: any = [];
  accessRuleEditorConfig: any;
  apiFail: boolean = false;
  changeeye: boolean = true;
  fieldTextType: boolean = true;
  usernameactive: boolean = false;
  passwordactive: boolean = false;
  loginloader: boolean = false;
  currencyFormats: any;
  PaymentMeansStatus: any = [];
  TemplateTypes: any = [];
  TicketStatus: any = []
  BadBeatMinCombinations: any = [];
  jackpotTypes: any = [];
  PromocodeRewardTypes: any = [];
  dataSubscription: any;

  key: string = "loginRes"
  dt: any;
  pokerGameTypes: any = []
  pokerTableSeats: any = []
  geoIpProviderType: any = []
  defaultOptions: any;
  campaignProgram: any = [];
  verifyTwoFactorPopup: boolean = false
  otpControls = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'];
  otpForm: FormGroup;
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  otpVerificationMsg: any;
  isOTPVerifyDisabled:boolean = false;

  constructor(private loginService: LoginService,
    private commonDataService: CommonDataService,
    private authService: AuthServiceService,
    public store: Store<{ login: loginModel }>,
    private router: Router,
    private fb: FormBuilder,
    private CookieService: CookieService,
    private CommomfilterService12: CommomfilterService) {

    let uName = this.CookieService.get('UserName')
    let pword = this.CookieService.get('Password')
    this.logInForm = new FormGroup({
      userName: new FormControl(uName !== '' ? uName : null, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      passWord: new FormControl(pword !== '' ? pword : null, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      RememberMe: new FormControl(true),
    });

    this.dataSubscription = this.store.select(getlogin).subscribe((res) => {
      console.log("store", res);
      this.dt = res

      // const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(this.dt), this.key).toString();
      // localStorage.setItem('encryptedData', encryptedData);

      if (this.dt.status) {
        this.verifyTwoFactorPopup = true;
        this.loginloader = false;
        // this.ws = this.dt.loginDetails.sessionId;
        // this.getconfig();
        // this.getSessionData();
        // this.getPlayerLeveldata();
        this.loginResponse(this.dt.loginDetails);
      }
      else {
        if (this.dt.errorMessage) {
          this.errormsg = this.dt.errorMessage;
          this.apiFail = false;
          this.loginloader = false;
        }
        setTimeout(() => {
          this.errormsg = '';
        }, 3000);
      }

    },
      // error => {
      //       (this.errormsg = error.message)
      //       if (this.errormsg) {
      //         this.errormsg = error.message
      //       } else {
      //         this.errormsg = "Invalid Login or Password"
      //       }
      //       this.apiFail = false;
      //     }
    )
    this.otpForm = this.fb.group(
      this.otpControls.reduce((acc: any, control) => {
        // acc[control] = ['', [Validators.required, Validators.pattern(/^\d{1}$/)]];
        acc[control] = ['', [Validators.required, Validators.pattern(/^\d{1}$/)]];
        return acc;
      }, {})
    );
  }


  // ngOnDestroy(): void {
  //   // Unsubscribe when the component is destroyed
  //   this.dataSubscription.unsubscribe();
  // }



  ngOnInit(): void {

    this.loginService.addSubscription(this.dataSubscription)

    console.log(this.logInForm.value.userName)
    if (this.logInForm.value.userName) {
      this.usernameactive = true
    }
    if (this.logInForm.value.passWord) {
      this.passwordactive = true
    }
    // var doc = document;
    // const handleKeyUpforEnter = (evt:any) => { 
    //     if (evt.key == "Enter"){
    //       // alert('ding')
    //       //Your method or code
    //       this.login() ; 
    //   }
    // }
    // doc.addEventListener("keyup", handleKeyUpforEnter);
  }
  get f() {
    return this.logInForm.controls;
  }
  userNameValid(event: any) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    if (event.key == "Enter") {
      if (this.f['userName'].status == "VALID") {
        if ((this.f['passWord'].status) == "VALID") {
          this.login();
        }
      }
    }
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57));
  }
  passwordValid(event: any) {
    console.log(event)
    if (event.key == "Enter") {
      if (this.f['userName'].status == "VALID") {
        if ((this.f['passWord'].status) == "VALID") {
          this.login();
        }
      }
    }
    var k;
    k = event.charCode;
    console.log(k)//         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k >= 33 && k <= 47 || k >= 60 && k <= 64 || (k >= 48 && k <= 58) || k >= 91 && k <= 96 || k >= 123 && k <= 126);

  }
  usernameact(event: any) {
    console.log(event.target.value)
    if (event.target.value) {
      this.usernameactive = true
    } else {
      this.usernameactive = false
    }
  }
  passwordact(event: any) {
    console.log(this.f['passWord'].status)
    console.log(this.f['userName'].status)

    console.log(event.target.value)
    if (event.target.value) {
      this.passwordactive = true
    } else {
      this.passwordactive = false
    }
  }


  login() {
    // if(this.logInForm.value.RememberMe){
    //  this.CookieService.set('UserName', this.logInForm.value.userName )
    //  this.CookieService.set('Password', this.logInForm.value.passWord )
    // } else {
    //   null
    // }
    console.log(this.logInForm)
    this.loginloader = true
    this.apiFail = true;
    console.log(this.logInForm)
    let obj = {
      "loginName": this.logInForm.value.userName,
      "password": this.logInForm.value.passWord
    }

    this.store.dispatch(loginAction.loadLogin({ userData: obj }))

    // this.store.dispatch(new loginAction.LoginStart(obj));


    // this.loginService.login(obj).subscribe((res: any) => {
    // this.loginResponse(res);}

    // this.verifyTwoFactorPopup = true;
    // this.loginloader = false

  }
  verifyTwoFactorPopupClose() {
    this.verifyTwoFactorPopup = false;
    this.apiFail = false;
    this.otpForm.reset();
  }
  verifyTwoFactor() {
    this.isOTPVerifyDisabled = true;
    if (this.otpForm.valid) {
      const otp = this.otpControls.map(control => this.otpForm.value[control]).join('');
      console.log('OTP Entered:', otp);
      // Handle OTP verification logic

      let body = {
        "twoFactor": otp
      }

      this.loginService.verifyTwoFactor(body).subscribe((data) => {
        console.log(data.objectList[0].twoFactor !="Failed");
        if (data.objectList[0].twoFactor !="Failed") {
          this.getconfig();
          this.getSessionData();
          this.getPlayerLeveldata();
         
        }else{
          this.isOTPVerifyDisabled = false;
          this.otpForm.reset();
          this.otpVerificationMsg= "Invalid OTP";

          setTimeout(() => {
            this.otpVerificationMsg= ''
          }, 3000)
        }
      });
    }
  }
  // onInput(event: any, index: number): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.value.length > 0 && index < this.otpControls.length - 1) {
  //     this.otpInputs.toArray()[index + 1].nativeElement.focus();
  //   }
  // }
  onInput(event: any, index: number): void {
    const input = event.target as HTMLInputElement;

    // Prevent more than one character
    if (input.value.length > 1) {
      input.value = input.value.charAt(0);
      this.otpForm.get(this.otpControls[index])?.setValue(input.value);
    }

    // Move to the next input if a valid digit is entered
    if (input.value.length > 0 && index < this.otpControls.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onBackspace(event: any, index: number): void {
    if ((event.target as HTMLInputElement).value === '' && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

 

 
  loginResponse(res: any) {
    console.log(res)
    this.resPonse = res;

    if (this.resPonse) {
      if (this.logInForm.value.RememberMe) {
        this.CookieService.set('UserName', this.logInForm.value.userName)
        this.CookieService.set('Password', this.logInForm.value.passWord)
      } else {
        // return
      }
    } else {
      setTimeout(() => {
        if (this.resPonse == null) {
          this.loginloader = false
          this.errormsg = "Invalid Login or Password"
        }
      }, 2000)
    }
    if (res) {
      // this.loginloader = false
      this.permissons = this.resPonse.permissions;
      this.ws = this.resPonse.sessionId;
      console.log(this.resPonse);
      console.log(this.permissons);
      sessionStorage.setItem('wsession', this.resPonse.sessionId);
      this.CookieService.set('wsession', this.ws)
      sessionStorage.setItem('permissons', this.permissons);
      console.log(sessionStorage.getItem("wsession"))
      // this.router.navigateByUrl('/adminControl')
      // this.getconfig();
      // this.getSessionData();
      // this.getPlayerLeveldata();
      // this.apiFail = false;

      //   this.authService.setLoginStatus(true);
      //   sessionStorage.setItem("loggedIn", "true")
      // } else {
      //   this.apiFail = false;
      //   sessionStorage.setItem("loggedIn", "false")
    }
    // this.apiFail = false;
    // if (this.resPonse.this.resPonse.sessionId) {
    //   alert("al")
    //   this.apiFail = false;
    // } else {
    //   this.apiFail = true;
    // }



    //   error => {
    //     (this.errormsg = error.message)
    //     if (this.errormsg) {
    //       this.errormsg = error.message
    //     } else {
    //       this.errormsg = "Invalid Login or Password"
    //     }
    //     this.apiFail = false;
    //   }
    // )
    setTimeout(() => {
      if (this.resPonse == null) {
        this.loginloader = false
        // this.errormsg = "Invalid Login or Password"
      }
    }, 2000)
    setTimeout(() => {
      this.errormsg = ""
    }, 8000)
  }
  viewpass() {
    this.changeeye = !this.changeeye;
    this.fieldTextType = !this.fieldTextType;
  }
  getconfig() {
    this.loginService.getConfig(this.ws).subscribe((data) => this.getconfigdata(data));
  }
  getSessionData() {
    this.loginService.getSessionData(this.ws).subscribe((data) => this.getSessionresponseData(data))

  }
  getPlayerLeveldata() {
    this.loginService.getPlayers(this.ws).subscribe((data) => this.getPlayerLevelsNames(data))
  }
  getconfigdata(data: any) {
    // console.log('getconfigdata',data)
    // console.log('getconfigdata',data.values)
    this.resPonse = data;
    localStorage.setItem('getconfigdata', JSON.stringify(this.resPonse));
  }
  getPlayerLevelsNames(data: any) {
    console.log(data)
    this.playerlevel = data.objectList[0];
    localStorage.setItem('getPlayerLevelsNames', JSON.stringify(this.playerlevel));
  }
  getSessionresponseData(data: any) {
    console.log('getSessionresponseData', data)
    console.log('getSessionresponseData', data.objectList)
    if (data.objectList) {
      console.log('getSessionresponseData', data.objectList[0].countries)
    }
    this.SessionData = data
    console.log(this.SessionData.objectList)
    if (this.SessionData.objectList) {
      this.loginloader = false
      // if (data.objectList) {
      // this.router.navigateByUrl('/adminControl')
      // this.router.navigateByUrl('/DashBoard')
      // this.router.navigateByUrl('/playerslist')
      if (this.resPonse) {
        this.authService.setLoginStatus(true);
        sessionStorage.setItem("loggedIn", "true")
      } else {
        this.apiFail = false;
        sessionStorage.setItem("loggedIn", "false")
      }
      if (localStorage.getItem("siteName") == "poker") {
        this.router.navigateByUrl('/DashBoard')
      } else {
        this.router.navigateByUrl('/playerslist')
      }

    }
    if (data.objectList) {
      this.getSessionDataAll = data.objectList[0]
      console.log(this.getSessionDataAll)
      this.countries = data.objectList[0].countries
      // this.dictionaries= this.getSessionDataAll[0].dictionaries
      this.dictionaries = data.objectList[0].dictionaries
      this.faceParameters = data.objectList[0].faceParameters
      // this.subNetworkParameters = data.objectList[0]?.subNetworkParameters
      this.subNetworkParameters = data.objectList[0]?.networkParameter
      this.walletFormats = data.objectList[0].walletFormats
      this.walletTypes = data.objectList[0].walletTypes
      this.currencyFormats = data.objectList[0].currencyFormats
      this.newsParameters = data.objectList[0].newsParameters
      this.agentPermissionStructure = data.objectList[0].agentPermissionStructure.children
      this.GamesConfig = data.objectList[0].gameConfig
      this.rateRetrivers = data.objectList[0].rateRetrivers
      this.playerPermissionStructure = data.objectList[0].playerPermissionStructure
      this.AgentPermissionStructure = data.objectList[0].agentPermissionStructure
      this.agentTransactionHistoryFilter = data.objectList[0].agentTransactionHistoryFilter
      this.playerTransactionHistoryFilter = data.objectList[0].playerTransactionHistoryFilter
      this.remoteSystemActivities = data.objectList[0].remoteSystemActivities
      this.accessRuleEditorConfig = data.objectList[0].accessRuleEditorConfig
      this.defaultOptions = data.objectList[0].options
    }
    console.log(this.newsParameters)
    console.log(this.countries)
    console.log(this.dictionaries)
    localStorage.setItem("playerPermissionStructure", JSON.stringify(this.playerPermissionStructure))
    localStorage.setItem("AgentPermissionStructure", JSON.stringify(this.AgentPermissionStructure))
    localStorage.setItem("rateRetrivers", JSON.stringify(this.rateRetrivers))
    localStorage.setItem("GamesConfig", JSON.stringify(this.GamesConfig))
    localStorage.setItem("remoteSystemActivities", JSON.stringify(this.remoteSystemActivities))
    localStorage.setItem("accessRuleEditorConfig", JSON.stringify(this.accessRuleEditorConfig))
    localStorage.setItem("accessRuleEditorConfig", JSON.stringify(this.accessRuleEditorConfig))
    localStorage.setItem("currencyFormatsSymbol", JSON.stringify(this.currencyFormats))
    localStorage.setItem("subNetworkParameters", JSON.stringify(this.subNetworkParameters))
    localStorage.setItem("defaultOptions", JSON.stringify(this.defaultOptions))
    localStorage.setItem("agentTransactionHistoryFilter", JSON.stringify(this.agentTransactionHistoryFilter))
    localStorage.setItem("playerTransactionHistoryFilter", JSON.stringify(this.playerTransactionHistoryFilter))



    this.resPonse = data.objectList;
    localStorage.setItem('getSessionData', JSON.stringify(this.resPonse));
    this.CommomfilterService12.getsessiondata(this.resPonse)
    if (this.countries) {
      for (let i = 0; i < this.countries.length; i++) {
        this.countrieslist.push(this.countries[i].isoTitle)
      }
      console.log("countrylist", this.countrieslist)
      localStorage.setItem("countrylist", JSON.stringify(data.objectList[0].countries))
    }

    if (this.newsParameters) {
      for (let i = 0; i < this.newsParameters.length; i++) {
        this.newsParametersList.push(this.newsParameters[i])
      }
      console.log("newsParameters", this.newsParametersList)
      localStorage.setItem("newsParameters", JSON.stringify(this.newsParametersList))
    }

    if (this.agentPermissionStructure) {
      for (let i = 0; i < this.agentPermissionStructure.length; i++) {
        this.agentPermissionStructureList.push(this.agentPermissionStructure[i])
        console.log(this.agentPermissionStructure[i])
      }
      console.log("agentPermissionStructure", this.agentPermissionStructureList)
      localStorage.setItem("agentPermissionStructure", JSON.stringify(this.agentPermissionStructureList))
    }

    if (this.faceParameters) {
      for (let i = 0; i < this.faceParameters.length; i++) {
        this.faceParameterslist.push(this.faceParameters[i])
      }
      console.log("faceParameters", this.countrieslist)
      localStorage.setItem("faceParameters", JSON.stringify(this.faceParameterslist))
    }

    if (this.walletFormats) {
      for (let i = 0; i < this.walletFormats.length; i++) {
        this.walletFormatsList.push(this.walletFormats[i])
      }
      console.log("walletFormats", this.walletFormatsList)
      localStorage.setItem("walletFormats", JSON.stringify(this.walletFormatsList))
    }

    if (this.walletTypes) {
      for (let i = 0; i < this.walletTypes.length; i++) {
        this.walletTypeslist.push(this.walletTypes[i])
      }
      console.log("walletTypes", this.walletTypeslist)
      localStorage.setItem("walletTypes", JSON.stringify(this.walletTypeslist))
    }

    if (this.dictionaries) {
      for (let i = 0; i < this.dictionaries.length; i++) {
        if (this.dictionaries[i].dictionary == "DYID_CURRENCY") {
          this.walletlist.push(this.dictionaries[i])
          // this.walletlist.push(this.dictionaries[i].value && this.dictionaries[i].guid)   
        }
        if (this.dictionaries[i].dictionary == "DYID_CURRENCY") {
          this.currencyFormatList = []
          this.currencyFormatList.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_DEPOSIT_PAYMENT_SYSTEMS") {
          this.paymentname.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_CHAT_ACCESSIBILITY") {
          this.DYIDCHATACCESSIBILITY.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PLAYER_STATUS") {
          this.palyerstatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TOURNAMENT_SETTINGS_STATUS") {
          this.DYIDTOURNAMENTSETTINGSSTATUS.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_SCHEDULE_TYPE") {
          this.ScheduleType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_SHARE_TYPE") {
          this.ShareType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TOURNAMENT_STATUS") {
          this.TournamentStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_AVATAR_STATUS") {
          this.Avatarstatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PAYOUT_STRUCTURE_TYPE") {
          this.PayoutStructure.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PAYOUT_TICKET_TYPE") {
          this.PayoutTicketType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TOURNAMENT_RESULT_NOTIFICATION_TYPE") {
          this.TournamentResultNotificationType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TEMPLATE_CREATION_TYPES") {
          this.TemplateCreationTypes.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PERIOD_TYPES") {
          this.PeriodTypes.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_POKER_TABLE_JACKPOT_TYPE") {
          this.PokerTableType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_ENABLED_DISABLED_ALL") {
          this.Enabled_Disabled_All.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_BONUS_ADJUSTMENT_OPERATION_TYPE") {
          this.CashierOperationType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_USER_ACCESS_AREA") {
          this.UserAccessArea.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PASSWORD_STRENGTH") {
          this.PasswordStrength.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PROFILE_FORM_FIELD_STATUS") {
          this.ProfileFromFieldStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_REGISTRATION_FORM_FIELD_STATUS") {
          this.RegistrationFromFieldStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_REMOTE_HISTORY_ACTIVITY_STATUS") {
          this.RemoteHistoryActivityStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_REMOTE_GAME_SESSION_STATUS") {
          this.RemoteGameSessionStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_USER_ACCESS_RULE_STATUS") {
          this.UserAccessStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_ALLOWED_DENIED_ANY") {
          this.ReceiveNews.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_SUSPLINKS") {
          this.SUSPLINKS.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TYPEDAYOFMONTH") {
          this.TypeDayOfMonth.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_LATE_REGISTRATION_TYPE") {
          this.LateRegistrationType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TOURNEY_SYNCHRO_MODE_TYPE") {
          this.TourneySynchroModeType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TOURNEY_TYPE") {
          this.TourneyType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_MONTHS") {
          this.BirthdatMonths.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_DEPOSIT_PAYMENT_SYSTEMS") {
          this.PaymentSystemTypes.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_REGISTRATION_FORM_FIELD_STATUS") {
          this.DYIDREGISTRATIONFORMFIELDSTATUS.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_GAME_NAMES") {
          this.DYIDGAMENAMES.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_SESSION_TYPE") {
          this.SessionType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_BLACK_LIST_TYPES") {
          this.BlacklistTypes.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_WMASTER_STATUS") {
          this.Affiliatestatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_LANGUAGES") {
          this.Languages.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_LOGIN_TYPE") {
          this.LoginType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_NEWS_TYPE") {
          this.NewsType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_NEWS_STATUS") {
          this.NewsStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TRANSACTION_OPERATIONS") {
          this.TransactionOperations.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TRANSACTION_STATUSES") {
          this.TransactionStatuses.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TRANSACTION_HISTORY_TYPE") {
          this.TransactionHistoryType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_CASHOUT_REQUEST_OPERATION_TYPE") {
          this.CashOutStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PAYMENT_SYSTEMS") {
          this.PaymentsSystems.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_CASH_ADJUSTMENT_OPERATION_TYPE") {
          this.CashAdjustmentOperationType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TRANSACTION_PROMOCODE_STATUS") {
          this.PromoCodeStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TRANSFER_DIRECTION_TYPES") {
          this.TransferDirectionTypes.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_COMP_POINTS_ADJUSTMENT_OPERATION_TYPE") {
          this.DYIDCOMPPOINTSADJUSTMENTOPERATIONTYPE.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TRANSACTION_PROMOCODE_USAGE_TYPE" && this.dictionaries[i].hiddenByFeatures == false) {
          this.PromoCodeUsageType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TRANSACTION_PROMOCODE_USAGE_STATUS") {
          this.PromoCodeUsageStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_INTEGRATION_TYPES") {
          this.DYIDINTEGRATIONTYPES.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PASSWORD_STRENGTH") {
          this.DYIDPASSWORDSTRENGTH.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PROFILE_FORM_FIELD_STATUS") {
          this.DYIDPASSWORDYIDPROFILEFORMFIELDSTATUSDSTRENGTH.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_COMP_POINTS_EXCHANGE_TYPE") {
          this.DYIDCOMPPOINTSEXCHANGETYPE.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_GAME_GROUP_TYPE") {
          this.DYIDGAMEGROUPTYPE.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PLAYER_COMP_POINTS_LEVEL_PERIODS") {
          this.DYIDPLAYERCOMPPOINTSLEVELPERIODS.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PAYMENT_SYSTEMS") {
          this.PAYMENTSYSTEMS.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_REQUESTED_REPORT_STATUS") {
          this.RequestedReportStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_REQUESTED_REPORT_TYPE") {
          this.RequestedReportType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_USER_TYPE") {
          this.usertype.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_JACKPOT_OWNER_TYPE") {
          this.OwnerType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_CURRENCY_EXCHANGE_WALLET_FILTER_TYPE") {
          this.CurrncyExchangeWallet.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_CURRENCY_EXCHANGE_POCKET_TYPE") {
          this.CurrencyExchangPocketType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_AGENT_STATUSES") {
          this.Agentstatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_GAME_POT_ADJUSTMENT_TYPE") {
          this.gamePotAdjustmentType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_BOT_STRATEGY_TYPE") {
          this.botStrategyType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_BOT_STRATEGY_STATUS") {
          this.botStrategyStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_BOT_SETTINGS_STATUS") {
          this.botSettingStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PLAYER_LEVEL_CHANGE_STATUS") {
          this.playerlevelChangeStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_GAME_SESSION_STATUSES") {
          this.gameSessionStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_LEADERBOARD_TYPE") {
          this.LeaderBoardType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_LEADERBOARD_SETTINGS_PERIOD") {
          this.LeaderBoardSettingPeriod.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_LEADERBOARD_SETTINGS_STATUS") {
          this.LeaderBoardSettingStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_LEADERBOARD_STATUS") {
          this.LeaderBoardStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_LEADERBOARD_PAYOUT_STATE") {
          this.LeaderBoardPayoutState.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_REFERRED_STATUS") {
          this.ReferredStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PAYMENT_MEAN_STATUSES") {
          this.PaymentMeansStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TEMPLATE_ALL_TYPES") {
          this.TemplateTypes.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_TICKET_STATUS") {
          this.TicketStatus.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_BAD_BEAT_MIN_COMBINATION") {
          this.BadBeatMinCombinations.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_JACKPOT_TYPE") {
          this.jackpotTypes.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_PROMOCODE_REWARD_AMOUNT_TYPE") {
          this.PromocodeRewardTypes.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_POKER_GAME_TYPE") {
          this.pokerGameTypes.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_POKER_TABLE_SEATS") {
          this.pokerTableSeats.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_GEO_IP_PROVIDER_TYPE") {
          this.geoIpProviderType.push(this.dictionaries[i])
        }
        if (this.dictionaries[i].dictionary == "DYID_CAMPAIGN_PROGRAMM") {
          this.campaignProgram.push(this.dictionaries[i])
        }

      }
    }

    console.log("walletlist", this.walletlist)
    localStorage.setItem('walletlist', JSON.stringify(this.walletlist))
    localStorage.setItem('currencyFormats', JSON.stringify(this.currencyFormatList))
    console.log("paymentname", this.paymentname)
    localStorage.setItem('paymentname', JSON.stringify(this.paymentname))
    localStorage.setItem('DYIDCHATACCESSIBILITY', JSON.stringify(this.DYIDCHATACCESSIBILITY))
    console.log("DYIDTOURNAMENTSETTINGSSTATUS", this.DYIDTOURNAMENTSETTINGSSTATUS)
    localStorage.setItem('DYIDTOURNAMENTSETTINGSSTATUS', JSON.stringify(this.DYIDTOURNAMENTSETTINGSSTATUS))
    console.log("PLAYERSTATUS", this.palyerstatus)
    localStorage.setItem('palyerstatus', JSON.stringify(this.palyerstatus))
    console.log("ScheduleType", this.ScheduleType)
    localStorage.setItem('ScheduleType', JSON.stringify(this.ScheduleType))
    console.log("ShareType", this.ShareType)
    localStorage.setItem('ShareType', JSON.stringify(this.ShareType))
    console.log("TournamentStatus", this.TournamentStatus)
    localStorage.setItem('TournamentStatus', JSON.stringify(this.TournamentStatus))
    console.log("Avatarstatus", this.Avatarstatus)
    localStorage.setItem('Avatarstatus', JSON.stringify(this.Avatarstatus))
    console.log("PayoutStructure", this.PayoutStructure)
    localStorage.setItem('PayoutStructure', JSON.stringify(this.PayoutStructure))
    console.log("PayoutTicketType", this.PayoutTicketType)
    localStorage.setItem('PayoutTicketType', JSON.stringify(this.PayoutTicketType))
    console.log("TournamentResultNotificationType", this.TournamentResultNotificationType)
    localStorage.setItem('TournamentResultNotificationType', JSON.stringify(this.TournamentResultNotificationType))
    console.log("TemplateCreationTypes", this.TemplateCreationTypes)
    localStorage.setItem('TemplateCreationTypes', JSON.stringify(this.TemplateCreationTypes))
    console.log("PeriodTypes", this.PeriodTypes)
    localStorage.setItem('PeriodTypes', JSON.stringify(this.PeriodTypes))
    console.log("PokerTableType", this.PokerTableType)
    localStorage.setItem('PokerTableType', JSON.stringify(this.PokerTableType))
    console.log("Enabled_Disabled_All", this.Enabled_Disabled_All)
    localStorage.setItem('Enabled_Disabled_All', JSON.stringify(this.Enabled_Disabled_All))
    console.log("CashierOperationType", this.PokerTableType)
    localStorage.setItem('CashierOperationType', JSON.stringify(this.CashierOperationType))
    console.log("UserAccessArea", this.UserAccessArea)
    localStorage.setItem('UserAccessArea', JSON.stringify(this.UserAccessArea))
    console.log("PasswordStrength", this.PasswordStrength)
    localStorage.setItem('PasswordStrength', JSON.stringify(this.PasswordStrength))
    console.log("ProfileFromFieldStatus", this.ProfileFromFieldStatus)
    localStorage.setItem('ProfileFromFieldStatus', JSON.stringify(this.ProfileFromFieldStatus))
    console.log("RegistrationFromFieldStatus", this.RegistrationFromFieldStatus)
    localStorage.setItem('RegistrationFromFieldStatus', JSON.stringify(this.RegistrationFromFieldStatus))
    console.log("RemoteHistoryActivityStatus", this.RemoteHistoryActivityStatus)
    localStorage.setItem('RemoteHistoryActivityStatus', JSON.stringify(this.RemoteHistoryActivityStatus))
    console.log("RemoteGameSessionStatus", this.RemoteGameSessionStatus)
    localStorage.setItem('RemoteGameSessionStatus', JSON.stringify(this.RemoteGameSessionStatus))
    console.log("UserAccessStatus", this.UserAccessStatus)
    localStorage.setItem('UserAccessStatus', JSON.stringify(this.UserAccessStatus))
    console.log("ReceiveNews", this.ReceiveNews)
    localStorage.setItem('ReceiveNews', JSON.stringify(this.ReceiveNews))
    console.log("SUSPLINKS", this.SUSPLINKS)
    localStorage.setItem('SUSPLINKS', JSON.stringify(this.SUSPLINKS))
    console.log("TypeDayOfMonth", this.TypeDayOfMonth)
    localStorage.setItem('TypeDayOfMonth', JSON.stringify(this.TypeDayOfMonth))
    console.log("LateRegistrationType", this.LateRegistrationType)
    localStorage.setItem('LateRegistrationType', JSON.stringify(this.LateRegistrationType))
    console.log("TourneySynchroModeType", this.TourneySynchroModeType)
    localStorage.setItem('TourneySynchroModeType', JSON.stringify(this.TourneySynchroModeType))
    console.log("TourneyType", this.TourneyType)
    localStorage.setItem('TourneyType', JSON.stringify(this.TourneyType))
    console.log("BirthdatMonths", this.BirthdatMonths)
    localStorage.setItem('BirthdatMonths', JSON.stringify(this.BirthdatMonths))
    console.log("paymentSystemTypes", this.PaymentSystemTypes)
    localStorage.setItem('paymentSystemTypes', JSON.stringify(this.PaymentSystemTypes))
    console.log("DYIDGAMENAMES", this.DYIDGAMENAMES)
    localStorage.setItem('DYIDGAMENAMES', JSON.stringify(this.DYIDGAMENAMES))
    console.log("DYIDREGISTRATIONFORMFIELDSTATUS", this.DYIDREGISTRATIONFORMFIELDSTATUS)
    localStorage.setItem('DYIDREGISTRATIONFORMFIELDSTATUS', JSON.stringify(this.DYIDREGISTRATIONFORMFIELDSTATUS))
    console.log("SessionType", this.SessionType)
    localStorage.setItem('SessionType', JSON.stringify(this.SessionType))
    console.log("BlacklistTypes", this.BlacklistTypes)
    localStorage.setItem('BlacklistTypes', JSON.stringify(this.BlacklistTypes))
    console.log("Affiliatestatus", this.Affiliatestatus)
    localStorage.setItem('Affiliatestatus', JSON.stringify(this.Affiliatestatus))
    console.log("Languages", this.Languages)
    localStorage.setItem('Languages', JSON.stringify(this.Languages));
    console.log("LoginType", this.LoginType)
    localStorage.setItem('LoginType', JSON.stringify(this.LoginType));
    console.log("NewsType", this.NewsType)
    localStorage.setItem('NewsType', JSON.stringify(this.NewsType));
    console.log("NewsStatus", this.NewsStatus)
    localStorage.setItem('NewsStatus', JSON.stringify(this.NewsStatus));
    console.log("TransactionOperations", this.TransactionOperations)
    localStorage.setItem('TransactionOperations', JSON.stringify(this.TransactionOperations))
    console.log("TransactionStatuses", this.TransactionStatuses)
    localStorage.setItem('TransactionStatuses', JSON.stringify(this.TransactionStatuses))
    console.log("TransactionHistoryType", this.TransactionHistoryType)
    localStorage.setItem('TransactionHistoryType', JSON.stringify(this.TransactionHistoryType))
    console.log("CashOutStatus", this.CashOutStatus)
    localStorage.setItem('CashOutStatus', JSON.stringify(this.CashOutStatus))
    console.log("PaymentsSystems", this.PaymentsSystems)
    localStorage.setItem('PaymentsSystems', JSON.stringify(this.PaymentsSystems))
    console.log("CashAdjustmentOperationType", this.CashAdjustmentOperationType)
    localStorage.setItem('CashAdjustmentOperationType', JSON.stringify(this.CashAdjustmentOperationType))
    console.log("PromoCodeStatus", this.PromoCodeStatus)
    localStorage.setItem('PromoCodeStatus', JSON.stringify(this.PromoCodeStatus))
    console.log("TransferDirectionTypes", this.TransferDirectionTypes)
    localStorage.setItem('TransferDirectionTypes', JSON.stringify(this.TransferDirectionTypes))
    console.log("DYIDCOMPPOINTSADJUSTMENTOPERATIONTYPE", this.DYIDCOMPPOINTSADJUSTMENTOPERATIONTYPE)
    localStorage.setItem('DYIDCOMPPOINTSADJUSTMENTOPERATIONTYPE', JSON.stringify(this.DYIDCOMPPOINTSADJUSTMENTOPERATIONTYPE))
    console.log("PromoCodeUsageType", this.PromoCodeUsageType)
    localStorage.setItem('PromoCodeUsageType', JSON.stringify(this.PromoCodeUsageType))
    console.log("PromoCodeUsageStatus", this.PromoCodeUsageStatus)
    localStorage.setItem('PromoCodeUsageStatus', JSON.stringify(this.PromoCodeUsageStatus))
    console.log("DYIDINTEGRATIONTYPES", this.DYIDINTEGRATIONTYPES)
    localStorage.setItem("DYIDINTEGRATIONTYPES", JSON.stringify(this.DYIDINTEGRATIONTYPES))
    console.log("DYIDPASSWORDSTRENGTH", this.DYIDPASSWORDSTRENGTH)
    localStorage.setItem("DYIDPASSWORDSTRENGTH", JSON.stringify(this.DYIDPASSWORDSTRENGTH))
    console.log("DYIDPASSWORDYIDPROFILEFORMFIELDSTATUSDSTRENGTH", this.DYIDPASSWORDYIDPROFILEFORMFIELDSTATUSDSTRENGTH)
    localStorage.setItem("DYIDPASSWORDYIDPROFILEFORMFIELDSTATUSDSTRENGTH", JSON.stringify(this.DYIDPASSWORDYIDPROFILEFORMFIELDSTATUSDSTRENGTH))
    console.log("DYIDCOMPPOINTSEXCHANGETYPE", this.DYIDCOMPPOINTSEXCHANGETYPE)
    localStorage.setItem("DYIDCOMPPOINTSEXCHANGETYPE", JSON.stringify(this.DYIDCOMPPOINTSEXCHANGETYPE))
    console.log("DYIDGAMEGROUPTYPE", this.DYIDGAMEGROUPTYPE)
    localStorage.setItem("DYIDGAMEGROUPTYPE", JSON.stringify(this.DYIDGAMEGROUPTYPE))
    console.log("DYIDPLAYERCOMPPOINTSLEVELPERIODS", this.DYIDPLAYERCOMPPOINTSLEVELPERIODS)
    localStorage.setItem("DYIDPLAYERCOMPPOINTSLEVELPERIODS", JSON.stringify(this.DYIDPLAYERCOMPPOINTSLEVELPERIODS))
    console.log("PAYMENTSYSTEMS", this.PAYMENTSYSTEMS)
    localStorage.setItem('PAYMENTSYSTEMS', JSON.stringify(this.PAYMENTSYSTEMS))
    console.log("RequestedReportStatus", this.RequestedReportStatus)
    localStorage.setItem('RequestedReportStatus', JSON.stringify(this.RequestedReportStatus))
    console.log("RequestedReportType", this.RequestedReportType)
    localStorage.setItem('RequestedReportType', JSON.stringify(this.RequestedReportType))
    console.log("usertype", this.usertype)
    localStorage.setItem("usertype", JSON.stringify(this.usertype))
    console.log("OwnerType", this.OwnerType)
    localStorage.setItem('OwnerType', JSON.stringify(this.OwnerType));
    console.log("CurrncyExchangeWallet", this.CurrncyExchangeWallet)
    localStorage.setItem('CurrncyExchangeWallet', JSON.stringify(this.CurrncyExchangeWallet))
    console.log("CurrencyExchangPocketType", this.CurrencyExchangPocketType)
    localStorage.setItem('CurrencyExchangPocketType', JSON.stringify(this.CurrencyExchangPocketType))
    console.log("Agentstatus", this.Agentstatus)
    localStorage.setItem('Agentstatus', JSON.stringify(this.Agentstatus))
    console.log("gamePotAdjustmentType", this.gamePotAdjustmentType)
    localStorage.setItem("gamePotAdjustmentType", JSON.stringify(this.gamePotAdjustmentType))
    console.log("botStrategyType", this.botStrategyType)
    localStorage.setItem("botStrategyType", JSON.stringify(this.botStrategyType))
    console.log("botStrategyStatus", this.botStrategyStatus)
    localStorage.setItem("botStrategyStatus", JSON.stringify(this.botStrategyStatus))
    console.log("botSettingStatus", this.botSettingStatus)
    localStorage.setItem("botSettingStatus", JSON.stringify(this.botSettingStatus))
    console.log("playerlevelChangeStatus", this.gameSessionStatus)
    localStorage.setItem("playerlevelChangeStatus", JSON.stringify(this.playerlevelChangeStatus))
    console.log("gameSessionStatus", this.gameSessionStatus)
    localStorage.setItem("gameSessionStatus", JSON.stringify(this.gameSessionStatus))
    console.log("LeaderBoardType", this.LeaderBoardType)
    localStorage.setItem("LeaderBoardType", JSON.stringify(this.LeaderBoardType))
    console.log("LeaderBoardSettingPeriod", this.LeaderBoardSettingPeriod)
    localStorage.setItem("LeaderBoardSettingPeriod", JSON.stringify(this.LeaderBoardSettingPeriod))
    console.log("LeaderBoardSettingStatus", this.LeaderBoardSettingStatus)
    localStorage.setItem("LeaderBoardSettingStatus", JSON.stringify(this.LeaderBoardSettingStatus))
    console.log("LeaderBoardStatus", this.LeaderBoardStatus)
    localStorage.setItem("LeaderBoardStatus", JSON.stringify(this.LeaderBoardStatus))
    console.log("LeaderBoardPayoutState", this.LeaderBoardPayoutState)
    localStorage.setItem("LeaderBoardPayoutState", JSON.stringify(this.LeaderBoardPayoutState))
    console.log("ReferredStatus", this.ReferredStatus)
    localStorage.setItem("ReferredStatus", JSON.stringify(this.ReferredStatus))
    console.log("PaymentMeansStatus", this.PaymentMeansStatus)
    localStorage.setItem("PaymentMeansStatus", JSON.stringify(this.PaymentMeansStatus))
    console.log("TemplateTypes", this.TemplateTypes)
    localStorage.setItem("TemplateTypes", JSON.stringify(this.TemplateTypes))
    console.log("TicketStatus", this.TicketStatus)
    localStorage.setItem("TicketStatus", JSON.stringify(this.TicketStatus))
    console.log("BadBeatMinCombinations", this.BadBeatMinCombinations)
    localStorage.setItem("BadBeatMinCombinations", JSON.stringify(this.BadBeatMinCombinations))
    console.log("jackpotTypes", this.jackpotTypes)
    localStorage.setItem("jackpotTypes", JSON.stringify(this.jackpotTypes))
    console.log("PromocodeRewardTypes", this.PromocodeRewardTypes)
    localStorage.setItem("PromocodeRewardTypes", JSON.stringify(this.PromocodeRewardTypes))
    console.log("pokerGameTypes", this.pokerGameTypes)
    localStorage.setItem("pokerGameTypes", JSON.stringify(this.pokerGameTypes))
    console.log("pokerTableSeats", this.pokerTableSeats)
    localStorage.setItem("pokerTableSeats", JSON.stringify(this.pokerTableSeats))
    console.log("geoIpProviderType", this.geoIpProviderType)
    localStorage.setItem("geoIpProviderType", JSON.stringify(this.geoIpProviderType))
    console.log("campaignProgram", this.campaignProgram)
    localStorage.setItem("campaignProgram", JSON.stringify(this.campaignProgram))

    // ------------------------------------------------

  }

}
