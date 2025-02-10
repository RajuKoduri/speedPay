import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { DatePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { PlayerServiceService } from '../../../source/PlayerService.service';
import * as moment from 'moment';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Output() showHidePopupp = new EventEmitter();
  @Input() showplayername: any

  datePipe: DatePipe = new DatePipe('en-US');
  PlayerInfo: any;
  comment: any;
  transformDate: any


  constructor(private CookieService: CookieService, private PlayerServiceService: PlayerServiceService) { }

  ngOnInit(): void {
    console.log("showplayername", this.showplayername);
    this.PlayerExplorerData()
    this.getFormattedDate()
  }
  PlayerExplorerData() {
    let PlayerExplorerData = sessionStorage.getItem("PlayerExplorerData");
    if (PlayerExplorerData) {
      this.PlayerInfo = JSON.parse(PlayerExplorerData)
    }
    console.log(this.PlayerInfo)
  }
  UserName() {
    let UserName = this.CookieService.get('UserName')
    return UserName
  }
  getFormattedDate() {
    var date = new Date();
   this.transformDate = this.datePipe.transform(date, 'dd-MM-yyyy hh:mm:ss a', '+0530');
    // return this.transformDate;
  }

  UTCformat() {
    // const isoDate = this.datePipe.transform(this.transformDate, 'yyyy-dd-MMTHH:mm:ss');

    // console.log(isoDate + 'Z')
    // // return (isoDate + 'Z')

    const dateStr:any = this.transformDate; // "13-08-2024 10:26:26 AM"
    const parsedDate = moment(dateStr, 'DD-MM-YYYY hh:mm:ss A');
    const isoDate = parsedDate.format('YYYY-MM-DDTHH:mm:ss');

    console.log(isoDate + 'Z');
    return (isoDate + 'Z');
  }

  onFormSubmit() {
    const body = {
      // playerName: this.showplayername,
      tGuid: this.PlayerInfo.guid,
      comment: {
        objState: 0,
        admin: this.UserName(),
        comment: this.comment,
        date: this.UTCformat(),
        player: {
          guid: this.PlayerInfo.player.guid,
          objState: 0,
          account: this.PlayerInfo.player.account,
          alias: this.PlayerInfo.player.alias,
          compPointsLevel: {
            objState: 0,
            guid: this.PlayerInfo.levelInfo.compPointsLevelGuid,
            name: this.PlayerInfo.levelInfo.compPointsLevelName,
            priority: 0
          },
          fullName: this.PlayerInfo.player.fullName,
          network: this.PlayerInfo.player.network,
          nickName: this.PlayerInfo.player.nickName,
          shortId: this.PlayerInfo.player.shortId,
          status: this.PlayerInfo.status,
        }
      }
    };
    console.log('comment body:', body);
    this.PlayerServiceService.setPlayerComment(body).subscribe((data: any) => {
      console.log(data)
      this.closepopUP();
    })

  }
  closepopUP() {
    this.showHidePopupp.emit(false)
  }


}
