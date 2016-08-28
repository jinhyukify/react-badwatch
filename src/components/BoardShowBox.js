import React from 'react';
import axios from 'axios';
import BoardCommentBox from './BoardCommentBox';
import {LIKE_SUCCESS, DISLIKE_SUCCESS, DELETE_ARTICLE_SUCCESS} from './ResponseCode';
import {browserHistory} from 'react-router';

class BoardShowBox extends React.Component{
	constructor(props){
		super(props);
		this.displayName = 'BoardShowBox';
		this.state = {
			boardType : this.props.params.boardType,
			articleId : this.props.params.articleId,
			authentication : false,
			name : "",
			title : "",
			content : "",
			comment_count : 0,
			hit_count : 0,
			like_count : 0,
			like_status : false,
			year : 2016,
			month : 8,
			day : 22,
			hour : 0,
			minute : 0,
			second : 0,
			authenticationActions : [],
			written_time: ""
		};
		this._getData = this._getData.bind(this);
		this._toMyDate = this._toMyDate.bind(this);
		this._toLeftPad = this._toLeftPad.bind(this);
		this._like = this._like.bind(this);
		this._dislike = this._dislike.bind(this);
		this._addComment = this._addComment.bind(this);
		this._modify = this._modify.bind(this);
		this._delete = this._delete.bind(this);
		this._setAuthenticationActions = this._setAuthenticationActions.bind(this);
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

	_toMyDate(written_time){
		var date = new Date(written_time);

		this.setState({
			year : date.getUTCFullYear(),
			month : this._toLeftPad(Number(date.getUTCMonth()) + Number(1)),
			day : this._toLeftPad(date.getUTCDate()),
			hour : this._toLeftPad(date.getUTCHours()),
			minute : this._toLeftPad(date.getUTCMinutes()),
			second : this._toLeftPad(date.getUTCSeconds())
		})
	}

	_toLeftPad(number){
		return number < 10 ? '0' + number : number;
	}

	_setAuthenticationActions(){
		var actions = [];
		actions.push(<button onClick={this._modify}>수정</button>);
		action.push(<button onClick={this._delete}>삭제</button>);
	}

	_modify(){
		var url = "/board/modify/";
		url += this.state.boardType;
		url += "/";
		url += this.state.articleId;

		browserHistory.push(url);
		/*if(this.state.authentication === true){
			

		}
		else{
			sweetAlert("글 수정에 실패했습니다");
		}*/
	}

	_delete(){
		if(this.state.authentication === true){
			var query = "http://bad.watch/api/article/";
			query += this.state.articleId;
			query += "/delete";
			
			axios.get(query).then((response) => {
				let data = response.data;

				if(data.responseCode === DELETE_ARTICLE_SUCCESS){
					var url = '/board/';
					url += this.state.boardType;
					url += '/page/';
					url += 1;
					browserHistory.push(url);
				}
				else{
					sweetAlert("글 삭제에 실패했습니다.");
				}
			})
		}
		else{
			sweetAlert("글 삭제에 실패했습니다.");
		}
	}

	_like(){
		if(this.state.like_status === true){
			var query = "http://bad.watch/api/article-like/";
			query += this.state.articleId;

			axios.get(query).then((response) => {
				let data = response.data;
				if(data.responseCode == LIKE_SUCCESS){
					this.setState({
						like_count : this.like_count + 1
					});
				}
				else{
					sweetAlert("이미 좋아요를 누르셨습니다");
				}

			})
		}
		else{
			sweetAlert("로그인 후 이용가능합니다.");
		}
	}
	
	_dislike(){
		if(this.state.like_status === true){
			var query = "http://bad.watch/api/article-dislike/";
			query += this.state.articleId;

			axios.get(query).then((response) => {
				let data = response.data;
				
				if(data.responseCode == DISLIKE_SUCCESS){
					this.setState({
						like_count : this.like_count - 1
					});
				}
				else{
					sweetAlert("이전에 좋아요를 누르시지 않았습니다");
				}
			})
		}
		else{
			sweetAlert("로그인 후 이용가능합니다.");
		}
	}

	_addComment(content){
		return axios({
		         	method: "POST",
		         	url: 'http://bad.watch/api/article-comment/write',
		         	data: {
		         		content: content,
		         		article_id: parseInt(this.state.articleId)
		         	}
		         })
	   			.then((response) => {
			    		let data = response.data;
			    		if(data.responseCode == 28)
			    		{
			    			this.setState({
			    				comment_count : this.state.comment_count + 1
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


	componentDidMount(){
		this._getData();
	}

	_getData(){
		var query = 'http://bad.watch/api/article/';
		query += this.state.boardType;
		query += '/';
		query += this.state.articleId;

		axios.get(query).then((response) =>{
			let data = response.data;

			if(data.responseCode == 18){
				let articleData = data.articleData;

				var writter = articleData.name;
				if(writter === null){
					writter = "익명";
				}

				if(articleData.authentication === true)
					this._setAuthenticationActions();

				this.setState({
					authentication : articleData.authentication,
					name : writter,
					title : articleData.title,
					content : articleData.content,
					comment_count : articleData.comment_count,
					hit_count : articleData.hit_count,
					like_count : articleData.like_count,
					like_status : articleData.like_status,
					written_time: articleData.written_time
				},() => this._toMyDate(articleData.written_time));
			}
			else 
                {
                    sweetAlert(
                      '데이터를 불러오는데 오류가 발생했습니다.',
                      '잠시후 다시시도해주세요.',
                      'error'
                    )
                    return;
                }
		})
	}

	render(){
		const like_true = (
    			<div className="right">
    				<a onClick={this._like} className="pointer">
        				<img src="/asset/images/like-on.png"/>
        			</a>
    			</div>
    		);
    	const like_false = (
    			<div className="right">
    				<a onClick={this._dislike} className="pointer">
        				<img src="/asset/images/like-off.png"/>
        			</a>
    			</div>
    		);
		return(
			<div>
			 	<div className="youtube-title">
                    {this.state.title}
                </div>
                <div className="youtube-writer">
                    <span>글쓴이 : </span> {this.state.name? this.state.name: "익명"}<span className="youtube-date">{this._dateFormat(this.state.written_time)}</span>
                </div>
                <div className="youtube-container">
                	{this.state.content}
                </div>
				<div className="like-status">
        			{this.state.like_status? like_true: like_false}
                    <div className="siba">
                        <span className="like-count"><img src="/asset/images/like-icon.png"/></span>
                        <span>{this.state.like_count}</span> 
                        <span className="hit-count"><img src="/asset/images/hit-icon.png"/></span>
                        <span>{this.state.hit_count}</span>
                    </div>
        		</div>
				<BoardCommentBox articleId={this.state.articleId} addComment={this._addComment}
							     comment_count={this.state.comment_count}/>
			</div>
		);
	}
}

export default BoardShowBox;