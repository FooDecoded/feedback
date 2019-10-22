import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Splash from './splash/splash';
import AuthRoute from '../utils/auth_router';
import ProtectedRoute from '../utils/protected_route';
import Welcome from './welcome';
import WorkspaceShowContainer from './workspace/workspace_show_container'
import WorkspaceList from './workspace/workspace_list'
import Signup from './auth/signup'
import Login from './auth/login'


export default function(props){
  return(
    <div>
      <header>
        <Switch>
          <Route path="/splash" component={Splash} />
          <AuthRoute path="/signup" component={Signup} />
          <AuthRoute path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={WorkspaceList}/>
          {/* <ProtectedRoute path="/workspaces" component={WorkspaceListContainer} /> */}
          <ProtectedRoute exact path="/workspaces/" WorkspaceList component={WorkspaceList} />
          <ProtectedRoute path="/workspaces/:workspaceId" component={WorkspaceShowContainer} />
        </Switch>
      </header>
    </div>
  )
}