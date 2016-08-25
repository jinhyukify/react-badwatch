import React from 'react';

class Board extends React.Component{
	constructor(props) {
        super(props);
        this.displayName = 'Board';
    }

    render() {

        return (
        	<div>
        		{this.props.children}
        	</div>
        	);
    }
}

export default Board;