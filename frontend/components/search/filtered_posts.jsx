// import React from 'react'

// export default function FilteredPosts({posts, users}){
//     return 
// }

// // export default class FilteredPosts extends React.Component {
// //     constructor(props){
// //         super(props)
// //         this.state = {
// //             posts: this.props.posts,
// //             pageIdx: 0,
// //             numPages: Math.ceil((this.props.posts.length / 10))
// //         }
// //         this.changePageNumber = this.changePageNumber.bind(this)
// //     }

// //     changePageNumber(pageIdx){
// //         return () => {
// //             this.setState({pageIdx})
// //         }
// //     }

// //     componentWillReceiveProps(newProps){
// //         this.setState({
// //             posts: newProps.posts,
// //             pageIdx: 0,
// //             numPages: Math.ceil((newProps.posts.length / 10))
// //         })
// //     }

// //     render(){
// //         // debugger
// //         let {posts, pageIdx, numPages} = this.state;
// //         let {users} = this.props;
// //         let pagesNumbers = [];
// //         for (let x = 0; x < numPages; x++) {
// //             pagesNumbers.push(x)            
// //         }
// //         // debugger
// //         return <div className="filtered-posts-container">
// //             <ul className="filtered-posts">
// //                 {
// //                     posts.slice(pageIdx*10, pageIdx*10 + 10).map( post =>
// //                         // <li>
// //                         //     {post.body}   
// //                         // </li>
// //                     <li className="threads-list__item" key={post.id} >
// //                         <img src={users[post["author_id"]].profileImage} alt="" className="small-avatar threads-list__avatar"/>                                    
// //                             <div className="thread-info">
// //                                 <h5 className="thread-info__owner">{users[post["author_id"]].username}</h5>
// //                                 <p className="thread-info__body">{post.body}</p>
// //                                 {/* <span>show Comments</span>
// //                                 <div className="post-utils">
// //                                     <button onClick={this.toggleForm}>Edit Post</button>
// //                                     <button onClick={() => pinPost({ id: post.id })}>Pin Post</button>
// //                                     <button onClick={() => favoritePost({ id: post.id })}>Favorite Post</button>
// //                                 </div> */}
// //                             </div>
// //                         </li>
// //                         )
// //                 }
// //             </ul>
// //             <div className="posts-pages">
// //                 {
// //                     pagesNumbers.map( pageNumber => 
// //                     <span className="page-link" onClick={this.changePageNumber(pageNumber)}>
// //                         {pageNumber + 1}
// //                     </span> )
// //                 }
// //             </div>
// //             We found {posts.length} items
// //         </div>
// //     }
// // }

// // ({posts}){
// //     return <div className="filtered-posts">



// //         div.filtered-posts
// //     </div>
// // }