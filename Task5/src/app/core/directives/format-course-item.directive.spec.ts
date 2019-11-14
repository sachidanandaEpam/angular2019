import { FormatCourseItemDirective } from './format-course-item.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, Renderer2, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

const items = [{
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

@Component({
  template: `<div *ngFor="let item of testItems">
      <div [appFormatCourseItem]="item">{{item.title}}</div>
    </div>`
})
class TestDirectiveComponent {
  private testItems = items;
}

describe('FormatCourseItemDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, FormatCourseItemDirective]
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should set item-fresh and item-released classes', () => {
    const itemFresh = fixture.debugElement.query(By.css('.item-fresh'));
    expect(itemFresh).toBeTruthy();
    expect(itemFresh.nativeElement.textContent).toEqual('Angular Program 2019');

    const itemReleased = fixture.debugElement.query(By.css('.item-released'));
    expect(itemReleased).toBeTruthy();
    expect(itemReleased.nativeElement.textContent).toEqual('Typescript Introduction');
  });
});
