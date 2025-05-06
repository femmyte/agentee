import axios from 'axios';

export const proxyRequest = ({
	endpoint,
	method = 'GET',
	data = {},
	type = 'core',
}) => {
	return axios.post('/api/proxy', {
		endpoint,
		method,
		data,
		type,
	});
};

// Convenience wrappers (optional)
export const proxyGet = (endpoint, type = 'core') =>
	proxyRequest({ endpoint, method: 'GET', type });

export const proxyPost = (endpoint, data, type = 'core') =>
	proxyRequest({ endpoint, method: 'POST', data, type });

export const proxyPut = (endpoint, data, type = 'core') =>
	proxyRequest({ endpoint, method: 'PUT', data, type });

export const proxyDelete = (endpoint, type = 'core') =>
	proxyRequest({ endpoint, method: 'DELETE', type });
