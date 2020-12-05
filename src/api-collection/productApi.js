import axios from 'axios';

let ids = 0;

export default class ProductsApi {

	static productsEndpoint = 'http://localhost:3004/products/';
	static visitsEndpoint = 'http://localhost:3004/visits/';

	static saveProduct(product) {

		product.id = ids + Math.floor(Math.random(100) * 9000); 

		return axios.post(this.productsEndpoint, product).then(res => {
			return res.data;
		}).catch(error => {

			console.log('[Error whwn calling endpoint "saveProduct"]: ', error)
		});
	}

	static getProduct(productId) {
		return axios.get(this.productsEndpoint + productId).then(res => {
			return res.data;
		}).catch(error => {

			console.log('[Error whwn calling endpoint "getProduct"]: ', error)
		});
	}

	static updateProduct(product) {
		return axios.patch(this.productsEndpoint + product.id, product).then(res => {
			return res.data;
		}).catch(error => {

			console.log('[Error whwn calling endpoint "updateProduct"]: ', error)
		});
	}

	static getAllVisits() {
		return axios.get(this.visitsEndpoint).then(res => {
			return res.data;
		}).catch(error => {

			console.log('[Error when getting "All Visits"]: ', error)
		});
	}

	static addVisit(visit) {
		visit.id = ids + Math.floor(Math.random(100) * 9000); 
		return axios.post(this.visitsEndpoint, visit).then(res => {
			return res.data;
		}).catch(error => {

			console.log('[Error when updating endpoint "visitsEndpoint"]: ', error)
		});
	}

	static updateVisits(visits) {
		return axios.patch(this.visitsEndpoint + visits.id, visits).then(res => {
			return res.data;
		}).catch(error => {

			console.log('[Error when updating endpoint "visitsEndpoint"]: ', error)
		});
	}

	static deleteVisits(visitId) {
		return axios.patch(this.visitsEndpoint + visitId).then(res => {
			return res.data;
		}).catch(error => {

			console.log('[Error when updating endpoint "visitsEndpoint"]: ', error)
		});
	}

	static getAllProducts() {
		return axios.get(this.productsEndpoint).then(res => {
			return res.data;
		}).catch(error => {

			console.log('[Error whwn calling endpoint "getAllProducts"]: ', error)
		});
	}

	static deleteProduct(data) {
		
		const path = 'http://localhost:3004/products/' + data;

		return axios.delete(path).then(res => {
			return res.data;
		}).catch(error => {

			console.log('[Error whwn calling endpoint "getAllProducts"]: ', error)
		});
	}
}