import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Name } from 'src/app/core/models';
import { take, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  @Input() title = 'Tasks';

  name: Name;
  private _isAuthenticated: boolean;

  logout() {
    this.authService.logout();
  }

  private fetchUsername(): void {
    this.userService.getUserInfo().subscribe(
      (response) => {
        this.name = response.name;
      }
    );
  }

  isAuthenticated(): boolean {
    this.authService.isAuthenticated().pipe(
      take(1),
      tap(isAuthenticated => {
        if (isAuthenticated && !this.name) {
            this.fetchUsername();
          }
        })
    ).subscribe(
      result => {
        this._isAuthenticated = result;
      }
    );
    return this._isAuthenticated;
  }
}
