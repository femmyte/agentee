import http from './htttpService';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export function createAccount(url, data) {
	console.log('URL:', url);
	console.log('Data:', data);

	return http.post(url, data, config, 'open');
}

export function OpenPost(url, data) {
	return http.post(url, data, config, 'open');
}

export function AuthPost(url, data, accessToken) {
	return http.post(
		url,
		data,
		{
			headers: {
				Authorization: `${accessToken}`,
			},
		},
		'core'
	);
}

export function InviteAgent(url, data, accessToken) {
	return http.post(
		url,
		data,
		{
			headers: {
				Authorization: `${accessToken}`,
			},
		},
		'open'
	);
}

export function UpdatePassword(url, data, accessToken) {
	return http.post(
		url,
		data,
		{
			headers: {
				Authorization: `${accessToken}`,
			},
		},
		'open'
	);
}

export function getUserInfo(id, accessToken) {
	return http.get(
		`/${apiPath}/${id}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
		'core'
	);
}

export function fetchList(accessToken) {
	return http.get(
		`/${apiPath}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
		'core'
	);
}

export function getItem(id, accessToken) {
	return http.get(
		`/${apiPath}/${id}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
		'core'
	);
}
