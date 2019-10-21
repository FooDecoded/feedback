export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS"
export const RESET_CHANNEL_COUNT = "RESET_CHANNEL_COUNT"
export const INCREMENT_COUNT = "INCREMENT_COUNT"

export function setNotifications(notifications){
    return {
        type: SET_NOTIFICATIONS,
        notifications
    }
}    

export function resetChannelCount(channelId) {
    return {
        type: RESET_CHANNEL_COUNT,
        channelId
    }
}

export function incrementCount(notification) {
    return {
        type: INCREMENT_COUNT,
        notification
    }
}
