import React from 'react';
import {connect} from 'react-redux'
import Pagination from '../ui/pagination'
import ShowPost from '../search/ShowPost'
import { withRouter } from 'react-router-dom';

class Pinned extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPost: null,
            currentPost: null
        }
        this.changeShowedPost = this.changeShowedPost.bind(this);
    }

    changeShowedPost(post){
        this.setState({showPost: post.id, currentPost: post})
    }

    render (){
        let { pinnedPosts, users, comments} = this.props
        // debugger
        return (
            <section >
                <h4>Pinned Posts</h4>
                <div className="flex-half">
                    <Pagination items={pinnedPosts} users={users} changeShowedPost={this.changeShowedPost} />
                    {this.state.showPost && <ShowPost post={this.state.currentPost} comments={comments[this.state.showPost]} users={users}  />}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    // debugger
    return {
        pinnedPosts: state.entities.posts[ownProps.match.params.channelId].filter( post => post.pinned ),
        users: state.entities.users,
        comments: state.entities.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        favoritePost: (post) => dispatch(favoritePost(post))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pinned));