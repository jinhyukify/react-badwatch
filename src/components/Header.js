import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
        this._popLogin = this._popLogin.bind(this);
        this._handleLogin = this._handleLogin.bind(this);
        this._handleLogout = this._handleLogout.bind(this);
    }

    _handleLogin()
    {
    	this.props.onLogin().then((success) => {
    		
    	});
    }

    _handleLogout()
    {
    	this.props.onLogout().then((success) => {

    	})
    }

    _popLogin()
    {
    	 var pop = window.open('http://bad.watch/api/auth/bnet', 'OAUTH_BATTLENET', 'width=450px, height=750px');
    	 pop.focus();
    	 console.log(this._handleLogin);	
    	 var onClose = function()
    	 {
    	 	if (pop.closed !== false) { 
		        window.clearInterval(pollTimer);
		       	this._handleLogin();
		     }
    	 }
    	 var pollTimer = window.setInterval(onClose.bind(this), 200);
    }

    render() {
    	const loginView = (
    		<ul id="nav-mobile" className="right hide-on-med-and-down">
				<li><Link to="/">Home</Link></li>
    			<li><a onClick={this._popLogin}>Login</a></li>
    			<li><Link to="/youtube?page=1">Youtube</Link></li>
                <li><Link to="/chat">채팅</Link></li>
			</ul>
    	);

    	const logoutView = (
    		<ul id="nav-mobile" className="right hide-on-med-and-down">
				<li><Link to="/">Home</Link></li>
				<li><a>{this.props.authentication.status.current_user.battletag}</a></li>
    			<li><a onClick={this._handleLogout}>Logout</a></li>
    			<li><Link to="/chat">채팅</Link></li>
			</ul>
    		
    	);

        return (
        		 <nav id="watch-nav">
				    <div className="nav-wrapper">
				      <Link to="/" className="brand-logo">BadWatch</Link>
				      {this.props.authentication.login.status == 'SUCCESS'? logoutView: loginView}
				    </div>
				  </nav>
        	);
    }
}

Header.propTypes = {
	onLogin: React.PropTypes.func,
	onLogout: React.PropTypes.func
};

export default Header;
