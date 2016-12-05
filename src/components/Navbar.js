import React from 'react';
import { Link } from 'react-router';
import LoginButton from './LoginButton';
import SearchUserInput from './SearchUserInput';
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Navbar';
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
        if(this.props.location.pathname.includes("user") || this.props.location.pathname == '/')
            user_active = true;

        if(this.props.location.pathname.includes("article"))
            board_active = true;

        return (
        		<div>
        		 <nav className="mobile-nav">
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
				  <nav className="computer-nav">
				  	<div className="nav-wrapper computer-nav">
				  		<Link to="/">
				  			<img src="/asset/images/badwatch-logo.png" className="badwatch-logo"/>
				  			<img src="/asset/images/nav-logo-text.png" className="nav-logo-text"/>
				  		</Link>
				  		<Link to="/" className={`tablet-hide ${user_active? 'active': ''}`}>전적검색</Link>
				  		{/*<Link to="/chat" activeClassName="active" className="tablet-hide">파티매칭</Link>*/}
				  		<a className="tablet-hide" onClick={this._onBlock}>파티매칭</a>
				  		<Link to="/youtube" activeClassName="active" className="tablet-hide">동영상</Link>
				  		<Link to="/article/free?page=1" className={`tablet-hide ${board_active? 'active': ''}`}>게시판</Link>
				  		<div className="right">
				  			<LoginButton />			  		
				  		</div>
				  		<div className="right">
				  			<SearchUserInput />	 
				  		</div>
				  	</div>
				  </nav>
				 </div>
        	);
    }
}

Navbar.propTypes = {
	location: React.PropTypes.object
};

export default Navbar;
