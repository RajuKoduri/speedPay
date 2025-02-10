import { Component, OnInit } from '@angular/core';
import { CashierService } from 'src/app/source/Cashier.service';
@Component({
  selector: 'app-p2p-referring-settings',
  templateUrl: './p2p-referring-settings.component.html',
  styleUrls: ['./p2p-referring-settings.component.css']
})
export class P2pReferringSettingsComponent implements OnInit {
  location: any;
  playerExplorer: boolean = false;
  playerguid: any;
  PlayerName: any;

  constructor(private CashierService: CashierService) { }

  ngOnInit(): void {
    this.PlayerExplorerCheck()
  }
  PlayerExplorerCheck() {
    // this.location = window.location.pathname
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;

    if (this.location == "/playerexplorer/p2pReferringSettings") {
      this.playerExplorer = true
      this.PlayerGuid()
      console.log(this.playerExplorer)
    } else {
      this.playerExplorer = false
      console.log(this.playerExplorer)
    }
  }

  PlayerGuid() {
    let Playerguid = sessionStorage.getItem('Playerguid')
    let PlayerName = sessionStorage.getItem('PlayerName')
    console.log(Playerguid)
    if (Playerguid) {
      this.playerguid = JSON.parse(Playerguid);
      console.log(this.playerguid)
    }
    if (PlayerName) {
      this.PlayerName = JSON.parse(PlayerName);
    }
  }
  getPlayersReferringSettings() {

    if (!this.playerExplorer) {
      let body = {}
      this.CashierService.getReferringSettings(body).subscribe((data) => {
        console.log(data);
      })
    } else {
      let body = {}
      this.CashierService.getPlayersReferringSettings(body).subscribe((data) => {
        console.log(data);
      })
    }
  }
}
