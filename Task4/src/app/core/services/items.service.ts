import { Injectable } from '@angular/core';
import { CourseItem } from 'src/app/entities/course-item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private items: CourseItem[];

  constructor() {
    this.items = [{
      id: 1,
      title: 'Angular Program 2019',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      durationInMins: 150,
      courseTime: Date.parse('11/15/2019 12:00'),
      creationTime: Date.parse('11/05/2019 9:00'),
      isTopRated: true
    },
    {
      id: 2,
      title: 'CSS tips',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      durationInMins: 60,
      courseTime: Date.parse('11/29/2019 23:00'),
      creationTime: Date.parse('10/15/2019 9:00'),
      isTopRated: false
    },
    {
      id: 3,
      title: 'Typescript Introduction',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      durationInMins: 45,
      courseTime: Date.parse('12/29/2019 1:00'),
      creationTime: Date.parse('12/15/2019 9:00'),
      isTopRated: false
    }];
  }

  getItems(): CourseItem[] {
    return Object.assign([], this.items);
  }
}
