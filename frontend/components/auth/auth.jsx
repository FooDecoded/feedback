import React from 'react'
import Login from './login'
import Signup from './signup'

export default function Auth(){
    return(
        <div className="auth-form__container"> 
                <Signup />
                <Login />
        </div>
    )
}