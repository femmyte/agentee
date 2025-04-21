import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export function decodeToken() {
	// Check if the token exists in cookies
	if (!Cookies.get('authToken')) {
		console.error('No token found in cookies');
		return null;
	}
	const token = Cookies.get('authToken');
	// try {
	// 	const base64Payload = token.split('.')[1];
	// 	const payload = Buffer.from(base64Payload, 'base64').toString();
	// 	return JSON.parse(payload);
	// } catch (e) {
	// 	console.error('Failed to decode JWT manually:', e);
	// 	return null;
	// }
	try {
		const decoded = jwtDecode(token);
		console.log('Decoded JWT:', decoded);
		return decoded;
	} catch (error) {
		console.error('Invalid JWT Token:', error);
	}
}
