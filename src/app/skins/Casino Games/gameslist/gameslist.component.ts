import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { CasinogamesService } from 'src/app/source/casinogames.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';

@Component({
  selector: 'app-gameslist',
  templateUrl: './gameslist.component.html',
  styleUrls: ['./gameslist.component.css']
})
export class GameslistComponent implements OnInit {
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: any;
  tablePrint: any;
  dataPrint: any;
  gameslist: any;
  walletstypes: any;
  wallettypelist: any = [];
  dataLoader: boolean = false;
  gamespopup: boolean = false;
  subGame: any = [];
  onlyCasinoGames: any
  walletFormatsList: any
  sumsArray: any
  payoutAvg: any



  constructor(private CasinoGamesService: CasinogamesService,
    private gamesOfpokerService: GamesofpokerService,
    private FileformatServiceService: FileformatServiceService
  ) { }

  public stringifyData(data: any): string {
    return JSON.stringify(data);
  }


  ngOnInit(): void {
    this.walletTypelist();
    this.walletFormats();
    this.gamesConfig()
  }

  ngOnDestroy(){
    this.gamesOfpokerService.clearData()
  }
  ignoreContext() {
    this.gameslist = [];
  }
  walletTypelist() {
    const walletstypes = localStorage.getItem('walletTypes');
    console.log(walletstypes)
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
    }
    console.log(this.wallettypelist)
  }
  walletFormats() {
    const walletFormats = localStorage.getItem('walletFormats');
    console.log(walletFormats)
    if (walletFormats) {
      this.walletFormatsList = JSON.parse(walletFormats);
      console.log(this.walletFormatsList)
    }
    console.log(this.walletFormatsList)


    this.walletFormatsList.forEach((format: any) => {
      console.log(format)
    })
  }

  gamesConfig() {
    let list = this.gamesOfpokerService.GamesConfig();
    let casinogamesFilters = list[7]
    this.onlyCasinoGames = list[8]
    console.log("list", list)
    console.log(casinogamesFilters)



  }
  onRequery() {
    this.dataLoader = true;
    this.dataLoader = true;
    let body =
    {
      // "firstRecord": "0",
      // "maxCountRecord": "1"
    }
    this.CasinoGamesService.GamesList(body).subscribe((res) => { this.getGamesData(res) })
  }
  getGamesData(data: any) {
    this.dataLoader = false;
    console.log(data)

    if (data?.objectList) {
      this.gameslist = data.objectList;

      console.log(this.gameslist)
      this.ResultCount = data.resultCount
      this.rowsOnthePage = data.objectList.length;
      if (this.ResultCount !== null) {
        this.resultcount = false;
      }

      if (this.gameslist != null) {
        this.dataLoader = false;
      }

      for (let j = 0; j < this.gameslist.length; j++) {
        console.log(this.gameslist[j].gameBank.wallet.hiLong)

        if (!this.gameslist[j].bet) {
          Object.assign(this.gameslist[j], { bet: { value: '' } })
        }
        if (!this.gameslist[j].win) {
          Object.assign(this.gameslist[j], { win: { value: '' } })
        }
        if (!this.gameslist[j].payoutPercent) {
          Object.assign(this.gameslist[j], { payoutPercent: '' })
        }
        if (!this.gameslist[j].gainLossAmount) {
          Object.assign(this.gameslist[j], { gainLossAmount: { value: '' } })
        }

        this.onlyCasinoGames.forEach((game: any) => {
          if (this.gameslist[j].gameName == game.name) {
            this.gameslist[j].gameCaption = game.caption
          }
        })

        this.walletFormatsList.forEach((format: any) => {
          if (this.gameslist[j].wallet.hiLong == format.guid.hiLong && this.gameslist[j].wallet.lowLong == format.guid.lowLong) {

            if (format.currencyCode) {

              this.gameslist[j].currency = format.currencyCode
              console.log(format.currencyCode)
            }
            else {
              this.gameslist[j].currency = format.symbol
              console.log(format.symbol)
            }
            if (format.symbol) {
              this.gameslist[j].symbol = format.symbol
              console.log(format.symbol)
            }
          }
        })
      }
      this.findSum(this.gameslist)
      this.sumWalletValues()
      // this.sumGameBankValues(this.gameslist)
    }



    // for (let i = 0; i < this.gameslist.length; i++) {
    //   for (let m = 0; m < this.wallettypelist.length; m++) {
    //     if (this.gameslist[i].wallet.lowLong == this.wallettypelist[m].guid.lowLong) {
    //       this.gameslist[i].wallet = this.wallettypelist[m].description
    //     }
    //   }
    // }
  }

  findSum(data: any) {
    let sum = 0

    data.forEach((game: any) => {
      console.log(game.realPayoutPercent)
      if (game.realPayoutPercent) {
        sum += Number(game.realPayoutPercent)
      }

    })
    this.payoutAvg = (sum / data.length).toFixed(2)
    console.log(sum / data.length)
  }

  sumWalletValues(): { hiLong: number; lowLong: number; sum: number; symbol: string }[] {
    const sumsObject: { [key: string]: { gameBankSum: number; winSum: number; betsum: number; gainLossAmountSum: number; cumulativeJackpotSum: number; symbol: string } } = {};

    this.gameslist.forEach((game: any) => {
      this.walletFormatsList.forEach((format: any) => {
        if (game.wallet.hiLong == format.guid.hiLong && game.wallet.lowLong == format.guid.lowLong) {
          const key = `${game.wallet.hiLong}-${game.wallet.lowLong}`;
          if (!sumsObject[key]) {
            sumsObject[key] = { gameBankSum: 0, betsum: 0, winSum: 0, gainLossAmountSum: 0, cumulativeJackpotSum: 0, symbol: format.symbol };
          }
          sumsObject[key].gameBankSum += Number(game.gameBank.value);
          sumsObject[key].betsum += Number(game.bet.value);
          sumsObject[key].winSum += Number(game.win.value);
          sumsObject[key].gainLossAmountSum += Number(game.gainLossAmount.value);
          sumsObject[key].cumulativeJackpotSum += Number(game.cumulativeJackpotSum.value);
        }
      });
    });
    console.log(sumsObject) 

    // Convert object to array of objects
    this.sumsArray = Object.keys(sumsObject).map(key => {
      const [hiLong, lowLong] = key.split('-').map(Number);
      return {
        hiLong, lowLong,
        symbol: sumsObject[key].symbol,
        gameBankSum: sumsObject[key].gameBankSum,
        betsum: sumsObject[key].betsum,
        winSum: sumsObject[key].winSum,
        gainLossAmountSum: sumsObject[key].gainLossAmountSum,
        cumulativeJackpotSum: sumsObject[key].cumulativeJackpotSum,
      };
    });
    console.log(this.sumsArray)
    return this.sumsArray;
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

  // gamesrowClick(even:any) {
  //   this.gamespopup = true;
  //   this.subGame =[];
  //   console.log(even);
  //   this.subGame.push({
  //     GameName:even.gameName,
  //     Currency:even.wallet,
  //     Sessions:even.sessionsCount,
  //     payoutPercent:even.payoutPercent,
  //     casinoGainPercent:even.casinoGainPercent,
  //     gameBank:even.gameBank.value,
  //     bet:even.bet.value,
  //     win:even.win.value,
  //     gainLossAmount:even.gainLossAmount.value,
  //     realPayoutPercent:even.realPayoutPercent,
  //     gameJackpotSum:even.gameJackpotSum.value
  //   })
  //   console.log(this.subGame)
  // }
  // gamesClick(data:any){
  //   this.subGame =[];
  //   console.log(data);
  //   this.subGame.push({
  //     GameName:data.gameName,
  //     Currency:data.wallet,
  //     Sessions:data.sessionsCount,
  //     payoutPercent:data.payoutPercent,
  //     casinoGainPercent:data.casinoGainPercent,
  //     gameBank:data.gameBank.value,
  //     bet:data.bet.value,
  //     win:data.win.value,
  //     gainLossAmount:data.gainLossAmount.value,
  //     realPayoutPercent:data.realPayoutPercent,
  //     gameJackpotSum:data.gameJackpotSum.value
  //   })
  //   console.log(this.subGame)
  // }
  // openGamesPop(){
  //   if(this.subGame.length != 0){
  //     this.gamespopup = true;
  //   }else {
  //     this.gamespopup = false;
  //   }
  // }
  // closePopup(){
  //   this.gamespopup = false;
  // }

  onClick(event: any) {
    this.gamespopup = true;
    console.log(event)
    this.subGame = this.gameslist[event]
    console.log(this.subGame)
    this.editGameParameters()
  }

  closePopup() {
    this.gamespopup = false;
  }

  editGameParameters() {
    let body = {
      gameName: "casino"
    }
    this.CasinoGamesService.GamesgetGameParametersWizardDataList(body).subscribe((data) => {
      console.log(data)
    })
    this.CasinoGamesService.listGameParametersPresets(body).subscribe((data) => {
      console.log(data)
    })
  }

  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'gameslistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'gameslistExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "casinoGamesList")
  }
}
