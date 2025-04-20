'use client';
import Nav from '@/components/common/Nav';
import { createAccount } from '@/hooks/commonService';
import { Button } from '@nextui-org/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function OTPVerification() {
	const OTP_LENGTH = 6;
	const [isLoading, setIsLoading] = useState(false);
	const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
	const inputRefs = useRef([]);
	const router = useRouter();
	const userEmail = Cookies.get('email');
	const handleChange = (e, index) => {
		const value = e.target.value.replace(/\D/, ''); // allow only digits
		if (!value) return;

		const updatedOtp = [...otp];
		updatedOtp[index] = value;
		setOtp(updatedOtp);

		// Move to next input
		if (index < OTP_LENGTH - 1 && value) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handlePaste = (e) => {
		const pasteData = e.clipboardData.getData('Text').slice(0, OTP_LENGTH);
		if (!/^\d{6}$/.test(pasteData)) return;

		const newOtp = pasteData.split('');
		setOtp(newOtp);

		// Focus the last input if full OTP is pasted
		if (inputRefs.current[OTP_LENGTH - 1]) {
			inputRefs.current[OTP_LENGTH - 1].focus();
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === 'Backspace') {
			if (otp[index]) {
				const updatedOtp = [...otp];
				updatedOtp[index] = '';
				setOtp(updatedOtp);
			} else if (index > 0) {
				inputRefs.current[index - 1].focus();
			}
		}
	};

	useEffect(() => {
		if (otp.every((digit) => digit !== '')) {
			const fullOtp = otp.join('');
			handleVerifyOtp(fullOtp);
		}
	}, [otp]);

	const handleVerifyOtp = async (enteredOtp, e) => {
		console.log('Verifying OTP:', enteredOtp);
		if (e && typeof e.preventDefault === 'function') {
			e.preventDefault();
		}

		setIsLoading(true);
		const userEmail = Cookies.get('email');
		try {
			const { data } = await createAccount('/confirm-signup', {
				email: userEmail?.toLowerCase(),
				code: enteredOtp,
			});
			console.log(data);
			toast.success(
				data.body.message || 'Account Confirmed successfully'
			);
			router.push('/signin');
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.body.message || 'Error occurred');
			if (error?.response?.status === 401) {
				toast.error('Invalid OTP');
			} else if (error?.response?.status === 500) {
				toast.error('Server error, please try again later');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='h-screen bg-[#F8F9FB] '>
			<ToastContainer />
			<Nav link={'/reset-password'} />
			<div className='flex justify-center bg-[#F8F9FB]  items-center h-[90vh] overflow-y-hidden'>
				<div
					className='flex flex-col  w-[27.625rem] p-8  rounded-[1rem] bg-white '
					style={{
						boxShadow:
							'0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 6px 0px rgba(0, 0, 0, 0.10);',
					}}
				>
					<div className='flex justify-center w-full'>
						<Image
							src={'/images/illustrations/confirm.svg'}
							width={200}
							height={131}
						></Image>
					</div>
					<div className='mt-[2.5rem] flex flex-col items-center justify-center'>
						<h1 className='font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem]'>
							Enter Your Code
						</h1>
						<p className='font-[500] text-[1rem] leading-[140%] text-[#89898A]'>
							We’ve sent a code to{' '}
						</p>
						<p className='font-[500] text-[1rem] leading-[140%] text-primary mt-2'>
							{userEmail ? userEmail : 'test@email.com'}
						</p>
					</div>
					<div className='mt-[2rem] flex gap-2 mx-auto'>
						{/* <div className=''> */}
						{otp.map((digit, index) => (
							<input
								key={index}
								type='text'
								inputMode='numeric'
								maxLength='1'
								className='w-[3rem] h-[3rem] py-[0.25rem] px-[1rem] border text-center text-lg rounded-[0.75rem] focus:outline-none focus:border-primary'
								value={digit}
								onChange={(e) => handleChange(e, index)}
								onKeyDown={(e) => handleKeyDown(e, index)}
								onPaste={handlePaste}
								ref={(el) => (inputRefs.current[index] = el)}
							/>
						))}
						{/* </div> */}
					</div>
					<div className='mt-[2.5rem] '>
						<div className='mt-[1.5rem]'>
							<Button
								onClick={handleVerifyOtp}
								isLoading={isLoading}
								className='flex items-center w-full justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6]  hover:bg-secondaryBlue text-white'
							>
								Continue
							</Button>
						</div>
						<p className='mt-[2.5rem] text-center'>
							Didn’t receive the email?{' '}
							<span className=' text-primary cursor-pointer'>
								Click to Resend
							</span>{' '}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
