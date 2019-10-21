import React from 'react';
import {connect} from 'react-redux'
import { favoritePost } from '../../actions/posts_actions'

function Favorites({ favoritePosts, favoriteMessages, favoritePost}){
    return (
        <section>
            <h4>Favorite Posts</h4>
            <ul>
                
                {
                    favoritePosts.map(post => <li onClick={() => favoritePost({id: post.id}) } key={post.id}>{post.body}</li> )
                }
            </ul>
            <h4>Favorite Messages</h4>
            <ul>
                {
                    favoriteMessages.map(message => <li key={message.id}>{message.body}</li>)
                }            
            </ul>
        </section>
    )
}

function mapStateToProps(state){
    // debugger
    return {
        favoritePosts: Object.values(state.entities.favorites.posts),
        favoriteMessages: Object.values(state.entities.favorites.messages)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        favoritePost: (post) => dispatch(favoritePost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);