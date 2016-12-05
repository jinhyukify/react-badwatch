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
    	let user_id = this.props.user.user_id;
    	browserHistory.push('/user/'+ user_id);
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
        				<div className="width-50 list-battletag">
        					{user.name}
        				</div><div className="width-50 mobile-hide">
        					승률 {win_rate}%
        				</div><div className="width-50 list-point">
        					경쟁전 : {user.point}점	
        				</div><div className="width-50 mobile-hide">
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
