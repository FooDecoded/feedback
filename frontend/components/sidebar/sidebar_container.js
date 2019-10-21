import { connect } from 'react-redux'
import Sidebar from './sidebar'
import { addChannel } from '../../actions/channels_actions'
import { receiveMessage, createChat } from '../../actions/messages_actions'
import {withRouter} from 'react-router-dom'
import { logout } from '../../actions/session_actions'
import { preseneChange } from '../../actions/workspace_actions'
import { receiveComment, changePost, receivePost } from '../../actions/posts_actions'

function mapStateToProps(state, ownProps){
    return {
        channelList: Object.values(state.entities.channels),
        chatChannels: state.entities.chatChannels,
        currentWorkspace: state.entities.workspaces.list[state.entities.workspaces.currentWorkspace],
        users: state.entities.users,
        currentUser: state.entities.users[state.session.id],
        isAdmin: state.entities.users[state.session.id].admin,
        notifications: state.entities.notifications
    }
}

function mapDispatchToProps(dispatch){
    return {
        receiveMessage: (message) => dispatch(receiveMessage(message)),
        addChannel: (channel) => dispatch(addChannel(channel)),
        logout: () => dispatch(logout()),
        preseneChange: (user) => dispatch(preseneChange(user)),
        createChat: (chatInfo) => dispatch(createChat(chatInfo)),
        receiveComment: (comment) => dispatch(receiveComment(comment)),
        receivePost: (post) => dispatch(receivePost(post)),
        changePost: (post) => dispatch(changePost(post))

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))