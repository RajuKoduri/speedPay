import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasinogamesService {

constructor(private http: HttpClient) { }

//  CasinoGameSessions(Data:any) {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.post<any>(`${environment.api.baseUrl}${environment.api.getCasinoGameSessions}`, Data, this.httpOptions());
//   }
  CasinoGameSessions(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CasinoGames.getCasinoGameSessions}`, data, this.httpOptions(),)
  }
  FreeMoneyGames(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CasinoGames.getFreeGameSettings}`, data, this.httpOptions(),)
  }
  setFreeGameSettings(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CasinoGames.setFreeGameSettings}`, data, this.httpOptions(),)
  }
  GameRoundList(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CasinoGames.getGameRoundList}`, data, this.httpOptions(),)
  }
  GamesList(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CasinoGames.getGameList}`, data, this.httpOptions(),)
  }
  GamesgetGameParametersWizardDataList(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CasinoGames.getGameParametersWizardData}`, data, this.httpOptions(),)
  }
  listGameParametersPresets(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CasinoGames.listGameParametersPresets}`, data, this.httpOptions(),)
  }

httpOptions() {
  let ws = JSON.stringify(sessionStorage.getItem('wsession'))
  let body = {}
  let options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'wsession': JSON.parse(ws),

    })
  };

  return options;
}


}
