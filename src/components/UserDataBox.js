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
        const before_load = (
                <div>
                    <br/><br/><br/><br/><br/><br/><br/>
                    <div className="progress wait">
                         <div className="indeterminate"></div>
                    </div>
                    <center>
                        <h2>
                            불러오는 중입니다.
                        </h2>
                    </center>
                </div>
            );
        const after_load = (
            <div className="row">
                <div className="col l1 tablet-hide mobile-hide">
                    <div className={`vertical-choose-1 ${this.props.quick_mode? "active": ""}`}
                         onClick={this._handleQuick}>
                        빠른대전
                    </div>
                    <div className={`vertical-choose-2 ${this.props.quick_mode? '': "active"}`}
                         onClick={this._handleRank}>
                        경쟁전
                    </div>
                </div>
                <div className="col l11">
                        <UserProfile userData={this.props.userData}/>
                        <UserGameData onQuick={this._handleQuick}
                                      onRank={this._handleRank}
                                      quick_mode={this.props.quick_mode} 
                                      userData={this.props.userData}/>
                </div>
             </div>       
            );
        return (
            <div>
            {Object.keys(this.props.userData.heros).length==0? before_load: after_load}   		
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
