import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export interface FeatureState {
  auth: State;
}

export interface State {
  token: string;
  authenticated: boolean;
  user: User;
}

const initialState: State = {
  token: null,
  authenticated: false,
  user: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGNIN_USER:
      return {
        ...state,
        token: action.payload.token,
        authenticated: true,
        user: action.payload.user
      };
    case AuthActions.LOGOUT_USER:
      return {
        ...state,
        token: null,
        authenticated: false,
        user: null
      };
    default:
      break;
  }
}
