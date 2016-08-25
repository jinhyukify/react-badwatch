import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const chatInitialState = {
	current_room: 'bronze', 
	bronze: {
		connection_count: 0,
		messages: [],
		room_userlist: []
	},
	silver: {
		connection_count: 0,
		messages: [],
		room_userlist: []
	},
	gold: {
		connection_count: 0,
		messages: [],
		room_userlist: []
	},
	platinum: {
		connection_count: 0,
		messages: [],
		room_userlist: []
	},
	diamond: {
		connection_count: 0,
		messages: [],
		room_userlist: []
	}
};

export default function chat(state = chatInitialState, action)
{
	switch(action.type)
	{
		case types.GET_MESSAGE:
			return update(state[state.current_room], {
				messages: {
					$push: action.message
				}
			});
		case types.GET_CONNECTION_COUNT:
			return update(state[state.current_room], {
				connection_count: {
					$set: action.count
				}
			});
		default: 
			return state;	
	}
}