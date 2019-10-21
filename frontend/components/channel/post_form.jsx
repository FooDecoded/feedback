import React from 'react';


export default class PostForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            body: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({body: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        // if(!this.props.showChat){
        //     let post = {
        //         body: this.state.body,
        //         channel_id: this.props.channelId
        //     }
        //     this.props.createPost(post)
        // } else {
        //     let message = {
        //         body: this.state.body,
        //         chat_channel_id: this.props.channelId
        //     } 
        //     this.props.sendMessage(message)
        // }
        this.props.action(
            {
                body: this.state.body,
                [this.props.keyName]: this.props.id
            }
        )
    }


    render(){
        return (
        <form className="message-form" action="" onSubmit={this.handleSubmit}>
            <input 
            onChange={this.handleChange}
                    className="streched-input effect-20" placeholder="Message" name="jojo" value={this.state.body} type="text"/>
        </form>)
    }
}