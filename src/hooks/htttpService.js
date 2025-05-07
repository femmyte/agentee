// import axios from 'axios';
// import { toast } from 'react-toastify';

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_OPEN_API_URL;
// // axios.defaults.baseURL = '/api';

// axios.interceptors.response.use(null, (error) => {
// 	const expectedError =
// 		error.response &&
// 		error.response.status >= 400 &&
// 		error.response.status >= 400 &&
// 		error.response.status < 500;

// 	// if it's an unexpected error
// 	if (!expectedError) {
// 		toast('Server error.');
// 	}

// 	return Promise.reject(error); // the error is sent to the catch block
// });

// const httpService = {
// 	get: axios.get,
// 	post: axios.post,
// 	put: axios.put,
// 	delete: axios.delete,
// };

// export default httpService;

import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		toast('Server error.');
	}

	return Promise.reject(error);
});

function request(method, url, data = {}, config = {}, type = 'open') {
	const BASE_URLS = {
		open: process.env.NEXT_PUBLIC_OPEN_API_URL,
		core: process.env.NEXT_PUBLIC_CORE_API_URL,
	};
	const baseURL = BASE_URLS[type] || '';
	console.log(baseURL);

	return axios({
		method,
		url,
		data,
		baseURL,
		...config,
	});
}

const httpService = {
	get: (url, config, type = 'core') => request('get', url, {}, config, type),
	post: (url, data, config, type = 'open') =>
		request('post', url, data, config, type),
	put: (url, data, config, type = 'core') =>
		request('put', url, data, config, type),
	delete: (url, config, type = 'core') =>
		request('delete', url, {}, config, type),
};

export default httpService;
