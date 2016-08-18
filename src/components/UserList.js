import React from 'react';
import { browserHistory } from 'react-router';
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserList';
        this._goToUser = this._goToUser.bind(this);
    }

    _goToUser()
    {
    	let battletag = this.props.user.name + "-" + this.props.user.battletag;
    	browserHistory.push('/user/'+battletag);
    }

    render() {
    	const user = this.props.user;
    	let win_rate = 0;
        if(user.rank_game_count == 0)
        {
        	win_rate = (user.quick_win*100/user.quick_game_count).toFixed(1);
        }
        else
        {
        	win_rate = (user.rank_win*100/user.rank_game_count).toFixed(1);
        }
        return (

        		<div className="user-list" onClick={this._goToUser}>
        			<img src={user.avatar} className="avatar"/>
        			<div>
        				<div className="width-50">
        					{user.name}#{user.battletag}	
        				</div><div className="width-50">
        					승률 {win_rate}%
        				</div><div className="width-50">
        					경쟁전 : {user.point}점	
        				</div><div className="width-50">
        					총 플레이 시간 {user.quick_playtime + user.rank_playtime}시간	
        				</div>
        			</div>	
        				
        		</div>
        	);
    }
}

UserList.propTypes = {
	user: React.PropTypes.object
};

export default UserList;
