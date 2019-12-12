import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent {

  private searchText = '';

  @Output() public searchItem = new EventEmitter<string>();

  public filterCourses() {
    this.searchItem.emit(this.searchText);
  }
}
