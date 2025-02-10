import { Component, OnInit } from '@angular/core';
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';

@Component({
  selector: 'app-agent-transfersto-players',
  templateUrl: './agent-transfersto-players.component.html',
  styleUrls: ['./agent-transfersto-players.component.css']
})
export class AgentTransferstoPlayersComponent implements OnInit {
  Agentguid: any;
  FillterMenu: boolean = true;
  wallettypelist: any;
  currencys: any = [];
  selectedCurrency: any;
  TransferDirectionTypesList: any;
  TransferstoPlayersForm: FormGroup;
  loader: boolean = false;
  TransferstoPlayersData: any;
  rowsOnthePage: any;
  ResultCount: any;

  selectedtypes: any = [];
  TYPESguids: any = [];
  CopyTYPESguids : any = [];
  dropdownsettingsTYpes = {};
 popupview:boolean  =false
  agentlogin:any
cashtype:any
  dateform:any
  amount :any
  palyername:any
  agentname:any
  constructor(private AgentControlService: AgentControlService, private DateTimePipe:DateTimePipe,
    private FileformatServiceService: FileformatServiceService) {
    this.TransferstoPlayersForm = new FormGroup({
      Currency: new FormControl(),
      InitiatorLogin: new FormControl(),
      RefferedAgent: new FormControl(),
      Type: new FormControl(),
      firstRecord: new FormControl('1'),
      maxCountRecord: new FormControl('100'),
    })
  }

  ngOnInit(): void {
    this.Agentguids();
    this.walletTypes();
    this.TransferDirectionTypes();
  }

  changeSelect(date:any){
    const formatDate = this.DateTimePipe.transforminingDispalyDate(date);
    return formatDate
  }

  Agentguids() {
    const Agentguid = sessionStorage.getItem('Agentguid');
    console.log(Agentguid)
    if (Agentguid) {
      this.Agentguid = JSON.parse(Agentguid)
    }
  }
  fillermenu() {
    this.FillterMenu = !this.FillterMenu;
  }
  walletTypes() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      console.log(this.wallettypelist);
      for (let i = 0; i < this.wallettypelist.length; i++) {
        if (this.wallettypelist[i].faceWallet == true || this.wallettypelist[i].tournamentWallet == true && this.wallettypelist[i].description != "Play Money") {
          this.currencys.push(this.wallettypelist[i])
          console.log(this.currencys)
          // } else {
          // this.currencys.push(this.wallettypelist[i])
        }
      }
      // console.log(this.currencys)
      this.selectedCurrency = this.currencys[0].guid
    }
  }
  TransferDirectionTypes() {
    const TransferDirectionTypes = localStorage.getItem("TransferDirectionTypes");
    if (TransferDirectionTypes) {
      this.TransferDirectionTypesList = JSON.parse(TransferDirectionTypes)
      console.log(this.TransferDirectionTypesList)

      for (let i = 0; i< this.TransferDirectionTypesList.length; i++){
        this.selectedtypes[i]={
          value: this.TransferDirectionTypesList[i].value,
          guid: this.TransferDirectionTypesList[i].guid
        }
      }
      console.log(this.selectedtypes)
      this.TransferDirectionTypesList.forEach((item: { guid: any }) =>{
        this.TYPESguids.push(item.guid)
      })
      this.CopyTYPESguids = this.TYPESguids
      console.log(this.TYPESguids)

      this.dropdownsettingsTYpes = {
        singleSelection: false,
      idField: 'guid',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
      }
    }
  }

  onFormSubmit() {
    this.loader = true;
    this.TransferstoPlayersData = [];
    let body = {
      "agentIds": [this.Agentguid],
      "firstRecord": this.TransferstoPlayersForm.value.firstRecord - 1,
      "maxCountRecord": Number(this.TransferstoPlayersForm.value.maxCountRecord),
      "wallets": [this.TransferstoPlayersForm.value.Currency]

    }

    this.AgentControlService.getAgentToPlayerTransfers(body).subscribe((data) => {
      console.log(data);
      this.loader = false;
      this.TransferstoPlayersData = data.objectList;
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount;

      for (let i = 0; i < this.TransferstoPlayersData.length; i++) {
        for (let j = 0; j < this.TransferDirectionTypesList.length; j++) {
          if( this.TransferstoPlayersData[i].direction.lowLong==this.TransferDirectionTypesList[j].guid.lowLong){
            this.TransferstoPlayersData[i].direction=this.TransferDirectionTypesList[j].value
          }
        }
      }
    })
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
    XLSX.writeFile(wb, 'AgentTransferstoplayersExcelSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AgentTransferstoplayersExcelSheet")
  }

   //  ************************************* @Starts types Dropdown *********************************
   onItemSelectTYpes(data: any) {
  this.TYPESguids = []
  this.TransferstoPlayersForm.value.Type.forEach((item: { guid: any; }) => {
    this.TYPESguids.push(item.guid);
  });
  console.log(this.TYPESguids)
}
OnItemDeSelectTYpes(data: any) {
  this.TYPESguids = []
  this.TransferstoPlayersForm.value.Type.forEach((item: { guid: any; }) => {
    this.TYPESguids.push(item.guid);
  });
  console.log(this.TYPESguids)
  if (this.TYPESguids === null || this.TYPESguids.length === 0) {
    console.log("Empty");
    this.TYPESguids = this.CopyTYPESguids
  }
}
onSelectAllTYpes(data: any) {
  this.TYPESguids = []
  data.forEach((item: { guid: any; }) => {
    this.TYPESguids.push(item.guid);
  });
  console.log(this.TYPESguids)
}
onDeSelectAllTYpes(data: any) {
  this.TYPESguids = []
  this.TYPESguids = this.CopyTYPESguids
  console.log(this.TYPESguids)
}
//  ************************************* @ends types Dropdown ******************
 viewdata(data:any,index:any){
    console.log(data)
    console.log(index)
    this.popupview = true
    this.agentlogin =data.initiator.login    
    this.cashtype = data.direction
    this.dateform = data.date
    this.amount =  data.amount.value
    this.agentname = data.agent.login
    this.palyername = data.player.account
  }
  closepop(){
    this.popupview = false
  }
 
  playername12(name: any, guid: any,List:any) {
    console.log(List)
    console.log(name);
    console.log(guid)
    localStorage.setItem('PlayerName', JSON.stringify(name));
    localStorage.setItem('Playerguid', JSON.stringify(guid));
    console.log(name);
    sessionStorage.setItem('PlayerName', JSON.stringify(name));
    sessionStorage.setItem('Playerguid', JSON.stringify(guid));
    sessionStorage.setItem('PlayerExplorerData', JSON.stringify(List));
    console.log(guid);
    let palyerData = {
      hiLong: guid.hiLong,
      lowLong: guid.lowLong,
      name: name,
    };
    sessionStorage.setItem("playerdatainfo",JSON.stringify(palyerData))
    sessionStorage.setItem('PlayerName', JSON.stringify(name));
    sessionStorage.setItem('Playerguid', JSON.stringify(guid));
    // var baseUrl = '/playerexplorer/PlayersSummary';
    var baseUrl= window.location.hash ? '#/playerexplorer/PlayersSummary':'/playerexplorer/PlayersSummary';
    
    var urlWithParams = baseUrl + '?data=' + JSON.stringify(palyerData);
    window.open(baseUrl);
  }
  AgentExplore(name: any, guid: any) {
    sessionStorage.setItem('AgentName', JSON.stringify(name))
    sessionStorage.setItem('Agentguid', JSON.stringify(guid))
    console.log(name)
    console.log(guid)
    var baseUrl= window.location.hash ? '#/Agentexplorer/AgentSummary':'/Agentexplorer/AgentSummary';
    // window.open('/Agentexplorer/AgentSummary')   
    window.open(baseUrl)   
  }

}
