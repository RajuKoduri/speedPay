import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countriesList: any;

  constructor() { }

  ngOnInit(): void {
    this.countrylist()
  }
  countrylist() {
    const countrylist = localStorage.getItem("countrylist");
    if (countrylist) {
      let countriesList = JSON.parse(countrylist)

      this.countriesList = countriesList.filter((eachCountry: any) => {
        console.log(eachCountry)
         if( eachCountry.isoCode !=  "-1" ){
          return true
         }else{
          return false
         }
      })
      console.log(this.countriesList)
    }
  }
}
