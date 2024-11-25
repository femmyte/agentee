import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { PiCaretLeftLight } from 'react-icons/pi';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { DPOLinks, ACLinks, CPLink, commandLink } from '@/links';
import Link from 'next/link';
import { useStateContext } from '@/providers/contextProvider';
// import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { BiSupport } from 'react-icons/bi';
const Sidebar = () => {
	let {
		activeMenu,
		setActiveMenu,
		screenSize,
		openLogoutModal,
		setOpenLogoutModal,
	} = useStateContext();
	const router = useRouter();
	const session = useSession();
	// const handleLogout = async () => {
	// 	const data = await signOut({ redirect: false, callbackUrl: '/' });
	// 	router.push(data.url);
	// };
	const handleCloseSidebar = () => {
		if (activeMenu && screenSize <= 900) {
			setActiveMenu(false);
		}
	};
	let userInfo = {
		user: {
			role: 'agent',
		},
	};
	// let userInfo = session?.data?.user;
	let links;
	let nav;
	if (userInfo?.role === 'agent') {
		links = CPLink;
		nav = 'cp';
	} else if (userInfo?.role === 'dpo') {
		links = DPOLinks;
		nav = 'dpo';
	} else if (userInfo?.role === 'ac') {
		links = ACLinks;
		nav = 'ac';
	} else if (userInfo?.role === 'ac-admin') {
		links = commandLink;
		nav = 'ac-admin';
	}
	const pathname = usePathname();
	const activeLink =
		'flex items-center gap-5 pl-4 pt-3 pb-2.5 bg-[#28995E] text-white text-md mt-1';
	const normalLink =
		'flex items-center  gap-5 pl-4 pt-3 pb-2.5 text-[#8C8D8E] font-[400] text-[16px] dark:text-gray-200 dark:hover:text-black hover:bg-gray-200 mt-1';
	return (
		<>
			{activeMenu && (
				<div className='h-screen overflow-y-auto md:overflow-x-hidden  md:hover:overflow-y-auto pb-[10px] pl-[1rem] bg-primaryGray flex flex-col justify-'>
					<>
						<div className='flex justify-between items-center'>
							{/* <Link
							href='/'
							onClick={handleCloseSidebar}
							className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'
						>
							<img
								src='/images/logo.png'
								alt='Devcent Logo'
								className='max-w-[200px]'
							/>
						</Link> */}
							<div className='relative h-[90px] w-[54px] top-0 left-0'>
								<Image
									src={'/images/logo.png'}
									fill
									alt='logo'
									sizes='(max-width: 400px) 20vw, (max-width: 1200px) 10vw, 5vw'
								/>
							</div>
							{/* <Image
								src={'/images/logo.png'}
								width={54}
								height={90}
								alt='logo'
							/> */}
							<button
								type='button'
								onClick={() =>
									setActiveMenu((prevState) => !prevState)
								}
								className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'
							>
								{/* <MdOutlineCancel /> */}
								<PiCaretLeftLight className='font-[700] text-black cursor-pointer ml-[10px] text-[2rem]' />
							</button>
						</div>
						<div className='mt-5 w-[225px]'>
							{links?.map((item) => (
								<div key={item.title}>
									<p className='text-gray-400 m-3 mt-4 uppercase'>
										{item.title}
									</p>

									{item.links.map((link) => {
										return (
											<Link
												href={`/${nav}/${link.address}`}
												key={link.address}
												onClick={handleCloseSidebar}
												className={
													pathname.includes(
														link.address
													)
														? // activeMenu
														  activeLink
														: normalLink
												}
											>
												{link.icon}
												<span className='capitalize font-space font-[500] text-[14px] '>
													{/* {link.name == '/' ? 'overview' : link.name} */}
													{link.name}
												</span>
											</Link>
										);
									})}
								</div>
							))}
						</div>
					</>
					<div className='mt-[5rem]'>
						<p className='text-gray-400 m-3 mt-4 uppercase'>
							Administration
						</p>
						<Link
							href={'#'}
							// className='flex items-center w-[90%] gap-x-5 pl-4 pt-3 pb-2.5 rounded-lg  text-md  mt-[40px]'
							className={
								pathname.includes('/updates')
									? // activeMenu
									  activeLink
									: normalLink
							}
						>
							<FiSettings />
							<span className='capitalize'>Update</span>
						</Link>
						<Link
							href={'#'}
							className={
								pathname.includes('/support')
									? // activeMenu
									  activeLink
									: normalLink
							}
						>
							<BiSupport />
							<span className='capitalize'>Support</span>
						</Link>
						<button
							onClick={() => setOpenLogoutModal(true)}
							className='flex items-center w-[90%] gap-x-5 pl-4 pt-3 pb-2.5 rounded-lg  text-md '
						>
							<FiLogOut />
							<span className='capitalize'>Signout</span>
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Sidebar;
