import { SortItemsPipe } from './sort-items.pipe';
import { Component } from '@angular/core';

const items = [{
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
  title: 'css PROGRAM tips',
  // tslint:disable-next-line: max-line-length
  description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
  durationInMins: 60,
  courseTime: Date.parse('11/29/2019 23:00'),
  creationTime: Date.parse('10/15/2019 9:00'),
  isTopRated: false
},
{
  id: 3,
  title: 'CSS PROGRAM tips',
  // tslint:disable-next-line: max-line-length
  description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
  durationInMins: 60,
  courseTime: Date.parse('11/29/2019 23:00'),
  creationTime: Date.parse('10/15/2019 9:00'),
  isTopRated: false
},
{
  id: 4,
  title: 'ACB PROGRAM tips',
  // tslint:disable-next-line: max-line-length
  description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
  durationInMins: 60,
  courseTime: Date.parse('11/29/2019 23:00'),
  creationTime: Date.parse('10/15/2019 9:00'),
  isTopRated: false
},
{
  id: 5,
  title: 'Zypescript Introduction',
  // tslint:disable-next-line: max-line-length
  description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
  durationInMins: 45,
  courseTime: Date.parse('12/29/2019 1:00'),
  creationTime: Date.parse('12/15/2019 9:00'),
  isTopRated: false
},
{
  id: 6,
  title: 'Typescript Introduction',
  // tslint:disable-next-line: max-line-length
  description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or colleges classes.They are published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.',
  durationInMins: 45,
  courseTime: Date.parse('12/29/2019 1:00'),
  creationTime: Date.parse('12/15/2019 9:00'),
  isTopRated: false
}];

describe('SortItemsPipe', () => {
  it('create an instance', () => {
    const pipe = new SortItemsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should sort items by title in asc order', () => {
    const pipe = new SortItemsPipe();
    const sortedItems = pipe.transform(items, 'title', 'asc');
    expect(sortedItems.length).toEqual(items.length);

    expect(sortedItems[0]).toEqual(items[3]);
  });

  it('should sort items by title in desc order', () => {
    const pipe = new SortItemsPipe();
    const sortedItems = pipe.transform(items, 'title', 'desc');
    expect(sortedItems.length).toEqual(items.length);

    expect(sortedItems[0]).toEqual(items[1]);
  });

  it('should sort items by creationTime in asc order', () => {
    const pipe = new SortItemsPipe();
    const sortedItems = pipe.transform(items, 'creationTime', 'asc');
    expect(sortedItems.length).toEqual(items.length);

    expect(sortedItems[0]).toEqual(items[1]);
  });

  it('should sort items by creationTime in desc order', () => {
    const pipe = new SortItemsPipe();
    const sortedItems = pipe.transform(items, 'creationTime', 'desc');
    expect(sortedItems.length).toEqual(items.length);

    expect(sortedItems[0]).toEqual(items[4]);
  });
});
