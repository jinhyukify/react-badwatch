import {
	GET_MESSAGE,
	GET_CONNECTION_COUNT,
	GET_ROOM_USERLIST,
	UPDATE_CURRENT_ROOM,
	CONNECTION_ADD,
	CONNECTION_DELETE,
	LEAVE_ROOM
} from './ActionTypes';

export function getMessage(message)
{
	return {
		type: GET_MESSAGE,
		message: message
	};
}

export function getConnectionCount(count, userlist)
{
	return {
		type: GET_CONNECTION_COUNT,
		count: count,
		userlist: userlist
	};
}

export function updateCurrentRoom(room)
{
	return {
		type: UPDATE_CURRENT_ROOM,
		room: room
	};
}

export function addConnection(count, user)
{
	return {
		type: CONNECTION_ADD,
		count: count,
		user: user
	};
}

export function deleteConnection(count, user)
{
	return {
		type: CONNECTION_DELETE,
		count: count,
		user: user
	};
}

export function leaveRoom()
{
	return {
		type: LEAVE_ROOM
	};
}