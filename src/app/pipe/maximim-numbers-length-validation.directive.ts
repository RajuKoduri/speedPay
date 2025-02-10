// import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
// import { NgModel } from '@angular/forms'
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMaximimNumbersLengthValidation]'
})
export class MaximimNumbersLengthValidationDirective {

  // constructor(private el: ElementRef) {}

  // @Input()
  // appSixDigitOnly!: number;
  // @Input() digitCount: number = 6;

  // @HostListener('input', ['$event']) onInput(event: Event): void {
  //   const inputValue = (event.target as HTMLInputElement).value;
  //   const sanitizedValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
  //   const limitedValue = sanitizedValue.slice(0, this.digitCount);

  //   this.el.nativeElement.value = limitedValue;
  //   this.appSixDigitOnly = +limitedValue; // Assign the value to the bound property
  // }

  // ======================================================
  
  // constructor(private el: ElementRef, private ngModel: NgModel) {}
  
  // @Input() digitCount: number = 6;

  // @HostListener('input', ['$event']) onInput(event: Event): void {
    //   const inputValue = (event.target as HTMLInputElement).value;
    //   const sanitizedValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
    //   const limitedValue =parseInt(sanitizedValue.slice(0, this.digitCount));
    
    //   this.el.nativeElement.value =  limitedValue;
    //   this.ngModel.update.emit(limitedValue); // Update the model value
    // }



    // ======================================================
    constructor(private el: ElementRef, private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const sanitizedValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
    const limitedValue = sanitizedValue.slice(0, 6); // Adjust the digitCount as needed

    this.el.nativeElement.value = limitedValue;

    // Use optional chaining operator to safely access ngControl
    if(this.ngControl?.control){
      this.ngControl?.control.setValue(+limitedValue);
    }
      
  }


  }
