import React from 'react'
import { connect } from 'react-redux';
import { sendMessage } from '../../actions/messages_actions'
import MessageList from './MessageList'
import PostForm from './post_form'

function ChatView({ chatList, users, sendMessage, channelId}){
    return (
        <div className="channel_container">
            <section className="channel__threads-list">
                {/* <section className="channel__header">
                    <h4>Chat Preview</h4>
                </section> */}
                <MessageList users={users} chatList={chatList} />
                <PostForm action={sendMessage} keyName="chat_channel_id" id={channelId} />
            </section>
    </div>)
}

function mdp(dispatch) {
    return {
        sendMessage: (message) => dispatch(sendMessage(message))
    }
}

function msp(state, ownProps) {
    return {
        channelId: ownProps.match.params.channelId,
        chatList: state.entities.chatChannels.messages[ownProps.match.params.channelId],
        users: state.entities.users
    }
}


export default connect(msp, mdp)(ChatView)