import { Component } from '@angular/core';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent {

  searchText = '';

  searchCourses() {
    console.log(`Searching ${this.searchText}`);
  }
}
