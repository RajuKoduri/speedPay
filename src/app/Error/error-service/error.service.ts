import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  private errorSubject = new Subject<any>();

  getError() {
    return this.errorSubject.asObservable();
  }

  showError(message: any) {
    console.log(message)
    this.errorSubject.next(message);
  }
}
