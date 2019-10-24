import { SET_FAVORITE, UNSET_FAVORITE } from '../actions/posts_actions'
import { RECEIVE_FAVORITE_POSTS } from '../actions/workspace_actions'

export default function favorites_reducer(state = { posts: {}, messages: {} }, action){
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_FAVORITE_POSTS:
            newState.posts = action.favorites.posts || {}
            newState.messages = action.favorites.messages || {}
            // debugger
            return newState
            break;

        case SET_FAVORITE:   
            // debugger
            // newState.posts = newState.posts.concat(action.post)
            if (action.post.unfavorited){
                delete newState.posts[action.post.post_id]
                return newState;
            } else {
                action.post.author_id = action.post.authorId
                return { ...newState, posts: { ...newState.posts, [action.post.id]: action.post } }

            }
            break;

        default:
            return state;
            break;
    }
}