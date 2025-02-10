import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { FileformatServiceService } from 'src/app/source/fileformat-service.service';


@Component({
  selector: 'app-agent-transfersto-agents',
  templateUrl: './agent-transfersto-agents.component.html',
  styleUrls: ['./agent-transfersto-agents.component.css']
})
export class AgentTransferstoAgentsComponent implements OnInit {
  Agentguid: any;
  FillterMenu: boolean = true;
  TransferstoAgentsForm: FormGroup;
  rowsOnthePage: any;
  ResultCount: any;
  loader: boolean = false;
  TransferstoAgentsData: any;
  wallettypelist: any;
  currencys: any = [];
  selectedCurrency: any;
  TransferDirectionTypesList: any;

  selectedTYPEs: any = [];
  TYpesGuids: any = [];
  copyTYpesGuids: any = [];
  dropdownsettingsTypeS = {};

popupview:boolean  =false
  agentlogin:any
cashtype:any
  dateform:any
  amount :any
  referAgent:any
  agentname:any
  constructor(private AgentControlService: AgentControlService, private DateTimePipe: DateTimePipe,
    private FileformatServiceService: FileformatServiceService) {
    this.TransferstoAgentsForm = new FormGroup({
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

  changeSelect(date: any) {
    const formatdate = this.DateTimePipe.transforminingDispalyDate(date);
    return formatdate
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

      for (let i = 0; i < this.TransferDirectionTypesList.length; i++) {
        this.selectedTYPEs[i] = {
          value: this.TransferDirectionTypesList[i].value,
          guid: this.TransferDirectionTypesList[i].guid
        }
      }
      console.log(this.selectedTYPEs)
      this.selectedTYPEs.forEach((item: {guid: any;})=>{
        this.TYpesGuids.push(item.guid)
      });
      this.copyTYpesGuids = this.TYpesGuids
      console.log(this.TYpesGuids)

      this.dropdownsettingsTypeS = {
        singleSelection: false,
        idField: 'guid',
        textField: 'value',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
    }
  }
  onFormSubmit() {
    this.loader = true;
    this.TransferstoAgentsData = false;
    let body =
    {
      "agentIds": [this.Agentguid],
      "firstRecord": this.TransferstoAgentsForm.value.firstRecord - 1,
      "maxCountRecord": Number(this.TransferstoAgentsForm.value.maxCountRecord),
      "wallets": [this.TransferstoAgentsForm.value.Currency]
    }
    this.AgentControlService.getAgentToAgentTransfers(body).subscribe((data) => {
      console.log(data);
      this.loader = false;
      this.TransferstoAgentsData = data.objectList;
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount;

      for (let i = 0; i < this.TransferstoAgentsData.length; i++) {
        for (let j = 0; j < this.TransferDirectionTypesList.length; j++) {
          if (this.TransferstoAgentsData[i].direction.lowLong == this.TransferDirectionTypesList[j].guid.lowLong) {
            this.TransferstoAgentsData[i].direction = this.TransferDirectionTypesList[j].value
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
    XLSX.writeFile(wb, 'AgentTransferstoAgentsExcelSheet.xlsx');
  }

  exportCsv(): void {
    let element = document.getElementById('excel_table');
    this.FileformatServiceService.exportCsv(element, "AgentTransferstoAgentsExcelSheet")
  }


  //  ************************************* @types Dropdown Starts*********************************
  onItemSelectTYPes(data: any) {
  this.TYpesGuids = []
  this.TransferstoAgentsForm.value.Types.forEach((item: { guid: any; }) => {
    this.TYpesGuids.push(item.guid);
  });
  console.log(this.TYpesGuids)
}
OnItemDeSelectTYPes(data: any) {
  this.TYpesGuids = []
  this.TransferstoAgentsForm.value.Types.forEach((item: { guid: any; }) => {
    this.TYpesGuids.push(item.guid);
  });
  console.log(this.TYpesGuids)
  if (this.TYpesGuids === null || this.TYpesGuids.length === 0) {
    console.log("Empty");
    this.TYpesGuids = this.copyTYpesGuids
  }
}
onSelectAllTYPes(data: any) {
  this.TYpesGuids = []
  data.forEach((item: { guid: any; }) => {
    this.TYpesGuids.push(item.guid);
  });
  console.log(this.TYpesGuids)
}
onDeSelectAllTYPes(data: any) {
  this.TYpesGuids = []
  this.TYpesGuids = this.copyTYpesGuids
  console.log(this.TYpesGuids)
}
//  ************************************* @types Dropdown ends********************
  viewdata(data:any,index:any){
    console.log(data)
    console.log(index)
    this.popupview = true
    this.agentlogin =data.initiator.login    
    this.cashtype = data.direction
    this.dateform = data.date
    this.amount =  data.amount.value
    this.agentname = data.agent.login
    this.referAgent = data.refAgent.login
  }
  closepop(){
    this.popupview = false
  }
  AgentExplore(name: any, guid: any) {
    sessionStorage.setItem('AgentName', JSON.stringify(name))
    sessionStorage.setItem('Agentguid', JSON.stringify(guid))
    console.log(name)
    console.log(guid)
    var baseUrl= window.location.hash ? '#/Agentexplorer/AgentSummary ':'/Agentexplorer/AgentSummary';

    // window.open('/Agentexplorer/AgentSummary')   
    window.open(baseUrl)   
  }
}
