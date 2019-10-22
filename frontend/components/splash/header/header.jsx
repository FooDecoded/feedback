import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    
    render() {
        const display = (
            <>
                <Link to="/login" className="sign-in">Sign in</Link>
                <Link to="/signup" className="button">Get Started</Link>
            </>
        );
        return (
            <div className="header-content">
                <div className="left">
                        <Link to="/">
                            <div className="logo">
                                <img src={window.logo_URL} alt="logo" />
                                <p>Feedback</p>
                            </div>
                        </Link>
                </div>
                <div className="header-buttons">
                    {display}       
                </div>
            </div>
        );
    }
}
export default Header;