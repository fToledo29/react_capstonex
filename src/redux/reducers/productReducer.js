import * as actionTypes from '../actions/actionTypes';

let initialState = {
	products: [],
	productsCopy: [],
	productToUpdate: {},
	productsToDelete: [],
}

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LOAD_PRODUCTS_SUCCESS:
			return {
				products: action.products,
				productsCopy: [...action.products],
				productToUpdate: {},
				productsToDelete: [...state.productsToDelete],
			};
		case actionTypes.ADD_PRODUCT: // TODO: Delete repeated code.
			return {
				products: [
					...state.products, 
					Object.assign({}, action.product)
				],
				productsCopy: [...state.products],
				productToUpdate: {},
				productsToDelete: [],
			};
		case actionTypes.GET_PRODUCT:
			return {
				products: [
					...state.products, 
					Object.assign({}, action.product)
				],
				productsCopy: [...state.products],
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
				productsCopy: [...state.products],
				productToUpdate: [],
				productsToDelete: [...state.productsToDelete, action.product],
			};
		case actionTypes.CLEAR_PRODUCTS_TO_DELETE:
			return {
				products: [...state.products],
				productsCopy: [...state.products],
				productToUpdate: [],
				productsToDelete: [],
			};
		case actionTypes.DELETE_PRODUCT:
			return {
				products: [...action.products],
				productsCopy: [...action.products],
				productToUpdate: [],
				productsToDelete: [...state.productsToDelete],
			};
		case actionTypes.FILTER_PRODUCT:
			const products = [...state.products];
			const filter = action.productName ? new RegExp(action.productName) : null;
			return {
				products: [...state.products],
				productsCopy: filter ? [...products.filter((product) => filter.test(product.productName))] : [...state.products],
				productToUpdate: [],
				productsToDelete: [...state.productsToDelete],
			};
		default:
			return state;
	}
}