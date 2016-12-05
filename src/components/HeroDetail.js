import React from 'react';
import { get_job_right_title, get_job_right_value, hour_modify } from '../models/functions';
class HeroDetail extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'HeroDetail';
    }
    render() {
    	const hero = this.props.hero;
    	let list_left_value = [];
    	let list_right_title = [];
    	let list_right_value = [];
    	let list_left_title = [
    		"게임당 평균 K/D",
    		"승률",
    		"솔로킬",
    		"게임당 임무 기여 처치",
    		"명중률",
    		"게임당 평균 킬딸",
    		"게임당 평균 치유",
    		"게임당 평균 치명타",
    		"전체 킬",
    		"전체 데스",
    		"승리",
    		"패배"
    	];

    	if(this.props.quick_mode)
    	{
    		list_left_value = [
	    		hero.quick_death == 0? "perfect": (hero.quick_kill/hero.quick_death).toFixed(2),
	    		hero.quick_game_count == 0? "0%": (hero.quick_win*100/hero.quick_game_count).toFixed(1) + "%",
	    		hero.quick_solo_kill+"킬",
	    		hero.quick_game_count == 0? 0: (hero.quick_mission_kill/hero.quick_game_count).toFixed(1)+"킬",
	    		hero.quick_accuracy+"%",
	    		hero.quick_game_count == 0? 0: (hero.quick_lastshot/hero.quick_game_count).toFixed(1)+"킬",
	    		hero.quick_game_count == 0? 0: (hero.quick_heal/hero.quick_game_count).toFixed(1),
	    		hero.quick_game_count == 0? 0: (hero.quick_critical/hero.quick_game_count).toFixed(1),
	    		hero.quick_kill+"킬",
	    		hero.quick_death+"데스",
	    		hero.quick_win+"승",
	    		(hero.quick_game_count - hero.quick_win)+"패"
    		];
    	}
    	else 
    	{
    		list_left_value = [
	    		(hero.rank_kill/hero.rank_death).toFixed(2),
	    		hero.rank_game_count == 0? "0%": (hero.rank_win*100/hero.rank_game_count).toFixed(1) + "%",
	    		hero.rank_solo_kill+"킬",
	    		hero.rank_game_count == 0? 0: (hero.rank_mission_kill/hero.rank_game_count).toFixed(1)+"킬",
	    		hero.rank_accuracy+"%",
	    		hero.rank_game_count == 0? 0: (hero.rank_lastshot/hero.rank_game_count).toFixed(1)+"킬",
	    		hero.rank_game_count == 0? 0: (hero.rank_heal/hero.rank_game_count).toFixed(1),
	    		hero.rank_game_count == 0? 0: (hero.rank_critical/hero.rank_game_count).toFixed(1),
	    		hero.rank_kill+"킬",
	    		hero.rank_death+"데스",
	    		hero.rank_win+"승",
	    		(hero.rank_game_count - hero.rank_win)+"패"
    		];
    	}
    	
    	list_right_title = get_job_right_title(this.props.heroName);
    	list_right_value = get_job_right_value(this.props.quick_mode, this.props.heroName, this.props.hero);
        return (
        		<div>
        			<div className="reputation-div">
        				<img src="/asset/images/evil.png" className="evil"/>
        				<div className="reputation-text">
        					{hero.reputation}
        				</div>
        			</div>
        			<div className="hero-data-div">
        				<div className="hero-detail-1">
	        				<div>
	        					<div className="inline">
	        						<span className="list-circle"></span>
	        						<span className="list-title">메달</span>
	        					</div>
	        					<div className="medal">
	        						<span className="left inline">
	        							<img src="/asset/images/gold-icon.png" className="gold-medal" />
	        							{this.props.quick_mode? hero.quick_gold_medal: hero.rank_gold_medal}
	        						</span>
	        						<span className="inline">	
	        							<img src="/asset/images/silver-icon.png" className="silver-medal" />
	        							{this.props.quick_mode? hero.quick_silver_medal: hero.rank_silver_medal}
	        						</span>
	        						<span className="right inline">
	        							<img src="/asset/images/bronze-icon.png" className="bronze-medal" />
	        							{this.props.quick_mode? hero.quick_bronze_medal: hero.rank_bronze_medal}
	        						</span>
	        					</div>
        					</div>
        					
        					{list_left_title.map((title, i) => {
        						return (
        								<div className="hero-data-list" key={i}>
				        					<div className="hero-data-title">
				        						<span className="list-circle"></span>
				        						<span className="list-title">{title}</span>
				        					</div>
				        					<span className="hero-data-num">
				        						{list_left_value[i]}
				        					</span>
				        					
			        					</div>
        							);
        					})}
        					

        				</div>
        				<div className="hero-detail-2">
        					{list_right_title.reverse().map((title, i) => {
        						return (
        								<div className="hero-data-list" key={i}>
				        					<div className="hero-data-title">
				        						<span className="list-circle"></span>
				        						<span className="list-title">{title}</span>
				        					</div>
				        					<span className="hero-data-num">
				        						{list_right_value[list_right_value.length-i-1]}
				        					</span>
				        					
			        					</div>
        							);
        					})}
        				</div>
        			</div>
        		</div>
        	);
    }
}

HeroDetail.propTypes = {
	hero: React.PropTypes.object,
	quick_mode: React.PropTypes.bool,
	heroName: React.PropTypes.string
};

export default HeroDetail;
