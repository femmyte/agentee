'use client';
import React, { useState } from 'react';
import Nav from '@/components/common/Nav';
import Image from 'next/image';
import Link from 'next/link';
import FileUpload from '@/components/common/FileUpload';
import { useRouter } from 'next/navigation';
import { createAccount } from '@/hooks/commonService';
import { useStateContext } from '@/providers/contextProvider';
import { Button } from '@nextui-org/react';

const LandLord = () => {
	const { landlordData, setLandlordData } = useStateContext();
	const [country, setCountry] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');
	const [about, setAbout] = useState('');
	const [isActive, setIsActive] = useState(true);
	const [message, setMessage] = useState({
		type: '',
		title: '',
		content: '',
	});
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Retrieve the session and router so that we can navigate
	// the user back home if they are already authenticated
	// const { status } = useSession();
	const router = useRouter();

	// If the user is authenticated, redirect them to the home
	// page
	// if (status === 'authenticated') {
	// 	router.replace('/auth/overview');
	// }

	const handleNext = (e) => {
		e.preventDefault();
		setLandlordData({
			...landlordData,
			country: country,
			state: state,
			city: city,
			address: address,
			about: about,
		});
		router.replace('/landlord/onboarding/tenant-interaction');
		console.log(landlordData);
	};

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();

	// 	setIsLoading(true);

	// 	try {
	// 		const { data } = await createAccount('/users/signup', {
	// 			email: email?.toLowerCase(),
	// 			password: password,
	// 			fullName: fullName,
	// 			phoneNumber: phoneNumber,
	// 		});
	// 		toast.success(data.message);
	// 		console.log(data);
	// 	} catch (error) {
	// 		console.log(error?.response?.data?.message);
	// 		toast.error(error?.response?.data.message);
	// 	} finally {
	// 		setIsLoading(false);
	// 		setEmail('');
	// 		setPassword('');
	// 	}
	// };
	return (
		<div className='h-screen bg-[#F8F9FB] overflow-x-hidden'>
			<Nav link={'/confirmation'} />
			<section className='flex items-center justify-center py-[3rem]'>
				<div className=' w-[40rem]'>
					<article className='mb-[1rem]'>
						<h1 className='font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem] text-center '>
							Welcome Honorable House Owner
						</h1>
						<p className='font-[500] text-[1rem] leading-[140%] text-[#89898A] text-center'>
							Personal information
						</p>
					</article>
					<section className='grid grid-cols-1 md:grid-cols-2 gap-y-[1.125rem] gap-x-[1.12rem] px-4 md:px-0 mt-[2.82rem]'>
						{/* <div className="flex "> */}

						<div className=''>
							<label
								htmlFor='country'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								Country
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your full name'
								id='country'
								required
								onChange={(e) => setCountry(e.target.value)}
								name={country}
								value={country}
							></input>
						</div>
						<div className=''>
							<label
								htmlFor='city'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								City
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your City'
								id='city'
								required
								onChange={(e) => setCity(e.target.value)}
								name={city}
								value={city}
							></input>
						</div>
						<div className=''>
							<label
								htmlFor='state'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								State
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your State'
								id='state'
								required
								onChange={(e) => setState(e.target.value)}
								name={state}
								value={state}
							></input>
						</div>
						<div className=''>
							<label
								htmlFor='address'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								Home Address
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your Years of address'
								id='experience'
								required
								onChange={(e) => setAddress(e.target.value)}
								name={address}
								value={address}
							></input>
						</div>

						{/* </div> */}
					</section>
					<div className='mt-[1.125rem] px-4 md:px-0'>
						<label
							htmlFor='about'
							className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
						>
							About me
						</label>
						<textarea
							id='about'
							cols='30'
							rows='10'
							className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[4.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
							placeholder='Enter a brief information about you'
							required
							onChange={(e) => setAbout(e.target.value)}
							name={about}
							value={about}
						></textarea>
					</div>
					<div className='mt-[1.25rem] px-4 md:px-0'>
						<p className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'>
							Upload Profile Picture
						</p>
						<FileUpload />
					</div>
					<div className='mt-[3.43rem] flex justify-center md:justify-end gap-x-[0.75rem]'>
						<Link
							href={'/who-are-you'}
							className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-transparent border border-[#E9E9EB] text-black'
						>
							Back
						</Link>
						<Button
							// href={'#'}
							onClick={handleNext}
							className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white hover:bg-secondaryBlue'
						>
							Next
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default LandLord;
