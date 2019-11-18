import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { By } from '@angular/platform-browser';
import { CourseItem } from 'src/app/entities/course-item';
import * as moment from 'moment';
import { Component } from '@angular/core';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { FormatCourseItemDirective } from 'src/app/shared/directives/format-course-item.directive';

const testItem = {
  id: 1,
  title: 'Angular Program 2019',
  description: 'Learn about where you can find course descriptions.',
  durationInMins: 150,
  courseTime: Date.parse('12/29/2019 1:00'),
  creationTime: Date.parse('12/15/2019 9:00')
};

describe('CourseItemComponentClassTesting', () => {
  let component: CourseItemComponent;

  beforeEach(() => {
    component = new CourseItemComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete course in class testing', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const selectedItem: CourseItem = testItem;

    component.item = selectedItem;
    component.deleteItem.subscribe((deletedItem: CourseItem) => expect(deletedItem).toBe(selectedItem));
    component.deleteCourse();
  });

  it('should not delete course on cancel in class testing', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    const selectedItem: CourseItem = testItem;

    component.item = selectedItem;
    component.deleteItem.subscribe((deletedItem: CourseItem) => expect(deletedItem).toBe(selectedItem));
    component.deleteCourse();
  });

  it('should edit course in class testing', () => {
    const selectedItem: CourseItem = testItem;

    component.item = selectedItem;
    component.editItem.subscribe((editedItem: CourseItem) => expect(editedItem).toBe(selectedItem));
    component.editCourse();
  });
});

@Component({
  template: `<app-course-item [item]="item" (deleteItem)="update($event, 'deleted')"
  (editItem)="update($event, 'edited')"></app-course-item>`
})
class TestHostComponent {
  actionStatus = '';

  item: CourseItem = testItem;

  update(item: CourseItem, status: string) {
    if (status === 'deleted') {
      this.actionStatus = `Deleted ${item.title}`;
    } else if (status === 'edited') {
      this.actionStatus = `Edited ${item.title}`;
    }
  }
}

describe('CourseItemComponentTestHostTesting', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormatCourseItemDirective, DurationPipe, CourseItemComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and contents set in host testing', () => {
    expect(component).toBeTruthy();
    const title = fixture.debugElement.query(By.css('.heading')).nativeElement;
    const duration = fixture.debugElement.query(By.css('.course-duration')).nativeElement;
    const courseTime = fixture.debugElement.query(By.css('.course-time')).nativeElement;
    const description = fixture.debugElement.query(By.css('.description')).nativeElement;

    expect(title.textContent).toEqual(`Video course: ${component.item.title.toUpperCase()}`);
    expect(duration.textContent).toEqual('2 hr 30 min');
    expect(courseTime.textContent).toEqual('Dec 15, 2019');
    expect(description.textContent).toEqual(component.item.description);
  });

  it('should delete course in host testing', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const btnDelete = fixture.debugElement.queryAll(By.css('.btn-delete'));
    btnDelete[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.actionStatus).toEqual(`Deleted ${component.item.title}`);
  });

  it('should not delete course in host testing on cancel of confirm dialog', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    const btnDelete = fixture.debugElement.queryAll(By.css('.btn-delete'));
    btnDelete[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.actionStatus).toEqual('');
  });

  it('should edit course in host testing', () => {
    const btnEdit = fixture.debugElement.queryAll(By.css('.btn-edit'));
    btnEdit[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.actionStatus).toEqual(`Edited ${component.item.title}`);
  });
});

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormatCourseItemDirective, DurationPipe, CourseItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;

    component.item = testItem;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete course through event', () => {
    component.deleteItem.subscribe((item: CourseItem) => {
      expect(item).toEqual(component.item);
    });
    component.deleteCourse();
  });

  it('should delete course through button click', () => {
    component.deleteItem.subscribe((item: CourseItem) => {
      expect(item).toEqual(component.item);
    });

    // trigger the click
    const button = fixture.debugElement.query(By.css('.btn-delete'));
    button.nativeElement.click();

    fixture.detectChanges();
  });

  it('should edit course through event', () => {
    component.editItem.subscribe((e: CourseItem) => {
      expect(e).toEqual(component.item);
    });
    component.editCourse();
  });

  it('should edit course through button click', () => {
    component.editItem.subscribe((e: CourseItem) => {
      expect(e).toEqual(component.item);
    });

    // trigger the click
    // Need to find better way to identify the button
    const button = fixture.debugElement.query(By.css('.btn-edit'));
    button.nativeElement.click();

    fixture.detectChanges();
  });

  it('should trigger ngChanges event', () => {
    component.item = testItem;
    component.item.id = 2;

    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.heading')).nativeElement;
    const duration = fixture.debugElement.query(By.css('.course-duration')).nativeElement;
    const courseTime = fixture.debugElement.query(By.css('.course-time')).nativeElement;
    const description = fixture.debugElement.query(By.css('.description')).nativeElement;

    expect(title.textContent).toEqual(`Video course: ${component.item.title.toUpperCase()}`);
    expect(duration.textContent).toEqual('2 hr 30 min');
    expect(courseTime.textContent).toEqual('Dec 15, 2019');
    expect(description.textContent).toEqual(component.item.description);
  });

  it('should display course items as per input', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    const duration = fixture.debugElement.query(By.css('.course-duration')).nativeElement;
    const courseTime = fixture.debugElement.query(By.css('.course-time')).nativeElement;
    const description = fixture.debugElement.query(By.css('.description')).nativeElement;

    fixture.detectChanges();
    expect(title.textContent).toEqual(`Video course: ${component.item.title.toUpperCase()}`);
    expect(duration.textContent).toEqual('2 hr 30 min');
    expect(courseTime.textContent).toEqual('Dec 15, 2019');
    expect(description.textContent).toEqual(component.item.description);
  });
});
