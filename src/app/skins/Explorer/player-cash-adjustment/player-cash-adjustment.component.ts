import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-player-cash-adjustment',
  templateUrl: './player-cash-adjustment.component.html',
  styleUrls: ['./player-cash-adjustment.component.css']
})
export class PlayerCashAdjustmentComponent implements OnInit {
  @Input() istmAdjust: boolean = false;
  @Output() showHidePopup = new EventEmitter();

  PlayerName: any;
  wallettypelist: any;
  currencys: any = [];
  selectedCurrency: any;
  currentGMTTime: any;
  PlayerguidList: any;
  PlayerBalnce: any;
  visibleCahOutList: any;
  WalletList: any = [];
  Amount: any = 0;
  comment: any;
  submitted: boolean = false;
  PlayerCashAdjustsuccessPopUp: boolean = false;

  constructor(private PlayerServiceService: PlayerServiceService, private datePipe: DatePipe, private router: Router) {
    const currentDateTime = new Date();
    // this.currentGMTTime = now.toUTCString();
    // this.currentDateTime = now.toUTCString();
    this.currentGMTTime = this.datePipe.transform(currentDateTime, 'MM/dd/yyyy HH:mm:ss a', 'GMT');

  }


  ngOnInit(): void {
    this.GetPlayerName();
    this.Playerguid();
    this.walletTypes();
    this.getPlayerVisibleCashWallets();
    console.log(this.istmAdjust)
  }
  GetPlayerName() {
    let PlayerName = sessionStorage.getItem("PlayerName");
    if (PlayerName) {
      this.PlayerName = JSON.parse(PlayerName)
    }
  }
  Playerguid() {
    const Playerguid = sessionStorage.getItem('Playerguid')
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }
  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].faceWallet == true) {
        this.currencys.push(this.wallettypelist[i])
        // console.log(this.wallettypelist[i])
        // } else {
        // this.currencys.push(this.wallettypelist[i])
        // }
      }
      console.log(this.currencys)
      // this.selectedCurrency = this.currencys[0].guid
    }
  }


  getPlayerVisibleCashWallets() {
    let body = this.PlayerguidList
    this.PlayerServiceService.getPlayerVisibleCashWallets(body).subscribe((data) => {
      console.log(data);
      this.visibleCahOutList = data.objectList;
      for (let i = 0; i < this.visibleCahOutList.length; i++) {
        for (let j = 0; j < this.visibleCahOutList[i].wallets.length; j++) {
          for (let k = 0; k < this.currencys.length; k++) {
            if (this.visibleCahOutList[i].wallets[j].lowLong == this.currencys[k].guid.lowLong) {
              console.log(this.currencys[k])
              this.WalletList.push(this.currencys[k])
              console.log(this.WalletList)
              this.selectedCurrency = this.WalletList[0]?.guid
            }
          }
          console.log(this.visibleCahOutList[i].wallets[j])
        }
      }
      this.getPlayersBalances()
    })

  }
  getPlayersBalances() {
    let body1 = {
      "walletGuid": this.selectedCurrency,
      "idList": {
        "idList": [this.PlayerguidList]
      }
    }
    this.PlayerServiceService.getPlayersBalances(body1).subscribe((data) => {
      console.log(data);
      this.PlayerBalnce = data.objectList
    })
  }

  errorcheck() {
    if (!this.istmAdjust) {
      if ((this.PlayerBalnce[0].cash.value + (this.Amount)) >= 0) {
        this.submitted = false
      } else {
        this.submitted = true
      }
    } else {
      if ((this.PlayerBalnce[0].tournamentMoney.value + (this.Amount)) >= 0) {
        this.submitted = false
      } else {
        this.submitted = true
      }
    }
  }

  onFormSubmit() {
    // this.submitted = false
    this.errorcheck()
    if (!this.istmAdjust) {
      if ((this.PlayerBalnce[0].cash.value + (this.Amount)) >= 0) {
        let body = {
          "adjustment": {
            "value": this.Amount,
            "wallet": this.selectedCurrency,
          },
          "comment": this.comment,
          "playerGuids": [this.PlayerguidList],
        }
        console.log(body)
        this.PlayerServiceService.setPlayerCashAdjustment(body).subscribe((data) => {
          console.log(data);
          if (data.changedObjectList) {
            this.PlayerCashAdjustsuccessPopUp = true

          }
        })
      }
    } else {
      if ((this.PlayerBalnce[0].tournamentMoney.value + (this.Amount)) >= 0) {
    
        let Tmbody = {
          "amount": {
            "value": this.Amount,
            "wallet": this.selectedCurrency,
          },
          "playerGuid": this.PlayerguidList,

        }
        this.PlayerServiceService.adjustTournamentMoney(Tmbody).subscribe((data) => {
          console.log(data);
        })
      }
    }
  }
  SuccessPop() {
    this.PlayerCashAdjustsuccessPopUp = false
    if (this.istmAdjust) {
      this.showHidePopup.emit(false)
    }
    // window.location.reload()
    this.router.navigate(['/playerexplorer/PlayersSummary'])
  }
  tmpopupClose() {
    this.showHidePopup.emit(false)
  }
}