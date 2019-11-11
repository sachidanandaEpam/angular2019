import { Pipe, PipeTransform } from '@angular/core';
import { CourseItem } from 'src/app/entities/course-item';
import { NgControl } from '@angular/forms';

@Pipe({
  name: 'filterBy'
})
export class FilterItemsPipe implements PipeTransform {

  transform(value: Array<CourseItem>, searchText: string): Array<CourseItem> {
    if (!value) { return []; }
    if (!searchText) { return value; }
    searchText = searchText.toLowerCase();
    return value.filter(it => {
      return it.title.toLowerCase().includes(searchText);
    });
  }
}
