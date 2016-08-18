import React from 'react';
import { Link } from 'react-router';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Menu';
    }
    render() {
    	console.log(this.props.location);	
        return (
        		<div className="header-menu">
        			<Link to="/user" activeClassName="active">전적 검색</Link>
        			<Link to="/chat" activeClassName="active">파티 매칭</Link>
        			<Link to="/youtube" activeClassName="active">동영상</Link>
        			<Link to="/board" activeClassName="active">커뮤니티</Link>
        		</div>
        	);
    }
}

Menu.propTypes = {
	location: React.PropTypes.any
};

export default Menu;
