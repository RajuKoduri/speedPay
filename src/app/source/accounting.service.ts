import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(private http: HttpClient) { }

  HouseList(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getAccCasinoBalance}`, data, this.httpOptions(),)
  }
  getAccPlayersBalance(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getAccPlayersBalance}`, data, this.httpOptions(),)
  }
  getPlayerSummaryBalances(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.playerexplorer.getPlayerSummaryBalances}`, data, this.httpOptions(),)
  }
  BalanceList(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getGamesAccounting}`, data, this.httpOptions(),)
  }
  SimulatorList(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getAccBotStrategiesExpences}`, data, this.httpOptions(),)
  }
  ClubList(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getAccClubGamesBalance}`, data, this.httpOptions(),)
  }
  AffiliateList(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getAccAffWebmasterPayments}`, data, this.httpOptions(),)
  }
  AffExpList(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getAccAffiliateExpense}`, data, this.httpOptions(),)
  }
  AgentsList(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getAgentsBalance}`, data, this.httpOptions(),)
  }
  AgentsNestedList(data:any){
    const header = new HttpHeaders({'content-Type':'applicaton/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getAgentsNestedBalance}`,data, this.httpOptions(),)
  }
  AgentExpensesList(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getAccAgentExpense}`,data, this.httpOptions(),)
  }
  SummaryList(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getAccSummary}`, data, this.httpOptions(),)
  }
  httpOptions() {
    let ws = JSON.stringify(sessionStorage.getItem('wsession')) 
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'wsession': JSON.parse(ws), 
      })
    };
    return options;
  }
}
