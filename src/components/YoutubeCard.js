import React from 'react';
import { Link } from 'react-router';
class YoutubeCard extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'YoutubeCard';
    }
    render() {
        return (
        		<div className="col s12 m3">
        			<Link to={"/youtube/show/"+this.props.youtube_id}>
	        			<div className="card z-depth-2">
	        				<div className="card-image">
	        					<img src={this.props.thumbnail} />
	        				</div>
	        				<div className="card-content">
	        					{this.props.title}
	        				</div>
	        				<div className="card-action valign-wrapper">
	        					<i className="material-icons">thumb_up</i>{this.props.like_count}
	        					<i className="material-icons">comment</i>{this.props.comment_count}
	        					<i className="material-icons">perm_identity</i>{this.props.hit_count}
	        				</div>
	        			</div>
        			</Link>
        		</div>
        	);
    }
}

export default YoutubeCard;
