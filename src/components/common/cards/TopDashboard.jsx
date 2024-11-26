import Image from 'next/image';
import React from 'react';

const TopDashboard = ({ title, total }) => {
	return (
		<div className='p-4 flex flex-col  justify-center gap-3 rounded-[0.625rem] bg-white'>
			<div className='flex flex-col'>
				<div className='flex  gap-2'>
					<Image
						src={'/images/icons/dash.svg'}
						width={23}
						height={23}
						alt='icon'
					/>
					<div className='mb-[0.75rem]'>
						<p className='text-4 font[500] text-[#202020] mb-[0.12rem]'>
							{title}
						</p>
						<p className='text-[0.875rem] font[400] text-[#89898B]'>
							This Month
						</p>
					</div>
				</div>
				<div className=''>
					<p className='text-5 font[500] text-[#202020]'>
						{total} <span className='text-success text-4'>50%</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default TopDashboard;
