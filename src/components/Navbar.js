import React from 'react';
import { Link } from 'react-router';
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Navbar';
    }
    render() {
        return (
        		 <nav className="computer-hide">
				    <div className="nav-wrapper">
				      <a data-activates="slide-out" className="brand-logo left" id="mobile-top-open">
				      	<i className="medium material-icons">reorder</i>
				      </a>
				      <div className="center-align">
				      	<Link to="/">
				      		<img src="/asset/images/badwatch.svg" className="badwatch"/>
				      	</Link>
				      </div>
				    </div>
				  </nav>
        	);
    }
}

export default Navbar;
