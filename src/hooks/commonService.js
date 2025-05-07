import http from './htttpService';

import axios from 'axios';

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

export function getUserInfo(apiPath, id, accessToken) {
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

export function coreList(apiPath, accessToken) {
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

export function coreGetItem(id, accessToken) {
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

export function openList(apiPath) {
	return http.get(`/${apiPath}`, 'open');
}

export function openGetItem(apiPath, id) {
	return http.get(`/${apiPath}/${id}`, {}, 'core');
}
