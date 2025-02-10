import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JackpotsService {

  constructor(private http: HttpClient) { }

  jackpotslist(data:any){
    const headers = new HttpHeaders({'content-type':'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.JackPots.getJackpotsList}`,data, this.httpOptions(),)
  }
  setJackpot(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.JackPots.setJackpot}`,data, this.httpOptions(),)
  }
  JackpotAdjustments(data:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.JackPots.listJackpotAdjustments}`, data, this.httpOptions(),)
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
