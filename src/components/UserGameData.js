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
                    <div className={`mode-choose-1 ${this.props.quick_mode? "active": ''}`}
                         onClick={this._handleQuick}>
                        빠른대전
                    </div>
                    <div className={`mode-choose-2 ${this.props.quick_mode? '': "active"}`}
                         onClick={this._handleRank}>
                        경쟁전
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
