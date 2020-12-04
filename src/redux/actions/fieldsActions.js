import * as actionTypes from './actionTypes';

export function loadFieldsSuccess(visits) {
	return { type: actionTypes.LOAD_FIELDS };
}

export function loadFields() {
	return function (dispatch) {
		return dispatch(loadFieldsSuccess());
	};
}