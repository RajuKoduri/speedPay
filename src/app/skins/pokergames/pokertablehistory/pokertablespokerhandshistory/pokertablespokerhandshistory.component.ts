import { Component, OnInit } from '@angular/core';

import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pokertablespokerhandshistory',
  templateUrl: './pokertablespokerhandshistory.component.html',
  styleUrls: ['./pokertablespokerhandshistory.component.css']
})
export class PokertablespokerhandshistoryComponent implements OnInit {
  FillterMenu: any;
  filterForm!: FormGroup;
  steddate: boolean = false
  timeerror: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  endDate: any = Date;
  startDate: any;
  todaydate: any;
  loader: boolean = false;
  gamesListofarrays: any[] = [];
  PageCount: number = 0;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = false
  PokerTableHistoryData: any;
  receivedData: any
  pagecontrolbtn: boolean = false;
  popupArrow: boolean = false;
  SeletedIconIndex: any = 0;
  DetailedSelctedIndex: any = 0;
  DetailedHistoryPopData: any;
  selctedObjet: any;
  pokerDetailedViewpopup: boolean = false;

  prevtHandButton: any = false;
  NextHandButton: any = false;
  activeTabViewId: string = 'TableView';



  detailsData: any = null;
  detailsTextData: any = null;
  summary: any = null;
  viewChatHistorypopUp: boolean = false;
  viewChatHistorypopUp2: boolean = false;
  viewChatHistoryData: any = null;
  tournamentId: any = null;

  searchInputText: any = "";
  chartList: any = [];
  handResultCount: any=null;
  pagination:any = 1;
  handloader: boolean =true;

  tableSearchIndex:any = 0;
  location: any;
  playerExporer: boolean = false;


  constructor(private route: ActivatedRoute, private DateTimePipe: DateTimePipe, private GamesofpokerService: GamesofpokerService, private PokergamesService: PokergamesService,
    private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      PlayerNickNmae: new FormControl(),
      PlayerLogin: new FormControl(),
      TableName: new FormControl(),
      Hand: new FormControl(),
      Tables: new FormControl(),
      startTime: new FormControl(this.startDate, Validators.required),
      endTime: new FormControl(this.endDate, Validators.required),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      handfirstRecord:new FormControl(0)
    })
  };

  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
  }

  ngOnInit(): void {

    // this.location = window.location.pathname;
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/pokertablespokerhandshistory") {
      
      this.playerExporer = true 
    } else {
  
      this.playerExporer = false
    }


    let routereceivedData = this.route.snapshot;
    const responseData = (this.GamesofpokerService.getData());
    console.log(responseData)
    this.receivedData = responseData?.data;
    this.tournamentId = responseData?.tournamentId
    console.log("routereceivedData", routereceivedData)

    this.GamesConfig();
    this.onFormSubmit();

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
  GamesConfig() {

    // console.log("GamesConfig", this.GamesConfigList)
    // console.log("GamesConfig", this.GamesConfigList.games)
    // this.gamesListofarrays = this.GamesConfigList.games

    let list: any = this.GamesofpokerService.GamesConfig();
    this.gamesListofarrays = list[13];
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
    return dirtyValues
  }


  onFormSubmit() {
    this.PokerTableHistoryData = false;
    this.loader = true;

    if (this.filterForm.value.maxCountRecord > 1) {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    } else {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord - 1 / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    }




    let body = {
      "firstRecord": 0,
      "maxCountRecord": 100,
      "tableId": { hiLong: 318, lowLong: 15357 }
    }
    // fillterbody["handNumber"] = 1004;
    // fillterbody["tableId"] =  {hiLong: 275, lowLong: 38276}
    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;

    if(this.playerExporer == false){
      fillterbody["tableId"] = this.receivedData;
      fillterbody["tournamentId"] = this.tournamentId != null ? this.tournamentId : undefined;
      this.PokergamesService.getPokerHandsHistory(fillterbody).subscribe((data) => {
        console.log(data)
        if (data) {
          this.PokerTableHistoryData = data.objectList;
          const myObjData = data.objectList;
          // this.CloseTableData = JSON.parse(JSON.stringify(myObjData))
          this.ResultCount = data.resultCount
          this.rowsOnthePage = data.objectList.length;
  
          if (this.ResultCount !== null) {
            this.resultcount = false;
            this.loader = false;
          }
  
          for (let i = 0; i < this.PokerTableHistoryData.length; i++) {
            for (let j = 0; j < this.gamesListofarrays.length; j++) {
              if (this.PokerTableHistoryData[i].gameName == this.gamesListofarrays[j].name) {
                this.PokerTableHistoryData[i].gameName = this.gamesListofarrays[j].caption
              }
            }
  
          }
        };
      })

    }else{
        // fillterbody["gameSessionId"] = this.tournamentId != null ? this.tournamentId : undefined;
    fillterbody["gameSessionId"] = this.receivedData;

      this.PokergamesService.getPlayersPokerHandsHistory(fillterbody).subscribe((data) => {
        console.log(data)
        if (data) {
          this.PokerTableHistoryData = data.objectList;
          const myObjData = data.objectList;
          // this.CloseTableData = JSON.parse(JSON.stringify(myObjData))
          this.ResultCount = data.resultCount
          this.rowsOnthePage = data.objectList.length;
  
          if (this.ResultCount !== null) {
            this.resultcount = false;
            this.loader = false;
          }
  
          for (let i = 0; i < this.PokerTableHistoryData.length; i++) {
            for (let j = 0; j < this.gamesListofarrays.length; j++) {
              if (this.PokerTableHistoryData[i].gameName == this.gamesListofarrays[j].name) {
                this.PokerTableHistoryData[i].gameName = this.gamesListofarrays[j].caption
              }
            }
  
          }
        };
      })

    }



   
    console.log(this.ResultCount == this.rowsOnthePage)
    if (this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }

  changeSelect(date: string) {

    let c = this.DateTimePipe.transforminingDispalyDate(date);

    return (c)
  }
  onFormSubmit1() {

    console.log(this.filterForm.value)
    this.PokerTableHistoryData = false
    this.loader = true
    this.FillterMenu = false;
    this.getDirtyValues(this.filterForm)
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody);

    if (this.filterForm.value.maxCountRecord > 1) {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    } else {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord - 1 / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    }

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = Number(this.filterForm.value.maxCountRecord);
    // fillterbody["datePeriod"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.Datefrom, "end": this.filterForm.value.endDate } : undefined;
    fillterbody["datePeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate != "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : (this.filterForm.value.endDate != null && this.filterForm.value.endDate !== "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined
    // fillterbody["gameNames"] = this.filterForm.value.Game != null ? [this.filterForm.value.Game] : undefined;
    // fillterbody["gameNames"] = this.selectedFillterGames.length === 0 ? this.allGammeNamesWithCurrency : this.selectedFillterGames;
    fillterbody["stakes"] = this.filterForm.value.StakesTo != null ? { "low": this.filterForm.value.StakesFrom, "high": this.filterForm.value.StakesTo } : undefined;
    fillterbody["nicknameMask"] = this.filterForm.value.PlayerNickNmae != null ? this.filterForm.value.PlayerNickNmae : undefined;
    fillterbody["loginMask"] = this.filterForm.value.PlayerLogin != null ? this.filterForm.value.PlayerLogin : undefined;
    fillterbody["tableName"] = this.filterForm.value.TableName != null ? this.filterForm.value.TableName : undefined;
    fillterbody["hand"] = this.filterForm.value.Hand != null ? this.filterForm.value.Hand : undefined;
    fillterbody["tableType"] = this.filterForm.value.Tables != null ? this.filterForm.value.Tables : undefined;


    this.PokergamesService.getPokerTableHistory(fillterbody).subscribe((data) => this.PokerTableHistoryRes(data))
  }

  PokerTableHistoryRes(data: any): void {
    throw new Error('Method not implemented.');
  }
  showmanu(index: number, id: any): void {
    this.popupArrow = !this.popupArrow;
    this.SeletedIconIndex = index;
    this.selctedObjet = this.PokerTableHistoryData[index];
  }
  PokerActions(index: any, Type: any) {
    this.popupArrow = false;

    switch (Type) {
      case 'View Detailed':
        // this.enableddisbletext = 'Enable'
        // this.enableddisabledepop = true;
        this.pokerDetailedViewpopup = true;
        this.DetailedSelctedIndex = this.SeletedIconIndex
        // this.getPokerHandHistoryDetails();
        this.getPokerHandsHistory()
        break;
      case 'View Chat':
        this.viewChatHistorypopUp = true;
        this.viewChatHistorypopUp2 = true;
        this.getGameTableChatHistory()

        break
    }
  }
  getPokerHandsHistory() {
    let body = {
      "firstRecord": this.filterForm.value.handfirstRecord,
      "maxCountRecord": 50,
      "tableId": this.receivedData,
      'tournamentId': this.tournamentId != null ? this.tournamentId : undefined,
    }
    // fillterbody["tournamentId"] = this.tournamentId != null? this.tournamentId:undefined;
    this.DetailedHistoryPopData = [];
    this.handloader = true;
    this.PokergamesService.getPokerHandsHistory(body).subscribe((data) => {
      console.log(data)
      if (data) {
        this.handloader = false;
        this.handResultCount=data?.resultCount
        this.DetailedHistoryPopData = data.objectList;
        this.SeletedRow(this.SeletedIconIndex);
        if( this.filterForm.value.handfirstRecord  >= 50){
          this.DetailedSelctedIndex = 0;
        
        }
       
        console.log("this.handResultCoun", this.handResultCount)
        console.log("DetailedHistoryPopData :" , this.DetailedHistoryPopData)
        console.log(parseInt(this.handResultCount)%(parseInt(this.pagination)*50))
        if (parseInt(this.handResultCount)%(parseInt(this.pagination)*50) >= 1 && (parseInt(this.handResultCount)%(parseInt(this.pagination)*50)) != this.handResultCount) {
          this.pagination += 1
          // this.prevtHandButton = true;
          this.NextHandButton = true;
      
        }else{
          this.NextHandButton = false;
        }
        // this.getPokerHandHistoryDetails()
      }
      console.log("pagination   :" , this.pagination)
      
    })
  };



clickOnPreviousFifty(){

this.pagination -= 1
this.filterForm.patchValue({
handfirstRecord: this.filterForm.value.handfirstRecord - 50
})
if( this.filterForm.value.handfirstRecord == 0){
  this.prevtHandButton = false;

}
this.getPokerHandsHistory();
}

clickOnNextFifty(){
  
  this.filterForm.patchValue({
    handfirstRecord: this.filterForm.value.handfirstRecord + 50
    });

    if( this.filterForm.value.handfirstRecord  >= 50){
      this.prevtHandButton = true;
    
    }
    
    this.getPokerHandsHistory();


}







  getPokerHandHistoryDetails() {
    let body = {
      "handNumber": this.selctedObjet.number,
      // "tableId": { hiLong: 275, lowLong: 38276 }
      "tableId": this.selctedObjet.tableId,
      'tournamentId': this.tournamentId != null ? this.tournamentId : undefined,
    };
    this.PokergamesService.getPokerHandHistoryDetails(body).subscribe((data) => {
      console.log(data);
      if (data?.details) {
        // this.pokerHandHistoryDetails = true;
        console.log(data?.objectList);
        this.detailsData = data?.details;
        this.detailsTextData = data?.detailsText?.detailsText;
        this.summary = data?.summary;

      }


      console.log("detailsData", this.detailsData)
      console.log("detailsTextData", this.detailsTextData?.detailsText)
      console.log("summary", this.summary)

    }, (error) => {
      console.log("error : ", error)
    }
    );
  }

  changeResult(list: any) {
    if (list.length > 0) {
      return list;
    } else {
      return "";
    }
  }



  clickOnPreviousHandButton() {
    if (this.DetailedSelctedIndex >= 1) {
      this.DetailedSelctedIndex -= 1;
      this.selctedObjet = this.DetailedHistoryPopData[this.DetailedSelctedIndex];
      this.getPokerHandHistoryDetails();
    }
  }

  clickOnNextHandButton() {
    this.DetailedSelctedIndex += 1;
    this.selctedObjet = this.DetailedHistoryPopData[this.DetailedSelctedIndex];
    this.getPokerHandHistoryDetails();
  }



  activeTabView(viewType: string) {
    this.activeTabViewId = viewType

  }

  SeletedRow(i: any) {
    this.DetailedSelctedIndex = i;
    this.selctedObjet = this.DetailedHistoryPopData[i];
    this.getPokerHandHistoryDetails();
  }
  closepopup() {
    this.pokerDetailedViewpopup = false;
    this.handResultCount=null;
    this.pagination = 1;
    this.prevtHandButton = false;
    this.NextHandButton = false;
    this.filterForm.patchValue({
      handfirstRecord: 0
    })
  }

  getGameTableChatHistory() {
    this.popupArrow = false;

    if (this.tournamentId != null) {
      this.viewChatHistorypopUp = false;
      let body = {

        // 'tournamentId':this.tournamentId != null? this.tournamentId:undefined,
        'chatId': this.tournamentId != null ? this.tournamentId : undefined,

      };
      this.tableSearchIndex = 0;
      this.chartList = [];
      this.PokergamesService.getTournamentChatHistory(body).subscribe((data) => {
        if (data?.objectList) {
        if (data?.objectList[0]) {
          this.viewChatHistoryData = data?.objectList;
          console.log(this.viewChatHistoryData);
         
          this.chartList = data?.objectList?.[0]?.games?.[0]?.messages;
          console.log(this.chartList)
        }
         
        }
      },
        (error) => {
          console.log(error)
        }
      );

    } else {
      this.viewChatHistorypopUp2 = false;
      let body = {
        "chatId": this.selctedObjet.tableId,

      };

      this.PokergamesService.getGameTableChatHistory(body).subscribe((data) => {
        console.log(data);
        if (data?.objectList) {
          this.viewChatHistoryData = data?.objectList;
          this.chartList = data?.objectList[0]?.messages
        }
      },
        (error) => {
          console.log(error)
        }
      );

    }

  }

  clickOntableSearchIndex(i:any){
    this.tableSearchIndex = i;
    console.log(this.viewChatHistoryData)
    this.chartList =   this.viewChatHistoryData[0]?.games?.[i]?.messages
    console.log(this.chartList)
  }

  
  enterTheValuesInSearchInput2(){
    const searchTerm = this.searchInputText.toLowerCase();

    // this.chartList = this.chartList.filter((row: any, index: number) => {
    this.chartList = this.viewChatHistoryData[0]?.games?.[this.tableSearchIndex]?.messages.filter((row: any, index: number) => {
      const lowerCaseText = row.text.toLowerCase();
      const dateCaseText = this.changeSelect(row?.date)
      if (lowerCaseText.includes(searchTerm) || dateCaseText.includes(searchTerm)) {
        return true
      } else {
        return false
      }
    });

  }


  enterTheValuesInSearchInput(): any {
    const searchTerm = this.searchInputText.toLowerCase();

    // Iterate through each row and apply highlighting
    console.log(this.viewChatHistoryData[0]?.messages)
    this.chartList = this.viewChatHistoryData[0]?.messages.filter((row: any, index: number) => {
      const lowerCaseText = row.text.toLowerCase();
      const dateCaseText = this.changeSelect(row?.date)
      if (lowerCaseText.includes(searchTerm) || dateCaseText.includes(searchTerm)) {
        return true
      } else {
        return false
      }
    });
    console.log(this.chartList)
  }




  viewChatHistoryTableclosepopup() {
    this.viewChatHistorypopUp = false;
  }
  viewChatHistoryTableclosepopup2() {
    this.viewChatHistorypopUp2 = false;
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
    if (this.PageCount > this.PokerTableHistoryData.length) {

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
    if (this.PageCount > this.PokerTableHistoryData.length) {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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
    XLSX.writeFile(wb, 'PokerTableHandsHistoryExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PokerTableHandsHistoryExcelSheet")
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
