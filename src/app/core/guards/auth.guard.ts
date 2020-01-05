import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthActions } from '../store/actions';
import { AuthSelectors } from '../store/selectors';
import { AuthStates } from '../store/state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthStates.IAuthState>) { }

  public canActivate(): Observable<boolean | UrlTree> | boolean {
    return this.store.pipe(
      select(AuthSelectors.selectLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(AuthActions.loginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
