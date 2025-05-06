'use client';
import { useRouter } from 'next/navigation';
// import CenteredModal from '../CenteredModal';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useStateContext } from '@/providers/contextProvider';
// import { signOut } from 'next-auth/react';
import { FaWindowClose } from 'react-icons/fa';
// import CirclesBarLoader from '../CircleBarLoader';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@heroui/react';
import { useState } from 'react';
import Cookies from 'js-cookie';

function DashboardLayout({ children }) {
	const {
		activeMenu,
		darkToggle,
		login,
		openLogoutModal,
		setOpenLogoutModal,
	} = useStateContext();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const router = useRouter();

	const [isSignOut, setSignOut] = useState(false);

	const handleLogout = async () => {
		try {
			// Send request to server to clear HttpOnly cookies
			await fetch('/api/logout', {
				method: 'POST',
			});
			onOpen;
			onOpenChange(false);
			// Optionally clear any localStorage or non-HttpOnly client cookies
			Cookies.remove('user');
			Cookies.remove('role');

			router.push('/');
		} catch (err) {
			console.error('Logout failed:', err);
		}
	};

	// const handleLogout = async () => {
	// 	// setSignOut(true);
	// 	onOpen;
	// 	onOpenChange(false);
	// 	Cookies.remove('accessToken');
	// 	Cookies.remove('refreshToken');
	// 	Cookies.remove('authToken');
	// 	Cookies.remove('user');
	// 	Cookies.remove('role');
	// 	router.push('/');
	// };
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
								'w-full h-full md:w-[17.5rem]  fixed sidebar bg-white dark:bg-secondary-dark-bg'
							}
						>
							<Sidebar />
						</div>
					) : (
						<div className={`${'w-0 dark:bg-secondary-dark-bg'} `}>
							<Sidebar />
						</div>
					)}
					<div
						className={`
						  ${
								activeMenu ? 'md:ml-[17.5rem] w-full' : 'flex-2'
							} dark:bg-main-bg bg-white min-h-screen w-full`}
					>
						<div
							className={`${' md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'}`}
						>
							<Navbar />
						</div>
						<div className=' min-h-screen'>
							<div className='dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white pt-[50px] md:pt-0 '>
								<div className=' pb-[30px] dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white md:pl-[3rem] z-20 '>
									{children}
									<div className='flex px-10 justify-center items-center flex-col gap-4'>
										<Modal
											isOpen={openLogoutModal}
											placement={'center'}
											onOpenChange={onOpenChange}
										>
											<ModalContent>
												{(onClose) => (
													<>
														<ModalHeader className='flex flex-col gap-1'>
															<div className='flex justify-between items-center'>
																<p className='font-[600] text-[1.25rem] leading-[2.375rem] text-[#2E3646]'>
																	Log out
																</p>
																<FaWindowClose
																	className='cursor-pointer'
																	onClick={() =>
																		setOpenLogoutModal(
																			(
																				preveState
																			) =>
																				!preveState
																		)
																	}
																/>
															</div>
														</ModalHeader>
														<ModalBody>
															<div className='px-[20px]'>
																<p className='my-[1.5rem] font-[400] text-[0.875rem] leading-[1.5rem] text-[#5F6D7E] text-center'>
																	This action
																	will log you
																	out of this
																	website.
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
																		Yes, Log
																		out
																	</button>
																	<button
																		type='submit'
																		className=' py-[8px] px-[16px] rounded-lg border border-[#D1D5DB] font-[500] text-[18px] text-black '
																		onClick={() =>
																			setOpenLogoutModal(
																				(
																					preveState
																				) =>
																					!preveState
																			)
																		}
																	>
																		No,
																		continue
																	</button>
																</div>
															</div>
														</ModalBody>
														<ModalFooter>
															{/* <Button
																color='primary'
																onPress={
																	onSubmit
																}
															>
																Submit
															</Button> */}
														</ModalFooter>
													</>
												)}
											</ModalContent>
										</Modal>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isSignOut && (
				<div className='loader-bg-white flex-col'>
					{/* <CirclesBarLoader /> */}
					<h1 className='text-[1.3rem] mt-2'>Signing you out...</h1>
				</div>
			)}
		</>
	);
}

export default DashboardLayout;
