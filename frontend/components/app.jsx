import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './auth/auth';
import AuthRoute from '../utils/auth_router';
import ProtectedRoute from '../utils/protected_route';
import Welcome from './welcome';
import WorkspaceShowContainer from './workspace/workspace_show_container'
import WorkspaceList from './workspace/workspace_list'


export default function(props){
  return(
    <div>
      <header>
        <Switch>
          <AuthRoute path="/auth" component={Auth} />
          {/* <AuthRoute path="/signup" component={Signup} /> */}
          <ProtectedRoute exact path="/" component={WorkspaceList}/>
          {/* <ProtectedRoute path="/workspaces" component={WorkspaceListContainer} /> */}
          <ProtectedRoute exact path="/workspaces/" WorkspaceList component={WorkspaceList} />
          <ProtectedRoute path="/workspaces/:workspaceId" component={WorkspaceShowContainer} />
        </Switch>
      </header>
    </div>
  )
}