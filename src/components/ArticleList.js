import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import ArticleTr from './ArticleTr.js';
class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ArticleList';
        this.state = {
        	articles: [],
        	numberOfArticlesPerPage: 16,
        	numberOfPagesPerView: 10,
        	pageNumbers: [],
        	current_page: 0,
        	numberOfPages: 1,
            current_boardType: "free"
        };
        this._changePage = this._changePage.bind(this);
   		this._getArticles = this._getArticles.bind(this);
   		this._before = this._before.bind(this);
   		this._next = this._next.bind(this);
        this._selectChange = this._selectChange.bind(this);
    }

    _before()
    {
    	if(this.state.pageNumbers[0] == 1)
    		return;
    	this._changePage(this.state.pageNumbers[0]-1);
    }

    _next()
    {
    	if(this.state.pageNumbers[this.state.pageNumbers.length-1] >= this.state.numberOfPages )
    		return;
    	this._changePage(this.state.pageNumbers[this.state.pageNumbers.length-1]+1);
    }

    _changePage(pageNumber)
    {
    	let url = "/article/" + this.props.params.boardType + "?page=" + pageNumber;
    	browserHistory.push(url);
    }

    _selectChange(e)
    {
        if(e.target.value == this.props.params.boardType)
            return;

        let url = "/article/" + e.target.value + "?page=1";
        browserHistory.push(url);
    }

    componentDidMount()
    {
    	this._getArticles();	
    }

    componentDidUpdate(prevProps, prevState)
    {
    	if(prevProps.params.boardType != this.props.params.boardType || prevProps.location.query.page != this.props.location.query.page)
    	{
    		let board_list = ["free", "strategy"];
	    	if(!board_list.includes(this.props.params.boardType) || !this.props.location.query.page)
	    	{
	    		sweetAlert(
					'잘못된 접근입니다.',
					'error'
				)
				return false;
	    	}
	    	this.setState({
    			current_page: this.props.location.query.page,
                current_boardType: this.props.params.boardType
	    	});
	    	let url = "http://bad.watch/api/article/"+this.props.params.boardType + "?page="+this.props.location.query.page;
	    	axios.get(url)
	    		.then((response) => {
	    			let data = response.data;
	    			if(data.responseCode == 18)
	    			{
	    				
	    				let articleCount = data.articleCount;
	    				let pageCount = Math.ceil(articleCount / this.state.numberOfArticlesPerPage);
	    				let start = Math.floor( (this.props.location.query.page -1) / this.state.numberOfPagesPerView);
	    				let page_array = [];
	    				for(let i=(start*10)+1; i<=(start+1)*10; i++)
	    				{
	    					if(i <= pageCount)
	    						page_array.push(i);
	    				}
	    				this.setState({
	    					articles: data.articleData,
	    					pageNumbers: page_array,
	    					numberOfPages: pageCount
	    				});
	    			}
	    			else
	    			{
	    				sweetAlert(
							'게시물을 불러오는데 문제가 생겼습니다.',
							'error'
						);
						return;
	    			}
	    		})
    	}
    }

    _getArticles()
    {
    	let board_list = ["free", "strategy"];
    	if(!board_list.includes(this.props.params.boardType) || !this.props.location.query.page)
    	{
    		sweetAlert(
				'잘못된 접근입니다.',
				'error'
			)
			return false;
    	}
    	this.setState({
    		current_page: this.props.location.query.page,
            current_boardType: this.props.params.boardType
    	});
    	let url = "http://bad.watch/api/article/"+this.props.params.boardType + "?page="+this.props.location.query.page;
    	axios.get(url)
    		.then((response) => {
    			let data = response.data;
    			if(data.responseCode == 18)
    			{
    				let articleCount = data.articleCount;
    				let pageCount = Math.ceil(articleCount / this.state.numberOfArticlesPerPage);
    				let start = Math.floor( (this.props.location.query.page -1) / this.state.numberOfPagesPerView);
    				let page_array = [];
    				for(let i=(start*10)+1; i<=(start+1)*10; i++)
    				{
    					if(i <= pageCount)
    						page_array.push(i);
    				}
    				this.setState({
    					articles: data.articleData,
    					pageNumbers: page_array,
    					numberOfPages: pageCount
    				});
    			}
    			else
    			{
    				sweetAlert(
						'게시물을 불러오는데 문제가 생겼습니다.',
						'error'
					);
					return;
    			}
    		})
    }

    render() {
        return (
        		<div className="board-top">
                <Link to ={"/article/" + this.props.params.boardType + "/write"} className = "waves-effect waves-light btn right">글쓰기</Link>
                <select className="browser-default"
                        onChange={this._selectChange}
                        value={this.state.current_boardType}>
                    <option value="free">자유게시판</option>
                    <option value="strategy">전략게시판</option>
                </select>
        		<br/>
        		<div>
        			<table className="article-table">
        				<thead>
							<tr>
								<td className="mobile-hide">카테고리</td>
								<td>제목</td>
								<td>작성자</td>
								<td className="mobile-hide">조회수</td>
								<td className="mobile-hide">추천수</td>
								<td className="mobile-hide">등록일</td>
							</tr>
						</thead>
						<tbody>
							{this.state.articles.map((article) => {
		                        return (
		                                <ArticleTr key={article.article_id}
		                                           article={article}
		                                           boardType={this.props.params.boardType}/>
		                            );
                    		})}
						</tbody>
        			</table>
        		</div>
        		<br/>
        		<center>
        			<ul className="pagination">
        				<li onClick={this._before}><a><i className="material-icons">chevron_left</i></a></li>
        				{this.state.pageNumbers.map((page) => {
        					return (
        							<li className={`waves-effect ${this.state.current_page==page? 'active': ''}`} 
        							    onClick={this._changePage.bind(this, page)} 
        							    key={page}>
        							    <a>
        							    {page}
        							    </a>
        							</li>
        						);
        				})}
        				<li onClick={this._next}><a><i className="material-icons">chevron_right</i></a></li>
        			</ul>
        		</center>
        			
        		</div>
        	);
    }
}

export default ArticleList;
