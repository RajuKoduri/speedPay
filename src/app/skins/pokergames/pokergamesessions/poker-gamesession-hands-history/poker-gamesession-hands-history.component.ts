import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'
import * as moment from 'moment';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-poker-gamesession-hands-history',
  templateUrl: './poker-gamesession-hands-history.component.html',
  styleUrls: ['./poker-gamesession-hands-history.component.css']
})
export class PokerGamesessionHandsHistoryComponent implements OnInit {
  gameSessionIdGuid: any;
  FillterMenu: any;
  filterForm: FormGroup;

  SeletedIconIndex: any = 0;
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
  // currencycode: any = null;

  PageCount: number = 0;
  ResultCount: any;
  pagecontrolbtn: boolean = false;
  rowsOnthePage: any;
  resultcount: boolean = true;
  pokerHandHistoryDetails: boolean = false;
  selectedIndexpokerHistory: any;
  pokerHandsHistoryDataPagination: any = null;
  detainedHandHistoryIndex: number = 0;
  prevtHandButton: any = false;
  NextHandButton: any = false;
  activeTabViewId: string = 'TableView';
  detailsData: any = null;
  detailsTextData: any = null;
  summary: any = null;
  viewChatHistoryData: any = null;
  viewChatHistorypopUp: boolean = false;

  searchInputText: any = "";
  currentIndex: any;
  chartList: any = [];
  activatedGuidValues:any=null;
  selctedObjet: any = null;
  pagination: any =1;
  handResultCount:any=null;
  handloader: boolean =true;
  location: any;
  playerExporer:boolean = false




  constructor(private activateRoute: ActivatedRoute, private FileformatServiceService: FileformatServiceService, private PokergamesService: PokergamesService, private DateTimePipe: DateTimePipe) {
    this.filterForm = new FormGroup({
      // skills: new FormControl(),
      // faceParametersName:new FormControl(),
      // Currency: new FormControl(),
      // Game: new FormControl(),
      // TableName: new FormControl(),
      // Face: new FormControl(),
      // SessionId: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      PlayerLogin: new FormControl(),
      PlayerNickname: new FormControl(),
      HandNumber: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startTime: new FormControl(),
      endTime: new FormControl(),
      handfirstRecord:new FormControl(0),
      handmaxCountRecord:new FormControl(50)
      
    })
  }

  ngOnInit() {
    // this.location = window.location.pathname;
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    if (this.location == "/playerexplorer/pokertablespokerhandshistory") {
      this.playerExporer = true ;
      this.startDate ='';
      this.endDate = '';
      // this.filterForm.patchValue({
      //   startDate: "",
      //   endDate: "",
      // });
      
    } else {
  
      this.playerExporer = false
    


    this.activateRoute.queryParams.subscribe(params => {
      const hiLongValue = params['hiLong'];
      const lowLongValue = params['lowLong'];
      console.log(hiLongValue,lowLongValue);
      this.activatedGuidValues = {
        hiLong:hiLongValue,
        lowLong:lowLongValue
      }
      // Use the values as needed
    });



    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    // this.filterForm.patchValue({
    //   startTime: this.startTime,
    //   startDate: this.startDate,
    //   endDate: this.endDate,
    //   endTime: this.endTime
    // });
      
  }
  this.onFormSubmit();
  this.walletFormats();

  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  walletFormats() {
    var currency: any = localStorage.getItem('walletFormats');
    if (currency) {
      this.currencyList = JSON.parse(currency);
    }
    console.log("currency  :  -- ", this.currencyList)
  };

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
  };



  onFormSubmit() {
    this.popupArrow = false;
    this.pokerHandsHistoryData =false;
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.loader = true;
    if (sessionStorage.getItem("gameSessionId")) {
      const gameSessionId: any = sessionStorage.getItem("gameSessionId");
      this.gameSessionIdGuid = JSON.parse(gameSessionId);
    };
    console.log(this.gameSessionIdGuid)
    let fillterbody = this.getDirtyValues(this.filterForm);

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["number"] = this.filterForm.value.HandNumber != null ? this.filterForm.value.HandNumber : undefined;
    fillterbody["loginMask"] = this.filterForm.value.PlayerLogin != null ? this.filterForm.value.PlayerLogin : undefined;
    fillterbody["nicknameMask"] = this.filterForm.value.PlayerNickname != null ? this.filterForm.value.PlayerNickname : undefined;
    fillterbody["period"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
    (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;
    fillterbody["gameSessionId"] = {
      "hiLong": this.gameSessionIdGuid?.hiLong,
      "lowLong": this.gameSessionIdGuid?.lowLong
      // ...this.activatedGuidValues
    };



    let body = {
      "firstRecord": 0,
      "maxCountRecord": 100,
      "gameSessionId": {
        "hiLong": this.gameSessionIdGuid?.hiLong,
        "lowLong": this.gameSessionIdGuid?.lowLong
      }

    };

    if (this.gameSessionIdGuid != null || this.gameSessionIdGuid != undefined) {

      this.PokergamesService.getPlayersPokerHandsHistory(fillterbody).subscribe((data) => {
        console.log(data)
        if (data) {
          this.getPokerHandsHistorydata(data);
        }
      },
        error => { console.log(error) })

    } else {
      this.loader = false;
    }


  }
  getPokerHandsHistorydata(data: any) {
    if (data?.objectList) {
      this.pokerHandsHistoryData = data?.objectList;

      this.rowsOnthePage = data.objectList.length;
      if (data.objectList.length > 50) {
        this.NextHandButton = true;
        this.prevtHandButton = false;
      }
      this.ResultCount = data.resultCount;


      for (let i = 0; i < this.pokerHandsHistoryData.length; i++) {
        for (let j = 0; j < this.currencyList.length; j++) {
          if (this.currencyList[j]?.guid?.hiLong == this.pokerHandsHistoryData[i]?.bet?.wallet?.hiLong && this.currencyList[j]?.guid?.lowLong == this.pokerHandsHistoryData[i]?.bet?.wallet?.lowLong) {
            if (this.currencyList[j]?.symbol) {
              this.pokerHandsHistoryData[i].currencycode = this.currencyList[j]?.symbol;
            } else {
              this.pokerHandsHistoryData[i].currencycode = "";
            }
            // break
          }

        }
      }
    };


    if (this.pokerHandsHistoryData != null || this.pokerHandsHistoryData.resultCount == 0) {
      this.loader = false;
    }

    if (this.pokerHandsHistoryData !== null) {
      this.resultcount = false;
    }

    if (this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;

    } else {
      this.pagecontrolbtn = false;
    }


  };

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
  showmanu(index: number) {
    this.popupArrow = !this.popupArrow;
    this.SeletedIconIndex = index;

  }

  getPokerHandHistoryDetails(pokerHistory: any, i: number) {

    console.log("detainedHandHistoryIndex", this.detainedHandHistoryIndex);
    console.log(pokerHistory);

    let body1 = {
      "firstRecord": this.filterForm.value.handfirstRecord,
      "maxCountRecord": this.filterForm.value.handmaxCountRecord,
      "gameSessionId": {
        "hiLong": this.gameSessionIdGuid?.hiLong,
        "lowLong": this.gameSessionIdGuid?.lowLong
      }

    }
    this.handloader = true;
    this.pokerHandsHistoryDataPagination = []
    this.PokergamesService.getPlayersPokerHandsHistory(body1).subscribe((data) => {
      if (data) {
        this.getPokerHandsHistorydataPagination(data)
      }
    },
      error => { console.log(error) })
    this.selectedIndexpokerHistory = pokerHistory;
    this.popupArrow = false;

    this.getPokerHandHistoryDetailsPopup(pokerHistory, i);


  };


  getPokerHandsHistorydataPagination(data: any) {
    if (data?.objectList) {
      console.log(data);
      this.handloader = false;
      this.pokerHandsHistoryDataPagination = data?.objectList;

      if (parseInt(this.handResultCount)%(parseInt(this.pagination)*50) >= 1 && (parseInt(this.handResultCount)%(parseInt(this.pagination)*50)) != this.handResultCount) {
        this.pagination += 1
        // this.prevtHandButton = true;
        this.NextHandButton = true;
    
      }else{
        this.NextHandButton = false;
      }

    }
  }

  clickOnPreviousFifty(){
    this.pagination -= 1
    this.filterForm.patchValue({
    handfirstRecord: this.filterForm.value.handfirstRecord - 50
    })
    if( this.filterForm.value.handfirstRecord == 0){
    this.prevtHandButton = false;

}
this.getPokerHandHistoryDetails(this.pokerHandsHistoryData[this.SeletedIconIndex],this.SeletedIconIndex);



  }

  clickOnNextFifty(){
    this.filterForm.patchValue({
      handfirstRecord: this.filterForm.value.handfirstRecord + 50
      });
  
      if( this.filterForm.value.handfirstRecord  >= 50){
        this.prevtHandButton = true;
      
      }
      
      this.getPokerHandHistoryDetails(this.pokerHandsHistoryData[this.SeletedIconIndex],this.SeletedIconIndex);
  

  }

  getPokerHandHistoryDetailsPopup(pokerHistory: any, i: any) {
    this.detainedHandHistoryIndex = i;
    let body = {
      "tableId": { hiLong: pokerHistory?.tableId?.hiLong, lowLong: pokerHistory?.tableId?.lowLong },
      "tournamentId": null,
      "handId": null,
      "handNumber": pokerHistory?.number,
      "maxCountRecord": 100,
      "firstRecord": 0,
      "queryId": ""
    }

    this.PokergamesService.getPokerHandHistoryDetails(body).subscribe((data) => {
      console.log("getPokerHandHistoryDetails", data);
      this.pokerHandHistoryDetails = true;
      if (data?.details) {
        this.detailsData = data?.details;
        this.detailsTextData = data?.detailsText?.detailsText;
        this.summary = data?.summary;

        console.log("detailsData", this.detailsData)
        console.log("detailsTextData", this.detailsTextData)
        console.log("summary", this.summary)

      }

    },
      (error) => {
        console.log("error : ", error)
      })

  }

 

  DetailedHandHistoryTableclosepopup() {
    this.pokerHandHistoryDetails = false;

    this.handResultCount=null;
    this.pagination = 1;
    this.prevtHandButton = false;
    this.NextHandButton = false;
    this.filterForm.patchValue({
      handfirstRecord: 0
    })
  }

  clickOnPreviousHandButton() {
    if (this.detainedHandHistoryIndex >= 1) {
      this.detainedHandHistoryIndex -= 1;
      this.selctedObjet = this.pokerHandsHistoryData[this.detainedHandHistoryIndex];
      this.getPokerHandHistoryDetailsPopup(this.selctedObjet,this.detainedHandHistoryIndex);
    }
  }

  clickOnNextHandButton() {
    this.detainedHandHistoryIndex += 1;
    this.selctedObjet = this.pokerHandsHistoryData[this.detainedHandHistoryIndex];
    this.getPokerHandHistoryDetailsPopup(this.selctedObjet,this.detainedHandHistoryIndex);
  }

  activeTabView(viewType: string) {
    this.activeTabViewId = viewType

  }



  getGameTableChatHistory(pokerHistory: any) {

    this.popupArrow = false;
    console.log(pokerHistory);
    let body = {
      // "chatId": this.pokerHandsHistoryData[0]?.tableId
      "chatId": pokerHistory?.tableId
    };

    this.PokergamesService.getGameTableChatHistory(body).subscribe((data) => {
      console.log(data);
      this.viewChatHistorypopUp = true;
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

  viewChatHistoryTableclosepopup() {
    this.viewChatHistorypopUp = false;
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

  navigate(direction: 'previous' | 'next'): void {
    if (direction === 'next') {
      this.currentIndex = (this.currentIndex + 1) % this.viewChatHistoryData[0]?.messages.length;
    } else if (direction === 'previous') {
      this.currentIndex = (this.currentIndex - 1 + this.viewChatHistoryData[0]?.messages.length) % this.viewChatHistoryData[0]?.messages.length;
    }
    this.highlightTextInRows();
  }



  highlightTextInRows(): void {
    const searchTerm = this.searchInputText.toLowerCase();

    this.viewChatHistoryData[0]?.messages.forEach((row: any, index: any) => {
      const originalText = row.text.toLowerCase();
      const matchIndices: number[] = [];
      let match = originalText.indexOf(searchTerm);

      while (match !== -1) {
        matchIndices.push(match);
        match = originalText.indexOf(searchTerm, match + 1);
      }

      const highlightedText = this.applyHighlight(originalText, matchIndices);
      this.viewChatHistoryData[0].messages[index].text = highlightedText;
    });
  }


  applyHighlight(originalText: string, matchIndices: number[]): any {
    let highlightedText = '';
    let currentIndex = 0;
    console.log(matchIndices)
    matchIndices.forEach(matchIndex => {
      highlightedText += originalText.substring(currentIndex, matchIndex);
      highlightedText += `<span class="highlight">${originalText.substr(matchIndex, this.searchInputText.length)}</span>`;
      currentIndex = matchIndex + this.searchInputText.length;
    });

    highlightedText += originalText.substring(currentIndex);

    return highlightedText;
  }



  highlightText(originalText: string, index: number): string {
    if (index == this.currentIndex) {
      const searchTerm = this.searchInputText.toLowerCase();
      const lowerCaseText = originalText.toLowerCase();

      // Check if the search term exists in the current row
      if (lowerCaseText.includes(searchTerm)) {
        // Apply highlighting to the matched text using [style] binding
        const highlightedText = originalText.replace(
          new RegExp(searchTerm, 'gi'),
          match => `<span class="highlight">${match}</span>`
        );

        return highlightedText;
      }
    }

    // If not the current index, return the original text
    return originalText;
  }


  highlightMatches(row: string, i: any): string {
    const lowerCaseSearchTerm = this.searchInputText.toLowerCase();
    const lowerCaseRow = row.toLowerCase();
    const matchIndex = lowerCaseRow.indexOf(lowerCaseSearchTerm);

    if (matchIndex !== -1) {

      const beforeMatch = row.substring(0, matchIndex);
      const match = row.substring(matchIndex, matchIndex + this.searchInputText.length);
      const afterMatch = row.substring(matchIndex + this.searchInputText.length);
      console.log("beforeMatch", beforeMatch, "match", match, "afterMatch", afterMatch)
      return `${beforeMatch}<span class="getHighlightStyle(${i})">${match}</span>${afterMatch}`;
    } else {
      console.log("row :", row)
      return row; // Reset the row text if there's no match
    }
  }

  getHighlightStyle(index: number) {
    if (index === this.currentIndex) {
      return { backgroundColor: 'yellow' };
    } else {
      return {};
    }
  }



  changeResult(list: any) {
    if (list.length > 0) {
      console.log("if", list);
      return list;
    } else {
      console.log("else", list);
      return "";
    }
  }



}
