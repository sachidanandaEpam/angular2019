import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Name } from 'src/app/core/models';
import { AuthActions } from 'src/app/core/store/actions';
import * as AppReducer from 'src/app/core/store/reducers';
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
    this.isAuthenticated$ = this.store.select(AppReducer.selectLoggedIn);
    this.name$ = this.store.select(AppReducer.selectUserName);
   }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
