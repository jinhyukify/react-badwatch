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
    	if(this.state.renewStart)
    	{
    		renewState = (
    				<div className="preloader-wrapper renew-loader active">
					    <div className="spinner-layer spinner-white-only">
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
    	}
    	else 
    	{
    		renewState = (
    				<img src="/asset/images/renew.png" className="renew-icon"/>
    			);
    	}
        return (
	        	<div>
	        		<div>
		        		<img className="user-profile-img"
		        			 src={this.props.userData.avatar} />
		        		<div className="profile-battletag">
		        			{this.props.userData.name} # {this.props.userData.battletag}
                  <br className="computer-hide"/>
		        			<span className="meta">최근 갱신시간 : {this._dateFormat(this.props.userData.last_renew)}</span>
		        		</div>
		        		<div className="profile-info">
		        			<span>레벨 {this.props.userData.level}</span><br/>
		        			<span>경쟁전 점수 {this.props.userData.point}</span>
                  <br className="computer-hide"/><br className="computer-hide"/>
		        			<span className="renew-box" onClick={this._onRenew}>
		        				{renewState}
		        			</span><br className="computer-hide"/>
		        			<span className="renew-ment">
		        				! 게임종료 후 갱신해야 최신 기록이 업데이트됩니다.
		        			</span>
		        		</div>
	        		</div>
	        		<div className="clear">
						<div className="reputation-title">배드워치 평가</div>
						<div className="reputation">
							{this.props.userData.reputation}
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
