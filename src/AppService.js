import axios from 'axios';

export default {
	getAPIDetails() {
		return new Promise(function(resolve,reject) {
			axios.get('http://pb-api.herokuapp.com/bars')
				.then((response) => {
					resolve(response.data)
				})
				.catch((error) => {
					reject(error)
				})
		})

	}
 }