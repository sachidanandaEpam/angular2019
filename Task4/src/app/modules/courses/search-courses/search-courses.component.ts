import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent {

  searchText = '';

  @Output() searchItem = new EventEmitter<string>();

  filterCourses() {
    this.searchItem.emit(this.searchText);
  }
}
