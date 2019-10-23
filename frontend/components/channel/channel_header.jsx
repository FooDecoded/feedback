import React from 'react';
import Modal from '../ui/modal'
import UserList from '../users/user_list';
import {connect} from 'react-redux';
import { addUserToChannel } from '../../actions/channels_actions';
import Search from '../search/search'
import Favorites from '../favorites/favorites'
import Pagination from '../ui/pagination'
import { withRouter } from 'react-router-dom'
import ChannelSettings from './ChannelSettings'

class ChannelHeadrer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showSettings: false,
            showUsers: false,
            showInfo: false,
            showSearch: false,
            showFavorites: false,
            showPinnedPosts: false
        }
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle(type){
        return (e) => {
            this.setState({ [type]: !this.state[type] })
        }
    }

    render(){
        let { showSettings, showInfo, showUsers, showSearch, showFavorites, showPinnedPosts } = this.state;
        let { channel, posts, users, currentUserId, workspaceId} = this.props;
        // debugger
        return (
            
            <section className="channel__header">
                <div className="channel__stats">
                    <h4>{channel.name}</h4>
                    <i className="channel-widget fa fa-star-o" aria-hidden="true"
                        onClick={this.handleToggle("showFavorites")}
                    ></i>
                    <i className="channel-widget fa fa-users" aria-hidden="true"
                        onClick={this.handleToggle("showUsers")}
                    ></i>
                    <i className="channel-widget fa fa-thumb-tack" 
                        onClick={this.handleToggle("showPinnedPosts")}
                    aria-hidden="true"></i>
                    {
                        channel.ownerId == currentUserId && <i className="channel-widget fa fa-cog" aria-hidden="true"
                            onClick={this.handleToggle("showSettings")}
                        >
                        </i>
                    }
                    <i className="fa fa-search" aria-hidden="true"
                        onClick={this.handleToggle("showSearch")}
                    >
                    </i>
                </div>
                <Modal showModal={showFavorites} toggleModal={this.handleToggle("showFavorites")} headerText={"Favorites"}>
                    <Favorites/>
                </Modal>
                <Modal showModal={showUsers} toggleModal={this.handleToggle("showUsers")} headerText={"Channel User"}><UserList includedIds={channel.members}/></Modal>
                <Modal showModal={showSettings} toggleModal={this.handleToggle("showSettings")} headerText={"Channel Settings"}>
                    {/* <UserList excludedIds={channel.members} onSelect={ (member_id) => addUserToChannel({member_id, channel_id: channel.id}) }/> */}
                    <ChannelSettings/>
                </Modal>
                <Modal showModal={showSearch} toggleModal={this.handleToggle("showSearch")} headerText="Search For Stuff">
                    <Search workspaceId={workspaceId}/>
                </Modal>
                <Modal showModal={showPinnedPosts} toggleModal={this.handleToggle("showPinnedPosts")} headerText="Pinned Posts">
                    <Pagination items={posts.filter(post => post.pinned)} users={users} />
                </Modal>
            </section>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        addUserToChannel: (payload) => dispatch(addUserToChannel(payload))
    }
}

function mapStateToProps(state, ownProps){

    return {
        users: state.entities.users,
        posts: state.entities.posts[ownProps.match.params.channelId],
        channel: state.entities.channels[ownProps.match.params.channelId],
        currentUserId: state.session.id,
        workspaceId: state.entities.workspaces.currentWorkspace
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeadrer))