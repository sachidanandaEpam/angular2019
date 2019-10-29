import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent implements OnInit {

  constructor() { }

  searchText = '';

  ngOnInit() {
  }

  searchCourses() {
    console.log(`Searching ${this.searchText}`);
  }
}
