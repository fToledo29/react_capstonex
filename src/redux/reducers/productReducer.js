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
				products: action.products,
				productsCopy: [...action.products],
				productToUpdate: {},
				productsToDelete: [...state.productsToDelete],
				productViewMode: false,
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
				productViewMode: false,
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
				productViewMode: false,
			};
		case actionTypes.PRODUCT_TO_UPDATE:
			return {
				products: [...state.products],
				productsCopy: [],
				productToUpdate: action.product,
				productsToDelete: [],
				productViewMode: false,
			};
		case actionTypes.PRODUCT_TO_DELETE:
			return {
				products: [...state.products],
				productsCopy: [...state.products],
				productToUpdate: [],
				productsToDelete: [...state.productsToDelete, action.product],
				productViewMode: false,
			};
		case actionTypes.REMOVE_PRODUCT_FROM_LIST_TO_DELETE:
			return {
				products: [...state.products],
				productsCopy: [...state.products],
				productToUpdate: [],
				productsToDelete: [...action.productsToDelete],
				productViewMode: false,
			};
		case actionTypes.CLEAR_PRODUCTS_TO_DELETE:
			return {
				products: [...state.products],
				productsCopy: [...state.products],
				productToUpdate: [],
				productsToDelete: [],
				productViewMode: false,
			};
		case actionTypes.DELETE_PRODUCT:
			return {
				products: [...action.products],
				productsCopy: [...action.products],
				productToUpdate: [],
				productsToDelete: [...state.productsToDelete],
				productViewMode: false,
			};
		case actionTypes.FILTER_PRODUCT:
			const products = [...state.products];
			const filter = action.productName ? new RegExp(action.productName) : null;
			return {
				products: [...state.products],
				productsCopy: filter ? [...products.filter((product) => filter.test(product.productName))] : [...state.products],
				productToUpdate: [],
				productsToDelete: [...state.productsToDelete],
				productViewMode: false,
			};
		case actionTypes.VIEW_PRODUCT:
			return {
				products: [...state.products],
				productsCopy: [],
				productToUpdate: [],
				productsToDelete: [],
				productViewMode: action.viewMode,
			};
		default:
			return state;
	}
}