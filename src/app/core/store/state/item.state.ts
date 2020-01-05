import { CourseItem, ItemCriteria } from '../../models';
import { environment } from 'src/environments/environment';

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
        count: environment.config.defaultCourseToDisplay,
        textFragment: ''
    },
    deletedItem: null,
    selectedItem: null,
    createdItem: null,
};
