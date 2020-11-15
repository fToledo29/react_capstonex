import UserApi from '../../api-collection/userApi';
import * as actionTypes from './actionTypes';

export function loadUserData(user) {
	return { type: actionTypes.GET_USER, user };
}

export function getUser(userName, pass) {
	return function(dispatch) {
		return UserApi.login(userName, pass).then(user => {
			dispatch(loadUserData(user));
		})
		.catch(error => console.log('[Error loading products]: ', error));
	}
}