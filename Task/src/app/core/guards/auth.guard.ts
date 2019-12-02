import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.isAuthenticated()) { return true; }

    // Navigate to the login page with extras
    this.authService.redirectToLogin();
    return false;
  }
}
