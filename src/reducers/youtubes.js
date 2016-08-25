import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const youtubeInitialState = {
	status: 'INIT',
	new: {
		current_page: 0,
		isEnd: false,
		data: []
	},
	like: {
		current_page: 0,
		isEnd: false,
		data: []
	},
	hit: {
		current_page: 0,
		isEnd: false,
		data: []
	}
};


export default function youtubes(state, action)
{
	if(typeof state === "undefined")
		state = youtubeInitialState;

	switch(action.type)
	{
		case types.GET_YOUTUBES:
			return update(state, {
				status: {
					$set: 'WAITING'
				}
			});
		case types.GET_YOUTUBES_SUCCESS:
			let isEnd = false;
			if(action.youtubes.length < 16)
				isEnd =true;

			if(action.order == 'new')
			{
				return update(state, {
					status: {
						$set: 'SUCCESS'
					},
					new: {
						isEnd: {
							$set: isEnd
						},
						current_page: {
							$set: state.new.current_page + 1
						},
						data: {
							$set: state.new.data.concat(action.youtubes)
						}
					}
				});
			}
			else if(action.order == 'like')
			{
				return update(state, {
					status: {
						$set: 'SUCCESS'
					},
					like: {
						isEnd: {
							$set: isEnd
						},
						current_page: {
							$set: state.like.current_page + 1
						},
						data: {
							$set: state.like.data.concat(action.youtubes)
						}
					}
				});	
			}
			else if(action.order == 'hit')
			{
				return update(state, {
					status: {
						$set: 'SUCCESS'
					},
					hit: {
						isEnd: {
							$set: isEnd
						},
						current_page: {
							$set: state.hit.current_page + 1
						},
						data: {
							$set: state.hit.data.concat(action.youtubes)
						}
					}
				});	
			}	
			
			
		case types.GET_YOUTUBES_FAIL:
			return update(state, {
				status: {
					$set: 'FAIL'
				}
			});

		default:
            return state;	
	}
}