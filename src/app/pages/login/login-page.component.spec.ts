import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthActions } from 'src/app/core/store/actions';
import * as AuthReducer from 'src/app/core/store/reducers';
import { LoginFormComponent } from './login-form.component';
import { LoginPageComponent } from './login-page.component';

describe('Login Page', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: MockStore<AuthReducer.AuthState>;
  let instance: LoginPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [LoginPageComponent, LoginFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: AuthReducer.selectLoggedIn, value: false },
          ],
        }),
      ],
    });

    fixture = TestBed.createComponent(LoginPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch');
  });

  /**
   * Container components are used as integration points for connecting
   * the store to presentational components and dispatching
   * actions to the store.
   *
   * Container methods that dispatch events are like a component's output observables.
   * Container properties that select state from store are like a component's input properties.
   * If pure components are functions of their inputs, containers are functions of state
   *
   * Traditionally you would query the components rendered template
   * to validate its state. Since the components are analogous to
   * pure functions, we take snapshots of these components for a given state
   * to validate the rendered output and verify the component's output
   * against changes in state.
   */
  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toBeTruthy();
  });

  it('should dispatch a login event on submit', () => {
    const credentials: any = {};
    const action = AuthActions.login({ credentials });

    instance.onSubmit(credentials);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
