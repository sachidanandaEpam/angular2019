import { Pipe, PipeTransform } from '@angular/core';
import { CourseItem } from 'src/app/core/models/course-item.model';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class SortItemsPipe implements PipeTransform {

  public transform(value: Array<CourseItem>, by: string, direction: 'asc' | 'desc'): Array<CourseItem> {
    return _.orderBy(value, [by], direction);
  }

}
