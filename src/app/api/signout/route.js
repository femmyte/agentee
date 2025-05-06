// app/api/logout/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
	const cookieStore = cookies();
	cookieStore.delete('accessToken');
	cookieStore.delete('refreshToken');
	cookieStore.delete('authToken');

	return NextResponse.json({ success: true });
}
