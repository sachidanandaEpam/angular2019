import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumbComponent } from './bread-crumb.component';

describe('BreadCrumbComponentClassTesting', () => {
  let component: BreadCrumbComponent;

  beforeEach(() => {
    component = new BreadCrumbComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('BreadCrumbComponentStandAloneTesting', () => {
  let component: BreadCrumbComponent;
  let fixture: ComponentFixture<BreadCrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadCrumbComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
