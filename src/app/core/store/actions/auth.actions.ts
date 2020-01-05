import { createAction, props } from '@ngrx/store';
import { Credentials } from '../../models';
import { IAuthState } from '../state/auth.state';

export const loginSuccess = createAction('[Auth/API] Login Success', props<{ authState: IAuthState }>());
export const loginFailure = createAction('[Auth/API] Login Failure', props<{ error: any }>());
export const loginRedirect = createAction('[Auth/API] Login Redirect');
export const logout = createAction('[Auth] Logout');
export const login = createAction('[Login Page] Login', props<{ credentials: Credentials }>());
