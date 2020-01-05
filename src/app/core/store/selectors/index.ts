import { createFeatureSelector } from '@ngrx/store';
import { globalFeatureKey, State } from '../state';
import * as AuthSelectors from './auth.selector';
import * as ItemSelectors from './items.selector';

export { AuthSelectors, ItemSelectors };
