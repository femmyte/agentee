import React from 'react';
import Hero from './Hero';
import Featured from './Featured';
import WhyChooseUs from './WhyChooseUs';
import Review from './Review';
import FAQ from '@/components/common/FAQ';
import Footer from '@/components/common/Footer';
import Animation from '@/components/common/Animation';
import Carousel from '@/components/common/Carousel';

const carouselItems = [
	{ title: 'Item 1' },
	{ title: 'Item 2' },
	{ title: 'Item 3' },
	{ title: 'Item 4' },
	{ title: 'Item 5' },
	{ title: 'Item 6' },
];

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
			{/* <Carousel items={carouselItems} /> */}
			<Footer />
		</div>
	);
};

export default Home;
