import DashboardLayout from '@/components/Navigation/DashboardLayout';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Layout({ children }) {
	const token = cookies().get('accessToken')?.value;
	const id_token = cookies().get('authToken')?.value;

	if (!token) {
		redirect('/signin'); // Adjust to your login path
	}
	const decoded = jwtDecode(id_token);
	if (decoded?.['custom:user-type'] !== 'tenant') {
		redirect('/signin'); // Adjust to your login path
	}

	return (
		<DashboardLayout>
			<div className='pt-6 px-4 md:px-[2.2rem] bg-[#F1F9F4] min-h-screen'>
				{children}
			</div>
		</DashboardLayout>
	);
}
