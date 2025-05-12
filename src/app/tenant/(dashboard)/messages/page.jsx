import MessageList from '@/components/pages/Messages/MessageList';
import Link from 'next/link';
import React from 'react';

const page = () => {
	return (
		<div className='py-[1.75rem] w-full'>
			<MessageList />
		</div>
	);
};

export default page;
