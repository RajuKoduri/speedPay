import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CashierService {

constructor(private http: HttpClient) { }

getAgentToPlayerTransfers(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAgentToPlayerTransfers}`, data, this.httpOptions(),)
}
getAgentToAgentTransfers(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAgentToAgentTransfers}`, data, this.httpOptions(),)
} 
getAgentRevenuePayments(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAgentRevenuePayments}`, data, this.httpOptions(),)
} 
getAgentRevenueAdjustment(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAgentRevenueAdjustment}`, data, this.httpOptions(),)
} 
getWebmasterPaymentsByFilter(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getWebmasterPaymentsByFilter}`, data, this.httpOptions(),)
} 
getAffiliateRevenueAdjustment(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAffiliateRevenueAdjustment}`, data, this.httpOptions(),)
} 
getPromotionalCodeUsages(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getPromotionalCodeUsages}`, data, this.httpOptions(),)
} 
getTransactions(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getTransactions}`, data, this.httpOptions(),)
} 
getAccFraudLosses(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAccFraudLosses}`, data, this.httpOptions(),)
} 
listGameBankAdjustments(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.listGameBankAdjustments}`, data, this.httpOptions(),)
} 
getAgentBalanceAdjustments(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAgentBalanceAdjustments}`, data, this.httpOptions(),)
} 
getCurrencyExchanges(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getCurrencyExchanges}`, data, this.httpOptions(),)
} 
getPlayerCurrencyExchanges(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.playerexplorer.getPlayerCurrencyExchanges}`, data, this.httpOptions(),)
} 
getLeaderboardPayments(data:any){
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getLeaderboardPayments}`, data, this.httpOptions(),)
} 
FraudControlSettings(data:any){
  const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.getFraudControlSettings}`, data, this.httpOptions(),)
}
setFraudControlSettings(data:any){
  const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.setFraudControlSettings}`, data, this.httpOptions(),)
}
Merchantsettings(data: any) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.getMerchantSettings}`, data, this.httpOptions(),)
}
setMerchantSettings(data: any) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.setMerchantSettings}`, data, this.httpOptions(),)
}
getCurrency(data: any) {
  const header = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.getCurrency}`, data, this.httpOptions(),)
}
setCurrency(data: any) {
  const header = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.setCurrency}`, data, this.httpOptions(),)
}
getWalletExchangeSettings(data:any){
  const header = new HttpHeaders({ 'content-Type':'application/json'});
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.getWalletExchangeSettings}`, data, this.httpOptions(),)
}
setWalletExchangeSettings(data:any){
  const header = new HttpHeaders({ 'content-Type':'application/json'});
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.setWalletExchangeSettings}`, data, this.httpOptions(),)
}
getDepositLimits(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.getDepositLimits}`, data, this.httpOptions(),)
}
getPlayerDepositLimits(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.getPlayerDepositLimits}`, data, this.httpOptions(),)
}
setDepositLimits(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.setDepositLimits}`, data, this.httpOptions(),)
}
getCommonTransferLimits(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.getCommonTransferLimits}`, data, this.httpOptions(),)
}
getUserTransferLimits(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.getUserTransferLimits}`, data, this.httpOptions(),)
}
getReferringSettings(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.getReferringSettings}`, data, this.httpOptions(),)
}
getPlayersReferringSettings(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.getPlayersReferringSettings}`, data, this.httpOptions(),)
}
getPlayerSettings(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.getPlayerSettings }`, data, this.httpOptions(),)
}
setPlayerSettings(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.settings.setPlayerSettings }`, data, this.httpOptions(),)
}
Exchangelist(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getCurrencyExchangeRates}`, data, this.httpOptions(),)
}
Cashout(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAccCashout}`, data, this.httpOptions(),)
}
getWithdrawals(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getWithdrawals}`, data, this.httpOptions(),)
}
getPlayerWithdrawals(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.playerexplorer.getPlayerWithdrawals}`, data, this.httpOptions(),)
}
getAgentCreditBacks(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentCreditBacks}`, data, this.httpOptions(),)
}
Deposits(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getDeposits}`, data, this.httpOptions(),)
}
getChargebacks(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getChargebacks}`, data, this.httpOptions(),)
}
getPlayerChargebacks(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.playerexplorer.getPlayerChargebacks}`, data, this.httpOptions(),)
}
getAgentChargebacks(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AgentControl.AgentExplorer.getAgentChargebacks}`, data, this.httpOptions(),)
}
getCommonPlayerTransfers(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getCommonPlayerTransfers}`, data, this.httpOptions(),)
}
getAccBalanceAdjustment(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAccBalanceAdjustment}`, data, this.httpOptions(),)
}
getPlayerCashAdjustment(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.playerexplorer.getPlayerCashAdjustment}`, data, this.httpOptions(),)
}
getAccBonusAdjustment(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAccBonusAdjustment}`, data, this.httpOptions(),)
}
getPlayerBonusAdjustment(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.playerexplorer.getPlayerBonusAdjustment}`, data, this.httpOptions(),)
}
getTournamentMoneyAdjustments(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getTournamentMoneyAdjustments}`, data, this.httpOptions(),)
}
getPlayerTournamentMoneyAdjustment(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.playerexplorer.getPlayerTournamentMoneyAdjustment}`, data, this.httpOptions(),)
}
getPlayerCashouts(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.playerexplorer.getPlayerCashouts}`, data, this.httpOptions(),)
}
getPlayerDeposits(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.playerexplorer.getPlayerDeposits}`, data, this.httpOptions(),)
}

getAvailableCashoutDeposits(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAvailableCashoutDeposits}`, data, this.httpOptions(),)
}
getAvailableCashoutMeansForAgent(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAvailableCashoutMeansForAgent}`, data, this.httpOptions(),)
}
getAvailableCashoutMeansForPlayer(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.getAvailableCashoutMeansForPlayer}`, data, this.httpOptions(),)
}
setCashoutRequestReversal(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.setCashoutRequestReversal}`, data, this.httpOptions(),)
}
setCashoutRequestReversalRiver(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.setCashoutRequestReversalRiver}`, data, this.httpOptions(),)
}
setCashoutRequestApproveForPlayer(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.setCashoutRequestApproveForPlayer}`, data, this.httpOptions(),)
}
setCashoutRequestApproveForPlayerRiver(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.setCashoutRequestApproveForPlayerRiver}`, data, this.httpOptions(),)
}
withdrawlscompCashout(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.setPlayerCompulsoryCashout}`, data, this.httpOptions(),)
}
setFraudPaymentForPlayer(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.setFraudPaymentForPlayer}`, data, this.httpOptions(),)
}
setFraudPaymentForAgent(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.setFraudPaymentForAgent}`, data, this.httpOptions(),)
}
commitTransaction(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.commitTransaction}`, data, this.httpOptions(),)
}
rollbackTransactions(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.rollbackTransactions}`, data, this.httpOptions(),)
}
restartTransaction(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Cashier.restartTransaction}`, data, this.httpOptions(),)
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
