import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { CashierService } from 'src/app/source/Cashier.service';

@Component({
  selector: 'p2p-transfers',
  templateUrl: './p2p-transfers.component.html',
  styleUrls: ['./p2p-transfers.component.css']
})
export class P2pTransfersComponent implements OnInit {
  filterForm: FormGroup;
  FillterList: boolean=false;
  walletlists: any=[];
  loader: boolean=false;
  p2pTransfersdataList: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean=true;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

  location: any;
  playerExplorer: boolean=false;
  PlayerguidList: any;

  WalletSettings={}
  walletlistsCopy: any;

  constructor(private FileformatServiceService:FileformatServiceService, private CashierService:CashierService) {
    this.filterForm = new FormGroup({

      currency: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100)
    })
   }

  ngOnInit(): void {
    this.getDates()
    this.walletFormats()
    this.playerExplorerCheck()
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/p2pTransfers") {
      this.playerExplorer = true;
      this.PlayerGuid();
    } else {
      this.playerExplorer = false;
    }
  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem("Playerguid");
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }


  getDates() {
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());

    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
  }
  walletFormats() {
    const walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      let walletFormatsList = JSON.parse(walletTypes)
      for (let i = 0; i < walletFormatsList.length; i++) {
        if (walletFormatsList[i].clubGameWallet == true) {
          if (walletFormatsList[i].description !== "Play Money") {
            this.walletlists.push({ description: walletFormatsList[i].description, guid: walletFormatsList[i].guid })
          }
        }
      }
      console.log(walletFormatsList)
    }
    console.log("walletlists", this.walletlists)

    this.walletlistsCopy = [...this.walletlists]
    let walletGuidsCopy = this.walletlists.map((wallet: any) => {
      return { guid: wallet.guid }
    })
    console.log(walletGuidsCopy)

    this.WalletSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    }

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
    this.loader = true;
    // this.tmAdjustmentList = false;
    // this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    let walletGuids = this.walletlistsCopy.map((walletList: any) => {
      return walletList.guid
    })

    let fillterbody = this.getValues(this.filterForm)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;
    fillterbody["wallets"] = walletGuids.length > 0 ? walletGuids : undefined;

    this.CashierService.getCommonPlayerTransfers(fillterbody).subscribe((transfers) => {this.p2pTransfersdata(transfers)}, );
  }
  p2pTransfersdata(data:any) : void {
    this.loader = false;
    
    console.log(data)
    this.p2pTransfersdataList = data.objectList;
    console.log(this.p2pTransfersdataList);
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;

  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'TMAdjustExeclSheet.xlsx';
    XLSX.writeFile(wb, 'P2PTransfers.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "P2PTransfers");
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
  timechnage(data: any) {
    console.log(data.target.value)
  }


  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@ -----Wallet DropDowm------@@@@@@@@@@@@@@@@@@@@@@@@@

  onSelectCurrency(data: any) {
    // console.log(data)
    console.log(this.walletlistsCopy)

  }
  onDeSelectCurrency(data: any) {
    // console.log(data)
    // if(this.walletlistsCopy.length ==0){
    //   this.walletlistsCopy=this.walletlists
    // }
    console.log(this.walletlistsCopy)

  }
  onSelectAllCurrency(data: any) {
    // console.log(data)
    // this.walletlistsCopy=[...this.walletlists];
    this.walletlistsCopy = [...data];
    console.log(this.walletlistsCopy)

  }
  onDeSelectAllCurrency(data: any) {
    // console.log(data)
    // this.walletlistsCopy=[...this.walletlists]
    console.log(this.walletlistsCopy)


  }
}
