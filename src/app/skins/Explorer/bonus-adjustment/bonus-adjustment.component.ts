import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonus-adjustment',
  templateUrl: './bonus-adjustment.component.html',
  styleUrls: ['./bonus-adjustment.component.css']
})
export class BonusAdjustmentComponent implements OnInit {
  PlayerName: any;
  wallettypelist: any;
  currencys: any = [];
  selectedCurrency: any;
  currentGMTTime: any;
  PlayerguidList: any;
  visibleCahOutList: any;
  WalletList: any = [];
  PlayerBalnce: any;
  Amount: any=0;
  BonussuccessPopUp: boolean = false;
  submitted: boolean = false;

  constructor(private PlayerServiceService: PlayerServiceService, private router: Router, private datePipe: DatePipe) {
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
              this.selectedCurrency = this.WalletList[0].guid
            }
          }
          console.log(this.selectedCurrency)
          // console.log(this.WalletList[0].guid)
          // console.log(this.visibleCahOutList[i].wallets[j])
        }
      }
      this.getPlayersBalances();
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

  GetPlayerName() {
    let PlayerName = sessionStorage.getItem("PlayerName");
    // let PlayerName = localStorage.getItem("PlayerName");
    if (PlayerName) {
      this.PlayerName = JSON.parse(PlayerName)
    }
  }
  Playerguid() {
    const Playerguid = sessionStorage.getItem('Playerguid')
    // const Playerguid = localStorage.getItem('Playerguid')
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
        console.log(this.wallettypelist[i])
        // } else {
        // this.currencys.push(this.wallettypelist[i])
        // }
      }
      console.log(this.currencys)
      // this.selectedCurrency = this.currencys[0].guid
    }
  }
  errorcheck() {
    if ((this.PlayerBalnce[0].bonus.value + (this.Amount)) >= 0) {
      this.submitted = false
    } else {
      this.submitted = true
    }
  }

  onFormSubmit() {
    // if (this.Amount > 0)
      if ((this.PlayerBalnce[0].bonus.value + (this.Amount)) >= 0) {
        this.submitted = false
        let body = {
          "adjustment": {
            "value": this.Amount,
            "wallet": this.selectedCurrency
          },
          "playerGuids": [
            this.PlayerguidList
          ]
        }
        console.log(body)
        this.PlayerServiceService.setPlayerBonusAdjustment(body).subscribe((data) => {
          console.log(data);
          if (data.changedObjectList) {
            this.BonussuccessPopUp = true

          }
        })
      } else {
        this.submitted = true
      }

    //   console.log(this.Amount < this.PlayerBalnce[0].bonus.value)
    //   console.log(this.Amount)
    //   console.log(this.PlayerBalnce[0].bonus.value)
    //   console.log(this.PlayerBalnce[0].bonus.value + (this.Amount))
    //   if (this.Amount > this.PlayerBalnce[0].bonus.value) {
    //     alert("3")
    //     this.submitted = true
    //   }
    // }
  }

  onFormSubmit01() {
    if (this.Amount > 0) {
      this.submitted = false
      alert("1")
    } else if (this.Amount > this.PlayerBalnce[0].bonus.value) {
      alert("2")
      this.submitted = true
    }
    else {
      if (this.Amount == 0) {

      }
      alert("3")
      let body = {
        "adjustment": {
          "value": this.Amount,
          "wallet": this.selectedCurrency
        },
        "playerGuids": [
          this.PlayerguidList
        ]
      }
      console.log(body)
      // this.PlayerServiceService.setPlayerBonusAdjustment(body).subscribe((data) => {
      //   console.log(data);
      //   if (data.changedObjectList) {
      //     this.BonussuccessPopUp = true

      //   }
      // })
    }
  }
  SuccessPop() {
    this.BonussuccessPopUp = false
    // window.location.reload()
    this.router.navigate(['/playerexplorer/PlayersSummary'])
  }
}
