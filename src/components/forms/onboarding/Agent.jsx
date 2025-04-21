'use client';
import React, { useState, useEffect } from 'react';
import Nav from '@/components/common/Nav';
import Image from 'next/image';
import Link from 'next/link';
import FileUpload from '@/components/common/FileUpload';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { AuthPost } from '@/hooks/commonService';
import { Button } from '@nextui-org/react';

const Agent = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [isActive, setIsActive] = useState(true);
	const [imagePreview, setImagePreview] = useState(null);
	const [imageBase64, setImageBase64] = useState(null);

	const [company_name, setCompanyName] = useState('');
	const [country, setCountry] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [experience, setExperience] = useState('');
	const [address, setAddress] = useState('');
	const [about, setAbout] = useState('');
	const [files, setFiles] = useState([]);
	useEffect(() => {
		const allFieldsFilled =
			company_name &&
			country &&
			city &&
			state &&
			experience &&
			address &&
			about;

		setIsActive(allFieldsFilled);
	}, [company_name, country, city, state, experience, address, about]);

	// Convert image to Base64
	const handleImageChange = (event) => {
		const file = event.target.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setImageBase64(reader.result); // Extract base64 string
				setImagePreview(URL.createObjectURL(file));
			};
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const accessToken = Cookies.get('accessToken');
		const role = Cookies.get('role');

		setLoading(true);

		try {
			const { data: userImage } = await AuthPost(
				'/upload',
				{
					files: [
						{
							folder: 'agents',
							content: {
								doc_name: 'passport_photo.jpg',
								document: imageBase64,
							},
						},
					],
				},
				accessToken,
				'core'
			);

			if (userImage.body.success) {
				toast.success(
					userImage.body.message || 'Image uploaded successfully'
				);
				console.log(userImage.body.message);
				const details = {
					company_name,
					country,
					city,
					state,
					experience,
					address,
					about,
					image: userImage.body.data.urls[0].url,
					doc_name: userImage.body.data.urls[0].doc_name,
				};
				const { data } = await AuthPost(
					'/update-user-data',
					{
						role: 'agent',
						details: details,
					},
					accessToken
				);

				console.log(data);
				if (data.body.success) {
					toast.success(
						data.body.message ||
							'Account updated successfully redirecting to your dashboard'
					);
					router.push(`/agent`);
					Cookies.remove('role');
				} else {
					toast.error(data.errorMessage || 'Something went wrong');
				}
			}

			// toast.success(data.body.message || 'Account created successfully');
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className='h-screen bg-[#F8F9FB] overflow-x-hidden'>
			<Nav link={'/confirmation'} />
			<section className='flex items-center justify-center py-[3rem]'>
				<div className=' w-[40rem]'>
					<article className='mb-[1rem]'>
						<h1 className='font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem] text-center '>
							Welcome Super Agent{' '}
						</h1>
						<p className='font-[500] text-[1rem] leading-[140%] text-[#89898A] text-center'>
							Company information
						</p>
					</article>
					<section className='grid grid-cols-1 md:grid-cols-2 gap-y-[1.125rem] gap-x-[1.12rem] px-4 md:px-0 mt-[2.82rem]'>
						{/* <div className="flex "> */}
						<div className=''>
							<label
								htmlFor='company_name'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								Company Name
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your Company Name'
								id='company_name'
								onChange={(e) => setCompanyName(e.target.value)}
								name={company_name}
								value={company_name}
								required
							></input>
						</div>
						<div className=''>
							<label
								htmlFor='country'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								Country
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your full name'
								id='country'
								onChange={(e) => setCountry(e.target.value)}
								name={country}
								value={country}
								required
							></input>
						</div>
						<div className=''>
							<label
								htmlFor='city'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								City
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your City'
								id='city'
								onChange={(e) => setCity(e.target.value)}
								name={city}
								value={city}
								required
							></input>
						</div>
						<div className=''>
							<label
								htmlFor='state'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								State
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your State'
								id='state'
								onChange={(e) => setState(e.target.value)}
								name={state}
								value={state}
								required
							></input>
						</div>
						<div className=''>
							<label
								htmlFor='experience'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								Years of Experience
							</label>
							<input
								type='number'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your Years of Experience'
								id='experience'
								onChange={(e) => setExperience(e.target.value)}
								name={experience}
								value={experience}
								required
							></input>
						</div>
						<div className=''>
							<label
								htmlFor='address'
								className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
							>
								Office Address
							</label>
							<input
								type='text'
								className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
								placeholder='Enter your Office  Address'
								id='address'
								onChange={(e) => setAddress(e.target.value)}
								name={address}
								value={address}
								required
							></input>
						</div>

						{/* </div> */}
					</section>
					<div className='mt-[1.125rem] px-4 md:px-0'>
						<label
							htmlFor='about'
							className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'
						>
							About Me
						</label>
						<textarea
							id='about'
							cols='30'
							rows='10'
							className='border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[4.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full'
							placeholder='Tell us about yourself'
							onChange={(e) => setAbout(e.target.value)}
							name={about}
							value={about}
							required
						></textarea>
					</div>
					<div className='mt-[1.25rem] px-4 md:px-0'>
						<p className='font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]'>
							Upload Profile Picture
						</p>
						<div className='border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center'>
							{imagePreview ? (
								<Image
									src={imagePreview}
									alt='Logo Preview'
									width={100}
									height={100}
									className='rounded-lg'
								/>
							) : (
								<p className='text-gray-400'>
									Drag and drop image here, or click to add
									image.
								</p>
							)}
							<input
								type='file'
								accept='image/*'
								onChange={handleImageChange}
								className='hidden'
								id='fileInput'
							/>
							<label
								htmlFor='fileInput'
								className='mt-3 cursor-pointer bg-default-300 text-black px-4 py-2 rounded-lg'
							>
								Add Image
							</label>
						</div>
						{/* <FileUpload
							files={files}
							handleChangeEvent={handleChangeEvent}
						/> */}
					</div>
					<div className='mt-[3.43rem] flex justify-center md:justify-end gap-x-[0.75rem]'>
						<Link
							href={'/who-are-you'}
							className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-transparent border border-[#E9E9EB] text-black'
						>
							Back
						</Link>
						<Button
							className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white hover:bg-secondaryBlue'
							onClick={handleSubmit}
							isDisabled={!isActive}
							isLoading={loading}
						>
							Create Account
						</Button>
						{/* <Link
							href={'/agent'}
							className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white hover:bg-secondaryBlue'
						>
							Create Account
						</Link> */}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Agent;
