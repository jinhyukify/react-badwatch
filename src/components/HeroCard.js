import React from 'react';
import { mapHero, hour_modify } from '../models/functions';
import HeroDetail from './HeroDetail';
import axios from 'axios';
class HeroCard extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'HeroCard';
        this.state = {
        	detailOpen: false,
        	heroData : {}
        };
        this._onDetail = this._onDetail.bind(this);
        this._onClose = this._onClose.bind(this);
    }

    _onDetail()
    {
    	if(!Object.keys(this.state.heroData).length)
    	{
	    	let game_type = "quick"
	    	if(!this.props.quick_mode)
	    		game_type = "rank";

	    	let url = 'http://bad.watch/api/heros/'+game_type+'/'+mapHero[this.props.hero.hero]+'/'+this.props.overwatch_id;
	    	axios.get(url)
	    		.then(response => {
	    			let data = response.data;
	    			if(data.responseCode == 4)
	    			{
	    				this.setState({
	    					detailOpen: true,
	    					heroData: data.heroData
	    				});
	    			}
	    			else 
	    			{
	    				sweetAlert(
						  '데이터를 불러오는데 오류가 발생했습니다.',
						  '잠시후 다시시도해주세요.',
						  'error'
						)
						return;
	    			}
	    		})
	    }
	    else
	    {
	    	this.setState({
	    		detailOpen: true
	    	});
	    }
    }

    _onClose()
    {
    	this.setState({
    		detailOpen: false
    	});
    }

    render() {
    	const hero = this.props.hero;
    	const heroDetail = (
    			<HeroDetail quick_mode={this.props.quick_mode}
						    hero={this.state.heroData}
						    heroName={hero.hero}/>
    		);
    	let winRate = function(win, count)
	    {
	    	if(count == 0)
	    		return "0%";
	    	
	    	return ((win*100)/count).toFixed(1) + "%";
	    }
	    let kda = function(kill, death)
	    {
	    	if(death == 0)
	    		return "perfect";

	    	return (kill/death).toFixed(2);
	    }
        return (
        	<div>
        		<div className="hero-div">
				    <img src={"/asset/images/heros/"+mapHero[hero.hero]+".png"} 
				         className="hero-avatar"/>
				    <div className="heroname">{hero.hero}</div><br/>
				    <div className="hero-data">승률  <span className="right">{winRate(hero.win, hero.game_count)}</span></div><br/>
				    <div className="hero-data">K / D  <span className="right">{kda(hero.kill, hero.death)}</span></div><br/>
				    <div className="hero-data">플레이 시간 <span className="right">{hour_modify(hero.playtime)}</span></div>
			
					
					<div className="hero-more valign-wrapper mobile-hide">
						<div className="right-align">
							<span className="check-repu">평가를 확인해보세요!</span>
							{this.state.detailOpen? 
								<img src="/asset/images/arrow-up.png" 
								 className="arrow"
								 onClick={this._onClose}/>: 
								 <img src="/asset/images/arrow-down.png" 
								 className="arrow"
								 onClick={this._onDetail}/>
							}
							
						</div>						
					</div>
					<div className="computer-hide mobile-hero-more">
						<span className="check-repu">평가를 확인해보세요!</span>
						{this.state.detailOpen? 
								<img src="/asset/images/arrow-up.png" 
								 className="arrow"
								 onClick={this._onClose}/>: 
								 <img src="/asset/images/arrow-down.png" 
								 className="arrow"
								 onClick={this._onDetail}/>
							}
					</div>
				</div>
				{this.state.detailOpen? heroDetail: undefined}
			</div>
        	);
    }
}

HeroCard.propTypes = {
	hero: React.PropTypes.object,
	quick_mode: React.PropTypes.bool,
	overwatch_id: React.PropTypes.number
};

export default HeroCard;
