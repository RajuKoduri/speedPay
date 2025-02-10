import { Component, OnInit } from '@angular/core';
import { CashierService } from 'src/app/source/Cashier.service';
@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.css']
})
export class EmailSettingsComponent implements OnInit {
  playerguid: any;
  PlayerSettings: any;
  settingspopup: boolean = false;
  copyPlayerObj: any;
  loader: boolean = false;
  Spinner: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;

  constructor(private CashierService: CashierService) { }

  ngOnInit(): void {
    this.PlayerGuid()
    this.getPlayerSettings()
  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem('Playerguid')
    console.log(Playerguid)
    if (Playerguid) {
      this.playerguid = JSON.parse(Playerguid);
      console.log(this.playerguid)
    }
  }

  getPlayerSettings() {
    this.loader = true;
    this.PlayerSettings = false;
    let body = {
      ids: {
        firstRecord: 0,
        maxCountRecord: 100,
        idList: [this.playerguid]
      },

    };
    this.CashierService.getPlayerSettings(body).subscribe(data => {
      console.log(data);
      this.loader = false;
      this.PlayerSettings = data.objectList;
      this.ResultCount = data.resultCount;
      this.rowsOnthePage = data.objectList.length;
    })
  }
  changesettingspopup(i: any) {
    this.settingspopup = true;
    this.copyPlayerObj = this.PlayerSettings[i]
  }
  changeSettings(type: any) {
    console.log(type)
    console.log(this.copyPlayerObj)
    let body = {
      playerGuid: this.playerguid,
      value: this.copyPlayerObj
    }
    const keysToRemoves = ['preferredWallet', 'compPointsLevel'];
    let keys = Object.keys(this.copyPlayerObj.player)
      .filter(key => !keysToRemoves.includes(key))
    // .reduce((obj, key) => {
    //     obj[key] = player[key];
    //     return obj;
    // }, {})
    // console.log(keys)

    const keysToRemove = ['preferredWallet', 'compPointsLevel'];
    let selectedKeysObject: any = {};
    Object.keys(this.copyPlayerObj).forEach((key) => {
      if (key === 'player') {
        selectedKeysObject[key] = {};
        Object.keys(this.copyPlayerObj[key]).forEach((playerKey) => {
          if (!keysToRemove.includes(playerKey)) {
            selectedKeysObject[key][playerKey] = this.copyPlayerObj[key][playerKey];
          }
        });
      } else {
        selectedKeysObject[key] = this.copyPlayerObj[key];
      }
    });
    console.log(selectedKeysObject);


    if (type == 'yes') {
      this.Spinner = true;
      this.CashierService.setPlayerSettings(body).subscribe(data => {
        console.log(data);
        this.settingspopup = false;
        this.Spinner = false;
        this.getPlayerSettings();

      });
    } else {
      this.settingspopup = false;
    }
  }

}
