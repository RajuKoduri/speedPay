import { Component, Input, OnInit } from '@angular/core';
interface PermissionNode {
  name: string;
  children?: PermissionNode[];
  permissionStatus?: boolean;
}

interface Permission {
  parentPermissionType: string;
  permissionDescription: string;
  permissionLevel: string;
  permissionStatus: boolean;
  permissionStatustype: boolean;
  permissionType: string;
}



@Component({
  selector: 'admin-permissions-tree-component',
  templateUrl: './admin-permissions-tree-component.component.html',
  styleUrls: ['./admin-permissions-tree-component.component.css']
})


export class AdminPermissionsTreeComponentComponent implements OnInit {

  @Input() PermissionsData: any = null;

  treeData: PermissionNode[] = [];
  permissions: Permissions[] = [];
  PERMISSIONS = {
    "objectList": [
      {
        "parentPermissionType": "ADMINISTRATOR_CONTROL",
        "permissionDescription": "Administrator Login",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "ADMIN_LOGIN_ENABLE"
      },
      {
        "parentPermissionType": "ADMINISTRATOR_CONTROL",
        "permissionDescription": "View Administrators",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "ADMIN_VIEW"
      },
      {
        "parentPermissionType": "ADMINISTRATOR_CONTROL",
        "permissionDescription": "Manage Administrators",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "ADMIN_MANAGE"
      },
      {
        "parentPermissionType": "PLAYER_CONTROL",
        "permissionDescription": "Show Players Passwords",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "PLAYER_PASSWORD_SHOW"
      },
      {
        "parentPermissionType": "PLAYER_CONTROL",
        "permissionDescription": "View Players Personal Data",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "PLAYER_PERSONAL_VIEW"
      },
      {
        "parentPermissionType": "PLAYER_CONTROL",
        "permissionDescription": "View Players Info (Individual)",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "PLAYER_VIEW"
      },
      {
        "parentPermissionType": "PLAYER_CONTROL",
        "permissionDescription": "View Players Info (Global)",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "PLAYER_VIEW_GLOBAL"
      },
      {
        "parentPermissionType": "PLAYER_CONTROL",
        "permissionDescription": "Manage Players",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "PLAYER_MANAGE"
      },
      {
        "parentPermissionType": "PLAYER_CONTROL",
        "permissionDescription": "View Players Finances (Individual)",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "PLAYER_FINANCE_VIEW"
      },
      {
        "parentPermissionType": "PLAYER_CONTROL",
        "permissionDescription": "View Players Finances (Global)",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "PLAYER_FINANCE_VIEW_GLOBAL"
      },
      {
        "parentPermissionType": "PLAYER_CONTROL",
        "permissionDescription": "Manage Players Finances",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "PLAYER_FINANCE_CONTROL"
      },
      {
        "parentPermissionType": "PLAYER_CONTROL",
        "permissionDescription": "Manage Players Payments",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "PLAYER_PAYMENTS_CONTROL"
      },
      {
        "parentPermissionType": "FRAUD_CONTROL",
        "permissionDescription": "View Fraud Data",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "SETTINGS_FRAUDCONTROL_VIEW"
      },
      {
        "parentPermissionType": "FRAUD_CONTROL",
        "permissionDescription": "Manage Fraud",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "SETTINGS_FRAUDCONTROL_CHANGE"
      },
      {
        "parentPermissionType": "GAMES",
        "permissionDescription": "View Games Info (Individual)",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "GAMES_INFO_VIEW"
      },
      {
        "parentPermissionType": "GAMES",
        "permissionDescription": "View Games Info (Global)",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "GAMES_INFO_VIEW_GLOBAL"
      },
      {
        "parentPermissionType": "GAMES",
        "permissionDescription": "View Games Settings",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "GAMES_SETTINGS_VIEW"
      },
      {
        "parentPermissionType": "GAMES",
        "permissionDescription": "Manage Games",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "GAMES_CONTROL"
      },
      {
        "parentPermissionType": "GAMES",
        "permissionDescription": "Register Players in Tournament",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "REGISTER_PLAYERS_IN_TOURNAMENTS"
      },
      {
        "parentPermissionType": "ACCOUNTING_CONTROL",
        "permissionDescription": "View Accounting Data",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "ACCOUNTING"
      },
      {
        "parentPermissionType": "PAYMENT_SETTING",
        "permissionDescription": "Bonus codes",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "CASHIER_BONUSCODES_VIEW"
      },
      {
        "parentPermissionType": "PAYMENT_SETTING",
        "permissionDescription": "Bonus codes edit",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "CASHIER_BONUSCODES_MANAGE"
      },
      {
        "parentPermissionType": "PAYMENT_SETTING",
        "permissionDescription": "Bonus rates",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "CASHIER_BONUSRATES_VIEW"
      },
      {
        "parentPermissionType": "PAYMENT_SETTING",
        "permissionDescription": "Bonus rates edit",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "CASHIER_BONUSRATES_CHANGE"
      },
      {
        "parentPermissionType": "PAYMENT_SETTING",
        "permissionDescription": "Currencies manage",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "CASHIER_CURRENCIES_MANAGE"
      },
      {
        "parentPermissionType": "PAYMENT_SETTING",
        "permissionDescription": "Merchant Settings",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "SETTINGS_MERCHANT_VIEW"
      },
      {
        "parentPermissionType": "PAYMENT_SETTING",
        "permissionDescription": "Merchant Settings edit",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "SETTINGS_MERCHANT_CHANGE"
      },
      {
        "parentPermissionType": "PAYMENT_SETTING",
        "permissionDescription": "Transaction",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "CASHIER_TRANSACTION_VIEW"
      },
      {
        "parentPermissionType": "PAYMENT_SETTING",
        "permissionDescription": "Transaction manage",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "CASHIER_TRANSACTION_MANAGE"
      },
      {
        "parentPermissionType": "COMP_POINTS",
        "permissionDescription": "View Comp Points Settings",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "COMP_POINTS_SETTINGS_VIEW"
      },
      {
        "parentPermissionType": "COMP_POINTS",
        "permissionDescription": "Manage Comp Points Settings",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "COMP_POINTS_SETTINGS_MANAGE"
      },
      {
        "parentPermissionType": "COMP_POINTS",
        "permissionDescription": "View Comp Points Info (Individual)",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "COMP_POINTS_INFO_VIEW"
      },
      {
        "parentPermissionType": "COMP_POINTS",
        "permissionDescription": "View Comp Points Info (Global)",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "COMP_POINTS_INFO_VIEW_GLOBAL"
      },
      {
        "parentPermissionType": "COMP_POINTS",
        "permissionDescription": "Manage Comp Points",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "COMP_POINTS_MANAGE"
      },
      {
        "parentPermissionType": "AFFILIATE_CONTROL",
        "permissionDescription": "Webmaster list",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "AFFILIATES_VIEW"
      },
      {
        "parentPermissionType": "AFFILIATE_CONTROL",
        "permissionDescription": "Webmasters control",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "AFFILIATES_CONTROL"
      },
      {
        "parentPermissionType": "AFFILIATE_CONTROL",
        "permissionDescription": "Finance compaign",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "AFFILIATES_COMPAIGN_CONTROL"
      },
      {
        "parentPermissionType": "AFFILIATE_CONTROL",
        "permissionDescription": "Finance",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "AFFILIATES_FINANCE_VIEW"
      },
      {
        "parentPermissionType": "AFFILIATE_CONTROL",
        "permissionDescription": "Finance control",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "AFFILIATES_FINANCE_CONTROL"
      },
      {
        "parentPermissionType": "AFFILIATE_CONTROL",
        "permissionDescription": "Manage Agents Payments",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "AGENT_PAYMENTS_CONTROL"
      },
      {
        "parentPermissionType": "AFFILIATE_CONTROL",
        "permissionDescription": "Show affiliates and agents passwords",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "AFFILIATES_PASSWORD_SHOW"
      },
      {
        "parentPermissionType": "TOOLS",
        "permissionDescription": "Export Data",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "TOOLS_EXPORT_DATA"
      },
      {
        "parentPermissionType": "TOOLS",
        "permissionDescription": "Emailing",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "TOOLS_EMAIL_NOTIFI"
      },
      {
        "parentPermissionType": "TOOLS",
        "permissionDescription": "Help troubleshooting",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "TOOLS_HELP_VIEW"
      },
      {
        "parentPermissionType": "TOOLS",
        "permissionDescription": "Help troubleshooting manage",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "TOOLS_HELP_MANAGE"
      },
      {
        "parentPermissionType": "TOOLS",
        "permissionDescription": "View News",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "TOOLS_NEWS_VIEW"
      },
      {
        "parentPermissionType": "TOOLS",
        "permissionDescription": "Manage News",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "TOOLS_NEWS_MANAGE"
      },
      {
        "parentPermissionType": "TOOLS",
        "permissionDescription": "Maintenance tools",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "TOOLS_MAINTENANCE"
      },
      {
        "parentPermissionType": "REMOTE_SYSTEM",
        "permissionDescription": "View Remote Systems Settings",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "INTEGRATION_VIEW"
      },
      {
        "parentPermissionType": "REMOTE_SYSTEM",
        "permissionDescription": "Manage Remote Systems",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "INTEGRATION_MANAGE"
      },
      {
        "parentPermissionType": "REMOTE_SYSTEM",
        "permissionDescription": "View Remote Systems Info (Individual)",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "REMOTE_SYSTEMS_INFO_VIEW"
      },
      {
        "parentPermissionType": "REMOTE_SYSTEM",
        "permissionDescription": "View Remote Systems Info (Global)",
        "permissionLevel": "Node",
        "permissionStatus": true,
        "permissionType": "REMOTE_SYSTEMS_INFO_VIEW_GLOBAL"
      },
      {
        "permissionDescription": "Administrator Control",
        "permissionLevel": "Branch",
        "permissionStatus": true,
        "permissionType": "ADMINISTRATOR_CONTROL"
      },
      {
        "permissionDescription": "Player Control",
        "permissionLevel": "Branch",
        "permissionStatus": true,
        "permissionType": "PLAYER_CONTROL"
      },
      {
        "permissionDescription": "Affiliate Control",
        "permissionLevel": "Branch",
        "permissionStatus": true,
        "permissionType": "AFFILIATE_CONTROL"
      },
      {
        "permissionDescription": "Games",
        "permissionLevel": "Branch",
        "permissionStatus": true,
        "permissionType": "GAMES"
      },
      {
        "permissionDescription": "Fraud Control",
        "permissionLevel": "Branch",
        "permissionStatus": true,
        "permissionType": "FRAUD_CONTROL"
      },
      {
        "permissionDescription": "Accounting Control",
        "permissionLevel": "Branch",
        "permissionStatus": true,
        "permissionType": "ACCOUNTING_CONTROL"
      },
      {
        "permissionDescription": "Payment Setting",
        "permissionLevel": "Branch",
        "permissionStatus": true,
        "permissionType": "PAYMENT_SETTING"
      },
      {
        "permissionDescription": "Comp Points",
        "permissionLevel": "Branch",
        "permissionStatus": true,
        "permissionType": "COMP_POINTS"
      },
      {
        "permissionDescription": "Tools",
        "permissionLevel": "Branch",
        "permissionStatus": true,
        "permissionType": "TOOLS"
      },
      {
        "permissionDescription": "Remote System",
        "permissionLevel": "Branch",
        "permissionStatus": true,
        "permissionType": "REMOTE_SYSTEM"

      }
    ],
    "resultCount": 62,
    "sessionId": "e4cd8273657d4cb1-aa46707335084cc6"

  }
  organizedPermissions: { [key: string]: Permission[] } = {};
  selectionMap: { [key: string]: boolean } = {};
  AfterPemissionCheck: any;
  constructor() { }

  ngOnInit(): void {
    alert(123)
    this.buildTreeData()
    console.log(this.PERMISSIONS)
    console.log("PermissionsData",this.PermissionsData)
    this.PermissionsDataCheck()
  }


  PermissionsDataCheck() {
    if (this.PermissionsData) {
      this.PERMISSIONS.objectList.forEach((parentdata: any) => {
        parentdata.permissionStatustype = false
        this.PermissionsData.forEach((data: any) => {
          if (parentdata.permissionType == data.permissionType) {
            parentdata.permissionStatustype = true;
          }

        })
      })
    }
    console.log(this.PermissionsData)
    console.log(this.PERMISSIONS)
    this.AfterPemissionCheck = this.PERMISSIONS;
    this.organizePermissions()
  }





  orangePermissions() {
    this.PERMISSIONS.objectList.forEach((permission: any) => {
      

    });

  }



  buildTreeData() {
    const map = new Map<string, PermissionNode>();
    this.PERMISSIONS.objectList.forEach((permission: any) => {
      const node = { name: permission.permissionDescription, permissionStatus: permission.permissionStatus } as PermissionNode;
      map.set(permission.permissionType, node);

      if (permission.parentPermissionType) {
        const parent = map.get(permission.parentPermissionType) || { name: permission.parentPermissionType, children: [] };
        parent.children = parent.children || [];
        parent.children.push(node);
        map.set(permission.parentPermissionType, parent);
      } else {
        this.treeData.push(node);
      }
    });
    console.log(this.treeData)
    // this.organizePermissions()
    // this.getPermissionsByType()
    // console.log(getPermissionsByType)
  }

  // getPermissionsByType() {
  //   return this.PERMISSIONS.objectList.filter((permissions:any) => permissions.parentPermissionType === type);
  // }

  organizePermissions(): void {
    this.AfterPemissionCheck.objectList.forEach((permission: any) => {
      const parent = permission.parentPermissionType;
      if (parent) {

        if (!this.organizedPermissions[parent]) {
          this.organizedPermissions[parent] = [];
        }
        this.organizedPermissions[parent].push(permission);

        this.updateParentSelection(parent)
      }
    });
    console.log(this.organizedPermissions)
    console.log(this.AfterPemissionCheck)
    this.filterPermissions()
  }
  toggleSelectAll(parent: string, isSelected: any): void {
    this.selectionMap[parent] = isSelected.target.checked;
    this.organizedPermissions[parent].forEach(permission => {
      permission.permissionStatustype = isSelected.target.checked;
    });
  }
  updateParentSelection(parent: string): void {
    this.selectionMap[parent] = this.organizedPermissions[parent].every(permission => permission.permissionStatustype);
    console.log(this.organizedPermissions)
  }

  checkParentInitial(parent: string): boolean {
    return this.selectionMap[parent] ?? false; // return false if undefined
  }

  transformMethod(value: string): string {
    if (!value) return value;
    return value.toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }




  filteredPermissions: any = {};

  // filterPermissions() {
  //   for (const key in this.organizedPermissions) {
  //     if (this.organizedPermissions.hasOwnProperty(key)) {
  //       this.filteredPermissions[key] = this.organizedPermissions[key].filter((permission:any) => permission.permissionStatustype);
  //     }
  //   }
  //   console.log('filteredPermissions',this.filteredPermissions)
  // }
  filterPermissions(): void {
    this.filteredPermissions = Object.keys(this.organizedPermissions)
      .flatMap(key => this.organizedPermissions[key])
      .filter(permission => permission.permissionStatustype);
    console.log('filteredPermissions', this.filteredPermissions)

    let payload = this.filteredPermissions.map((data: any) => {
      let { permissionStatustype, ...rest } = data;
      return rest
    })
    console.log(payload)
  }
}
