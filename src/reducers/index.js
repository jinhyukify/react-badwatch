import authentication from './authentication';
import youtubes from './youtubes';
import { combineReducers } from 'redux';

export default combineReducers({
	authentication,
	youtubes
});