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

    _dateFormat(date) 
    {
      let now = new Date(date);
      let year = "" + now.getFullYear();
      let month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
      let day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
      let hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
      let minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
      let second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
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
    			<div className="comment-reply">
    				{comment.reply_count == 0? "[답글]": "[답글 "+comment.reply_count + "개]"}
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
        			<div onClick={this._handleReplyOpen} className="comment-reply">
        				{this.state.isOpen? "[답글접기]": undefined}
        			</div>
        			<CommentInput onCreateComment={this._onCreateComment}/>
    			</div>
    		);


        return (
        	<div className="comment">
        		<div className="">
                <img src={comment.avatar} className="comment-avatar"/>
                <div className="right-comment-div">
                     <span className="comment-name">{comment.name? comment.name: "익명"}</span>
                     <span className="meta">{this._dateFormat(comment.written_time)}</span>
                     <span className="red-text ip">[{comment.ip}]</span>
                     <div>{comment.content}</div>
                </div>
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
