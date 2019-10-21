import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions'

export default function sessionReducer(state = {id: null}, action){
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { id: action.payload.id }
      break;

    case LOGOUT_CURRENT_USER:
      return { id: null }

      break;
    default:
      return state
      break;
  }
}