import React from 'react';
import WhyUs from '@/components/common/cards/WhyUs';
const WhyChooseUs = () => {
	return (
		<div className="w-screen h-full bg-cover bg-[url('/images/man.png')] bg-no-repeat  flex flex-col justify-center pt-[3rem] pb-[2rem] px-3 md:px-[97px] mt-[2rem]">
			<div>
				<h3 className='text-center text-[28px] font-[500] leading-[140%] text-[#202020] mt-[8.29px] mb-[0.5rem]'>
					Why choose Us
				</h3>
				<p className='text-center text-[16px] font-[500] leading-[140%] text-[#202020]'>
					WE CONNECT YOU WITH AGENTS AND HOUSE OWNERS
				</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-y-3 place-items-center md:gap-x-[104.5px] mt-[1rem]'>
				<WhyUs text={'Find your perfect home'} icon={'home'} />
				<WhyUs text={'Find a pocket friendly home'} icon={'wallet'} />
				<WhyUs text={'Connect with an agent '} icon={'partnership'} />
			</div>
		</div>
	);
};

export default WhyChooseUs;
