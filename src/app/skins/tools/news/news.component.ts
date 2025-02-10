import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { ToolsService } from 'src/app/source/Tools.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  appointmentTime = new Date();
  FillterMenu: boolean = false;
  filterForm: FormGroup;
  PopUpForm: FormGroup;
  NewsData: any;
  ResultCount: any;
  rowsOnthePage: any;
  resultcount: boolean = true;
  loader: boolean = false;
  Languages: any;
  faceParameterslist: any;
  NewsStatusList: any;
  NewsTypeList: any;
  NewsTypesList: any = [];
  NewsPopup: boolean = false;
  NewsPopupList: any;
  NewsName: any;
  selectValue: any;
  selectValueArray: any = [];
  selectValue1: any = [];
  newsParametersList: any;
  selectedTeam = '';
  typeDropdownSettings: any = {}
  selectedType: any;
  selectedTypeGuid: any = [];
  selectedLanguage: any;
  languageDropdownSettings: any = {};
  selectedLanguageGuid: any = [];
  selectedStatus: any;
  statusDropdownSettings: any = {};
  selectedStatusGuid: any = [];
  selectedSites: any;
  siteDropdownSettings: any = {}
  popupArrow: boolean = false;
  SeletedIconIndex: any;


  PageCount: number = 0;
  pagecontrolbtn: boolean = false;
  FirstrecordFillter: any = 0;

  startDate: any;
  endDate: any;
  todaydate: any;
  timeerror: boolean = false
  steddate: boolean = false;
  startTime: any = "00:00:00"
  endTime: any = "23:59:59"
  selectedSitesName: any = [];
  isDelete: boolean = false;
  deleteGuid: any;
  isEditNewsPopup:boolean = false;
  SpinnwerT:boolean = false;
  editObjList: any;


  constructor(private ToolsService: ToolsService, private DateTimePipe: DateTimePipe) {
    this.filterForm = new FormGroup({
      startDate: new FormControl(),
      startTime: new FormControl(),
      endDate: new FormControl(),
      endTime: new FormControl(),
      Type: new FormControl(),
      Language: new FormControl(),
      Status: new FormControl(),
      Sites: new FormControl(),
      firstRecord: new FormControl("1"),
      maxCountRecord: new FormControl("100"),
    })
    this.PopUpForm = new FormGroup({
      NewsName: new FormControl(),
    })
  }
  onSelected(value: string): void {
    this.selectedTeam = value;
  }

  ngOnInit(): void {
    const array = ['1', 1, 2, '1', '1', 3];
    const uniqueSet = new Set(array);
    console.log(uniqueSet)

    this.languages();
    this.faceParameters();
    this.NewsStatus();
    this.NewsType();
    this.newsParameters();
    this.DUPLICATEARRAYVALUES();
  }
  languages() {
    const Language = localStorage.getItem("Languages");
    if (Language) {
      this.Languages = JSON.parse(Language)
    }
    console.log("Languages", this.Languages)

    this.selectedLanguage = this.Languages.map((list: any) => {
      this.selectedLanguageGuid.push(list.guid)
      return { guid: list.guid, value: list.value }
    })

    this.languageDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    }
  }
  faceParameters() {
    const faceParameterslist = localStorage.getItem('faceParameters')
    if (faceParameterslist) {
      this.faceParameterslist = JSON.parse(faceParameterslist)
    }

    this.selectedSites = this.faceParameterslist.map((list: any) => {
      this.selectedSitesName.push(list.name)
      return list.name
    })

    this.siteDropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    }
  }
  NewsStatus() {
    const NewsStatus = localStorage.getItem("NewsStatus");
    if (NewsStatus) {
      this.NewsStatusList = JSON.parse(NewsStatus);
    }
    console.log("NewsStatusList", this.NewsStatusList)

    this.selectedStatus = this.NewsStatusList.map((list: any) => {
      this.selectedStatusGuid.push(list.guid)
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
    }
  }

  NewsType() {
    const NewsType = localStorage.getItem("NewsType");
    if (NewsType) {
      this.NewsTypeList = JSON.parse(NewsType);
    }
    for (let i = 0; i < this.NewsTypeList.length; i++) {
      if (this.NewsTypeList[i].value == "Players" || this.NewsTypeList[i].value == "Affiliates" || this.NewsTypeList[i].value == "Agents") {
        this.NewsTypesList.push(this.NewsTypeList[i])
      }
    }
    console.log("NewsTypeList", this.NewsTypeList)
    console.log("NewsTypesList", this.NewsTypesList)

    this.selectedType = this.NewsTypesList.map((list: any) => {
      this.selectedTypeGuid.push(list.guid)
      return { guid: list.guid, value: list.value }
    })

    this.typeDropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }

  newsParameters() {
    const newsParameters = localStorage.getItem("newsParameters");
    if (newsParameters) {
      this.newsParametersList = JSON.parse(newsParameters);
    }
    console.log("newsParametersList", this.newsParametersList)
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
    this.popupArrow = false;
    let type = this.selectedType.map((list: any) => list.guid)
    let languages = this.selectedLanguage.map((list: any) => list.guid)
    let status = this.selectedStatus.map((list: any) => list.guid)
    // let face = this.selectedSites.map((list:any)=>list.name)
    console.log(this.selectedSites)

    console.log(this.filterForm.value)
    this.FillterMenu = false;
    this.loader = true;
    this.NewsData = false;
    let fillterbody = this.getDirtyValues(this.filterForm)
    console.log(fillterbody)

    this.PageCount = Math.floor(this.filterForm.value.firstRecord / parseInt(this.filterForm.value.maxCountRecord)) + 1;

    const { startDate, startTime, endDate, endTime } = this.filterForm.value;
    const startDateTime = startDate ? startDate + "T" + startTime : undefined;
    const endDateTime = endDate ? endDate + "T" + endTime : undefined;
    fillterbody["announceDate"] = (startDateTime || endDateTime) ? { start: startDateTime, end: endDateTime } : undefined;

    fillterbody["firstRecord"] = JSON.stringify(this.filterForm.value.firstRecord - 1);
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord;
    // fillterbody["announceDate"] = this.filterForm.value.DatePeriodFrom != null ? { "start": this.filterForm.value.DatePeriodFrom, "end": this.filterForm.value.DatePeriodTO } : undefined;
    fillterbody["types"] = type.length == 0 ? this.selectedTypeGuid : type;
    fillterbody["languages"] = languages.length == 0 ? this.selectedLanguageGuid : languages;
    fillterbody["statuses"] = status.length == 0 ? this.selectedStatusGuid : status;
    fillterbody["faces"] = this.selectedSites == 0 ? this.selectedSitesName : this.selectedSites;

    this.ToolsService.getNewsList(fillterbody).subscribe((res) => (this.NewsResData(res)))
  }

  NewsResData(data: any) {
    console.log(data);
    this.NewsData = data.objectList;
    this.ResultCount = data.resultCount;
    if (this.NewsData) {
      this.rowsOnthePage = data.objectList.length;
    }
    if (this.ResultCount !== null) {
      this.resultcount = false;
    }
    if (this.NewsData != null || this.NewsData == undefined) {
      this.loader = false;
    }
    if (this.NewsData) {
      for (let i = 0; i < this.NewsData.length; i++) {
        for (let m = 0; m < this.NewsStatusList.length; m++) {
          if (this.NewsData[i].status.lowLong == this.NewsStatusList[m].guid.lowLong) {
            this.NewsData[i].status = this.NewsStatusList[m].value
          }
        }
        for (let m = 0; m < this.NewsTypesList.length; m++) {
          if (this.NewsData[i].type.lowLong == this.NewsTypesList[m].guid.lowLong) {
            this.NewsData[i].type = this.NewsTypesList[m].value
          }
        }
      }
    }

    if (this.NewsData) {
      if (this.PageCount > this.NewsData.length) {
        this.pagecontrolbtn = true;
      }
    }
    this.FillterMenu = false;
    if (this.ResultCount <= ((this.filterForm.value.maxCountRecord) * this.PageCount) || this.ResultCount == this.rowsOnthePage) {
      this.pagecontrolbtn = true;
    } else {
      this.pagecontrolbtn = false;
    }

  }

  dateFormat(date: any) {
    let dateForm = this.DateTimePipe.transforminingDispalyDate(date)
    return (dateForm)
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
    if (this.PageCount > this.NewsData.length) {
      this.pagecontrolbtn = true;
    }

    //this.FirstrecordFillter = parseInt(this.FirstrecordFillter)  + parseInt(this.filterForm.value.maxCountRecord)
    this.onFormSubmit();

    console.log(this.filterForm.value.firstRecord);
    console.log(
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord
    );
    this.FirstrecordFillter =
      this.filterForm.value.firstRecord / this.filterForm.value.maxCountRecord;
    console.log(JSON.stringify(this.FirstrecordFillter).split('.')[0]);
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
    if (this.PageCount > this.NewsData.length) {
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
    let fileName: 'PlyerlistExcelSheet.xlsx';
    XLSX.writeFile(wb, 'NewsListExcelSheet.xlsx');

  }

  onClick(event: any) {
    console.log(event)
    this.NewsPopupList = this.NewsData[event]
    console.log(this.NewsPopupList)
    this.NewsName = this.NewsPopupList.name
    this.NewsPopup = true;

    let body = {
      "tGuid":this.NewsPopupList.guid
    }
    this.ToolsService.getNews(body).subscribe((res) => console.log(res))

    this.PopUpForm.patchValue({
      // NewsName: parseInt(this.filterForm.value.firstRecord) + parseInt(this.filterForm.value.maxCountRecord)
      NewsName: this.NewsPopupList.name
    })

  }

  showmenu(ind: number, data: any) {
    console.log(ind, data)
    this.SeletedIconIndex = ind
    this.popupArrow = !this.popupArrow
  }
  closepopup() {
    this.NewsPopup = false;
    this.selectValue1 = "";
    this.selectValue = "";
  }
  PopupOpen() {
    this.NewsPopup = true;
  }
  selectclick(data: any) {
    console.log(data)
    console.log(this.selectValue)
    this.selectValueArray.push(data)
    console.log(this.selectValueArray)
    console.log(typeof this.selectValueArray)
  }

  onEditNews(data: any) {
    this.SpinnwerT = true;
    console.log(data)
    this.popupArrow = false;

    let body = {
      "tGuid":data
    }
    this.ToolsService.getNews(body).subscribe((res) => this.editNewsResponse(res))
  }

  editNewsResponse(data:any){
    
    console.log(data)
    if(data.objectList){
      this.editObjList= data.objectList
      this.SpinnwerT = false;
      this.editNewsPopup()
    }
  }

  editNewsPopup(){
    this.isEditNewsPopup = !this.isEditNewsPopup;
  }

  onPublishNews(data: any) {
    console.log(data)

    let body = {
      'tGuid':data.guid
    }
    this.ToolsService.publishNews(body).subscribe((res:any)=>{
      console.log(res)
      if(res.changedObjectList){
        this.popupArrow = false
        this.onFormSubmit()
      }
    })

  }

  onArchieveNews(data: any) {
    console.log(data)
    let body = {
      'tGuid':data.guid
    }
    this.ToolsService.archiveNews(body).subscribe((res:any)=>{
      console.log(res)
      if(res.changedObjectList){
        this.popupArrow = false
        this.onFormSubmit()
      }
    })
  }

  onDeleteNews(data: any) {
    console.log(data)
    this.deleteGuid = data.guid
    this.isDelete = true
  }

  onConformDelNews(){
    let body = {
      'tGuid':this.deleteGuid
    }
    this.ToolsService.deleteNews(body).subscribe((res:any)=>{
      console.log(res)
      if(res.changedObjectList){
        this.popupArrow = false
        this.isDelete = false;
        this.onFormSubmit()
      }
    })
  }

  closeErrPopup(){
    this.isDelete = false
    this.popupArrow = false
  }


  DUPLICATEARRAYVALUES() {
    const items = ["a", "a", "1", 1, 1, "1", "1"];
    // const items = ["a", "b", "a", "c", "d", "d", "c", "d", "e","f"];
    function duplicates(data: any) {
      const output: any = {}

      data.forEach((d: any) => {
        output[d] = (output[d] || 0) + 1
      })

      return output
    }
    console.log(duplicates(items))
  }
}
