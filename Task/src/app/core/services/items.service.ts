import { Injectable } from '@angular/core';
import { CourseItem } from 'src/app/models/course-item';
import { ServiceResponse } from 'src/app/models/service-response';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private items: CourseItem[];

  defaultSuccessResponse = {
    status: 'success',
    statusCode: 200
  };

  constructor() {
    this.items = [{
      id: 1,
      title: 'Angular Program 2019',
      // tslint:disable-next-line: max-line-length
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
      durationInMins: 150,
      courseTime: Date.parse('11/15/2019 12:00'),
      creationTime: Date.parse('11/10/2019 9:00'),
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

  get(): CourseItem[] {
    return this.items;
  }

  getById(id: number = 0): CourseItem {
    return null;
  }

  create(item: CourseItem): ServiceResponse {
    const currentItemsCount = this.items.length;
    item.id = currentItemsCount;
    this.items.push(item);
    return this.defaultSuccessResponse;
  }

  update(inputItem: CourseItem): ServiceResponse {
    const response = this.defaultSuccessResponse;
    const selectedItem = this.items.find(e => e.id === inputItem.id);
    if (selectedItem !== undefined) {
      selectedItem.title = inputItem.title;
      selectedItem.courseTime = inputItem.courseTime;
      selectedItem.creationTime = inputItem.creationTime;
      selectedItem.description = inputItem.description;
      selectedItem.durationInMins = inputItem.durationInMins;
      selectedItem.isTopRated = inputItem.isTopRated;
    } else {
      response.status = 'Failed';
      response.statusCode = 400;
    }
    return response;
  }

  delete(inputItem: CourseItem): ServiceResponse {
    const response = this.defaultSuccessResponse;
    const selectedItem = this.items.find(e => e.id === inputItem.id);
    const itemIndex = selectedItem !== undefined ? this.items.indexOf(selectedItem) : -1;
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
    } else {
      response.status = 'Failed';
      response.statusCode = 400;
    }
    return response;
  }
}
