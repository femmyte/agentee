import http from './htttpService';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export function createAccount(url, data) {
	return http.post(url, data, config);
}

export function getUserInfo(id, accessToken) {
	return http.get(`/${apiPath}/${id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}
