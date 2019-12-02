import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormFieldItem } from 'src/app/models/form-field-item';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter<User>();

  loginForm: FormGroup;

  private loginFields: FormFieldItem[];

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginFields = [{
      cssClass: 'form-field',
      label: 'Email',
      optional: false,
      name: 'email',
      hint: 'Enter email address',
      type: 'email'
    },
    {
      cssClass: 'form-field',
      label: 'Password',
      optional: false,
      name: 'password',
      hint: 'Enter password',
      type: 'password'
    }];
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const response = this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
      if (response.statusCode === 200) {
        this.loggedIn.emit(this.authService.getUserInfo());
        this.router.navigate(['/']);
      }
    }
  }
}
