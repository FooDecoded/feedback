import React from 'react';
import {connect} from 'react-redux'
import { login } from '../../actions/session_actions'
import Header from '../splash/header/header'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
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
        this.props.login( { ...this.state } )
        .then( () => this.props.history.push("/workspaces") )
    }

    render(){
        let {errors} = this.props;
        return(
                <form className="auth-form" onSubmit={this.handleSubmit}>
                    
                    <input placeholder="Username" className="auth-form__input" value={this.username} onChange={this.handleInput("username")} />
                    <input placeholder="Password" type="password" className="auth-form__input" value={this.password} onChange={this.handleInput("password")} />
                    <input className="auth-form__submit" type="submit" value="login"/>
                    
                    <ul>
                        { errors.map( error => <li key={error}>{error}</li> )}
                    </ul>
                </form>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        login: (user) => dispatch( login(user) )
    }
}

function mapStateToProps(state){
    return {
        errors: state.errors.session
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)