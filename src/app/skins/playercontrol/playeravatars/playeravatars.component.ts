import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import * as XLSX from 'xlsx'
import * as moment from 'moment';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
@Component({
  selector: 'app-playeravatars',
  templateUrl: './playeravatars.component.html',
  styleUrls: ['./playeravatars.component.css']
})
export class PlayeravatarsComponent implements OnInit {
  filterForm: FormGroup;
  FillterMenu: boolean = false;
  AvatarList: any;
  rowsOnthePage: any;
  ResultCount: any;
  resultcount: boolean = true;
  AvatarstatusList: any;
  loader: boolean = false;
  playerAvatarPopup: boolean = false;
  playerAvatarData: any;
  AvattImages: any = [];
  selectedItemsStatus: any = []
  playerstatusaaray: any = []
  playerstatusdropList: any = []
  dropdownSettingsstatus = {};
  deselestarry: any = []
  startDate: any;
  endDate: any;
  todaydate: any;
  steddate: boolean = false;
  timeerror: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  AvatarsActions: any;
  popupArrow: boolean = false;
  SeletedIconIndex: any;
  SpinnwerT: boolean = false;

  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;
  constructor(private DateTimePipe: DateTimePipe, private PlayerserviceService: PlayerServiceService, private FileformatServiceService: FileformatServiceService) {
    this.filterForm = new FormGroup({
      // DateStart: new FormControl(),
      // DateEnd: new FormControl(),
      UserLogin: new FormControl(),
      Status: new FormControl(),
      firstRecord: new FormControl(1),
      maxCountRecord: new FormControl(100),
      startDate: new FormControl(this.startDate, Validators.required),
      endDate: new FormControl(this.endDate, Validators.required),
      startTime: new FormControl(),
      endTime: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.Avatarstatus();
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


  changeSelect(date: string) {
    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)
    return (c)
  }

  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  Avatarstatus() {
    const Avatarstatus = localStorage.getItem("Avatarstatus");
    if (Avatarstatus) {
      this.AvatarstatusList = JSON.parse(Avatarstatus)
    }
    console.log(this.AvatarstatusList)
    for (let i = 0; i < this.AvatarstatusList.length; i++) {
      this.selectedItemsStatus[i] = {
        value: this.AvatarstatusList[i].value,
        guid: this.AvatarstatusList[i].guid
      }
    }
    console.log(this.selectedItemsStatus)
    this.selectedItemsStatus.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });

    this.playerstatusdropList = this.AvatarstatusList;
    this.deselestarry = this.playerstatusaaray
    console.log(this.playerstatusdropList);
    this.dropdownSettingsstatus = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectedItemsStatus = this.playerstatusdropList;
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



  fastbackforward() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord:
          parseInt(this.filterForm.value.firstRecord) + 1 + parseInt(this.filterForm.value.maxCountRecord),
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
        firstRecord:
          Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)) * this.filterForm.value.maxCountRecord + 1,
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + this.ResultCount
        // firstRecord: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord) +  this.ResultCount
      });

    console.log(Math.floor(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord)));
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,)
    console.log(this.ResultCount / parseInt(this.filterForm.value.maxCountRecord) * this.filterForm.value.maxCountRecord + 1,);
    console.log(Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1);
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    if (this.PageCount > this.AvatarList.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(  this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord);
    this.FirstrecordFillter =this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
  }

  next() {
    console.log('......Hhello......');
    console.log(this.filterForm.value.firstRecord);
    if (this.filterForm.value.firstRecord == 0) {
      this.filterForm.patchValue({
        firstRecord:  parseInt(this.filterForm.value.firstRecord) +  1 + parseInt(this.filterForm.value.maxCountRecord),
        // console.log(typeof this.filterForm.value.firstRecord)
      });
    }
    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter) + 1 + parseInt(this.filterForm.value.maxCountRecord)
    else
      this.filterForm.patchValue({
        firstRecord: parseInt(this.filterForm.value.firstRecord) +parseInt(this.filterForm.value.maxCountRecord),
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
    this.PageCount = Math.floor( this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord) ) - 1;
    if (this.PageCount > this.AvatarList.length) {
      this.pagecontrolbtn = false;
    }
    this.onFormSubmit();
    // console.log( typeof this.filterForm.value.maxCountRecord)
    // this.ResultCount = res.resultCount
    //   this.rowsOnthePage = res.objectList.length;
  }





  onFormSubmit() {
    console.log(this.filterForm.value);
    this.FillterMenu = false;
    this.AvatarList = false;
    this.loader = true;
    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)

    fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1)
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    // fillterbody["date"] = this.filterForm.value.startDate != null ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined
    fillterbody["date"] = (this.filterForm.value.startDate != null && this.filterForm.value.startDate !== "") ? { "start": this.filterForm.value.startDate + "T" + this.filterForm.value.startTime, "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } :
      (this.filterForm.value.endDate != null && this.filterForm.value.endDate != "") ? { "end": this.filterForm.value.endDate + "T" + this.filterForm.value.endTime } : undefined;
    fillterbody["loginMask"] = this.filterForm.value.UserLogin != null ? this.filterForm.value.UserLogin : undefined;
    // fillterbody["status"] = this.filterForm.value.Status != null ? [this.filterForm.value.Status] : undefined;
    fillterbody["status"] = this.playerstatusaaray != null ? this.playerstatusaaray : undefined;

    this.PlayerserviceService.getAvatarList(fillterbody).subscribe((res) => this.AvatarsResData(res))
  }

  AvatarsResData(data: any) {
    console.log(data);
    this.AvatarList = data.objectList;
    let myObjData = data.objectList;
    this.AvatarsActions = JSON.parse(JSON.stringify(myObjData))
    this.rowsOnthePage = data.objectList.length;
    this.ResultCount = data.resultCount;

    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.AvatarList != null) {
      this.loader = false;
    }

    for (let i = 0; i < this.AvatarList.length; i++) {

      this.AvattImages = `data:image/png;base64,${this.AvatarList[i].image}`;
      console.log(this.AvattImages)
      if (this.AvatarList[i].imageValue) {
        console.log(this.AvatarList[i].imageValue)
        // this.AvattImages.push(this.AvatarList[i].imageValue)
      }
      for (let j = 0; j < this.AvatarstatusList.length; j++) {
        if (this.AvatarList[i].status.lowLong == this.AvatarstatusList[j].guid.lowLong) {
          this.AvatarList[i].status = this.AvatarstatusList[j].value
        }
      }
    }


    if (this.ResultCount < ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }
  }
  hh(value: any) {
    const byteArray: any = [value];
    const base64String = btoa(String.fromCharCode.apply(null, byteArray));
    // const imageUrl = `data:image/png;base64,${base64String}`;
    this.AvattImages = `data:image/png;base64,${base64String}`;

  }
  onClick(event: any) {
    console.log(event);
    this.playerAvatarData = this.AvatarList[event]
    this.playerAvatarPopup = true
  }
  closepopup() {
    this.playerAvatarPopup = false
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
    XLSX.writeFile(wb, 'PlayerAvatarslistExcelSheet.xlsx');

  }
  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "PlayerAvatarslistExcelSheet")
  }

  showmanu(i: any, guid: any) {
    this.popupArrow = !this.popupArrow
    this.SeletedIconIndex = i
  }
  setPlayerActions(Type: any, index: any) {
    this.popupArrow = false;
    this.SpinnwerT = true;
    var AvatarListGuid
    // if(Type=='Approve'){
    //   AvatarListGuid=this.AvatarstatusList[1].guid,
    // }else{}
    for (let i = 0; i < this.AvatarstatusList.length; i++) {
      if (Type == this.AvatarstatusList[i].value) {
        AvatarListGuid = this.AvatarstatusList[i].guid
      }
    }
    console.log(Type)
    let body = {
      // "tGuid":this.AvatarsActions[index].status,
      "tGuid": AvatarListGuid,
      "tIdList": {
        "idList": [this.AvatarsActions[index].guid]
      }
    };
    this.PlayerserviceService.setAvatarStatus(body).subscribe((data) => {
      console.log(data)
      if (data.changedObjectList) {
        this.SpinnwerT = false;
        this.onFormSubmit()
      }
    });
  }
  // setAvatarStatus(index: any) {
  //   console.log(index)

  // }

  PlayerExplore(name: any, guid: any, List: any) {
    this.PlayerserviceService.PlayerExplore(name, guid, List)
  }


  // ********************************************* Dropdown @starts ********************************************************************************************
  onItemSelect(data: any) {
    this.playerstatusaaray = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
  }
  OnItemDeSelect(data: any) {
    this.playerstatusaaray = []
    this.filterForm.value.Status.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
  }
  onSelectAll(data: any) {
    this.playerstatusaaray = []
    data.forEach((item: { guid: any; }) => {
      this.playerstatusaaray.push(item.guid);
    });
    console.log(this.playerstatusaaray)
  }
  onDeSelectAll(data: any) {
    this.playerstatusaaray = []
    this.playerstatusaaray = this.deselestarry
    // data.forEach((item: { guid: any; }) => {
    //   this.playerstatusaaray.push(item.guid);
    // });
    console.log(this.playerstatusaaray)
  }

  // ********************************** Dropdown @Ends **********************************************
  showDate(data: any) {
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
  // *****************************************************************************************************************************************
}
