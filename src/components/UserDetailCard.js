import React from 'react';

class UserDetailCard extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserDetailCard';
    }
    render() {
        return (
        		<div className="col s6 m2">
        			{this.props.children}
        			<br/>
        			{this.props.data}
        			<div>
        				{this.props.average? "한게임 평균 " + this.props.average.toFixed(1): undefined}
        			</div>
        			<br/>
        		</div>
        	);
    }
}

UserDetailCard.propTypes = {
	data: React.PropTypes.any,
	average: React.PropTypes.any
};

export default UserDetailCard;
