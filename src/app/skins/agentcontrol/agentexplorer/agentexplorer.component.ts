import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { ToolsService } from 'src/app/source/Tools.service';
import { SetRevenueAdjustmentComponent } from './set-revenue-adjustment/set-revenue-adjustment.component';
@Component({
  selector: 'app-agentexplorer',
  templateUrl: './agentexplorer.component.html',
  styleUrls: ['./agentexplorer.component.css']
})
export class AgentexplorerComponent implements OnInit {
  @ViewChild(SetRevenueAdjustmentComponent) setAgentComp!: SetRevenueAdjustmentComponent;

  isMenuOpen: boolean = true;
  PlayerName: any;
  AgentMenuList: boolean =  false;
  PromotionalList: any;
  PaymentList: any;
  AgentName: any;
  AgentGuid: any;
  popupList: boolean = false;
  showDiv: any;
  ReferPlayerPop: boolean = false;
  ReferAgentPop: boolean = false;
  UserLogin: any
  isDisabled: boolean = true;
  agentCampaigns: any = [];
  playerCampaigns: any = [];
  PlayerCompaiganId: any
  findUserData: any;
  enableBtn: boolean = false;
  AgentCompaiganId: any;
  AgentGrossRevenuePercents: any;
  usertypeList: any;
  copy: any;
  agentReventPerc: any = [];
  enableRefer_Btn: boolean = true;
  isRefBtnEnabled: any = [];
  MovetoAgentPopup: boolean = false;
  RevenuePaymentpop: boolean = false;
  Error_Txt: any
  MoveconformText: any;
  SelteduserType: any;
  SpinnwerT: boolean = false;
  referPlayerByAgentbody: any;
  TemplateCreationTypesList: any;
  AgentPaymentGuid: any;
  AgentMailTemplates: any;
  MailTemplateGuid: any;
  MailTemplateComment: any;
  AllSubAgents: boolean = true;
  compulsorycahout: boolean = false;
  activetable:any
  revenueAdjustmentPopup:boolean = false
  AgentInfo: any;
  userType:any
  isPromotionalCodePopup: boolean = false;
  isChangePermissionGroup:boolean = false;

  constructor(private AgentControlService: AgentControlService, private ToolsService: ToolsService) { }

  ngOnInit(): void {
    // alert("check")
    this.GetAgentName();
    this.GetAgentGuid();
    this.usertype();
    let activeroute:any = window.location.href
    console.log(activeroute)
    console.log(window)
    console.log(window.location.pathname)
   this.activetable = window.location.pathname.split('/')[2]
   console.log(this.activetable)
   
   if(this.activetable == "AgentPersonalInfo" || this.activetable == "AgentCashWallets" || this.activetable == "AgentBalance" || this.activetable == "AgentNestedBalance" || this.activetable == "revenueSummary" || this.activetable == "AgentCashAdjustment" 
      || this.activetable == "RefferedPlayers" || this.activetable == "RefferedAgents" || this.activetable == "RevenueSettings" || this.activetable == "PlayersChargebacks" || this.activetable == "IpHistory" )
      {
       this.AgentMenuList = true
   }else{
     this.AgentMenuList = false
   }
   if(this.activetable == "Deposits" || this.activetable == "CashAdjustments" || this.activetable == "AgentTransferstoPlayers" || this.activetable == "AgentTransferstoAgents" || this.activetable == "revenueAdjustments" 
   || this.activetable == "revenuePayments" || this.activetable == "DetailTransaction" ){
    this.AgentMenuList = true
    this.PaymentList = true
   }else{
    // this.AgentMenuList = false
    this.PaymentList = false
   }
  }

  Revenueclosepopup(){
    this.revenueAdjustmentPopup = !this.revenueAdjustmentPopup
    this.popupList = false;
    
    // this.setAgentComp.closepopup()  
  }
  compalsaryCashOut(){

    this.compulsorycahout = !this.compulsorycahout;
    this.popupList = false;
  }
  
  openSideP() {
    this.popupList = !this.popupList
  }
  toggelMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  AgentMenu() {
    this.AgentMenuList = !this.AgentMenuList
  }
  Paymentsystem() {
    this.PaymentList = !this.PaymentList
  }
  PromotionalCodes() {
    this.PromotionalList = !this.PromotionalList
  }
  GetAgentName() {
    let AgentName = sessionStorage.getItem('AgentName')
    if (AgentName) {
      this.AgentName = JSON.parse(AgentName)
    }
  }
  GetAgentGuid() {
    let AgentGuid = sessionStorage.getItem('Agentguid')
    let AgentInfo= sessionStorage.getItem('AgentInfo')
    if (AgentGuid) {
      this.AgentGuid = JSON.parse(AgentGuid)
    }
    if (AgentInfo) {
      this.AgentInfo = JSON.parse(AgentInfo)
    }
    console.log("AngentInfo",this.AgentInfo)
  }
  usertype() {
    let usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertype", this.usertypeList)
  }
  TemplateCreationTypes() {
    const TemplateCreationTypes = localStorage.getItem('TemplateCreationTypes');
    if (TemplateCreationTypes) {
      this.TemplateCreationTypesList = JSON.parse(TemplateCreationTypes);
    }
    console.log("TemplateCreationTypes", this.TemplateCreationTypesList)
    this.TemplateCreationTypesList.forEach((data: any, index: number) => {
      // console.log(data)
      if (data.value == ("Agent Payment")) {
        console.log(data)
        this.AgentPaymentGuid = data.guid
      }
    })
  }
  AgentActions(data: any) {
    console.log(data)
    this.popupList = false;
    if (data == 'ReferPlayer' || data == 'ReferAgent') {
      this.getAgentCampaigns()
    }

    // if (data == 'ReferPlayer') {
    //   this.ReferPlayerPop = true;
    //   this.findUserData = 0
    //   console.log(this.agentCampaigns)
    // }
    switch (data) {
      case 'ReferPlayer': {
        this.ReferPlayerPop = true;
        this.findUserData = 0
        break;
      }
      case 'ReferAgent': {
        this.ReferAgentPop = true;
        this.getAgentGrossRevenuePercents(this.AgentGuid)
        break;
      }
      case 'RevenuePayment': {
        this.RevenuePaymentpop = true;
        this.AllSubAgents = false;
        this.TemplateCreationTypes();
        this.getMailTemplatesByType();
        break;
      }
      // case 'CompulsoryCashout': {
      //   // alert('CompulsoryCashout')
      //   this.compulsorycahout = !this.compulsorycahout;
      //   break;
      // }
    }
  }
  getAgentCampaigns() {
    let body = {
      "agentGuid": this.AgentGuid
    }
    this.AgentControlService.getAgentCampaigns(body).subscribe(data => {
      console.log(data);
      if (data.objectList) {
        // this.agentCampaigns = data.objectList;
        this.playerCampaigns = [];
        this.agentCampaigns = [];
        data.objectList.forEach((data: any, index: number) => {
          // console.log(data.name)
          if (data.name.startsWith('Player Gross')) {
            console.log(data.name)
            this.playerCampaigns.push(data)
            this.PlayerCompaiganId = this.playerCampaigns[0].guid
          }
          if (data.name.startsWith('Agent Gross')) {
            console.log(data)
            this.agentCampaigns.push(data)
            this.AgentCompaiganId = this.agentCampaigns[0].guid
            console.log(this.agentCampaigns)
          }
        })

      }
    });
  }
  show2(modalRef: HTMLDivElement) {
    const modal = new Modal(modalRef);
    modal.show();
  }
  show(modalRef: ElementRef) {
    setTimeout(() => {

      console.log(modalRef)
      console.log(modalRef)
      const modal = new Modal(modalRef.nativeElement);
      modal.show();
    }, 200)
  }
  WINDOW() {
    window.print()
  }


  onUserInput(event: any) {
    console.log(event)
    let inputText = event.target.value;
    if (inputText == '') {
      this.isDisabled = true;  // Make button disabled
    }
    else {
      this.isDisabled = false; // Make button enabled
    }
  }

  findUser(userType: any) {
    console.log(this.UserLogin)
    console.log(this.PlayerCompaiganId)
    var userTypeGuid
    if (userType == 'Player') {
      userTypeGuid = this.usertypeList[0].guid
    }
    if (userType == 'Agent') {
      userTypeGuid = this.usertypeList[3].guid
    }
    let user = {
      "login": [this.UserLogin],
      "returnTotalDebt": true,
      "userTypeGuid": userTypeGuid
    }
    this.Error_Txt = ''
    this.AgentControlService.getUserByLogin(user).subscribe(user => {
      console.log(user)
      console.log(user.objectList.length)
      this.findUserData = user.objectList;


      // alert(1)
      // if (userType == 'Agent') {
      //   if (this.findUserData.length == 0) {
      //     alert("hello")
      //     this.AgentGrossRevenuePercents = false
      //   } else if (this.findUserData.length == 1) {
      //     this.getAgentGrossRevenuePercents(this.findUserData[0].guid)
      //   }
      // }

      if (this.findUserData && this.findUserData.length === 1) {
        const user = this.findUserData[0];
        console.log(user.referrer);

        if (user.referrer) {
          console.log(user.referrer.login + "   -----   " + this.AgentName)
          if (user.referrer.login === this.AgentName) {
            console.log(document.getElementById("errorInfo"));

            document.getElementById("errorInfo")?.classList.add('text-danger');

            const btn = document.getElementById('refBtn') as HTMLButtonElement | null;
            console.log(btn)
            btn?.setAttribute('disabled', '');
            this.enableRefer_Btn = true;
            this.Error_Txt = `${user.user.login} already referred to ${this.AgentName}`;

          }
          else {
            // this.MovetoAgentPopup = true;
            console.log(document.getElementById("errorInfo"));
            this.Error_Txt = this.getUserInfo();
            if (userType == 'Agent') {
              this.getAgentGrossRevenuePercents(this.findUserData[0].guid)
            }
            // if (document.getElementById("errorInfo")?.classList.contains('text-danger')) {
            document.getElementById("errorInfo")?.classList.remove('text-danger');
            document.getElementById("errorInfo")?.classList.add('text-success');
            // }
            const btn = document.getElementById('refBtn') as HTMLButtonElement | null;
            btn?.removeAttribute('disabled');


          }
        } else {
          // if (document.getElementById("errorInfo")?.classList.contains('text-danger')) {
          document.getElementById("errorInfo")?.classList.remove('text-danger');
          document.getElementById("errorInfo")?.classList.add('text-success');
          // }
          const btn = document.getElementById('refBtn') as HTMLButtonElement | null;
          btn?.removeAttribute('disabled');
          this.Error_Txt = this.getUserInfo()
          if (userType == 'Agent') {
            this.getAgentGrossRevenuePercents(this.findUserData[0].guid)
          }
        }
      } else {
        document.getElementById("errorInfo")?.classList.add('text-danger');
        const btn = document.getElementById('refBtn') as HTMLButtonElement | null;
        btn?.setAttribute('disabled', '');
        this.Error_Txt = 'No user found';
      }


      // if (this.findUserData.length) {
      //   if (this.findUserData[0].referrer) {
      //     alert(' Yes referrer')
      //     console.log(this.findUserData[0].referrer.login == this.AgentName)
      //     if (this.findUserData[0].referrer.login == this.AgentName) {
      //       alert(this.findUserData[0].user.login + ' ' + 'already referred to ' + this.AgentName)
      //       document.getElementById("errorInfo")?.classList.add('text-danger');
      //       const btn = document.getElementById('refBtn') as HTMLButtonElement | null;
      //       btn?.setAttribute('disabled', '');
      //       this.Error_Txt = `${this.findUserData[0].user.login} already referred to ${this.AgentName}`
      //     }
      //     else {
      //       this.Error_Txt = this.getUserInfo()
      //       alert(' Selected player already referred by agent. Do You really want to move him to agent (agentName)')
      //     }
      //   }
      // } else {
      //   this.Error_Txt = 'No User Found'
      //   alert(' No User Found')
      // }
      // if (this.findUserData == '' ||this.findUserData == null || ) {

      console.log(this.findUserData)
      console.log(this.findUserData.length)
      // this.UserError();
    })
  }
  getUserInfo(): string {
    // alert("dada")
    if (this.findUserData[0].user.fullName) {
      return `${this.findUserData[0].user.login} ( ${this.findUserData[0].user.fullName} ) registered ${this.findUserData[0].user.regDate}`;
    } else {
      return `${this.findUserData[0].user.login} registered ${this.findUserData[0].user.regDate}`;
    }
  }

  UserError(): string {
    console.log("Hiiiii");
    if (this.findUserData && this.findUserData.length === 1) {
      const user = this.findUserData[0];
      if (user.referrer) {
        if (user.referrer.login === this.AgentName) {

          this.Error_Txt = "Hiiiiiiiiii";
          document.getElementById("errorInfo")?.classList.add('text-danger');
          const btn = document.getElementById('refBtn') as HTMLButtonElement | null;
          btn?.setAttribute('disabled', '');
          return `${user.user.login} already referred to ${this.AgentName}`;

        }
        else {
          // this.MovetoAgentPopup = true;
          return this.getUserInfo();
        }
      } else {
        if (document.getElementById("errorInfo")?.classList.contains('text-danger')) {
          document.getElementById("errorInfo")?.classList.remove('text-danger');
        }
        const btn = document.getElementById('refBtn') as HTMLButtonElement | null;
        btn?.removeAttribute('disabled');
        return this.getUserInfo()
      }
    } else {
      document.getElementById("errorInfo")?.classList.add('text-danger');
      const btn = document.getElementById('refBtn') as HTMLButtonElement | null;
      btn?.setAttribute('disabled', '')
      return 'No user found';
    }
  }

  refer(userType: any) {
    this.SelteduserType = userType;
    // console.log("test")
    if (this.findUserData[0].referrer) {
      if (this.findUserData[0].referrer.login !== this.AgentName) {
        // alert("test")
        // alert('Move Conformation')
        this.MovetoAgentPopup = true;
        // return `Selected player already referred by ${this.findUserData[0].referrer.login}. Do You really want to move him to agent ${this.AgentName}`
        this.MoveconformText = `Selected ${userType} already referred by ${this.findUserData[0].referrer.login}. Do You really want to move him to agent ${this.AgentName}`
      } else {

        // return ''
      }
    } else {
      alert('Api Hit01')
      this.SpinnwerT = true
      this.referplayer_Agent()
      // if (userType == 'Player') {
      //   // this.referplayer()
      // } if (userType == 'Agent') {
      //   // this.referAgent()
      // }
      // this.referplayer(userType)
      // this.referplayer()
      // return ''
    }
  }
  MoveconformPopup(type: any) {
    if (type == 'yes') {
      this.referplayer_Agent()
      this.MovetoAgentPopup = false;
      this.SpinnwerT = true;
    } else {
      this.MovetoAgentPopup = false;
    }

  }
  // referplayer(userType: any) {
  referplayer_Agent() {
    if (this.SelteduserType == 'Player') {
      this.referPlayerByAgentbody = {
        "agentGuid": this.AgentGuid,
        "campaignGuid": this.PlayerCompaiganId,
        "playerGuid": this.findUserData[0].user.guid
      }
      console.log(this.referPlayerByAgentbody)
    }
    if (this.SelteduserType == 'Agent') {
      this.referPlayerByAgentbody = {
        "agentGuid": this.AgentGuid,
        "campaignGuid": this.AgentCompaiganId,
        "subAgentGuid": this.findUserData[0].user.guid
      }
      console.log(this.referPlayerByAgentbody)
    }
    // this.AgentControlService.referPlayerByAgent(this.referPlayerByAgentbody).subscribe((data) => {
    //   console.log(data)
    //   if (data.changedObjectList) {
    //     this.ReferPlayerPop = false
    //     this.ReferAgentPop = false
    //     this.SpinnwerT = false
    //   }
    // })
  }
  referPlayerPopup(user:any) {
    this.ReferPlayerPop = !this.ReferPlayerPop;
    this.userType = user
    this.popupList = false
    this.UserLogin = ''
    this.isDisabled = true;
    this.findUserData = ''
    this.Error_Txt = ''
  }

  promotinalCodePopup(){
    this.isPromotionalCodePopup = !this.isPromotionalCodePopup
    this.popupList = false
  }

  changePermissionGroupPopup(){
    this.isChangePermissionGroup = !this.isChangePermissionGroup
    this.popupList = false
  }

  closeAgentPop() {
    this.ReferAgentPop = false;
    this.UserLogin = '';
    this.isDisabled = true;
    this.findUserData = ''
    this.agentReventPerc = [];
    this.Error_Txt = ''
  }
  getAgentGrossRevenuePercents(AgentGuid: any) {
    // this.loader = true;
    this.AgentGrossRevenuePercents = false;
    let body = {
      "idList": [AgentGuid]
    }
    this.AgentControlService.getAgentGrossRevenuePercents(body).subscribe((data) => {
      console.log(data);
      // this.loader = false;

      // this.copy = JSON.parse(JSON.stringify(data)) as typeof data;
      if (this.agentReventPerc.length == 0) {
        this.agentReventPerc = data.objectList
        this.copy = [...this.agentReventPerc]
      } else {

        console.log(this.copy)
        this.AgentGrossRevenuePercents = data.objectList
        this.AgentGrossRevenuePercents.forEach((data: any, index: number) => {
          this.agentReventPerc[index].Newpercent = data.percent;
          // this.isRefBtnEnabled[index] = 0; 

          if ((data.percent <= this.agentReventPerc[index].percent)) {
            // alert('ding 1')

            this.isRefBtnEnabled[index] = 0;
          } else {
            this.isRefBtnEnabled[index] = 1;
          }
        })

        console.log(this.isRefBtnEnabled);
        for (let i = 0; i < this.isRefBtnEnabled.length; i++) {
          if (this.isRefBtnEnabled[i] == 1) {
            this.enableRefer_Btn = true;
            break;
          } else {
            this.enableRefer_Btn = false;
            break;
          }
        }
        // this.isRefBtnEnabled.forEach((data: any, index: number) => {       
        //   if( this.isRefBtnEnabled[index] == 1){
        //     alert('ding 2')
        //     this.enableRefer_Btn = true;
        //    return; 
        //   }else{
        //     alert(`hello`)
        //     this.enableRefer_Btn = false;
        //   }
        // })

        if (this.enableRefer_Btn) {
          const btn = document.getElementById('refBtn') as HTMLButtonElement | null;
          console.log(btn)
          btn?.setAttribute('disabled', '');
        }
        console.log("-------");

        console.log(this.agentReventPerc);
        console.log("-------");
      }
    })
  }
  referAgent() {
    let body = {
      "agentGuid": this.AgentGuid,
      "campaignGuid": this.AgentCompaiganId,
      "subAgentGuid": this.findUserData[0].user.guid
    }
    console.log(body);
    this.AgentControlService.referAgentByAgent(body).subscribe((data) => {
      console.log(data)
      if (data.changedObjectList) {
        this.ReferAgentPop = false
      }
    });
  }
  getMailTemplatesByType() {
    let body = this.AgentPaymentGuid

    this.ToolsService.getMailTemplatesByType(body).subscribe((data) => {
      console.log(data)
      if (data.objectList) {
        this.AgentMailTemplates = data.objectList
        this.MailTemplateGuid = this.AgentMailTemplates[0].guid
      }
    })
  }
  RevenuePaymentpopClose(type: any) {
    this.RevenuePaymentpop = false;
    if (type === 'yes') {
      this.SpinnwerT = true;
      let body = {
        "agentIds": [this.AgentGuid
        ],
        "emailTemplateGuid": this.MailTemplateGuid,
        "comment": this.MailTemplateComment,
        "includeAllSubAgents": this.AllSubAgents,
        "useRevenueToRepayCredits": false
      }
      console.log(body)
      this.AgentControlService.makePaymentForAgents(body).subscribe((data) => {
        console.log(data)
        if (data.changedObjectList) {
          this.SpinnwerT = false;
        }
      })
    }
  }
  popupListclose(){
    this.popupList = false
  }
}