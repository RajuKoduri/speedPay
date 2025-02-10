import { Component, OnInit } from '@angular/core';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  PlayerComents: any;
  playerguid: any;
  loader: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  seletedComment: any;
  SeletedIconIndex: any;
  popupArrow: boolean = false;
  conformationPopup: boolean = false;
  editPopup: boolean = false;

  constructor(private PlayerServiceService: PlayerServiceService, private DateTimePipe: DateTimePipe) { }

  ngOnInit(): void {
    this.PlayerGuid()
    this.getPlayerComments()
  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem('Playerguid')
    console.log(Playerguid)
    if (Playerguid) {
      this.playerguid = JSON.parse(Playerguid);
      console.log(this.playerguid)
    }
  }
  getPlayerComments() {
    this.popupArrow = !this.popupArrow
    this.loader = true;
    this.PlayerComents = false;
    let body = {
      ids: {
        firstRecord: 0,
        maxCountRecord: 100,
        idList: [this.playerguid]
      },
    };
    this.PlayerServiceService.getPlayerComments(body).subscribe(data => {
      console.log(data);
      this.loader = false;
      this.PlayerComents = data.objectList;
      this.ResultCount = data.resultCount;
      this.rowsOnthePage = data.objectList.length;

    });
  }
  transformDate(date: string): any {
    if (date != undefined) {
      let c = this.DateTimePipe.transforminingDispalyDate(date);
      return (c)

    }
  }
  openPopUp(index: any): void {
    console.log(index)
    this.seletedComment = (JSON.parse(JSON.stringify(this.PlayerComents[index])))
    this.editPopup = true;
  }
  editNdDelete(type: any, conformation: any): void {
    if (conformation == 'yes') {
      let { date, guid, ...rest } = this.seletedComment
      this.seletedComment.date = this.seletedComment.date.slice(0, -7)
      let body = {
        comment: this.seletedComment,
        tGuid: this.seletedComment.player.guid,
      }
      if (type == 'edit') {
        this.PlayerServiceService.setPlayerComment(body).subscribe((data: any) => {
          console.log(data);
          if (data.changedObjectList) {
            this.getPlayerComments()
            this.seletedComment = '';
            this.editPopup = false;
          }
        })
      } else if (type == 'delete') {
        this.PlayerServiceService.delPlayerComment(body).subscribe((data: any) => {
          console.log(data);
          if (data.changedObjectList) {
            this.getPlayerComments()
            this.conformationPopup = false
          }
        })
      }
    } else {
      this.seletedComment = '';
      this.conformationPopup = false
    }
  }
  showmanu(i: any, playerId: any) {
    console.log(i)
    console.log(playerId)
    this.SeletedIconIndex = i
    this.popupArrow = !this.popupArrow
  }
  setPlayerActions(player: any, i: any) {
    console.log(player, i)
    this.seletedComment = (JSON.parse(JSON.stringify(this.PlayerComents[i])))
    this.conformationPopup = true
    this.popupArrow = !this.popupArrow
  }
}
