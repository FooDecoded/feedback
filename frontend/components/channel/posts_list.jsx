import React from 'react';
import {connect} from 'react-redux'
import { recievePostsBefore, updatePost, pinPost, favoritePost, addComment, addLike } from '../../actions/posts_actions'
import PostListItem from './post_list_item'
import throttle from '../../utils/throttle'
import { withRouter } from 'react-router-dom';

class PostsList extends React.Component {
    constructor(props){
        super(props);
        this.fetchMoreOnScroll = this.fetchMoreOnScroll.bind(this);
        this.fetchMoreOnScroll = throttle(this.fetchMoreOnScroll, 500)
        this.state = {
            scrollHeight: 0
        }
    }
    
    componentDidMount(){
        this.props.resetChannelCount(this.props.match.params.channelId)
        this.refs.ul.scrollTop = this.refs.ul.scrollHeight; 
        this.setState({ scrollHeight: this.refs.ul.scrollHeight})
        let { posts, recievePostsBefore} = this.props;
        let lastPostId = posts.length === 0 ? 0 : posts[0].id
        recievePostsBefore(lastPostId, this.props.match.params.channelId)
    }

    componentDidUpdate(prevState){
        if(prevState.posts.length != this.props.posts.length){
            this.props.resetChannelCount(this.props.match.params.channelId)
        }

        this.fetchMoreOnScroll();
    }

    fetchMoreOnScroll(){
        let { posts, recievePostsBefore} = this.props;
        let lastPostId = posts.length === 0 ? 0 : posts[0].id

        if (this.refs.ul.scrollTop < 5){
            recievePostsBefore(lastPostId, this.props.match.params.channelId)
        }
    }

    render(){
        let {updatePost, addComment, channelId, 
            favoritedPosts, favoritePost, currentUserId, 
            pinPost, posts, users, changeCurrentPost, postsLoaded, 
            comments, addLike, likes} = this.props
            
    return (
        <ul ref="ul" className="threads-list" onScroll={this.fetchMoreOnScroll}>
            {!postsLoaded[channelId] && <div className="center-loader"><div className="loader"/></div>}
        {   
            posts.map( post => {
                return <PostListItem 
                            key={post.id} 
                            favoritedPosts={favoritedPosts} 
                            currentUserId={currentUserId} 
                            favoritePost={favoritePost} 
                            pinPost={pinPost} 
                            updatePost={updatePost} 
                            users={users} 
                            changeCurrentPost={changeCurrentPost} 
                            currentUserId={currentUserId} 
                            post={post}
                            comments={comments}
                            addComment={addComment}
                            addLike={addLike}
                            likes={likes}
                        />
            })
        }
    </ul>
    )
}
}

function mapDispatchToProps(dispatch){
    return {
        recievePostsBefore: (time, lastPostId) => dispatch(recievePostsBefore(time, lastPostId)),
        updatePost: (post) => dispatch(updatePost(post)), // Moved to Item
        pinPost: (post) => dispatch(pinPost(post)), // Moved to Item
        favoritePost: (post) => dispatch(favoritePost(post)) ,// Moved to Item
        addComment: (comment) => { dispatch(addComment(comment)) },
        addLike: (like) => {dispatch(addLike(like))}
    }
}

function mapStateToProps(state, ownProps){
    return {
        postsLoaded: state.entities.postsLoaded,  
        currentUserId: state.session.id,   // Moved to Item
        favoritedPosts: state.entities.favorites.posts, // Moved to Item
        posts: state.entities.posts[ownProps.match.params.channelId],
        channelId: ownProps.match.params.channelId,
        users: state.entities.users,  // Moved to Item,
        comments: state.entities.comments,
        likes: state.entities.likes 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList))