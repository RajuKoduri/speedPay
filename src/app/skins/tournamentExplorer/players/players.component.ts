import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { PokergamesService } from 'src/app/source/pokergames.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  currencyList:any =[];
  PlayerName: any = null;
  playersData:any = [];
  loader: boolean = false;


  rowsOnthePage:any;
  ResultCount:any;
  resultcount: boolean = true;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;


  filterForm:FormGroup;
 

  constructor(private FileformatServiceService:FileformatServiceService,private PokergamesService:PokergamesService) {
    this.filterForm = new FormGroup({
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
   }

  ngOnInit() {
    this.walletFormats();
    this.getTableInfo();
    this.onFormSubmit();
  
  }

  getTableInfo() {
    let PlayerName = sessionStorage.getItem("tInfo");
    if (PlayerName) {
      this.PlayerName = JSON.parse(PlayerName)
      console.log("PlayerName  :",PlayerName)
    }
  }

  onFormSubmit(){


    if (this.filterForm.value.maxCountRecord > 1) {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    } else {
      this.PageCount = (Math.floor(this.filterForm.value.firstRecord - 1 / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    }
    // if (this.PageCount = this.playersData.length) {

    //   this.pagecontrolbtn = true
    // }
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }




    this.loader = true;
    let body = {
      "idList": [
        this.PlayerName?.guid, 
      ],
      "maxCountRecord": 0,
      "firstRecord": 0,
      "queryId": ""
    }

    this.PokergamesService.getTournamentPlayers(body).subscribe((data)=>{
      if(data?.objectList){
        this.getPlayerData(data)
       
      }

    },
    (error) =>{
      this.loader = false;
      console.log(error)
    }
    );

    


  }
  walletFormats(){
    var currency: any = localStorage.getItem('walletFormats');
    if (currency) {
      this.currencyList = JSON.parse(currency);
    }
    console.log("currency  :  -- ", this.currencyList)
 
  }

   
  getPlayerData(data:any){
    if(data?.objectList){
      this.loader = false;
      console.log(data?.objectList);
      this.playersData = data?.objectList
      this.rowsOnthePage = data?.objectList?.length
      this.ResultCount = data?.resultCount;

      for (let i = 0; i < this.playersData.length; i++) {
        for (let j = 0; j < this.currencyList.length; j++) {
          if (this.currencyList[j]?.guid?.hiLong == this.playersData[i]?.totalCost?.wallet?.hiLong && this.currencyList[j]?.guid?.lowLong == this.playersData[i]?.totalCost?.wallet?.lowLong) {
            if (this.currencyList[j]?.symbol) {
              this.playersData[i].currencycode = this.currencyList[j]?.symbol;
            } else {
              this.playersData[i].currencycode = "";
            }
            // break
          }
  
        }
        console.log(this.playersData)
      }
    }

    if (this.ResultCount !== null || this.ResultCount == 0) {
      this.resultcount = false;
    };

    if (this.playersData != null || this.playersData.resultCount == 0) {
      this.loader = false;
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
    if (this.PageCount > this.playersData.length) {

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
    if (this.PageCount > this.playersData.length) {
      this.pagecontrolbtn = false
    } else {
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
    let fileName: 'PokersitngotExcelSheet.xlsx';
    XLSX.writeFile(wb, 'PokersitngotExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element,"PokersitngotExcelSheet")
  }



}
