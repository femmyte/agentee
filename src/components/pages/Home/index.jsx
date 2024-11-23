import React from 'react';
import Hero from './Hero';
import Featured from './Featured';
import WhyChooseUs from './WhyChooseUs';
import Review from './Review';
import FAQ from '@/components/common/FAQ';
import Footer from '@/components/common/Footer';
import Animation from '@/components/common/Animation';

const Home = () => {
	return (
		<div className='w-screen'>
			<Hero />
			<Animation style='fade-right' placement='center-center'>
				<Featured />
			</Animation>
			<Animation style='fade-left' placement='center-center'>
				<WhyChooseUs />
			</Animation>
			<Animation style='fade-right' placement='center-center'>
				<Review />
			</Animation>
			<Animation style='fade-left' placement='center-center'>
				<FAQ />
			</Animation>
			<Footer />
		</div>
	);
};

export default Home;
