import React from 'react';
import {connect} from 'react-redux';

function UserList({ users, includedIds, excludedIds, onSelect}){
    // debugger
    return (
        <ul className="users-list">
            {
                includedIds ?
                includedIds.map( user_id => 
                 <li className="chat-list-child" key={user_id} onClick={() => onSelect(user_id)}>
                    <img src={users[user_id].profileImage} alt=""/>
                    <span>{users[user_id].username}</span>
                </li>) : Object.keys(users).map( user_id => !excludedIds.includes(user_id) &&
                 <li className="chat-list-child" key={user_id} onClick={() => onSelect(user_id)} >
                    <img src={users[user_id].profileImage} alt=""/>
                    <span>{users[user_id].username}</span>
                </li>)
            }
        </ul>
    )
}

function mapStateToProps(state){
    return {
        users: Object.assign(state.entities.users)
    }
}


export default connect(mapStateToProps)(UserList)