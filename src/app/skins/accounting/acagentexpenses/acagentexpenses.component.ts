import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { AccountingService } from 'src/app/source/accounting.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';

@Component({
  selector: 'app-acagentexpenses',
  templateUrl: './acagentexpenses.component.html',
  styleUrls: ['./acagentexpenses.component.css']
})
export class AcagentexpensesComponent implements OnInit {
  filterForm: FormGroup;
  FillterList: boolean = true;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  p: number = 1;
  selectnum: number = 15;
  tablePrint: any;
  dataPrint: any;
  walletstypes: any;
  wallettypelist: any = [];
  faceParameterslist: any = [];
  dataLoader: boolean = false;
  agentExpenses: any;
  agentsExpopup: boolean = false;
  subAgents: any = [];
  currencys: any = [];
  Agentstatus: any = [];
  value: any;
  obj: any;
  SUM: any;
  openingBalanceValue: any;
  payableForPlayerValue: any;
  payableForPlayerChargebacksValue: any;
  payableForAgentValue: any;
  revenueAdjustmentsValue: any;
  totalTurnoverValue: any;
  paidForPeriodValue: any;
  closingBalanceValue: any;
  selectedCurrency: any;
  pagecontrolbtn: boolean = false;
  PageCount: number = 0;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

  constructor(private accountingService: AccountingService,private FileformatServiceService : FileformatServiceService) {
    this.filterForm = new FormGroup({
      currency: new FormControl(), 
      agentLogin: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      face: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.walletTypes();
    this.faceParameters()

    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');
  }
  ignoreContext() {
    this.agentExpenses = [];
    this.dataLoader = true;
    this.agentExpenses = false;
  }

  fillterMenu() {
    this.FillterList = !this.FillterList;
  }
  exportExcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'agentExpensesExeclSheet.xlsx';
    XLSX.writeFile(wb, 'agentExpenseExeclSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "agentExpenseExeclSheet")
  }
  onFormSubmit() {
    this.FillterList = false;
    this.dataLoader = true;
    this.agentExpenses = false;
    console.log(this.filterForm.value)
    // let body = {
    //   "wallet" : this.filterForm.value.currency != null ? this.filterForm.value.currency : undefined,
    //   "reportingPeriod": this.filterForm.value.reportingPeriodTo != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined,
    //   "agentLogin" : this.filterForm.value.agentLogin != null ? this.filterForm.value.agentLogin : undefined,
    //   "agentFirstName" : this.filterForm.value.firstName != null ? this.filterForm.value.firstName : undefined,
    //   "agentLastName" : this.filterForm.value.lastName != null ? this.filterForm.value.lastName : undefined,
    //   "agentNetwork" : this.filterForm.value.face != null ? [this.filterForm.value.face] : undefined,
    //   "firstRecord": this.filterForm.value.firstRecord,
    //   "maxCountRecord" : this.filterForm.value.pageSize
    // }
    let fillterbody = this.getValues(this.filterForm)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    console.log(fillterbody)
    fillterbody["firstRecord"] = (this.filterForm.value.firstRecord - 1)
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    fillterbody["network"] = this.filterForm.value.face != null ? [this.filterForm.value.face] : undefined
    fillterbody["wallet"] = this.filterForm.value.currency != null ? this.filterForm.value.currency : undefined
    fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime,
    "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "")? {"end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime }: undefined
    // fillterbody["reportPeriod"] = this.filterForm.value.reportingPeriodTo != null ? { "start": this.filterForm.value.reportingPeriodFrom, "end": this.filterForm.value.reportingPeriodTo } : undefined
    fillterbody["agentLogin"] = this.filterForm.value.agentLogin != null ? this.filterForm.value.agentLogin : undefined
    fillterbody["agentFirstName"] = this.filterForm.value.firstName != null ? this.filterForm.value.firstName : undefined
    fillterbody["agentLastName"] = this.filterForm.value.lastName != null ? this.filterForm.value.lastName : undefined
    // fillterbody["agentNetwork"] = this.filterForm.value.face != null ? [this.filterForm.value.face] : undefined
    console.log(this.filterForm.value.currency);
    console.log(this.filterForm.value.reportingPeriodFrom);
    console.log(this.filterForm.value.reportingPeriodTo);
    console.log(this.filterForm.value.agentLogin);
    console.log(this.filterForm.value.firstName);
    console.log(this.filterForm.value.lastName);
    console.log(this.filterForm.value.face);
    console.log(this.filterForm.value.firstRecord);
    console.log(this.filterForm.value.pageSize);

    this.accountingService.AgentExpensesList(fillterbody).subscribe((res) => { this.getAgentExpensesData(res) })
  }
  getValues(form: any) {
    let Values: any = {};
    Object.keys(form.controls)
      .forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls)
            Values[key] = this.getValues(currentControl);
        }
      });
    return Values;

  }
  onPrint() {
    this.tablePrint = document.getElementById("tablerecords");
    this.dataPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    console.log(this.tablePrint)
    console.log(this.dataPrint)
    this.dataPrint.document.write(this.tablePrint.innerHTML);
    this.dataPrint.document.close();
    this.dataPrint.focus();
    this.dataPrint.print();
    this.dataPrint.close();
  }
  getAgentExpensesData(data: any) {
    console.log(data)
    this.dataLoader = false;
    this.agentExpenses = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;
    console.log(this.agentExpenses)
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.agentExpenses != null) {
      this.dataLoader = false;
    }
    this.sumOfRow(this.agentExpenses)

    for (let i = 0; i < this.agentExpenses.length; i++) {
      for (let m = 0; m < this.wallettypelist.length; m++) {
        if (this.agentExpenses[i].currencys?.lowLong == this.wallettypelist[m].guid.lowLong) {
          this.agentExpenses[i].currencys = this.wallettypelist[m].value
        }
      }
    }
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount || this.ResultCount == this.rowsOnthePage)) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }
  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist)
      for (let i = 0; i < this.wallettypelist.length; i++) {
        if (this.wallettypelist[i].description == "Free Money" || this.wallettypelist[i].description == "Play Money" || this.wallettypelist[i].description == "Comp Points") {
          // this.currencys.push(this.wallettypelist[i])
          // console.log(this.wallettypelist[i])
        } else {
          this.currencys.push(this.wallettypelist[i])
        }
        console.log(this.currencys)
      }
      this.selectedCurrency = this.currencys[0].guid
    }
  }
  faceParameters() {
    const faceParameterslist = localStorage.getItem('faceParameters')
    if (faceParameterslist) {
      this.faceParameterslist = JSON.parse(faceParameterslist)
      console.log(this.faceParameterslist)
    }
  }
  onClick(event: any) {
    console.log(event)
    this.subAgents = this.agentExpenses[event]
    console.log(this.subAgents)
    this.agentsExpopup = true;
  }
  openAgentsPop() {
    this.agentsExpopup = true;
  }
  closePopup() {
    this.agentsExpopup = false;
  }
  sumOfRow(data: any) {
    this.obj = data
    console.log(this.obj);
    this.openingBalanceValue = this.obj.reduce((a: any, b: { openingBalance: any; }) => (a + b.openingBalance.value), 0);
    console.log(this.openingBalanceValue)
    this.payableForPlayerValue = this.obj.reduce((a: any, b: { payableForPlayer: any; }) => (a + b.payableForPlayer.value), 0);
    console.log(this.payableForPlayerValue)
    this.payableForPlayerChargebacksValue = this.obj.reduce((a: any, b: { payableForPlayerChargebacks: any; }) => (a + b.payableForPlayerChargebacks.value), 0);
    console.log(this.payableForPlayerChargebacksValue)
    this.payableForAgentValue = this.obj.reduce((a: any, b: { payableForAgent: any; }) => (a + b.payableForAgent.value), 0);
    console.log(this.payableForAgentValue)
    this.revenueAdjustmentsValue = this.obj.reduce((a: any, b: { revenueAdjustments: any; }) => (a + b.revenueAdjustments.value), 0);
    console.log(this.revenueAdjustmentsValue)
    this.totalTurnoverValue = this.obj.reduce((a: any, b: { totalTurnover: any; }) => (a + b.totalTurnover.value), 0);
    console.log(this.totalTurnoverValue)
    this.paidForPeriodValue = this.obj.reduce((a: any, b: { paidForPeriod: any; }) => (a + b.paidForPeriod.value), 0);
    console.log(this.paidForPeriodValue)
    this.closingBalanceValue = this.obj.reduce((a: any, b: { closingBalance: any; }) => (a + b.closingBalance.value), 0);
    console.log(this.closingBalanceValue)
  }
  FormReset() {
    this.filterForm.reset();
  }
  fastbackforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt("1")
      })
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    if (this.PageCount > this.agentExpenses.length) {

      this.pagecontrolbtn = true
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit();
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)

  }

  fastforward() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1
      })

    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)

    console.log(this.ResultCount)
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    // if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
    //   this.pagecontrolbtn = false;
    // } else {
    //   this.pagecontrolbtn = true;
    // }
    this.pagecontrolbtn = true;
    this.onFormSubmit()
    console.log(this.filterForm.value.firstRecord)
    console.log((this.filterForm.value.firstRecord) / this.filterForm.value.maxCountRecord)
  }


  next() {
    console.log("......Hhello......")
    console.log(this.filterForm.value.firstRecord)
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord)
      })
    }
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    console.log(this.ResultCount)
    console.log(this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log(((this.filterForm.value.maxCountRecord) * this.PageCount))
    console.log((this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord)
    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount)) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit()

  }

  prev() {
    console.log("......Hhello......")
    if ((this.filterForm.value.firstRecord - 1) == parseInt(this.filterForm.value.maxCountRecord))
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) - parseInt(this.filterForm.value.maxCountRecord)
      })
    console.log(this.filterForm.value.firstRecord)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) - 1)
    if (this.PageCount > this.agentExpenses.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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
}


