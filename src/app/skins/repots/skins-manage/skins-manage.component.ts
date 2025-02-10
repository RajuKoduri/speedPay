import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skins-manage',
  templateUrl: './skins-manage.component.html',
  styleUrls: ['./skins-manage.component.css']
})
export class SkinsManageComponent implements OnInit {
  faceParametersList: any;
  skinsPopup: boolean = false
  skinsManage: any;

  constructor() { }

  ngOnInit(): void {
    this.faceParameters()
  }
  faceParameters() {
    const faceParameters = localStorage.getItem('faceParameters');
    if (faceParameters) {
      this.faceParametersList = JSON.parse(faceParameters)
    }
  }
  onClick(i:any) {
    console.log(i)
    this.skinsManage=  this.faceParametersList[i]
    this.skinsPopup = true
    console.log( this.skinsManage)
  }
  closepopup() {
    this.skinsPopup = false
  }
  
}
