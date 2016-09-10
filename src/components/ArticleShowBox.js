import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ArticleCommentBox from './ArticleCommentBox';
import update from 'react-addons-update';

class ArticleShowBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ArticleShowBox';
        this.state = {
        	article: {}
        };
        this._onLike = this._onLike.bind(this);
        this._onDislike = this._onDislike.bind(this);
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

    _onLike()
    {
    	if(!this.props.authentication.status.isLoggedIn)
    	{
    		sweetAlert(
    			'',
				'로그인이 필요합니다.',
				'error'
			);
    		return;
    	}
    	if(this.state.article.like_status == false)
    	{
    		let url = "http://bad.watch/api/article-like/" + this.state.article.article_id;
    		axios.get(url)
    			.then((response) => {
    				let data = response.data;
    				if(data.responseCode == 50)
    				{
    					this.setState({
                            article: update(this.state.article, {
                                like_count: {
                                    $set: this.state.article.like_count + 1
                                },
                                like_status: {
                                    $set: true
                                }
                            })
    					})
    				}
    				else if(data.responseCode == 1)
    				{
    					sweetAlert(
    						'',
							'로그인이 필요합니다.',
							'error'
						);
						return;
    				}
    				else
    				{
    					sweetAlert(
    						'',
							'이미 좋아요를 누르셨습니다.',
							'error'
						);
						return;
    				}
    			})
    	}
    	else 
    	{
    		sweetAlert(
    			'',
				'이미 좋아요를 누르셨습니다.',
				'error'
			);
			return;
    	}
    }

    _onDislike()
    {
    	if(!this.props.authentication.status.isLoggedIn)
    	{
    		sweetAlert(
    			'',
				'로그인이 필요합니다.',
				'error'
			);
    		return;
    	}
    	if(this.state.article.like_status == true)
    	{
	    	let url = "http://bad.watch/api/article-dislike/" + this.state.article.article_id;
	    	axios.get(url)
	    		.then((response) => {
	    			let data = response.data;
	    			if(data.responseCode == 52)
	    			{
	    				this.setState({
                            article: update(this.state.article, {
                                like_count: {
                                    $set: this.state.article.like_count - 1
                                },
                                like_status: {
                                    $set: false
                                }
                            })
	    				});
	    			}
	    			else if(data.responseCode == 1)
	    			{
	    				sweetAlert(
	    					'',
							'로그인이 필요합니다.',
							'error'
						);
						return;
	    			}
	    			else
	    			{
	    				sweetAlert(
	    					'',
							'이미 좋아요를 취소했습니다.',
							'error'
						);
						return;
	    			}
	    		});
	    }
	    else 
	    {
	    	sweetAlert(
	    		'',
				'이미 좋아요를 취소했습니다.',
				'error'
			);
			return;
	    }		
    }

    componentDidMount()
    {
    	let url = "http://bad.watch/api/article/"+this.props.params.boardType + "/" + this.props.params.id;
    	axios.get(url)
    		.then((response) => {
    			let data = response.data;

    			if(data.responseCode == 18)
    			{
    				this.setState({
    					article: data.articleData
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
    		});
    }

    render() {
    	const like_true = (
    			<div className="right">
    				<a onClick={this._onDislike} className="pointer">
        				<img src="/asset/images/like-on.png"/>
        			</a>
    			</div>
    		);
    	const like_false = (
    			<div className="right">
    				<a onClick={this._onLike} className="pointer">
        				<img src="/asset/images/like-off.png"/>
        			</a>
    			</div>
    		);
        return (
        		<div>
        			<div className="youtube-title">
	                    {this.state.article.title}
	                </div>

	                <div className="youtube-writer">
	                    <span>글쓴이 : </span> 
	                    {this.state.article.name? this.state.article.name: "익명"}
	                    <span className="youtube-date">{this._dateFormat(this.state.article.written_time)}</span>
	                </div>

	                <div className="youtube-container">
	                	{this.state.article.content}
	                </div>

	                <div className="like-status">
	        			{this.state.article.like_status? like_true: like_false}
	                    <div className="siba">
	                        <span className="like-count"><img src="/asset/images/like-icon.png"/></span>
	                        <span>{this.state.article.like_count}</span> 
	                        <span className="hit-count"><img src="/asset/images/hit-icon.png"/></span>
	                        <span>{this.state.article.hit_count}</span>
	                    </div>
	        		</div>

	        		<ArticleCommentBox id={this.props.params.id}
                                       comment_count={this.state.article.comment_count}/>
        		</div>
        	);
    }
}

const mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	}
}

ArticleShowBox.propTypes = {

};

export default connect(mapStateToProps, undefined)(ArticleShowBox);
