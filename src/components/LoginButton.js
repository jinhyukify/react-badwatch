import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginRequest, logoutRequest } from '../actions/authentication.js';

class LoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'LoginButton';
        this._onLogin = this._onLogin.bind(this);
        this._onLogout = this._onLogout.bind(this);
    	this._popLogin = this._popLogin.bind(this);
    }

    _onLogin()
    {
    	this.props.loginRequest();
    }

    _onLogout()
    {
    	this.props.logoutRequest();
    }

    _popLogin()
    {
    	 var pop = window.open('http://bad.watch/api/auth/bnet', 'OAUTH_BATTLENET', 'width=450px, height=750px');
    	 pop.focus();
    	 var onClose = function()
    	 {
    	 	if (pop.closed !== false) { 
		        window.clearInterval(pollTimer);
		       	this._onLogin();
		     }
    	 }
    	 var pollTimer = window.setInterval(onClose.bind(this), 200);
    }

    render() {
    	const loginButton = (
    			<div onClick={this._popLogin}>
        			Log - In
        		</div>
    		);
    	const waitingButton = (
    				<div className="preloader-wrapper mini active">
					    <div className="spinner-layer spinner-blue-only">
					      <div className="circle-clipper left">
					        <div className="circle"></div>
					      </div><div className="gap-patch">
					        <div className="circle"></div>
					      </div><div className="circle-clipper right">
					        <div className="circle"></div>
					      </div>
					    </div>
					  </div>
    		);
    	const logoutButton = (
    			<div onClick={this._onLogout}>
    				Log - Out
    			</div>
    		);
    	let loginStatus = undefined;
    	if(this.props.authentication.login.status == 'INIT')
    	{
    		loginStatus = loginButton;
    	}
    	else if (this.props.authentication.login.status == 'WAITING')
    	{
    		loginStatus = waitingButton;
    	}
    	else 
    	{
    		loginStatus = logoutButton;
    	}
        return (
        		<span className="login-button">
        			{loginStatus}
        		</span>
        	);
    }
}

const mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginRequest: () => {
			return dispatch(loginRequest());
		},
		logoutRequest: () => {
			return dispatch(logoutRequest());
		}
	};
};

LoginButton.propTypes = {
	authentication: React.PropTypes.object,
	loginRequest: React.PropTypes.func,
	logoutRequest: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
