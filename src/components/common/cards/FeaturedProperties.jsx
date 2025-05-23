'use client';
import React, { useState } from 'react';
import { Button, Image } from '@nextui-org/react';
import { MdStar } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import NextImage from 'next/image';
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';

const carouselItems = [
	{
		id: 1,
		title: 'Item 1',
		banner: '/images/property.png',
		images: [
			'./images/thumbnail1.png',
			'./images/thumbnail2.png',
			'./images/thumbnail3.png',
			'./images/thumbnail4.png',
			'./images/thumbnail5.png',
		],
		agentLink: '',
		address: 'Lekki, Chevron drive, Around Ibeju lekki',
		stars: 4.9,
		price: 500000,
		dateEnlisted: 'July 16, 2024',
		totalPackage: 800000,
		totalViews: 200,
		todaysView: 2,
		propertyType: 'Apartment',
	},
	{ title: 'Item 2' },
	{ title: 'Item 3' },
	{ title: 'Item 4' },
	{ title: 'Item 5' },
	{ title: 'Item 6' },
];
const FeaturedProperties = ({ item }) => {
	const [isLove, setIsLove] = useState(false);

	const handleSetLove = (e) => {
		e.preventDefault();
		setIsLove(!isLove);
	};
	return (
		<div
			className='flex flex-col gap-[12px] border border-[#F8F9FB] p-4'
			style={{
				boxShadow:
					'0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
			}}
		>
			<div className='w-full relative'>
				<img
					alt='NextUI Fruit Image with Zoom'
					src='/images/property.png'
					className='co bg-contain w-full'
				/>
			</div>
			<div className='mt-[8px] grid grid-cols-5 gap-2'>
				{item.images.map((image, i) => (
					<Image
						key={i}
						className='w-full'
						isZoomed
						// width={240}
						alt='NextUI Fruit Image with Zoom'
						src={image}
					/>
				))}
				{/* <Image
					className='w-full'
					isZoomed
					alt='NextUI Fruit Image with Zoom'
					src='/images/thumbnail2.png'
				/>
				<Image
					className='w-full'
					isZoomed
					alt='NextUI Fruit Image with Zoom'
					src='/images/thumbnail3.png'
				/>
				<Image
					className='w-full'
					isZoomed
					alt='NextUI Fruit Image with Zoom'
					src='/images/thumbnail4.png'
				/>
				<Image
					className='w-full'
					isZoomed
					alt='NextUI Fruit Image with Zoom'
					src='/images/thumbnail5.png'
				/> */}
			</div>
			<div className='flex items-center justify-between'>
				<p className='font-[500] text-[20px] leading-[140%] dark:text-white text-[#202020] '>
					3 Bedroom at Lekki
				</p>
				<div className='flex items-center'>
					<MdStar />
					<p>{item.stars} (85)</p>
				</div>
			</div>
			<p className='font-[400] text-[16px] leading-[140%] text-[#89898A] '>
				{item.address}
			</p>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-2'>
					{/* <FaUser /> */}
					<Button variant='light' startContent={<FaUser />}>
						Agent Person
					</Button>
				</div>
				<div className='flex items-center gap-2'>
					<FaCalendarDays />
					<p>{item.dateEnlisted}</p>
				</div>
			</div>
			<div className='flex flex-col md:flex-row gap-y-3 justify-center md:justify-between items-center'>
				<div className=''>
					<div className='flex my-[12px]'>
						<p className='font-[400] text-[16px] leading-[140%] dark:text-[#89898A] text-[#323232] '>
							<span>{item.price}</span> <span>P/A</span>
						</p>
						<p className='text-[14px] dark:text-[#89898A] text-[#323232] leading-[142.857%]'>
							{' '}
							· {item.totalPackage} total Package
						</p>
					</div>
					<p className='font-[400] text-[16px] leading-[140%] text-[#89898A] '>
						{item.totalViews} total views, {item.todaysView} today
					</p>
				</div>
				<div className=''>
					{isLove ? (
						<div className='flex flex-col items-center justify-center'>
							<Button
								isIconOnly
								variant='faded'
								aria-label='Like'
								onClick={handleSetLove}
								className='border-none bg-none'
							>
								<MdFavoriteBorder color='#2C71F6' size={48} />
							</Button>
							<p className='font-[500] text-[0.875rem] leading-[140%] text-[#89898A] '>
								Add to Fav
							</p>
						</div>
					) : (
						<div className='flex flex-col items-center justify-center'>
							<Button
								isIconOnly
								variant='faded'
								aria-label='Like'
								onClick={handleSetLove}
								className='border-none bg-none'
							>
								<MdOutlineFavorite color='#2C71F6' size={48} />
							</Button>
							<p className='font-[500] text-[0.875rem] leading-[140%] text-[#89898A] '>
								Added to Fav
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FeaturedProperties;
