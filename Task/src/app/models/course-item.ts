export interface CourseItem {
    id?: number;
    title: string;
    durationInMins: number;
    description: string;
    courseTime: number;
    creationTime: number;
    authors?: string[];
    isTopRated?: boolean;
}
