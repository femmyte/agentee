'use client';
import React, { useState, useEffect } from 'react';
import FeaturedCounter from '@/components/common/cards/FeaturedCounter';
import FeaturedProperties from '@/components/common/cards/FeaturedProperties';
import { SlMenu } from 'react-icons/sl';
import { BsEmojiSmile } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import Carousel from '@/components/common/Carousel';
import { carouselItems } from '@/components/data';
const Featured = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	// Slide every 4 seconds
	useEffect(() => {
		const slideInterval = setInterval(() => {
			setCurrentIndex(
				(prevIndex) => (prevIndex + 1) % carouselItems.length
			);
		}, 4000);

		return () => clearInterval(slideInterval);
	}, []);

	return (
		<div className='mt-[1.5rem] relative'>
			<div>
				<h3 className='text-center text-[28px] font-[500] leading-[140%] text-primary mt-[8.29px'>
					Featured Properties
				</h3>
				<p className='text-center text-[16px] font-[500] leading-[140%] text-[#89898A]'>
					BROWSE OUR LATEST OFFERS
				</p>
			</div>
			<div className='px-2 md:px-[97px] mt-[39.74px]'>
				<Carousel items={carouselItems} currentIndex={currentIndex} />
				{/* <div className='realtive'> */}
				{/* Slide indicators (dots) */}
				<div className='absolute bottom-[-2] left-0 right-0 flex justify-center space-x-2'>
					{carouselItems.map((_, index) => (
						<span
							key={index}
							className={`h-2 w-2  transition-all duration-300 ${
								index === currentIndex
									? 'bg-gray-800'
									: 'bg-gray-400'
							}`}
						/>
					))}
					{/* </div> */}
				</div>
			</div>
			<div className='mt-[39.74px] grid grid-cols-1 md:grid-cols-3 gap-[48px] px-4 md:px-[97px]'>
				<FeaturedCounter
					text='Our Property Listing'
					counter={200}
					color={'#FFBE18'}
					icon={<SlMenu size={18} />}
				/>
				<FeaturedCounter
					text={'Agents Available'}
					counter={250}
					color={'#2C71F6'}
					icon={<FaUser size={18} color='white' />}
				/>
				<FeaturedCounter
					text={'Our Happy Clients'}
					counter={350}
					color={'#17B530'}
					icon={<BsEmojiSmile size={18} color='white' />}
				/>
			</div>
		</div>
	);
};

export default Featured;
