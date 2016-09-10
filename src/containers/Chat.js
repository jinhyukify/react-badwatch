import React from 'react';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Chat';
    }

    componentDidMount()
    {
        parent.history.back();
    }


    render() {
        return (
        		<div>
        			{this.props.children}
            	</div>
        	);
    }
}

export default Chat;
