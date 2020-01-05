import { Action, combineReducers } from '@ngrx/store';
import { authFeatureKey, courseFeatureKey, State } from '../state';
import * as AuthReducer from './auth.reducer';
import * as ItemReducer from './items.reducer';

export function reducers(state: State | undefined, action: Action) {
  return combineReducers({
    [authFeatureKey]: AuthReducer.reducer,
    [courseFeatureKey]: ItemReducer.reducer,
  })(state, action);
}
