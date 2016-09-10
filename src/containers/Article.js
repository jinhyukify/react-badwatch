import React from 'react';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Article';
    }
    render() {
        return (
        		<div>
        			{this.props.children}
        		</div>
        	);
    }
}

export default Article;
