import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SearchCoursesComponent } from './search-courses.component';
import { By } from '@angular/platform-browser';

describe('SearchCoursesComponent', () => {
  let component: SearchCoursesComponent;
  let fixture: ComponentFixture<SearchCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCoursesComponent],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'Unit test value';

    const event = new Event('input', {
      bubbles: true,
      cancelable: true
    });
    inputElement.dispatchEvent(event);

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();

  });
});
