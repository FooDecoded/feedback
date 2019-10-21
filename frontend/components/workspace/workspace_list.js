import React from 'react';
import {connect} from 'react-redux';
import { setActiveWorkspace, fetchSubscribedWorkplaces, createWorkspace } from '../../actions/workspace_actions'
import {Link} from 'react-router-dom';

class WorkspaceList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: ""
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.props.fetchSubscribedWorkplaces();
    }

    handleInput(e){
        this.setState({name: e.target.value})
    }
    
    handleSubmit(e){
        // debugger
        e.preventDefault()
        console.log(e)
        this.props.createWorkspace(Object.assign({}, this.state))
        this.state.name = ""
    }

    render(){
        let {workspaces, setActiveWorkspace} = this.props;
        return (

            <div className="workspace-list-container">
                <ul className="workspace-list">
                    {
                        workspaces.map( ({id, name}) => 
                            <li key={id} className="workspace-list__item">
                            <Link onClick={ () => setActiveWorkspace(id) } to={`/workspaces/${id}`}>
                                {name}
                            </Link>
                            </li>
                            )
                    }
                </ul>
                <form className="workspace-form">
                    <input className="workspace-form__input" placeholder="Workspace Name" type="text" onChange={this.handleInput} value={this.state.name} />
                    <input className="workspace-form__submit" type="submit" onClick={this.handleSubmit} value="Create Workspace" />                
                </form>
            </div>
        )
    }
}



function mapStateToProps(state, ownProps){
    return {
        workspaces: Object.values(state.entities.workspaces.list)
    }
}

function mapDispatchToProps(dispatch, ownProps){
    return {
        fetchSubscribedWorkplaces: () => dispatch(fetchSubscribedWorkplaces()),
        createWorkspace: (workspace) => dispatch(createWorkspace(workspace)),
        setActiveWorkspace: (workspaceId) => dispatch(setActiveWorkspace(workspaceId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceList);