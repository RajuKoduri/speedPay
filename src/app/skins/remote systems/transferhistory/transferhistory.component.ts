import { Component, OnInit } from '@angular/core';
import { RemoteSystemsService } from 'src/app/source/RemoteSystems.service';
import * as XLSX from 'xlsx'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from "moment"
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { GamesofpokerService } from 'src/app/source/gamesofpoker.service';


@Component({
  selector: 'app-transferhistory',
  templateUrl: './transferhistory.component.html',
  styleUrls: ['./transferhistory.component.css']
})
export class TransferhistoryComponent implements OnInit {
  FillterMenu: any;
  filterForm: FormGroup;
  faceParameterslist: any;
  walletlist: any;
  walletlists: any = [];
  loader: boolean = false;
  ActivitieHistoryResData: any;
  ResultCount: any;
  resultcount: boolean = true;
  rowsOnthePage: any;
  RemoteHistoryActivityStatusList: any;
  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  remoteSystemActivitiesList: any;
  PlayerActivitieHistoryData: any;
  PlayerActivitieHistoryDatapopup: boolean = false;
  Filtergamesbtn: boolean = false;

  startDate: any;
  endDate: any;
  todaydate: any;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  steddate: boolean = false
  timeerror: boolean = false
  playerlevelChangeStatusList: any;
  PlayerLevelsNamesList: any;

  walletTypesList: any;
  dropDownCheckedList: any = [];
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};

  convertedArray: string[] = [];
  faceconvertedarray: string[] = [];
  faceParameterslist12: any;
  dropdownList12: any = [];
  selectedItems12: any = [];

  selectedStatuss: any = [];
  statusArray: any = [];
  totalstatus: any;
  statusLevel: any = [];
  dropdownSettingStatuss: any = [];
  deselestarry: any = [];
  Currency: any;

  currencyarray: any = [];
  selectedcurrency: any = [];
  currencystatus: any = [];
  dropdownSettingscurrency: any;
  selectedFillterGames: any;
  gamesTobeSelected: any;
  walletFormats: any;
  walletFormatsList: any = [];

  TransferGAmesCheckbox: boolean[] = [];
  onChangeCheckedList: boolean[] = [];
  checkedList: any = [];
  activityPopup: boolean = false;
  allActivities: boolean = true
  selectedActivities: any = []
  systemNameCheckbox: boolean[] = []
  Activitykeys: any[] = [];
  keysCheckedList: any[] = []
  subActivityCheckbox: { [key: number]: { [key: string]: boolean[] } } = {};
  filteredActivitiesList: any = [];
  selectedGuid: any = []
  allSelectedGuid: any = []
  isParentOpen: any[] = [];
  isSubParentOpen: any = []
  // TransferGAmesCheckbox : any = "All";

  constructor(private RemoteSystemsService: RemoteSystemsService, private FileformatServiceService: FileformatServiceService,
    private CommomfilterService: CommomfilterService, private GamesofpokerService: GamesofpokerService) {
    this.filterForm = new FormGroup({
      // DateStart: new FormControl(),
      // DateEnd: new FormControl(),
      Face: new FormControl(),
      currency: new FormControl(),
      Activity: new FormControl(),
      Status: new FormControl(),
      PlayerLogin: new FormControl(),
      PlayerNickname: new FormControl(),
      GameSessionType: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),

      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.faceParameters();
    // this.walletFormats();
    this.walletTypes();

    this.RemoteHistoryActivityStatus();
    this.remoteSystemActivities();

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

    this.initializeCheckboxes()
    this.updateFilteredActivitiesList()

    this.isParentOpen = new Array(this.remoteSystemActivitiesList.length).fill(false);
    this.isSubParentOpen = this.remoteSystemActivitiesList.map((activity: any) =>
      this.getActivityKeys(activity).map(() => false));
  }



  // changeSelect(date: string) {
  //   let c = this.DateTimePipe.transforminingDispalyDate(date);

  //   return (c)
  // }
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


  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  // faceParameters() {
  //   const faceParameterslist = localStorage.getItem('faceParameters')
  //   if (faceParameterslist) {
  //     this.faceParameterslist = JSON.parse(faceParameterslist)
  //   }
  // }

  faceParameters() {
    this.convertedArray = []
    this.faceconvertedarray = []
    this.faceParameterslist12 = this.CommomfilterService.selectallst();
    console.log(this.faceParameterslist12);
    // const faceParameterslist = localStorage.getItem('faceParameters');
    // if (faceParameterslist) {
    //   this.faceParameterslist12 = JSON.parse(faceParameterslist);
    //   console.log(this.faceParameterslist12);
    // }
    // for (let i = 0; i < this.faceParameterslist12.length; i++) {
    //   this.selectedItems[i] = {
    //     face: this.faceParameterslist.name,
    //   };
    // }
    this.faceParameterslist12.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
      this.faceconvertedarray.push(item.name);
    });
    console.log(this.convertedArray);
    this.dropdownList12 = this.faceParameterslist12;
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

  filtergamesbtn() {
    this.Filtergamesbtn = !this.Filtergamesbtn

  };

  ClickoncheckboxgamesofTransfer(event: any, providerIndex: number) {

    const isChecked = event?.target.checked;
    this.TransferGAmesCheckbox[providerIndex] = isChecked;
    console.log("Is checked : " + isChecked);
    console.log(this.checkedList)
    for (let k = 0; k < this.checkedList.length; k++) {
      // this.checkedList[k].checked = false;
      console.log(document.getElementById("checkboxId0_" + k));
      // this.checkedList(document.getElementById("checkboxId0_"+k)).checked = false;
      // console.log(this.checkedList[k])
      this.TransferGAmesCheckbox[providerIndex] = isChecked;
      console.log(this.TransferGAmesCheckbox)
      this.onChangeCheckedList[k] = isChecked

    }
    // this.checkedList[providerIndex] = this.checkedList[providerIndex]
  }

  ClickoncheckboxInvisibleTransferGames(event: any, providerIndex: number, gameIndex: number, name: any) {
    console.log(this.checkedList)
    console.log(event)
    console.log(providerIndex)
    console.log(gameIndex)

    const isChecked = event?.target.checked;
    // this.checkedList[providerIndex].checked = isChecked;
    this.checkedList[gameIndex].defaultChecked = isChecked;
    for (let i = 0; i < this.checkedList.length; i++) {
      if (this.checkedList[i].defaultChecked == false) {
        this.TransferGAmesCheckbox[0] = false;
        break;

      } else {
        this.TransferGAmesCheckbox[0] = true;
        // this.TransferGAmesCheckbox = "All"
      }

    }


    //this.checkedList[providerIndex][gameIndex] = event.target.checked;
    // console.log(this.checkedList)
  }


  // walletFormats() {
  //   const walletTypes = localStorage.getItem("walletTypes")
  //   if (walletTypes) {
  //     this.walletlist = JSON.parse(walletTypes)
  //     for (let i = 0; i < this.walletlist.length; i++) {
  //       // if (this.walletlist[i].description == "U.S. Dollars" || this.walletlist[i].description == "Chips") {
  //         if (this.walletlist[i].clubGameWallet == true) {
  //           if (this.walletlist[i].description !== "Play Money") {
  //         this.walletlists.push(this.walletlist[i])
  //       }
  //     }
  //   }
  //   }
  //   console.log(this.walletlist)
  //   console.log(this.walletlists)
  // }



  walletTypes() {
    this.currencyarray = []
    this.walletFormats = localStorage.getItem('walletFormats')
    this.walletFormatsList = JSON.parse(this.walletFormats)
    console.log(this.walletFormatsList)
    this.walletlists = this.GamesofpokerService.walletTypes();
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
    console.log(this.selectedcurrency)
    console.log(this.currencyarray)
    this.deselestarry = this.currencyarray
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
    console.log(this.selectedcurrency)
  }

  RemoteHistoryActivityStatus() {
    const RemoteHistoryActivityStatus = localStorage.getItem("RemoteHistoryActivityStatus");
    if (RemoteHistoryActivityStatus) {
      this.RemoteHistoryActivityStatusList = JSON.parse(RemoteHistoryActivityStatus)
    }
    console.log("RemoteHistoryActivityStatusList", this.RemoteHistoryActivityStatusList)
    for (let i = 0; i < this.RemoteHistoryActivityStatusList.length; i++) {
      this.selectedStatuss[i] = {
        value: this.RemoteHistoryActivityStatusList[i].value,
        guid: this.RemoteHistoryActivityStatusList[i].guid,
      }
    }
    console.log(this.selectedStatuss)
    this.selectedStatuss.forEach((item: { guid: any; }) => {
      this.statusArray.push(item.guid);
    });
    console.log(this.statusArray);
    this.totalstatus = this.statusArray
    // this.selectedStatuss = this.RemoteHistoryActivityStatusList;

    this.dropdownSettingStatuss = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
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
      console.log("remoteSystemActivitiesList", this.remoteSystemActivitiesList)


      this.remoteSystemActivitiesList.forEach((activity: any) => {
        // console.log(activity)
        this.Activitykeys = Object.keys(activity)
        console.log(this.Activitykeys)
      })
      this.Activitykeys = this.Activitykeys.filter((key) => key != "system")



      console.log(this.remoteSystemActivitiesList[0]?.nonGameActivities[0]?.name)
      for (let j = 0; j < this.remoteSystemActivitiesList[0]?.nonGameActivities.length; j++) {
        let obj = { name: this.remoteSystemActivitiesList[0]?.nonGameActivities[j]?.name, defaultChecked: true, }

        // this.checkedList[j] = this.remoteSystemActivitiesList[0].nonGameActivities[j].name;
        this.checkedList[j] = obj;

      }
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
    this.FillterMenu = false;
    this.loader = true;
    this.ActivitieHistoryResData = false;
    let fillterbody = this.getDirtyValues(this.filterForm);
    this.PageCount = (Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    console.log((Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1));

    fillterbody["activity"] = this.selectedGuid;
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1;
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    // fillterbody["reportPeriod"] = this.filterForm.value.DateStart != null ? { "start": this.filterForm.value.DateStart, "end": this.filterForm.value.DateEnd } : undefined
    fillterbody["reportPeriod"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;
    fillterbody["wallets"] = this.convertedArray != null ? this.convertedArray : undefined;
    fillterbody["statuses"] = this.statusArray != null ? this.statusArray : undefined;
    // fillterbody["statuses"] = this.filterForm.value.Status != null ?[this.filterForm.value.Status]:undefined
    fillterbody["networkNames"] = this.filterForm.value.Face != null ? [this.filterForm.value.Face] : undefined;
    fillterbody["login"] = this.filterForm.value.PlayerLogin != null ? this.filterForm.value.PlayerLogin : undefined;
    fillterbody["nickname"] = this.filterForm.value.PlayerNickname != null ? this.filterForm.value.PlayerNickname : undefined;
    fillterbody["gameSessionType"] = this.filterForm.value.GameSessionType != null ? this.filterForm.value.GameSessionType : undefined;
    this.RemoteSystemsService.getRemoteActivityHistory(fillterbody).subscribe((res) => { this.TransferActivitiesHistoryData(res) })
  }
  TransferActivitiesHistoryData(data: any) {
    this.loader = false;
    console.log(data)
    this.ActivitieHistoryResData = data?.objectList;
    console.log(this.PlayerActivitieHistoryData)
    this.ResultCount = data.resultCount
    this.rowsOnthePage = data.objectList?.length;
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    for (let i = 0; i < this.ActivitieHistoryResData?.length; i++) {

      for (let j = 0; j < this.RemoteHistoryActivityStatusList.length; j++) {
        if (this.ActivitieHistoryResData[i].status.lowLong == this.RemoteHistoryActivityStatusList[j].guid.lowLong) {
          this.ActivitieHistoryResData[i].status = this.RemoteHistoryActivityStatusList[j].value
        }
      }
      console.log(this.ActivitieHistoryResData[i].status)

      for (let k = 0; k < this.remoteSystemActivitiesList.length; k++) {
        for (let l = 0; l < this.remoteSystemActivitiesList[k].nonGameActivities.length; l++) {

          if (this.ActivitieHistoryResData[i].system.login == this.remoteSystemActivitiesList[k].system.login) {
            if (this.ActivitieHistoryResData[i].activity.lowLong == this.remoteSystemActivitiesList[k].nonGameActivities[l].guid.lowLong) {
              this.ActivitieHistoryResData[i].activity = this.remoteSystemActivitiesList[k].nonGameActivities[l].name

            }
          }
        }
      }
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
    XLSX.writeFile(wb, 'Transfers&activitiesHistoryExcelSheet.xlsx');
  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "Transfers&activitiesHistoryExcelSheet")
  }
  onClick(event: any) {
    console.log(event)
    this.PlayerActivitieHistoryData = this.ActivitieHistoryResData[event]
    console.log(this.PlayerActivitieHistoryData)
    this.PlayerActivitieHistoryDatapopup = true;
  }
  closepopup() {
    this.PlayerActivitieHistoryDatapopup = false;
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
    if (this.PageCount > this.ActivitieHistoryResData.length) {

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
    if (this.PageCount > this.ActivitieHistoryResData.length) {
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

  // ######################## Activity history Start ####################################

  toggleParent(index: number) {
    this.isParentOpen[index] = !this.isParentOpen[index];
  }

  toggleSubParent(parentIndex: number, subParentIndex: number) {
    this.isSubParentOpen[parentIndex][subParentIndex] = !this.isSubParentOpen[parentIndex][subParentIndex];
  }


  getActivityKeys(activity: any): string[] {
    return Object.keys(activity).filter(key => key !== 'system');
  }
  capitalizeFirstLetter(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  ActivityClosePopup() {
    this.activityPopup = !this.activityPopup
  }

  clickOnAllActivityCheckbox() {
    this.remoteSystemActivitiesList.forEach((activity: any, i: number) => {
      this.systemNameCheckbox[i] = this.allActivities;
      this.getActivityKeys(activity).forEach((key, j) => {
        this.keysCheckedList[i][j] = this.allActivities;
        this.subActivityCheckbox[i][key].forEach((subActivity, k) => {
          this.subActivityCheckbox[i][key][k] = this.allActivities;
        });
      });
    });
    this.updateFilteredActivitiesList()
    console.log(this.subActivityCheckbox)
  }
  clickOnSystemNamecheckbox(event: any, index: number) {
    const isChecked = event.target.checked;
    this.getActivityKeys(this.remoteSystemActivitiesList[index]).forEach((key, j) => {
      this.keysCheckedList[index][j] = isChecked;
      this.subActivityCheckbox[index][key].forEach((_, k) => {
        this.subActivityCheckbox[index][key][k] = isChecked;
      });
    });
    this.updateFilteredActivitiesList()
    this.updateAllActivitiesCheckbox();
  }
  clickOnkeysCheckedList(event: any, i: number, j: number) {
    const isChecked = event.target.checked;
    const key = this.getActivityKeys(this.remoteSystemActivitiesList[i])[j];
    this.subActivityCheckbox[i][key].forEach((_, k) => {
      this.subActivityCheckbox[i][key][k] = isChecked;
    });
    this.updateFilteredActivitiesList()
    this.updateParentCheckboxes(i);
  }
  clickOnSubActivityCheckbox(event: any, i: number, key: string, k: number) {
    const isChecked = event.target.checked;
    if (!isChecked) {
      this.systemNameCheckbox[i] = false;
      const keyIndex = this.getActivityKeys(this.remoteSystemActivitiesList[i]).indexOf(key);
      this.keysCheckedList[i][keyIndex] = false;
    }
    this.updateFilteredActivitiesList()
    this.updateParentCheckboxes(i);
  }
  updateParentCheckboxes(i: number) {
    const allKeys = this.getActivityKeys(this.remoteSystemActivitiesList[i]);

    this.systemNameCheckbox[i] = allKeys.every(key =>
      this.subActivityCheckbox[i][key].every(subActivity => subActivity)
    );

    allKeys.forEach((key, j) => {
      this.keysCheckedList[i][j] = this.subActivityCheckbox[i][key].every(subActivity => subActivity);
    });

    this.updateAllActivitiesCheckbox();
  }
  updateAllActivitiesCheckbox() {
    this.allActivities = this.remoteSystemActivitiesList.every((data: any, i: number) => this.systemNameCheckbox[i]);
  }
  initializeCheckboxes() {
    this.remoteSystemActivitiesList.forEach((activity: any, i: number) => {
      this.systemNameCheckbox[i] = true;
      this.keysCheckedList[i] = [];
      this.subActivityCheckbox[i] = {};

      this.getActivityKeys(activity).forEach((key, j) => {
        this.keysCheckedList[i][j] = true;
        this.subActivityCheckbox[i][key] = [];

        if (activity[key]) {
          activity[key].forEach(() => {
            this.subActivityCheckbox[i][key].push(true);
          });
        }
      });
    });
    this.updateFilteredActivitiesList()
  }

  // updateFilteredActivitiesList() {
  //   this.filteredActivitiesList = this.remoteSystemActivitiesList.map((activity:any, i:number) => {
  //     const filteredActivity: any = { system: activity.system };
  //     this.getActivityKeys(activity).forEach(key => {
  //       filteredActivity[key] = activity[key].filter(( _:any, k:number) => this.subActivityCheckbox[i][key][k]);
  //     });
  //     return filteredActivity;
  //   }).filter((activity:any) => {
  //     return this.getActivityKeys(activity).some(key => activity[key].length > 0);
  //   });
  //   console.log(this.filteredActivitiesList)
  // }


  updateFilteredActivitiesList(): any {
    const checkedGuids: string[] = [];
    const checkedNames: string[] = [];
    const boolArr: any = []

    // Iterate through each activity in the list
    for (let i = 0; i < this.remoteSystemActivitiesList.length; i++) {
      const activity = this.remoteSystemActivitiesList[i];
      // console.log(activity)

      // Iterate through each key in the activity
      const keys = this.getActivityKeys(activity);
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];

        // Iterate through each subActivity in the key
        for (let k = 0; k < activity[key].length; k++) {
          const subActivity = activity[key][k];
          console.log(this.subActivityCheckbox[i][key])

          // Check if the subActivity is checked and has a GUID
          if (this.subActivityCheckbox[i] && this.subActivityCheckbox[i][key] && this.subActivityCheckbox[i][key][k]) {
            checkedNames.push(subActivity.name);
            checkedGuids.push(subActivity.guid);
          }
        }
        const arr = this.subActivityCheckbox[i][key].every((bool: boolean) => bool)
        boolArr.push(arr)
      }
    }

    const bool = boolArr.every((bool: any) => bool)
    console.log(bool)
    if (bool) {
      this.selectedActivities = '[ALL]'
    } else {
      this.selectedActivities = checkedNames
    }

    this.selectedGuid = checkedGuids
    if (this.allSelectedGuid.length == 0) {
      this.allSelectedGuid = [...checkedGuids]
    }
    if (this.selectedGuid.length == 0) {
      this.selectedGuid = this.allSelectedGuid
    }
    console.log(checkedGuids)
    // this.handleInput(checkedNames)
    console.log(this.selectedGuid)
    return { checkedGuids, checkedNames }
  }

  // handleInput(checkedGuids:any){
  //   const a:any = []
  //   this.remoteSystemActivitiesList.forEach((activity:any,i:number)=>{
  //     const keys = this.getActivityKeys(activity)
  //     keys.forEach((key:any,j:number)=>{
  //       // console.log(this.subActivityCheckbox[i][key])
  //       const arr = this.subActivityCheckbox[i][key].every((bool:boolean)=> bool)
  //       a.push(arr)
  //       console.log(arr)
  //     })
  //   })
  //   const arr1 = a.every((bool:any)=>bool)
  //   console.log(arr1)
  //   if(arr1){
  //     this.selectedActivities =' [ALL]'
  //   }
  //   else{
  //     this.selectedActivities = checkedGuids
  //   }
  // }

  // ############################################## Activity History End ##################################### 

  // *****************************currency dropdown @starts ******************************

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
    console.log(this.currencyarray)
  }
  // ********************* currency Dropdown  @Ends***************************************

  // *************************************************************************************
  onItemSelectFace(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }
  OnItemDeSelectFace(data: any) {
    this.convertedArray = []
    // console.log(this.filterForm.value.networkNames)
    this.filterForm.value.networkNames.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }
  onSelectAllFace(data: any) {
    this.convertedArray = [];
    data.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
    });
    console.log(this.convertedArray);
  }
  onDeSelectAllFace(data: any) {
    this.convertedArray = [];
    this.convertedArray = this.faceconvertedarray
    console.log(this.convertedArray);
  }
  // ****************************************************************************************************

  // *****************************@starts status dropdown**************************************
  onItemSelectStatus(data: any) {
    this.statusArray = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.statusArray.push(item.guid);
    });
    console.log(this.statusArray)
  }
  OnItemDeSelectStatus(data: any) {
    this.statusArray = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.statusArray.push(item.guid);
    });
    if (this.statusArray === null || this.statusArray.length === 0) {
      console.log("Empty");
      this.statusArray = this.totalstatus
    }
    console.log(this.statusArray)
  }
  onSelectAllStatus(data: any) {
    this.statusArray = []
    data.forEach((item: { guid: any; }) => {
      this.statusArray.push(item.guid);
    });
    console.log(this.statusArray)
  }
  onDeSelectAllStatus(data: any) {
    this.statusArray = []
    this.statusArray = this.totalstatus
    console.log(this.statusArray)
  }


  // *****************************@Ends status dropdown**************************************

}
