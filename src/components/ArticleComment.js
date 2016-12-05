import React from 'react';
import ArticleReply from './ArticleReply';
import axios from 'axios';
import CommentInput from './CommentInput';
import update from 'react-addons-update';
class ArticleComment extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ArticleComment';
        this.state = {
        	isOpen: false,
        	replies: []
        };
    	this._handleReplyOpen = this._handleReplyOpen.bind(this);
    	this._onCreateReply = this._onCreateReply.bind(this);
    }

    _dateFormat(date)
    {
      var today = new Date();   

      var dateObj = new Date(date);
      var month = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60 / 60/ 24 /30);
      var day = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60 / 60/ 24);
      var hour = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60 / 60);
      var minute = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60);

      if( month == 0 )
      {
         if( day != 0 )
         {
            if( day == 1 )
               return "어제";
            else
               return day+"일 전";
         }
         else
         {
            if( hour !=0 )
               return hour+"시간 전";
            else
               return minute+"분 전";
         }

      }
      else if( minute <= 0 )
      {
         return "방금";
      }
      else
      {
         return month+"달 전"
      }
    }

    _onCreateReply(content)
    {
    	return axios({
    		method: "POST",
    		url: "http://bad.watch/api/article-reply/write",
    		data: {
    			content: content,
    			comment_id: this.props.comment.comment_id
    		}
    	})
    	.then((response) => {
    		let data = response.data;
    		if(data.responseCode == 36)
    		{
    			this.setState({
    				replies: update(this.state.replies, {
    					$push: [data.commentData]
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
    	.catch((err) => {
    		console.log(err);
    		sweetAlert(
                        '',
				       '답글 등록에 실패했습니다.',
				        'error'
				)
				return false;
    	})
    }

    _handleReplyOpen()
    {
    	if(this.state.isOpen)
    	{
    		this.setState({
    			isOpen: false
    		});
    		return;
    	}
    	else 
    	{
    		if(this.state.replies.length)
    		{
    			this.setState({
    				isOpen: true
    			})
    			return;
    		}
    	}
    	let url = 'http://bad.watch/api/article-reply/' + this.props.comment.comment_id;
    	axios.get(url)
    		.then((response) => {
    			let data = response.data;
    			if(data.responseCode == 34)
    			{
    				this.setState({
    					replies: data.commentData,
                        isOpen: true
    				});
    			}    
    			else
    			{
    				sweetAlert(
                      '답글을 불러오는데 오류가 발생했습니다.',
                      'error'
                    )
                    return;
    			}
    		});
    }

    render() {
    	const comment = this.props.comment;
    	const replyStatus = (
    			<div className="comment-reply">
    				{comment.reply_count == 0? "[답글]": "[답글 "+comment.reply_count+"개]"}
    			</div>
    		);
    	const replyInfo = (
    			<div>
    				{this.state.replies.map((reply) => {
    					return (
    							<ArticleReply key={reply.reply_id}
    								   		  reply={reply}/>
    						);
    				})}
    				<div onClick={this._handleReplyOpen} className="comment-reply">
    					{this.state.isOpen? "[답글접기]": undefined}
    				</div>
    				<CommentInput onCreateComment={this._onCreateReply}/>
    			</div>
    		);
        const avatar = (
                <img src="comment.avatar" className="comment-avatar" />
            );
        const anonymous_avatar = (
                <img src="/asset/images/logo.png" className="comment-avatar"/>
            );


        return (
        		<div className="comment">
        			<div>
        				{comment.avatar? avatar: anonymous_avatar}
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

ArticleComment.propTypes = {
	comment: React.PropTypes.object,
	handleReplyCount: React.PropTypes.func
};

export default ArticleComment;
