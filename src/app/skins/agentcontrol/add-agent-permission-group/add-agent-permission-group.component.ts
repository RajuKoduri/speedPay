import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
@Component({
  selector: 'app-add-agent-permission-group',
  templateUrl: './add-agent-permission-group.component.html',
  styleUrls: ['./add-agent-permission-group.component.css']
})
export class AddAgentPermissionGroupComponent implements OnInit {
  @Input() AgentpermissionData: any = null;
  NewAgentPermissionsForm: FormGroup;
  AgentPermissionStructureList: any;
  AgentPermissionList: any;
  guidValues: any = [];
  guidChildernValues: any;
  usertypeList: any;
  submitted = false;
  CreatePerMissionsRes: any;
  CreateSuccessPop: boolean = false;
  ErrorPopup: boolean = false;
  fistlevelvalue:any
  successmsg:any
  constructor(private PlayerServiceService: PlayerServiceService) {
    this.NewAgentPermissionsForm = new FormGroup({
      GroupName: new FormControl('', [Validators.required, Validators.minLength(4),]),
      values: new FormControl([]),
      Childvalues: new FormControl([]),
      subChildvalues: new FormControl([]),

    })
  }

  ngOnInit(): void {
 
  if(this.AgentpermissionData){
    this.AgentperEditData()
  }else{
      this.AgentPermissionStructure();

    }
    this.usertype();
    setTimeout(() =>{
      console.log(this.NewAgentPermissionsForm.value.values)
    },2000)
  }
  ngAfterViewInit(): void {
    console.log(this.AgentpermissionData)
    if(this.AgentpermissionData){

      this.NewAgentPermissionsForm.patchValue({
        GroupName: this.AgentpermissionData.name
      })
    }
    
  }
  get f() {
    return this.NewAgentPermissionsForm.controls;
  }

  usertype() {
    const usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertypeList", this.usertypeList)
    //console.log("usertypeList", this.usertypeList[0].guid)
  }
  AgentperEditData(){
    const agentPermissionStructure = localStorage.getItem("AgentPermissionStructure")
    if (agentPermissionStructure) {
      this.AgentPermissionStructureList = JSON.parse(agentPermissionStructure)   
    }
    console.log("AgentPermissionStructureList", this.AgentPermissionStructureList.children)
    this.AgentPermissionList = this.AgentPermissionStructureList.children;
      console.log( this.AgentPermissionList)
      console.log( this.AgentPermissionList[0].children)
  let accessarray:any = []
    for(let i=0;i<this.AgentPermissionList.length;i++){
      // let accessobj={
      //   parent:{},
      //   childs:{},
      //   Name:"" ,
      // index:0
      // }
      // accessobj.parent =  this.AgentPermissionList[i].guid
      // accessobj.childs =  this.AgentPermissionList[i].levels
      // accessobj.Name =  this.AgentPermissionList[i].name
      // accessarray.push(accessobj)
        const formcontrolName =  this.AgentPermissionList[i].name
        const formcontrolValue =  "Disabled"
        this.NewAgentPermissionsForm.addControl(formcontrolName,new FormControl(formcontrolValue))
     if(this.AgentPermissionList[i].children){
      for(let j=0;j<this.AgentPermissionList[i].children.length;j++){
        let secondlecel ={
          parent:{},
          childs:{},
          Name:"",
          index:0
        }
        secondlecel.parent = this.AgentPermissionList[i].children[j].guid
        secondlecel.childs =  this.AgentPermissionList[i].children[j].levels
        secondlecel.Name =  this.AgentPermissionList[i].children[j].name
        secondlecel.index =  i
        accessarray.push(secondlecel)

        const formcontrolName =  this.AgentPermissionList[i].children[j].name + i
        const formcontrolValue =  "Disabled"
        this.NewAgentPermissionsForm.addControl(formcontrolName,new FormControl(formcontrolValue))
        if(this.AgentPermissionList[i].children[j].children){
          for(let s=0;s<this.AgentPermissionList[i].children[j].children.length;s++){
            let thirdlecel ={
              parent:{},
              childs:{},
              Name:"",
              index:0
            }
            thirdlecel.parent =  this.AgentPermissionList[i].children[j].children[s].guid
            thirdlecel.childs =  this.AgentPermissionList[i].children[j].children[s].levels  
            thirdlecel.Name =  this.AgentPermissionList[i].children[j].children[s].name
            thirdlecel.index =  i
            accessarray.push(thirdlecel)

            const formcontrolName = this.AgentPermissionList[i].children[j].children[s].name + i
          const formcontrolValue =  "Disabled"
          this.NewAgentPermissionsForm.addControl(formcontrolName,new FormControl(formcontrolValue))
          }
        }
      }
     }
    }

    console.log("create new permission",accessarray)
console.log(this.NewAgentPermissionsForm.value)
      this.guidValues = this.AgentpermissionData.values
      console.log(this.guidValues)
      for(let k=0;k<this.guidValues.length;k++){
        for(let s=0;s< accessarray.length;s++){
          if(this.guidValues[k].permissionId.lowLong == accessarray[s].parent.lowLong){
            // console.log(this.guidValues[k].accessLevelId.lowLong)
            // console.log( accessarray[s])
            // console.log(accessarray[s].Name)
            for(let a=0;a < accessarray[s].childs.length;a++){
              if(this.guidValues[k].accessLevelId.lowLong == accessarray[s].childs[a].guid.lowLong){
                console.log( accessarray[s].Name + accessarray[s].index)
                console.log(accessarray[s].childs[a].name)
                this.NewAgentPermissionsForm.patchValue({
                  [accessarray[s].Name + accessarray[s].index] :  accessarray[s].childs[a].name
                })
              }
             
            }
          }
        }
       
      }
  } 
  AgentPermissionStructure() {
    const agentPermissionStructure = localStorage.getItem("AgentPermissionStructure")
    if (agentPermissionStructure) {
      this.AgentPermissionStructureList = JSON.parse(agentPermissionStructure)   
    }
    console.log("AgentPermissionStructureList", this.AgentPermissionStructureList.children)
    this.AgentPermissionList = this.AgentPermissionStructureList.children;

      console.log( this.AgentPermissionList)
      console.log( this.AgentPermissionList[0].children)  

    for(let i=0;i<this.AgentPermissionList.length;i++){
        const formcontrolName =  this.AgentPermissionList[i].name
        const formcontrolValue =  "Disabled"
        this.NewAgentPermissionsForm.addControl(formcontrolName,new FormControl(formcontrolValue))
     if(this.AgentPermissionList[i].children){
      for(let j=0;j<this.AgentPermissionList[i].children.length;j++){
        const formcontrolName =  this.AgentPermissionList[i].children[j].name + i
        const formcontrolValue =  "Disabled"
        this.NewAgentPermissionsForm.addControl(formcontrolName,new FormControl(formcontrolValue))
        if(this.AgentPermissionList[i].children[j].children){
          for(let s=0;s<this.AgentPermissionList[i].children[j].children.length;s++){
            const formcontrolName = this.AgentPermissionList[i].children[j].children[s].name + i
          const formcontrolValue =  "Disabled"
          this.NewAgentPermissionsForm.addControl(formcontrolName,new FormControl(formcontrolValue))
          }
        }
      }
     }
    }

    console.log(this.NewAgentPermissionsForm.value)
  let deposit_ayy = []
    for (let i = 0; i < this.AgentPermissionList.length; i++) {
      let valuesObjs = { accessLevelId: {}, permissionId: {}, };
      valuesObjs.permissionId = { hiLong: this.AgentPermissionList[i].guid.hiLong, lowLong: this.AgentPermissionList[i].guid.lowLong }
      for (let a = 0; a < this.AgentPermissionList[i].levels.length; a++) {
        if (this.AgentPermissionList[i].levels[a].name == "Disabled" || this.AgentPermissionList[i].levels[a].name == "") {
          valuesObjs.accessLevelId = { hiLong: this.AgentPermissionList[i].levels[a].guid.hiLong, lowLong: this.AgentPermissionList[i].levels[a].guid.lowLong }
          this.guidValues.push(valuesObjs)
        }
      }
     
      if (this.AgentPermissionList[i].children) {
        for (let b = 0; b < this.AgentPermissionList[i].children.length; b++) {
          let valuesObjs = { accessLevelId: {}, permissionId: {}, };
          valuesObjs.permissionId = { hiLong: this.AgentPermissionList[i].children[b].guid.hiLong, lowLong: this.AgentPermissionList[i].children[b].guid.lowLong }

          for (let c = 0; c < this.AgentPermissionList[i].children[b].levels.length; c++) {
            if (this.AgentPermissionList[i].children[b].levels[c].name == "Disabled" || this.AgentPermissionList[i].children[b].levels[c].name == "") {
              valuesObjs.accessLevelId = { hiLong: this.AgentPermissionList[i].children[b].levels[c].guid.hiLong, lowLong: this.AgentPermissionList[i].children[b].levels[c].guid.lowLong }
              this.guidValues.push(valuesObjs)
            }  

            if(this.AgentPermissionList[i].children[b].children){  
              let de_cas_obj = { accessLevelId: {}, permissionId: {}, };
              console.log("testting",this.AgentPermissionList[i].children[b].children[c])
              de_cas_obj.permissionId = { hiLong: this.AgentPermissionList[i].children[b].children[c].guid.hiLong, lowLong: this.AgentPermissionList[i].children[b].children[c].guid.lowLong }             
              for(let d = 0;d < this.AgentPermissionList[i].children[b].children[c].levels.length; d++){
                 if (this.AgentPermissionList[i].children[b].children[c].levels[d].name == "Disabled" || this.AgentPermissionList[i].children[b].levels[d].name == "") {
                  de_cas_obj.accessLevelId = { hiLong: this.AgentPermissionList[i].children[b].children[c].levels[d].guid.hiLong, lowLong: this.AgentPermissionList[i].children[b].children[c].levels[d].guid.lowLong }
                  //  deposit_ayy.push(de_cas_obj)
                  this.guidValues.push(de_cas_obj)
                  }
                }
            }
           
          }
        }
      }
      if (this.AgentPermissionList[i].children !== undefined) {
        //console.log(" childrenList", this.AgentPermissionList[i].children)

      }
    } 

    console.log(this.guidValues)
    console.log(this.guidChildernValues)
    console.log(this.AgentPermissionList)
  }

  onChildernSelected(index: any, event: any, list: any,) {
    console.log(list);
    console.log(this.NewAgentPermissionsForm.value[list.name + index])
    for (let i = 0; i < this.guidValues.length; i++) {
      if (this.guidValues[i].permissionId.hiLong == list.guid.hiLong, this.guidValues[i].permissionId.lowLong == list.guid.lowLong) {
        console.log(list.guid);
        for (let b = 0; b < list.levels.length; b++) {
          if (list.levels[b].name == this.NewAgentPermissionsForm.value[list.name + index]) {
            console.log(list.levels[b].guid.hiLong, list.levels[b].guid.lowLong, list.levels[b].name)
            console.log(this.guidValues[i].permissionId.hiLong)
            this.guidValues[i].accessLevelId.hiLong = list.levels[b].guid.hiLong;
            this.guidValues[i].accessLevelId.lowLong = list.levels[b].guid.lowLong;
          }

        }
      }
    }  
    console.log(this.guidValues)
  }
  onSubChildernSelected(index: any, event: any, list: any,) {
    console.log(list);
    console.log(this.NewAgentPermissionsForm.value[list.name + index])
    for (let i = 0; i < this.guidValues.length; i++) {
      if (this.guidValues[i].permissionId.hiLong == list.guid.hiLong, this.guidValues[i].permissionId.lowLong == list.guid.lowLong) {
        console.log(list.guid);

        for (let b = 0; b < list.levels.length; b++) {
          if (list.levels[b].name == this.NewAgentPermissionsForm.value[list.name + index]) {
            this.guidValues[i].accessLevelId.hiLong = list.levels[b].guid.hiLong;
            this.guidValues[i].accessLevelId.lowLong = list.levels[b].guid.lowLong;
          }

        }
      }
    }
    console.log(this.guidValues)
  }
  onSelected(index: any, event: any, list: any,) {
    console.log(list)
    console.log(event)
    console.log(list)   
    for (let i = 0; i < this.guidValues.length; i++) {
      if (this.guidValues[i].permissionId.hiLong == list.guid.hiLong, this.guidValues[i].permissionId.lowLong == list.guid.lowLong) {
        for (let b = 0; b < list.levels.length; b++) {

          if (list.levels[b].name == this.NewAgentPermissionsForm.value[list.name + index]) {
            console.log(list.levels[b].guid.hiLong, list.levels[b].guid.lowLong, list.levels[b].name)
            console.log(this.guidValues[i].permissionId.hiLong)
            this.guidValues[i].accessLevelId.hiLong = list.levels[b].guid.hiLong;
            this.guidValues[i].accessLevelId.lowLong = list.levels[b].guid.lowLong;
          }

        }
      }
    }   
    console.log(this.guidValues)

    let accessLevelId = list.guid;
    //console.log(accessLevelId)
    let optionName = this.NewAgentPermissionsForm.value.values.name;
    //console.log(optionName)
    let listLevel = list.levels.filter((listLevel: any) => listLevel.name === optionName);
    //console.log(listLevel);
    // this.ddArr.push({ listGuid: list.guid, listLevel: listLevel })

    // this.ddArr.forEach((nam: any) => {
    //   if (nam.name == list.name) {
    //     this.ddArr.splice(1, nam);
    //   }
    // });
  }
  onFormSubmit() {
    //console.log(this.NewAgentPermissionsForm.value)
    this.submitted = true
    console.log(this.NewAgentPermissionsForm.value)
    if (this.NewAgentPermissionsForm.valid) {
      console.log("Valid Form")  
      if(this.AgentpermissionData){
        let body = {
          // "userType": this.usertypeList[3].guid,
          // "group": {
            "name": this.NewAgentPermissionsForm.value.GroupName,
            "defaultGroup":  this.AgentpermissionData.defaultGroup,
            "system": this.AgentpermissionData.system,   
            "usersNumber": this.AgentpermissionData.usersNumber,
            "values": this.guidValues,
              guid : this.AgentpermissionData.guid,
              objState: this.AgentpermissionData.objState,
            //  changeDate: "2024-03-26T10:12:21.366",
             changeDate:this.AgentpermissionData.changeDate,
             changerLogin:  this.AgentpermissionData.changerLogin
          // }
        }
        this.PlayerServiceService.updateUserPermissiomsGroup(body).subscribe((data) => {
          console.log(data)
          if(data.changedObjectList){
            this.CreateSuccessPop = true;
            this.successmsg = "Successfully Updated"
          }
        },
          error => {
            this.ErrorPopup = true
          })
      }else{
        let body = {
          "userType": this.usertypeList[3].guid,
          "group": {
            "name": this.NewAgentPermissionsForm.value.GroupName,
            "defaultGroup": false,
            "system": false,
            "usersNumber": 0,
            // "valuesddd": [this.NewAgentPermissionsForm.value.values],
            // "values": this.ddArr
            "values": this.guidValues
          }
        }
        console.log(body)
        this.PlayerServiceService.createUserPermissionsGroup(body).subscribe((data) => {
          console.log(data)
          this.CreatePerMissionsRes = data.changedObjectList;
          if (this.CreatePerMissionsRes) {
            this.CreateSuccessPop = true;
            this.successmsg = "Successfully Created"
          }
        },
          error => {
            this.ErrorPopup = true
          })
      }


      
    }
  }
  SuccessPop() {
    this.CreateSuccessPop = false;
    // this.router.navigateByUrl('/playerpermissiongroups')
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }
  TechnicalError() {
    this.ErrorPopup = false
  }
}
