'use client';
import { Chip } from '@nextui-org/react';
import React from 'react';
import CountUp from 'react-countup';
import Counter from '../Counter';
const FeaturedCounter = ({ text, counter, color, icon }) => {
	return (
		<div
			className='flex items-center justify-center gap-x-[8px] px-4 py-12 border border-[#E9E9EB]'
			style={{
				boxShadow:
					'0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
			}}
		>
			<div
				className={`flex justify-center items-center h-[3rem] w-[3rem] rounded-full `} style={{background: color}}
			>
				{icon}
			</div>
			<div className=''>
				<p className='text-[16px] font-[400] leading-[140%] text-[#89898A] '>
					{text}
				</p>
				<p>
					<Counter number={counter} />
				</p>
			</div>
		</div>
	);
};

export default FeaturedCounter;
