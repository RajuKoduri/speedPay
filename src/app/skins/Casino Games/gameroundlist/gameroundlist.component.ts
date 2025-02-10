import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator} from'@angular/forms';
import { CasinogamesService } from 'src/app/source/casinogames.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';

@Component({
  selector: 'app-gameroundlist',
  templateUrl: './gameroundlist.component.html',
  styleUrls: ['./gameroundlist.component.css']
})
export class GameroundlistComponent implements OnInit {
  filterForm:FormGroup;
  FillterMenu:boolean=false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 10;
  tablePrint: any;
  dataPrint: any;
  dataLoader:boolean = false;
  gameroundList: any;
  gamespopup: boolean = false;
  subGame: any =[];
  value: any;
  SUM: any;
  obj: any; 
  AVG: any;
  buyInValue:any;
  betValue: any;
  winValue: any;
  compPointsValue: any;

 
  constructor(private CasinoGamesService: CasinogamesService) {
    this.filterForm= new FormGroup({
      firstRecord: new FormControl(),
      pageSize: new FormControl(),

    })
    }

  ngOnInit(): void { }
  ignoreContext() {
    this.gameroundList = [];
    this.dataLoader = true;
  }

  getGameData(data: any) {
    this.dataLoader = false;
    console.log(data)
    this.gameroundList = data.objectList;
    console.log(this.gameroundList)
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }

    if (this.gameroundList != null) {
      this.dataLoader = false;
    }
    this.findsum(this.gameroundList)
  }
  onRequery() {
    let fillterbody = this.getValues(this.filterForm)
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord
    fillterbody["maxCountRecord"] = this.filterForm.value.pageSize
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.pageSize);
    this.CasinoGamesService.GameRoundList(fillterbody).subscribe((res) => { this.getGameData(res) })

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
  fillterMenu(){
    this.FillterMenu = !this.FillterMenu;
  }
  exportExcel(){
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'GameroundlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'GameroundlistExcelSheet.xlsx');

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
  onClick(event: any) {
    console.log(event)
    this.subGame = this.gameroundList[event]
    console.log(this.subGame)
    this.gamespopup = true;
  }
  openGamePop() {
    this.gamespopup = true;
  }
  closePopup() {
    this.gamespopup = false;
  }
  FormReset(){
    this.filterForm.reset();
  }
  findsum(data: any) {
    this.obj = data
    console.log(this.obj);  
    this.buyInValue = this.obj.reduce((a: any, b: { buyIn: any; }) => (a + b.buyIn.value), 0);
    console.log(this.buyInValue)
    this.betValue = this.obj.reduce((a: any, b: { bet: any; }) => (a + b.bet.value), 0);
    console.log(this.betValue)
    this.winValue = this.obj.reduce((a: any, b: { win: any; }) => (a + b.win.value), 0);
    console.log(this.winValue)
    this.compPointsValue = this.obj.reduce((a: any, b: { compPoints: any; }) => (a + b.compPoints.value), 0);
    console.log(this.compPointsValue)
  }
}

// gamerowClick(even:any) {
//   this.gamespopup = true;
//   this.subGame =[];
//   console.log(even);
//   this.subGame.push({
   
//   })
//   console.log(this.subGame)
// }
// gameClick(data:any){
//   this.subGame =[];
//   console.log(data);
//   this.subGame.push({
   
//   })
//   console.log(this.subGame)
// }
// openGamePop(){
//   if(this.subGame.length != 0){
//     this.gamespopup = true;
//   }else {
//     this.gamespopup = false;
//   }
// }
// closePopup(){
//   this.gamespopup = false;
// }