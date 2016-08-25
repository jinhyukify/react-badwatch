import {
	GET_MESSAGE,
	GET_CONNECTION_COUNT,
	GET_ROOM_USERLIST,
	UPDATE_CURRENT_ROOM
} from './ActionTypes';

export function getMessage(message)
{
	return {
		type: GET_MESSAGE,
		message: message
	};
}

export function getConnectionCount(count)
{
	return {
		type: GET_CONNECTION_COUNT,
		count: count
	};
}