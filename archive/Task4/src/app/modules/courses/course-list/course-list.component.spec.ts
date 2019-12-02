import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CourseItemComponent } from '../course-item/course-item.component';
import { FilterItemsPipe } from 'src/app/core/pipes/filter-items.pipe';
import { ItemsService } from 'src/app/core/services/items.service';
import { SortItemsPipe } from 'src/app/core/pipes/sort-items.pipe';
import { DurationPipe } from 'src/app/core/pipes/duration.pipe';
import { FormatCourseItemDirective } from 'src/app/core/directives/format-course-item.directive';

describe('CourseListComponentClassTesting', () => {
  let component: CourseListComponent;

  beforeEach(inject([ItemsService], (svc) => {
    component = new CourseListComponent(new FilterItemsPipe(), svc);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.items).toBeUndefined();
    component.ngOnInit();
    expect(component.items).toBeDefined();
  });

  it('should delete in class testing', () => {
    component.ngOnInit();
    const initialItems = component.items.length;
    const deletedItem = { ...component.items[1] };
    component.delete(deletedItem);
    expect(component.items.length).toEqual(initialItems - 1);
    expect(component.items.indexOf(deletedItem)).toEqual(-1);
    expect(component.actionStatus).toEqual(`Deleted ${deletedItem.title}`);
  });

  it('should edit in class testing', () => {
    component.ngOnInit();
    const initialItems = component.items.length;
    const editedItem = { ...component.items[1] };
    editedItem.title = 'Updating title to test';
    component.update(editedItem);
    expect(component.items.length).toEqual(initialItems);
    expect(component.items[1].title).toEqual(editedItem.title);
    expect(component.actionStatus).toEqual(`Edited ${editedItem.title}`);
  });

  it('should not edit and not found in class testing', () => {
    component.ngOnInit();
    const initialItems = component.items.length;

    const editedItem = { ...component.items[1] };
    editedItem.id = component.items.length + 1;
    editedItem.title = 'Reset to some title';
    component.update(editedItem);
    expect(component.items.length).toEqual(initialItems);
    expect(component.items.filter(e => e.title === editedItem.title).length).toEqual(0);
    expect(component.actionStatus).toEqual(`${editedItem.title} not found. No action taken`);
  });

  it('should not delete and not found in class testing', () => {
    component.ngOnInit();
    const initialItems = component.items.length;

    const deletedItem = { ...component.items[1] };
    deletedItem.id = component.items.length + 1;
    component.delete(deletedItem);
    expect(component.items.length).toEqual(initialItems);
    expect(component.items.filter(e => e.title === deletedItem.title).length).toEqual(1);
    expect(component.actionStatus).toEqual(`${deletedItem.title} not found. No action taken`);
  });
});

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormatCourseItemDirective, DurationPipe, SortItemsPipe, CourseListComponent, CourseItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [FilterItemsPipe, ItemsService]
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
    const sortedItems = component.items.sort(
      (a, b) => {
        return (a.creationTime > b.creationTime) ? 1 : ((a.creationTime < b.creationTime) ? -1 : 0);
      });

    // trigger the click
    const btnEdit = fixture.debugElement.queryAll(By.css('.btn-edit'));
    btnEdit[0].nativeElement.click();

    const actionStatus = fixture.debugElement.query(By.css('.action-status')).nativeElement;
    fixture.detectChanges();
    expect(actionStatus.textContent).toEqual(`Edited ${sortedItems[0].title}`);
  });

  it('should delete course through button click', () => {
    const sortedItems = component.items.sort(
      (a, b) => {
        return (a.creationTime > b.creationTime) ? 1 : ((a.creationTime < b.creationTime) ? -1 : 0);
      });

    const itemToDelete = { ...sortedItems[0] };
    // trigger the click
    const btnDelete = fixture.debugElement.queryAll(By.css('.btn-delete'));
    btnDelete[0].nativeElement.click();
    const actionStatus = fixture.debugElement.query(By.css('.action-status')).nativeElement;
    fixture.detectChanges();
    expect(actionStatus.textContent).toEqual(`Deleted ${itemToDelete.title}`);
  });

  it('should add course', () => {
    const initialItemLength = component.items.length;
    component.addCourse();
    fixture.detectChanges();

    expect(component.items.length).toEqual(initialItemLength + 1);
  });
});
