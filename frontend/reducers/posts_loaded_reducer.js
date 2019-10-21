import { RECEIVE_MORE_POSTS, RECEIVE_POSTS } from '../actions/posts_actions';
import { RECEIVE_CHANNELS } from '../actions/channels_actions'

export default function postsLoadedReducer(state = {}, action){
    let newState = {...state};

    switch (action.type) {
        case RECEIVE_CHANNELS:
                // debugger
                Object.keys(action.channels).forEach( (channelId) => newState[channelId] = false );
                // debugger
                return newState;
                break;

        case RECEIVE_MORE_POSTS:
            // debugger
            if(action.payload.posts.length < 10){
                newState[action.channelId] = true
            }
            return newState;
            break;



        default:
            return state
            break;
    }
}