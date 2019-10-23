import { RECEIVE_ERRORS , RECEIVE_CURRENT_USER} from '../actions/session_actions'

export default function sessionErrorsReducer(state = [], action){
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.payload
      break;
    case RECEIVE_CURRENT_USER:
        return []
        break;
    default:
      return state
      break;
  }
}