import { RouterReducerState } from '@ngrx/router-store';
import { IAuthState, initialAuthState } from './auth.state';

export interface IAppState {
    router?: RouterReducerState;
    authState: IAuthState;
}

export const initialAppState: IAppState = {
    authState: initialAuthState
};

export function getInitialState(): IAppState {
    return initialAppState;
}
