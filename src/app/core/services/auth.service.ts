import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { Token, User } from '../../core/models';
import { ApiService, EndPoint } from '../http/api.service';
import { SessionService } from './session.service';
import { UserService } from './user.service';
import { IAuthState } from '../store/state/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private _api: ApiService, private _session: SessionService, private _user: UserService) { }

  public login(login: string, password: string): Observable<IAuthState> {
    return this._api.post<Token>(EndPoint.login, {login, password})
    .pipe(
      take(1),
      tap(response => {
        this._session.setAccessToken(response.token);
      }),
      switchMap(response => this.getInitialAuthState())
    );
  }

  public logout(): Observable<boolean> {
    return of(EMPTY).pipe(
      map(() => {
        this._session.removeAccessToken();
        return true;
      }));
  }

  public isAuthenticated(): Observable<boolean> {
    return of(this._session.getAccessToken() ? true : false);
  }

  public getInitialAuthState(): Observable<IAuthState> {
    return this._user.getUserInfo().pipe(
      map((user: User) => ({isAuthenticated: true, user}))
    );
  }
}
