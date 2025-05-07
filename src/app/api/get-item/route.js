import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
	const body = await request.json();

	// if (!email || !password) {
	//     return NextResponse.json(
	//         { message: 'Email and password are required' },
	//         { status: 400 }
	//     );
	// }

	const baseUrl = process.env.NEXT_PUBLIC_CORE_API_URL || '';
	const endpoint = `${baseUrl}/login`;

	if (!baseUrl) {
		console.error(
			'API_AUTH_URL is not defined in the environment variables.'
		);
		return NextResponse.json(
			{ message: 'Server configuration error. Please try again later.' },
			{ status: 500 }
		);
	}

	console.log('API Endpoint:', endpoint);

	try {
		// Make the fetch request
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'api-key': process.env.API_KEY || '',
			},
			body: JSON.stringify({ email, password }),
		});
		// Handle non-OK responses
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return NextResponse.json(
				{
					message:
						errorData.message ||
						`unabke to fetch(Status: ${response.status})`,
				},
				{ status: response.status }
			);
		}

		// Parse and return the response data
		const data = await response.json();
		console.log('Response Data:', data);

		// return NextResponse.json(data, { status: 200 });
		return NextResponse.json({ success: true, decoded: id_token });
	} catch (error) {
		console.error('Error authenticating user:', error);
		return NextResponse.json(
			{ message: 'An error occurred while authenticating' },
			{ status: 500 }
		);
	}
}
