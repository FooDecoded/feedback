import React from 'react';
import { connect } from 'react-redux';
// import SignupFormContainer from '../session/signup_form_container';
import { Link } from 'react-router-dom';
import Slideshow from './slideshow/slideshow';
import Header from './header/header'

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
});

class Splash extends React.Component {

    render() {
        const { currentUser } = this.props;
        const splashText =  (
            <>
                <div className="splash-byline">
                    <h1>Where Work Happens</h1>
                    <p>Stop, collaborate, and listen.</p>
                </div>
                <p>Already using Slacc?
                <Link to='/login' className="splash-link">Sign in</Link></p>
            </>
        );

        return (
            <>
                <Header/>
                <div className="splash-container">
                    <div className="splash-top">
                        <div className="splash-text">
                            {splashText}
                        </div>
                        <div className="splash-animation">
                            <img className="dropbox" src={window.dropbox_URL} alt="dropbox"/>
                            <img className="asana" src={window.asana_URL} alt="asana"/>
                            <img className="googledrive" src={window.googledrive_URL} alt="google"/>
                            <img className="salesforce" src={window.salesforce_URL} alt="salesforce"/>
                            <img className="jira" src={window.jira_URL} alt="jira"/>
                            <img className="zendesk" src={window.zendesk_URL} alt="zendesk"/>
                            <img className="gotomeeting" src={window.gotomeeting_URL} alt="gotomeeting"/>
                            <img className="onedrive" src={window.onedrive_URL} alt="onedrive"/>
                            <img className="zoom" src={window.zoom_URL} alt="zoom"/>
                            <img className="giphy" src={window.giphy_URL} alt="giphy"/>
                            <img className="lattice" src={window.lattice_URL} alt="lattice"/>
                            <img className="teamline" src={window.teamline_URL} alt="teamline"/>
                            <img className="dash" src={window.dash_URL} alt="dash"/>
                            <img className="outlook" src={window.outlook_URL} alt="outlook"/>
                            <img className="cisco" src={window.cisco_URL} alt="cisco"/>
                            <img className="loom" src={window.loom_URL} alt="loom"/>
                        </div>
                    </div>
                        <section className="splash-section-1">
                            <h2>Try Feedback</h2>
                            <Slideshow />
                        </section>
                </div>
            </>
        )
    }
   
}
export default connect(mapStateToProps)(Splash);