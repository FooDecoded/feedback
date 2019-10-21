import { RECEIVE_WORKSPACE, SET_ACTIVE_WORKSPACE, RECEIVE_WORKSPACES } from '../actions/workspace_actions'

function workspacesReducer(state = { currentWorkspace: null, list: {} }, action) {
    let newState = {...state}
    switch (action.type) {
        case SET_ACTIVE_WORKSPACE:
            newState.currentWorkspace = action.workspaceId
            return newState
            break;
        case RECEIVE_WORKSPACES:
            // workspaces = Object.assign({}, action.workspaces)
            // return workspaces
            return { currentWorkspace: null, list:{ ...action.workspaces } }
            break;

            // Need to figure otu it laster how to merge objects that are nested
        case RECEIVE_WORKSPACE:
            newState.list[action.workspace.id] = action.workspace
        // debugger
        return newState
            break;    
        default:
            return state;
            break;
    }
    return state
}
export default workspacesReducer