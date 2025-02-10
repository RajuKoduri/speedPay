import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

  transforminingDispalyDate(datetime: string): any {

    if (datetime != undefined) {
      // 2023-12-12T16:53:59.997Z[UTC]
      // 2023-12-12T17:01:00Z[UTC]
      // Extract the date and time components from the input string


      const regex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,5})Z\[UTC\]/;
      //  const regex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,5})?)?Z\[UTC\])/;

      //  const regex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,5})?Z\[UTC\])/;
      //  const regex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,3})Z\[UTC\]/;

      const match = regex.exec(datetime);

      if (!match || match.length < 2) {
        //  return 'Invalid Date';

        //  let  currentDateTime = datetime.substring(0, datetime.length - 10)
        //       console.log(currentDateTime)
        //       let currentDateTimes = this.datePipe.transform(new Date(datetime), 'yyyy/MM/dd h:mm:ss a');
        //       console.log("dates", currentDateTimes);

        //       return currentDateTime;

        let currentDateTime = datetime?.substring(0, datetime?.length - 5)
        let currentDateTimes: any = this.datePipe.transform(new Date(currentDateTime), 'yyyy/MM/dd h:mm:ss a');
        return currentDateTimes;
      };

      const dateTimeString = match[1];

      // Construct a Date object from the extracted components
      const date = new Date(dateTimeString);

      if (isNaN(date.getTime())) {
        //  return 'Invalid Date';
        return '';
      }

      // Format the date as desired
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };


      // return date.toLocaleDateString('en-US', options); 'yyyy/MM/dd h:mm:ss a'
      //  2017-08-07T01:30:30.282Z[UTC]     2023/5/25 4:55:25 AM
      let dateParts = datetime.split(/[-T:.Z\[\]]/);

      // console.log(dateParts);


      const year = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const day = parseInt(dateParts[2]);
      const hour = parseInt(dateParts[3]);
      const minute = parseInt(dateParts[4]);
      const second = parseInt(dateParts[5]);


      // Determine AM or PM
      const amOrPm = hour >= 12 ? 'PM' : 'AM';

      // Adjust hour to 12-hour format
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;

      // Create a formatted string
      const formattedDate = `${month}/${day}/${year}, ${hour12}:${minute}:${second} ${amOrPm}`;

      return formattedDate;



    } else {
      return ""
    }










  }

}



