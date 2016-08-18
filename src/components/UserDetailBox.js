import React from 'react';
import UserDetailCard from './UserDetailCard';
import HeroCard from './HeroCard';
class UserDetailBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserDetailBox';
    }

    render() {
    	const userData = this.props.userData;
    	let winRate = function(win, count)
	    {
	    	return ((win*100)/count).toFixed(1) + "%";
	    }
	    let kda = function(kill, death)
	    {
	    	return (kill*100/(kill+death)).toFixed(1) + "%";
	    }
	    let userDetailBox;
    	if(this.props.quick_mode)
    	{
    		userDetailBox = (
    			<div>
    				<UserDetailCard data={winRate(userData.quick_win, userData.quick_game_count)}>승률</UserDetailCard>
	        		<UserDetailCard data={kda(userData.quick_kill, userData.quick_death)}>킬뎃</UserDetailCard>
	        		<UserDetailCard data={userData.quick_gold_medal} average={userData.quick_gold_medal/userData.quick_game_count}>금메달</UserDetailCard>
	        		<UserDetailCard data={userData.quick_silver_medal} average={userData.quick_silver_medal/userData.quick_game_count}>은메달</UserDetailCard>
	        		<UserDetailCard data={userData.quick_bronze_medal} average={userData.quick_bronze_medal/userData.quick_game_count}>동메달</UserDetailCard>
	        		<UserDetailCard data={userData.quick_solo_kill} average={userData.quick_solo_kill/userData.quick_game_count}>솔킬</UserDetailCard>
	        		<UserDetailCard data={userData.quick_most_kill}>처치 최고기록</UserDetailCard>
	        		<UserDetailCard data={userData.quick_most_mission_kill}>임무처치 최고기록</UserDetailCard>
	        		<UserDetailCard data={userData.quick_most_mission_time}>임무기여 시간 최고기록</UserDetailCard>
	        		<UserDetailCard data={userData.quick_most_onecombo}>동시처치 최고기록</UserDetailCard>
	        		<UserDetailCard data={userData.quick_most_lastshot}>막타먹어버리기 최고기록</UserDetailCard>
	        		<UserDetailCard data={userData.quick_most_deal}>딜 최고기록</UserDetailCard>
	        		<UserDetailCard data={userData.quick_playtime}>플레이 시간</UserDetailCard>
	        		<UserDetailCard data={userData.quick_most_heal}>힐 최고기록</UserDetailCard>
	        	</div>	
    			);
    	}
    	else
    	{
    		userDetailBox = (
    				<div>
		    			<UserDetailCard data={winRate(userData.rank_win, userData.rank_game_count)}>승률</UserDetailCard>
		        		<UserDetailCard data={kda(userData.rank_kill, userData.rank_death)}>킬뎃</UserDetailCard>
		        		<UserDetailCard data={userData.rank_gold_medal} average={userData.rank_gold_medal/userData.rank_game_count}>금메달</UserDetailCard>
		        		<UserDetailCard data={userData.rank_silver_medal} average={userData.rank_silver_medal/userData.rank_game_count}>은메달</UserDetailCard>
		        		<UserDetailCard data={userData.rank_bronze_medal} average={userData.rank_bronze_medal/userData.rank_game_count}>동메달</UserDetailCard>
		        		<UserDetailCard data={userData.rank_solo_kill} average={userData.rank_solo_kill/userData.rank_game_count}>솔킬</UserDetailCard>
		        		<UserDetailCard data={userData.rank_most_kill}>처치 최고기록</UserDetailCard>
		        		<UserDetailCard data={userData.rank_most_mission_kill}>임무처치 최고기록</UserDetailCard>
		        		<UserDetailCard data={userData.rank_most_mission_time}>임무기여 시간 최고기록</UserDetailCard>
		        		<UserDetailCard data={userData.rank_most_onecombo}>동시처치 최고기록</UserDetailCard>
		        		<UserDetailCard data={userData.rank_most_lastshot}>막타먹어버리기 최고기록</UserDetailCard>
		        		<UserDetailCard data={userData.rank_most_deal}>딜 최고기록</UserDetailCard>
		        		<UserDetailCard data={userData.rank_playtime}>플레이 시간</UserDetailCard>
		        		<UserDetailCard data={userData.rank_most_heal}>힐 최고기록</UserDetailCard>
	        		</div>
    			);
    	}

        return (
        	<div>
	        	<div className="row">
	        		{userDetailBox}
	        	</div>
	        	{userData.heros.map((hero, i)=> {
	        		return (
	        				<HeroCard key={i}
	        				  		  hero={hero}/>
	        			);
	        	})}
        	</div>
        	);
    }
}

UserDetailBox.propTypes = {
	userData: React.PropTypes.object,
	quick_mode: React.PropTypes.bool
};

export default UserDetailBox;
