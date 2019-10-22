import React from 'react'
import { fetchFilteredPosts } from '../../utils/posts.utils'
import {connect} from 'react-redux'
import Pagination from '../ui/pagination'

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            source: "channels",
            text_like: "",
            created_before: null,
            created_after: null,
            created_by: undefined,
            source_channel: undefined,
            result: []
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    toggleModal(){
        return () => {
            this.setState({showModal: false})
        }
    }

    handleInput(source){
        return (e) => {
            this.setState({ [source]: e.target.value})
        }
    }

    handleSubmit(e){
        // console.log('innnnnnnnnnnnnnnnn')
        e.preventDefault();
        fetchFilteredPosts({
            source: this.state.source,
            text_like: this.state.text_like,
            created_before: this.state.created_before,
            created_after: this.state.created_after,
            created_by: this.state.created_by,
            source_channel: this.state.source_channel,
            workspace_id: this.props.workspaceId
        })
        .then( (posts) => { 
            // debugger
            posts = posts || []  
            this.setState({result: posts})} )
    }

    render(){
        let {channels, users} = this.props;
        let { source, text_like, created_after, created_before, created_by, source_channel, result} = this.state;
        // debugger
        return(
            <div>
                <form className="search-form"  onSubmit={this.handleSubmit}>
                    <input 
                        className="search-form__text"
                        className="input"
                        type="text" 
                        placeholder="type in something" 
                        onChange={this.handleInput("text_like")} 
                        value={text_like} />
                    <div className="search-form__source">
                        <label class="radio">
                            <input type="radio" name="source" value="channels" checked={source === "channels"} onChange={this.handleInput("source")}/>
                            <span>Channels</span>
                        </label>
                        <label class="radio">
                            <input type="radio" name="source" value="chats" checked={source === "chats"} onChange={this.handleInput("source")}/>
                            <span>Chats</span>
                        </label>
                    </div>

                    <label className="search-select-filters">
                        Source Channel
                        <select   disabled={this.state.source == "chats"} value={source_channel} onChange={this.handleInput("source_channel")}>
                            {
                                channels.map(channel => <option key={channel.id} value={channel.id}>{channel.name}</option>)
                            }
                        </select>
                    </label>
                    <label className="search-select-filters">
                        Created By
                        <select   value={created_by} onChange={this.handleInput("created_by")}>
                            {
                                Object.values(users).map(user => <option key={user.id} value={user.id}>{user.username}</option> )
                            }
                        </select>
                    </label>
                    <input 
                        className="submit"
                        type="submit" value="Search"  />
                </form>
                <Pagination items={result} users={users}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.entities.users,
        channels: Object.values(state.entities.channels)
    }
}

export default connect(mapStateToProps)(Search)