// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
// 	try {
// 		const body = await request.json();
// 		console.log(
// 			'POST URL:',
// 			`${process.env.NEXT_PUBLIC_OPEN_API_URL}/signup`
// 		);

// 		const response = await fetch(
// 			`${process.env.NEXT_PUBLIC_OPEN_API_URL}/signup`,
// 			{
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify(body),
// 			}
// 		);

// 		//   const data = await response.json();
// 		const data = await response.json();
// 		console.log('POST /api/signup response:', {
// 			status: response.status,
// 			data,
// 		});

// 		if (!response.ok) {
// 			return NextResponse.json(
// 				{
// 					error:
// 						data.body?.message ||
// 						'Error while signing up please try again',
// 				},
// 				{ status: response.status }
// 			);
// 		}

// 		return NextResponse.json(data);
// 	} catch (error) {
// 		console.error('Error in invite-staff:', error);
// 		console.error('Error in POST /api/signup:', error);
// 		return NextResponse.json(
// 			{ error: 'Internal server error' },
// 			{ status: 500 }
// 		);
// 	}
// }
