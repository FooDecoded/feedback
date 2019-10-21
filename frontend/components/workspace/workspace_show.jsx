import React from 'react';
import SidebarContainer from '../sidebar/sidebar_container'
import Loading from '../ui/loading'
import {Route, Link} from 'react-router-dom'
import ChannelView from '../channel/ChannelView'
import ChatView from '../channel/ChatView'

export default class WorkspaceShow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentChannel: 2,
            channelType: "post",
            showCommentBar: false,
            currentPost: null,
            showChat: false,
            loadingStage: 4,
        }
        this.changeCurrentChannel = this.changeCurrentChannel.bind(this);
        this.changeCurrentPost = this.changeCurrentPost.bind(this);
        this.showChatChannel = this.showChatChannel.bind(this);
    }

    fetchInitialData() {
        this.props.fetchSubscribedChannels()
        this.props.fetchSubscribedUsers(this.props.currentWorkspaceId)
        this.props.fetchInitialPosts()
        this.props.fetchAllChatsss()
        this.props.fetchFavorites(this.props.currentWorkspaceId)
    }

    componentDidMount(){
        let {currentWorkspaceId, match, history} = this.props;
        if(currentWorkspaceId){
            this.fetchInitialData()
        } else if(match.params.workspaceid){
            // Why not working
            this.props.setActiveWorkspace(match.params.workspaceId)
            this.fetchInitialData()
        } else {
            // debugger
            history.push('/workspaces')
        }
    }

    changeCurrentChannel(channelId, type){
        this.setState({currentChannel: channelId, type, showChat: false})
    }

    changeCurrentPost(post){
        this.setState({currentPost: post, showCommentBar: true})
    }

    showChatChannel(channelId){
        this.setState({ showCommentBar: false, 
            showChat: true, 
            currentChannel: channelId })
    }

    render(){
        let {loaded} = this.props;
        return (
            
            
            loaded ? 
            <div>
                <section className="workstation-container">
                    <SidebarContainer
                        changeCurrentChannel={this.changeCurrentChannel}
                        showChatChannel={this.showChatChannel}
                    />

                    <Route path="/workspaces/:workspaceId/channels/:channelId" component={ChannelView} />
                    <Route path="/workspaces/:workspaceId/chats/:channelId" component={ChatView}/>
                    {/* <ChannelContainer
                        changeCurrentPost={this.changeCurrentPost}  // Link 
                            currentPost={currentPost} // Link 
                            showCommentBar={showCommentBar}  // Link 
                            ChannelId={this.state.currentChannel} // Link 
                            channel={channels[0]} // Link 
                            showChat={showChat} // Link 
                            sendMessage={sendMessage} // Link 
                    /> */} 

                </section> 
            </div>:
                <Loading/>
        )
    }
}