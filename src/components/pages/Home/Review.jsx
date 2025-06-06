import React from 'react';
import ReviewCard from '@/components/common/cards/Review';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
const Review = () => {
	return (
		<section className='pt-[3.5rem] px-3 md:px-[5.97rem]'>
			<div>
				<h3 className='text-center text-[28px] font-[500] leading-[140%] text-primary mt-[8.29px'>
					Client&apos;s Reviews
				</h3>
				<p className='text-center text-[16px] font-[500] leading-[140%] text-[#89898A]'>
					We Build With The Trust of Our Clients and Agents
				</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-x-[0.8rem]  mt-[0.83rem]'>
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
			</div>
			<div className='flex flex-col md:flex-row justify-evenly items-center rounded-[1.5rem] bg-[#F5F8FF] py-[2rem] gap-y-4 gap-x-[9.5rem] mt-[3rem]'>
				<Image
					src={`/images/house-d.png`}
					width={284}
					height={177}
					alt='house'
				></Image>
				<div className='flex flex-col  justify-center items-center md:items-start'>
					<h3 className='text-[1.75rem] font-[500] leading-[140%] text-primary text-center md:text-left'>
						Get Your Property and Apartment Listed
					</h3>
					<p className='text-[1rem] font-[500] leading-[140%] text-[#89898A] mb-[1rem] text-center md:text-left'>
						Register and get your home listed as a property owner
					</p>
					<Link
						href={'/signup'}
						className='bg-[#2C71F6] text-white px-[0.875rem] py-[1.5rem] text-[1rem] font-[600] leading-4 rounded-md'
					>
						Get Started
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Review;
