import { Component, OnInit } from '@angular/core';
import { DateTimePipe } from 'src/app/pipe/date-time.pipe';
import { AgentControlService } from 'src/app/source/AgentControl.service';


@Component({
  selector: 'app-agent-summary',
  templateUrl: './agent-summary.component.html',
  styleUrls: ['./agent-summary.component.css']
})
export class AgentSummaryComponent implements OnInit {
  AgentSummaryData: any;
  AgentGuid: any;
  Agentstatus: any;

  constructor(private DateTimePipe:DateTimePipe,  private AgentControlService: AgentControlService) { }

  ngOnInit(): void {
    this.GetAgentGuid();
    this.AgentSummary();
    this.Agentsstatus();
  }


  GetAgentGuid() {
    let AgentGuid = sessionStorage.getItem('Agentguid')
    if (AgentGuid) {
      this.AgentGuid = JSON.parse(AgentGuid)
    }
  }
  Agentsstatus() {
    const playerstatus = localStorage.getItem('Agentstatus')
    if (playerstatus) {
      this.Agentstatus = JSON.parse(playerstatus)
    }
    console.log("Agentstatus", this.Agentstatus)
  }
  AgentSummary() {
    let body = {
      "idList": [this.AgentGuid]
    }
    this.AgentControlService.getAgentSummaryInfo(body).subscribe((data) => {
      console.log(data);
      this.AgentSummaryData = data.objectList;
      for (let i = 0; i < this.AgentSummaryData.length; i++) {
        for (let j = 0; j < this.Agentstatus.length; j++) {
          if (this.AgentSummaryData[i].agent.status.lowLong == this.Agentstatus[j].guid.lowLong) {
            this.AgentSummaryData[i].agent.status = this.Agentstatus[j].value
          }
        }
      }
    })
  }


  changeSelect(date: string) {

    let c = this.DateTimePipe.transforminingDispalyDate(date);
    //  console.log(c)


    return (c)

  }
}
