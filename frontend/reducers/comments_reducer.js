import { RECEIVE_POSTS, RECEIVE_COMMENT, RECEIVE_MORE_POSTS } from '../actions/posts_actions'

function commentsReducer(state = { }, action) {
    let newState = { ...state }
    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...state, ...action.payload.comments }
            break;
        case RECEIVE_COMMENT:
            let comment = action.comment
            comment.author_id = comment.authorId
            comment.post_id = comment.postId
            if (!newState[action.comment.postId]){
                // debugger
                newState[action.comment.postId] = [];
            } 
            newState[action.comment.postId].push(comment)
            return newState
            break;
        case RECEIVE_MORE_POSTS:
            return Object.assign({}, state, action.payload.comments)
        default:
            return state
            break;
    }
}
export default commentsReducer