import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CreatePokerSatelliteSeriesService {

  constructor() { }

  private currentIndexSource = new Subject<number>();


  private previousButton = new Subject<boolean>();
  private nextsButton = new Subject<boolean>();

  private saveButton = new Subject<boolean>();



  currentIndex$ = this.currentIndexSource.asObservable();


  previousButton$ = this.previousButton.asObservable();
  nextsButton$ = this.nextsButton.asObservable();


  saveButton$ = this.saveButton.asObservable();


  emitIndex(index: number): void {
    this.currentIndexSource.next(index);
  }


  clickOnpreviousButton(boolvalue:boolean):void{
    this.previousButton.next(boolvalue);
  }
  clickOnnextsButton(boolvalue:boolean):void{
    this.nextsButton.next(boolvalue);
  }


  clickOnsaveButton(boolvalue:boolean):void{
    this.saveButton.next(boolvalue)
  }
}
