import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { addUserToChannel } from '../../actions/channels_actions'
class ChannelSettings extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const { users, currentMembersIds, nonMembersIds, addUserToChannel} = this.props
        return (
            <div>
                <h4>Members</h4>
                <ul>
                    
                    {
                        currentMembersIds.map(userId => <li key={userId} onClick={() => addUserToChannel(userId)}><img src={users[userId].profileImage} alt="" className="small-avatar threads-list__avatar" /> {users[userId].username}</li> )
                    }
                </ul>
                <h4>Non Members</h4>

                <ul>
                    {
                        nonMembersIds.map(userId => <li key={userId} onClick={() => addUserToChannel(userId)}><img src={users[userId].profileImage} alt="" className="small-avatar threads-list__avatar" />  {users[userId].username}</li>)
                    }                
                </ul>
            </div>
        )
    }
    
}

function mapDispatchToProps(dispatch, ownProps){

    return {
        addUserToChannel: (userId) => dispatch(addUserToChannel({ channel_id: ownProps.match.params.channelId, member_id: userId}))
    }
}

function mapStateToProps(state, ownProps){
    let ownerId = state.entities.channels[ownProps.match.params.channelId].ownerId
    let currentMembersIds = state.entities.channels[ownProps.match.params.channelId].members.filter( userId => userId != ownerId )
    return {
        currentMembersIds,
        nonMembersIds: Object.keys(state.entities.users).filter(userId => userId != ownerId && !currentMembersIds.includes(+userId) ),
        users: state.entities.users
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelSettings))