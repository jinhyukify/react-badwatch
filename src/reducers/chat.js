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
			return update(state, {
				[state.current_room]: {
					messages: {
						$push: [action.message]
					}
				}
			});
		case types.GET_CONNECTION_COUNT:
			return update(state, {
				[state.current_room] : {
					connection_count: {
						$set: action.count
					},
					room_userlist: {
						$set: action.userlist
					}
				}
			});
		case types.UPDATE_CURRENT_ROOM:
			return update(state, {
				current_room: {
					$set: action.room
				}
			});
		case types.CONNECTION_ADD:
			if(action.user)
			{
				return update(state, {
					[state.current_room]: {
						connection_count: {
							$set: action.count
						},
						room_userlist: {
							$push: [action.user]
						}
					}
				})	
			}
			else 
			{
				return update(state, {
					[state.current_room]: {
						connection_count: {
							$set: action.count
						}
					}
				})	
			}

		case types.CONNECTION_DELETE:
			if(action.user)
			{
				return update(state, {
					[state.current_room]: {
						connection_count: {
							$set: action.count
						},
						room_userlist: {
							$splice: [[state[state.current_room].room_userlist.indexOf(action.user), 1]]
						}
					}
				})
			}
			else
			{
				return update(state, {
					[state.current_room]: {
						connection_count: {
							$set: action.count
						}
					}
				})
			}
			
		case types.LEAVE_ROOM:
			return update(state, {
				[state.current_room]: {
					connection_count: {
						$set: 0
					},
					messages: {
						$set: 0
					},
					room_userlist: {
						$set: []
					}
				}
			})	
		default: 
			return state;	
	}
}