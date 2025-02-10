import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { relativeTimeThreshold } from 'moment';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { ToolsService } from 'src/app/source/Tools.service';

@Component({
  selector: 'player-restrict-and-fraud',
  templateUrl: './player-restrict-and-fraud.component.html',
  styleUrls: ['./player-restrict-and-fraud.component.css']
})
export class PlayerRestrictAndFraudComponent implements OnInit {
  @Input() playerData: any
  @Input() playerActionType: any
  @Output() notifyParent = new EventEmitter;
  restrictList: any;
  fraudList: any
  checkedList: any[] = [];
  fraudCheckedList: any[] = [];
  isConformPopup: boolean = false;
  blackListRecords: any;
  TemplateCreationTypesList: any;
  usertypeList: any;
  actionTypes: any;
  mailTempData: any;
  adjustmentValue: number = 0
  selectedMailTemp: any;
  cancelRelationship: boolean = false;
  sendUserNotification: boolean = false;
  blockUser: boolean = true;
  cancelActiveCashouts: boolean = false;
  isValidAdjustmentValue: boolean = false;
  sendAgentOrAffiliateNotification: boolean = true;

  constructor(private PlayerserviceService: PlayerServiceService, private toolService: ToolsService) { }

  ngOnInit(): void {
    console.log(this.playerActionType, this.playerData)

    this.checkedList = Array(this.restrictList?.length).fill(false)
    this.fraudCheckedList = Array(this.blackListRecords?.length).fill(false)
    this.TemplateCreationTypes()
    this.usertype()
    this.onRestrictOrFraud()
  }

  usertype() {
    let usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log('usertypeList', this.usertypeList)

    for (const list of this.usertypeList) {
      for (const temp of this.TemplateCreationTypesList) {
        const { lowLong } = this.playerData.affiliate?.type || {};
        if (lowLong === list.guid.lowLong) {
          if ((list.value === "Agent" && temp.value === "Agent Notification (fraud player)") ||
            (list.value === "Affiliate" && temp.value === "Affiliate Notification (fraud player)")) {
            this.actionTypes = { guid: temp.guid, typeName: list.value };
            console.log(this.actionTypes);
          }
        }
      }
    }
  }

  TemplateCreationTypes() {
    let TemplateCreationTypes = localStorage.getItem("TemplateCreationTypes")
    if (TemplateCreationTypes) {
      this.TemplateCreationTypesList = JSON.parse(TemplateCreationTypes)
    }
    console.log('TemplateCreationTypesList', this.TemplateCreationTypesList)
  }

  onRestrictOrFraud() {
    let body = {
      "tGuid": this.playerData.player.guid
    }
    if (this.playerActionType == "Restrict") {
      this.PlayerserviceService.prepareRestrictPlayer(body).subscribe((data: any) => {
        console.log(data)
        this.restrictList = data.objectList
        console.log(this.restrictList)
      })
    } else {
      this.PlayerserviceService.prepareMarkAsFraud(body).subscribe((data: any) => {
        console.log(data)
        this.fraudList = data.objectList
        this.blackListRecords = this.fraudList[0].blackListRecords
      })

      if (this.actionTypes) {
        // let body = {
        //   "type":this.actionTypes.guid
        // }
        this.toolService.getMailTemplatesByType(this.actionTypes.guid).subscribe((data: any) => {
          console.log(data)
          this.mailTempData = data.objectList
          this.selectedMailTemp = this.mailTempData[0].guid
        })
      }
    }
  }

  closepopup(bool: any) {
    this.notifyParent.emit(bool)
  }

  isCheckedAll(isCheck: any) {
    if (isCheck == 'checkAll') {
      this.checkedList = Array(this.restrictList.length).fill(true)
    } else {
      this.checkedList = Array(this.restrictList.length).fill(false)
    }
    console.log(this.checkedList)
  }
  isFraudCheckedAll(isCheck: any) {
    if (isCheck == 'checkAll') {
      this.fraudCheckedList = Array(this.blackListRecords.length).fill(true)
    } else {
      this.fraudCheckedList = Array(this.blackListRecords.length).fill(false)
    }
    console.log(this.fraudCheckedList)
  }

  onChange() {
    console.log(this.checkedList)
    console.log(this.fraudCheckedList)
  }

  conformPopup() {
    this.isConformPopup = !this.isConformPopup
  }

  onSubmit(action: any) {
    if (action == 'restrict') {

      let list = this.restrictList.filter((list: any, i: number) => this.checkedList[i])
      let selectedRestrictList = list.map((data: any) => (
        { ...data, date: data.date.slice(0, -6) }
      ))
      console.log(selectedRestrictList)

      let body = {
        'player': this.playerData.player.guid,
        'blackListRecords': selectedRestrictList
      }
      this.PlayerserviceService.setPlayerRestrict(body).subscribe((data: any) => { this.setPlayerRestrictData(data) })
    } else {

      let list = this.blackListRecords.filter((list: any, i: number) => this.fraudCheckedList[i])
      let selectedBlackList = list.map((data: any) =>
        ({ ...data, date: data.date.slice(0, -6) }))
      console.log(selectedBlackList)
      console.log(this.selectedMailTemp)

      // let body = {
      //   'player': this.playerData.player.guid,
      //   'blackListRecords': { objectList: selectedBlackList },
      //   'cancelWebmasterRelationship': this.cancelRelationship,
      //   'sendUserNotification': this.sendUserNotification,
      //   'blockUser': this.blockUser,
      //   'cancelActiveCashouts': this.cancelActiveCashouts,
      //   // 'templateId':  this.selectedMailTemp,
      //   'templateId': this.sendAgentOrAffiliateNotification ? this.selectedMailTemp : undefined,
      //   'adjustmentValue': {
      //     value: this.adjustmentValue,
      //     wallet: this.playerData.player.preferredWallet
      //   },
        // "face": null,
        // "ip": null,
        // "ids": null,
        // "tGuid": null,
        // "language": null,
        // "tGuids": null
      // }
      let body = {
        "player": {
          "hiLong": 0,
          "lowLong": 0
        },
        "blackListRecords": {
          "objectList": [
            {}
          ]
        },
        "cancelWebmasterRelationship": false,
        "sendUserNotification": false,
        "blockUser": false,
        "cancelActiveCashouts": false,
        "adjustmentValue": {
          "wallet": {
            "hiLong": 0,
            "lowLong": 0
          },
          "value": 0.00
        },
        "templateId": {
          "hiLong": 0,
          "lowLong": 0
        },
        "face": "face_d77a33115a63",
        "ip": "ip_a946738aeb91",
        "ids": {
          "idList": [
            {
              "hiLong": 0,
              "lowLong": 0
            }
          ],
          "maxCountRecord": 0,
          "firstRecord": 0,
          "queryId": "queryId_bedf5af3a5fb"
        },
        "tGuid": {
          "hiLong": 0,
          "lowLong": 0
        },
        "language": {
          "hiLong": 0,
          "lowLong": 0
        },
        "tGuids": [
          {
            "hiLong": 0,
            "lowLong": 0
          }
        ]
      }
      this.PlayerserviceService.setPlayerMarkAsFraud(body).subscribe((data: any) => {
        console.log(data)
        if (data.changedObjectList) {
          this.isConformPopup = false
          this.closepopup(true)
        }
      })

    }
  }

  setPlayerRestrictData(data: any) {
    console.log(data)
    if (data.changedObjectList) {
      this.isConformPopup = false
      this.closepopup(true)
    }
  }

  OnadjustmentValueInp(event: any) {
    let value = event.target.value

    if (value > 0) {
      this.isValidAdjustmentValue = true
    } else {
      this.isValidAdjustmentValue = false
    }

  }

}
