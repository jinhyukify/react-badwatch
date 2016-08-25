import React from 'react';
import axios from 'axios';
import {CREATE_ARTICLE_SUCCESS} from './ResponseCode';
import {browserHistory} from 'react-router';

class ArticleWrite extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title : "",
			content : "",
			boardType : "free"
		};
		this._changeBoardType = this._changeBoardType.bind(this);
		this._handleChangeTitle = this._handleChangeTitle.bind(this);
		this._handleChangeContent = this._handleChangeContent.bind(this);
		this._writeArticle = this._writeArticle.bind(this);
	}

	_handleChangeTitle(e){
		this.setState({
			title : e.target.value
		});
	}

	_handleChangeContent(e){
		this.setState({
			content : e.target.value
		});
	}

	_changeBoardType(e){
		this.setState({
			boardType : e.target.value
		});
	}

	_writeArticle(){
		axios({
			method: "POST",
			url: "http://bad.watch/api/article/write",
			data: {
				title: this.state.title,
				content: this.state.content,
				boardtype: this.state.boardType
			}
		}).then((response) => {
			let data = response.data;

			if(data.responseCode == CREATE_ARTICLE_SUCCESS){
				var query = '/board/';
					query += this.state.boardType;
					query += '/page/';
					query += 1;
				browserHistory.push(query);
			}
			else{

			}
		})
	}

	render(){
		return(
			<div>
				<select className = "browser-default" onChange={this._changeBoardType} value={this.state.boardType}>
    				<option value="free">자유게시판</option>
    				<option value="strategy">전략게시판</option>
  				</select>

  				제목 <input type="text" name="title" value={this.state.title} onChange={this._handleChangeTitle}/>
  				내용 <textarea name="content" value={this.state.content} onChange={this._handleChangeContent}/>
  				
                        <div className="modal-footer">
                          <a onClick={this._writeArticle} 
                             className="waves-effect waves-light btn">작성</a>
                        </div>
  			</div>
		);
	}
}
export default ArticleWrite;