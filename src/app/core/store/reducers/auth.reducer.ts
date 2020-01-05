import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions';
import { AuthStates } from '../state';

export const reducer = createReducer(
  AuthStates.initialAuthState,
  on(AuthActions.loginSuccess, (state, { authState }) => ({ ...state, isAuthenticated: authState.isAuthenticated, user: authState.user })),
  on(AuthActions.logout, () => AuthStates.initialAuthState)
);


