/**
 * Owner/Admin can only access this
 * Owner can set invitation by entering users email 
 * Owner can unsbcscibe a member
 * Owner can see list of members
 * /workspace/workspace_id/admin
 * Admins can add channels and set it as either private/public
 */
import { setAdmin } from '../../actions/workspace_actions'

import React from 'react';
import {connect} from 'react-redux';
import { addInvitation, getInvitations } from '../../utils/workspace_api_util'
import Loading from '../../components/ui/loading'
import Modal from '../ui/modal'

class ManageWorkspace extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            invitations: [],
            loading: true,
            email: "",
            invitationErrros: []
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(e){
        this.setState({email: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        addInvitation({ workspace_id: this.props.workspaceId, email: this.state.email})
        .then( invitation => {
            this.setState({ invitations: this.state.invitations.concat(invitation)})
            this.setState({email: ""})
        } )
    }

    handlesetAdmin(memberId){
        return () => {
            this.props.setAdmin({
                workspace_id: this.props.workspaceId,
                member_id: memberId
            })
            // console.log("assa")
        }
    }


    componentDidMount(){
        getInvitations({ workspace_id: this.props.workspaceId})
            .then(invitations => 
                { 
                    // debugger
                    this.setState({invitations, loading: false})
                })
    }

    render(){
        let { admins, nonAdmins, ownerId } = this.props;
        return <Modal showModal={this.props.showManageWorkspace} toggleModal={this.props.toggleWorkspaceManager} headerText="Manage Workspace">
        {
            !this.state.loading ?
            <div className="manage-workspace">
                    <div>
                        <h4>Send Invitations</h4>
                        <form className="invitation-form" onSubmit={this.handleSubmit}>
                                <input placeholder="Enter Email Here" className="invitation-form__input" type="text" onChange={this.handleEmailChange} />
                                <input className="invitation-form__submit" type="submit" />
                        </form>
                        <h4>Invitations Sent</h4>
                        <ul className="invitation-list">

                                {this.state.invitations.map(invitation => <li className="invitation-list__item">{invitation.email}</li>)}
                        </ul>
                    </div>
                    <div>
                            <h4>Current Admins</h4>
                        <ul>
                            
                            {
                                admins.map(user => <li onClick={this.handlesetAdmin(user.id)} key={user.id}>{user.username}</li>)
                            }
                        </ul>
                            <h4>Other Users</h4>
                        <ul>
                                
                            {
                                nonAdmins.map(user => <li onClick={this.handlesetAdmin(user.id)} key={user.id}>{user.username}</li>)
                            }
                        </ul>
                    </div>

                    </div>
                :
            <Loading/>
            }
        </Modal>

        
    }
}

function mapStateToProps(state){
    let ownerId = state.session.id;

    return {
        users: state.entities.users,
        workspaceId: state.entities.workspaces.currentWorkspace,
        admins: Object.values(state.entities.users).filter(user =>  user.id != ownerId && user.admin ),
        nonAdmins: Object.values(state.entities.users).filter(user => !user.admin),
    }
}

function mapDispatchToProps(dispatch){
    return {
        setAdmin: (workspace) => dispatch(setAdmin(workspace))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageWorkspace)
