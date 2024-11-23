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
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,
} from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';
import SwitchMode from './SwitchMode';
// import { AcmeLogo } from './AcmeLogo.jsx';

export default function DefaultNavbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const menuItems = ['Find Agents', 'Post your house'];
	return (
		<Navbar
			isBordered
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			className='w-screen mx-0 justify-between'
			shouldHideOnScroll
		>
			<NavbarContent className='sm:hidden' justify='start'>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				/>
			</NavbarContent>

			<NavbarContent className='sm:hidden pr-3' justify='center'>
				<NavbarBrand>
					<Image
						src={'/images/logo.svg'}
						width={98}
						height={17}
					></Image>
				</NavbarBrand>
			</NavbarContent>
			{/* <NavbarContent className='hidden sm:flex '> */}
			<NavbarContent
				as={'div'}
				className='hidden sm:flex'
				justify='start'
			>
				<NavbarBrand>
					<Image
						src={'/images/logo.svg'}
						width={98}
						height={17}
					></Image>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent
				as='div'
				className=' justify-end basis-2/3'
				justify='end'
			>
				<NavbarItem className='hidden lg:flex'>
					<Link color='foreground' href='#'>
						Post your house
					</Link>
				</NavbarItem>
				<NavbarItem className='hidden lg:flex'>
					<Link href='#' aria-current='page'>
						Find Agents
					</Link>
				</NavbarItem>

				<NavbarContent justify='end'>
					{/* <NavbarItem className='hidden lg:flex'>
						<Link href='#'>Login</Link>
					</NavbarItem> */}
					<NavbarItem>
						<Button
							as={Link}
							color='warning'
							href='/signin'
							className='bg-primary text-white'
						>
							Sign In
						</Button>
					</NavbarItem>
				</NavbarContent>
				{/* avatar */}
				<NavbarContent as='div' justify='end'>
					<Dropdown placement='bottom-end'>
						<DropdownTrigger>
							<Avatar
								isBordered
								as='button'
								className='transition-transform'
								color='secondary'
								name='Jason Hughes'
								size='sm'
								src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
							/>
						</DropdownTrigger>
						<DropdownMenu
							aria-label='Profile Actions'
							variant='flat'
						>
							<DropdownItem key='profile' className='h-14 gap-2'>
								<p className='font-semibold'>Signed in as</p>
								<p className='font-semibold'>
									zoey@example.com
								</p>
							</DropdownItem>
							<DropdownItem key='settings'>
								My Settings
							</DropdownItem>
							<DropdownItem key='team_settings'>
								Team Settings
							</DropdownItem>
							<DropdownItem key='analytics'>
								Analytics
							</DropdownItem>
							<DropdownItem key='system'>System</DropdownItem>
							<DropdownItem key='configurations'>
								Configurations
							</DropdownItem>
							<DropdownItem key='help_and_feedback'>
								Help & Feedback
							</DropdownItem>
							<DropdownItem key='logout' color='danger'>
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarContent>
				{/* mode switcher */}
				<NavbarContent justify='end'>
					<SwitchMode />
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
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
