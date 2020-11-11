import axios from 'axios';
import uuidv4 from 'uuidv4';
// import { uuid } from 'uuidv4';

export default class ProductsApi {

	static saveProduct(product) {

		product.id = uuidv4(); 

		// console.log('[Test - uuid]: ', uuid)

		// console.log('[Test - uuidv4]: ', uuidv4());

		return axios.post('http://localhost:3004/products/', product).then(res => res.data)
		.catch(error => {

			console.log('[Error calling endpoint products]: ', error)
		});
	}

	static getAllProducts() {
		return axios.get('http://localhost:3004/products/').then(res => res.data);
	}
}