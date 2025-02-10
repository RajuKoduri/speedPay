import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 
@Injectable({
    providedIn:"root"
})

export class CommonDataService{
    private popupname = new Subject<any>();
    public popupCont = this.popupname.asObservable();
    constructor(){

    }
    
    openPopup(e:any){
        console.log( e )
        this.popupname.next(e) 
    }

}