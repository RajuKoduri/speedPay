import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';

import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-player-personal-information',
  templateUrl: './player-personal-information.component.html',
  styleUrls: ['./player-personal-information.component.css']
})
export class PlayerPersonalInformationComponent implements OnInit {
  PlayerguidList: any;
  PlayersPersonalData: any;
  countrieslist: any;
  faceParameter: any;
  PlayerparsonalInfo: FormGroup;
  LanguagesList: any;
  PlayerUpdate: boolean = false
  AgentAddress: string = 'null';
  submitted = false;
  showError: any;
  SpinnwerT: boolean = false;
  sanitizedImageUrl: any;

  constructor(private PlayerServiceService: PlayerServiceService, private route: ActivatedRoute,  private sanitizer: DomSanitizer) {
    this.PlayerparsonalInfo = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      Email: new FormControl('', [Validators.required]),

    })
  }
  get f() {
    return this.PlayerparsonalInfo.controls;
  }
  ngOnInit(): void {
    this.Playerguid();
    this.getPlayersPersonalInfo();
    this.countrylist();
    this.Languages();
    this.faceParameters()


    console.log(this.route.queryParams)
    console.log(this.route.queryParams.subscribe(res => this.lighLongAndLowLong((res))))


    this.route.queryParams.subscribe(params => {
      const receivedData = params['_value'];
      console.log(receivedData)
    })

  }
  close_popup() {
    this.PlayerUpdate = false;
  }
  plaerEditD() {
    this.PlayerUpdate = true;

  }
  // ***********************


  lighLongAndLowLong(res: any) {
    console.log(res)
    if (res) {

    }
  }
  Playerguid() {
    // let Playerguid = localStorage.getItem("Playerguid");
    let Playerguid = sessionStorage.getItem("Playerguid");
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }
  countrylist() {
    const countries = localStorage.getItem('countrylist')
    if (countries) {
      this.countrieslist = JSON.parse(countries) || [];
    }
    console.log(this.countrieslist)
  }
  faceParameters() {
    const faceParameters = localStorage.getItem('faceParameters')
    if (faceParameters) {
      this.faceParameter = JSON.parse(faceParameters) || [];
    }
    console.log(this.faceParameter)
  }


  Languages() {
    const Languages = localStorage.getItem("Languages");
    if (Languages) {
      this.LanguagesList = JSON.parse(Languages)
    }
    console.log(this.LanguagesList)
  }
  getPlayersPersonalInfo() {
    let body = {
      "idList": {
        "firstRecord": 0,
        "maxCountRecord": 100,
        "idList": [this.PlayerguidList]
      }
    }
    console.log(body)
    this.PlayerServiceService.getPlayersPersonal(body).subscribe((data) => {
      console.log(data)
      if (data) {
        if (data.objectList) {

          this.PlayersPersonalData = data.objectList;
          console.log("************", this.PlayersPersonalData)

          for (let i = 0; i < this.PlayersPersonalData.length; i++) {
            for (let j = 0; j < this.countrieslist.length; j++) {
              if (this.PlayersPersonalData[i].country.lowLong == this.countrieslist[j].CID.lowLong) {
                this.PlayersPersonalData[i].country = this.countrieslist[j].title
                this.PlayersPersonalData[i].CID = this.countrieslist[j].CID
              }
            }
            for (let s = 0; s < this.faceParameter.length; s++) {
              if (this.PlayersPersonalData[i].player.network == this.faceParameter[s].name) {
                this.PlayersPersonalData[i].player.network = this.faceParameter[s].name
              }
            }

            for (let k = 0; k < this.LanguagesList.length; k++) {
              console.log("guid", this.LanguagesList[k].guid.lowLong)
              console.log(this.PlayersPersonalData[i].language.lowLong)
              console.log(this.PlayersPersonalData[i].language.lowLong == this.LanguagesList[k].guid.lowLong)
              if (this.PlayersPersonalData[i].language.lowLong == this.LanguagesList[k].guid.lowLong) {

                this.PlayersPersonalData[i].language = this.LanguagesList[k].value
                this.PlayersPersonalData[i].languageGuid = this.LanguagesList[k].guid
              }
            }
          }
        } else {
          console.log(data.error)


          this.showError = data.error
          setTimeout(() => {
            this.showError = ''
          }, 5000)
        }

      }


      this.sanitizeImageUrl()
    })
  }
  sanitizeImageUrl(): void {
    const base64Image = `data:image/png;base64,${ this.PlayersPersonalData[0]?.avatar?.image}`;
    this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustUrl(base64Image);
  }
  parsonalData() {
    this.SpinnwerT = true
    this.submitted = true;
    let body = {
      "guid": this.PlayersPersonalData[0].guid,
      "activeEmail": this.PlayersPersonalData[0].activeEmail,
      "address": this.PlayersPersonalData[0].address,
      "city": this.PlayersPersonalData[0].city,
      "country": this.PlayersPersonalData[0].CID,
      "language": this.PlayersPersonalData[0].languageGuid,
      "nickname": this.PlayersPersonalData[0].nickname,
      "password": this.PlayersPersonalData[0].password,
      "player": {
        "account": this.PlayersPersonalData[0].player.account,
        "alias": this.PlayersPersonalData[0].player.alias,
        "compPointsLevel": {
          "name": this.PlayersPersonalData[0].player.compPointsLevel.name,
          "priority": this.PlayersPersonalData[0].player.compPointsLevel.priority
        },
        "network": this.PlayersPersonalData[0].player.network,
        "nickName": this.PlayersPersonalData[0].player.nickName,
        "shortId": this.PlayersPersonalData[0].player.shortId,
        "status": this.PlayersPersonalData[0].player.status
      }
    }

    console.log('body', body)

    

    //     let body = {
    //       "agent":{
    // "login":agentdata.login,
    // "firstName":this.PlayersPersonalData[0].firstName,
    // "lastName":this.PlayersPersonalData[0].lastName,
    // "status":this.PlayersPersonalData[0].agent.status,
    // "alias":this.PlayersPersonalData[0].agent.alias,
    // "email":this.PlayersPersonalData[0].agent.email,
    // "network": this.PlayersPersonalData[0].agent.network,
    // "shortId":this.PlayersPersonalData[0].agent.shortId,
    // "preferredWallet":this.PlayersPersonalData[0].agent.preferredWallet,
    // "affiliateWallet":this.PlayersPersonalData[0].agent.affiliateWallet,
    // "guid":this.PlayersPersonalData[0].agent.guid,
    // "objState":this.PlayersPersonalData[0].agent.objState,
    //       },
    // "password":this.PlayerparsonalInfo.value.password != null ? this.PlayerparsonalInfo.value.password : undefined,
    // "address":this.PlayersPersonalData[0].address,
    // "city":this.PlayersPersonalData[0].city,
    // "state":this.PlayersPersonalData[0].state,
    // "zipCode":this.PlayersPersonalData[0].zipCode,
    // "country":this.PlayersPersonalData[0].CID,
    // "language":this.PlayersPersonalData[0].language,
    // "phone":this.PlayersPersonalData[0].phone,
    // "email":this.PlayersPersonalData[0].agent.email,
    // "websiteURL": null,
    // "birthday": null,
    // "campaign": null,
    // "guid":this.PlayersPersonalData[0].agent.guid,
    // "objState":this.PlayersPersonalData[0].agent.objState
    //       } 


    this.PlayerServiceService.setPlayersPersonal(body).subscribe(data => {
      console.log(data)
      if (data.changedObjectList) {
        this.SpinnwerT = false
        this.close_popup()
      }
    })
  }




}
