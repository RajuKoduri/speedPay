import { Component, OnInit } from '@angular/core';
import { PromotionalServiceService } from 'src/app/source/promotional-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
@Component({
  selector: 'app-promotinalcodes',
  templateUrl: './promotinalcodes.component.html',
  styleUrls: ['./promotinalcodes.component.css']
})
export class PromotinalcodesComponent implements OnInit {
  filterForm: FormGroup
  showPro: boolean = false;
  showBox: boolean = false;
  openPagen: boolean = false;
  openpageBox: boolean = false;
  showTable: boolean = false;
  loader: boolean = false;
  SpinnwerT: boolean = false;
  promotioncode: any;
  username: any = [];
  promo: any;
  p: number = 1;
  selectnum: number = 10;
  selectnumber: number = -5;
  SeletedIconIndex: any
  itemsperpagecount = [
    { num: 5 },
    { num: 15 },
    { num: 25 },
    { num: 40 },
    { num: 50 }
  ];
  promoStatus: any;
  promoStatusList: any = [];
  PromoCodeUsageList: any;
  userTypes: any;
  PromoCodeUsageTypeList: any;
  creattypesList: any;
  creattypes: any;
  creatnames: any = [];
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;

  convertedstatus: any = [];
  statusguid: any = [];
  dropdownListStatus: any = [];
  dropdownsettingsStatus = {};

  selectpromocode: any = [];
  promoCodeUsageArray: any = [];
  promoCodeDropdownList: any = [];
  DropdownSettingsPromo = {};

  selectCreatetype: any = [];
  CreateTypeGuids: any = [];
  CopyCreateTypeGuids: any = [];
  dropdownListceateType = {};

  selectUsertypes: any = [];
  createUserGuids: any = [];
  dropdownsettingUser = {};
  popupArrow: boolean = false;
  isStatusPopup: boolean = false;
  idList: any;
  type: any;
  isEditPromotionalCodePopup: boolean = false;
  EditInfo: any;
  userType: any;

  isAgentExplorer: boolean = false;
  AgentGuid: any;
  AgentInfo: any;

  constructor(private promotionalServiceService: PromotionalServiceService, private FileformatServiceService: FileformatServiceService,
    private DateTimePipe: DateTimePipe) {
    this.filterForm = new FormGroup({
      networkNames: new FormControl(),
      Creator: new FormControl(),
      PromotionalCodes: new FormControl(),
      creatorType: new FormControl(),
      statustype: new FormControl(),
      Referretype: new FormControl(),
      usagemethod: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
    })
  }

  ngOnInit(): void {
    this.AgentExplorerCheck()
    this.PromotuonalStatus();
    this.PromoCodeUsageType();
    this.usertypes();
    this.creattype();

  }

  AgentExplorerCheck() {
    let location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    if (location == "/Agentexplorer/promotinalcodes") {
      this.isAgentExplorer = true;
      this.agentGuid();
    }else{
      this.isAgentExplorer = false;
    }
   
  }

  agentGuid(){
    let agentGuid = sessionStorage.getItem("Agentguid");
    let AgentInfo = sessionStorage.getItem('AgentInfo')
    if (agentGuid) {
      this.AgentGuid = JSON.parse(agentGuid)
    }
    if (AgentInfo) {
      this.AgentInfo = JSON.parse(AgentInfo)
    }
   
  }

  ngOnDestroy() {
    this.isAgentExplorer = false;
    console.log(this.isAgentExplorer)
  }

  showmanu(i: any) {
    this.SeletedIconIndex = i;
    this.popupArrow = !this.popupArrow;
  }

  playerStatusPromotionalCode(guid: any, i: number, type: any) {
    this.idList = guid
    this.type = type
    this.isStatusPopup = !this.isStatusPopup
    this.popupArrow = !this.popupArrow;
  }

  setPromotionalCodeActivity(type: any) {
    if (type == 'yes') {
      this.SpinnwerT = true
      let body = {
        "promoCodes": { 'idList': [this.idList] }
      }
      this.promotionalServiceService.setPromotionalCodeActivity(body).subscribe((data: any) => {
        console.log(data)
        if (data.changedObjectList) {
          this.SpinnwerT = false
          this.isStatusPopup = false
          this.onFormSubmit()
        }
      })
    } else {
      this.isStatusPopup = false
    }

  }

  PromotuonalStatus() {
    this.promoStatus = localStorage.getItem("PromoCodeStatus");
    if (this.promoStatus) {
      this.promoStatusList = JSON.parse(this.promoStatus)
    }
    this.convertedstatus = []
    console.log(this.promoStatusList)
    for (let i = 0; i < this.promoStatusList.length; i++) {
      this.convertedstatus.push(this.promoStatusList[i])
    }
    this.promoStatusList.forEach((item: any, i: any) => {
      this.convertedstatus[i] = {
        value: this.promoStatusList[i].value,
        guid: this.promoStatusList[i].guid
      }
    });
    this.convertedstatus.forEach((item: any) => {
      this.statusguid.push(item.guid)
    })
    console.log(this.convertedstatus);
    console.log(this.statusguid)
    this.dropdownListStatus = this.promoStatusList
    console.log(this.dropdownListStatus)

    this.dropdownsettingsStatus = {
      singleslection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unselectAllText: 'unselect All',
      itemsShowlimit: 1,
      allowsearchFilter: false,
    }
  }

  PromoCodeUsageType() {
    this.PromoCodeUsageList = localStorage.getItem("PromoCodeUsageType");
    if (this.PromoCodeUsageList) {
      this.PromoCodeUsageTypeList = JSON.parse(this.PromoCodeUsageList)
    }
    console.log("PromoCodeUsageType", this.PromoCodeUsageTypeList);

    for (let i = 0; i < this.PromoCodeUsageTypeList.length; i++) {
      this.selectpromocode[i] = {
        value: this.PromoCodeUsageTypeList[i].value,
        guid: this.PromoCodeUsageTypeList[i].guid
      }
    }
    console.log(this.selectpromocode);
    this.selectpromocode.forEach((item: { guid: any }) => {
      this.promoCodeUsageArray.push(item.guid);
    });
    this.promoCodeDropdownList = this.PromoCodeUsageTypeList;
    console.log(this.promoCodeDropdownList);
    this.DropdownSettingsPromo = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    }
    this.selectpromocode = this.promoCodeDropdownList;
    console.log(this.selectpromocode)
  }
  usertypes() {
    this.userTypes = localStorage.getItem("usertype");
    if (this.userTypes) {
      this.userTypes = JSON.parse(this.userTypes)
      console.log(this.userTypes)
      for (let i = 0; i < this.userTypes.length; i++) {
        if (this.userTypes[i].value == 'Agent' || this.userTypes[i].value == 'Affiliate' || this.userTypes[i].value == 'Player') {
          this.username.push(this.userTypes[i])
        }
        console.log(this.username)
      }
      for (let i = 0; i < this.username.length; i++) {
        this.selectUsertypes[i] = {
          value: this.username[i].value,
          guid: this.username[i].guid
        }
      }
      console.log(this.selectUsertypes)
      this.selectUsertypes.forEach((item: { guid: any; }) => {
        this.createUserGuids.push(item.guid);
      })


      this.dropdownsettingUser = {
        singleSelection: false,
        idField: 'guid',
        textField: 'value',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      }
    }
  }
  // usertypes() {
  //   this.userTypes = localStorage.getItem("usertype");
  //   this.userTypes = JSON.parse(this.userTypes)
  //   console.log(this.userTypes)
  //   for (let i = 0; i < this.userTypes.length; i++) {
  //     if (this.userTypes[i].value == 'Agent' || this.userTypes[i].value == 'Affiliate') {
  //       this.username.push(this.userTypes[i])
  //     }
  //     console.log(this.username)
  //   }
  // }
  creattype() {
    this.creattypes = localStorage.getItem("usertype");
    if (this.creattypes) {
      this.creattypesList = JSON.parse(this.creattypes)
      console.log(this.creattypesList)
      for (let i = 0; i < this.creattypesList.length; i++) {
        if (this.creattypesList[i].value == 'Agent' || this.creattypesList[i].value == 'Affiliate' || this.creattypesList[i].value == 'Admin') {
          this.creatnames.push(this.userTypes[i])
        }
        console.log(this.creatnames)
      }
      for (let i = 0; i < this.creatnames.length; i++) {
        this.selectCreatetype[i] = {
          value: this.creatnames[i].value,
          guid: this.creatnames[i].guid
        }
      }
      console.log(this.selectCreatetype)
      this.selectCreatetype.forEach((item: { guid: any; }) => {
        this.CreateTypeGuids.push(item.guid);
      })
      this.CopyCreateTypeGuids = this.CreateTypeGuids
      console.log(this.CreateTypeGuids);

      this.dropdownListceateType = {
        singleSelection: false,
        idField: 'guid',
        textField: 'value',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
    }
  }
  filterPromo() {
    this.showPro = !this.showPro
    this.showBox = !this.showBox
  }
  filterPage() {
    this.openPagen = !this.openPagen
    this.openpageBox = !this.openpageBox
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
  }

  onFormSubmit() {
    let filteredTypes = this.selectCreatetype.map((list: any) => list.guid)
    let filteredReferrerTypes = this.selectUsertypes.map((list: any) => list.guid)
    let filteredStatusGuid = this.convertedstatus.map((list: any) => list.guid)
    this.loader = true
    this.promotioncode = false;
    console.log(this.filterForm.value)
    let fillterbody = this.getDirtyValues(this.filterForm)
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["creatorMask"] = this.filterForm.value.Creator != null ? this.filterForm.value.Creator : undefined;
    fillterbody["promocodeName"] = this.filterForm.value.PromotionalCodes != null ? this.filterForm.value.PromotionalCodes : undefined,
      fillterbody["creatorType"] = filteredTypes.length == 0 ? this.CreateTypeGuids : filteredTypes;
    // fillterbody["creatorType"] = this.filterForm.value.creatorType != null ? [this.filterForm.value.creatorType] : undefined,
    fillterbody["status"] = filteredStatusGuid.length == 0 ? this.statusguid : filteredStatusGuid;
    // fillterbody["status"] = this.filterForm.value.statustype != null ? [this.filterForm.value.statustype] : undefined,
    fillterbody["usageType"] = this.promoCodeUsageArray != null ? this.promoCodeUsageArray : undefined;
    // fillterbody["usageType"] = this.filterForm.value.usagemethod != null ? [this.filterForm.value.usagemethod] : undefined,
    fillterbody["referrerType"] = filteredReferrerTypes.length == 0 ? this.createUserGuids : filteredReferrerTypes;
    // fillterbody["referrerType"] = this.filterForm.value.Referretype != null ? [this.filterForm.value.Referretype] : undefined,
    console.log(fillterbody["status"])

    fillterbody['referrerIds'] = this.isAgentExplorer ? [this.AgentGuid] : undefined;


    // let body = {
    //  "Status": this.filterForm.value.networkNames,
    // "firstRecord" : this.filterForm.value.firstRecord,
    // "maxCountRecord" : this.filterForm.value.maxCountRecord,
    // "creatorMask" : this.filterForm.value.Creator,
    // "promocodeName" : this.filterForm.value.PromotionalCodes,
    // "creatorType" : this.filterForm.value.creatorType,
    // "status" : [this.filterForm.value.statustype],
    // }

    this.promotionalServiceService.PromtionalCodes(fillterbody).subscribe((res) => this.promotiCode(res))
  }
  promotiCode(res: any) {
    this.loader = false
    this.promotioncode = res.objectList
    console.log(this.promotioncode)
    this.rowsOnthePage = res.objectList.length;
    this.ResultCount = res.resultCount;

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.promotioncode !== null) {
      this.loader = false
    }
    for (let i = 0; i < this.promotioncode.length; i++) {
      for (let m = 0; m < this.promoStatusList.length; m++) {
        this.showTable = true;
        if (this.promotioncode[i].status.lowLong == this.promoStatusList[m].guid.lowLong) {
          this.promotioncode[i].status = this.promoStatusList[m].value
        }
      }
    }
    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }

  }
  promochang(data: any) {
    console.log(data)
    this.p = 1;
    this.selectnum = data;
    this.selectnumber = data;
  }
  changeSelect(date: string) {

    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)


    return (c)

  }
  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({ firstRecord: parseInt('1') });
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
  }

  fastforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: Math.floor((this.ResultCount - 1) / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    if (this.PageCount > this.promotioncode.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );

  }

  next() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
        // console.log(typeof this.filterForm.value.firstRecord)
      });
    }
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter) + 1 + parseInt(this.filterForm.value.maxCountRecord)
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord),
      });
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    console.log(this.filterForm.value.firstRecord);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // if (this.FirstrecordFillter) {

    //   this.FirstrecordFillter++
    //   console.log(this.FirstrecordFillter)
    // }
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  prev() {
    console.log('......Hhello......');
    if (this.filterForm.value.firstRecord - 1 == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        // firstRecord:parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)-1
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1;
    if (this.PageCount > this.promotioncode.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  editPromotionalCodePopup(list: any) {
    console.log(list)
    this.EditInfo = list
    this.userType = list?.referrerMemo?.split(" ")[2]
    console.log(this.userType)
    this.isEditPromotionalCodePopup = !this.isEditPromotionalCodePopup
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
    XLSX.writeFile(wb, 'PromotinalcodeExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PromotinalcodeExcelSheet")
  }

  // *****************Status dropdown @ starts *************************************** 
  onItemSelectStatus(data: any) {
    console.log(this.convertedstatus);
  }
  OnItemDeSelectStatus(data: any) {
    console.log(this.convertedstatus);
  }
  onSelectAllStatus(data: any) {
    console.log(this.convertedstatus);
  }
  onDeSelectAllStatus(data: any) {
    console.log(this.convertedstatus);
  }
  // ********************** Status dropdown @ ends ******************************
  onItemSelectPromo(data: any) {
    this.promoCodeUsageArray = [];
    this.filterForm.value.usagemethod.forEach((item: { guid: any }) => {
      this.promoCodeUsageArray.push(item.guid);
    });
    console.log(this.promoCodeUsageArray);
  }
  OnItemDeSelectPromo(data: any) {
    this.promoCodeUsageArray = [];
    this.filterForm.value.usagemethod.forEach((item: { guid: any }) => {
      this.promoCodeUsageArray.push(item.guid);
    });
    console.log(this.promoCodeUsageArray);
  }
  onSelectAllPromo(data: any) {
    this.promoCodeUsageArray = [];
    data.forEach((item: { guid: any }) => {
      this.promoCodeUsageArray.push(item.guid);
    });
    console.log(this.promoCodeUsageArray);
  }
  onDeSelectAllPromo(data: any) {
    this.promoCodeUsageArray = [];
    data.forEach((item: { guid: any }) => {
      this.promoCodeUsageArray.push(item.guid);
    });
    console.log(this.promoCodeUsageArray);
  }
  // *******************************************************************************
  // **************************@Starts creatorTypeMultiDropDown**************************************
  onItemSelectCreatorType(data: any) {
    console.log(this.selectCreatetype)
  }

  OnItemDeSelectCreatorType(data: any) {
    console.log(this.selectCreatetype)

  }
  onSelectAllCreatorType(data: any) {
    console.log(this.selectCreatetype)
  }
  onDeSelectAllCreatorType(data: any) {
    console.log(this.selectCreatetype)
  }
  // **************************@Ends creatorTypeMultiDropDown**************************************

  // *****************RefferType dropdown @ starts *************************************** 
  onItemSelectRefType(data: any) {

    console.log(this.selectUsertypes);
  }
  OnItemDeSelectRefType(data: any) {

    console.log(this.selectUsertypes);
  }
  onSelectAllRefType(data: any) {

    console.log(this.selectUsertypes);
  }
  onDeSelectAllRefType(data: any) {

    console.log(this.selectUsertypes);
  }
  // ********************** RefferType dropdown @ ends ******************************

}












