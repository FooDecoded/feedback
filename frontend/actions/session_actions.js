import * as SessionUtils from '../utils/session_api_util';

export function login(user){
  return function(dispatch){
    return SessionUtils.signin(user)
      .then( user => 
        {
          if(user.errors){
            dispatch(receiveErrors(user.errors))
          } else {
            dispatch(receiveCurrentUser(user))
          }
        
        })
  }
}

export function logout(user) {
  return function (dispatch) {
    return SessionUtils.logout()
      .then( () => dispatch(logoutCurrentUser()),
        res => dispatch(receiveErrors(res.responseJSON)))
  }  
}

export function signup(user) {
  return function (dispatch) {
    return SessionUtils.signup(user)
      .then(user => dispatch(receiveCurrentUser(user)),
        res => { debugger })
  }
}

export function receiveCurrentUser(currentUser){
  return {
    type: RECEIVE_CURRENT_USER,
    payload: currentUser
  }
}

export function logoutCurrentUser(){
  return {
    type: LOGOUT_CURRENT_USER  }
}

export function receiveErrors(errors){
  return {
    type: RECEIVE_ERRORS,
    payload: errors
  }
}

export function clearSessionErrors(){

}


export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS'
