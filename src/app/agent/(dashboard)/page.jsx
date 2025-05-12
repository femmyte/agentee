import TopDashboard from '@/components/common/cards/TopDashboard';
import React from 'react';
import DashboardCalendar from './components/Calendar';
// import Image from 'next/image';
import { Button, Image } from '@nextui-org/react';
import FeaturedProperties from '@/components/common/cards/FeaturedProperties';
import { carouselItems } from '@/components/data';
import { MdFavoriteBorder, MdStar } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';

const MessageCard = () => {
	return (
		<div className='flex items-center justify-between w-full py-[0.625rem] px-6 bg-[#F5F8FF] mb-4'>
			<div className='flex gap-x-2'>
				<div className='h-11 w-11 rounded-full bg-[#D9D9D9]'></div>
				<div className=''>
					<p className='text-6 font-[600]'>John Doe</p>
					<p className='text-6 font-[600]'>Let meet at Lekki</p>
				</div>
			</div>
			<p className='text-6 font-[400]'>7:21am</p>
		</div>
	);
};
const Dashboard = () => {
	return (
		<section className='min-h-screen'>
			<div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
				<TopDashboard title={'Pending Transactions'} total={10} />
				<TopDashboard title={'Transaction'} total={10} />
				<TopDashboard title={'Message'} total={10} />
				<TopDashboard title={'Reviews'} total={10} />
				<TopDashboard title={'My houses'} total={10} />
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
				{/* calendar */}
				<div className='p-8 md:col-span-2 bg-white rounded-xl'>
					<div className='flex justify-between'>
						<p className='text-[1.125rem] font[450] text-lightDark'>
							Upcoming Inspection Date
						</p>
						<p className='text-4 font[600] text-primary'>
							view All
						</p>
					</div>
					<div className='w-full'>
						<DashboardCalendar />
					</div>
				</div>
				{/* post house */}
				<div className='p-8 col-span-1 bg-white rounded-xl flex flex-col items-center justify-center gap-y-[1.44rem]'>
					<Image
						src='/images/dashimage.png'
						alt='ima'
						className='w-full'
					/>
					<p className='text-[1rem] font[6000] text-lightDark'>
						Find a perfect house for you
					</p>
					<p className='text-[1.125rem] font[4000] text-lightDark'>
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry.
					</p>
					<Button
						color='warning'
						href='/signin'
						className='bg-primary text-white w-full'
					>
						Post a House
					</Button>
				</div>
			</div>
			{/* ongoing section */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
				<div className='p-8 md:col-span-2 bg-white rounded-xl'>
					<div className='flex justify-between'>
						<p className='text-[1.125rem] font[450] text-lightDark'>
							Ongoing House inspecting House
						</p>
						<p className='text-4 font[600] text-primary'>
							view All
						</p>
					</div>
					<div
						className='grid grid-cols-1 md:grid-cols-2 gap-[12px] border border-[#F8F9FB] p-4'
						style={{
							boxShadow:
								'0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
						}}
					>
						<div className='w-full relative'>
							<Image
								fill
								isZoomed
								alt='NextUI Fruit Image with Zoom'
								src='/images/property.png'
							/>
						</div>
						<div className=''>
							<div className='my-[20px] grid grid-cols-5 gap-2'>
								{carouselItems[0].images.map((image, i) => (
									<Image
										key={i}
										className='w-full'
										isZoomed
										// width={240}
										alt='NextUI Fruit Image with Zoom'
										src={image}
									/>
								))}
							</div>
							<div className='flex items-center justify-between'>
								<p className='font-[500] text-[20px] leading-[140%] dark:text-white text-[#202020] '>
									3 Bedroom at Lekki
								</p>
								<div className='flex items-center'>
									<MdStar />
									<p>{carouselItems[0].stars} (85)</p>
								</div>
							</div>
							<p className='font-[400] text-[16px] leading-[140%] text-[#89898A] my-3'>
								{carouselItems[0].address}
							</p>
							<div className='flex justify-between items-center'>
								<div className='flex items-center gap-2'>
									{/* <FaUser /> */}
									<Button
										variant='light'
										startContent={<FaUser />}
									>
										Agent Person
									</Button>
								</div>
								<div className='flex items-center gap-2'>
									<FaCalendarDays />
									<p>{carouselItems[0].dateEnlisted}</p>
								</div>
							</div>
							<div className='flex flex-col md:flex-row gap-y-3 justify-center md:justify-between items-center'>
								<div className=''>
									<div className='flex my-[12px]'>
										<p className='font-[400] text-[16px] leading-[140%] dark:text-[#89898A] text-[#323232] '>
											<span>
												{carouselItems[0].price}
											</span>{' '}
											<span>P/A</span>
										</p>
										<p className='text-[14px] dark:text-[#89898A] text-[#323232] leading-[142.857%]'>
											{' '}
											· {
												carouselItems[0].totalPackage
											}{' '}
											total Package
										</p>
									</div>
									<p className='font-[400] text-[16px] leading-[140%] text-[#89898A] '>
										{carouselItems[0].totalViews} total
										views, {carouselItems[0].todaysView}{' '}
										today
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Messages */}
				<div className='p-8 col-span-1 bg-white rounded-xl flex flex-col items-center justify-center gap-y-[1.44rem]'>
					<div className='flex justify-between w-full'>
						<p className='text-[1.125rem] font[450] text-lightDark'>
							Messages
						</p>
						<p className='text-4 font[600] text-primary'>
							view All
						</p>
					</div>
					<div className='w-full '>
						<MessageCard />
						<MessageCard />
						<MessageCard />
						<MessageCard />
					</div>
				</div>
			</div>
			{/* posted houses section */}
			<div className='mt-6 p-6 bg-white rounded-xl'>
				<div className='flex justify-between mb-5'>
					<p className='text-[1.125rem] font[450] text-lightDark'>
						Posted houses
					</p>
					<p className='text-4 font[600] text-primary'>view All</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 '>
					{carouselItems.slice(0, 3).map((item, index) => (
						<div key={index} className=' col-span-1'>
							<FeaturedProperties item={item} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
