import { RECEIVE_INITIAL_MESSAGES, RECEIVE_MESSAGE, RECEIVE_CHAT } from '../actions/messages_actions'

function chatChannelsReducer(state = { messages: {}, receivers_id: { } }, action) {
    // let newState = Object.assign({}, state);
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_INITIAL_MESSAGES:
            // debugger
            return action.payload
            break;
        case RECEIVE_MESSAGE:
            // debugger
            let message = action.message
            message.chat_channel_id = action.message.chatChannelId
            message.author_id = action.message.authorId
            newState.messages[action.message.chatChannelId].push(action.message);
            return newState;
            break;

        case RECEIVE_CHAT:
            // debugger
            newState.messages[action.chat.id] = [];
            newState.receivers_id[action.chat.secondMemberId] = action.chat.id
            return newState;
        default:
            break;
    }
    return state
}
export default chatChannelsReducer