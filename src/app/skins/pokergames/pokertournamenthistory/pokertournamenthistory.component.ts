import { Component, OnInit ,OnDestroy} from '@angular/core';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';





@Component({
  selector: 'app-pokertournamenthistory',
  templateUrl: './pokertournamenthistory.component.html',
  styleUrls: ['./pokertournamenthistory.component.css']
})
export class PokertournamenthistoryComponent implements OnInit,OnDestroy {
  FillterMenu: any;
  filterForm: FormGroup;
  PageCount: number = 0;
  pokerTournamentData: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  pokerPlayerData: any;
  pokerTournamentDatapopup: boolean = false;
  pagecontrolbtn: boolean = false;
  sortaccessRuleName: any = [];
  walletFormatsList: any;
  walletlists: any = [];
  loader: boolean = false;
  ScheduleTypeList: any;
  TournamentStatusList: any;
  TourneyTypeList: any;
  GamesConfigList: any;
  gamescaption: any = [];
  startdate: any;


  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  dropDownCheckedList: any = [];
  filterItem: any = [];
  Filtergamesbtn: boolean = false;
  allGammeNamesWithCurrency: any = [];
  uniquegamescaption: any;
  allGammeNames: any = [];
  onlyPokerGames: any = [];
  checkboxesIndivisualGames: any = [];
  selectedFillterGames: any=[];
  gamesTobeSelected: any = "All";
  checkedList: any = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  pokerGamesCheckbox: boolean = true;
  bodyTournamentStatusListSelectedItems: any = [];
  TournamentStatusListSelectedItems: any=[];
  TournamentStatusListConstItem: any =[];
  TournamentStatusListDropdownSettings:object ={};

  // startdate: any;
  timeerror: boolean =false;
  startTime:any= "00:00:00"
  endTime:any = "23:59:59"
  steddate: boolean=false;
  endDate: any;
  startDate: any;
  todaydate: any;



  constructor(private DateTimePipe: DateTimePipe, private GamesofpokerService: GamesofpokerService, private PokergamesService: PokergamesService,
    private FileformatServiceService:FileformatServiceService) {
    this.filterForm = new FormGroup({
      skills: new FormControl(),
      // Datefrom: new FormControl(),
      // Dateto: new FormControl(),
      TournamentSettingId: new FormControl(),
      Name: new FormControl(),
      MakeaDeal: new FormControl(),
      ManualPrizePool: new FormControl(),
      BrandedTournament: new FormControl(),
      SynchronizedBreak: new FormControl(),
      Currency: new FormControl(),
      Game: new FormControl(),
      TotalCostfrom: new FormControl(),
      TotalCostto: new FormControl(),
      BuyInfrom: new FormControl(),
      BuyInto: new FormControl(),
      Feefrom: new FormControl(),
      Feeto: new FormControl(),
      KnockoutBountyfrom: new FormControl(),
      KnockoutBountyto: new FormControl(),
      Registeredfrom: new FormControl(),
      Registeredto: new FormControl(),
      MinPlayersfrom: new FormControl(),
      MinPlayersto: new FormControl(),
      ScheduleType: new FormControl(),
      Status: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
      startTime: new FormControl(),
      endTime: new FormControl(),
      
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
    })
    var localTime = moment().format('YYYY-MM-DD'); // store localTime
    this.startdate = localTime + "T00:00:00.000";
    console.log(this.startdate)
  }

  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
    // throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()-7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;

    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    // this.walletFormats();
    this.ScheduleType();
    this.TournamentStatus();
    this.TourneyType();
    this.walletType();
    this.GamesConfig();
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  // walletFormats() {
  //   const walletTypes = localStorage.getItem("walletTypes")
  //   if (walletTypes) {
  //     this.walletFormatsList = JSON.parse(walletTypes)
  //     for (let i = 0; i < this.walletFormatsList.length; i++) {
  //       if (this.walletFormatsList[i].clubGameWallet == true) {

  //         this.walletlists.push(this.walletFormatsList[i])
  //       }
  //     }
  //   }
  //   console.log(this.walletFormatsList)
  //   console.log("walletlists", this.walletlists)

  // };



  walletType() {

    this.walletlists = this.GamesofpokerService.walletTypes();
    console.log("walletlists", this.walletlists);
    this.filterForm.patchValue({
      Currency: this.walletlists[0].guid
    })




    this.dropdownList = this.walletlists;
    this.dropDownCheckedList = this.walletlists

    for (let i = 0; i < this.walletlists.length; i++) {
      // this.selectedItems[i] = this.walletlists[i]
      this.selectedItems[i] = {
        description: this.walletlists[i].description,
        guid: this.walletlists[i].guid
      }



    }



    this.dropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };





  }

  GamesConfig() {
    let list: any = this.GamesofpokerService.GamesConfig();
    console.log(list)
    this.filterItem = list[0] //*Required
    this.allGammeNamesWithCurrency = list[1] //*Notrequired
    this.gamescaption = list[2] //*Required
    this.allGammeNames = list[3] //*Notrequired
    this.onlyPokerGames = list[4] //*Notrequired
    this.uniquegamescaption = list[5] //*Notrequired
    this.checkboxesIndivisualGames = list[6] //*Notrequired

    for (let k = 0; k < this.filterItem.length; k++) {
      this.checkedList[k] = true
    }

  }

  ScheduleType() {
    const ScheduleType = localStorage.getItem('ScheduleType');
    if (ScheduleType) {
      this.ScheduleTypeList = JSON.parse(ScheduleType)
    }
    console.log("ScheduleTypeList", this.ScheduleTypeList)
    this.filterForm.patchValue({
      ScheduleType: this.ScheduleTypeList[0].guid
    })
  }
  TournamentStatus() {
    const TournamentStatus = localStorage.getItem("TournamentStatus");
    if (TournamentStatus) {
      this.TournamentStatusList = JSON.parse(TournamentStatus);
    }
    console.log("TournamentStatusList", this.TournamentStatusList);

    this.TournamentStatusListDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };

    // TournamentStatusListSelectedItems

    for (let i = 0; i < this.TournamentStatusList.length; i++) {
      this.TournamentStatusListSelectedItems[i] = { guid: this.TournamentStatusList[i].guid };
      this.bodyTournamentStatusListSelectedItems[i] = this.TournamentStatusList[i].guid;
    };
    this.TournamentStatusListConstItem = this.bodyTournamentStatusListSelectedItems

    console.log(this.TournamentStatusListSelectedItems);
    console.log(this.bodyTournamentStatusListSelectedItems)



  }
  TourneyType() {
    const TourneyType = localStorage.getItem("TourneyType")
    if (TourneyType) {
      this.TourneyTypeList = JSON.parse(TourneyType)
    }
    console.log("TourneyTypeList", this.TourneyTypeList)
  }



  onItemSelect(item: any) {
    const changeCurrencyResult = this.GamesofpokerService.onItemSelect(item);
    console.log(changeCurrencyResult)
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected
  }

  OnItemDeSelect(item: any) {
    const changeCurrencyResult = this.GamesofpokerService.OnItemDeSelect(item);
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;

  }
  onSelectAll(items: any) {
    const changeCurrencyResult = this.GamesofpokerService.onSelectAll(items);
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;



  }
  onDeSelectAll(items: any) {
    const changeCurrencyResult = this.GamesofpokerService.onDeSelectAll(items);
    const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;


  }

  clickonCheckboxIndivisualGames() {
    let changeCurrencyResult = this.GamesofpokerService.clickonCheckboxIndivisualGames();
    const { selectedFillterGames, gamesTobeSelected, checkedList, pokerGamesCheckbox } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;
    this.checkedList = checkedList;
    this.pokerGamesCheckbox = pokerGamesCheckbox;
  };


  clickonCheckboxForAllGames(event: any) {
    let changeCurrencyResult = this.GamesofpokerService.clickonCheckboxForAllGames(event);

    const { selectedFillterGames, gamesTobeSelected, checkedList, pokerGamesCheckbox } = changeCurrencyResult;
    this.selectedFillterGames = selectedFillterGames;
    this.gamesTobeSelected = gamesTobeSelected;
    this.checkedList = checkedList;
    this.pokerGamesCheckbox = pokerGamesCheckbox


  }



  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn

  }









  tournamentStatusListonItemSelect(item: any) {
    console.log(item)
    this.bodyTournamentStatusListSelectedItems.push(item.guid);
    console.log(this.bodyTournamentStatusListSelectedItems)


  }

  tournamentStatusListOnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.bodyTournamentStatusListSelectedItems);
    // this.bodyTournamentStatusListSelectedItems = this.bodyTournamentStatusListSelectedItems.filter((eachItem:any) => console.log(eachItem , item.guid));
    this.bodyTournamentStatusListSelectedItems = this.bodyTournamentStatusListSelectedItems.filter((eachItem: any) => eachItem.hiLong != item.guid.hiLong || eachItem.lowLong != item.guid.lowLong)
    console.log(this.bodyTournamentStatusListSelectedItems);
  }
  tournamentStatusListonSelectAll(items: any) {
    console.log(items)
    for (let m = 0; m < items.length; m++) {
      this.bodyTournamentStatusListSelectedItems[m] = items[m].guid
    }
    console.log(this.bodyTournamentStatusListSelectedItems)



  }
  tournamentStatusListonDeSelectAll(items: any) {
    console.log(items)
    this.bodyTournamentStatusListSelectedItems = [];
    console.log(this.bodyTournamentStatusListSelectedItems)
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
          //   dirtyValues[key] = currentControl.value;
        }
      });
    return dirtyValues
  }

  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
     console.log(c)
    return (c)
  }


  onFormSubmit() {
    console.log(this.filterForm.value)
    this.pokerTournamentData = false
    this.FillterMenu = false;
    this.loader = true;
    this.getDirtyValues(this.filterForm)
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody);
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.maxCountRecord);
    if (this.filterForm.value.maxCountRecord > 1) {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    } else {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord - 1 / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    }

    fillterbody["firstRecord"] = Number(this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    fillterbody["tourneyType"] = this.TourneyTypeList[0].guid;
    // fillterbody["gameNames"] = this.filterForm.value.Game
    fillterbody["startDate"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate != "") ? { "start": this.filterForm.value.startDate +"T"+ this.filterForm.value.startTime , "end": this.filterForm.value.endDate + "T"+  this.filterForm.value.endTime } : (this.filterForm.value.endDate != null && this.filterForm.value.endDate !== "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;
    // fillterbody["startDate"] = { "start": this.startdate, "end": '' };
    fillterbody["gameNames"] = this.selectedFillterGames.length === 0 ? this.allGammeNamesWithCurrency : this.selectedFillterGames;
    fillterbody["settingsId"] = this.filterForm.value.TournamentSettingId != null ? this.filterForm.value.TournamentSettingId : undefined;
    fillterbody["caption"] = this.filterForm.value.Name != null ? this.filterForm.value.Name : undefined;

    if (this.filterForm.value.MakeaDeal) {
      fillterbody["MakeaDeal"] = this.filterForm.value.MakeaDeal;
    }
    fillterbody["manualPrizePoolTourney"] = this.filterForm.value.ManualPrizePool != null ? this.filterForm.value.ManualPrizePool : false
    fillterbody["brandedTourney"] = this.filterForm.value.BrandedTournament != null ? this.filterForm.value.BrandedTournament : false
    fillterbody["synchronizedTourney"] = this.filterForm.value.SynchronizedBreak != null ? this.filterForm.value.SynchronizedBreak : false
    fillterbody["totalCost"] = this.filterForm.value.TotalCostfrom != null ? { "high": this.filterForm.value.TotalCostto, "low": this.filterForm.value.TotalCostfrom } : undefined;
    fillterbody["buyIn"] = this.filterForm.value.BuyInfrom != null ? { "high": this.filterForm.value.BuyInto, "low": this.filterForm.value.BuyInfrom } : undefined;
    fillterbody["fee"] = this.filterForm.value.Feefrom != null ? { "high": this.filterForm.value.Feeto, "low": this.filterForm.value.Feefrom } : undefined;
    fillterbody["knockoutBounty"] = this.filterForm.value.KnockoutBountyfrom != null ? { "high": this.filterForm.value.KnockoutBountyto, "low": this.filterForm.value.KnockoutBountyfrom } : undefined;
    fillterbody["registeredPlayers"] = this.filterForm.value.Registeredfrom != null ? { "high": this.filterForm.value.Registeredto, "low": this.filterForm.value.Registeredfrom } : undefined;
    fillterbody["playersCount"] = this.filterForm.value.MinPlayersfrom != null ? { "high": this.filterForm.value.MinPlayersto, "low": this.filterForm.value.MinPlayersfrom } : undefined;
    fillterbody["scheduleType"] = this.filterForm.value.ScheduleType != this.ScheduleTypeList[0].guid ? this.filterForm.value.ScheduleType : undefined;
    fillterbody["statuses"] = [{ hiLong: 0, lowLong: 5 }]
    // fillterbody["scheduleType"] = this.filterForm.value.ScheduleType != null ? this.filterForm.value.ScheduleType : undefined;
    // fillterbody["statuses"] = this.filterForm.value.Status != null ? [this.filterForm.value.Status] : undefined;
    // fillterbody["statuses"] = this.bodyTournamentStatusListSelectedItems.length ===0? this.TournamentStatusListConstItem : this.bodyTournamentStatusListSelectedItems

    // fillterbody["reportPeriod"] = this.filterForm.value.Datefrom != null ? { "end": this.filterForm.value.Dateto, "start": this.filterForm.value.Datefrom } : undefined

    this.PokergamesService.getPokerTournamentsHistory(fillterbody).subscribe((res) => { this.pokerTournamentHistoryData(res) }
    )
  }
  pokerTournamentHistoryData(data: any) {
    console.log(data);
    if (data) {
      this.pokerTournamentData = data.objectList;
      this.ResultCount = data.resultCount
      this.rowsOnthePage = data?.objectList?.length;

    }

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.ResultCount !== null || this.pokerTournamentData.resultCount == 0 || data == null) {
      this.loader = false;
    }
    for (let i = 0; i < this.pokerTournamentData?.length; i++) {
      for (let j = 0; j < this.walletlists.length; j++) {
        if (this.pokerTournamentData[i].buyIn.wallet.lowLong == this.walletlists[j].guid.lowLong) {
          this.pokerTournamentData[i].buyIn.wallet = this.walletlists[j].description
        }
      }
      for (let j = 0; j < this.TournamentStatusList.length; j++) {
        if (this.pokerTournamentData[i].status.lowLong == this.TournamentStatusList[j].guid.lowLong) {
          this.pokerTournamentData[i].status = this.TournamentStatusList[j].value
        }
      }
      for (let k = 0; k < this.gamescaption.length; k++) {
        if (this.pokerTournamentData[i].gameName == this.gamescaption[k].name) {
          this.pokerTournamentData[i].gameName = this.gamescaption[k].caption
        }
      }
    }


    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }




    this.sorttingData(this.pokerTournamentData)
  }
  sorttingData(data: any) {
    console.log(data)
    for (let i = 0; i < data?.length; i++) {
      console.log(data[i].accessRuleName)
      this.sortaccessRuleName.push(data[i].accessRuleName)
    }
    // console.log(this.sortaccessRuleName)
    // console.log(this.sortaccessRuleName.sort())
  }
  PlayerPopup(data: any) {
    console.log(data)
    this.pokerPlayerData = this.pokerTournamentData[data];
    console.log(this.pokerPlayerData)
    this.pokerTournamentDatapopup = true;
  }

  closepopup() {
    this.pokerTournamentDatapopup = false;
  }
  fastbackforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt("1")
      })
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)

  }

  fastforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1
      })

    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    if (this.PageCount > this.pokerTournamentData.length) {

      this.pagecontrolbtn = true
    }
    this.onFormSubmit()
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)
  }


  next() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    
    
    
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    
    this.onFormSubmit()

  }

  prev() {
    console.log("......Hhello......")
    if ((this.filterForm.value.firstRecord - 1) == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1)
    if (this.PageCount > this.pokerTournamentData.length) {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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
    XLSX.writeFile(wb, 'PokerGameSessionsExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element,"PokerGameSessionsExcelSheet")
  }
  showDate(data: any) {
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

}
