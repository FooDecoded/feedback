import React from 'react'
import ManageWorkspace from '../workspace/manage_workspace'


export default class SidebarHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showManageWorkspace: false
        }
        this.toggleWorkspaceManager = this.toggleWorkspaceManager.bind(this);
    }

    toggleWorkspaceManager(){
        this.setState({ showManageWorkspace: !this.state.showManageWorkspace})
    }

    render(){
        // debugger
        let {currentWorkspace, currentUser, logout} = this.props;
        return (
            <section className="sidebar__header">
                <div className="sidebar__workstation-info">
                    <h3 className="sidebar-workspace-name">
                        {currentWorkspace.name}
                    </h3>
                    {currentWorkspace.ownerId == currentUser.id && <i onClick={this.toggleWorkspaceManager} className="fa fa-cog workspace-settings" aria-hidden="true"></i>}
                </div>
                <div className="sidebar__user-info">
                    <span>
                        <span className="status-flag"></span> <i className="status-icon-online fa fa-circle status-icon" aria-hidden="true"></i> 
                        <span className="username-text">{currentUser.username}</span>
                    </span>
                    <i onClick={logout} className="fa fa-sign-out signout-btn" aria-hidden="true"></i>
                </div>


                {this.state.showManageWorkspace && <ManageWorkspace showManageWorkspace={this.state.showManageWorkspace} toggleWorkspaceManager={this.toggleWorkspaceManager} />}
            </section>
        )
    }
}
