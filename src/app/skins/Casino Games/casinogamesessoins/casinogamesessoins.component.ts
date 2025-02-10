import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { CasinogamesService } from 'src/app/source/casinogames.service';
//import { MatSelect } from '@angular/material/select';
//import { MatOption } from '@angular/material/core';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-casinogamesessoins',
  templateUrl: './casinogamesessoins.component.html',
  styleUrls: ['./casinogamesessoins.component.css']
})
export class CasinogamesessoinsComponent implements OnInit, OnDestroy {

  select: any = [];
  filterForm: FormGroup;
  FillterList: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 10;
  tablePrint: any;
  dataPrint: any;
  walletstypes: any;
  selectedValues = '';
  wallettypelist: any = [];
  faceParameterslist: any = [];
  currencys: any = [];
  gameNameList: any;
  casinogameList: any;
  dataLoader: boolean = false;
  casinopopup: boolean = false;
  custSelectOptionPop: boolean = false;
  subCasino: any = [];
  gameList: any = [];
  checkeVal: boolean = false;
  checkedAll: boolean = false;
  expanded: boolean = false;
  gameName: any;
  select_all = false;
  value: any;
  SUM: any;
  obj: any;
  Rounds: any;
  initialBalanceValue: any;
  buyInValue: any;
  betValue: any;
  winValue: any;
  payoutValue: any;
  closingBalanceValue: any;
  gainlossamountValue: any;
  compPointsValue: any;
  walletlists: any = [];
  selectedCurrency: any;
  dropdownSettingscurrency: any;
  currencyStatus: any = []
  gameTobeSelected: any;
  CasinoGamesbtn: boolean = false
  casinoGameCheckbox: boolean = true
  casinoGamescheckedList: boolean[] = []
  onlycasinoGames: any = [];
  Casinofilters: any;
  updatedCasinoGameNames: any = []
  dummyCheckedCasinoGames: any = []
  gamesListData: any;
  faceDropdownsettings: any = {}
  selectedFaceParameters: any = []
  faceParametersNames: any;



  constructor(private CasinoGamesService: CasinogamesService,
    private FileformatServiceService: FileformatServiceService,
    private GamesofpokerService: GamesofpokerService,
    private activatedRouter: ActivatedRoute) {

    this.filterForm = new FormGroup({
      startdateFrom: new FormControl(),
      startdateTo: new FormControl(),
      enddate: new FormControl(),
      currency: new FormControl(),
      game: new FormControl(),
      face: new FormControl(),
      player: new FormControl(),
      sessionID: new FormControl(),
      firstRecord: new FormControl("1"),
      pageSize: new FormControl("100"),
      gamelist: new FormControl(),
    })
  }

  ngOnInit(): void {

    this.activatedRouter.queryParams.subscribe((params: any) => {
      if (params.data) {
        this.gamesListData = JSON.parse(params.data)
      }
      console.log(this.gamesListData)
    })

    this.walletTypes();
    this.gameNames();
    this.faceParameters()
    this.GamesConfig()

    if (this.gamesListData) {
      this.GamesListData()
      this.onFormSubmit()
    }
  }

  ngOnDestroy() {
    this.GamesofpokerService.clearData()
  }

  ignoreContext() {
    this.casinogameList = [];
    this.dataLoader = true;
  }

  casinoGamesbtn() {
    this.CasinoGamesbtn = !this.CasinoGamesbtn
    console.log(this.CasinoGamesbtn)
  }

  GamesConfig() {
    let list: any = this.GamesofpokerService.GamesConfig();
    console.log("List", list)


    this.Casinofilters = list[7]
    this.onlycasinoGames = list[8]
    // this.casinoGamescpt = list[9]
    // this.casinoGamesname = list[10]

    console.log(this.Casinofilters)
    console.log(this.onlycasinoGames)

    for (let k = 0; k < this.Casinofilters.length; k++) {
      this.casinoGamescheckedList[k] = true
    }
    this.updateCheckedCasinoGames()

  }

  onFormSubmit() {
    this.dataLoader = true
    let currencyArr = this.currencyStatus.map((wallet: any, ind: number) =>  wallet?.guid)
    let face = this.selectedFaceParameters.map((face:any) =>  face.name)
    console.log(this.currencyStatus)

    let fillterbody = this.getValues(this.filterForm)
    fillterbody["datePeriod"] = this.filterForm.value.startdate != null ? { "start": this.filterForm.value.startdateFrom, "end": this.filterForm.value.startdateTo } : undefined
    // fillterbody["wallet"] = currencyArr != null ? currencyArr : undefined
    // fillterbody["wallet"] = this.filterForm.value.currency != null ? this.filterForm.value.currency : undefined
    // fillterbody["gameNames"] = this.filterForm.value.game != null ? [this.filterForm.value.game] : undefined,
    fillterbody["gameNames"] = this.updatedCasinoGameNames.length > 0 ? this.updatedCasinoGameNames : undefined
    // fillterbody["agentNetwork"] = this.filterForm.value.face != null ? [this.filterForm.value.face] : undefined,
    fillterbody["networkNames"] = face.length == 0 ? this.faceParametersNames : face,
    fillterbody["players"] = this.filterForm.value.player != null ? this.filterForm.value.player : undefined,
    fillterbody["gameSessionId"] = this.filterForm.value.sessionID != null ? this.filterForm.value.sessionID : undefined,
    fillterbody["firstRecord"] = Number(this.filterForm.value.firstRecord - 1),
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.pageSize),
    this.CasinoGamesService.CasinoGameSessions(fillterbody).subscribe((res) => { this.getCasinoData(res) })

  }

  getValues(form: any) {
    let Values: any = {};
    Object.keys(form.controls).forEach(key => {
      let currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls)
          Values[key] = this.getValues(currentControl);
      }
    });

    return Values;
  }
  fillterMenu() {
    this.FillterList = !this.FillterList;
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'CasinogamesessionsExcelSheet.xlsx';
    XLSX.writeFile(wb, 'CasinogamesessionsExcelSheet.xlsx');

  }

  exportCsv() {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "casinoGamesList")
  }
  onPrint() {
    this.tablePrint = document.getElementById("tablerecords");
    this.dataPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    console.log(this.tablePrint);
    console.log(this.dataPrint);
    this.dataPrint.document.write(this.tablePrint.innerHTML);
    this.dataPrint.document.close();
    this.dataPrint.focus();
    this.dataPrint.print();
    this.dataPrint.close();
  }
  getCasinoData(data: any) {
    this.dataLoader = false;
    console.log(data)
    if (data) {
      this.casinogameList = data.objectList;
      console.log(this.casinogameList)
      this.ResultCount = data.resultCount
      this.rowsOnthePage = data.objectList.length;
      if (this.ResultCount !== null) {
        this.resultcount = false;
      }
      if (this.casinogameList != null) {
        this.dataLoader = false;
      }
      for (let i = 0; i < this.casinogameList.length; i++) {
        for (let m = 0; m < this.wallettypelist.length; m++) {
          if (this.casinogameList[i].currencys.lowLong == this.wallettypelist[m].guid.lowLong) {
            this.casinogameList[i].currencys = this.wallettypelist[m].value
          }
        }
      }
      this.findsum(this.casinogameList)
    }

  }

  walletTypes() {
    const walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      let wallettypelist = JSON.parse(walletTypes)
      for (let i = 0; i < wallettypelist.length; i++) {
        if (wallettypelist[i].clubGameWallet == true) {
          if (wallettypelist[i].description !== "Play Money") {
            this.walletlists.push(wallettypelist[i])
          }
        }
      }
      console.log("walletlists", this.walletlists)
      console.log("wallettypelist", wallettypelist)


      for (let i = 0; i < this.walletlists.length; i++) {
        if (this.gamesListData) {
          console.log(this.gamesListData)
          if (this.gamesListData.bet.wallet.hiLong == this.walletlists[i].guid.hiLong && this.gamesListData.bet.wallet.lowLong == this.walletlists[i].guid.lowLong) {
            this.currencyStatus[0] = {
              description: this.walletlists[i].description,
              guid: this.walletlists[i].guid
            }
          }
        }
        else {
          this.currencyStatus[i] = {
            description: this.walletlists[i].description,
            guid: this.walletlists[i].guid
          }
        }
      }
      console.log(this.currencyStatus)

      this.selectedCurrency = [...this.currencyStatus]
      console.log(this.selectedCurrency)

      this.dropdownSettingscurrency = {
        singleSelection: false,
        idField: 'guid',
        textField: 'description',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
    }
  }


  gameNames() {
    this.gameName = localStorage.getItem('DYIDGAMENAMES')
    this.gameNameList = JSON.parse(this.gameName)
    console.log(this.gameNameList)
    if (this.gameNameList) {

      for (let i = 0; i < this.gameNameList.length; i++) {
        this.gameList.push(this.gameNameList[i])
      }
    }
    console.log(this.gameList)

  }

  faceParameters() {
    const faceParameterslist = localStorage.getItem('faceParameters')
    if (faceParameterslist) {
      this.faceParameterslist = JSON.parse(faceParameterslist)
      console.log(this.faceParameterslist)
    }

    this.selectedFaceParameters = this.faceParameterslist.map((list: any) => list)
    console.log(this.selectedFaceParameters)
    this.faceParametersNames = [...this.selectedFaceParameters]
    console.log(this.faceParametersNames)

    this.faceDropdownsettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    }
  }
  onClick(event: any) {
    console.log(event)
    this.subCasino = this.casinogameList[event]
    console.log(this.subCasino)
    this.casinopopup = true;
  }
  openCasinoPop() {
    this.casinopopup = true;
  }
  closePopup() {
    this.casinopopup = false;
  }
  FormReset() {
    this.filterForm.reset();
  }

  findsum(data: any) {
    this.obj = data
    console.log(this.obj);
    this.Rounds = this.obj.reduce((a: any, b: { rounds: any; }) => (a + b.rounds.value), 0);
    console.log(this.Rounds)
    this.initialBalanceValue = this.obj.reduce((a: any, b: { initialBalance: any; }) => (a + b.initialBalance.value), 0);
    console.log(this.initialBalanceValue)
    this.buyInValue = this.obj.reduce((a: any, b: { buyIn: any; }) => (a + b.buyIn.value), 0);
    console.log(this.buyInValue)
    this.betValue = this.obj.reduce((a: any, b: { bet: any; }) => (a + b.bet.value), 0);
    console.log(this.betValue)
    this.winValue = this.obj.reduce((a: any, b: { win: any; }) => (a + b.win.value), 0);
    console.log(this.winValue)
    this.payoutValue = this.obj.reduce((a: any, b: { payout: any; }) => (a + b.payout.value), 0);
    console.log(this.payoutValue)
    this.closingBalanceValue = this.obj.reduce((a: any, b: { closingBalance: any; }) => (a + b.closingBalance.value), 0);
    console.log(this.closingBalanceValue)
    this.gainlossamountValue = this.obj.reduce((a: any, b: { gainlossamount: any; }) => (a + b.gainlossamount.value), 0);
    console.log(this.gainlossamountValue)
    this.compPointsValue = this.obj.reduce((a: any, b: { bonusBet: any; }) => (a + b.bonusBet.value), 0);
    console.log(this.compPointsValue)
  }
  custSelect() {
    this.custSelectOptionPop = true;
  }
  custSelectClose() {
    this.custSelectOptionPop = false;
    console.log(this.custSelectOptionPop)
  }
  changeFace(e: any) {

    if (e.target.value == "SelectAll") {
      this.checkeVal = !this.checkeVal;
      console.log(this.checkeVal)
      if (this.checkeVal) {
        this.checkedAll = true;
        this.selectedValues = 'agentNetwork';
      } else {
        this.selectedValues = '';
        this.checkedAll = false;
      }
    } else {
      this.checkeVal = false;
    }
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Currency Dropdown start @@@@@@@@@@@@@@@@@@@@@@@@@@

  onItemSelectcurrency(event: any) {
    this.currencyStatus = []
    this.selectedCurrency.forEach((curr: any) => {
      this.currencyStatus.push(curr)
    })
    console.log(this.currencyStatus)
    this.updateCheckedCasinoGames()

  }

  OnItemDeSelectcurrency(event: any) {
    this.currencyStatus = []
    this.selectedCurrency.forEach((curr: any) => {
      this.currencyStatus.push(curr)
    })
    if (this.currencyStatus.length == 0) {
      this.walletlists.forEach((curr: any) => {
        this.currencyStatus.push(curr)
      })
    }
    console.log(this.currencyStatus)
    this.updateCheckedCasinoGames()

  }

  onSelectAllcurrency(event: any) {
    this.currencyStatus = []
    event.forEach((curr: any) => {
      this.currencyStatus.push(curr)
    })
    console.log(this.currencyStatus)
    this.updateCheckedCasinoGames()
  }

  onDeSelectAllcurrency(event: any) {
    this.currencyStatus = []
    this.selectedCurrency.forEach((curr: any) => {
      this.currencyStatus.push(curr)
    })
    console.log(this.currencyStatus)
    this.updateCheckedCasinoGames()
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Currency Dropdown End @@@@@@@@@@@@@@@@@@@@@@@@@@

  clickonCheckboxForAllGamesCasino(event: any) {
    let isChecked = event.target.checked
    this.casinoGameCheckbox = isChecked
    this.casinoGamescheckedList = this.casinoGamescheckedList.map((bool: any) => isChecked)
    console.log(event.target.checked)
    this.updateCheckedCasinoGames()
  }

  clickonCheckboxCasinoIndivisualGames(event: any, i: number) {
    console.log(event.target.checked, i)
    this.casinoGamescheckedList[i] = event.target.checked
    console.log(this.casinoGamescheckedList)

    let parentchek = this.casinoGamescheckedList.every((bool: any) => bool)
    this.casinoGameCheckbox = parentchek
    this.updateCheckedCasinoGames()
  }

  updateCheckedCasinoGames() {
    this.updatedCasinoGameNames = []
    let selectedCapNames: any[] = []
    this.onlycasinoGames.forEach((game: any) => {
      this.Casinofilters.forEach((uniGame: any, index: number) => {
        if (this.casinoGamescheckedList[index]) {
          if (uniGame.caption == game.caption) {
            selectedCapNames.push(uniGame.caption)
            this.currencyStatus.forEach((currency: any) => {
              console.log(currency)
              if (game.wallet.hiLong == currency.guid.hiLong && game.wallet.lowLong == currency.guid.lowLong) {
                this.updatedCasinoGameNames.push(game.name)
                if (this.dummyCheckedCasinoGames.length == 0) {
                  this.dummyCheckedCasinoGames = this.updatedCasinoGameNames
                }
              }
            })
          }
        }
      })
    })

    if (this.updatedCasinoGameNames.length == 0) {
      this.updatedCasinoGameNames = this.dummyCheckedCasinoGames
    }
    console.log(this.updatedCasinoGameNames)
    selectedCapNames = selectedCapNames.filter((cap: any, ind: number) => {
      return selectedCapNames.indexOf(cap) === ind
    })
    console.log(selectedCapNames)
    this.selectedCheckbox(selectedCapNames)
  }

  selectedCheckbox(selectedCapNames: any) {
    let arr = this.casinoGamescheckedList.every((bool) => bool === true)
    if (arr) {
      this.gameTobeSelected = "[ALL]"
    } else {
      this.gameTobeSelected = selectedCapNames
    };
  }

  GamesListData() {

    this.casinoGamescheckedList = Array(this.Casinofilters.length).fill(false)
    console.log(this.gamesListData)
    this.casinoGameCheckbox = false
    this.Casinofilters.forEach((casino: any, i: number) => {
      if (casino.caption == this.gamesListData.gameCaption) {
        this.casinoGamescheckedList[i] = true
      }
    })
    this.updateCheckedCasinoGames()
  }

}

// casinorowClick(even:any){
//   this.casinopopup = true;
//   this.subCasino = [];
//   console.log(even);
//   this.subCasino.push({

//   })
//   console.log(this.subCasino)
// }
// casinoClick(data:any){
//   this.subCasino =[];
//   console.log(data);
//   this.subCasino.push({

//   })
//   console.log(this.subCasino)
// }
// openCasinoPop(){
//   if(this.subCasino.length != 0){
//     this.casinopopup = true;
//   } else {
//     this.casinopopup = false;
//   }
// }
// closePopup(){
//   this.casinopopup = false;
// }
