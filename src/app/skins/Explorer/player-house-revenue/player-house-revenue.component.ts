import { Component, OnInit } from '@angular/core';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import * as moment from 'moment';
import { TotalSumsService } from 'src/app/source/total-sums.service';
@Component({
  selector: 'app-player-house-revenue',
  templateUrl: './player-house-revenue.component.html',
  styleUrls: ['./player-house-revenue.component.css']
})
export class PlayerHouseRevenueComponent implements OnInit {
  loader: boolean = false;
  FillterMenu: boolean = true;
  steddate: boolean = false
  filterForm: FormGroup;
  resultcount: boolean = true;
  ResultCount: any;
  HouseRevenue: any;
  rowsOnthePage: any;
  timeerror: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  startDate: any;
  endDate: any = Date;
  todaydate: any;
  PlayerguidList: any;
  pagecontrolbtn: boolean = false;
  PageCount: number = 0;
  walletlists: any = [];
  dropdownList: any = []
  selectedRowData: any;
  isDoubleClick: boolean = false;
  totalOpeningRevenue: any;
  totalIncomings: any;
  totalOutgoings: any;
  totalTurnover: any;
  totalClosingRevenue: any;

  constructor(private PlayerServiceService: PlayerServiceService, private FileformatServiceService: FileformatServiceService,
    private totalSumService:TotalSumsService
  ) {
    this.filterForm = new FormGroup({

      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      Currency: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    });
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.Playerguid()
    this.walletType()
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
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
  walletType() {
    let walletlists = localStorage.getItem('walletTypes');
    if (walletlists) {
      this.walletlists = JSON.parse(walletlists)
    }
    console.log("walletlists", this.walletlists);
    for (let i = 0; i < this.walletlists.length; i++) {
      if (this.walletlists[i].clubGameWallet) {
        if (this.walletlists[i].description != "Play Money") {
          this.dropdownList.push(this.walletlists[i])
          this.filterForm.patchValue({
            Currency:this.dropdownList[0]?.guid
          })
        }
      }
    }
    console.log("dropdownList", this.dropdownList);

  }

  onFormSubmit() {
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    console.log(this.filterForm.value)
    this.FillterMenu = false;
    this.HouseRevenue = false;
    let body = {
      "firstRecord": this.filterForm.value.firstRecord - 1,
      "maxCountRecord": this.filterForm.value.maxCountRecord,
      "idList": [this.PlayerguidList],
      // "reportPeriod": this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined,
      "reportPeriod": (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
        (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined,
      "wallet": this.filterForm.value.Currency
    }
    this.loader = true;
    this.PlayerServiceService.getPlayerHouseRevenue(body).subscribe((data) => {
      console.log(data);
      this.loader = false;
      this.ResultCount = data.resultCount;
      if (this.ResultCount != null) {
        this.resultcount = false;
      }
      if (data.objectList) {
        this.HouseRevenue = data.objectList;
        this.rowsOnthePage = data.objectList.length;


      }
      console.log(this.rowsOnthePage <= this.ResultCount)
      if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
        this.pagecontrolbtn = true;
      } else {
        this.pagecontrolbtn = false;
      }
      this.getTotalSum()
    })
  }

  getWalletSymbol(wallet: any) {
    return this.totalSumService.walletSymbol(wallet)
  }

  getTotalSum() {
    this.totalOpeningRevenue = this.totalSumService.calculateSum(this.HouseRevenue, "openingBalance");
    this.totalIncomings = this.totalSumService.calculateSum(this.HouseRevenue, "revenue");
    this.totalOutgoings = this.totalSumService.calculateSum(this.HouseRevenue, "expense");
    this.totalTurnover = this.totalSumService.calculateSum(this.HouseRevenue, "totalTurnover");
    this.totalClosingRevenue = this.totalSumService.calculateSum(this.HouseRevenue, "closingBalance");
    console.log(this.totalOpeningRevenue)
    console.log(this.totalIncomings)
  }

  keys(data: any) {
    return Object.keys(data)
  }

  onDblClick(list:any){
    console.log(list)
    this.selectedRowData = list;
    this.isDoubleClick = true;
  }

  closeClicPopUp(){
    this.isDoubleClick = !this.isDoubleClick
  }

  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'HouseRevenueExeclSheet.xlsx';
    XLSX.writeFile(wb, 'HouseRevenueExeclSheet.xlsx');
  }


  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "HouseRevenueExeclSheet")
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
    if (this.PageCount > this.HouseRevenue.length) {

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

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
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
    if (this.PageCount > this.HouseRevenue.length) {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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
}
