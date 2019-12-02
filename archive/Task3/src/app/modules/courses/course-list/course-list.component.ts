import { Component, OnInit, OnChanges, SimpleChanges, ModuleWithComponentFactories } from '@angular/core';
import { CourseItem } from 'src/app/entities/course-item';
import * as moment from 'moment';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  items: CourseItem[];
  actionStatus = '';

  ngOnInit() {
    this.items = [{
      id: 1,
      title: 'Angular Program 2019',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      duration: '2hr 30min',
      courseTime: '10/29/2019',
      creationTime: moment('09/15/2019 9:00', 'M/D/YYYY H:mm').unix()
    },
    {
      id: 2,
      title: 'CSS tips',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      duration: '1hr',
      courseTime: '11/01/2019',
      creationTime: moment('10/15/2019 9:00', 'M/D/YYYY H:mm').unix()
    },
    {
      id: 3,
      title: 'Typescript Introduction',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      duration: '1hr',
      courseTime: '12/21/2019',
      creationTime: moment('12/15/2019 9:00', 'M/D/YYYY H:mm').unix()
    }];
  }

  delete(inputItem: CourseItem) {
    const selectedItem = this.items.filter(e => e.id === inputItem.id);
    const itemIndex = selectedItem.length > 0 ? this.items.indexOf(selectedItem[0]) : -1;
    if (itemIndex >= 0) {
      this.actionStatus = `Deleted ${inputItem.title}`;
      this.items.splice(itemIndex, 1);
    } else {
      this.actionStatus = `${inputItem.title} not found. No action taken`;
    }
  }

  update(inputItem: CourseItem) {
    const selectedItem = this.items.filter(e => e.id === inputItem.id);
    const itemIndex = selectedItem.length > 0 ? this.items.indexOf(selectedItem[0]) : -1;
    if (itemIndex >= 0) {
      this.actionStatus = `Edited ${inputItem.title}`;
      this.items[itemIndex] = inputItem;
    } else {
      this.actionStatus = `${inputItem.title} not found. No action taken`;
    }
  }

  addCourse() {
    const currentItemsCount = this.items.length;
    this.items.push({
      id: currentItemsCount,
      title: `Typescript Introduction ${currentItemsCount}`,
      description: `Learn about where you can find course descriptions ${currentItemsCount}`,
      duration: '1hr',
      courseTime: '12/21/2019',
      creationTime: moment('11/15/2019 9:00', 'M/D/YYYY H:mm').unix()
    });
  }
}
