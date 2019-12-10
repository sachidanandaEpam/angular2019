import { Author } from '.';

export class Courses {
    id?: number;
    name: string;
    date: string;
    length: number;
    description: string;
    authors: Author[];
    isTopRated: boolean;
}