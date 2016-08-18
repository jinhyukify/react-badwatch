import React from 'react';
import { mapHero } from '../models/functions';
class HeroCard extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'HeroCard';
    }
    render() {
    	const hero = this.props.hero;
        return (
        		<div className="col s12 m7">
				    <div className="card horizontal">
				      <div className="card-image">
				        <img src={"/asset/images/heros/"+mapHero[hero.hero]+".png"} />
				      </div>
				      <div className="card-stacked">
				        <div className="card-content">
				          <p>{hero.hero}</p>
				          <p>승률 : {(hero.win*100/hero.game_count).toFixed(1)}%</p>
				          <p>kda : {(hero.kill/hero.death).toFixed(2)}</p>
				          <p>플레이 시간 {hero.playtime}시간</p>				          
				        </div>
				        <div className="card-action">
				          <a>더보기</a>
				        </div>
				      </div>
				    </div>
				  </div>
        	);
    }
}

HeroCard.propTypes = {
	hero: React.PropTypes.object
};

export default HeroCard;
