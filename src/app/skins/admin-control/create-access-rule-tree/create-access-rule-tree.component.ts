import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { v4 as uuidv4 } from "uuid"

import { FormGroup, FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-create-access-rule-tree',
  templateUrl: './create-access-rule-tree.component.html',
  styleUrls: ['./create-access-rule-tree.component.css']
})
export class CreateAccessRuleTreeComponent implements OnInit {
  // export class CreateAccessRuleTreeComponent{

  @Input() childComponentsData: any = [];
  @Input() accessRuleConditionList: any = [];
  @Output() eventEmitData = new EventEmitter()


  AccessRuleForm: FormGroup;

  OperationsList: any = []
  logicalOperationPopUpChildren: boolean = false;
  Ruletitle: any = [];
  selectedLogicalOperationChildren: any = "And"
  logicalOperationPopUp: boolean = false;
  activateduuid: any = null;
  countrieslist: any = [];
  activeOptionForFirstSelect: any;
  userSelectDropdownUuid: any = [];
  timerId: any = null;

  constructor() {

    this.AccessRuleForm = new FormGroup({
      OnselectRuleslist: new FormControl('UserIp'),
      operationsToSelected: new FormControl(),
      userInputSelectOption: new FormControl()
    });
  }




  ngOnInit(): void {
    this.countrylist();
    console.log(this.accessRuleConditionList);

    if (this.accessRuleConditionList.length > 0) {
      this.AccessRuleForm.patchValue({
        OnselectRuleslist: this.accessRuleConditionList[0].id,
        operationsToSelected: this.accessRuleConditionList[0].operations[0].id
      })
      // this.changeOnselectRuleslistOptions("kk", "UserIp");
    }

    console.log(this.childComponentsData);
    this.childComponentsData.forEach((eachCondition: any) => {
      const newControlName = 'OnselectRuleslist_' + eachCondition.data[0].id;
      const defaultIdForNewDropdown = this.accessRuleConditionList[0].id; // Define your default ID for new dropdowns
      this.AccessRuleForm.addControl(newControlName, new FormControl(defaultIdForNewDropdown));
      this.changeOnselectRuleslistOptions(eachCondition.data[0].id);

    })





    if (this.AccessRuleForm.value.OnselectRuleslist) {

      // if(this.AccessRuleForm.value.OnselectRuleslist === "User IP Country"){
      this.activeOptionForFirstSelect = this.AccessRuleForm.value.OnselectRuleslist
      // }

      console.log(this.AccessRuleForm.value.OnselectRuleslist)

    }



    this.AccessRuleForm.get("OnselectRuleslist")?.valueChanges.subscribe((activeSelectOptiom) => {

      // if(activeSelectOptiom === "User IP Country"){
      this.activeOptionForFirstSelect = activeSelectOptiom;
      console.log(activeSelectOptiom);

      // }
    })
  };


  addedChildGroupCondition(uuid: any) {
    console.log(this.childComponentsData);
    this.childComponentsData.forEach((eachCondition: any) => {
      if (eachCondition.id === uuid) {

        const newControlName = 'OnselectRuleslist_' + eachCondition.data[0].id;
        const defaultIdForNewDropdown = this.accessRuleConditionList[0].id; // Define your default ID for new dropdowns
        this.AccessRuleForm.addControl(newControlName, new FormControl(defaultIdForNewDropdown));
        this.changeOnselectRuleslistOptions(eachCondition.data[0].id);

      }


    })

    // const newControlName = 'OnselectRuleslist_'+this.childComponentsData[value].data[0].id;
    // const defaultIdForNewDropdown = this.accessRuleConditionList[0].id; // Define your default ID for new dropdowns
    //  this.AccessRuleForm.addControl(newControlName, new FormControl(defaultIdForNewDropdown));
    //  this.changeOnselectRuleslistOptions(this.childComponentsData[value].data[0].id);




  }





  countrylist() {
    const countries = localStorage.getItem('countrylist')
    if (countries) {
      this.countrieslist = JSON.parse(countries) || [];
      // this.all.push( this.countrieslist.CID);
    }
    console.log(this.countrieslist)
  }










  deleteRow(uuid: any, index: number) {
    console.log("delete Function is called", "uuid  :", uuid, "index  :", index);
    this.childComponentsData.map((eachItem: any) => {
      if (eachItem.id === uuid) {
        console.log("delete uuid is satisfied")
        eachItem.data.splice(index, 1)
      } else {
        if (eachItem.children.length > 0) {
          this.deleteRow(eachItem.children.id, index)
        }
        // return eachItem

      }

    })

  }

  changeSelectingLogicalOprtation() {
    this.logicalOperationPopUp = true
  }

  removePopUp() {
    this.logicalOperationPopUp = !this.logicalOperationPopUp
  }



  changeOnselectRuleslistOptions(uuid: any, event: any = null) {

    console.log(uuid);
    console.log(this.AccessRuleForm.value['OnselectRuleslist_' + uuid]);
    for (let i = 0; i < this.accessRuleConditionList.length; i++) {
      // if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value.OnselectRuleslist) {
      if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value['OnselectRuleslist_' + uuid]) {
        console.log(this.accessRuleConditionList[i]);
        this.OperationsList = this.accessRuleConditionList[i].operations;



      }



      if (this.childComponentsData) {

        this.childComponentsData.forEach((eachItem: any) => {

          eachItem.data.forEach((each: any) => {

            if (each.id === uuid) {
              // console.log("uuid matched", this.activeOptionForFirstSelect)
              // if(this.AccessRuleForm.value.OnselectRuleslist == "UserIp"){
              // eachItem.conditionList.inputField = this.AccessRuleForm.value.userInputSelectOption;
              // each.conditionList.inputField = ""
              // }else

              if
                (this.AccessRuleForm.value['OnselectRuleslist_' + uuid] == "UserIpCountry" ||
                this.AccessRuleForm.value['OnselectRuleslist_' + uuid] == "UserInfoCountry")
              // (this.AccessRuleForm.value.OnselectRuleslist == "UserIpCountry" ||
              // this.activeOptionForFirstSelect == "UserInfoCountry")
              {
                each.conditionList.inputField = this.countrieslist[0].code


              }
              else if
                (this.AccessRuleForm.value['OnselectRuleslist_' + uuid] == "UserPersonalInfo_matches_black_list" ||
                this.AccessRuleForm.value['OnselectRuleslist_' + uuid] == "User_is_Trusted")
              // (this.AccessRuleForm.value.OnselectRuleslist == "UserPersonalInfo_matches_black_list" || 
              // this.activeOptionForFirstSelect == "User_is_Trusted")
              {
                each.conditionList.inputField = false;

              } else {
                each.conditionList.inputField = ""
              }

              each.conditionList.id = event?.target?.value.split(":")[1].trim();
            }



          })



        })
      }

      // console.log(this.childComponentsData,uuid);


    }

    // this.userSelectDropdownUuid[uuid] = event?.target?.value.split(":")[1].trim();
    this.userSelectDropdownUuid[uuid] = { user: event?.target?.value.split(":")[1].trim() };
    // this.userSelectDropdownUuid.push({uuid:{user : event?.target?.value.split(":")[1].trim()}});
    console.log(this.userSelectDropdownUuid);



  }

  changeOperationstoSelectedOption(uuid: any, event: any) {
    this.childComponentsData.forEach((eachElement: any) => {
      if (eachElement) {
        eachElement.data.forEach((eahItem: any) => {
          if (eahItem.id == uuid) {
            eahItem.conditionList.operation = this.AccessRuleForm.value.operationsToSelected
          }

        })

      }
    })



    console.log(this.childComponentsData, uuid)

  }


  onChangeinputField(uuid: any) {

    this.childComponentsData.forEach((eachElement: any) => {
      if (eachElement) {
        eachElement.data.forEach((eahItem: any) => {
          if (eahItem.id == uuid) {
            eahItem.conditionList.inputField = this.AccessRuleForm.value.userInputSelectOption
          }

        })

      }
    })


    console.log(this.AccessRuleForm.value.userInputSelectOption);
    console.log(this.childComponentsData);

  }


  changeSelectingLogicalOprtationChildren(uuid: any) {
    this.logicalOperationPopUpChildren = !this.logicalOperationPopUpChildren;

    this.activateduuid = uuid
  }



  addItemsChildrens(uuids: any) {
    console.log(uuids);
    console.log(this.childComponentsData);
    this.childComponentsData.map((eachItem: any) => {
      console.log("clicked uuid   : ", uuids, "iterations uuids :  ", eachItem.id, eachItem.id == uuids)

    })
    this.childComponentsData.forEach((eachItem: any) => {


      const uuid = uuidv4();
      if (eachItem.id === uuids) {

        this.userSelectDropdownUuid[uuid] = { user: 'UserIp' };
        // this.userSelectDropdownUuid.push({uuid:{user : 'User IP'}});
        console.log(this.userSelectDropdownUuid, "     : ------>  ", uuid);

        const newControlName = 'OnselectRuleslist_' + uuid;
        const defaultIdForNewDropdown = this.accessRuleConditionList[0].id; // Define your default ID for new dropdowns
        this.AccessRuleForm.addControl(newControlName, new FormControl(defaultIdForNewDropdown));


        return eachItem.data.push({
          id: uuid,
          dataList: this.accessRuleConditionList,
          conditionList: {
            id: this.accessRuleConditionList[0].id,
            operation: this.accessRuleConditionList[0].operations[0].id,
            inputField: ""
          }
        })


      } else {
        if (eachItem.children && eachItem.children.length >= 1) {
          console.log("error")
          for (let eachChild of eachItem.children) {
            // this.addItemsChildrens(eachChild.id)
          }

        }

        // return eachItem;

      }
      for (let i = 0; i < this.accessRuleConditionList.length; i++) {

        // if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value.OnselectRuleslist) {
        if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value['OnselectRuleslist_' + uuid]) {
          console.log(this.accessRuleConditionList[i]);
          this.OperationsList = this.accessRuleConditionList[i].operations
        }


      }


    });
    console.log(this.childComponentsData)

  }


  removePopUpChildren() {
    this.activateduuid = null;
    console.log("child Components for Parent");
    this.logicalOperationPopUpChildren = !this.logicalOperationPopUpChildren
  };



  clickOnSelectOperationChildElement(select: string, index: number, uuid: any) {
    this.activateduuid = null
    this.logicalOperationPopUpChildren = !this.logicalOperationPopUpChildren;

    if (select === "And" || select === "Or" || select === "Not And" || select === "Not Or") {
      this.selectedLogicalOperationChildren = select;

      console.log(this.childComponentsData, uuid);
      let activeHand = null;

      if (select === "And") {
        activeHand = "and";
      } else if (select === "Or") {
        activeHand = "or";
      } else if (select === "Not And") {
        activeHand = "and not";
      } else if (select === "Not Or") {
        activeHand = "or not";
      }

      if (this.childComponentsData[0].id == uuid) {
        this.childComponentsData[0].activeHand = activeHand;
      }

    }


    if (select == "Add Condition") {
      this.addItemsChildrens(uuid);
    }

    if (select == "Add Group") {

      console.log(uuid);

      // this.childComponentsData.find((eachItem:any,i:any) =>{
      //   console.log(eachItem.id)
      //   if(eachItem.id === uuid){
      //     console.log("ADD GROUP(added)")
      //     eachItem.children.push({id: uuidv4(),margin:4, data: [[...this.accessRuleConditionList]], children: [], value: ""});
      //     return;
      //   }else{
      //     if(eachItem.children.length > 0){
      //     this.clickOnSelectOperationChildElement("Add Group",i, eachItem.children.id);
      //     }
      //   }


      // })
      const addGroupRecursively = (items: any, targetId: any) => {

        // this.AccessRuleConditions.push({ id: id, data: this.accessRuleConditionList, value: "",
        //  children: [] ,
        //  conditionList:{
        //   id: this.accessRuleConditionList[0].id,
        //    operation:this.accessRuleConditionList[0].operations[0].id,
        //     inputField:""}});


        for (let i = 0; i < items.length; i++) {
          if (items[i].id === targetId) {
            const indivisualUuid = uuidv4();
            console.log(indivisualUuid);
            console.log(`Adding a new group under item with id ${targetId}`);

            const newControlName = 'OnselectRuleslist_' + indivisualUuid;
            const defaultIdForNewDropdown = this.accessRuleConditionList[0].id; // Define your default ID for new dropdowns

            //   if (!this.AccessRuleForm.get(newControlName)) {
            //     this.AccessRuleForm.addControl(newControlName, new FormControl(defaultIdForNewDropdown));
            // }


            this.AccessRuleForm.addControl(newControlName, new FormControl(defaultIdForNewDropdown));

            for (let i = 0; i < this.accessRuleConditionList.length; i++) {
              // if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value.OnselectRuleslist) {
              if (this.accessRuleConditionList[i].id === this.AccessRuleForm.value['OnselectRuleslist_' + indivisualUuid]) {
              
                console.log(this.accessRuleConditionList[i]);
                this.OperationsList = this.accessRuleConditionList[i].operations;
              }
            }
            console.log( "newControlName   :  ",newControlName , "AccessRuleForm :  ", this.AccessRuleForm.controls)
            if (this.AccessRuleForm.get(newControlName) && this.AccessRuleForm.get(newControlName)) {
              return items[i].children.push({
                id: uuidv4(),
                margin: 4,
                activeHand: "and",
                // data: [[...this.accessRuleConditionList]],
                data: [{
                  id: indivisualUuid,
                  dataList: [...this.accessRuleConditionList],
                  conditionList: {
                    id: this.accessRuleConditionList[0].id,
                    operation: this.accessRuleConditionList[0].operations[0].id,
                    inputField: ""
                  }
                }],
                value: "",
                children: [],

              });

            }

          } else if (items[i].children && items[i].children.length > 0) {
            // If there are children, recursively search for the target
            const result: any = addGroupRecursively(items[i].children, targetId);

            if (result) {
              return true
            }

          };
        }
      };

      // Call the recursive function
      addGroupRecursively(this.childComponentsData, uuid);

    }

    if (select == "Remove Group") {
      // this.childComponentsData.splice(index,1);

      this.childComponentsData = this.childComponentsData.filter((eachItem: any, i: any) => {
        if (eachItem.id !== uuid) {
          return eachItem
        } else {
          if (eachItem.children.length > 0) {
            this.clickOnSelectOperationChildElement("Remove Group", i, eachItem.children.id);
          }
        }


      })
      console.log(this.childComponentsData);

      this.eventEmitData.emit(this.childComponentsData)
    }
  }


  clearChildComponentsData() {
    this.childComponentsData = []
  }






}


