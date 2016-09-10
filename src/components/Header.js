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
        		<div className="header mobile-hide">
                    <Link to="/">
                        <img src="/asset/images/logo.png" className="header-logo"/>   
                    </Link>
                    <div className="header-title">
                         <Link to="/">
                            <img src="/asset/images/typo.svg" className="typo"/>
                         </Link>
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
