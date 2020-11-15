import * as actionTypes from '../actions/actionTypes';

let initialState = {
	products: [],
	productToUpdate: {}
}

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LOAD_PRODUCTS_SUCCESS:
			return {
				products: action.products,
				productToUpdate: {},
			};
		case actionTypes.ADD_PRODUCT:
			return {
				products: [
					...state.products, 
					Object.assign({}, action.product)
				],
				productToUpdate: {},
			};
		case actionTypes.GET_PRODUCT:
			return {
				products: [
						...state.products, 
						Object.assign({}, action.product)
					],
				productToUpdate: {},
			};
		case actionTypes.PRODUCT_TO_UPDATE:
			return {
				products: [...state.products],
				productToUpdate: action.product
			};
		default:
			return state;
	}
}