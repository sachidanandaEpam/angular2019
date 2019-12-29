import { createAction, props } from '@ngrx/store';
import { CourseItem, ItemCriteria } from '../../models';


export const loadItems = createAction('[ItemsService] Load Items', props<{ criteria: ItemCriteria }>());
export const updateItem = createAction('[ItemService] Update Item', props<{ item: CourseItem }>());
export const deleteItem = createAction('[ItemService] Delete Item', props<{ item: CourseItem }>());
export const loadItemById = createAction('[ItemService] Load Item by Id', props<{ id: number }>());
export const createItem = createAction('[ItemService] Create Item', props<{ item: CourseItem }>());

export const itemError = createAction('[ItemService] Item Error', props<{ error: any}>());
export const loadItemsSuccess = createAction('[ItemService] Load Items Success', props<{ items: CourseItem[], criteria: ItemCriteria}>());
export const deleteItemSuccess = createAction('[ItemService] Delete Item Success', props<{ deletedItem: CourseItem }>());
export const loadItemByIdSuccess = createAction('[ItemService] Load Item Success', props<{ selectedItem: CourseItem }>());
export const createItemSuccess = createAction('[ItemService] Create Item Success', props<{ createdItem: CourseItem }>());
