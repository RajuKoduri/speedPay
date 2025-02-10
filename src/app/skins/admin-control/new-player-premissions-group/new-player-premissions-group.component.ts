import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
@Component({
  selector: 'app-new-player-premissions-group',
  templateUrl: './new-player-premissions-group.component.html',
  styleUrls: ['./new-player-premissions-group.component.css']
})
export class NewPlayerPremissionsGroupComponent implements OnInit {
 @Input() PlayerPermissionDataChange: any = null;
 @Output() notifyParent:any = new EventEmitter()
  playerPermissionStructureList: any;
  playerPermissionList: any;
  FillterMenu: boolean = false;
  NewPlayerPermissionsForm: FormGroup;
  usertypeList: any;
  ddArr: any = [];
  guidValues: any = [];
  guidChildernValues: any = [];
  CreatePerMissionsRes: any;
  CreateSuccessPop: boolean = false;
  ErrorPopup: boolean = false;
  successmsg:any
  loader:boolean = false
  submitted:boolean = false
  isDisable:boolean = true 
  rawValues: any;
 
  constructor(private PlayerServiceService: PlayerServiceService, private router: Router) {
    this.NewPlayerPermissionsForm = new FormGroup({
      GroupName: new FormControl("",Validators.required),
      values: new FormControl([]),
      Childvalues: new FormControl([]),
    })
  }

  ngOnInit(): void {
    if(this.PlayerPermissionDataChange){
      this.PlayerPerEdit()
    }else{
      this.playerPermissionStructure();
    }
    this.usertype();
    this.rawValues = this.NewPlayerPermissionsForm.getRawValue()
  }

  get f() {
    return this.NewPlayerPermissionsForm.controls;
  }

  ngAfterViewInit(): void {
    console.log(this.PlayerPermissionDataChange)
    if(this.PlayerPermissionDataChange){
      this.NewPlayerPermissionsForm.patchValue({
        GroupName: this.PlayerPermissionDataChange.name
      })
    }
    
  }
  PlayerPerEdit(){
    const agentPermissionStructure = localStorage.getItem("playerPermissionStructure")
    if (agentPermissionStructure) {
      this.playerPermissionStructureList = JSON.parse(agentPermissionStructure)
    }
    console.log("playerPermissionStructureList", this.playerPermissionStructureList.children) 

    this.playerPermissionList = this.playerPermissionStructureList.children;
    let accessarray:any = []
  for(let i=0; i< this.playerPermissionList.length;i++){
    let firstLevel ={
      parent:{},
      childs:{},
      Name:"",
      index:0
    }
    firstLevel.parent = this.playerPermissionList[i].guid
    firstLevel.childs =  this.playerPermissionList[i].levels
    firstLevel.Name =  this.playerPermissionList[i].name
    firstLevel.index =  i
    accessarray.push(firstLevel)
    const formControlName = this.playerPermissionList[i].name + i
    const formControlValue =  this.playerPermissionList[i].levels.length > 0 ? "Disabled" : { value: null, disabled: true };
    this.NewPlayerPermissionsForm.addControl(formControlName, new FormControl(formControlValue))
    if( this.playerPermissionList[i].children){
      for(let j=0;j< this.playerPermissionList[i].children.length;j++){
        let secondLevel ={
          parent:{},
          childs:{},
          Name:"",
          index:0
        }
        secondLevel.parent =this.playerPermissionList[i].children[j].guid
        secondLevel.childs =  this.playerPermissionList[i].children[j].levels
        secondLevel.Name =  this.playerPermissionList[i].children[j].name
        secondLevel.index = i
        accessarray.push(secondLevel)
        const formControlName =this.playerPermissionList[i].children[j].name + i
        const formControlValue =  this.playerPermissionList[i].children[j].levels.length > 0 ? "Disabled" : { value: null, disabled: true };
        this.NewPlayerPermissionsForm.addControl(formControlName, new FormControl(formControlValue))
      }
    }
  }
   console.log("direct All",accessarray)
  this.guidValues = this.PlayerPermissionDataChange.values
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
            this.NewPlayerPermissionsForm.patchValue({
              [accessarray[s].Name + accessarray[s].index] :  accessarray[s].childs[a].name
            })
          }
         
        }
      }
    }
   
  }

  }
  playerPermissionStructure() {
    const agentPermissionStructure = localStorage.getItem("playerPermissionStructure")
    if (agentPermissionStructure) {
      this.playerPermissionStructureList = JSON.parse(agentPermissionStructure)
    }
    console.log("playerPermissionStructureList", this.playerPermissionStructureList.children)

    this.playerPermissionList = this.playerPermissionStructureList.children;
      
      for(let i=0; i< this.playerPermissionList.length; i++){      
        const formControlName = this.playerPermissionList[i].name + i
        const formControlValue =  this.playerPermissionList[i].levels.length > 0 ? "Disabled" : { value: null, disabled: true };
        // const formControlValue = this.playerPermissionList[i].levels[0]?.name
        this.NewPlayerPermissionsForm.addControl(formControlName, new FormControl(formControlValue,Validators.required))
        console.log(this.NewPlayerPermissionsForm)
        if(this.playerPermissionList[i].children){
          console.log(this.playerPermissionList[i].children)   
        for(let j=0;j< this.playerPermissionList[i].children.length;j++){
          console.log(this.playerPermissionList[i].name)
          console.log(this.playerPermissionList[i].children[j].name)
          console.log(this.playerPermissionList[i].children[j].guid)
          console.log(this.playerPermissionList[i].children[j].levels)
            const formControlNameChild = this.playerPermissionList[i].children[j].name + i
            const formControlValueChild = this.playerPermissionList[i].children[j].levels.length > 0 ? "Disabled" : { value: null, disabled: true };
            // const formControlValueChild =  this.playerPermissionList[i].children[j].levels[0]?.name
            this.NewPlayerPermissionsForm.addControl(formControlNameChild,new FormControl(formControlValueChild))
          }
        }
      } 
      console.log(this.NewPlayerPermissionsForm.value)
    for (let i = 0; i < this.playerPermissionList.length; i++) {
      let valuesObjs = { accessLevelId: {}, permissionId: {}, };
      // valuesObjs.permissionId = this.playerPermissionList[i].guid
      valuesObjs.permissionId = { hiLong: this.playerPermissionList[i].guid.hiLong, lowLong: this.playerPermissionList[i].guid.lowLong }
      for (let a = 0; a < this.playerPermissionList[i].levels.length; a++) {
        if (this.playerPermissionList[i].levels[a].name == "Disabled" || this.playerPermissionList[i].levels[a].name == "") {
          valuesObjs.accessLevelId = { hiLong: this.playerPermissionList[i].levels[a].guid.hiLong, lowLong: this.playerPermissionList[i].levels[a].guid.lowLong }
          this.guidValues.push(valuesObjs)
        }
      }
      if (this.playerPermissionList[i].children) {
        for (let b = 0; b < this.playerPermissionList[i].children.length; b++) {
          let valuesObjs = { accessLevelId: {}, permissionId: {}, };
          valuesObjs.permissionId = { hiLong: this.playerPermissionList[i].children[b].guid.hiLong, lowLong: this.playerPermissionList[i].children[b].guid.lowLong }
          // this.guidChildernValues.push(valueschildernObjs)
          for (let c = 0; c < this.playerPermissionList[i].children[b].levels.length; c++) {
            // console.log(this.playerPermissionList[i].children[b]);
            // console.log(this.playerPermissionList[i].children[b].levels[c]);
            if (this.playerPermissionList[i].children[b].levels[c].name == "Disabled" || this.playerPermissionList[i].children[b].levels[c].name == "") {
              valuesObjs.accessLevelId = { hiLong: this.playerPermissionList[i].children[b].levels[c].guid.hiLong, lowLong: this.playerPermissionList[i].children[b].levels[c].guid.lowLong }
              this.guidValues.push(valuesObjs)
            }

          }
        }
      }
      if (this.playerPermissionList[i].children !== undefined) {
        //console.log(" childrenList", this.playerPermissionList[i].children)

      }
    }
    console.log(this.guidValues)
    console.log(this.guidChildernValues)
  }

  usertype() {
    const usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype)
    }
    //console.log("usertypeList", this.usertypeList)
    //console.log("usertypeList", this.usertypeList[0].guid)
  }
  onChildernSelected(index: any, event: any, list: any,) {
    console.log(list);
    console.log(this.NewPlayerPermissionsForm.value.Childvalues.name)
    for (let i = 0; i < this.guidValues.length; i++) {
      if (this.guidValues[i].permissionId.hiLong == list.guid.hiLong, this.guidValues[i].permissionId.lowLong == list.guid.lowLong) {
        console.log(list.guid);

        for (let b = 0; b < list.levels.length; b++) {

          if (list.levels[b].name == this.NewPlayerPermissionsForm.value[list.name + index]) {
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
  onSelected(index: any, event: any, list: any,) {
    console.log(index,list,event);

    for (let i = 0; i < this.guidValues.length; i++) {
      if (this.guidValues[i].permissionId.hiLong == list.guid.hiLong, this.guidValues[i].permissionId.lowLong == list.guid.lowLong) {
        for (let b = 0; b < list.levels.length; b++) {

          if (list.levels[b].name == this.NewPlayerPermissionsForm.value[list.name + index]) {
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
    let optionName = this.NewPlayerPermissionsForm.value.values.name;
    //console.log(optionName)
    let listLevel = list.levels.filter((listLevel: any) => listLevel.name === optionName);
    //console.log(listLevel);
    this.ddArr.push({ listGuid: list.guid, listLevel: listLevel })

    this.ddArr.forEach((nam: any) => {
      if (nam.name == list.name) {
        this.ddArr.splice(1, nam);
      }
    });
    //console.log(this.ddArr)
    // let selecetedIndex = dropdownList.selectedIndex;
    ////   console.log("Selected index is: " + selecetedIndex);
    //   let selectedOption = dropdownList.options[selecetedIndex];
    ////   console.log("Selected option is: " + selectedOption.outerHTML);
    ////   console.log("Selected value is: " + selectedOption.value);
    ////   console.log("Selected text is: " + selectedOption.text);
  }
  onFormSubmit() { 
    this.submitted = true;
    console.log(this.NewPlayerPermissionsForm.valid)
     if( this.NewPlayerPermissionsForm.valid){
      this.loader = true
      if(this.PlayerPermissionDataChange){
        let body = {
          // "userType": this.usertypeList[0].guid,
  
            "name": this.NewPlayerPermissionsForm.value.GroupName,
            "values": this.guidValues,
            "defaultGroup":  this.PlayerPermissionDataChange.defaultGroup,
            "system": this.PlayerPermissionDataChange.system,   
            "usersNumber": this.PlayerPermissionDataChange.usersNumber,
            objState: this.PlayerPermissionDataChange.objState,
            //  changeDate: "2024-03-26T10:12:21.366",
            changeDate:this.PlayerPermissionDataChange.changeDate,
            changerLogin:  this.PlayerPermissionDataChange.changerLogin,
            guid : this.PlayerPermissionDataChange.guid,
          
        }
        console.log(body)
        this.PlayerServiceService.updateUserPermissiomsGroup(body).subscribe((data) => {
          console.log(data)
          if(data.changedObjectList){
            this.CreateSuccessPop = true;
            this.loader = false
            this.successmsg = "Successfully Updated"
            this.submitted = false;
          }
        },
          error => {
            this.ErrorPopup = true
          })
  
      }else{
        let body = {
          "userType": this.usertypeList[0].guid,
          "group": {
            "name": this.NewPlayerPermissionsForm.value.GroupName,
            "defaultGroup": false,
            "system": false,
            "usersNumber": 0,
            // "valuesddd": [this.NewPlayerPermissionsForm.value.values],
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
            this.loader = false
            this.successmsg = "Successfully Created"
          }
        },
          error => {
            this.ErrorPopup = true
          })
      }
      setTimeout(() => {
        this.loader = false
      }, 5000);
     }
    
  }

  onFormReset(){
    this.NewPlayerPermissionsForm.reset(this.rawValues)
  }

  EditCancel(){
    this.notifyParent.emit(false)
  }
  SuccessPop() {
    this.CreateSuccessPop = false;
    this.router.navigateByUrl('/playerpermissiongroups')
    this.loader = true
    // setTimeout(() => {
      window.location.reload()
    // }, 700);
  }
  TechnicalError() {
    this.ErrorPopup = false
  }
 
}
