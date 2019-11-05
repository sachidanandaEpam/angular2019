import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { By } from '@angular/platform-browser';
import { CourseItem } from 'src/app/entities/course-item';

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
      courseTime: '10/29/2019'
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
    const consoleSpy = spyOn(console, 'log');

    component.item = {
      id: 2,
      title: 'Angular Program 2019 2',
      description: 'Learn about where you can find course descriptions..',
      duration: '2hr 30min',
      courseTime: '10/29/2019'
    };

    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    const duration = fixture.debugElement.query(By.css('.duration')).nativeElement;
    const courseTime = fixture.debugElement.query(By.css('.course-time')).nativeElement;
    const description = fixture.debugElement.query(By.css('.description')).nativeElement;

    expect(title.textContent).toEqual(`Video course: ${component.item.title}`);
    expect(duration.textContent).toEqual(component.item.duration);
    expect(courseTime.textContent).toEqual(component.item.courseTime);
    expect(description.textContent).toEqual(component.item.description);
  });

  it('should display course items as per input', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    const duration = fixture.debugElement.query(By.css('.duration')).nativeElement;
    const courseTime = fixture.debugElement.query(By.css('.course-time')).nativeElement;
    const description = fixture.debugElement.query(By.css('.description')).nativeElement;

    fixture.detectChanges();
    expect(title.textContent).toEqual(`Video course: ${component.item.title}`);
    expect(duration.textContent).toEqual(component.item.duration);
    expect(courseTime.textContent).toEqual(component.item.courseTime);
    expect(description.textContent).toEqual(component.item.description);
  });
});
