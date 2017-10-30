import { Action } from '@ngrx/store';
import { User } from '../auth/user.model';


export const LOGIN_USER = 'LOGIN_USER';

export class LoginUser implements Action {
  type: string = LOGIN_USER;
  /**
   *
   */
  constructor(public payload: User) {
  }
}

export type UserActions = LoginUser;
