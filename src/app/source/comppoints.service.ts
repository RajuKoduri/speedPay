import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComppointsService {

  constructor(private http:HttpClient ) { }
  earnpoints(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.comppointssetting}`,Data, this.httpOptions())
  }
  getCompPointBalance(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.getAccPlayersCompPointsBalance}`,Data, this.httpOptions())
  }
  getPlayerCompPointsBalances(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.getPlayerCompPointsBalances}`,Data, this.httpOptions())
  }
  getcomppointearnsettings(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.getCompPointsEarnSettings}`,Data, this.httpOptions())
  }
  exchanges(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.exchangerates}`,Data, this.httpOptions())
  }
  setCompPointsExchangeRates(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.setCompPointsExchangeRates}`,Data, this.httpOptions())
  }
  compLevel(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.complevel}`,Data, this.httpOptions())
  }
  listCompPointsLevels(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.listCompPointsLevels}`,Data, this.httpOptions())
  }
  getCompPointsCounters(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.getCompPointsCounters}`,Data, this.httpOptions())
  }
  getCompPointsAdjustments(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.getCompPointsAdjustments}`,Data, this.httpOptions())
  }
  setCompPointsAdjustment(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.setCompPointsAdjustment}`,Data, this.httpOptions())
  }
  getCompPointsLevelChangeList(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.getCompPointsLevelChangeList}`,Data, this.httpOptions())
  }
  pointsetting(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.pointsettings}`,Data, this.httpOptions())
  }
  setCompPointsSettings(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.setCompPointsSettings}`,Data, this.httpOptions())
  }
  getCompPointsExchanges(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.getCompPointsExchanges}`,Data, this.httpOptions())
  }
  setCompPointsSettingApi(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.setCompPointsEarnSettings}`,Data, this.httpOptions())
  }
  updateCompPointLevel(Data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.CompPoints.updateComPointsLevelsAndRecalculatePlayers}`,Data, this.httpOptions())
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

