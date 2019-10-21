import usersReducer from './users_reducer'
import workspacesReducer from './workspaces_reducer'
import postsReducer from './posts_reducer'
import chatChannelsReducer from './chat_channels_reducer'
import channelsReducer from './channels_reducer'
import commentsReducer from './comments_reducer'
import favoritesReducer from './favorites_reducer'
import { combineReducers } from 'redux'
import postsLoadedReducer from './posts_loaded_reducer'
import notificationsReducer from './notifications_reducer'
import likesReducer from './likes_reducer'

const entitiesReducer = combineReducers({ 
    users: usersReducer,
    workspaces: workspacesReducer,
    comments: commentsReducer,
    chatChannels: chatChannelsReducer,
    posts: postsReducer,
    channels: channelsReducer,
    postsLoaded: postsLoadedReducer,
    favorites: favoritesReducer,
    // messages: messagesReducer,
    notifications: notificationsReducer,
    likes: likesReducer
})
export default entitiesReducer