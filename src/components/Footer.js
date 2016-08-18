import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Footer';
    }
    render() {
        return (
        		<footer>
		          <div className="footer-copyright">
		            <div className="container">
		           Copyright Badwatch All rights reserved
		            <a className="right">Nexters</a>
		            </div>
		          </div>
		        </footer>
        	);
    }
}

export default Footer;
