import React from 'react';
import { Link, browserHistory } from 'react-router';
import { LoginButton } from '../components';
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
    		browserHistory.push('/userByName/' + this.state.userName);
    	}
    }

    render() {
        return (
        	<div>
                <div className="right-align mobile-hide">
                    <LoginButton />
                </div>
        		<center className="main-center">
                    <img src="/asset/images/logo.png" className="logo"/> 
                    <span className="main-divider"></span>   
                    <div className="input-wrapper">
                        <input type="text" 
                               name="user"
                               className="search-input" 
                               placeholder="닉네임#배틀태그"
                               onChange={this._handleChange}
                               onKeyPress={this._handleKeyPress}/>  
                        <img src="/asset/images/search-icon.png" 
                             className="search-icon" 
                             onClick={this._onSearchUser}/>
                    </div>
                    <br/>
                    <span className="main-letter">
                        최초검색 1회후 닉네임으로만 검색할 수 있습니다.
                    </span>
                    <br/>
                    <Link to="youtube" className="main-link link-left">전적검색</Link>
                    <Link to="youtube" className="main-link link-right">파티매칭</Link>
                    <br/>
                    <Link to="youtube" className="main-link link-left">동영상</Link>
                    <Link to="youtube" className="main-link link-right">커뮤니티</Link>                    
                </center>
        		<br/><br/>
        		<div>
        			
        		</div>

        	</div>
        	);
    }
}

export default Home;
