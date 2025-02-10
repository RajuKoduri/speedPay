import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { ComppointsService } from 'src/app/source/comppoints.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { TotalSumsService } from 'src/app/source/total-sums.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-playercomppointsbalance',
  templateUrl: './playercomppointsbalance.component.html',
  styleUrls: ['./playercomppointsbalance.component.css']
})
export class PlayercomppointsbalanceComponent implements OnInit {
  filterForm: FormGroup;
  showbalance: boolean = false;
  CompPointBalance: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  CompPoints: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  CompPointspopup: boolean = false
  popup: any
  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false
  loader: boolean = false
  CompPointwallet: any
  location: any;
  playerExplorer: boolean = false;
  PlayerguidList: any;
  OpeningBalance: any;
  IncomingsBalance: any;
  outgoingBalance: any;
  totalTurnover: any;
  closingBalance: any;
  constructor(private comppointsService: ComppointsService, private FileformatServiceService: FileformatServiceService,
    private TotalSumsService: TotalSumsService, private PlayerserviceService: PlayerServiceService) {
    this.filterForm = new FormGroup({
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),

      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }

  ngOnInit(): void {
    let walletTypesData: any = localStorage.getItem("walletTypes")
    this.CompPointwallet = JSON.parse(walletTypesData)
    console.log(this.CompPointwallet)

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    this.playerExplorerCheck()
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/playercomppointsbalance") {
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
  balancefil() {
    this.showbalance = !this.showbalance
  }

  compPointbalancedata(data: any) {
    this.CompPointspopup = true
    console.log(data)
    this.CompPoints = data
  }
  closepopup() {
    this.CompPointspopup = false
  }


  onFormSubmit() {
    this.showbalance = false;
    this.CompPointBalance = false;
    this.loader = true;
    console.log(this.filterForm.value.startDate)
    console.log(this.filterForm.value)
    
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    let body = {
      // reportPeriod: this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined,
      wallet: this.CompPointwallet[3]?.guid,
      "firstRecord": this.filterForm.value.firstRecord - 1,
      "maxCountRecord": this.filterForm.value.maxCountRecord,
      "reportPeriod": (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined,
      "idList": this.playerExplorer ? [this.PlayerguidList] : undefined
    }
    console.log(body);
    if (this.playerExplorer) {
      this.comppointsService.getPlayerCompPointsBalances(body).subscribe(data => this.PlayersCompPointBalanceres(data))
    } else {
      this.comppointsService.getCompPointBalance(body).subscribe(data => this.PlayersCompPointBalanceres(data))
    }
  }
  PlayersCompPointBalanceres(data: any) {
    console.log(data)
    console.log(data.objectList)
    this.loader = false;
    this.CompPointBalance = data?.objectList;
    this.ResultCount = data.resultCount;
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.sum(this.CompPointBalance)
  }
  sum(data: any) {
    // this.CompPointBalance.forEach(data)
    this.OpeningBalance = this.TotalSumsService.calculateSum(data, 'openingBalance');
    console.log(this.OpeningBalance)
    if (!this.playerExplorer) {
      this.IncomingsBalance = this.TotalSumsService.calculateSum(data, 'periodRevenue');
      console.log(this.IncomingsBalance)
     this.outgoingBalance = this.TotalSumsService.calculateSum(data, 'periodExpense');
      console.log(this.outgoingBalance)
    } else {
      this.IncomingsBalance= this.TotalSumsService.calculateSum(data, 'revenue');
      console.log( this.IncomingsBalance)
     this.outgoingBalance = this.TotalSumsService.calculateSum(data, 'expense');
      console.log(this.outgoingBalance)

    }
    this.totalTurnover = this.TotalSumsService.calculateSum(data, 'totalTurnover');
    console.log( this.totalTurnover)
    this.closingBalance = this.TotalSumsService.calculateSum(data, 'closingBalance');
    console.log( this.closingBalance)

  }
  keys(data:any){
    return Object.keys(data)
  }
  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }
  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({ firstRecord: parseInt('1') });
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
  }

  fastforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else {
      //   this.filterForm.patchValue({
      //     firstRecord: (Math.floor((this.ResultCount - 1) / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) + 1
      // });
      this.filterForm.patchValue({
        firstRecord: Math.floor((this.ResultCount - 1) / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });
    }

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // if (this.PageCount > this.CompPointBalance.length) {
    //   this.pagecontrolbtn = true;
    // }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );

  }

  next() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
        // console.log(typeof this.filterForm.value.firstRecord)
      });
    }
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter) + 1 + parseInt(this.filterForm.value.maxCountRecord)
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord),
      });
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    console.log(this.filterForm.value.firstRecord);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // if (this.FirstrecordFillter) {

    //   this.FirstrecordFillter++
    //   console.log(this.FirstrecordFillter)
    // }
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  prev() {
    console.log('......Hhello......');
    if (this.filterForm.value.firstRecord - 1 == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        // firstRecord:parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)-1
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1;
    if (this.PageCount > this.CompPointBalance.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'PlayerCompPointsExchangeExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "PlayerCompPointsBalance")
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
