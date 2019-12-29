import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Credentials } from '../../models';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from '../actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}


  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      map(action => action.credentials),
      exhaustMap((auth: Credentials) =>
        this.authService.login(auth.login, auth.password).pipe(
          map(authState => AuthActions.loginSuccess({ authState })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  public loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/courses']))
      ),
    { dispatch: false }
  );

  public loginRedirect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginRedirect),
        tap(authed => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  public logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.loginRedirect())
        )
      )
    )
  );
}
