'use client';
import DefaultNavbar from '@/components/common/Navbar';
import { Image } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

import { Calendar, Clock, Info, LocateIcon } from 'lucide-react';

// import { property } from '@/utils/data';
import FAQ from '@/components/common/FAQ';
import Review from '@/components/common/Review';
import Footer from '@/components/common/Footer';
import ImageGallery from '@/components/common/ImageSwiper';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@heroui/react';
import { openGetItem } from '@/hooks/commonService';
const Property = ({ params }) => {
	const [property, setProperty] = useState({});
	const [agent, setAgent] = useState({
		id: 1,
		name: 'John Doe',
		email: '',
		phone: '123-456-7890',
		profile_picture: '/images/agent.png',
		bio: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	});

	// console.log();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	// const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [modalPlacement, setModalPlacement] = useState('auto');

	const [message, setMessage] = useState('');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const id = params.id;

		const { data } = await openGetItem(
			'get-property',
			'b418c4d8-9021-706e-712b-0ce9a9d6730b_3bd23fb4-1957-4196-a4f8-4d2ff902afdd'
		);
		setProperty(data.body.data);
	};
	console.log(property);

	const onSubmit = () => {
		// Here you can send the review and rating to your backend or API
		onOpenChange(false); // Close modal
	};

	const beenefits = [
		'Free Wi-Fi',
		'Free Parking',
		'Free Breakfast',
		'3 toilet',
		'4 bedroom',
		'Car parking space',
		'Swimming pool',
		'Solar light',
		'Gate',
		'Security',
		'Fenced',
	];

	const images1 = [
		'/images/appartment/one.png',
		'/images/appartment/two.png',
	];

	const images = [
		'/images/appartment/three.png',
		'/images/appartment/four.png',
		'/images/appartment/five.png',
		'/images/appartment/six.png',
	];

	return (
		<>
			<DefaultNavbar />
			{
				<div className='my-[4.94rem] px-4 md:px-[6.5rem]'>
					<div className='flex gap-x-3 mb-[0.62rem]'>
						<div className=''>
							<h1 className='dark:text-white text-3xl mb-2 font-[500] leading-10 text-primary'>
								{property?.house_type} at {property?.city}
							</h1>
							<p className='text-[1rem] font-[400] leading-6'>
								{property?.address}
							</p>
						</div>
						<div className=''></div>
					</div>
					<div className=''>
						{/* <div className='grid grid-cols-2 gap-x-[0.94rem]'>
							<Image
								src='/images/appartment/one.png'
								alt='Property Image'
								className='w-full rounded-lg col-span-1'
							/>
							<Image
								src='/images/appartment/two.png'
								alt='Property Image'
								className='w-full rounded-lg col-span-1'
							/>
						</div> */}
						<div className=' grid grid-cols-1 md:grid-cols-2 gap-4 relative w-full'>
							<ImageGallery
								images={property?.images.slice(0, 2)}
							/>
						</div>
						<div className='mt-[1.31rem] grid grid-cols-2 md:grid-cols-4 gap-4 relative w-full'>
							<ImageGallery images={property?.images} />
						</div>
						{/* <div className=' col-span-1 grid grid-cols-2 gap-y-[0.94rem] w-full gap-x-2'>
							<div className=' col-span-2 w-full'>
								<img
									src={'/images/property1.png'}
									alt='property'
									className='w-full'
								/>
							</div>
							<div className=' col-span-1'>
								<Image
									src={'/images/property2.png'}
									alt='property'
									className='w-full'
								></Image>
							</div>
							<div className=' col-span-1'>
								<Image
									src={'/images/property3.png'}
									alt='property'
									className='w-full'
								></Image>
							</div>
						</div> */}
					</div>
					<div className='mt-[1.98rem] '>
						<h3 className='text-[1.75rem] font[500] leading-10'>
							General Information
						</h3>
						{/* <ul className='flex gap-x-[1.62rem] my-[0.75rem'>
							{property?.house_features.map((item, index) => (
								<li
									key={index}
									className='text-[1.25rem] font[500] leading-[1.75rem] text-[#202020]'
								>
									{item}
								</li>
							))}
						</ul> */}
						<ul className='flex gap-x-[1.62rem] my-[0.75rem]'>
							{Object.entries(property?.house_features || {})
								.filter(([_, value]) => value)
								.map(([key], index) => (
									<li
										key={index}
										className='text-[1.25rem] font-[500] leading-[1.75rem] text-[#202020]'
									>
										{key}
									</li>
								))}
						</ul>

						<p className='text-[1rem] font[400] leading-6 text-[#202020]'>
							{property?.general_information}
						</p>
					</div>
					<section className='mt-[1.19rem] grid grid-cols-1 md:grid-cols-3 gap-x-[1.62rem] gap-y-6'>
						<div className=' col-span-1 md:col-span-2'>
							<h4 className='mb-[0.56rem] font-medium text-xl leading-7'>
								Extra benefits the house offers
							</h4>
							<ul className='list-none grid grid-cols-3 gap-x-[1.62rem] mt-[0.75rem]'>
								{/* {property?.extra_benefits.map((item, index) => (
									<li
										key={index}
										className='text-[1rem] font[400] leading-6 text-[#202020]'
									>
										{item}
									</li>
								))} */}
								{Object.entries(property?.house_features || {})
									.filter(([_, value]) => value)
									.map(([key], index) => (
										<li
											key={index}
											className='text-[1rem] font-[400] leading-[1.75rem] text-[#202020]'
										>
											{key}
										</li>
									))}
							</ul>
							<button
								className='px-3 py-5 border border-[#E9E9EB] rounded-lg w-52 text-base font-semibold leading-4 mt-[1.79rem] text-[#202020] bg-white hover:bg-[#F7F7F8] hover:text-primary'
								style={{
									boxShadow:
										'0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 6px 0px rgba(0, 0, 0, 0.10)',
								}}
							>
								View All
							</button>
							<div className='mt-[2.24rem]'>
								<h4 className='mb-[0.56rem] font-medium text-xl leading-7'>
									Location
								</h4>
								<Image src='/images/map.png' alt='map' />
								<div className=''>
									<div className='flex items-center mt-4'>
										<LocateIcon
											size={20}
											className='text-primary'
										/>
										<p className='text-[1rem] font[400] leading-6 text-[#202020] ml-2'>
											{property?.country}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='col-span-1 flex flex-col gap-y-8'>
							<div className='p-8 border border-[#E9E9EB]  bg-white rounded-xl flex flex-col items- justify- gap-y-4 w-[24.687rem]'>
								<p className='text-[1.25rem] font[500] text-lightDark text-center'>
									Rent Now
								</p>
								<p className='text-[1.125rem] font[4000] text-lightDark text-center'>
									Schedule date for Inspection
								</p>
								<div className='flex items-center justify-between w-full gap-x-6'>
									<Button
										startContent={<Calendar size={20} />}
										className='px-4 py-4 border border-[#202020] rounded-lg text-base font-semibold leading-4 text-[#202020] bg-white hover:bg-[#F7F7F8] hover:text-primary'
									>
										{property?.inspection_date}
									</Button>
									<Button
										startContent={
											<Clock
												size={20}
												className='text-primary'
											/>
										}
										className='px-4 py-4 border border-[#202020] rounded-lg text-base font-[400] leading-4 text-[#202020] bg-white hover:bg-[#F7F7F8] hover:text-primary'
									>
										{property?.inspection_time}
									</Button>
								</div>
								<div className='w-full'>
									<div className='flex justify-between w-full gap-x-[1.62rem]  px-10'>
										<p className='text-[1rem] col-span-1 font[400] leading-6 text-[#202020]'>
											Agreement Fee
										</p>
										<p className='text-[1rem] col-span-1 font[400] leading-6 text-[#202020]'>
											{property?.agreement_fee}
										</p>
									</div>
									<div className='flex justify-between w-full gap-x-[1.62rem] mt-[0.75rem] px-10'>
										<p className='text-[1rem] col-span-1 font[400] leading-6 text-[#202020]'>
											Agent Fee
										</p>
										<p className='text-[1rem] col-span-1 font[400] leading-6 text-[#202020]'>
											{property?.agency_fee}
										</p>
									</div>
									<div className='flex justify-between w-full gap-x-[1.62rem] mt-[0.75rem] px-10'>
										<p className='text-[1rem] col-span-1 font[400] leading-6 text-[#202020]'>
											Total
										</p>
										<p className='text-[1rem] col-span-1 font[400] leading-6 text-[#202020]'>
											{property?.total_fee}
										</p>
									</div>
								</div>
								<Button
									color='warning'
									// href='/signin'
									className='bg-primary text-white w-full'
									onPress={onOpen}
								>
									Schedule Now
								</Button>
							</div>

							<div className='p-8 border border-[#E9E9EB]  bg-white rounded-xl flex flex-col items- justify- gap-y-4 w-[24.687rem]'>
								<p className='text-[1.25rem] font[500] text-lightDark text-center'>
									Cancelation policy
								</p>
								<div className='flex gap-x-7 items-start h-f'>
									<Info size={90} className='text-primary' />
									<p className='text-[1rem] font[4000] text-primary text-justify'>
										is simply dummy text of the printing and
										typesetting industry. Lorem Ipsum has
										been the industrys standard dummy text
										ever since the 1500s, when an unknown
									</p>
								</div>
							</div>
						</div>
						<div className='col-span-1'></div>
					</section>
					<section>
						<div className='mt-9 flex items-center gap-x-4'>
							<Image
								src={
									agent?.profile_picture
										? agent?.profile_picture
										: '/images/agent.png'
								}
							></Image>
							<p className='text-[1.25rem] font[500] leading-6 text-[#202020]'>
								About the agent
							</p>
						</div>
						<p className='text-[1rem] font[400] leading-6 text-[#202020] mt-4'>
							{agent?.bio}
						</p>
					</section>
					<FAQ />
					<div className='w-ful'>
						<Review />
					</div>

					<div className='flex px-10 justify-center items-center flex-col gap-4'>
						<Modal
							isOpen={isOpen}
							placement={'center'}
							onOpenChange={onOpenChange}
						>
							<ModalContent>
								{(onClose) => (
									<>
										<ModalHeader className='flex flex-col gap-1'>
											Message
										</ModalHeader>
										<ModalBody>
											<textarea
												placeholder='Send a message to the Agent to notify, about your interet '
												className='w-full h-[10rem] border border-[#E9E9EB] rounded-lg p-4'
												value={message}
												onChange={(e) =>
													setMessage(e.target.value)
												}
											></textarea>
										</ModalBody>
										<ModalFooter>
											<Button
												color='primary'
												onPress={onSubmit}
											>
												Submit
											</Button>
										</ModalFooter>
									</>
								)}
							</ModalContent>
						</Modal>
					</div>
				</div>
			}
			<Footer />
		</>
	);
};

export default Property;
