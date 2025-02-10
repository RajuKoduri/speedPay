import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { GameactivitysimulatorService } from 'src/app/source/gameactivitysimulator.service';
import * as XLSX from 'xlsx';
import { filter } from 'rxjs';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';
import { CommomfilterService } from 'src/app/source/commomfilter.service';

@Component({
  selector: 'app-simulatorstrategieslist',
  templateUrl: './simulatorstrategieslist.component.html',
  styleUrls: ['./simulatorstrategieslist.component.css']
})
export class SimulatorstrategieslistComponent implements OnInit {
  filterForm: FormGroup;
  FillterList: boolean = false;
  rowsOnthePage: any;
  ResultCount: any;
  steddate: boolean = false;
  loader: boolean = false;
  timeerror: boolean = false;
  resultcount: boolean = true;
  stategiesList: any;
  walletTypesList: any;
  currencyDropdownSetting: any = {};
  botStrategyTypeDropdownSetting: any = {};
  statusDropdownSetting: any = {};
  selectedCurrency: any;
  currencyGuid: any = [];
  botStrategyTypeList: any;
  botStrategyTypeGuid: any;
  selectedBotStrategyType:any;
  botStrategyStatusList: any;
  botStrategyStatusGuid: any;
  selectedBotStrategyStatus: any;

  constructor(private GameActivitySimulatorService: GameactivitysimulatorService, private FileformatServiceService: FileformatServiceService,
    private CommomfilterService: CommomfilterService
  ) {
    this.filterForm = new FormGroup({
      wallet: new FormControl(),
      strategyName: new FormControl(),
      strategyType: new FormControl(),
      playedHands: new FormControl(),
      status: new FormControl(),
      firstRecord: new FormControl(1, this.CommomfilterService.requiredAndMinOne()),
      maxCountRecord: new FormControl(100, this.CommomfilterService.requiredAndMinOne()),
    })
  }

  ngOnInit(): void {
    console.log(this.filterForm.controls['firstRecord'])
    this.walletTypes()
    this.botStrategyType()
    this.botStrategyStatus()
  }

  get f() {
    return this.filterForm.controls;
  }

  fillermenu() {
    this.FillterList = !this.FillterList;
  }

  walletTypes() {
    let walletTypes = localStorage.getItem("walletTypes")
    if (walletTypes) {
      this.walletTypesList = JSON.parse(walletTypes)
    }
    this.walletTypesList = this.walletTypesList.filter((list: any) => list.clubGameWallet && list.description !== 'Play Money')

    this.currencyGuid = this.walletTypesList.map((list: any) => {
      let { guid, description, ...rest } = list
      return guid
    })

    this.selectedCurrency = this.walletTypesList
    console.log(this.walletTypesList)
    console.log(this.currencyGuid)

    this.currencyDropdownSetting = {
      singleSelection: false,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
  }

  botStrategyType(){
    let botStrategyType = localStorage.getItem("botStrategyType")
    if(botStrategyType){
      this.botStrategyTypeList = JSON.parse(botStrategyType)
    }
    console.log('botStrategyTypeList',this.botStrategyTypeList)

    this.botStrategyTypeGuid = this.botStrategyTypeList.map((list:any)=> list.guid)

    this.selectedBotStrategyType = this.botStrategyTypeList

    this.botStrategyTypeDropdownSetting = {
      singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
  }

  botStrategyStatus(){
    let botStrategyStatus = localStorage.getItem("botStrategyStatus")
    if(botStrategyStatus){
      this.botStrategyStatusList = JSON.parse(botStrategyStatus)
    }
    console.log("botStrategyStatusList", this.botStrategyStatusList)

    this.botStrategyStatusGuid = this.botStrategyStatusList.map((list:any)=> list.guid)
    this.selectedBotStrategyStatus = this.botStrategyStatusList

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

  change(e: any) {
    console.log(e)
    console.log(this.selectedCurrency)
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
  onFormSubmit() {

    let selectdWallet = this.selectedCurrency.map((list:any)=>list.guid)
    let selectdStrategyType = this.selectedBotStrategyType.map((list:any)=>list.guid)
    let selectdStrategyStatus = this.selectedBotStrategyStatus.map((list:any)=>list.guid)

    let body = {
      // wallets :
      // strategyStatuses:
      // stategyTypes:

    }
    let fillterbody = this.getValues(this.filterForm)
    // fillterbody["currency"] = this.filterForm.value.currency
    // fillterbody["strategyName"] = this.filterForm.value.strategyName
    // fillterbody["strategyType"] = this.filterForm.value.strategyType
    // fillterbody["playedHands"] = this.filterForm.value.playedHands
    // fillterbody["playedHands"] = this.filterForm.value.playedHands
    // fillterbody["status"] = this.filterForm.value.status

    fillterbody["firstRecord"] = this.filterForm.value.firstRecord - 1
    fillterbody["maxCountRecord"] = this.filterForm.value.maxCountRecord
    this.GameActivitySimulatorService.StrategiesList(fillterbody).subscribe(data => this.getStrategiesListData(data))
  }
  getStrategiesListData(data: any) {
    console.log(data)
  }
  exportexcel() {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let fileName: 'strategyListExeclSheet.xlsx';
    XLSX.writeFile(wb, 'strategyListExeclSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel-table');
    this.FileformatServiceService.exportCsv(element, "strategyList")
  }

}
