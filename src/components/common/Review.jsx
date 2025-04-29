'use client';
import { useState } from 'react';
import React from 'react';
import { reviews } from '@/utils/data';
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
const ReviewCard = ({ review }) => {
	return (
		<div className='bg-white shadow-md rounded p-4 border border-[#F8F9FB] flex flex-col gap-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Image
						alt={review?.user.name}
						src={review.user.profile_picture}
					/>
					<div className=''>
						<h4 className='text-lg font-medium text-lightDark'>
							{review.user.name}
						</h4>
						<p className='text-base text-lightDark font-normal'>
							{review.date}
						</p>
					</div>
				</div>
				<div className='flex items-center gap-x-2'>
					{Array.from(
						{ length: Math.floor(review.rating) },
						(_, i) => (
							<FaStar key={i} className='text-yellow-500' />
						)
					)}
					{review.rating % 1 !== 0 && (
						<FaStar className='text-yellow-500' />
					)}
				</div>
			</div>
			<p className='text-gray-600'>{review.comment}</p>
			<p className='text-sm text-gray-500'>{review.date}</p>
		</div>
	);
};
const Review = () => {
	// const [isOpen, setIsOpen] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	// const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [modalPlacement, setModalPlacement] = useState('auto');

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

	const onSubmit = () => {
		console.log('Review:', review);
		console.log('Rating:', rating);

		// Here you can send the review and rating to your backend or API
		onOpenChange(false); // Close modal
	};

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
						{reviews.map((review) => (
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
									<Button color='primary' onPress={onSubmit}>
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
