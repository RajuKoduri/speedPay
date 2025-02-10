import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AffiliateControlService } from 'src/app/source/AffiliateControl.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-affiliateslist',
  templateUrl: './affiliateslist.component.html',
  styleUrls: ['./affiliateslist.component.css']
})
export class AffiliateslistComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  Affiliateslist: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  Affiliatestatuslist: any = [];
  loader: boolean = false;
  obj: any;
  Uniquehits: any;
  Depositors: any;
  ReferredAffiliates: any;
  ReferredPlayers: any;
  IncomeFromWebmasters: any;
  IncomeFromPlayers: any;
  Chargebacks: any;
  Cancels: any;
  Adjustments: any;
  Total: any;
  Affiliatesfulldetails: any;
  Affiliatedetailspopup: boolean = false;

  startDate: any;
  endDate: any;
  todaydate: any;
  selectedTime: any = '00:00:00';
  selectedEndTime: any = '23:59:59';
  steddate: boolean = false
  timeerror: boolean = false

  constructor(private AffiliatecontrolService: AffiliateControlService,private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      Affiliateaccountmask: new FormControl(),
      Alias: new FormControl(),
      RegistrationDateFrom: new FormControl(),
      RegistrationDateTo: new FormControl(),
      ReferredPlayersFrom: new FormControl(),
      ReferredPlayersTo: new FormControl(),
      RevenueFromPlayersFrom: new FormControl(),
      RevenueFromPlayersTo: new FormControl(),
      ReferredAffiliatesFrom: new FormControl(),
      ReferredAffiliatesTo: new FormControl(),
      RevenueFromAffiliatesFrom: new FormControl(),
      RevenueFromAffiliatesTo: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
      startDate: new FormControl(),
      endDate: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.Affiliatestatus()

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
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  Affiliatestatus() {
    const Affiliatestatus = localStorage.getItem('Affiliatestatus')
    if (Affiliatestatus) {
      this.Affiliatestatuslist = JSON.parse(Affiliatestatus)
    }
    console.log("Affiliatestatus", this.Affiliatestatuslist)
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
    this.Affiliateslist = false;
    this.FillterMenu = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    fillterbody["accountMask"] = this.filterForm.value.Affiliateaccountmask != null ? this.filterForm.value.Affiliateaccountmask : undefined;
    fillterbody["alias"] = this.filterForm.value.Alias != null ? this.filterForm.value.Alias : undefined;
    fillterbody["regDate"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? {
      "start": this.filterForm.value.startDate + 'T' + (this.selectedTime),
      "end": this.filterForm.value.endDate + 'T' + (this.selectedEndTime)
    } : undefined
    fillterbody["referredPlayers"] = this.filterForm.value.ReferredPlayersFrom != null ? { "low": this.filterForm.value.ReferredPlayersFrom, "high": this.filterForm.value.ReferredPlayersTo } : undefined
    fillterbody["revenuePlayers"] = this.filterForm.value.RevenueFromPlayersFrom != null ? { "low": this.filterForm.value.RevenueFromPlayersFrom, "high": this.filterForm.value.RevenueFromPlayersTo } : undefined
    fillterbody["revenueWebmasters"] = this.filterForm.value.RevenueFromAffiliatesFrom != null ? { "low": this.filterForm.value.RevenueFromAffiliatesFrom, "high": this.filterForm.value.RevenueFromAffiliatesTo } : undefined
    fillterbody["referredWebmasters"] = this.filterForm.value.ReferredAffiliatesFrom != null ? { "low": this.filterForm.value.ReferredAffiliatesFrom, "high": this.filterForm.value.ReferredAffiliatesTo } : undefined


    this.AffiliatecontrolService.AffiliatesList(fillterbody).subscribe((res) => { this.AffiliatesListData(res) })
  }
  AffiliatesListData(res: any) {
    console.log(res)
    this.Affiliateslist = res.objectList;
    this.rowsOnthePage = res.objectList.length;
    this.ResultCount = res.resultCount

    this.findsum(this.Affiliateslist)

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.Affiliateslist != null) {
      this.loader = false;
    }

    for (let i = 0; i < this.Affiliateslist.length; i++) {
      for (let m = 0; m < this.Affiliatestatuslist.length; m++) {
        // console.log(this.Affiliateslist[i].status )
        // console.log(this.Affiliateslist[i].status.lowLong )
        //console.log(this.Affiliatestatuslist[m].guid.lowLong )
        if (this.Affiliateslist[i].status.lowLong == this.Affiliatestatuslist[m].guid.lowLong) {
          this.Affiliateslist[i].status = this.Affiliatestatuslist[m].value
          // console.log(this.Affiliateslist[i].status)
        }
      }
    }

  }


  findsum(data: any) {
    this.obj = data
    console.log(this.obj);

    this.Uniquehits = this.obj.reduce((a: any, b: { hits: any; }) => (a + b.hits), 0);
    console.log(this.Uniquehits)
    this.Depositors = this.obj.reduce((a: any, b: { depositors: any; }) => (a + b.depositors), 0);
    console.log(this.Depositors)
    this.ReferredAffiliates = this.obj.reduce((a: any, b: { referredWebmasters: any; }) => (a + b.referredWebmasters), 0);
    console.log(this.ReferredAffiliates)
    this.ReferredPlayers = this.obj.reduce((a: any, b: { referredPlayers: any; }) => (a + b.referredPlayers), 0);
    console.log(this.ReferredPlayers)
    this.IncomeFromWebmasters = this.obj.reduce((a: any, b: { incomeFromWebmasters: any; }) => (a + b.incomeFromWebmasters.value), 0);
    console.log(this.IncomeFromWebmasters)
    this.IncomeFromPlayers = this.obj.reduce((a: any, b: { incomeFromPlayers: any; }) => (a + b.incomeFromPlayers.value), 0);
    console.log(this.IncomeFromPlayers)
    this.Chargebacks = this.obj.reduce((a: any, b: { chargebacks: any; }) => (a + b.chargebacks.value), 0);
    console.log(this.Chargebacks)
    this.Cancels = this.obj.reduce((a: any, b: { cancels: any; }) => (a + b.cancels.value), 0);
    console.log(this.Cancels)
    this.Adjustments = this.obj.reduce((a: any, b: { adjustments: any; }) => (a + b.adjustments.value), 0);
    console.log(this.Adjustments)
    this.Total = this.obj.reduce((a: any, b: { total: any; }) => (a + b.total.value), 0);
    console.log(this.Total)
  }
  onClick(data: any) {
    console.log(data)
    this.Affiliatesfulldetails = this.Affiliateslist[data]
    console.log(this.Affiliatesfulldetails)
    this.Affiliatedetailspopup = true;
  }
  closepopup() {
    this.Affiliatedetailspopup = false
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
    XLSX.writeFile(wb, 'AffiliateslistExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "PlayerBalanceExeclSheet")
  }

  FormReset() {
    this.filterForm.reset();
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

}
