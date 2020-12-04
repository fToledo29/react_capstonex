import * as actionTypes from '../actions/actionTypes';

let initialState = {
	fields: { 
		id: true,
		productName: true,
		description: true,
		manufacturer: true,
		quantity: true,
		price: true,
	},
	fieldsEnabled: []
}

export default function fieldsReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LOAD_FIELDS:
			return {
				...state,
			};
		default:
			return state;
	}
}