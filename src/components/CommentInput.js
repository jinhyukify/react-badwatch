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
        		<div>
        			<input type="text" 
        				   name="comment_input" 
        				   value={this.state.content} 
        				   onChange={this._handleChange}/>
        			<a className="waves-effect waves-light btn"
        			   onClick={this._handleCreate}>등록</a>	   
        		</div>
        	);
    }
}

CommentInput.propTypes = {
	onCreateComment: React.PropTypes.func
};

export default CommentInput;
