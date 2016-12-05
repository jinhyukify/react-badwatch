import React from 'react';
import axios from 'axios';
class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserProfile';
        this._onRenew = this._onRenew.bind(this);
        this.state = {
        	renewStart: false
        };
    }

    _dateFormat(date)
    {
      var today = new Date();   

      var dateObj = new Date(date);
      var month = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60 / 60/ 24 /30);
      var day = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60 / 60/ 24);
      var hour = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60 / 60);
      var minute = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60);

      if( month == 0 )
      {
         if( day != 0 )
         {
            if( day == 1 )
               return "어제";
            else
               return day+"일 전";
         }
         else
         {
            if( hour !=0 )
               return hour+"시간 전";
            else
               return minute+"분 전";
         }

      }
      else if( minute <= 0 )
      {
         return "방금";
      }
      else
      {
         return month+"달 전"
      }
    }

    _renewAble(date)
    {
       var today = new Date();  
       var dateObj = new Date(date);
       var minute = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60);
       if(minute < 11)
          return false;
       else
         return true; 
    }

    _onRenew()
    {
    	this.setState({
    		renewStart: true
    	});

    	$('.renew-box').addClass('active');
    	var url = "http://bad.watch/api/renew-user/" + this.props.userData.overwatch_id;
    	axios.get(url)
    		.then((response) => {
    			let data = response.data;
    			if(data.responseCode == 54)
    			{
    				//갱신 성공
    				location.reload();
    			}
    			else if(data.responseCode == 55)
    			{
    				//갱신실패
    				let last_renew_time = this._dateFormat(data.last_renew);
    				this.setState({
			    		renewStart: false
			    	});
			    	$('.renew-box').removeClass('active');
			    	 sweetAlert(
                      '이미 '+last_renew_time+'에 갱신하였습니다.',
                      '10분마다 갱신하실 수 있습니다.',
                      'error'
                    )
                    return;
    			}
    		})
    }

    render() {
    	let renewState = undefined;
    	if(this._renewAble(this.props.userData.last_renew))
    	{
    		renewState = (
    				<div className="renew-box" onClick={this._onRenew}>
                <img src="/asset/images/renew-available.png" className="renew-available"/>
                  갱신하기
             </div>
    			);
    	}
    	else 
    	{
    		renewState = (
    				<div className="renew-box-disabled">
                <img src="/asset/images/renew-disable.png" className="renew-available"/>
                갱신됨
             </div>
    			);
    	}
        return (
	        	<div>
	        		<div className="user-profile">
		        		<img className="user-profile-img"
		        			 src={this.props.userData.avatar} />
		        		<div className="profile-battletag">
		        			<span className="profile-user-name">{this.props.userData.name}</span>
                  <span className="profile-user-level">경쟁전 점수 <span className="red-text">{this.props.userData.point}</span></span>
                  <span className="profile-user-level">레벨 <span className="red-text">{this.props.userData.level}</span></span>
                  <div className="profile-absolute">
                    <span className="meta">최근 갱신시간 : {this._dateFormat(this.props.userData.last_renew)}</span>
  		        		  {renewState}
                  </div>
                </div>
	        		</div>
	        		<div className="clear">
  						<div className="reputation">
                <img src="/asset/images/quot-left.png" className="quot-left"/>
  							<div className="reputation-text-top">
                  {this.props.userData.reputation}
                </div>
                <img src="/asset/images/quot-right.png" className="quot-right"/>
  						</div>
  					</div>
	        	</div>	
        	);
    }
}

UserProfile.propTypes = {
	userData: React.PropTypes.object
};

export default UserProfile;
