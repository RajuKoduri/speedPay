import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionalServiceService {

  constructor(private http: HttpClient) { }

  getLeaderboardSettings(Data:any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Promotions.getLeaderboardSettings}`, Data, this.httpOptions());
  }
  getLeaderboardsList(Data:any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Promotions.getLeaderboardsList}`, Data, this.httpOptions());
  }
  PromtionalCodes(Data:any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Promotions.getPromotionalCodes}`, Data, this.httpOptions());
  }
  setPromotionalCode(Data:any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Promotions.setPromotionalCode}`, Data, this.httpOptions());
  }
  setPromotionalCodeActivity(Data:any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Promotions.setPromotionalCodeActivity}`, Data, this.httpOptions());
  }
  bounsabuse(Data:any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Promotions.getBounsABuse}`, Data, this.httpOptions());
  }
  setBonusAbuseSettings(Data:any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Promotions.setBonusAbuseSettings}`, Data, this.httpOptions());
  }
  getdepositbonuslimit(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Promotions.getdepositbonuslimit}`, data, this.httpOptions(),)
  }
  setdepositbonuslimit(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Promotions.setdepositbonuslimit}`, data, this.httpOptions(),)
  }
  setPlayerDepositBonusLimits(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Promotions.setPlayerDepositBonusLimits}`, data, this.httpOptions(),)
  }
  getPlayerDepositBonusLimits(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.Promotions.getPlayerDepositBonusLimits}`, data, this.httpOptions(),)
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
