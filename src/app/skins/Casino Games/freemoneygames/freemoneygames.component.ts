import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator} from'@angular/forms';
import { CasinogamesService } from 'src/app/source/casinogames.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import { TotalSumsService } from 'src/app/source/total-sums.service';

@Component({
  selector: 'app-freemoneygames',
  templateUrl: './freemoneygames.component.html',
  styleUrls: ['./freemoneygames.component.css']
})
export class FreemoneygamesComponent implements OnInit {
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 10;
  tablePrint: any;
  dataPrint: any;
  Spinner:boolean = false;
  dataLoader:boolean = false;
  freemoneyList:any;
  freemoneypopup: boolean = false;
  isOpen:boolean = true;
  isMiniPopup:boolean = false;
  timeFormatForAllowTime: any;
  timeFormatForLimit: any;
  timeLimitdays: any;
  timeLimithours: any;
  timeLimitminutes: any;
  allowTimeDays: any;
  allowTimeHours: any;
  allowTimeMinutes: any;
  isAllowTime: boolean = false;
  timeLimit: any;
  allowTime: any;
  gameNumber:any
  
  constructor(private CasinoGamesService:CasinogamesService, private totalSumservice: TotalSumsService) {
   
  }

  ngOnInit(): void {
    this.dataLoader = true;
    this.onRequery()
  }
  ignoreContext(){
    this.freemoneyList = [];
    this.dataLoader = true;
  }
  onRequery(){
    let body = {}
    this.CasinoGamesService.FreeMoneyGames(body).subscribe(data => this.getFreemoneyData(data))
  }
  getFreemoneyData(data:any){
    this.dataLoader= false;
    console.log(data)
    this.freemoneyList  = data.objectList[0];
    this.gameNumber = this.freemoneyList.gamesNumber
    console.log(this.freemoneyList)

    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.freemoneyList != null) {
      this.dataLoader = false;
    }
    this.timeLimit =this.timeFormat(this.freemoneyList?.timeLimits,'timeLimit')
    this.allowTime =this.timeFormat(this.freemoneyList?.allowTime, 'allowTime')
  }

  timeFormat(time:any, type:any){
    let timeformat = this.totalSumservice.TimeFormat(time)
   
    var timestamp = timeformat.split(":")
    if(type == "timeLimit"){
      this.timeFormatForLimit = timeformat
      this.timeLimitdays = parseInt(timestamp[0])
      this.timeLimithours = parseInt(timestamp[1])
      this.timeLimitminutes = parseInt(timestamp[2])
      console.log(this.timeFormatForLimit)
    }else{
      this.timeFormatForAllowTime = timeformat
      this.allowTimeDays = parseInt(timestamp[0])
      this.allowTimeHours = parseInt(timestamp[1])
      this.allowTimeMinutes = parseInt(timestamp[2])
      console.log(this.timeFormatForAllowTime)
    }
    return timeformat
  }

  timeLimitPopup(){
    
    let timeLimit = (this.timeLimitdays*86400000) + (this.timeLimithours * 3600000) + (this.timeLimitminutes * 60000)
    console.log(this.timeLimitdays, this.timeLimithours, this.timeLimitminutes)
    console.log(timeLimit)
    this.timeFormat(timeLimit,'timeLimit')
    this.isMiniPopup = !this.isMiniPopup
    this.isAllowTime = false

  }
  allowTimePopup(){
    let allowedTime = (this.allowTimeDays*86400000) + (this.allowTimeHours * 3600000) + (this.allowTimeMinutes * 60000)
    this.timeFormat(allowedTime,'allowedTime')
    this.isAllowTime = !this.isAllowTime
    this.isMiniPopup = false
  }

  Tooglearrow(){
    this.isOpen = !this.isOpen
  }
  exportExcel(){
      let element = document.getElementById('excel_table');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      /* save to file */
      let fileName: 'freemoneygameExcelSheet.xlsx';
      XLSX.writeFile(wb, 'freemoneygametExcelSheet.xlsx');
  
  }
  onPrint(){
    this.tablePrint =  document.getElementById("tablerecords");
    this.dataPrint = window.open('','','left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    console.log(this.tablePrint);
    console.log(this.dataPrint);
    this.dataPrint.document.write(this.tablePrint.innerHTML);
    this.dataPrint.document.close();
    this.dataPrint.focus();
    this.dataPrint.print();
    this.dataPrint.close();
  }
  
  openFreemoneyPop() {
    this.freemoneypopup = !this.freemoneypopup;
  }

  onSubmit(){
    this.Spinner = true
    let allowedTime = (this.allowTimeDays*86400000) + (this.allowTimeHours * 3600000) + (this.allowTimeMinutes * 60000)
    let timeLimit = (this.timeLimitdays*86400000) + (this.timeLimithours * 3600000) + (this.timeLimitminutes * 60000)
    let body = {
        "guid": this.freemoneyList.guid,
        "objState" :0,
        'allowTime' :allowedTime,
        'gamesNumber' :this.gameNumber,
        'timeLimits' :timeLimit
    }
    console.log(body)
    this.CasinoGamesService.setFreeGameSettings(body).subscribe(data => {
      console.log(data)
      if(data.changedObjectList){
        this.Spinner = false
        this.openFreemoneyPop()
        this.onRequery()
      }
    })
  }

  onChange(event:any,timeStamp:any){
    let value = event.target.value;
    switch(timeStamp){

      case 'limitDays':
        if(this.timeLimitdays > 365){
          this.timeLimitdays = 365
        }
        break;
     
      case 'limitHours':
        if(value > 59){
          this.timeLimithours = 59
        }
        break;
      case 'limitMinutes':
        if(value > 59){
          this.timeLimitminutes = 59
        }
        break;
      case 'allowDays':
        if(value > 365){
          this.allowTimeDays = 365
        }
        break;
      case 'allowHours':
        if(value > 59){
          this.allowTimeHours = 59
        }
        break;
      case 'allowMinutes':
        if(value > 59){
          this.allowTimeMinutes = 59
        }
        break;
    }
    
  }
 
 
}
