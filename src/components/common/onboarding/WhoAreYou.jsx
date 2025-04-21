'use client';
import React, { useState } from 'react';
import Nav from '../Nav';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { AuthPost } from '@/hooks/commonService';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { Button } from '@nextui-org/react';
import FullLoader from '@/components/loaders/FullLoader';

const WhoAreYou = () => {
	const [user, setUser] = useState('');
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const checkHandler = (item) => {
		setUser(item);
	};
	const changeRoute = () => {
		// if (user == 'landlord') {
		router.push(`/${user}/onboarding/register`);
		Cookies.set('role', user, {
			expires: 1, // 1 day
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'Strict',
		});
		// }
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const accessToken = Cookies.get('accessToken');
		setLoading(true);

		try {
			const { data } = await AuthPost(
				'/update-user-data',
				{
					role: user,
				},
				accessToken
			);

			console.log(data);
			if (data.body.success) {
				Cookies.set('role', user, {
					expires: 1, // 1 day
					path: '/',
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'Strict',
				});
				toast.success(
					data.body.message ||
						'Account updated successfully redirecting to your dashboard'
				);
				router.push(`/tenant`);
			} else {
				toast.error(data.errorMessage);
			}
			// toast.success(data.body.message || 'Account created successfully');
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <FullLoader />;
	}

	return (
		<div className='h-screen bg-[#F8F9FB] overflow-x-hidden'>
			<Nav link={'/confirmation'} />
			<section className='flex items-center justify-center py-[3rem]'>
				<div className=' w-[40rem]'>
					<article className='mb-[1rem]'>
						<h1 className='font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem] text-center '>
							Who Are You?
						</h1>
					</article>
					<div className='flex justify-center w-full'>
						<Image
							src={'/images/illustrations/who_are_you.svg'}
							width={114}
							height={118}
							alt='who are you'
						></Image>
					</div>
					<div className='flex flex-col md:flex-row gap-y-10 md:gap-y-0 justify-between w-full mt-[4.1rem]'>
						<div className='flex flex-col items-center justify-center'>
							<div className='h-[12.5rem] w-[187px] relative'>
								<Image
									src={'/images/illustrations/agent.svg'}
									fill
									alt='agent illustration'
								/>
							</div>
							<div className='mt-4 flex gap-x-2'>
								<input
									type='radio'
									// name='userType'
									id='agent'
									value='agent'
									checked={user === 'agent'}
									onChange={(e) => checkHandler('agent')}
								/>
								<label htmlFor='agent' className='text-black'>
									Agent
								</label>
							</div>
						</div>
						<div className='flex flex-col items-center justify-center'>
							<div className='h-[12.5rem] w-[187px] relative'>
								<Image
									src={'/images/illustrations/tenant.svg'}
									fill
									alt='tenant illustration'
								/>
							</div>
							<div className='mt-4 flex gap-2'>
								<input
									type='radio'
									// name='userType'
									id='tenant'
									value={'tenant'}
									checked={user === 'tenant'}
									onChange={(e) => checkHandler('tenant')}
								/>
								<label htmlFor='tenant' className='text-black'>
									Tenant
								</label>
							</div>
						</div>
						<div className='flex flex-col items-center justify-center'>
							<div className='h-[12.5rem] w-[187px] relative'>
								<Image
									src={'/images/illustrations/landlord.svg'}
									fill
									alt='house owner illustration'
								/>
							</div>
							<div className='mt-4 flex gap-2'>
								<input
									type='radio'
									// name='userType'
									id='landlord'
									value={'landlord'}
									checked={user === 'landlord'}
									onChange={(e) => checkHandler('landlord')}
								/>
								<label
									htmlFor='landlord'
									className='text-black'
								>
									Landlord
								</label>
							</div>
						</div>
					</div>
					<div className='mt-[3.43rem] flex justify-center md:justify-end gap-x-[0.75rem]'>
						<Link
							href={'/welcome'}
							className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-transparent border border-[#E9E9EB] text-black'
						>
							Back
						</Link>
						{user === 'tenant' ? (
							<Button
								// href={"/agent-onboarding"}
								className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white hover:bg-secondaryBlue disabled:bg-[#BBD1FC]'
								onClick={handleSubmit}
								disabled={!user}
								isLoading={loading}
							>
								Submit
							</Button>
						) : (
							<button
								// href={"/agent-onboarding"}
								className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white hover:bg-secondaryBlue disabled:bg-[#BBD1FC]'
								onClick={changeRoute}
								disabled={!user}
							>
								Next
							</button>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

export default WhoAreYou;
