import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { PokergamesService } from 'src/app/source/pokergames.service';
@Component({
  selector: 'app-re-game-session',
  templateUrl: './re-game-session.component.html',
  styleUrls: ['./re-game-session.component.css']
})
export class ReGameSessionComponent implements OnInit {
  FillterMenu: boolean = true;
  timeerror: boolean = false;
  steddate: boolean = false
  walletlists: any = [];
  dropdownList: any;
  dropDownCheckedList: any;
  selectedItems: any = [];
  selectedRemote: any = [];
  selectedFillterGames: any = [];
  sessionGAme: any = []
  // pokerGamesCheckbox: any = [];
  Filtergamesbtn: boolean = false;
  checkboxesIndivisualGames: any = []
  gamesTobeSelected: any = "All";
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  startDate: any;
  endDate: any = Date;
  todaydate: any;
  filterForm: FormGroup;
  remoteGameId: any = []
  currencyarray: any = [];
  sessionStuse: any = [];
  deselestarry: any = [];
  GamesAllProvider: any = [];
  remoteGameSession: any = [];
  dropdownSettings: any;
  dropdownRemote: any;
  GamesConfigList: any;
  pokerGamesCheckbox: boolean[] = [];
  checkedList: boolean[][] = [];
  selectedGames: any = [];
  playerGUID: any = [];
  PopupData: any = [];
  constructor(private FileformatServiceService: FileformatServiceService, private PokergamesService: PokergamesService, private GamesofpokerService: GamesofpokerService) {
    this.filterForm = new FormGroup({

      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      Currency: new FormControl(),
      Status: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    });
  }

  ngOnInit(): void {
    let Playerguid = sessionStorage.getItem('Playerguid')
    console.log(Playerguid)
    if (Playerguid) {
      this.playerGUID = JSON.parse(Playerguid)
    }

    this.walletType()
    this.RemoteGameStatus()
    this.GamesConfig()
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
  }

  RemoteGameStatus() {
    let remoteGame = localStorage.getItem('RemoteGameSessionStatus')
    var remoteSes = []

    if (remoteGame) {
      remoteSes = JSON.parse(remoteGame)
    }
    for (let i = 0; i < remoteSes.length; i++) {
      this.remoteGameSession.push(remoteSes[i])
      this.remoteGameId = this.remoteGameSession

      this.selectedRemote[i] = {
        value: this.remoteGameSession[i].value,
        guid: this.remoteGameSession[i].guid
      }
    }
    this.dropdownRemote = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
  }
  walletType() {
    let wallets = localStorage.getItem('walletTypes')
    var walletNew = []
    this.walletlists = []
    if (wallets) {
      walletNew = JSON.parse(wallets)
    }
    for (let i = 0; i < walletNew.length; i++) {
      if (walletNew[i].clubGameWallet == true) {
        if (walletNew[i].description != "Play Money") {
          this.walletlists.push(walletNew[i])
        }
      }
    }
    this.dropdownList = this.walletlists;
    this.dropDownCheckedList = this.walletlists

    for (let i = 0; i < this.walletlists.length; i++) {
      this.selectedItems[i] = {
        description: this.walletlists[i].description,
        guid: this.walletlists[i].guid
      }
    }
    this.selectedItems.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);

      console.log(this.currencyarray)
    });
    this.deselestarry = this.currencyarray
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };

  }
  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn

  };

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'HouseRevenueExeclSheet.xlsx';
    XLSX.writeFile(wb, 'HouseRevenueExeclSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "HouseRevenueExeclSheet")
  }


  onItemSelectstatus(data: any) {
    this.sessionStuse = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.sessionStuse.push(item.guid);
    });
  }

  OnItemDeSelectstatus(data: any) {
    this.sessionStuse = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.sessionStuse.push(item.guid);
    });
    if (this.sessionStuse === null || this.sessionStuse.length === 0) {
      this.sessionStuse = this.deselestarry
    }

  }
  onSelectAllstatus(data: any) {
    this.sessionStuse = []
    data.forEach((item: { guid: any; }) => {
      this.sessionStuse.push(item.guid);
    });
  }
  onDeSelectAllstatus(data: any) {
    this.sessionStuse = []
    this.sessionStuse = this.deselestarry
  }



  onItemSelectcurrency(data: any) {
    this.currencyarray = []
    this.filterForm.value.Currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
  }

  OnItemDeSelectcurrency(data: any) {
    this.currencyarray = []
    this.filterForm.value.Currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    if (this.currencyarray === null || this.currencyarray.length === 0) {
      this.currencyarray = this.deselestarry
    }

  }
  onSelectAllcurrency(data: any) {
    this.currencyarray = []
    data.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
  }
  onDeSelectAllcurrency(data: any) {
    this.currencyarray = []
    this.currencyarray = this.deselestarry
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

        this.steddate = true;
      } else {
        this.steddate = false;
      }
    });
  }
  timechange(data: any) {
    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }

  }
  GamesConfig() {
    const gamesConfig = localStorage.getItem("GamesConfig");
    if (gamesConfig) {
      this.GamesConfigList = JSON.parse(gamesConfig);
    }
    this.GamesAllProvider = this.GamesConfigList.remoteSystemGames;
    console.log("GamesAllProvider", this.GamesAllProvider)
    this.pokerGamesCheckbox = Array(this.GamesAllProvider.length).fill(true);
    this.checkedList = this.GamesAllProvider.map((provider: any) => Array(provider.games.length).fill(true));
    console.log(this.checkedList)
    this.updateSelectedGames();
  }



  private updateProviderCheckbox(providerIndex: number): void {
    const allGamesSelected = this.checkedList[providerIndex].every(game => game);
    console.log(allGamesSelected)
    this.pokerGamesCheckbox[providerIndex] = allGamesSelected;
  }

  clickonCheckboxIndivisualGames(event: any, providerIndex: number, gameIndex: number) {
    this.checkedList[providerIndex][gameIndex] = event.target.checked;
    this.updateProviderCheckbox(providerIndex);
    this.updateSelectedGames();
    console.log(this.checkedList);
  }

  clickonCheckboxForAllGames(event: any, providerIndex: number) {
    const isChecked = event.target.checked;
    this.pokerGamesCheckbox[providerIndex] = isChecked;
    this.checkedList[providerIndex] = this.checkedList[providerIndex].map(() => isChecked);
    this.updateProviderCheckbox(providerIndex);
    this.updateSelectedGames();
    console.log(this.checkedList);
  }

  private updateSelectedGames(): void {
    this.selectedGames = [];
    this.GamesAllProvider.forEach((provider: any, providerIndex: any) => {
      provider.games.forEach((game: any, gameIndex: any) => {
        if (this.checkedList[providerIndex][gameIndex]) {
          for (let i = 0; i < this.currencyarray.length; i++) {
            if (this.currencyarray[i].lowLong == game.wallet.lowLong && this.currencyarray[i].hiLong == game.wallet.hiLong) {
              this.selectedGames.push(game.guid);
            }
          }

        }
      });
    });
  }
  submitBTN() {
    this.updateSelectedGames()
    console.log(this.currencyarray)
    let body = {
      "firstRecord": 0,
      "maxCountRecord": 100,
      "gameGuids": this.selectedGames,
      "playerGuids": [this.playerGUID],
      "statuses": this.sessionStuse,
      "startDate": this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined

    }
    this.PokergamesService.getPokerGameSessions(body).subscribe(data => this.remoteGameSESS(data))



  }
  remoteGameSESS(data: any) {
    console.log(data)
    if (data) {
      this.sessionGAme = data.objectList



    }

  }

  PlayerPopup(index: any) {
    console.log(index)
    console.log(this.sessionGAme[index])
    this.PopupData = this.sessionGAme[index]
  }


}


