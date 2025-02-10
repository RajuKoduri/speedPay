import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../../source/login.service';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { loginModel } from 'src/app/store/reducers/login.reducer';
import { clearState } from 'src/app/store/actions/login.action';
import { getlogin } from 'src/app/store/reducers/login.selector';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isMenuOpen: boolean = true;
  currentDateTime: any
  closeMenuCoverDiv : boolean = false;
  windowsidebar:boolean = true
  // dataSubscription:any

  constructor(private http: HttpClient, private router: Router, public datepipe: DatePipe, private loginService: LoginService, private store:Store<{login:loginModel}>) {
    this.currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    console.log(this.currentDateTime);
    // alert(this.currentDateTime)
    // this.myDate = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');

    // this.dataSubscription = this.store.select(getlogin).subscribe((res)=>{
    //   // alert(3)
    //   console.log(res)
    // })
  }

  // ngOnDestroy(): void {
  //   // Unsubscribe when the component is destroyed
  //   this.dataSubscription.unsubscribe();
  // }

  ngOnInit(): void {
    // let loginstate = localStorage.getItem("loggedIn")
    // if(loginstate){
    // }else{
    //   this.router.navigate(['login']);
    // }

    if (window.innerWidth < 767) {
      this.windowsidebar = false
    }

  //   setInterval(() => {
  //     if (window.innerWidth > 767) {
  //     // console.log(window.innerWidth)
  //     this.windowsidebar = true
  //     this.closeMenuCoverDiv = false;
  //   }else{
  //     // console.log(window.innerWidth)
  //     // this.windowsidebar = false
  //   }
  // }, 1000);
  
    
  }

  toggelMenu() {
    
    this.isMenuOpen = !this.isMenuOpen;

    if (window.innerWidth <= 767) {
      var sideMenu = document.getElementById('sideMenu');
          sideMenu?.classList.remove("sideMenu12")
      let mobileview = document.getElementById("blackcovermobile")  
          mobileview?.classList.add("movieview12")
      this.closeMenuCoverDiv = true;
      this.isMenuOpen = true;
      this.windowsidebar = true
    }
  }
  logout() {
    this.loginService.unsubscribeAll()

    this.store.dispatch(clearState())
    // let ws = JSON.stringify( sessionStorage.getItem('wsession') )
    //  const ws_1 =JSON.parse(ws) 
    let ws_1
    this.loginService.logout(ws_1).subscribe(data => { })
    this.router.navigate(['/login'])
    localStorage.clear();
    window.sessionStorage.clear();  
    console.clear()
    // sessionStorage.removeItem('wsession',);   
  }
  closeMenuNames(){
    var sideMenu = document.getElementById('sideMenu');
        sideMenu?.classList.add("sideMenu12")                                                                                                                                     
    let mobileview = document.getElementById("blackcovermobile")  
        mobileview?.classList.remove("movieview12")
    this.closeMenuCoverDiv = false
    this.windowsidebar = false
  }
}   
