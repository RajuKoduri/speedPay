import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css']
})
export class PlayerlistComponent implements OnInit {
  selectedItem: any = [];
  changedProperties: any = [];
  all = "All";
  country: any;
  tirle = 'pagination';
  page: number = 1;
  count: number = 0;
  FirstrecordFillter: any = 0;
  PlayerListregDate: any;
  PlayerListregDates: any;
  tableSize: number = 10;
  filterForm: FormGroup;
  namesLists: any;
  PlayerList: any;
  ResultCount: any;
  rowsOnthePage: any;
  FillterMenu: boolean = false;
  loader: boolean = false;
  getSessionData: any;
  getSessionDataAll: any
  countries: any;
  countrieslist: any = [];
  data: any;
  dictionaries: any;
  walletlist: any[] = [];
  walletlists: any = [];
  playerStatusList: any = [];
  ReceiveNewsList: any = [];
  getPlayerLevelsNames: any = [];
  getPlayerLevelsNameslists: any = [];
  BirthdatMonths: any = [];
  faceParameterslist: any = [];
  countryValue: any;
  counter: number = 0;
  p: number = 1;
  selectnum: number = 100;
  selectnumber: number = -5;
  itemsperpagecount = [
    { num: 5 },
    { num: 15 },
    { num: 25 },
    { num: 40 },
    { num: 50 }
  ];
  currentCountry: any;
  resultcount: boolean = true;
  obj: any;
  constructor(private PlayerserviceService: PlayerServiceService) {
    this.filterForm = new FormGroup({
      wallet: new FormControl(),
      accountMask: new FormControl(),
      nickName: new FormControl(),
      shortId: new FormControl(),
      alias: new FormControl(),
      email: new FormControl(),
      Playerlevel: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      ipAddress: new FormControl(),
      networkNames: new FormControl(),
      country: new FormControl(),
      statusesIdList: new FormControl(),
      ReceiveNews: new FormControl(),
      birthMonths: new FormControl(),
      balanceAmounthigh: new FormControl(),
      balanceAmountlow: new FormControl(),
      debtAmountlow: new FormControl(),
      debtAmounthigh: new FormControl(),
      RegistrationStart: new FormControl(),
      RegistrationEnd: new FormControl(),
      birthDayOfMonthFrom: new FormControl(),
      birthDayOfMonthTo: new FormControl(),
      permissionsGroup: new FormControl(),
      affiliateLogin: new FormControl(),
      referringPlayerLogin: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),

    })
  }
  ngOnInit(): void {
    this.getSessionData = localStorage.getItem('getSessionData',)
    this.getSessionDataAll = JSON.parse(this.getSessionData)
    console.log(this.getSessionDataAll)
    console.log(this.getSessionDataAll[0].countries)
    console.log(this.getSessionDataAll[0].dictionaries)
    this.countries = this.getSessionDataAll[0].countries
    this.dictionaries = this.getSessionDataAll[0].dictionaries
    const countries = localStorage.getItem('countrylist')
    if (countries) {
      this.countrieslist = JSON.parse(countries) || [];
    }
    console.log(this.countries)
    const playerstatus = localStorage.getItem('palyerstatus')
    if (playerstatus) {
      this.playerStatusList = JSON.parse(playerstatus)
    }
    console.log("playerStatusList", this.playerStatusList)
    const getPlayerLevelsNameslist = localStorage.getItem('getPlayerLevelsNames')
    if (getPlayerLevelsNameslist) {
      this.getPlayerLevelsNames = JSON.parse(getPlayerLevelsNameslist)
      console.log(this.getPlayerLevelsNames.compPointsLevels)
      for (let i = 0; i < this.getPlayerLevelsNames.compPointsLevels.length; i++) {
        this.getPlayerLevelsNameslists.push(this.getPlayerLevelsNames.compPointsLevels[i])
      }
    }
    console.log("getPlayerLevelsNames", this.getPlayerLevelsNameslists)
    const ReceiveNews = localStorage.getItem('ReceiveNews')
    if (ReceiveNews) {
      this.ReceiveNewsList = JSON.parse(ReceiveNews)
    }
    console.log("ReceiveNews", this.ReceiveNewsList)

    const BirthdatMonths = localStorage.getItem('BirthdatMonths')
    if (BirthdatMonths) {
      this.BirthdatMonths = JSON.parse(BirthdatMonths)
    }
    console.log("BirthdatMonths", this.BirthdatMonths)

    const faceParameterslist = localStorage.getItem('faceParameters')
    if (faceParameterslist) {
      this.faceParameterslist = JSON.parse(faceParameterslist)
    }

    console.log("walletlist", this.walletlist)
    const wallets = localStorage.getItem('walletlist');
    if (wallets) {
      this.walletlist = JSON.parse(wallets);
      for (let i = 0; i < this.walletlist.length; i++) {
        this.walletlists.push(this.walletlist[i])
      }
    }
    console.log(this.walletlist)
    console.log(this.walletlists.value)
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
        }
      });

    return dirtyValues;
  }
  onFormSubmit() {
    this.loader = true;
    this.PlayerList = false;
    console.log(this.filterForm.value);
    if (this.filterForm.value == null) { }
    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    fillterbody['levelGuids'] = this.filterForm.value.Playerlevel != null ? [this.filterForm.value.Playerlevel] : undefined
    fillterbody["networkNames"] = this.filterForm.value.networkNames != null ? [this.filterForm.value.networkNames] : undefined
    fillterbody["birthDayOfMonth"] = this.filterForm.value.birthDayOfMonthFrom != null ? { "from": this.filterForm.value.birthDayOfMonthFrom, "to": this.filterForm.value.birthDayOfMonthTo } : undefined
    fillterbody["birthMonths"] = this.filterForm.value.birthMonths != null ? [this.filterForm.value.birthMonths] : undefined
    fillterbody["balanceAmount"] = this.filterForm.value.balanceAmounthigh != null ? { "high": this.filterForm.value.balanceAmounthigh, "low": this.filterForm.value.balanceAmountlow } : undefined
    fillterbody["debtAmount"] = this.filterForm.value.debtAmounthigh != null ? { "high": this.filterForm.value.debtAmounthigh, "low": this.filterForm.value.debtAmountlow } : undefined
    fillterbody["regDate"] = this.filterForm.value.RegistrationEnd != null ? { "end": this.filterForm.value.RegistrationEnd, "start": this.filterForm.value.RegistrationStart } : undefined
    fillterbody["statusesIdList"] = this.filterForm.value.statusesIdList != null ? [this.filterForm.value.statusesIdList] : undefined


    fillterbody["accountMask"] = this.filterForm.value.accountMask != null ? this.filterForm.value.accountMask : undefined
    fillterbody["wallet"] = this.filterForm.value.wallet != null ? this.filterForm.value.wallet : undefined
    fillterbody["nickName"] = this.filterForm.value.nickName != null ? this.filterForm.value.nickName : undefined
    fillterbody["firstName"] = this.filterForm.value.firstName != null ? this.filterForm.value.firstName : undefined
    fillterbody["email"] = this.filterForm.value.email != null ? this.filterForm.value.email : undefined
    fillterbody["alias"] = this.filterForm.value.alias != null ? this.filterForm.value.alias : undefined
    fillterbody["lastName"] = this.filterForm.value.lastName != null ? this.filterForm.value.lastName : undefined
    fillterbody["shortId"] = this.filterForm.value.shortId != null ? this.filterForm.value.shortId : undefined
    fillterbody["ipAddress"] = this.filterForm.value.ipAddress != null ? this.filterForm.value.ipAddress : undefined
    fillterbody["country"] = this.filterForm.value.country != null ? this.filterForm.value.country : undefined
    fillterbody["ReceiveNews"] = this.filterForm.value.ReceiveNews != null ? this.filterForm.value.ReceiveNews : undefined
    fillterbody["permissionsGroup"] = this.filterForm.value.permissionsGroup != null ? this.filterForm.value.permissionsGroup : undefined
    fillterbody["referringPlayerLogin"] = this.filterForm.value.referringPlayerLogin != null ? this.filterForm.value.referringPlayerLogin : undefined
    fillterbody["affiliateLogin"] = this.filterForm.value.affiliateLogin != null ? this.filterForm.value.affiliateLogin : undefined

    this.PlayerserviceService.playerfilter(fillterbody).subscribe((res) => {
      this.PlayerList = res.objectList;
      console.log(fillterbody);
      console.log(this.PlayerList)
      this.findsum(this.PlayerList)
      if (this.PlayerList != null) {
        this.loader = false;
      }
      for (let i = 0; i < this.PlayerList.length; i++) {
        if (!this.PlayerList[i].affiliate) {
          Object.assign(this.PlayerList[i], { affiliate: { alias: '' } })
        }
        if (!this.PlayerList[i].levelInfo) {
          Object.assign(this.PlayerList[i], { levelInfo: '' })
        }
        for (let m = 0; m < this.countrieslist.length; m++) {
          if (this.PlayerList[i].country.lowLong == this.countrieslist[m].CID.lowLong) {
            this.PlayerList[i].country = this.countrieslist[m].title
          }
        }
        for (let m = 0; m < this.playerStatusList.length; m++) {
          if (this.PlayerList[i].status.lowLong == this.playerStatusList[m].guid.lowLong) {
            this.PlayerList[i].player.status = this.playerStatusList[m].value
            console.log(this.PlayerList[i].player.status)
          }
        }
      }
      for (let i = 0; i < this.PlayerList.length; i++) {
        this.PlayerListregDate = new Date(this.PlayerList[i].regDate.slice(0, 24));
        console.log(this.PlayerListregDate)
        const date = new Date(this.PlayerListregDate);
        this.PlayerListregDates = date.toLocaleString()
        console.log(this.PlayerListregDates)
      }
      this.ResultCount = res.resultCount
      this.rowsOnthePage = res.objectList.length;

      if (this.ResultCount !== null) {
        this.resultcount = false;
      }
    })
    this.FillterMenu = false;
   
  }
  findsum(data: any) {
    this.obj = data
    console.log(this.obj);
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
    this.onFormSubmit()
  }
  setCountryValue(country: any) {
    return this.countrieslist.indexof(country);
  }
  onTableDataChange(event: any) {
    this.tableSize = event.target.value;
    this.page = event;
    this.onFormSubmit();
  }

  input() {
  }
  counterfunc(tb: any) {

    console.log(tb.value.length)
    if (tb.value.length == 1) {
      this.counter++;
    }
    console.log(this.counter)
  }
  dropdowncounterfunc(tb: any) {
    console.log(tb.value.length)
    if (tb.value.length != "") {
      this.counter++;
    }
    console.log(this.counter)
  }
  onChange(data: any) {
    console.log(data)
    this.p = 1;
    this.selectnum = data;
    console.log(this.selectnum);
    this.selectnumber = data;
    console.log(this.selectnum);
  }
  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'PlyerlistExcelSheet.xlsx');
  }
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  ReceiveNewsguid(e: any, guid: string) {
    if (e.target.checked) {
      console.log(guid + "cheked ")
      this.selectedItem.push(guid)
    } else {
      console.log(guid + "uncheked ")
      this.selectedItem = this.selectedItem.filter((m: string) => m != guid)
    }
    console.log(this.selectedItem)
  }
}
