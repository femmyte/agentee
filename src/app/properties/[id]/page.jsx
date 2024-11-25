import DefaultNavbar from '@/components/common/Navbar';
import Image from 'next/image';
import React from 'react';

const Property = ({ params }) => {
	console.log(params);

	return (
		<>
			<DefaultNavbar />
			<div className='my-[4.94rem] px-[6.5rem]'>
				<div className='flex gap-x-[11.5rem] mb-[0.62rem]'>
					<div className=''>
						<h1 className='dark:text-white text-[#202020] text-3xl mb-2 font-[500] leading-3'>
							3 Bedroom at Lekki
						</h1>
						<p className='text-[1rem] font-[400] leading-6'>
							Lekki, Chevron drive, Around Ibeju lekki
						</p>
					</div>
					<div className=''></div>
				</div>
				<div className='flex gap-x-[0.94rem]'>
					<Image
						src='/images/property.png'
						alt='Property Image'
						height={647}
						width={870}
					/>
					<div className=''>
						<Image
							src={'/images/property1.png'}
							alt='property'
							height={484}
							width={600}
						></Image>
						<div className='flex gap-3'>
							<Image
								src={'/images/property2.png'}
								alt='property'
								height={484}
								width={600}
							></Image>
							<Image
								src={'/images/property3.png'}
								alt='property'
								height={484}
								width={600}
							></Image>
						</div>
					</div>
				</div>
				<div className='mt-[5.98rem] '>
					<h3 className='text-[1.75rem] font[500] leading-10'>
						General Information
					</h3>
					<div className='flex gap-x-[1.62rem]'>
						<p className='text-[1rem] font[400] leading-1'>
							2 bedroom
						</p>
						<p className='text-[1rem] font[400] leading-1'>
							2Toilets
						</p>
						<p className='text-[1rem] font[400] leading-1'>
							POP ceiling
						</p>
					</div>
					<p className='text-[1rem] font[400] leading-10'>
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the
						industry&apos;s standard dummy text ever since the
						1500s, when an unknown printer took a galley of type and
						scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into
						electronic typesetting, remaining essentially unchanged.
						It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and
						more recently with desktop publishing software like
						Aldus PageMaker including versions of Lorem Ipsum.
					</p>
				</div>
			</div>
		</>
	);
};

export default Property;
