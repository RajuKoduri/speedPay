import { Component, OnInit } from '@angular/core';
import { ComppointsService } from 'src/app/source/comppoints.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-comppointssettings',
  templateUrl: './comppointssettings.component.html',
  styleUrls: ['./comppointssettings.component.css']
})
export class ComppointssettingsComponent implements OnInit {
  showing: boolean = true;
  showAbuse: boolean = false
  summary: any;
  textfiled: any;
  pointsPopup: boolean = false;
  loader: boolean = false;
  pointspopdata: any;
  EnablePoints: any;
  AllowExchageCash: any;
  AllowTourneyBuyIn: any;
  AllowExchangeBonus: any;
  constructor(private comppointsService: ComppointsService) {

  }

  ngOnInit(): void {
    this.onRequery()
  }
  onRequery() {
    this.summary = false
    this.loader = true
    let body = {}
    this.comppointsService.pointsetting(body).subscribe((data) => this.summarydata(data))
  }
  summarydata(data: any) {
    console.log(data)
    this.loader = false
    this.summary = data.objectList;
    console.log(this.summary.length);
    for (let i = 0; i < this.summary.length; i++) {
      console.log(this.summary[i].compPointsEnabled);
      let myData = this.summary[i];
      console.log(myData);
      // this.textfiled = document.getElementById("myCheck"+i);
      // this.textfiled.checked = true;
    }
  }
  Abusearrow() {
    this.showing = !this.showing
  }
  totalAbuse() {
    this.showAbuse = !this.showAbuse
  }
  pointsSetting(data: any) {
    console.log(data)
    this.pointsPopup = true;
    this.pointspopdata = JSON.parse(JSON.stringify(data));

  }
  settingsSave() {
    let body = this.pointspopdata
    console.log(body)
    this.comppointsService.setCompPointsSettings(body).subscribe((data) => {
      console.log(data)
      if (data.changedObjectList) {
        this.pointsPopup = false;
        this.onRequery()

      }
    })


  }
  closepopup() {
    this.pointsPopup = false;
  }
}
