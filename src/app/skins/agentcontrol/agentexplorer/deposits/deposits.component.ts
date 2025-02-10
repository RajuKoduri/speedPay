import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AgentControlService } from 'src/app/source/AgentControl.service';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {
  wallettypelist: any = []
  dropdownSettings: any = {}


  selectedItems12: any = []
  dropdownList12: any = []
  filterForm: FormGroup;


  dropdownList: any = []
  selectedItems: any = []
  Agentguid: any;
  convertedArray: any=[]
  faceconvertedarray: any =[] 
  faceParameterslist12: any;
  agentdeposits: any;
  constructor(private AgentControlService: AgentControlService) {
    this.filterForm = new FormGroup({
      networkNames: new FormControl()
    })

  }

  ngOnInit(): void {
    this.Agentguids()
    this.walletAmount()
    this.getAgentDeposits()
      this.faceParameters()

    // fetch('https://jsonplaceholder.typicode.com/todos')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => console.log(json))
    
  }
  Agentguids() {
    const Agentguid = sessionStorage.getItem('Agentguid');
    console.log(Agentguid)
    if (Agentguid) {
      this.Agentguid = JSON.parse(Agentguid)
    }
  }
  faceParameters() {
    const faceParameterslist = localStorage.getItem('faceParameters');
    if (faceParameterslist) {
      this.faceParameterslist12 = JSON.parse(faceParameterslist);
      console.log(this.faceParameterslist12);
    }
    this.convertedArray = []
    this.faceconvertedarray = []
    console.log(this.faceParameterslist12);
  
    this.faceParameterslist12.forEach((item: { name: string }) => {
      this.convertedArray.push(item.name);
      this.faceconvertedarray.push(item.name);
    });
    console.log(this.convertedArray);
    this.dropdownList12 = this.faceParameterslist12;
    console.log(this.dropdownList12);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectedItems12 = this.dropdownList12;
  }
  
  walletAmount() {
    const walletstypes = localStorage.getItem('walletTypes');
    if (walletstypes) {
      this.wallettypelist = JSON.parse(walletstypes);
      for (let i = 0; i < this.wallettypelist.length; i++) {
        if (this.wallettypelist[i].clubGameWallet == true) {
          if (this.wallettypelist[i].description != "Play Money") {
            this.wallettypelist[i]
            console.log(this.wallettypelist[i])
            this.selectedItems[i] = {
              description: this.wallettypelist[i].description,
              guid: this.wallettypelist[i].guid
            }
          }
        }
      }
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'guid',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.selectedItems12 = this.dropdownList12;
  }

  getAgentDeposits() {
    let body = {
      "firstRecord": 0,
      "maxCountRecord": 100,
      "idList": [this.Agentguid],
      // "reportPeriod": { "start": "2024-02-24T18:30:00", "end": "2024-02-24T18:30:00" },
      "wallets": [
        {
          "hiLong": 0,
          "lowLong": 6
        },
        {
          "hiLong": 0,
          "lowLong": 1840
        }
      ]
    }
    this.AgentControlService.getAgentDeposits(body).subscribe((data) => {
      console.log(data)
      this.agentdeposits=data.objectList
    })

  }


  // ************************************ onselect @ (starts)**************************
  onItemSelectnew(data: any) {


  }
  OnItemDeSelectnew(data: any) {


  }
  onSelectAllnew(data: any) {


  }
  onDeSelectAllnew(data: any) {


  }

  // ************************************ onselect @ (ends)**************************

}
// onItemSelect(item: any) {
//   const changeCurrencyResult = this.GamesofpokerService.onItemSelect(item);
//   console.log(changeCurrencyResult)
//   const { selectedFillterGames, gamesTobeSelected, } = changeCurrencyResult;
//   this.selectedFillterGames = selectedFillterGames;
//   this.gamesTobeSelected = gamesTobeSelected
// }
