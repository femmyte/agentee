import Signin from '@/components/pages/Signin';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const SigninPage = () => {
	const id_token = cookies().get('authToken')?.value;
	if (id_token) {
		const decoded = jwtDecode(id_token);
		if (decoded?.['custom:completed_setup'] === 'false') {
			router.push('/welcome');
		} else {
			if (decoded?.['custom:user-type'] === 'landlord') {
				redirect('/landlord'); // Adjust to your login path
			} else if (decoded?.['custom:user-type'] === 'agent') {
				redirect('/agent'); // Adjust to your login path
			} else if (decoded?.['custom:user-type'] === 'tenant') {
				redirect('/tenant'); // Adjust to your login path
			}
		}
	}
	return <Signin />;
};

export default SigninPage;
