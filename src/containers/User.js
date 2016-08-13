import React from 'react';
import axios from 'axios';
import { UserDataBox } from '../components';
class User extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'User';
        this.state = {
        	quickUserData: {},
        	rankUserData: {},
        	quick_mode: true
        };
        this._onQuick = this._onQuick.bind(this);
        this._onRank = this._onRank.bind(this);
    }

    _onQuick()
    {
    	if(this.state.quick_mode)
    		return;

    	this.setState({
    		quick_mode: true
    	});
    }

    _onRank()
    {
    	if(!this.state.quick_mode)
    		return;

 		if(!Object.keys(this.state.rankUserData).length) 
 		{
 			this._getUserRankData().then( data => {
 				this.setState({
 					rankUserData: data
 				});
 			})
 			.then(() => {
 				if(!this.state.rankUserData.rank_game_count)
		 		{
		 			/* 경쟁전을 한 적이 없음 */
		 			sweetAlert(
							  '',
							  '경쟁전 기록이 없습니다.',
							  'error'
							)
					return;
		 		}
		 		else 
		 		{
		 			this.setState({
		    			quick_mode: false
		    		});	
		 		}
		 		
 			})

 		}
 		else
 		{
 			if(!this.state.rankUserData.rank_game_count)
		 	{
		 		/* 경쟁전을 한 적이 없음 */
		 		sweetAlert(
						  '',
						  '경쟁전 기록이 없습니다.',
						  'error'
						)
				return;
		 	}
		 	else
		 	{
		 		this.setState({
		    			quick_mode: false
		    		});	
		 	}
 		}
 		
    }

    componentDidMount()	
    {
    	axios.get('http://bad.watch/api/user/quick/' + this.props.params.userName)
 			 .then( response => { 
 			 	let data = response.data;
 			 	 if(data.responseCode == 2)
 			 	 {
 			 	 	this.setState({
 			 	 		quickUserData: data.userData
 			 	 	});

 			 	 }
 			 	 else
 			 	 {
 			 	 	sweetAlert(
					  '데이터를 불러오는데 오류가 발생했습니다.',
					  '잠시후 다시시도해주세요.',
					  'error'
					)
					return;
 			 	 }
 			 })
 			 .catch( err => { 
 			 		sweetAlert(
					  '데이터를 불러오는데 오류가 발생했습니다.',
					  '잠시후 다시시도해주세요.',
					  'error'
					)
					return;
 			  })   	
    }

    _getUserRankData()
    {
    	return axios.get('http://bad.watch/api/user/rank/' + this.props.params.userName)
	 			 .then( response => { 
	 			 	let data = response.data;
	 			 	 if(data.responseCode == 2)
	 			 	 {
	 			 	 	return data.userData;

	 			 	 }
	 			 	 else
	 			 	 {
	 			 	 	sweetAlert(
						  '데이터를 불러오는데 오류가 발생했습니다.',
						  '잠시후 다시시도해주세요.',
						  'error'
						)
						return;
	 			 	 }
	 			 })
	 			 .catch( err => { 
	 			 		sweetAlert(
						  '데이터를 불러오는데 오류가 발생했습니다.',
						  '잠시후 다시시도해주세요.',
						  'error'
						)
						return;
	 			  })   	
    }

    render() {
        return (
        		<UserDataBox userData={this.state.quick_mode? this.state.quickUserData: this.state.rankUserData} 
        				     onQuick={this._onQuick} 
        				     onRank={this._onRank} 
        				     quick_mode={this.state.quick_mode} />
        	);
    }
}

export default User;