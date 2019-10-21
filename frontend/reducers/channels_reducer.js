import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, USER_ADDED } from '../actions/channels_actions'

function channelsReducer(state = { }, action) {
    let newState = {...state}

    switch (action.type) {
        case RECEIVE_CHANNELS:
            // we can rely only on getting the posts with there keys
            // debugger
            return { ...action.channels }
            break;
            
        case RECEIVE_CHANNEL:
            newState[action.channel.id] = action.channel;
            return newState

        case USER_ADDED:
                // debugger
            if (action.payload.deleted){
                newState[action.payload.channelId].members = newState[action.payload.channelId].members.filter((memberId) => memberId != action.payload.userId )
                return newState;
            } else {
                newState[action.payload.channelId].members.push(action.payload.userId) 
                return newState;
            }

            
                break;

        default:
            return state
            break;
    }    
}
export default channelsReducer