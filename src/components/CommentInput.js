import React from 'react';

class CommentInput extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CommentInput';
        this.state = {
        	"content": ''
        };
    	this._handleChange = this._handleChange.bind(this);
        this._handleCreate = this._handleCreate.bind(this);
    }

    _handleChange(e)
    {
    	this.setState({
    		content: e.target.value
    	});
    }

    _handleCreate()
    {
        if(!this.state.content) 
        {
             sweetAlert(
              '댓글을 입력해주세요.',
               'error'
             )
             return;
        }
    	this.props.onCreateComment(this.state.content)
    		.then((success) => {
    			if(success)
    			{
    				this.setState({
    					"content": ''
    				});
    			}
    		})
    }

    render() {
        return (
        		<div className="comment-input">
        			<input type="text" 
        				   name="comment_input" 
        				   value={this.state.content} 
        				   onChange={this._handleChange}
                           placeholder="답글입력"/>
        			<a className="waves-effect btn"
        			   onClick={this._handleCreate}>등록</a>	   
        		</div>
        	);
    }
}

CommentInput.propTypes = {
	onCreateComment: React.PropTypes.func
};

export default CommentInput;
