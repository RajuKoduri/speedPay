import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
@Component({
  selector: 'app-create-newplayer',
  templateUrl: './create-newplayer.component.html',
  styleUrls: ['./create-newplayer.component.css']
})
export class CreateNewplayerComponent implements OnInit {
  CreateNewPlayer: FormGroup;
  faceParametersList: any;
  Countries: any;
  LanguagesList: any;
  SeletedCountry: any
  SeletedLang: any;
  CreatePlayerSuccessPop: boolean = false

  submitted = false;
  subNetWorks : any;
  subNetworkParametersList: any;

  constructor(private PlayerServiceService: PlayerServiceService) {
    this.CreateNewPlayer = new FormGroup({
      PlayerLogin: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15),Validators.pattern('[a-zA-Z0-9]*')]),
      NickName: new FormControl('', [Validators.required, Validators.minLength(4),]),
      Email:new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15),Validators.pattern(/^\S*$/)]),
      LastName: new FormControl(),
      BirthDay: new FormControl(),
      FirstName: new FormControl(),
      Address: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
      ZipCode: new FormControl(),
      Country: new FormControl(),
      Phone: new FormControl( '',[Validators.required, Validators.minLength(7), Validators.maxLength(12)]),
      Language: new FormControl(),
      Face: new FormControl(),
      Subnetwork: new FormControl()

    })
  }

  ngOnInit(): void {
    this.faceParameters()
    this.subNetworkParameters()
    this.countrylist()
    this.Languages()
  }
  userNameValid(event:any) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57));
  }
  passwordValid(event:any) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k >= 33 && k <= 47 || k >= 60 && k <= 64 || (k >= 48 && k <= 57) || k >= 91 && k <= 96 || k >= 123 && k <= 126);
  }
  emailValid(event:any) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k >= 33 && k <= 47 || k >= 60 && k <= 64 || (k >= 48 && k <= 58) || k >= 91 && k <= 96 || k >= 123 && k <= 126);
  }
  phonenum(event:any) {
    var k;
    k = event.charCode;
    return (k >= 48 && k <= 57);
  }
  get f() {
    return this.CreateNewPlayer.controls;
  }
  faceParameters() {
    const faceParameters = localStorage.getItem('faceParameters');
    if (faceParameters) {
      this.faceParametersList = JSON.parse(faceParameters)
    }
    console.log("faceParametersList", this.faceParametersList)
    this.CreateNewPlayer.patchValue({
      Face: this.faceParametersList[0].name,
      //  Subnetwork: this.faceParametersList[0]?.name
    })
  }

  subNetworkParameters() {
    const subNetworkParameters = localStorage.getItem('subNetworkParameters');
    if (subNetworkParameters) {
      this.subNetworkParametersList = JSON.parse(subNetworkParameters)
    }
    console.log("subNetworkParametersList ", this.subNetworkParametersList.network)
    this.onFaceChange()
  }

  onFaceChange() {
    console.log("subNetworkParametersList ", this.subNetworkParametersList.network)
    const subnetwork:any = this.CreateNewPlayer.value.Face
    console.log(subnetwork)
    console.log(this.subNetworkParametersList.network[subnetwork])
    // let subNetWorks:any
    this.subNetWorks = (this.subNetworkParametersList.network[subnetwork])
    console.log(this.subNetWorks)
    this.CreateNewPlayer.patchValue({
      Subnetwork: this.subNetWorks[0]?.subnetwork
    })
  }
  countrylist() {
    const countrylist = localStorage.getItem("countrylist");
    if (countrylist) {
      this.Countries = JSON.parse(countrylist)
    }
    console.log("Countries", this.Countries)
    this.SeletedCountry = this.Countries[0].CID
  }
  Languages() {
    const Languages = localStorage.getItem("Languages");
    if (Languages) {
      this.LanguagesList = JSON.parse(Languages)
    }
    console.log("LanguagesList", this.LanguagesList)
    this.SeletedLang = this.LanguagesList[0].guid
  }

  onFormSubmit() {
    this.submitted = true
    console.log(this.CreateNewPlayer.value)
    if (this.CreateNewPlayer.valid) {

      console.log(this.CreateNewPlayer.value)
      console.log(this.SeletedCountry)

      let body = {
        "objState": 0,
        // "birthday": this.CreateNewPlayer.value.BirthDay,
        "activeEmail": this.CreateNewPlayer.value.Email,
        "address": this.CreateNewPlayer.value.Address,
        "city": this.CreateNewPlayer.value.City,
        "firstName": this.CreateNewPlayer.value.FirstName,
        "lastName": this.CreateNewPlayer.value.LastName,
        "phone": Number(this.CreateNewPlayer.value.Phone),
        "state": this.CreateNewPlayer.value.State,
        "zipcode": Number(this.CreateNewPlayer.value.ZipCode),

        "country": this.CreateNewPlayer.value.Country,
        "language": this.CreateNewPlayer.value.Language,
        "nickname": this.CreateNewPlayer.value.NickName,
        "password": this.CreateNewPlayer.value.Password,
        "player": {
          "objState": 0,
          "account": this.CreateNewPlayer.value.PlayerLogin,
          "alias": this.CreateNewPlayer.value.PlayerLogin,
          "fullName": "",
          "network": this.CreateNewPlayer.value.Face,
          "subNetwork": this.CreateNewPlayer.value.Subnetwork,
          "nickName": this.CreateNewPlayer.value.NickName,
          "shortId": 0
        }
      }
      console.log(body)
      this.PlayerServiceService.setPlayersPersonal(body).subscribe((data) => {
        console.log(data)
        console.log(data.resultCount)
        if (data.resultCount == 0)
          if (data.changedObjectList) {
            this.CreatePlayerSuccessPop = true;
            // this.CreateNewPlayer.reset();
            // this.CreateNewPlayer.patchValue({
            //   Face: this.faceParametersList[0].name,
            //   Language: this.LanguagesList[0].guid,
            //   Country: this.Countries[0].CID
            // })
          }
      })
    }
  }


  // changedObjectList
  // Language: this.SeletedLang,
  // Country: this.SeletedLang

  SuccessPop() {
    this.CreatePlayerSuccessPop = false
    this.submitted = false
    this.CreateNewPlayer.reset();
    this.CreateNewPlayer.patchValue({
      Face: this.faceParametersList[0].name,
      Language: this.LanguagesList[0].guid,
      Country: this.Countries[0].CID

    })
  }
}
