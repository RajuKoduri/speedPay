import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AffiliateControlService } from 'src/app/source/AffiliateControl.service';
@Component({
  selector: 'app-affiliatesregistationsettings',
  templateUrl: './affiliatesregistationsettings.component.html',
  styleUrls: ['./affiliatesregistationsettings.component.css']
})
export class AffiliatesregistationsettingsComponent implements OnInit {
  registrar: any = [];
  registrarlocal: any;
  registrarList: any;
  AgentForm: any;
  AgentFormlist: any;
  agentStatus: any;
  agentStatuslist: any;
  registrarField: any;
  showSaveSetting: boolean = false;
  allconten: any;
  passwordstrength: any;
  arrayfeilds: any =[]
  isDisabled: boolean =true
  RegistrationForm:FormGroup
  constructor(private affiliateControlService: AffiliateControlService) {
    this.RegistrationForm = new FormGroup({
      activationperiod: new FormControl("", Validators.required),
      changepasswordafter:new FormControl(''),
      blockpasswordshoter:new FormControl(""),
      lockaccountafter:new FormControl("")
    })
   }

  ngOnInit(): void {
    this.registrarlocal = localStorage.getItem("DYIDPASSWORDSTRENGTH")
    this.registrarList = JSON.parse(this.registrarlocal)
    this.AgentForm = localStorage.getItem("DYIDPASSWORDYIDPROFILEFORMFIELDSTATUSDSTRENGTH")
    this.AgentFormlist = JSON.parse(this.AgentForm)
    this.agentStatus = localStorage.getItem("DYIDREGISTRATIONFORMFIELDSTATUS")
    this.agentStatuslist = JSON.parse(this.agentStatus)
    console.log("registation",this.agentStatuslist)
    console.log("profilestatus",this.AgentFormlist)
    let body = {
    }
    this.affiliateControlService.getRegitration(body).subscribe((data) => this.showregistration(data))
  }
  showregistration(data: any) {
    this.registrar = data.objectList
    console.log(this.registrar)
   
    for (let i = 0; i < this.registrar.length; i++) {
      this.RegistrationForm.patchValue({
        changepasswordafter:   this.registrar[i].failedLoginThreshold,
        blockpasswordshoter :  this.registrar[i].minPasswdLength,
        activationperiod :     this.registrar[i].activationPeriod  
      })
      this.registrarField = this.registrar[i].fields
      console.log(this.registrarField)
      for (let k = 0; k < this.registrarField.length; k++) {
        let obj = {
          "changeable": true,
           "name": "",
          "profileStatus": {}, 
        "profileStatusesRange": [],
        "registrationStatus": {},
        "registrationStatusesRange": []
        }
        obj.profileStatus = this.registrarField[k].profileStatus
        obj.name =  this.registrarField[k].name
        obj.profileStatusesRange =  this.registrarField[k].profileStatusesRange
        obj.registrationStatus =  this.registrarField[k].registrationStatus
        obj.registrationStatusesRange =  this.registrarField[k].registrationStatusesRange

        this.arrayfeilds.push(obj)
         for(let s=0; s < this.agentStatuslist.length;s++){
          if(this.agentStatuslist[s].guid.lowLong == this.registrarField[k].registrationStatus.lowLong){
            const formcontrolName =  this.registrarField[k].name
            const formcontrolValue = this.agentStatuslist[s].value 
            this.RegistrationForm.addControl(formcontrolName,new FormControl(formcontrolValue))
          } 
         }
         for(let s=0; s < this.AgentFormlist.length;s++){
          if(this.AgentFormlist[s].guid.lowLong == this.registrarField[k].profileStatus.lowLong){
            const formcontrolName =  this.registrarField[k].name + k
            const formcontrolValue = this.AgentFormlist[s].value 
            this.RegistrationForm.addControl(formcontrolName,new FormControl(formcontrolValue))
          }
         }

        for (let j = 0; j < this.registrarList.length; j++) {
          if (this.registrar[i].passwordStrengthThreshold.lowLong == this.registrarList[j].guid.lowLong) {
            console.log(this.registrarlocal[j].value)
            this.registrar[i].passwordStrengthThreshold = this.registrarList[j].value
            this.passwordstrength =   this.registrarList[j].guid
          }
        }
      
      }
    }
    console.log(this.arrayfeilds)
     // for (let i = 0; i < this.registrar.length; i++) {
    //   for (let j = 0; j < this.registrarList.length; j++) {
    //     if (this.registrar[i].passwordStrengthThreshold.lowLong == this.registrarList[j].guid.lowLong) {
    //       this.registrar[i].passwordStrengthThreshold = this.registrarList[j].value
    //     }
    //     for (let k = 0; k < this.registrar[i].fields.length; k++) {
    //       this.registrarField = this.registrar[i].fields
    //       for (let q = 0; q < this.AgentFormlist.length; q++) {
    //         for (let p = 0; p < this.registrarField.length; p++) {
    //           for (let s = 0; s < this.registrarField[p].profileStatusesRange.length; s++) {
    //             if (this.registrarField[p].profileStatusesRange[s].lowLong == this.AgentFormlist[q].guid.lowLong) {
    //               this.registrarField[p].profileStatusesRange[s].nextprofile = this.AgentFormlist[q].value
    //             }
    //           }
    //         }
    //       }
    //       for (let n = 0; n < this.agentStatuslist.length; n++) {
    //         for (let m = 0; m < this.registrarField.length; m++) {
    //           for (let r = 0; r < this.registrarField[m].registrationStatusesRange.length; r++) {
    //             if (this.registrarField[m].registrationStatusesRange[r].lowLong == this.agentStatuslist[n].guid.lowLong) {
    //               this.registrarField[m].registrationStatusesRange[r].nextregister = this.agentStatuslist[n].value
    //             }
    //           }
    //         }
    //       }


    //     }
    //   }
    // }
  }

  affilatSetting(data:any) {
    this.showSaveSetting = true
    console.log(this.registrar)
    console.log(data)
  }
  cancelaffile() {
    this.showSaveSetting = false

  }
  registrationchange($event:any,list:any){
    console.log(list)
    for(let i=0;i < this.arrayfeilds.length;i++){
     if(list.name == this.arrayfeilds[i].name){
       for(let s=0; s < this.agentStatuslist.length;s++){
         if(this.RegistrationForm.value[list.name] ==  this.agentStatuslist[s].value){
           this.arrayfeilds[i].registrationStatus =  this.agentStatuslist[s].guid
         }
       }
     }
    }
    console.log(this.arrayfeilds)
   }
  permissionsvalidation($event:any,list:any,index:any){
    console.log(list)
    for(let i=0;i < this.arrayfeilds.length;i++){
      if(list.name == this.arrayfeilds[i].name){
        for(let s=0; s < this.AgentFormlist.length;s++){
          console.log(this.AgentFormlist[s])
          if(this.RegistrationForm.value[list.name + index] ==  this.AgentFormlist[s].value){
            this.arrayfeilds[i].profileStatus =  this.AgentFormlist[s].guid
            console.log(this.AgentFormlist[s].guid)
          }
        }
      }
     }
     console.log(this.arrayfeilds)
  }
  blockpassword(event:any){
    console.log(event)
    console.log(event.target.value)
    for (let j = 0; j < this.registrarList.length; j++) {
      if (event.target.value == this.registrarList[j].value) {
        this.passwordstrength = this.registrarList[j].guid
      }
    }
  }
  setRegistartion(){
    console.log(this.RegistrationForm.value)
    let body ={
      "objState": 0,
      "accountInactivityLimit": 0,
      "activationPeriod": 0,
      "emailActivation": false,
      "failedLoginThreshold": 0,
      "fields": this.arrayfeilds,
      "passwordStrengthThreshold" : this.passwordstrength
    }
console.log(body)
    // this.agentService.setAgentRegistrationSettings(body).subscribe((res) =>console.log(res))
  }
  emailverification($event:any){
    console.log($event.target.checked)
    if( $event.target.checked == true){
      this.isDisabled  = false
    }else{
      this.isDisabled  = true
    }
  }
  
  }
