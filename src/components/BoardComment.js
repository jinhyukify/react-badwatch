import React from 'react';
import axios from 'axios';
import BoardCommentReplyWriteBox from './BoardCommentReplyWriteBox';
import {CREATE_REPLY_SUCCESS} from './ResponseCode';

class BoardComment extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'BoardComment';
        this.state = {
        	comment : this.props.comment,
        	written_time : this._toMyDate(this.props.comment.written_time),
            reply_count : 0,
        	replys : [],
        	replyWriteBox : [],
        	isOpenReplyBox : false,
        	isOpenReplyWriteBox : false
        };

        this._toMyDate = this._toMyDate.bind(this);
        this._changeIsOpenReplyBox = this._changeIsOpenReplyBox.bind(this);
        this._setReplyBox = this._setReplyBox.bind(this);
        this._changeIsOpenReplyWriteBox = this._changeIsOpenReplyWriteBox.bind(this);
        this._setReplyWriteBox = this._setReplyWriteBox.bind(this);
        this._addReply = this._addReply.bind(this);
        this._getData = this._getData.bind(this);
    }

    _changeIsOpenReplyBox(){
    	if(this.state.comment.reply_count === 0){
    		this.setState({
    			isOpenReplyBox : false,
    			replys : []
    		});
    	}
    	else{
    		if(this.state.isOpenReplyBox === true){
    			this.setState({
    				isOpenReplyBox : false,
    				replys : []
    			});
    		}
    		else{
    			this.setState({
    				isOpenReplyBox : true
    			}, () => this._setReplyBox());
    		}
    	}
    }

    _changeIsOpenReplyWriteBox(){
    	if(this.state.isOpenReplyWriteBox === false){
    		this.setState({
    			isOpenReplyWriteBox : true
    		}, () => this._setReplyWriteBox());
    	}
    	else{
    		this.setState({
    			isOpenReplyWriteBox : false,
    			replyWriteBox : []
    		});
    	}
    }

    _setReplyWriteBox(){
    	var newReplyWriteBox = [];
    	newReplyWriteBox.push(<BoardCommentReplyWriteBox createReply={this._addReply}/>);

    	this.setState({
    		replyWriteBox : newReplyWriteBox
    	});
    }
    
    _addReply(content){
        return axios({
                    method: "POST",
                    url: 'http://bad.watch/api/article-reply/write',
                    data: {
                        content: content,
                        comment_id: parseInt(this.state.comment.comment_id)
                    }
                 })
                .then((response) => {
                        let data = response.data;

                        if(data.responseCode == CREATE_REPLY_SUCCESS)
                        {   
                            this._setReplyBox();
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

    componentDidMount(){
        this._getData();
    }

    _getData(){
        var query = 'http://bad.watch/api/article-reply/';
        query += this.state.comment.comment_id;

        axios.get(query).then((response) => {
            let data = response.data;
            if(data.responseCode == 34) {
                let replyData = data.commentData;

                this.setState({
                    reply_count : replyData.length
                });
            }
            else{

            }
        })
    }

    _setReplyBox(){
    	var query = 'http://bad.watch/api/article-reply/';
    	query += this.state.comment.comment_id;

    	axios.get(query).then((response) => {
    		let data = response.data;
    		if(data.responseCode == 34)	{
    			let replyData = data.commentData;

    			var newReplyData = [];
    			var index;
    			for(index = 0; index < replyData.length; index++){
    				newReplyData.push(<pre>{replyData[index].content}      {this._toMyDate(replyData[index].written_time)}</pre>);
    			}

    			this.setState({
                    reply_count : replyData.length,
    				replys : newReplyData
    			});
    		}
    		else{

    		}
    	})
    }

    _toMyDate(written_time){
		var date = new Date(written_time);
		var dateToString = "";

		dateToString += date.getUTCFullYear();
		dateToString += '/';
		dateToString += this._toLeftPad(Number(date.getUTCMonth()) + Number(1));
		dateToString += '/';
		dateToString += this._toLeftPad(date.getUTCDate());
		dateToString += '  ';
		dateToString += this._toLeftPad(date.getUTCHours());
		dateToString += ':';
		dateToString += this._toLeftPad(date.getUTCMinutes());
		dateToString += ':';
		dateToString += this._toLeftPad(date.getUTCSeconds());
		
		return dateToString;
	}

	_toLeftPad(number){
		return number < 10 ? '0' + number : number;
	}

    render() {
        return(
        <div>
        	<a onClick={this._changeIsOpenReplyBox}>{this.state.comment.content}</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + {this.state.reply_count} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.written_time} &nbsp;&nbsp;&nbsp;&nbsp; <a onClick={this._changeIsOpenReplyWriteBox}> 답글달기 </a> <br/>
        	{this.state.replys}
        	{this.state.replyWriteBox}
        </div>
        );
    }
}

export default BoardComment;
