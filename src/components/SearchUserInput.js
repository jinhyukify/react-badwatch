import React from 'react';
import { Link, browserHistory } from 'react-router';

class SearchUserInput extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SearchUserInput';
        this.state = {
        	userName: ''
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
        		<div className="top-input-div">
        			<input className="topSearchInput"
        				   onChange={this._handleChange}
        				   onKeyPress={this._handleKeyPress}/>
        			<img src="/asset/images/search-icon.png"
        				 className="search-icon"
        				 onClick={this._onSearchUser}/>
        		</div>
        	);
    }
}

export default SearchUserInput;
