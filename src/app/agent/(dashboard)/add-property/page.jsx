'use client';
import React, { useState } from 'react';
import PostHouse from '@/components/forms/PostHouse';

const AddProperty = () => {
	const [selected, setSelected] = useState('');

	return (
		<div className=''>
			<PostHouse role={'agent'} />
		</div>
	);
};

export default AddProperty;
