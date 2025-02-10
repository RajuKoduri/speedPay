import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-fraudplayers',
  templateUrl: './fraudplayers.component.html',
  styleUrls: ['./fraudplayers.component.css']
})
export class FraudplayersComponent implements OnInit {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  walletlist: any;
  loader: boolean = false;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  FraudPlayerslist: any;
  FraudPlayerslistPopup: boolean=false;
  oneFraudPlayerlist: any;

  currentDateTimes: any;
  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false

  currencyGuids: any = [];
  CopyCurrencyTotalGuids: any = [];
  wallettypelist: any;
  currencyList: any = [];
  selectedcurrency: any = [];
  dropdownSettingscurrency: any;

  constructor(private PlayerserviceService: PlayerServiceService,private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      Currency: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
      enddate: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.walletlistmethod()

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
  walletlistmethod() { 
      const walletstypes = localStorage.getItem('walletTypes');
      if (walletstypes) {
        this.wallettypelist = JSON.parse(walletstypes);
        console.log(this.wallettypelist)
        for (let i = 0; i < this.wallettypelist.length; i++) {
          // if (this.wallettypelist[i].description == "U.S. Dollars" || this.wallettypelist[i].description == "Chips") {
          if (this.wallettypelist[i].faceWallet == true || this.wallettypelist[i].tournamentWallet == true) {
            if (this.wallettypelist[i].description != "Play Money") {
  
              this.currencyList.push(this.wallettypelist[i])
            }
          }
        }
        console.log("currencyList", this.currencyList)
  
        for (let i = 0; i < this.currencyList.length; i++) {
          this.selectedcurrency[i] = {
            description: this.currencyList[i].description,
            guid: this.currencyList[i].guid
          }
        }
        console.log(this.selectedcurrency)
        this.selectedcurrency.forEach((item: { guid: any; }) => {
          this.currencyGuids.push(item.guid);
        });
        this.CopyCurrencyTotalGuids = this.currencyGuids
        console.log(this.currencyGuids);
  
        this.dropdownSettingscurrency = {
          singleSelection: false,
          idField: 'guid',
          textField: 'description',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 1,
          allowSearchFilter: false
        };
      } 

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
    this.loader = true;
    this.FillterMenu = false;
    this.FraudPlayerslist = false
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord -1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord ;
    fillterbody["wallet"] = this.currencyGuids
    // fillterbody["reportPeriod"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate, "end": this.filterForm.value.endDate } : undefined

    fillterbody["reportPeriod"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "")? {"end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime }: undefined

    this.PlayerserviceService.getAccFraudPlayers(fillterbody).subscribe((res) => { this.FraudPlayersListData(res) }
    )
  }

  FraudPlayersListData(data: any) {
    console.log(data)
    this.loader = false;
    this.FraudPlayerslist = data?.objectList
    this.ResultCount = data?.resultCount;
    if (this.FraudPlayerslist != undefined) {
      this.rowsOnthePage = data.objectList.length;
    }
    console.log(this.ResultCount);
    
    if (this.ResultCount) {
      this.resultcount = false;
    }
    if (this.FraudPlayerslist != null) {
      this.loader = false;
    }
  }


  onClick(event: any) {
    console.log(event)
    // console.log( this.PlayerList[event] )
    this.oneFraudPlayerlist = this.FraudPlayerslist[event]
    console.log(this.oneFraudPlayerlist)
    this.FraudPlayerslistPopup = true;
  }
  closepopup(){
    this.FraudPlayerslistPopup = false;

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
    XLSX.writeFile(wb, 'FraudExcelSheet.xlsx');

  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "FraudExcelSheet")
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
 // **************************CurryMultiDropDown**************************************
 onItemSelectcurrency(data: any) {
  this.currencyGuids = []
  this.filterForm.value.Currency.forEach((item: { guid: any; }) => {
    this.currencyGuids.push(item.guid);
  });
  console.log(this.currencyGuids)
}

OnItemDeSelectcurrency(data: any) {
  this.currencyGuids = []
  this.filterForm.value.Currency.forEach((item: { guid: any; }) => {
    this.currencyGuids.push(item.guid);
  });
  console.log(this.currencyGuids)
  if (this.currencyGuids === null || this.currencyGuids.length === 0) {
    console.log("Empty");
    this.currencyGuids = this.CopyCurrencyTotalGuids
  }

}
onSelectAllcurrency(data: any) {
  this.currencyGuids = []
  data.forEach((item: { guid: any; }) => {
    this.currencyGuids.push(item.guid);
  });
  console.log(this.currencyGuids)
}
onDeSelectAllcurrency(data: any) {
  this.currencyGuids = []
  this.currencyGuids = this.CopyCurrencyTotalGuids
  // data.forEach((item: { guid: any; }) => {
  //   this.playerstatusaaray.push(item.guid);
  // });
  console.log(this.currencyGuids)
}
  
}
