import React from 'react'

export default function MessageList({ chatList, users }){
    return(
        <ul className="threads-list">
        {chatList.map(message =>
            <li className="threads-list__item" key={message.id} >
                <img src={users[message["author_id"]].profileImage} alt="" className="small-avatar threads-list__avatar" />
                <div className="thread-info">
                    <h5 className="thread-info__owner">{users[message["author_id"]].username}</h5>
                    <p className="thread-info__body">{message.body}</p>
                </div>
        </li>)}
        </ul>
    )
}