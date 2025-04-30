'use client';
import React, { useState } from 'react';
import DashboardLayout from '@/components/Navigation/DashboardLayout';
import {
	Select,
	SelectItem,
	Input,
	Textarea,
	Checkbox,
	Button,
} from '@nextui-org/react';
import HouseImageUploader from '@/components/common/ImageUploader';
import { Controller, useForm } from 'react-hook-form';
import { AuthPost } from '@/hooks/commonService';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import LocationSelector from '@/components/forms/LocationSelector';

const features = [
	'POP ceiling',
	'Shared Meter',
	'Running water',
	'Gate',
	'Parking Space',
];

const houseTypes = [
	{ id: 'self_contain', label: 'Self Contain' },
	{ id: 'room_parlour', label: 'Room and Parlour' },
	{ id: '1_bedroom', label: '1 Bedroom Apartment' },
	{ id: '2_bedroom', label: '2 Bedroom Apartment' },
	{ id: '3_bedroom', label: '3 Bedroom Apartment' },
	{ id: 'duplex', label: 'Duplex' },
	{ id: 'bungalow', label: 'Bungalow' },
	{ id: 'studio', label: 'Studio Apartment' },
	{ id: 'shared_apartment', label: 'Shared Apartment' },
];

const AddProperty = () => {
	const [selected, setSelected] = useState('');
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm();

	const [uploadedFiles, setUploadedFiles] = useState([]);

	const onSubmit = async (data) => {
		const accessToken = Cookies.get('accessToken', 'ksjdchjskcns');

		console.log(data);

		// console.log(uploadedFiles);

		try {
			if (uploadedFiles.length === 0) {
				toast.error('Please upload at least one image.');
				return;
			}

			// setLoading(true);

			const filesPayload = uploadedFiles.map((file) => ({
				folder: 'landlord',
				content: {
					doc_name: file.name,
					document: file.base64,
				},
			}));
			console.log(filesPayload);
			const { data: uploadedData } = await AuthPost(
				'/upload',
				{ files: filesPayload },
				accessToken,
				'core'
			);

			console.log(uploadedData);

			if (uploadedData?.body?.success) {
				toast.success(
					uploadedData.body.message || 'Images uploaded successfully'
				);
				setUploadedFiles([]);
				data['images'] = uploadedData.body.data.urls;
				const { data: response } = await AuthPost(
					'/upload-property',
					{
						data,
					},
					accessToken
				);

				console.log(response);
				if (response.body.success) {
					toast.success(
						response.body.message ||
							'property uploaded successfully'
					);
					// router.push(`/agent`);
					// Cookies.remove('role');
					reset();
				} else {
					toast.error('Upload failed');
				}
			} else {
				toast.error('Upload failed');
			}

			// const response = await fetch('/api/submit-house', {
			// 	method: 'POST',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify(data),
			// });

			// if (!response.ok) throw new Error('Network error');

			// const result = await response.json();
			// alert('Submitted successfully!');
			// reset();
		} catch (err) {
			alert('Submission failed!');
			console.error(err);
		}
	};

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
						<div>
							<img
								src='/images/appartment/upload.png'
								alt='house'
								className='w-[100%] h-[100%] object-cover'
							/>
						</div>
					</section>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='w-full mx-auto p-6 mt-8'
					>
						{/* <label
							className='text-[1rem] font-[500] leading-[2.25rem]'
							htmlFor='select-house-type'
						>
							Select House Type{' '}
							<span className='text-red-600'>*</span>
						</label>

						<Select
							label='Select house type'
							className='w-full'
							selectedKeys={selected ? [selected] : []}
							onChange={(e) => setSelected(e.target.value)}
							{...register('house_type', {
								required: 'House type is required',
							})}
							placeholder='Select house type'
							id='select-house-type'
						>
							{houseTypes.map((house) => (
								<SelectItem key={house.id} value={house.id}>
									{house.label}
								</SelectItem>
							))}
						</Select>
						{errors.house_type && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.house_type.message}
							</p>
						)} */}

						<label
							className='text-[1rem] font-[500] leading-[2.25rem]'
							htmlFor='select-house-type'
						>
							Select House Type{' '}
							<span className='text-red-600'>*</span>
						</label>

						<Controller
							name='house_type'
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Select
									label='Select house type'
									className='w-full'
									selectedKeys={
										field.value ? [field.value] : []
									}
									onSelectionChange={(keys) =>
										field.onChange(Array.from(keys)[0])
									}
								>
									{houseTypes.map((house) => (
										<SelectItem
											key={house.id}
											value={house.id}
										>
											{house.label}
										</SelectItem>
									))}
								</Select>
							)}
						/>

						{/* ✅ Error message below the Select */}
						{errors.house_type && (
							<p className='text-red-500 text-sm mt-1'>
								House type is required
							</p>
						)}
						<HouseImageUploader
							uploadedFiles={uploadedFiles}
							setUploadedFiles={setUploadedFiles}
						/>

						<div className='space-y-6 mt-6'>
							<LocationSelector
								control={control}
								errors={errors}
							/>
							<Input
								label='House City'
								placeholder='Enter the City of the house'
								{...register('city', {
									required: 'City is required',
								})}
								isRequired
							/>
							{errors.city && (
								<p className='text-red-500 text-sm'>
									{errors.city.message}
								</p>
							)}

							<Input
								label='Full Address'
								placeholder='Enter address info'
								{...register('address', {
									required: 'Address is required',
								})}
								isRequired
							/>
							{errors.address && (
								<p className='text-red-500 text-sm'>
									{errors.address.message}
								</p>
							)}

							<Input
								label='About the Location'
								placeholder='In 30 characters write about the location'
								{...register('location')}
							/>

							<Textarea
								label='General Information'
								placeholder='Write Every information about the House'
								{...register('info', {
									required: 'Information is required',
								})}
								isRequired
							/>
							{errors.info && (
								<p className='text-red-500 text-sm'>
									{errors.info.message}
								</p>
							)}

							<div>
								<h4 className='font-semibold mb-2'>
									The house features
								</h4>
								<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
									{features.map((feat) => (
										<Checkbox
											key={feat}
											{...register(`features.${feat}`)}
										>
											{feat}
										</Checkbox>
									))}
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className=''>
									<Input
										label='Annual Rent Fee'
										type='number'
										{...register('annual_rent', {
											required: 'Annual rent is required',
										})}
										isRequired
									/>
									{errors.annual_rent && (
										<p className='text-red-500 text-sm'>
											{errors.annual_rent.message}
										</p>
									)}
								</div>
								<div className=''>
									<Input
										label='Agency Fee'
										type='number'
										{...register('agency_fee', {
											required: 'Agency fee is required',
										})}
										isRequired
									/>
									{errors.agency_fee && (
										<p className='text-red-500 text-sm'>
											{errors.agency_fee.message}
										</p>
									)}
								</div>
								<div className=''>
									<Input
										label='Commission Fee'
										type='number'
										{...register('commission_fee', {
											required:
												'Commission fee is required',
										})}
										isRequired
									/>
									{errors.commission_fee && (
										<p className='text-red-500 text-sm'>
											{errors.commission_fee.message}
										</p>
									)}
								</div>
								<div className=''>
									<Input
										label='Agreement Fee'
										type='number'
										{...register('agreement_fee', {
											required:
												'Agreement fee is required',
										})}
										isRequired
									/>
									{errors.agreement_fee && (
										<p className='text-red-500 text-sm'>
											{errors.agreement_fee.message}
										</p>
									)}
								</div>
							</div>

							<Button
								type='submit'
								color='primary'
								className='mt-4'
							>
								Submit
							</Button>
						</div>
					</form>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default AddProperty;
