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
        		<div className="col s12 m4 l3 youtube-card">
        			<Link to={"/youtube/show/"+youtube.youtube_id}>
	        			<div className="card">
	        				<div className="card-image">
	        					<img src={youtube.thumbnail} />
	        				</div>
	        				<div className="content">
	        					{youtube.title.length > 35? youtube.title.substring(0, 35)+".."	: youtube.title}
	        				</div>
	        				<div className="bottom-div">
	        					<div className="youtube-icon-div">
	        						<img src="/asset/images/like-icon.png"/>
	        						{youtube.like_count}
	        					</div>	
	        					<div className="youtube-icon-div">
	        						<img src="/asset/images/comment-icon.png"/>
	        						{youtube.comment_count}
	        					</div>
	        					<div className="youtube-icon-div">
	        						<img src="/asset/images/hit-icon.png"/>
	        						{youtube.hit_count}
	        					</div>
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
