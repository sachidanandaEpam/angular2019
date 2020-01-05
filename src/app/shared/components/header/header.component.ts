import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Name } from 'src/app/core/models';
import { AuthActions } from 'src/app/core/store/actions';
import { AuthSelectors } from 'src/app/core/store/selectors';
import { AuthStates } from 'src/app/core/store/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() public title = 'Tasks';

  public isAuthenticated$: Observable<boolean>;
  public name$: Observable<Name>;

  constructor(private store: Store<AuthStates.IAuthState>) { }

   public ngOnInit() {
    this.isAuthenticated$ = this.store.select(AuthSelectors.selectLoggedIn);
    this.name$ = this.store.select(AuthSelectors.selectUserName);
   }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
