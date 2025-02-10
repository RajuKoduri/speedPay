import { HttpHeaders } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PromotionalServiceService } from 'src/app/source/promotional-service.service';
import { TotalSumsService } from 'src/app/source/total-sums.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-depositbonussettings',
  templateUrl: './depositbonussettings.component.html',
  styleUrls: ['./depositbonussettings.component.css']
})
export class DepositbonussettingsComponent implements OnInit {

  resdata: any;
  walletTypes: any;
  walletTypeslist: any;
  paymentName: any;
  paymentNameList: any;
  p: number = 1;
  selectnum: number = 10;
  selectnumber: number = -5;
  depositebonusesetting: boolean = false
  depositebonuse: boolean = false;
  SpinnwerT: boolean = false;

  XLSX: any;
  show: boolean = false;
  windowlocal: any
  divToPrint: any;
  WinPrint: any;
  newsTopics: any;
  rowsOnthePage: any;
  ResultCount: any;
  loader: boolean = false;
  location: any;
  playerExplorer: boolean = false;
  playerguid: any;
  responseDataForEdit: any;
  applyForAllUsers: boolean = false;
  dummy: any = {}
  firstMinDepositSum: any;
  modifiedResData: any;
  thirdMinDepositSum: any;
  thirdMaxBonusSum: any;
  secondFixedBonusSum: any;
  thirdFixedBonusSum: any;
  secondMinDepositSum: any;
  secondMaxBonusSum: any;
  nextMaxBonusSum: any;
  nextMinDepositSum: any;
  nextFixedBonusSum: any;
  firstMaxBonusSum: any;
  firstFixedBonusSum: any;
  firstPercentAvg: any;
  secondPercentAvg: any;
  thirdPercentAvg: any;
  nextPercentAvg: any;

  constructor(private PromotionalServiceService: PromotionalServiceService, private totalSumService: TotalSumsService) { }

  ngOnInit(): void {
    this.PlayerExplorerCheck();
    this.getDepositBonusLimits();
    this.walletTypes = localStorage.getItem("walletTypes")
    this.walletTypeslist = JSON.parse(this.walletTypes)
    console.log(this.walletTypeslist)


    // this.sorted = this.resdata.sort((a:any, b:any) => a.labCode> b.labCode? 1 : -1);
    this.paymentName = localStorage.getItem("paymentname")
    this.paymentNameList = JSON.parse(this.paymentName)
    console.log(this.paymentNameList)
  }


  PlayerExplorerCheck() {
    // this.location = window.location.pathname
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;

    if (this.location == "/playerexplorer/depositbonussettings") {
      this.playerExplorer = true
      this.PlayerGuid()
      console.log(this.playerExplorer)
    } else {
      this.playerExplorer = false
      console.log(this.playerExplorer)
    }
  }

  PlayerGuid() {
    let Playerguid = sessionStorage.getItem('Playerguid')
    console.log(Playerguid)
    if (Playerguid) {
      this.playerguid = JSON.parse(Playerguid);
      console.log(this.playerguid)
    }
  }
  getDepositBonusLimits() {
    this.resdata = false;
    this.loader = true;
    if (!this.playerExplorer) {
      let body = {}
      this.PromotionalServiceService.getdepositbonuslimit(body).subscribe((res) => this.bouslimitdata(res))

    } else {
      let body = {
        firstRecord: 0,
        maxCountRecord: 100,
        idList: [this.playerguid]

      }
      this.PromotionalServiceService.getPlayerDepositBonusLimits(body).subscribe((res) => this.bouslimitdata(res))
    }
  }
  bouslimitdata(data: any) {
    console.log(data)
    this.loader = false;
    this.resdata = data.objectList;
    this.rowsOnthePage = data.objectList?.length;
    this.ResultCount = data.resultCount
    console.log(this.resdata)
    this.currecncyToWalletModification(this.resdata)

    for (let i = 0; i < this.resdata?.length; i++) {
      for (let m = 0; m < this.walletTypeslist.length; m++) {
        if (!this.walletTypeslist[m].currency) {
          Object.assign(this.walletTypeslist[m], { currency: { hiLong: '', lowLong: '' } })
        }
        // console.log(this.walletTypeslist[m].currency.lowLong)
        // console.log(this.resdata[i].currency.lowLong);

        if (this.resdata[i].currency.lowLong == this.walletTypeslist[m].currency.lowLong) {
          this.resdata[i].currencyName = this.walletTypeslist[m].description
          this.resdata[i].wallet = this.walletTypeslist[m].guid
        }
      }
      for (let n = 0; n < this.paymentNameList.length; n++) {
        if (this.resdata[i].paymentSystem.lowLong == this.paymentNameList[n].guid.lowLong) {
          this.resdata[i].paymentSystemName = this.paymentNameList[n].value
        }
      }
    }

  }

  currencySymbol(wallet: any) {
    return this.totalSumService.walletSymbol(wallet)
  }

  calculateSum(data: any) {
    this.thirdMinDepositSum = this.totalSumService.calculateSum(data, 'thirdMinDeposit')
    this.thirdMaxBonusSum = this.totalSumService.calculateSum(data, 'thirdMaxBonus')
    this.thirdFixedBonusSum = this.totalSumService.calculateSum(data, 'thirdFixedBonus')
    this.secondFixedBonusSum = this.totalSumService.calculateSum(data, 'secondFixedBonus')
    this.secondMinDepositSum = this.totalSumService.calculateSum(data, 'secondMinDeposit')
    this.secondMaxBonusSum = this.totalSumService.calculateSum(data, 'secondMaxBonus')
    this.nextMaxBonusSum = this.totalSumService.calculateSum(data, 'nextMaxBonus')
    this.nextMinDepositSum = this.totalSumService.calculateSum(data, 'nextMinDeposit')
    this.nextFixedBonusSum = this.totalSumService.calculateSum(data, 'nextFixedBonus')
    this.firstMaxBonusSum = this.totalSumService.calculateSum(data, 'firstMaxBonus')
    this.firstFixedBonusSum = this.totalSumService.calculateSum(data, 'firstFixedBonus')
    this.firstMinDepositSum = this.totalSumService.calculateSum(data, 'firstMinDeposit')

    let firstpercentSum = data.reduce((acc: any, list: any) => acc + list.firstPercent, 0)
    this.firstPercentAvg = firstpercentSum / data.length
    let secondpercentSum = data.reduce((acc: any, list: any) => acc + list.secondPercent, 0)
    this.secondPercentAvg = secondpercentSum / data.length
    let thirdpercentSum = data.reduce((acc: any, list: any) => acc + list.thirdPercent, 0)
    this.thirdPercentAvg = thirdpercentSum / data.length
    let nextpercentSum = data.reduce((acc: any, list: any) => acc + list.nextPercent, 0)
    this.nextPercentAvg = nextpercentSum / data.length
    console.log(this.firstMinDepositSum)
  }
  keys(data: any) {
    return Object.keys(data)
  }
  curranyss(curranyss: any) {
    throw new Error('Method not implemented.');
  }

  currecncyToWalletModification(resdata: any) {
    // this.modifiedResData = [...resdata]
    this.modifiedResData = JSON.parse(JSON.stringify(resdata))
    // this.walletTypeslist.forEach((wallet:any)=>{
    //   this.modifiedResData.forEach((list:any)=>{
    //     if(wallet.currency?.lowLong == list.firstFixedBonus.currency.lowLong){
    //       list.firstFixedBonus.wallet = wallet.guid
    //     }
    //     if(wallet.currency?.lowLong == list.firstMaxBonus.currency.lowLong){
    //       list.firstMaxBonus.wallet = wallet.guid
    //     }
    //     if(wallet.currency?.lowLong == list.firstMinDeposit.currency.lowLong){
    //       list.firstMinDeposit.wallet = wallet.guid
    //     }
    //     if(wallet.currency?.lowLong == list.nextFixedBonus.currency.lowLong){
    //       list.nextFixedBonus.wallet = wallet.guid
    //     }
    //     if(wallet.currency?.lowLong == list.nextMinDeposit.currency.lowLong){
    //       list.nextMinDeposit.wallet = wallet.guid
    //     }
    //     if(wallet.currency?.lowLong == list.nextMaxBonus.currency.lowLong){
    //       list.nextMaxBonus.wallet = wallet.guid
    //     }
    //     if(wallet.currency?.lowLong == list.secondMaxBonus.currency.lowLong){
    //       list.secondMaxBonus.wallet = wallet.guid
    //     }
    //     if(wallet.currency?.lowLong == list.secondMinDeposit.currency.lowLong){
    //       list.secondMinDeposit.wallet = wallet.guid
    //     }
    //     if(wallet.currency?.lowLong == list.secondFixedBonus.currency.lowLong){
    //       list.secondFixedBonus.wallet = wallet.guid
    //     }
    //     if(wallet.currency?.lowLong == list.thirdFixedBonus.currency.lowLong){
    //       list.thirdFixedBonus.wallet = wallet.guid
    //     }
    //     if(wallet.currency?.lowLong == list.thirdMaxBonus.currency.lowLong){
    //       list.thirdMaxBonus.wallet = wallet.guid
    //     }
    //     if(wallet.currency?.lowLong == list.thirdMinDeposit.currency.lowLong){
    //       list.thirdMinDeposit.wallet = wallet.guid
    //     }
    //   })
    // })

    this.walletTypeslist.forEach((wallet: any) => {
      this.modifiedResData.forEach((list: any) => {
        const propertiesToUpdate = [
          'firstFixedBonus',
          'firstMaxBonus',
          'firstMinDeposit',
          'nextFixedBonus',
          'nextMinDeposit',
          'nextMaxBonus',
          'secondMaxBonus',
          'secondMinDeposit',
          'secondFixedBonus',
          'thirdFixedBonus',
          'thirdMaxBonus',
          'thirdMinDeposit'
        ];

        propertiesToUpdate.forEach((property) => {
          if (wallet.currency?.lowLong === list[property]?.currency?.lowLong) {
            list[property].wallet = wallet.guid;
          }
        });
      });
    });

    console.log(this.modifiedResData)
    this.calculateSum(this.modifiedResData)
  }

  onRightClick(e: any) {
    this.show = !this.show
    console.log(e)
    return false;
  }
  printData() {
    this.divToPrint = document.getElementById("tablerecords");
    this.WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    console.log(this.divToPrint)
    console.log(this.WinPrint)
    // this/ htmlToPrint = '' +
    // '<style type="text/css">' +
    // 'table th, table td {' +
    // 'border:1px solid #000;' +
    // 'padding:0.5em;' +
    // '}' +
    // '</style>';
    this.WinPrint.document.write(this.divToPrint.innerHTML);
    this.WinPrint.document.close();
    this.WinPrint.focus();
    this.WinPrint.print();
    this.WinPrint.close();
  }
  // printDatafull() { 
  //   this.divToPrint = document.getElementById("excel-tablefulldata"); 
  //   this.WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
  //   console.log(this.divToPrint )
  //   console.log(this.WinPrint )
  //   // this/ htmlToPrint = '' +
  //   // '<style type="text/css">' +
  //   // 'table th, table td {' +
  //   // 'border:1px solid #000;' +
  //   // 'padding:0.5em;' +
  //   // '}' +
  //   // '</style>';
  //   this.WinPrint.document.write(this.divToPrint.innerHTML );
  //   this.WinPrint.document.close();
  //   this.WinPrint.focus();
  //   this.WinPrint.print();
  //   this.WinPrint.close();
  // }

  exportexcel() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'PlyerlistExcelSheet.xlsx';
    var a = XLSX.writeFile(wb, 'PlyerlistExcelSheet.xlsx');
    a.print()
    console.log(a)
  }
  exportexcelFull() {
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(this.resdata);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'temp.xlsx'); // initiate a file download in browser

  }
  bonusesetting() {
    this.responseDataForEdit = [...this.resdata]
    this.depositebonusesetting = true;
  }

  setDepositBonusLimit(type: any) {
    if (type == "yes") {

      this.SpinnwerT = true
      let values = this.responseDataForEdit.map((list: any) => {
        let { paymentSystemName, currencyName, wallet, ...rest } = list
        return rest
      })

      console.log(values)
      let body = {
        "values": values,
        "applyForAll": this.applyForAllUsers,
        idList: this.playerExplorer ? [this.playerguid] : undefined
      }
      console.log(body)
      if (this.playerExplorer) {
        this.PromotionalServiceService.setPlayerDepositBonusLimits(body).subscribe((data) => { this.setDepositBonusLimitdata(data) })
      }
      this.PromotionalServiceService.setdepositbonuslimit(body).subscribe((data) => { this.setDepositBonusLimitdata(data) })
    } else {
      this.depositebonusesetting = false;
    }
  }
  setDepositBonusLimitdata(data: any) {
    console.log(data)
    if (data.changedObjectList) {
      this.SpinnwerT = false
      this.depositebonusesetting = false;
      this.getDepositBonusLimits()
    }
  }
  changevalue(event: any, i: any, oldvalue: any) {
    if (this.dummy[i]) {
      this.dummy[i] = this.responseDataForEdit[i]
    } else {
      this.dummy[i] = this.responseDataForEdit[i]
    }
    console.log(this.dummy)
  }

}
