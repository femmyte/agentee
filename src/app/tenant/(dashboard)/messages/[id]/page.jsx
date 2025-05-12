import MessageDetail from '@/components/pages/Messages/Message';
import React from 'react';

const Message = ({ params }) => {
	const { id } = params;
	// const { id } = useParams();
	return (
		<div>
			<MessageDetail conversationId={id} />
		</div>
	);
};

export default Message;
