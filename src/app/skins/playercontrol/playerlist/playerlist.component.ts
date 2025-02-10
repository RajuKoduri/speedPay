import { Component, ElementRef, OnInit, QueryList, ViewChildren, OnDestroy, AfterViewInit, } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, } from '@angular/forms';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import { LoginService } from 'src/app/source/login.service';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { toString } from '@ng-bootstrap/ng-bootstrap/util/util';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
// import { ActivatedRoute, Router, RouterStateSnapshot,NavigationStart , } from '@angular/router';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TotalSumsService } from 'src/app/source/total-sums.service';
//import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css'],
})
export class PlayerlistComponent implements OnInit, AfterViewInit, OnDestroy {
  //@ViewChildren('textboxes') textboxes: QueryList<ElementRef>;
  // fileName:'ExcelSheet.xlsx';
  selectedItem: any = [];
  filterFirstrecord: any;
  changedProperties: any = [];
  all = 'All';
  // all : any = [];
  popupArrow: boolean = false;
  SpinnwerT: boolean = false;
  ChangePmGroup: boolean = false;
  AssinCPLevel: boolean = false;
  country: any;
  tirle = 'pagination';
  page: number = 1;
  count: number = 0;
  FirstrecordFillter: any = 0;
  PlayerListregDate: any;
  PlayerListregDates: any;
  tableSize: number = 10;
  // tableSizes:any =[5,10,15,20];
  filterForm: FormGroup;
  namesLists: any;
  PlayerList: any;
  ResultCount: any;
  rowsOnthePage: any;
  FillterMenu: boolean = false;
  ActionAlertPopup: boolean = false;
  loader: boolean = false;
  getSessionData: any;
  getSessionDataAll: any;
  countries: any;
  countrieslist: any = [];
  // all: any;
  data: any;
  dictionaries: any;
  walletlist: any[] = [];
  walletlists: any = [];
  playerStatusList: any = [];
  ReceiveNewsList: any = [];
  getPlayerLevelsNames: any = [];
  getPlayerLevelsNameslists: any = [];
  BirthdatMonths: any = [];
  faceParameterslist: any = [];
  countryValue: any;
  counter: number = 0;
  activateTab: string | number = 111;
  p: number = 1;
  selectnum: number = 100;
  selectnumber: number = -5;
  itemsperpagecount = [
    { num: 5 },
    { num: 15 },
    { num: 25 },
    { num: 40 },
    { num: 50 },
  ];
  currentCountry: any;
  resultcount: boolean = true;
  playerdetailspopup = false;
  playerfulldetails: any;
  PlayerLogin: any;
  NickName: any;
  shortId: any;
  ALias: any;
  UserId: any;


  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  disablecheckbox: boolean = false;
  declineDeposits: any;
  storedDoc: any;
  obj: any;
  balance: any;
  cash: any;
  bonus: any;
  transfersToAgents: any;
  transfersFromAgents: any;
  debts: any;
  deposits: any;
  compPoints: any;
  tournamentTicketsCost: any;
  tournamentMoney: any;
  countrie: Array<any> = [
    { name: 'India', value: 'india' },
    { name: 'France', value: 'france' },
    { name: 'USA', value: 'USA' },
    { name: 'Germany', value: 'germany' },
    { name: 'Japan', value: 'Japan' },
  ];
  playernickName: any;
  SeletedIconIndex: any;
  openPopu: any;
  PlayerGuid: any;
  AlertMessage: any;
  PlayerActionType: any;
  Actiondataforplayer: any;
  usertypeList: any;
  UserPermissionsGroupList: any;
  selectedPermissionGroup: any;
  PlayerLevelsList: any;
  SelectedLevel: any;
  NotificationCheck = false;
  SetAliaspop: boolean = false;
  SetAliasName: any;
  dropdownList: any = [];
  dropDownCheckedList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  selectedFillterGames: any = [];
  gamesTobeSelected: any = 'All';
  faceParameterslist12: any;
  dropdownList12: any = [];
  selectedItems12: any = [];
  convertedArray: string[] = [];
  faceconvertedarray: string[] = [];
  playerstatusdropList: any;
  dropdownSettingsstatus = {}
  selectedItemsStatus: any = []
  playerstatusaaray: any = []
  dropdownSettingslevel = {}
  playerlevelchange: any = []
  playerlevelaaray: any = []
  dropdownlevelList: any;
  coutriesall: any = []
  selectedCountry: any = "All"
  startDate: any;
  endDate: any;
  todaydate: any;
  timeerror: boolean = false
  steddate: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  paginationValidation: boolean = false;
  queryParams: any;
  private navigationStartSubscription: Subscription = new Subscription();
  compointskey: any = null;
  permissionGroupSubscription: Subscription = new Subscription();
  permissionGroupkey: any = null;
  isRestrictandFraud: boolean = false;
  action: any;

  constructor(
    private PlayerserviceService: PlayerServiceService, private loginService: LoginService, private fb: FormBuilder,
    private CommomfilterService: CommomfilterService,  private router: Router, private DateTimePipe: DateTimePipe,
    private FileformatServiceService: FileformatServiceService, private GamesofpokerService: GamesofpokerService,
    private route: ActivatedRoute, private totalSumService:TotalSumsService
  ) {

    this.navigationStartSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Clear data when navigation starts
        localStorage.removeItem('compointskey');
      }
    });

    this.permissionGroupSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        localStorage.removeItem('permissionGropKey');
      }

    })

    this.filterForm = new FormGroup({
      selectedCountries: new FormArray([]),
      wallet: new FormControl(),
      accountMask: new FormControl(),
      nickName: new FormControl(),
      shortId: new FormControl(),
      alias: new FormControl(),
      email: new FormControl(),
      Playerlevel: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      ipAddress: new FormControl(),
      networkNames: new FormControl(),
      country: new FormControl(),
      statusesIdList: new FormControl(),
      ReceiveNews: new FormControl(),
      birthMonths: new FormControl(),
      balanceAmounthigh: new FormControl(),
      balanceAmountlow: new FormControl(),
      debtAmountlow: new FormControl(),
      debtAmounthigh: new FormControl(),
      RegistrationStart: new FormControl(),
      RegistrationEnd: new FormControl(),
      birthDayOfMonthFrom: new FormControl(),
      birthDayOfMonthTo: new FormControl(),
      permissionsGroup: new FormControl(),
      affiliateLogin: new FormControl(),
      referringPlayerLogin: new FormControl(),
      firstRecord: new FormControl(1, this.CommomfilterService.requiredAndMinOne()),
      maxCountRecord: new FormControl(100, this.CommomfilterService.requiredAndMinOne()),
      startDate: new FormControl(this.startDate,),
      endDate: new FormControl(this.endDate,),
      // startDate: new FormControl(this.startDate, Validators.required),
      // endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
    });




  }

  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
    this.navigationStartSubscription.unsubscribe();
    this.permissionGroupSubscription.unsubscribe();
  }

  onCheckboxChange(event: any) {
    const selectedCountries = this.filterForm.controls[
      'selectedCountries'
    ] as FormArray;
    if (event.target.checked) {
      selectedCountries.push(new FormControl(event.target.value));
    } else {
      const index = selectedCountries.controls.findIndex(
        (x) => x.value === event.target.value
      );
      selectedCountries.removeAt(index);
    }
  }
  ngOnInit(): void {
    this.selectedItems12 = [];
    console.log(this.selectnum);
    this.getSessionData = localStorage.getItem('getSessionData');
    this.getSessionDataAll = JSON.parse(this.getSessionData);
    console.log(this.getSessionDataAll);
    // console.log(this.getSessionDataAll[0].constants.playerStatus)
    console.log(this.getSessionDataAll[0].countries);
    console.log(this.getSessionDataAll[0].dictionaries);
    this.countries = this.getSessionDataAll[0].countries;
    this.dictionaries = this.getSessionDataAll[0].dictionaries;

    // for (let i =0; i<this.countries.length; i++){
    //   this.countrieslist.push(this.countries[i].isoTitle)
    // }
    // console.log("countrylist",this.countrieslist)
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    // this.startDate = datee;
    // this.endDate = dateE;
    this.startDate = "";
    this.endDate = "";
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    this.countrylist();
    this.palyerstatus();
    this.getPlayerLevelsNameslist();
    this.ReceiveNews();
    this.BirthdatMonthslist();
    // this.walletlistmethod()
    // this.walletTypes12()
    this.walletTypes_comm();
    this.usertype();
    this.faceParameters();
    this.permissionGropValue()

    // let ws = sessionStorage.getItem('wsession')
    // this.PlayerserviceService.getPlayersSummaryByFilter(ws).subscribe((res) => {
    //   this.PlayerList = res.objectList;
    //   console.log(res.objectList)
    // })
    // this.gettingdataService.UsersDataFromJsonPlaceHolder().subscribe(data=>
    //   {
    //     this.namesLists = data;
    //     console.log(data);
    // })


  }

  ngAfterViewInit(): void {

  }

  permissionGropValue() {
    const permissionkey: any = localStorage.getItem("permissionGropKey");
    this.permissionGroupkey = JSON.parse(permissionkey);
    if (this.permissionGroupkey != null) {
      this.filterForm.patchValue({
        permissionsGroup: this.permissionGroupkey
      })
      this.onFormSubmit()
    }
    console.log("permissionkey", this.permissionGroupkey)
  }

  // private parseQueryParams(url: string): any {
  //   const queryParams = {};
  //   const queryString = url.split('?')[1];
  //   if (queryString) {
  //     const paramsArray = queryString.split('&');
  //     paramsArray.forEach((param) => {
  //       const [key, value] = param.split('=');
  //       queryParams[key] = value;
  //     });
  //   }
  //   return queryParams;
  // }



  countrylist() {
    const countries = localStorage.getItem('countrylist');
    if (countries) {
      this.countrieslist = JSON.parse(countries) || [];
      // this.all.push( this.countrieslist.CID);
    }
    console.log(this.countries);
  }

  palyerstatus() {
    this.playerstatusaaray = []
    const playerstatus = localStorage.getItem('palyerstatus');
    if (playerstatus) {
      this.playerStatusList = JSON.parse(playerstatus);
    }
    console.log('playerStatusList', this.playerStatusList);

    //  for (let i = 0; i < this.playerStatusList.length; i++) {
    //   this.selectedItemsStatus[i] = {
    //     face: this.faceParameterslist.name,
    //   };
    // }
    for (let i = 0; i < this.playerStatusList.length; i++) {
      this.selectedItemsStatus[i] = {
        value: this.playerStatusList[i].value,
        guid: this.playerStatusList[i].guid
      }
    }
    console.log(this.selectedItemsStatus)
    this.selectedItemsStatus.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });

    this.playerstatusdropList = this.playerStatusList;
    console.log(this.playerstatusdropList);
    this.dropdownSettingsstatus = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectedItemsStatus = this.playerstatusdropList;

  }

  getPlayerLevelsNameslist() {
    this.playerlevelaaray = []
    const getPlayerLevelsNameslist = localStorage.getItem('getPlayerLevelsNames');
    if (getPlayerLevelsNameslist) {
      this.getPlayerLevelsNames = JSON.parse(getPlayerLevelsNameslist);
      console.log(this.getPlayerLevelsNames.compPointsLevels);
      for (let i = 0; i < this.getPlayerLevelsNames.compPointsLevels.length; i++) {
        this.getPlayerLevelsNameslists.push(
          this.getPlayerLevelsNames.compPointsLevels[i]
        );
      }
    }
    console.log('getPlayerLevelsNames', this.getPlayerLevelsNameslists);
    // console.log("getPlayerLevelsNames", this.getPlayerLevelsNameslists.compPointsLevels)


    const compointskey: any = localStorage.getItem('compointskey');
    this.compointskey = JSON.parse(compointskey);
    console.log("compointskey ----->>", this.compointskey)




    for (let i = 0; i < this.getPlayerLevelsNameslists.length; i++) {

      if (this.compointskey != null) {
        if (this.compointskey.guid.hiLong == this.getPlayerLevelsNameslists[i].guid.hiLong &&
          this.compointskey.guid.lowLong == this.getPlayerLevelsNameslists[i].guid.lowLong) {
          this.playerlevelchange[0] = {
            value: this.getPlayerLevelsNameslists[i].name,
            guid: this.getPlayerLevelsNameslists[i].guid

          }

        }
        console.log("++++++++++++++++++++++", this.playerlevelchange)
        break;


      } else {
        this.playerlevelchange[i] = {
          value: this.getPlayerLevelsNameslists[i].name,
          guid: this.getPlayerLevelsNameslists[i].guid
        }

        console.log("-----------------", this.playerlevelchange)
      }

    }




    console.log(this.playerlevelchange)
    this.playerlevelchange.forEach((item: { guid: any; }) => {
      this.playerlevelaaray.push(item.guid);
    });

    this.dropdownlevelList = this.getPlayerLevelsNameslists;

    console.log(this.dropdownlevelList);
    this.dropdownSettingslevel = {
      singleSelection: false,
      idField: 'guid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };

    if (this.compointskey != null) {
      for (let i = 0; i < this.dropdownlevelList.length; i++) {
        if (this.compointskey.guid.hiLong == this.dropdownlevelList[i].guid.hiLong &&
          this.compointskey.guid.lowLong == this.dropdownlevelList[i].guid.lowLong) {
          this.playerlevelchange[0] = this.dropdownlevelList[i];
          this.onFormSubmit();
        }
        break;

      }

    } else {
      this.playerlevelchange = this.dropdownlevelList;
    }

    console.log("this.playerlevelchange", this.playerlevelchange)

  }
  ReceiveNews() {
    const ReceiveNews = localStorage.getItem('ReceiveNews');
    if (ReceiveNews) {
      this.ReceiveNewsList = JSON.parse(ReceiveNews);
    }
    console.log('ReceiveNews', this.ReceiveNewsList);
  }
  BirthdatMonthslist() {
    const BirthdatMonths = localStorage.getItem('BirthdatMonths');
    if (BirthdatMonths) {
      this.BirthdatMonths = JSON.parse(BirthdatMonths);
    }
    console.log('BirthdatMonths', this.BirthdatMonths);
  }
  faceParameters() {
    this.convertedArray = []
    this.faceconvertedarray = []
    this.faceParameterslist12 = this.CommomfilterService.selectallst();
    console.log(this.faceParameterslist12);
    // const faceParameterslist = localStorage.getItem('faceParameters');
    // if (faceParameterslist) {
    //   this.faceParameterslist12 = JSON.parse(faceParameterslist);
    //   console.log(this.faceParameterslist12);
    // }
    // for (let i = 0; i < this.faceParameterslist12.length; i++) {
    //   this.selectedItems[i] = {
    //     face: this.faceParameterslist.name,
    //   };
    // }
    this.faceParameterslist12.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
      this.faceconvertedarray.push(item.name);
    });
    console.log(this.convertedArray);
    this.dropdownList12 = this.faceParameterslist12;
    console.log(this.dropdownList12);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectedItems12 = this.dropdownList12;
  }
  // walletlistmethod() {
  //   console.log("walletlist", this.walletlist)
  //   const wallets = localStorage.getItem('walletlist');
  //   if (wallets) {
  //     this.walletlist = JSON.parse(wallets);
  //     for (let i = 0; i < this.walletlist.length; i++) {
  //       this.walletlists.push(this.walletlist[i])
  //     }
  //   }
  //   console.log("walletlist",this.walletlist)
  //   console.log(this.walletlists.value)
  // }
  walletTypes12() {
    const walletTypes = localStorage.getItem('walletTypes');

    if (walletTypes) {
      this.walletlist = JSON.parse(walletTypes);
      console.log(this.walletlist);
    }
    for (let i = 0; i < this.walletlist.length; i++) {
      // if (this.walletlist[i].description == "U.S. Dollars" || this.walletlist[i].description == "Chips") {
      if (this.walletlist[i].clubGameWallet == true) {
        if (this.walletlist[i].description !== 'Play Money')
          this.walletlists.push(this.walletlist[i]);
      }
    }
    console.log('walletlists', this.walletlists);
  }
  walletTypes_comm() {
    this.walletlists = this.CommomfilterService.walletTypes_comm();
    console.log('walletlists', this.walletlists);

    this.dropdownList = this.walletlists;
    console.log(this.dropdownList);
    this.dropDownCheckedList = this.walletlists;

    for (let i = 0; i < this.walletlists.length; i++) {
      // this.selectedItems[i] = this.walletlists[i]
      // this.selectedItems[i] = {
      //   description: this.walletlists[i].description,
      //   guid: this.walletlists[i].guid
      // }
    }
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'name',
    //   textField: 'name',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 1,
    //   allowSearchFilter: false
    // };
  }

  usertype() {
    const usertype = localStorage.getItem('usertype');
    if (usertype) {
      this.usertypeList = JSON.parse(usertype);
      console.log(this.usertypeList);
    }
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  // gettingfromUrl(){
  //   this.gettingdataService.UsersDataFromJsonPlaceHolder().subscribe(data=>
  //     {
  //       this.namesLists = data;
  //       console.log(data);
  //     })
  // }
  // SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls).forEach((key) => {
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
  onFormSubmit() {
  this.SpinnwerT = false

    console.log(this.filterForm.valid)
    if (this.filterForm.valid) {


      this.selectnum = this.filterForm.value.maxCountRecord;
      this.loader = true;
      // alert(1)
      this.PlayerList = false;
      console.log(this.filterForm.value.startDate)
      console.log(this.filterForm.value);
      if (this.filterForm.value == null) {
      }
      // this.filterForm.controls['firstRecord'].markAsDirty()
      // this.filterForm.controls['maxCountRecord'].markAsDirty()



      this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;


      let fillterbody = this.getDirtyValues(this.filterForm)
      this.filterFirstrecord = fillterbody;
      fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
      fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord

      fillterbody['levelGuids'] = this.playerlevelaaray != null ? this.playerlevelaaray : undefined
      // fillterbody['levelGuids'] = this.filterForm.value.Playerlevel != null ? [this.filterForm.value.Playerlevel] : undefined
      fillterbody["networkNames"] = this.convertedArray != null ? this.convertedArray : undefined;
      // fillterbody["networkNames"] = this.filterForm.value.networkNames != null ?  this.filterForm.value.networkNames : undefined
      fillterbody["birthDayOfMonth"] = this.filterForm.value.birthDayOfMonthFrom != null ? { "from": this.filterForm.value.birthDayOfMonthFrom, "to": this.filterForm.value.birthDayOfMonthTo } : undefined
      fillterbody["birthMonths"] = this.filterForm.value.birthMonths != null ? [this.filterForm.value.birthMonths] : undefined
      fillterbody["balanceAmount"] = this.filterForm.value.balanceAmounthigh != null ? { "high": this.filterForm.value.balanceAmounthigh, "low": this.filterForm.value.balanceAmountlow } : undefined
      fillterbody["debtAmount"] = this.filterForm.value.debtAmounthigh != null ? { "high": this.filterForm.value.debtAmounthigh, "low": this.filterForm.value.debtAmountlow } : undefined
      // fillterbody["regDate"] = this.filterForm.value.RegistrationEnd != null ? { "end": this.filterForm.value.RegistrationEnd, "start": this.filterForm.value.RegistrationStart } : undefined
      fillterbody["regDate"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
        (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;
      fillterbody["statusesIdList"] = this.playerstatusaaray != null ? this.playerstatusaaray : undefined
      // fillterbody["statusesIdList"] = this.filterForm.value.statusesIdList != null ? [this.filterForm.value.statusesIdList] : undefined

      // //////////////////////////
      fillterbody["accountMask"] = this.filterForm.value.accountMask != null ? this.filterForm.value.accountMask : undefined
      fillterbody["wallet"] = this.filterForm.value.wallet != null ? this.filterForm.value.wallet : undefined
      fillterbody["nickName"] = this.filterForm.value.nickName != null ? this.filterForm.value.nickName : undefined
      fillterbody["firstName"] = this.filterForm.value.firstName != null ? this.filterForm.value.firstName : undefined
      fillterbody["email"] = this.filterForm.value.email != null ? this.filterForm.value.email : undefined
      fillterbody["alias"] = this.filterForm.value.alias != null ? this.filterForm.value.alias : undefined
      fillterbody["lastName"] = this.filterForm.value.lastName != null ? this.filterForm.value.lastName : undefined
      fillterbody["shortId"] = this.filterForm.value.shortId != null ? this.filterForm.value.shortId : undefined
      fillterbody["ipAddress"] = this.filterForm.value.ipAddress != null ? this.filterForm.value.ipAddress : undefined
      if (this.filterForm.value.country !== 'All') {

        fillterbody["country"] = this.filterForm.value.country != null ? this.filterForm.value.country : undefined
      }
      fillterbody["ReceiveNews"] = this.filterForm.value.ReceiveNews != null ? this.filterForm.value.ReceiveNews : undefined
      fillterbody["permissionsGroup"] = this.filterForm.value.permissionsGroup != null ? this.filterForm.value.permissionsGroup : undefined
      fillterbody["referringPlayerLogin"] = this.filterForm.value.referringPlayerLogin != null ? this.filterForm.value.referringPlayerLogin : undefined
      fillterbody["affiliateLogin"] = this.filterForm.value.affiliateLogin != null ? this.filterForm.value.affiliateLogin : undefined
      // let fillterbody = {
      //   "firstRecord": this.filterForm.value.firstRecord,
      //   "maxCountRecord": this.filterForm.value.maxCountRecord,
      //   "accountMask": this.filterForm.value.player,
      //   "country": this.filterForm.value.countryValue,
      //   "nickName": this.filterForm.value.nickName,
      //   "firstName": this.filterForm.value.firstName,
      //   "lastName": this.filterForm.value.lastName,
      //   "birthDayOfMonth": { "from": this.filterForm.value.birthDayOfMonthForm, "to": this.filterForm.value.birthDayOfMonthTo },
      //   "birthMonths": [this.filterForm.value.Month],
      //   "shortId": this.filterForm.value.shortId,
      //   "alias": this.filterForm.value.alias,
      //   "email": this.filterForm.value.email,
      //   "ipAddress": this.filterForm.value.ipAddress,
      //   // "levelGuids":[this.filterForm.value.Playerlevel],
      //   "affiliateLogin": this.filterForm.value.affiliateLogin,
      //   "permissionsGroup": this.filterForm.value.permissionsGroup,
      //   "referringPlayerLogin": this.filterForm.value.referringPlayerLogin,
      //   "balanceAmount": { "high": this.filterForm.value.balanceAmounthigh, "low": this.filterForm.value.balanceAmountlow },
      //   "debtAmount": { "high": this.filterForm.value.debtAmounthigh, "low": this.filterForm.value.debtAmountlow },
      //   "regDate": { "end": this.filterForm.value.RegistrationEnd, "start": this.filterForm.value.RegistrationStart },
      //   // "statusesIdList":[this.filterForm.value.Status], //working but dont send empty
      //   // "networkNames":[ this.filterForm.value.networkNames],
      //   "wallet":this.filterForm.value.wallet,
      //   // "ReceiveNews":this.filterForm.value.ReceiveNews, // data not coming
      // }

      console.log(fillterbody);
      this.PlayerserviceService.playerfilter(fillterbody).subscribe((res) => {
        this.PlayerListResData(res);
        this.SpinnwerT = false;
      }, error => {
        this.loader = false;

      });
    }
  }

  PlayerListResData(res: any) {
    this.PlayerList = res.objectList;
    console.log(res);
    console.log('PlayerList' ,this.PlayerList);
    // this.findsum(this.PlayerList);
    this.calculateSum()
    // console.log(res.objectList.regDate[0])
    if (this.PlayerList != undefined) {
      for (let i = 0; i < this.PlayerList.length; i++) {
        if (!this.PlayerList[i].affiliate) {
          Object.assign(this.PlayerList[i], { affiliate: { alias: '' } });
        }
        if (!this.PlayerList[i].levelInfo) {
          Object.assign(this.PlayerList[i], { levelInfo: '' });
        }

        this.declineDeposits = this.PlayerList[i].declineDeposits;
        console.log(this.declineDeposits);

        if (this.declineDeposits == false) {
          this.disablecheckbox = false;
          console.log('false.............');
        } else {
          this.disablecheckbox = true;
          console.log('true..............');
        }

        // this.storedDoc = this.PlayerList[i].storedDoc
        // if(this.storedDoc == false){
        //   this.disablecheckbox = false
        //   console.log('storedDoc false.............')
        // }else{
        //   this.disablecheckbox = true
        //   console.log('storedDoc true..............')
        // }

        // if (this.PlayerList[i].regDate) {
        //   for (let j = 0; j < this.PlayerList.length; j++) {
        //     this.PlayerListregDate = new Date(this.PlayerList[j].regDate.slice(0,24));
        //     console.log(this.PlayerListregDate)
        //     const date = new Date(this.PlayerListregDate);
        //     this.PlayerListregDates = date.toLocaleString()
        //     console.log(this.PlayerListregDates)
        //     this.PlayerList[i].regDate = this.PlayerListregDates
        //   }
        // }

        for (let m = 0; m < this.countrieslist.length; m++) {
          if (
            this.PlayerList[i].country.lowLong ==
            this.countrieslist[m].CID.lowLong
          ) {
            this.PlayerList[i].country = this.countrieslist[m].title;
          }
        }
        for (let m = 0; m < this.playerStatusList.length; m++) {
          if (this.PlayerList[i].status.lowLong == this.playerStatusList[m].guid.lowLong) {
            this.PlayerList[i].player.status = this.playerStatusList[m].value;
            this.PlayerList[i].player.statusguid = this.playerStatusList[m].guid;
            console.log(this.PlayerList[i].player.status);
          }
        }
      }
    }
    if (this.PlayerList != undefined) {
      for (let i = 0; i < this.PlayerList.length; i++) {
        this.PlayerListregDate = new Date(
          this.PlayerList[i].regDate.slice(0, 24)
        );
        console.log(this.PlayerListregDate);
        const date = new Date(this.PlayerListregDate);
        this.PlayerListregDates = date.toLocaleString();
        //  this.PlayerList[i].regDate = this.PlayerListregDates
        console.log(this.PlayerListregDates);

        // this.PlayerListregDate = new Date(this.PlayerList[i].regDate.replace(/\[[^()]*\]/g, ""));
        // const utcDate = '2018-05-07T15:40:10.069Z';
        // const date = new Date(utcDate);
        // console.log(date);
        // console.log(date.toLocaleString())
        // console.log( new Date(this.PlayerListregDate[i].replace(/\[[^()]*\]/g, "")) )
      }
    }
    // console.log( this.PlayerList)
    console.log(res.resultCount);
    this.ResultCount = res.resultCount;
    if (this.PlayerList != undefined) {
      this.rowsOnthePage = res.objectList.length;
    }

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    console.log(this.PlayerList);
    if (this.PlayerList != null || this.PlayerList == undefined) {
      this.loader = false;
    }
    // console.log( typeof this.rowsOnthePage)
    // console.log(this.PageCount > this.PlayerList.length)
    // console.log(this.PageCount + "--- " + this.PlayerList.length)
    if (this.PlayerList) {
      if (this.PageCount > this.PlayerList.length) {
        this.pagecontrolbtn = true;
      }
    }
    this.FillterMenu = false;
    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    // this.filterForm.reset();
  }

  getWalletSymbol(wallet: any) {
    return this.totalSumService.walletSymbol(wallet)
  }

  calculateSum(){
    this.balance = this.totalSumService.calculateSum(this.PlayerList, "balance")
    this.cash = this.totalSumService.calculateSum(this.PlayerList, "cash")
    this.bonus = this.totalSumService.calculateSum(this.PlayerList, "bonus")
    this.tournamentMoney = this.totalSumService.calculateSum(this.PlayerList, "tournamentMoney")
    this.tournamentTicketsCost = this.totalSumService.calculateSum(this.PlayerList, "tournamentTicketsCost")
    this.compPoints = this.totalSumService.calculateSum(this.PlayerList, "compPoints")
    this.deposits = this.totalSumService.calculateSum(this.PlayerList, "deposits")
    this.debts = this.totalSumService.calculateSum(this.PlayerList, "debts")
    this.transfersFromAgents = this.totalSumService.calculateSum(this.PlayerList, "transfersFromAgents")
    this.transfersToAgents = this.totalSumService.calculateSum(this.PlayerList, "transfersToAgents")
  }

  keys(obj:any){
    return Object.keys(obj)
  }

  findsum(data: any) {
    this.obj = data;
    console.log(this.obj);
    if (this.obj) {
      this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

      this.balance = Math.round(this.obj.reduce((a: any, b: { balance: any }) => a + b.balance.value, 0));
      console.log(this.balance);
      this.cash = Math.round(this.obj.reduce((a: any, b: { cash: any }) => a + b.cash.value, 0));
      console.log(this.cash);
      this.bonus = Math.round(this.obj.reduce((prev: any, cur: { bonus: any }) => prev + cur.bonus.value, 0));
      console.log(this.bonus);
      this.tournamentMoney = this.obj.reduce((a: any, b: { tournamentMoney: any }) => a + b.tournamentMoney.value, 0);
      console.log(this.tournamentMoney);
      this.tournamentTicketsCost = this.obj.reduce((a: any, b: { tournamentTicketsCost: any }) => a + b.tournamentTicketsCost.value, 0);
      console.log(this.tournamentTicketsCost);
      // if (this.obj.compPoints) {
      this.compPoints = Math.round(
        this.obj.reduce((a: any, b: { compPoints: any }) => a + b.compPoints.value, 0));
      console.log(this.compPoints);
      // }
      // this.compPoints = this.obj.reduce((a: any, b: { compPoints: any; }) => (a + b.compPoints.value), 0);
      // console.log(this.compPoints)
      this.deposits = this.obj.reduce((a: any, b: { deposits: any }) => a + b.deposits.value, 0);
      console.log(this.deposits);
      this.debts = this.obj.reduce((a: any, b: { debts: any }) => a + b.debts.value, 0);
      console.log(this.debts);
      this.transfersFromAgents = this.obj.reduce((a: any, b: { transfersFromAgents: any }) => a + b.transfersFromAgents.value, 0);
      console.log(this.transfersFromAgents);
      this.transfersToAgents = this.obj.reduce((a: any, b: { transfersToAgents: any }) => a + b.transfersToAgents.value, 0);
      console.log(this.transfersToAgents);

      // var total = this.obj.balance.value.reduce((a:any, b:{obj.balance.value: any})=>{ return a + b; });
      //  console.log("total is : " + total );
    }
  }
  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({ firstRecord: parseInt('1') });
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
  }

  fastforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: Math.floor((this.ResultCount - 1) / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    if (this.PageCount > this.PlayerList.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );
    this.FirstrecordFillter =
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
  }

  next() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
        // console.log(typeof this.filterForm.value.firstRecord)
      });
    }
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter) + 1 + parseInt(this.filterForm.value.maxCountRecord)
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord),
      });
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    console.log(this.filterForm.value.firstRecord);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // if (this.FirstrecordFillter) {

    //   this.FirstrecordFillter++
    //   console.log(this.FirstrecordFillter)
    // }
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  prev() {
    console.log('......Hhello......');
    if (this.filterForm.value.firstRecord - 1 == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        // firstRecord:parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)-1
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1;
    if (this.PageCount > this.PlayerList.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }
  setCountryValue(country: any) {
    return this.countrieslist.indexof(country);
  }

  onTableDataChange(event: any) {
    this.tableSize = event.target.value;
    this.page = event;
    this.onFormSubmit();
  }

  counterfunc(tb: any) {
    // need help here

    console.log(tb.value.length);
    if (tb.value.length == 1) {
      this.counter++;
    }
    console.log(this.counter);

    if (tb.value == "User Preferred") {

      this.filterForm.value.wallet = {
        "hiLong": 0,
        "lowLong": -1
      }
      console.log(this.filterForm.value.wallet)
    }
    // Object.keys(this.filterForm.controls).forEach((name) => {
    //   const currentControl = this.filterForm.controls[name];

    //   if (currentControl.dirty && (this.changedProperties.indexof(name) == -1)) {
    //     this.counter++
    //     this.changedProperties.push(name);
    //   }
    //   else if(!currentControl.dirty &&  (this.changedProperties.indexof(name) != -1)){
    //     this.counter--
    //   }
    // });
    // console.log(this.counter)
  }

  dropdowncounterfunc(tb: any) {
    console.log(tb.value.length);
    console.log(this.filterForm.value.country)
    // if (tb.value.length != "") {
    if (tb.value.length != '') {
      this.counter++;
    }
    console.log(this.counter);
    console.log(this.countries);
    // if(this.filterForm.value.country == "All"){
    //   for(var i=0; i<this.countries.length; i++){
    //     this.coutriesall.push(this.countries[i].CID);
    //   }

    //   this.filterForm.value.country = ""
    //   console.log( this.filterForm.value.country)
    // }
  }

  onChange(data: any) {
    console.log(data);
    this.p = 1;
    this.selectnum = data;
    console.log(this.selectnum);
    this.selectnumber = data;
    console.log(this.selectnum);
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
    XLSX.writeFile(wb, 'PlyerlistExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "PlyerlistExcelSheet")
  }


  keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  ReceiveNewsguid(e: any, guid: string) {
    if (e.target.checked) {
      console.log(guid + 'cheked ');
      this.selectedItem.push(guid);
    } else {
      console.log(guid + 'uncheked ');
      this.selectedItem = this.selectedItem.filter((m: string) => m != guid);
    }
    console.log(this.selectedItem);
  }

  playerdetalisclosepopup() {
    this.playerdetailspopup = false;
  }
  openNewTab(index: any, name: string) {
    console.log(index);
    console.log(name);
    this.playernickName = name;
    this.playerfulldetails = this.PlayerList[index];
    this.playerdetailspopup = true;

    /************* CREATING TABS *******************/
    let tabsUl = document.getElementById('tabsUl');
    let tabContent = document.getElementById('tabContent');
    let li = document.createElement('li');
    // li.innerHTML = name;
    li.id = index + 10;
    li.addEventListener('click', (e) => {
      console.log(index + 10);
      this.tabActive(index + 10);
    });
    let div = document.createElement('div');
    div.id = index + 10;
    div.className = 'tabsAllHide';
    tabContent?.appendChild(div);
    tabsUl?.appendChild(li);
  }
  tabActive(val: any) {
    let id = <HTMLInputElement>document.getElementById(val);
    id.style.display = 'block';
  }

  PlayerExplore(name: any, guid: any, List: any) {

    console.log(name);
    console.log(guid);
    console.log(List);
    localStorage.setItem('PlayerName', JSON.stringify(name));
    localStorage.setItem('Playerguid', JSON.stringify(guid));
    console.log(name);
    sessionStorage.setItem('PlayerName', JSON.stringify(name));
    sessionStorage.setItem('Playerguid', JSON.stringify(guid));
    sessionStorage.setItem('PlayerExplorerData', JSON.stringify(List));
    // this.router.navigateByUrl('/playerexplorer/PlayersSummary')
    // window.open('/playerexplorer')
    // window.open('/playerexplorer/PlayersSummary')
    // this.router.navigate(['/playerexplorer/Personalinfo'], { queryParams: guid } + data);
    console.log(guid);
    let palyerData = {
      hiLong: guid.hiLong,
      lowLong: guid.lowLong,
      name: name,
    };
    // console.log(palyerData)
    // this.router.navigate(['/playerexplorer/Personalinfo'], { queryParams: palyerData } );
    sessionStorage.setItem("playerdatainfo", JSON.stringify(palyerData))
    sessionStorage.setItem('PlayerName', JSON.stringify(name));
    sessionStorage.setItem('Playerguid', JSON.stringify(guid));

    // var baseUrl = '#/playerexplorer/PlayersSummary';
    var baseUrl = window.location.hash ? '#/playerexplorer/PlayersSummary' : '/playerexplorer/PlayersSummary';
    var urlWithParams = baseUrl + '?data=' + JSON.stringify(palyerData);
    // var urlWithParams = `/playerexplorer/PlayersSummary/?data=${JSON.stringify(palyerData)}`
    window.open(baseUrl);
    console.log(baseUrl)

    //const playerNameUtf8 = CryptoJS.enc.Utf8.parse(name);
    //  const playerGuidUtf8 = CryptoJS.enc.Utf8.parse(JSON.stringify(guid));

    //  const encryptedPlayerName = CryptoJS.AES.encrypt(playerNameUtf8, 'player').toString();
    //  const encryptedPlayerGuid = CryptoJS.AES.encrypt(playerGuidUtf8, 'player').toString();

    //  var queryParams = { 
    //   encryptedPlayerName:encryptedPlayerName,
    //    encryptedPlayerGuid:encryptedPlayerGuid
    //  };  

    // const url = this.router.createUrlTree(['/playerexplorer/PlayersSummary'], {queryParams}).toString();
    //   window.open(url, '_blank');
  }

  // ...
  PlayerExplore01(name: any, guid: any) {
    const queryParams = { param1: name, param2: { guid } };
    var serializedObject = JSON.stringify(queryParams);

    var encodedObject = encodeURIComponent(serializedObject);

    var baseUrl = '#/playerexplorer/Personalinfo';
    var urlWithParams = baseUrl + '?data=' + encodedObject;
    var newWindow = window.open(urlWithParams, '_blank');

    // const url = this.router.createUrlTree(['/playerexplorer/Personalinfo'], { queryParams });

    // const newWindow = window.open(url, '_blank');
  }

  PlayerExplore02(name: any, guid: any) {
    const url = this.router
      .createUrlTree(['playerexplorer/Personalinfo', guid])
      .toString();
    window.open(url, '_blank');
  }
  openNewWindowWithQueryParam(name: any, guid: any) {
    var baseUrl = '/playerexplorer/Personalinfo';
    const parameterValue = 'yourParameterValue'; // Set your parameter value here
    const queryParams = { paramName: parameterValue };

    const queryParamsString = this.router.serializeUrl(
      this.router.createUrlTree([baseUrl], { queryParams })
    );

    const newWindow = window.open(`/${baseUrl}?${queryParamsString}`, '_blank');
    if (newWindow) {
      newWindow.opener = null; // This is to prevent the new window from having access to the opening window
    }
  }

  showmanu(i: any, guid: any) {
    this.SeletedIconIndex = i;
    this.popupArrow = !this.popupArrow;
    this.PlayerGuid = guid;
  }
  // showmanuClose(){
  //   this.popupArrow=false
  // }
  Actions(data: any) {
    console.log(data);
    this.openPopu = data;
    this.AlertMessage = 'Do you want to mark the player account as Trusted?';
    if (this.openPopu == 'markAT') {
      this.ActionAlertPopup = true;
      this.popupArrow = false;
    } else if (this.openPopu == 'reactIV') {
      this.popupArrow = false;
    }
  }
  ActionRequery() {
    let fillterbody = this.getDirtyValues(this.filterForm);
    this.filterFirstrecord = fillterbody;
    fillterbody['firstRecord'] = this.filterForm.value.firstRecord - 1;
    fillterbody['maxCountRecord'] = this.filterForm.value.maxCountRecord;
    console.log(fillterbody);
    this.PlayerserviceService.playerfilter(fillterbody).subscribe((res) => {
      this.PlayerListResData(res);
      this.SpinnwerT = false;
    });
  }

  setPlayerActions(data: any, index: any) {
    console.log(data);
    console.log(index);
    this.Actiondataforplayer = this.PlayerList[index];
    console.log(this.Actiondataforplayer);
    this.popupArrow = false;
    this.PlayerActionType = data;
    this.ActionAlertPopup = true;
    this.ChangePmGroup = false;
    this.AssinCPLevel = false;
    this.SetAliaspop = false;

    this.AlertMessage = '';
    this.SetAliasName = '';
    switch (data) {
      case 'Active': {
        this.AlertMessage = 'Do you want to lock the player account?';
        break;
      }
      case 'Locked': {
        this.AlertMessage = 'Do you want to unlock the player account ?';
        break;
      }
      case 'MarkasTrusted': {
        this.AlertMessage =
          'Do you want to mark the player account as Trusted?';
        break;
      }
      case 'Distrust': {
        this.AlertMessage =
          "Do you want to clear the 'Trusted' Status of the player account?";
        break;
      }
      case 'Reactivation': {
        this.AlertMessage =
          "This action Will unlock the player's account. Moreover, player's information will be removed from local black list.";
        break;
      }
      case 'ChangePmGroup': {
        this.ChangePmGroup = true;
        let body = {
          userType: this.usertypeList[0].guid,
        };
        this.PlayerserviceService.listUserPermissionsGroup(body).subscribe(
          (data) => {
            console.log(data);
            this.UserPermissionsGroupList = data.objectList;
            this.selectedPermissionGroup = data.objectList[0].guid;
          }
        );
        break;
      }
      case 'AssinCPLevel': {
        this.AssinCPLevel = true;
        this.NotificationCheck = false;
        let body = {};
        this.loginService.getPlayers(body).subscribe((data) => {
          console.log(data);
          // this.PlayerLevelsList=data.objectList[0].compPointsLevels
          this.PlayerLevelsList = data.objectList;
          this.SelectedLevel = this.PlayerLevelsList[0].compPointsLevels[0].guid;
        });
        break;
      }
      case 'DeclineDepositsOn': {
        this.AlertMessage = 'Do you want to Turn Off the decline deposits  ?';
        break;
      }
      case 'DeclineDepositsOff': {
        this.AlertMessage = 'Do you want to Turn Off the decline deposits ?';
        break;
      }
      case 'AllowChat': {
        this.AlertMessage = 'Do you want to Allow Chat for selected players ?';
        break;
      }
      case 'DisallowChat': {
        this.AlertMessage = 'Do you want to Disallow Chat for selected players ?';
        break;
      }
      case 'SetAlias': {
        this.SetAliaspop = true;
        this.SetAliasName = this.Actiondataforplayer.player.alias;
        break;
      }
      // case 'Restrict': {
      //   this.onRestrict()
      //   break;
      // }
      // case 'Fraud': {
      //   this.onMarkAsFraud()
      //   break;
      // }
    }
  }

  onRestrictOrFraud(action: any, data: any) {
    this.action = action
    this.Actiondataforplayer = data
    this.isRestrictandFraud = true
    this.popupArrow = false;

  }
  closeClick(choice: any) {
    // alert(this.PlayerActionType);
    this.ActionAlertPopup = false;
    this.popupArrow = false;
    if (choice == 'yes') {
      this.SpinnwerT = true;

      // if (this.PlayerActionType == 'Active') {
      //   this.ActionsLockUnclock(this.PlayerActionType)
      // }
      // if (this.PlayerActionType == 'Locked') {
      //   this.ActionsLockUnclock(this.PlayerActionType)
      // }
      switch (this.PlayerActionType) {
        case 'Active': {
          this.ActionsLockUnclock(this.PlayerActionType);
          break;
        }
        case 'Locked': {
          this.ActionsLockUnclock(this.PlayerActionType);
          break;
        }
        case 'MarkasTrusted': {
          this.markTrusted_orNot(this.Actiondataforplayer.trust);
          break;
        }
        case 'Distrust': {
          this.markTrusted_orNot(this.Actiondataforplayer.trust);
          break;
        }
        case 'Reactivation': {
          this.reactivationFraudPlayers();
          break;
        }
        case 'ChangePmGroup': {
          // alert('ChangePmGroup');
          this.changePlayersPermissionsGroup();
          break;
        }
        case 'AssinCPLevel': {
          this.changeCPLevel();
          break;
        }
        case 'SetAlias': {
          this.setPlayerAlias();
          break;
        }
        case 'DeclineDepositsOn': {
          this.DeclineDepositsOn_Off(this.Actiondataforplayer.declineDeposits);
          break;
        }
        case 'DeclineDepositsOff': {
          this.DeclineDepositsOn_Off(this.Actiondataforplayer.declineDeposits);
          break;
        }
        case 'AllowChat': {
          this.allowChat_Disallow(this.Actiondataforplayer.chatAllowed);
          break;
        }
        case 'DisallowChat': {
          this.allowChat_Disallow(this.Actiondataforplayer.chatAllowed);
          break;
        }
      }
    } else if (choice == 'no') {
      this.ActionAlertPopup = false;
      this.popupArrow = false;
    }
  }

  ActionsLockUnclock(status: any) {
    console.log(status);
    this.SpinnwerT = true;
    var statusValue;
    if (status == 'Active') {
      statusValue = false;
    } else if (status == 'Locked') {
      statusValue = true;
    }
    let body = {
      statusValue: statusValue,
      ids: {
        idList: [this.PlayerGuid],
      },
    };
    console.log(body);

    this.PlayerserviceService.setPlayerActive(body).subscribe((data) => {
      console.log(data);
      if (data.changedObjectList) {
        this.popupArrow = false;
        setTimeout(() => {
          // this.ActionRequery();
          this.onFormSubmit();
        }, 800);
      }
    });
  }

  markTrusted_orNot(data: any) {
    console.log(data);

    var statusValue;
    if (data == true) {
      statusValue = false;
    } else if (data == false) {
      statusValue = true;
    }
    let body = {
      statusValue: statusValue,
      face: '',
      ip: '',
      ids: {
        idList: [this.PlayerGuid],
        maxCountRecord: 0,
        firstRecord: 0,
        queryId: '',
      },
      tGuid: {
        hiLong: 0,
        lowLong: 0,
      },
      language: {
        hiLong: 0,
        lowLong: 0,
      },
      tGuids: [
        {
          hiLong: 0,
          lowLong: 0,
        },
      ],
    };
    console.log(body);
    this.PlayerserviceService.setPlayerTrusted(body).subscribe((data) => {
      console.log(data);
      if (data.changedObjectList) {
        this.ActionAlertPopup = false;
        this.popupArrow = false;
        setTimeout(() => {
          // this.ActionRequery();
          this.onFormSubmit();
        }, 800);
      }
    });
  }
  allowChat_Disallow(data: any) {
    console.log(data);

    var statusValue;
    if (data == true) {
      statusValue = false;
    } else if (data == false) {
      statusValue = true;
    }
    let body = {
      statusValue: statusValue,
      face: '',
      ip: '',
      ids: {
        idList: [this.PlayerGuid],
        maxCountRecord: 0,
        firstRecord: 0,
        queryId: '',
      },
    };
    this.PlayerserviceService.setPlayerChatAllowed(body).subscribe((data) => {
      console.log(data);
      if (data.changedObjectList) {
        setTimeout(() => {
          // this.ActionRequery();
          this.onFormSubmit();
        }, 800);
      }
    });
  }

  DeclineDepositsOn_Off(data: any) {
    console.log(data);

    var statusValue;
    if (data == true) {
      statusValue = false;
    } else if (data == false) {
      statusValue = true;
    }
    let body = {
      statusValue: statusValue,
      face: '',
      ip: '',
      ids: {
        idList: [this.PlayerGuid],
        maxCountRecord: 0,
        firstRecord: 0,
        queryId: '',
      },
    };
    this.PlayerserviceService.setDeclineDeposits(body).subscribe((data) => {
      console.log(data);
      if (data.changedObjectList) {
        setTimeout(() => {
          // this.ActionRequery();
          this.onFormSubmit();
        }, 800);
      }
    });
  }

  reactivationFraudPlayers() {
    let body = {
      playerid: [this.PlayerGuid],
    };
    this.PlayerserviceService.reactivationFraudPlayers(body).subscribe(
      (data) => {
        console.log(data);
        if (data.changedObjectList) {
          setTimeout(() => {
            // this.ActionRequery();
            this.onFormSubmit();
          }, 800);
        }
      }
    );
  }
  changePlayersPermissionsGroup() {
    let body = {
      ids: {
        idList: [this.PlayerGuid],
        maxCountRecord: 0,
        firstRecord: 0,
        queryId: '',
      },
      groupGuid: this.selectedPermissionGroup,
    };
    console.log(body);
    console.log(this.selectedPermissionGroup);
    this.PlayerserviceService.changePlayersPermissionsGroup(body).subscribe(
      (data) => {
        console.log(data);
        if (data.changedObjectList) {
          setTimeout(() => {
            // this.ActionRequery();
            this.onFormSubmit();
          }, 800);
        }
      }
    );
  }

  NotificationCheckchange(data: any) {
    console.log(data);
    console.log(data.target.checked);
    this.NotificationCheck = data.target.checked;
  }

  playerRestrictfromchild(event: any) {
    if (event) {
      this.onFormSubmit()
      this.isRestrictandFraud = !this.isRestrictandFraud
    } else {
      this.isRestrictandFraud = !this.isRestrictandFraud
    }
  }
  changeCPLevel() {
    // alert(1);
    console.log(this.NotificationCheck);
    let body = {
      levelGuid: this.SelectedLevel,
      playerGuids: {
        idList: [this.PlayerGuid],
        maxCountRecord: 0,
        firstRecord: 0,
        queryId: '',
      },
      description: '',
      sendNotification: this.NotificationCheck,
    };
    console.log(body);
    this.PlayerserviceService.assignCompPointsLevelToPlayer(body).subscribe(
      (data) => {
        console.log(data);
        if (data.changedObjectList) {
          setTimeout(() => {
            // this.ActionRequery();
            this.onFormSubmit();
          }, 800);
        }
      }
    );
  }
  setPlayerAlias() {
    let body = {
      alias: this.SetAliasName,
      face: '',
      ip: '',
      ids: {
        idList: [this.PlayerGuid],
        maxCountRecord: 0,
        firstRecord: 0,
        queryId: '',
      },
    };
    console.log(body);
    this.PlayerserviceService.setPlayerAlias(body).subscribe((data) => {
      console.log(data);
      if (data.changedObjectList) {
        setTimeout(() => {
          // this.ActionRequery();
          this.onFormSubmit();
        }, 800);
      }
    });
  }
  recordsinput(event: any) {

    // if(this.filterForm.get('firstRecord')?.errors?.['required'] || this.filterForm.get('maxCountRecord')?.errors?.['required']){
    //   this.paginationValidation = true
    // }else if(this.filterForm.get('firstRecord')?.errors?.['min'] || this.filterForm.get('firstRecord')?.errors?.['max'] || 
    // this.filterForm.get('maxCountRecord')?.errors?.['min'] || this.filterForm.get('maxCountRecord')?.errors?.['min']){
    //   this.paginationValidation = true;
    // }else{ 
    //   this.paginationValidation = false;
    // }


  }

  get f() {
    // console.log(this.CreateAdminForm.value.loginName.key)
    // this.filterForm.get('firstRecord')?.touched
    return this.filterForm.controls;

  }
  // *******************************************************************************************
  onItemSelectnew(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });

    console.log(this.convertedArray);
  }
  OnItemDeSelectnew(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }


  onSelectAllnew(data: any) {
    this.convertedArray = [];
    data.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }
  onDeSelectAllnew(data: any) {
    this.convertedArray = [];
    // data.forEach((item: { name: string }) => {
    //   this.convertedArray.push(item.name);
    // });
    this.convertedArray = this.faceconvertedarray
    console.log(this.convertedArray);
  }

  // ******************************************************************************************************************
  // ******************************************************************************************************************

  onItemSelect(data: any) {
    this.playerstatusaaray = []
    this.filterForm.value.statusesIdList.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
  }
  OnItemDeSelect(data: any) {
    this.playerstatusaaray = []
    this.filterForm.value.statusesIdList.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
  }
  onSelectAll(data: any) {
    this.playerstatusaaray = []
    data.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
  }
  onDeSelectAll(data: any) {
    this.playerstatusaaray = []
    data.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
  }

  // *******************************************************************************************************************************
  onItemSelectplayerLevel(data: any) {
    this.playerlevelaaray = []
    this.filterForm.value.Playerlevel.forEach((item: { guid: any; }) => {
      this.playerlevelaaray.push(item.guid);
    });
    console.log(this.playerlevelaaray)
  }
  OnItemDeSelectplayerLevel(data: any) {
    this.playerlevelaaray = []
    this.filterForm.value.Playerlevel.forEach((item: { guid: any; }) => {
      this.playerlevelaaray.push(item.guid);
    });
    console.log(this.playerlevelaaray)
  }
  onSelectAllplayerLevel(data: any) {
    this.playerlevelaaray = []
    data.forEach((item: { guid: any; }) => {
      this.playerlevelaaray.push(item.guid);
    });
    console.log(this.playerlevelaaray)
  }
  onDeSelectAllplayerLevel(data: any) {
    this.playerlevelaaray = []
    data.forEach((item: { guid: any; }) => {
      this.playerlevelaaray.push(item.guid);
    });
    console.log(this.playerlevelaaray)
  }
  changeSelect(date: string) {

    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)


    return (c)

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

  formatNumber(numberToFormat: number): string {
    return numberToFormat.toLocaleString('en');
  }

}
