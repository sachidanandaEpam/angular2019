import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter<User>();

  loginForm: FormGroup;
  private submitted: boolean;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  isFieldValid(field: string) {
    return (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.submitted);
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const response = this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
      if (response.statusCode === 200) {
        this.loggedIn.emit(this.authService.getUserInfo());
        this.router.navigate(['/courses']);
      }
    }
  }
}
