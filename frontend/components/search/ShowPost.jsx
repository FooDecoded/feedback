import React from 'react'

export default function showPost({post, users, comments}){
    // debugger
        return (
            <div className="showPost">
            <li className="threads-list__item" key={post.id} >
                <img src={users[post["author_id"]].profileImage} alt="" className="small-avatar threads-list__avatar"/>                                    
                <div className="thread-info">
                    <h5 className="thread-info__owner">{users[post["author_id"]].username}</h5>
                    <p className="thread-info__body">{post.body}</p>
                </div>
            </li>
            Comments
            <ul>                      
                {
                    comments && comments.map( comment => 
                        <li className="threads-list__item" key={comment.id}>
                            <img src={users[comment.author_id].profileImage} alt="" className="small-avatar threads-list__avatar"/>
                            <div className="thread-info highligtended"> 
                                <h5 className="thread-info__owner">{users[comment.author_id].username}</h5>
                                <p className="thread-info__body">{comment.body}</p>
                            </div>
                        </li>  
                        )
                }
            </ul>
        </div>
        )
}


