import React from 'react';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserProfile';
    }
    render() {
        return (
	        	<div>
	        		<div>
		        		<img className="user-profile-img"
		        			 src={this.props.userData.avatar} />
		        		<div>{this.props.userData.name}#{this.props.userData.battletag}<span>Lv {this.props.userData.level}</span></div>
		        		
		        		<div>{this.props.userData.point}점</div>
	        		</div>
	        		<div className="clear">
						<h5 className="center-align">한줄평가</h5>
					</div>
	        	</div>	
        	);
    }
}

UserProfile.propTypes = {
	userData: React.PropTypes.object
};

export default UserProfile;
