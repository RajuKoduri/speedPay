import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputMaxlengthValidation'
})
export class InputMaxlengthValidationPipe implements PipeTransform {

  transform(inputValue: any, maxLength: number = 11): any {
    // Ensure the input value is a string
    let stringValue = String(inputValue);

    // Remove any non-numeric characters using a regular expression
    stringValue = stringValue.replace(/[^0-9]/g, '');

    // Trim to the specified maximum length
    stringValue = stringValue.slice(0, maxLength);
    console.log("stringValue" , stringValue)
    return stringValue;
  }

}



