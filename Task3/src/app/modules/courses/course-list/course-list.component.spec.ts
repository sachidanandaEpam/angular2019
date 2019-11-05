import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CourseItemComponent } from '../course-item/course-item.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListComponent, CourseItemComponent],
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

  it('should edit course through button click', () => {
    // trigger the click
    const btnEdit = fixture.debugElement.queryAll(By.css('.btn-edit'));
    btnEdit[0].nativeElement.click();

    const actionStatus = fixture.debugElement.query(By.css('.action-status')).nativeElement;
    fixture.detectChanges();
    expect(actionStatus.textContent).toEqual(`Edited ${component.items[0].title}`);

    const btnDelete = fixture.debugElement.queryAll(By.css('.btn-delete'));
    btnDelete[0].nativeElement.click();
    fixture.detectChanges();
    expect(actionStatus.textContent).toEqual(`Deleted ${component.items[0].title}`);

  });

  it('should add course', () => {
    component.addCourse();
    fixture.detectChanges();

    expect(component.items.length).toEqual(4);
  });
});
