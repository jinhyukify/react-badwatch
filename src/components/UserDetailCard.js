import React from 'react';

class UserDetailCard extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserDetailCard';
    }
    render() {
        return (
        		<div className="col s6 h2 user-detail">
                    <div className="data-title">
        			{this.props.children}
                    </div>

        		    <div className="real-data">
                        {this.props.data}
                    </div>

        			<div className="box-average">
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
