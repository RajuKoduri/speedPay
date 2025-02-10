import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMaxLengthValidation]'
})
export class MaxLengthValidationDirective {
  @Input() maxNumber!: number;
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any): void {
    let inputValue: string = this._el.nativeElement.value;
  
    // Remove any non-numeric characters except for the dot
    inputValue = inputValue.replace(/[^0-9.]/g, '');
  
    // Handle decimal points separately
    const decimalIndex = inputValue.indexOf('.');
    if (decimalIndex !== -1) {
      // Allow only two decimal places
      inputValue = inputValue.slice(0, decimalIndex + 3);
    } else {
      inputValue = inputValue.slice(0, this.maxNumber);
    }
  
    // Check for invalid patterns and remove them
    const invalidPatterns = ['--', '++', '-+', '+-', '-', '+'];
    let modifiedValue = inputValue; // Create a separate variable for modifications
    invalidPatterns.forEach(pattern => {
      const index = modifiedValue.indexOf(pattern);
      if (index !== -1) {
        modifiedValue = modifiedValue.slice(0, index) + modifiedValue.slice(index + 1);
      }
    });
  
    // Trim to the specified maximum length
    // Check if the input value has changed before updating the element's value
    if (this._el.nativeElement.value !== modifiedValue) {
      this._el.nativeElement.value = Number(modifiedValue) ;
  
      // Emit the input event to update the ngModel
      this._el.nativeElement.dispatchEvent(new Event('input'));
    }
  }
  
}