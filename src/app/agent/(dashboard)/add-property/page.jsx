'use client';
import React from 'react';
import DashboardLayout from '@/components/Navigation/DashboardLayout';

const AddProperty = () => {
	return (
		<DashboardLayout>
			<div className='pt-6 px-[2.2rem] bg-[#F1F9F4] min-h-screen'>
				<div className='bg-white p-8'>
					<section className='flex justify-between'>
						<div className='w-[28.5rem]'>
							<h1 className='dark:text-white text-[3rem] mb-2 font-[500] leading-[4.2rem] text-primary'>
								Upload that perfect House for your Clients
							</h1>
							<p className='text-[1.25rem] font-[400] leading-6 text-primary'>
								Your client are out there waiting for you......
							</p>
						</div>
						<div className=''>
							<img
								src='/images/appartment/upload.png'
								alt='house'
								className='w-[100%] h-[100%] object-cover'
							/>
						</div>
					</section>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default AddProperty;
