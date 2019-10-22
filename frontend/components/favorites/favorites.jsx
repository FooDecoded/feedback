import React from 'react';
import {connect} from 'react-redux'
import { favoritePost } from '../../actions/posts_actions'
import Pagination from '../ui/pagination'

function Favorites({ favoritePosts, favoritePost, users}){
    return (
        <section>
            <h4>Favorite Posts</h4>
            <Pagination items={favoritePosts} users={users} />
        </section>
    )
}

function mapStateToProps(state){
    // debugger
    return {
        favoritePosts: Object.values(state.entities.favorites.posts),
        users: state.entities.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        favoritePost: (post) => dispatch(favoritePost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);