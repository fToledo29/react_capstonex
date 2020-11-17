import * as actionTypes from '../actions/actionTypes';

let initialState = {
	user: {},
	loggedIn: false
}

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_USER:
			return {
				user: action.user,
				loggedIn: !!action.user,
			};
		case actionTypes.SAVE_USER:
			return {
				user: action.user,
				loggedIn: !!action.user,
			};
		default:
			return state;
	}
}