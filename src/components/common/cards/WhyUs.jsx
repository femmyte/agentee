import Image from 'next/image';
import React from 'react';

const WhyUs = ({ text, icon }) => {
	return (
		<div
			className='bg-white border border-[#C3C3C5] rounded-3xl flex flex-col items-center justify-center px-[3rem] py-10 w-[19.9rem] h-[10rem]'
			style={{
				boxShadow:
					'0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 6px 0px rgba(0, 0, 0, 0.10)',
			}}
		>
			<Image
				src={`/images/icons/${icon}.svg`}
				width={48}
				height={48}
			></Image>
			<p className='text-center text-[18px] font-[500] leading-[140%] text-[#202020] mt-[9px]'>
				{text}
			</p>
		</div>
	);
};

export default WhyUs;
