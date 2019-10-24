import React from 'react'
import Modal from '../ui/modal'
import CommentsBar from './comments_bar';

export default class PostListItem extends React.Component {
    constructor(props){''
        super(props);
        this.state = {
            showEdit: false,
            isOwner: false,
            liked: false,
            body: "",
            showComments: false
        }
        this.changeBody = this.changeBody.bind(this)
        this.toggleForm = this.toggleForm.bind(this)
        this.updatePost = this.updatePost.bind(this)
        this.toggleComments = this.toggleComments.bind(this)
    }

    changeBody(e){
        this.setState({body: e.target.value})
    }

    toggleForm(e){
        e.stopPropagation()
        this.setState({showEdit: !this.state.showEdit})
    }

    updatePost(){
        return this.props.updatePost({
            body: this.state.body,
            post_id: this.props.post.id
        }).then(() => this.setState({ showEdit: false}) )
    }


    componentDidMount(){
        this.setState({body: this.props.post.body})
    }

    toggleComments(){
        this.setState({showComments: !this.state.showComments})
    }

    render(){
        let {addLike, addComment,  post, users, updatePost, pinPost, favoritePost, currentUserId, favoritedPosts, comments, likes} = this.props
        let {showEdit} = this.state
        let likeJSX = ""

        if(!likes[post.id] || likes[post.id].length == 0){
            likeJSX = <i onClick={ () => addLike({postId: post.id}) } className="fa fa-thumbs-up" aria-hidden="true"></i>
        } else {
            likeJSX = likes[post.id].includes(post.id) ? <i onClick={ () => addLike({postId: post.id}) } className="fa fa-thumbs-up" aria-hidden="true">{likes[post.id].length}</i>
            : <i onClick={ () => addLike({postId: post.id}) } className="fa fa-thumbs-up liked" aria-hidden="true">{likes[post.id].length}</i>
        }
        // <i onClick={ () => addLike({postId: post.id}) } className="fa fa-thumbs-up" aria-hidden="true"></i>
        let postJSX = (<li className="threads-list__item" key={post.id} >
                        <img src={users[post["author_id"]].profileImage} alt="" className="small-avatar threads-list__avatar"/>                                    
                            <div className="thread-info">
                                <h5 className="thread-info__owner">{users[post["author_id"]].username}</h5>
                                <p className="thread-info__body">{post.body}</p>
                                {
                                    comments[post.id] ? <span onClick={this.toggleComments}>{comments[post.id].length} Comments</span> : <span onClick={this.toggleComments}>add Comment</span>
                                }
                                <div className="post-utils">
                                    {/* <button onClick={this.toggleForm}>Edit Post</button> */}
                                    { 
                                        currentUserId == post.author_id && <i onClick={this.toggleForm} className="fa fa-pencil" aria-hidden="true"></i>
                                    }
                                        <i onClick={() => pinPost({ id: post.id })} className={`fa fa-thumb-tack ${ post.pinned ? "pinned" : null } `} aria-hidden="true"></i>
                                    {/* <button >Pin Post</button> */}
                                    {/* <button onClick={() => favoritePost({ id: post.id })}>Favorite Post</button> */}
                                    {
                                        favoritedPosts[post.id] ?
                                            <i onClick={() => favoritePost({ id: post.id })} className="fa fa-star favorited" aria-hidden="true"></i>
                                        : <i onClick={() => favoritePost({ id: post.id })} className="fa fa-star-o" aria-hidden="true"></i>
                                    } 
                                    {likeJSX}
                                </div>
                                <Modal toggleModal={this.toggleComments} showModal={this.state.showComments} headerText="Comments">
                                    <CommentsBar 
                                        addComment={addComment}
                                        currentPost={post} 
                                        users={users} 
                                        comments={ comments[post.id] || [] } 
                                    />
                                </Modal>
                            </div>
                        </li>)
        
        let editJSX = (
            <form className="edit-form">
                <img src={users[post["author_id"]].profileImage} alt="" className="small-avatar threads-list__avatar"/>                                    
                <div>
                    <input className="edit-form__text" onChange={this.changeBody} type="text" value={this.state.body}/>
                    <input className="submit" onClick={this.toggleForm} type="button" value="Cancel"/>
                    <input className="submit submit-cancel" onClick={this.updatePost} type="button" value="Save"/>
                </div>
            </form>
        ) 

        return showEdit ? editJSX : postJSX
    }
}

// showCommentBar && 
