import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { loginRequest, logoutRequest } from '../actions/authentication.js';

class LoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'LoginButton';
        this._onLogin = this._onLogin.bind(this);
        this._onLogout = this._onLogout.bind(this);
    	this._popLogin = this._popLogin.bind(this);
        this.state = {
            dropdownOpen: false
        };
        this._handleDropdown = this._handleDropdown.bind(this);
        this._onProfile = this._onProfile.bind(this);
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

    _handleDropdown()
    {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    _onProfile()
    {
        if(!this.props.authentication.status.current_user.battletag)
            return;

        let url = "http://bad.watch/api/user/"+ this.props.authentication.status.current_user.battletag.replace("#", "-");
        axios.get(url)
            .then((response) => {
                let data = response.data;
                if(data.responseCode == 2)
                {
                    browserHistory.push('/user/'+data.user_id);
                }
                else 
                {
                    sweetAlert(
                      '',
                      '유저 정보가 존재하지 않습니다..',
                      'error'
                    )
                    return;
                }
            })
    }

    componentDidMount()
    {
        //$('#dropdown1').dropdown('open');
    }   

    render() {
    	const loginButton = (
    			<a onClick={this._popLogin} 
                   className="right-logo right">
        			<img src="/asset/images/login-button.png" className="login-button-img"/>
                    Log In
        		</a>
    		);
    	const waitingButton = (
                <div className="waitingButton">
    				<div className="preloader-wrapper small active">
                        <div className="spinner-layer spinner-red-only">
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div><div className="gap-patch">
                            <div className="circle"></div>
                          </div><div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>
                      </div>
                </div>     
    		);
    	const logoutButton = (
            <div>
    			<div className="inline nav-user">
    				{this.props.authentication.status.current_user.battletag? this.props.authentication.status.current_user.battletag.split("#")[0]: "오류"}
                </div>
                <div onClick={this._handleDropdown} className={`login-dropdown ${this.state.dropdownOpen? 'active': undefined}`}> 
                    {!this.state.dropdownOpen? <img src="/asset/images/dropdown-button.png" />: (
                        <div className="mobile-login-dropdown">
                            <img src="/asset/images/dropdown-up.png" />
                                <div className="dropdown">
                                    <div className="item" onClick={this._onProfile}>
                                        <img src="/asset/images/my-user.png" className="my-user"/>
                                        내프로필
                                    </div>
                                    <div className="item" onClick={this._onLogout}>
                                        <img src="/asset/images/logout.png" className="my-user"/>
                                        로그아웃
                                    </div>
                                </div>
                         </div>       
                        )}
                    
                </div>
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
    	else if(this.props.authentication.login.status == 'SUCCESS')
    	{
    		loginStatus = logoutButton;
    	}
        else
        {
            loginStatus = loginButton;
        }
        return (
                <div className="inline">
        			{loginStatus}
                 </div>
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
