import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
@Component({
  selector: 'app-create-new-agent',
  templateUrl: './create-new-agent.component.html',
  styleUrls: ['./create-new-agent.component.css']
})
export class CreateNewAgentComponent implements OnInit {
  CreateNewAgentForm: FormGroup;
  submitted = false;
  faceParametersList: any;
  Countries: any;
  LanguagesList: any;
  SeletedCountry: any
  SeletedLang: any;
  commissionCycle: any;
  AgentRevenueData: any;
  selectedIndex: number = 0
  parameters: any = [];
  agentstatusList: any;
  CreateNewAgentPopup: boolean = false;
  subNetworkParametersList: any;
  subNetWorks: any;

  constructor(private AgentControlService: AgentControlService, private DateTimePipe: DateTimePipe) {
    this.CreateNewAgentForm = new FormGroup({
      AgentLogin: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10),]),
      // NickName: new FormControl('', [Validators.required, Validators.minLength(4),]),
      Email: new FormControl('', [Validators.required,]),
      Password: new FormControl('', [Validators.required, Validators.minLength(6),]),
      LastName: new FormControl(),
      BirthDay: new FormControl(),
      FirstName: new FormControl(),
      Address: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
      ZipCode: new FormControl(),
      Country: new FormControl(),
      Phone: new FormControl(),
      Language: new FormControl(),
      Cycle: new FormControl("", Validators.required),
      Face: new FormControl(),
      Subnetwork: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.faceParameters();
    this.subNetworkParameters();
    this.countrylist();
    this.Languages();
    this.agentstatus();
    this.AgentRevenue();

  }
  get f() {
    return this.CreateNewAgentForm.controls;
  }

  faceParameters() {
    const faceParameters = localStorage.getItem('faceParameters');
    if (faceParameters) {
      this.faceParametersList = JSON.parse(faceParameters)
    }
    console.log("faceParametersList", this.faceParametersList)
    this.CreateNewAgentForm.patchValue({
      Face: this.faceParametersList[0]?.name,
      // Subnetwork: this.faceParametersList[0]?.name
    })
  }

  // ******************?
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
    const subnetwork = this.CreateNewAgentForm.value.Face
    console.log(this.subNetworkParametersList.network[subnetwork])
    // let subNetWorks:any
    this.subNetWorks = (this.subNetworkParametersList.network[subnetwork])
    console.log(this.subNetWorks)
    this.CreateNewAgentForm.patchValue({
      Subnetwork: this.subNetWorks[0]?.subnetwork
    })
  }

  // ******************?
  countrylist() {
    const countrylist = localStorage.getItem("countrylist");
    if (countrylist) {
      this.Countries = JSON.parse(countrylist)
    }
    console.log("Countries", this.Countries)
    this.SeletedCountry = this.Countries[0]?.CID
  }
  Languages() {
    const Languages = localStorage.getItem("Languages");
    if (Languages) {
      this.LanguagesList = JSON.parse(Languages)
    }
    console.log("LanguagesList", this.LanguagesList)
    this.SeletedLang = this.LanguagesList[0].guid
  }
  agentstatus() {
    const Agentstatus = localStorage.getItem("Agentstatus")
    if (Agentstatus) {
      this.agentstatusList = JSON.parse(Agentstatus)
      console.log(this.agentstatusList)
    }
  }

  AgentRevenue() {
    let body = {}
    this.AgentControlService.getAgentGrossRevenueDefaultPercents(body).subscribe((data) => {
      console.log(data)
      this.AgentRevenueData = data.objectList
    })
  }
  SelectedIndexMethod(index: any) {
    this.selectedIndex = index
    let seletedItem = this.AgentRevenueData[index]
    console.log(seletedItem)
  }

  onFormSubmit() {
    this.submitted = true
    console.log(this.CreateNewAgentForm.value)
    this.parameters = []
    if (this.CreateNewAgentForm.valid) {
      console.log("Valid CreateNewAgentForm")

      console.log(this.AgentRevenueData)

      this.AgentRevenueData.forEach((a: any, index: any) => {
        let parameters = {
          "synId": a.synId,
          "parameter": a.parameter,
          "programName": a.programName,
          "percent": a.percent
        }
        this.parameters.push(parameters)
      });
      console.log(this.parameters)
      let body = {
        "agentPersonal": {
          "objState": 0,
          "agent": {
            "objState": 0,
            "alias": this.CreateNewAgentForm.value.AgentLogin,
            "login": this.CreateNewAgentForm.value.AgentLogin,
            "network": this.CreateNewAgentForm.value.Face,
            "subNetwork": this.CreateNewAgentForm.value.Subnetwork,
            "shortId": 0,
            "status": this.agentstatusList[0].guid,
            "commissionCycle": this.CreateNewAgentForm.value.Cycle != null ? this.CreateNewAgentForm.value.Cycle : undefined,
          },
          "country": this.CreateNewAgentForm.value.Country,
          "email": this.CreateNewAgentForm.value.Email,
          "language": this.CreateNewAgentForm.value.Language,
          "password": this.CreateNewAgentForm.value.Password,

        },
        "parameters": this.parameters
      }
      console.log(body)
      this.AgentControlService.createAgent(body).subscribe((data) => {
        console.log(data);
        if (data.changedObjectList) {
          this.CreateNewAgentPopup = true;
        }
      })
    }
  }
  // PopupClose() {
  //   this.CreateNewAgentPopup = false;
  // }

  changeSelect(date: string) {

    let c = this.DateTimePipe.transforminingDispalyDate(date);

    return (c)

  }

  PopupClose() {
    this.CreateNewAgentPopup = false
    this.submitted = false
    this.CreateNewAgentForm.reset();
    this.CreateNewAgentForm.patchValue({
      Face: this.faceParametersList[0].name,
      Subnetwork: this.faceParametersList[0].name,
      Language: this.LanguagesList[0].guid,
      Country: this.Countries[0].CID
    })
    this.AgentRevenue()
  }
}
