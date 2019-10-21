import React from 'react'

export default function CommentsBar({currentPost, users, comments, addComment}){
    return(
    <section>
        <ul>                      
            {
                comments.map( comment => 
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

        <form className="message-form" action="" 
            onSubmit={ (e) => {  
                e.preventDefault();
                addComment({ body: e.target.children.comment_body.value, post_id: currentPost.id })
            } }>
            
            <input className="streched-input" name="comment_body" type="text"/>
        </form>
    </section>
    )
}