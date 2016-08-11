import React from 'react';
import { Link, browserHistory } from 'react-router';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Home';
        this.state = {
        	userName: ""
        };
        this._handleChange = this._handleChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this._onSearchUser = this._onSearchUser.bind(this);
    }

    _handleChange(e)
    {
    	this.setState({
    		userName: e.target.value
    	});
    }

    _handleKeyPress(e)
    {
    	if(e.key == 'Enter')
    	{
    		this._onSearchUser();
    	}
    }

    _onSearchUser()
    {
    	if(!this.state.userName)
    	{
    		sweetAlert(
				  '',
				  '올바른 형식이 아닙니다.',
				  'error'
				)
    		return;
    	}

    	/* //////// # 포함시 배틀태그 포함 -로 변환후 url 요청 \\\\\\\\\  */
    	if(this.state.userName.includes("#"))
    	{
    		let userName = this.state.userName.replace("#", "-");
    		if(userName.includes("#"))
    		{
    			sweetAlert(
				  '',
				  '올바른 형식이 아닙니다.',
				  'error'
				)
    			return;
    		}
			    		
    		browserHistory.push('/user/' + userName);
    	}
    	else
    	{
    		
    	}
    }

    render() {
        return (
        	<div>
        		<center>
	        		<a className="main-black-button">전적 검색</a>		
	        		<span className="menu-dot">····</span>
	        		<a className="main-black-button">파티 매칭</a>	
	        		<span className="menu-dot">····</span>
	        		<div className="inline user-search-box">
	        			<div className="row">
			        		<div className="input-field col s8 offset-s2">
						        <input type="text" 
						          	     name="user"
						          		 id="main-search" 
						          		 className="validate" 
						          		 onChange={this._handleChange}
						          		 value={this.state.userName}
						          		 onKeyPress={this._handleKeyPress}/>
						         <label className="text-left">닉네임#배틀태그</label>
						         <i className="small material-icons" onClick={this._onSearchUser}>search</i>
						    </div>
			       	 	</div>
	        		</div>
	        		<span className="menu-dot">····</span>
	        		<Link to="youtube" className="main-black-button">동영상</Link>	
	        		<span className="menu-dot">····</span>
	        		<a className="main-black-button">커뮤니티</a>	
        		</center>
        		<br/><br/>
        		<div>
        			
        		</div>

        	</div>
        	);
    }
}

export default Home;
