import MessageDetail from '@/components/pages/Messages/Message';
import { cookies } from 'next/headers';
import React from 'react';

const Message = ({ params }) => {
	const { id } = params;
	const token = cookies().get('accessToken')?.value;
	// const { id } = useParams();
	return (
		<div>
			<MessageDetail conversationId={id} authToken={token} />
		</div>
	);
};

export default Message;
