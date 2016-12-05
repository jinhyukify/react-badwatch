import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {MODIFY_ARTICLE_SUCCESS} from './ResponseCode';

class ArticleModify extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ArticleModify';
        this.state = {
        	articleId : this.props.params.articleId,
        	title : "",
        	content : "",
        	boardType : this.props.params.boardType
        }

		this._changeBoardType = this._changeBoardType.bind(this);
		this._handleChangeTitle = this._handleChangeTitle.bind(this);
		this._handleChangeContent = this._handleChangeContent.bind(this);
		this._writeArticle = this._writeArticle.bind(this);
		this._getData = this._getData.bind(this);
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

				this.setState({
					title : articleData.title,
					content : articleData.content
				});
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

	_writeArticle(){
		var url = "http://bad.watch/api/article/";
		url += this.state.articleId;
		url += "/modify";

		axios({
			method: "PUT",
			url: url,
			data: {
				title: this.state.title,
				content: this.state.content,
				boardtype: this.state.boardType
			}
		}).then((response) => {
			let data = response.data;

			if(data.responseCode == MODIFY_ARTICLE_SUCCESS){
				var query = '/board/';
				query += this.state.boardType;
				query += '/page/';
				query += 1; 
				
				browserHistory.push(query);
			}
			else{
				sweetAlert("글 수정 에러");
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
                             className="waves-effect waves-light btn">수정</a>
                        </div>
			</div>
		);
	}
}

export default ArticleModify;
