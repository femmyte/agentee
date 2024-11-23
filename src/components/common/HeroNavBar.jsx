'use client';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenuToggle,
	NavbarMenuItem,
	NavbarMenu,
	NavbarItem,
	Link,
	Button,
	Input,
} from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';
import SwitchMode from './SwitchMode';
import { SearchIcon } from './SearchIcon';
import SelectInput from './SelectInput';

export default function HeroNavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const menuItems = ['Find Agents', 'Post your house'];
	return (
		<Navbar
			height='6rem'
			position='static'
			isBordered
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			className='w-full mx-0 bg-white h-16 hidden sm:flex'
		>
			<NavbarContent className='sm:hidden' justify='start'>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				/>
			</NavbarContent>
			<NavbarContent
				as='div'
				className='hidden sm:flex items-center'
				justify='start'
			>
				<Input
					classNames={{
						base: 'max-w-full sm:max-w-[15rem] h-[3rem]',
						mainWrapper: 'h-full',
						input: 'text-small',
						inputWrapper:
							'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
					}}
					placeholder='Type to search...'
					size='sm'
					startContent={<SearchIcon size={18} />}
					type='search'
				/>
			</NavbarContent>
			<NavbarContent justify='end' className='hidden sm:flex w-[60%]'>
				<NavbarItem className=''>
					<SelectInput />
				</NavbarItem>
				<NavbarItem>
					<SelectInput />
				</NavbarItem>
				<NavbarItem className='flex items-center gap-x-3'>
					Sort:
					<SelectInput />
				</NavbarItem>
				{/* <NavbarItem>
					<SelectInput />
				</NavbarItem> */}

				<NavbarContent justify='end'>
					<NavbarItem>
						<Button
							// color='light'
							className='bg-primary text-white'
							href='#'
							variant='flat'
							startContent={<SearchIcon />}
						>
							Sign In
						</Button>
					</NavbarItem>
				</NavbarContent>
			</NavbarContent>
			{/* </NavbarContent> */}

			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							className='w-full'
							color={
								index === 2
									? 'warning'
									: index === menuItems.length - 1
									? 'danger'
									: 'foreground'
							}
							href='#'
							size='lg'
						>
							{/* {item} */}
							<SelectInput />
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
