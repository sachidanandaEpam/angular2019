import { User } from '../../models';

export interface IAuthState {
    isAuthenticated: boolean;
    user: User | null;
}

export const initialAuthState: IAuthState = {
    isAuthenticated: false,
    user: null
};

