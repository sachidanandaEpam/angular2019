import { createReducer, on } from '@ngrx/store';
import { User } from '../../models';
import { AuthActions } from '../actions';
import { AuthStates } from '../state';

export const reducer = createReducer(
  AuthStates.initialAuthState,
  on(AuthActions.loginSuccess, (state, { authState }) => ({ ...state, isAuthenticated: authState.isAuthenticated, user: authState.user })),
  on(AuthActions.logout, () => AuthStates.initialAuthState)
);

export const getUser = (state: AuthStates.IAuthState) => state.user;
export const getAuthenticationStatus = (state: AuthStates.IAuthState) => state.isAuthenticated;
export const getUserName = (user: User) => (user ? user.name : null);
