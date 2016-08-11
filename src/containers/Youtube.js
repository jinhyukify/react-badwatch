import React from 'react';
import axios from 'axios';

class Youtube extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Youtube';
    }

    render() {

        return (
        	<div>
        		{this.props.children}
        	</div>
        	);
    }
}

export default Youtube;
