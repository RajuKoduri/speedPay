import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';

@Component({
  selector: 'app-disconnection-protection-settings',
  templateUrl: './disconnection-protection-settings.component.html',
  styleUrls: ['./disconnection-protection-settings.component.css']
})
export class DisconnectionProtectionSettingsComponent implements OnInit {
  @Output() showHidePopup = new EventEmitter();
  @Input() userinfo: any;
  @Input() resetSettings: boolean = false;
  // @Input() showplayername: any


  disconnectsettingsResponse: any;
  DisconnectionPopup: boolean = false;
  disconnectsettingsResponseCopy: any;
  isValidDays: boolean = false;
  isValidProtectionsLeft: boolean = false;
  isValidResetsLeft: boolean = false;

  constructor(private PlayerserviceService: PlayerServiceService) { }

  ngOnInit(): void {
    console.log(this.userinfo)
    if (!this.userinfo) {
      let data = {}
      // this.PlayerserviceService.getPlayerDisconnectionProtectionSetup(data).subscribe((res) => { console.log(res) })
      this.PlayerserviceService.getPlayerDisconnectionProtectionSetup(data).subscribe((res) => { this.disconnectsettingslist(res) })
    }
  }
  disconnectsettingslist(res: any) {
    console.log(res)
    this.disconnectsettingsResponse = res?.objectList[0]
    // this.objectListDays = res.objectList[0].days;
    // console.log(this.objectListDays.protectionsLeft)

    // this.objectListProtectionsLeft = res.objectList[0].protectionsLeft;
    // this.objectListResetsLeft = res.objectList[0].resetsLeft;
  }
  popup() {
    this.DisconnectionPopup = true;
    this.disconnectsettingsResponseCopy = JSON.parse(JSON.stringify(this.disconnectsettingsResponse))
  }
  closepopup() {
    this.DisconnectionPopup = false;
  }
  protectionValidation(event: any, type: string) {
    console.log(event)
    const value = event.target.value
    const preventStartWithZero = value.startsWith(0)
    const isEmpty = value == '';

    switch (type) {
      case 'days':
        this.isValidDays = preventStartWithZero || isEmpty;
        break;
      case 'protections':
        this.isValidProtectionsLeft = preventStartWithZero || isEmpty;
        break;
      case 'resets':
        this.isValidResetsLeft = preventStartWithZero || isEmpty;
        break;

    }

    if (preventStartWithZero) {
      event.target.value = '';
    }
  }
  onSubmit() {

    let body = {
      days: Number(this.disconnectsettingsResponseCopy.days),
      protectionsLeft: Number(this.disconnectsettingsResponseCopy.protectionsLeft),
      resetsLeft: Number(this.disconnectsettingsResponseCopy.resetsLeft)
    }
    console.log(body)
    this.PlayerserviceService.setPlayerDisconnectionProtectionSetup(body).subscribe((res: any) => {
      console.log(res)
      if (res.objectList) {
        this.DisconnectionPopup = false;
      }
    })
  }

  closepopUP() {
    console.log("-------------------------")
    this.showHidePopup.emit(false)
  }
  resetDisconnectionSetting(){
    let body = {
      playerGuid: this.userinfo.player.guid
    }
    this.PlayerserviceService.resetPlayerDisconnectionProtectionSetting(body).subscribe((res: any) => {
      if(res){
        this.closepopUP()
      }
    });
  }
}
