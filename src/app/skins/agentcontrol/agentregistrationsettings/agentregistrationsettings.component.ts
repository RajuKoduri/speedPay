import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgentControlService } from 'src/app/source/AgentControl.service';
@Component({
  selector: 'app-agentregistrationsettings',
  templateUrl: './agentregistrationsettings.component.html',
  styleUrls: ['./agentregistrationsettings.component.css']
})
export class AgentregistrationsettingsComponent implements OnInit {
  settinglist: any = [];
  agentsettig: any;
  agentsettiglist: any;
  setitemslist: any;
  agentStatus: any;
  agentStatuslist: any;
  AgentForm: any;
  AgentFormlist: any;
  showSave:boolean= false;
  RegistrationForm : FormGroup;
  isDisabled: boolean = true
  passwordstrength: any;
  arrayfeilds: any = []  
  settinglist12: any;
  constructor(private agentService: AgentControlService) { 
    this.RegistrationForm = new FormGroup({
      activationperiod: new FormControl({value: '', disabled: true}, Validators.required),
      changepasswordafter:new FormControl(''),
      blockpasswordshoter:new FormControl(""),
      lockaccountafter:new FormControl("")
    })
  }

  ngOnInit(): void {
    this.agentsettig = localStorage.getItem("DYIDPASSWORDSTRENGTH")
    this.agentsettiglist = JSON.parse(this.agentsettig)
    console.log("passwordstrength",this.agentsettiglist)

    this.agentStatus = localStorage.getItem("DYIDREGISTRATIONFORMFIELDSTATUS")
    this.agentStatuslist = JSON.parse(this.agentStatus)
    console.log("registrationform",this.agentStatuslist)

    this.AgentForm = localStorage.getItem("DYIDPASSWORDYIDPROFILEFORMFIELDSTATUSDSTRENGTH")
    this.AgentFormlist = JSON.parse(this.AgentForm)
    console.log("profilefeildform",this.AgentFormlist)

    let body = {
    }
    this.agentService.getAgentRegistrationSettings(body).subscribe((data) => this.agentsetting(data))
    var doc = document;
    const handleKeyUpforEnter = (evt:any) => { 
        if (evt.key == "Enter"){
          evt.preventDefault()
      }
    }
    doc.addEventListener("keydown", handleKeyUpforEnter);
  }
  agentsetting(data: any) {

    this.settinglist12 = data.objectList
    console.log(this.settinglist)
  }
    EditRegistrationData(data:any){
      this.settinglist = JSON.parse(JSON.stringify(data))
    for (let i = 0; i < this.settinglist.length; i++) {
      this.RegistrationForm.patchValue({
        changepasswordafter:   this.settinglist[i].failedLoginThreshold,
        blockpasswordshoter :  this.settinglist[i].minPasswdLength,
        activationperiod :     this.settinglist[i].activationPeriod  
      })

      this.setitemslist = this.settinglist[i].fields
      console.log(this.setitemslist)

      for (let k = 0; k < this.setitemslist.length; k++) {

        let obj = {
          "changeable": true,
           "name": "",
          "profileStatus": {}, 
        "profileStatusesRange": [],
        "registrationStatus": {},
        "registrationStatusesRange": []
        }
        obj.profileStatus = this.setitemslist[k].profileStatus
        obj.name =  this.setitemslist[k].name
        obj.profileStatusesRange =  this.setitemslist[k].profileStatusesRange
        obj.registrationStatus =  this.setitemslist[k].registrationStatus
        obj.registrationStatusesRange =  this.setitemslist[k].registrationStatusesRange

        this.arrayfeilds.push(obj)
         for(let s=0; s < this.agentStatuslist.length;s++){
          if(this.agentStatuslist[s].guid.lowLong == this.setitemslist[k].registrationStatus.lowLong){
            const formcontrolName =  this.setitemslist[k].name
            const formcontrolValue = this.agentStatuslist[s].value 
            this.RegistrationForm.addControl(formcontrolName,new FormControl(formcontrolValue))
          } 
         }
         for(let s=0; s < this.AgentFormlist.length;s++){
          if(this.AgentFormlist[s].guid.lowLong == this.setitemslist[k].profileStatus.lowLong){
            const formcontrolName =  this.setitemslist[k].name + k
            const formcontrolValue = this.AgentFormlist[s].value 
            this.RegistrationForm.addControl(formcontrolName,new FormControl(formcontrolValue))
          }
         }

        for (let j = 0; j < this.agentsettiglist.length; j++) {
          if (this.settinglist[i].passwordStrengthThreshold.lowLong == this.agentsettiglist[j].guid.lowLong) {
            this.settinglist[i].passwordStrengthThreshold = this.agentsettiglist[j].value
            this.passwordstrength =   this.agentsettiglist[j].guid
          }
        }
      
      }
    }
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
  savecancel(){
    this.showSave = true
    this.EditRegistrationData(this.settinglist12)
  }
  cancelagent(){
    this.showSave = false;

    this.setitemslist.forEach((regData:any,i:any) =>{
      this.agentStatuslist.forEach((statusList:any)=>{
        if(statusList.guid.lowLong == regData.registrationStatus.lowLong){
          const formcontrolName = regData.name
          this.RegistrationForm.removeControl(formcontrolName)
        }
      })
      this.AgentFormlist.forEach((profileData:any)=>{
        if(profileData.guid.lowLong == regData.profileStatus.lowLong){
          const formcontrolName = regData.name + i
          this.RegistrationForm.removeControl(formcontrolName)
        }
      })
    }) 
  }

  setRegistartion(){
    console.log(this.RegistrationForm.value)
    let body ={
      "objState": 0,
      "accountInactivityLimit": this.RegistrationForm.value.lockaccountafter,
      "activationPeriod": this.RegistrationForm.value.activationperiod,
      "emailActivation":  this.isDisabled,
      "failedLoginThreshold": this.RegistrationForm.value.changepasswordafter,
      "fields": this.arrayfeilds,
      "passwordStrengthThreshold" : this.passwordstrength
    }
console.log(body)
    this.agentService.setAgentRegistrationSettings(body).subscribe((res) =>console.log(res))
  }
  emailverification($event:any){
     console.log($event.target.checked)
    if( $event.target.checked == true){
      this.isDisabled  = true
      this.RegistrationForm.controls['activationperiod'].enable();   
    }else{
      this.isDisabled  = false 
      this.RegistrationForm.controls['activationperiod'].disable();
    }
  }
  passwordStrengthThresholdValue(data:any){
    // console.log(data)
    let value:any
    for (let j = 0; j < this.agentsettiglist.length; j++) { 
      if (this.agentsettiglist[j].guid.lowLong ==data.lowLong) {
        value = this.agentsettiglist[j].value
      }
    }
    return value          
  }
  negativevalue(event:any){
    // console.log(event)
    // console.log(event.target.min)
    // console.log(event.target.value)
    if(event.target.value < 0){
      event.target.value = event.target.min
    }else{
     event.target.value = event.target.value
    }
    return event
      
  }  
}
