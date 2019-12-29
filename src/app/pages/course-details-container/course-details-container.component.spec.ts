import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsContainerComponent } from './course-details-container.component';

describe('CourseDetailsContainerComponent', () => {
  let component: CourseDetailsContainerComponent;
  let fixture: ComponentFixture<CourseDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
