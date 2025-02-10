import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
// import { PlayerLoggedIn } from '../store/actions/login.action';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn:boolean = false
  ws: any;
  permissionSub = new Subject()
  
  private subscriptions: any[] = []

  private WhiteSideMenu = 'assets/white_label/whitelabel.json' 
  private playerExplorer = 'assets/PlayerExplorermenu.json'
  private agentExplorer = 'assets/AgentExplorermenu.json'
  private pokermENU = 'assets/Poker_menu/poker_menu.json'
  private AllmenuList = 'assets/Allmenu.json'
  private Singlejs = 'assets/SingleJSON.json'

  constructor(private http: HttpClient, private store:Store) {}

  addSubscription(subscription: any): void {
    this.subscriptions.push(subscription);  
  }

  unsubscribeAll(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
  
  login(data: any) {
    this.loggedIn = true
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.login}`, data, { headers })
  }
 

  // verifyTwoFactor(data: any) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'wsession': data.ws
  //   });
  //   console.log(headers.toString)
  //   return this.http.post<any>(`${environment.api.baseUrl}${environment.api.verifyTwoFactor}`, {'twoFactor':data.twoFactor}, { headers })
  // }
  getConfig(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'wsession': data
    });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.getConfig}`, data, { headers })
  }

  getSessionData(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'wsession': data
    });
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.getSessionData}`, data, { headers })
  }

  getAdmins(data: any) {
    console.log(this.httpOptions())
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.getAdmins}`, data, this.httpOptions())
  }
  setAdmin(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.setAdmin}`, data, this.httpOptions())
  }
  getAdminPermissions(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.getAdminPermissions}`, data, this.httpOptions())
  }
  setAdminPermissions(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.setAdminPermissions}`, data, this.httpOptions())
  }
  getDefaultAdminPermission(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.getDefaultAdminPermission}`, data, this.httpOptions())
  }


  getPlayers(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.plrLvlNames}`, data, this.httpOptions())
  }
  sessionTouch(data: any) {
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.sessionTouch}`, data, this.httpOptions())
  }
 verifyTwoFactor(data: any) {
  
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.verifyTwoFactor}`, data, this.httpOptions())
  }
  httpOptions() {
    let ws = JSON.stringify(sessionStorage.getItem('wsession'))
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'wsession': JSON.parse(ws)
      })
    };
    return options;
  }



  common1Options(data: any) {
    //  this.ws = JSON.stringify( sessionStorage.getItem('wsession') )
    console.log(data)
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'wsession': JSON.parse(ws)
        'wsession': JSON.parse(data)
      })
    };
    return options;
  }


  logout(data: any) {
    this.loggedIn = false
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const wsession = data;
    // return this.http.post<any>(`http://pixpoker.czargaming.com/api/backoffice/logout`, data, this.httpOptions()) 
    return this.http.post<any>(`${environment.api.baseUrl}${environment.api.logout}`, data, this.httpOptions())

  }

  
  isLoggedIn(): boolean {
    return this.loggedIn || localStorage.getItem('loggedIn') === 'true';
  }

 sideJsonmenu() {
    if (environment.siteid == 'pokermenu') {
      return this.http.get(this.pokermENU) 
    }else{
      return this.http.get(this.AllmenuList)
      // return this.http.get(this.WhiteSideMenu)
    }
  }
  singleJSON(): Observable<any> {
    return this.http.get(this.Singlejs) 
} 
  playerExplorerm(): Observable<any> {
    return this.http.get(this.playerExplorer) 
} 
AgentExplorer(): Observable<any> {
    return this.http.get(this.agentExplorer) 
} 
}
