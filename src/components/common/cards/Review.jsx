import React from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
const Review = () => {
	return (
		<div className='px-[1.2rem] py-[1rem] flex flex-col justify-center items-center border-2 border-[#F8F9FB] rounded'>
			<div className='flex items-center justify-between w-full'>
				<div className='flex items-center gap-1'>
					<div className='w-[40px] h-[40px] relative rounded-full'>
						<Image
							fill
							src={`/images/testimony.png`}
							alt='NextUI Album Cover'
							className='rounded-full'
						/>
					</div>
					<p className='text-[#202020] text-center font-[500] text-[1.125rem] leading-[140%]'>
						Akinwale Sodeeq
					</p>
				</div>
				<div className='flex items-center gap-1'>
					<FaStar color='#F4B400' />
					<FaStar color='#F4B400' />
					<FaStar color='#F4B400' />
					<FaStar color='#F4B400' />
					<FaStar color='#F4B400' />
				</div>
			</div>
			<div className='mt-[0.75rem] mb-[0.62rem]'>
				<p className='text-[#323232] text-[1rem] font-[400] leading-[1.4rem] text-justify'>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen bo
				</p>
				<p className='text-[#202020] text-[0.75rem] font-[500] leading-[1.4rem] mt-1'>
					Nov 21, 2024. 5:02:22 AM
				</p>
			</div>
		</div>
	);
};

export default Review;
