import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
@Component({
  selector: 'app-refer-player-agent',
  templateUrl: './refer-player-agent.component.html',
  styleUrls: ['./refer-player-agent.component.css']
})
export class ReferPlayerAgentComponent implements OnInit {

  @Input() agentInfo: any
  @Input() user: any
  @Output() notifyParent = new EventEmitter;

  playerCampaigns: any = [];
  agentCampaigns: any = [];
  PlayerCompaiganId: any;
  AgentCompaiganId: any;
  UserLogin: any;
  Error_Txt: any;
  findUserData: any;
  usertypeList: any;
  AgentName: any;
  enableRefer_Btn: boolean = true;
  SelteduserType: any;
  MovetoAgentPopup: boolean = false;
  MoveconformText: any;
  SpinnwerT: boolean = false;
  referPlayerByAgentbody: any;
  AgentGuid: any;
  copy: any;
  AgentGrossRevenuePercents: any;
  isRefBtnEnabled: any = [];
  agentReventPerc: any = [];
  constructor(private AgentControlService: AgentControlService, private DateTimePipe: DateTimePipe) { }

  ngOnInit() {
    console.log(this.user, this.agentInfo)
    this.AgentName = this.agentInfo.agent.login
    this.AgentGuid = this.agentInfo.guid
    this.getAgentGrossRevenuePercents(this.AgentGuid)
    this.usertype();
    this.getAgentCampaigns()
  }
get fullname(){
  return `${this.agentInfo.agent.firstName} ${this.agentInfo.agent.lastName}` 
}
  closeClick() {
    this.notifyParent.emit()
  }

  getAgentCampaigns() {
    let body = {
      "agentGuid": this.agentInfo.guid
    }
    this.AgentControlService.getAgentCampaigns(body).subscribe(data => {
      console.log(data);
      if (data.objectList) {
        // this.agentCampaigns = data.objectList;
        this.playerCampaigns = [];
        // this.agentCampaigns = [];
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

  usertype() {
    let usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertype", this.usertypeList)
  }
  findUser(userType: any) {
    console.log(this.UserLogin)
    console.log(this.PlayerCompaiganId)
    var userTypeGuid
    let samerefer: boolean=false
    if (userType == 'Player') {
      userTypeGuid = this.usertypeList[0].guid
    }
    if (userType == 'Agent') {
      userTypeGuid = this.usertypeList[3].guid


    
      if (this.AgentName.toLowerCase() == this.UserLogin.toLowerCase()) {
        samerefer = true;
        document.getElementById("errorInfo")?.classList.add('text-danger');
        this.Error_Txt = "You cannot refer agent to itself!"
      } else {
        samerefer = false
      }
    } 
    if(!samerefer){
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
            console.log(this.Error_Txt)
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
          console.log(this.Error_Txt)
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
  }
  getUserInfo(): string {
    // alert("dada")
    let date = this.changeSelect(this.findUserData[0].user.regDate)
    if (this.findUserData[0].user.fullName) {
      return `${this.findUserData[0].user.login} ( ${this.findUserData[0].user.fullName} ) registered ${date}`;
    } else {
      return `${this.findUserData[0].user.login} registered ${date}`;
    }
  }

  changeSelect(date: string) {

    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
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
          }
          else {
            this.enableRefer_Btn = false;
            // alert(0)
            // break;
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



  refer(userType: any) {
    this.SelteduserType = userType;
    // console.log("test")
    if (this.findUserData[0].referrer) {
      if (this.findUserData[0].referrer.login !== this.AgentName) {
        // alert("test")
        // alert('Move Conformation')
        this.MovetoAgentPopup = true;
        // return `Selected player already referred by ${this.findUserData[0].referrer.login}. Do You really want to move him to agent ${this.AgentName}`
        this.MoveconformText = `Selected ${userType} already referred by agent (${this.findUserData[0].referrer.login} ${this.findUserData[0].referrer.fullName}). Do You really want to move him to agent (${this.AgentName} ${this.agentInfo.agent.firstName} ${this.agentInfo.agent.lastName})`
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

  referplayer_Agent() {
    if (this.SelteduserType == 'Player') {
      this.referPlayerByAgentbody = {
        "agentGuid": this.AgentGuid,
        "campaignGuid": this.PlayerCompaiganId,
        "playerGuid": this.findUserData[0].user.guid
      }
      console.log(this.referPlayerByAgentbody)
    }
    // if (this.SelteduserType == 'Agent') {
    //   this.referPlayerByAgentbody = {
    //     "agentGuid": this.AgentGuid,
    //     "campaignGuid": this.AgentCompaiganId,
    //     "subAgentGuid": this.findUserData[0].user.guid
    //   }
    //   console.log(this.referPlayerByAgentbody)
    // }

    // this.AgentControlService.referPlayerByAgent(this.referPlayerByAgentbody).subscribe((data) => {
    //   console.log(data)
    //   if (data.changedObjectList) {
    //     this.ReferPlayerPop = false
    //     this.ReferAgentPop = false
    //     this.SpinnwerT = false
    //   }
    // })
  }



}
