import UserApi from '../../api-collection/userApi';
import * as actionTypes from './actionTypes';

export function loadUserData(user) {
	return { type: actionTypes.GET_USER, user };
}

export function saveUserSuccess(user) {
	return { type: actionTypes.SAVE_USER, user };
}

export function getUser(userName, pass) {

	const session = sessionStorage.getItem(actionTypes.LOGGED_IN_USER);

	return function(dispatch) {
		return UserApi.login(userName, pass).then(user => {
			dispatch(loadUserData(user));
		})
		.catch(error => console.log('[Error loading products]: ', error));
	}
}

export function saveUser(user) {
	return function(dispatch) {
		return UserApi.saveUser(user).then(user => {
			dispatch(saveUserSuccess(user));
		})
		.catch(error => console.log('[Error loading products]: ', error));
	}
}