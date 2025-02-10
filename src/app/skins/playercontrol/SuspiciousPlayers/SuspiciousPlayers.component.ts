import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { TotalSumsService } from 'src/app/source/total-sums.service';
@Component({
  selector: 'app-SuspiciousPlayers',
  templateUrl: './SuspiciousPlayers.component.html',
  styleUrls: ['./SuspiciousPlayers.component.css'],
})
export class SuspiciousPlayersComponent implements OnInit {
  filterForm: FormGroup;
  FillterMenu: boolean = false;
  walletlists: any = [];
  faceParameterslist: any = [];
  playerStatusList: any = [];
  palyer2playlist: any = [];
  SUSPLINKSList: any = [];
  // currencywallet: any = [];

  currencyarray: any = [];
  selectedcurrency: any = [];
  currencystatus: any = [];
  convertedArray: any = [];
  dropdownList12: any = [];
  dropdownSettings = {};
  selectedItems12: any = [];
  playerstatusaaray: any = [];
  player2playaaray: any = [];
  dropdownSettingsstatus = {};
  dropsettingsplyr2plyr = {};
  selectedItemsStatus: any = [];
  selectitemsPlayers: any = [];
  playerstatusdropList: any = [];
  playerdropdownlist: any = [];
  plyr2plyrdroplist: any = [];
  sessiontypearray: any = [];
  dropdownSettingsstatuswalllet = {};

  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  suspicionsId: any;
  loader: boolean = false;
  // GamesofpokerService: any;
  // selectedFillterGames: any;
  // gamesTobeSelected: any = "All";

  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = '00:00:00';
  endTime: any = '23:59:59';
  steddate: boolean = false;
  timeerror: boolean = false;
  ErrorPopup: boolean = false;
  wallettypelist: any = [];
  currencyList: any = [];
  currencyGuids: any = [];
  CopyCurrencyTotalGuids: any = [];
  dropdownSettingscurrency: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  page: number = 1;
  count: number = 0;
  FirstrecordFillter: any = 0;
  popupArrow: boolean = false;
  SeletedIconIndex: any;
  SpinnwerT: boolean = false;
  ActionType: any;
  totalBalanceSum: any;
  totalBonusSum: any;

  constructor(private PlayerserviceService: PlayerServiceService, private FileformatServiceService: FileformatServiceService,
     private DateTimePipe: DateTimePipe, private totalSumService:TotalSumsService) {
    this.filterForm = new FormGroup({
      firstRecord: new FormControl('1'),
      maxCountRecord: new FormControl('100'),
      currency: new FormControl(),
      loginMask: new FormControl(),
      alias: new FormControl(),
      face: new FormControl(),
      RegistrationStart: new FormControl(),
      RegistrationEnd: new FormControl(),
      balancefrom: new FormControl(),
      balanceto: new FormControl(),
      bonusfrom: new FormControl(),
      bonusto: new FormControl(),
      status: new FormControl(),
      playerandplayer: new FormControl(),
      playerandaffilate: new FormControl(),
      blacklist: new FormControl(),
      Others: new FormControl(),
      currencywallet: new FormControl(),
      statusesIdList: new FormControl(),
      networkNames: new FormControl(),

      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      enddate: new FormControl(),
    });
  }
  PlayerList: any;



  ngOnInit(): void {
    // let ws = sessionStorage.getItem('wsession')
    // this.PlayerserviceService.SuspiciousPlayers(ws).subscribe((res) => {
    //   this.PlayerList = res.objectList;
    //   console.log(res.objectList)
    // })

    // this.walletType();
    this.faceParameters();
    this.palyerstatus();
    // this.palyer2player();
    this.SUSPLINKS();
    this.walletTypes()

    this.endDate = new Date();
    let today = new Date(
      this.endDate.getFullYear(),
      this.endDate.getMonth(),
      this.endDate.getDate() - 7
    );
    let endday = new Date(
      this.endDate.getFullYear(),
      this.endDate.getMonth(),
      this.endDate.getDate()
    );
    this.startDate;
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  faceParameters() {
    const faceParameterslist = localStorage.getItem('faceParameters');
    if (faceParameterslist) {
      this.faceParameterslist = JSON.parse(faceParameterslist);
    }
    this.convertedArray = [];
    // this.faceParameterslist = this.CommomfilterService.selectallst();
    console.log(this.faceParameterslist);

    this.faceParameterslist.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
    this.dropdownList12 = this.faceParameterslist;
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
    console.log(this.selectedItems12);
  }

  palyerstatus() {
    const playerstatus = localStorage.getItem('palyerstatus');
    if (playerstatus) {
      this.playerStatusList = JSON.parse(playerstatus);
    }
    console.log('playerStatusList', this.playerStatusList);
    for (let i = 0; i < this.playerStatusList.length; i++) {
      this.selectedItemsStatus[i] = {
        value: this.playerStatusList[i].value,
        guid: this.playerStatusList[i].guid,
      };
    }
    console.log(this.selectedItemsStatus);
    this.selectedItemsStatus.forEach((item: { guid: any }) => {
      this.playerstatusaaray.push(item.guid);
    });
    this.playerstatusdropList = this.playerstatusaaray;
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
    // this.selectedItemsStatus = this.playerstatusdropList;
    console.log(this.selectedItemsStatus);
  }

  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist);
      for (let i = 0; i < this.wallettypelist.length; i++) {
        if (
          this.wallettypelist[i].faceWallet == true ||
          this.wallettypelist[i].tournamentWallet == true
        ) {
          if (this.wallettypelist[i].description != 'Play Money') {
            this.currencyList.push(this.wallettypelist[i]);
          }
        }
      }
      console.log('currencyList', this.currencyList);

      for (let i = 0; i < this.currencyList.length; i++) {
        this.selectedcurrency[i] = {
          description: this.currencyList[i].description,
          guid: this.currencyList[i].guid,
        };
      }
      console.log(this.selectedcurrency);
      this.selectedcurrency.forEach((item: { guid: any }) => {
        this.currencyGuids.push(item.guid);
      });
      this.CopyCurrencyTotalGuids = this.currencyGuids;
      console.log(this.currencyGuids);

      this.dropdownSettingscurrency = {
        singleSelection: true,
        idField: 'guid',
        textField: 'description',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false,
      };
    }
  }

  // *********((*((((((((()))))))))))***********

  // palyer2player(){
  //   const palyer2player = localStorage.getItem('palyer2player')
  //   if(palyer2player){
  //     this.palyer2playlist = JSON.parse(palyer2player)
  //   }
  //   console.log("palyer2playlist",this.palyer2playlist)
  //   for(let i = 0; i < this.palyer2playlist.length;i++){
  //     this.selectitemsPlayers[i] = {
  //       value: this.palyer2playlist[i].value,
  //       guid:this.palyer2playlist[i].guid
  //     }
  //   }
  //   console.log(this.selectitemsPlayers)
  //   this.selectitemsPlayers.forEach((item: { guid: any;}) =>{
  //     this.player2playaaray.push(item.guid);
  //   });

  //   this.playerdropdownlist = this. palyer2playlist;
  //   console.log(this.playerdropdownlist)
  //   this.dropsettingsplyr2plyr = {
  //     singleSelection: false,
  //     idField: 'guid',
  //     textField: 'value',
  //     selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All',
  //     itemsShowLimit: 1,
  //     allowSearchFilter: false,
  //   };
  //   this.selectitemsPlayers = this.playerdropdownlist;
  // }

  // *********((*((((((((()))))))))))***********

  SUSPLINKS() {
    const SUSPLINKS = localStorage.getItem('SUSPLINKS');
    if (SUSPLINKS) {
      this.SUSPLINKSList = JSON.parse(SUSPLINKS);
    }
    console.log('SUSPLINKSList', this.SUSPLINKSList);
  }

  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls).forEach((key) => {
      let currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls)
          dirtyValues[key] = this.getDirtyValues(currentControl);
        // else
        //   dirtyValues[key] = currentControl.value;
      }
    });

    return dirtyValues;
  }

  onFormSubmit() {
    console.log(this.filterForm.value);
    this.FillterMenu = false;
    this.PlayerList = false;
    this.loader = true;
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    let fillterbody = this.getDirtyValues(this.filterForm);
    console.log(fillterbody);
    // fillterbody["firstRecord"] = 0
    fillterbody['firstRecord'] = JSON.stringify(
      this.filterForm.value.firstRecord - 1
    );
    fillterbody['maxCountRecord'] = this.filterForm.value.maxCountRecord;

    // fillterbody["currencywallet"] = this.filterForm.value.currency != null ? this.filterForm.value.currency : undefined
    fillterbody['wallet'] = this.currencyGuids != null ? this.currencyGuids[0] : undefined;
    // fillterbody['wallet'] =  this.currencyarray != null ? this.currencyarray : undefined;
    fillterbody['accountMask'] = this.filterForm.value.loginMask != null ? this.filterForm.value.loginMask : undefined;
    fillterbody['alias'] = this.filterForm.value.alias != null ? this.filterForm.value.alias : undefined;
    // fillterbody["networkNames"] = this.filterForm.value.face != null ? [this.filterForm.value.face] : undefined
    fillterbody['networkNames'] = this.convertedArray != null ? this.convertedArray : undefined;

    fillterbody['statuses'] = this.playerstatusaaray != null ? this.playerstatusaaray : undefined;

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["date"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;
    
    // fillterbody['date'] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
    //   (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;
    fillterbody['balance'] = this.filterForm.value.balancefrom != null ? { low: this.filterForm.value.balancefrom, high: this.filterForm.value.balanceto, } : undefined;
    fillterbody['bonus'] = this.filterForm.value.bonusfrom != null ? { low: this.filterForm.value.bonusfrom, high: this.filterForm.value.bonusto, } : undefined;


    // fillterbody["suspicionsId"] = this.filterForm.value.face !=null ? [this.filterForm.value.status]:undefined

    // fillterbody["value"] = this.filterForm.value.Value != null ? this.filterForm.value.Value : undefined
    // fillterbody["typesIdList"] = this.filterForm.value.Types != null ? [this.filterForm.value.Types] : undefined

    this.PlayerserviceService.SuspiciousPlayers(fillterbody).subscribe(
      (res) => {
        if (res.objectList)
          this.getSuspiciousListData(res);
      }
    );
  }
  getSuspiciousListData(res: any) {
    console.log(res);
    this.popupArrow = false;
    this.PlayerList = res?.objectList;
    this.rowsOnthePage = res?.objectList?.length;
    this.ResultCount = res?.resultCount;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    console.log(this.PlayerList);
    console.log(this.PlayerList[0]?.suspicionsId);
    if (this.PlayerList != null || this.PlayerList == undefined) {
      this.loader = false;
    }
    if (this.ResultCount == 0) {
      this.ErrorPopup = true;
    }


    // for (let i = 0; i < this.PlayerList.length; i++) {
    //   // console.log(this.PlayerList[i]);

    //   this.suspicionsId = this.PlayerList[i].suspicionsId
    //   // console.log(this.PlayerList[i]);
    //   console.log(this.suspicionsId)

    //   // for (let m = 0; m < this.suspicionsId.length; m++) {
    //   //   for (let n = 0; n < this.SUSPLINKSList.length; n++) {
    //   //     if (this.suspicionsId[m].lowLong = this.SUSPLINKSList[n].guid.lowLong) {
    //   //       this.suspicionsId[m] = this.SUSPLINKSList[n].value
    //   //     }
    //   //   }
    //   // }
    //   for (let m = 0; m < this.suspicionsId.length; m++) {
    //     for (let n = 0; n < this.SUSPLINKSList.length; n++) {
    //       if (this.suspicionsId[m].lowLong == this.SUSPLINKSList[n].guid.lowLong) {
    //         this.suspicionsId[m] = this.SUSPLINKSList[n].value
    //       }
    //       console.log("suspicionsId", this.suspicionsId[m])
    //     }
    //   }
    // }

    // ***********************************************//
    for (let i = 0; i < this.PlayerList.length; i++) {
      // this.suspicionsId = this.PlayerList[i].suspicionsId
      // console.log(res.objectList[i])
      // console.log(this.suspicionsId)
      for (let m = 0; m < this.PlayerList[i].suspicionsId.length; m++) {
        for (let n = 0; n < this.SUSPLINKSList.length; n++) {
          if (this.PlayerList[i].suspicionsId[m].lowLong == this.SUSPLINKSList[n].guid.lowLong) {
            this.PlayerList[i].suspicionsId[m] = this.SUSPLINKSList[n].value;
          }
        }
      }

      for (let j = 0; j < this.playerStatusList.length; j++) {
        if (this.PlayerList[i].status.lowLong == this.playerStatusList[j].guid.lowLong) {
          this.PlayerList[i].status = this.playerStatusList[j].value;
        }
      }
    }
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.getTotalSum()
  }

  getWalletSymbol(wallet: any) {
    return this.totalSumService.walletSymbol(wallet)
  }

  getTotalSum() {
    this.totalBalanceSum = this.totalSumService.calculateSum(this.PlayerList, "balance");
    this.totalBonusSum = this.totalSumService.calculateSum(this.PlayerList, "bonus");
  }

  keys(data: any) {
    return Object.keys(data)
  }


  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
  }
  showmanu(i: any, guid: any) {
    this.popupArrow = !this.popupArrow
    this.SeletedIconIndex = i
  }
  PlayerActionsType(Type: any, index: any) {
    this.popupArrow = false;
    this.ActionType = Type
  }

  setPlayerActions(Type: any) {
    let x = this.SeletedIconIndex
    let Playerguid = this.PlayerList[x].guid

    let body = {
      statusValue: (this.ActionType === "lock" ? false : true),
      // firstRecord: 0,
      // maxCountRecord: 100,
      // idList: [{ hiLong: 4677, lowLong: 2435 }]
      ids: {
        idList: [Playerguid],
        firstRecord: 0,
        maxCountRecord: 100,
      }
    }
    if (Type == 'yes') {
      this.SpinnwerT = true;
      this.PlayerserviceService.setSuspiciousPlayerActive(body).subscribe(data => {
        console.log(data)
        this.ActionType = null;
        this.SpinnwerT = false;
        this.onFormSubmit()

      })
    } else {
      this.ActionType = null;
    }
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'SuspiciousPlyerlistExcelSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "SuspiciousPlyerlistExcelSheet")
  }

  // **********************************************************************************************************************************
  onItemSelectnew(data: any) {
    this.convertedArray = [];
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });

    console.log(this.convertedArray);
  }
  OnItemDeSelectnew(data: any) {
    this.convertedArray = [];
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
    data.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }


  // **************************************************************************************************

  onItemSelect(data: any) {
    this.playerstatusaaray = [];
    this.filterForm.value.statusesIdList.forEach((item: { guid: any }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray);
  }
  OnItemDeSelect(data: any) {
    this.playerstatusaaray = [];
    this.filterForm.value.statusesIdList.forEach((item: { guid: any }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray);
    if (this.playerstatusaaray === null || this.playerstatusaaray.length === 0) {
      console.log('Empty');
      this.playerstatusaaray = this.playerstatusdropList;
    }
    console.log(this.playerstatusaaray);
  }
  onSelectAll(data: any) {
    this.playerstatusaaray = [];
    data.forEach((item: { guid: any }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray);
  }
  onDeSelectAll(data: any) {
    this.playerstatusaaray = [];
    data.forEach((item: { guid: any }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray);
    if (this.playerstatusaaray === null || this.playerstatusaaray.length === 0) {
      console.log('Empty');
      this.playerstatusaaray = this.playerstatusdropList;
    }
  }
  // *******************************************************************************

  onItemSelectsessiontype(data: any) {
    this.sessiontypearray = [];
    this.filterForm.value.SessionType.forEach((item: { guid: any }) => {
      this.sessiontypearray.push(item.guid);
    });
    console.log(this.sessiontypearray);
  }
  OnItemDeSelectsessiontype(data: any) {
    this.sessiontypearray = [];
    this.filterForm.value.SessionType.forEach((item: { guid: any }) => {
      this.sessiontypearray.push(item.guid);
    });
    console.log(this.sessiontypearray);
  }
  onSelectAllsessiontype(data: any) {
    this.sessiontypearray = [];
    data.forEach((item: { guid: any }) => {
      this.sessiontypearray.push(item.guid);
    });
    console.log(this.sessiontypearray);
  }
  onDeSelectAllsessiontype(data: any) {
    this.sessiontypearray = [];
    data.forEach((item: { guid: any }) => {
      this.sessiontypearray.push(item.guid);
    });
    console.log(this.sessiontypearray);
  }

  // **********************currency (onselect)********************
  onItemSelectcurrency(data: any) {
    this.currencyGuids = [];
    this.filterForm.value.currency.forEach((item: { guid: any }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids);
  }

  OnItemDeSelectcurrency(data: any) {
    this.currencyGuids = [];
    this.filterForm.value.currency.forEach((item: { guid: any }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids);
    if (this.currencyGuids === null || this.currencyGuids.length === 0) {
      console.log('Empty');
      // this.currencyGuids = this.CopyCurrencyTotalGuids;
    }
  }
  onSelectAllcurrency(data: any) {
    this.currencyGuids = [];
    data.forEach((item: { guid: any }) => {
      this.currencyGuids.push(item.guid);
    });
    console.log(this.currencyGuids);
  }
  onDeSelectAllcurrency(data: any) {
    this.currencyGuids = [];
    // this.currencyGuids = this.CopyCurrencyTotalGuids;
    // data.forEach((item: { guid: any; }) => {
    //   this.playerstatusaaray.push(item.guid);
    // });
    console.log(this.currencyGuids);
  }
  // **************************************************************

  showDate(data: any) {
    console.log(this.filterForm.value.endDate);
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

    this.filterForm.valueChanges.subscribe((x) => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (
        new Date(x.startDate).getTime() > ToDate.getTime() ||
        new Date(x.startDate).getTime() > new Date(x.endDate).getTime() ||
        new Date(x.endDate).getTime() > ToDate.getTime()
      ) {
        console.log('indirect');
        console.log(this.filterForm.value.endDate);
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    });
  }
  timechange(data: any) {
    console.log(data.target.value);
    console.log(this.filterForm.value.startTime);
    console.log(this.filterForm.value.endTime);
    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }
  }

  TechnicalError() {
    this.ErrorPopup = false;
  }
  checkedstatus(event: any) {
    console.log((event.target.value))
    console.log((event))

  }
  /////////////pagination ???????///////////////////////////////////////////
  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: parseInt('1'),
      });
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
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
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
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
    this.FirstrecordFillter = this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
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

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }
}
