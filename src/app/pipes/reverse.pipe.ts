import { Pipe, PipeTransform } from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;


@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }
}

@Pipe({ name: 'UTCDate'})
export class UTCDatePipe implements PipeTransform  {
  constructor() {}
  transform(value) {
    if (value) {
      let dateString = moment.utc(moment.utc(value).format('MMM D, h:mm A')).toDate();
      return moment.parseZone(dateString).local().format('MMM D, h:mm A');
    } else {
      return '';
    }
  }
}
