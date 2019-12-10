import { Pipe, PipeTransform } from '@angular/core';
import { CourseItem } from 'src/app/core/models/course-item.model';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterItemsPipe implements PipeTransform {

  transform(value: CourseItem[] = [], searchText: string = ''): CourseItem[] {
    searchText = searchText.toLowerCase();
    return value.filter(it => {
      return it.title.toLowerCase().includes(searchText);
    });
  }
}
