import React from 'react';
import axios from 'axios';

class BoardCommentReplyWriteBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'BoardCommentReplyWriteBox';
    	this.state = {
    		content : ""
    	};
    	this._handleChange = this._handleChange.bind(this);
    	this._handleWrite = this._handleWrite.bind(this);	
    }

    _handleChange(e){
    	this.setState({
    		content : e.target.value
    	});
    }

    _handleWrite(){

    		this.props.createReply(this.state.content)
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
        return(
        	<div>
        		<input type="text" 
        				   name="reply_input" 
        				   value={this.state.content} 
        				   onChange={this._handleChange}/>
        			<a className="waves-effect waves-light btn"
        			   onClick={this._handleWrite}>등록</a>	
       		</div>
        );
    }
}

export default BoardCommentReplyWriteBox;
