import * as actionTypes from '../actions/actionTypes';

export default function productReducer(state = [], action) {
	switch (action.type) {
		case actionTypes.LOAD_PRODUCTS_SUCCESS:
			return action.products;
		case actionTypes.ADD_PRODUCT:
			return [
				...state, 
				Object.assign({}, action.product)
			];
		default:
			return state;
	}
}