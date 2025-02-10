import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http:HttpClient) { }

  setBlackListRecord(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.setBlackListRecord}`, data, this.httpOptions(),)

  }
  getGeoIpProvider(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.getGeoIpProvider}`, data, this.httpOptions(),)
  }
  setGeoIpProvider(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.setGeoIpProvider}`, data, this.httpOptions(),)
  }
  updateGeoIpProviderDatabase(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.updateGeoIpProviderDatabase}`, data, this.httpOptions(),)
  }
  getIpLocation(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.getIpLocation}`, data, this.httpOptions(),)
  }
  checkUserAccess(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.checkUserAccess}`, data, this.httpOptions(),)
  }
  setBotStrategy(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.setBotStrategy}`, data, this.httpOptions(),)
  }
  validateImportBotsFromCsv(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.validateImportBotsFromCsv}`, data, this.httpOptions(),)
  }
  createRequestedReport(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.createRequestedReport}`, data, this.httpOptions(),)
  }
  setCategory(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.setCategory}`, data, this.httpOptions(),)
  }
  sendMessageToAll(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.sendMessageToAll}`, data, this.httpOptions(),)
  }
  getLeaderboardPayoutTemplates(data:any){
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.utility.getLeaderboardPayoutTemplates}`, data, this.httpOptions(),)
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
