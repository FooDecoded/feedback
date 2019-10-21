import React from 'react';
import {connect} from 'react-redux';
import WorkspaceShow from './workspace_show'
import { fetchSubscribedChannels } from '../../actions/channels_actions';
import { fetchInitialPosts, createPost, receivePost, addComment, receiveComment } from '../../actions/posts_actions'
import { fetchAllMessages, receiveMessage, sendMessage } from '../../actions/messages_actions'
import { setActiveWorkspace, fetchSubscribedUsers, fetchFavorites } from '../../actions/workspace_actions'
import {withRouter} from 'react-router-dom'
import { addChannel } from '../../actions/channels_actions'

function postsSelector(posts){
    for(let key in posts){
        posts[key] = Object.values(posts[key])
    }
    return posts;
}

function mapStateToProps(state, ownProps){
    return {
        channels: Object.values(state.entities.channels),
        posts: postsSelector(state.entities.posts),
        users: state.entities.users,
        chatChannels: state.entities.chatChannels,
        currentWorkspaceId: state.entities.workspaces.currentWorkspace,
        currentWorkspace: state.entities.workspaces.list[ownProps.match.params.workspaceId],
        currentUserId: state.session.id,
        comments: state.entities.comments,
        isAdmin: true,
        currentWorkspaceId: state.entities.workspaces.currentWorkspace,
        loaded: state.ui.loadingStage === 0
        // channelId: ownProps.match.channelId
    }
}

function mapDispatchToProps(dispatch, ownProps){
    // dispatch(setActiveWorkspace())
    // debugger
    return {        fetchAllChatsss: () => 
        {
        dispatch(fetchAllMessages(ownProps.match.params.workspaceId))},
        fetchSubscribedChannels: () => dispatch(fetchSubscribedChannels(ownProps.match.params.workspaceId)),
        fetchInitialPosts: () => 
        {
            dispatch(fetchInitialPosts(ownProps.match.params.workspaceId))},
        fetchAllChats: () => function(){
            dispatch(fetchAllMessages())
        
        }, // workspace nto being taken care of
        fetchSubscribedUsers: (workspaceId) => dispatch(fetchSubscribedUsers(workspaceId)),
        createPost: (post) => dispatch(createPost(post)),
        receivePost: (post) => dispatch(receivePost(post)),
        setActiveWorkspace: (workspaceId) => dispatch( setActiveWorkspace(workspaceId) ),
        addComment: (comment) => { dispatch(addComment(comment)) },
        receiveComment: (comment) => dispatch(receiveComment(comment)),
        receiveMessage: (message) => dispatch(receiveMessage(message)),
        sendMessage: (message) => dispatch(sendMessage(message)),
        addChannel: (channel) => dispatch(addChannel(channel)),
        fetchFavorites: (workspace) => dispatch(fetchFavorites(workspace))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspaceShow))