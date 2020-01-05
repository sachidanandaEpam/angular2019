import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
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

describe('LoginFormComponentClassTesting', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
  routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  authServiceSpy.login.and.returnValue({ status: 'success', statusCode: 200 });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent, ValidationErrorDisplayComponent],
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
    fixture = TestBed.createComponent(LoginFormComponent);
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
