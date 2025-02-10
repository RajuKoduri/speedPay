import { Component, OnInit } from '@angular/core';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-timeoutsettings',
  templateUrl: './timeoutsettings.component.html',
  styleUrls: ['./timeoutsettings.component.css']
})
export class TimeoutsettingsComponent implements OnInit {
  objList: any;
  objListInSide: any;
  showTiemoute: boolean = true;
  showtime: boolean = true;
  timeOutpopup: boolean = false
  timeoutSettingsList: any;
  TimeOutSettingsForm: FormGroup;
  buyChipsTimeout: any;
  buyinLimitTimeout: any;
  reserveSeatTimeout: any;
  newHandTimeout: any;
  showWinnersTimeout: any;
  showdownTimeout: any;
  afterJackpotHandTimeout: any;
  sitOutTime: any;
  synchronizedBreakTimeout: any;
  walletTypesList: any = [];
  SpinnwerT: boolean = false;
  constructor(private PokergamesService: PokergamesService) {
    this.TimeOutSettingsForm = new FormGroup({
      CreationDatestart: new FormControl(),
      CreationDateend: new FormControl(),
      Buychipstimeout: new FormControl(),
      Buyinlimittimeout: new FormControl(),
      Reservesettimeout: new FormControl(),
      Newhandstimeout: new FormControl(),
      Betweenhandstimeout: new FormControl(),
      ShowWinnerstimeout: new FormControl(),
      Showdowntimeout: new FormControl(),
      MaximumhandsSeconds: new FormControl(),
      Maximumhands: new FormControl(),
      BadBeatJackpot: new FormControl(),
      playMoneyResetThreshold: new FormControl(),
      playMoneyResetlimit: new FormControl(),
      synchronizedBreakTimeOut: new FormControl(),
      synchronizedBreakFrequency: new FormControl(),
      synchronizedBreakResumeDelay: new FormControl(),
      synchronizedBreakZoneMinute: new FormControl(),
      synchronizedBreakTimeZone: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.walletTypes()
    this.TimeoutSetting()

  }
  walletTypes() {
    const walletTypes = localStorage.getItem('walletTypes');
    if (walletTypes) {
      let walletTypesList
      walletTypesList = JSON.parse(walletTypes)
      console.log("walletTypesList", walletTypesList)
      for (let i = 0; i < walletTypesList.length; i++) {
        if (walletTypesList[i].faceWallet == false && walletTypesList[i].clubGameWallet == true) {
          this.walletTypesList.push(walletTypesList[i])
        }
      }
      console.log("walletTypesList", this.walletTypesList)
    }
  }
  TimeoutSetting() {
    let body = {}
    this.PokergamesService.TimeoutSetting(body).subscribe(data => this.timeoutsettingsData(data))
  }
  timeoutsettingsData(data: any) {
    this.objList = data.objectList;
    console.log(this.objList);

  }
  TimeOutsSettings() {
    this.showTiemoute = !this.showTiemoute
    this.showtime = !this.showtime
  }
  TimeOutPopMethod(index: any) {
    console.log(index);
    this.timeoutSettingsList = this.objList[index];
    console.log(this.timeoutSettingsList)
    this.timeOutpopup = true;

    this.buyChipsTimeout = this.timeoutSettingsList.buyChipsTimeout / 1000
    this.buyinLimitTimeout = this.timeoutSettingsList.buyinLimitTimeout / 60000
    this.reserveSeatTimeout = this.timeoutSettingsList.reserveSeatTimeout / 1000
    this.newHandTimeout = this.timeoutSettingsList.newHandTimeout / 1000
    this.showWinnersTimeout = this.timeoutSettingsList.showWinnersTimeout / 1000
    this.showdownTimeout = this.timeoutSettingsList.showdownTimeout / 1000
    this.sitOutTime = this.timeoutSettingsList.sitOutTime / 1000
    this.afterJackpotHandTimeout = this.timeoutSettingsList.afterJackpotHandTimeout / 1000
    this.synchronizedBreakTimeout = this.timeoutSettingsList.synchronizedBreakTimeout / 1000
  }
  subTabletimeOut() {
    // if(this.objList){

    //   this.showtimeOut =true
    // }else{
    //   this.showtimeOut =false

    // }
    this.timeOutpopup = true
  }
  timeOutpopupClose() {
    this.timeOutpopup = false
  }
  SettingsFormSubmit() {
    console.log(this.TimeOutSettingsForm.value)
    console.log(this.timeoutSettingsList);
    console.log(this.buyChipsTimeout);
    this.SpinnwerT = true;
    let body = {
      "guid": this.timeoutSettingsList.guid,
      "buyChipsTimeout": (this.buyChipsTimeout * 1000),
      "buyinLimitTimeout": (this.buyinLimitTimeout * 60000),
      "reserveSeatTimeout": (this.reserveSeatTimeout * 1000),
      "newHandTimeout": (this.newHandTimeout * 1000),
      "betweenHandsTimeout": Number(this.timeoutSettingsList.betweenHandsTimeout),
      "showWinnersTimeout": (this.showWinnersTimeout * 1000),
      "showdownTimeout": (this.showdownTimeout * 1000),
      "sitOutTime": (this.sitOutTime * 1000),
      "sitOutHands": Number(this.timeoutSettingsList.sitOutHands),
      "afterJackpotHandTimeout": (this.afterJackpotHandTimeout * 1000),
      // "playMoneyResetThreshold":( this.timeoutSettingsList.playMoneyResetThreshold),
      "playMoneyResetThreshold":
      {
        "value": Number(this.timeoutSettingsList.playMoneyResetThreshold.value),
        "wallet": this.timeoutSettingsList.playMoneyResetThreshold.wallet
      },
      "playMoneyResetForbiddenPeriod": Number(this.timeoutSettingsList.playMoneyResetForbiddenPeriod),
      "synchronizedBreakTimeout": (this.synchronizedBreakTimeout * 1000),
      "synchronizedBreakFrequency": Number(this.timeoutSettingsList.synchronizedBreakFrequency),
      "synchronizedBreakResumeDelay": this.timeoutSettingsList.synchronizedBreakResumeDelay,
      "synchronizedBreakZoneMinute": this.timeoutSettingsList.synchronizedBreakZoneMinute,
      "synchronizedBreakTimeZone": this.timeoutSettingsList.synchronizedBreakTimeZone


    }
    console.log(body)
    this.PokergamesService.setPokerTimeoutsSettings(body).subscribe((data) => {
      console.log(data);
      if (data.changedObjectList) {
        this.timeOutpopup = false;
        this.SpinnwerT = false
        this.TimeoutSetting()
      }
    })
  }
}
