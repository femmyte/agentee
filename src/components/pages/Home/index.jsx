import React from 'react';
import Hero from './Hero';
import Featured from './Featured';
import WhyChooseUs from './WhyChooseUs';
import Review from './Review';
import FAQ from '@/components/common/FAQ';
import Footer from '@/components/common/Footer';

const Home = () => {
	return (
		<div className='w-screen'>
			<Hero />
			<Featured />
			<WhyChooseUs />
			<Review />
			<FAQ />
			<Footer />
		</div>
	);
};

export default Home;
