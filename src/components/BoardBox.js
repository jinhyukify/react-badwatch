import React from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import ArticleBox from './ArticleBox';

class BoardBox extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			articles : [],
			currentPageNumber : this.props.params.pageId,
			numberOfPages : 1,
			startPageNumber : 1,
			endPageNumber : 1,
			pageNumbers : [],
			numberOfPagesPerView : 10,
			numberOfArticlesPerPage : 16,
			boardType : this.props.params.boardType
		};
		this.displayName = 'BoardBox';

		this._getData = this._getData.bind(this);
		this._setPageNumbers = this._setPageNumbers.bind(this);
		this._before = this._before.bind(this);
		this._next = this._next.bind(this);
	}

	_changeBoardType(board){
		if(this.state.boardType === board);
		else{
			this.setState({
				boardType : board
			}, () => this._changePage(1));
		}
	}

	_changePage(pageNumber){
		var query = '/board/';
		query += this.state.boardType;
		query += '/page/';
		query += pageNumber;

		browserHistory.push(query);
		this.setState({
				currentPageNumber : pageNumber
			}, () => this._getData());
	}

	_before(){
		if(this.state.startPageNumber < this.state.numberOfPagesPerView);
		else
			this._changePage(Number(this.state.startPageNumber) - Number(1));
	}
	
	_next(){
		if(this.state.endPageNumber >= this.state.numberOfPages);
		else
			this._changePage(Number(this.state.endPageNumber) + Number(1));
	}

	_setPageNumbers(){

		var tempPageNumbers = [];
		tempPageNumbers.push(<button onClick={this._before}>{'<'}</button>);
		for(var i = this.state.startPageNumber ; i <= this.state.endPageNumber; i++){
			tempPageNumbers.push(<button onClick={this._changePage.bind(this, i)}> {i} </button>);
		}
		tempPageNumbers.push(<button onClick={this._next}>{'>'}</button>);
		
		this.setState({
			pageNumbers : tempPageNumbers
		});
	}

	componentDidMount()

    {	
        this._getData();
    }

    _getData(){
    	var query = 'http://bad.watch/api/article/';
    	query += this.state.boardType;
    	query += '?page=';
    	query += this.state.currentPageNumber;

    	axios.get(query).then((response) => {
    		let data = response.data;
                if(data.responseCode == 18)
                {
                	let endNumber, startNumber;
                	let numberOfPagesFromServer = parseInt((data.articleCount + Number(this.state.numberOfArticlesPerPage) - 1) / Number(this.state.numberOfArticlesPerPage));

                	for(startNumber = this.state.currentPageNumber; ; startNumber--){
                		if(startNumber <= 1)
                			break;
                		if(startNumber <= this.state.currentPageNumber - this.state.numberOfPagesPerView + 1)
                			break;
                		if(startNumber % this.state.numberOfPagesPerView == 1)
                			break;
                	}
                	
                	for(endNumber = this.state.currentPageNumber; ; endNumber++){
                		if(endNumber >= numberOfPagesFromServer)
                			break;
                		if(endNumber >= this.state.currentPage + this.state.numberOfPagesPerView - 1)
                			break;
                		if(endNumber % this.state.numberOfPagesPerView == 0)
                			break;
                	}

                    this.setState({
                       	articles: data.articleData,
                       	numberOfPages : numberOfPagesFromServer,
                       	startPageNumber : startNumber,
                       	endPageNumber : endNumber
                    }, () => this._setPageNumbers());
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
		return(
			<div>
				<a className = "modal-trigger waves-effect waves-light btn" onClick={this._changeBoardType.bind(this, 'free')}>자유게시판</a>
				<a className = "modal-trigger waves-effect waves-light btn" onClick={this._changeBoardType.bind(this, 'strategy')}>전략게시판</a>
				<p/>
				<div>
					{this.state.articles.map((article) => {
                        return (
                                <ArticleBox key={article.article_id}
                                             article={article}
                                             pageId={this.props.params.pageId}
                                             boardType={this.state.boardType}
                                           	/>
                            );
                    })}
				</div>
				<p/>
				<div>
					{this.state.pageNumbers}
				</div>
				<p/>
				<Link to ="/board/write" className = "modal-trigger waves-effect waves-light btn">글쓰기</Link>
			</div>
		)
	}
}

export default BoardBox;		