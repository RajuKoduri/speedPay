import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-foundpage',
  templateUrl: './not-foundpage.component.html',
  styleUrls: ['./not-foundpage.component.css']
})
export class NotFoundpageComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  gohome(){
    // this.router.navigate(['/playerslist']);
    this.router.navigate(['/DashBoard']);
  }
}
