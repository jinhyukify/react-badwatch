import React from 'react';

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Title';
    }
    render() {
        return (
        		<div className="card-panel red lighten-4">
        			제목 : {this.props.title} <br/>
        			댓글수 : {this.props.comment_count}개 <br/>
        			좋아요 : {this.props.like_count}개 <br/>
        			조회수 : {this.props.hit_count} <br/>
        			작성시간 : {this.props.written_time} <br/>
                    작성자 : {this.props.name? this.props.name: "익명"}
        		</div>
        	);
    }
}

Title.propTypes = {
	title: React.PropTypes.string,
	comment_count: React.PropTypes.number,
	hit_count: React.PropTypes.number,
	like_count: React.PropTypes.number,
	written_time: React.PropTypes.string
};

export default Title;
