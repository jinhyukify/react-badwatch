import React from 'react';
import { Link, browserHistory } from 'react-router';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Menu';
    }


    render() {
        let user_active = false;
        if(this.props.location.pathname.includes("user"))
            user_active = true;
        return (
        		<div className="header-menu">
                            <Link to="/" className={user_active? 'active': ''}>
                                <img src="/asset/images/search.png"/>
                                <div>전적 검색</div>
                                <div className="tab"></div>
                            </Link>
                            <Link to="/chat" activeClassName="active">
                                <img src="/asset/images/group.png"/>
                                <div>파티 매칭</div>
                                <div className="tab"></div>
                            </Link>
                            <Link to="/youtube" activeClassName="active">
                                <img src="/asset/images/youtube.png"/>
                                <div>동영상</div>
                                <div className="tab"></div>
                            </Link>
                            <Link to="/board" activeClassName="active">
                                <img src="/asset/images/board.png"/>
                                <div>커뮤니티</div>
                                <div className="tab"></div>
                            </Link>
        		</div>
        	);
    }
}

Menu.propTypes = {
	location: React.PropTypes.any
};

export default Menu;
