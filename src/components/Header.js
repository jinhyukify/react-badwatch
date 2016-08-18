    import React from 'react';
import { Link } from 'react-router';
import { LoginButton, Menu } from './';
import axios from 'axios';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
       
    }


    render() {
        return (
        		<div>
                    <img src="/asset/images/logo.png" className="header-logo"/>   
                    <div className="header-title">
                        <span className="red-text">bad.</span><span>WATCH</span>
                        <LoginButton />
                    </div>
                    <Menu location={this.props.location}/>
                </div>
        	);
    }
}

Header.propTypes = {
    location: React.PropTypes.any
};

export default Header;
