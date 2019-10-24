import React from 'react';
import {connect} from 'react-redux'
import { favoritePost } from '../../actions/posts_actions'
import Pagination from '../ui/pagination'
import ShowPost from '../search/ShowPost'
import { addComment } from '../../actions/posts_actions'

class Favorites extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPost: null
        }
        this.changeShowedPost = this.changeShowedPost.bind(this);
    }

    changeShowedPost(post){
        this.setState({showPost: post.id})
    }

    render (){
        let { favoritePosts, users, favoritePostsArray, comments, addComment} = this.props
        return (
            <section >
                <h4>Favorite Posts</h4>
                <div className="flex-half">
                    <Pagination items={favoritePostsArray} users={users} changeShowedPost={this.changeShowedPost} />
                    {this.state.showPost && <ShowPost post={favoritePosts[this.state.showPost]} addComment={addComment} comments={comments[this.state.showPost]} users={users}  />}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
        favoritePostsArray: Object.values(state.entities.favorites.posts),
        favoritePosts: state.entities.favorites.posts,
        users: state.entities.users,
        comments: state.entities.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        favoritePost: (post) => dispatch(favoritePost(post)),
        addComment: (comment) => { dispatch(addComment(comment)) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);