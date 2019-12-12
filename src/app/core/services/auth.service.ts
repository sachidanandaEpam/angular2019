import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { ApiService, EndPoint } from '../http/api.service';
import { Token } from '../../core/models';
import { shareReplay, map, take, tap, mapTo, switchMapTo, filter, reduce, switchMap, first, delay } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginUserKey = 'LoggedInUserId';

  private _isAuthenticated: boolean;
  private success = new Subject<string>();

  constructor(private _api: ApiService, private _session: SessionService, private _router: Router) {
    this._isAuthenticated = false;
  }

  public login(login: string, password: string): void {
    this._api.post<Token>(EndPoint.login, {login, password})
    .pipe(
      take(1),
      tap(response => {
        this._session.setAccessToken(response.token);
        this._isAuthenticated = true;
        this._router.navigate(['']);
      })
    ).subscribe();
  }

  public logout(): void {
    this._session.removeAccessToken();
    this._isAuthenticated = false;
    this._router.navigate(['/login']);
  }

  public isAuthenticated(): Observable<boolean> {
    if (this._session.getAccessToken()) {
      this._isAuthenticated = true;
    }
    return of(this._isAuthenticated);
  }
}
