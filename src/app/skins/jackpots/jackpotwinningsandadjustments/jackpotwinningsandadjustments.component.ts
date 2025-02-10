import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { JackpotsService } from 'src/app/source/Jackpots.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as XLSX from 'xlsx';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as moment from 'moment';
import { importType } from '@angular/compiler/src/output/output_ast';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';

@Component({
  selector: 'app-jackpotwinningsandadjustments',
  templateUrl: './jackpotwinningsandadjustments.component.html',
  styleUrls: ['./jackpotwinningsandadjustments.component.css']
})
export class JackpotwinningsandadjustmentsComponent implements OnInit,OnDestroy {
  filterForm: FormGroup;
  FillterList: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: any;
  tablePrint: any;
  dataPrint: any;
  JackpotAdjustments: any;
  dataLoader: boolean = false;
  walletstypes: any;
  wallettypelist: any = [];
  walletFormats: any;
  walletFormatsList: any = [];
  gamePotAdjustmentTypeList: any;
  fakeArray: any;
  JWApopup: boolean = false;
  subJWA: any = [];
  right_clickOnly: boolean = true;
  currencys: any = [];
  Operation: any = [];
  value: any;
  obj: any;
  SUM: any;
  amountValue: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
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
  currencyarray: any = [];
  selectedcurrency: any=[];
  currencystatus: any=[];
  dropdownSettingscurrency: any;
  selectedFillterGames: any;
  gamesTobeSelected: any;
  
  deselestarry: any = [];

  constructor(private DateTimePipe: DateTimePipe, private Jackpotsservice: JackpotsService,private GamesofpokerService: GamesofpokerService,
    private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      // dataPeriodFrom: new FormControl(),
      // dataPeriodTo: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      currency: new FormControl(),
      jackpotname: new FormControl(),
      user: new FormControl(),
      typeoperation: new FormControl(),
      ownername: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
     

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

    console.log('jdbjsbsjbhs')

    this.walletTypes();
    this.gamePotAdjustmentType();
    this.walletFormat();
  }


  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
  }



  ignoreContext() {
    this.JackpotAdjustments = [];
    this.JackpotAdjustments = false;
    this.dataLoader = true;
  }
  fillterMenu() {
    this.FillterList = !this.FillterList;
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
  walletTypes() {
    const walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      this.wallettypelist = JSON.parse(walletTypes)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips") {
        if (this.wallettypelist[i].clubGameWallet == true) {
          // if (this.wallettypelist[i].faceWallet == true) {
            this.walletlists.push(this.wallettypelist[i])
          // }
        }
      }

    }
    console.log(this.wallettypelist)
    console.log("walletlists", this.walletlists)
  }
  gamePotAdjustmentType() {
    const gamePotAdjustmentType = localStorage.getItem("gamePotAdjustmentType");
    if (gamePotAdjustmentType) {
      this.gamePotAdjustmentTypeList = JSON.parse(gamePotAdjustmentType);
      console.log(this.gamePotAdjustmentTypeList)
      for (let i = 0; i < this.gamePotAdjustmentTypeList.length; i++) {
        this.Operation.push(this.gamePotAdjustmentTypeList[i])
      }
      console.log(this.Operation)
    }
  }

  walletFormat() {
    this.currencyarray =[]
    this.walletFormats = localStorage.getItem('walletFormats')
    this.walletFormatsList = JSON.parse(this.walletFormats)
    console.log(this.walletFormatsList)
    // walletType() {
   
      
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
    // }
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
    this.JackpotAdjustments = false;
    console.log(this.filterForm.value)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    console.log((Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1))
    console.log(this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    console.log(this.ResultCount < (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    // if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
    //   this.pagecontrolbtn = false;
    // } else {
    //   this.pagecontrolbtn = true;
    // }

    let fillterbody = this.getValues(this.filterForm)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1,
      fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord,
      // fillterbody["dateRange"] = this.filterForm.value.dataPeriodFrom != null ? { "start": this.filterForm.value.dataPeriodFrom, "end": this.filterForm.value.dataPeriodTo } : undefined,
      fillterbody["dateRange"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined,
      // fillterbody["wallets"] = this.filterForm.value.currency != null ? [this.filterForm.value.currency] : undefined,
      fillterbody["wallets"] = this.currencyarray != null ? this.currencyarray : undefined
      fillterbody["creatorLogin"] = this.filterForm.value.user != null ? this.filterForm.value.user : undefined,
      fillterbody["ownerName"] = this.filterForm.value.ownername != null ? this.filterForm.value.ownername : undefined,
      // fillterbody["types"] = this.filterForm.value.typeoperation != null ? [this.filterForm.value.typeoperation] : undefined,
      // fillterbody["name"] = this.filterForm.value.jackpotname != null ? this.filterForm.value.jackpotname : undefined,
      fillterbody["name"] = "Bad Beat Jackpot"
      fillterbody["types"] =[ this.Operation[2].guid]

    this.Jackpotsservice.JackpotAdjustments(fillterbody).subscribe((res) => { this.getJackpotData(res) })
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
  getJackpotData(data: any) {
    this.JackpotAdjustments = [];
    this.JackpotAdjustments = data.objectList;
    console.log(this.JackpotAdjustments[0]);

    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.JackpotAdjustments != null || this.JackpotAdjustments.resultCount == 0) {
      this.dataLoader = false;
    }
    this.sumOfRow(this.JackpotAdjustments)

    console.log("walletlists", this.walletlists)
    for (let i = 0; i < this.JackpotAdjustments.length; i++) {
      for (let m = 0; m < this.walletlists.length; m++) {
        if (this.JackpotAdjustments[i].moneyType.lowLong == this.walletlists[m].guid.lowLong) {
          this.JackpotAdjustments[i].moneyType = this.walletlists[m].description
        }
      }

      for (let m = 0; m < this.gamePotAdjustmentTypeList.length; m++) {
        if (this.JackpotAdjustments[i].type.lowLong == this.gamePotAdjustmentTypeList[m].guid.lowLong) {
          this.JackpotAdjustments[i].type = this.gamePotAdjustmentTypeList[m].value
        }
      }
      // for (let p = 0; p < this.walletFormatsList.length; p++) {
      //   if (this.walletFormatsList[p].guid.lowLong == this.JackpotAdjustments[i].amount.wallet.lowLong) {
      //     this.JackpotAdjustments[i].amount.wallet = `${this.walletFormatsList[p]?.symbol}` + this.JackpotAdjustments[i].amount.value;
      //   }

      // }
    }
  }


  onClick(event: any) {
    console.log(event)
    this.subJWA = this.JackpotAdjustments[event]
    console.log(this.subJWA)
    this.JWApopup = true;
  }
  openJWApop() {
    this.JWApopup = true;
  }
  closePopup() {
    this.JWApopup = false;
  }
  sumOfRow(data: any) {
    this.obj = data
    console.log(this.obj);
    this.amountValue = this.obj.reduce((a: any, b: { amount: any; }) => (a + b.amount.value), 0);
    console.log(this.amountValue)
  }
  FormReset() {
    this.filterForm.reset();
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'JackpotwinninglistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'JackpotwinningExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "JackpotwinningExcelSheet")
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
    if (this.PageCount > this.JackpotAdjustments.length) {

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
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)) {
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
    if (this.PageCount > this.JackpotAdjustments.length) {
      this.pagecontrolbtn = false
    } else {
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

