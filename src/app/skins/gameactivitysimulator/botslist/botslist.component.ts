import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator} from'@angular/forms';
import { GameactivitysimulatorService } from 'src/app/source/gameactivitysimulator.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import { CommomfilterService } from 'src/app/source/commomfilter.service';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';

@Component({
  selector: 'app-botslist',
  templateUrl: './botslist.component.html',
  styleUrls: ['./botslist.component.css']
})
export class BotslistComponent implements OnInit {
  filterForm: FormGroup;
  FillterList: boolean = false;
  resultcount: boolean = true;  
  loader: boolean = false;  
  rowsOnthePage: any;
  ResultCount: any;
  counter: number = 0;
  botSettingStatusList: any;
  botSettingStatusGuid: any;
  selectedBotSettingStatusList:any;
  statusDropdownSetting: any={};
  botsList:any

  constructor(private GameActivitySimulatorService: GameactivitysimulatorService, private CommomfilterService:CommomfilterService,
    private FileformatServiceService:FileformatServiceService
  ) {
    this.filterForm = new FormGroup({
      nickName: new FormControl(),
      openedSessions: new FormControl(),
      status: new FormControl(),
      firstRecord: new FormControl(1, this.CommomfilterService.requiredAndMinOne()),
      maxCountRecord: new FormControl(100, this.CommomfilterService.requiredAndMinOne()),
    })
   }

  ngOnInit(): void {
    this.botSettingStatus()
  }

  get f(){
    return this.filterForm.controls
  }
  fillterMenu(){
    this.FillterList = !this.FillterList;
  }

  botSettingStatus(){
    let botSettingStatus = localStorage.getItem("botSettingStatus")
    if(botSettingStatus){
      this.botSettingStatusList = JSON.parse(botSettingStatus)
    }
    console.log("botSettingStatusList",this.botSettingStatusList)

    this.botSettingStatusGuid = this.botSettingStatusList.map((list:any)=> list.guid)
    this.selectedBotSettingStatusList = this.botSettingStatusList

    this.statusDropdownSetting = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
  }
 
  onFormSubmit(){

    let selectedBotStatusList = this.selectedBotSettingStatusList.map((list:any)=>list.guid)

    let fillterbody = this.getValues(this.filterForm)
    fillterbody["nickname"] = this.filterForm.value.nickname
    fillterbody["openedSessions"] = this.filterForm.value.openedSessions
    fillterbody["openedSessions"] = this.filterForm.value.openedSessions
    fillterbody["status"] = this.filterForm.value.status
    fillterbody["firstRecord"] = this.filterForm.value.firstRecord
    fillterbody["pageSize"] = this.filterForm.value.pageSize
    this.GameActivitySimulatorService.BotsList(fillterbody).subscribe(data =>this.getBotsListData(data))
  }

  getBotsListData(data:any){
    console.log(data)
  }
  getValues(form: any){
    let Values:any ={};
    Object.keys(form.controls).forEach(key =>{
      let currentControl = form.controls[key];
  
      if(currentControl.dirty) {
        if (currentControl.controls)
          Values[key]  = this.getValues(currentControl);
      }
    });
    return Values;
  
  }
  prev(){
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

    this.onFormSubmit()
    }
  next(){
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
        this.onFormSubmit()
  }

  exportExcel(){
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName:'botsListExeclSheet.xlsx';
    XLSX.writeFile(wb, 'botsListExeclSheet.xlsx');
  }

  exportCsv(){
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "botsList")
  }
}
