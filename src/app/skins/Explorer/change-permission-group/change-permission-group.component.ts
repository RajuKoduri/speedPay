import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';

@Component({
  selector: 'change-permission-group',
  templateUrl: './change-permission-group.component.html',
  styleUrls: ['./change-permission-group.component.css']
})
export class ChangePermissionGroupComponent implements OnInit {

  @Input() userInfo: any
  @Input() userType: any
  @Output() notifyParent = new EventEmitter;

  userTypeGuid: any
  PermissionGroupList: any;
  SeletedPermissionGroup: any;
  subAgentCheckbox: boolean = false;
  usertypeList: any;
  userGuid: any;
  SpinnwerT:boolean = false;

  constructor(private AgentcontrolService: AgentControlService, private PlayerserviceService: PlayerServiceService) { }

  ngOnInit(): void {
    console.log(this.userType, this.userInfo)
    if (this.userType == "Agent") {
      this.userGuid = this.userInfo.agent.guid
    }
    else if (this.userType == "Player") {
      this.userGuid = this.userInfo.player.guid
    }
    this.usertype()
    this.getPermissionGroupList()
  }

  Permissionspopup() {
    this.notifyParent.emit()
  }

  usertype() {
    const usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertypeList", this.usertypeList)
    this.usertypeList.forEach((list: any) => {
      if (this.userType == list.value) {
        this.userTypeGuid = list.guid
      }
    })
  }

  getPermissionGroupList() {
    let body = {
      "userType": this.userTypeGuid
    }
    this.AgentcontrolService.listUserPermissionsGroup(body).subscribe((res) => {
      console.log(res)
      this.PermissionGroupList = res.objectList;
      this.SeletedPermissionGroup = this.PermissionGroupList[0].guid
    })
  }

  inputCheckchange(event: any) {
    this.subAgentCheckbox = event.target.checked
  }

  onSubmit() {
    this.SpinnwerT = true;

    let body = {
      "ids": {
        "idList": [this.userGuid],
      },
      "groupGuid": this.SeletedPermissionGroup,
      "withAllSubAgents": this.userType == "Agent" ? this.subAgentCheckbox : undefined,
    }

    if (this.userType == 'Agent') {
      this.AgentcontrolService.changeAgentsPermissionsGroup(body).subscribe((res) => {
        console.log(res)
        if (res.changedObjectList) {
          this.SpinnwerT = false
          this.Permissionspopup()
        }
      })
    }

    if (this.userType == "Player") {
      this.PlayerserviceService.changePlayersPermissionsGroup(body).subscribe((data) => {
        console.log(data);
        if (data.changedObjectList) {
          this.Permissionspopup()
          this.SpinnwerT = false;
        }
      });
    }
  }

}
