import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/source/login.service';
import { CommonDataService } from 'src/app/source/commondata.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import * as XLSX from 'xlsx'
import { FormControl, FormGroup } from '@angular/forms';

import { AdminPermissionsComponent } from '../admin-permissions/admin-permissions.component';

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.css']
})
export class AdminControlComponent implements OnInit {

@ViewChild (AdminPermissionsComponent) adminPermissions!: AdminPermissionsComponent;
  
  adminList: any;
  adminListpopup: boolean = false;
  EditAdminPermissionsPop: boolean = false;
  EditAdminPermissionsPop01: boolean = false;
  loader: boolean = false;
  adminDetailList: any;
  faceParameterslist: any;
  updatedCont: any;
  forAdmin: FormGroup
  filterForm: FormGroup
  SeletedIconIndex: any;
  popupArrow: boolean = false;
  EditAdminPermissionsList: any = []
  getAdminPermissionsList: any;
  EditAdminPermissionsListCheckbox: any = [];
  checkedList: any = [];
  permissionsPayload: any;
  mainarray: any = [];
  SpinnwerT: boolean = false;
  dropdownSettings = {};
  faceNames: any = [];
  selectedFaceItems: any = [];
  faceconvertedarray: any = [];

  constructor(private loginService: LoginService, private commonDataService: CommonDataService, private FileformatServiceService: FileformatServiceService) {
    this.forAdmin = new FormGroup({
      Adminreg: new FormControl("")
    });
    this.filterForm = new FormGroup({
      Paswword: new FormControl(),
      FirstName: new FormControl(),
      LastName: new FormControl(),
      email: new FormControl(),
      networkNames: new FormControl()
    });
  }

  ngOnInit(): void {


    this.commonDataService.openPopup('raju');
    this.commonDataService.popupCont.subscribe((data: any) => {
      this.updatedCont = data;
      console.log(this.updatedCont)
    })

    this.faceParameters()
    let ws = sessionStorage.getItem('wsession')
    this.getAdmins()

    //  this.loginService.getAdmins(ws).subscribe((res)=>{


    this.mainarray = [
      { name: "Administrator Login", id: "ADMIN_LOGIN_ENABLE", status: false, display: false, children: [] },
      {
        name: "Administrator Control", status: false, display: false,
        children: [
          { name: "Manage Administrator ", id: "ADMIN_MANAGE", status: false, display: false },
          { name: "view Administrator", id: "ADMIN_VIEW", status: false, display: false }
        ]
      },
      {
        name: "Player Control", status: false, display: false,
        children: [
          { name: "Show Players Passwords", id: "PLAYER_PASSWORD_SHOW", status: false, display: false },
          { name: "view Players Personal Data", id: "PLAYER_PERSONAL_VIEW", status: false, display: false },
          { name: "view Players Info(Individual)", id: "PLAYER_VIEW", status: false, display: false },
          { name: "view Players Info(Global)", id: "PLAYER_VIEW_GLOBAL", status: false, display: false },
          { name: "Manage Players", id: "PLAYER_MANAGE", status: false, display: false },
          { name: "view Players Finances(Individual)", id: "PLAYER_FINANCE_VIEW", status: false, display: false },
          { name: "view Players Finances(Global)", id: "PLAYER_FINANCE_VIEW_GLOBAL", status: false, display: false },
          { name: "Manage Players Finances", id: "PLAYER_FINANCE_CONTROL", status: false, display: false },
          { name: "Manage Players Payments", id: "PLAYER_PAYMENTS_CONTROL", status: false, display: false },
        ]
      },
      {
        name: "Fraud Control", status: false, display: false,
        children: [
          { name: "View Fraud Data", id: "SETTINGS_FRAUDCONTROL_VIEW", status: false, display: false },
          { name: "Manage Fraud ", id: "SETTINGS_FRAUDCONTROL_CHANGE", status: false, display: false },
        ]
      },
      {
        name: "Games", status: false, display: false,
        children: [
          { name: "View Games Info(Individual)", id: "GAMES_INFO_VIEW", status: false, display: false },
          { name: "View Games Info(Global)", id: "GAMES_INFO_VIEW_GLOBAL", status: false, display: false },
          { name: "View Games Settings", id: "GAMES_SETTINGS_VIEW", status: false, display: false },
          { name: "Manage Games", id: "GAMES_CONTROL", status: false, display: false },
          { name: "Register Players in Tournament", id: "REGISTER_PLAYERS_IN_TOURNAMENTS", status: false, display: false },
        ]
      },
      {
        name: "Accounting", status: false, display: false,
        children: [
          { name: "View Accounting Data", id: "ACCOUNTING", status: false, display: false },
        ]
      },
      {
        name: "Payment Settings", status: false, display: false,
        children: [
          { name: "View Promotional Codes", id: "CASHIER_BONUSCODES_VIEW", status: false, display: false },
          { name: "Manage Promotional Codes", id: "CASHIER_BONUSCODES_MANAGE", status: false, display: false },
          { name: "Bonus limits", id: "CASHIER_BONUSRATES_VIEW", status: false, display: false },
          { name: "Bonus limits manage", id: "CASHIER_BONUSRATES_CHANGE", status: false, display: false },
          { name: "Currencies manage", id: "CASHIER_CURRENCIES_MANAGE", status: false, display: false },
          { name: "Merchant", id: "SETTINGS_MERCHANT_VIEW", status: false, display: false },
          { name: "Merchant edit", id: "SETTINGS_MERCHANT_CHANGE", status: false, display: false },
          { name: "Referring", id: "", status: false, display: false },
          { name: "Referring edit", id: "", status: false, display: false },
          { name: "Transaction", id: "CASHIER_TRANSACTION_VIEW", status: false, display: false },
          { name: "Transaction manage", id: "CASHIER_TRANSACTION_MANAGE", status: false, display: false },
        ]
      },
      {
        name: "Comp Points", status: false, display: false,
        children: [
          { name: "View Comp Points Setttings", id: "COMP_POINTS_SETTINGS_VIEW", status: false, display: false },
          { name: "Manage Comp Points Setttings", id: "COMP_POINTS_SETTINGS_MANAGE", status: false, display: false },
          { name: "View Comp Points Info(Individual)", id: "COMP_POINTS_INFO_VIEW", status: false, display: false },
          { name: "Manage Comp Info(Global) ", id: "COMP_POINTS_INFO_VIEW_GLOBAL", status: false, display: false },
          { name: "Manage Comp Points", id: "COMP_POINTS_MANAGE", status: false, display: false },
        ]
      },
      {
        name: "Affiliates Control", status: false, display: false,
        children: [
          { name: "View Affiliates/Agents Info", id: "AFFILIATES_VIEW", status: false, display: false },
          { name: "Manage Affiliates/Agents", id: "AFFILIATES_CONTROL", status: false, display: false },
          { name: "Manage Affiliates/Agents Campaigns", id: "AFFILIATES_COMPAIGN_CONTROL", status: false, display: false },
          { name: "view Affiliates/Agents Finances", id: "AFFILIATES_FINANCE_VIEW", status: false, display: false },
          { name: "Manage Affiliates/Agents Finances", id: "AFFILIATES_FINANCE_CONTROL", status: false, display: false },
          { name: "Manage Agents Payments", id: "AGENT_PAYMENTS_CONTROL", status: false, display: false },
          { name: "Show Affiliates/Agents Passwords", id: "AFFILIATES_PASSWORD_SHOW", status: false, display: false },
        ]
      },
      {
        name: "Tools", status: false, display: false,
        children: [
          { name: "Export Data", id: "TOOLS_EXPORT_DATA", status: false, display: false },
          { name: "Emailing", id: "TOOLS_EMAIL_NOTIFI", status: false, display: false },
          { name: "View FAQ", id: "TOOLS_HELP_VIEW", status: false, display: false },
          { name: "Manage FAQ", id: "TOOLS_HELP_MANAGE", status: false, display: false },
          { name: "View News", id: "TOOLS_NEWS_VIEW", status: false, display: false },
          { name: "Manage News", id: "TOOLS_NEWS_MANAGE", status: false, display: false },
          { name: "Maintenace Tools", id: "TOOLS_MAINTENANCE", status: false, display: false },
        ]
      },
      {
        name: "Remote Systems", status: false, display: false,
        children: [
          { name: "View Remote Systems Settings", id: "INTEGRATION_VIEW", status: false, display: false },
          { name: "Mange Remote Systems ", id: "INTEGRATION_MANAGE", status: false, display: false },
          { name: "View Remote Systems Info(Individual)", id: "REMOTE_SYSTEMS_INFO_VIEW", status: false, display: false },
          { name: "View Remote Systems info(Global)", id: "REMOTE_SYSTEMS_INFO_VIEW_GLOBAL", status: false, display: false },
        ]
      },
    ]
    this.EditAdminPermissionsList = this.mainarray;

    for (let i = 0; i < this.mainarray.length; i++) {
      const newformcontrolName = this.mainarray[i].name
      const newformcontrolValue = true
      this.forAdmin.addControl(newformcontrolName, new FormControl(newformcontrolValue))

      // if (array[i].children) {
      //   for (let j = 0; j < array[i].children.length; j++) {
      //     const newformcontrolName12 = array[i].children[j].name
      //     const newformcontrolValue = true
      //     this.forAdmin.addControl(newformcontrolName12, new FormControl(newformcontrolValue))
      //   }
      // }
    }
    console.log(this.forAdmin.value)
    this.permissions()
    this.adminpermissions()
  }


  getAdmins() {
    this.adminList=false;
    this.loader=true;
    let body = {}
    this.loginService.getAdmins(body).subscribe((res) => {
      this.adminList = res.objectList;
      console.log(this.adminList)
      this.loader=false;
    })
  }

  getAdminPermissions(data: any): void {
    this.adminDetailList = JSON.parse(JSON.stringify(this.adminList[data]))
    // this.EditAdminPermissionsPop = true;
    this.EditAdminPermissionsPop01 = true;
    let body = {
      "tGuid": this.adminDetailList.guid,
    }
    this.loginService.getAdminPermissions(body).subscribe((res) => {
      console.log(res)
      this.getAdminPermissionsList = res.objectList;
      console.log(this.getAdminPermissionsList)
      // setTimeout(() => {
      this.cheking(this.getAdminPermissionsList)
      // }, 2000)
    })
    console.log(this.EditAdminPermissionsList)
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@", this.getAdminPermissionsList)
    this.permissions()
  }
  adminpermissions() {
    const adminperm = sessionStorage.getItem("permissons")
    let subarray: any = adminperm?.split(",")
    let truevalues = []
    if (adminperm) {
      console.log(this.EditAdminPermissionsList)
      for (let i = 0; i < subarray.length; i++) {
        console.log(subarray[i])
        for (let j = 0; j < this.EditAdminPermissionsList.length; j++) {
          if (subarray[i] == this.EditAdminPermissionsList[j].id) {
            this.EditAdminPermissionsList[j].display = true
          }
          for (let k = 0; k < this.EditAdminPermissionsList[j].children.length; k++) {
            if (subarray[i] == this.EditAdminPermissionsList[j].children[k].id) {
              this.EditAdminPermissionsList[j].children[k].display = true
              this.EditAdminPermissionsList[j].display = true
            }
          }
        }
      }
      console.log(this.EditAdminPermissionsList)
    }
  }

  abc123(data: any) {
    for (let i = 0; i < data.length; i++) {
      // if(data[i].children.length>0){
      // this.abc123(data[i].children)
      // }

    }
  }
  permissions() {
    console.log("EditAdminPermissionsList", this.EditAdminPermissionsList);
    this.EditAdminPermissionsListCheckbox = Array(this.EditAdminPermissionsList.length).fill(false);
    console.log(this.EditAdminPermissionsListCheckbox)
    this.checkedList = this.EditAdminPermissionsList.map((provider: any) => {
      console.log(provider)
      if (provider.children) {
        console.log(provider.children)
        return Array(provider.children.length).fill(false);
      }
      return []; // Returning an empty array if provider.children doesn't exist
    });
    console.log(this.checkedList); // Log the final checkedList after mapping

    this.updatePermissions()
  }


  private updatePermissions(): void {
    let selectedPermissions: any = [];
    this.EditAdminPermissionsList.forEach((Permission: any, PermissionIndex: any) => {
      console.log(PermissionIndex)
      // console.log(Permission[PermissionIndex].id)
      if (Permission.id) {
        if (this.EditAdminPermissionsListCheckbox[PermissionIndex]) {
          selectedPermissions.push(Permission.id);
        }
      }
      //if (Permission.children) {
      Permission.children.forEach((game: any, childrenIndex: any) => {
        if (this.checkedList[PermissionIndex][childrenIndex]) {
          selectedPermissions.push(game.id);
        }
        //  return []
      });
      //}
    });
    console.log(selectedPermissions)
    let permissions = selectedPermissions.map((permissionType: any) => ({ permissionType }));
    console.log(permissions)
    this.permissionsPayload = permissions
  }

  private updateProviderCheckbox(providerIndex: number): void {
    console.log(this.checkedList)
    const allPermissionsSelected = this.checkedList[providerIndex].every((game: any) => game);
    console.log(allPermissionsSelected)
    console.log(this.EditAdminPermissionsList[providerIndex])
    // this.EditAdminPermissionsList[providerIndex] = allGamesSelected;   
    // this.EditAdminPermissionsListCheckbox[providerIndex] = allGamesSelected;    
    if (this.checkedList[providerIndex].length > 0) {
      this.EditAdminPermissionsListCheckbox[providerIndex] = allPermissionsSelected;
    }
    // else{
    //   if(this.EditAdminPermissionsList[providerIndex].id == "ADMIN_LOGIN_ENABLE"){

    //   this.EditAdminPermissionsListCheckbox[providerIndex] = allGamesSelected;    
    //   }
    // }
    // console.log(this.EditAdminPermissionsList[providerIndex])
  }
  clickonCheckboxIndivisualPermission(event: any, providerIndex: number, gameIndex: number, name: any) {
    this.checkedList[providerIndex][gameIndex] = event.target.checked;
    this.updateProviderCheckbox(providerIndex);
    this.updatePermissions();
    console.log(this.checkedList);

  }

  clickonCheckboxForAllGames(event: any, providerIndex: number) {
    const isChecked = event.target.checked;
    this.EditAdminPermissionsListCheckbox[providerIndex] = isChecked;
    this.checkedList[providerIndex] = this.checkedList[providerIndex].map(() => isChecked);
    this.updateProviderCheckbox(providerIndex);
    this.updatePermissions();
    console.log(this.checkedList);
  }


  cheking(data: any) {
    console.log(data);
    if (data) {
      // this.EditAdminPermissionsListCheckbox=[]
      // this.checkedList=[]
      for (let i = 0; i < this.EditAdminPermissionsList.length; i++) {
        let allChildrenChecked = true; // Assume all children are checked
        for (let j = 0; j < this.getAdminPermissionsList.length; j++) {
          console.log(this.EditAdminPermissionsList[i].id == this.getAdminPermissionsList[j].permissionType)
          console.log(this.EditAdminPermissionsListCheckbox)
          // this.EditAdminPermissionsListCheckbox = [];

          if (this.EditAdminPermissionsList[i].id == this.getAdminPermissionsList[j].permissionType) {

            console.log(this.EditAdminPermissionsListCheckbox[i]);
            this.EditAdminPermissionsList[i].status = true;
            this.EditAdminPermissionsListCheckbox[i] = true;
            console.log(this.EditAdminPermissionsListCheckbox[i]);
            // alert(1);
          } else {
            // this.EditAdminPermissionsListCheckbox[i] = false;
          }

          if (this.EditAdminPermissionsList[i].children) {
            for (let k = 0; k < this.EditAdminPermissionsList[i].children.length; k++) {
              if (this.EditAdminPermissionsList[i].children[k].id === this.getAdminPermissionsList[j].permissionType) {
                // alert(1)
                console.log(this.EditAdminPermissionsList[i].children[k].id);
                this.EditAdminPermissionsList[i].children[k].status = true;
                this.checkedList[i][k] = true; // Update checkedList using i as index for parent permission
              }

              if (!this.EditAdminPermissionsList[i].children[k].status) {
                allChildrenChecked = false; // If any child is not checked, update flag
              }
            }
          }
        }

        // Update parent status based on all children's status
        // if (this.EditAdminPermissionsList[i].children && allChildrenChecked) {         
        //   this.EditAdminPermissionsList[i].status = true;
        // }
        this.updateProviderCheckbox(i);
        this.updatePermissions()
      }
      console.log("finaloutput", this.EditAdminPermissionsList);
      console.log("EditAdminPermissionsListCheckbox", this.EditAdminPermissionsListCheckbox);
      console.log("checkedList", this.checkedList);
    }
  }


  setAdminPermissions() {
    this.SpinnwerT = true;
    let body = {
      tGuid: this.adminDetailList.guid,
      permissions: this.permissionsPayload
    };
    this.loginService.setAdminPermissions(body).subscribe((data) => {
      console.log(data)
      if (data) {
        this.EditAdminPermissionsPop = false;
      }
    })
  }


  showmActions(i: any, guid: any) {
    this.popupArrow = !this.popupArrow
    this.SeletedIconIndex = i
  }
  setAdminActions(Type: any, index: any) {
    this.popupArrow = false;
    // this.SpinnwerT = true;
    // let adminActionsGuid = this.adminList[index].guid;
    switch (Type) {
      case 'EditAdmin': {
        // this.adminListpopup = true;
        this.onClick(index)
        break;
      }
      case 'EditPermissions': {
        this.getAdminPermissions(index)
        break;
      }
    }
  }


  updatePop(e: any) {
    console.log(e)
    this.commonDataService.openPopup(e)
    this.commonDataService.popupCont.subscribe((data: any) => this.updatedCont = data)
    this.commonDataService.popupCont.subscribe((data) => {
      this.updatedCont = data;
      console.log(data)

    })
  }

  faceParameters() {
    const faceParameters = localStorage.getItem('faceParameters')
    if (faceParameters) {
      this.faceParameterslist = JSON.parse(faceParameters)
    }
    console.log(this.faceParameterslist)





    this.faceParameterslist.forEach((item: { name: string }) => {
      this.faceNames.push(item.name);
      this.faceconvertedarray.push(item.name);
    });
    // console.log(this.faceNames);
    // console.log(this.dropdownList12);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    // this.selectedFaceItems = this.faceParameterslist;
    for (let i = 0; i < this.faceParameterslist.length; i++) {

      this.selectedFaceItems[i] = {
        name: this.faceParameterslist[i].name,
        // guid: this.walletTypesList[i].guid
      }
    }
    console.log(this.selectedFaceItems)
  }

  onClick(data: any) {
    console.log(data)
    this.adminDetailList = JSON.parse(JSON.stringify(this.adminList[data]))
    console.log(this.adminDetailList)
    this.adminListpopup = true;

    console.log(this.adminDetailList?.faces?.length)

    if (this.adminDetailList?.faces?.length == 0) {
      console.log(this.selectedFaceItems)
      for (let i = 0; i < this.faceParameterslist.length; i++) {
        this.selectedFaceItems[i] = {
          name: this.faceParameterslist[i].name,
        }
      }
    } else {
      this.selectedFaceItems = []
      for (let i = 0; i < this.adminDetailList?.faces?.length; i++) {
        for (let j = 0; j < this.faceParameterslist.length; j++) {
          if (this.adminDetailList.faces[i] == this.faceParameterslist[j].name) {
            this.selectedFaceItems[i] = {
              name: this.faceParameterslist[j].name
            }
          }
        }
      }


    }
    console.log("@@@@@@@@@@@", this.selectedFaceItems)
  }

  closepopup() {
    this.adminListpopup = false;
  }
  closeAdminPermissionsPop() {
    // this.EditAdminPermissionsPop = false;
    this.EditAdminPermissionsPop01 = false;
    this.getAdminPermissionsList=null;
    this.SpinnwerT = false;
  }

  editAdmin() {
    this.SpinnwerT = true;
    console.log(this.adminDetailList)
    if (this.faceNames.length == this.faceParameterslist.length) {
      console.log(this.faceNames)
      this.adminDetailList.faces = []
    } else {
      this.adminDetailList.faces = this.faceNames
    }
    console.log(this.adminDetailList)

    this.loginService.setAdmin(this.adminDetailList).subscribe(data => {
      console.log(data)
      if (data.changedObjectList) {
        this.adminListpopup = false;
        this.SpinnwerT = false;
        this.getAdmins()
      }
    })
  }


  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'AdminControlExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AdminControlExcelSheet")
  }


  onItemSelectnew(data: any) {
    this.faceNames = []
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.faceNames.push(item.name);
    });

    console.log(this.faceNames);
  }
  OnItemDeSelectnew(data: any) {
    this.faceNames = []
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.faceNames.push(item.name);
    });
    console.log(this.faceNames);
    if (this.faceNames.length == 0) {
      this.faceNames = this.faceconvertedarray
    }
    console.log(this.faceNames);
  }


  onSelectAllnew(data: any) {
    this.faceNames = [];
    data.forEach((item: { name: string }) => {
      this.faceNames.push(item.name);
    });
    console.log(this.faceNames);
  }
  onDeSelectAllnew(data: any) {
    this.faceNames = [];
    this.faceNames = this.faceconvertedarray
    console.log(this.faceNames);
  }


  triggerAdminTask() {
    this.SpinnwerT = true;
    this.adminPermissions.PermissionsSave();
  }
  onChildButtonClick() {
    console.log('Button clicked in child component!');
    // Call your parent method here
    this.closeAdminPermissionsPop()
  }
}
