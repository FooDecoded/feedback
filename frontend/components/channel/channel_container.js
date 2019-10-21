import {connect} from 'react-redux'
import Channel from './channel'
import {receiveComment, addComment, createPost, receivePost, changePost } from '../../actions/posts_actions'

function postsSelector(posts){
    for(let key in posts){
        posts[key] = Object.values(posts[key])
    }
    return posts;
}


function mapStateToProps(state){
    return {
        comments: state.entities.comments,
        channelList: Object.values(state.entities.channels),
        users: state.entities.users,
        posts: postsSelector(state.entities.posts),
        chatChannels: state.entities.chatChannels
    }
}

function mapDispatchToProps(dispatch){
    return {
        receiveComment: (comment) => dispatch(receiveComment(comment)),
        addComment: (comment) => { dispatch(addComment(comment)) },
        createPost: (post) => dispatch(createPost(post)),
        receivePost: (post) => dispatch(receivePost(post)),
        changePost: (post) => dispatch(changePost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel)