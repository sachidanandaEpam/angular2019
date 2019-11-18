import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { AppStorageService } from 'src/app/core/services/app-storage.service';

let authServiceSpy: {
  login: jasmine.Spy,
  logout: jasmine.Spy,
  getUserInfo: jasmine.Spy,
  isAuthenticated: jasmine.Spy
};

let routerSpy: {
  navigate: jasmine.Spy
};

const testUser = {
  id: 1,
  firstName: 'TestFirstName',
  lastName: 'Test Last Name',
  token: 'Some Token'
};

@Component({
  template: `<app-header [title]="title"></app-header>`
})
class TestHostComponent {
  title = 'Testing title';
}

describe('HeaderComponentTestHostTesting', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserInfo', 'isAuthenticated']);
  routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  authServiceSpy.getUserInfo.and.returnValue(testUser);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, TestHostComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and set title', () => {
    expect(component).toBeTruthy();
    const title = fixture.debugElement.query(By.css('.header-title')).nativeElement;

    expect(title.textContent).toEqual(`${component.title}`);
  });
});

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserInfo', 'isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    authServiceSpy.getUserInfo.and.returnValue(testUser);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create and set header message', () => {
    expect(component).toBeTruthy();
    const isAuthenticated = true;
    authServiceSpy.isAuthenticated.and.returnValue(isAuthenticated);

    fixture.detectChanges();

    const headerMessage = fixture.debugElement.query(By.css('.header-message')).nativeElement;

    expect(headerMessage.textContent).toEqual(`Welcome ${testUser.lastName}, ${testUser.firstName}`);
    expect(component.isAuthenticated()).toEqual(isAuthenticated);
  });
});
