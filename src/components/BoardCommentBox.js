import React from 'react';
import axios from 'axios';
import BoardComment from './BoardComment';
import BoardCommentInput from './BoardCommentInput';

class BoardCommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CommentBox';
        this.state = {
        	comments : [],
        	numberOfComments : 0,
        	numberOfCommentsPerPage : 20,
        	numberOfPagesPerView : 10,
        	numberOfPages : 0,
        	startPageNumber : 1,
        	endPageNumber : 1,
        	currentPageNumber : 1,
        	pageNumbers : [],
        	displayedComments : []
        };

        this._before = this._before.bind(this);
        this._next = this._next.bind(this);
        this._getData = this._getData.bind(this);
        this._setPageNumbers = this._setPageNumbers.bind(this);
        this._addComment = this._addComment.bind(this);
    }

    _changePage(pageNumber){
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
			tempPageNumbers.push(<button onClick={this._changePage.bind(this, i)} key={i}> {i} </button>);
		}
		tempPageNumbers.push(<button onClick={this._next}>{'>'}</button>);
		
		this.setState({
			pageNumbers : tempPageNumbers
		});
	}

    _addComment(content){
        return this.props.addComment(content).then((success) => {
            if(success){
                this.setState({
                    currentPageNumber : 1
                },() => this._getData());
                return true;
            }
            else{
                return false;
            }
        })
    }

	componentDidMount(){
		this._getData();
	}

	_getData(){
    	var query = 'http://bad.watch/api/article-comment/';
    	query += this.props.articleId;

    	axios.get(query).then((response) => {
    		let data = response.data;
                if(data.responseCode == 26)
                {
                	let endNumber, startNumber;
                	let numberOfComments = data.commentData.length;
                	let numberOfPages = parseInt((numberOfComments + Number(this.state.numberOfCommentsPerPage) - 1) / Number(this.state.numberOfCommentsPerPage));

                	for(startNumber = this.state.currentPageNumber; ; startNumber--){
                		if(startNumber <= 1)
                			break;
                		if(startNumber <= this.state.currentPageNumber - this.state.numberOfPagesPerView + 1)
                			break;
                		if(startNumber % this.state.numberOfPagesPerView == 1)
                			break;
                	}
                	
                	for(endNumber = this.state.currentPageNumber; ; endNumber++){
                		if(endNumber >= numberOfPages)
                			break;
                		if(endNumber >= this.state.currentPage + this.state.numberOfPagesPerView - 1)
                			break;
                		if(endNumber % this.state.numberOfPagesPerView == 0)
                			break;
                	}
              
                	var newDisplayedComments = [];
    				var index;

    				for(index = (numberOfComments - 1) - Number(this.state.currentPageNumber - Number(1)) * this.state.numberOfCommentsPerPage ; index > (numberOfComments - 1) - Number(this.state.currentPageNumber) * this.state.numberOfCommentsPerPage; index--){
    					if(index < 0)
    						break;
    					newDisplayedComments.push(data.commentData[index]);
    				}

                    this.setState({
                       	comments: data.commentData,
                       	numberOfComments : numberOfComments,
                       	numberOfPages : numberOfPages,
                       	startPageNumber : startNumber,
                       	endPageNumber : endNumber,
                       	displayedComments : newDisplayedComments
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



    render() {
        return (
        	<div className="comment-container">
            <div className="comment-box"><img src="/asset/images/comment-icon.png"/>댓글 {this.props.comment_count} 개</div>
        		<div>
					{this.state.displayedComments.map((comment) => {
                        return (
                                <BoardComment key={comment.comment_id}
                                             comment={comment}
                                           	/>
                            );
                    })}
				</div>
        		<BoardCommentInput addComment={this._addComment}/>
        	</div>
    	);
    }
}
export default BoardCommentBox;
