import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLoadingComponent } from './block-loading.component';

describe('BlockLoadingComponent', () => {
  let component: BlockLoadingComponent;
  let fixture: ComponentFixture<BlockLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
