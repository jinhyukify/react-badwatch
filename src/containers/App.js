import React from 'react';
import { Header, Footer, Navbar, SideNavbar } from '../components';
import { connect } from 'react-redux';
import { loginRequest, logoutRequest } from '../actions/authentication';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this._handleLogin = this._handleLogin.bind(this);
        this._handleLogout = this._handleLogout.bind(this);
    }

    _handleLogin()
    {
        return this.props.loginRequest().then(
            () => {
                if(this.props.authentication.login.status == "SUCCESS")
                {
                    console.log("로그인 성공");
                    return true;
                }
                else
                {
                    console.log("로그인 실패");
                    return false;
                }
            }
        );
    }

    _handleLogout()
    {
        return this.props.logoutRequest().then(
            () => {
                if(this.props.authentication.login.status == "INIT")
                {
                    console.log("로그아웃 성공");
                    return true;
                }
                else
                {
                    console.log("로그아웃 실패");
                    return false;
                }
            }
        );
    }

    componentDidMount()
    {
        console.log("app.js mount");
        this._handleLogin();
        $('#mobile-top-open').sideNav({
            closeOnClick: true
        });
    }

    render() {
        let isUser = false;
        if(this.props.location.pathname == '/')
            isUser = true;
        return (
        		<div>
                    <Navbar/>
                    <SideNavbar location={this.props.location}/>
	        		<div className="container body-container">
                        { isUser? undefined: <Header location={this.props.location}/> }
	        			{this.props.children}
	        		</div>  
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
