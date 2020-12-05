import UserApi from '../../api-collection/userApi';
import * as actionTypes from './actionTypes';

export function loadUserData(user) {
	return { type: actionTypes.GET_USER, user };
}

export function saveUserSuccess(user) {
	return { type: actionTypes.SAVE_USER, user };
}

export function onLogoutUser() {
	return { type: actionTypes.LOGOUT_USER };
}

export function sessionOn(sessionOn) {
	return { type: actionTypes.SESSION_ON, sessionOn };
}

export function logoutUser() {
	return function(dispatch) {
		return new Promise((resolve, reject) => {
			sessionStorage.setItem(actionTypes.LOGGED_IN_USER, false);

			sessionStorage.setItem(actionTypes.LOGGED_IN_USER_DATA, '');
			
			resolve(dispatch(onLogoutUser()));
		});
	};
}

export function keepSessionOn(keepSession) {
	return function(dispatch) {
		return new Promise((resolve, reject) => {
			resolve(dispatch(sessionOn(keepSession)));
		});
	};
}

export function loginUser(userName, pass) {

	return function(dispatch) {
		return UserApi.login(userName.toLowerCase(), pass).then(user => {

			const loggedin = !!user[0];

			sessionStorage.setItem(actionTypes.LOGGED_IN_USER, loggedin);

			if(loggedin) {
				sessionStorage.setItem(actionTypes.LOGGED_IN_USER_DATA, JSON.stringify(user[0]));
			}


			return dispatch(loadUserData(user));
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