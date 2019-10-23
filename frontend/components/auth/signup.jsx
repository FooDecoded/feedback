import React from 'react';
import {connect} from 'react-redux'
import { signup, login } from '../../actions/session_actions'
import Header from '../splash/header/header'

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
        // console.log("fired")
        this.props.signup( { ...this.state } )
        .then( () => this.props.history.push("/workspaces") )
    }

    demoLogin(e) {
        e.preventDefault();
        this.props.login({ username: 'demo', password: 'password' }).then(() => this.props.history.push('/workspaces'));
    }

    render(){
        let {errors} = this.props;
        return(
            <>
            <Header/>
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
                    <h1>Sign Up</h1>
                    <p>Enter your <strong>email address</strong> and <strong>password</strong></p>
                </div>
                <div className="form-content">
                    <div className="form-inputs">
                        <input type="text" placeholder="you@example.com" value={this.state.email} onChange={this.handleInput('username')} required></input>
                        <input type="email" placeholder="you@example.com" value={this.state.email} onChange={this.handleInput('email')} required></input>
                        <input type="password" placeholder="password" value={this.state.password} onChange={this.handleInput("password")} required></input>
                    </div>
                    <div className="form-submit">
                        <input className="submit" type="submit" value="Sign Up Now!"></input>
                        <div className="demo-login">
                                DOn't have an account? 	&nbsp; 	&nbsp;
                                <a className="demo-button" onClick={this.demoLogin.bind(this)}>Try the demo!</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        signup: (user) => dispatch( signup(user) ),
        login: (user) => dispatch(login(user))
    }
}

function mapStateToProps(state){
    return {
        errors: state.errors.session
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)