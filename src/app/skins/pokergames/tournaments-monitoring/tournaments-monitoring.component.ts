import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { DatePipe, formatDate } from '@angular/common'
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-tournaments-monitoring',
  templateUrl: './tournaments-monitoring.component.html',
  styleUrls: ['./tournaments-monitoring.component.css']
})
export class TournamentsMonitoringComponent implements OnInit {
  filterForm: FormGroup;
  FillterMenu: boolean = false;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  pokerTournamentData: any=[];
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  loader: boolean = false;
  pokerPlayerData: any;
  TournamentStatusList: any = [];
  All: any = [];
  GamesConfigList: any;
  gamescaption: any = [];
  startdate: any = Date;
  date: any;
  TourneyTypeList: any;
  
  constructor(private PokergamesService: PokergamesService, private FileformatServiceService:FileformatServiceService , public datepipe: DatePipe) {
    this.filterForm = new FormGroup({
      Datefrom: new FormControl(),
      Dateto: new FormControl(),
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

      
    })

    var localTime = moment().format('YYYY-MM-DD'); // store localTime
    this.startdate = localTime + "T00:00:00.000";
    console.log(this.startdate)
    

  }
  myFunction() {
    this.date = new Date();
    let latest_date = this.datepipe.transform(this.startdate, 'yyyy-MM-dd');
    console.log(latest_date)
  }
  ngOnInit(): void {
    this.TournamentStatus();
    this.GamesConfig();
    this.TourneyType();
    this.onFormSubmit();

    let formattedDt = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
    console.log(formattedDt)


    console.log(window.location.pathname)
    setInterval(() => {
      if (window.location.pathname == "/TournamentsMonitoring") {
        this.onFormSubmit()
      }
    }, 60000)




  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }


  GamesConfig() {
    const GamesConfig = localStorage.getItem('GamesConfig')
    if (GamesConfig) {
      this.GamesConfigList = JSON.parse(GamesConfig)
    }
    // console.log("GamesConfig", this.GamesConfigList)
    console.log("GamesConfig", this.GamesConfigList.games)
    let gamesListofarrays = this.GamesConfigList.games

    console.log("gamesListofarraysss", gamesListofarrays)
    this.gamescaption = [];
    for (let i = 0; i < gamesListofarrays.length; i++) {
      if (gamesListofarrays[i].caption) {
        if (gamesListofarrays[i].name.startsWith("POKER_")) {
          this.gamescaption.push(gamesListofarrays[i])
        }
      }
    }
    console.log(this.gamescaption)
  }

  TournamentStatus() {
    const TournamentStatus = localStorage.getItem("TournamentStatus");
    let TournamentStatusList = []
    if (TournamentStatus) {
      TournamentStatusList = JSON.parse(TournamentStatus);
    }
    for (let i = 0; i < TournamentStatusList.length; i++) {
      // if (TournamentStatusList[i].value === "Registering" || TournamentStatusList[i].value === "Seating" || TournamentStatusList[i].value === "Paused" || TournamentStatusList[i].value === "Late Registration") {
      if (TournamentStatusList[i].value === "Running" || TournamentStatusList[i].value === "Seating" || TournamentStatusList[i].value === "Paused" || TournamentStatusList[i].value === "Late Registration") {
        this.TournamentStatusList.push(TournamentStatusList[i])

      }
    }
    console.log("TournamentStatus", TournamentStatusList)
    console.log("TournamentStatusList", this.TournamentStatusList);
    for (let i = 0; i < this.TournamentStatusList.length; i++) {
      this.All.push(this.TournamentStatusList[i].guid)
    }
    // console.log(this.All)
  }
  TourneyType() {
    const TourneyType = localStorage.getItem("TourneyType")
    if (TourneyType) {
      this.TourneyTypeList = JSON.parse(TourneyType)
    }
    console.log("TourneyTypeList", this.TourneyTypeList)
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
    // fillterbody["startDate"] = { "start": this.startdate, "end": this.startdate }
    fillterbody["startDate"] = { "start": '', "end": '' }
    fillterbody["statuses"] = this.All
    fillterbody["tourneyType"] = this.TourneyTypeList[0].guid;
    // fillterbody["gameNames"] = this.filterForm.value.Game
    // fillterbody["startDate"] = this.filterForm.value.Datefrom != null ? { "start": this.filterForm.value.Datefrom, "end": this.filterForm.value.Dateto } : undefined;

    // fillterbody["settingsId"] = this.filterForm.value.TournamentSettingId != null ? this.filterForm.value.TournamentSettingId : undefined;
    // fillterbody["caption"] = this.filterForm.value.Name != null ? this.filterForm.value.Name : undefined;

    // if (this.filterForm.value.MakeaDeal) {
    //   fillterbody["MakeaDeal"] = this.filterForm.value.MakeaDeal;
    // }
    // fillterbody["manualPrizePoolTourney"] = this.filterForm.value.ManualPrizePool != null ? this.filterForm.value.ManualPrizePool : false
    // fillterbody["brandedTourney"] = this.filterForm.value.BrandedTournament != null ? this.filterForm.value.BrandedTournament : false
    // fillterbody["synchronizedTourney"] = this.filterForm.value.SynchronizedBreak != null ? this.filterForm.value.SynchronizedBreak : false
    // fillterbody["totalCost"] = this.filterForm.value.TotalCostfrom != null ? { "high": this.filterForm.value.TotalCostto, "low": this.filterForm.value.TotalCostfrom } : undefined;
    // fillterbody["buyIn"] = this.filterForm.value.BuyInfrom != null ? { "high": this.filterForm.value.BuyInto, "low": this.filterForm.value.BuyInfrom } : undefined;
    // fillterbody["fee"] = this.filterForm.value.Feefrom != null ? { "high": this.filterForm.value.Feeto, "low": this.filterForm.value.Feefrom } : undefined;
    // fillterbody["knockoutBounty"] = this.filterForm.value.KnockoutBountyfrom != null ? { "high": this.filterForm.value.KnockoutBountyto, "low": this.filterForm.value.KnockoutBountyfrom } : undefined;
    // fillterbody["registeredPlayers"] = this.filterForm.value.Registeredfrom != null ? { "high": this.filterForm.value.Registeredto, "low": this.filterForm.value.Registeredfrom } : undefined;
    // fillterbody["playersCount"] = this.filterForm.value.MinPlayersfrom != null ? { "high": this.filterForm.value.MinPlayersto, "low": this.filterForm.value.MinPlayersfrom } : undefined;
    // fillterbody["scheduleType"] = this.filterForm.value.ScheduleType != null ? this.filterForm.value.ScheduleType : undefined;
    // fillterbody["statuses"] = this.filterForm.value.Status != null ? [this.filterForm.value.Status] : undefined;

    // fillterbody["reportPeriod"] = this.filterForm.value.Datefrom != null ? { "end": this.filterForm.value.Dateto, "start": this.filterForm.value.Datefrom } : undefined

    this.PokergamesService.getPokerTournamentsHistory(fillterbody).subscribe((res) => { this.pokerTournamentHistoryData(res) }
    )
  }
  pokerTournamentHistoryData(data: any) {
    console.log(data)
    this.pokerTournamentData = data.objectList;
    if(data.objectList){
      this.ResultCount = data.resultCount
      this.rowsOnthePage = data.objectList.length;
    }
   
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.ResultCount !== null || this.pokerTournamentData.resultCount == 0 || data == null) {
      this.loader = false;
    }
    for (let i = 0; i < this.pokerTournamentData.length; i++) {
      //   for (let j = 0; j < this.walletlists.length; j++) {
      //     if (this.pokerTournamentData[i].buyIn.wallet.lowLong == this.walletlists[j].guid.lowLong) {
      //       this.pokerTournamentData[i].buyIn.wallet = this.walletlists[j].description
      //     }
      //   }
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
    XLSX.writeFile(wb, 'PokerGameSessionsExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element,"PokerGameSessionsExcelSheet")
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
    if (this.PageCount > this.pokerTournamentData.length) {

      this.pagecontrolbtn = true
    } else {
      this.pagecontrolbtn = false
    }
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

    console.log(this.ResultCount)
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
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
    console.log(this.ResultCount)
    console.log(this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log(((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }

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
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }
}
