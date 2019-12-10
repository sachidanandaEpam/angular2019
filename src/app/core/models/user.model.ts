import { Name } from './name.model';

export interface User {
    id: number;
    name: Name;
    token: string;
    login?: string;
    password?: string;
}
