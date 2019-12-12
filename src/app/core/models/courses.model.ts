import { Author } from '.';

export class Courses {
    public id?: number;
    public name: string;
    public date: string;
    public length: number;
    public description: string;
    public authors: Author[];
    public isTopRated: boolean;
}
