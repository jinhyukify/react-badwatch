import {
	GET_YOUTUBES,
	GET_YOUTUBES_SUCCESS,
	GET_YOUTUBES_FAIL
} from './ActionTypes';
import axios from 'axios';

export function getYoutubes(page, order)
{
	return (dispatch) => {
		dispatch(startGetYoutubes());

		return axios.get('http://bad.watch/api/youtube-list?page='+page+"&order="+order)
			.then((response) => {
				let data = response.data;
				if(data.responseCode == 6)
				{
					dispatch(getYoutubesSuccess(order, data.youtubeData));
				}
				else
				{
					console.log("fail");
					dispatch(getYoutubesFail());
				}
			}).catch(err => {
				console.log(err);
				dispatch(getYoutubesFail());
			})

	};
}

export function startGetYoutubes()
{
	return {
		type: GET_YOUTUBES
	};
}

export function getYoutubesSuccess(order, youtubes)
{	
	return {
		type: GET_YOUTUBES_SUCCESS,
		youtubes: youtubes,
		order: order
	};
}

export function getYoutubesFail()
{
	return {
		type: GET_YOUTUBES_FAIL
	};
}