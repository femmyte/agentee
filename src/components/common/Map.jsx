import React from 'react';

const GoogleMap = ({ address }) => {
	if (!address) {
		return (
			<div className='text-center text-red-500'>No address provided</div>
		);
	}

	const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
		address
	)}`;

	return (
		<div className='relative w-full pt-[56.25%]'>
			{' '}
			{/* 16:9 aspect ratio */}
			<iframe
				title='Google Map'
				className='absolute top-0 left-0 w-full h-full rounded-lg shadow-md'
				frameBorder='0'
				style={{ border: 0 }}
				src={mapSrc}
				allowFullScreen
			></iframe>
		</div>
	);
};

export default GoogleMap;
