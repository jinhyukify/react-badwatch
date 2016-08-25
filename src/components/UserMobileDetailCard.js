import React from 'react';

class UserMobileDetailCard extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserMobileDetailCard';
    }
    render() {
        return (
        		<div>
        			<div className="real-title">
	                    <span className="list-circle"></span>
	        			{this.props.children}
        			</div>
        		    <div className="real-data">
                        {this.props.data}
                    </div>
        			<br/>
        		</div>
        	);
    }
}

export default UserMobileDetailCard;
