'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@nextui-org/react';
import { cn } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { proxyGet } from '@/services/proxyClient';
import { formatTimestamp } from '@/services/formatDate';

const messagess = [
	{ id: 1, sender: 'John Doe', text: 'Let meet at Lekki', time: '7:21am' },
	{ id: 2, sender: 'John Doe', text: 'Let meet at Lekki', time: '7:21am' },
	{ id: 3, sender: 'John Doe', text: 'Let meet at Lekki', time: '7:21am' },
	{ id: 4, sender: 'John Doe', text: 'Let meet at Lekki', time: '7:21am' },
];

export default function MessageList() {
	const [messages, setMessages] = useState([]);
	const router = useRouter();
	const role = Cookies.get('role');

	const handleClick = (id) => {
		router.push(`/${role}/messages/${id}`);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const { data } = await proxyGet('/list-messages ');
		console.log('data', data);

		setMessages(data.body.data);
	};

	return (
		<div className='p-4 max-w-3xl mx-auto bg-white rounded-md shadow-sm'>
			<h2 className='text-lg font-semibold mb-2 px-2'>Messages</h2>
			<div className='divide-y divide-gray-100'>
				{messages.map((msg, index) => (
					<div
						key={msg.id}
						onClick={() => handleClick(msg.sender)}
						className={cn(
							'flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer border border-blue-400 rounded-md bg-blue-50'
						)}
					>
						<div className='flex items-center space-x-3'>
							<Avatar
								name={msg.sender_name}
								className='w-10 h-10 text-sm'
							/>
							<div>
								<p className='font-semibold'>
									{msg.sender_name}
								</p>
								<p className='text-sm text-gray-600'>
									{msg.message}
								</p>
							</div>
						</div>
						<span className='text-sm text-gray-400'>
							{formatTimestamp(msg.created_at)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
