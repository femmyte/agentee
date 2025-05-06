import DashboardLayout from '@/components/Navigation/DashboardLayout';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Layout({ children }) {
	const token = cookies().get('accessToken')?.value;
	// const token = Cookies.get('accessToken');
	// console.log(token);

	if (!token) {
		redirect('/signin'); // Adjust to your login path
	}

	return <DashboardLayout>{children}</DashboardLayout>;
}
