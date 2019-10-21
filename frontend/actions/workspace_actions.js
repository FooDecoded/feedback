import * as workspaceApiUtils from '../utils/workspace_api_util';
export const SET_ACTIVE_WORKSPACE = "SET_ACTIVE_WORKSPACE";
export const RECEIVE_WORKSPACES = "RECEIVE_WORKSPACES";
export const RECEIVE_WORKSPACE = "RECEIVE_WORKSPACE";
export const RECEIVE_SUBSCRIBED_USERS = "RECEIVE_SUBSCRIBED_USERS";
// import {} from ""
// Making will be a combination of these two actions

export const RECEIVE_FAVORITE_POSTS = "RECEIVE_FAVORITE_POSTS"
export const RECEIVE_FAVORITE_MESSAGES = "RECEIVE_FAVORITE_MESSAGES"

// export function receiveFavoritePosts(posts) {
//     return {
//         type: RECEIVE_FAVORITE_POSTS,
//         posts
//     }
// }

export function receiveFavoritePosts(favorites) {
    return {
        type: RECEIVE_FAVORITE_POSTS,
        favorites
    }
}

export function fetchFavorites(workspace) {
    return function(dispatch){
        return workspaceApiUtils.fetchFavorites(workspace)
        .then( favorites => {
            // debugger
            dispatch(receiveFavoritePosts(favorites))
        } ) 
    }
}



export const UPDATE_ADMIN = "UPDATE_ADMIN"  

export function updateAdmin(workspace){
    return {
        type: UPDATE_ADMIN,
        workspace
    }
}

export function setAdmin(workspace){
    return function(dispatch){
        return workspaceApiUtils.addAdmin(workspace)
        .then( workspace => dispatch(updateAdmin(workspace)) )
    }
}


export function setActiveWorkspace(workspaceId){
    return {
        type: SET_ACTIVE_WORKSPACE,
        workspaceId
    }
}

export function receiveWorkspaces(workspaces){
    return {
        type: RECEIVE_WORKSPACES,
        workspaces
    }
}

export function receiveWorkspace(workspace){
    return {
        type: RECEIVE_WORKSPACE,
        workspace
    }
}

export function createWorkspace(workspace){
    console.log(workspace)
    return function(dispatch) {
        return workspaceApiUtils.createWorkspace(workspace)
        .then( workspace => dispatch(receiveWorkspace(workspace)) )
    }
}

export function fetchSubscribedWorkplaces(){
    return function(dispatch){
        return workspaceApiUtils.fetchSubscribedWorkspaces()
        .then( workspaces => dispatch(receiveWorkspaces(workspaces)))
    }
}

export function receiveSubscribedUsers(users){
    return {
        type: RECEIVE_SUBSCRIBED_USERS,
        users
    }
}

export const PRESENCE_CHANGE = 'PRESENCE_CHANGE'
export function preseneChange(user) {
    return {
        type: PRESENCE_CHANGE,
        user
    }
}

// export function 
// workspaceApiUtils.fet
// workspaceApiUtils.
export function fetchSubscribedUsers(workspace_id){
    return function(dispatch){
      return workspaceApiUtils.fetchSubscribedUsers(workspace_id)
      .then( users => dispatch(receiveSubscribedUsers(users)) )  
    }
}

// export function workspacesSelector(workspaces){
//     return Object.values(workspaces)
// }
