import axios from 'axios';
import uuid from 'uuidv4';

export default class ProductsApi {

	static saveProduct(product) {

		product.id = uuid();

		return axios.post('http://localhost:3004/products/', product).then(res => res.data);
	}

	static getAllProducts() {
		return axios.get('http://localhost:3004/products/').then(res => res.data);
	}
}