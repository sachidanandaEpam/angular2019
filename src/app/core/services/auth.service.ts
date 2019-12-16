import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Token } from '../../core/models';
import { ApiService, EndPoint } from '../http/api.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _isAuthenticated: boolean;

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
