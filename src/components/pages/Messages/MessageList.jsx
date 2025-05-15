'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@nextui-org/react';
import { cn } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { proxyGet } from '@/services/proxyClient';
import { formatTimestamp } from '@/services/formatDate';

export default function MessageList({ authToken }) {
	const [messages, setMessages] = useState([]);
	const [typingUsers, setTypingUsers] = useState([]);
	const typingTimeoutsRef = useRef({});
	const socketRef = useRef(null);
	const router = useRouter();
	const role = Cookies.get('role');

	const handleClick = (id) => {
		router.push(`/${role}/messages/${id}`);
	};

	useEffect(() => {
		if (!authToken) return;
		const wsUrl = `${process.env.NEXT_PUBLIC_WSS_URL}?access_token=${authToken}`;
		let pingInterval;
		let socket;

		const connect = () => {
			socket = new WebSocket(wsUrl);

			socket.onopen = () => {
				console.log('WebSocket connected (message list)', socket);

				// ▶️ Trigger the listMessages route
				socket.send(
					JSON.stringify({
						action: 'listMessage',
						Authorization: authToken,
					})
				);

				// 🔄 Heartbeat every 4½ minutes
				pingInterval = setInterval(() => {
					if (socket.readyState === WebSocket.OPEN) {
						socket.send(JSON.stringify({ action: 'ping' }));
					}
				}, 270000);
			};

			socket.onmessage = (event) => {
				console.log('WS Event:', event);
				let data;
				try {
					data = JSON.parse(event.data);
				} catch {
					console.error('Failed to parse WS message:', event.data);
					return;
				}
				console.log('WS Received:', data);

				if (data.type === 'listMessagesResponse') {
					setMessages(data.data);
				} else if (data.type === 'typing') {
					const sender = data.data.sender_name;
					if (!sender) return;
					setTypingUsers((prev) =>
						prev.includes(sender) ? prev : [...prev, sender]
					);
					if (typingTimeoutsRef.current[sender])
						clearTimeout(typingTimeoutsRef.current[sender]);
					typingTimeoutsRef.current[sender] = setTimeout(() => {
						setTypingUsers((prev) =>
							prev.filter((n) => n !== sender)
						);
						delete typingTimeoutsRef.current[sender];
					}, 5000);
				} else if (data.type === 'error') {
					console.error('WS error:', data.message);
				}
			};

			socket.onerror = (err) => {
				console.error('WebSocket error (list):', err);
			};

			socket.onclose = () => {
				console.log('WebSocket closed (list) — reconnecting in 3s');
				clearInterval(pingInterval);
				setTimeout(connect, 3000);
			};

			socketRef.current = socket;
		};

		connect();

		return () => {
			clearInterval(pingInterval);
			socket?.close();
			Object.values(typingTimeoutsRef.current).forEach(clearTimeout);
		};
	}, [authToken]);

	const fetchData = async () => {
		try {
			const { data } = await proxyGet('/list-messages');
			setMessages(data.body.data);
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	return (
		<div className='p-4 max-w-3xl mx-auto bg-white rounded-md shadow-sm'>
			<h2 className='text-lg font-semibold mb-2 px-2'>Messages</h2>

			{/* Typing Indicator */}
			{typingUsers.length > 0 && (
				<div className='px-4 py-2 mb-2 text-sm italic text-gray-500 animate-pulse'>
					{typingUsers.join(', ')}{' '}
					{typingUsers.length > 1 ? 'are' : 'is'} typing...
				</div>
			)}

			<div className='divide-y divide-gray-100'>
				{messages?.map((msg) => (
					<div
						key={msg.id}
						onClick={() => handleClick(msg.id)}
						className={cn(
							'flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer border border-blue-400 rounded-md bg-blue-50 mb-3'
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
