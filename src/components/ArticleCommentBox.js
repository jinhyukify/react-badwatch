import React from 'react';
import axios from 'axios';
import ArticleComment from './ArticleComment';
import CommentInput from './CommentInput';
import update from 'react-addons-update';
class ArticleCommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ArticleCommentBox';
        this.state = {
            comments: []
        };
        this._onCreateComment = this._onCreateComment.bind(this);
        this._handleReplyCount = this._handleReplyCount.bind(this);
    }

    _handleReplyCount(id)
    {
        var index = this.state.comments.findIndex((comment) => {
            return comment.comment_id == id
        })
        this.setState({
            comments: update(this.state.comments, {
                [index]: {
                    reply_count: { $set: this.state.comments[index].reply_count + 1 }
                }
             })   
            })
    }

    _onCreateComment(content)
    {
        return axios({
            method: "POST",
            url: "http://bad.watch/api/article-comment/write",
            data: {
                content: content,
                article_id: parseInt(this.props.id)
            }
        })
        .then((response) => {
            let data = response.data;
            if(data.responseCode == 28)
            {
                this.setState({
                    comments: update(this.state.comments, {
                        $push: [data.commentData]
                    })
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

    componentDidMount()
    {
        let url = 'http://bad.watch/api/article-comment/' + this.props.id;
    
        axios.get(url)
            .then((response) => {
                let data = response.data;
                if(data.responseCode == 26)
                {
                    this.setState({
                        comments: data.commentData
                    });
                }
                else 
                {
                    sweetAlert(
                      '댓글을 불러오는데 오류가 발생했습니다.',
                      'error'
                    )
                    return;
                }
            })
    }

    render() {
        return (
        		<div className="comment-container">
        			<div className="comment-box">
                        <img src="/asset/images/comment-icon.png"/>댓글 {this.props.comment_count} 개  
                    </div>
                    <div>
                        {this.state.comments.map((comment) => {
                            return (
                                    <ArticleComment key={comment.comment_id}
                                                    comment={comment}
                                                    handleReplyCount={this._handleReplyCount} />
                                );
                        })}
                    </div>
                    <CommentInput onCreateComment={this._onCreateComment}/>
        		</div>
        	);
    }
}

ArticleCommentBox.propTypes = {
	comment_count: React.PropTypes.number,
    id: React.PropTypes.string
};

export default ArticleCommentBox;
