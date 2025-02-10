import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PokergamesService {
  constructor(private http: HttpClient) { }
  getDataFromUrl() {
    return this.http.get(`https://jsonplaceholder.typicode.com/todos`)
  }
  UsersDataFromJsonPlaceHolder() {
    return this.http.get(`https://jsonplaceholder.typicode.com/users`)
  }
  ngOnInit(): void {
  }
  getPokerGameSessions(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerGameSessions}`, data, this.httpOptions());
  }
  getPkrTblGroupList(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerTableGroupList}`, data, this.httpOptions());
  }
  getrakestructure(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerRakeStructure}`, data, this.httpOptions());
  }
  PokerSitngos(Data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerSitnGo}`, Data, this.httpOptions());
  }
  PokerTournaments(Data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getpokertournament}`, Data, this.httpOptions());
  }
  getBlindStructureList(data: any) {
    const body = {}
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getBlindStructureList}`, data, this.httpOptions());
  }
  getPokerPayoutStructureList(Data: any) {
    const body = {}
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerPayoutStructureList}`, Data, this.httpOptions());
  }
  Pokersatiliteseries(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.PokerSatiliteSeries}`, data, this.httpOptions());
  }
  getPokerTournamentSeries(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerTournamentSeries}`, data, this.httpOptions());
  }
  listTournamentTickets(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.listTournamentTickets}`, data, this.httpOptions());
  }
  gettournamenttickets(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getTournamentTickets}`, data, this.httpOptions());
  }
  convertTournamentTicketsToTournamentMoney(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.convertTournamentTicketsToTournamentMoney}`, data, this.httpOptions());
  }
  convertTournamentTicketsToCash(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.convertTournamentTicketsToCash}`, data, this.httpOptions());
  }
  deleteTournamentTickets(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.deleteTournamentTickets}`, data, this.httpOptions());
  }
  getpokergamesessionshisory(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.PokerHandsHistorySession}`, data, this.httpOptions());
  }
  getPokerTableHistory(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerTableHistory}`, data, this.httpOptions());
  }
  getPokerTournamentsHistory(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerTournamentsHistory}`, data, this.httpOptions());
  }
  TimeoutSetting(Data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerTimeoutsSettings}`, Data, this.httpOptions());
  }
  // pokerPayoutTables(data:any) {
  //   const body = {}
  //   return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.pokerPayoutTable}`,data, this.httpOptions());
  // }
  TimeoutSettings() {
    const body = {}
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerTimeoutsSettings}`, body, this.httpOptions());
  }

  getRakeStructureList(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getRakeStructureList}`, data, this.httpOptions());
  }


  setPokerTimeoutsSettings(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.setPokerTimeoutsSettings}`, data, this.httpOptions());
  }
  setPokerTournamentSeries(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.setPokerTournamentSeries}`, data, this.httpOptions());
  }
  enableTournamentSeries(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.enableTournamentSeries}`, data, this.httpOptions());
  }
  setPokerTableGroup(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.setPokerTableGroup}`, data, this.httpOptions());
  }
  closePokerTable(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.closePokerTable}`, data, this.httpOptions());
  }
  setPokerTableGroupStatus(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.setPokerTableGroupStatus}`, data, this.httpOptions());
  }
  setPokerTournamentSettings(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.setPokerTournamentSettings}`, data, this.httpOptions());
  }
  enableTournament(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.enableTournament}`, data, this.httpOptions());
  }
  createBlindStructure(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.createBlindStructure}`, data, this.httpOptions());
  }
  updateBlindStructure(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.updateBlindStructure}`, data, this.httpOptions());
  }
  createRakeStructure(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.createRakeStructure}`, data, this.httpOptions());
  }
  updateRakeStructure(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.updateRakeStructure}`, data, this.httpOptions());
  }
  createPokerPayoutsStructure(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.createPokerPayoutsStructure}`, data, this.httpOptions());
  }
  updatePokerPayoutsStructure(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.updatePokerPayoutsStructure}`, data, this.httpOptions());
  }
  cancelTournament(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.cancelTournament}`, data, this.httpOptions());
  }
  continueTournament(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.continueTournament}`, data, this.httpOptions());
  }
  pauseTournament(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.pauseTournament}`, data, this.httpOptions());
  }
  getPlayersPokerHandsHistory(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPlayersPokerHandsHistory}`, data, this.httpOptions());
  }
  getPokerHandsHistory(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerHandsHistory}`, data, this.httpOptions());
  }
  getPokerHandHistoryDetails(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerHandHistoryDetails}`, data, this.httpOptions());
  }
  getGameTableChatHistory(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getGameTableChatHistory}`, data, this.httpOptions());
  }
  getPokerTournamentInfo(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerTournamentInfo}`, data, this.httpOptions());
  }
  getTournamentPlayers(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getTournamentPlayers}`, data, this.httpOptions());
  }
  getPokerTournamentTables(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerTournamentTables}`, data, this.httpOptions());
  }
  getTournamentChatHistory(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getTournamentChatHistory}`, data, this.httpOptions());
  }
  getPokerTournamentRegistrationInfo(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.getPokerTournamentRegistrationInfo}`, data, this.httpOptions());
  }
  findPokerTournamentPlayerRegistrationCandidate(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.findPokerTournamentPlayerRegistrationCandidate}`, data, this.httpOptions());
  }
  registerTournamentPlayer(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.registerTournamentPlayer}`, data, this.httpOptions());
  }
  getPlayerPokerTableHistory(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.playerexplorer.getPlayerPokerTableHistory}`, data, this.httpOptions());
  }
  getPokerTournamentPlayersHistory(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.playerexplorer.getPokerTournamentPlayersHistory}`, data, this.httpOptions());
  }
  getPokerTournamentSettings(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.playerexplorer.getPokerTournamentSettings}`, data, this.httpOptions());
  }
  createTournamentTicket(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.PokerGames.playerexplorer.createTournamentTicket}`, data, this.httpOptions());
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
