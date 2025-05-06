'use client';

import { useState, useRef } from 'react';
import { Button, Card, CardBody, Input } from '@nextui-org/react';
// import { Upload, User, Template, Download } from 'react-feather';
import { FaUpload, FaUser, FaDownload } from 'react-icons/fa';
import { FiLayout } from 'react-icons/fi';
import { html2canvas } from 'html2canvas';

const DPCreator = () => {
	const [selectedTemplate, setSelectedTemplate] = useState(null);
	const [userImage, setUserImage] = useState(null);
	const [username, setUsername] = useState('');
	const [position, setPosition] = useState({ x: 50, y: 50 });
	const canvasRef = useRef(null);

	// Predefined templates
	const templates = [
		{ id: 1, url: '/images/emplate.png' },
		{ id: 2, url: '/images/template.png' },
	];

	// Handle template upload
	const handleTemplateUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setSelectedTemplate(event.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	// Handle user image upload
	const handleUserImageUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setUserImage(event.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	// Handle image positioning
	const handleImageMove = (e) => {
		const rect = canvasRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		setPosition({ x, y });
	};

	// Export as image
	const handleExport = async () => {
		const canvas = await html2canvas(canvasRef.current);
		const link = document.createElement('a');
		link.download = 'mentorship-dp.png';
		link.href = canvas.toDataURL();
		link.click();
	};

	return (
		<div className='min-h-screen bg-gray-100 p-8 flex gap-8'>
			{/* Template Selection Sidebar */}
			<div className='w-80 space-y-6'>
				<h2 className='text-2xl font-bold text-blue-800'>
					Choose Template
				</h2>

				{/* Predefined Templates */}
				<div className='space-y-4'>
					{templates.map((template) => (
						<Card
							key={template.id}
							isPressable
							className='aspect-square'
							onClick={() => setSelectedTemplate(template.url)}
						>
							<CardBody className='p-0 overflow-hidden'>
								<img
									src={template.url}
									alt={`Template ${template.id}`}
									className='w-full h-full object-cover'
								/>
							</CardBody>
						</Card>
					))}
				</div>

				{/* Template Upload */}
				<label className='block p-6 border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-500'>
					<div className='flex flex-col items-center gap-2 text-gray-500'>
						<FiLayout set='bold' primaryColor='currentColor' />
						<span className='text-center'>
							Upload Custom Template
							<span className='block text-sm'>(PNG, JPG)</span>
						</span>
					</div>
					<Input
						type='file'
						className='hidden'
						onChange={handleTemplateUpload}
						accept='image/*'
					/>
				</label>
			</div>

			{/* Main Canvas Area */}
			<div
				ref={canvasRef}
				className='flex-1 bg-white rounded-xl shadow-lg relative aspect-[1/1.25]'
			>
				{selectedTemplate ? (
					<>
						{/* Template Background */}
						<img
							src={selectedTemplate}
							alt='Template background'
							className='absolute inset-0 w-full h-full object-cover'
						/>

						{/* User Image Overlay */}
						{userImage && (
							<div
								className='absolute w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-move'
								style={{
									left: `${position.x}%`,
									top: `${position.y}%`,
									transform: 'translate(-50%, -50%)',
								}}
								onMouseDown={(e) => {
									e.preventDefault();
									const handleMouseMove = (e) =>
										handleImageMove(e);
									document.addEventListener(
										'mousemove',
										handleMouseMove
									);
									document.addEventListener(
										'mouseup',
										() => {
											document.removeEventListener(
												'mousemove',
												handleMouseMove
											);
										},
										{ once: true }
									);
								}}
							>
								<img
									src={userImage}
									alt='User'
									className='w-full h-full object-cover'
								/>
							</div>
						)}

						{/* Username */}
						<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center'>
							<Input
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder='Enter your name'
								classNames={{
									input: 'text-2xl font-bold text-center bg-transparent border-none',
								}}
							/>
						</div>
					</>
				) : (
					<div className='absolute inset-0 flex items-center justify-center text-gray-500'>
						Select or upload a template to begin
					</div>
				)}
			</div>

			{/* Controls Sidebar */}
			<div className='w-80 space-y-6'>
				<h2 className='text-2xl font-bold text-blue-800'>
					Customization
				</h2>

				{/* User Image Upload */}
				<label className='block p-6 border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-500'>
					<div className='flex flex-col items-center gap-2 text-gray-500'>
						<FaUser size={32} />
						<span className='text-center'>
							Upload Your Photo
							<span className='block text-sm'>
								(Recommended: Square images)
							</span>
						</span>
					</div>
					<Input
						type='file'
						className='hidden'
						onChange={handleUserImageUpload}
						accept='image/*'
					/>
				</label>

				{/* Position Controls */}
				<div className='space-y-4'>
					<div className='flex gap-2'>
						<Button onPress={() => setPosition({ x: 50, y: 30 })}>
							Top Center
						</Button>
						<Button onPress={() => setPosition({ x: 50, y: 70 })}>
							Bottom Center
						</Button>
					</div>
				</div>

				{/* Export Button */}
				<Button
					color='primary'
					startContent={<FaDownload />}
					onClick={handleExport}
					isDisabled={!selectedTemplate || !userImage}
				>
					Download Design
				</Button>
			</div>
		</div>
	);
};

export default DPCreator;
