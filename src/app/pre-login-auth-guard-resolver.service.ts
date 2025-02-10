import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { LoginService } from './source/login.service';

@Injectable({
  providedIn: 'root'
})
export class PreLoginAuthGuardResolverService  implements  CanActivate{
  logsesesion:any
  constructor( private router:Router, private authService:AuthServiceService, private loginService:LoginService) { }
  
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   this.logsesesion = sessionStorage.getItem("logintrue")
  //   if( this.logsesesion == "true"){
  //     // return true
  //   }else{
  //   // return false
  //   }
  //   this.router.navigate(['/playerlist']);
  //    return true
  // }


  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/playerslist']);
      return false;
    } else {
      return true;
    }
  }
}
