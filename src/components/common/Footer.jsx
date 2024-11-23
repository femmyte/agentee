import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<footer className='bg-[#F5F8FF] py-[60px] px-6 md:px-[5.62rem]'>
			<section className='grid grid-cols-1 md:grid-cols-6 justify-between w-full'>
				<div className='flex flex-col justify-start items-center md:items-start mb-[30px] md:mb-0'>
					<div className=''>
						<img src='/images/logo.svg' alt='Agentee logo footer' />
					</div>
				</div>
				<div className='text-center md:text-left mb-[30px] md:mb-0'>
					<h1 className='text-[1.25rem] font-[500] leading-[30px] text-primary'>
						Find your home
					</h1>
					<ul className='text-center  md:text-left dark:text-black'>
						<li className='text-[16px] leading-[24px] font-[400] mt-[15px]'>
							Search Location
						</li>
					</ul>
				</div>
				<div className='text-center md:text-left mb-[30px] md:mb-0'>
					<h1 className='text-[1.25rem] font-[500] leading-[30px] text-primary'>
						Products
					</h1>
					<ul className='text-center  md:text-left dark:text-black'>
						<li className='text-[16px] leading-[24px] font-[400] mt-[15px]'>
							Agents
						</li>
						<li className='text-[16px] leading-[24px] font-[400] mt-[15px]'>
							Apartment
						</li>
					</ul>
				</div>
				<div className='text-center md:text-left mb-[30px] md:mb-0'>
					<h1 className='text-[1.25rem] font-[500] leading-[30px] text-primary'>
						Company
					</h1>
					<ul className='text-center  md:text-left dark:text-black'>
						<li className='text-[16px] leading-[24px] font-[400] mt-[0.75rem]'>
							About
						</li>
						<li className='text-[16px] leading-[24px] font-[400] mt-[0.75rem]'>
							Mission and Visiob
						</li>
						<li className='text-[16px] leading-[24px] font-[400] mt-[0.75rem]'>
							Blog
						</li>
					</ul>
				</div>
				<div className='text-center md:text-left mb-[30px] md:mb-0'>
					<h1 className='text-[1.25rem] font-[500] leading-[30px] text-primary'>
						Legal
					</h1>
					<ul className='text-center  md:text-left dark:text-black'>
						<li className='text-[16px] leading-[24px] font-[400] mt-[15px]'>
							Legal Services
						</li>
						<li className='text-[16px] leading-[24px] font-[400] mt-[0.75rem]'>
							Security
						</li>
					</ul>
				</div>
				<div className='text-center md:text-left mb-[30px] md:mb-0'>
					<h1 className='text-[1.25rem] font-[500] leading-[30px] text-primary'>
						Get in Touch
					</h1>
					<ul className='text-center  md:text-left dark:text-black'>
						<li className='text-[16px] leading-[24px] font-[400] mt-[15px]'>
							Support@Agentee.com
						</li>
						<li className='text-[16px] leading-[24px] font-[400] mt-[0.75rem]'>
							+234 813 7897 013
						</li>
						<li className='text-[16px] leading-[24px] font-[400] mt-[0.75rem]'>
							Lagos, Nigeria.
						</li>
					</ul>
				</div>
			</section>
			<section className='flex flex-col md:flex-row gap-y-3 justify-between items-center mt-[30px] gap-2'>
				<div className='flex flex-col md:flex-row justify-start items-center gap-2 dark:text-black'>
					<p className='text-[16px] leading-[24px] font-[400] text-center dark:text-black'>
						AgenteeHq © {new Date().getFullYear()} All Rights
						Reserved.
					</p>
					<Link href={'#'}>Term of service</Link>
					<Link href={'#'}>Privacy policy</Link>
				</div>
				<div className='flex items-center justify-center gap-x-4'>
					<a href='#' target='_blank' rel='noopener noreferrer'>
						<Image
							src={'/images/icons/facebook.svg'}
							alt='facebook icon'
							width={24}
							height={27}
						/>
					</a>
					<a href='#' target='_blank' rel='noopener noreferrer'>
						<Image
							src={'/images/icons/whatsapp.svg'}
							alt='x icon'
							width={24}
							height={27}
						/>
					</a>
					<a href='#' target='_blank' rel='noopener noreferrer'>
						<Image
							src={'/images/icons/instagram.svg'}
							alt='instagram icon'
							width={24}
							height={27}
						/>
					</a>
					<Image
						src={'/images/icons/linkedin.svg'}
						alt='linkedin icon'
						width={24}
						height={27}
					/>
					<Image
						src={'/images/icons/twitter.svg'}
						alt='linkedin icon'
						width={24}
						height={27}
					/>
				</div>
			</section>
		</footer>
	);
};

export default Footer;
