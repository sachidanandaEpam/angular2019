import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormFieldItem } from 'src/app/core/models/form-field-item.model';
import { Credentials } from '../../core/models';
import { ValidationService } from '@app/core/services/validation.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  @Output() public loginSubmit = new EventEmitter<Credentials>();

  public loginForm: FormGroup;

  public loginFields: FormFieldItem[];

  constructor(private validation: ValidationService) {
    this.loginFields = [{
      cssClass: 'form-field',
      label: 'Email',
      optional: false,
      name: 'email',
      hint: 'Enter email address',
      type: 'input',
      inputType: 'email'
    },
    {
      cssClass: 'form-field',
      label: 'Password',
      optional: false,
      name: 'password',
      hint: 'Enter password',
      type: 'input',
      inputType: 'password',
      minLength: 5
    }];
  }

  public ngOnInit() {
    this.loginForm = this.validation.buildFormGroup(this.loginFields);
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.loginSubmit.emit({login: this.loginForm.get('email').value, password: this.loginForm.get('password').value});
    }
  }
}
