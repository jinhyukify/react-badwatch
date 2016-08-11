import React from 'react';
import { UserProfile, UserGameData } from './index';

class UserDataBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserDataBox';
    	this._handleQuick = this._handleQuick.bind(this);
    	this._handleRank = this._handleRank.bind(this);
    }

    _handleQuick()
    {
    	this.props.onQuick();
    }

    _handleRank()
    {
    	this.props.onRank();
    }


    render() {
        return (
        		<div>
	        		<UserProfile userData={this.props.userData}/>
	        		<UserGameData onQuick={this._handleQuick} 
	        			 		  onRank={this._handleRank}
	        			 		  quick_mode={this.props.quick_mode} 
	        			 		  userData={this.props.userData}/>
        		</div>
        	);
    }

}

UserDataBox.propTypes = {
	userData: React.PropTypes.object,
	onQuick: React.PropTypes.func,
	onRank: React.PropTypes.func,
	quick_mode: React.PropTypes.bool
};

export default UserDataBox;
