import { RECEIVE_CURRENT_USER,  } from '../actions/session_actions'
import { RECEIVE_SUBSCRIBED_USERS, PRESENCE_CHANGE, UPDATE_ADMIN } from '../actions/workspace_actions'


export default function usersReducer(state = { }, action) {
  let newState = {
    ...state
  }

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.payload.id]: action.payload })
      break;
    
    case RECEIVE_SUBSCRIBED_USERS:
      return { ...state, ...action.users }
        break;

    case PRESENCE_CHANGE:

        newState[action.user.userId].online = action.user.online
        return newState;
    case UPDATE_ADMIN:
      // debugger
      newState[action.workspace.memberId].admin = action.workspace.admin
      return newState;
      break;
       
    default:
      return state
      break;
  }
}