import React from 'react';
import axios from 'axios';
import Comment from './Comment';
import CommentInput from './CommentInput';
import update from 'react-addons-update';
import 'babel-polyfill';
class YoutubeCommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'YoutubeCommentBox';
        this.state = {
        	comments: []
        };
        this._onCreateComment = this._onCreateComment.bind(this);
        this._handleReplyCount = this._handleReplyCount.bind(this);
    }

    _onCreateComment(content)
    {	
	        return axios({
		         	method: "POST",
		         	url: 'http://bad.watch/api/youtube-comment',
		         	data: {
		         		content: content,
		         		youtube_id: parseInt(this.props.id)
		         	}
		         })  
	   			.then((response) => {
			    		let data =response.data;
			    		if(data.responseCode == 12)
			    		{
			    			this.setState({
			    				comments: update(this.state.comments,{
			    					$push: [data.commentData]
			    				})
			    			});
			    			return true;
			    		}
			    		else 
			    		{
			    			sweetAlert(
				                '댓글 등록에 실패했습니다.',
				                'error'
				            )
				            return false;
			    		}
			    	})
    }

    _handleReplyCount(id)
    {
    	var index = this.state.comments.findIndex((comment) => {
    		return comment.comment_id == id
    	})
    	this.setState({
    		comments: update(this.state.comments, {
                [index]: {
                    reply_count: { $set: this.state.comments[index].reply_count + 1 }
                }
             })   
            })
    }

    componentDidMount()
    {
    	 axios.get('http://bad.watch/api/youtube-comment?id='+this.props.id)
            .then((response) => {
                let data = response.data;
                if(data.responseCode == 10)
                {
                    this.setState({
                        comments: data.commentData
                    });
                }
                else 
                {
                    sweetAlert(
                      '댓글을 불러오는데 오류가 발생했습니다.',
                      'error'
                    )
                    return;
                }
            }) 
    }

    render() {
        return (
        		<div className="comment-container">
        			<div className="comment-box"><img src="/asset/images/comment-icon.png"/>댓글 {this.state.comments.length} 개</div>
        			{this.state.comments.map( (comment) => {
        				return (
        						<Comment key={comment.comment_id}
        								 comment={comment}
        								 handleReplyCount={this._handleReplyCount}/>
        					);
        			})}
        			<CommentInput onCreateComment={this._onCreateComment} />
        		</div>
        	);
    }
}

YoutubeCommentBox.propTypes = {
	id: React.PropTypes.string
};

export default YoutubeCommentBox;
