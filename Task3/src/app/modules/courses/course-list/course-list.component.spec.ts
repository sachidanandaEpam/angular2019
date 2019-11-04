import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update with event', () => {
    const consoleSpy = spyOn(console, 'log');

    component.update('Testing update');
    expect(consoleSpy).toHaveBeenCalledWith('Event triggered Testing update');
  });

  xit('should edit course through button click', () => {
    const expectString = `Editing ${component.items[0].title} course with id ${component.items[0].id}`;

    spyOn(component, 'update');
    const consoleSpy = spyOn(console, 'log');

    // trigger the click
    // Need to find better way to identify the button
    const button = fixture.debugElement.queryAll(By.css('button'));
    button[1].nativeElement.click();

    fixture.detectChanges();

    expect(component.update).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(`Event triggered ${expectString}`);
  });

  it('should add course', () => {
    component.addCourse();
    fixture.detectChanges();

    expect(component.items.length).toEqual(4);
  });
});
