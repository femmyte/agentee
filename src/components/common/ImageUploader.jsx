'use client';

import { useState } from 'react';
import { Button, Avatar } from '@nextui-org/react';
import { Paperclip, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthPost } from '@/hooks/commonService';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

export default function HouseImageUploader({
	uploadedFiles,
	setUploadedFiles,
}) {
	// const [uploadedFiles, setUploadedFiles] = useState([]);
	const [loading, setLoading] = useState(false);
	const accessToken = Cookies.get('accessToken', 'ksjdchjskcns');
	const handleFiles = (files) => {
		const file = files[0];
		if (!file) return;

		if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
			toast.error('Only PNG, JPG, or GIF files are allowed.');
			return;
		}

		if (file.size > 10 * 1024 * 1024) {
			toast.error('File size should be under 10MB.');
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			const base64 = reader.result;
			const previewUrl = URL.createObjectURL(file);
			const newFile = {
				id: uuidv4(),
				name: file.name,
				previewUrl,
				base64,
			};
			setUploadedFiles((prev) => [...prev, newFile]);
		};
		reader.readAsDataURL(file);
	};

	const handleImageChange = (event) => {
		handleFiles(event.target.files);
	};

	const handleDrop = (event) => {
		event.preventDefault();
		handleFiles(event.dataTransfer.files);
	};

	const removeFile = (id) => {
		setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
	};

	const handleUpload = async () => {
		if (uploadedFiles.length === 0) {
			toast.error('Please upload at least one image.');
			return;
		}

		setLoading(true);

		const filesPayload = uploadedFiles.map((file) => ({
			folder: 'landlord',
			content: {
				doc_name: file.name,
				document: file.base64,
			},
		}));

		try {
			const { data: response } = await AuthPost(
				'/upload',
				{ files: filesPayload },
				accessToken,
				'core'
			);

			if (response?.body?.success) {
				toast.success(
					response.body.message || 'Images uploaded successfully'
				);
				setUploadedFiles([]);
			} else {
				toast.error('Upload failed');
			}
		} catch (error) {
			toast.error('Image upload error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-full  my-5'>
			<div className='max-w-xl mx-auto'>
				<label className='font-medium'>
					Upload Pictures of the House{' '}
					<span className='text-red-600'>*</span>
				</label>

				<div
					className='mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 text-center cursor-pointer'
					onDragOver={(e) => e.preventDefault()}
					onDrop={handleDrop}
				>
					<input
						type='file'
						accept='image/png, image/jpeg, image/gif'
						className='hidden'
						id='file-input'
						onChange={handleImageChange}
					/>
					<label htmlFor='file-input'>
						<p className='text-gray-700'>
							Drag and drop or click to upload
						</p>
						<Button
							className='mt-2'
							color='primary'
							variant='bordered'
						>
							+ Upload a file
						</Button>
					</label>
					<p className='mt-2 text-sm text-gray-500'>
						You must upload the room(s) and the Compound (Max
						10MB/image)
					</p>
				</div>
			</div>
			{uploadedFiles.length > 0 && (
				<div className='mt-4 flex justify-center flex-wrap gap-4'>
					{uploadedFiles.map((file) => (
						<div
							key={file.id}
							className='flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm'
						>
							<Paperclip className='w-4 h-4 text-gray-500' />
							<span className='text-sm text-gray-700'>
								{file.name}
							</span>
							<X
								className='w-4 h-4 text-gray-500 cursor-pointer'
								onClick={() => removeFile(file.id)}
							/>
							<Avatar
								src={file.previewUrl}
								size='sm'
								className='ml-2'
							/>
						</div>
					))}
				</div>
			)}

			{/* <div className='mt-6 text-center'>
				<Button
					color='primary'
					isLoading={loading}
					onClick={handleUpload}
				>
					Submit & Upload All Images
				</Button>
			</div> */}
		</div>
	);
}
