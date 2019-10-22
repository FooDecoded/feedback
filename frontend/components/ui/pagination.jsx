import React from 'react'

export default class Pagination extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            items: this.props.items,
            pageIdx: 0,
            numPages: Math.ceil((this.props.items.length / 10))
        }
        this.changePageNumber = this.changePageNumber.bind(this)
    }

    changePageNumber(pageIdx){
        return () => {
            this.setState({pageIdx})
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            items: newProps.items,
            pageIdx: 0,
            numPages: Math.ceil((newProps.items.length / 10))
        })
    }

    render(){
        let {items, pageIdx, numPages} = this.state;
        let {users} = this.props;
        let pagesNumbers = [];
        for (let x = 0; x < numPages; x++) {
            pagesNumbers.push(x)            
        }
        return <div className="filtered-posts-container">
            <ul className="filtered-posts">
                {
                    items.slice(pageIdx*10, pageIdx*10 + 10).map( post =>

                    <li className="threads-list__item" key={post.id} >
                        <img src={users[post["author_id"]].profileImage} alt="" className="small-avatar threads-list__avatar"/>                                    
                            <div className="thread-info">
                                <h5 className="thread-info__owner">{users[post["author_id"]].username}</h5>
                                <p className="thread-info__body">{post.body}</p>
                            </div>
                    </li>
                        )
                }
            </ul>
            <div className="posts-pages">
                {
                    pagesNumbers.map( pageNumber => 
                    <span className="page-link" onClick={this.changePageNumber(pageNumber)}>
                        {pageNumber + 1}
                    </span> )
                }
            </div>
            We found {items.length} items
        </div>
    }
}