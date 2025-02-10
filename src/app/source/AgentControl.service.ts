import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentControlService {
  [x: string]: any;

  constructor(private http: HttpClient) { }
  
  AgentsList(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.getAgentsList}`, data, this.httpOptions(),)
  }
  getAgentStatistics(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.getAgentStatistics}`, data, this.httpOptions(),)
  }

  listUserAccessRules(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.listUserAccessRules}`, data, this.httpOptions(),)
  }
  getAgentRegistrationSettings(Data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.getAgentRegistrationSettings}`, Data, this.httpOptions())
  }
  listUserPermissionsGroup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.listUserPermissionsGroup}`, data, this.httpOptions(),)
  }
  makeDefaultUserPermissionsGroup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.makeDefaultUserPermissionsGroup}`, data, this.httpOptions(),)
  }
  deleteUserPermissionsGroup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.deleteUserPermissionsGroup}`, data, this.httpOptions(),)
  }

  getAgentGrossRevenueDefaultPercents(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.getAgentGrossRevenueDefaultPercents}`, data, this.httpOptions(),)
  }
  createAgent(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.createAgent}`, data, this.httpOptions(),)
  }
  setAgentStatus(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.setAgentStatus}`, data, this.httpOptions(),)
  }
  getAgentSummaryInfo(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentSummaryInfo}`, data, this.httpOptions(),)
  }
  getAgentsPersonal(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentsPersonal}`, data, this.httpOptions(),)
  }
  getAgentsSummaryBalance(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentsSummaryBalance}`, data, this.httpOptions(),)
  }
  getAgentsNestedBalance(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Accounting.getAgentsNestedBalance}`, data, this.httpOptions(),)
  }
  getAgentsRevenueSummary(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentsRevenueSummary}`, data, this.httpOptions(),)
  }
  getAgentCashWallets(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentCashWallets}`, data, this.httpOptions(),)
  }
  getAgentRevenueFromPlayers(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentRevenueFromPlayers}`, data, this.httpOptions(),)
  }
  getAgentRevenueFromAgents(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentRevenueFromAgents}`, data, this.httpOptions(),)
  }
  getAgentGrossRevenuePercents(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentGrossRevenuePercents}`, data, this.httpOptions(),)
  }
  setGrossRevenuePercents(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.setGrossRevenuePercents}`, data, this.httpOptions(),)
  }
  getAgentVisibleCashWallets(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentVisibleCashWallets}`, data, this.httpOptions(),)
  }
  getAgentsBalances(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentsBalances}`, data, this.httpOptions(),)
  }
  setAgentBalanceAdjustment(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.setAgentBalanceAdjustment}`, data, this.httpOptions(),)
  }
  getAgentChargebacksForReferredPlayers(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentChargebacksForReferredPlayers}`, data, this.httpOptions(),)
  }
  getAgentIpHistory(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentIpHistory}`, data, this.httpOptions(),)
  }
  getAgentToAgentTransfers(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAgentToAgentTransfers}`, data, this.httpOptions(),)
  }
  getAgentToPlayerTransfers(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAgentToPlayerTransfers}`, data, this.httpOptions(),)
  }
  getAgentRevenueAdjustment(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAgentRevenueAdjustment}`, data, this.httpOptions(),)
  }
  setLinkStatusBetweenAgentAndPlayer(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.setLinkStatusBetweenAgentAndPlayer}`, data, this.httpOptions(),)
  }
  setLinkStatusBetweenAgentAndAgent(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.setLinkStatusBetweenAgentAndAgent}`, data, this.httpOptions(),)
  }
  changeAgentsPermissionsGroup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.changeAgentsPermissionsGroup}`, data, this.httpOptions(),)
  }
  createTransferBetweenAgents(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.createTransferBetweenAgents}`, data, this.httpOptions(),)
  }
  createTransferBetweenAgentAndPlayer(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.createTransferBetweenAgentAndPlayer}`, data, this.httpOptions(),)
  }
  getAgentCampaigns(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentCampaigns}`, data, this.httpOptions(),)
  }
  getUserByLogin(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getUserByLogin}`, data, this.httpOptions(),)
  }
  referPlayerByAgent(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.referPlayerByAgent}`, data, this.httpOptions(),)
  }
  referAgentByAgent(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.referAgentByAgent}`, data, this.httpOptions(),)
  }

  makeAgentWalletPreferred(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.makeAgentWalletPreferred}`, data, this.httpOptions(),)
  }
  setAgentsPersonal(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.setAgentsPersonal}`, data, this.httpOptions(),)
  }

  makePaymentForAgents(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.makePaymentForAgents}`, data, this.httpOptions(),)
  }
  getAgentDeposits(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentDeposits}`, data, this.httpOptions(),)
  }
  getAgentCurrencyExchanges(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentCurrencyExchanges}`, data, this.httpOptions(),)
  }
  getAgentCashouts(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentCashouts}`, data, this.httpOptions(),)
  }
  setAgentRegistrationSettings(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.setAgentRegistrationSettings}`, data, this.httpOptions(),)
  }
  DetailedTractionalhistory(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getDetailedTransactionHistory}`, data, this.httpOptions(),)
  }
 

  agentExplore(name: any, guid: any, agentInfo: any) {
    console.log(name, guid)
    sessionStorage.setItem('AgentName', JSON.stringify(name))
    sessionStorage.setItem('Agentguid', JSON.stringify(guid))
    sessionStorage.setItem('AgentInfo', JSON.stringify(agentInfo))
    sessionStorage.setItem('explorerType', JSON.stringify("Agent"))
    console.log(name)
    console.log(guid)
    var Url = window.location.hash ? '#/Agentexplorer/AgentSummary' : '/Agentexplorer/AgentSummary';
    window.open(Url)
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
