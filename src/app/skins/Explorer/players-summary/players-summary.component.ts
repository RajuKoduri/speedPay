import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
@Component({
  selector: 'app-players-summary',
  templateUrl: './players-summary.component.html',
  styleUrls: ['./players-summary.component.css']
})
export class PlayersSummaryComponent implements OnInit {
  PlayerguidList: any;
  PlayersSummaryData: any;
  playerStatusList: any;

  constructor(private PlayerServiceService: PlayerServiceService,private DateTimePipe: DateTimePipe,) { }

  ngOnInit(): void {
    this.palyerstatus();
    this.Playerguid();
    this.getPlayersSummary();

    const queryParams = new URLSearchParams(window.location.search);
    const param1Value = queryParams.get('param1');
    const param2Value = queryParams.get('param2');

    console.log('param1:', param1Value);
    console.log('param2:', param2Value);

  }


  palyerstatus() {
    const playerstatus = localStorage.getItem('palyerstatus')
    if (playerstatus) {
      this.playerStatusList = JSON.parse(playerstatus)
    }
    console.log("playerStatusList", this.playerStatusList)
  }

  Playerguid() {
    let Playerguid = sessionStorage.getItem("Playerguid");
    // let Playerguid = sessionStorage.getItem("playerdatainfo")
 
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }

  getPlayersSummary() {
    let body = {
      "idList": [this.PlayerguidList]
    }
    console.log(body)
    this.PlayerServiceService.getPlayersSummary(body).subscribe((data) => {
      // console.log(data)
      this.PlayersSummaryData = data.objectList;
      console.log(this.PlayersSummaryData)
      for (let i = 0; i < this.PlayersSummaryData.length; i++) {
        for (let j = 0; j < this.playerStatusList.length; j++) {
          console.log(this.PlayersSummaryData[i].player.status.lowLong == this.playerStatusList[j].guid.lowLong)
          console.log(this.PlayersSummaryData[i].player.status.lowLong)
          console.log(this.playerStatusList[j].guid.lowLong)
          if (this.PlayersSummaryData[i].player.status.lowLong == this.playerStatusList[j].guid.lowLong) {
            this.PlayersSummaryData[i].player.status = this.playerStatusList[j].value
          }
        }

      }
    })
  }

  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    return (c)
  }
}
