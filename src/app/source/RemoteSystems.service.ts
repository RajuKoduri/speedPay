import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RemoteSystemsService {

constructor(private http: HttpClient) { }

getRemoteSystems(data: any) {
  const body = {}
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.RemoteSystems.getRemoteSystems}`, body, this.httpOptions(),)
}
setRemoteSystem(data: any) {
  const body = {}
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.RemoteSystems.setRemoteSystem}`, data, this.httpOptions(),)
}
RemoteGameListData(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.RemoteSystems.getRemoteGamesList}`, data, this.httpOptions(),)
}
RemoteGameSessionsData(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.RemoteSystems.getRemoteGameSessions}`, data, this.httpOptions(),)
}
getRemoteActivitySummary(data: any) {
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.RemoteSystems.getRemoteActivitySummary}`, data, this.httpOptions(),)
}
getRemoteActivityHistory(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.RemoteSystems.getRemoteActivityHistory}`, data, this.httpOptions(),)
}
subActionList(data: any) {
  const header = new HttpHeaders({ 'content-Type': 'application/json' });
  return this.http.post<any>(`${environment.api.baseUrl}${environment.api.RemoteSystems.getRemoteGameSessionActions}`, data, this.httpOptions(),)
}
countryInfo(productId:any) {  
  const header = 'http://localhost:49661/api/Company/getProductCountryInformation?productId='+productId;  
  return this.http.get<any[]>(header);  
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
