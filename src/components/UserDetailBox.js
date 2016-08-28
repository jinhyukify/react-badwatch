import React from 'react';
import UserDetailCard from './UserDetailCard';
import UserMobileDetailCard from './UserMobileDetailCard';
import { hour_modify, second_modify } from '../models/functions';
import HeroCard from './HeroCard';
class UserDetailBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserDetailBox';
    }

    render() {
    	const userData = this.props.userData;
    	const heros = this.props.userData.heros.filter((hero) => {
    		return hero.playtime != 0;
    	})
    	let winRate = function(win, count)
	    {
	    	if(count==0)
	    		return "0%";
	    	
	    	return ((win*100)/count).toFixed(1) + "%";
	    }
	    let kda = function(kill, death)
	    {
	    	return (kill/death).toFixed(1);
	    }
	    let userDetailBox;
	    let userMobileDetailBox;
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
	        		<UserDetailCard data={second_modify(userData.quick_most_mission_time)}>임무기여 시간 최고기록</UserDetailCard>
	        		<UserDetailCard data={userData.quick_most_onecombo}>원콤보 최고기록</UserDetailCard>
	        		<UserDetailCard data={userData.quick_most_lastshot}>킬딸 최고기록</UserDetailCard>
	        		<UserDetailCard data={userData.quick_most_deal}>딜 최고기록</UserDetailCard>
	        		<UserDetailCard data={hour_modify(userData.quick_playtime)}>플레이 시간</UserDetailCard>
	        		<UserDetailCard data={userData.quick_most_heal}>힐 최고기록</UserDetailCard>
	        	</div>	
    			);
    		userMobileDetailBox = (
    				<div>
	    				<UserMobileDetailCard data={winRate(userData.quick_win, userData.quick_game_count)}>승률</UserMobileDetailCard>
		        		<UserMobileDetailCard data={kda(userData.quick_kill, userData.quick_death)}>킬뎃</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.quick_gold_medal} average={userData.quick_gold_medal/userData.quick_game_count}>금메달</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.quick_silver_medal} average={userData.quick_silver_medal/userData.quick_game_count}>은메달</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.quick_bronze_medal} average={userData.quick_bronze_medal/userData.quick_game_count}>동메달</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.quick_solo_kill} average={userData.quick_solo_kill/userData.quick_game_count}>솔킬</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.quick_most_kill}>처치 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.quick_most_mission_kill}>임무처치 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={second_modify(userData.quick_most_mission_time)}>임무기여 시간 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.quick_most_onecombo}>원콤보 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.quick_most_lastshot}>킬딸 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.quick_most_deal}>딜 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={hour_modify(userData.quick_playtime)}>플레이 시간</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.quick_most_heal}>힐 최고기록</UserMobileDetailCard>
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
		        		<UserDetailCard data={second_modify(userData.rank_most_mission_time)}>임무기여 시간 최고기록</UserDetailCard>
		        		<UserDetailCard data={userData.rank_most_onecombo}>원콤보 최고기록</UserDetailCard>
		        		<UserDetailCard data={userData.rank_most_lastshot}>킬딸 최고기록</UserDetailCard>
		        		<UserDetailCard data={userData.rank_most_deal}>딜 최고기록</UserDetailCard>
		        		<UserDetailCard data={hour_modify(userData.rank_playtime)}>플레이 시간</UserDetailCard>
		        		<UserDetailCard data={userData.rank_most_heal}>힐 최고기록</UserDetailCard>
	        		</div>
    			);

    		userMobileDetailBox = (
    				<div>
		    			<UserMobileDetailCard data={winRate(userData.rank_win, userData.rank_game_count)}>승률</UserMobileDetailCard>
		        		<UserMobileDetailCard data={kda(userData.rank_kill, userData.rank_death)}>킬뎃</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.rank_gold_medal} average={userData.rank_gold_medal/userData.rank_game_count}>금메달</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.rank_silver_medal} average={userData.rank_silver_medal/userData.rank_game_count}>은메달</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.rank_bronze_medal} average={userData.rank_bronze_medal/userData.rank_game_count}>동메달</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.rank_solo_kill} average={userData.rank_solo_kill/userData.rank_game_count}>솔킬</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.rank_most_kill}>처치 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.rank_most_mission_kill}>임무처치 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={second_modify(userData.rank_most_mission_time)}>임무기여 시간 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.rank_most_onecombo}>원콤보 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.rank_most_lastshot}>킬딸 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.rank_most_deal}>딜 최고기록</UserMobileDetailCard>
		        		<UserMobileDetailCard data={hour_modify(userData.rank_playtime)}>플레이 시간</UserMobileDetailCard>
		        		<UserMobileDetailCard data={userData.rank_most_heal}>힐 최고기록</UserMobileDetailCard>
	        		</div>
    			);
    	}

        return (
        	<div>
        		<div className="quick-choose">
        			<center>
        			<div className="row mobile-hide">

		        		{userDetailBox}
		        	</div>
		        	</center>
		        	<div className="mobile-gamedata computer-hide">
		        		{userMobileDetailBox}
		        	</div>

        		</div>
	        	<h5 className="hero-list">영웅목록</h5>
	        	{heros.map((hero, i)=> {
	        		return (
	        				<HeroCard key={this.props.quick_mode + hero.hero}
	        				  		  hero={hero}
	        				  		  quick_mode={this.props.quick_mode}
	        				  		  overwatch_id={userData.overwatch_id}/>
	        			);
	        	})}
        	</div>
        	);
    }
}

UserDetailBox.propTypes = {
	userData: React.PropTypes.object,
	quick_mode: React.PropTypes.bool,
	onQuick: React.PropTypes.func,
	onRank: React.PropTypes.func
};

export default UserDetailBox;
