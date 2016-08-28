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
                    <p>안녕하세요. 배드워치입니다. 저희는 사실 아직 개발이 완료되지 않아 계속 개발이 진행되고 있는 상황입니다.<br/>본의아니게 개발과정과 내용들을 외부에 발표하게 되면서 몇몇분에게 도메인이 알려지면서, 유저분들이 방문해주시고 있는 상황입니다.
                    <br/>원래 계획으로는, 안드로이드 버전 앱과, 아이폰버전 앱을 동시에 오픈하려고 하였습니다. 아직 디자인이나 개발적인 내용이 완벽히 다듬어지지 않아, 오류가 적지 않습니다.</p>
                    <p>평가시스템은 곧 대규모 업데이트가 있을 예정이며, 베타버전으로 아직까지 부족한게 사실입니다. 여러개의 평가기준과 알고리즘을 이용하여 재밌는 요소들을 더욱넣어 재밌는 사이트가 되도록 노력하겠습니다.<br/>베타버전이지만 이용해주셔셔 감사합니다.</p>
                    <p className="right-align">-개발자 일동 올림</p>
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
                    <Link to="/"className="main-link link-left">전적검색</Link>
                    <Link to="chat" className="main-link link-right">파티매칭</Link>
                    <br/>
                    <Link to="youtube" className="main-link link-left">동영상</Link>
                    <Link to="board/free/page/1" className="main-link link-right">커뮤니티</Link>                    
                </center>
        		<br/><br/>
        		<div>
        			
        		</div>

        	</div>
        	);
    }
}

export default Home;
