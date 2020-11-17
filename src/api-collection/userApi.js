import axios from 'axios';
import uuidv4 from 'uuidv4';
export default class UserApi {

	static usersEndpoint = 'http://localhost:3004/users/';

	static saveUser(user) {

		user.id = uuidv4(); 

		return axios.post(this.usersEndpoint, user).then(res => {
			return res.data;
		}).catch(error => {

			console.log('[Error whwn calling endpoint "saveUser"]: ', error)
		});
	}

	static getAllUsers() {
		return axios.get(this.usersEndpoint).then(res => res.data);
	}

	static login(userName, pass) {
		return axios.get(`http://localhost:3004/users?userName=${userName}&password=${pass}`)
		.then(res => res.data);
	}
}