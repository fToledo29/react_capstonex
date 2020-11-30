import * as actionTypes from '../actions/actionTypes';

let initialState = {
	visits: [],
}

export default function visitsReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LOAD_VISITS:
			return {
				visits: [...action.visits],
			};
		case actionTypes.UPDATE_VISITS:
			return {
				visits: action.visits.length > 0 ? [...action.visits] : [...state.visits],
			};
		default:
			return state;
	}
}