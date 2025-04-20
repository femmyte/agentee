import { NextResponse } from 'next/server';

export async function POST(request) {
	const { email, password } = await request.json();

	if (!email || !password) {
		return NextResponse.json(
			{ message: 'Email and password are required' },
			{ status: 400 }
		);
	}

	const baseUrl = process.env.NEXT_PUBLIC_OPEN_API_URL || '';
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
		// Log the request body and headers for debugging
		// console.log("Request Body:", { email, password });
		// console.log("Request Headers:", {
		//   "Content-Type": "application/json",
		//   "api-key": process.env.API_KEY,
		// });

		// Make the fetch request
		const response = await fetch(endpoint, {
			method: 'POST',
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
						`Failed to authenticate (Status: ${response.status})`,
				},
				{ status: response.status }
			);
		}

		// Parse and return the response data
		const data = await response.json();
		console.log('Response Data:', data);
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error('Error authenticating user:', error);
		return NextResponse.json(
			{ message: 'An error occurred while authenticating' },
			{ status: 500 }
		);
	}
}
