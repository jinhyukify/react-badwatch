import authentication from './authentication';
import youtubes from './youtubes';
import chat from './chat';
import { combineReducers } from 'redux';

export default combineReducers({
	authentication,
	youtubes,
	chat
});