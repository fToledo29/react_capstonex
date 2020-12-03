import * as actionTypes from '../actions/actionTypes';

let initialState = {
	user: {},
	loggedIn: false
}

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_USER:

			return {
				user: action.user[0],
				loggedIn: action.user.length > 0,
			};
		case actionTypes.SAVE_USER:
			return {
				user: action.user[0],
				loggedIn: action.user.length > 0,
			};
		case actionTypes.LOGOUT_USER:
			return {
				user: {},
				loggedIn: false,
			};
		case actionTypes.SESSION_ON:
			const userData = sessionStorage.getItem(actionTypes.LOGGED_IN_USER_DATA)
			return {
				user: action.sessionOn && !!userData ? JSON.parse(userData) : {},
				loggedIn: action.sessionOn && !!userData,
			};
		default:
			return state;
	}
}