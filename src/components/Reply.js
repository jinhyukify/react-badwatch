import React from 'react';

class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Reply';
    }
    render() {
    	const reply = this.props.reply;
        return (
        		<div>
        			{reply.content}<span className="red-text">[{reply.ip}]</span>
                    {reply.name? reply.name: "익명"}
        		</div>
        	);
    }
}

Reply.propTypes = {
	reply: React.PropTypes.object
};

export default Reply;
