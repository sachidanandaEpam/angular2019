import { Courses } from '../entities/courses';

export class CoursesImpl implements Courses {
    id: number;
    title: string;
    creationDate: Date;
    durationInMin: number;
    description: string;
}
