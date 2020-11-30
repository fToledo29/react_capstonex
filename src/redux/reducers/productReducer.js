import * as actionTypes from '../actions/actionTypes';

let initialState = {
	products: [],
	productToUpdate: {},
	productsToDelete: [],
}

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LOAD_PRODUCTS_SUCCESS:
			return {
				products: action.products,
				productToUpdate: {},
				productsToDelete: [...state.productsToDelete],
			};
		case actionTypes.ADD_PRODUCT:
			return {
				products: [
					...state.products, 
					Object.assign({}, action.product)
				],
				productToUpdate: {},
				productsToDelete: [],
			};
		case actionTypes.GET_PRODUCT:
			return {
				products: [
						...state.products, 
						Object.assign({}, action.product)
					],
				productToUpdate: {},
				productsToDelete: [],
			};
		case actionTypes.PRODUCT_TO_UPDATE:
			return {
				products: [...state.products],
				productToUpdate: action.product,
				productsToDelete: [],
			};
		case actionTypes.PRODUCT_TO_DELETE:
			return {
				products: [...state.products],
				productToUpdate: state.product,
				productsToDelete: [...state.productsToDelete, action.product],
			};
		case actionTypes.CLEAR_PRODUCTS_TO_DELETE:
			return {
				products: [...state.products],
				productToUpdate: state.product,
				productsToDelete: [],
			};
		case actionTypes.DELETE_PRODUCT:
			return {
				products: [...action.products],
				productToUpdate: state.product,
				productsToDelete: [...state.productsToDelete],
			};
		default:
			return state;
	}
}