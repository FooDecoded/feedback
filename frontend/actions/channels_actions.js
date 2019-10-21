import * as channelUtils from '../utils/channel_api_util';

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";

export function receiveChannels(channels){
    return {
        type: RECEIVE_CHANNELS,
        channels
    }
}

export function receiveChannel(channel){
    return {
        type: RECEIVE_CHANNEL,
        channel
    }
}

export function fetchSubscribedChannels(info){
    return function(dispatch) {
        return channelUtils.fetchSubscribedChannels(info)
        .then( channels => dispatch(receiveChannels(channels)) )
    }
}

export function addChannel(channel){
    return function(dispatch){
        return channelUtils.addChannel(channel)
        .then( channel => dispatch(receiveChannel(channel)) )
    }
}

export const USER_ADDED = "USER_ADDED"

export function userAdded(payload){
    return {
        type: USER_ADDED,
        payload
    }
}

export function addUserToChannel(channel){
    return function(dispatch){
        return channelUtils.addUserToChannel(channel)
        .then( payload => dispatch(userAdded(payload)) )
    }
}

// window.fetchSubscribedChannels = fetchSubscribedChannels