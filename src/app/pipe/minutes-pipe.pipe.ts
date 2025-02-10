import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesPipe'
})
export class MinutesPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
