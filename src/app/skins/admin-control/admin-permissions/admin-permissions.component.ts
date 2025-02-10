import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/source/login.service';

@Component({
  selector: 'admin-permissions',
  templateUrl: './admin-permissions.component.html',
  styleUrls: ['./admin-permissions.component.css']
})
export class AdminPermissionsComponent implements OnInit {

  @Input() PermissionsData: any = null;
  @Input() adminGuid: any = null;

  @Output() buttonClicked = new EventEmitter<void>();

  AfterPemissionCheck: any

  permissionsList = {
    "objectList": [
      {
        "children": [
          {
            "description": "Manage Players Finances",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "PLAYER_FINANCE_CONTROL"
          },
          {
            "description": "View Players Finances (Individual)",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "PLAYER_FINANCE_VIEW"
          },
          {
            "description": "View Players Finances (Global)",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "PLAYER_FINANCE_VIEW_GLOBAL"
          },
          {
            "description": "Manage Players",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "PLAYER_MANAGE"
          },
          {
            "description": "Show Players Passwords",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "PLAYER_PASSWORD_SHOW"
          },
          {
            "description": "Manage Players Payments",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "PLAYER_PAYMENTS_CONTROL"
          },
          {
            "description": "View Players Personal Data",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "PLAYER_PERSONAL_VIEW"
          },
          {
            "description": "View Players Info (Individual)",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "PLAYER_VIEW"
          },
          {
            "description": "View Players Info (Global)",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "PLAYER_VIEW_GLOBAL"
          }
        ],
        "description": "Player Control",
        "permissionLevel": "Branch",
        "permissionType": "PLAYER_CONTROL"
      },
      {
        "children": [
          {
            "description": "Administrator Login",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "ADMIN_LOGIN_ENABLE"
          },
          {
            "description": "Manage Administrators",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "ADMIN_MANAGE"
          },
          {
            "description": "View Administrators",
            "permissionLevel": "Node",
            "permissionStatus": true,
            "permissionType": "ADMIN_VIEW"
          }
        ],
        "description": "Administrator Control",
        "permissionLevel": "Branch",
        "permissionType": "ADMINISTRATOR_CONTROL"
      }
    ],
    "resultCount": 2,
    "sessionId": "514e741280894e5a-af3d1a40eda28ee9"
  }
  permissionsList01: any;
  getAdminPermissionsList: any;


  selectionMap: { [key: string]: boolean } = {};

  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
    // alert(1)
    console.log("PermissionsData", this.PermissionsData)
    console.log("permissionsList", this.permissionsList)
    this.getDefaultAdminPermission()
    // this.PermissionsDataCheck()
  }
  PermissionsDataCheck() {
    if (this.PermissionsData) {
      this.PermissionsData.forEach((data: any) => {
        this.permissionsList01.objectList.forEach((parentdata: any) => {
          // parentdata.permissionStatustype = false
          parentdata.children.forEach((childdata: any) => {
            // childdata.permissionStatusValue = false;
            console.log(data.permissionType, '&&&&&&', childdata.permissionType)
            // console.log ( ) 
            if (childdata.permissionType == data.permissionType) {
              childdata.permissionStatusValue = true;
            }

          })
        })
      })
    }
    console.log("PermissionsData", this.PermissionsData)
    console.log("permissionsList", this.permissionsList01)
    this.AfterPemissionCheck = this.permissionsList;
    // this.organizePermissions()
    console.log("AfterPemissionCheck", this.AfterPemissionCheck)
  }

  getDefaultAdminPermission() {
    let body = {};
    this.LoginService.getDefaultAdminPermission(body).subscribe(permissions => {
      console.log(permissions)
      this.permissionsList01 = permissions.objectList;
      // this.PermissionsDataCheck()
      this.getAdminPermissions()
    });

  }

  getAdminPermissions(): void {
    let body = {
      "tGuid": this.adminGuid,
    }
    this.LoginService.getAdminPermissions(body).subscribe((res) => {
      console.log(res)
      this.getAdminPermissionsList = res.objectList;
      console.log(this.getAdminPermissionsList)
      this.PermissionsDataCheck01()
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@", this.getAdminPermissionsList)
    })
  }
  PermissionsDataCheck01() {

    this.getAdminPermissionsList.forEach((data: any) => {
      data.children.forEach((pemissionChild: any) => {
        this.permissionsList01.forEach((parentdata: any) => {
          parentdata.permissionStatustype = false
          parentdata.children.forEach((childdata: any) => {
            console.log(pemissionChild.permissionType, '&&&&&&', childdata.permissionType)
            if (pemissionChild.permissionType == childdata.permissionType) {
              console.log("#############################", "123456789")
              childdata.permissionStatusValue = true;
            }
            this.updateParentSelection(parentdata)
          })
        })
      })
    })
    console.log("  this.permissionsList01", this.permissionsList01)

  }

  updateParentSelection(parent: any): void {
    parent.permissionStatustype = parent.children.every((permission: any) => permission.permissionStatusValue);
  }











  isParentChecked(parentPermissionType: any): boolean {
    // Check if all children are checked
    return parentPermissionType.children.every((child: any) => child.permissionStatusValue);
  }

  onParentChange(parentPermissionType: any, isChecked: any): void {
    // Update all children based on parent checkbox state
    parentPermissionType.children.forEach((child: any) => {
      child.permissionStatusValue = isChecked.target.checked;
    });
    console.log(this.permissionsList01)
    // this.PermissionsSave()

  }

  onChildChange(parentPermissionType: any): void {
    // Check if all children are checked to update parent checkbox state
    parentPermissionType.allChecked = parentPermissionType.children.every((child: any) => child.permissionStatusValue);
    console.log(this.permissionsList01)
  }

  PermissionsSave() {
    var payload: any = []
    this.permissionsList01.forEach((parentdata: any) => {
      parentdata.children.forEach((childdata: any) => {
        if (childdata.permissionStatusValue === true) {
          console.log("Check")
          let obj = {
            permissionType: childdata.permissionType,
            parentPermissionType: parentdata.permissionType
          }
          payload.push(obj)
        }
      })
    })
    console.log("payload", payload)
    let body = {
      "tGuid": this.adminGuid,
      "permissions": payload
    };

    this.LoginService.setAdminPermissions(body).subscribe((data) => {
      console.log(data)
      if (data.Status==true) {
        // window.location.reload()
        this.buttonClicked.emit();
      }
    })

  }

  transformMethod(value: string): string {
    if (!value) return value;
    return value.toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }



}
