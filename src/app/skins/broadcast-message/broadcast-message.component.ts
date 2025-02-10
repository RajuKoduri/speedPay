import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/source/utility.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'broadcast-message',
  templateUrl: './broadcast-message.component.html',
  styleUrls: ['./broadcast-message.component.css']
})
export class BroadcastMessageComponent implements OnInit {

  message:any ;
  errorMsg: string = '';

  constructor(public US:UtilityService) { }

  ngOnInit(): void {
  }

  onInputChar(){
    let msgLength = this.message.length 
    if(msgLength > 256){
      this.errorMsg = "Characters should not exceed more than 256"
    }else{
      this.errorMsg = ''
    }
  }

  onSubmit(){
    const id = uuidv4()
    console.log(id)

    let body = {
      // "id" :id,
      "message":this.message
    }
    if(this.message.length <257){
      
      this.US.sendMessageToAll(body).subscribe((res:any)=>{console.log(res)})
    }
  }

}
