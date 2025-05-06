import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BASE_URLS = {
	open: process.env.NEXT_PUBLIC_OPEN_API_URL,
	core: process.env.NEXT_PUBLIC_CORE_API_URL,
};

export async function POST(req) {
	const cookieStore = cookies();
	const token = cookieStore.get('accessToken')?.value;

	if (!token) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const {
		endpoint,
		data = {},
		method = 'GET',
		type = 'core',
	} = await req.json();
	const baseURL = BASE_URLS[type] || '';
	const fullURL = `${baseURL}${endpoint}`;

	try {
		console.log(token);

		const res = await fetch(fullURL, {
			method,
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			...(method !== 'GET' && method !== 'DELETE'
				? { body: JSON.stringify(data) }
				: {}),
		});

		const contentType = res.headers.get('content-type') || '';
		const responseData = contentType.includes('application/json')
			? await res.json()
			: await res.text();

		return NextResponse.json(responseData, { status: res.status });
	} catch (error) {
		console.error('Proxy error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
