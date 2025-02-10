import { Component, OnInit } from '@angular/core';
import { CashierService } from 'src/app/source/Cashier.service';

@Component({
  selector: 'app-p2p-transfer-limits',
  templateUrl: './p2p-transfer-limits.component.html',
  styleUrls: ['./p2p-transfer-limits.component.css']
})
export class P2pTransferLimitsComponent implements OnInit {
  playerguid: any;
  location: any;
  loader: boolean = false;
  playerExplorer: boolean = false;

  constructor(private CashierService: CashierService) { }

  ngOnInit(): void {
    this.PlayerExplorerCheck()
  }
  PlayerExplorerCheck() {
    // this.location = window.location.pathname
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;

    if (this.location == "/playerexplorer/P2pTransferLimits") {
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
    console.log(Playerguid)
    if (Playerguid) {
      this.playerguid = JSON.parse(Playerguid);
      console.log(this.playerguid)
    }
  }
  getUserTransferLimits() {
    this.loader = true;
    if (!this.playerExplorer) {
      let body = {}
      this.CashierService.getCommonTransferLimits(body).subscribe((data) => {
        console.log(data);
      })
    } else {
      let body = {
        firstRecord: 0,
        maxCountRecord: 100,
        idList: [this.playerguid]
      }
      this.CashierService.getUserTransferLimits(body).subscribe((data) => {
        console.log(data);
      })
    }
  }
}
