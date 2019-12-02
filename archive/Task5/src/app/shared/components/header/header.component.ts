import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }

  @Input() title = 'Tasks';

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserName() {
    const loggedInUser = this.authService.getUserInfo();
    return `${loggedInUser.lastName}, ${loggedInUser.firstName}`;
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
