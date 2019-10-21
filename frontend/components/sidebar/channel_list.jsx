import React from 'react'
import Modal from '../ui/modal'
import {Link} from 'react-router-dom'

export default class ChannelList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            channelName: "",
            public: false,
            channelsCount: this.props.channelList.length
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal})
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.addChannel({name: this.state.channelName, workspace_id: this.props.currentWorkspace.id, public: this.state.public})
        .then( () => this.toggleModal() )
    }

    handleInput(type){
        return (e) => {
            this.setState({ [type]: e.target.value })
        }
    }
    
    componentDidMount(){
        this.props.channelList.forEach( (channel) => {
            App.cable.subscriptions.create({ channel: "PostChannel", channel_id: channel.id }, 
            { received: (payload) => {
                if(payload.type === "comment"){
                    this.props.receiveComment(payload.comment)
                } else if(payload.type === "post"){
                    if(payload.update){
                        this.props.changePost(payload.post)
                    } else {
                        this.props.receivePost(payload.post)
                    }
                }
            } })
        } )
    }

    shouldComponentUpdate(nextProps){
        if (+nextProps.channelList.length != +this.state.channelsCount && nextProps.channelList.length != this.props.channelList.length){
            let channel = nextProps.channelList[nextProps.channelList.length - 1]
            App.cable.subscriptions.create({ channel: "PostChannel", channel_id: channel.id },
                {
                    received: (payload) => {
                        if (payload.type === "comment") {
                            this.props.receiveComment(payload.comment)
                        } else if (payload.type === "post") {
                            if (payload.update) {
                                this.props.changePost(payload.post)
                            } else {
                                this.props.receivePost(payload.post)
                            }
                        }
                    }
                })
            this.setState({ channelsCount: this.props.channelList.length })
        }
        return true
    }

    render(){
        let { channelList, currentWorkspace, isAdmin, notifications} = this.props;

        return (
            <section className="sidebar__channels-list-container">
                <div className="sidebar__channels-header">
                    <h4>
                        Channels
                    </h4>
                    {
                        isAdmin ? <i onClick={this.toggleModal} className="fa fa-plus-square-o transition-green-hover" aria-hidden="true"></i> : null
                    }
                </div>
        
                <ul className="sidebar__channels-list">
                    {
                        channelList.map( (channel) => 
                            <li key={channel.id}  
                            className="sidebar__channels-list-item post-channel ">
                                {
                                    notifications[channel.id] > 0 && <span className="notification-count" key={"notification" + channel.id}>{notifications[channel.id]}</span>
                                }
                                <Link className="styless-link" to={`/workspaces/${currentWorkspace.id}/channels/${channel.id}`}>{channel.name}</Link>
                            </li> 
                            )
                    }
                </ul>
                <Modal toggleModal={this.toggleModal} showModal={this.state.showModal} headerText="Add Channel">
                    <form className="add-channel-form" onSubmit={this.handleSubmit}>
                        <div className="add-channel-form__upper-box">
                            <input className="add-channel-form__text-input" placeholder="Type in Channel Name" type="text" value={this.state.channelName} onChange={this.handleInput("channelName")}/>
                            <label>
                                Public <input className="add-channel-form__checked-input" placeholder="Public" type="checkbox" value={this.state.public} onChange={this.handleInput("public")} />
                            </label>
                        </div>
                        <input className="auth-form__submit" type="submit" value="Add Channel"/>
                    </form>
                </Modal>
            </section>
            )
    }

}