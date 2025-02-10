import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fraudcontrol',
  templateUrl: './fraudcontrol.component.html',
  styleUrls: ['./fraudcontrol.component.css']
})
export class FraudcontrolComponent implements OnInit {
  controlList: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  controlMenu(){
    this.controlList = !this.controlList;
  }

}
