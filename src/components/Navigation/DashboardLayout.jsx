'use client';
import { useRouter } from 'next/navigation';
import CenteredModal from '../CenteredModal';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useStateContext } from '@/providers/contextProvider';
import { signOut } from 'next-auth/react';
import { FaWindowClose } from 'react-icons/fa';
import CirclesBarLoader from '../CircleBarLoader';
import { useState } from 'react';

function DashboardLayout({ children }) {
	const {
		activeMenu,
		darkToggle,
		login,
		openLogoutModal,
		setOpenLogoutModal,
	} = useStateContext();

	const router = useRouter();

	const [isSignOut, setSignOut] = useState(false);

	const handleLogout = async () => {
		setSignOut(true);
		localStorage.removeItem('hasSeenModal', 'true');
		const data = await signOut({ redirect: false, callbackUrl: '/' });
		router.push(data.url);
	};
	// const { activeMenu, darkToggle, login } = false;

	// const location = useLocation();
	// console.log('hash', location.hash);
	// console.log(login)
	return (
		<>
			<div className={`${darkToggle && 'dark'} overflow-x-hidden`}>
				<div className='flex relative dark:bg-main-dark-bg pr-0 '>
					{activeMenu ? (
						<div
							className={
								'w-full h-full md:w-[17.5rem]  fixed sidebar dark:bg-secondary-dark-bg'
							}
						>
							<Sidebar />
						</div>
					) : (
						<div
							className={`${
								login
									? 'hidden w-0'
									: 'w-0 dark:bg-secondary-dark-bg'
							} `}
						>
							<Sidebar />
						</div>
					)}
					<div
						className={`
						  ${
								activeMenu && !login
									? 'md:ml-[17.5rem] w-full'
									: 'flex-2'
							} dark:bg-main-bg bg-main-bg min-h-screen w-full`}
					>
						<div
							className={`${
								login
									? 'hidden w-0'
									: ' md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'
							}`}
						>
							<Navbar />
						</div>
						<div className=' min-h-screen'>
							<div className='dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white pt-[50px] md:pt-0 '>
								<div className=' pb-[30px] dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white pl-[3rem] '>
									{children}
									<CenteredModal
										modalIsOpen={openLogoutModal}
										setIsOpen={setOpenLogoutModal}
									>
										<div className='px-[20px]'>
											<div className='flex justify-between items-center'>
												<p className='font-[600] text-[1.25rem] leading-[2.375rem] text-[#2E3646]'>
													Log out
												</p>
												<FaWindowClose
													className='cursor-pointer'
													onClick={() =>
														setOpenLogoutModal(
															(preveState) =>
																!preveState
														)
													}
												/>
											</div>
											<p className='my-[1.5rem] font-[400] text-[0.875rem] leading-[1.5rem] text-[#5F6D7E] text-center'>
												This action will log you out of
												this website.
											</p>
											<div className='flex gap-x-[0.75rem]'>
												<button
													type='submit'
													className=' py-[8px] px-[16px] rounded-lg bg-[#DB2438]  font-dmsans font-[500] text-[18px] text-white'
													onClick={() => {
														handleLogout();
														setOpenLogoutModal(
															false
														);
													}}
												>
													Yes, Log out
												</button>
												<button
													type='submit'
													className=' py-[8px] px-[16px] rounded-lg border border-[#D1D5DB] font-[500] text-[18px] text-black '
													onClick={() =>
														setOpenLogoutModal(
															(preveState) =>
																!preveState
														)
													}
												>
													No, continue
												</button>
											</div>
										</div>
									</CenteredModal>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isSignOut && (
				<div className='loader-bg-white flex-col'>
					<CirclesBarLoader />
					<h1 className='text-[1.3rem] mt-2'>Signing you out...</h1>
				</div>
			)}
		</>
	);
}

export default DashboardLayout;
