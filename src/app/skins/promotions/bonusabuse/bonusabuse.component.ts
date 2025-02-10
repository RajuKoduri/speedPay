import { Component, OnInit } from '@angular/core';
import { PromotionalServiceService } from 'src/app/source/promotional-service.service';
@Component({
  selector: 'app-bonusabuse',
  templateUrl: './bonusabuse.component.html',
  styleUrls: ['./bonusabuse.component.css']
})
export class BonusabuseComponent implements OnInit {
  abusedata: any;
  showing: boolean = true;
  isAbuseSettingPopup: boolean = false;
  isAbuseEnable:any;
  gameSettingsList: any;
  gamesList: any[] = [];
  filterGamesList: any[] = [];
  gamesListObj: any = {
    rummyGames: [],
    casinoGames: [],
    pokerGames: [],
    remoteGames: []
  }
  walletFormatsList: any;
  isExpanded: { [key: string]: boolean } = {};
  bonusMultiplier: any;
  minBetToUnlockBonus: any;
  enabledMinBet:any;

  constructor(private promotionalServiceService: PromotionalServiceService) { }

  ngOnInit(): void {
    let body = {}
    this.promotionalServiceService.bounsabuse(body).subscribe((data) => this.bounsabusedata(data))
    this.GamesConfig()
    this.walletFormats()
    for (let key in this.gamesListObj) {
      this.isExpanded[key] = true;
    }
  }

  toggleAccordion(key: string) {
    this.isExpanded[key] = !this.isExpanded[key];
  }
  bounsabusedata(data: any) {
    console.log(data)
    this.abusedata = data.objectList
    this.gameSettingsList = this.abusedata[0].gameSettings
    console.log(this.abusedata[0].gameSettings)
    this.isAbuseEnable = this.abusedata[0].abuseEnabled
    this.bonusMultiplier = this.abusedata[0].bonusMultiplier
    this.minBetToUnlockBonus = this.abusedata[0].casinoMinBet
    this.enabledMinBet = this.abusedata[0].enabledMinBet
    this.modifyData()
  }
  Abusearrow() {
    this.showing = !this.showing
  }

  abuseSettingPopup() {
    this.isAbuseSettingPopup = !this.isAbuseSettingPopup
  }

  walletFormats() {
    let walletFormats = localStorage.getItem("walletFormats")
    if (walletFormats) {
      this.walletFormatsList = JSON.parse(walletFormats)
    }

    
  }

  GamesConfig() {
    let GamesConfig = localStorage.getItem("GamesConfig")
    if (GamesConfig) {
      let GamesConfigList = JSON.parse(GamesConfig)
      console.log("GamesConfig", GamesConfigList)

      let gamesList = GamesConfigList?.games?.map((list: any) => list)

      let x = GamesConfigList.remoteSystemGames.map((list: any) => {
        return list.games.map((game: any) => {
          return game
        })
      })

      console.log(x)
      console.log(gamesList)

      this.gamesList = [...gamesList, ...x.flat()]
      console.log(this.gamesList)
    }
  }

  objectKey(obj:any){
    return Object.keys(obj)
  }

  modifyData() {
    // this.filterGamesList = this.gamesList.filter(game =>
    //   this.gameSettingsList.some((setting: any) => game.name === setting.gameName)
    // );
    this.filterGamesList = this.gameSettingsList.filter((setting:any) =>
      this.gamesList.some((game: any) =>{
        setting.caption = game.caption
        setting.wallet = game.wallet
         return game.name === setting.gameName}) );

    console.log('filterGamesList', this.filterGamesList)

    this.filterGamesList.forEach((list) => {
      const matchingFormat = this.walletFormatsList.find(
        (format:any) => list.wallet.lowLong === format.guid.lowLong
      );
      
      if (matchingFormat?.currencyCode) {
        list.currencyCode = matchingFormat.currencyCode;
      }
    });

    this.filterGamesList.forEach(game => {
      if (game.gameName.startsWith('RUMMY')) {
        this.gamesListObj.rummyGames.push(game)
      } else if (game.gameName.startsWith('POKER')) {
        this.gamesListObj.pokerGames.push(game)
      } else if (game.gameName.startsWith('CASINO')) {
        this.gamesListObj.casinoGames.push(game)
      } else {
        this.gamesListObj.remoteGames.push(game)
      }
    });

    console.log(this.gamesListObj)
  }

  setBonusAbuseSettings(){

    let selectedGames = this.filterGamesList.map((list)=>{
      let {caption,currencyCode,...rest} = list
      return rest
    })

    let body = {
      "cashMultiplier": this.abusedata[0].cashMultiplier,
      "bonusMultiplier": this.bonusMultiplier,
      "abuseEnabled": this.isAbuseEnable,
      "casinoMinBet": this.minBetToUnlockBonus,
      "enabledMinBet": this.enabledMinBet,
      "gameSettings": selectedGames,
      "guid": this.abusedata[0].guid,
      "objState": 0
    }
    this.promotionalServiceService.setBonusAbuseSettings(body).subscribe((data)=>{
      console.log(data)
    })
  }


}
