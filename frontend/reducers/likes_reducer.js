import { RECEIVE_LIKE, RECEIVE_POSTS, RECEIVE_MORE_POSTS } from '../actions/posts_actions'

export default function likesReducer(state = {}, action){
    let newState = {...state}

    switch (action.type) {
        case RECEIVE_LIKE:
            // debugger
            if(action.like.unliked){
                // debugger
               return{
                   ...state,
                   [action.like.postId] : newState[action.like.postId].filter( like => like.member_id != action.like.userId )
               } 
            } else {
                // debugger
                newState[action.like.postId] = newState[action.like.postId] || []
                action.like.member_id = action.like.userId
                action.like.post_id = action.like.postId

                newState[action.like.postId].push(action.like)
                return newState
            }
            break;
        
        case RECEIVE_POSTS:
            newState = action.payload.likes
            return newState
            break;
            
        case RECEIVE_MORE_POSTS:
            newState = { ...newState, ...action.payload.likes }
            return newState;

            break;
        default:
            return state;
            break;
    }
}