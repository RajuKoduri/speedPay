import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx'
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';

@Component({
  selector: 'app-reffered-players',
  templateUrl: './reffered-players.component.html',
  styleUrls: ['./reffered-players.component.css']
})
export class RefferedPlayersComponent implements OnInit {
  FillterMenu: boolean = true;
  RefferedPlayersForm: FormGroup;
  wallettypelist: any;
  currencys: any = [];
  selectedCurrency: any
  Agentguid: any;
  AgentRevenueFromPlayersData: any;
  rowsOnthePage: any;
  ResultCount: any;
  loader: boolean = false;
  walletformatlist: any;
  popupArrow: boolean = false;
  SeletedIconIndex: any
  ReferredStatusList: any;
  Actiondataforplayer: any;
  SpinnwerT: boolean = false;
  TransferPopup: boolean = false;
  Amount: any = 0
  AgentBalance: any;
  visibleCahOutList: any;
  VisibleWalletList: any = [];
  PlayerBalance: any;
  VisibleselectedCurrency: any;
  TransferType: any;
  TransferComment: any;
  TransferDirectionTypesList: any;
  currentBalanceSum: any;
  revenueSum: any;
  currencySymbol: any;
  ProceedsSum: any;
  selectedRowData: any;
  isPopup: boolean = false;

  constructor(private agentControlService: AgentControlService, private PlayerServiceService: PlayerServiceService,
    private DateTimePipe:DateTimePipe,private FileformatServiceService: FileformatServiceService, private PlayerserviceService:PlayerServiceService) {
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
  ReferredStatus() {
    const ReferredStatus = localStorage.getItem('ReferredStatus');
    if (ReferredStatus) {
      this.ReferredStatusList = JSON.parse(ReferredStatus)
    }
    console.log(this.ReferredStatusList)
  }
  Agentguids() {
    const Agentguid = sessionStorage.getItem('Agentguid');
    console.log(Agentguid)
    if (Agentguid) {
      this.Agentguid = JSON.parse(Agentguid)
    }
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
    this.popupArrow = false;
    this.loader = true;
    this.AgentRevenueFromPlayersData = false;
    let body = {
      "firstRecord": 0,
      "maxCountRecord": 100,
      "idList": [this.Agentguid],
      "wallet": this.selectedCurrency
    }
    this.agentControlService.getAgentRevenueFromPlayers(body).subscribe((data) => {
      console.log(data);
      this.loader = false
      this.AgentRevenueFromPlayersData = data.objectList;
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount



      for (let i = 0; i < this.AgentRevenueFromPlayersData.length; i++) {
        for (let j = 0; j < this.walletformatlist.length; j++) {
          if (this.walletformatlist[j].currencyCode) {
            // console.log(this.walletformatlist[j])
            // console.log(this.walletformatlist[j].currencyCode)
            // console.log(this.AgentRevenueFromPlayersData[i].balance.wallet.lowLong == this.walletformatlist[j].guid.lowLong)
            // console.log(this.AgentRevenueFromPlayersData[i].balance.wallet.lowLong)
            // console.log(this.walletformatlist[j].guid.lowLong)


            if (this.AgentRevenueFromPlayersData[i].balance.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentRevenueFromPlayersData[i].balance.wallet = this.walletformatlist[j].symbol
                this.currencySymbol = this.walletformatlist[j].symbol
              } else {
                this.AgentRevenueFromPlayersData[i].balance.wallet = this.walletformatlist[j].currencyCode
              }
            }
          }
        }
        for (let k = 0; k < this.ReferredStatusList.length; k++) {
          if (this.AgentRevenueFromPlayersData[i].linkStatus.lowLong == this.ReferredStatusList[k].guid.lowLong) {
            this.AgentRevenueFromPlayersData[i].linkStatus = this.ReferredStatusList[k].value
          }
        }
      }
      console.log(this.AgentRevenueFromPlayersData)
      this.currentBalanceSum = this.AgentRevenueFromPlayersData.reduce((acc:any,list:any)=> acc+list.balance.value,0)
      this.revenueSum = this.AgentRevenueFromPlayersData.reduce((acc:any,list:any)=> acc+list.revenue.value,0)
      this.ProceedsSum = this.AgentRevenueFromPlayersData.reduce((acc:any,list:any)=> acc+list.unpaidReferredRevenue.value,0)
      console.log(this.currentBalanceSum)
      console.log(this.revenueSum)
      console.log(this.ProceedsSum)
    })

  }

  onDblClick(list:any){
    console.log(list)
    this.selectedRowData = list;
    this.isPopup = true;
  }

  close_popup(){
    this.isPopup = false;
  }

  showmanu(index: any, id: any) {
    this.popupArrow = !this.popupArrow
    this.SeletedIconIndex = index
    console.log(this.AgentRevenueFromPlayersData[index])
    this.Actiondataforplayer = this.AgentRevenueFromPlayersData[index]

  }
  setPlayerActions(name: any, i: any) {
    console.log(name)
    console.log(i)
    this.popupArrow = false
    // this.Actiondataforplayer = this.AgentRevenueFromPlayersData[i]
    // this.SpinnwerT=true
    if (name == 'DeactiveLink') {
      this.SpinnwerT = true
      let body = {
        "recordId": this.Actiondataforplayer.guid,
        "agentId": this.Agentguid,
        "referPlayerId": this.Actiondataforplayer.player.guid,
        "status": false
      }
      console.log(body)
      this.agentControlService.setLinkStatusBetweenAgentAndPlayer(body).subscribe((data) => {
        console.log(data)
        if (data.changedObjectList) {
          this.SpinnwerT = false
          this.onFormSubmit()
          // alert(1)
          // this.SuccessPop=true
        }
      })
    }
    if (name == 'ActiveLink') {
      this.SpinnwerT = true
      let body = {
        "recordId": this.Actiondataforplayer.guid,
        "agentId": this.Agentguid,
        "referPlayerId": this.Actiondataforplayer.player.guid,
        "status": true
      }
      console.log(body)
      this.agentControlService.setLinkStatusBetweenAgentAndPlayer(body).subscribe((data) => {
        console.log(data)
        if (data.changedObjectList) {
          this.SpinnwerT = false
          this.onFormSubmit();
          // this.SuccessPop=true
        }
      })
    }
    if (name == 'Transfer') {
      this.TransferPopup = true;
      this.Amount = 0
      this.getAgentVisibleCashWallets();
    }
  }
  getAgentVisibleCashWallets() {
    this.VisibleWalletList = []
    let body = {
      "agentGuid": this.Agentguid
    }
    this.agentControlService.getAgentVisibleCashWallets(body).subscribe((data) => {
      console.log(data);
      this.visibleCahOutList = data.objectList;
      for (let i = 0; i < this.visibleCahOutList.length; i++) {
        for (let j = 0; j < this.visibleCahOutList[i].wallets.length; j++) {
          for (let k = 0; k < this.currencys.length; k++) {
            if (this.visibleCahOutList[i].wallets[j].lowLong == this.currencys[k].guid.lowLong) {
              console.log(this.currencys[k])
              this.VisibleWalletList.push(this.currencys[k])
              console.log(this.VisibleWalletList)
              this.VisibleselectedCurrency = this.VisibleWalletList[0].guid
            }
          }
          console.log(this.visibleCahOutList[i].wallets[j])
          console.log(this.VisibleWalletList)
        }
      }
      this.getAgentsBalances()
      this.getPlayersBalances()
    })
  }
  getAgentsBalances() {
    this.AgentBalance = {}
    let body = {
      "wallet": this.VisibleselectedCurrency,
      "idList": {
        // "idList": [this.Agentguid, this.Actiondataforplayer.referredAgent.guid,]
        "idList": [this.Agentguid,]
      }
    }

    this.agentControlService.getAgentsBalances(body).subscribe((data) => {
      console.log(data);
      this.AgentBalance = data.objectList;
      console.log(this.AgentBalance[0].balance.value)
    })
  }
  getPlayersBalances() {
    let body = {
      "walletGuid": this.VisibleselectedCurrency,
      "idList": {
        "idList": [this.Actiondataforplayer.player.guid,]
      }
    }
    this.PlayerServiceService.getPlayersBalances(body).subscribe((data) => {
      console.log(data)
      this.PlayerBalance = data.objectList;
    });
  }
  SuccessPop() {
    this.TransferPopup = false
  }
  Transfer() {
    this.TransferPopup = false;
    this.SpinnwerT = true;
    let body = {
      "recordId": this.Actiondataforplayer.guid,
      "agentGuid": this.Actiondataforplayer.initiator.guid,
      "playerGuid": this.Actiondataforplayer.player.guid,
      "transferGuid": this.TransferType,
      "amount": {
        "wallet": this.VisibleselectedCurrency,
        "value": Number(this.Amount)
      },
      "comment": this.TransferComment
    }
    this.agentControlService.createTransferBetweenAgentAndPlayer(body).subscribe((data) => {
      console.log(data);
      if (data.changedObjectList) {
        this.SpinnwerT = false;
      }
    });
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
    XLSX.writeFile(wb, 'RefferedPlayersExcelSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AgentNestedBalanceExcelSheet")
  }

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }
}
