'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Navbar, Button, Listbox, ListboxItem } from '@nextui-org/react';
import { AiFillDashboard, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { LandlordLinks, AgentLinks, TenantLink } from '@/links';
import { useRouter, usePathname } from 'next/navigation';

// export const AgentLinks = [
// 	// ... your AgentLinks array
// ];

// export const LandlordLinks = [
// 	// ... your LandlordLinks array
// ];

const DashboardLayout = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [userRole, setUserRole] = useState(null);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const role = Cookies.get('userRole');
		setUserRole(role);
	}, []);

	const links =
		userRole === 'agent'
			? AgentLinks
			: userRole === 'landlord'
			? LandlordLinks
			: TenantLink;

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	// const isActive = (path) => {
	// 	const currentPath = router.asPath.split('/').pop();
	// 	return currentPath === path;
	// };
	const isActive = (path) => {
		// Handle root path and empty string case
		if (!pathname || path === '/') return pathname === path;

		// Split path and compare segments
		const pathSegments = pathname.split('/').filter(Boolean);
		const targetSegment = path === '' ? '' : path;

		// Check if the last segment matches (or handle empty path)
		return path === ''
			? pathSegments.length === 0
			: pathSegments[pathSegments.length - 1] === targetSegment;
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Navbar */}
			<Navbar
				isBordered
				className='fixed top-0 h-16 z-50'
				css={{ $$navbarWidth: '100%' }}
			>
				<div className='flex items-center justify-between w-full'>
					<Button
						auto
						light
						onClick={toggleSidebar}
						className='md:hidden'
						icon={
							isSidebarOpen ? (
								<AiOutlineClose />
							) : (
								<AiOutlineMenu />
							)
						}
					/>
					<Navbar.Brand className='text-xl font-semibold'>
						Dashboard
					</Navbar.Brand>
				</div>
			</Navbar>

			{/* Sidebar */}
			<aside
				className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-40 md:translate-x-0 ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className='p-4 space-y-8 overflow-y-auto h-full'>
					{links.map((group, index) => (
						<div key={index} className='space-y-2'>
							<h3 className='text-sm font-medium text-gray-500 px-2'>
								{group.title}
							</h3>
							<Listbox aria-label='Navigation'>
								{group.links.map((link, linkIndex) => (
									<ListboxItem
										key={linkIndex}
										as={Link}
										href={`/${link.address}`}
										className={`rounded-lg px-3 py-2.5 text-base ${
											isActive(link.address)
												? 'bg-blue-100 text-blue-600'
												: 'hover:bg-gray-100'
										}`}
										startContent={
											<span className='text-xl'>
												{link.icon}
											</span>
										}
									>
										{link.name}
									</ListboxItem>
								))}
							</Listbox>
						</div>
					))}
				</div>
			</aside>

			{/* Main Content */}
			<main
				className={`pt-16 transition-all duration-200 ease-in-out ${
					isSidebarOpen ? 'md:ml-64' : 'md:ml-0'
				}`}
			>
				<div className='p-6 md:p-8'>{children}</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
