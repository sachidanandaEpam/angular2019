import { Directive, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { CourseItem } from 'src/app/entities/course-item';
import * as moment from 'moment';

@Directive({
  selector: '[appFormatCourseItem]'
})
export class FormatCourseItemDirective {


  @Input() set appFormatCourseItem(item: CourseItem) {
    const currentTime = moment();
    const creationTime = moment(item.creationTime);
    const dayDiff = currentTime.diff(creationTime, 'days');
    if (dayDiff <= 14 && dayDiff > 0) {
      item.isFresh = true;
    } else if (dayDiff < 0) {
      item.isReleased = true;
    }
  }
}
