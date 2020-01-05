import { AuthStates, State, authFeatureKey } from '../state';

import { User } from '../../models';
import { createSelector } from '@ngrx/store';
import { selectGlobalState } from './app.selectors';

const getUser = (state: AuthStates.IAuthState) => state.user;
const getAuthenticationStatus = (state: AuthStates.IAuthState) => state.isAuthenticated;
const getUserName = (user: User) => (user ? user.name : null);

const selectAuthState = createSelector(selectGlobalState, (state: State) => state[authFeatureKey]);
const selectUser = createSelector(selectAuthState, getUser);
const selectLoggedIn = createSelector(selectAuthState, getAuthenticationStatus);
const selectUserName = createSelector(selectUser, getUserName);

export { selectAuthState, selectUser, selectLoggedIn, selectUserName };
