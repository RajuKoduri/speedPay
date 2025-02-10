import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AffiliateControlService {

  constructor(private http: HttpClient) { }

  AffiliatesList(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AffiliateControl.Affiliateslist}`, data, this.httpOptions(),)
  }
  getWMasterStatistics(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AffiliateControl.getWMasterStatistics}`, data, this.httpOptions(),)
  }
  listUserAccessRules(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AffiliateControl.listUserAccessRules}`, data, this.httpOptions(),)
  }
  getRegitration(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AffiliateControl.getWebmasterRegistrationSettings}`, data, this.httpOptions(),)
  }
  createWMaster(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.AffiliateControl.createWMaster}`, data, this.httpOptions(),)
  }
  getRequestedReports(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.RequestedReports.getRequestedReports}`, data, this.httpOptions(),)
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
