'use client';
import Google from '@/components/common/buttons/Google';
import { Button, ButtonGroup, Input } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import { FaEyeSlash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
const Signin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [isVisible, setIsVisible] = React.useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleLogin = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			// Call our internal API route instead of the external endpoint directly
			const response = await axios.post('/api/auth', {
				email,
				password,
			});
			console.log('Login response:', response.data);

			if (response.data.success) {
				const decoded = jwtDecode(response.data.decoded);

				toast.success('Login successful');

				// Optional: Store non-sensitive data in local state if needed
				// Redirect
				if (decoded?.['custom:completed_setup'] === 'false') {
					router.push('/welcome');
				} else {
					if (decoded?.['custom:user-type'] === 'agent') {
						router.push('/agent/');
					} else if (decoded?.['custom:user-type'] === 'landlord') {
						router.push('/landlord/');
					} else {
						router.push('/tenant/');
					}
				}
				Cookies.set('role', decoded?.['custom:user-type'], {
					expires: 1, // 1 day
					path: '/',
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'Strict',
				});
			} else {
				toast.error('Login failed');
			}
		} catch (err) {
			console.log('Login error:', err);

			const status = err.response?.status;
			const apiMessage = err.response?.data?.body?.message;

			let userFriendlyMessage =
				'An unexpected error occurred. Please try again.';

			if (status === 400) {
				userFriendlyMessage =
					'Invalid email or password. Please check your credentials.';
			} else if (status === 403) {
				userFriendlyMessage =
					'Your account is not authorized. Please contact support.';
			} else if (status === 500) {
				userFriendlyMessage = 'Server error. Please try again later.';
			} else if (apiMessage) {
				userFriendlyMessage = apiMessage;
			}

			toast.error(userFriendlyMessage);

			setError(userFriendlyMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 md:mh-screen py-[3.47rem] px-[2.8rem]  bg-white'>
			<div className='col-span-1 w-full flex justify-center items-center'>
				<div className='flex flex-col  w-[27.6rem]'>
					<div>
						<Image
							src={'/images/logo.svg'}
							width={98}
							height={17}
						></Image>
					</div>
					<div className='mt-[2.5rem]'>
						<h1 className='font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem]'>
							Sign in to your account
						</h1>
						<p className='font-[500] text-[1rem] leading-[140%] text-[#89898A]'>
							Making House Renting Hassle-Free
						</p>
					</div>
					<div className='mt-[2.5rem] mb-[1rem]'>
						<div className=' mb-[1rem]'>
							<label
								htmlFor='email'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								Email
							</label>
							<Input
								type='email'
								variant='bordered'
								color='#E9E9EB'
								className=' font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your email'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							></Input>
						</div>
						<div className=' mb-[1rem]'>
							<label
								htmlFor='Password'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								Password
							</label>
							<div className=''>
								<Input
									// label='Password'
									color='#E9E9EB'
									variant='bordered'
									placeholder='Enter your password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
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
								/>
							</div>
							{/* <div className='flex justify-between w-full gap-x-2 border border-[#E9E9EB] bg-white rounded-[0.375rem]'>
                                <input
                                    type='password'
                                    className='  rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] w-full text-[#89898A] '
                                    placeholder='Enter your Password'
                                    id='Password'
                                />
                                <Image
                                    src={'/images/icons/eye.svg'}
                                    width={20}
                                    height={20}
                                    className='mr-1'
                                />
                            </div> */}
						</div>

						<div className='flex gap-x-2 mt-[2rem] items-center justify-between'>
							<div className='flex gap-x-2 items-center'>
								<input
									type='checkbox'
									className='w-4 h-4 border border-[#E9E9EB]'
									id='remember_me'
								/>
								<label
									htmlFor='remember_me'
									className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020] block'
								>
									Remember me
								</label>
							</div>
							<Link
								href={'/reset-password'}
								className='font-[500] text-[0.875rem] leading-[1.225rem] text-primary '
							>
								Forgot Passord?
							</Link>
						</div>
						<div className='mt-[1.5rem]'>
							<Button
								onClick={handleLogin}
								isLoading={loading}
								disabled={!email || !password}
								href={'/welcome'}
								className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6]  hover:bg-secondaryBlue text-white w-full'
							>
								Sign In
							</Button>
						</div>
						<Google text={'Sign in with Google'} />
					</div>
					<div className='flex justify-center gap-1'>
						<span className='font-[500] text-[0.875rem] leading-[1.225rem] text-[#89898A] '>
							Dont have an account?
						</span>
						{'  '}
						<Link
							href={'/signup'}
							className='font-[500] text-[0.875rem] leading-[1.225rem] text-primary '
						>
							Sign Up
						</Link>
					</div>
				</div>
			</div>
			<div className='mt-8 md:mt-0 col-span-1'>
				<img
					src={'/images/house2.png'}
					alt='house '
					className='h-[40rem] w-[41rem]'
				/>
			</div>
		</div>
	);
};

export default Signin;
