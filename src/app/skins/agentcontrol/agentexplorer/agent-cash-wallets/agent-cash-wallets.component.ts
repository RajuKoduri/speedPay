import { Component, OnInit } from '@angular/core';
import { AgentControlService } from 'src/app/source/AgentControl.service';
@Component({
  selector: 'app-agent-cash-wallets',
  templateUrl: './agent-cash-wallets.component.html',
  styleUrls: ['./agent-cash-wallets.component.css']
})
export class AgentCashWalletsComponent implements OnInit {
  AgentguidList: any;
  AgentCashWallets: any = [];
  loader: boolean = false
  walletTypesList: any;
  walletformatlist: any;
  openNewP:boolean = false
  indexValue: any;
  selectedRowData: any;
  isPopup: boolean = false;
  constructor(private AgentControlService: AgentControlService) { }

  ngOnInit(): void {
    this.walletTypes();
    this.walletFormats();
    this.Agentguid();
    this.getAgentCashWallets();
  }
  Agentguid() {
    const Agentguid = sessionStorage.getItem('Agentguid');
    if (Agentguid) {
      this.AgentguidList = JSON.parse(Agentguid)
    }
  }
  walletTypes() {
    const walletTypes = localStorage.getItem('walletTypes');
    if (walletTypes) {
      this.walletTypesList = JSON.parse(walletTypes)
    }
    console.log(this.walletTypesList)
  }
  walletFormats() {
    const walletFormats = localStorage.getItem('walletFormats')
    if (walletFormats) {
      this.walletformatlist = JSON.parse(walletFormats)
    }
    console.log(this.walletformatlist)
    for (let i = 0; i < this.walletformatlist.length; i++) {
      if (this.walletformatlist[i].currencyCode) {

      }
    }
  }
  
  open_popu(index:any){
        this.indexValue = this.AgentCashWallets[index]
       console.log(this.indexValue)


    this.openNewP = true;
  }
  close_openP(){
    this.openNewP = false;

  }
  getAgentCashWallets() {
    let body = {
      "idList": {
        "firstRecord": 0,
        "maxCountRecord": 100,
        "idList": [this.AgentguidList]
      }
    }
    this.AgentControlService.getAgentCashWallets(body).subscribe((data) => {
      console.log(data);
      this.AgentCashWallets = data.objectList;
      for (let i = 0; i < this.AgentCashWallets.length; i++) {
        for (let j = 0; j < this.walletTypesList.length; j++) {
          if (this.AgentCashWallets[i].walletType.lowLong == this.walletTypesList[j].guid.lowLong) {
            this.AgentCashWallets[i].walletTypeName = this.walletTypesList[j].description;
          }
        }
        for (let j = 0; j < this.walletformatlist.length; j++) {
          if (this.walletformatlist[j].currencyCode) {
            // console.log(this.walletformatlist[j])
            if (this.AgentCashWallets[i].balance.wallet.lowLong == this.walletformatlist[j].guid.lowLong) {
              if (this.walletformatlist[j].symbol) {
                this.AgentCashWallets[i].balance.walletsymbol = this.walletformatlist[j].symbol
              } else {
                // this.AgentCashWallets[i].balance.wallet = this.walletformatlist[j].currencyCode
                this.AgentCashWallets[i].balance.wallet = ''
              }
            }
          }
        }

      }
    })
  }
  summary() { 
    let body = {
      'agentGuid': this.indexValue.agentGuid,
      'walletGuid': this.indexValue.walletType
    }
    this.AgentControlService.makeAgentWalletPreferred(body).subscribe((data) => {
      console.log(data)
    })
    console.log(body)
  }

  onDblClick(list:any){
    this.selectedRowData = list;
    console.log(this.selectedRowData)
    this.isPopup = true;
  }
  close_popup(){
    this.isPopup = false;
  }
}
