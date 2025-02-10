import { Component, OnInit } from '@angular/core';
import { PokergamesService } from 'src/app/source/pokergames.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';

@Component({
  selector: 'app-tableInfo',
  templateUrl: './tableInfo.component.html',
  styleUrls: ['./tableInfo.component.css']
})
export class TableInfoComponent implements OnInit {

  PlayerName: any =null;
  tableData:any=[];
  currencyList: any=[];
  currencyCode:string="";
  

  constructor(private DateTimePipe:DateTimePipe,private PokergamesService:PokergamesService) { }

  ngOnInit() {
    // getgetPokerTournamentInfo
    this.getTableInfo();
    this.walletFormats();
    this.getPokerTournament();
  }

   getTableInfo() {
    let PlayerName = sessionStorage.getItem("tInfo");
    if (PlayerName) {
      this.PlayerName = JSON.parse(PlayerName)
      console.log("PlayerName  :",PlayerName)
    }
  }

  getPokerTournament(){
    // {hiLong: 812, lowLong: 3313}
    let body = {
      "idList": [
          this.PlayerName?.guid, 
         // {hiLong:371,
          // lowLong:4776}
      ],
      "maxCountRecord": 100,
      "firstRecord": 0,
      "queryId": ""
    }

    this.PokergamesService.getPokerTournamentInfo(body).subscribe((data) =>{
      console.log('getPokerTournamentInfo' , data);
      if(data?.objectList){
        this.tableData = data?.objectList;

        if(this.currencyList){
          for (let j = 0; j < this.currencyList.length; j++) {
            if(this.currencyList[j]?.guid?.hiLong == this.tableData[0]?.history?.totalCost?.wallet?.hiLong && this.currencyList[j]?.guid?.lowLong == this.tableData[0]?.history?.totalCost?.wallet?.lowLong){
              console.log(this.currencyList[j]);
              this.currencyCode = this.currencyList[j]?.currencyCode
              break;
            }
          }
        }


      }

    })
  }

  walletFormats(){
    var currency: any = localStorage.getItem('walletFormats');
    if (currency) {
      this.currencyList = JSON.parse(currency);
    }
    console.log("currency  :  -- ", this.currencyList)
 
  }

  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    return (c)


  }
}
