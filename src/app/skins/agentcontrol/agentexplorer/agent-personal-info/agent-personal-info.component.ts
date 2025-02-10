import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AgentControlService } from 'src/app/source/AgentControl.service';
@Component({
  selector: 'app-agent-personal-info',
  templateUrl: './agent-personal-info.component.html',
  styleUrls: ['./agent-personal-info.component.css']
})
export class AgentPersonalInfoComponent implements OnInit {
  countrieslist: any;
  LanguagesList: any;
  AgentguidList: any;
  AgentPersonalData: any;
  AgentUpdate: boolean = false
  personalInfo: FormGroup;
  submitted = false;
  SpinnwerT: boolean = false;
  EditableData: any;
  faceParametersList: any;



  constructor(private AgentControlService: AgentControlService) {
    this.personalInfo = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      Email: new FormControl('', [Validators.required]),
      Cycle: new FormControl(''),

    })


  }

  ngOnInit(): void {
    this.countrylist();
    this.Languages();
    this.Agentguid();
    this.faceParameters();
    this.getAgentsPersonal();

  }
  get f() {
    return this.personalInfo.controls;
  }

  Agentguid() {
    const Agentguid = sessionStorage.getItem('Agentguid');
    if (Agentguid) {
      this.AgentguidList = JSON.parse(Agentguid)
    }
  }

  faceParameters(){
    let faceParameters = localStorage.getItem("faceParameters")
    if(faceParameters){
      this.faceParametersList = JSON.parse(faceParameters)
    }
    
  }

  countrylist() {
    const countries = localStorage.getItem('countrylist')
    if (countries) {
      this.countrieslist = JSON.parse(countries) || [];
    }
    // for(let i=0; i<this.countrieslist.length; i++){
    //   this.countrieslist[i].cuntryName = this.countrieslist[i].title
    console.log(this.countrieslist)
    // }
    // console.log(this.countrieslist.title)
  }
  Languages() {
    const Languages = localStorage.getItem("Languages");
    if (Languages) {
      this.LanguagesList = JSON.parse(Languages)
    }
    console.log(this.LanguagesList)
  }
  getAgentsPersonal() {
    let body = {
      "ids": {
        "firstRecord": 0,
        "maxCountRecord": 100,
        "idList": [this.AgentguidList]
      }
    }
    this.AgentControlService.getAgentsPersonal(body).subscribe((data) => {
      console.log(data.objectList)
      this.AgentPersonalData = data.objectList;

      for (let i = 0; i < this.AgentPersonalData.length; i++) {
        for (let j = 0; j < this.countrieslist.length; j++) {
          this.countrieslist[j].cuntryName = this.countrieslist[j].title
          if (this.AgentPersonalData[i].country.lowLong == this.countrieslist[j].CID.lowLong) {
            this.AgentPersonalData[i].countryName = this.countrieslist[j].title
            this.AgentPersonalData[i].CID = this.countrieslist[j].CID
          }
        }
        for (let k = 0; k < this.LanguagesList.length; k++) {
          if (this.AgentPersonalData[i].language.lowLong == this.LanguagesList[k].guid.lowLong) {
            // this.AgentPersonalData[i].language = this.LanguagesList[k].value 
            this.AgentPersonalData[i].languageName = this.LanguagesList[k].value
          }
        }
      }
      console.log(this.countrieslist)
    })
  }
  AgentUpdateMeth() {
    this.EditableData = JSON.parse(JSON.stringify(this.AgentPersonalData))
    console.log(this.EditableData)

    for (let i = 0; i < this.EditableData.length; i++) {
      for (let j = 0; j < this.countrieslist.length; j++) {
        this.countrieslist[j].cuntryName = this.countrieslist[j].title
        if (this.EditableData[i].country.lowLong == this.countrieslist[j].CID.lowLong) {
          this.EditableData[i].countryName = this.countrieslist[j].title
          this.EditableData[i].CID = this.countrieslist[j].CID
        }
      }
    }
    this.AgentUpdate = true;

  }
  close_popup() {
    this.AgentUpdate = false;
  }
  parsonalData() {
    this.submitted = true;
    let payloadData = this.EditableData.map((list: any) => {
      let { CID, countryName, languageName, ...rest } = list;
      return rest;
    })

    if (this.personalInfo.valid) {
      this.SpinnwerT = true
      this.AgentControlService.setAgentsPersonal(payloadData[0]).subscribe((data) => {
        console.log(data)
        if (data.changedObjectList) {
          this.SpinnwerT = false
          this.close_popup()
          this.getAgentsPersonal()
        }
      })
    }

  }
} 
