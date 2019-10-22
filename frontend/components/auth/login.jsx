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

            <div className="form-main">
                {errors.length > 0 &&
                    <ul className="session-errors">
                        {errors.map((error, idx) => <li key={idx}>
                            <div className="error-icon"></div>
                            <p>{error}</p>
                        </li>)}
                    </ul>
                }
                <form onSubmit={this.handleSubmit}>
                    {errors.length > 0 &&
                        <ul className="session-errors">
                            {errors.map((error, idx) => <li key={idx}>
                                <div className="error-icon"></div>
                                <p>{error}</p>
                            </li>)}
                        </ul>
                    }
                    <div className="form-header">
                        <h1>Login</h1>
                        <p>Enter your <strong>email address</strong>, <strong>password</strong>, and <strong>display name</strong></p>
                    </div>
                    <div className="form-content">
                        <div className="form-inputs">
                            <input type="text" placeholder="you@example.com" value={this.state.email} onChange={this.handleInput('username')} required></input>
                            <input type="password" placeholder="password" value={this.state.password} onChange={this.handleInput("password")} required></input>
                        </div>
                        <div className="form-submit">
                            <input className="submit" type="submit" value="Login"></input>
                        </div>
                    </div>
                </form>
            </div>
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