import { Component, OnInit,OnDestroy } from '@angular/core';
import { RemoteSystemsService } from 'src/app/source/RemoteSystems.service';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as  moment from 'moment'
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';
@Component({
  selector: 'app-transfersummary',
  templateUrl: './transfersummary.component.html',
  styleUrls: ['./transfersummary.component.css']
})
export class TransfersummaryComponent implements OnInit,OnDestroy {
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  loader: boolean = false;
  ResultCount: any;
  resultcount: boolean = true;
  rowsOnthePage: any;
  TransferActivitieData: any;
  faceParameterslist: any;
  walletlist: any;
  walletlists: any = [];
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  remoteSystemActivitiesList: any;
  PlayerActivitieSummarypopup: boolean=false;
  PlayerActivitieSummaryData: any;

  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false
  playerlevelChangeStatusList: any;
  PlayerLevelsNamesList: any;

  walletFormats: any;
  walletFormatsList: any = [];
  selectedcurrency: any =[];
  currencyarray: any = [];
  currencystatus: any = [];
  dropdownSettingscurrency: any; 
  selectedFillterGames: any;
  gamesTobeSelected: any;

  convertedArray:any = [];
  dropdownList12: any = [];
  selectedItems12: any = [];
  dropdownSettings = {};

  deselestarry: any =[];


  constructor(private RemoteSystemsService: RemoteSystemsService,private FileformatServiceService: FileformatServiceService,
    private GamesofpokerService: GamesofpokerService) {
    this.filterForm = new FormGroup({
      DateStart: new FormControl(),
      DateEnd: new FormControl(),
      currency: new FormControl(),
      Face: new FormControl(),
      GameSessionType: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
      networkNames: new FormControl(),

      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),

    })
  }


  ngOnDestroy(): void {
    this.GamesofpokerService.clearData()
  }

  ngOnInit(): void {
    this.faceParameters();
    this.walletFormat();
    this.remoteSystemActivities();

    let body = {
      "reportPeriod": {
        "start": "2022-01-10T12:14:59.87",
        "end": "2023-01-19T12:14:59.87"
      },
      "wallets": [{ "hiLong": 0, "lowLong": 1840 }, { "hiLong": 0, "lowLong": 6 }],
      "networkNames": ["rp1"]
    }
    this.RemoteSystemsService.getRemoteActivitySummary(body).subscribe((data: any) => console.log(data))

    
    this.endDate = new Date();
    let today = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7);
    let endday = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    this.startDate
    let datee = moment(new Date(today)).format('YYYY-MM-DD');
    let dateE = moment(new Date(endday)).format('YYYY-MM-DD');
    this.startDate = datee;
    this.endDate = dateE;
    this.todaydate = moment(new Date()).format('YYYY-MM-DD');

    this.playerlevelChangeStatus();
    this.getPlayerLevelsNames();

    console.log('jdbjsbsjbhs')
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  faceParameters() {
    const faceParameterslist = localStorage.getItem('faceParameters')
    if (faceParameterslist) {
      this.faceParameterslist = JSON.parse(faceParameterslist)
    }

    this.convertedArray=[]
    // this.faceParameterslist = this.CommomfilterService.selectallst();
    console.log(this.faceParameterslist);
    
    this.faceParameterslist.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
    this.dropdownList12 = this.faceParameterslist;
    console.log(this.dropdownList12);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectedItems12 = this.dropdownList12;

  }
  playerlevelChangeStatus() {
    const playerlevelChangeStatus = localStorage.getItem('playerlevelChangeStatus');
    if (playerlevelChangeStatus) {
      this.playerlevelChangeStatusList = JSON.parse(playerlevelChangeStatus)
    }
    console.log("playerlevelChangeStatusList", this.playerlevelChangeStatusList)
  }
  getPlayerLevelsNames() {
    const getPlayerLevelsNames = localStorage.getItem('getPlayerLevelsNames');
    if (getPlayerLevelsNames) {
      this.PlayerLevelsNamesList = JSON.parse(getPlayerLevelsNames)
    }
    console.log(this.PlayerLevelsNamesList.compPointsLevels)
  }
  walletFormat() {
    this.walletFormats = localStorage.getItem('walletFormats')
    this.walletFormatsList = JSON.parse(this.walletFormats)
    console.log(this.walletFormatsList)

    this.walletlists= this.GamesofpokerService.walletTypes();
    console.log(this.walletlists)
     
     for (let i = 0; i < this.walletlists.length; i++) {
       this.selectedcurrency[i] = {
         description: this.walletlists[i].description,
         guid: this.walletlists[i].guid
       }
     }
     console.log(this.selectedcurrency)
     this.selectedcurrency.forEach((item: { guid: any; }) => {
       this.currencyarray.push(item.guid);
     });
     this.deselestarry = this.currencyarray;
     this.currencystatus = this.walletlists;
     console.log(this.currencystatus);
     this.selectedcurrency = this.currencystatus;
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
  remoteSystemActivities() {
    const remoteSystemActivities = localStorage.getItem("remoteSystemActivities")
    if (remoteSystemActivities) {
      this.remoteSystemActivitiesList = JSON.parse(remoteSystemActivities)
    }
    console.log("remoteSystemActivitiesList", this.remoteSystemActivitiesList)
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
    this.FillterMenu = false;
    this.loader = true;
    this.TransferActivitieData = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1)
    console.log((Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1))

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    // fillterbody["reportPeriod"] = this.filterForm.value.DateStart != null ? { "start": this.filterForm.value.DateStart, "end": this.filterForm.value.DateEnd } : undefined
    fillterbody["reportPeriod"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined,
    fillterbody["wallets"] = this.currencyarray != null ? this.currencyarray : undefined
    fillterbody["networkNames"] = this.convertedArray != null ? this.convertedArray : undefined
    fillterbody["gameSessionType"] = this.filterForm.value.GameSessionType != null ? this.filterForm.value.GameSessionType : undefined
    this.RemoteSystemsService.getRemoteActivitySummary(fillterbody).subscribe((res) => { this.TransferActivitiesResData(res) })
  }
  TransferActivitiesResData(data: any) {
    this.loader = false;
    console.log(data)
    this.TransferActivitieData = data.objectList;
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList?.length;
    if (this.ResultCount >=0) {
      this.resultcount = false;
    }

    for (let i = 0; i < this.TransferActivitieData?.length; i++) {
      for (let k = 0; k < this.remoteSystemActivitiesList.length; k++) {
        for (let l = 0; l < this.remoteSystemActivitiesList[k].nonGameActivities.length; l++) {

          if (this.TransferActivitieData[i].system.login == this.remoteSystemActivitiesList[k].system.login) {
            if (this.TransferActivitieData[i].activity.lowLong == this.remoteSystemActivitiesList[k].nonGameActivities[l].guid.lowLong) {
              this.TransferActivitieData[i].activity = this.remoteSystemActivitiesList[k].nonGameActivities[l].name

            }
          }
        }
      }
    }

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
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
    XLSX.writeFile(wb, 'Transfers&activitiesSummaryExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "Transfers&activitiesSummaryExcelSheet")
  }
  onClick(event: any) {
    console.log(event)
    this.PlayerActivitieSummaryData = this.TransferActivitieData[event]
    console.log(this.PlayerActivitieSummaryData)
    this.PlayerActivitieSummarypopup = true;
  }
  closepopup() {
    this.PlayerActivitieSummarypopup = false;
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
    if (this.PageCount > this.TransferActivitieData.length) {

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
    if (this.ResultCount > (this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord) {
      this.pagecontrolbtn = false;
    } else {
      this.pagecontrolbtn = true;
    }

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

    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
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
    if (this.PageCount > this.TransferActivitieData.length) {
      this.pagecontrolbtn = false
    } else {
      this.pagecontrolbtn = false
    }
    this.onFormSubmit()
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


  // *******************************@Satarts currency Dropdown************************************************************
  
  onItemSelectcurrency(data: any) {
    this.currencyarray = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  
  OnItemDeSelectcurrency(data: any) {
    this.currencyarray = []
    this.filterForm.value.currency.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
    if (this.currencyarray === null || this.currencyarray.length === 0) {
      console.log("Empty");
      this.currencyarray = this.deselestarry
    }
  
  }
  onSelectAllcurrency(data: any) {
    this.currencyarray = []
    data.forEach((item: { guid: any; }) => {
      this.currencyarray.push(item.guid);
    });
    console.log(this.currencyarray)
  }
  onDeSelectAllcurrency(data: any) {
    this.currencyarray = []
    this.currencyarray = this.deselestarry
    // data.forEach((item: { guid: any; }) => {
    //   this.playerstatusaaray.push(item.guid);
    // });
    console.log(this.currencyarray)
  }



// **********************************@Ends currency Dropdown****************************************************************************

// **********************************@status face Dropdown****************************************************************************

onItemSelectnew(data: any) {
  this.convertedArray=[]
  // console.log(this.filterForm.value.networkNames)
  this.filterForm.value.networkNames.forEach((item: { name: string }) => {
    this.convertedArray.push(item.name);
  });
 
  console.log(this.convertedArray);
}
OnItemDeSelectnew(data: any) {
  this.convertedArray=[]
  // console.log(this.filterForm.value.networkNames)
  this.filterForm.value.networkNames.forEach((item: { name: string }) => {
    this.convertedArray.push(item.name);
  });
  console.log(this.convertedArray);
}


onSelectAllnew(data: any) {
  this.convertedArray = [];
  data.forEach((item: { name: string }) => {
    this.convertedArray.push(item.name);
  });
  console.log(this.convertedArray);
}
onDeSelectAllnew(data: any) {
  this.convertedArray = [];
  data.forEach((item: { name: string }) => {
    this.convertedArray.push(item.name);
  });
  console.log(this.convertedArray);
}
// **********************************@Ends face Dropdown****************************************************************************


}
