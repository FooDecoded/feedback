import React from 'react';
import PostForm from './post_form';
import CommentsBar from './comments_bar';
import PostsList from './posts_list';



export default class Channel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showCommentBar: false        
        }
    }

    componentDidMount(){
        // this.props.channelList.forEach( (channel) => {
        //     App.cable.subscriptions.create({ channel: "PostChannel", channel_id: channel.id }, 
        //     { received: (payload) => {
        //         // debugger
        //         if(payload.type === "comment"){
        //             this.props.receiveComment(payload.comment)
        //             console.log("in comment cb")
        //         } else if(payload.type === "post"){
        //             if(payload.update){
        //                 this.props.changePost(payload.post)
        //             } else {
        //                 this.props.receivePost(payload.post)
        //                 console.log("new post")
        //             }

        //         }
        //     } })
        // } )

    }

    render(){
    
        // let {chatChannels, posts, showChat,ChannelId, users, channel, createPost, showCommentBar, currentPost, changeCurrentPost, comments, addComment, sendMessage} = this.props;
        // debugger
    return (
        <section className="channel">

            
            {/* <div className="channel_container">
                <section className="channel__threads-list">
                    <PostsList 
                        ChannelId={ChannelId} 
                        currentPost={currentPost} 
                        showChat={showChat} 
                        chatChannels={chatChannels} 
                        users={users} 
                        posts={posts[this.props.ChannelId]} 
                        changeCurrentPost={changeCurrentPost} // its gonna be done with link
                    />
                    
                    <PostForm 
                        createPost={createPost} 
                        channelId={ChannelId} 
                        sendMessage={sendMessage} 
                        showChat={showChat}
                    />
                </section>
                {
                    showCommentBar && <CommentsBar 
                        addComment={addComment}
                        currentPost={currentPost} 
                        users={users} 
                        comments={ comments[currentPost.id] || [] } 
                    />
                } */}
                
            {/* </div> */}
        </section>
    )}
}