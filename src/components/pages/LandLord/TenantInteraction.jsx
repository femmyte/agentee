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

const TenantInteraction = () => {
	const { landlordData, setLandlordData } = useStateContext();
	const [option, setOption] = useState('');
	const [isActive, setIsActive] = useState(true);
	const [message, setMessage] = useState({
		type: '',
		title: '',
		content: '',
	});
	const checkHandler = (item) => {
		if (item === 'yes') {
			setOption(true);
		} else {
			setOption(false);
		}
	};
	const router = useRouter();
	const handleRoute = () => {
		router.back();
	};
	// Retrieve the session and router so that we can navigate
	// the user back home if they are already authenticated
	// const { status } = useSession();

	// If the user is authenticated, redirect them to the home
	// page
	// if (status === 'authenticated') {
	// 	router.replace('/auth/overview');
	// }
	const handleNext = (e) => {
		e.preventDefault();
		setLandlordData({
			...landlordData,
			tenantInteraction: option,
		});
		router.replace('/landlord/onboarding/agent-option');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className='h-screen bg-[#F8F9FB] overflow-x-hidden'>
			<Nav />
			<section className='flex items-center justify-center py-[3rem]'>
				<div className='px-3 md:px-[29rem]'>
					<article className='mb-[1rem]'>
						<h1 className='font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem] text-center '>
							Welcome Honorable House Owner
						</h1>
						<p className='font-[500] text-[1rem] leading-[140%] text-[#89898A] text-center'>
							Tenant Interaction Preference
						</p>
					</article>
					<div className='flex justify-center w-full px-5 md:px-0 mt-[2.5rem]'>
						<Image
							src={'/images/illustrations/landlord_1.svg'}
							width={200}
							height={173}
							alt='landlord illustration'
						></Image>
					</div>
					<section className='flex flex-col items-center px-4 md:px-0'>
						<p className='font-[600] text-[1rem] leadin mt-[2.6rem] text-[#202020]'>
							How Do You Want to Interact with Tenants?
						</p>
						<div className='ml-5'>
							<div className='mt-4 flex gap-x-2'>
								<input
									type='radio'
									// name='userType'
									id='yes'
									value='yes'
									checked={option === true}
									onChange={(e) => checkHandler('yes')}
								/>
								<label htmlFor='yes' className='text-black'>
									I Want to Interact with Tenants Directly
								</label>
							</div>

							<div className='mt-4 flex gap-x-2'>
								<input
									type='radio'
									// name='userType'
									id='no'
									value='no'
									checked={option === false}
									onChange={(e) => checkHandler('no')}
								/>
								<label htmlFor='no' className='text-black'>
									I Want an Agent to Interact with Tenants
								</label>
							</div>
						</div>
					</section>
					<div className='mt-[3.43rem] flex flex-col md:flex-row justify-center md:justify-end gap-x-[0.75rem] gap-y-3 px-4'>
						<Button
							onClick={handleRoute}
							className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-transparent border border-[#E9E9EB] text-black w-full md:w-[6.87rem]'
						>
							Back
						</Button>
						{option ? (
							<Button
								href={'#'}
								className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white hover:bg-secondaryBlue w-full md:w-[6.87rem]'
								onClick={handleSubmit}
							>
								Submit
							</Button>
						) : (
							<Button
								href={'#'}
								className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white hover:bg-secondaryBlue w-full md:w-[6.87rem]'
								onClick={handleNext}
							>
								Next
							</Button>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

export default TenantInteraction;
