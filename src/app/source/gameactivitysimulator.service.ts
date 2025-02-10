import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameactivitysimulatorService {

  constructor(private http: HttpClient) { }

  StrategiesList(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.GameActivitysimulator.getBotStrategiesList}`, data, this.httpOptions(), )
  }
  BotsList(data:any){
    const header = new HttpHeaders({'content-Type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.GameActivitysimulator.getBotsList}`, data, this.httpOptions(), )
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
