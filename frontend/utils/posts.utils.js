export function pinPost(post){
  return $.ajax({
    method: "post",
    url: `/api/posts/${post.id}/pin_post`
  })
}

export function fetchInitialPosts(){
    return $.ajax({
      method: "get",
      url: "/api/posts"
    })
  }

export function favoritePost(post){
  return $.ajax({
    method: "post",
    url: `/api/posts/${post.id}/favorite_post`
  })
}

  // Not tested yet
  export function updatePost(post){
    // debugger
    return $.ajax({
      method: "patch",
      url: `/api/posts/${post.post_id}`,
      data: {
        post : {
          body: post.body
        }
      }
    })
  }
// Not tested yet
  export function destroyPost(post){
    return $.ajax({
      method: "delete",
      url: `/api/posts/${post.postId}`,
      data: {
        post: {
            body: post.body,
            channel_id: post.channelId
        }
      }
    })
  }
  // Action Cable
  export function subscribeToPostChannel(){

  }

  export function handleChannelUpdates(){

  }
  export function createPost(post){
    return $.ajax({
      method: "post",
      url: "/api/posts",
      data: {
        post
      }
    })
  }

//   // Need to work with actioncable
  export function likePost(post){
    return $.ajax({
        method: "post",
        url: `/api/posts/${post.postId}/add_like`
      })
  }

  export function addComment(post){
        return $.ajax({
            method: "post",
            url: `/api/posts/${post.post_id}/add_comment`,
            data: {
              post
            }
          })
  }

export function recievePostsBefore(post){
  return $.ajax({
    method: "get",
    url: "/api/more_posts",
    data: {
      post
    }
  })
}

export function clearNotifications(post){
  return $.ajax({
    method: "post",
    url: "/api/clear_notifications",
    data: {
      post
    }
  })
}

export function fetchFilteredPosts(filters){
  // debugger
  return $.ajax({
    method: "get",
    url: "/api/filtered_posts",
    data: {
      filters
    }
  })
}

window.fetchFilteredPosts = fetchFilteredPosts
        // App.post.post(comment)        

  // //   {/api/posts/:post_id/add_comment
// //     body: post.body,
// //     post_id: post.postId
// // }

// console.log("asasa")
// window.addComment = addComment;
// window.likePost = likePost;
// window.destroyPost = destroyPost;
// window.updatePost = updatePost;
// window.fetchInitialPosts = fetchInitialPosts;
// window.createPost = createPost;