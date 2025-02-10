// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { tr } from 'date-fns/locale';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostloginPostloginauthguardServiceService implements CanActivate {

//   constructor(
//     private router: Router
//   ) { 
//   }
//   canActivate(): Observable<any> | Promise<any> | boolean {
//     this.router.navigate(['/login']);
//     return  false
//     alert("login")
//   }
  
// }
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { LoginService } from './source/login.service';

@Injectable({
  providedIn: 'root'
})
export class PostloginPostloginauthguardServiceService implements CanActivate, CanActivateChild{

  constructor(private authService: AuthServiceService, private router: Router, private loginService:LoginService) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {
    // if (!this.authService.LoginStatus) {
    if (this.loginService.isLoggedIn()) {
      return true
      // return this.authService.LoginStatus;
    }
    this.router.navigate(['login']);
    return false
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }
}