import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from '../error-service/error.service';

@Component({
  selector: 'error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent implements OnInit {

  errorMessage:any = [];
  errorSubscription: Subscription;

  constructor(private errorService: ErrorService) {
    this.errorSubscription = this.errorService.getError().subscribe((message: string) => {
      console.log(message)
        this.errorMessage = message;
        // this.errorMessage = this.errorMessage.filter((msg:any)=>{
        //   return (msg.api != "sessionTouch" && msg.api != "logout")
        
        // })
      }
    );
    console.log(this.errorMessage)

  }

  ngOnInit(): void {
    console.log(this.errorMessage)

  }

  close(ind:number) {
    this.errorMessage[ind] = null;
    this.errorMessage.splice(ind,1)
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  getTransform(index: number): string {
    const offset = index * 2;
    return `translate(-40%, -40%) translate(${offset}%, ${offset}%)`;
  }

}
