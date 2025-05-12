'use client';

import { Avatar, Input, Button } from '@nextui-org/react';
import { messages } from '@/components/data';
import { useEffect, useState } from 'react';
import { proxyGet, proxyPost } from '@/services/proxyClient';
import { formatTimestamp } from '@/services/formatDate';
import { toast } from 'react-toastify';

export default function MessageDetail({ senderId }) {
	const [message, setMessage] = useState([]);
	const [newMessage, setNewMessage] = useState('');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const { data } = await proxyGet('/get-message/' + senderId);
		if (data.body.success) {
			setMessage(data.body.data);
		} else {
			toast.error('Unable to fetch message');
		}
	};

	const handleSend = async () => {
		if (!newMessage.trim()) return;

		// Optional: send to API
		const response = await proxyPost('/create-message', {
			message: newMessage,
			receiver: senderId,
		});

		if (response.data.body.success) {
			setMessage((prev) => [
				...prev,
				{
					id: Date.now(),
					message: newMessage,
					receiver: senderId,
					created_at: Math.floor(Date.now() / 1000),
				},
			]);
			setNewMessage('');
		} else {
			toast.error('Failed to send message');
		}
	};

	return (
		<div className='flex flex-col h-[80vh] px-4 md:px-7 '>
			{/* Header */}
			<div className='p-4 border-b border-white bg-white rounded-t-sm flex items-center space-x-3'>
				<Avatar name='Jane Doe' />
				<div>
					<p className='font-semibold'>{message[0]?.receiver_name}</p>
					<p className='text-sm text-gray-500'>Online</p>
				</div>
			</div>

			{/* Chat Area */}
			<div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
				{message.map((msg) => (
					<div
						key={msg.id}
						className={`flex ${
							msg.receiver === senderId
								? 'justify-end'
								: 'justify-start'
						}`}
					>
						<div
							className={`max-w-xs md:max-w-md p-3 rounded-xl shadow-sm text-sm ${
								msg.receiver === senderId
									? 'bg-blue-500 text-white rounded-br-none'
									: 'bg-white text-gray-800 rounded-bl-none border'
							}`}
						>
							<p>{msg.message}</p>
							<p className='text-xs text-gray-200 mt-1 text-right'>
								{formatTimestamp(msg.created_at)}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Message Input */}
			<div className='p-4 bg-white border-t flex items-center space-x-2'>
				<Input
					fullWidth
					variant='bordered'
					placeholder='Type your message...'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') handleSend();
					}}
					classNames={{
						inputWrapper: 'bg-gray-100',
					}}
				/>
				<Button color='primary' onClick={handleSend}>
					Send
				</Button>
			</div>
		</div>
	);
}
