import * as actionTypes from '../actions/actionTypes';

let initialState = {
	products: [],
	productsCopy: [],
	productToUpdate: {},
	productsToDelete: [],
	productViewMode: false,
}

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LOAD_PRODUCTS_SUCCESS:
			return {
				...state,
				products: action.products,
				productsCopy: [...action.products],
			};
		case actionTypes.ADD_PRODUCT: // TODO: Delete repeated code.
			return {
				...state,
				products: [
					...state.products, 
					Object.assign({}, action.product)
				],
			};
		case actionTypes.GET_PRODUCT:
			return {
				...state,
				products: [
					...state.products, 
					Object.assign({}, action.product)
				],
			};
		case actionTypes.PRODUCT_TO_UPDATE:
			return {
				...state,
				productToUpdate: action.product,
			};
		case actionTypes.PRODUCT_TO_DELETE:
			return {
				...state,
				productToUpdate: [],
				productsToDelete: [...state.productsToDelete, action.product],
				productViewMode: false,
			};
		case actionTypes.REMOVE_PRODUCT_FROM_LIST_TO_DELETE:
			return {
				...state,
				productToUpdate: [],
				productsToDelete: [...action.productsToDelete],
				productViewMode: false,
			};
		case actionTypes.CLEAR_PRODUCTS_TO_DELETE:
			return {
				...state,
				productToUpdate: [],
				productsToDelete: [],
				productViewMode: false,
			};
		case actionTypes.DELETE_PRODUCT:
			return {
				...state,
				products: [...action.products],
				productsCopy: [...action.products],
				productToUpdate: [],
				productViewMode: false,
			};
		case actionTypes.FILTER_PRODUCT:
			const products = [...state.products];
			const filter = action.productName ? new RegExp(action.productName) : null;
			return {
				...state,
				productsCopy: filter ? [...products.filter((product) => filter.test(product.productName))] : [...state.products],
				productToUpdate: [],
				productViewMode: false,
			};
		case actionTypes.VIEW_PRODUCT:
			return {
				...state,
				productsCopy: [],
				productToUpdate: [],
				productsToDelete: [],
				productViewMode: action.viewMode,
			};
		default:
			return state;
	}
}