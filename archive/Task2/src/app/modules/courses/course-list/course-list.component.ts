import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  constructor() { }

  items: any;

  ngOnInit() {
    this.items = [{
      id: 1,
      courseTitle: 'Angular Program 2019',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      duration: '2hr 30min',
      courseTime: '10/29/2019'
    },
    {
      id: 2,
      courseTitle: 'CSS tips',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      duration: '1hr',
      courseTime: '11/01/2019'
    },
    {
      id: 3,
      courseTitle: 'Typescript Introduction',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      duration: '1hr',
      courseTime: '12/21/2019'
    }];
  }

  update(event) {
    console.log(`Event triggered ${event}`);
  }
}
