import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-playerregistrationsettings',
  templateUrl: './playerregistrationsettings.component.html',
  styleUrls: ['./playerregistrationsettings.component.css']
})
export class PlayerregistrationsettingsComponent implements OnInit {
  RegistrationResData: any;
  PasswordStrengthList: any;
  ProfileFromFieldStatusList: any;
  RegistrationFromFieldStatusList: any;
  Registrationdetailspopup: boolean = false;
  RegistrationDatafields: any;
  RegistrationForm: FormGroup;
  registrationvalue: any
  arrayfeilds: any = []
  isDisabled: boolean = false;
  passwordstrength: any
  lockaccountafter: boolean = false
  RegistrationResData12: any;
  constructor(private PlayerServiceService: PlayerServiceService) {
    this.RegistrationForm = new FormGroup({
      activationperiod: new FormControl({ value: '', disabled: true }, [Validators.required]),
      changepasswordafter: new FormControl(''),
      blockpasswordshoter: new FormControl(""),
      lockaccountafter: new FormControl(""),
      blackpasswordshoter: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.PasswordStrength();
    this.ProfileFromFieldStatus();
    this.RegistrationFromFieldStatus();
    let body = {}
    this.PlayerServiceService.getPlayerRegistrationSettings(body).subscribe((res) => this.PlayerRegistrationResData(res))



    var doc = document;
    const handleKeyUpforEnter = (evt: any) => {
      if (evt.key == "Enter") {
        evt.preventDefault()
      }
    }
    doc.addEventListener("keydown", handleKeyUpforEnter);

  }


  PasswordStrength() {
    const PasswordStrength = localStorage.getItem("PasswordStrength");
    if (PasswordStrength) {
      this.PasswordStrengthList = JSON.parse(PasswordStrength);
    }
    console.log("PasswordStrengthList", this.PasswordStrengthList)
  }

  ProfileFromFieldStatus() {
    const ProfileFromFieldStatus = localStorage.getItem("ProfileFromFieldStatus");
    if (ProfileFromFieldStatus) {
      this.ProfileFromFieldStatusList = JSON.parse(ProfileFromFieldStatus)
    }
    console.log("ProfileFromFieldStatusList", this.ProfileFromFieldStatusList)
  }

  RegistrationFromFieldStatus() {
    const RegistrationFromFieldStatus = localStorage.getItem("RegistrationFromFieldStatus");
    if (RegistrationFromFieldStatus) {
      this.RegistrationFromFieldStatusList = JSON.parse(RegistrationFromFieldStatus)
    }
    console.log("RegistrationFromFieldStatusList", this.RegistrationFromFieldStatusList)
  }

  PlayerRegistrationResData(data: any) {
    console.log(data)
    this.RegistrationResData12 = data.objectList;
    // this.RegistrationResData = data.objectList;   
    console.log(this.RegistrationResData[0])

    console.log(this.ProfileFromFieldStatusList)
    console.log(this.RegistrationForm.value)
  }
  EditRegistrationData(data: any) {
    console.log(this.arrayfeilds)
    this.RegistrationResData = JSON.parse(JSON.stringify(data))
    if (this.RegistrationResData) {
      for (let i = 0; i < this.RegistrationResData.length; i++) {
        if (this.RegistrationResData[i].accountInactivityLimit) {
          this.lockaccountafter = true
        } else {
          this.lockaccountafter = false
        }
        console.log("strength", this.RegistrationResData[i].passwordStrengthThreshold)

        for (let j = 0; j < this.PasswordStrengthList.length; j++) {
          if (this.PasswordStrengthList[j].guid.lowLong == this.RegistrationResData[i].passwordStrengthThreshold.lowLong) {
            this.RegistrationForm.patchValue({
              blackpasswordshoter: this.PasswordStrengthList[j].value
            })
          }
        }
        console.log("strengthform", this.RegistrationForm.value.blackpasswordshoter)
        this.RegistrationForm.patchValue({
          changepasswordafter: this.RegistrationResData[i].failedLoginThreshold,
          blockpasswordshoter: this.RegistrationResData[i].minPasswdLength,
          activationperiod: this.RegistrationResData[i].activationPeriod,
          lockaccountafter: this.RegistrationResData[i].accountInactivityLimit,

        })
        this.RegistrationDatafields = this.RegistrationResData[i].fields
        for (let k = 0; k < this.RegistrationDatafields.length; k++) {
          let obj = {
            "changeable": true,
            "name": "",
            "profileStatus": {},
            "profileStatusesRange": [],
            "registrationStatus": {},
            "registrationStatusesRange": []
          }
          obj.profileStatus = this.RegistrationDatafields[k].profileStatus
          obj.name = this.RegistrationDatafields[k].name
          obj.profileStatusesRange = this.RegistrationDatafields[k].profileStatusesRange
          obj.registrationStatus = this.RegistrationDatafields[k].registrationStatus
          obj.registrationStatusesRange = this.RegistrationDatafields[k].registrationStatusesRange

          this.arrayfeilds.push(obj)
          for (let s = 0; s < this.RegistrationFromFieldStatusList.length; s++) {
            if (this.RegistrationFromFieldStatusList[s].guid.lowLong == this.RegistrationDatafields[k].registrationStatus.lowLong) {
              const formcontrolName = this.RegistrationDatafields[k].name
              const formcontrolValue = this.RegistrationFromFieldStatusList[s].value
              this.RegistrationForm.addControl(formcontrolName, new FormControl(formcontrolValue))
            }
          }
          for (let s = 0; s < this.ProfileFromFieldStatusList.length; s++) {
            if (this.ProfileFromFieldStatusList[s].guid.lowLong == this.RegistrationDatafields[k].profileStatus.lowLong) {
              const formcontrolName = this.RegistrationDatafields[k].name + k
              const formcontrolValue = this.ProfileFromFieldStatusList[s].value
              this.RegistrationForm.addControl(formcontrolName, new FormControl(formcontrolValue))
            }
          }
          // const formcontrolNamepass =  this.RegistrationDatafields[k].name + k
          // const formcontrolValuepass =  "Optional"
          // this.RegistrationForm.addControl(formcontrolNamepass,new FormControl(formcontrolValuepass))        
        }

        for (let j = 0; j < this.PasswordStrengthList.length; j++) {
          if (this.RegistrationResData[i].passwordStrengthThreshold.lowLong == this.PasswordStrengthList[j].guid.lowLong) {
            this.RegistrationResData[i].passwordStrengthThreshold = this.PasswordStrengthList[j].value
            this.passwordstrength = this.PasswordStrengthList[j].guid
          }
        }
      }
      console.log(this.arrayfeilds)
      console.log(this.RegistrationForm.value)
    }

  }
  registrationchange($event: any, list: any) {
    console.log(list)
    for (let i = 0; i < this.arrayfeilds.length; i++) {
      if (list.name == this.arrayfeilds[i].name) {
        for (let s = 0; s < this.RegistrationFromFieldStatusList.length; s++) {
          if (this.RegistrationForm.value[list.name] == this.RegistrationFromFieldStatusList[s].value) {
            this.arrayfeilds[i].registrationStatus = this.RegistrationFromFieldStatusList[s].guid
          }
        }
      }
    }
    console.log(this.arrayfeilds)
  }

  permissionsvalidation($event: any, list: any, index: any) {
    console.log(list)
    for (let i = 0; i < this.arrayfeilds.length; i++) {
      if (list.name == this.arrayfeilds[i].name) {
        for (let s = 0; s < this.ProfileFromFieldStatusList.length; s++) {
          console.log(this.ProfileFromFieldStatusList[s])
          if (this.RegistrationForm.value[list.name + index] == this.ProfileFromFieldStatusList[s].value) {
            this.arrayfeilds[i].profileStatus = this.ProfileFromFieldStatusList[s].guid
            console.log(this.ProfileFromFieldStatusList[s].guid)
          }
        }
      }
    }
    console.log(this.arrayfeilds)
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlayerRegistrationExcelSheet.xlsx';
    XLSX.writeFile(wb, 'PlayerRegistrationExcelSheet.xlsx');
  }

  closepopup() {
    this.Registrationdetailspopup = false
    console.log(this.RegistrationResData)
    console.log(this.RegistrationResData12)
    console.log(this.RegistrationForm.value)
    this.arrayfeilds = []

    this.RegistrationDatafields.forEach((regData: any, i: any) => {
      this.RegistrationFromFieldStatusList.forEach((statusList: any) => {
        if (statusList.guid.lowLong == regData.registrationStatus.lowLong) {
          const formcontrolName = regData.name
          this.RegistrationForm.removeControl(formcontrolName)
        }
      })
      this.ProfileFromFieldStatusList.forEach((profileData: any) => {
        if (profileData.guid.lowLong == regData.profileStatus.lowLong) {
          const formcontrolName = regData.name + i
          this.RegistrationForm.removeControl(formcontrolName)
        }
      })
    })
    console.log(this.RegistrationForm.value)
  }
  PopupOpen() {
    this.Registrationdetailspopup = true;
    // for(let k =0; k < this.RegistrationDatafields.length; k++){
    //   this.RegistrationForm.patchValue({
    //     [this.RegistrationDatafields[k].name] : "Invisible"
    //   })
    // }
    this.EditRegistrationData(this.RegistrationResData12)

    console.log(this.RegistrationForm.value.changepasswordafter)
    console.log(this.RegistrationForm.value.blockpasswordshoter)
  }

  setRegistartion() {
    console.log(this.RegistrationForm.value)
    let body = {
      "objState": 0,
      "accountInactivityLimit": this.RegistrationForm.value.lockaccountafter,
      "activationPeriod": this.RegistrationForm.value.activationperiod,
      "emailActivation": this.isDisabled,
      "failedLoginThreshold": this.RegistrationForm.value.changepasswordafter,
      "fields": this.arrayfeilds,
      "passwordStrengthThreshold": this.passwordstrength
    }
    console.log(body)
    this.PlayerServiceService.setPlayerRegistrationSettings(body).subscribe((res) => console.log(res))
  }
  emailverification($event: any) {
    console.log($event.target.checked)
    if ($event.target.checked == true) {
      this.isDisabled = true
      this.RegistrationForm.controls['activationperiod'].enable();
    } else {
      this.isDisabled = false
      this.RegistrationForm.controls['activationperiod'].disable();
    }
  }
  passwordStrengthThresholdValue(data: any) {
    // console.log(data)
    let value: any
    for (let j = 0; j < this.PasswordStrengthList.length; j++) {
      if (this.PasswordStrengthList[j].guid.lowLong == data.lowLong) {
        value = this.PasswordStrengthList[j].value
      }
    }
    return value
  }
  negativevalue(event: any) {
    // console.log(event)
    // console.log(event.target.min)
    // console.log(event.target.value)
    if (event.target.value < 0) {
      event.target.value = event.target.min
    } else {
      event.target.value = event.target.value
    }
    return event

  }
}
