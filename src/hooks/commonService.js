import http from './htttpService';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export function createAccount(url, data) {
	console.log('URL:', url);
	console.log('Data:', data);

	return http.post(url, data, config);
}

export function getUserInfo(id, accessToken) {
	return http.get(`/${apiPath}/${id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

export function fetchList(accessToken) {
	return http.get(`/${apiPath}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

export function getItem(id, accessToken) {
	return http.get(`/${apiPath}/${id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}
