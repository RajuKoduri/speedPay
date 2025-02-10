import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UtilityService } from 'src/app/source/utility.service';

@Component({
  selector: 'request-report',
  templateUrl: './request-report.component.html',
  styleUrls: ['./request-report.component.css']
})
export class RequestReportComponent implements OnInit {
  @Output() notifyParent = new EventEmitter()
  birthdayMonthDropdownSettings: any = {}
  selectedMonth: any;
  email: any;
  startDate: any;
  startTime: any = '00:00:00';
  endDate: any;
  endTime: any = '23:59:59.999';
  BirthdatMonthsList: any;
  BirthdatMonthsGuids: any = [];
  RequestedReportTypeList: any;
  selectedReportType: any;
  reportTypeGuids: any = [];
  reportTypeDropdownSettings: any = {};
  countrylistData: any;
  selectedCountry: any;
  countrylistCID: any = [];
  countryListDropdownSettings: any = {};
  getPlayerLevelsNamesList: any;
  selectedVIPlevel: any;
  getPlayerLevelsNamesGuids: any = [];
  VIPlevelDropdownSettings: any = {}
  palyerstatusList: any;
  selectedStatus: any;
  playerStatusGuid: any = []
  statusDropdownSettings: any = {}
  faceParametersList: any;
  selectedFaceParameters: any;
  faceParametersName: any = [];
  faceParametersDropdownSettings: any = {};

  constructor(private utilityService: UtilityService) {

  }

  ngOnInit(): void {
    this.RequestedReportType()
    this.BirthdatMonths()
    this.countrylist()
    this.getPlayerLevelsNames()
    this.palyerstatus()
    this.faceParameters()
  }

  closepopup() {
    this.notifyParent.emit()
  }

  RequestedReportType() {
    let RequestedReportType = localStorage.getItem('RequestedReportType')
    if (RequestedReportType) {
      this.RequestedReportTypeList = JSON.parse(RequestedReportType)
    }
    console.log("RequestedReportType", this.RequestedReportTypeList)

    this.selectedReportType = this.RequestedReportTypeList.map((list: any) => {
      this.reportTypeGuids.push(list.guid)
      return { guid: list.guid, value: list.value }
    })

    this.reportTypeDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }

  BirthdatMonths() {
    let BirthdatMonths = localStorage.getItem("BirthdatMonths")
    if (BirthdatMonths) {
      this.BirthdatMonthsList = JSON.parse(BirthdatMonths)
    }

    this.selectedMonth = this.BirthdatMonthsList.map((list: any) => {
      this.BirthdatMonthsGuids.push(list.guid)
      return { guid: list.guid, value: list.value }
    })

    console.log(this.selectedMonth)
    console.log(this.BirthdatMonthsGuids)

    this.birthdayMonthDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }

  countrylist() {
    let countrylist = localStorage.getItem('countrylist')
    if (countrylist) {
      this.countrylistData = JSON.parse(countrylist)
    }

    this.selectedCountry = this.countrylistData.map((list: any) => {
      this.countrylistCID.push(list.CID)
      return { CID: list.CID, title: list.title }
    })

    this.countryListDropdownSettings = {
      singleSelection: false,
      idField: 'CID',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };

  }

  getPlayerLevelsNames() {
    let getPlayerLevelsNames = localStorage.getItem('getPlayerLevelsNames')
    if (getPlayerLevelsNames) {
      this.getPlayerLevelsNamesList = JSON.parse(getPlayerLevelsNames)
    }

    console.log('getPlayerLevelsNames', this.getPlayerLevelsNamesList)

    this.selectedVIPlevel = this.getPlayerLevelsNamesList.compPointsLevels.map((list: any) => {
      this.getPlayerLevelsNamesGuids.push(list.guid)
      return { guid: list.guid, name: list.name }
    })

    console.log(this.getPlayerLevelsNamesGuids)

    this.VIPlevelDropdownSettings = {
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
    }

    this.selectedStatus = this.palyerstatusList.map((list: any) => {
      this.playerStatusGuid.push(list.guid)
      return { guid: list.guid, value: list.value }
    })

    this.statusDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }

  faceParameters() {
    let faceParameters = localStorage.getItem('faceParameters')
    if (faceParameters) {
      this.faceParametersList = JSON.parse(faceParameters)
    }

    this.selectedFaceParameters = this.faceParametersList.map((list: any) => {
      this.faceParametersName.push(list.name)
      return { name: list.name }
    })

    this.faceParametersDropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }



  onRequestReport() {
    let reportType = this.selectedReportType.map((list: any) => list.guid)
    let bdyMonth = this.selectedMonth.map((list: any) => list.guid)
    let countryCid = this.selectedCountry.map((list: any) => list.CID)
    let face = this.selectedFaceParameters.map((list: any) => list.name)
    let status = this.selectedStatus.map((list: any) => list.guid)
    let vipLevel = this.selectedVIPlevel.map((list: any) => list.guid)

    const startDateTime = this.startDate ? this.startDate + "T" + this.startTime : undefined;
    const endDateTime = this.endDate ? this.endDate + "T" + this.endTime : undefined;

    let body = {
      'report': {
        "objState": 0,
        'reportType': reportType.length == 0 ? this.reportTypeGuids : reportType,
        'filter': {
          'email': this.email ? this.email : undefined,
          'registrationDate': (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined,
          'birthdayMonth': bdyMonth.length == 0 ? this.BirthdatMonthsGuids : bdyMonth,
          'country': countryCid.length == 0 ? this.countrylistCID : countryCid,
          'face': face.length == 0 ? this.faceParametersName : face,
          'status': status.length == 0 ? this.playerStatusGuid : status,
          'vipLevel': vipLevel.length == 0 ? this.getPlayerLevelsNamesGuids : vipLevel,
        }
      }
    }
    console.log(body)
    this.utilityService.createRequestedReport(body).subscribe((data: any) => {
      console.log(data)
    })

  }

}
