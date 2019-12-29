import { createReducer, on } from '@ngrx/store';
import { ItemActions } from '../actions';
import { ItemStates } from '../state';

export const reducer = createReducer(
  ItemStates.initialItemState,
  on(ItemActions.loadItemsSuccess, (state: ItemStates.IItemState, { items, criteria }) => ({ ...state, items, criteria })),
  on(ItemActions.deleteItemSuccess, (state: ItemStates.IItemState, { deletedItem }) => ({ ...state, deletedItem })),
  on(ItemActions.loadItemByIdSuccess, (state: ItemStates.IItemState, { selectedItem }) => ({ ...state, selectedItem })),
  on(ItemActions.createItemSuccess, (state: ItemStates.IItemState, { createdItem }) => ({ ...state, createdItem })),
);

export const getItems = (state: ItemStates.IItemState) => state.items;
export const getCriteria = (state: ItemStates.IItemState) => state.criteria;
export const getLastDeletedItem = (state: ItemStates.IItemState) => state.deletedItem;
export const getLastCreatedItem = (state: ItemStates.IItemState) => state.createdItem;
export const getSelectedItem = (state: ItemStates.IItemState) => state.selectedItem;
