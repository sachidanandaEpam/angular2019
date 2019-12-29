import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, courseFeatureKey, State, globalFeatureKey } from '../state';
import * as AuthReducer from './auth.reducer';
import * as ItemReducer from './items.reducer';

export function reducers(state: State | undefined, action: Action) {
  return combineReducers({
    [authFeatureKey]: AuthReducer.reducer,
    [courseFeatureKey]: ItemReducer.reducer,
  })(state, action);
}

export const selectGlobalState = createFeatureSelector<State>(globalFeatureKey);

export const selectAuthState = createSelector(selectGlobalState, (state: State) => state[authFeatureKey]);
export const selectUser = createSelector(selectAuthState, AuthReducer.getUser);
export const selectLoggedIn = createSelector(selectAuthState, AuthReducer.getAuthenticationStatus);
export const selectUserName = createSelector(selectUser, AuthReducer.getUserName);


export const selectItemState = createSelector(selectGlobalState, (state: State) => state[courseFeatureKey]);
export const selectItems = createSelector(selectItemState, ItemReducer.getItems);
export const selectCriteria = createSelector(selectItemState, ItemReducer.getCriteria);
export const selectSelectedItem = createSelector(selectItemState, ItemReducer.getSelectedItem);
export const selectDeletedItem = createSelector(selectItemState, ItemReducer.getLastDeletedItem);
export const selectCratedItem = createSelector(selectItemState, ItemReducer.getLastCreatedItem);
