import { FilterItemsPipe } from './filter-items.pipe';

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
  title: 'aNGULAR PROGRAM tips',
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

describe('FilterItemsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterItemsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return multiple results', () => {
    const pipe = new FilterItemsPipe();
    const filteredItems = pipe.transform(items, 'uLAr');
    expect(filteredItems.length).toEqual(2);
    expect(filteredItems[0].title).toEqual('Angular Program 2019');
    expect(filteredItems[1].title).toEqual('aNGULAR PROGRAM tips');
  });

  it('should return empty results for empty or undefined items', () => {
    const pipe = new FilterItemsPipe();
    let filteredItems = pipe.transform([], 'uLAr');
    expect(filteredItems.length).toEqual(0);

    filteredItems = pipe.transform(undefined, 'uLAr');
    expect(filteredItems.length).toEqual(0);
  });

  it('should return same results for empty or undefined search text', () => {
    const pipe = new FilterItemsPipe();
    let filteredItems = pipe.transform(items, '');
    expect(filteredItems).toEqual(items);

    filteredItems = pipe.transform(items, undefined);
    expect(filteredItems).toEqual(items);
  });
});
