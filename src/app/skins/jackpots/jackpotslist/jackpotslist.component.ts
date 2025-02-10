import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { JackpotsService } from 'src/app/source/Jackpots.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { CommomfilterService } from 'src/app/source/commomfilter.service';



@Component({
  selector: 'app-jackpotslist',
  templateUrl: './jackpotslist.component.html',
  styleUrls: ['./jackpotslist.component.css']
})
export class JackpotslistComponent implements OnInit, OnDestroy{
  FillterList: boolean = false;
  filterForm: FormGroup;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: any;
  jackpotsList: any;
  fakeArray: any;
  dataLoader: boolean = false;
  walletstypes: any;
  wallettypelist: any = [];
  walletFormats: any;
  walletFormatsList: any = [];
  jackpotpopup: boolean = false;
  subJackpot: any = [];
  right_clickOnly: boolean = true;
  dropDownList: any;
  topMargin: any;
  tablePrint: any;
  dataPrint: any;
  currencys: any = [];
  value: any;
  obj: any;
  SUM: any;
  currentAmountValue: any;
  simulatedAmountValue: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  Enabled_Disabled_AllList: any;
  BadBeatMinCombinationsList: any;
  NewJackpot: any;
  btnsave: boolean = false;
  jackpotTypesList: any;
  MinCombination: any;
  SpinnwerT: boolean = false;
selectedFillterGames: any;
  gamesTobeSelected: any;
  selectedcurrency: any = [];
  currencyarray: any = [];
  currencystatus: any = [];
  dropdownSettingscurrency: any;
  walletlists: any = [];

  deselestarry: any = [];
  currencyFormatsSymbol: any=[];

  constructor(private Jackpotsservice: JackpotsService,private FileformatServiceService: FileformatServiceService,
    private GamesofpokerService: GamesofpokerService, private CommomfilterService:CommomfilterService ) {
    this.filterForm = new FormGroup({
      jackpotname: new FormControl(),
      ownername: new FormControl(),
      currency: new FormControl(),
      jackpotsimulator: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }
  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
    // throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.walletTypes();
    this.walletFormat();
    this.Enabled_Disabled_All();
    this.jackpotTypes();
    this.BadBeatMinCombinations();
  }


  validateAndSanitizeInput(event: any, maxLength: number = Infinity): void {
     // Ensure the input value is a string
  let inputValue = (event.target as HTMLInputElement).value;

  // Remove any non-numeric characters using a regular expression
  inputValue = inputValue.replace(/[^0-9+-]/g, '');

  // Prevent consecutive '+' or '-' characters
  inputValue = inputValue.replace(/([+-])\1+/g, '$1');

  // Prevent '+' or '-' as the first character
  if (/^[+-]/.test(inputValue)) {
    inputValue = inputValue.slice(1);
  }

  // Trim to the specified maximum length
  inputValue = inputValue.slice(0, maxLength);

  // Update the ngModel binding with the sanitized value
  this.subJackpot.currentAmount.value = inputValue;
  }


  inputpayout12(data: any) {
    var k;
    k = data.charCode;
    return ((k > 47 && k < 58) || k == 46)
  }



  walletTypes() {
    const walletTypes = localStorage.getItem("walletTypes")
    const currencyFormatsSymbol = localStorage.getItem("currencyFormatsSymbol");
    if(currencyFormatsSymbol){
      this.currencyFormatsSymbol = JSON.parse(currencyFormatsSymbol);
    }
    
    if (walletTypes) {
      this.wallettypelist = JSON.parse(walletTypes)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips") {
        if (this.wallettypelist[i].clubGameWallet == true) {
          if (this.wallettypelist[i].faceWallet == true) {
            this.currencys.push(this.wallettypelist[i])
          }
        }
      }

    }
    console.log("walletlists", this.currencys);
    console.log(this.wallettypelist)
    console.log("currencyFormatsSymbol", this.currencyFormatsSymbol);
  }
  // walletTypes() {
  //   const walletstypes = localStorage.getItem('walletTypes');
  //   if (walletstypes) {
  //     this.wallettypelist = JSON.parse(walletstypes);
  //     for (let i = 0; i < this.wallettypelist.length; i++) {
  //       if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips" || this.wallettypelist[i].description == "Free Money") {
  //         this.currencys.push(this.wallettypelist[i])
  //       }
  //     }
  //     console.log("walletTypesList", this.currencys)
  //     console.log("walletTypes", this.wallettypelist)
  //   }
  // }
  walletFormat() {
    this.walletFormats = localStorage.getItem('walletFormats')
    this.walletFormatsList = JSON.parse(this.walletFormats)
    console.log("walletFormat", this.walletFormatsList)


    // this.walletFormats = localStorage.getItem('walletFormats')
    // this.walletFormatsList = JSON.parse(this.walletFormats)
    // console.log(this.walletFormatsList)


    this.walletlists= this.GamesofpokerService.walletTypes();
    console.log(this.walletlists)
     
     for (let i = 0; i < this.walletlists.length; i++) {
       this.selectedcurrency[i] = {
         description: this.walletlists[i].description,
         guid: this.walletlists[i].guid
       }
     }
     console.log(this.selectedcurrency)
     this.selectedcurrency.forEach((item: { guid: any; }) => {
       this.currencyarray.push(item.guid);
     });
     this.deselestarry = this.currencyarray
     this.currencystatus = this.walletlists;
     console.log(this.currencystatus);
     this.selectedcurrency = this.currencystatus;
     this.dropdownSettingscurrency = {
       singleSelection: false,
       idField: 'guid',
       textField: 'description',
       selectAllText: 'Select All',
       unSelectAllText: 'UnSelect All',
       itemsShowLimit: 1,
       allowSearchFilter: false
     };

  }
  Enabled_Disabled_All() {
    const Enabled_Disabled_All = localStorage.getItem("Enabled_Disabled_All")
    if (Enabled_Disabled_All) {
      this.Enabled_Disabled_AllList = JSON.parse(Enabled_Disabled_All)
      this.filterForm.patchValue({
        jackpotsimulator: this.Enabled_Disabled_AllList[0].guid
      })
    }
  }
  jackpotTypes() {
    const jackpotTypes = localStorage.getItem("jackpotTypes");
    if (jackpotTypes) {
      this.jackpotTypesList = JSON.parse(jackpotTypes);
      console.log("jackpotTypes", this.jackpotTypesList)
    }
  }
  BadBeatMinCombinations() {
    const BadBeatMinCombinations = localStorage.getItem('BadBeatMinCombinations');
    if (BadBeatMinCombinations) {
      this.BadBeatMinCombinationsList = JSON.parse(BadBeatMinCombinations)
    }
    console.log("BadBeatMinCombinationsList", this.BadBeatMinCombinationsList)
  }
  fillterMenu() {
    this.FillterList = !this.FillterList;
  }
  getValues(form: any) {
    let Values: any = {};
    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];
        if (currentControl.dirty) {
          if (currentControl.controls)
            Values[key] = this.getValues(currentControl);
        }
      });
    return Values;
  }


 









  onFormSubmit() {
    this.FillterList = false;
    this.dataLoader = true;
    this.jackpotsList = false;
    console.log(this.filterForm.value)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }

    let fillterbody = this.getValues(this.filterForm)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    // fillterbody["name"] = this.filterForm.value.jackpotname != null ? this.filterForm.value.jackpotname : undefined
    fillterbody["name"] = "Bad Beat Jackpot"
    // fillterbody["wallets"] = this.filterForm.value.currency != null ? [this.filterForm.value.currency] : undefined
    fillterbody["wallets"] = this.currencyarray != null ? this.currencyarray : undefined
    fillterbody["ownerName"] = this.filterForm.value.ownername != null ? this.filterForm.value.ownername : undefined
    fillterbody["simulated"] = this.filterForm.value.jackpotsimulator != null ? this.filterForm.value.jackpotsimulator : undefined
    console.log(this.filterForm.value.currency)
    this.Jackpotsservice.jackpotslist(fillterbody).subscribe((res) => { this.getJackpotData(res) })
  }

  getJackpotData(data: any) {
    this.jackpotsList = [];
    console.log(data);
    this.jackpotsList = data.objectList;
    console.log(this.jackpotsList);

    for (let i=0; i<this.wallettypelist.length;i++){
      for(let j=0; j < this.currencyFormatsSymbol.length; j++){
        if(this.wallettypelist[i]?.currency?.hiLong == this.currencyFormatsSymbol[j]?.guid.hiLong && 
          this.wallettypelist[i]?.currency?.lowLong == this.currencyFormatsSymbol[j]?.guid?.lowLong ){
            for(let k=0; k<this.jackpotsList.length;k++){
              if(this.jackpotsList[k]?.currentAmount?.wallet?.hiLong ==this.wallettypelist[i]?.guid?.hiLong &&
                this.jackpotsList[k]?.currentAmount?.wallet?.lowLong ==this.wallettypelist[i]?.guid?.lowLong){
                  this.jackpotsList[k].moneyType =  this.currencyFormatsSymbol[j]?.currencyCode

              }
            }
        }
        break;

      }

    }
    

    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.jackpotsList != null || data.resultCount == 0) {
      this.dataLoader = false;
    }
    this.sumOfRow(this.jackpotsList)

    for (let i = 0; i < this.jackpotsList.length; i++) {
      for (let m = 0; m < this.wallettypelist.length; m++) {
        if (this.jackpotsList[i].moneyType.lowLong == this.wallettypelist[m].guid.lowLong) {
          this.jackpotsList[i].moneyType = this.wallettypelist[m].description
        }
      }
      // for (let p = 0; p < this.walletFormatsList.length; p++) {
      //   if (this.walletFormatsList[p].guid.lowLong == this.jackpotsList[i].currentAmount.wallet.lowLong) {
      //     this.jackpotsList[i].currentAmount.value = `${this.walletFormatsList[p]?.symbol}` + this.jackpotsList[i].currentAmount.value;
      //   }
      //   if (this.walletFormatsList[p].guid.lowLong == this.jackpotsList[i].simulatedAmount.wallet.lowLong) {
      //     this.jackpotsList[i].simulatedAmount.value = `${this.walletFormatsList[p]?.symbol}` + this.jackpotsList[i].simulatedAmount.value;
      //   }
      // }
    }
    console.log(this.jackpotsList);

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)|| this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }
  onClick(event: any) {
    console.log(event)
    // this.subJackpot = this.jackpotsList[event]
    this.subJackpot = JSON.parse(JSON.stringify(this.jackpotsList[event]))
    console.log(this.subJackpot)
    this.jackpotpopup = true;
    this.btnsave = false;
    for (let i = 0; i < this.BadBeatMinCombinationsList.length; i++) {
      if (this.subJackpot.settings[0].minCombination.lowLong == this.BadBeatMinCombinationsList[i].guid.lowLong && this.subJackpot.settings[0].minCombination.hiLong == this.BadBeatMinCombinationsList[i].guid.hiLong) {
        this.MinCombination = this.BadBeatMinCombinationsList[i].guid
      }
    }
  }
  closePopup() {
    this.jackpotpopup = false;
  }
  sumOfRow(data: any) {
    this.obj = data
    console.log(this.obj);
    this.currentAmountValue = this.obj.reduce((a: any, b: { currentAmount: any; }) => (a + b.currentAmount.value), 0);
    console.log(this.currentAmountValue)
    this.simulatedAmountValue = this.obj.reduce((a: any, b: { simulatedAmount: any; }) => (a + b.simulatedAmount.value), 0);
    console.log(this.simulatedAmountValue)
  }
  ignoreContext() {
    this.jackpotsList = [];
    this.jackpotsList = false;
    this.dataLoader = true;
  }
  NewJackpotCal() {
    let PayoutSettings = this.subJackpot.settings[0];
    this.NewJackpot = 100 - (PayoutSettings.badBeatHandPercent + PayoutSettings.winnerHandPercent + PayoutSettings.restPlayersPercent + PayoutSettings.houseRevenuePercent).toFixed(2)
    // this.NewJackpot = 100 - parseFloat((Math.round((PayoutSettings.badBeatHandPercent + PayoutSettings.winnerHandPercent + PayoutSettings.restPlayersPercent + PayoutSettings.houseRevenuePercent) * 100) / 100).toFixed(2));
    //  this.NewJackpot = 100 - (Math.round(PayoutSettings.badBeatHandPercent + PayoutSettings.winnerHandPercent + PayoutSettings.restPlayersPercent + PayoutSettings.houseRevenuePercent)),2
    // console.log(Math.round(PayoutSettings.badBeatHandPercent + PayoutSettings.winnerHandPercent + PayoutSettings.restPlayersPercent + PayoutSettings.houseRevenuePercent), 2)
    // console.log(this.NewJackpot)

    return this.NewJackpot.toFixed(2)
    // return this.NewJackpotCal()
  }
  btnSaveDisable() {
    let PayoutSettings = this.subJackpot.settings[0];
    console.log(PayoutSettings.potPart.value)
    console.log(PayoutSettings.feePerPotPart.value)
    if (PayoutSettings.potPart.value < 0.02 || PayoutSettings.feePerPotPart.value <= 0 || PayoutSettings.maxFee.value <= 0 || PayoutSettings.minActivePlayers <= 0 || PayoutSettings.minActivePlayers >= 11 || PayoutSettings.badBeatHandPercent <= 0 || PayoutSettings.winnerHandPercent <= 0 || PayoutSettings.restPlayersPercent <= 0 || this.NewJackpotCal() < 0) {
      this.btnsave = true
    } else {
      this.btnsave = false
    }

    console.log(this.NewJackpotCal())
    // if (this.NewJackpotCal() < 0) {
    //   this.btnsave = true
    // } else {
    //   this.btnsave = false

    // }
  }
  isNegativeValue(): boolean {
    return this.NewJackpotCal() < 0;
  }
  setJackpot() {
    this.SpinnwerT = true;
    this.jackpotpopup = false;
    let PayoutSettings = this.subJackpot.settings[0];
    let removed = ['moneyType', 'simulated', 'simulatedAmount']
    const selectedKeysObject: any = {};
    // removed.forEach((key) => {
    //   console.log(key)
    //   if (!this.subJackpot.hasOwnProperty(key)) {
    //     console.log(this.subJackpot[key])
    //     selectedKeysObject[key] = this.subJackpot[key];
    //   }
    // });
    Object.keys(this.subJackpot).forEach((key) => {
      if (removed.includes(key)) {
        selectedKeysObject[key] = this.subJackpot[key];
      }
    });

    // console.log("selectedKeysObject", selectedKeysObject);
    console.log("selectedKeysObject", selectedKeysObject)
    // alert(2)
    if (this.NewJackpotCal() >= 0) {
      let body = {
        "guid": this.subJackpot.guid,
        "objState": 0,
        "currentAmount":  this.subJackpot.currentAmount,
        "jackpotType": this.subJackpot.jackpotType,
        "number": this.subJackpot.number,
        "percent": this.subJackpot.percent,
        "settings": [
          {
            "badBeatHandPercent": PayoutSettings.badBeatHandPercent,
            "winnerHandPercent": PayoutSettings.winnerHandPercent,
            "restPlayersPercent": PayoutSettings.restPlayersPercent,
            "houseRevenuePercent": PayoutSettings.houseRevenuePercent,
            "feePerPotPart": { "value": PayoutSettings.feePerPotPart.value, "wallet": PayoutSettings.minRake.wallet },
            "maxFee": { "value": PayoutSettings.feePerPotPart.value, "wallet": PayoutSettings.minRake.wallet },
            "minActivePlayers": PayoutSettings.minActivePlayers,
            "minCombination": this.MinCombination,
            "minRake": { "value": PayoutSettings.minRake.value, "wallet": PayoutSettings.minRake.wallet },
            "potPart": { "value": PayoutSettings.potPart.value, "wallet": PayoutSettings.minRake.wallet },
          }
        ]
      }
      console.log(body)
      this.Jackpotsservice.setJackpot(body).subscribe(data => {
        console.log(data)
        if (data.changedObjectList) {
          this.jackpotpopup = false;
          this.SpinnwerT = false;
          this.onFormSubmit()
        }
      })
    }
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'JackpotslistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'JackpotslistExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element,"JackpotslistExcelSheet")
  }

  onPrint() {
    this.tablePrint = document.getElementById("tablerecords");
    this.dataPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    console.log(this.tablePrint)
    console.log(this.dataPrint)
    this.dataPrint.document.write(this.tablePrint.innerHTML);
    this.dataPrint.document.close();
    this.dataPrint.focus();
    this.dataPrint.print();
    this.dataPrint.close();
  }

  FormReset() {
    this.filterForm.reset();
  }

  fastbackforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt("1")
      })
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    if (this.PageCount > this.jackpotsList.length) {

      this.pagecontrolbtn = true
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)

  }

  fastforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1
      })

    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    console.log(this.ResultCount)
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }

    this.onFormSubmit()
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)
  }


  next() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    console.log(this.ResultCount)
    console.log(this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log(((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)|| this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit()

  }

  prev() {
    console.log("......Hhello......")
    if ((this.filterForm.value.firstRecord - 1) == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1)
    if (this.PageCount > this.jackpotsList.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }

   // *******************************@Satarts currency Dropdown************************************************************
  
   onItemSelectcurrency(data: any) {
    this.currencyarray = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  
  OnItemDeSelectcurrency(data: any) {
    this.currencyarray = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
    if (this.currencyarray === null || this.currencyarray.length === 0) {
      console.log("Empty");
      this.currencyarray = this.deselestarry
    }
  
  }
  onSelectAllcurrency(data: any) {
    this.currencyarray = []
    data.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  onDeSelectAllcurrency(data: any) {
    this.currencyarray = []
    this.currencyarray = this.deselestarry
    // data.forEach((item: { guid: any; }) => {
    //   this.playerstatusaaray.push(item.guid);
    // });
    console.log(this.currencyarray)
  }


// **********************************@Ends currency Dropdown****************************************************************************
}