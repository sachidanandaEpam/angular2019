import { User } from '../entities/user';

export class UserImpl implements User {
    id: number; firstName: string;
    lastname: string;
}
