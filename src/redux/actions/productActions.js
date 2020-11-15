import ProductsApi from '../../api-collection/productApi';
import * as actionTypes from './actionTypes';

export function addProductSuccess(product) {
	return { type: actionTypes.ADD_PRODUCT, product };
}

export function setProductToUpdate(product) {
	return {
		type: actionTypes.PRODUCT_TO_UPDATE,
		product
	};
}

export function getProductSuccess(product) {
	return { type: actionTypes.PRODUCT_TO_UPDATE, product };
}

export function loadProductsSuccess(products) {
	return { type: actionTypes.LOAD_PRODUCTS_SUCCESS, products };
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


export function loadProducts() {
	return function(dispatch) {
		return ProductsApi.getAllProducts().then(products => {
			dispatch(loadProductsSuccess(products));
		})
		.catch(error => console.log('[Error loading products]: ', error));
	}
}