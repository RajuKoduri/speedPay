import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';

@Component({
  selector: 'app-agent-ip-history',
  templateUrl: './agent-ip-history.component.html',
  styleUrls: ['./agent-ip-history.component.css']
})
export class AgentIpHistoryComponent implements OnInit {
  Agentguid: any;
  FillterMenu: boolean = true;
  IpHistoryForm: FormGroup;
  rowsOnthePage: any;
  ResultCount: any;
  loader: boolean = false;
  IpHistoryData: any;
  LoginTypeList: any;

  endDate: any;
  startDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false

  LOgoutendDate: any;
  LOgoutstartDate: any;
  LOgouttodaydate: any;
  LOgoutstartTime: any = "00:00:00"
  LOgoutendTime: any = "23:59:59"
  LOgoutsteddate: boolean = false
  LOgouttimeerror: boolean = false

  selectTypelist: any = [];
  statusGuid: any = [];
  dropdownSettingsGuids = {};

  constructor(private AgentControlService: AgentControlService, private DateTimePipe: DateTimePipe,
    private FileformatServiceService: FileformatServiceService) {
    this.IpHistoryForm = new FormGroup({
      LoginDateFrom: new FormControl(),
      LoginDateTo: new FormControl(),
      LogoutFrom: new FormControl(),
      LogoutTo: new FormControl(),
      IpAddress: new FormControl(),
      Status: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      enddate: new FormControl(),

      LOgoutstartDate: new FormControl(this.startDate, Validators.required),
      LOgoutendDate: new FormControl(this.endDate, Validators.required),
      LOgoutstartTime: new FormControl(),
      LOgoutendTime: new FormControl(),
      LOgoutenddate: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.Agentguids();
    this.StatusIP();

    this.endDate = new Date();
    let today = new Date(this.endDate?.getFullYear(), this.endDate?.getMonth(), this.endDate?.getDate() - 7);
    let endday = new Date(this.endDate?.getFullYear(), this.endDate?.getMonth(), this.endDate?.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    // *************LOgout**
    this.LOgoutendDate = new Date();
    let todayLOgout = new Date(this.LOgoutendDate?.getFullYear(), this.LOgoutendDate?.getMonth(), this.LOgoutendDate?.getDate() - 7);
    let enddayLOgout = new Date(this.LOgoutendDate?.getFullYear(), this.LOgoutendDate?.getMonth(), this.LOgoutendDate?.getDate());
    this.LOgoutstartDate
    let dateeLOgout = moment(new Date(todayLOgout)).format('YYYY-MM-DD');
    let dateELOgout = moment(new Date(enddayLOgout)).format('YYYY-MM-DD');
    this.LOgoutstartDate = dateeLOgout;
    this.LOgoutendDate = dateELOgout;
    this.LOgouttodaydate = moment(new Date()).format('YYYY-MM-DD');

  }

  changeSelect(date: any) {

    const formatDate = this.DateTimePipe.transforminingDispalyDate(date);
    return formatDate

  }
  Agentguids() {
    const Agentguid = sessionStorage.getItem('Agentguid');
    console.log(Agentguid)
    if (Agentguid) {
      this.Agentguid = JSON.parse(Agentguid)
    }
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
  StatusIP() {
    const LoginType = localStorage.getItem('LoginType');
    if (LoginType) {
      this.LoginTypeList = JSON.parse(LoginType)
      console.log(this.LoginTypeList)

      for (let i = 0; i < this.LoginTypeList.length; i++) {
        this.statusGuid.push(this.LoginTypeList[i].guid)
        this.selectTypelist[i] = {
          value: this.LoginTypeList[i].value,
          guid: this.LoginTypeList[i].guid
        }
      }
      console.log(this.LoginTypeList)

      // this.copyStatusGuids = this.statusGuid
      console.log(this.statusGuid)

      this.dropdownSettingsGuids = {
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
  onFormSubmit() {

    let selectedStatusGuid = this.selectTypelist.map((list:any)=>list.guid)

    this.loader = true;
    this.IpHistoryData = false;
    let body = {
      "agentIds": [this.Agentguid],
      "ipAddress": this.IpHistoryForm.value.IpAddress != null ? this.IpHistoryForm.value.IpAddress : undefined,
      // "loginDate": this.IpHistoryForm.value.LoginDateFrom != null ? {
      //   "end": this.IpHistoryForm.value.LoginDateFrom,
      //   "start": this.IpHistoryForm.value.LoginDateTo
      // } : undefined,
      "loginDate": (this.IpHistoryForm.value.startDate != null && this.IpHistoryForm.value.startDate !== "") ? { "start": this.IpHistoryForm.value.startDate + "T" + this.IpHistoryForm.value.startTime, "end": this.IpHistoryForm.value.endDate + "T" + this.IpHistoryForm.value.endTime } :
        (this.IpHistoryForm.value.endDate != null && this.IpHistoryForm.value.endDate != "") ? { "end": this.IpHistoryForm.value.endDate + "T" + this.IpHistoryForm.value.endTime } : undefined,
      // "logoutDate": this.IpHistoryForm.value.LogoutFrom != null ? {
      //   "end": this.IpHistoryForm.value.LogoutFrom,
      //   "start": this.IpHistoryForm.value.TO
      // } : undefined,
      "logoutDate": (this.IpHistoryForm.value.LOgoutstartDate != null && this.IpHistoryForm.value.LOgoutstartDate !== "") ? { "start": this.IpHistoryForm.value.LOgoutstartDate + "T" + this.IpHistoryForm.value.LOgoutstartTime, "end": this.IpHistoryForm.value.LOgoutendDate + "T" + this.IpHistoryForm.value.LOgoutendTime } :
        (this.IpHistoryForm.value.LOgoutendDate != null && this.IpHistoryForm.value.LOgoutendDate != "") ? { "end": this.IpHistoryForm.value.LOgoutendDate + "T" + this.IpHistoryForm.value.LOgoutendTime } : undefined,

      // "loginType": this.IpHistoryForm.value.Status != null ? [this.IpHistoryForm.value.Status] : undefined,
      "loginType": selectedStatusGuid.length == 0 ? this.statusGuid : selectedStatusGuid,
      "firstRecord": this.IpHistoryForm.value.firstRecord - 1,
      "maxCountRecord": Number(this.IpHistoryForm.value.maxCountRecord),
      "queryId": ""
    }
    console.log(body);
    this.AgentControlService.getAgentIpHistory(body).subscribe((data) => {
      console.log(data);
      this.loader = false;
      if (data.objectList) {
        this.IpHistoryData = data.objectList;
        this.rowsOnthePage = data.objectList?.length;
        this.ResultCount = data.resultCount;
        for (let i = 0; i < this.IpHistoryData.length; i++) {
          for (let j = 0; j < this.LoginTypeList.length; j++) {
            if (this.IpHistoryData[i].agent.status.lowLong == this.LoginTypeList[j].guid.lowLong) {
              this.IpHistoryData[i].agent.status = this.LoginTypeList[j].value;
            }
          }
        }
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
    XLSX.writeFile(wb, 'IpHistoryExcelSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "IpHistoryExcelSheet")

  }

  showDate(data: any) {
    console.log(this.IpHistoryForm.value.endDate)
    if (this.IpHistoryForm.value.startDate > this.IpHistoryForm.value.endDate) {

      this.steddate = true;
    } else {
      this.steddate = false;
    }

    if (this.IpHistoryForm.value.startDate == this.IpHistoryForm.value.endDate) {
      if (this.IpHistoryForm.value.startTime > this.IpHistoryForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    } else {
      this.timeerror = false;
    }

    this.IpHistoryForm.valueChanges.subscribe(x => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.startDate).getTime() > new Date(x.endDate).getTime() || new Date(x.endDate).getTime() > ToDate.getTime()) {
        console.log("indirect")
        console.log(this.IpHistoryForm.value.endDate)
        this.steddate = true;
      } else {
        this.steddate = false;
      }
    });
  }
  timechange(data: any) {
    console.log(data.target.value)
    console.log(this.IpHistoryForm.value.startTime)
    console.log(this.IpHistoryForm.value.endTime)
    if (this.IpHistoryForm.value.startDate == this.IpHistoryForm.value.endDate) {
      if (this.IpHistoryForm.value.startTime > this.IpHistoryForm.value.endTime) {
        this.timeerror = true;
      } else {
        this.timeerror = false;
      }
    }
  }

  // **********
  LOgoutshowDate(data: any) {
    console.log(this.IpHistoryForm.value.LOgoutendDate)
    if (this.IpHistoryForm.value.LOgoutstartDate > this.IpHistoryForm.value.LOgoutendDate) {

      this.LOgoutsteddate = true;
    } else {
      this.LOgoutsteddate = false;
    }

    if (this.IpHistoryForm.value.LOgoutstartDate == this.IpHistoryForm.value.LOgoutendDate) {
      if (this.IpHistoryForm.value.LOgoutstartTime > this.IpHistoryForm.value.LOgoutendTime) {
        this.LOgouttimeerror = true;
      } else {
        this.LOgouttimeerror = false;
      }
    } else {
      this.LOgouttimeerror = false;
    }

    this.IpHistoryForm.valueChanges.subscribe(x => {
      let yearsDiff = 0;
      var ToDate = new Date();
      var pastYear = ToDate.getFullYear() - yearsDiff;
      ToDate.setFullYear(pastYear);
      if (new Date(x.startDate).getTime() > ToDate.getTime() || new Date(x.LOgoutstartDate).getTime() > new Date(x.LOgoutendDate).getTime() || new Date(x.LOgoutendDate).getTime() > ToDate.getTime()) {
        console.log("indirect")
        console.log(this.IpHistoryForm.value.LOgoutendDate)
        this.LOgoutsteddate = true;
      } else {
        this.LOgoutsteddate = false;
      }
    });
  }
  LOgouttimechange(data: any) {
    console.log(data.target.value)
    console.log(this.IpHistoryForm.value.LOgoutstartTime)
    console.log(this.IpHistoryForm.value.LOgoutendTime)
    if (this.IpHistoryForm.value.LOgoutstartDate == this.IpHistoryForm.value.LOgoutendDate) {
      if (this.IpHistoryForm.value.LOgoutstartTime > this.IpHistoryForm.value.LOgoutendTime) {
        this.LOgouttimeerror = true;
      } else {
        this.LOgouttimeerror = false;
      }
    }
  }

  //  ************************************* @Status Dropdown Starts*********************************
  onItemSelectSTatus(data: any) {
    console.log(this.selectTypelist)
  }
  OnItemDeSelectSTatus(data: any) {
    console.log(this.selectTypelist)
  }
  onSelectAllSTatus(data: any) {
    console.log(this.selectTypelist)
  }
  onDeSelectAllSTatus(data: any) {
    console.log(this.selectTypelist)
  }
  //  ************************************* @Status Dropdown ends****""""""""""""""""

}
