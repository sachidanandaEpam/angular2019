import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormFieldItem } from 'src/app/core/models/form-field-item.model';
import { Credentials } from '../../core/models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  @Output() public loginSubmit = new EventEmitter<Credentials>();

  public loginForm: FormGroup;

  private loginFields: FormFieldItem[];

  constructor(private formBuilder: FormBuilder, private router: Router) {
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

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.loginSubmit.emit({login: this.loginForm.get('email').value, password: this.loginForm.get('password').value});
    }
  }
}
