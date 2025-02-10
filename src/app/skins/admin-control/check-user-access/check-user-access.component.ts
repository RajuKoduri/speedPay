import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { relativeTimeThreshold } from 'moment';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { UtilityService } from 'src/app/source/utility.service';

@Component({
  selector: 'check-user-access',
  templateUrl: './check-user-access.component.html',
  styleUrls: ['./check-user-access.component.css']
})
export class CheckUserAccessComponent implements OnInit {
  @Output() notifyParent = new EventEmitter()
  checkUserAccessForm: FormGroup
  IPpattern: any = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  usertypeList: any;
  loader: boolean = false;
  listUserAccessRuleList: any;
  UserAccessStatusList: any;
  UserAccessAreaList: any;
  selectedList: any = [];
  checkUserAccessData: any;

  constructor(private playerService: PlayerServiceService, private utilityService: UtilityService) {
    this.checkUserAccessForm = new FormGroup({
      userType: new FormControl(),
      userLogin: new FormControl('', [Validators.required]),
      userIP: new FormControl('', [Validators.required, Validators.pattern(this.IPpattern)])
    })
  }

  ngOnInit(): void {
    this.usertype()
    this.UserAccessStatus()
    this.UserAccessArea()
    this.onSelectUserType()
  }

  closePopup() {
    this.notifyParent.emit()
  }

  get f() {
    return this.checkUserAccessForm.controls
  }

  usertype() {
    let usertype = localStorage.getItem("usertype")
    if (usertype) {
      this.usertypeList = JSON.parse(usertype).filter((list: any) => list.value != "Admin" && list.value != 'Bot')
    }

    this.checkUserAccessForm.patchValue({
      userType: this.usertypeList[0].guid
    })
    console.log(this.usertypeList)
  }

  UserAccessStatus() {
    let UserAccessStatus = localStorage.getItem("UserAccessStatus")
    if (UserAccessStatus) {
      this.UserAccessStatusList = JSON.parse(UserAccessStatus)
    }
    console.log("this.UserAccessStatusList", this.UserAccessStatusList)
  }

  UserAccessArea() {
    let UserAccessArea = localStorage.getItem("UserAccessArea")
    if (UserAccessArea) {
      this.UserAccessAreaList = JSON.parse(UserAccessArea)
    }
  }

  getUserAccessStatus(statusGuid: any) {
    let name: any
    this.UserAccessStatusList.forEach((list: any) => {
      if (list.guid.lowLong == statusGuid.lowLong) {
        name = list.value
      }
    })
    return name
  }

  getUserAccessArea(accessAreaGuid: any) {
    let AccessAreaName: any
    this.UserAccessAreaList.forEach((list: any) => {
      if (list.guid.lowLong == accessAreaGuid.lowLong) {
        AccessAreaName = list.value
      }
    })
    return AccessAreaName
  }

  onSelectUserType() {
    console.log(this.f['userType'].value)
    let body = { 'userType': this.f['userType'].value }
    this.playerService.listUserAccessRules(body).subscribe((data: any) => {
      console.log(data)
      this.listUserAccessRuleList = data?.objectList
      this.listUserAccessRuleList.forEach((list: any) => list.selected = false)
    })
  }

  getcheckUserAccess() {
    let selectedGuid = this.selectedList.map((list: any) => list.guid)
    let body = {
      "userType": this.f['userType'].value,
      "userLogin": this.f['userLogin'].value,
      "userIp": this.f['userIP'].value,
      "ruleGuids": { "idList": selectedGuid }
    }
    if(this.f['userLogin'].valid && this.f['userIP'].valid){
      this.utilityService.checkUserAccess(body).subscribe((data: any) => {
        console.log(data)
        this.checkUserAccessData = data.objectList
      })
    }
  }

  onCheckboxChange(user: any) {
    if (user.selected) {
      this.selectedList.push(user)
    } else {
      this.selectedList = this.selectedList.filter((u: any) => u.guid.lowLong !== user.guid.lowLong)
    }
    console.log(this.selectedList)
  }

  formatIpAddress() {

    let value = this.checkUserAccessForm.get('userIP')?.value || '';
    const cleaned = value.replace(/[^0-9.]/g, '');

    const segments = cleaned.split('.').slice(0, 4);

    for (let i = 0; i < segments.length; i++) {
      if (segments[i].length > 3) {
        segments[i] = segments[i].slice(0, 3);
      }
    }

    let formatted = segments.join('.');

    if (cleaned.length > 0 && cleaned.charAt(cleaned.length - 1) !== '.' && segments[segments.length - 1].length === 3 && segments.length < 4) {
      formatted += '.';
    }
    this.checkUserAccessForm.get('userIP')?.setValue(formatted, { emitEvent: false });

  }

}
