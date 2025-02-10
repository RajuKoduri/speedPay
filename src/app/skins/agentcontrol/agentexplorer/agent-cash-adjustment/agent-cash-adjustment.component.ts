import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { Router } from '@angular/router';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';




@Component({
  selector: 'app-agent-cash-adjustment',
  templateUrl: './agent-cash-adjustment.component.html',
  styleUrls: ['./agent-cash-adjustment.component.css']
})
export class AgentCashAdjustmentComponent implements OnInit {
  AgentName: any;
  wallettypelist: any;
  currencys: any = [];
  selectedCurrency: any;
  currentGMTTime: any;
  AgentGuid: any;
  AgentBalnce: any;
  visibleCahOutList: any;
  WalletList: any = [];
  Amount: any = 0;
  comment: any;
  submitted: boolean = false;
  AgentCashAdjustsuccessPopUp: boolean = false;
  Msg: any;

  constructor(private AgentControlService: AgentControlService, private datePipe: DatePipe, private router: Router
    , private DateTimePipe:DateTimePipe) {
    const currentDateTime = new Date();
    // this.currentGMTTime = now.toUTCString();
    // this.currentDateTime = now.toUTCString();
    this.currentGMTTime = this.datePipe.transform(currentDateTime, 'MM/dd/yyyy HH:mm:ss a', 'GMT');

  }


  ngOnInit(): void {
    this.GetAgentName();
    this.GetAgentGuid();
    this.walletTypes();
    this.getAgentVisibleCashWallets();

  }

  changeSelect(date:any){
    const formatDate =this.DateTimePipe.transforminingDispalyDate(date);
    return formatDate

  }



  GetAgentName() {
    let AgentName = sessionStorage.getItem("AgentName");
    if (AgentName) {
      this.AgentName = JSON.parse(AgentName)
    }
  }
  GetAgentGuid() {
    let AgentGuid = sessionStorage.getItem('Agentguid')
    if (AgentGuid) {
      this.AgentGuid = JSON.parse(AgentGuid)
    }
  }
  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      for (let i = 0; i < this.wallettypelist.length; i++) {
        // if (this.wallettypelist[i].faceWallet == true) {
        this.currencys.push(this.wallettypelist[i])
        // console.log(this.wallettypelist[i])
        // } else {
        // this.currencys.push(this.wallettypelist[i])
        // }
      }
      console.log(this.currencys)
      // this.selectedCurrency = this.currencys[0].guid
    }
  }


  getAgentVisibleCashWallets() {
    let body = {
      "agentGuid": this.AgentGuid
    }
    this.AgentControlService.getAgentVisibleCashWallets(body).subscribe((data) => {
      console.log(data);
      this.visibleCahOutList = data.objectList;
      for (let i = 0; i < this.visibleCahOutList.length; i++) {
        for (let j = 0; j < this.visibleCahOutList[i].wallets.length; j++) {
          for (let k = 0; k < this.currencys.length; k++) {
            if (this.visibleCahOutList[i].wallets[j].lowLong == this.currencys[k].guid.lowLong) {
              console.log(this.currencys[k])
              this.WalletList.push(this.currencys[k])
              console.log(this.WalletList)
              this.selectedCurrency = this.WalletList[0].guid
            }
          }
          console.log(this.visibleCahOutList[i].wallets[j])
        }
      }
      this.getAgentsBalances()
    })

  }
  modelChangeFn(event: any) {
    this.getAgentsBalances();
  }
  getAgentsBalances() {
    this.AgentBalnce = {}
    let body1 = {
      "wallet": this.selectedCurrency,
      "idList": {
        "idList": [this.AgentGuid]
      }
    }
    this.AgentControlService.getAgentsBalances(body1).subscribe((data) => {
      console.log(data);
      this.AgentBalnce = data.objectList;
      this.errorcheck()
    })

  }

  errorcheck() {
    if ((this.AgentBalnce[0].balance.value + (this.Amount)) >= 0) {
      console.log((this.AgentBalnce[0].balance.value + (this.Amount)) >= 0)
      this.submitted = false
    } else {
      this.submitted = true
    }
  }

  onFormSubmit() {
    if ((this.AgentBalnce[0].balance.value + (this.Amount)) >= 0) {
      this.submitted = false
      let body = {
        "adjustment": {
          "value": this.Amount,
          "wallet": this.selectedCurrency
        },
        "ids": { "idList": [this.AgentGuid] },
        "comment": this.comment,
      }
      let bodys = {

      }
      console.log(body)
      this.AgentControlService.setAgentBalanceAdjustment(body).subscribe((data) => {
        console.log(data);
        if (data.changedObjectList) {
          // this.Msg="Successfully Cash Added"
          this.Msg="Cash adjusted successfully"
          this.AgentCashAdjustsuccessPopUp = true
        }
      },
      error => {
       this.Msg="Technical error"
        this.AgentCashAdjustsuccessPopUp = true
      })
    }
    else {
      this.submitted = true
    }
  }
  SuccessPop() {
    this.AgentCashAdjustsuccessPopUp = false
    // window.location.reload()
    this.router.navigate(['/Agentexplorer/AgentSummary'])
  }
}
