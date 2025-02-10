import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

  constructor(private http: HttpClient) { }


  getDataFromUrl() {
    return this.http.get(`https://jsonplaceholder.typicode.com/todos`)
  }
  UsersDataFromJsonPlaceHolder() {
    return this.http.get(`https://jsonplaceholder.typicode.com/users`)
  }


  getPlayersSummaryByFilter(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getPlayersSummaryByFilter}`, data, this.httpOptions(),)
  }
  playerfilter(Data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getPlayersSummaryByFilter}`, Data, this.httpOptions());
  }

  getPlayersOnlineForGames(data: any) {
    const body = {}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getPlayersOnlineForGames}`, data, this.httpOptions(),)

  }
  getAccLockedBonuses(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getAccLockedBonuses}`, data, this.httpOptions(),)
  }
  getVisitList(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getVisitStat}`, data, this.httpOptions(),)
  }
  SuspiciousPlayers(data: any) {
    const body = {}
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getSuspiciousPlayers}`, data, this.httpOptions(),)

  }
  setSuspiciousPlayerActive(data: any) {
    const body = {}
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.setSuspiciousPlayerActive}`, data, this.httpOptions(),)
  }
  getBlackList(data: any): Observable<any> {
    const body = {}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getBlackList}`, data, this.httpOptions(),)
  }
  delBlackListRecords(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.delBlackListRecords}`, data, this.httpOptions(),)
  }
  getBlackListAnalizer(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getBlackListAnalizer}`, data, this.httpOptions(),)
  }
  getAccFraudPlayers(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getAccFraudPlayers}`, data, this.httpOptions())
  }
  listUserAccessRules(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.listUserAccessRules}`, data, this.httpOptions(),)
  }
  getPlayerRegistrationSettings(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getPlayerRegistrationSettings}`, data, this.httpOptions(),)
  }
  listUserPermissionsGroup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.listUserPermissionsGroup}`, data, this.httpOptions(),)
  }
  getWinnersStat(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getWinnersStat}`, data, this.httpOptions(),)
  }
  getLosersStat(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getLosersStat}`, data, this.httpOptions(),)
  }
  getPlayerDisconnectionProtectionSetup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getPlayerDisconnectionProtectionSetup}`, data, this.httpOptions(),)
  }
  resetPlayerDisconnectionProtectionSetting(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.resetPlayerDisconnectionProtectionSetting}`, data, this.httpOptions(),)
  }
  getAvatarList(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getAvatarList}`, data, this.httpOptions(),)
  }
  setAvatarStatus(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.setAvatarStatus}`, data, this.httpOptions(),)
  }
  createUserPermissionsGroup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.createUserPermissionsGroup}`, data, this.httpOptions(),)
  }
  updateUserPermissiomsGroup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.updateUserPermissionsGroup}`, data, this.httpOptions(),)
  }
  setUserAccessRule(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.setUserAccessRule}`, data, this.httpOptions(),)
  }
  getUserAccessRules(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.getUserAccessRules}`, data, this.httpOptions(),)
  }
  ActiveAccessRule(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.setUserAccessRuleActive}`, data, this.httpOptions(),)
  }

  getPlayersSummary(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getPlayersSummary}`, data, this.httpOptions(),)
  }
  getPlayersPersonal(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getPlayersPersonal}`, data, this.httpOptions(),)
  }
  setPlayersPersonal(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayersPersonal}`, data, this.httpOptions(),)
  }

  getPlayerVisibleCashWallets(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getPlayerVisibleCashWallets}`, data, this.httpOptions(),)
  }
  listStoredFile(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.listStoredFile}`, data, this.httpOptions(),)
  }
  getPlayersBalances(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getPlayersBalances}`, data, this.httpOptions(),)
  }
  getCurrencyExchangeRates(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getCurrencyExchangeRates}`, data, this.httpOptions(),)
  }
  setPlayerBonusAdjustment(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayerBonusAdjustment}`, data, this.httpOptions(),)
  }
  setPlayerCashAdjustment(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayerCashAdjustment}`, data, this.httpOptions(),)
  }
  adjustTournamentMoney(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.adjustTournamentMoney}`, data, this.httpOptions(),)
  }
  setPlayerDeposit(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayerDeposit}`, data, this.httpOptions(),)
  }
  getPlayerCashWallets(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getPlayerCashWallets}`, data, this.httpOptions(),)
  }
  getPlayerHouseRevenue(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getPlayerHouseRevenue}`, data, this.httpOptions(),)
  }
  getPlayerCashoutRequest(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getPlayerCashoutRequest}`, data, this.httpOptions(),)
  }
  setPlayerTrusted(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayerTrusted}`, data, this.httpOptions(),)
  }
  setPlayerMarkAsFraud(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayerMarkAsFraud}`, data, this.httpOptions(),)
  }
  setPlayerActive(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayerActive}`, data, this.httpOptions(),)
  }
  setDeclineDeposits(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setDeclineDeposits}`, data, this.httpOptions(),)
  }
  setPlayerChatAllowed(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayerChatAllowed}`, data, this.httpOptions(),)
  }
  reactivationFraudPlayers(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.reactivationFraudPlayers}`, data, this.httpOptions(),)
  }
  changePlayersPermissionsGroup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.changePlayersPermissionsGroup}`, data, this.httpOptions(),)
  }
  assignCompPointsLevelToPlayer(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.assignCompPointsLevelToPlayer}`, data, this.httpOptions(),)
  }
  setPlayerAlias(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayerAlias}`, data, this.httpOptions(),)
  }
  setPlayerRegistrationSettings(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.setPlayerRegistrationSettings}`, data, this.httpOptions(),)
  }
  getPlayerComments(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getPlayerComments}`, data, this.httpOptions(),)
  }
  getPlayerAnalizer(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getPlayerAnalizer}`, data, this.httpOptions(),)
  }
  getPlayerIpHistory(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getPlayerIpHistory}`, data, this.httpOptions(),)
  }
  setRemoteActivity(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setRemoteActivity}`, data, this.httpOptions(),)
  }
  setPlayerDisconnectionProtectionSetup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayerDisconnectionProtectionSetup}`, data, this.httpOptions(),)
  }
  setPlayerComment(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayerComment}`, data, this.httpOptions(),)
  }
  delPlayerComment(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.delPlayerComment}`, data, this.httpOptions(),)
  }
  getStoredFileContent(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getStoredFileContent}`, data, this.httpOptions(),)
  }
  delStoredDocument(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.delStoredDocument}`, data, this.httpOptions(),)
  }
  addstoredDoc(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.addstoredDoc}`, data, this.httpOptions(),)
  }
  getListstoredDocument(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.liststoredDoc}`, data, this.httpOptions(),)
  }
  getplayervisablewalletcahout(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.getplayervisablewalletCashout}`, data, this.httpOptions(),)
  }
  prepareRestrictPlayer(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.prepareRestrictPlayer}`, data, this.httpOptions(),)
  }
  prepareMarkAsFraud(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.prepareMarkAsFraud}`, data, this.httpOptions(),)
  }
  setPlayerRestrict(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.playerControl.PlayerExpolore.setPlayerRestrict}`, data, this.httpOptions(),)
  }
  // *************  //

  StrategiesList(data: any) {
    const header = new HttpHeaders({ 'content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.GameActivitysimulator.getBotStrategiesList}`, data, this.httpOptions(),)
  }
  BotsList(data: any) {
    const header = new HttpHeaders({ 'content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.GameActivitysimulator.getBotsList}`, data, this.httpOptions(),)
  }

  PlayerExplore(name: any, guid: any, List: any) {
    sessionStorage.setItem('PlayerExplorerData', JSON.stringify(List));
    console.log(guid);
    let palyerData = {
      hiLong: guid.hiLong,
      lowLong: guid.lowLong,
      name: name,
    };
    sessionStorage.setItem("playerdatainfo", JSON.stringify(palyerData))
    sessionStorage.setItem('PlayerName', JSON.stringify(name));
    sessionStorage.setItem('Playerguid', JSON.stringify(guid));
    // var baseUrl = '/playerexplorer/PlayersSummary';
    var baseUrl = window.location.hash ? '#/playerexplorer/PlayersSummary' : '/playerexplorer/PlayersSummary';

    var urlWithParams = baseUrl + '?data=' + JSON.stringify(palyerData);
    window.open(baseUrl);
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

