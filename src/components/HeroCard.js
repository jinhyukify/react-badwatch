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
        this._onToggle = this._onToggle.bind(this);
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

    _onToggle()
    {
    	if(this.state.detailOpen)
    		this._onClose();
    	else
    		this._onDetail();
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
        		<div className="hero-div pointer" onClick={this._onToggle}>
				    <img src={"/asset/images/heros/"+mapHero[hero.hero]+".png"} 
				         className="hero-avatar"/>
				    <div className="heroname mobile-hide">{hero.hero}</div>
				    <div className="hero-wrapper mobile-hide">
					    <div className="hero-data hero-playtime">{hour_modify(hero.playtime)}</div>
					    <div className="hero-data hero-kda middle-big-hide">{kda(hero.kill, hero.death)}</div>
					    <div className="hero-data hero-win middle-big-hide">{this.props.quick_mode? hero.win+"승": winRate(hero.win, hero.game_count)}</div>
				    </div>

					<table className="mobile-hero-wrapper computer-hide">
						<tbody>
							<tr>
								<td>플레이</td>
								<td className="h-playtime">{hour_modify(hero.playtime)}</td>	
							</tr>
							<tr>
								<td>K/D</td>
								<td className="h-kda">{kda(hero.kill, hero.death)}</td>	
							</tr>
							<tr>	
								<td>{this.props.quick_mode? "승리": "승률(%)"}</td>
								<td className="h-win">{this.props.quick_mode? hero.win+"승": winRate(hero.win, hero.game_count)}</td>	
							</tr>
						</tbody>
				    </table>
					
					<div className="hero-more valign-wrapper">
						<div className="right-align">
							<span className="check-repu mobile-hide">평가를 확인해보세요!</span>
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
					<br className="computer-hide"/><br className="computer-hide"/>
					<div className="heroname computer-hide">{hero.hero}</div>
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
