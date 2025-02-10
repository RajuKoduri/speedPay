import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import * as XLSX from 'xlsx'

import { DateTimePipe } from 'src/app/pipe/date-time.pipe';

@Component({
  selector: 'app-reffered-agents',
  templateUrl: './reffered-agents.component.html',
  styleUrls: ['./reffered-agents.component.css']
})
export class RefferedAgentsComponent implements OnInit {
  Agentguid: any;
  walletformatlist: any;
  selectedCurrency: any;
  wallettypelist: any;
  currencys: any = [];
  FillterMenu: boolean = true;
  loader: boolean = false;
  AgentRevenueFromAgentsData: any;
  RefferedPlayersForm: FormGroup
  rowsOnthePage: any;
  ResultCount: any;
  SpinnwerT: boolean = false;
  popupArrow: boolean = false;
  SeletedIconIndex: any;
  Actiondataforplayer: any;
  ReferredStatusList: any;
  TransferPopup: boolean = false;
  TransferDirectionTypesList: any;
  activeLinkstatus: any;
  AgentBalnce: any;
  visibleCahOutList: any;
  VisibleWalletList: any = [];
  TransferComment: any;
  Amount: any = 0;
  TransferType: any;
  VisibleselectedCurrency: any;
  selectedCurrencyCode: any;
  selectedCurrencySymbol: any;
  currencySymbol: any;
  currentBalanceSum: any;
  referredRevenueSum: any;
  revenueSum: any;

  constructor(private AgentControlService: AgentControlService, private DateTimePipe:DateTimePipe, private AgentcontrolService:AgentControlService) {
    this.RefferedPlayersForm = new FormGroup({
      Currency: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.Agentguids();
    this.walletTypes();
    this.walletFormats();
    this.ReferredStatus();
    this.TransferDirectionTypes();
    // this.onFormSubmit();
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist);
      for (let i = 0; i < this.wallettypelist.length; i++) {
        if (this.wallettypelist[i].faceWallet == true || this.wallettypelist[i].tournamentWallet == true && this.wallettypelist[i].description != "Play Money") {
          this.currencys.push(this.wallettypelist[i])
          console.log(this.currencys)
          // } else {
          // this.currencys.push(this.wallettypelist[i])
        }
      }

      // console.log(this.currencys)
      this.selectedCurrency = this.currencys[0].guid
    }
  }
  walletFormats() {
    const walletFormats = localStorage.getItem('walletFormats')
    if (walletFormats) {
      this.walletformatlist = JSON.parse(walletFormats)
    }
    console.log(this.walletformatlist)
    for (let i = 0; i < this.walletformatlist.length; i++) {
      if (this.walletformatlist[i].currencyCode) {

        console.log(this.walletformatlist[i])
      }
    }
   
  }


  Agentguids() {
    const Agentguid = sessionStorage.getItem('Agentguid');
    console.log(Agentguid)
    if (Agentguid) {
      this.Agentguid = JSON.parse(Agentguid)
    }
  }
  ReferredStatus() {
    const ReferredStatus = localStorage.getItem('ReferredStatus');
    if (ReferredStatus) {
      this.ReferredStatusList = JSON.parse(ReferredStatus)
    }
    console.log(this.ReferredStatusList)
  }
  TransferDirectionTypes() {
    const TransferDirectionTypes = localStorage.getItem('TransferDirectionTypes');
    if (TransferDirectionTypes) {
      this.TransferDirectionTypesList = JSON.parse(TransferDirectionTypes)
    }
    console.log(this.TransferDirectionTypesList)
    this.TransferType = this.TransferDirectionTypesList[0].guid
  }

  changeSelect(date: string) {

    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)


    return (c)

  }
  onFormSubmit() {
    this.loader = true;
    this.AgentRevenueFromAgentsData = false;
    let body = {
      "firstRecord": 0,
      "maxCountRecord": 100,
      "idList": [this.Agentguid],
      "wallet": this.selectedCurrency
    }
    this.AgentControlService.getAgentRevenueFromAgents(body).subscribe((data) => {
      console.log(data);
      this.AgentRevenueFromAgentsData = data.objectList;
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount;

      this.loader = false;

      for (let i = 0; i < this.AgentRevenueFromAgentsData.length; i++) {
        for (let j = 0; j < this.ReferredStatusList.length; j++) {
          if (this.AgentRevenueFromAgentsData[i].linkStatus.lowLong == this.ReferredStatusList[j].guid.lowLong) {
            this.AgentRevenueFromAgentsData[i].linkStatus = this.ReferredStatusList[j].value;
          }
        }
      }

      this.AgentRevenueFromAgentsData.forEach((list:any)=>{
        this.walletformatlist.forEach((wallet:any)=>{
          if(list.balance.wallet.lowLong == wallet.guid.lowLong){
            if(wallet.currencyCode){
              if(wallet.symbol){
                this.currencySymbol = wallet.symbol
              }
            }
          }
        })
      })

      this.currentBalanceSum = this.AgentRevenueFromAgentsData.reduce((acc:any,list:any)=> acc+list.balance.value,0)
      this.referredRevenueSum = this.AgentRevenueFromAgentsData.reduce((acc:any,list:any)=> acc+list.paidReferredRevenue.value,0)
      this.revenueSum = this.AgentRevenueFromAgentsData.reduce((acc:any,list:any)=> acc+list.revenue.value,0)

    })
  }

  revenuePercentage(list:any){
    console.log(list)
    let data = list.map((revenue:any)=>{
      return ` \n${revenue.parameter}:${revenue.percent}`
    })
    console.log(data)
    return data
  }

  showmanu(index: any, id: any) {
    this.popupArrow = !this.popupArrow
    this.SeletedIconIndex = index
    this.Actiondataforplayer = this.AgentRevenueFromAgentsData[index]
    console.log(this.Actiondataforplayer)
  }

  setPlayerActions(name: any, i: any) {
    console.log(name)
    console.log(i)
    this.popupArrow = false

    // this.Actiondataforplayer = this.AgentRevenueFromAgentsData[i]
    console.log(this.Actiondataforplayer)
    if (name == 'DeactiveLink') {
      this.SpinnwerT = true
      this.activeLinkstatus = false;
      this.setLinkStatusBetweenAgentAndAgent()
    }
    if (name == 'ActiveLink') {
      this.SpinnwerT = true
      this.activeLinkstatus = true;
      this.setLinkStatusBetweenAgentAndAgent()
    }
    if (name == 'Transfer') {
      this.getAgentVisibleCashWallets()
      this.TransferPopup = true;
      this.Amount = 0

    }
  }

  getAgentVisibleCashWallets() {
    this.VisibleWalletList=[]
    let body = {
      "agentGuid": this.Agentguid
    }
    this.AgentControlService.getAgentVisibleCashWallets(body).subscribe((data) => {
      console.log(data);
      this.visibleCahOutList = data.objectList;
      for (let i = 0; i < this.visibleCahOutList.length; i++) {
        for (let j = 0; j < this.visibleCahOutList[i].wallets.length; j++) {
          for (let k = 0; k < this.currencys.length; k++) {
            if (this.visibleCahOutList[i].wallets[j].lowLong == this.currencys[k].guid.lowLong) {
              console.log(this.currencys[k])
              this.VisibleWalletList.push(this.currencys[k])
              console.log(this.VisibleWalletList)
              this.VisibleselectedCurrency = this.VisibleWalletList[0]?.guid
              this.onChangeCurrencyWallet()
            }
          }
          console.log(this.visibleCahOutList[i].wallets[j])
          console.log(this.VisibleWalletList)
        }
      }
      this.getAgentsBalances()
    })
  }
  onChangeCurrencyWallet(){
    
    this.walletformatlist.find((list:any)=>{
      if(list.guid.lowLong == this.VisibleselectedCurrency.lowLong){
        if(list.currencyCode){
          this.selectedCurrencyCode = list.currencyCode
          this.selectedCurrencySymbol = list?.symbol
        }
      }
    })
    console.log(this.selectedCurrencyCode)
    console.log(this.selectedCurrencySymbol)
  }
  getAgentsBalances() {
    this.AgentBalnce = {}
    let body = {
      "wallet": this.VisibleselectedCurrency,
      "idList": {
        "idList": [this.Agentguid, this.Actiondataforplayer.referredAgent.guid,]
      }
    }

    this.AgentControlService.getAgentsBalances(body).subscribe((data) => {
      console.log(data);
      this.AgentBalnce = data.objectList;
      console.log(this.AgentBalnce[0].balance.value)
    })
  }
 
  setLinkStatusBetweenAgentAndAgent() {
    let body = {
      "recordId": this.Actiondataforplayer.guid,
      "agentId": this.Agentguid,
      "refAgentId": this.Actiondataforplayer.referredAgent.guid,
      "status": this.activeLinkstatus
    }
    console.log(body)
    this.AgentControlService.setLinkStatusBetweenAgentAndAgent(body).subscribe((data) => {
      console.log(data)
      if (data.changedObjectList) {
        this.SpinnwerT = false
        this.onFormSubmit()
      }
    })
  }
  Transfer() {
    this.TransferPopup = false;
    this.SpinnwerT = true;
    let body = {
      "recordId": this.Actiondataforplayer.guid,
      "agentGuid": this.Agentguid,
      "refAgentGuid": this.Actiondataforplayer.referredAgent.guid,
      "transferGuid": this.TransferType,
      "amount": {
        "wallet": this.VisibleselectedCurrency,
        "value": Number(this.Amount)
      },
      "comment": this.TransferComment
    }

    console.log(body)
    this.AgentControlService.createTransferBetweenAgents(body).subscribe((data) => {
      console.log(data)
      if (data.changedObjectList) {
        this.TransferPopup = false;
        this.SpinnwerT = false;

      }
    });
  }
  TransferPopClose() {
    this.TransferPopup = false
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
    XLSX.writeFile(wb, 'RefferedAgentsExcelSheet.xlsx');

  }

  AgentExplore(name: any, guid: any, agentInfo: any) {

    this.AgentcontrolService.agentExplore(name, guid, agentInfo)
  }
}
