import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { ToolsService } from 'src/app/source/Tools.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-affiliatemailinglist',
  templateUrl: './affiliatemailinglist.component.html',
  styleUrls: ['./affiliatemailinglist.component.css']
})
export class AffiliatemailinglistComponent implements OnInit {
  filterForm: FormGroup;
  FillterMenu: boolean = false;
  loader: boolean = false;
  selectedWallet: any;
  walletDropdownSettings: any = {};

  startDate: any;
  endDate: any;
  todaydate: any;
  timeerror: boolean = false
  steddate: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  walletTypesList: any;
  walletGuids: any = [];
  TemplateCreationTypesList: any;
  filteredTemplateCreationTypes: any;
  ResultCount: any;
  PageCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  pagecontrolbtn: any;
  affiliateMailingList: any;
  isFilterPopup: boolean = false;
  isEmailTemp: boolean = false;
  templateList: any;
  isMailSend: boolean = false;
  selectedTempforMail:any;

  constructor(private Toolsservice: ToolsService, private CommomfilterService: CommomfilterService, private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      emalMask: new FormControl(),
      Revenuecurrency: new FormControl(),
      Revenuefrom: new FormControl(),
      Revenueto: new FormControl(),
      refferedPlayersLow: new FormControl(),
      refferedPlayersHigh: new FormControl(),
      refferedWebmastersLow: new FormControl(),
      refferedWebmastersHigh: new FormControl(),

      firstRecord: new FormControl(1, this.CommomfilterService.requiredAndMinOne()),
      maxCountRecord: new FormControl(100, this.CommomfilterService.requiredAndMinOne()),
      startDate: new FormControl(this.startDate,),
      endDate: new FormControl(this.endDate,),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.walletTypes();
    this.TemplateCreationTypes();
  }

  onView() {
    this.onFormSubmit()
    this.isFilterPopup = false;
  }

  onSend() {
    this.isFilterPopup = false;
    this.Toolsservice.getMailTemplatesByType(this.filteredTemplateCreationTypes.guid).subscribe((res => {
      console.log(res)
      this.templateList = res.objectList;
      this.selectedTempforMail = this.templateList[0].guid
      if(res.objectList.length==0){
        this.isEmailTemp = true;
      }else{
        this.isMailSend = true;
      }
    }))
  }

  filterPopup() {
    this.isFilterPopup = !this.isFilterPopup
  }

  emailTempPopup(message:any){
    if(message == 'emailTemp'){
      this.isEmailTemp = !this.isEmailTemp
    }else{
      this.isMailSend = !this.isMailSend
    }
  }

  sendWmMail(){
    let body = {
      "letterTemplate":[this.selectedTempforMail]
    }
    this.Toolsservice.sendWmMail(body).subscribe((res:any)=>console.log(res))
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  walletTypes() {
    const walletTypes = localStorage.getItem('walletTypes');
    if (walletTypes) {
      let walletTypesLists = JSON.parse(walletTypes);
      this.walletTypesList = walletTypesLists.filter((list: any) => list.clubGameWallet && list.description !== 'Play Money')
    }
    console.log(this.walletTypesList)

    this.selectedWallet = this.walletTypesList.map((list: any) => {
      this.walletGuids.push(list.guid)
      return { guid: list.guid, description: list.description }
    })

    this.walletDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };

  }

  TemplateCreationTypes() {
    let TemplateCreationTypes = localStorage.getItem('TemplateCreationTypes')
    if (TemplateCreationTypes) {
      this.TemplateCreationTypesList = JSON.parse(TemplateCreationTypes)
    }
    this.filteredTemplateCreationTypes = this.TemplateCreationTypesList.find((list: any) => list.value == 'Mass Email Template for Affiliates')
    console.log(this.filteredTemplateCreationTypes)
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
    console.log(this.filterForm.value);
    this.FillterMenu = false;
    this.loader = true;
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)

    let { Revenuefrom, Revenueto, emalMask, firstRecord, maxCountRecord, refferedPlayersHigh,
      refferedPlayersLow, refferedWebmastersHigh, refferedWebmastersLow } = this.filterForm.value

    let wallet = this.selectedWallet.map((list: any) => list.guid)

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;

    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;


    fillterbody["firstRecord"] = firstRecord - 1
    fillterbody["maxCountRecord"] = maxCountRecord
    fillterbody["emalMask"] = emalMask ? emalMask : undefined;
    fillterbody["refferedPlayers"] = (refferedPlayersHigh || refferedPlayersLow) ? {
      high: refferedPlayersHigh ? refferedPlayersHigh : undefined,
      low: refferedPlayersLow ? refferedPlayersLow : undefined
    } : undefined;
    fillterbody["refferedWebmasters"] = (refferedWebmastersHigh || refferedWebmastersLow) ? {
      high: refferedWebmastersHigh ? refferedWebmastersHigh : undefined,
      low: refferedWebmastersLow ? refferedWebmastersLow : undefined
    } : undefined;
    fillterbody["revenue"] = (Revenueto || Revenuefrom) ? { high: Revenueto ? Revenueto : undefined, low: Revenuefrom ? Revenuefrom : undefined } : undefined;
    fillterbody["wallets"] = wallet.length == 0 ? this.walletGuids : wallet;
    fillterbody["haveOpennedAccount"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;


    this.Toolsservice.getMailTemplatesByType(this.filteredTemplateCreationTypes.guid).subscribe((res => this.AffiliateMallingResData(res)))
    this.Toolsservice.getWmMailingList(fillterbody).subscribe((res: any) => { this.getWmMailingList(res) })
  }

  getWmMailingList(data: any) {
    console.log(data)
    this.loader = false;
    this.affiliateMailingList = data.objectList;
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;
    this.resultcount = false;

    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }

  AffiliateMallingResData(data: any) {
    console.log(data)
    this.templateList = data.objectList

    if(data.objectList.length == 0){
      this.isEmailTemp = true;
    }

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
    if (this.PageCount > this.affiliateMailingList.length) {
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
    if (this.PageCount > this.affiliateMailingList.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName: 'AffiliateMailingExcelSheet.xlsx';
    XLSX.writeFile(wb, 'AffiliateMailingExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "PlyerlistExcelSheet")
  }
}
