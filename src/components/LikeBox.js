import React from 'react';

class LikeBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'LikeBox';
    }



    render() {
    	const like_true = (
    			<div>
    				<a onClick={this.props.handleDisLike} className="waves-effect waves-light btn">
        				<i className="material-icons left">thumb_up</i>좋아요 취소
        			</a>
    			</div>
    		);
    	const like_false = (
    			<div>
    				<a onClick={this.props.handleLike} className="waves-effect waves-light btn">
        				<i className="material-icons left">thumb_up</i>좋아요 {this.props.like_count}개
        			</a>
    			</div>
    		);
        return (
        		<div>
        			{this.props.like_status? like_true: like_false}
        		</div>
        	);
    }
}

LikeBox.propTypes = {
	handleLike: React.PropTypes.func,
	hadleDisLike: React.PropTypes.func,
	like_count: React.PropTypes.number,
	like_status: React.PropTypes.bool
};

export default LikeBox;
