import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/source/login.service';
import { SidemenuDynamicComponent } from '../SidemenuDynamic/SidemenuDynamic.component';


@Component({
  selector: 'app-treeSidemenu',
  templateUrl: './treeSidemenu.component.html',
  styleUrls: ['./treeSidemenu.component.css']
})
export class TreeSidemenuComponent implements OnInit {
  @Input() treeData: any
  menuname: any;
  SidemenuList:any 
  constructor(private loginService: LoginService, private SidemenuDynamicComponent12:SidemenuDynamicComponent) { }

  ngOnInit() {
    // this.loginService.singleJSON().subscribe(data => this.SidemenuList = data);
   console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
  }

  toggleItem(data:any,i:any) {
    console.log(i)
    if(data.children) 
    data.children.forEach((item:any) => {
      if(item.color){
        document.getElementById(item.name)?.classList.add(item?.color)   
      }
     })

    console.log(data)
    this.menuname = data.name;
    sessionStorage.setItem("agentname",this.menuname)
    data.expanded = !data.expanded;
  }
  changemenuclick(item:any,data:any,index:any){
    // document.getElementById(item)?.classList.add(data?.color)
    console.log(item)
    console.log(index)
    this.SidemenuDynamicComponent12.onclicksidecompounent(item)   
  }
}
