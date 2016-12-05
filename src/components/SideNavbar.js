import React from 'react';
import { Link } from 'react-router';
import { LoginButton } from './'
class SideNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideNavbar';
    }

    _onBlock()
    {
    	sweetAlert(
                       '',
                      '보다 나은 서비스를 위해 채팅서버를 점검중입니다.',
                      'error'
                    );
                return;
    }

    render() {
    	let user_active = false;
    	let board_active = false;
    	if(this.props.location.pathname == "/" || this.props.location.pathname.includes("user"))
    		user_active = true;

    	if(this.props.location.pathname.includes("board"))
    		board_active = true;
        return (
        		<div>
        			 <ul id="slide-out" className="side-nav">
					    <li>
					    	<div className="userView">
					    		<Link to="/">
						     	 	<img src="/asset/images/logo.png" />
						      	</Link>
					    	</div>
					    </li>
					    <center>
					    	<LoginButton />
					    </center>
					    <li><div className="divider"></div></li>
					    <li>
					    	<Link to="/" className={`waves-effect side-li ${user_active? 'active': ''}`}>
					    		<img src="/asset/images/search.png" />전적검색
					    		<i className="fa fa-check-circle-o fa-lg side-active" aria-hidden="true"></i>
					    	</Link>
					    	
					    </li>
					    <li>
					    	<a className="waves-effect side-li" onClick={this._onBlock}>
					    		<img src="/asset/images/group.png" />파티매칭
					    		<i className="fa fa-check-circle-o fa-lg side-active" aria-hidden="true"></i>
					    	</a>
					   		
					    </li>
					    <li>
					    	<Link to="/youtube" activeClassName="active" className="waves-effect side-li">
					    	<img src="/asset/images/youtube.png" />동영상
					    		<i className="fa fa-check-circle-o fa-lg side-active" aria-hidden="true"></i>
					    	</Link>
					    </li>
					    <li>
					    	<Link to="/article/free?page=1" activeClassName="active" className={`waves-effect side-li ${board_active? 'active': ''}`}>
					    	<img src="/asset/images/board.png" />커뮤니티	
					    		<i className="fa fa-check-circle-o fa-lg side-active" aria-hidden="true"></i>
					    	</Link>
					    </li>
					  </ul>
        		</div>
        	);
    }
}

SideNavbar.propTypes = {
	location: React.PropTypes.object
};

export default SideNavbar;
