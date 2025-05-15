'use client';
import { useState, useEffect } from 'react';
import React from 'react';
// import { reviews } from '@/utils/data';
// import { Button, Image, Modal, ModalContent } from '@nextui-org/react';
import { Star, X } from 'lucide-react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Image,
} from '@heroui/react';
import { proxyPost } from '@/services/proxyClient';
import toast from 'react-hot-toast';
import { openList } from '@/hooks/commonService';
import {
	toDate_MMM_D_YYYY_hhmmss,
	toDate_DDMMYYYY,
} from '@/services/formatDate';
const ReviewCard = ({ review }) => {
	return (
		<div className='bg-white shadow-md rounded p-4 border border-[#F8F9FB] flex flex-col gap-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					{review?.profile_picture ? (
						<Image
							alt={review?.reviewer_name}
							src={review?.profile_picture}
							width={40}
							height={40}
							className='w-10 h-10 rounded-full object-cover'
						/>
					) : (
						<div className='w-10 h-10 rounded-full bg-black text-white font-extrabold flex items-center justify-center text-sm'>
							{review?.reviewer_name
								?.split(' ')
								.slice(0, 2) // Only use the first two words
								.map((word) => word[0])
								.join('')
								.toUpperCase()}
						</div>
					)}
					<div className=''>
						<h4 className='text-lg font-medium text-lightDark'>
							{review?.reviewer_name}
						</h4>
						<p className='text-base text-lightDark font-normal'>
							{toDate_DDMMYYYY(review?.created_at)}
						</p>
					</div>
				</div>
				<div className='flex items-center gap-x-2'>
					{Array.from(
						{ length: Math.floor(review?.rating) },
						(_, i) => (
							<FaStar key={i} className='text-yellow-500' />
						)
					)}
					{review.rating % 1 !== 0 && (
						<FaStar className='text-yellow-500' />
					)}
				</div>
			</div>
			<p className='text-gray-600'>{review.review}</p>
			<p className='text-sm text-gray-500'>
				{toDate_MMM_D_YYYY_hhmmss(review?.created_at)}
			</p>
		</div>
	);
};
const Review = ({ reviews, property_id, property_owner_id }) => {
	// const [isOpen, setIsOpen] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	// const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [modalPlacement, setModalPlacement] = useState('auto');
	const [isLoading, setIsLoading] = useState(false);
	// const [reviews, setReviews] = useState([]);

	const [rating, setRating] = useState(0); // Selected rating
	const [hover, setHover] = useState(0); // Hovered rating
	const [review, setReview] = useState('');

	const handleClick = (index) => {
		setRating(index);
	};

	const handleMouseOver = (index) => {
		setHover(index);
	};

	const handleMouseLeave = () => {
		setHover(0);
	};

	// useEffect(() => {
	// 	fetchData();
	// }, []);

	// const fetchData = async () => {
	// 	const { data } = await openList(
	// 		'list-review'
	// 		// 'b418c4d8-9021-706e-712b-0ce9a9d6730b_3bd23fb4-1957-4196-a4f8-4d2ff902afdd'
	// 	);
	// 	setReviews(data.body.data);
	// };

	const onSubmit = async () => {
		setIsLoading(true);

		const data = {
			rating,
			review,
			property_id,
			property_owner_id,
		};
		try {
			const response = await proxyPost('/create-review', data);

			console.log(response);

			if (response.data.body.success) {
				toast.success(
					response.data.body.message ||
						'review submitted successfully'
				);
			} else {
				toast.error('Upload failed');
			}
		} catch (err) {
			console.error(err);
			if (err.response.status === 401) {
				toast.error('You have to login to review this property');
				return;
			}
			toast.error('Submission failed!');
		} finally {
			setIsLoading(false);
			onOpenChange(false);
		}
	};

	// const onSubmit = () => {
	// 	console.log('Review:', review);
	// 	console.log('Rating:', rating);

	// 	// Here you can send the review and rating to your backend or API
	// 	onOpenChange(false); // Close modal
	// };

	// const openModal = () => {
	// 	setIsOpen(true);
	// };

	// const closeModal = () => {
	// 	setIsOpen(false);
	// };

	return (
		<div>
			<div className='px-3 md-px-[5.9rem] w-full ]'>
				<h3 className='font-[700] leading-[42px] text-[30px] text-primary text-center'>
					Client&apos;s Reviews
				</h3>
				<p className='text-center text-[16px] font-[500] leading-[140%] text-[#89898A]'>
					What other house seekers are saying abou this house
				</p>
				<div className='mt-[1.54rem]'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{reviews?.map((review) => (
							<ReviewCard key={review.id} review={review} />
						))}
					</div>
				</div>
				<div className='px-3 md-px-[5.9rem] w-full flex flex-col items-center justify-center py-[2.4rem]'>
					<h3 className='font-[700] leading-[42px] text-[30px] text-primary text-center'>
						Share your Review
					</h3>
					<p className='text-center text-[16px] font-[500] leading-[140%] text-[#89898A]'>
						If you have visited this place, share your thought with
						other house seeekers
					</p>
					<Button
						className='px-3 py-5 border border-[#E9E9EB] rounded-lg w-[20.678rem] text-base font-semibold leading-4 mt-[2rem] text-[#202020] bg-white hover:bg-[#F7F7F8] hover:text-primary'
						style={{
							boxShadow:
								'0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 6px 0px rgba(0, 0, 0, 0.10)',
						}}
						// onClick={() => (onPress = { onOpen })}
						onPress={onOpen}
					>
						Write a Review
					</Button>
				</div>
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
									Review
								</ModalHeader>
								<ModalBody>
									<textarea
										placeholder='Write your review for others to see'
										className='w-full h-[10rem] border border-[#E9E9EB] rounded-lg p-4'
										value={review}
										onChange={(e) =>
											setReview(e.target.value)
										}
									></textarea>

									<div>
										<h3 className='mt-4'>Rate</h3>
										<div className='flex items-center mt-2 gap-2'>
											{[1, 2, 3, 4, 5].map((index) => (
												<span
													key={index}
													className='cursor-pointer text-3xl transition-colors'
													onClick={() =>
														handleClick(index)
													}
													onMouseOver={() =>
														handleMouseOver(index)
													}
													onMouseLeave={
														handleMouseLeave
													}
												>
													{(hover || rating) >=
													index ? (
														<FaStar className='text-yellow-400' />
													) : (
														<FaRegStar className='text-gray-400' />
													)}
												</span>
											))}
										</div>
									</div>
								</ModalBody>
								<ModalFooter>
									<Button
										color='primary'
										onPress={onSubmit}
										isLoading={isLoading}
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
	);
};

export default Review;
