'use client';

import { Avatar, Input, Button } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { proxyGet, proxyPost } from '@/services/proxyClient';
import { formatTimestamp } from '@/services/formatDate';
import { toast } from 'react-toastify';

export default function MessageDetail({ conversationId, authToken }) {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [userId, setUserId] = useState('');
	const socketRef = useRef(null);
	const pendingRef = useRef([]);
	const [isConnected, setIsConnected] = useState(false);
	const [error, setError] = useState('');

	const fetchData = async () => {
		const { data } = await proxyGet('/get-message/' + conversationId);
		if (data.body.success) {
			setMessages(data.body.data.messages);
			setUserId(data.body.data.user_id);
		} else {
			toast.error('Unable to fetch message');
		}
	};

	const getReceiverId = () => {
		if (messages.length === 0) return '';
		return userId === messages[0]?.sender
			? messages[0]?.receiver
			: messages[0]?.sender;
	};

	const handleSendHttp = async (receiver_id) => {
		if (!newMessage.trim()) return;

		const response = await proxyPost('/create-message', {
			message: newMessage,
			receiver: receiver_id,
			conversation_id: conversationId,
		});

		if (response.data.body.success) {
			setMessages((prev) => [
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

	useEffect(() => {
		const wsUrl = `${process.env.NEXT_PUBLIC_WSS_URL}?access_token=${authToken}`;
		let pingInterval;
		let socket;

		const connect = () => {
			socket = new WebSocket(wsUrl);
			socketRef.current = socket;

			socket.onopen = () => {
				console.log('WebSocket connected');

				// 1️⃣ Fetch history once
				socket.send(
					JSON.stringify({
						action: 'getMessage',
						conversation_id: conversationId,
						Authorization: authToken,
					})
				);

				// 2️⃣ Flush queued messages
				pendingRef.current.forEach((msg) => socket.send(msg));
				pendingRef.current = [];

				// 3️⃣ Heartbeat every 4½ minutes
				pingInterval = setInterval(() => {
					if (socket.readyState === WebSocket.OPEN) {
						socket.send(JSON.stringify({ action: 'ping' }));
					}
				}, 270000);
			};

			socket.onmessage = (event) => {
				let data;
				try {
					data = JSON.parse(event.data);
				} catch {
					console.error('Failed to parse WS message:', event.data);
					return;
				}
				console.log('Received from server:', data);

				switch (data.type) {
					case 'getMessageResponse':
						setMessages((prev) => {
							const existingIds = new Set(
								data.data.messages.map((m) => m.id)
							);
							const stillPending = prev.filter(
								(m) => m.pending || !existingIds.has(m.id)
							);
							return [...data.data.messages, ...stillPending];
						});
						setUserId(data.data.user_id);
						break;

					case 'error':
						toast.error(data.message);
						break;
				}
			};

			socket.onerror = () => setError('WebSocket error');

			socket.onclose = () => {
				console.log('WebSocket closed—reconnecting in 3s');
				clearInterval(pingInterval);
				setTimeout(connect, 3000);
			};
		};

		connect();

		return () => {
			clearInterval(pingInterval);
			socket?.close();
		};
	}, [authToken, conversationId]);

	const handleSendMessage = () => {
		const receiver_id = getReceiverId();
		if (!receiver_id) {
			toast.error('Receiver ID not found');
			return;
		}
		if (!newMessage.trim()) return;

		const clientTempId = Date.now(); // temp ID to track this message

		const optimisticMessage = {
			id: clientTempId,
			message: newMessage,
			receiver: receiver_id,
			sender: userId,
			conversation_id: conversationId,
			created_at: Math.floor(Date.now() / 1000),
			pending: true,
		};

		// 1️⃣ Show message immediately
		setMessages((prev) => [...prev, optimisticMessage]);

		// 2️⃣ Send message via WebSocket
		const payload = JSON.stringify({
			action: 'sendMessage',
			message: newMessage,
			receiver: receiver_id,
			conversation_id: conversationId,
			clientTempId,
			Authorization: authToken,
		});

		const ws = socketRef.current;
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(payload);
		} else {
			console.warn('Socket not open, queuing message');
			pendingRef.current.push(payload);
		}
		setNewMessage('');
	};

	return (
		<div className='flex flex-col justify-between px-2 md:px-7 h-[100%]'>
			<div className='flex-1 overflow-hidden flex flex-col'>
				{/* Header */}
				<div className='p-4 border-b border-white bg-white rounded-t-sm flex items-center space-x-3'>
					<Avatar name='Jane Doe' />
					<div>
						<p className='font-semibold'>
							{messages && messages[0]?.receiver_name}
						</p>
						<p className='text-sm text-gray-500'>Online</p>
					</div>
				</div>

				{/* Chat Area */}
				<div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
					{messages?.map((msg) => (
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
			</div>
			{/* Message Input */}
			<div className=' '>
				<div className='p-4 bg-white border-t flex items-center space-x-2'>
					<Input
						fullWidth
						variant='bordered'
						placeholder='Type your message...'
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleSendMessage();
						}}
						classNames={{
							inputWrapper: 'bg-gray-100',
						}}
					/>
					<Button color='primary' onClick={handleSendMessage}>
						Send
					</Button>
				</div>
			</div>
		</div>
	);
}
