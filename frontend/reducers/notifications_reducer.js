import { RECEIVE_POSTS, RECEIVE_MORE_POSTS, RECEIVE_POST } from '../actions/posts_actions'
import { RESET_CHANNEL_COUNT } from '../actions/notifications_actions'
export default function notificationsReducer(state = { messages: {}, posts: {} }, action){
    let newState = { ...state }
    switch (action.type) {
            
        case RECEIVE_POSTS:
            newState.posts = action.payload.notifications
            return newState

        case RECEIVE_MORE_POSTS:
            newState.posts[action.channelId] = 0
            return newState;

        case RECEIVE_POST:
            newState.posts[action.post.channelId] += 1    
            return newState
        break;

        case RESET_CHANNEL_COUNT:
            newState.posts[action.channelId] = 0
            return newState
            break
        default:
            return state;
            break;
    }
}