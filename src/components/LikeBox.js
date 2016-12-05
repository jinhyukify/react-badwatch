import React from 'react';

class LikeBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'LikeBox';
    }



    render() {
    	const like_true = (
    			<div className="right">
    				<a onClick={this.props.handleDisLike} className="pointer">
        				<img src="/asset/images/like-on.png"/>
        			</a>
    			</div>
    		);
    	const like_false = (
    			<div className="right">
    				<a onClick={this.props.handleLike} className="pointer">
        				<img src="/asset/images/like-off.png"/>
        			</a>
    			</div>
    		);
        return (
        		<div className="like-status">
        			{this.props.like_status? like_true: like_false}
                    <div className="siba">
                        <span className="like-count"><img src="/asset/images/like-icon.png"/></span>
                        <span>{this.props.like_count}</span> 
                        <span className="hit-count"><img src="/asset/images/hit-icon.png"/></span>
                        <span>{this.props.hit_count}</span>
                    </div>
        		</div>
        	);
    }
}

LikeBox.propTypes = {
	handleLike: React.PropTypes.func,
	hadleDisLike: React.PropTypes.func,
	like_count: React.PropTypes.number,
	like_status: React.PropTypes.bool,
    hit_count: React.PropTypes.number
};

export default LikeBox;
