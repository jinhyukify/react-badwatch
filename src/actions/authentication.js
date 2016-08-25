import {
	AUTH_LOGIN,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_FAIL,
	AUTH_LOGOUT,
	AUTH_LOGOUT_SUCCESS
} from './ActionTypes';
import axios from 'axios';


export function loginRequest()
{
	return (dispatch) => {
		dispatch(login());

		return axios.post('http://bad.watch/api/session')
			.then((response) => {
				let data = response.data;
				if(data.responseCode == 42)
				{
					dispatch(loginSuccess(response.data.userData));
				}
				else
				{
					dispatch(loginFail());
				}
			}).catch((err) => {
				dispatch(loginFail());
			})
	}
}

export function logoutRequest()
{
	return (dispatch) => {
		dispatch(logout());

		return axios.post('http://bad.watch/api/logout')
			.then((response) => {
				let data = response.data;
				if(data.responseCode == 44)
				{
					dispatch(logoutSuccess());
				}
			}).catch((err) => {
				console.log(err);
			})
	}
}

export function login()
{
	return {
		type: AUTH_LOGIN
	}
}

export function loginSuccess(userData)
{
	return {
		type: AUTH_LOGIN_SUCCESS,
		current_user: userData
	};
}

export function loginFail()
{
	return {
		type: AUTH_LOGIN_FAIL
	};
}

export function logout()
{
	return {
		type: AUTH_LOGOUT
	}
}

export function logoutSuccess()
{
	return {
		type: AUTH_LOGOUT_SUCCESS
	}
}