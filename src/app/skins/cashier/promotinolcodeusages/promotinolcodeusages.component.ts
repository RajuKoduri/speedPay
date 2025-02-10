import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CashierService } from 'src/app/source/Cashier.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
@Component({
  selector: 'app-promotinolcodeusages',
  templateUrl: './promotinolcodeusages.component.html',
  styleUrls: ['./promotinolcodeusages.component.css']
})
export class PromotinolcodeusagesComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  loader: boolean = false;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  PromotionalData: any;
  PromoCodeStatusList: any;
  PromoCodeUsageTypeList: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

  convertedStatus: any = [];
  sattusguids: any = [];
  dropdownListStatus: any = [];
  dropdownsettingStatus = {};

  PromoCodeUsageList: any;
  selectpromocode: any = [];
  promoCodeUsageArray: any = [];
  promoCodeDropdownList: any = [];
  DropdownSettingsPromo = {};
  location: any;
  playerExplorer: boolean = false;
  agentExplorer: boolean = false;
  PlayerguidList: any;
  agentGuidList: any;

  constructor(private Cashierservice: CashierService, private FileformatServiceService: FileformatServiceService,
    private DateTimePipe: DateTimePipe, private PlayerserviceService: PlayerServiceService
  ) {
    this.filterForm = new FormGroup({
      DatePeriodfrom: new FormControl(),
      DatePeriodTo: new FormControl(),
      Promotionalcode: new FormControl(),
      Status: new FormControl(),
      Player: new FormControl(),
      RefferedTo: new FormControl(),
      Face: new FormControl(),
      UsageMethod: new FormControl(),
      Deposit: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.PromoCodeUsageStatus()
    this.PromoCodeUsageType()

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
    this.playerExplorerCheck()
  }
  playerExplorerCheck() {
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location);
    if (this.location == "/playerexplorer/promotinolcodeusages") {
      this.playerExplorer = true;
      this.agentExplorer = false;
      this.PlayerGuid();
    }  else if (this.location == "/Agentexplorer/promotinolcodeusages") {
      this.agentExplorer = true;
      this.playerExplorer = false;
      this.AgentGuid();
    } else {
      this.playerExplorer = false;
      this.agentExplorer = false;
    }
  }
  PlayerGuid() {
    let Playerguid = sessionStorage.getItem("Playerguid");
    if (Playerguid) {
      this.PlayerguidList = JSON.parse(Playerguid)
    }
    console.log(this.PlayerguidList)
  }

  AgentGuid(){
    let Agentguid = sessionStorage.getItem("Agentguid")
    if(Agentguid){
      this.agentGuidList = JSON.parse(Agentguid)
    }
    console.log(this.agentGuidList)
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  PromoCodeUsageStatus() {
    const PromoCodeUsageStatus = localStorage.getItem("PromoCodeUsageStatus")
    if (PromoCodeUsageStatus) {
      this.PromoCodeStatusList = JSON.parse(PromoCodeUsageStatus)
    }
    this.convertedStatus = []
    console.log(this.PromoCodeStatusList)
    for (let i = 0; i < this.PromoCodeStatusList.length; i++) {
      this.convertedStatus.push(this.PromoCodeStatusList[i])
    }
    this.PromoCodeStatusList.forEach((item: any, i: any) => {
      this.convertedStatus[i] = {
        value: this.PromoCodeStatusList[i].value,
        guid: this.PromoCodeStatusList[i].guid
      }
    });
    this.convertedStatus.forEach((item: any) => {
      this.sattusguids.push(item.guid)
    })

    console.log(this.convertedStatus);
    console.log(this.sattusguids)
    this.dropdownListStatus = this.PromoCodeStatusList
    console.log(this.dropdownListStatus)

    this.dropdownsettingStatus = {
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
    this.loader = true
    this.PromotionalData = false;
    this.FillterMenu = false;
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = (this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["usageType"] = this.promoCodeUsageArray != null ? this.promoCodeUsageArray : undefined;
    // fillterbody["reportPeriod"] = this.filterForm.value.DatePeriodfrom != null ? { "start": this.filterForm.value.DatePeriodfrom, "end": this.filterForm.value.DatePeriodTo } : undefined;


    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["reportPeriod"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;

    if (this.playerExplorer) {
      fillterbody["idList"] = [this.PlayerguidList]
    }
    if(this.agentExplorer){
      fillterbody['referrerIds']=[this.agentGuidList]
    }
    this.Cashierservice.getPromotionalCodeUsages(fillterbody).subscribe((res) => this.PromotionalResData(res))
  }

  PromotionalResData(data: any) {
    console.log(data)
    this.PromotionalData = data.objectList
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.PromotionalData != null) {
      this.loader = false;
    }
    // for(let i=0; i<this.PromotionalData.length; i++){

    //   if (!this.PromotionalData[i].flatCashReward) {
    //     Object.assign(this.PromotionalData[i], { flatCashReward: '' })
    //   }
    //   if (!this.PromotionalData[i].flatBonusReward) {
    //     Object.assign(this.PromotionalData[i], { flatBonusReward: '' })
    //   }
    // }
    for (let i = 0; i < this.PromotionalData.length; i++) {

      for (let j = 0; j < this.PromoCodeStatusList.length; j++) {
        if (this.PromotionalData[i].status.lowLong == this.PromoCodeStatusList[j].guid.lowLong) {
          this.PromotionalData[i].status = this.PromoCodeStatusList[j].value
        }
      }
      for (let k = 0; k < this.PromoCodeUsageTypeList.length; k++) {
        if (this.PromotionalData[i].usageType.lowLong == this.PromoCodeUsageTypeList[k].guid.lowLong && this.PromotionalData[i].usageType.hiLong == this.PromoCodeUsageTypeList[k].guid.hiLong) {
          this.PromotionalData[i].usageTypeName = this.PromoCodeUsageTypeList[k].value
        }
      }


    }
    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }

  }
  hexaValue(data: any) {
    let hexadecimalValue = data?.hiLong.toString(16).padStart(16, '0') + data?.lowLong.toString(16).padStart(16, '0');
    return hexadecimalValue? hexadecimalValue:undefined;
  }

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }
  splittransform(value: any): string {
    if (!value) return '';
    const parts = value.split('\n\n');
    return parts[0] || '';
  }
  transformDate(date: string): any {
    if (date != undefined) {
      let c = this.DateTimePipe.transforminingDispalyDate(date);
      return (c)

    }
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
    XLSX.writeFile(wb, 'PromotionalCodeUsagesExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerBalanceExeclSheet")
  }

  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    } else
      this.filterForm.patchValue({
        firstRecord: parseInt('1'),
      });
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
        // firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        firstRecord : Math.floor((this.ResultCount-1) / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
      });

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    if (this.PageCount > this.PromotionalData.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);

  }

  next() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
      });
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord),
      });
    console.log(this.filterForm.value.firstRecord);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    // if (this.FirstrecordFillter) {

    //   this.FirstrecordFillter++
    //   console.log(this.FirstrecordFillter)
    // }
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
    if (this.PageCount > this.PromotionalData.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }




  timechnage(data: any) {
    console.log(data.target.value)
  }
  showDate(data: any) {
    console.log(this.filterForm.value.endDate)
    if (this.filterForm.value.startDate > this.filterForm.value.endDate) {

      this.steddate = true;
    } else {
      this.steddate = false;
    }

    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    } else {
      this.timeerror = false;
    }

    this.filterForm.valueChanges.subscribe(x => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()) {
        console.log("indirect")
        console.log(this.filterForm.value.endDate)
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    });
  }

  // *****************Status dropdown @ starts *************************************** 
  onItemSelectStatus(data: any) {
    this.convertedStatus = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.Status.forEach((item: { name: string }) => {
      this.convertedStatus.push(item.name);
    });

    console.log(this.convertedStatus);
  }
  OnItemDeSelectStatus(data: any) {
    this.convertedStatus = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.Status.forEach((item: { name: string }) => {
      this.convertedStatus.push(item.name);
    });
    console.log(this.convertedStatus);
  }
  onSelectAllStatus(data: any) {
    this.convertedStatus = [];
    data.forEach((item: { name: string }) => {
      this.convertedStatus.push(item.name);
    });
    console.log(this.convertedStatus);
  }
  onDeSelectAllStatus(data: any) {
    this.convertedStatus = [];
    data.forEach((item: { name: string }) => {
      this.convertedStatus.push(item.name);
    });
    console.log(this.convertedStatus);
  }
  // ********************** Status dropdown @ ends ******************************

  // ********************** Status dropdown @ ends ******************************
  onItemSelectPromo(data: any) {
    this.promoCodeUsageArray = [];
    this.filterForm.value.UsageMethod.forEach((item: { guid: any }) => {
      this.promoCodeUsageArray.push(item.guid);
    });
    console.log(this.promoCodeUsageArray);
  }
  OnItemDeSelectPromo(data: any) {
    this.promoCodeUsageArray = [];
    this.filterForm.value.UsageMethod.forEach((item: { guid: any }) => {
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
}


