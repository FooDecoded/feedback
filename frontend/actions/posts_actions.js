import * as postUtils from '../utils/posts.utils'

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_MORE_POSTS = "RECEIVE_MORE_POSTS";
export const CHANGE_POST = "CHANGE_POST"
export const SET_FAVORITE = "SET_FAVORITE"
export const UNSET_FAVORITE = "UNSET_FAVORITE"

export function favoritePost(post) {
    return function (dispatch) {
        postUtils.favoritePost(post)
            .then(res => {
                // debugger
                    dispatch(setFavorite(res))
            })
    }
}

export function setFavorite(post) {
    return {
        type: SET_FAVORITE,
        post
    }
}

export function unsetFavorite(post) {
    return {
        type: UNSET_FAVORITE,
        post
    }
}

export function pinPost(post) {
    return function (dispatch) {
        return postUtils.pinPost(post)
            .then(post => dispatch(changePost(post)))
    }
}


export function updatePost(post) {
    return function () {
        return postUtils.updatePost(post)
    }
}

// export const CHANGE_POST = "CHANGE_POST";

export function changePost(post) {
    return {
        type: CHANGE_POST,
        post
    }
}

export function receivePost(post) {
    return {
        type: RECEIVE_POST,
        post
    }
}

export function receivePosts(payload) {
    return {
        type: RECEIVE_POSTS,
        payload
    }
}

export function createPost(post) {
    return function (dispatch) {
        return postUtils.createPost(post)
            .then(res => console.log(res))
    }
}

export function fetchInitialPosts(post) {
    return function (dispatch) {
        return postUtils.fetchInitialPosts(post).then(posts => { return dispatch(receivePosts(posts))})
    }
}

export const RECEIVE_COMMENT = "RECEIVE_COMMENT"


export function receiveComment(comment) {
    return {
        type: RECEIVE_COMMENT,
        comment
    }
}

export function addComment(comment) {
    return function (dispatch) {
        return postUtils.addComment(comment)
    }
}

export function receiveMorePosts(payload, channelId) {
    return {
        type: RECEIVE_MORE_POSTS,
        channelId,
        payload
    }
}

export const RECEIVE_LIKE = "RECEIVE_LIKE"
function receiveLike(like){
    return {
        type: RECEIVE_LIKE,
        like
    }
}


export const RESET_NOTIFICATION = "RESET_NOTIFICATION"
export function resetNotification(channel){
    return {
        type: RESET_NOTIFICATION,
        channel
    }
}

export function clearNotifications(channel){
    return (dispatch) => {
        dispatch(resetNotification(channel))
        postUtils.clearNotifications(channel)
    }
}

export function addLike(post){
    return (dispatch) => {
        postUtils.likePost(post)
        .then( (like) => {
            dispatch( receiveLike(like) )
        } )
    }
}

export function recievePostsBefore(lastPostId, channelId) {
    return function (dispatch, getState) {
        if (!getState().entities.postsLoaded[channelId]) {
            return postUtils.recievePostsBefore({
                channel_id: channelId,
                last_post_id: lastPostId
            }).then(payload => dispatch(receiveMorePosts(payload, channelId)))
        }
    }
}


window.createPost = createPost;
window.fetchInitialPosts = fetchInitialPosts;