import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AffiliateControlService } from 'src/app/source/AffiliateControl.service';

@Component({
  selector: 'create-new-affiliate',
  templateUrl: './create-new-affiliate.component.html',
  styleUrls: ['./create-new-affiliate.component.css']
})
export class CreateNewAffiliateComponent implements OnInit {
  countrylistData: any;
  createAffiliateForm: FormGroup
  LanguagesList: any;
  defaultOptionsList: any;
  campaignProgramList: any;
  submitted: boolean = false;

  constructor(private affiliateService: AffiliateControlService) {
    this.createAffiliateForm = new FormGroup({
      account: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.pattern('^[^0-9]*$')]),
      lastName: new FormControl('', [Validators.pattern('^[^0-9]*$')]),
      address: new FormControl('', [Validators.minLength(5)]),
      city: new FormControl(),
      state: new FormControl(),
      zipcode: new FormControl(),
      country: new FormControl(),
      phone: new FormControl(),
      language: new FormControl(),
      name: new FormControl('', [Validators.required]),
      type: new FormControl(),
      url: new FormControl('', [Validators.pattern('^(https?://)?[^.]+(\\.[^.]+)+$')]),
      withdrawalPostUrl: new FormControl(),
      depositPostUrl: new FormControl(),
      regPostUrl: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.countrylist()
    this.campaignProgram()
  }

  get f() {
    return this.createAffiliateForm.controls
  }

  countrylist() {
    let countrylist = localStorage.getItem('countrylist')
    if (countrylist) {
      this.countrylistData = JSON.parse(countrylist)
    }
    console.log('countrylistData', this.countrylistData)

    let defaultOptions = localStorage.getItem('defaultOptions')
    if (defaultOptions) {
      this.defaultOptionsList = JSON.parse(defaultOptions)
      let defaultCountry = this.countrylistData.find((list: any) => this.defaultOptionsList.defaultCountryId.lowLong == list.CID.lowLong)
      this.createAffiliateForm.patchValue({
        country: defaultCountry.CID
      })
    }
    this.Languages()
  }

  Languages() {
    let Languages = localStorage.getItem('Languages')
    if (Languages) {
      this.LanguagesList = JSON.parse(Languages)
      let defaultLanguage = this.LanguagesList.find((list: any) => this.defaultOptionsList.defaultLanguageId.lowLong == list.guid.lowLong)
      console.log(defaultLanguage)
      this.createAffiliateForm.patchValue({
        language: defaultLanguage.guid
      })
    }
  }

  campaignProgram() {
    let campaignProgram = localStorage.getItem('campaignProgram')
    if (campaignProgram) {
      this.campaignProgramList = JSON.parse(campaignProgram)
    }
    this.createAffiliateForm.patchValue({
      type: this.campaignProgramList[0].guid
    })
  }

  createWMaster() {
    this.submitted = true
    let body1 = this.createAffiliateForm.value
    let { name, type, url, regPostUrl, depositPostUrl, withdrawalPostUrl, account,
      address, city, country, email, firstName, lastName, language, password, phone,
      state, zipcode,
    } = body1

    let body = {
      'webmaster': {
        address, city, country, email, firstName, lastName, language, password, phone,state, zipcode,
        useSpecificDNPAccount: false,
        objState: 0,
        webmaster:{account,objState:0},
        refCampaign: {
          name, type, url, regPostUrl, depositPostUrl, withdrawalPostUrl,
          startDate: new Date().toISOString(),
          webMaster: { account, objState: 0 }
        }
      }
    }
    console.log(body)

    if (this.createAffiliateForm.valid) {
      this.affiliateService.createWMaster(body).subscribe((data: any) => {
        console.log(data)
      })
    }
  }

}
