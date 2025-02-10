import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AffiliateControlService } from 'src/app/source/AffiliateControl.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-affiliateaccessrules',
  templateUrl: './affiliateaccessrules.component.html',
  styleUrls: ['./affiliateaccessrules.component.css']
})
export class AffiliateaccessrulesComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  AffiliateAccessAreaList: any;
  AffiliateStatusList: any;
  AffiliateAccessStatusList: any;
  AffiliateAccessRulesdata: any;
  loader: boolean = false;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  usertypeList: any;

  constructor(private AffiliateControlService: AffiliateControlService) {
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
    this.usertype()
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  palyerstatus() {
    const playerstatus = localStorage.getItem('palyerstatus')
    if (playerstatus) {
      this.AffiliateStatusList = JSON.parse(playerstatus)
    }
    console.log("playerStatusList", this.AffiliateStatusList)
  }

  UserAccessArea() {
    const UserAccessArea = localStorage.getItem('UserAccessArea')
    if (UserAccessArea) {
      this.AffiliateAccessAreaList = JSON.parse(UserAccessArea)
    }
    console.log("AffiliateAccessAreaList", this.AffiliateAccessAreaList)
  }
  UserAccessStatus() {
    const UserAccessStatus = localStorage.getItem('UserAccessStatus')
    if (UserAccessStatus) {
      this.AffiliateAccessStatusList = JSON.parse(UserAccessStatus)
    }
    console.log("AffiliateAccessStatusList", this.AffiliateAccessStatusList)
  }
  usertype(){
    const usertype = localStorage.getItem('usertype')
    if(usertype){
      this.usertypeList = JSON.parse(usertype)
    }
    console.log("usertypeList", this.usertypeList)
    console.log("usertypeList", this.usertypeList[1].guid)
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
    // this.rowsOnthePage = ""
    this.loader = true;
    this.AffiliateAccessRulesdata = false;
    this.FillterMenu = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["userType"] = this.usertypeList[1].guid
    fillterbody["accessAreas"] = this.filterForm.value.AccessArea != null ? [this.filterForm.value.AccessArea] : undefined;
    fillterbody["statuses"] = this.filterForm.value.Status != null ? [this.filterForm.value.Status] : undefined;

    this.AffiliateControlService.listUserAccessRules(fillterbody).subscribe((res) => this.AffiliateAccessRulesResData(res))
  }

  AffiliateAccessRulesResData(res: any) {
    console.log(res)
    this.AffiliateAccessRulesdata = res.objectList
    this.rowsOnthePage = res.objectList.length;
    this.ResultCount = res.resultCount;

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.AffiliateAccessRulesdata != null) {
      this.loader = false;
    }
    for (let i = 0; i < this.AffiliateAccessRulesdata.length; i++) {
      for (let m = 0; m < this.AffiliateAccessStatusList.length; m++) {
        if (this.AffiliateAccessRulesdata[i].status.lowLong == this.AffiliateAccessStatusList[m].guid.lowLong) {
          this.AffiliateAccessRulesdata[i].status = this.AffiliateAccessStatusList[m].value
          // console.log(this.listUserAccessRulesdata[i].status)
        }
      }
      for (let n = 0; n < this.AffiliateAccessAreaList.length; n++) {
        if (this.AffiliateAccessRulesdata[i].accessArea.lowLong == this.AffiliateAccessAreaList[n].guid.lowLong) {
          this.AffiliateAccessRulesdata[i].accessArea = this.AffiliateAccessAreaList[n].value
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
