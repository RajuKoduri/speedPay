import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
// export class NumberFormatPipe implements PipeTransform {

//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }

// }
export class NumberFormatPipe implements PipeTransform {
  // transform(value: number): any {
  //   if (value !== null && value !== undefined) {
  //     const formattedValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  //     // const formattedValue = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace('.', ',');
  //     const modified_value = formattedValue.replace(',', '|').replace('.', ',').replace('|', '.')
  //     return modified_value

  //   }
  //   else {
  //     return
  //   }

  // }

  //   transform(value: number): any {
  //     if (value !== null && value !== undefined) {
  //       // Use toFixed(0) to remove decimal places
  //       const formattedValue = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  //       return formattedValue;
  //     } else {
  //       console.log(value);
  //       return "0"; // returning string "0.00" instead of number 0.00
  //     }
  //   }


  transform(value: number): any {

    if (value !== null && value !== undefined) {
      const originalValue: number = Number(value);
      if( localStorage.getItem("siteName") == "whitelable" ||  localStorage.getItem("siteName") == "poker"){
      var stringWithArabicNumerals =  originalValue.toLocaleString('es-AR', { useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
      }else{ 
        var stringWithArabicNumerals =  originalValue.toLocaleString("en-IN", { useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 });

      }
 
      // Convert the number to a string with Arabic numerals and separators
      // const stringWithArabicNumerals =  originalValue.toLocaleString('es-AR', { useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 });
      // Replace all commas with dots and the last dot with a comma
      const formattedValue = stringWithArabicNumerals.replace(/,/g, '.').replace(/\.(?=[^.]*$)/, ',');
      

      // console.log(formattedValue);  // Outputs: 754.511.911,345

      return formattedValue
    } else {
      return
    }
  }
}
