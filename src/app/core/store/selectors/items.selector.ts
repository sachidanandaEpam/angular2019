import { ItemStates, courseFeatureKey, State } from '../state';
import { createSelector } from '@ngrx/store';
import { selectGlobalState } from './app.selectors';

const getItems = (state: ItemStates.IItemState) => state.items;
const getCriteria = (state: ItemStates.IItemState) => state.criteria;
const getLastDeletedItem = (state: ItemStates.IItemState) => state.deletedItem;
const getLastCreatedItem = (state: ItemStates.IItemState) => state.createdItem;
const getSelectedItem = (state: ItemStates.IItemState) => state.selectedItem;

const selectItemState = createSelector(selectGlobalState, (state: State) => state[courseFeatureKey]);
const selectItems = createSelector(selectItemState, getItems);
const selectCriteria = createSelector(selectItemState, getCriteria);
const selectSelectedItem = createSelector(selectItemState, getSelectedItem);
const selectDeletedItem = createSelector(selectItemState, getLastDeletedItem);
const selectCratedItem = createSelector(selectItemState, getLastCreatedItem);

export {selectItemState, selectItems, selectCriteria, selectSelectedItem, selectDeletedItem, selectCratedItem };
