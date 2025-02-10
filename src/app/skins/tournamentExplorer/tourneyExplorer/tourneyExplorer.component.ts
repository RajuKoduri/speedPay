import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterPlayerComponent } from '../../pokergames/settings/registerPlayer/registerPlayer.component';



@Component({
  selector: 'app-tourneyExplorer',
  templateUrl: './tourneyExplorer.component.html',
  styleUrls: ['./tourneyExplorer.component.css']
})
export class TourneyExplorerComponent implements OnInit {

  @ViewChild(RegisterPlayerComponent)RegisterPlayerComponent!: RegisterPlayerComponent;



 public isMenuOpen: boolean = true;
  PlayerName: any;
  playerMenuList: any;
  popupName: any;
  playermenu: boolean = false

  closeMenuCoverDiv : boolean = false;
  windowsidebar:boolean = true;

  RegisterPlayerAction: boolean = false;
  pokerPlayerData: any = null;
  registerDisabledButton:boolean = true
  checkRegisterPlayer: boolean = false;
  registerLoader: boolean =false;
  registerSuccessFailurePopup=""
  
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
    })
  }

  ngOnInit(): void {
    this.getTableInfo();
    
    if (window.innerWidth < 767) {
      this.windowsidebar = false
    }
  

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
  };


  closeMenuNames(){
    var sideMenu = document.getElementById('sideMenu');
        sideMenu?.classList.add("sideMenu12")                                                                                                                                     
    let mobileview = document.getElementById("blackcovermobile")  
        mobileview?.classList.remove("movieview12")
    this.closeMenuCoverDiv = false
    this.windowsidebar = false
  }

  

  


  sidebarclose(){
    if (window.innerWidth <= 767) {   
      this.closeMenuNames()
    }
  }



  getTableInfo() {
    let PlayerName = sessionStorage.getItem("tInfo");
    if (PlayerName) {
      this.PlayerName = JSON.parse(PlayerName)
    }
    console.log("PlayerName  :",this.PlayerName);

    this.pokerPlayerData = this.PlayerName?.guid
  }
 
  showPopu(data: any) {
    localStorage.setItem('sideManu', data)
    this.popupName = data
    this.playermenu = !this.playermenu
  }




 




  
  openSideP(){
    this.RegisterPlayerAction = !this.RegisterPlayerAction
   
  }

  checkRegisterPlayerAction(){

    // const tInfo = {
    //   guid: guid,
    //   name: caption,
    //   explorer: "Tournament Explorer",
    //   status:status
    // }
   const tInfo:any = sessionStorage.getItem('tInfo');
      const parseTInfo = JSON.parse(tInfo)

    let status = parseTInfo?.status
    console.log(status);
    if (status == "Registering" || status == "Late Registration" || status == "Announced") {
      this.checkRegisterPlayer = false;
      return false
    }
      this.checkRegisterPlayer = true;
      return true;

  }


  updateRegisterPlayerButton(){
    this.registerDisabledButton = false;
    console.log(this.registerDisabledButton)

  }

  registrationApiStatus(value:any){

    this.registerLoader = false;

    if(value == "SUCCESS"){
      this.registerSuccessFailurePopup = "Successfully Addded"

    }else if(value == "INVALIDINPUTDATA"){
      this.registerSuccessFailurePopup = "Invalid Input Data"

    }
   
    
  }

  registerSuccessFailurePopupClose(){
    this.registerSuccessFailurePopup = "";
    this.registerPlayerclosepopup();
    
  }


  registerPlayerepopup(){
    this.registerLoader = true
    if(this.RegisterPlayerComponent){
      this.RegisterPlayerComponent.clickRegisterTournamentPlayer()
    }
    
  }

  
  registerPlayerclosepopup(){
    this.RegisterPlayerAction = false;
    this.registerDisabledButton = true;
  }
}
