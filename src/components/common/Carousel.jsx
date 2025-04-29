'use client';
import { useRouter } from 'next/navigation';
import FeaturedProperties from './cards/FeaturedProperties';
import { useState, useEffect } from 'react';
const Carousel = ({ items, currentIndex }) => {
	const router = useRouter();
	const [size, setSize] = useState(100);
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 640) {
				setSize(33.33); // Show 3 items on larger screens
			} else {
				setSize(100); // Show 1 item on small screens
			}
		};

		// Initial setup
		handleResize();

		// Attach the resize listener
		window.addEventListener('resize', handleResize);

		return () => {
			// Cleanup the event listener on component unmount
			window.removeEventListener('resize', handleResize);
		};
	});
	console.log(size);

	const handleClick = (index) => {
		// Handle click event on carousel items
		console.log('Clicked item index:', index);
		router.push(`/properties/${index}`);
	};
	return (
		<div className='relative w-full overflow-hidden'>
			{/* Carousel items */}
			<div
				className='flex transition-transform duration-500 ease-in-out'
				style={{ transform: `translateX(-${currentIndex * size}%)` }}
			>
				{items.map((item, index) => (
					<div
						key={index}
						className='w-full md:w-1/3 flex-shrink-0 p-4 cursor-pointer'
						onClick={() => handleClick(item.id)}
					>
						<FeaturedProperties item={item} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Carousel;
