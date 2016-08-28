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
                    <div className="relative-choose">
            			<span onClick={this._handleQuick} 
            			      className={this.props.quick_mode? "mode active": "mode"}>빠른대전</span>
            			<span onClick={this._handleRank}
        				  className={this.props.quick_mode? "mode mode-right": "mode active mode-right"}>경쟁전</span>
                    </div>
        			<UserDetailBox userData={this.props.userData} 
        						    quick_mode={this.props.quick_mode}
                                    onQuick={this.props.onQuick}
                                    onRank={this.props.onRank}/>
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
