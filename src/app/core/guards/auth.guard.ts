import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, public _router: Router) { }

  public canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {
      return this._auth.isAuthenticated().pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            this._router.navigate(['/login']);
          }
        })
      );
  }
}
