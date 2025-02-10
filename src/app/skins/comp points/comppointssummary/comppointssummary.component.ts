import { Component, OnInit } from '@angular/core';
import { ComppointsService } from 'src/app/source/comppoints.service';
@Component({
  selector: 'app-comppointssummary',
  templateUrl: './comppointssummary.component.html',
  styleUrls: ['./comppointssummary.component.css']
})
export class ComppointssummaryComponent implements OnInit {
  showing: boolean = true;
  showAbuse: boolean = false
  summary: any;
  textfiled: any;
  constructor(private comppointsService: ComppointsService) { }

  ngOnInit(): void {
    let body = {


    }
    this.comppointsService.pointsetting(body).subscribe((data) => this.summarydata(data))
  }
  summarydata(data: any) {
    console.log(data)
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
}
