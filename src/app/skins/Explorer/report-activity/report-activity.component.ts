import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';

@Component({
  selector: 'report-activity',
  templateUrl: './report-activity.component.html',
  styleUrls: ['./report-activity.component.css']
})
export class ReportActivityComponent implements OnInit {
  @Input() userInfo: any
  @Input() userType: any
  @Output() notifyParent = new EventEmitter
  remoteSystemActivitiesList: any;
  selectedsystem: any;
  selectedActivity: any;
  walletTypeList: any;
  walletDescription: any;
  selectedWallet: any;
  selectdAmount: any = 0;
  activities: any[] = [];
  isSubmitted: boolean = false;
  comment: any;
  isValidSelectedAmount: boolean = true;
  systemPayload: any;
  playerPayload: any;
  walletFormatList: any;
  currencyCode: any;
  playerLogin: any;
  playerFindData: any;

  constructor(private playerService: PlayerServiceService, private agentControlService: AgentControlService) { }

  ngOnInit(): void {
    console.log(this.userType, this.userInfo)

    this.remoteSystemActivities()
    this.walletTypes()
    this.selectedActivity = this.activities[0].guid
    console.log(this.selectedActivity)

    if (this.userInfo) {
      let { status, ...rest } = this.userInfo.player
      let playerPayload = rest

      this.playerPayload = { ...playerPayload, status: playerPayload.statusguid }
      delete this.playerPayload.statusguid

      console.log(this.playerPayload)
    }
  }

  onSystemChange(systemGuid: any) {
    const selectedSystem = this.remoteSystemActivitiesList.find((system: any) =>
      system.system.guid.lowLong === systemGuid.lowLong && system.system.guid.hiLong === systemGuid.hiLong
    );

    if (selectedSystem) {
      this.activities = [
        ...(selectedSystem.nonGameActivities || []),
        ...(selectedSystem.gameActivities || [])
      ];

    } else {
      this.activities = [];
    }
    console.log(selectedSystem)
    // let { guid, objState, authenticateReturnsPlayersDefaultWallet, name, ...res } = selectedSystem.system
    // this.systemPayload = { guid, objState, authenticateReturnsPlayersDefaultWallet, name }
    // console.log(this.systemPayload)
    this.systemPayload = selectedSystem.system

    this.selectedActivity = this.activities[0].guid
  }

  activityChange() {
    console.log(this.selectedActivity)
  }

  activityPopup() {
    this.notifyParent.emit()
  }


  remoteSystemActivities() {
    const remoteSystemActivities = localStorage.getItem("remoteSystemActivities")
    if (remoteSystemActivities) {
      this.remoteSystemActivitiesList = JSON.parse(remoteSystemActivities)
      console.log("remoteSystemActivitiesList", this.remoteSystemActivitiesList)
    }
    this.selectedsystem = this.remoteSystemActivitiesList[0].system.guid
    this.onSystemChange(this.selectedsystem);
    console.log(this.selectedsystem)
    // this.remoteSystemActivitiesList.map((list:any)=>{
    //   console.log(list.system.name)
    // })
  }

  walletTypes() {
    // let walletFormatList: any
    let walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      this.walletTypeList = JSON.parse(walletTypes)
    }

    let walletFormats = localStorage.getItem("walletFormats")
    if (walletFormats) {
      this.walletFormatList = JSON.parse(walletFormats)
    }

    this.walletTypeList = this.walletTypeList.filter((list: any) => list.clubGameWallet && list.description != 'Play Money')

    this.walletTypeList.forEach((list: any) => {
      if (this.userInfo && (list.guid.lowLong == this.userInfo.player.preferredWallet.lowLong)) {
        this.selectedWallet = list.guid
        console.log(this.selectedWallet)
      } else {
        this.selectedWallet = this.walletTypeList[0].guid
      }
    })

    // this.walletFormatList.forEach((list: any) => {
    //   if (this.userInfo.player.preferredWallet.lowLong == list.guid.lowLong) {
    //     if (list.currencyCode) {
    //       this.userInfo.currencyCode = list.currencyCode
    //     }
    //   }
    // })

    this.onWalletChange()

  }

  onWalletChange() {
    this.walletFormatList.forEach((list: any) => {
      if (list.guid.lowLong == this.selectedWallet.lowLong) {
        this.currencyCode = list.currencyCode
      }
    })
  }

  onPlayerFind() {
    let body = {
      'login': [this.playerLogin],
      'returnTotalDebt': false,
      userTypeGuid: { "hiLong": 0, "lowLong": 0 },
    }
    this.agentControlService.getUserByLogin(body).subscribe((data: any) => {
      console.log(data)
      this.playerFindData = data.objectList[0]
    })
  }

  onSubmit() {
    this.isSubmitted = true
    let body = {
      // activity: {
      // 'objState': 0,
      'activity': this.selectedActivity,
      'amount': { value: this.selectdAmount, wallet: this.selectedWallet },
      'bets': this.userInfo?.bets,
      'bonusBets': this.userInfo?.bonus,
      'comment': this.comment,
      'houseRevenue': this.userInfo?.houseDebtValue,
      'player': this.playerPayload,
      'system': this.systemPayload,
      'wallet': this.selectedWallet,
      'wins': undefined,
      "compPoints": this.userInfo?.compPoints,
      "status": this.userInfo?.status,
      "guid": this.userInfo?.guid
      // }
    }

    if (!this.isValidSelectedAmount) {
      this.playerService.setRemoteActivity(body).subscribe((res: any) => console.log(res))
    }
  }

  onInputAmountChange(event: any) {
    console.log(this.selectdAmount)
    if (this.selectdAmount == '0' || this.selectdAmount == '') {
      this.isValidSelectedAmount = true
    } else {
      this.isValidSelectedAmount = false
    }
  }

}
