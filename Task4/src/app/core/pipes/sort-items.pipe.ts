import { Pipe, PipeTransform } from '@angular/core';
import { CourseItem } from 'src/app/entities/course-item';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class SortItemsPipe implements PipeTransform {

  transform(value: Array<CourseItem>, by: string, direction: 'asc' | 'desc'): Array<CourseItem> {
    return Object.assign([], _.orderBy(value, [by], direction));
  }

}
