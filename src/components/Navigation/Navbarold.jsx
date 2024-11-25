'use client';
import React, { useState, useEffect } from 'react';
import {
	AiOutlineArrowDown,
	AiOutlineMail,
	AiOutlineMenu,
} from 'react-icons/ai';
import { useSession, signOut } from 'next-auth/react';
import { useStateContext } from '@/providers/contextProvider';
import Image from 'next/image';
import { FaUserTie } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'next/link';
import { useRouter } from 'next/navigation';
import CenteredModal from '../CenteredModal';
import { useSelector } from 'react-redux';
const NavButton = ({ title, customFunc, icon, color, dotColor, num }) => (
	<div className='relative'>
		<button
			type='button'
			onClick={customFunc}
			style={{ color }}
			className='relative text-xl rounded-full p-3 hover:bg-light-gray'
		>
			{icon}
		</button>
		<div
			style={{ backgroundColor: dotColor }}
			className='absolute rounded-full h-[15px] w-[15px] right-[7px] top-[4px] text-[10px] text-white flex items-center justify-center'
		>
			{num}
		</div>
	</div>
);
const Navbar = () => {
	const { setActiveMenu, screenSize, setScreenSize } = useStateContext();
	const { currentUser } = useSelector((state) => state.user);
	const [dropDown, setDropDown] = useState(false);
	const [modalIsOpen, setIsOpen] = useState(false);
	let userInfo = [];
	const router = useRouter();

	const handleLogout = async () => {
		const data = await signOut({ redirect: false, callbackUrl: '/' });
		router.push(data.url);
	};

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener('resize', handleResize);

		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (screenSize <= 900) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);
	console.log(currentUser);
	return (
		<div className='flex justify-between  pt-[0.9rem] items-center pr-3'>
			{/* <NavButton
				title='Menu'
				customFunc={() => setActiveMenu((prevState) => !prevState)}
				color='blue'
				icon={<AiOutlineMenu />}
			/> */}
			<div className=''>
				<h3 className='text-black text-[2rem] font-[500] leading-normal'>
					Nigeria Police Force
				</h3>
				<p className='text-black text-center text-[1rem] font-[500] leading-normal'>
					Police Crime Input System
				</p>
			</div>
			{/* <div
				className={`relative group text-white cursor-pointer `}
				
			>
				<div className={`flex items-centergap-x-[0.7rem]`}>
					<div className=''>
						<p className='text-gray-400 text-center'>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
						<p className='text-gray-400 text-center'>{currentUser?.rank}</p>
					</div>
					<Image
						src={
							currentUser?.image
								? currentUser?.image.url
								: '/images/user.png'
						}
						alt='user'
						width={50}
						height={50}
					/>
					<AiOutlineArrowDown
						color='#28995E'
						className='font-[700] cursor-pointer'
					/>
				</div>
				{dropDown && (
					<ul className='absolute left-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg p-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
						<li className='flex items-center gap-x-5 pb-2.5 rounded-lg text-white px-3 text-md'>
							<FaUserTie />
							<Link href={`/ipo/officer-profile`}>Profile</Link>
						</li>
						<li className='flex items-center gap-x-5 pb-2.5 rounded-lg text-white text-md px-3'>
							<FiLogOut />
							<button
								onClick={() => {
									setIsOpen(true);
								}}
								className=''
							>
								<span className='capitalize'>logout</span>
							</button>
						</li>
					</ul>
				)}
			</div> */}
			<li
				className={`relative group text-white cursor-pointer ${
					dropDown ? '' : ''
				}`}
				onClick={() => setDropDown(!dropDown)}
			>
				<div className={`flex items-center gap-x-1 `}>
					<div className='relative w-[40px] h-[40px]'>
						<Image
							src={
								currentUser?.image?.url
									? currentUser.image.url
									: '/images/user.png'
							}
							alt='user'
							fill
							className='rounded-full'
							sizes='(max-width: 400px) 20vw, (max-width: 1200px) 10vw, 5vw'
						/>
					</div>

					<AiOutlineArrowDown
						color='#28995E'
						className='font-[700] cursor-pointer ml-[10px]'
					/>
				</div>
				{dropDown && (
					<ul className='absolute left-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg p-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
						<li className='flex items-center gap-x-5 pb-2.5 rounded-lg text-white px-3 text-md'>
							<FaUserTie />
							<Link href={`/${currentUser.role}/officer-profile`}>
								Profile
							</Link>
						</li>
						<li className='flex items-center gap-x-5 pb-2.5 rounded-lg text-white text-md px-3'>
							<FiLogOut />
							<button
								onClick={() => {
									setIsOpen(true);
								}}
								className=''
							>
								<span className='capitalize'>logout</span>
							</button>
							{/* <Link href={`/${nav}/settings/profile`}>Profile</Link> */}
						</li>
					</ul>
				)}
			</li>
			{/* <CenteredModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
				<div className='px-[20px]'>
					<p className='font-space font-[700] text-[24px] leading-[30.2px]  mb-[40px] text-black text-center'>
						Logout Account
					</p>

					<p className='mt-[25px] font-dmsans font-[600] text-[20px] leading-[20.2px] text-black text-center'>
						Are you sure you want to logout your account?
					</p>
					<div className='flex flex-col gap-y-[20px] gap-x-[60px] mt-[50px]'>
						<button
							type='submit'
							className=' py-[8px] px-[16px] rounded-lg bg-[#28995E] font-dmsans font-[500] text-[18px] text-white hover:bg-primaryYellow'
							onClick={() =>
								setIsOpen((preveState) => !preveState)
							}
						>
							Don&apos;t logout
						</button>
						<button
							type='submit'
							className=' py-[8px] px-[16px] rounded-lg border border-[#28995E] hover:bg-[#28995E] font-dmsans font-[500] text-[18px] text-primaryPurple hover:text-white'
							onClick={() => {
								handleLogout();
								setIsOpen(false);
							}}
						>
							Logout my account
						</button>
					</div>
				</div>
			</CenteredModal> */}
		</div>
	);
};

export default Navbar;
