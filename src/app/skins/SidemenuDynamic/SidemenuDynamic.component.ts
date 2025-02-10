import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/source/login.service';
import { CommonDataService } from 'src/app/source/commondata.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { environment } from 'src/environments/environment';
import { ImportUsersComponent } from '../import-users/import-users.component';
@Component({
  selector: 'app-SidemenuDynamic',
  templateUrl: './SidemenuDynamic.component.html',
  styleUrls: ['./SidemenuDynamic.component.css']
})
export class SidemenuDynamicComponent implements OnInit {
  currentParentIndex: number = -1;
  subIndex: number = -1;

  serverList: boolean = false;
  adminList: boolean = false;
  playerList: boolean = false;
  casinoList: boolean = false;
  casinoGameList: boolean = false;
  pokerList: boolean = false;
  settingsList: boolean = false;
  pokergameList: boolean = false;
  pokertablesList: boolean = false;
  remoteList: boolean = false;
  jackpotsList: boolean = false;
  gameList: boolean = false;
  promoList: boolean = false;
  perList: boolean = false;
  compList: boolean = false;
  accountList: boolean = false;
  cashierList: boolean = false;
  agentList: boolean = false;
  affiliateList: boolean = false;
  toolsList: boolean = false;
  emailList: boolean = false;
  requestList: boolean = false;
  ReportsList: boolean = false;
  sidemenidata: any;
  isDropdownOpen: boolean = false;
  menuNames: boolean = true;

  isActiveMenu: any;
  isActiveSubMenu: any;
  logpop: boolean = false;
  comnRef: any;
  subscription !: Subscription;
  myDate = new Date();
  showFeaturesList: boolean = false;
  rightMouseList: any;
  ConfiguarationList: any;
  UsersList: any;
  MonitoringList: any;
  TablesList: any;
  TournamentList: any;
  TransactionsList: any;
  CasinoList: boolean = false;
  PokerList: boolean = false;
  SessionTimeOutPop: boolean = false;
  SessionTouchInterval: any;
  activetable: any;
  Comp_settingsList: boolean = false;
  CashsettingsList: boolean = false;
  indexId: any = 1000;
  openClo: boolean = false;
  shodrop: any;
  reloaddata:any;  
  menuLists:any
  adminerror:boolean = false;
  disablemenu:boolean = true
  newSidemenu: any;
  constructor(private commonDataService: CommonDataService, private loginService: LoginService, public datepipe: DatePipe, private router: Router, private DashboardComponent12: DashboardComponent) {

    let currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    console.log(currentDateTime);
    // this.myDate = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
  }


  ngOnInit(): void {
    if(environment.menutype == "disable"){
      this.disablemenu = true
    }else{
      this.disablemenu = false
    }

    var SideMENU = Number(localStorage.getItem('sidemenu'))
    var ChildSideMENU = Number(localStorage.getItem('Childsidemenu'))
    console.log(SideMENU)
    if(SideMENU || SideMENU == 0){
      this.dropdownD(SideMENU)
      this.submenuList(SideMENU,ChildSideMENU)
    } 
   
   let activeroute: any = window.location.href
    console.log(activeroute)
    console.log(window)
    console.log(window.location.pathname)
    console.log(`this.${window.location.pathname.split('/')[1]}`)

    this.activetable = window.location.pathname.split('/')[1]
    console.log(this.activetable)
   

    let body = {}
    // this.showFeaturesList=true
    // console.log(document.getElementById("rightMouse_list"))
    // console.log((<HTMLInputElement>document.getElementById("rightMouse_list")))
    this.SessionTouchInterval = setInterval(() => {
      this.loginService.sessionTouch(body).subscribe(result => {
        // { return result }

        console.log(result);
        if (result.success == false) {
          clearInterval(this.SessionTouchInterval);
          this.SessionTimeOutPop = true
        }
      },
        error => {
          console.log("error occured")
        }
      );
      // }, 300000)
    }, 60000 * 5)


    this.loginService.singleJSON().subscribe((data:any) => this.changeformat(data));

    this.loginService.sideJsonmenu().subscribe(data => {
      this.sidemenidata = data;
      console.log(this.sidemenidata);
      // Initialize expanded property of children to false
      if (this.sidemenidata?.menu) {
        this.sidemenidata.menu.forEach((item: any) => {
          item.expanded = false;
        });
        console.log(this.sidemenidata);
      }
      // this.removesidemenuLidt() 
    })

  
  }


  // dropdownD(): boolean {
  //   return this.isDropdownOpen;
  // }
  closeMenuNames(data: any) {
    console.log(data)
    if (window.innerWidth <= 767 && data !== 'My Account') {
      this.menuNames = true;
    } else {
      if (window.innerWidth <= 767) {
        this.menuNames = false;
      }
    }
  }

  // dropdownD() { 
  //     this.openClo = !this.openClo;
  //     this.shodrop = !this.shodrop;
  // }

  dropdownD(index: number) {
    console.log(index)     
  
    if (index == this.currentParentIndex) {
      this.currentParentIndex = -1;
    } else {
      this.currentParentIndex = index; 
    }

  }
  indexValue(i: any) {
    if (i == this.indexId) {
      this.indexId = 1000;
    } else {
      this.indexId = i;
    }
  }
  childMenuClick(val: any) {
    console.log(val);
    // if (window.innerWidth <= 767) {
    //   this.openClo = !this.openClo;
    //   this.shodrop = !this.shodrop;
    //   setTimeout(() => {
    //     this.menuNames = true;
    //   }, 100);
    // }
  }
  toggleCollapse(menuItem: any) {
    menuItem.expanded = !menuItem.expanded;
  }
  // whiteLabelList(data: any): void {
  //   this.sidemenidata = data.whiteLabelMenu; 

  //   console.log(this.sidemenidata)
  // }
  sidebarclose() {
    if (window.innerWidth <= 767) {
      this.DashboardComponent12.closeMenuNames()
    }
  }
  closepopup() {
    this.SessionTimeOutPop = false
    this.router.navigate(['/login'])
    clearInterval(this.SessionTouchInterval);
    setTimeout(() => {
      sessionStorage.clear()
      window.location.reload();
    }, 1000);
  }

 

  closeoppup() {
    this.logpop = false;
    this.comnRef.unsubscribe();
  }
  openLogin(e: any) {
    this.commonDataService.openPopup(e)
    this.comnRef = this.commonDataService.popupCont.subscribe((data) => {
      console.log(data)
      if (data == "OPEN_LOGIN") {
        this.logpop = true;
        console.log('yes it is')
      } else {
        console.log('no')
      }
    })
  }
  onRightClick(event: any) {
    event.preventDefault() //this will disable default action of the context menu
    //there will be your code for the expected right click action
    // alert("hello")
    this.showFeaturesList = true;

    this.rightMouseList = (<HTMLInputElement>document.getElementById("rightMouse_list"));
    // this.rightMouseList.style.
    console.log(document.getElementById("rightMouse_list"))
    console.log(document.getElementById("rightMouse_list"))

    this.rightMouseList.style.display = "block";
    console.log((<HTMLInputElement>document.getElementById("rightMouse_list")))
  }
  
  submenuList(i:any,j:any){
   console.log("first Index",i)
   console.log("Second Index",j)
  let nametab ="Rake Race"
  let secondtab = "Admin List"
   console.log("Finalartray",this.sidemenidata)
      localStorage.setItem('sidemenu',i)
      localStorage.setItem('Childsidemenu',j)
      if (j == this.subIndex) {
        this.subIndex = -1;
      } else {
        this.subIndex = j; 
      }
    } 
  removesidemenuLidt(){
    let newremovearray:any = []
    // this.menuLists = sessionStorage.getItem("permissons")
    let splitmemuList= sessionStorage.getItem("permissons")
   this.menuLists= splitmemuList?.split(",")
    console.log(this.menuLists)
    for(let i=0; i<this.sidemenidata.menu.length; i++){ 
      if(this.sidemenidata.menu[i].children){
        for(let k=0;k< this.sidemenidata.menu[i].children.length;k++){
          
          for(let j=0; j<this.menuLists.length;j++){
            if(this.sidemenidata.menu[i].children[k]?.Id ==  this.menuLists[j]){
              this.sidemenidata.menu[i].children[k].status = true
            }
            if(this.sidemenidata.menu[i].children[k].subchildren){
              this.sidemenidata.menu[i].children[k].subchildren.forEach((SubmenuListName:any)=>{
                if(SubmenuListName?.Id ==  this.menuLists[j]){
                  SubmenuListName.status = true
                }
              })
            }
          }
        }
      }
    } 
    
    console.log(this.sidemenidata.menu)
    this.sidemenidata.menu.forEach((menu:any) => {
      menu.expanded = menu.children.some((child: { status: any; }) => child.status) 
    });
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  }
 
 
  contactAdmon(){
    this.adminerror = true
  }  
  closeadminpop(){
    this.adminerror = false
  }
  changeformat(data:any){
    var FinalMenuList:any = []
    let splitmemuList= sessionStorage.getItem("permissons")
    this.menuLists= splitmemuList?.split(",")
     console.log(this.menuLists)
     console.log(data.SingleJs)
     data.SingleJs.forEach((item:any) => {

      if(item.parentName){
        FinalMenuList.push(item)
      }
      this.menuLists.forEach((perm:any)=> {
        if(item.Id == perm){
          FinalMenuList.push(item)
        }
      })
     })
     console.log(FinalMenuList)
     this.Afterchangeformat(FinalMenuList)
  }
  Afterchangeformat(data:any){
    console.log(data)
    this.newSidemenu = this.convertToMenuFormat(data, "#");
    console.log(this.newSidemenu)
    // this.router.navigate(["playerslist"])
    this.newSidemenu[1].expanded = true
  }
  convertToMenuFormat(flatData: any[], name: string): any[] {
    const nestedData: any[] = [];   
    for (const item of flatData) {  
      if (item.parent === name) {
        const children = this.convertToMenuFormat(flatData, item.name);
        if (children.length > 0) {
          item.children = children;
        }
        nestedData.push(item);
      }
    } 
    return nestedData;
  }
  onclicksidecompounent(data:any){
    console.log(data)
  
  }

}
