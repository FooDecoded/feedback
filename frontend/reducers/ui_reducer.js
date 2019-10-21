import { RECEIVE_SUBSCRIBED_USERS} from '../actions/workspace_actions'
import { RECEIVE_POSTS } from '../actions/posts_actions'
import { RECEIVE_INITIAL_MESSAGES } from '../actions/messages_actions'
import { RECEIVE_CHANNELS } from '../actions/channels_actions'
import { RECEIVE_FAVORITE_POSTS } from '../actions/workspace_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

function uiReducer(state = {loadingStage : 5}, action) {
    // debugger
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { loadingStage: 5 }
            break;

        case RECEIVE_CHANNELS:
            newState.loadingStage = newState.loadingStage - 1
            return newState
            break;

        case RECEIVE_POSTS:
            newState.loadingStage = newState.loadingStage - 1
            return newState
            break;
                
                
        case RECEIVE_INITIAL_MESSAGES:
            newState.loadingStage = newState.loadingStage - 1
            return newState        
            break;

        case RECEIVE_SUBSCRIBED_USERS:
        newState.loadingStage = newState.loadingStage - 1
            return newState        
            break;

        case RECEIVE_FAVORITE_POSTS:
        newState.loadingStage = newState.loadingStage - 1
            return newState
            break;

        default:
            // debugger
            return state
            break;
    }
}
export default uiReducer