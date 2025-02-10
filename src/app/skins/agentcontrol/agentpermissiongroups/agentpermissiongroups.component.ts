import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { AddAgentPermissionGroupComponent } from '../add-agent-permission-group/add-agent-permission-group.component';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';

@Component({
  selector: 'app-agentpermissiongroups',
  templateUrl: './agentpermissiongroups.component.html',
  styleUrls: ['./agentpermissiongroups.component.css']
})
export class AgentpermissiongroupsComponent implements OnInit {
  @ViewChild(AddAgentPermissionGroupComponent) AddAgentPermissionGroupComponent: AddAgentPermissionGroupComponent | undefined;
  usertypeList: any;
  AgentPermissionsData: any;
  agentPermissionList: any = [];
  AgentPermissionspopup: boolean = false;
  AgentRegistrationfulldetails: any;
  NavigateAgentlistPath: any;
  AgentpermissionData:any
  popupArrow:boolean = false
  selectinmdex:any
  constructor(private AgentControlService: AgentControlService, public dateTimepipe:DateTimePipe) {
  
  }

  ngOnInit(): void {
    this.usertype();
    // this.agentPermissionStructure();
    // this.AgentPermissionStructure();
    this.permissionList();
  }
  permissionList() {
    this.AgentPermissionsData = false
    let filterbody = {
      "userType": this.usertypeList[3].guid
    }
    this.AgentControlService.listUserPermissionsGroup(filterbody).subscribe((res) => { this.AgentPermissionsResData(res) })
  }

  AgentPermissionsResData(data: any) {
    console.log(data);
    this.AgentPermissionsData = data.objectList
    this.NavigateAgentlistPath = `${window.location.origin}/agentlist`
    console.log(this.NavigateAgentlistPath)
  }

  usertype() {
    const usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertypeList", this.usertypeList)
    console.log("usertypeList", this.usertypeList[3].guid)
  }

  changeDateFormat(date:any){
    return this.dateTimepipe.transforminingDispalyDate(date)
  }

  
  onClick(data: any) {
    console.log(data)
    this.AgentRegistrationfulldetails = this.AgentPermissionsData[data]
    console.log(this.AgentRegistrationfulldetails)
    this.AgentPermissionspopup = true;
  }
  closepopup() {
    this.AgentPermissionspopup = false
  }

  onSelected(index: any, event: any, list: any,) {

  }
  onChildernSelected(index: any, event: any, list: any,) {
  }
  onFormSubmit() {

  }
  permissionchange(i:any,data:any){
    console.log(i)
    console.log(data)
    this.AgentPermissionspopup = true
   this.AgentpermissionData =JSON.parse(JSON.stringify(data))
   this.popupArrow = false 
  }
  showmenu(list:any,i:any){
    this.selectinmdex = i;
     this.popupArrow = !this.popupArrow
  }
  makedefault(list:any){
    console.log(list)
    this.popupArrow = false   
        this.AgentControlService.makeDefaultUserPermissionsGroup(list.guid).subscribe((res) => this.makeadafaultres(res))
      }
  makeadafaultres(res:any){
    if(res.changedObjectList){
          window.location.reload()
    }
  }
  deleteset(list:any){
    console.log(list)  
    this.popupArrow = false
    this.AgentControlService.deleteUserPermissionsGroup(list.guid).subscribe((res) => this.permissiondelete(res))
  }
  permissiondelete(res:any){
    console.log(res)
    if(res.changedObjectList){
      window.location.reload()
    }
  }
}
