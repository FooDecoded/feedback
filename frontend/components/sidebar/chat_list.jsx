import React from 'react'
import Modal from '../ui/modal'
import {Link} from 'react-router-dom'
export default class ChatList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            channelsCount: Object.keys(this.props.chatChannels.messages).length
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal})
    }

    handleClick(id){
        return () => {
            // if
            if (this.props.chatChannels.receivers_id[id]){
                // this.props.showChatChannel(this.props.chatChannels.receivers_id[id])
                this.props.history.push(`/workspaces/${this.props.currentWorkspace.id}/chats/${this.props.chatChannels.receivers_id[id]}`)
                this.setState({showModal: false})
            }
            this.props.createChat(
                {
                    receiver_id: id,
                    workspace_id: this.props.currentWorkspace.id
                }
            )
        }
    }
    // Need to do something for newly created chat channels cuz this does't cover that
    componentDidMount(){
        Object.keys(this.props.chatChannels.messages).forEach( (channel_id) => {
            App.cable.subscriptions.create({ channel: "ChatChannel", channel_id }, 
            { received: (message) => {
                this.props.receiveMessage(message)
            } })
            } )

        App.cable.subscriptions.create({ channel: "PresenceChannel", user_id: this.props.currentUser.id },
            {
                received: (user) => {
                    this.props.preseneChange(user)
                }
            })
    }
    shouldComponentUpdate(nextProps) {
        // && Object.keys(nextProps.chatChannels.messages).length != Object.keys(this.props.chatChannels.messages).length
        // debugger
        const channelIds = Object.keys(nextProps.chatChannels.messages)
        if (channelIds.length != +this.state.channelsCount) {
            const channelId = channelIds[channelIds.length - 1]
            App.cable.subscriptions.create({ channel: "ChatChannel", channel_id: channelId },
                {
                    received: (message) => {
                        this.props.receiveMessage(message)
                    }
                })
            this.setState({ channelsCount: channelIds.length })
        }
        return true
    }


    render(){
        let { users, chatChannels, currentWorkspace, currentUser} = this.props;
        return(
            <section className="sidebar__dms-list">
                
                <div className="sidebar__dms-header">
                    <h4>Direct Messages</h4>
                    <i onClick={this.toggleModal} className="fa fa-plus-square-o transition-green-hover" aria-hidden="true"></i>
                </div>



                <ul className="sidebar__dms-list">
                    {
                        Object.keys(chatChannels.receivers_id).map( (userIdx) => { 
                            let chatChannelId = chatChannels.receivers_id[userIdx];
                            return <li key={userIdx}  
                                       
                                        className={`sidebar__channels-list-item`}
                                    >
                                    {
                                        
                                        users[userIdx].online ?
                                        <i className="fa fa-circle status-icon status-icon-online" aria-hidden="true"></i>
                                        : <i className="fa fa-circle-thin status-icon transition-green-hover" aria-hidden="true"> </i>
                                    }
                                <Link to={`/workspaces/${currentWorkspace.id}/chats/${chatChannelId}`}><span className="username-text">{users[userIdx].username}</span></Link>
                                    </li> } 
                        )
                    }
                </ul>



                <Modal toggleModal={this.toggleModal} showModal={this.state.showModal} headerText="Open New Chat">
                    <ul >
                        {
                            Object.keys(users).filter(user_id => !(user_id == currentUser.id || Object.values(chatChannels.receivers_id).includes(user_id) ) )
                                .map(userId => 
                                    <li className="chat-list-child" key={userId} onClick={this.handleClick(userId)}>
                                        <img src={users[userId].profileImage} alt="" className="small-avatar threads-list__avatar" /> {users[userId].username}
                                </li> )
                        }
                    </ul>
                </Modal>

            </section>
            )    
    }

}

