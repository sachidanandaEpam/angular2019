import * as AuthStates from './auth.state';
import * as AppStates from './app.state';
import * as ItemStates from './item.state';

export const globalFeatureKey = 'global';
export const authFeatureKey = 'auth';
export const courseFeatureKey = 'courses';

interface State {
  [authFeatureKey]: AuthStates.IAuthState;
  [courseFeatureKey]: ItemStates.IItemState;
}

export { AuthStates, AppStates, ItemStates, State };
