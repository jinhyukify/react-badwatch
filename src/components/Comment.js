import React from 'react';
import axios from 'axios';
import Reply from './Reply';
import CommentInput from './CommentInput';
import update from 'react-addons-update';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Comment';
        this.state = {
        	"isOpen": false,
        	"replies": []
        };
    	this._handleReplyOpen = this._handleReplyOpen.bind(this);
    	this._onCreateComment = this._onCreateComment.bind(this);
    }

    _onCreateComment(content)
    {
    	return axios({
    		method: "POST",
    		url: "http://bad.watch/api/youtube-reply",
    		data: {
    			content: content,
    			comment_id: this.props.comment.comment_id 
    		}
    	})
    	.then((response) => {
    		let data = response.data;
    		if(data.responseCode == 16)
    		{
    			this.setState({
    				replies: update(this.state.replies, {
    					$push: [data.replyData]
    				})
    			});
    			this.props.handleReplyCount(this.props.comment.comment_id);
    			return true;
    		}
    		else
    		{
    			sweetAlert(
				       '답글 등록에 실패했습니다.',
				        'error'
				)
				return false;
    		}
    	})
    }

    _handleReplyOpen()
    {	
    	if(this.state.isOpen)
    	{
    		this.setState({
    			isOpen: false
    		})
    		return;
    	}
    	else
    	{
    		if(this.state.replies.length)
    		{
    			this.setState({
    				isOpen: true
    			});
    			return;
    		}
    	}
    	axios.get('http://bad.watch/api/youtube-reply?id='+this.props.comment.comment_id)
	    		.then((response) => {
	    			let data = response.data;
	    			if(data.responseCode == 14)
	    			{
	    				this.setState({
	    					replies: data.replyData,
	    					isOpen: !this.state.isOpen
	    				});
	    				
	    			}
	    			else 
	    			{
	    				 sweetAlert(
	                     	 '댓글을 불러오는데 오류가 발생했습니다.',
	                    	  'error'
	                  	  )
	                   	 return false;
	    			}
	    		})
	    	
    }

    render() {
    	const comment = this.props.comment;
    	const replyStatus = (
    			<div>
    				{comment.reply_count == 0? "답글달기": "답글 "+comment.reply_count + "개"}
    			</div>
    		);
    	const replyInfo = (
    			<div>
    				{this.state.replies.map((reply) => {
        				return (
        						<Reply key={reply.reply_id}
        							   reply={reply}/>
        					);
        			})}
        			<div onClick={this._handleReplyOpen}>
        				{this.state.isOpen? "답글접기": undefined}
        			</div>
        			<CommentInput onCreateComment={this._onCreateComment}/>
    			</div>
    		);


        return (
        	<div className="blue-grey">
        		<div className="white-text">
        			{comment.content}{comment.written_time}<span className="red-text">[{comment.ip}]</span>
                    {comment.name? comment.name: "익명"}
        			<div onClick={this._handleReplyOpen}>
        				{this.state.isOpen? undefined: replyStatus}
        			</div>
        			
        			{this.state.isOpen? replyInfo: undefined}
        			
        		</div>
        	</div>
        	);
    }
}

Comment.propTypes = {
	comment: React.PropTypes.object,
	handleReplyCount: React.PropTypes.func
};

export default Comment;
