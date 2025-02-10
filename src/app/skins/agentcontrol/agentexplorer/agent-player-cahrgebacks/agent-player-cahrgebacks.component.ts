import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { AgentControlService } from 'src/app/source/AgentControl.service';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { TotalSumsService } from 'src/app/source/total-sums.service';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';

@Component({
  selector: 'app-agent-player-cahrgebacks',
  templateUrl: './agent-player-cahrgebacks.component.html',
  styleUrls: ['./agent-player-cahrgebacks.component.css']
})
export class AgentPlayerCahrgebacksComponent implements OnInit {

  Agentguid: any;
  FillterMenu: boolean = true;
  playerchargbackForm: FormGroup;
  rowsOnthePage: any;
  ResultCount: any;
  loader: boolean = false;
  PlayerChargebackData: any;
  selectedRowData: any;
  isDoubleClick: boolean = false;
  totalChargebackSum: any;

  constructor(private DateTimePipe:DateTimePipe, private AgentControlService: AgentControlService, private totalSumService:TotalSumsService,
    private PlayerserviceService:PlayerServiceService, private AgentcontrolService:AgentControlService,
  ) {
    this.playerchargbackForm = new FormGroup({
      Currency: new FormControl(),
      repotingstart: new FormControl(),
      repotingend: new FormControl(),
      firstRecord: new FormControl('1'),
      maxCountRecord: new FormControl('100'),
    })
  }

  ngOnInit(): void {
    this.Agentguids();
  }

  changeSelect(date:any){
   const formatDate =  this.DateTimePipe.transforminingDispalyDate(date);
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
  onFormSubmit() {
    this.loader = true;
    this.PlayerChargebackData = false;
    let body = {
      "reportPeriod": this.playerchargbackForm.value.repotingstart != null ? {
        "end": this.playerchargbackForm.value.repotingstart,
        "start": this.playerchargbackForm.value.repotingend
      } : undefined,
      "idList": [this.Agentguid],
      "firstRecord": this.playerchargbackForm.value.firstRecord - 1,
      "maxCountRecord": Number(this.playerchargbackForm.value.maxCountRecord),

    }
    console.log(body);
    this.AgentControlService.getAgentChargebacksForReferredPlayers(body).subscribe((data) => {
      console.log(data);
      this.loader = false;
      this.PlayerChargebackData = data.objectList;
      this.getTotalSum() 
      this.rowsOnthePage = data.objectList.length;
      this.ResultCount = data.resultCount
    })
  }

  getWalletSymbol(wallet: any) {
    return this.totalSumService.walletSymbol(wallet)
  }

  getTotalSum() {
    this.totalChargebackSum = this.totalSumService.calculateSum(this.PlayerChargebackData, "amount");
    console.log(this.totalChargebackSum)
  }

  keys(data: any) {
    return Object.keys(data)
  }

  onDblClick(data:any){
    this.selectedRowData = data;
    this.isDoubleClick = true;
  }

  closeClicPopUp(){
    this.isDoubleClick = false;
  }

  PlayerExplore(name:any, guid:any, list:any){
    this.PlayerserviceService.PlayerExplore(name, guid, list)
  }

  AgentExplore(name: any, guid: any, agentInfo: any) {

    this.AgentcontrolService.agentExplore(name, guid, agentInfo)
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
    XLSX.writeFile(wb, 'RevenueSummaryExcelSheet.xlsx');

  }
}
