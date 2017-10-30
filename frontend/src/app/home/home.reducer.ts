import { User } from '../auth/user.model';
import { LoginUser } from './home.actions';
import * as UserActions from './home.actions';

const initialState = {
  user: null
};

export function homeReducer(state = initialState, action: LoginUser) {
  switch (action.type) {
    case UserActions.LOGIN_USER:
      debugger;

      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }

}
