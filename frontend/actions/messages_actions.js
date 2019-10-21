import * as messagesAPIUtils from '../utils/messages.util'

export const RECEIVE_INITIAL_MESSAGES = "RECEIVE_INITIAL_MESSAGES"
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"
export const RECEIVE_CHAT = "RECEIVE_CHAT"

export function receiveChat(chat){
    return {
        type: RECEIVE_CHAT,
        chat
    }
}

export function createChat(message){
    return (dispatch) => {
        return messagesAPIUtils.createChat(message)
        .then( (chat) => dispatch(receiveChat(chat)) )
    }
}

export function receiveInitialMessages(payload){
    return {
        type: RECEIVE_INITIAL_MESSAGES,
        payload
    }
}

export function fetchAllMessages(workspaceId){
    return function(dispatch){
        return messagesAPIUtils.fetchAllMessages({ workspace_id: workspaceId})
        .then( messages => dispatch(receiveInitialMessages(messages)) )
    }
}

export function receiveMessage(message){
    return {
        type: RECEIVE_MESSAGE,
        message
    }
}

export function sendMessage(message){
    return function(dispatch){
        messagesAPIUtils.sendMessage(message)
    }
}

// export function fetchInitialPosts(post){
//     return function(dispatch){
//         return postUtils.fetchInitialPosts(post)
//         .then( posts => dispatch( receivePosts(posts) ) )
//     }
// }

// window.fetchAllMessages = fetchAllMessages