import { RECEIVE_POST, RECEIVE_POSTS, RECEIVE_MORE_POSTS, CHANGE_POST } from '../actions/posts_actions';
import { RECEIVE_CHANNEL, RECEIVE_CHANNELS } from '../actions/channels_actions'

function postsReducer(state = {}, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        // Seems like a very dump solution
        // How can this be optimzed
        // is it better as an array or a hash 
        // How about nesting the key
        case RECEIVE_POSTS:
            // debugger
            Object.keys(action.payload.posts).forEach(channel_id => {
                // newState[action.post[channelId]] = newState[action.post[channelId]].push(action.post)
                newState[channel_id] = newState[channel_id] || {}
                action.payload.posts[channel_id].forEach(post => newState[channel_id][post.id] = post)
            }
            )
            return newState
            break;

        case RECEIVE_POST:
            // debugger
            // newState[action.post.]
            // let post_id = Object.keys(action.post)[0];
            // debugger
            let post = action.post
            post.author_id = post.authorId
            post.channel_id = post.channelId
            // newState[post.channelId][post_id] = 
            newState[post.channelId][post.id] = post
            return newState;
            break;

        case RECEIVE_CHANNEL:
            newState[action.channel.id] = []
            return newState;
            break;

        case RECEIVE_CHANNELS:
            Object.keys(action.channels).forEach(key => newState[key] = [])
            return newState;
            break;

        case RECEIVE_MORE_POSTS:
            // debugger
            newState[action.channelId] = action.payload.posts.concat(newState[action.channelId])
            return newState;

        case CHANGE_POST:
            // I need a state reshape
            // debugger
            let idx = newState[action.post.channelId].findIndex(post => post.id == action.post.id)
            action.post.author_id = action.post.authorId
            action.post.channel_id = action.post.channelId
            newState[action.post.channelId][idx] = action.post
            return newState
        default:
            return state;
            break;
    }

    return state
}
export default postsReducer