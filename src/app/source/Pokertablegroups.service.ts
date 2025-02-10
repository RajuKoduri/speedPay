import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Pokertablegroups{
  constructor(private http: HttpClient) { }

  getPokerTableGroupList(data: any) {
    const body = {}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.pokertablegroups}`, body, this.httpOptions(),)

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

