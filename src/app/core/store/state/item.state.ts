import { CourseItem, ItemCriteria } from '../../models';

export interface IItemState {
    items: CourseItem[] | null;
    criteria: ItemCriteria;
    deletedItem: CourseItem | null;
    selectedItem: CourseItem | null;
    createdItem: CourseItem | null;
}

export const initialItemState: IItemState = {
    items: null,
    criteria: {
        start: 0,
        count: 10,
        textFragment: ''
    },
    deletedItem: null,
    selectedItem: null,
    createdItem: null,
};
