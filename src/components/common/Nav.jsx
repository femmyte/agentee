'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import SwitchMode from './SwitchMode';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
const Nav = ({ link }) => {
	const router = useRouter();
	const handleRoute = () => {
		router.back();
	};
	return (
		<div className='flex w-screen pt-4 pr-[3.4375rem] pb-4 pl-[0.625rem] justify-between items-start bg-white'>
			<Button
				variant=''
				onClick={handleRoute}
				className='flex items-center gap-x-3'
				startContent={<FaChevronLeft className=' text-primary' />}
			>
				<span className=' text-primary'>Back</span>
			</Button>
			<div className=' basis-[55%]'>
				<Link href={'/'}>
					<Image
						src={'/images/logo.svg'}
						width={98}
						height={17}
						alt='logo'
					></Image>
				</Link>
				{/* <SwitchMode /> */}
			</div>
		</div>
	);
};

export default Nav;
