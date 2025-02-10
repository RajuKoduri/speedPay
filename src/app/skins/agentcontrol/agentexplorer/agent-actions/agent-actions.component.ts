import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-agent-actions',
  templateUrl: './agent-actions.component.html',
  styleUrls: ['./agent-actions.component.css']
})
export class AgentActionsComponent implements OnInit {

  @ViewChild('modal')
  modal!: ElementRef;
  constructor() {
    if(sessionStorage.getItem('value') == 'apiRes'){
      // alert("openSPI")
     }
     
   }

  ngOnInit(): void {
    // alert('Agent Actions55555')

  }
  clickop(){
    alert('123')
  }
// alert(){
//   alert('Agent Actions')
// }
}
