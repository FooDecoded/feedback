import React from 'react';
import {connect} from 'react-redux'
import { signup } from '../../actions/session_actions'

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInput(type){
        return (e) => {
            this.setState({[type]: e.target.value})
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("fired")
        this.props.signup( { ...this.state } )
        .then( () => this.props.history.push("/workspaces") )
    }

    render(){
        let {errors} = this.props;
        return(

                <form className="auth-form" onSubmit={this.handleSubmit}>
                    <input  className="auth-form__input" placeholder="Username" value={this.username} onChange={this.handleInput("username")} />
                    <input className="auth-form__input" placeholder="Password" value={this.password} type="password" onChange={this.handleInput("password")} />
                    <input className="auth-form__input" placeholder="Email" value={this.email} onChange={this.handleInput("email")} />
                    <input  className="auth-form__submit" type="submit" value="Signup"/>
                    <ul>
                        { 
                            errors.map( error => <li key={error}>{error}</li> )
                        }
                    </ul>
                </form>
            
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        signup: (user) => dispatch( signup(user) )
    }
}

function mapStateToProps(state){
    return {
        errors: state.errors.session
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)