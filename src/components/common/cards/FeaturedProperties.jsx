import React from 'react';
import { Button, Image } from '@nextui-org/react';
import { MdStar } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import NextImage from 'next/image';
const FeaturedProperties = () => {
	return (
		<div
			className='flex flex-col gap-[12px] border border-[#F8F9FB] p-4'
			style={{
				boxShadow:
					'0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
			}}
		>
			<div className='w-full relative'>
				<Image
					fill
					isZoomed
					alt='NextUI Fruit Image with Zoom'
					src='/images/property.png'
				/>
			</div>
			<div className='mt-[8px] grid grid-cols-5 gap-2'>
				<Image
					className='w-full'
					isZoomed
					// width={240}
					alt='NextUI Fruit Image with Zoom'
					src='./images/thumbnail1.png'
				/>
				<Image
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
				/>
			</div>
			<div className='flex items-center justify-between'>
				<p className='font-[500] text-[20px] leading-[140%] text-[#202020] '>
					3 Bedroom at Lekki
				</p>
				<div className='flex items-center'>
					<MdStar />
					<p>4.9 (85)</p>
				</div>
			</div>
			<p className='font-[400] text-[16px] leading-[140%] text-[#89898A] '>
				Lekki, Chevron drive, Around Ibeju lekki
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
					<p>July16, 2024</p>
				</div>
			</div>
			<div className='flex my-[12px]'>
				<p className='font-[400] text-[16px] leading-[140%] text-[#323232] '>
					<span>₦150,000</span> <span>P/A</span>
				</p>
				<p className='text-[14px] text-[#323232] leading-[142.857%]'>
					{' '}
					· ₦200,000 total Package
				</p>
			</div>
			<p className='font-[400] text-[16px] leading-[140%] text-[#89898A] '>
				740 total views, 0 today
			</p>
		</div>
	);
};

export default FeaturedProperties;
