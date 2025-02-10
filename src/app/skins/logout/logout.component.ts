import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, JsonpClientBackend} from '@angular/common/http';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
logout(){
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post<any>(`http://pixpoker.czargaming.com/api/backoffice/logout`,{headers}) 
}
}
