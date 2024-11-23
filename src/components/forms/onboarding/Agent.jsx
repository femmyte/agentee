import React from 'react';
import Nav from '@/components/common/Nav';
import Image from 'next/image';
import Link from 'next/link';
import FileUpload from '@/components/common/FileUpload';

const Agent = () => {
	return (
		<div className='h-screen bg-[#F8F9FB] overflow-x-hidden'>
			<Nav link={'/confirmation'} />
			<section className='flex items-center justify-center py-[3rem]'>
				<div className=' w-[40rem]'>
					<article className='mb-[1rem]'>
						<h1 className='font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem] text-center '>
							Welcome Super Agent{' '}
						</h1>
						<p className='font-[500] text-[1rem] leading-[140%] text-[#89898A] text-center'>
							Company information
						</p>
					</article>
					<section className='grid grid-cols-1 md:grid-cols-2 gap-y-[1.125rem] gap-x-[1.12rem] px-4 md:px-0 mt-[2.82rem]'>
						{/* <div className="flex "> */}
						<div className=''>
							<label
								htmlFor='company_name'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								Company Name
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your Company Name'
								id='company_name'
							></input>
						</div>
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
							></input>
						</div>
						<div className=''>
							<label
								htmlFor='experience'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								Years of Experience
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your Years of Experience'
								id='experience'
							></input>
						</div>
						<div className=''>
							<label
								htmlFor='address'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								Office Address
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your Office  Address'
								id='address'
							></input>
						</div>

						{/* </div> */}
					</section>
					<div className='mt-[1.125rem] px-4 md:px-0'>
						<label
							htmlFor='about'
							className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
						>
							About Me
						</label>
						<textarea
							name='about'
							id='about'
							cols='30'
							rows='10'
							className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[4.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
							placeholder='Tell us about yourself'
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
						<Link
							href={'#'}
							className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white hover:bg-secondaryBlue'
						>
							Next
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Agent;
