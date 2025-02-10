import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-agentaccessrules',
  templateUrl: './agentaccessrules.component.html',
  styleUrls: ['./agentaccessrules.component.css']
})
export class AgentaccessrulesComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  AgentAccessAreaList: any;
  AgentStatusList: any;
  AgentAccessStatusList: any;
  AgentAccessRulesdata: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  loader: boolean = false;
  usertypeList: any;
  constructor(private AgentcontrolService: AgentControlService) {
    this.filterForm = new FormGroup({
      AccessArea: new FormControl(),
      Status: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
    })
  }

  ngOnInit(): void {
    this.palyerstatus();
    this.UserAccessArea();
    this.UserAccessStatus();
    this.usertype();
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  palyerstatus() {
    const playerstatus = localStorage.getItem('palyerstatus')
    if (playerstatus) {
      this.AgentStatusList = JSON.parse(playerstatus)
    }
    console.log("playerStatusList", this.AgentStatusList)
  }

  UserAccessArea() {
    const UserAccessArea = localStorage.getItem('UserAccessArea')
    if (UserAccessArea) {
      this.AgentAccessAreaList = JSON.parse(UserAccessArea)
    }
    console.log("AgentAccessAreaList", this.AgentAccessAreaList)
  }
  UserAccessStatus() {
    const UserAccessStatus = localStorage.getItem('UserAccessStatus')
    if (UserAccessStatus) {
      this.AgentAccessStatusList = JSON.parse(UserAccessStatus)
    }
    console.log("AgentAccessStatusList", this.AgentAccessStatusList)
  }
  usertype(){
    const usertype = localStorage.getItem('usertype')
    if(usertype){
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertypeList", this.usertypeList)
    console.log("usertypeList", this.usertypeList[3].guid)
  }
  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
          // else
          //   dirtyValues[key] = currentControl.value;
        }
      });

    return dirtyValues;
  }
  onFormSubmit() {
    console.log(this.filterForm.value)
    this.loader = true;
    this.AgentAccessRulesdata = false;
    this.FillterMenu = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["userType"] = this.usertypeList[3].guid
    fillterbody["accessAreas"] = this.filterForm.value.AccessArea !=null ? [this.filterForm.value.AccessArea]:undefined;
    fillterbody["statuses"] = this.filterForm.value.Status !=null ? [this.filterForm.value.Status]:undefined;

    this.AgentcontrolService.listUserAccessRules(fillterbody).subscribe((res) => this.AgentAccessRulesResData(res))
  }

  AgentAccessRulesResData(res: any) {
    console.log(res)
    this.AgentAccessRulesdata = res.objectList
    this.rowsOnthePage = res.objectList.length;
    this.ResultCount = res.resultCount;

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.AgentAccessRulesdata != null) {
      this.loader = false;
    }
    for (let i = 0; i < this.AgentAccessRulesdata.length; i++) {
      for (let m = 0; m < this.AgentAccessStatusList.length; m++) {
        if (this.AgentAccessRulesdata[i].status.lowLong == this.AgentAccessStatusList[m].guid.lowLong) {
          this.AgentAccessRulesdata[i].status = this.AgentAccessStatusList[m].value
          // console.log(this.listUserAccessRulesdata[i].status)
        }
      }
      for (let n = 0; n < this.AgentAccessAreaList.length; n++) {
        if (this.AgentAccessRulesdata[i].accessArea.lowLong == this.AgentAccessAreaList[n].guid.lowLong) {
          this.AgentAccessRulesdata[i].accessArea = this.AgentAccessAreaList[n].value
        }
      }
    }
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'AgentAccessRulesExcelSheet.xlsx');

  }
}
