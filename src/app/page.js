import DefaultNavbar from '../components/common/Navbar';
import React from 'react';
import Home from '../components/pages/Home';
const HomePage = () => {
	return (
		<div className='w-screen'>
			<DefaultNavbar />
			<Home />
		</div>
	);
};

export default HomePage;
