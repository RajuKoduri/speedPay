import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { RemoteSystemsService } from 'src/app/source/RemoteSystems.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment'
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
@Component({
  selector: 'app-remotesystemsgames',
  templateUrl: './remotesystemsgames.component.html',
  styleUrls: ['./remotesystemsgames.component.css']
})
export class RemotesystemsgamesComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  GamesList: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  loader: boolean = false;
  walletlists: any = [];

  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false
  playerlevelChangeStatusList: any;
  PlayerLevelsNamesList: any;

  wallettypelist: any = [];
  currencys: any = [];

  selectedFillterGames: any;
  gamesTobeSelected: any;
  selectedcurrency: any = [];
  currencyarray: any = [];
  currencystatus: any = [];
  dropdownSettingscurrency: any;
  PageCount: number = 1;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;

  constructor(private RemoteSystemsService: RemoteSystemsService, private FileformatServiceService: FileformatServiceService, private GamesofpokerService: GamesofpokerService) {
    this.filterForm = new FormGroup({
      startdateFrom: new FormControl(),
      startdateTo: new FormControl(),
      wallet: new FormControl(),

      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100)

    })


  }

  public stringifyData(data: any): string {
    return JSON.stringify(data);
  }

  ngOnInit(): void {

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    this.playerlevelChangeStatus();
    this.getPlayerLevelsNames();
    this.walletTypes()
    this.onRequery()

    console.log('jdbjsbsjbhs')
  }
  walletTypes() {
    const walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      let wallettypelist = JSON.parse(walletTypes)
      for (let i = 0; i < wallettypelist.length; i++) {
        // if (wallettypelist[i].description == "U.S. Dollars" || wallettypelist[i].description == "Chips") {
        if (wallettypelist[i].faceWallet == true) {
          this.walletlists.push(wallettypelist[i])
        }
      }
      console.log(this.walletlists)
      console.log("walletlists", this.wallettypelist)
      console.log("currencys", this.currencys)
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

      this.currencystatus = this.walletlists;
      console.log(this.currencystatus);
      this.selectedcurrency = this.currencystatus;
      this.dropdownSettingscurrency = {
        singleSelection: true,
        idField: 'guid',
        textField: 'description',
        // selectAllText: 'Select All',
        // unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
    }
  }
  playerlevelChangeStatus() {
    const playerlevelChangeStatus = localStorage.getItem('playerlevelChangeStatus');
    if (playerlevelChangeStatus) {
      this.playerlevelChangeStatusList = JSON.parse(playerlevelChangeStatus)
    }
    console.log("playerlevelChangeStatusList", this.playerlevelChangeStatusList)
  }
  getPlayerLevelsNames() {
    const getPlayerLevelsNames = localStorage.getItem('getPlayerLevelsNames');
    if (getPlayerLevelsNames) {
      this.PlayerLevelsNamesList = JSON.parse(getPlayerLevelsNames)
    }
    console.log(this.PlayerLevelsNamesList.compPointsLevels)

  }
  fillterMenu() {
    this.FillterMenu = !this.FillterMenu
  }

  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({ firstRecord: parseInt('1'), });
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
  }

  prev() {
    console.log('......Hhello......');
    if ( this.filterForm.value.firstRecord - 1 == parseInt(this.filterForm.value.maxCountRecord) )
      this.filterForm.patchValue({
        // firstRecord:parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)-1
        firstRecord:  parseInt(this.filterForm.value.firstRecord) -parseInt(this.filterForm.value.maxCountRecord),
      });
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1;
    this.pagecontrolbtn = false;
    if (this.PageCount > this.GamesList.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
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

  fastforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({ firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord), });
    } else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(
      Math.floor(
        this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1
    );
    this.PageCount =
      Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    console.log(this.PageCount)
    console.log(this.GamesList.length)
    this.pagecontrolbtn = true;
    if (this.PageCount > this.GamesList.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );
    this.FirstrecordFillter = this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
  }





  onFormSubmit() {
    this.loader = true
    this.GamesList = [];
    let body = {
      "firstRecord": this.filterForm.value.firstRecord - 1,
      "maxCountRecord": this.filterForm.value.maxCountRecord,
      "wallets": this.currencyarray
    }
    this.RemoteSystemsService.RemoteGameListData(body).subscribe((data) => this.SummaryData(data))

  }
  onRequery() {
    this.loader = true;
    this.GamesList = [];
    let body = {
      "firstRecord": this.filterForm.value.firstRecord - 1,
      "maxCountRecord": this.filterForm.value.maxCountRecord
    }
    this.RemoteSystemsService.RemoteGameListData(body).subscribe((data) => this.SummaryData(data))

  }
  SummaryData(data: any) {
    this.GamesList = data.objectList;
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;

    }
    this.loader = false

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    console.log("GamesList",  this.GamesList)
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'remotesystemsExcelSheet.xlsx';
    XLSX.writeFile(wb, 'remoteGamesExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "remoteGamesExcelSheet")
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


  // *******************************@Satarts currency Dropdown************************************************************

  onItemSelectcurrency(item: any) {
    this.currencyarray = []
    this.filterForm.value.wallets.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }

  OnItemDeSelectcurrency(item: any) {
    this.currencyarray = []
    this.filterForm.value.wallets.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
    if (this.currencyarray === null || this.currencyarray.length === 0) {
      console.log("Empty");
      this.currencyarray = this.currencystatus
    }

  }
  onSelectAllcurrency(data: any) {
    this.currencyarray = []
    data.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  onDeSelectAllcurrency(items: any) {
    this.currencyarray = []
    this.currencyarray = this.currencystatus
    console.log(this.currencyarray)
  }


  // **********************************@Ends currency Dropdown****************************************************************************
}

