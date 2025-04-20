'use client';
import SwitchMode from '@/components/common/SwitchMode';
import Google from '@/components/common/buttons/Google';
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BsFillEyeFill } from 'react-icons/bs';
import { FaEyeSlash } from 'react-icons/fa';
import { createAccount } from '@/hooks/commonService';
import Cookies from 'js-cookie';

const Registration = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [fullName, setFullName] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [isActive, setIsActive] = useState(true);
	const [isVisible, setIsVisible] = React.useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	// Retrieve the session and router so that we can navigate
	// the user back home if they are already authenticated
	// const { status } = useSession();
	const router = useRouter();

	// If the user is authenticated, redirect them to the home
	// page
	// if (status === 'authenticated') {
	// 	router.replace('/auth/overview');
	// }
	// if (!fullName && !phoneNumber && !email && !password && !confirmPassword) {
	// 	setIsActive(false);
	// }
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('the two password does not match');
			return;
		}
		setIsLoading(true);

		try {
			const { data } = await createAccount('/signup', {
				email: email?.toLowerCase(),
				password: password,
				full_name: fullName,
				phone_number: phoneNumber,
			});
			Cookies.set('email', email, {
				expires: 1 / 24, // Expires in 1 hour
				path: '/',
			});

			// Redirect to OTP verification page

			toast.success(
				'Account created successfully redirecting to account confirmation page'
			);
			router.push('/signup/confirm');
			// toast.success(data.body.message || 'Account created successfully');
			console.log(data);
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data.message);
		} finally {
			setIsLoading(false);
			setEmail('');
			setPassword('');
		}
	};

	return (
		<>
			<ToastContainer />
			<div className='grid grid-cols-1 md:grid-cols-2  py-[3.47rem] px-[2.8rem]'>
				<div className='col-span-1 w-full flex justify-center items-center'>
					<div className='flex flex-col  w-[27.6rem]'>
						<div className='flex justify-between'>
							<Image
								src={'/images/logo.svg'}
								width={98}
								height={17}
								alt='logo'
							></Image>
							<SwitchMode />
						</div>
						<div className='mt-[2.5rem]'>
							<h1 className='font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem]'>
								Register
							</h1>
							<p className='font-[500] text-[1rem] leading-[140%] text-[#89898A]'>
								Making House Renting Hassle-Free
							</p>
						</div>
						<div className='mt-[2.5rem] mb-[1rem]'>
							<div className=' mb-[1rem]'>
								<label
									htmlFor='full_name'
									className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
								>
									Full name
								</label>
								<input
									type='text'
									className='border border-[#E9E9EB] rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
									placeholder='Enter your full name'
									id='full_name'
									onChange={(e) =>
										setFullName(e.target.value)
									}
									name={fullName}
									value={fullName}
								></input>
							</div>
							<div className=' mb-[1rem]'>
								<label
									htmlFor='email'
									className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
								>
									Email
								</label>
								<input
									type='email'
									className='border border-[#E9E9EB] rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
									placeholder='Enter your email'
									id='email'
									onChange={(e) => setEmail(e.target.value)}
									name={email}
									value={email}
								></input>
							</div>
							<div className=' mb-[1rem]'>
								<label
									htmlFor='phone_number'
									className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
								>
									Phone Number
								</label>
								<input
									type='tel'
									className='border border-[#E9E9EB] rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
									placeholder='Enter your Phone Number'
									id='phone_number'
									onChange={(e) =>
										setPhoneNumber(e.target.value)
									}
									name={phoneNumber}
									value={phoneNumber}
								></input>
							</div>
							<div className=' mb-[1rem]'>
								<label
									htmlFor='Password'
									className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
								>
									Password
								</label>
								<Input
									// label='Password'
									color='#E9E9EB'
									variant='bordered'
									placeholder='Enter your password'
									// labelPlacement='outside'
									endContent={
										<button
											className='focus:outline-none'
											type='button'
											onClick={toggleVisibility}
											aria-label='toggle password visibility'
										>
											{isVisible ? (
												<FaEyeSlash className='text-2xl text-default-400 pointer-events-none' />
											) : (
												<BsFillEyeFill className='text-2xl text-default-400 pointer-events-none' />
											)}
										</button>
									}
									type={isVisible ? 'text' : 'password'}
									className='max-full'
									onChange={(e) =>
										setPassword(e.target.value)
									}
									name={password}
									value={password}
								/>
							</div>
							<div className=' mb-[1rem]'>
								<label
									htmlFor='Password'
									className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
								>
									Confirm Password
								</label>
								<Input
									// label='Password'
									color='#E9E9EB'
									variant='bordered'
									placeholder='Confirm your password'
									// labelPlacement='outside'
									endContent={
										<button
											className='focus:outline-none'
											type='button'
											onClick={() =>
												setIsConfirmVisible(
													!isConfirmVisible
												)
											}
											aria-label='toggle password visibility'
										>
											{isConfirmVisible ? (
												<FaEyeSlash className='text-2xl text-default-400 pointer-events-none' />
											) : (
												<BsFillEyeFill className='text-2xl text-default-400 pointer-events-none' />
											)}
										</button>
									}
									type={
										isConfirmVisible ? 'text' : 'password'
									}
									className='max-full'
									id='c_Password'
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									name={confirmPassword}
									value={confirmPassword}
								/>
							</div>
							{/* <div className='flex justify-between w-full gap-x-2 border border-[#E9E9EB] rounded-[0.375rem]'>
									<input
										type='password'
										className='  rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] w-full text-[#89898A] '
										placeholder='Enter your Password'
										id='Password'
										onChange={(e) =>
											setPassword(e.target.value)
										}
										name={password}
										value={password}
									/>
									<Image
										src={'/images/icons/eye.svg'}
										width={20}
										height={20}
										className='mr-1'
									/>
								</div>
							<div className=' mb-[1rem]'>
								<label
									htmlFor='c_Password'
									className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
								>
									Confirm Password
								</label>
								<div className='flex justify-between w-full gap-x-2 border border-[#E9E9EB] rounded-[0.375rem]'>
									<input
										type='password'
										className='   p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] w-full text-[#89898A] '
										placeholder='Enter your Password'
										id='c_Password'
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
										name={confirmPassword}
										value={confirmPassword}
									/>
									<Image
										src={'/images/icons/eye.svg'}
										width={20}
										height={20}
										className='mr-1'
									/>
								</div>
							</div> */}
							<div className='flex gap-x-2 mt-[2rem]'>
								<input
									type='checkbox'
									className='w-4 h-4 border border-[#E9E9EB]'
									id='remember_me'
								/>
								<label
									htmlFor='remember_me'
									className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
								>
									Remember me
								</label>
							</div>
							<div className='mt-[1.5rem]'>
								<Button
									className=' disabled:cursor-not-allowed flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6]  hover:bg-secondaryBlue text-white w-full'
									onClick={handleSubmit}
									// disabled={isActive}
								>
									Sign up
								</Button>
							</div>
							<Google text={'Sign in with Google'} />
						</div>
						<div className='flex justify-center gap-1'>
							<span className='font-[500] text-[0.875rem] leading-[1.225rem] text-[#89898A] '>
								Already have an account?
							</span>
							{'  '}
							<Link
								href={'/signin'}
								className='font-[500] text-[0.875rem] leading-[1.225rem] text-primary '
							>
								Sign In
							</Link>
						</div>
					</div>
				</div>
				<div className='mt-8 md:mt-0 col-span-1'>
					<img
						src={'/images/house1.png'}
						alt='house '
						className=' w-[41rem]'
					/>
				</div>
			</div>
			{/* Confirmation Modal */}
			<Modal
				isOpen={showConfirmModal}
				onClose={() => setShowConfirmModal(false)}
			>
				<ModalContent>
					<ModalHeader className='items-center justify-center mt-3'>
						<img
							src='/icons/sent.svg'
							width={50}
							height={50}
							alt=''
						/>
					</ModalHeader>
					<ModalBody className='items-center justify-center'>
						<h4 className='text-2xl font-semibold mt-4'>
							Message Sent Successfully!
						</h4>
						<p>
							Your Invitation Message has been successfully sent
							to the staff. They will receive an email with
							further instructions shortly.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button
							color='danger'
							onClick={() => {
								setShowConfirmModal(false);
							}}
							className='w-full'
						>
							Go Back
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Registration;
