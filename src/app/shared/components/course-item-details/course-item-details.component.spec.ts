import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemDetailsComponent } from './course-item-details.component';

describe('CourseItemDetailsComponent', () => {
  let component: CourseItemDetailsComponent;
  let fixture: ComponentFixture<CourseItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
