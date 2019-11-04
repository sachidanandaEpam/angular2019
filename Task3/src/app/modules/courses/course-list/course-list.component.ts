import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CourseItem } from 'src/app/entities/course-item';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  items: CourseItem[];

  counter = 3;

  ngOnInit() {
    this.items = [{
      id: 1,
      title: 'Angular Program 2019',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      duration: '2hr 30min',
      courseTime: '10/29/2019'
    },
    {
      id: 2,
      title: 'CSS tips',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      duration: '1hr',
      courseTime: '11/01/2019'
    },
    {
      id: 3,
      title: 'Typescript Introduction',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      duration: '1hr',
      courseTime: '12/21/2019'
    }];
  }

  update(event) {
    console.log(`Event triggered ${event}`);
  }

  addCourse() {
    this.counter++;
    this.items.push({
      id: this.counter,
      title: `Typescript Introduction ${this.counter}`,
      description: `Learn about where you can find course descriptions ${this.counter}`,
      duration: '1hr',
      courseTime: '12/21/2019'
    });
  }
}
