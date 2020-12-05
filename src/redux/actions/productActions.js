import ProductsApi from '../../api-collection/productApi';
import * as actionTypes from './actionTypes';

export function addProductSuccess(product) {
	return { type: actionTypes.ADD_PRODUCT, product };
}

export function setProductToUpdate(product) {
	return { type: actionTypes.PRODUCT_TO_UPDATE, product };
}

export function clearProductsToDelete() {
	return { type: actionTypes.CLEAR_PRODUCTS_TO_DELETE, product: [] };
}

export function setProductToDelete(product) {
	return { type: actionTypes.PRODUCT_TO_DELETE, product };
}

export function removeFromListToDelete(productsToDelete) {
	return { type: actionTypes.REMOVE_PRODUCT_FROM_LIST_TO_DELETE, productsToDelete };
}

export function afterDeleteProduct(products) {
	return { type: actionTypes.DELETE_PRODUCT, products };
}

export function getProductSuccess(product) {
	return { type: actionTypes.PRODUCT_TO_UPDATE, product };
}

export function loadProductsSuccess(products) {
	return { type: actionTypes.LOAD_PRODUCTS_SUCCESS, products };
}

export function setViewModeProduct(viewMode) {
	return { type: actionTypes.VIEW_PRODUCT, viewMode };
}

export function addProductToDelete(productId) {
	return function (dispatch) {
		return dispatch(setProductToDelete(productId));
	};
}

export function viewModeProduct(viewMode) {
	return function (dispatch) {
		return dispatch(setViewModeProduct(viewMode));
	};
}

export function removeProductFromListToDelete(productId) {
	return function (dispatch) {
		return dispatch(removeFromListToDelete(productId));
	};
}

export function clearProductsToDeleteArray() {
	return function (dispatch) {
		return dispatch(clearProductsToDelete());
	};
}

export function addProduct(product) {
	return function (dispatch) {
		return ProductsApi.saveProduct(product).then((result) => {
			dispatch(addProductSuccess(result));
		})
		.catch(error => console.log('[Error adding new product]: ', error));
	};
}

export function getProduct(productID) {
	return function (dispatch) {
		return ProductsApi.getProduct(productID).then((result) => {
			dispatch(getProductSuccess(result));
		})
		.catch(error => console.log('[Error while getting product]: ', error));
	};
}

export function updateProduct(product) {
	return function (dispatch) {
		return ProductsApi.updateProduct(product).then((result) => {
			dispatch(getProductSuccess(result));
		})
		.catch(error => console.log('[Error while getting product]: ', error));
	};
}

export function loadProducts() {
	return function(dispatch) {
		return ProductsApi.getAllProducts().then(products => {
			dispatch(loadProductsSuccess(products));
		})
		.catch(error => console.log('[Error loading products]: ', error));
	}
}

export function deleteProduct(productsToDelete) {
	return async function(dispatch) {
		try {
			return await ProductsApi.deleteProduct(productsToDelete).then(products => {
				dispatch(loadProducts());
			})
			.catch(error => console.log('[Error deleting products]: ', error));

		} catch(err) {
			console.log('[Error in try catch calling delete API]: ', err)
		}
	}
}