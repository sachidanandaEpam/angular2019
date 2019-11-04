import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { By } from '@angular/platform-browser';

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
    const expectString = `Deleting ${component.item.title} course with id ${component.item.id}`;
    component.deleteItem.subscribe((e: string) => {
      expect(e).toEqual(expectString);
    });
    component.deleteCourse();
  });

  it('should delete course through button click', () => {
    const expectString = `Deleting ${component.item.title} course with id ${component.item.id}`;
    spyOn(component.deleteItem, 'emit');

    // trigger the click
    // Need to find better way to identify the button
    const button = fixture.debugElement.queryAll(By.css('button'));
    button[1].nativeElement.click();

    fixture.detectChanges();

    expect(component.deleteItem.emit).toHaveBeenCalledWith(expectString);
  });

  it('should edit course through event', () => {
    component.editItem.subscribe((e: string) => {
      expect(e).toEqual(`Editing ${component.item.title} course with id ${component.item.id}`);
    });
    component.editCourse();
  });

  it('should edit course through button click', () => {
    const expectString = `Editing ${component.item.title} course with id ${component.item.id}`;
    spyOn(component.editItem, 'emit');

    // trigger the click
    // Need to find better way to identify the button
    const button = fixture.debugElement.queryAll(By.css('button'));
    button[0].nativeElement.click();

    fixture.detectChanges();

    expect(component.editItem.emit).toHaveBeenCalledWith(expectString);
  });

  xit('should edit course through button click', () => {
    const consoleSpy = spyOn(console, 'log');

    component.item = {
      id: 2,
      title: 'Angular Program 2019 2',
      description: 'Learn about where you can find course descriptions..',
      duration: '2hr 30min',
      courseTime: '10/29/2019'
    };

    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith('');
  });

  it('should display course items as per input', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    const courseItemText = title.textContent;
    fixture.detectChanges();
    expect(courseItemText).toEqual(`Video course: ${component.item.title}`);
  });
});
