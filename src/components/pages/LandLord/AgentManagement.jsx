'use client';
import React, { useState } from 'react';
import Nav from '@/components/common/Nav';
import Image from 'next/image';
import Link from 'next/link';
import FileUpload from '@/components/common/FileUpload';
import { useRouter } from 'next/navigation';
import { createAccount } from '@/hooks/commonService';
import { useStateContext } from '@/providers/contextProvider';
import { Button } from '@nextui-org/react';
import SelectInput from '@/components/common/SelectInput';
import { Select, SelectItem } from '@nextui-org/react';
import { agentOption } from '@/components/data';
import { Input } from '@nextui-org/input';
import { SearchIcon } from '@/components/common/SearchIcon';
import UserList from '@/components/common/UserList';
import { users } from '@/components/data';

const AgentManagement = () => {
	const { landlordData, setLandlordData } = useStateContext();
	const [option, setOption] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [listedSearch, setListedSearch] = useState([]);
	const [isActive, setIsActive] = useState(true);
	const [message, setMessage] = useState({
		type: '',
		title: '',
		content: '',
	});
	// console.log(option);
	const checkHandler = (item) => {
		// console.log(option);
		console.log(item.target.value);
		setOption(item.target.value);
		setIsOpen(true);
		// if (item.target.value === 'yes') {
		// } else {
		// 	setIsOpen(false);
		// }
	};
	const router = useRouter();
	const handleRoute = () => {
		router.back();
	};

	// console.log(landlordData);
	const handleSubmit = (e) => {
		e.preventDefault();
		setLandlordData({
			...landlordData,
			tenantInteraction: option,
		});
		console.log(landlordData);
		// router.replace('/landlord/onboarding/');
	};
	const filteredUsers = users.filter(
		(item) =>
			item.name.toLowerCase().includes(search.toLowerCase()) ||
			item.email.includes(search)
	);
	// console.log(search);
	return (
		<div className='h-screen bg-[#F8F9FB] overflow-x-hidden'>
			<Nav />
			<section className='flex items-center justify-center py-[3rem] px-3 md:px-[30rem]'>
				<div className=' w-[40rem]'>
					<article className='mb-[1rem]'>
						<h1 className='font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem] text-center '>
							Welcome Honorable House Owner
						</h1>
						<p className='font-[500] text-[1rem] leading-[140%] text-[#89898A] text-center'>
							Agent Management Option
						</p>
					</article>
					<div className='flex justify-center w-full px-5 md:px-0 mt-[2.5rem]'>
						<Image
							src={'/images/illustrations/landlord_2.svg'}
							width={200}
							height={173}
							alt='landlord illustration'
						></Image>
					</div>
					<section className='flex flex-col items-center px-4 md:px-0'>
						<p className='font-[600] text-[1rem] leadin mt-[2.6rem] text-[#202020] text-center md:text-left '>
							Do You Have an Agent Managing Your Property?{' '}
						</p>
						<div className='w-full mt-2'>
							<Select
								items={agentOption}
								placeholder='Select an option'
								className='max-w-xs'
								selectedKeys={option}
								// onSelectionChange={setOption}
								onChange={checkHandler}
							>
								{(agentOption) => (
									<SelectItem>{agentOption.label}</SelectItem>
								)}
							</Select>
							{isOpen && (
								<>
									<Input
										placeholder='Type to search for an Agent'
										size='md'
										startContent={<SearchIcon size={18} />}
										type='search'
										className='max-w-xs mt-1'
										value={search}
										onChange={(e) =>
											setSearch(e.target.value)
										}
									/>
									<UserList users={filteredUsers} />
								</>
							)}
							{option === 'yes' && isOpen && (
								<div className=''>
									<p className='font-[600] text-[1rem] leadin my-[2.6rem] text-[#202020] text-center md:text-left '>
										Can’t find My agent here
									</p>
									<div className=''>
										<Input
											size='md'
											type='text'
											label='Full Name'
											placeholder='Agent name'
											labelPlacement='outside'
											className='max-w-xs mt-1'
											value={fullName}
											onValueChange={setFullName}
										/>
									</div>
									<div className='my-[3rem]'>
										<Input
											size='md'
											type='email'
											label='Email'
											placeholder='you@example.com'
											labelPlacement='outside'
											className='max-w-xs mt-1'
											value={email}
											onValueChange={setEmail}
										/>
									</div>
									<div className=''>
										<Input
											size='md'
											type='tel'
											label='Phone Number'
											placeholder='Agent Phone Number'
											labelPlacement='outside'
											className='max-w-xs mt-1'
											value={phoneNumber}
											onValueChange={setPhoneNumber}
										/>
									</div>
								</div>
							)}
						</div>
					</section>
					<div className='mt-[3.43rem] flex flex-col md:flex-row justify-center md:justify-end gap-x-[0.75rem] gap-y-3 px-4'>
						<Button
							href={'#'}
							className='flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white hover:bg-secondaryBlue w-full md:w-[6.87rem]'
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AgentManagement;
