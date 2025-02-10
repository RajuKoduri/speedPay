import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dropdown } from 'bootstrap';
@Component({
  selector: 'app-player-pending-cashout',
  templateUrl: './player-pending-cashout.component.html',
  styleUrls: ['./player-pending-cashout.component.css']
})
export class PlayerPendingCashoutComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  timeerror: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  startDate: any;
  endDate: any = Date;
  todaydate: any;
  steddate: boolean = false
  PlayerguidList: any;
  PlayerCashouts: any;
  ResultCount: any;
  rowsOnthePage: any;
  loader: boolean = false;
  resultcount: boolean = true;
  CashOutStatusList: any;
  pagecontrolbtn: boolean = false;
  PageCount: number = 0;

  selectStatus: any = [];
  StatusGuids: any = [];
  copyStatusguid: any = [];
  dropdownSettingStatuS = {};
  walletLists: any;
  currencyList: any[] = [];
  dropdownSettingscurrency:any;
  selectedCurrency:any[] = []
  currencyGuid: any[] = [];
  CopyCurrencyTotalGuids: any[] = []; 


  constructor(private PlayerServiceService: PlayerServiceService,private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      currency: new FormControl(),
      Status: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    });
  }

  ngOnInit(): void {
    this.Playerguid();
    this.CashOutStatus();
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.walletTypes()
  }

  walletTypes(){
    let walletTypes = localStorage.getItem("walletTypes")
    if(walletTypes){
      this.walletLists = JSON.parse(walletTypes)
    }
    console.log(this.walletLists)
    this.walletLists.forEach((wallet:any)=>{
      if(wallet.clubGameWallet == true && wallet.description != "Play Money"){
        this.currencyList.push(wallet)
      }
    })
    console.log(this.currencyList)

    this.currencyGuid = this.currencyList.map((curr:any)=>{
      return curr.guid
    })
    console.log(this.currencyGuid)
    this.CopyCurrencyTotalGuids = this.currencyGuid

    this.selectedCurrency = [...this.currencyList]

    console.log(this.selectedCurrency)

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

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  Playerguid() {
    const Playerguid = sessionStorage.getItem('Playerguid')
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }
  CashOutStatus() {
    const CashOutStatus = localStorage.getItem('CashOutStatus');
    if (CashOutStatus) {
      this.CashOutStatusList = JSON.parse(CashOutStatus)
      console.log(this.CashOutStatusList)

      for (let i = 0; i < this.CashOutStatusList.length; i++) {
        this.selectStatus[i] = {
          value: this.CashOutStatusList[i].value,
          guid: this.CashOutStatusList[i].guid
        }
      }
      console.log(this.CashOutStatusList)
      this.selectStatus.forEach((item: { guid: any; }) => {
        this.StatusGuids.push(item.guid)
      });
      this.copyStatusguid = this.StatusGuids
      console.log(this.StatusGuids)

      this.dropdownSettingStatuS = {
        singleSelection: false,
        idField: 'guid',
        textField: 'value',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      }
    }
  }

  onFormSubmit() {
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.loader = true;
    this.PlayerCashouts = false;
    let body = {
      "firstRecord": this.filterForm.value.firstRecord - 1,
      "maxCountRecord": this.filterForm.value.maxCountRecord,
      "idList": [this.PlayerguidList],
      "reportPeriod": this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined,
      "wallets": this.currencyGuid
    };
    this.PlayerServiceService.getPlayerCashoutRequest(body).subscribe((data) => {
      console.log(data);
      if (data.objectList) {

        this.PlayerCashouts = data.objectList;
        for (let i = 0; i < this.PlayerCashouts.length; i++) {
          for (let j = 0; j < this.CashOutStatusList.length; j++) {
            if (this.PlayerCashouts[i].status.lowLong == this.CashOutStatusList[j].guid.lowLong) {
              this.PlayerCashouts[i].status = this.CashOutStatusList[j].value
            }
          }
          }
          this.PlayerCashouts


        this.ResultCount = data.resultCount;
        this.rowsOnthePage = data.objectList.length;

        if (this.ResultCount != null) {
          this.resultcount = false;
        }
        this.loader = false;
      }

      if (this.rowsOnthePage <= this.ResultCount) {
        this.pagecontrolbtn = true
      } else {
        this.pagecontrolbtn = false
      }

    });
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
    if (this.PageCount > this.PlayerCashouts.length) {

      this.pagecontrolbtn = true
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
    if (this.PageCount > this.PlayerCashouts.length) {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'pendingCashoutsExeclSheet.xlsx';
    XLSX.writeFile(wb, 'pendingCashoutsExeclSheet.xlsx');
  }


  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "pendingCashoutsExeclSheet")
  }

  showDate(data: any) {
    console.log(this.filterForm.value.endDate)
    if (this.filterForm.value.startDate > this.filterForm.value.endDate) {

      this.steddate = true;
    } else {
      this.steddate = false;
    }

    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    } else {
      this.timeerror = false;
    }

    this.filterForm.valueChanges.subscribe(x => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()) {
        console.log("indirect")
        console.log(this.filterForm.value.endDate)
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    });
  }
  timechange(data: any) {
    console.log(data.target.value)
    console.log(this.filterForm.value.startTime)
    console.log(this.filterForm.value.endTime)
    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }
  }
// *********************** @ Status Dropdown starts  *********************
onItemSelectStatus(data: any) {
    this.StatusGuids = []
    console.log(this.filterForm.value)
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.StatusGuids.push(item.guid);
    });
    console.log(this.StatusGuids)
  }
  OnItemDeSelectStatus(data: any) {
    this.StatusGuids = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.StatusGuids.push(item.guid);
    });
    console.log(this.StatusGuids)
    if (this.StatusGuids === null || this.StatusGuids.length === 0) {
      console.log("Empty");
      this.StatusGuids = this.copyStatusguid
    }
  }
  onSelectAllStatus(data: any) {
    this.StatusGuids = []
    data.forEach((item: { guid: any; }) => {
      this.StatusGuids.push(item.guid);
    });
    console.log(this.StatusGuids)
  }
  onDeSelectAllStatus(data: any) {
    this.StatusGuids = []
    this.StatusGuids = this.copyStatusguid
    console.log(this.StatusGuids)
  }
    // *********************** @ Ends Dropdown starts  *********************

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%% currency Dropdown start %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    onItemSelectcurrency(event:any){
      this.currencyGuid = []
      this.filterForm.value.currency.forEach((item: { guid: any; }) => {
        this.currencyGuid.push(item.guid);
      });
      console.log(this.currencyGuid)
    }

    OnItemDeSelectcurrency(event:any){
      this.currencyGuid = []
      this.filterForm.value.currency.forEach((item: { guid: any; }) => {
        this.currencyGuid.push(item.guid);
      });
      if (this.currencyGuid === null || this.currencyGuid.length === 0) {
        console.log("Empty");
        this.currencyGuid = this.CopyCurrencyTotalGuids
      }
      console.log(this.currencyGuid)
    }

    onSelectAllcurrency(event:any){
      this.currencyGuid = []
      event.forEach((item: { guid: any; }) => {
        this.currencyGuid.push(item.guid);
      });
      console.log(this.currencyGuid)
    }

    onDeSelectAllcurrency(event:any){
      this.currencyGuid = []
    this.currencyGuid = this.CopyCurrencyTotalGuids
    console.log(this.currencyGuid)
    }
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%% currency Dropdown end %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
}
