import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Input, } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { CreateAccessRuleTreeComponent } from '../create-access-rule-tree/create-access-rule-tree.component';
import { set } from 'date-fns';




// setUserAccessRule



@Component({
  selector: 'app-create-access-rule',
  templateUrl: './create-access-rule.component.html',
  styleUrls: ['./create-access-rule.component.css']
})
export class CreateAccessRuleComponent implements OnInit,OnDestroy,AfterViewInit {

  @ViewChild('treeComponent', { static: false })
  childComponent: CreateAccessRuleTreeComponent = new CreateAccessRuleTreeComponent;
  // @ViewChild(CreateAccessRuleTreeComponent) childComponent!: ChildComponent;
  @Input() PlayerAccessData: any = null;

  usertypeList: any;
  AccessRuleForm: FormGroup
  usertypesList: any = [];
  UserAccessAreaList: any;
  AccessAreas: any = [];
  accessRuleList: any;
  Ruletitle = "(Use the Insert or Add Key) \n Adds new condition to this group "
  AccessRuleConditions: any = [];
  selectedType: any;
  selectedRuleList: any = [];
  AccessAreaFilteredList: any = []
  selectedAccessArea: any;
  accessRuleConditionList: any =[];
  OperationsList: any = [];
  logicalOperationPopUp: boolean = false;
  selectedLogicalOperation: string = "And";
  selectedLogicalOperationChildren:string = "And";
  childComponentsData: any = [];
  logicalOperationPopUpChildren: boolean = false;
  countrieslist: any =[];
  // activeOptionForFirstSelect: any;
  languageOptionList: any =[];
  UserAccessStatusList: any =[];
  CreateSuccessPop: boolean = false;
  FilltererrorMessageText: string = "";
  errorMessageText:string = "";
  ErrorPopup: boolean =false;
  userSelectDropdownUuid:any= [];
  inputFieldchecked:boolean = false;
  roleCode:string = "";
  lastinputValue:any
  operatorselect:any
  rulecode234:any= [];
  constructor(private PlayerServiceService:PlayerServiceService) {
    this.AccessRuleForm = new FormGroup({
      RuleName: new FormControl(),
      UserType: new FormControl(),
      AccessArea: new FormControl(),
      OnselectRuleslist: new FormControl("UserIp"), 
      operationsToSelected: new FormControl(),
      denialMessagesText:new FormControl(),
      userInputSelectOption:new FormControl(),
      userInputSelectOptionIpAdres:new FormControl('', [Validators.pattern(
        '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
      )])
    });

  }
  
  ngOnInit(): void {
    
    this.UserAccessArea();
    this.accessRuleEditorConfig();
    this.usertype();
    
    this.countrylist();
    this.languageList();
    this.UserAccessStatus();

    // if(this.AccessRuleForm.value.OnselectRuleslist){
    //     this.activeOptionForFirstSelect =this.AccessRuleForm.value.OnselectRuleslist
    //   console.log(this.AccessRuleForm.value.OnselectRuleslist)

    // }
    // this.AccessRuleForm.get("OnselectRuleslist")?.valueChanges.subscribe((activeSelectOptiom) =>{
      
    //   // if(activeSelectOptiom === "User IP Country"){
    //     this.activeOptionForFirstSelect = activeSelectOptiom;
    //     console.log(activeSelectOptiom);

    //   // }
    // });
    if(!this.PlayerAccessData){
      this.changeOnselectRuleslistOptions(this.AccessRuleConditions[0]?.id,"UserIp");
    }

  };
 
  ngAfterViewInit():void {
    document.addEventListener("keyup", this.accesTheKeyboardEvents);
   console.log(this.PlayerAccessData)
   if(this.PlayerAccessData){
   
    this.AccessRuleForm.patchValue({
      RuleName : this.PlayerAccessData.name
    })
  
    console.log(this.usertypesList)
    console.log(this.usertypeList)
    console.log(this.AccessAreaFilteredList)
    console.log(this.PlayerAccessData.userType)
    for(let i=0; i< this.usertypesList.length; i++){ 
    if(this.PlayerAccessData.userType.lowLong == this.usertypesList[i].guid.lowLong){
      this.AccessRuleForm.patchValue({
        UserType: this.usertypesList[i].guid
      })
    }
  }
  console.log("usertype",this.AccessRuleForm.value.UserType)
  this.AccessRuleForm.get('UserType')?.disable()
  for(let i=0; i< this.AccessAreaFilteredList.length; i++){
    if(this.PlayerAccessData.accessArea.lowLong == this.AccessAreaFilteredList[i].guid.lowLong){
      console.log(this.AccessAreaFilteredList[i].guid)
      this.AccessRuleForm.patchValue({
        AccessArea: this.AccessAreaFilteredList[i].guid
      })    
    }
  }
  this.AccessRuleForm.get('AccessArea')?.disable();
  console.log(this.PlayerAccessData.ruleCode)
  this.rulecode234 = this.PlayerAccessData.ruleCode.split("and")
  console.log(this.rulecode234.length)
for(let i = 0; i < this.rulecode234.length; i++){
    //  this.addItems(i)
     this.playerAccessruleEditfn(i)
}
  console.log(this.PlayerAccessData.ruleCode.split("and"))
  
   }
  //  this.usertypename = this.usertypesList[0].

  }

  ngOnDestroy(): void {
    document.removeEventListener("keyup", this.accesTheKeyboardEvents)
    // throw new Error('Method not implemented.');
  }



  countrylist() {
    const countries = localStorage.getItem('countrylist')
    if (countries) {
      this.countrieslist = JSON.parse(countries) || [];
      // this.all.push( this.countrieslist.CID);
    }
    console.log(this.countrieslist);
  }

  languageList(){
    const languageOption:any = localStorage.getItem('Languages');
    this.languageOptionList = JSON.parse(languageOption);

    console.log("Language   :  ", this.languageOptionList)
  };


  UserAccessStatus() {
    const UserAccessStatus = localStorage.getItem('UserAccessStatus')
    if (UserAccessStatus) {
      this.UserAccessStatusList = JSON.parse(UserAccessStatus)
    }
    console.log("UserAccessStatusList", this.UserAccessStatusList)
  }

  accesTheKeyboardEvents = (event: any) => {
    console.log(event)
    if (event.key === "Insert" || event.key === "+") {
      this.addItems();

    }

  }

  
  UserAccessArea() {
    const UserAccessArea = localStorage.getItem('UserAccessArea');
    if (UserAccessArea) {
      this.UserAccessAreaList = JSON.parse(UserAccessArea)
    }
    console.log("UserAccessAreaList", this.UserAccessAreaList)
    for (let i = 5; i < this.UserAccessAreaList.length; i++) {
      this.AccessAreas.push(this.UserAccessAreaList[i]);
    }
    console.log(this.AccessAreas);
  }
  accessRuleEditorConfig() {
    const accessRuleEditorConfig = localStorage.getItem("accessRuleEditorConfig")
    if (accessRuleEditorConfig) {
      this.accessRuleList = JSON.parse(accessRuleEditorConfig)
    }
    console.log("accessRuleList", this.accessRuleList);
  }


  usertype() {
    const usertype = localStorage.getItem('usertype')
    if (usertype) {
      this.usertypeList = JSON.parse(usertype);
    }
    console.log("usertypeList", this.usertypeList)
    for (let i = 0; i < this.usertypeList.length; i++) {
      if (this.usertypeList[i].value == "Player" || this.usertypeList[i].value == "Agent" || this.usertypeList[i].value == "Affiliate") {
        // console.log(this.usertypeList[i])
        this.usertypesList.push(this.usertypeList[i])
      }
    }
    console.log(this.usertypesList)
    this.AccessRuleForm.patchValue({
      UserType: this.usertypesList[0].guid
    })
    this.onSelectedType("ff")
  }

  onSelectedType(type: any) {
    this.AccessRuleConditions = [];
    this.accessRuleEditorConfig();
    console.log(type);
    this.selectedType = this.AccessRuleForm.value.UserType;
    console.log(this.selectedType)
    console.log(this.accessRuleList)
    if (this.selectedType) {
      // this.UserAccessAreaList
      // this.accessRuleList.typeAreas 
      this.selectedRuleList = this.accessRuleList.typeAreas.filter((AreaList: any) => {
        return AreaList.userType.lowLong === this.selectedType.lowLong && AreaList.userType.hiLong === this.selectedType.hiLong
      });
      console.log("selectedRuleList", this.selectedRuleList);



      // let SeletedAccessArea = this.UserAccessAreaList.filter((RuleList: any) => {
      //   return RuleList.guid.lowLong === this.selectedRuleList.accessArea.lowLong && RuleList.guid.hiLong === this.selectedRuleList.accessArea.hiLong
      // });
      // console.log(SeletedAccessArea)
      this.AccessAreaFilteredList = []
      for (let i = 0; i < this.UserAccessAreaList.length; i++) {
        for (let j = 0; j < this.selectedRuleList.length; j++) {
          if (this.UserAccessAreaList[i].guid.lowLong === this.selectedRuleList[j].accessArea.lowLong && this.UserAccessAreaList[i].guid.hiLong === this.selectedRuleList[j].accessArea.hiLong) {
            this.AccessAreaFilteredList.push(this.UserAccessAreaList[i])
          }
        }
      }
      console.log("AccessAreaFilteredList", this.AccessAreaFilteredList)
      this.AccessRuleForm.patchValue({
        AccessArea: this.AccessAreaFilteredList[0].guid
      })
    };

    // let ruleIds =[]
    // for (let k = 0; k < this.AccessAreaFilteredList.length; k++) {
    //   for (let l = 0; l < this.accessRuleList.objects.length; l++) {
    //     for (let m = 0; m < this.accessRuleList.objects[l].operations.length; m++) {
    //       for (let n = 0; n < this.accessRuleList.objects[l].operations[m].onlyAccessAreas.length; n++) {
    //         if (this.accessRuleList.objects[l].operations[m].onlyAccessAreas[n].lowLong === this.AccessAreaFilteredList[k].guid.lowLong && this.accessRuleList.objects[l].operations[m].onlyAccessAreas[n].hiLong === this.AccessAreaFilteredList[k].guid.hiLong) {
    //           ruleIds.push(this.accessRuleList.objects[l].id)
    //         }

    //       }
    //     }
    //   }
    // }
    // console.log("ruleIds",ruleIds)
    this.onSelectedRuleType("ee");
    if(this.childComponent){
      this.childComponent.clearChildComponentsData()
    }
  }

  onSelectedRuleType(type: any) {
    this.AccessRuleConditions = [];
    console.log(type)
    this.selectedAccessArea = this.AccessRuleForm.value.AccessArea;
    console.log(this.selectedAccessArea)
    let ruleIds = []

    // for (let k = 0; k < this.AccessAreaFilteredList.length; k++) {
    for (let l = 0; l < this.accessRuleList.objects.length; l++) {

      let f1 = true;
      let f2 = true;
      for (let m = 0; m < this.accessRuleList.objects[l].operations.length && f1; m++) {
        for (let n = 0; n < this.accessRuleList.objects[l].operations[m].onlyAccessAreas.length && f2; n++) {
          //if (this.accessRuleList.objects[l].operations[m].onlyAccessAreas[n].lowLong === this.selectedAccessArea.lowLong && this.accessRuleList.objects[l].operations[m].onlyAccessAreas[n].hiLong === this.selectedAccessArea.hiLong) {
          if (this.accessRuleList.objects[l].operations[m].onlyAccessAreas[n].lowLong === this.selectedAccessArea.lowLong && this.accessRuleList.objects[l].operations[m].onlyAccessAreas[n].hiLong === this.selectedAccessArea.hiLong) {
            ruleIds.push(this.accessRuleList.objects[l])
            f1 = false;
            f2 = false;
          }

        }
      }
    }
    // }
    console.log("ruleIds", ruleIds)
   
    this.accessRuleConditionList = ruleIds
    // this.OnselectRuleslist = ruleIds[0].title
    this.AccessRuleForm.patchValue({
      OnselectRuleslist: ruleIds[0].id,
      operationsToSelected: ruleIds[0].operations[0].id
    });
    if(this.childComponent){
      this.childComponent.clearChildComponentsData();
    }

  }


  addItems() {
    // this.AccessRulConditions.push({ id: this.accessRuleList.objects, lowStake: { value: 0 }, highStake: { value: 0 }, tournamentChipsRatio: 0 });
    // this.AccessRuleConditions.push({id: this.accessRuleConditionList, value: 'condition', idNo:uuidv4(),children:[]} );

  //  **********************************************************************************
  
  const id = uuidv4();
  // this.accessRuleConditionList.data[0].operations[0].id

  this.AccessRuleConditions.push({ 
    id: id,
    activeHand:"and",
    data: this.accessRuleConditionList,
    value: "", 
    children: [] ,
    conditionList:{
      id: this.accessRuleConditionList[0].id,
      operation:this.accessRuleConditionList[0].operations[0].id,
       inputField:""
      }
  
  });

const newControlName = 'OnselectRuleslist_'+id;
const defaultIdForNewDropdown = this.accessRuleConditionList[0].id; // Define your default ID for new dropdowns
this.AccessRuleForm.addControl(newControlName, new FormControl(defaultIdForNewDropdown));

  console.log('New row added successfully', 'New Row');
  console.log(this.AccessRuleConditions);
  
  this.userSelectDropdownUuid[id] = {user : 'UserIp'};
  
  for (let i = 0; i < this.accessRuleConditionList.length; i++) {

    // if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value.OnselectRuleslist) {
    if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value['OnselectRuleslist_'+id]) {
      console.log(this.accessRuleConditionList[i]);
      this.OperationsList = this.accessRuleConditionList[i].operations
    }
  }

  const newControlName12= 'lastinputvalue_'+id;
const defaultIdForInputValue = "" // Define your default ID for new last input value
this.AccessRuleForm.addControl(newControlName12, new FormControl(defaultIdForInputValue));

  for (let i = 0; i < this.accessRuleConditionList.length; i++) {
    if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value['lastinputvalue_'+ id]) {
      console.log(this.accessRuleConditionList[i]);
      this.AccessRuleForm.value['lastinputvalue_'+ id] = this.accessRuleConditionList[i].inputField
    }
  }
  const newControlNameOparators = 'operationsToSelected12_'+ id;
  const OpratorsForNewDropdown = this.accessRuleConditionList[0].operations[0].id; // Define your default ID for new dropdowns

  this.AccessRuleForm.addControl(newControlNameOparators, new FormControl(OpratorsForNewDropdown));
  
  for (let i = 0; i < this.accessRuleConditionList.length; i++) {
    if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value['operationsToSelected12_'+ id]) {
      console.log(this.accessRuleConditionList[i]);
      this.AccessRuleForm.value['operationsToSelected12_'+ id] = this.accessRuleConditionList[i].operation
    }
  }
  console.log(this.accessRuleConditionList)

  //  **********************************************************************************
  //     const id = uuidv4();
  //   // this.accessRuleConditionList.data[0].operations[0].id

  //   this.AccessRuleConditions.push({ 
  //     id: id,
  //     activeHand:"and",
  //     data: this.accessRuleConditionList,
  //     value: "", 
  //     children: [] ,
  //     conditionList:{
  //       id: this.accessRuleConditionList[0].id,
  //       operation:this.accessRuleConditionList[0].operations[0].id,
  //        inputField:""
  //       }
    
  //   });

  // const newControlName = 'OnselectRuleslist_'+id;
  // const defaultIdForNewDropdown = this.accessRuleConditionList[0].id; // Define your default ID for new dropdowns
  // this.AccessRuleForm.addControl(newControlName, new FormControl(defaultIdForNewDropdown));
  //   console.log('New row added successfully', 'New Row');
  //   console.log(this.AccessRuleConditions);
  //   console.log(this.AccessRuleConditions[i]);

  //   if(this.PlayerAccessData){
  //     if(i !== 101){
  //     console.log(i)
  //    console.log(this.rulecode234[i])
  //    console.log(this.AccessRuleConditions[i].data.length)
 
  //     let rule = this.rulecode234[i].split('.')[0].replace(/\(/g, '')
  //     let operator12 = this.rulecode234[i].split('"')[1] 
  //     console.log(rule)
  //     if(rule == "UserLoginName" || rule == "UserIpCountry"  || rule == "UserIp" ||rule == "UserInfoCountry" ){
  //       // alert(rule)
  //       this.AccessRuleConditions[i].conditionList.id = rule
  //       this.AccessRuleConditions[i].conditionList.inputField = operator12
  //       console.log(this.AccessRuleConditions[i])

  //       this.AccessRuleForm.patchValue({
  //       ['OnselectRuleslist_'+id] : rule
  //     })
       
      
  //     } 
  //     let rule12 = this.rulecode234[i].split(",\")")
  //     console.log(rule12)
  //     console.log(operator12)
  //     console.log(this.rulecode234[i].split(' '))

  //     if(this.rulecode234[i].match("does_not_equal")){
  //       this.AccessRuleConditions[i].conditionList.operation = "does_not_equal"
  //       console.log(this.AccessRuleConditions[i])
  //     }
  //     if(this.rulecode234[i].match("equals")){  
  //       this.AccessRuleConditions[i].conditionList.operation = "equals"
  //       console.log(this.AccessRuleConditions[i])
  //       this.AccessRuleForm.patchValue({
  //         ['operationsToSelected12_'+id] : "equals"
  //       })
  //     }


  //   console.log(this.AccessRuleConditions[i])
  //   // }
  //   console.log(this.AccessRuleConditions); 
  //   this.changeOnselectRuleslistOptions(this.AccessRuleConditions[i]?.id, rule)
   
  //   }
  //   }

  //   // this.userSelectDropdownUuid[id] = {user : 'UserIp'};
    
  //   for (let i = 0; i < this.accessRuleConditionList.length; i++) {
  //     // if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value.OnselectRuleslist) {
  //     if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value['OnselectRuleslist_'+id]) {
  //       console.log(this.accessRuleConditionList[i]);
  //       this.OperationsList = this.accessRuleConditionList[i].operations
  //     }
  //   }
  //   const newControlName12= 'lastinputvalue_'+ id;
  // const defaultIdForInputValue = "" // Define your default ID for new last input value
  // this.AccessRuleForm.addControl(newControlName12, new FormControl(defaultIdForInputValue));
  // for (let k = 0; k < this.accessRuleConditionList.length; k++) {
  //   if (this.accessRuleConditionList[k].id === this.AccessRuleForm.value['lastinputvalue_'+ id]) {
  //     console.log(this.accessRuleConditionList[k]);
  //       this.AccessRuleForm.value['lastinputvalue_'+ id] = this.accessRuleConditionList[k].inputField
  //   }
  // }

  // if(this.PlayerAccessData){ 

  //   if(i == 101){
  //   }else{
  //     // alert("not 101")
  //     let operator12 = this.rulecode234[i].split('"')[1] 
  //     this.AccessRuleForm.value['lastinputvalue_'+ id] = operator12
  //     console.log(operator12)
  //     this.onChangeinputField(id, operator12)
    
  //   }
      
  // }
    
  //   console.log(this.AccessRuleForm.value['lastinputvalue_'+ id])

  //   // console.log(this.accessRuleConditionList[i].inputField)
  //   console.log(id)

  //   const newControlNameOparators = 'operationsToSelected12_' + id;
  //   const OpratorsForNewDropdown = this.accessRuleConditionList[0].operations[0].id; // Define your default ID for new dropdowns
  
  //   this.AccessRuleForm.addControl(newControlNameOparators, new FormControl(OpratorsForNewDropdown));

  //   this.AccessRuleForm.patchValue({
  //     ['operationsToSelected12_'+id] : this.AccessRuleConditions[i].conditionList.operation
  //   })

  //   for (let i = 0; i < this.accessRuleConditionList.length; i++) {
  //     if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value['operationsToSelected12_'+ id]) {
  //       console.log(this.accessRuleConditionList[i]);
  //       this.AccessRuleForm.value['operationsToSelected12_'+ id] = this.accessRuleConditionList[i].operation
  //     }
  //   }

  //   console.log(this.accessRuleConditionList)
  //   console.log(this.AccessRuleConditions)

    
  };

  changeSelectingLogicalOprtation() {
    this.logicalOperationPopUp = true
  }

  removePopUp() {
    this.logicalOperationPopUp = !this.logicalOperationPopUp
  }

  changeOnselectRuleslistOptions(uuid:any,event:any) {

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
console.log(event.target)  
console.log(uuid)
console.log(this.OperationsList)

for (let i = 0; i < this.accessRuleConditionList.length; i++) {
  if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value['OnselectRuleslist_'+uuid]) {
    console.log(this.accessRuleConditionList[i]);
    // this.OperationsList = this.accessRuleConditionList[i].operations
    console.log(this.OperationsList)
  }
}

console.log("selected event",event?.target?.value)
console.log(event?.target?.value.split(":"))
console.log("selected option uuid", uuid   , "value :  ",this.AccessRuleForm.value['OnselectRuleslist_'+uuid]);
this.userSelectDropdownUuid[uuid] = {user : event?.target?.value.split(":")[1].trim()};
console.log(this.userSelectDropdownUuid);

this.AccessRuleConditions.forEach((eachItem:any) =>{

  if(eachItem.id ===uuid){
    eachItem.conditionList.id = event?.target?.value.split(":")[1].trim();

    // if(this.AccessRuleForm.value.OnselectRuleslist === "UserIp"){
      // eachItem.conditionList.inputField = this.AccessRuleForm.value.userInputSelectOption;
      // eachItem.conditionList.inputField = ""
      // this.AccessRuleForm.patchValue({
      //   userInputSelectOption: ""
      // })

   if(this.AccessRuleForm.value['OnselectRuleslist_'+uuid] === "UserIpCountry" ||
    this.AccessRuleForm.value['OnselectRuleslist_'+uuid] === "UserInfoCountry"){
      eachItem.conditionList.inputField = this.countrieslist[0].code

    }
    else if(this.AccessRuleForm.value['OnselectRuleslist_'+uuid] === "UserPersonalInfo_matches_black_list" || 
    this.AccessRuleForm.value['OnselectRuleslist_'+uuid] === "User_is_Trusted"){
      console.log(this.accessRuleConditionList[0].operations[0].id)
      eachItem.conditionList.inputField = false
      
      // this.AccessRuleForm.patchValue({
      //  ['lastinputvalue_'+uuid]: false
      //      })

    }else{
      eachItem.conditionList.inputField = ""
           this.AccessRuleForm.patchValue({
          ['lastinputvalue_'+uuid]: ""
             })
    }
  }
})
console.log(this.AccessRuleForm.value.userInputSelectOption);
console.log(this.AccessRuleConditions);

}

  changeOperationstoSelectedOption(uuid:any,event:any){
    const newControlName = 'operationsToSelected12_'+ uuid;
    const defaultIdForNewDropdown = ""; // Define your default ID for new dropdowns
  
    this.AccessRuleForm.addControl(newControlName, new FormControl(defaultIdForNewDropdown));

    this.AccessRuleConditions.forEach((eachItem:any) =>{
      if(eachItem.id === uuid){ 
        // eachItem.conditionList.operation = this.AccessRuleForm.value.operationsToSelected
        eachItem.conditionList.operation = this.AccessRuleForm.value['operationsToSelected12_'+uuid]
        
      }

    })

    console.log(this.AccessRuleConditions)

  }



  onChangeinputField(uuid:any){
    console.log(this.AccessRuleForm.value['lastinputvalue_'+ uuid])
    console.log(uuid)
    this.AccessRuleConditions.forEach((eachItem:any) =>{
      if(eachItem.id ===uuid){
        // eachItem.conditionList.inputField = this.AccessRuleForm.value.userInputSelectOption;
        eachItem.conditionList.inputField = this.AccessRuleForm.value['lastinputvalue_'+uuid]
        
      }

    })

    console.log(this.AccessRuleForm.value['lastinputvalue_'+uuid]);
    console.log(this.AccessRuleConditions);

  }

  clickOnSelectOperation(select: string) {
    this.logicalOperationPopUp = !this.logicalOperationPopUp;


    if (select === "And" || select === "Or" || select === "Not And" || select === "Not Or") {
      this.selectedLogicalOperation = select;

      let activeHand = null;

      if(select === "And"){
        activeHand = "and" ;
      }else if(select === "Or"){
        activeHand = "or";
      }else if(select === "Not And"){
        activeHand = "and not";
      }else if(select === "Not Or"){
        activeHand = "or not" ;
      }

      this.AccessRuleConditions[0].activeHand = activeHand;

    }


    if (select === "Clear All") {
      this.childComponentsData =[];
      this.AccessRuleConditions = [];
      if(this.childComponent){
        this.childComponent.clearChildComponentsData()
      }

    } else if (select === "Add Condition") {
      this.addItems();
    } else {

    }


    if (select == "Add Group") {

      // this.childComponentsData.push({ id: uuidv4(),margin:2, data: [[...this.accessRuleConditionList]], children: [], value: "" }); data: [{id:uuidv4(),dataList: [...this.accessRuleConditionList]}],
      
      const uuidParent =  uuidv4();
      const uuidValiue = uuidv4();
      this.childComponentsData.push({
        id:uuidParent,
        margin:2, 
        activeHand:"and",
        data: [{
          id:uuidValiue,
          dataList: [...this.accessRuleConditionList],
          conditionList:{
            id: this.accessRuleConditionList[0].id,
            operation:this.accessRuleConditionList[0].operations[0].id,
             inputField:""
            }
        }],
        children: [],
        value: "" ,
        
        });
        if(this.childComponent){
          this.childComponent.addedChildGroupCondition(uuidParent)
        }

  const newControlName = 'OnselectRuleslist_'+uuidValiue;
  const defaultIdForNewDropdown = this.accessRuleConditionList[0].id; // Define your default ID for new dropdowns

  this.AccessRuleForm.addControl(newControlName, new FormControl(defaultIdForNewDropdown));

    for (let i = 0; i < this.accessRuleConditionList.length; i++) {

      // if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value.OnselectRuleslist) {
      if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value['OnselectRuleslist_'+uuidValiue]) {
        console.log(this.accessRuleConditionList[i]);
        this.OperationsList = this.accessRuleConditionList[i].operations
      }


    }


      console.log( "this.AccessRuleConditions   :",    this.AccessRuleConditions);
      console.log("childComponentsData  =====> ", "length ==>", this.childComponentsData.length, "Data ===>", this.childComponentsData);
      // console.log("childComponentsData  =====> ", "length ==>", this.AccessRuleConditions.length, "Data ===>", this.AccessRuleConditions);
    }

  }




  changeSelectingLogicalOprtationChildren() {
    this.logicalOperationPopUpChildren = true
  }


 



  removePopUpChildren() {
    console.log("child Components for Parent");
    this.logicalOperationPopUpChildren = !this.logicalOperationPopUpChildren
  };



// Not used in this component
  clickOnSelectOperationChildElement(select:string,index:number){
    this.logicalOperationPopUpChildren = !this.logicalOperationPopUpChildren;

    if (select === "And" || select === "Or" || select === "Not And" || select === "Not Or") {
      this.selectedLogicalOperationChildren = select;
    }

    if (select == "Add Group") {
      // this.childComponentsData.push({ id: uuidv4(), data: [...this.accessRuleConditionList], children: [], value: "" });
      this.childComponentsData[index].children.push({id: uuidv4(), data: [...this.accessRuleConditionList], children: [], value: ""})

      console.log("childComponentsData  =====> ", "length ==>", this.childComponentsData.length, "Data ===>", this.childComponentsData);
    }

    if(select == "Remove Group"){
      this.childComponentsData.splice(index,1);

    }

  }

  // Not used in this component



  deleteRow(i: any) {
    this.AccessRuleConditions.splice(i, 1);
  };

  SuccessPop() {
    this.CreateSuccessPop = false;
    window.location.reload();
  }
  TechnicalError() {
   
    this.ErrorPopup = false;
    // window.location.reload();
  }



  getDirtyValues(form: any) {
    let dirtyValues: any = {};
    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
        }
      });

    return dirtyValues;
  };


  getRoleCodeList = (childComponentsData:any[]) => {
  console.log(childComponentsData)
    childComponentsData.forEach((eachItem:any) =>{

    if(eachItem.data){
      eachItem.data.forEach((indivisualElement:any) => {
        // if(indivisualElement.conditionList.inputField == "" || indivisualElement.conditionList.inputField == null){
        if(indivisualElement.conditionList.inputField == "" && (indivisualElement.conditionList.inputField !== false && indivisualElement.conditionList.inputField !== true)){
          this.inputFieldchecked = true;
          this.errorMessageText = `Incorrect value '?' for '${indivisualElement.conditionList.id}' field\n`
        }else{

          
          this.inputFieldchecked = false;
          if(eachItem){
            // "not (UserInfoCity.equals("244") default false and"
            // roleCode += eachItem[0].activeHand + ` ` +`(`+ eachItem.conditionList.id+`.`+
            // eachItem.conditionList.operation+`(` + eachItem.conditionList.inputField+`)`+
            // `default false` +`)` ;
            childComponentsData.forEach((eachItemEl:any) =>{
              this.roleCode += eachItemEl.activeHand + ` ` +`(`

              eachItemEl.data.forEach((eachItemchildEl:any,i: number) => {
                if(i < this.AccessRuleConditions.length-1){
                  this.roleCode += eachItemchildEl.conditionList.id+`.`+
                  eachItemchildEl.conditionList.operation+`("` + eachItemchildEl.conditionList.inputField+`")`+
                ` default false and `
    
                }else{
                  this.roleCode += eachItemchildEl.conditionList.id+`.`+
                  eachItemchildEl.conditionList.operation+`("` + eachItemchildEl.conditionList.inputField+`")`+
                  ` default false`
                }
                
              })
    
              this.roleCode += `)`;

            })
            }
        }
      })
    }

    if(eachItem.children.length >=1){
      this.getRoleCodeList(eachItem.children);

    }

  }
  
  
  
  )
}

  




  onFormSubmit() {
    this.roleCode = ""
    console.log(this.AccessRuleForm.value.AccessArea);

    let filterbody = this.getDirtyValues(this.AccessRuleForm);

    console.log(this.AccessRuleForm.value.RuleName)
    console.log(this.AccessRuleConditions)
    console.log(this.childComponentsData)

    this.AccessRuleConditions.forEach((eachItem:any,i:number) => {
      // for(let eachItem of this.AccessRuleConditions){
      this.errorMessageText = "";
      // if(eachItem.conditionList.inputField == true || eachItem.conditionList.inputField == false){
      //   this.inputFieldchecked = false;
      // }else
      
      if(eachItem.conditionList.inputField == "" || eachItem.conditionList.inputField == null){
      // if(eachItem.conditionList.inputField === "" || (eachItem.conditionList.inputField !== false && eachItem.conditionList.inputField !== true)){
        this.inputFieldchecked = true;
        this.errorMessageText = `Incorrect value '?' for '${eachItem.conditionList.id}' field\n`
          // break ;

      }else{ 
        this.inputFieldchecked = false;
        console.log(eachItem);
        if(eachItem){
          // "not (UserInfoCity.equals("244") default false and"
          // roleCode += eachItem[0].activeHand + ` ` +`(`+ eachItem.conditionList.id+`.`+
          // eachItem.conditionList.operation+`(` + eachItem.conditionList.inputField+`)`+
          // `default false` +`)` ;
          
          // this.roleCode += this.AccessRuleConditions[0].activeHand + ` ` +`(`
          console.log(eachItem.activeHand)
          this.roleCode += `(`
          // this.AccessRuleConditions.forEach((eachItem:any,i: number) => {
            if(i < this.AccessRuleConditions.length-1){
              this.roleCode += eachItem.conditionList.id+`.`+ eachItem.conditionList.operation+`("` + eachItem.conditionList.inputField+`")`+
            ` default false` +  `)` + eachItem.activeHand ; 

            }else{
              this.roleCode += eachItem.conditionList.id+`.`+
              eachItem.conditionList.operation+`("` + eachItem.conditionList.inputField+`")`+
              ` default false` + ")"
            }
            
          // })

          // this.roleCode += `)`;


        }
        
      }
    // }

    });

   

  this.getRoleCodeList(this.childComponentsData)


console.log(this.AccessRuleForm.value.RuleName);
    if(this.AccessRuleForm.value.RuleName === "" || this.AccessRuleForm.value.RuleName === null){
    // if(this.AccessRuleForm.value.RuleName === ""){
      this.ErrorPopup = true;
      this.errorMessageText = `Please enter rule name.\n`
    }else if(this.inputFieldchecked){
      this.ErrorPopup = true;
      // this.errorMessageText = `Please enter rule name.\n`

    }
    
    else{

      this.inputFieldchecked = false;
      this.ErrorPopup = false

    filterbody['name'] = this.AccessRuleForm.value.RuleName !== null ? this.AccessRuleForm.value.RuleName:undefined;
    // filterbody['userType'] = this.AccessRuleForm.value.userType !== null ? this.AccessRuleForm.value.userType :undefined;
    filterbody['userType'] = this.AccessRuleForm.value.userType !== null ? this.selectedType :undefined;
    filterbody['accessArea'] = this.AccessRuleForm.value.AccessArea !== null ? this.AccessRuleForm.value.AccessArea:undefined;
    
    filterbody['status'] = this.UserAccessStatusList[0].value === "Inactive" ? this.UserAccessStatusList[0].guid :  this.UserAccessStatusList[1].guid;

    filterbody['ruleCode'] = this.roleCode;
    filterbody['denialMessages'] = [{
      "language": this.languageOptionList[0].guid,
      // "text": this.AccessRuleForm.value.denialMessagesText !== null ? this.AccessRuleForm.value.denialMessagesText: undefined,
      "text":  this.AccessRuleForm.value.denialMessagesText,
    }]; 
    
    filterbody['objState'] = this.languageOptionList[0].objState

     if(this.PlayerAccessData){
      filterbody['guid'] = this.PlayerAccessData.guid;
     }
    console.log(filterbody)
    console.log(this.UserAccessStatusList)
    setTimeout(()=>{

    },5000)
    this.PlayerServiceService.setUserAccessRule(filterbody).subscribe(
      (data) => {
        console.log(data)
        if (data.changedObjectList) {
          this.CreateSuccessPop = true;
          this.FilltererrorMessageText =  "Successfully Created"
           
        }
      },

      (error) => {
        this.CreateSuccessPop = true;;
    this.FilltererrorMessageText =  "Technical Error..."  
        console.log(error)
      
      }
    )

  let aa =  {
      "name": "TEST12222",
      "userType": {
       "hiLong": 0,
       "lowLong": 3
       },
      "accessArea":{
       "hiLong": 0,
       "lowLong": 4
       },
      "status": {
       "hiLong": 0,
       "lowLong": 0,
       },
      "ruleCode": "UserInfoCity.equals(AB) default false and UserInfoCity.equals(CD) default false and not (UserIp.equals(127.0.0.1) default false or UserLoginName.equals(ASFSD) default false or UserInfoCity.equals(ASDFSD) default false)",
      "denialMessages":null ,
      "guid": null
      }


    // this.PlayerServiceService.setUserAccessRule(aa).subscribe(
    //   (data) =>{console.log(data)})



    }

    


    let body = {
      "name": "Default Tournament UAC ",
      "userType": {
        "hiLong": 0,
        "lowLong": 0
      },
      "accessArea": {
        "hiLong": 0,
        "lowLong": 0
      },


      "status": {
        "hiLong": 0,
        "lowLong": 1
      },



      "ruleCode": "UserIp.does_not_equal(\"127.0.0.2\") default false",
      "denialMessages": [
        {
          "language": {
            "hiLong": 0,
            "lowLong": 17742
          },
          "text": "Access Denied."
        }
      ],


      "guid": {
        "hiLong": 1,
        "lowLong": 1980
      },

      
      "objState": 0


    }

  }

  playerAccessruleEditfn(i:any){
    // alert(i)
    this.OperationsList = this.accessRuleConditionList[i].operations
    const id = uuidv4();
    console.log(id)
    this.AccessRuleConditions.push({ 
      id: id,
      activeHand:"and",
      data: this.accessRuleConditionList,
      value: "", 
      children: [] ,
      conditionList:{
        id: this.accessRuleConditionList[0].id,
        operation:this.accessRuleConditionList[0].operations[0].id,
         inputField:""
        }
    
    });
  const newControlName = 'OnselectRuleslist_'+id;
  const defaultIdForNewDropdown = this.accessRuleConditionList[1].id; // Define your default ID for new dropdowns
  this.AccessRuleForm.addControl(newControlName, new FormControl(defaultIdForNewDropdown));

  const newControlNameOparators = 'operationsToSelected12_' + id;
  const OpratorsForNewDropdown = this.accessRuleConditionList[0].operations[0].id; // Define your default ID for new dropdowns
  this.AccessRuleForm.addControl(newControlNameOparators, new FormControl(OpratorsForNewDropdown));

  const newControlName12= 'lastinputvalue_'+ id;
  const defaultIdForInputValue = "" // Define your default ID for new last input value
  this.AccessRuleForm.addControl(newControlName12, new FormControl(defaultIdForInputValue));


    console.log('New row added successfully', 'New Row');
    console.log(this.AccessRuleConditions);
    console.log(this.AccessRuleConditions[i]);
      console.log(i)
     console.log(this.rulecode234[i])
 
      let rule = this.rulecode234[i].split('.')[0].replace(/\(/g, '')
      let operator12 = this.rulecode234[i].split('"')[1] 
      console.log(rule)   // first input
      console.log(operator12)  // last input
      

      this.AccessRuleForm.patchValue({
        ['OnselectRuleslist_'+id] : rule
      })
      this.AccessRuleForm.patchValue({
        ['lastinputvalue_'+id]:  operator12
      })
     
      this.AccessRuleConditions[i].conditionList.id = rule
      this.userSelectDropdownUuid[id] = {user : rule};
      if(rule == "UserLoginName"|| rule == "UserIp" ||rule == "UserInfoCity"  ||rule == "UserIpCity" ){
      // if(rule == "UserLoginName" || rule == "UserIpCountry"  || rule == "UserIp" ||rule == "UserInfoCountry" ){
       
        this.AccessRuleConditions[i].conditionList.inputField = operator12
        // console.log(this.AccessRuleConditions[i])
      }else if(rule === "UserPersonalInfo_matches_black_list" ||  rule === "User_is_Trusted"){
          this.AccessRuleConditions[i].conditionList.inputField = false
          console.log(this.AccessRuleConditions[i].conditionList.inputField)
      }else if(rule == "UserInfoCountry" || rule == "UserIpCountry"){
        this.AccessRuleConditions[i].conditionList.id = rule
        this.AccessRuleConditions[i].conditionList.inputField = operator12
      }

// ========================Equal===========================================================
      if(this.rulecode234[i].match("does_not_equal")){
        this.AccessRuleConditions[i].conditionList.operation = "does_not_equal"
        console.log(this.AccessRuleConditions[i])
        this.AccessRuleForm.patchValue({
          ['operationsToSelected12_'+id] : "does_not_equal"
        })
      }
      if(this.rulecode234[i].match("equals")){  
        this.AccessRuleConditions[i].conditionList.operation = "equals"
        console.log(this.AccessRuleConditions[i])
        this.AccessRuleForm.patchValue({
          ['operationsToSelected12_'+id] : "equals"
        })
      }

      this.AccessRuleForm.patchValue({
        ['operationsToSelected12_'+id] : this.AccessRuleConditions[i].conditionList.operation
      })
  
      for (let i = 0; i < this.accessRuleConditionList.length; i++) {
        if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value['operationsToSelected12_'+ id]) {
          console.log(this.accessRuleConditionList[i]);
          this.AccessRuleForm.value['operationsToSelected12_'+ id] = this.accessRuleConditionList[i].operation
        }
      }

    console.log(this.AccessRuleConditions[i])
    // }
    console.log(this.AccessRuleConditions); 
// ========================Equal End===========================================================
    // for (let j = 0; j < this.accessRuleConditionList.length; j++) {
  //     if (this.accessRuleConditionList[j].id === this.AccessRuleForm.value['OnselectRuleslist_'+id]) {
  //       console.log(this.accessRuleConditionList[j]);
  //       this.OperationsList = this.accessRuleConditionList[j].operations
  //       this.AccessRuleForm.value['OnselectRuleslist_'+id] =  this.AccessRuleConditions[j].conditionList.id
  //     }
  //   }
   
  // for (let k = 0; k < this.accessRuleConditionList.length; k++) {
  //   console.log(this.accessRuleConditionList[k]);
  //   console.log(this.AccessRuleForm.value['lastinputvalue_'+ id]);

  //   if (this.accessRuleConditionList[k].id === this.AccessRuleForm.value['lastinputvalue_'+ id]) {
  //     console.log(this.accessRuleConditionList[k]);
  //       this.AccessRuleForm.value['lastinputvalue_'+ id] = this.AccessRuleConditions[i].conditionList.inputField 
  //   }
  // }

 
  // this.onChangeinputField(id, operator12)
    console.log(this.accessRuleConditionList)
    console.log(this.AccessRuleConditions)


// ===================================================================================

  }

}
