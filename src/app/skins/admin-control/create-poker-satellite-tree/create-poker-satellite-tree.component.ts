import { Component, OnInit,Input, Output ,EventEmitter} from '@angular/core';
import { CreatePokerSatelliteSeriesService } from 'src/app/source/create-poker-satellite-series.service';



@Component({
  selector: 'app-create-poker-satellite-tree',
  templateUrl: './create-poker-satellite-tree.component.html',
  styleUrls: ['./create-poker-satellite-tree.component.css']
})
export class CreatePokerSatelliteTreeComponent implements OnInit{
  @Input() childTourneys:any=[]
  @Input() selectedTournamentCurrency:any="";
  @Input() indexOfCreatedTournament:number | undefined;
  @Output() currentIndexchildToParent = new EventEmitter()

  constructor(private SatelliteSeriesService:CreatePokerSatelliteSeriesService) { }

  ngOnInit(): void {
    console.log("childTourneys  :---------->",this.childTourneys);
    console.log("selectedTournamentCurrency   :",this.selectedTournamentCurrency);
    console.log("indexOfCreatedTournament   :",this.indexOfCreatedTournament);
  
    console.log("eachTournament?.tourn?.caption", this.childTourneys?.[0])
    console.log("eachTournament?.tourn?.caption", this.childTourneys?.[0]?.tourn)
    console.log("eachTournament?.tourn?.caption", this.childTourneys?.[0]?.tourn?.caption)
  }

  transformingTourneyIndexToParent(index:number){
    console.log("transformingTourneyIndexToParent   :----  >",index);
    // this.currentIndexchildToParent.emit(index);
    this.SatelliteSeriesService.emitIndex(index)
  }

}
