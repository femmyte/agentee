'use client';

import { Avatar, Input, Button } from '@nextui-org/react';
import { messages } from '@/components/data';
import { useEffect, useState } from 'react';
import { proxyGet, proxyPost } from '@/services/proxyClient';
import { formatTimestamp } from '@/services/formatDate';
import { toast } from 'react-toastify';

export default function MessageDetail({ conversationId, authToken }) {
	const [message, setMessage] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [userId, setUserId] = useState('');

	const socketRef = useRef(null);
	const [isConnected, setIsConnected] = useState(false);
	const [error, setError] = useState('');
	const [messages, setMessages] = useState([]);

	// 1. Connect to WebSocket server
	useEffect(() => {
		const socket = new WebSocket(
			'wss://your-api-id.execute-api.region.amazonaws.com/dev'
		);

		socket.onopen = () => {
			console.log('WebSocket connected');
			setIsConnected(true);
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log('Received from server:', data);

			if (data.type === 'messageCreated') {
				setMessages((prev) => [...prev, data.data]); // append new message
			}

			if (data.type === 'error') {
				setError(data.message || 'An error occurred');
			}
		};

		socket.onerror = (err) => {
			console.error('WebSocket error:', err);
			setError('WebSocket error');
		};

		socket.onclose = () => {
			console.log('WebSocket closed');
			setIsConnected(false);
		};

		socketRef.current = socket;

		return () => {
			socket.close();
		};
	}, []);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const { data } = await proxyGet('/get-message/' + conversationId);
		if (data.body.success) {
			setMessage(data.body.data.messages);
			setUserId(data.body.data.user_id);
		} else {
			toast.error('Unable to fetch message');
		}
	};

	const handleSendMessage = () => {
		if (!isConnected) {
			setError('WebSocket is not connected');
			return;
		}

		if (!newMessage.trim()) {
			setError('Message cannot be empty');
			return;
		}

		const payload = {
			action: 'createMessage', // must match route name in WebSocket Lambda
			message: newMessage,
			receiver: receiver_id,
			conversation_id: conversationId,
			Authorization: authToken,
		};

		socketRef.current.send(JSON.stringify(payload));
		setNewMessage('');
		setError('');
	};

	const handleSend = async () => {
		if (!newMessage.trim()) return;
		const receiver_id =
			userId == message[0]?.sender
				? message[0]?.receiver
				: message[0]?.sender;
		// Optional: send to API
		const response = await proxyPost('/create-message', {
			message: newMessage,
			receiver: receiver_id,
			conversation_id: conversationId,
		});

		if (response.data.body.success) {
			setMessage((prev) => [
				...prev,
				{
					id: Date.now(),
					message: newMessage,
					receiver: receiver_id,
					sender: userId,
					conversation_id: conversationId,
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
					<p className='font-semibold'>
						{message && message[0]?.receiver_name}
					</p>
					<p className='text-sm text-gray-500'>Online</p>
				</div>
			</div>

			{/* Chat Area */}
			<div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
				{message.map((msg) => (
					<div
						key={msg.id}
						className={`flex ${
							msg.sender === userId
								? 'justify-end'
								: 'justify-start'
						}`}
					>
						<div
							className={`max-w-xs md:max-w-md p-3 rounded-xl shadow-sm text-sm ${
								msg.sender === userId
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
