import { Component, OnInit,OnDestroy } from '@angular/core';

import * as XLSX from 'xlsx'
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournamentTables',
  templateUrl: './tournamentTables.component.html',
  styleUrls: ['./tournamentTables.component.css']
})
export class TournamentTablesComponent implements OnInit,OnDestroy {

  PlayerName: any = null;


  gameSessionIdGuid: any;
  FillterMenu: any;
  filterForm: FormGroup;

  SeletedIconIndex:any;
  popupArrow: boolean = false

 

  endDate: any;
  startDate: any;
  todaydate: any;
  steddate: boolean = false;
  timeerror: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  pokerHandsHistoryData: any = null;
  loader: boolean = false;
  currencyList: any = null;
  currencycode: any = null;

  PageCount: number = 0;
  ResultCount: any;
  pagecontrolbtn: boolean = false;
  rowsOnthePage: any;
  resultcount: boolean = true;


  constructor( private GamesofpokerService: GamesofpokerService, private router:Router,  private FileformatServiceService: FileformatServiceService, private PokergamesService: PokergamesService, private DateTimePipe: DateTimePipe) { 

    this.filterForm = new FormGroup({
      // skills: new FormControl(),
      // faceParametersName:new FormControl(),
      // Currency: new FormControl(),
      // Game: new FormControl(),
      // TableName: new FormControl(),
      // Face: new FormControl(),
      // SessionId: new FormControl(),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      PlayerLogin: new FormControl(),
      PlayerNickname: new FormControl(),
      tableName: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
    
  }

  ngOnInit() {

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()-7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;

    this.todaydate = moment(new Date()).format('YYYY-MM-DD');



    this.getTableInfo();
  }

  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
    // throw new Error('Method not implemented.');
  }

  getTableInfo() {
    let PlayerName = sessionStorage.getItem("tInfo");
    if (PlayerName) {
      this.PlayerName = JSON.parse(PlayerName)
      console.log("PlayerName  :",PlayerName)
    }
  }



  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
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

  getGamepokergamesessionActiveHands(listHands:any):any{
    if(listHands<=0){
      return false
    }else{
     return true
    }
  }

  navigatePokerHandsHistory(list:any,tournamentId:any){
    console.log(list);
    // localStorage.setItem("gameSessionId",JSON.stringify(list))
    this.router.navigateByUrl("/tournamentexplorer/pokertablespokerhandshistory");
    this.GamesofpokerService.setData(list,tournamentId);
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
    this.pokerHandsHistoryData = false;
    this.loader = true;

    if (this.filterForm.value.maxCountRecord > 1) {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    } else {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord - 1 / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    }
    this.loader = true;


    let fillterbody = this.getDirtyValues(this.filterForm);

    fillterbody["firstRecord"] = Number(this.filterForm.value.firstRecord - 1)
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    fillterbody["playerLoginMask"] = this.filterForm.value.PlayerLogin != null? this.filterForm.value.PlayerLogin:undefined
    fillterbody["playerNicknameMask"] = this.filterForm.value.PlayerNickname != null? this.filterForm.value.PlayerNickname:undefined
    fillterbody["tableName"] = this.filterForm.value.tableName != null? this.filterForm.value.tableName:undefined
    fillterbody["datePeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate != "") ? { "start": this.filterForm.value.startDate +"T"+ this.filterForm.value.startTime , "end": this.filterForm.value.endDate + "T"+  this.filterForm.value.endTime } : undefined;
    // fillterbody["queryId"] = "";

    var body = {
      "tournamentGuid": {... this.PlayerName?.guid, },
      "filter": {
       ...fillterbody
        // "maxCountRecord": 100,
        // "firstRecord": 0,
        // "queryId": ""
      }
    }
    



    this.PokergamesService.getPokerTournamentTables(body).subscribe((data) => {
      if (data) {
        this.getPokerHandsHistorydata(data)
      }
    },
      error => { console.log(error) })
  

  }

  getPokerHandsHistorydata(data: any) {
    if (data?.objectList) {
      this.pokerHandsHistoryData = data?.objectList;


      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount;
    
    
    }

    if (this.pokerHandsHistoryData != null || this.pokerHandsHistoryData.resultCount == 0) {
      this.loader = false;
    }

    if (this.pokerHandsHistoryData !== null) {
      this.resultcount = false;
    }

    if(this.ResultCount ==this.rowsOnthePage){
      this.pagecontrolbtn = true;

    }else{
      this.pagecontrolbtn = false;
    }

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }

  
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
    if (this.PageCount > this.pokerHandsHistoryData.length) {

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
    if (this.ResultCount < (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }
    // if (this.PageCount > this.pokerHandsHistoryData.length) {

    //   this.pagecontrolbtn = true
    // }


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
    if (this.PageCount > this.pokerHandsHistoryData.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
  }







  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
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
    XLSX.writeFile(wb, 'PokerHandsHistoryExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "PokerHandsHistoryExcelSheet")
  }

}
