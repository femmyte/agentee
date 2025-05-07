'use client';

import { useState } from 'react';
import { Modal, ModalContent } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { X } from 'lucide-react'; // For a nice close icon (install lucide-react if you want)

export default function ImageGallery({ images }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const openModal = (index) => {
		setSelectedIndex(index);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			{/* Grid of images */}
			{/* <div className=''> */}
			{/* {images?.map((image, index) => (
				<img
					key={index}
					src={image.url}
					// width={300}
					// height={300}
					// fill={true}
					// layout='fill'
					// objectFit='cover'
					// sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					alt={`Image ${image.doc_name}`}
					className='object-cover rounded-lg w-full cursor-zoom-in'
					onClick={() => openModal(index)}
					title='Click to view full image'
				/>
			))} */}
			{images?.map((image, index) => (
				<div
					key={index}
					className='relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-zoom-in'
					onClick={() => openModal(index)}
				>
					<Image
						src={image.url}
						alt={`Image ${image.doc_name}`}
						fill
						className='object-cover'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				</div>
			))}
			{/* </div> */}

			{/* Modal */}
			<Modal
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				size='full'
				hideCloseButton
				backdrop='blur'
				classNames={{
					body: 'p-0',
					base: 'bg-black',
				}}
				closeOnEscape
				backdropClose
			>
				<ModalContent>
					{/* Close button */}
					<div className='absolute top-4 right-4 z-50'>
						<button
							onClick={closeModal}
							className='bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition'
						>
							<X size={24} className='text-black' />
						</button>
					</div>

					{/* Image Swiper */}
					<Swiper
						initialSlide={selectedIndex}
						navigation
						pagination={{ clickable: true }}
						modules={[Navigation, Pagination]}
						className='h-screen w-screen'
					>
						{images?.map((img, index) => (
							<SwiperSlide key={index}>
								<div className='flex items-center justify-center h-full w-full'>
									<Image
										src={img.url}
										alt={`Slide ${img.doc_name}`}
										width={1200}
										height={800}
										className='max-h-full max-w-full object-contain'
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</ModalContent>
			</Modal>
		</>
	);
}
