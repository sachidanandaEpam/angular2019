import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ValidationErrorDisplayComponent } from 'src/app/shared/components/validation/validation-error-display.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

let authServiceSpy: {
  login: jasmine.Spy,
  logout: jasmine.Spy,
  getUserInfo: jasmine.Spy,
  isAuthenticated: jasmine.Spy
};

let routerSpy: {
  navigate: jasmine.Spy
};

describe('LoginComponentClassTesting', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
  routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  authServiceSpy.login.and.returnValue({ status: 'success', statusCode: 200 });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, ValidationErrorDisplayComponent],
      imports: [ReactiveFormsModule, FormsModule],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail without valid login form', () => {
    component.onSubmit();
    expect(component.loginForm.valid).toBeFalsy();
  });
});
