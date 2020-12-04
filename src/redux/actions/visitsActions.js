import ProductsApi from '../../api-collection/productApi';
import * as actionTypes from './actionTypes';

export function updateVisitsSuccess(visits) {
	return { type: actionTypes.UPDATE_VISITS, visits };
}

export function deleteVisitsSuccess() {
	return { type: actionTypes.DELETE_VISIT };
}

export function loadVisitsSuccess(visits) {
	return { type: actionTypes.LOAD_VISITS, visits };
}

export function filterProducts(productName) {
	return { type: actionTypes.FILTER_PRODUCT, productName };
}

export function getVisits() {
	return function (dispatch) {
		return ProductsApi.getAllVisits().then((result) => {
			dispatch(loadVisitsSuccess(result));
		})
		.catch(error => {
			console.log('[Error while getting visits]: ', error);
		});
	};
}

export function addVisit(visit) {
	return function (dispatch) {
		return ProductsApi.addVisit(visit).then((result) => {
			dispatch(updateVisitsSuccess(result));
		})
		.catch(error => {
			console.log('[Error while updating visits]: ', error);
		});
	};
}

export function updateVisits(visits) {
	return function (dispatch) {
		return ProductsApi.updateVisits(visits).then((result) => {
			dispatch(updateVisitsSuccess(result));
		})
		.catch(error => {
			console.log('[Error while updating visits]: ', error);
		});
	};
}

export function deleteVisits(visitId) {
	return function (dispatch) {
		return ProductsApi.deleteVisits(visitId).then(() => {
			// dispatch(deleteVisitsSuccess());
			getVisits();
		})
		.catch(error => {
			console.log('[Error while updating visits]: ', error);
		});
	};
}