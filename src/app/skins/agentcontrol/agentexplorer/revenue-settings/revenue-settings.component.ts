import { Component, OnInit } from '@angular/core';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { AgentControlService } from 'src/app/source/AgentControl.service';





@Component({
  selector: 'app-revenue-settings',
  templateUrl: './revenue-settings.component.html',
  styleUrls: ['./revenue-settings.component.css']
})
export class RevenueSettingsComponent implements OnInit {
  Agentguid: any;
  AgentGrossRevenuePercents: any;
  loader: boolean = false;
  ChangePrecentPop: boolean = false;
  ChangePrecentSuccessPop: boolean = false;
  parameters: any = [];
  rowsOnthePage:any;
  ResultCount:any;

  constructor(private AgentControlService: AgentControlService,private DateTimePipe:DateTimePipe) { }

  ngOnInit(): void {
    this.Agentguids();
    this.getAgentGrossRevenuePercents();
  }

  changeSelect(date:any){
   const formatDate =  this.DateTimePipe.transforminingDispalyDate(date);
   return formatDate

  }

  Agentguids() {
    const Agentguid = sessionStorage.getItem('Agentguid');
    if (Agentguid) {
      this.Agentguid = JSON.parse(Agentguid)
    }
  }

  getAgentGrossRevenuePercents() {
    this.loader = true;
    this.AgentGrossRevenuePercents = false;
    let body = {
      "idList": [this.Agentguid]
    }
    this.AgentControlService.getAgentGrossRevenuePercents(body).subscribe((data) => {
      console.log(data);
      this.loader = false;
      this.AgentGrossRevenuePercents = data.objectList
      this.rowsOnthePage = data.objectList.length
      this.ResultCount = data.resultCount
    })
  }
  ChangPercentPop() {
    this.ChangePrecentPop = true;

  }
  PopupClose() {
    this.ChangePrecentPop = false
  }
  ChangPercent() {
    console.log(this.AgentGrossRevenuePercents)

    this.AgentGrossRevenuePercents.forEach((a: any, index: any) => {
      let parameters = {
        "synId": a.synId,
        "parameter": a.parameter,
        "programName": a.programName,
        "percent": a.percent
      }
      this.parameters.push(parameters)
    });
    console.log(this.parameters);


    let body = {
      "data": this.parameters,
      "modifySubAgentsPercents": false,
      "agentIdList": {
        "idList": [this.Agentguid],
        "maxCountRecord": 0,
        "firstRecord": 100,
        "queryId": ""
      }
    }
    console.log(body)
    this.AgentControlService.setGrossRevenuePercents(body).subscribe((data) => {
      console.log(data);
      if (data) {
        this.ChangePrecentPop = false;
        this.ChangePrecentSuccessPop = true;
        this.getAgentGrossRevenuePercents()
      }
    })
  }
  SuccessPop() {
    this.ChangePrecentSuccessPop = false;
  }
}
