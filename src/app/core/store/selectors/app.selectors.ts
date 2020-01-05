import { createFeatureSelector } from '@ngrx/store';

import { globalFeatureKey, State } from '../state';

const selectGlobalState = createFeatureSelector<State>(globalFeatureKey);

export { selectGlobalState };
