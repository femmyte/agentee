import MessageList from '@/components/pages/Messages/MessageList';
import { cookies } from 'next/headers';
import React from 'react';

const page = () => {
	const token = cookies().get('accessToken')?.value;

	if (!token) {
		console.log('No token found');
	}

	return (
		<div className='py-[1.75rem] w-full'>
			<MessageList authToken={token} />
		</div>
	);
};

export default page;
