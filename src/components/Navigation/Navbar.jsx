'use client';
import React, { useState, useEffect } from 'react';
import {
	AiOutlineArrowDown,
	AiOutlineMail,
	AiOutlineMenu,
} from 'react-icons/ai';
// import { useSession, signOut } from 'next-auth/react';
import { useStateContext } from '@/providers/contextProvider';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { FaUserTie } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
import { PiCaretLeftLight } from 'react-icons/pi';
import { Button, Input } from '@nextui-org/react';
import { SearchIcon } from '../common/SearchIcon';

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
	const {
		activeMenu,
		setActiveMenu,
		screenSize,
		setScreenSize,
		pageTitle,
		pageSubTitle,
		setOpenLogoutModal,
	} = useStateContext();
	// const { currentUser } = useSelector((state) => state.user);
	// const { areaCommands } = useSelector((state) => state.shared);
	// const areaCommandName = areaCommands?.filter(
	// 	(ac) => ac._id === currentUser.areaCommand
	// );
	// console.log(currentUser);
	const [dropDown, setDropDown] = useState(false);
	const [notificationdropDown, setNotificationdropDown] = useState(false);
	const handleDropDown = () => {
		if (dropDown) {
			setDropDown(false);
			setNotificationdropDown(false);
		} else {
			setDropDown(true);
		}
	};
	const handleNotificationDropDown = () => {
		setNotificationdropDown(true);
		if (notificationdropDown) {
			setDropDown(false);
			setNotificationdropDown(false);
		} else {
			setNotificationdropDown(true);
		}
	};

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener('resize', handleResize);

		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, [setScreenSize]);

	useEffect(() => {
		// if (screenSize <= 900) {
		// console.log(screenSize);
		if (screenSize <= 1060) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize, setActiveMenu]);
	// const title =
	// 	currentUser.role === 'dpo'
	// 		? `${currentUser.policeDivision.name} CRIME STATISTICS`
	// 		: currentUser.role === 'ac'
	// 		? 'ABEOKUTA AREA COMMAND CRIME STATISTICS'
	// 		: 'Nigeria Police Force';
	const currentUser = {
		role: 'agent',
	};
	const subTitle =
		currentUser.role === 'dpo'
			? `${currentUser.policeDivision.name} Police Station`
			: currentUser.role === 'ac'
			? currentUser?.areaCommand.name
			: currentUser.role === 'cp'
			? "CP's Crime Monitoring Portal"
			: currentUser.role === 'admin' && 'Police Crime Input System';
	return (
		<div className='flex justify-between  pt-[0.9rem] items-center p-4'>
			{/* <Image src={'/images/logo.png'} width={54} height={90} alt='logo' /> */}
			{/* {!activeMenu && ( */}
			<div className='flex items-center gap-x-2'>
				<NavButton
					title='Menu'
					customFunc={() => setActiveMenu((prevState) => !prevState)}
					color='blue'
					icon={<PiCaretLeftLight />}
				/>
				{/* )} */}
				<Input
					classNames={{
						base: 'max-w-full sm:w-[22.8rem] h-[3rem]',
						mainWrapper: 'h-full',
						input: 'text-small',
						inputWrapper:
							'h-full font-normal text-default-500 bg-white border dark:bg-default-500/20',
					}}
					placeholder='Type to search...'
					size='sm'
					startContent={<SearchIcon size={18} />}
					type='search'
				/>
			</div>
			<div className='flex gap-2'>
				<Button
					as={Link}
					color='warning'
					href='/signin'
					className='bg-primary text-white'
				>
					Post a House
				</Button>
			</div>
			{/* <li
				className={`relative group text-white cursor-pointer ${
					dropDown ? '' : ''
				}`}
				onClick={() => setDropDown(!dropDown)}
			>
				<div className={`flex items-center gap-x-1 `}>
					<div className=''>
						<p className='text-black text-[1rem] text-center'>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
						<p className='text-gray-400 text-[0.7rem] text-center'>
							{currentUser?.forceNumber}
						</p>
					</div>
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
					<ul className='absolute right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg p-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
						<li className='flex items-center gap-x-5 pb-2.5 rounded-lg text-white px-3 text-md'>
							<FaUserTie />
							<Link href={`/${currentUser.role}/user-profile`}>
								Profile
							</Link>
						</li>
						<li className='flex items-center gap-x-5 pb-2.5 rounded-lg text-white text-md px-3'>
							<FiLogOut />
							<button
								onClick={() => {
									setOpenLogoutModal(true);
								}}
								className=''
							>
								<span className='capitalize'>logout</span>
							</button>
							{/* <Link href={`/${nav}/settings/profile`}>Profile</Link> */}
			{/* </li> */}
			{/* </ul>
				)}
			</li> */}
		</div>
	);
};

export default Navbar;
