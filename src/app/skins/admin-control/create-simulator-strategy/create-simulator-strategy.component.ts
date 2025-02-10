import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/source/utility.service';

@Component({
  selector: 'create-simulator-strategy',
  templateUrl: './create-simulator-strategy.component.html',
  styleUrls: ['./create-simulator-strategy.component.css']
})
export class CreateSimulatorStrategyComponent implements OnInit {
  @Output() notifyParent = new EventEmitter()
  createSimulatorForm: FormGroup
  dummy: any = 'naresh'
  walletFormatsList: any;
  filteredWalletFormats: any;
  selectedCurrencyCode: any;
  botStrategyTypeList: any;
  lowLimit: boolean = false;
  highLimit: boolean = false;

  constructor(private utilityService: UtilityService) {
    this.createSimulatorForm = new FormGroup({
      strategyName: new FormControl('', [Validators.required]),
      strategyType: new FormControl(),
      initialBalance: new FormControl(0),
      wallet: new FormControl(),
      numberOfBots: new FormControl(0),
      bigBlindFrom: new FormControl(0),
      bigBlindTo: new FormControl(0),
      correctionLow: new FormControl(70),
      correctionHigh: new FormControl(130),
      schedule: new FormControl(),
      preflopSpeedFold: new FormControl(1),
      preflopSpeedCheck: new FormControl(2),
      preflopSpeedCall: new FormControl(2),
      preflopSpeedRaise: new FormControl(3),
      postflopSpeedLow: new FormControl(2),
      postflopSpeedHigh: new FormControl(4),
      enableNow: new FormControl(false),
      LoosePlay: new FormControl(false),
    })
  }

  ngOnInit(): void {
    this.walletFormats()
    this.botStrategyType()
  }

  get f() {
    return this.createSimulatorForm.controls
  }

  strategy() {
    console.log(this.f['strategyType'].value)
  }

  createSimulatorPopup() {
    this.notifyParent.emit()
  }

  walletFormats() {
    let walletFormats = localStorage.getItem("walletFormats")
    if (walletFormats) {
      this.walletFormatsList = JSON.parse(walletFormats)
    }

    this.filteredWalletFormats = this.walletFormatsList.filter((list: any) => list.currencyCode)
    console.log(this.filteredWalletFormats)

    this.createSimulatorForm.patchValue({
      wallet: this.filteredWalletFormats[0].guid
    })

    this.getCurrencyCodeByGuid()
  }

  getCurrencyCodeByGuid() {
    let guid = this.f["wallet"].value
    const wallet = this.filteredWalletFormats.find((w: any) => w.guid.lowLong === guid.lowLong);
    this.selectedCurrencyCode = wallet ? wallet.currencyCode : '';
  }

  botStrategyType() {
    let botStrategyType = localStorage.getItem("botStrategyType")
    if (botStrategyType) {
      this.botStrategyTypeList = JSON.parse(botStrategyType)
    }

    this.createSimulatorForm.patchValue({
      strategyType: this.botStrategyTypeList[0].guid
    })
  }

  change(e: any) {
    console.log(e.target.checked)
    console.log(this.f["enableNow"].value)
  }

  onBigBlindChange(type: any) {
    let fromValue = this.f["bigBlindFrom"].value
    let toValue = this.f["bigBlindTo"].value
    console.log(fromValue, toValue)
    if (type == 'from' && (Number(fromValue) > Number(toValue))) {
      this.f["bigBlindTo"].setValue(this.f["bigBlindFrom"].value)
    } else if (type == 'to' && (Number(fromValue) > Number(toValue))) {
      this.f["bigBlindFrom"].setValue(this.f["bigBlindTo"].value)
    }
  }

  onCorrectionChange(type: any) {
    let lowLimitVal = this.f["correctionLow"].value
    let highLimitVal = this.f["correctionHigh"].value
    console.log(lowLimitVal, highLimitVal)
    Number(lowLimitVal) > 100 ? this.lowLimit = true : this.lowLimit = false
    Number(highLimitVal) <= 100 ? this.highLimit = true : this.highLimit = false

    if (type == 'high' && (Number(lowLimitVal) > Number(highLimitVal))) {
      this.f["correctionLow"].setValue(this.f["correctionHigh"].value)
    } else if (type == 'low' && (Number(lowLimitVal) > Number(highLimitVal))) {
      this.f["correctionHigh"].setValue(this.f["correctionLow"].value)
    }
  }

  onPreflopSpeedChange(type: any) {
    let preflopSpeedFoldVal = this.f["preflopSpeedFold"].value
    let preflopSpeedCheckVal = this.f["preflopSpeedCheck"].value
    let preflopSpeedCallVal = this.f["preflopSpeedCall"].value
    let preflopSpeedRaiseVal = this.f["preflopSpeedRaise"].value
    let postflopSpeedLowVal = this.f["postflopSpeedLow"].value
    let postflopSpeedHighVal = this.f["postflopSpeedHigh"].value

    if (type == 'check' && (Number(preflopSpeedFoldVal) > Number(preflopSpeedCheckVal))) {
      this.f["preflopSpeedFold"].setValue(this.f["preflopSpeedCheck"].value)

    } else if (type == 'fold' && (Number(preflopSpeedFoldVal) > Number(preflopSpeedCheckVal))) {
      this.f["preflopSpeedCheck"].setValue(this.f["preflopSpeedFold"].value)

    } else if (type == 'raise' && (Number(preflopSpeedCallVal) > Number(preflopSpeedRaiseVal))) {
      this.f["preflopSpeedCall"].setValue(this.f["preflopSpeedRaise"].value)

    } else if (type == 'call' && (Number(preflopSpeedCallVal) > Number(preflopSpeedRaiseVal))) {
      this.f["preflopSpeedRaise"].setValue(this.f["preflopSpeedCall"].value)

    } else if (type == 'high' && (Number(postflopSpeedLowVal) > Number(postflopSpeedHighVal))) {
      this.f["postflopSpeedLow"].setValue(this.f["postflopSpeedHigh"].value)

    } else if (type == 'low' && (Number(postflopSpeedLowVal) > Number(postflopSpeedHighVal))) {
      this.f["postflopSpeedHigh"].setValue(this.f["postflopSpeedLow"].value)
    }
  }

  onSubmit() {
    let body = {
      "info": {
        "objState": 0,
        'balance': {
          "value": this.f["initialBalance"].value,
          "wallet": this.f["wallet"].value
        },
        "botsCount": 0,
        "enabled": this.f["enableNow"].value,
        "loosePlayWoPlayers": this.f["LoosePlay"].value,
        "rounds": 0,
        "strategyName": this.f["strategyName"].value,
        "wallet": this.f['wallet'].value,
        "strategyType": this.f["strategyType"].value,
        "activityParams": this.f["schedule"].value,
        "maxBotsCount":this.f["numberOfBots"].value,
        "maxUsageCount":0,
        "usageCount":0,
        "tableFilters": {
          'Item':{
            'maxHighStake' :this.f["bigBlindTo"].value,
			      'minHighStake' :this.f["bigBlindFrom"].value,
          }
        },
        "parameters": {
          "Item": {
            'endCorrection': {
              'value':this.f["correctionHigh"].value,
              'wallet':this.f["wallet"].value
            },
            'startCorrection':{
              'value':this.f["correctionLow"].value,
              'wallet':this.f["wallet"].value
            },
            'postflopSpeedMinMax': {
              'from': this.f["postflopSpeedLow"].value,
              'to': this.f['postflopSpeedHigh'].value
            },
            'preflopSpeedOfCallRaiseMinMax': {
              'from': this.f["preflopSpeedCall"].value,
              'to': this.f['preflopSpeedRaise'].value
            },
            'preflopSpeedOfFoldCheckMinMax': {
              'from': this.f["preflopSpeedFold"].value,
              'to': this.f['preflopSpeedCheck'].value
            },
           
          }
        }

      }
    }
   if(this.createSimulatorForm.valid){
    this.utilityService.setBotStrategy(body).subscribe((data: any) => {
      console.log(data)
    })
   }

  }

}
