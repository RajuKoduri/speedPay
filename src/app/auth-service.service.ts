// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
// import * as  from 'firebase';

@Injectable({
  providedIn : 'root'
})
export class AuthServiceService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || ('false'));

  setLoginStatus(value:any) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get LoginStatus() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  // sinUpUser(email: string, password: string) {
  //   return firebase.auth().createUserWithEmailAndPassword(email, password);
  // }

  // logInUser(email: string, password: string) {
  //   return firebase.auth().signInWithEmailAndPassword(email, password);
  // }
}
