import React from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
class SearchUserInput extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SearchUserInput';
        this.state = {
        	userName: '',
            status: 'INIT'
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
			this.setState({
                status: 'WAITING'
            }, function(){
                let url = "http://localhost:3000/api/user/"+userName;  
                axios.get(url)
                    .then((response) => {
                        let data = response.data;
                        if(data.responseCode == 2)
                        {
                            this.setState({
                                status: 'INIT'
                            }, function(){
                                browserHistory.push('/user/' + data.user_id);
                            });
                        }
                        else 
                        {
                            sweetAlert(
                              '',
                              '유저가 존재하지 않습니다.',
                              'error'
                            )
                            return;
                        }
                    })
            });  
            
    	}
    	else
    	{
    		browserHistory.push('/userByName/' + this.state.userName);
    	}
    }

    render() {
        const status_inactive = (
                <img src="/asset/images/nav-search-icon.png"
                         className="nav-search-icon"/>
            );
        const status_active = (
               <div className="preloader-wrapper small active search-preloader">
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            );
        let submit_button = null;
        if(this.state.status == 'INIT')
            submit_button = status_inactive;
        else
            submit_button = status_active;
        return (
        		<div className="input-wrapper">
        			<input type="text"
                           className="nav-search-input"
                           placeholder="닉네임#배틀태그를 입력하세요."
                           value={this.state.userName}
                           onChange={this._handleChange}
                           onKeyPress={this._handleKeyPress}/>
                    {submit_button}
        		</div>
        	);
    }
}

export default SearchUserInput;
