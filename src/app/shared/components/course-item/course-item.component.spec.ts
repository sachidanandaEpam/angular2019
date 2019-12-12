import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { testItem } from 'src/app/mock/courses-mock';
import { CourseItem } from 'src/app/core/models/course-item.model';
import { FormatCourseItemDirective } from 'src/app/shared/directives/format-course-item.directive';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { CourseItemComponent } from './course-item.component';


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
});

@Component({
  template: `<app-course-item [item]="item" (deleteItem)="update($event, 'deleted')></app-course-item>`
})
class TestHostComponent {
  public actionStatus = '';

  public item: CourseItem = testItem;

  public update(item: CourseItem, status: string) {
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
