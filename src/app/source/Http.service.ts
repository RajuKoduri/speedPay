import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
constructor(private http: HttpClient) {}

login(data: any){
  const body = JSON.stringify(data);
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post<any>(`${environment.api.login}`,body,{headers})
}
getPlayers(data: any){
  const body = JSON.stringify(data);
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post<any>('http://pixpoker-dev.czargaming.com/api/backoffice/getPlayerLevelsNames',body,{headers})
}
}
