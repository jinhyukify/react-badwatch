import React from 'react';
import { Link, browserHistory } from 'react-router';
import { LoginButton } from '../components';
import axios from 'axios';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Home';
        this.state = {
        	userName: "",
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
                let url = "http://bad.watch/api/user/"+encodeURIComponent(userName);  
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
                            this.setState({
                                status: 'INIT'
                            })
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
                <img src="/asset/images/main-search-icon.png" 
                             className="main-search-icon" 
                             onClick={this._onSearchUser}/>
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
        	<div>
        		<center className="main-center">
                    <img src="/asset/images/main-typo.png" className="logo"/>
                    <span className="main-letter">
                        * 이제는 영웅별 평가까지 매일 바뀝니다 !
                    </span>
                    <div className="input-wrapper">
                        <input type="text" 
                               name="user"
                               className="search-input" 
                               placeholder="닉네임#배틀태그를 입력하세요."
                               onChange={this._handleChange}
                               onKeyPress={this._handleKeyPress}/>  
                        {submit_button}
                    </div>
                    <br/>
                    <img src="/asset/images/transparent-logo.png" className="transparent-logo"/>
                    <div className="main-sub-text">
                        나쁜 시계
                    </div>
                    <span className="main-divider"></span> 
                    <br/>
                    <p className="main-p">나쁜시계는 나쁜 말로 여러분의 오버워치 전적을 적나라하게 표현해드립니다. 
                    <br/> 실제 전적을 기반으로 평가하니 너무 기분나빠 하지 마시길 바래요. 
                    <br/>나쁜시계로부터 좋은 말을 듣는 그날까지..</p>                       
                </center>
        		<br/><br/>
                
        		<div>
        			
        		</div>

        	</div>
        	);
    }
}

export default Home;
