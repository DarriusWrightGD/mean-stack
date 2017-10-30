import {Action} from '@ngrx/store';
import { User } from '../user.model';

export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGOUT_USER = 'LOGOUT_USER';


export class SigninUser implements Action {
  readonly type = SIGNIN_USER;
  constructor(
    public payload: {token: string, user: User}
  ) {}
}

export class  SignupUser implements Action {
  readonly type = SIGNUP_USER;
  constructor(public payload: User) {}
}

export class LogoutUser implements Action {
  readonly type = LOGOUT_USER;
}

export type AuthActions = SigninUser | SignupUser | LogoutUser;
