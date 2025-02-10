import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { ToolsService } from 'src/app/source/Tools.service';
import { TotalSumsService } from 'src/app/source/total-sums.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-playermailinglist',
  templateUrl: './playermailinglist.component.html',
  styleUrls: ['./playermailinglist.component.css']
})
export class PlayermailinglistComponent implements OnInit {
  FillterMenu: boolean = false;
  loader: boolean = false;
  filterForm: FormGroup;
  TemplateCreationTypesList: any;
  filteredTemplateCreationTypes: any;
  faceParametersList: any;
  selectedFaces: any;
  faceParaNames: any = [];
  faceParaDropdownSettings: any = {};
  getPlayerLevelsNamesList: any;
  playerLevelGuids: any = [];
  selectedPlayerLevels: any;
  playerLevelDropdownSettings: any = {}
  palyerstatusList: any;
  selectedPlayerStatus: any;
  playerStatusGuids: any = [];
  playerStatusDropdownSettings: any = {};

  startDate: any;
  endDate: any;
  todaydate: any;
  timeerror: boolean = false
  steddate: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  ResultCount: any;
  PageCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  pagecontrolbtn: any;

  isFilterPopup: boolean = false;
  templateList: any;
  isEmailTemp: boolean = false;
  playerMailingList: any;
  selectedTempforMail: any;
  isMailSend: boolean = false;
  totalSum: any;
  SeletedIconIndex: any;
  popupArrow: boolean = false;
  isChangePermissionGroup: boolean = false;
  PlayerInfo: any;
  selectedRowData: any;
  isDoubleClick: boolean = false;

  constructor(private FileformatServiceService: FileformatServiceService, private CommomfilterService: CommomfilterService,
    private Toolsservice: ToolsService, private totalSumService: TotalSumsService, private PlayerserviceService:PlayerServiceService) {
    this.filterForm = new FormGroup({
      accountMask: new FormControl(),
      depositsCountFrom: new FormControl(),
      depositsCountTo: new FormControl(),
      notLoggedInForLow: new FormControl(),
      notLoggedInForHigh: new FormControl(),
      emailMask: new FormControl(),
      playerLevel: new FormControl(),
      userStatus: new FormControl(),
      facePara: new FormControl(),

      firstRecord: new FormControl(1, this.CommomfilterService.requiredAndMinOne()),
      maxCountRecord: new FormControl(100, this.CommomfilterService.requiredAndMinOne()),
      startDate: new FormControl(this.startDate,),
      endDate: new FormControl(this.endDate,),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.TemplateCreationTypes();
    this.faceParameters();
    this.getPlayerLevelsNames();
    this.palyerstatus()

  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  filterPopup() {
    this.isFilterPopup = !this.isFilterPopup
  }

  emailTempPopup(message: any) {
    if (message == 'emailTemp') {
      this.isEmailTemp = !this.isEmailTemp
    } else {
      this.isMailSend = !this.isMailSend
    }
  }

  sendMail() {
    let body = {
      "letterTemplate": this.selectedTempforMail
    }
    this.Toolsservice.sendMail(body).subscribe((res: any) => console.log(res))
  }

  onView() {
    this.onFormSubmit()
    this.isFilterPopup = false;
  }

  onSend() {
    this.isFilterPopup = false;
    this.popupArrow = false;
    this.Toolsservice.getMailTemplatesByType(this.filteredTemplateCreationTypes.guid).subscribe((res => {
      console.log(res)
      this.templateList = res.objectList;
      this.sendMailforPlayer()
    }))
  }

  sendMailforPlayer() {
    this.selectedTempforMail = this.templateList[0]?.guid
    if (this.templateList.length == 0) {
      this.isEmailTemp = true;
    } else {
      this.isMailSend = true;
    }
  }

  TemplateCreationTypes() {
    let TemplateCreationTypes = localStorage.getItem('TemplateCreationTypes')
    if (TemplateCreationTypes) {
      this.TemplateCreationTypesList = JSON.parse(TemplateCreationTypes)
    }
    this.filteredTemplateCreationTypes = this.TemplateCreationTypesList.find((list: any) => list.value == 'Mass email template for Players')
    console.log(this.filteredTemplateCreationTypes)
  }

  faceParameters() {
    let faceParameters = localStorage.getItem('faceParameters')
    if (faceParameters) {
      this.faceParametersList = JSON.parse(faceParameters)
      this.selectedFaces = this.faceParametersList.map((list: any) => {
        this.faceParaNames.push(list.name)
        return list.name
      })

      this.faceParaDropdownSettings = {
        singleSelection: false,
        idField: 'name',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false,
      };
    }


  }

  getPlayerLevelsNames() {
    let getPlayerLevelsNames = localStorage.getItem('getPlayerLevelsNames')
    if (getPlayerLevelsNames) {
      this.getPlayerLevelsNamesList = JSON.parse(getPlayerLevelsNames)

      this.selectedPlayerLevels = this.getPlayerLevelsNamesList.compPointsLevels.map((list: any) => {
        this.playerLevelGuids.push(list.guid)
        return { name: list.name, guid: list.guid }
      })
    }

    this.playerLevelDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }

  palyerstatus() {
    let palyerstatus = localStorage.getItem('palyerstatus')
    if (palyerstatus) {
      this.palyerstatusList = JSON.parse(palyerstatus)

      this.selectedPlayerStatus = this.palyerstatusList.map((list: any) => {
        this.playerStatusGuids.push(list.guid)
        return { guid: list.guid, value: list.value }
      })
    }

    this.playerStatusDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
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

  checkBoxChange(data: any) {
    console.log(data)
    let body = {
      'queryId':'000000000000047800000000000388c2',
      "records": [{
        "guid": data.guid,
        "selection": data.selection,
        "objState": 0
      }]
    }
    this.changeMailingListRecordState(body);
  }

  changeMailingListRecordState(body: any) {
    this.Toolsservice.changeMailingListRecordState(body).subscribe((res: any) => {
      console.log(res)
    })
  }

  OnActions(data: any, actionType: any) {
    let hex = '000000000000047800000000000388c2'
    let part1 = parseInt(hex.slice(0,16),16);
    let part2 = parseInt(hex.slice(16),16);
    console.log(part1,part2)

    let body = {
      'queryId':'000000000000047800000000000388c2',
      "records": [{
        "guid": data.guid,
        "selection": data.selection,
        "objState": 0
      }]
    }

    switch (actionType) {
      case "checkSelection":
        body.records[0].selection = true
        this.changeMailingListRecordState(body);
        break;
      case 'uncheckSelection':
        body.records[0].selection = false;
        this.changeMailingListRecordState(body);
        break;
      case "invertSelection":
        body.records[0].selection = data.selection ? false : true,
        this.changeMailingListRecordState(body);
        break;
      case 'checkPage':
      case 'checkAll':
        let changedRecord = this.playerMailingList.map((list:any)=>{
          return {guid:list.guid,selection:true,objState:0}
        })

        let body1 = {
          'queryId':'000000000000047800000000000388c2',
          "records":changedRecord
        }
        this.changeMailingListRecordState(body1);
        break;
      case 'uncheckPage':
      case 'uncheckAll':
        let changedRecord1 = this.playerMailingList.map((list:any)=>{
          return {guid:list.guid,selection:false,objState:0}
        })

        let body2 = {
          'queryId':'000000000000047800000000000388c2',
          "records":changedRecord1
        }
        this.changeMailingListRecordState(body2);
        break;

    }
    
  }

  getWalletSymbol(wallet: any) {
    return this.totalSumService.walletSymbol(wallet)
  }

  getTotalSum() {
    this.totalSum = this.totalSumService.calculateSum(this.playerMailingList, "balance");
    console.log(this.totalSum)
  }

  keys(data: any) {
    return Object.keys(data)
  }

  showmanu(i: any, guid: any) {
    this.SeletedIconIndex = i;
    this.popupArrow = !this.popupArrow;
    // this.PlayerGuid = guid;
  }

  changePermissionGroupPopup(data: any) {
    this.PlayerInfo = data
    this.isChangePermissionGroup = !this.isChangePermissionGroup
  }


  onFormSubmit() {
    console.log(this.filterForm.value);
    this.FillterMenu = false;
    this.loader = true;
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)

    let levelGuids = this.selectedPlayerLevels.map((list: any) => list.guid)
    let userStatus = this.selectedPlayerStatus.map((list: any) => list.guid)

    let { emailMask, accountMask, firstRecord, maxCountRecord, depositsCountTo,
      depositsCountFrom, notLoggedInForHigh, notLoggedInForLow } = this.filterForm.value

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;

    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;


    fillterbody["firstRecord"] = firstRecord - 1
    fillterbody["maxCountRecord"] = maxCountRecord
    fillterbody["emailMask"] = emailMask ? emailMask : undefined;
    fillterbody["accountMask"] = accountMask ? accountMask : undefined;
    fillterbody["levelGuids"] = levelGuids.length == 0 ? this.playerLevelGuids : levelGuids;
    fillterbody["userStatus"] = userStatus.length == 0 ? this.playerStatusGuids : userStatus;
    fillterbody["depositsCount"] = (depositsCountTo || depositsCountFrom) ? {
      to: depositsCountTo ? depositsCountTo : undefined,
      from: depositsCountFrom ? depositsCountFrom : undefined
    } : undefined;
    fillterbody["notLoggedInFor"] = (notLoggedInForHigh || notLoggedInForLow) ? {
      high: notLoggedInForHigh ? notLoggedInForHigh : undefined,
      low: notLoggedInForLow ? notLoggedInForLow : undefined
    } : undefined;
    fillterbody["haveOpennedAccount"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;


    this.Toolsservice.getMailTemplatesByType(this.filteredTemplateCreationTypes.guid).subscribe((res => this.playerMallingResData(res)))
    this.Toolsservice.getMailingList(fillterbody).subscribe((res: any) => { this.getMailingList(res) })
  }

  getMailingList(data: any) {
    console.log(data)
    this.loader = false;
    this.playerMailingList = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;
    this.resultcount = false;

    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.getTotalSum()
  }

  playerMallingResData(data: any) {
    console.log(data)
    this.templateList = data.objectList

    if (data.objectList.length == 0) {
      this.isEmailTemp = true;
    }

  }

  onDblClick(list:any){
    console.log(list)
    this.selectedRowData = list;
    this.isDoubleClick = true
  }

  closeClicPopUp(){
    this.isDoubleClick = !this.isDoubleClick
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
  timechange(data: any) {
    console.log(data.target.value)
    console.log(this.filterForm.value.startTime)
    console.log(this.filterForm.value.endTime)
    if (this.filterForm.value.startDate == this.filterForm.value.endDate) {
      if (this.filterForm.value.startTime > this.filterForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }

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
    this.pagecontrolbtn = true;
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
    if (this.PageCount > this.playerMailingList.length) {
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
    if (this.PageCount > this.playerMailingList.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    // this.rowsOnthePage = res.objectList.length;
  }

  PlayerExplore(name:any, guid:any, list:any){
    this.PlayerserviceService.PlayerExplore(name, guid, list)
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'PlyerMailingExcelSheet.xlsx';
    XLSX.writeFile(wb, 'PlyerMailingExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "PlyerlistExcelSheet")
  }

}
