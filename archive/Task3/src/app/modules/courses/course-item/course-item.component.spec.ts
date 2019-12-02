import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { By } from '@angular/platform-browser';
import { CourseItem } from 'src/app/entities/course-item';
import * as moment from 'moment';
import { Component } from '@angular/core';

describe('CourseItemComponentClassTesting', () => {
  let component: CourseItemComponent;

  beforeEach(() => {
    component = new CourseItemComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete course in class testing', () => {
    const selectedItem: CourseItem = {
      id: 1,
      title: 'Angular Program 2019',
      description: 'Learn about where you can find course descriptions.',
      duration: '2hr 30min',
      courseTime: '10/29/2019',
      creationTime: moment('12/15/2019 9:00', 'M/D/YYYY H:mm').unix()
    };

    component.item = selectedItem;
    component.deleteItem.subscribe((deletedItem: CourseItem) => expect(deletedItem).toBe(selectedItem));
    component.deleteCourse();
  });

  it('should edit course in class testing', () => {
    const selectedItem: CourseItem = {
      id: 1,
      title: 'Angular Program 2019',
      description: 'Learn about where you can find course descriptions.',
      duration: '2hr 30min',
      courseTime: '10/29/2019',
      creationTime: moment('12/15/2019 9:00', 'M/D/YYYY H:mm').unix()
    };

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

  item: CourseItem = {
    id: 1,
    title: 'Angular Program 2019',
    description: 'Learn about where you can find course descriptions.',
    duration: '2hr 30min',
    courseTime: '10/29/2019',
    creationTime: moment('12/15/2019 9:00', 'M/D/YYYY H:mm').unix()
  };

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
      declarations: [CourseItemComponent, TestHostComponent]
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

    expect(title.textContent).toEqual(`Video course: ${component.item.title}`);
    expect(duration.textContent).toEqual(component.item.duration);
    expect(courseTime.textContent).toEqual(component.item.courseTime);
    expect(description.textContent).toEqual(component.item.description);
  });

  it('should delete course in host testing', () => {
    const btnDelete = fixture.debugElement.queryAll(By.css('.btn-delete'));
    btnDelete[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.actionStatus).toEqual(`Deleted ${component.item.title}`);
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
      declarations: [CourseItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;

    component.item = {
      id: 1,
      title: 'Angular Program 2019',
      description: 'Learn about where you can find course descriptions.',
      duration: '2hr 30min',
      courseTime: '10/29/2019',
      creationTime: moment('12/15/2019 9:00', 'M/D/YYYY H:mm').unix()
    };

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
    component.item = {
      id: 2,
      title: 'Angular Program 2019 2',
      description: 'Learn about where you can find course descriptions..',
      duration: '2hr 30min',
      courseTime: '10/29/2019',
      creationTime: moment('12/15/2019 9:00', 'M/D/YYYY H:mm').unix()
    };

    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.heading')).nativeElement;
    const duration = fixture.debugElement.query(By.css('.course-duration')).nativeElement;
    const courseTime = fixture.debugElement.query(By.css('.course-time')).nativeElement;
    const description = fixture.debugElement.query(By.css('.description')).nativeElement;

    expect(title.textContent).toEqual(`Video course: ${component.item.title}`);
    expect(duration.textContent).toEqual(component.item.duration);
    expect(courseTime.textContent).toEqual(component.item.courseTime);
    expect(description.textContent).toEqual(component.item.description);
  });

  it('should display course items as per input', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    const duration = fixture.debugElement.query(By.css('.course-duration')).nativeElement;
    const courseTime = fixture.debugElement.query(By.css('.course-time')).nativeElement;
    const description = fixture.debugElement.query(By.css('.description')).nativeElement;

    fixture.detectChanges();
    expect(title.textContent).toEqual(`Video course: ${component.item.title}`);
    expect(duration.textContent).toEqual(component.item.duration);
    expect(courseTime.textContent).toEqual(component.item.courseTime);
    expect(description.textContent).toEqual(component.item.description);
  });
});
