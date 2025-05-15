import Property from '@/components/pages/Properties/Property';
import { cookies } from 'next/headers';
import React from 'react';

const PropertyPage = ({ params }) => {
	const { id } = params;
	const token = cookies().get('accessToken')?.value;
	// const { id } = useParams();
	return (
		<div>
			<Property id={id} authToken={token} />
		</div>
	);
};

export default PropertyPage;
