import React from 'react';
import axios from 'axios';

class BoardCommentInput extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'BoardCommentInput';
        this.state = {
        	content : ""
        };

        this._handleChange = this._handleChange.bind(this);
        this._handleCreate = this._handleCreate.bind(this);
    }

    _handleChange(e){
    	this.setState({
    		content : e.target.value
    	});
    }

    _handleCreate(){
    	this.props.addComment(this.state.content)
    		.then((success) => {
    			if(success)
    			{
    				this.setState({
    					content: ''
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

export default BoardCommentInput;
