import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Credentials } from 'src/app/core/models';
import { AuthActions } from 'src/app/core/store/actions';
import { AuthStates } from 'src/app/core/store/state';

@Component({
  selector: 'app-login-page',
  template: `
    <app-login-form
      (loginSubmit)="onSubmit($event)"
    >
    </app-login-form>
  `,
  styles: [],
})
export class LoginPageComponent {

  constructor(private store: Store<AuthStates.IAuthState>) {}

  public onSubmit(credentials: Credentials) {
    this.store.dispatch(AuthActions.login({ credentials }));
  }
}
