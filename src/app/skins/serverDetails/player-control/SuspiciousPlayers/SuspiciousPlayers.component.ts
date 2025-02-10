import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/source/PlayerService.service';

@Component({
  selector: 'app-SuspiciousPlayers',
  templateUrl: './SuspiciousPlayers.component.html',
  styleUrls: ['./SuspiciousPlayers.component.css']
})
export class SuspiciousPlayersComponent implements OnInit {

  constructor(private PlayerserviceService:PlayerServiceService) { }
  PlayerList:any;
  ngOnInit():void {
    
    let ws = sessionStorage.getItem('wsession')
    this.PlayerserviceService.SuspiciousPlayers(ws).subscribe((res)=>{
      this.PlayerList = res.objectList;
      console.log( res.objectList)
    })
  }

}
