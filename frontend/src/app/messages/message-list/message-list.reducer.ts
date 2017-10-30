import { Action } from '@ngrx/store';
// import { ADD_MESSAGE, AddMessage } from './message-list.actions';
import * as MessageListActions from './message-list.actions';

const initialState = {
  messages: []
};

export function messageListReducer(state = initialState, action: MessageListActions.AddMessage) {
  switch (action.type) {
    case MessageListActions.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
}
