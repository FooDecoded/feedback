import React from 'react'
import ChannelHeader from './channel_header'
import PostForm from './post_form';
import PostsList from './posts_list';
import {connect} from 'react-redux';
import { createPost } from '../../actions/posts_actions'
import { resetChannelCount } from '../../actions/notifications_actions'

function ChannelView({ channelId, createPost, resetChannelCount}) {
    return (
    <div className="channel_container">
        <section className="channel__threads-list">
            <ChannelHeader/>
            <PostsList resetChannelCount={resetChannelCount}/>
            <PostForm action={createPost} keyName="channel_id" id={channelId} />
        </section>
    </div>)
}

function mdp(dispatch){
    return {
        createPost: (post) => dispatch(createPost(post)),
        resetChannelCount: (channelId) => dispatch(resetChannelCount(channelId))
    }
}

function msp(state, ownProps) {
    return {
        channelId: ownProps.match.params.channelId
    }
}


export default connect(msp, mdp)(ChannelView)