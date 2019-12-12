import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  public transform(value: number): string {
    const d = moment.duration(value, 'minutes');
    return `${d.hours() > 0 ? d.hours() + ' hr' : ''} ${d.minutes() > 0 ? d.minutes() + ' min' : ''}`;
  }

}
