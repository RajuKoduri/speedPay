import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { TotalSumsService } from 'src/app/source/total-sums.service';

@Component({
  selector: 'app-lockedbonuses',
  templateUrl: './lockedbonuses.component.html',
  styleUrls: ['./lockedbonuses.component.css']
})
export class LockedbonusesComponent implements OnInit {
  filterForm: FormGroup;
  FillterMenu: boolean = false;
  LockedbonusList: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  loader: boolean = false;
  walletlist: any[] = [];
  value: any;
  total: any;
  obj: any;
  balance_1: any;
  bonusvalue: any;
  lockedBonusValue: any;
  accumulatedBetValue: any;
  remainingBetValue: any;
  Registrationdetailspopup: boolean = false;
  playerfulldetails: any;

  currencyarray: any = [];
  selectcurrency: any = [];
  currencydropdownlist: any = [];
  dropdownSettingscurrency = {};

  constructor(private PlayerserviceService: PlayerServiceService, private FileformatServiceService: FileformatServiceService,
    private totalSumService:TotalSumsService,
  ) {
    this.filterForm = new FormGroup({
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
      currency: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.walletTypes();

  }

  walletTypes() {
    const currency = localStorage.getItem('walletTypes')
    if (currency) {
      let walletlist = JSON.parse(currency);
      console.log(walletlist)
      for (let i = 0; i < walletlist.length; i++) {
        if (walletlist[i].clubGameWallet == true) {
          if (walletlist[i].description != "Play Money") {
            this.walletlist.push(walletlist[i])
          }
        }
      }
    }
    console.log("walletlist", this.walletlist);
    for (let i = 0; i < this.walletlist.length; i++) {
      console.log("ggggggggg", this.walletlist[i])
      this.selectcurrency[i] = {
        value: this.walletlist[i].value,
        guid: this.walletlist[i].guid
      }
    }
    console.log(this.selectcurrency)
    this.selectcurrency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    this.currencydropdownlist = this.walletlist;
    console.log(this.currencydropdownlist);
    this.dropdownSettingscurrency = {
      singleSelection: true,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectcurrency = this.currencydropdownlist
    console.log(this.selectcurrency)
  }


  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
          // else
          //   dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }

  onFormSubmit() {
    this.FillterMenu = false;
    this.loader = true;
    this.LockedbonusList = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    // let fillterbody = {}
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["wallet"] = this.currencyarray != null ? this.currencyarray[0] : undefined;
    this.PlayerserviceService.getAccLockedBonuses(fillterbody).subscribe((res) => { this.LockedBonusresData(res) })
  }
  LockedBonusresData(res: any) {
    this.loader = false; 

    console.log(res)
    this.LockedbonusList = res.objectList;
    this.ResultCount = res.resultCount
    this.rowsOnthePage = res.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    this.findsum(this.LockedbonusList)
  }

  getWalletSymbol(wallet: any) {
    return this.totalSumService.walletSymbol(wallet)
  }

  findsum(data: any) {
    // debugger  
    this.obj = data
    console.log(this.obj);
    // let totalBetVal = this.value.balance.reduce((prev: any, cur: { value: any; }) => prev + cur.value, 0)+this.value.balance;
    // var totalBetVal = this.value.balance.reduce(function(a:any, b:any){ return a + b.value; });
    // console.log( totalBetVal )
    // var total = [0, 1, 2, 3].reduce(function(a, b){ return a + b; }); 
    // console.log("total is : " + total );
    // this.obj.reduce( function(a:any, b:any) {
    //   return{ x: a.balance.value + b.balance.value }
    // } )

    this.balance_1 = this.obj.reduce((a: any, b: { balance: any; }) => (a + b.balance.value), 0);
    console.log(this.balance_1)
    this.bonusvalue = this.obj.reduce((a: any, b: { bonus: any; }) => (a + b.bonus.value), 0);
    console.log(this.bonusvalue)
    this.lockedBonusValue = this.obj.reduce((a: any, b: { lockedBonus: any; }) => (a + b.lockedBonus.value), 0);
    console.log(this.lockedBonusValue)
    // this.accumulatedBetValue = this.obj.reduce((a: any, b: { accumulatedBet: any; }) => (a + b.accumulatedBet.value), 0);

    this.accumulatedBetValue = this.obj.reduce((total: number, item: any) => {

      if (item.accumulatedBet && typeof item.accumulatedBet.value === 'number') {
        return total + item.accumulatedBet.value;
      } else {
        return total;
      }
    }, 0);

    console.log(this.accumulatedBetValue)
    this.remainingBetValue = this.obj.reduce((a: any, b: { remainingBet: any; }) => (a + b.remainingBet.value), 0);
    console.log(this.remainingBetValue)

    // for(let j=0;j<data.length;j++){ 
    //      this.total+= this.value[j].balance.value
    //      console.log(this.total)  
    // }  
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'LockedBonusesExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "LockedBonusesExcelSheet")
  }

  closepopup() {
    this.Registrationdetailspopup = false
  }
  PopupOpen() {
    this.Registrationdetailspopup = true;
  }

  onClick(event: any) {
    console.log(event)
    // console.log( this.PlayerList[event] )
    this.playerfulldetails = this.LockedbonusList[event]
    console.log(this.playerfulldetails)
    this.Registrationdetailspopup = true;
  }

  // **********************currency (onselect)********************
  Onselectedcurrency(data: any) {
    this.currencyarray = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  OnItemDeselectedcurrency(data: any) {
    this.currencyarray = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  OnselectedAllcurrency(data: any) {
    this.currencyarray = []
    data.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  OnDeselectedDeAllcurrency(data: any) {
    this.currencyarray = []
    data.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }

}
