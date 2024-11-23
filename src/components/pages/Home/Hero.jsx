import React from 'react';
import Image from 'next/image';
import DefaultNavbar from '@/components/common/Navbar';
import HeroNavBar from '@/components/common/HeroNavBar';
const Hero = () => {
	return (
		<div className="w-screen h-screen  bg-[url('/images/hero.png')] bg-cover bg-no-repeat flex justify-center items-center ">
			<div className='bg-[#202020] w-[95%] md:w-4/5  rounded-3xl pt-[2.7rem] pb-[3.6rem] px-2 md:px-[2.65rem] opacity-70'>
				<HeroNavBar />
				<h1 className='text-white text-center text-[2rem] font-[500] leading-[2.8rem] mt-[2.74rem] opacity-100'>
					Find Your Perfect Home with Ease: <br />
					Connecting Tenants to Trusted Agents.
				</h1>
			</div>
		</div>
	);
};

export default Hero;
