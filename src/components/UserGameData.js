import React from 'react';
import UserDetailBox from './UserDetailBox';
class UserGameData extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserGameData';
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
        			<span onClick={this._handleQuick} 
        			      className={this.props.quick_mode? "mode active": "mode"}>빠른대전</span>
        			<span onClick={this._handleRank}
        				  className={this.props.quick_mode? "mode": "mode active"}>경쟁전</span>
        			<UserDetailBox userData={this.props.userData} 
        						    quick_mode={this.props.quick_mode}/>
        		</div>
        	);
    }
}

UserGameData.propTypes = {
	userData: React.PropTypes.object,
	onQuick: React.PropTypes.func,
	onRank: React.PropTypes.func,
	quick_mode: React.PropTypes.bool 
};


export default UserGameData;