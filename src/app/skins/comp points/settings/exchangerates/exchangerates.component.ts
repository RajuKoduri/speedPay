import { Component, OnInit } from '@angular/core';
import { ComppointsService } from 'src/app/source/comppoints.service';
@Component({
  selector: 'app-exchangerates',
  templateUrl: './exchangerates.component.html',
  styleUrls: ['./exchangerates.component.css']
})
export class ExchangeratesComponent implements OnInit {
  ratesEX: any;
  exchangeRATE: any;
  exchangeRATElist: any;
  tourdata: any;
  tourdatas: any;
  cashdata: any = [];
  cashdatas: any = [];
  bounsdata: any = [];
  bounsdatas: any = [];
  showstandgo: boolean = true;
  showstandgosub: boolean = true;
  showcash: boolean = true;
  showcashsub: boolean = true;
  showtour: boolean = true;
  showtoursub: boolean = true;
  loader: boolean = false;
  errorpopup: boolean = false

  bonuspopup: boolean = false;
  walletFormatList: any = [];
  currencySymbol: any;
  exchangeRatePopupData: any = [];
  compPointsValue: any;
  amountValue: any;
  selectedIndex: number = 0;
  exchangeRatePopupData01: any = [];
  errorMessage: any;
  compPointsSum: any;
  amountSum: any;
  constructor(private comppointsService: ComppointsService) { }

  ngOnInit(): void {
    this.exchangeRATE = localStorage.getItem('DYIDCOMPPOINTSEXCHANGETYPE')
    this.exchangeRATElist = JSON.parse(this.exchangeRATE)
    console.log(" this.exchangeRATElist", this.exchangeRATElist)
    this.walletFormats()
    this.onFormSubmit()
  }
  walletFormats() {
    const walletFormats = localStorage.getItem("walletFormats")
    if (walletFormats) {
      this.walletFormatList = JSON.parse(walletFormats)
    }
    console.log(this.walletFormatList)
  }
  onFormSubmit() {
    this.loader = true;
    this.ratesEX = false;
    let body = {}
    this.comppointsService.exchanges(body).subscribe((data) => this.exchangpoi(data))
  }
  exchangpoi(data: any) {
    this.loader = false;
    this.ratesEX = data.objectList
    console.log('this.ratesEX', this.ratesEX)
    // for (let i = 0; i < this.ratesEX.length; i++) {
    //   for (let m = 0; m < this.exchangeRATElist.length; m++) {
    //     if (this.ratesEX[i].exchangeType.lowLong == this.exchangeRATElist[m].guid.lowLong) {
    //       this.ratesEX[i].exchangeTypeName = this.exchangeRATElist[m].value
    //       if (this.ratesEX[i].exchangeTypeName == 'Tournament Buy-In') {
    //         this.tourdata = this.ratesEX[i].moneyValue
    //       }
    //       if (this.ratesEX[i].exchangeTypeName == 'Bonus') {
    //         this.bounsdata.push(this.ratesEX[i].moneyValue)
    //       }
    //       if (this.ratesEX[i].exchangeTypeName == 'Cash') {
    //         this.cashdata.push(this.ratesEX[i].moneyValue)
    //       }
    //     }

    //   }
    // }


    // for (let i = 0; i < this.ratesEX.length; i++) {
    //   for (let m = 0; m < this.exchangeRATElist.length; m++) {
    //     if (this.ratesEX[i].guid.lowLong == this.exchangeRATElist[m].guid.lowLong) {
    //       // this.ratesEX[i].guid = this.exchangeRATElist[m].value
    //       if (this.ratesEX[i].guid == 'Tournament Buy-In') {
    //         this.tourdatas = this.ratesEX[i].compPoints
    //       }
    //       if (this.ratesEX[i].guid == 'Bonus') {
    //         this.bounsdatas.push(this.ratesEX[i].compPoints)
    //       }
    //       if (this.ratesEX[i].guid == 'Cash') {
    //         this.cashdatas.push(this.ratesEX[i].compPoints)
    //       }
    //     }

    //   }
    // }

    this.compPointsSum = this.ratesEX.reduce((sum:any,rate:any)=>{return sum+rate.compPoints.value},0)
    this.amountSum = this.ratesEX.reduce((sum:any,rate:any)=>{return sum+rate.moneyValue.value},0)

    console.log(this.compPointsSum, this.amountSum)


    console.log('---------------------------------------------------')
    console.log(this.cashdatas)
    console.log(this.cashdata)
    console.log('---------------------------------------------------')

    // console.log(this.currencySymbol)
    this.walletSymbol(this.ratesEX)
  }

  walletSymbol(data: any) {
    this.walletFormatList.forEach((walletForm: any, i: number) => {
      data.forEach((rate: any, j: number) => {
        if (walletForm.guid.lowLong == rate.wallet.lowLong) {
          if (walletForm.symbol) {
            data[j].symbol = walletForm.symbol
            this.currencySymbol = walletForm.symbol
          } else if (walletForm.currencyCode) {
            data[j].symbol = walletForm.currencyCode
            this.currencySymbol = walletForm.currencyCode
          }
        }

        this.exchangeRATElist.forEach((element: any) => {
          if (rate.exchangeType?.lowLong == element.guid?.lowLong) {
            rate.exchangeTypeName = element.value
          }
        });

      })
    })
    console.log(data)
  }
  changbouns() {
    this.showstandgo = !this.showstandgo
  }
  changbounsSub() {
    this.showstandgosub = !this.showstandgosub
  }
  changcash() {
    this.showcash = !this.showcash
  }
  changecashSub() {
    this.showcashsub = !this.showcashsub
  }
  changtourna() {
    this.showtour = !this.showtour
  }
  changetournSub() {
    this.showtoursub = !this.showtoursub
  }

  closepopup() {
    this.bonuspopup = false
  }

  closeErrorpopup() {
    this.errorpopup = false
  }

  exchangeRatePopup(i: number, data: any) {
    this.bonuspopup = !this.bonuspopup
    console.log(i, data)
    // this.exchangeRatePopupData = this.ratesEX.filter((rate:any)=>rate.exchangeTypeName == data.exchangeTypeName)
    // console.log(this.exchangeRatePopupData)

    let body = {
      exchangeType: data.exchangeType,
      wallet: data.wallet
    }
    this.comppointsService.exchanges(body).subscribe((data) => {
      this.exchangeRatePopupData = data.objectList;

      this.walletSymbol(data.objectList)
      this.exchangeRatePopupData01 = [...this.exchangeRatePopupData]
    })
    console.log(this.exchangeRatePopupData)
  }
  click(i: number) {
    this.selectedIndex = i
    console.log(this.selectedIndex)
  }
  newExchangeRate() {
    let data = JSON.parse(JSON.stringify(this.exchangeRatePopupData01[0]))
    let obj = data
    data.moneyValue.value = 0
    data.compPoints.value = 0
    this.exchangeRatePopupData.push(obj)
    console.log("this.exchangeRatePopupData", this.exchangeRatePopupData)
  }

  deleteSelectedRate() {
    this.exchangeRatePopupData.splice(this.selectedIndex, 1)
    console.log(this.exchangeRatePopupData) 
    this.selectedIndex = 0
  }

  updateData() {
    let validate: boolean = true
    const seenValues = new Set();
    let type: any
    let updatedArray = this.exchangeRatePopupData.map((obj: any) => {
      let { symbol, exchangeTypeName, ...rest } = obj
      type = obj.exchangeType
      console.log(type)
      return rest
    })
    console.log(this.exchangeRatePopupData)
    console.log(updatedArray)

    updatedArray.forEach((item: any) => {
      let value = item.compPoints.value
      if (value == 0) {
        this.errorpopup = true
        validate = false
        this.errorMessage = 'Zero value is not allowed for "Comp points" field'
      } else if (value) {
        console.log(seenValues.has(Number(value)))
        if (seenValues.has(Number(value))) {
          this.errorpopup = true
          validate = false
          this.errorMessage = 'Exchange rate with the same Comp points value already exists. It should not be Exchange rate setting with the same Comp points values'
        } else {
          seenValues.add(value);
        }
      }
    })
    let body = {
      'ratesSettings': updatedArray,
      'type': type
      // {
      //   'objectList': updatedArray,
      // },
    }
    if (validate) {
      this.comppointsService.setCompPointsExchangeRates(body).subscribe((data) => {
        console.log(data)
      })
    }
  }

}




