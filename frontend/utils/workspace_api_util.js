export function fetchSubscribedWorkspaces(){
    return $.ajax({
      method: "get",
      url: "/api/workspaces",
    })
  }

export function fetchFavorites(workspaceId) {
  // debugger
  return $.ajax({
    method: "get",
    url: `/api/workspaces/${workspaceId}/get_favorites`
  })
}

window.fetchFavorites = fetchFavorites
  
  export function createWorkspace(workspace) {
    return $.ajax({
      method: "Post",
      url: "/api/workspaces",
      data: { workspace }
    })
  }
  // Won't modify our current state
  export function addUser(workspace){
    return $.ajax({
      method: "Post",
      url: `/api/workspaces/${workspace.workspace_id}/add_user`,
      data: { workspace }
    })
  }

  export function addInvitation(workspace){
    return $.ajax({
      method: "Post",
      url: `/api/workspaces/${workspace.workspace_id}/add_invitation`,
      data: { workspace }
    })
  }

  export function getInvitations(workspace){
    return $.ajax({
      method: 'get',
      url: `/api/workspaces/${workspace.workspace_id}/invitations`
    })
  }

  window.addInvitation = addInvitation
  window.getInvitations = getInvitations

  export function fetchSubscribedUsers(workspace_id){
    // debugger
    return $.ajax({
      method: "get",
      url: "/api/users/",
      data: { workspace_id }
    }) 
  }

  export function addAdmin(workspace){
    return $.ajax({
      method: "Post",
      url: `/api/workspaces/${workspace.workspace_id}/set_admin`,
      data: { workspace }
    })
  }
  window.addAdmin = addAdmin
  window.fetchSubscribedUsers = fetchSubscribedUsers;

  // window.fetchSubscribedWorkspaces = fetchSubscribedWorkspaces;
  // window.createWorkspace = createWorkspace
  // window.addUser = addUser
  // window.addInvitation = addInvitation