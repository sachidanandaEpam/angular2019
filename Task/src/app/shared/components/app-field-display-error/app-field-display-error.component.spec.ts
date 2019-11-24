import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFieldDisplayErrorComponent } from './app-field-display-error.component';

describe('AppFieldDisplayErrorComponent', () => {
  let component: AppFieldDisplayErrorComponent;
  let fixture: ComponentFixture<AppFieldDisplayErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFieldDisplayErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFieldDisplayErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
