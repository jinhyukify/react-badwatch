import React from 'react';
import { Link } from 'react-router';
class YoutubeCard extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'YoutubeCard';
    }
    render() {
    	const youtube = this.props.youtube;
        return (
        		<div className="col s12 m3">
        			<Link to={"/youtube/show/"+youtube.youtube_id}>
	        			<div className="card z-depth-2">
	        				<div className="card-image">
	        					<img src={youtube.thumbnail} />
	        				</div>
	        				<div className="card-content">
	        					{youtube.title}
	        				</div>
	        				<div className="card-action valign-wrapper">
	        					<i className="material-icons">thumb_up</i>{youtube.like_count}
	        					<i className="material-icons">comment</i>{youtube.comment_count}
	        					<i className="material-icons">perm_identity</i>{youtube.hit_count}
	        					{youtube.name? youtube.name: "익명"}
	        				</div>
	        			</div>
        			</Link>
        		</div>
        	);
    }
}

YoutubeCard.proptypes = {
	youtube: React.PropTypes.object
};

export default YoutubeCard;
