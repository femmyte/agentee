import DashboardLayout from '@/components/Navigation/DashboardLayout';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Layout({ children }) {
	const token = cookies().get('accessToken')?.value;
	const id_token = cookies().get('authToken')?.value;
	const decoded = jwtDecode(id_token);

	if (!token) {
		redirect('/signin'); // Adjust to your login path
	}
	if (decoded?.['custom:user-type'] !== 'tenant') {
		redirect('/signin'); // Adjust to your login path
	}

	return <DashboardLayout>{children}</DashboardLayout>;
}
