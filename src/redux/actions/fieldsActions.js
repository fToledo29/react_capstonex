import * as actionTypes from './actionTypes';

export function loadFieldsSuccess(visits) {
	return { type: actionTypes.LOAD_FIELDS };
}

export function onChangeField(fieldId, enabled) {
	return { type: actionTypes.FIELD_CHANGE, fieldId, enabled };
}

export function loadFields() {
	return function (dispatch) {
		return dispatch(loadFieldsSuccess());
	};
}

export function changeField(fieldId, enabled) {
	return function (dispatch) {
		return dispatch(onChangeField(fieldId, enabled));
	};
}