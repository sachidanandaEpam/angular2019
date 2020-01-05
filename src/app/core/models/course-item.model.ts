import { Author } from './author.model';

export interface CourseItem {
    id?: number;
    title?: string;
    durationInMins?: number;
    description?: string;
    courseTime?: number;
    creationTime?: number;
    authors?: Author[];
    isTopRated?: boolean;
}

export interface ItemCriteria {
    start: number;
    count: number;
    textFragment: string;
}
